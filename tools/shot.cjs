// Full-viewport screenshot of a route, after optional interactions. No cropping:
// the point is to look at the whole frame, not a slice of it.
//
// Usage: node tools/shot.cjs <url> <out.png> [waitMs] [jsBefore]
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const url = process.argv[2] || 'http://127.0.0.1:4399/';
const out = process.argv[3] || 'artifacts/shot.png';
const waitMs = Number(process.argv[4] || 18000);
const before = process.argv[5] || '';
const W = Number(process.env.W || 1600);
const H = Number(process.env.H || 1000);
const PORT = Number(process.env.CDP_PORT || 9521);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (p, m = 'GET') =>
  new Promise((res, rej) => {
    const rq = http.request({ host: '127.0.0.1', port: PORT, path: p, method: m }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => {
        try {
          res(JSON.parse(d));
        } catch (e) {
          rej(e);
        }
      });
    });
    rq.on('error', rej);
    rq.end();
  });

(async () => {
  const ch = spawn(
    '/usr/bin/google-chrome',
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--use-gl=swiftshader',
      '--enable-unsafe-swiftshader',
      '--user-data-dir=/tmp/shot-profile',
      `--window-size=${W},${H}`,
      `--remote-debugging-port=${PORT}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  for (let i = 0; i < 80; i++) {
    try {
      await getJSON('/json/version');
      break;
    } catch {
      await sleep(250);
    }
  }

  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pend = new Map();
  const errs = [];
  const send = (m, p = {}) =>
    new Promise((r) => {
      const i = ++id;
      pend.set(i, r);
      ws.send(JSON.stringify({ id: i, method: m, params: p }));
    });
  await new Promise((r) => ws.on('open', r));
  ws.on('message', (raw) => {
    const m = JSON.parse(raw);
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      errs.push((d.exception?.description || d.text || '').split('\n')[0]);
    }
    if (m.id && pend.has(m.id)) {
      pend.get(m.id)(m);
      pend.delete(m.id);
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url });
  await sleep(waitMs);

  if (before) {
    await send('Runtime.evaluate', { expression: before, awaitPromise: true });
    await sleep(6000);
  }

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  require('fs').writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log(`-> ${out}  (${W}x${H})`);
  if (errs.length) {
    console.log(`exceptions: ${errs.length}`);
    errs.slice(0, 4).forEach((e) => console.log('  ', e));
  }

  ws.close();
  ch.kill();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(1);
});
