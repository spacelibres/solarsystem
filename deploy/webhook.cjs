#!/usr/bin/env node
/**
 * GitHub webhook listener for automatic deployment.
 *
 * Verifies GitHub's HMAC-SHA256 signature, then runs the updater. Written in Node
 * because Node is already a dependency of the app, and because `nc` variants
 * disagree about their flags in ways that make a shell version fragile.
 *
 * It deliberately does NOT import anything from the app: this listener is what
 * repairs the app, so it must keep running while the app is broken or mid-build.
 *
 * Environment (set by the systemd unit):
 *   WEBHOOK_PORT    port to listen on    (default 9100)
 *   WEBHOOK_SECRET  shared secret        (required; unsigned deliveries rejected)
 */
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const http = require('node:http');

const PORT = Number(process.env.WEBHOOK_PORT || 9100);
const SECRET = process.env.WEBHOOK_SECRET || '';
const PATHNAME = process.env.WEBHOOK_PATH || '/hooks/deploy';
const UPDATE_CMD = process.env.WEBHOOK_UPDATE_CMD || '/usr/local/bin/solarsystem-update';

const log = (...args) => console.log('[webhook]', ...args);

if (!SECRET) {
  log('WEBHOOK_SECRET is empty — every delivery will be rejected with 401.');
  log('Set it in /etc/systemd/system/solarsystem-webhook.service and restart.');
}

/** Constant-time comparison, so a signature cannot be guessed byte by byte. */
function signaturesMatch(expected, received) {
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

let deployRunning = false;

function runUpdate(reason) {
  if (deployRunning) {
    log(`update already in progress; skipping (${reason})`);
    return;
  }
  deployRunning = true;
  log(`starting update (${reason})`);

  // Detached so the build does not block the HTTP response, and so a listener
  // restart would not kill a build in progress. `setsid` puts it in its own
  // session for the same reason.
  const child = spawn('setsid', [UPDATE_CMD], {
    detached: true,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  child.on('error', (err) => {
    log('failed to start the updater:', err.message);
    deployRunning = false;
  });
  child.on('exit', (code) => {
    log(`update finished with code ${code}`);
    deployRunning = false;
  });
  child.unref();
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url.split('?')[0] !== PATHNAME) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found\n');
    return;
  }

  const chunks = [];
  let size = 0;
  req.on('data', (chunk) => {
    size += chunk.length;
    // Refuse absurd payloads rather than buffering without limit.
    if (size > 25 * 1024 * 1024) {
      res.writeHead(413, { 'content-type': 'text/plain' });
      res.end('payload too large\n');
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });

  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const event = req.headers['x-github-event'] || '';

    if (SECRET) {
      const received = String(req.headers['x-hub-signature-256'] || '');
      const expected = 'sha256=' + crypto.createHmac('sha256', SECRET).update(body).digest('hex');
      if (!received || !signaturesMatch(expected, received)) {
        log('rejected: bad or missing signature');
        res.writeHead(401, { 'content-type': 'text/plain' });
        res.end('bad signature\n');
        return;
      }
    }

    if (event === 'ping') {
      log('ping received — the hook is wired up correctly');
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('pong\n');
      return;
    }

    if (event !== 'push') {
      log(`ignoring event "${event}"`);
      res.writeHead(204);
      res.end();
      return;
    }

    // Report which ref moved, so the log shows what triggered a deploy.
    let ref = '';
    try {
      const payload = JSON.parse(body.toString('utf8'));
      ref = payload.ref || '';
    } catch {
      /* a malformed body still passes the signature check above, so carry on */
    }

    log(`push to ${ref || '(unknown ref)'} — accepted`);
    res.writeHead(202, { 'content-type': 'text/plain' });
    res.end('deploying\n');
    runUpdate(ref || 'push');
  });

  req.on('error', (err) => log('request error:', err.message));
});

server.listen(PORT, '0.0.0.0', () => {
  log(`listening on 0.0.0.0:${PORT}${PATHNAME}`);
});

process.on('SIGTERM', () => {
  log('shutting down');
  server.close(() => process.exit(0));
});
