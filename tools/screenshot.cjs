// Capture a screenshot and report every request host, to prove the app is
// fully local (no eyes.nasa.gov requests at runtime).
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const [, , url = 'http://localhost:4310', out = '/tmp/shot.png', waitMs = '14000'] = process.argv;
const PORT = 9336;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/shot-profile-local',
  '--window-size=1440,900',
  'about:blank',
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
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise((r) => ws.on('open', r));

  const hosts = new Map();
  const errors = [];
  const failed = [];
  ws.on('message', (m) => {
    const msg = JSON.parse(m);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Network.responseReceived') {
      try { const h = new URL(msg.params.response.url).host; hosts.set(h, (hosts.get(h) || 0) + 1); } catch {}
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      errors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
    }
    if (msg.method === 'Network.loadingFailed') failed.push(msg.params.errorText);
  });

  await send('Runtime.enable');
  await send('Network.enable');
  await send('Page.enable');
  await send('Page.navigate', { url });
  await sleep(Number(waitMs));

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));

  console.log('screenshot ->', out);
  console.log('request hosts:', JSON.stringify([...hosts.entries()]));
  console.log('nasa requests:', [...hosts.keys()].filter((h) => /nasa\.gov/.test(h)).length);
  console.log('exceptions:', errors.length ? errors.slice(0, 5) : '(none)');
  console.log('failed requests:', failed.length ? failed.slice(0, 5) : '(none)');
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
