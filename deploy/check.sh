#!/usr/bin/env bash
# Safe diagnostics: the signed ping verifies routing without starting a deployment.
set -euo pipefail
APP_DOMAIN="${APP_DOMAIN:-solarsystem.spacelibre.cn}"
APP_PORT="${APP_PORT:-4310}"
WEBHOOK_PATH="${WEBHOOK_PATH:-/hooks/deploy}"
WEBHOOK_PORT="${WEBHOOK_PORT:-9100}"
systemctl is-active --quiet solarsystem caddy solarsystem-webhook
caddy validate --config /etc/caddy/Caddyfile
curl --fail --silent --show-error "http://127.0.0.1:$APP_PORT/explorer" -o /dev/null
for route in / /explorer /eyes/index.html; do
  curl --fail --silent --show-error --location "https://$APP_DOMAIN$route" -o /dev/null
  printf 'HTTPS OK: %s\n' "$route"
done
if [ -f /etc/solarsystem/webhook.env ]; then
  set -a
  . /etc/solarsystem/webhook.env
  set +a
else
  WEBHOOK_SECRET="$(sed -n 's/^Environment=WEBHOOK_SECRET=//p' /etc/systemd/system/solarsystem-webhook.service | head -1)"
  export WEBHOOK_SECRET
fi
export APP_DOMAIN WEBHOOK_PATH
node <<'JS'
const { createHmac } = require('node:crypto');
const url = `https://${process.env.APP_DOMAIN}${process.env.WEBHOOK_PATH}`;
(async () => {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) throw Error('Webhook secret missing');
  const body = '{}';
  const unsigned = await fetch(url, { method: 'POST', body });
  if (unsigned.status !== 401) throw Error(`Unsigned webhook returned ${unsigned.status}`);
  const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
  const signed = await fetch(url, { method: 'POST', body, headers: { 'x-github-event': 'ping', 'x-hub-signature-256': signature } });
  if (signed.status !== 200 || (await signed.text()).trim() !== 'pong') throw Error(`Signed webhook failed (${signed.status})`);
  console.log('Webhook OK: unsigned=401, signed ping=200');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
JS
for port in "$APP_PORT" "$WEBHOOK_PORT"; do
  bindings="$(ss -H -lnt | awk -v port="$port" '$4 ~ (":" port "$") {print $4}')"
  [ "$bindings" = "127.0.0.1:$port" ] || { printf 'Unexpected listener on %s: %s\n' "$port" "$bindings" >&2; exit 1; }
done
printf 'Deployment diagnostics passed.\n'
