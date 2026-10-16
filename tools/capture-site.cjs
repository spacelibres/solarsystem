/**
 * Capture NASA Eyes on the Solar System completely, so it can run offline.
 *
 * Everything the app requests — the HTML shell, every JS chunk, CSS, JSON,
 * font, image, texture, model and ephemeris — is recorded through Chrome
 * DevTools Protocol and written under `data/mirror-src/` preserving the URL
 * path. The result is a byte-faithful mirror of the deployed site, which is the
 * prerequisite for de-obfuscating the JS: you cannot recover a name you do not
 * have the code for.
 *
 * Two hosts are captured:
 *   https://eyes.nasa.gov/apps/solar-system/**   the app itself
 *   https://eyes.nasa.gov/assets/**              static + dynamic assets
 *
 * Usage:
 *   node tools/capture-site.cjs                 # full capture
 *   node tools/capture-site.cjs --seconds 90    # let the page run longer
 *   node tools/capture-site.cjs --out data/mirror-src
 *
 * Resumable: existing files with a non-zero size are skipped.
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const args = parseArgs(process.argv.slice(2));
const OUT = args.out || 'data/mirror/site';
const PORT = Number(args.port || 9380);
const RUN_SECONDS = Number(args.seconds || 75);
const START_URL = 'https://eyes.nasa.gov/apps/solar-system/';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1] ?? true;
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getJSON = (p, m = 'GET') =>
  new Promise((res, rej) => {
    const rq = http.request({ host: '127.0.0.1', port: PORT, path: p, method: m }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => {
        try { res(JSON.parse(d)); } catch (e) { rej(e); }
      });
    });
    rq.on('error', rej);
    rq.end();
  });

/** Map an absolute URL to a local path under OUT. */
function localPathFor(url) {
  const u = new URL(url);
  let p = u.pathname;
  // /apps/solar-system/app.js      -> apps/solar-system/app.js
  // /assets/static/maps/...        -> assets/static/maps/...
  p = p.replace(/^\/+/, '');
  if (p.endsWith('/')) p += 'index.html';
  // Keep query strings that distinguish resources (cache-busting ?v= does not).
  if (u.search && !/^\?v=/.test(u.search)) {
    p += u.search.replace(/[?&=]/g, '_');
  }
  return path.join(OUT, decodeURIComponent(p));
}

/** Only capture the two hosts we care about. */
function wanted(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== 'eyes.nasa.gov') return false;
    return u.pathname.startsWith('/apps/solar-system') || u.pathname.startsWith('/assets/');
  } catch {
    return false;
  }
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=/tmp/capture-site-profile',
    '--window-size=1600,1000',
    'about:blank',
  ], { stdio: 'ignore' });

  for (let i = 0; i < 60; i++) {
    try { await getJSON('/json/version'); break; } catch { await sleep(250); }
  }

  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 512 * 1024 * 1024 });
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await new Promise((r) => ws.on('open', r));

  // Track which requests we have already saved to avoid duplicate work.
  const saved = new Set();
  const stats = { saved: 0, skipped: 0, failed: 0, bytes: 0, byType: {} };
  /** requestId -> {url, mimeType} for responses still needing a body. */
  const inflight = new Map();

  ws.on('message', async (raw) => {
    const msg = JSON.parse(raw);

    if (msg.method === 'Network.responseReceived') {
      const { requestId, response } = msg.params;
      if (!wanted(response.url)) return;
      inflight.set(requestId, { url: response.url, mimeType: response.mimeType, status: response.status });
      return;
    }

    if (msg.method === 'Network.loadingFinished') {
      const { requestId } = msg.params;
      const info = inflight.get(requestId);
      if (!info) return;
      inflight.delete(requestId);

      if (saved.has(info.url)) { stats.skipped++; return; }
      const dest = localPathFor(info.url);

      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        saved.add(info.url);
        stats.skipped++;
        return;
      }

      try {
        const body = await send('Network.getResponseBody', { requestId });
        const data = body.result?.body;
        if (data == null) { stats.failed++; return; }
        const buf = body.result.base64Encoded
          ? Buffer.from(data, 'base64')
          : Buffer.from(data, 'utf8');
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        saved.add(info.url);
        stats.saved++;
        stats.bytes += buf.length;
        const kind = (info.mimeType || 'unknown').split(';')[0];
        stats.byType[kind] = (stats.byType[kind] || 0) + 1;
      } catch (e) {
        stats.failed++;
        console.error('  ! body failed:', info.url.slice(0, 110), e.message);
      }
      return;
    }

    if (msg.method === 'Network.loadingFailed') {
      inflight.delete(msg.params.requestId);
      return;
    }

    if (msg.id && pending.has(msg.id)) {
      const res = pending.get(msg.id);
      pending.delete(msg.id);
      res(msg);
    }
  });

  await send('Network.enable');
  await send('Page.enable');

  console.log('capturing', START_URL);
  await send('Page.navigate', { url: START_URL });

  // Let the app boot and stream assets. The scene loads ephemerides lazily as
  // bodies come into view, so we also visit the main routes to widen coverage.
  await sleep(25000);

  const routes = [
    '#/earth', '#/jupiter', '#/saturn', '#/mars', '#/moon',
    '#/sc_voyager_1', '#/sc_juno', '#/mercury', '#/venus', '#/neptune', '#/uranus',
  ];
  for (const r of routes) {
    try {
      await send('Runtime.evaluate', { expression: `location.hash=${JSON.stringify(r)}` });
    } catch { /* ignore */ }
    await sleep(1500);
  }

  console.log(`letting it run ${RUN_SECONDS}s more`);
  await sleep(RUN_SECONDS * 1000);

  // Flush anything still inflight.
  for (let i = 0; i < 40 && inflight.size > 0; i++) await sleep(500);

  console.log('\n=== capture summary ===');
  console.log('saved  ', stats.saved, `(${(stats.bytes / 1e6).toFixed(1)} MB)`);
  console.log('skipped', stats.skipped);
  console.log('failed ', stats.failed);
  console.log('by mime', JSON.stringify(stats.byType, null, 1));

  chrome.kill();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e.stack || e.message);
  process.exit(1);
});
