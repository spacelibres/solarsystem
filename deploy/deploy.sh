#!/usr/bin/env bash
#
# One-shot deployment of the solar system viewer to a VPS running Caddy.
#
# What it does, in order:
#   1. installs system packages (Node, git, build tools) if missing
#   2. creates the service user and the app directory
#   3. clones or fast-forwards the repository
#   4. builds the Next.js production bundle
#   5. uses NASA assets at their runtime URLs (no library download)
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
#   WEBHOOK_PORT   default 9100 (bound to loopback; Caddy proxies to it)
#   WEBHOOK_PATH   default /hooks/deploy
#   MIRROR_DIR     default /srv/solarsystem-mirror (kept out of the build tree)
#   REPO_URL       default https://github.com/spacelibres/solarsystem.git
#   WEBHOOK_SECRET optional shared secret; reuse existing or generate on first install
set -euo pipefail

APP_DOMAIN="${APP_DOMAIN:-solarsystem.spacelibre.cn}"
APP_USER="${APP_USER:-solarsystem}"
APP_DIR="${APP_DIR:-/srv/solarsystem}"
APP_PORT="${APP_PORT:-4310}"
WEBHOOK_PORT="${WEBHOOK_PORT:-9100}"
WEBHOOK_PATH="${WEBHOOK_PATH:-/hooks/deploy}"
MIRROR_DIR="${MIRROR_DIR:-/srv/solarsystem-mirror}"
REPO_URL="${REPO_URL:-https://github.com/spacelibres/solarsystem.git}"
BRANCH="main"
WEBHOOK_SECRET="${WEBHOOK_SECRET:-}"
WEBHOOK_ENV_FILE=/etc/solarsystem/webhook.env
INSTALLER_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

while [ $# -gt 0 ]; do
  case "$1" in
    --skip-mirror) : ;;
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

# Keep an existing GitHub signature contract when an operator reruns the installer.
if [ -z "$WEBHOOK_SECRET" ] && [ -f "$WEBHOOK_ENV_FILE" ]; then
  WEBHOOK_SECRET="$(sed -n 's/^WEBHOOK_SECRET=//p' "$WEBHOOK_ENV_FILE" | head -1)"
fi
if [ -z "$WEBHOOK_SECRET" ] && [ -f /etc/systemd/system/solarsystem-webhook.service ]; then
  WEBHOOK_SECRET="$(sed -n 's/^Environment=WEBHOOK_SECRET=//p' /etc/systemd/system/solarsystem-webhook.service | head -1)"
fi
if [ -z "$WEBHOOK_SECRET" ]; then
  WEBHOOK_SECRET="$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n')"
  log "generated a webhook secret; it will be stored in $WEBHOOK_ENV_FILE"
fi
case "$WEBHOOK_SECRET" in *[!a-zA-Z0-9_-]*) die "WEBHOOK_SECRET must contain only letters, digits, underscore or hyphen" ;; esac

mkdir -p /var/lock
exec 9>/var/lock/solarsystem-update.lock
flock -n 9 || die "another install or webhook update is running; try again when it finishes"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"
export NEXT_TELEMETRY_DISABLED=1

# --- 1. system packages ------------------------------------------------------

log "installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl git ca-certificates gnupg rsync sudo util-linux >/dev/null

if ! command -v caddy >/dev/null 2>&1; then
  log "installing Caddy from the system package repository"
  apt-get install -y -qq caddy >/dev/null
fi
command -v caddy >/dev/null 2>&1 || die "Caddy installation failed"

if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'Number(process.versions.node.split(".")[0])')" -lt 22 ]; then
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
  [ -z "$(sudo -u "$APP_USER" git -C "$APP_DIR" status --porcelain --untracked-files=no)" ] || die "checkout has local source changes; preserve them before deploying"
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

# Keep legacy data without letting Next's build traverse it inside the checkout.
MIRROR_SRC="$APP_DIR/data/mirror"
if [ -L "$MIRROR_SRC" ]; then
  log "removing the in-tree mirror link; its external target is retained"
  rm -- "$MIRROR_SRC"
elif [ -d "$MIRROR_SRC" ]; then
  [ ! -e "$MIRROR_DIR" ] || die "$MIRROR_DIR already exists; cannot safely move the in-tree mirror"
  [ "$(realpath -m "$MIRROR_DIR")" != "$(realpath -m "$APP_DIR")" ] || die "mirror target must be outside the checkout"
  case "$(realpath -m "$MIRROR_DIR")/" in "$(realpath -m "$APP_DIR")/"*) die "mirror target must be outside the checkout" ;; esac
  log "moving legacy mirror outside the checkout to $MIRROR_DIR"
  mkdir -p "$(dirname "$MIRROR_DIR")"
  mv -- "$MIRROR_SRC" "$MIRROR_DIR"
fi

# --- 4. build ---------------------------------------------------------------

log "installing npm dependencies"
sudo -u "$APP_USER" env NODE_OPTIONS="$NODE_OPTIONS" NEXT_TELEMETRY_DISABLED=1 bash -lc "cd '$APP_DIR' && npm ci --no-audit --no-fund"

log "running tests and source checks"
sudo -u "$APP_USER" env NODE_OPTIONS="$NODE_OPTIONS" NEXT_TELEMETRY_DISABLED=1 bash -lc "cd '$APP_DIR' && npm test && npm run check"

log "building production bundle"
sudo -u "$APP_USER" env NODE_OPTIONS="$NODE_OPTIONS" NEXT_TELEMETRY_DISABLED=1 bash -lc "cd '$APP_DIR' && npm run build"

