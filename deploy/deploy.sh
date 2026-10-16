#!/usr/bin/env bash
#
# One-shot deployment of the solar system viewer to a VPS running Caddy.
#
# What it does, in order:
#   1. installs system packages (Node, git, build tools) if missing
#   2. creates the service user and the app directory
#   3. clones or fast-forwards the repository
#   4. builds the Next.js production bundle
#   5. mirrors NASA's assets locally (optional — see MIRROR below)
#   6. installs a systemd unit so the app restarts on boot
#   7. writes a Caddy site block and reloads Caddy
#   8. installs a webhook listener so a GitHub push can redeploy
#
# It is idempotent: re-running it updates the checkout, rebuilds and reloads.
#
# Usage:
#   sudo ./deploy/deploy.sh                     # full deploy
#   sudo ./deploy/deploy.sh --skip-mirror       # fast path, reuse existing mirror
#   sudo ./deploy/deploy.sh --branch main
#
# Environment overrides (all optional):
#   APP_DOMAIN     default solarsystem.spacelibre.cn
#   APP_USER       default solarsystem
#   APP_DIR        default /srv/solarsystem
#   APP_PORT       default 4310
#   MIRROR_DIR     default /srv/solarsystem-mirror (kept out of the build tree)
#   REPO_URL       default https://github.com/spacelibres/solarsystem.git
#   WEBHOOK_SECRET secret shared with GitHub; required for the webhook
set -euo pipefail

APP_DOMAIN="${APP_DOMAIN:-solarsystem.spacelibre.cn}"
APP_USER="${APP_USER:-solarsystem}"
APP_DIR="${APP_DIR:-/srv/solarsystem}"
APP_PORT="${APP_PORT:-4310}"
MIRROR_DIR="${MIRROR_DIR:-/srv/solarsystem-mirror}"
REPO_URL="${REPO_URL:-https://github.com/spacelibres/solarsystem.git}"
BRANCH="main"
SKIP_MIRROR=0
WEBHOOK_SECRET="${WEBHOOK_SECRET:-}"

while [ $# -gt 0 ]; do
  case "$1" in
    --skip-mirror) SKIP_MIRROR=1 ;;
    --branch) BRANCH="$2"; shift ;;
    --domain) APP_DOMAIN="$2"; shift ;;
    --port) APP_PORT="$2"; shift ;;
    --secret) WEBHOOK_SECRET="$2"; shift ;;
    -h|--help) sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
  shift
done

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m warn\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m error\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root (sudo $0)"

# --- 1. system packages ------------------------------------------------------

log "installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl git ca-certificates gnupg rsync >/dev/null

if ! command -v node >/dev/null 2>&1; then
  log "installing Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
log "node $(node -v), npm $(npm -v)"

# --- 2. service user and directory ------------------------------------------

if ! id -u "$APP_USER" >/dev/null 2>&1; then
  log "creating user $APP_USER"
  useradd --system --create-home --shell /usr/sbin/nologin "$APP_USER"
fi

log "preparing $APP_DIR"
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"

# --- 3. clone or update ------------------------------------------------------

if [ -d "$APP_DIR/.git" ]; then
  log "updating existing checkout"
  sudo -u "$APP_USER" git -C "$APP_DIR" fetch --prune origin
  sudo -u "$APP_USER" git -C "$APP_DIR" checkout "$BRANCH"
  sudo -u "$APP_USER" git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  log "cloning $REPO_URL"
  sudo -u "$APP_USER" git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

VERSION="$(cat "$APP_DIR/VERSION" 2>/dev/null || echo unknown)"
log "checked out version $VERSION"

# --- 4. build ---------------------------------------------------------------

log "installing npm dependencies"
sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm ci --no-audit --no-fund"

log "building production bundle"
sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && npm run build"

# --- 5. NASA asset mirror ----------------------------------------------------
#
# The app serves NASA's textures, models and ephemerides from the mirror, which
# is git-ignored (it is NASA's data, not ours). On a fresh host it has to be
# fetched once. It is ~1.6 GB across 90k+ files, so this is the slow step and is
# skipped when a mirror is already present.
#
# It lives OUTSIDE the project tree on purpose: Next's build walks the project
# directory, and scanning that many files made the build exceed this host's
# memory and get OOM-killed. The service reads it via MIRROR_ROOT instead.

if [ "$SKIP_MIRROR" -eq 0 ]; then
  if [ -d "$MIRROR_DIR/static/maps" ]; then
    log "NASA mirror already present, skipping (use a fresh clone to refetch)"
  else
    log "building the asset manifest"
    sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && node tools/build-manifest.cjs" || warn "manifest build failed"
    sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && node tools/expand-segments.cjs" || warn "segment expansion failed"
    log "downloading NASA assets (this takes a while — ~1.6 GB)"
    sudo -u "$APP_USER" bash -lc "cd '$APP_DIR' && node tools/download-mirror.cjs --out '$MIRROR_DIR' --concurrency 24 --retry 3" \
      || warn "some assets failed; re-run this script to resume"
  fi
else
  log "skipping mirror (--skip-mirror)"
