#!/usr/bin/env bash
#
# Update the deployed app to the latest commit and restart it.
#
# Called by the webhook listener on a GitHub push, and safe to run by hand:
#
#   sudo /usr/local/bin/solarsystem-update
#
# It refuses to rebuild unless the tests and type checks pass, so a bad push
# cannot take the site down — the old build keeps serving instead.
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/solarsystem}"
APP_USER="${APP_USER:-solarsystem}"
APP_BRANCH="${APP_BRANCH:-main}"

log() { printf '\033[1;36m[update]\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m[update] error\033[0m %s\n' "$*" >&2; exit 1; }

[ -d "$APP_DIR/.git" ] || die "$APP_DIR is not a git checkout"
cd "$APP_DIR"

BEFORE="$(sudo -u "$APP_USER" git rev-parse HEAD)"

log "fetching origin/$APP_BRANCH"
sudo -u "$APP_USER" git fetch --prune origin "$APP_BRANCH" >/dev/null

AFTER="$(sudo -u "$APP_USER" git rev-parse "origin/$APP_BRANCH")"

if [ "$BEFORE" = "$AFTER" ]; then
  log "already at $(echo "$BEFORE" | cut -c1-8); nothing to do"
  exit 0
fi

log "advancing $(echo "$BEFORE" | cut -c1-8) -> $(echo "$AFTER" | cut -c1-8)"
sudo -u "$APP_USER" git checkout -q "$APP_BRANCH"
sudo -u "$APP_USER" git reset --hard -q "origin/$APP_BRANCH"

NEW_VERSION="$(cat VERSION 2>/dev/null || echo unknown)"
log "building version $NEW_VERSION"

log "installing dependencies"
sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm ci --no-audit --no-fund" >/dev/null

# Gate on tests and checks. A failing push leaves the previous build serving.
if ! sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm test" >/tmp/solarsystem-test.log 2>&1; then
  log "TESTS FAILED — leaving the running build in place"
  tail -20 /tmp/solarsystem-test.log >&2
  exit 1
fi
if ! sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm run check" >/tmp/solarsystem-check.log 2>&1; then
  log "TYPE/LINT CHECK FAILED — leaving the running build in place"
  tail -20 /tmp/solarsystem-check.log >&2
  exit 1
fi

log "building"
if ! sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm run build" >/tmp/solarsystem-build.log 2>&1; then
  log "BUILD FAILED — leaving the running build in place"
  tail -30 /tmp/solarsystem-build.log >&2
  exit 1
fi

log "restarting the service"
systemctl restart solarsystem

for i in $(seq 1 40); do
  if curl -fsS -o /dev/null "http://127.0.0.1:${APP_PORT:-4310}/"; then
    log "up and serving v$NEW_VERSION"
    exit 0
  fi
  sleep 1
done

die "service restarted but is not answering; check journalctl -u solarsystem -n 50"
