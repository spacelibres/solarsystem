// Boot the cached NASA Eyes clone and report its health. Reference only — this
// never touches our own app. Usage: node tools/ref-health.cjs
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const URL = process.argv[2] || 'http://127.0.0.1:8099/apps/solar-system/index.html#/inner_solar_system';
const PORT = Number(process.env.CDP_PORT || 9511);
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
      '--user-data-dir=/tmp/ref-health',
      '--window-size=1600,1000',
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
  const failed = [];
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
      errs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    }
    if (m.method === 'Network.loadingFailed') {
      failed.push(m.params.errorText);
    }
    if (m.id && pend.has(m.id)) {
      pend.get(m.id)(m);
      pend.delete(m.id);
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Page.navigate', { url: URL });
  await sleep(30000);

  const state = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      canvas: !!document.querySelector('#pioneer'),
      loading: (()=>{const e=document.querySelector('#loading-screen');return e?getComputedStyle(e).display:'absent'})(),
      hasPioneer: !!document.querySelector('#pioneer'),
      bodyChildren: document.body.children.length,
      title: document.title,
    })`,
    returnByValue: true,
  });
  console.log('state:', state.result?.result?.value);
  console.log('exceptions:', errs.length);
  errs.slice(0, 5).forEach((e) => console.log('  ', String(e).split('\n')[0]));
  console.log('failed requests:', failed.length);
  failed.slice(0, 5).forEach((e) => console.log('  ', e));

  // What does the reference actually contain?
  const api = await send('Runtime.evaluate', {
    expression: `(() => {
      const keys = Object.keys(window).filter(k => /^(app|system|viewer|config|Kernel|Nasa)/i.test(k));
      return JSON.stringify({ suspects: keys.slice(0, 30), hasConfig: typeof config !== 'undefined' });
    })()`,
    returnByValue: true,
  });
  console.log('globals:', api.result?.result?.value);

  ws.close();
  ch.kill();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(1);
});