fi

# --- 6. systemd unit ---------------------------------------------------------

log "installing systemd unit"
cat > /etc/systemd/system/solarsystem.service <<UNIT
[Unit]
Description=spacelibre solar system viewer
Documentation=$REPO_URL
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$APP_USER
Group=$APP_USER
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$APP_PORT
Environment=HOSTNAME=127.0.0.1
# The mirror lives outside the project tree so Next's build never walks its
# 90k+ files (that scan is what exhausted this host's memory).
Environment=MIRROR_ROOT=$MIRROR_DIR
Environment=NODE_OPTIONS=--max-old-space-size=1536
ExecStart=$(command -v npm) run start
Restart=always
RestartSec=5
# The mirror is large but only read; keep the browser-facing process unprivileged.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable solarsystem >/dev/null
systemctl restart solarsystem

log "waiting for the app to answer on 127.0.0.1:$APP_PORT"
for i in $(seq 1 60); do
  if curl -fsS -o /dev/null "http://127.0.0.1:$APP_PORT/"; then
    log "app is up"
    break
  fi
  [ "$i" -eq 60 ] && die "app did not start; check: journalctl -u solarsystem -n 50"
  sleep 1
done

# --- 7. Caddy ----------------------------------------------------------------
#
# The host already runs Caddy for another site, so we only ADD a site block and
# reload — we never rewrite the existing configuration.

CADDYFILE=/etc/caddy/Caddyfile
SITE_FILE=/etc/caddy/sites/solarsystem.caddy

if ! command -v caddy >/dev/null 2>&1; then
  warn "caddy not found; skipping the site block. Install it, then re-run."
else
  log "writing Caddy site block for $APP_DOMAIN"
  mkdir -p "$(dirname "$SITE_FILE")"
  cat > "$SITE_FILE" <<CADDY
# Managed by deploy/deploy.sh — do not edit by hand.
$APP_DOMAIN {
	encode zstd gzip
	reverse_proxy 127.0.0.1:$APP_PORT

	# NASA's textures, models and ephemerides are immutable, so let browsers and
	# Caddy keep them for a year instead of revalidating every load.
	@immutable path /nasa/*
	header @immutable Cache-Control "public, max-age=31536000, immutable"

	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
	}
}
CADDY

  # Make sure the main Caddyfile imports the sites directory, exactly once.
  if ! grep -qF "import sites/*.caddy" "$CADDYFILE" 2>/dev/null; then
    log "adding an import for sites/*.caddy to $CADDYFILE"
    printf '\n# Added by deploy/deploy.sh\nimport sites/*.caddy\n' >> "$CADDYFILE"
  fi

  log "validating Caddy configuration"
  if caddy validate --config "$CADDYFILE" >/dev/null 2>&1; then
    systemctl reload caddy 2>/dev/null || systemctl restart caddy
    log "caddy reloaded"
  else
    warn "caddy validate failed; not reloading. Run: caddy validate --config $CADDYFILE"
  fi
fi

# --- 8. webhook --------------------------------------------------------------
#
# GitHub cannot be trusted to reach a plain HTTP port safely, so the listener
# verifies the HMAC signature, then runs the update script. If no secret was
# supplied we still install the listener but refuse unsigned calls.

log "installing the webhook listener and updater"
install -m 0755 "$(dirname "$0")/webhook.cjs" /usr/local/bin/solarsystem-webhook
install -m 0755 "$(dirname "$0")/update.sh" /usr/local/bin/solarsystem-update

cat > /etc/systemd/system/solarsystem-webhook.service <<UNIT
[Unit]
Description=GitHub webhook listener for the solar system viewer
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Environment=WEBHOOK_PORT=9100
Environment=WEBHOOK_SECRET=$WEBHOOK_SECRET
Environment=WEBHOOK_UPDATE_CMD=/usr/local/bin/solarsystem-update
Environment=WEBHOOK_BRANCH=$BRANCH
ExecStart=$(command -v node) /usr/local/bin/solarsystem-webhook
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable solarsystem-webhook >/dev/null
systemctl restart solarsystem-webhook

# --- done --------------------------------------------------------------------

cat <<SUMMARY

  Deployed v$VERSION

    directory   $APP_DIR
    service     systemctl status solarsystem
    logs        journalctl -u solarsystem -f
    local port  127.0.0.1:$APP_PORT
    public URL  https://$APP_DOMAIN

  Webhook (GitHub -> auto redeploy)

    service     systemctl status solarsystem-webhook
    endpoint    http://$(hostname -I | awk '{print $1}'):9100/hooks/deploy
    update      /usr/local/bin/solarsystem-update

  Next steps

    1. Point DNS: $APP_DOMAIN -> $(hostname -I | awk '{print $1}')
    2. In GitHub: Settings -> Webhooks -> Add webhook
         Payload URL   http://<this-ip>:9100/hooks/deploy
         Content type  application/json
         Secret        the value of WEBHOOK_SECRET
         Events        Just the push event
    3. Verify Caddy picked up the site:  caddy validate --config /etc/caddy/Caddyfile

SUMMARY
