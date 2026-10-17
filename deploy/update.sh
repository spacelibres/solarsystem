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
#
# Only one update may run at a time. A single `git push --follow-tags` fires the
# webhook once for the branch and once for the tag; without the lock those two
# runs raced on `git fetch` and then built concurrently, and two `next build`
# processes on a 2 GB box trip the OOM killer.
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/solarsystem}"
APP_USER="${APP_USER:-solarsystem}"
APP_BRANCH="${APP_BRANCH:-main}"
MIRROR_DIR="${MIRROR_DIR:-/srv/solarsystem-mirror}"
LOG_FILE="${LOG_FILE:-/var/log/solarsystem-update.log}"
LOCK_FILE="${LOCK_FILE:-/var/lock/solarsystem-update.lock}"

# Keep the build's own heap in bounds. The real cause of the OOM was the asset
# mirror being inside the tree (see below), but a ceiling still stops a runaway
# build from taking the host down.
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"
export NEXT_TELEMETRY_DISABLED=1

log() { printf '\033[1;36m[update]\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m[update] error\033[0m %s\n' "$*" >&2; exit 1; }

[ -d "$APP_DIR/.git" ] || die "$APP_DIR is not a git checkout"
cd "$APP_DIR"

# Serialise concurrent invocations. `flock -n` fails immediately rather than
# queueing, so a duplicate delivery is dropped instead of stacking a second
# build on top of one already in flight.
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "another update is already running; skipping this one"
  exit 0
fi

# Mirror stdout/stderr into the file the docs point at, while still writing to
# the journal (the webhook spawns this with stdio inherited).
exec > >(tee -a "$LOG_FILE") 2>&1

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

# Legacy mirrors must stay outside the checkout across both install and updates.
# Keeping them there also preserves the service's MIRROR_ROOT after a rebuild.
MIRROR_SRC="$APP_DIR/data/mirror"
if [ -L "$MIRROR_SRC" ]; then
  log "removing in-tree mirror link; external target retained"
  rm -- "$MIRROR_SRC"
elif [ -d "$MIRROR_SRC" ]; then
  [ ! -e "$MIRROR_DIR" ] || die "$MIRROR_DIR already exists; refusing to overwrite mirror data"
  case "$(realpath -m "$MIRROR_DIR")/" in "$(realpath -m "$APP_DIR")/"*) die "mirror target must be outside the checkout" ;; esac
  mkdir -p "$(dirname "$MIRROR_DIR")"
  log "moving legacy mirror outside the checkout"
  mv -- "$MIRROR_SRC" "$MIRROR_DIR"
fi

log "installing dependencies"
sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm ci --no-audit --no-fund" >/dev/null

# Gate on tests and checks. A failing push leaves the previous build serving.
if ! sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm test"; then
  die "TESTS FAILED — leaving the running build in place"
fi
if ! sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm run check"; then
  die "TYPE/LINT CHECK FAILED — leaving the running build in place"
fi

log "building (serialised, mirror outside checkout)"
if ! sudo -u "$APP_USER" env NODE_OPTIONS="$NODE_OPTIONS" NEXT_TELEMETRY_DISABLED=1 \
     bash -lc "cd '$APP_DIR' && npm run build"; then
  log "BUILD FAILED — leaving the running build in place"
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
