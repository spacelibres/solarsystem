/**
 * Boot the locally mirrored NASA Eyes app and report whether it runs offline.
 *
 * Loads `apps/solar-system/index.html` in headless Chrome, records every network
 * request, and reports which ones still leave the machine. If nothing is already
 * listening on the site port it serves `data/mirror/site/` itself; otherwise it
 * uses the server that is already there (handy when you keep one running for
 * manual inspection).
 *
 * Any request to a host other than our local server is a mirroring gap.
 *
 * Usage: node tools/verify-offline.cjs [--port 8099] [--seconds 40] [--external]
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i].startsWith('--')) args[process.argv[i].slice(2)] = process.argv[i + 1] ?? true;
}
const SITE_PORT = Number(args.port || 8099);
const CDP_PORT = Number(args.cdp || 9385);
const SECONDS = Number(args.seconds || 35);
const ROOT = path.join(__dirname, '..', 'data', 'mirror', 'site');
// `--external` boots against the real deployment instead of the mirror.
const PAGE = args.external
  ? 'https://eyes.nasa.gov/apps/solar-system/'
  : `http://localhost:${SITE_PORT}/apps/solar-system/index.html`;

/** Is something already serving that port? */
function portInUse(port) {
  return new Promise((res) => {
    const rq = http.request({ host: '127.0.0.1', port, path: '/', method: 'HEAD' }, () => res(true));
    rq.on('error', () => res(false));
    rq.end();
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Minimal static file server rooted at the mirror, with symlink traversal. */
function serve() {
  const types = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff': 'font/woff',
    '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.gltf': 'model/gltf+json',
    '.ktx2': 'image/ktx2', '.dyn': 'application/octet-stream',
  };
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = path.join(ROOT, urlPath);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('404 ' + urlPath);
        return;
      }
      res.writeHead(200, {
        'content-type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'access-control-allow-origin': '*',
      });
      res.end(data);
    });
  });
  return new Promise((r) => server.listen(SITE_PORT, () => r(server)));
}

const getJSON = (p, m = 'GET') =>
  new Promise((res, rej) => {
    const rq = http.request({ host: '127.0.0.1', port: CDP_PORT, path: p, method: m }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    });
    rq.on('error', rej);
    rq.end();
  });

(async () => {
  const already = await portInUse(SITE_PORT);
  const server = already ? null : await serve();
  if (already) console.log(`using the server already on :${SITE_PORT}`);
  else console.log(`serving ${ROOT} on :${SITE_PORT}`);

  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
    `--remote-debugging-port=${CDP_PORT}`,
    '--user-data-dir=/tmp/verify-offline-profile',
    '--window-size=1600,1000',
    'about:blank',
  ], { stdio: 'ignore' });

  for (let i = 0; i < 60; i++) {
    try { await getJSON('/json/version'); break; } catch { await sleep(250); }
  }

  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise((r) => ws.on('open', r));

  const local = [];
  const external = [];
  const errors = [];

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url;
      if (u.startsWith(`http://localhost:${SITE_PORT}`) || u.startsWith('data:') || u.startsWith('blob:')) {
        local.push(u);
      } else {
        external.push(u);
      }
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push((d.exception?.description || d.text || '').split('\n')[0].slice(0, 200));
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      errors.push(msg.params.entry.text.slice(0, 200));
    }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });

  await send('Network.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: PAGE });
  await sleep(SECONDS * 1000);

  const state = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      hasCanvas: !!document.querySelector('canvas'),
      hasConfig: typeof config !== 'undefined',
      hasApp: typeof window.app !== 'undefined',
      title: document.title,
      bodyText: document.body.innerText.slice(0, 160),
    })`,
    returnByValue: true,
  });

  console.log('\n=== page state ===');
  console.log(state.result?.result?.value);
  console.log(`\n=== requests: ${local.length} local, ${external.length} external ===`);
  if (external.length) {
    const hosts = {};
    for (const u of external) {
      try { hosts[new URL(u).hostname] = (hosts[new URL(u).hostname] || 0) + 1; } catch {}
    }
    console.log('external hosts:', JSON.stringify(hosts, null, 1));
    for (const u of external.slice(0, 12)) console.log('  ', u.slice(0, 140));
  }
  console.log(`\n=== errors: ${errors.length} ===`);
  for (const e of [...new Set(errors)].slice(0, 15)) console.log('  ', e);

  chrome.kill();
  if (server) server.close();
  process.exit(0);
})().catch((e) => { console.error('ERR', e.stack || e.message); process.exit(1); });
