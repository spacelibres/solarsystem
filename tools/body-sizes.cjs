// Report on-screen pixel sizes of every loaded body, to confirm which species
// of body are too small to see at the default framing.
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const PORT = 9340;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/size-profile',
  '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (p, m = 'GET') => new Promise((res, rej) => {
  const rq = http.request({ host: '127.0.0.1', port: PORT, path: p, method: m }, (r) => {
    let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
  }); rq.on('error', rej); rq.end();
});

(async () => {
  for (let i = 0; i < 40; i++) { try { await getJSON('/json/version'); break; } catch { await sleep(250); } }
  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const pending = new Map();
  const send = (m, p = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  await new Promise((r) => ws.on('open', r));
  ws.on('message', (m) => {
    const msg = JSON.parse(m);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4310' });
  await sleep(22000);

  const script = `(() => {
    const el = document.querySelector('.ns-canvas canvas');
    if (!el) return JSON.stringify({ error: 'no canvas' });
    // Reach into the scene via the debug hook the viewer exposes.
    const dbg = window.__solarDebug;
    if (!dbg) return JSON.stringify({ error: 'no debug hook' });
    return JSON.stringify(dbg.report());
  })()`;
  const res = await send('Runtime.evaluate', { expression: script, returnByValue: true });
  console.log(res.result?.result?.value ?? JSON.stringify(res).slice(0, 300));
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
