// Focused CDP capture: navigate to NASA Eyes Earth, log map/model/asset requests.
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const PORT = 9334;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/nasa-chrome-profile2',
  '--window-size=1600,1000',
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function getJSON(path, method = 'GET') {
  return new Promise((res, rej) => {
    const req = http.request({ host: '127.0.0.1', port: PORT, path, method }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 80))); } });
    });
    req.on('error', rej);
    req.end();
  });
}

(async () => {
  for (let i = 0; i < 40; i++) { try { await getJSON('/json/version'); break; } catch { await sleep(250); } }
  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  const urls = new Map();
  const send = (method, params = {}) => ws.send(JSON.stringify({ id: ++id, method, params }));
  let id = 0;
  await new Promise((r) => ws.on('open', r));
  ws.on('message', (m) => {
    const msg = JSON.parse(m);
    if (msg.method === 'Network.responseReceived') {
      const { url, status, mimeType } = msg.params.response;
      if (/eyes\.nasa\.gov/.test(url) && !/\.dyn($|\?)/.test(url)) urls.set(url, { status, mimeType });
    }
  });
  send('Network.enable');
  send('Page.enable');
  send('Page.navigate', { url: 'https://eyes.nasa.gov/apps/solar-system/#/earth' });
  await sleep(35000);
  const arr = [...urls.entries()].map(([url, meta]) => ({ url, ...meta }));
  fs.writeFileSync('/tmp/nasa-assets.json', JSON.stringify(arr, null, 1));
  console.log('captured', arr.length, 'asset responses');
  const byExt = {};
  for (const a of arr) { const e = (a.url.match(/\.([a-z0-9]+)($|\?)/i) || [, '?'])[1]; byExt[e] = (byExt[e] || 0) + 1; }
  console.log(JSON.stringify(byExt, null, 1));
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
