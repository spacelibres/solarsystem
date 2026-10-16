#!/usr/bin/env node
/**
 * Send a signed test delivery to the webhook, through the public URL.
 *
 * Used to verify the deploy hook end to end without involving GitHub. Not part
 * of the shipped app.
 *
 * Usage:
 *   WEBHOOK_SECRET=... node tools/probe-webhook.cjs [url] [ref] [event]
 */
const crypto = require('node:crypto');

const url = process.argv[2] || 'https://solarsystem.spacelibre.cn/hooks/deploy';
const ref = process.argv[3] || 'refs/heads/some-other-branch';
const event = process.argv[4] || 'push';
const secret = process.env.WEBHOOK_SECRET || '';
if (!secret) {
  console.error('WEBHOOK_SECRET is required');
  process.exit(2);
}

const body = JSON.stringify({ ref });
const signature =
  'sha256=' + crypto.createHmac('sha256', secret).update(Buffer.from(body)).digest('hex');

(async () => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-github-event': event,
      'x-hub-signature-256': signature,
    },
    body,
  });
  console.log(`${event} ${ref} -> ${res.status} ${(await res.text()).trim()}`);
})().catch((err) => {
  console.error('request failed:', err.message);
  process.exit(1);
});