# --- 5. Runtime assets -------------------------------------------------------
# Existing out-of-tree mirrors are left alone; normal operation references NASA.
log "using NASA runtime URLs; no asset library is downloaded"

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
Environment=NASA_MIRROR_FILL=1
Environment=NODE_OPTIONS=--max-old-space-size=1536
ExecStart=$(command -v npm) run start -- --hostname 127.0.0.1
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
  die "Caddy is required"
else
  log "writing Caddy site block for $APP_DOMAIN"
  BACKUP_DIR="/var/backups/solarsystem/$(date -u +%Y%m%dT%H%M%SZ)-$$"
  install -d -m 0700 "$BACKUP_DIR"
  if [ -f "$CADDYFILE" ]; then cp -a "$CADDYFILE" "$BACKUP_DIR/Caddyfile"; fi
  if [ -f "$SITE_FILE" ]; then cp -a "$SITE_FILE" "$BACKUP_DIR/solarsystem.caddy"; fi
  restore_caddy_config() {
    if [ -f "$BACKUP_DIR/Caddyfile" ]; then cp -a "$BACKUP_DIR/Caddyfile" "$CADDYFILE"; fi
    if [ -f "$BACKUP_DIR/solarsystem.caddy" ]; then
      cp -a "$BACKUP_DIR/solarsystem.caddy" "$SITE_FILE"
    else
      rm -f "$SITE_FILE"
    fi
  }
  mkdir -p "$(dirname "$SITE_FILE")"
  cat > "$SITE_FILE" <<CADDY
# Managed by deploy/deploy.sh — do not edit by hand.
$APP_DOMAIN {
	encode zstd gzip

	# GitHub's delivery for auto-deploy. Caddy terminates TLS and forwards to the
	# listener on loopback, so the listener never has to be exposed to the
	# internet. The signature check still runs, and this route is matched before
	# the catch-all below.
	handle $WEBHOOK_PATH* {
		reverse_proxy 127.0.0.1:$WEBHOOK_PORT
	}

	handle {
		reverse_proxy 127.0.0.1:$APP_PORT
	}

	# The application sets cache policy: dynamic indexes must revalidate.

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

  systemctl enable caddy >/dev/null
  log "validating Caddy configuration"
  if ! caddy validate --config "$CADDYFILE" > "$BACKUP_DIR/validation.log" 2>&1; then
    restore_caddy_config
    die "Caddy validation failed; configuration restored. See $BACKUP_DIR/validation.log"
  fi
  if systemctl is-active --quiet caddy; then
    if ! systemctl reload caddy; then
      restore_caddy_config
      die "Caddy reload failed; previous files restored and existing service left running"
    fi
  elif ! systemctl start caddy; then
    restore_caddy_config
    die "Caddy start failed; previous files restored"
  fi
  log "caddy configuration applied"
fi

# --- 8. webhook --------------------------------------------------------------
#
# GitHub cannot be trusted to reach a plain HTTP port safely, so the listener
# verifies the HMAC signature, then runs the update script. If no secret was
# supplied we still install the listener but refuse unsigned calls.

log "installing the webhook listener and updater"
install -m 0755 "$INSTALLER_DIR/webhook.cjs" /usr/local/bin/solarsystem-webhook
install -m 0755 "$INSTALLER_DIR/update.sh" /usr/local/bin/solarsystem-update
install -m 0755 "$INSTALLER_DIR/check.sh" /usr/local/bin/solarsystem-check

install -d -m 0700 /etc/solarsystem
(umask 077; printf 'WEBHOOK_SECRET=%s\n' "$WEBHOOK_SECRET" > "$WEBHOOK_ENV_FILE")
chmod 0600 "$WEBHOOK_ENV_FILE"

cat > /etc/systemd/system/solarsystem-webhook.service <<UNIT
[Unit]
Description=GitHub webhook listener for the solar system viewer
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Environment=WEBHOOK_PORT=$WEBHOOK_PORT
Environment=WEBHOOK_HOST=127.0.0.1
Environment=WEBHOOK_PATH=$WEBHOOK_PATH
EnvironmentFile=$WEBHOOK_ENV_FILE
Environment=WEBHOOK_UPDATE_CMD=/usr/local/bin/solarsystem-update
Environment=WEBHOOK_BRANCH=$BRANCH
Environment=APP_BRANCH=$BRANCH
Environment=APP_DIR=$APP_DIR
Environment=APP_USER=$APP_USER
Environment=APP_PORT=$APP_PORT
Environment=MIRROR_DIR=$MIRROR_DIR
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
    bound to    127.0.0.1:$WEBHOOK_PORT (loopback only; not reachable from outside)
    endpoint    https://$APP_DOMAIN$WEBHOOK_PATH   (Caddy terminates TLS)
    update      /usr/local/bin/solarsystem-update

  Next steps

    1. Point DNS: $APP_DOMAIN -> $(hostname -I | awk '{print $1}')
    2. In GitHub: Settings -> Webhooks -> Add webhook
         Payload URL   https://$APP_DOMAIN$WEBHOOK_PATH
         Content type  application/json
         Secret        the value of WEBHOOK_SECRET
         SSL verify    enabled
         Events        Just the push event
       Re-send the secret whenever the hook is edited: a hook stored without
       one returns 401 bad signature on every delivery.
    3. Verify Caddy picked up the site:  caddy validate --config /etc/caddy/Caddyfile

SUMMARY
