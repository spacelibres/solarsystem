// Click a body label point and confirm the viewer focuses it.
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const PORT = 9341;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/click-profile',
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

  // Ask the scene for each body's exact screen position, then click Jupiter.
  const find = await send('Runtime.evaluate', {
    expression: `(() => {
      const dbg = window.__solarDebug;
      if (!dbg || !dbg.screenPositions) return 'no hook';
      const list = dbg.screenPositions();
      return JSON.stringify(list.filter(x => ['jupiter','earth','moon','saturn'].includes(x.id)));
    })()`,
    returnByValue: true,
  });
  console.log('screen positions:', find.result?.result?.value);

  const box = await send('Runtime.evaluate', {
    expression: `(() => { const c = document.querySelector('.ns-canvas canvas'); const b = c.getBoundingClientRect(); return JSON.stringify({x:b.x,y:b.y,w:b.width,h:b.height}); })()`,
    returnByValue: true,
  });
  const rect = JSON.parse(box.result.result.value);
  const list = JSON.parse(find.result.result.value);
  const target = list.find((x) => x.id === 'jupiter');
  const cx = rect.x + target.x;
  const cy = rect.y + target.y;
  console.log('clicking at', cx.toFixed(0), cy.toFixed(0));

  // Exercise selection through the scene's own pick path.
  const clicked = await send('Runtime.evaluate', {
    expression: `(() => { window.__solarDebug.pick(${target.x}, ${target.y}); return 'ok'; })()`,
    returnByValue: true,
  });
  console.log('pick result:', clicked.result?.result?.value);
  await sleep(4000);

  const after = await send('Runtime.evaluate', {
    expression: `document.querySelector('.ns-panel__name')?.textContent ?? '(no panel)'`,
    returnByValue: true,
  });
  console.log('panel title after click:', after.result?.result?.value);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/click-result.png', Buffer.from(shot.result.data, 'base64'));
  console.log('screenshot -> /tmp/click-result.png');
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
