// Focus a body, then screenshot, to inspect close-range surface detail
// (rings, cloud shell, night lights).
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const [, , target = 'saturn', out = '/tmp/focus.png'] = process.argv;
const PORT = 9342;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/focus-profile',
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

  // Search for the body and select it through the real UI path.
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const dbg = window.__solarDebug;
      if (!dbg || !dbg.focus) return 'no focus hook';
      dbg.focus(${JSON.stringify(target)});
      return 'focused';
    })()`,
    returnByValue: true,
  });
  console.log('focus ->', res.result?.result?.value);
  await sleep(6000);

  const cam = await send('Runtime.evaluate', {
    expression: `JSON.stringify(window.__solarDebug.camera())`,
    returnByValue: true,
  });
  console.log('camera ->', cam.result?.result?.value);

  const insp = await send('Runtime.evaluate', {
    expression: `JSON.stringify(window.__solarDebug.inspect(${JSON.stringify(target)}))`,
    returnByValue: true,
  });
  console.log('inspect ->', insp.result?.result?.value);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log('screenshot ->', out);
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
