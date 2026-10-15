// Count requests by path prefix to find what is flooding the connection pool.
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const PORT = 9339;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/net-profile',
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

  const counts = new Map();
  ws.on('message', (m) => {
    const msg = JSON.parse(m);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Network.requestWillBeSent') {
      const u = msg.params.request.url;
      if (!u.includes('localhost')) return;
      const key = u.replace(/[0-9]+/g, 'N').replace(/\?.*/, '');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  });
  await send('Network.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4310' });
  await sleep(20000);

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  console.log('total distinct paths:', sorted.length);
  for (const [k, v] of sorted.slice(0, 25)) console.log(String(v).padStart(5), k);
  console.log('TOTAL REQUESTS:', [...counts.values()].reduce((a, b) => a + b, 0));
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
