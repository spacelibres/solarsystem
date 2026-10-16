// Screenshot the spacelibre logo at its real display sizes, for the VI check.
// Usage: node tools/logo-shot.cjs [baseUrl] [outPrefix]
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const base = process.argv[2] || 'http://127.0.0.1:4399';
const prefix = process.argv[3] || '/tmp/logo';
const PORT = Number(process.env.CDP_PORT || 9455);
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
  const chrome = spawn(
    '/usr/bin/google-chrome',
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--user-data-dir=/tmp/logo-shot-profile',
      '--window-size=1440,340',
      `--remote-debugging-port=${PORT}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  for (let i = 0; i < 60; i++) {
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
  const pending = new Map();
  const send = (m, p = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method: m, params: p }));
    });
  await new Promise((r) => ws.on('open', r));
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });

  await send('Page.enable');

  // 1. The mark as the app actually renders it.
  await send('Page.navigate', { url: `${base}/` });
  await sleep(6000);
  const box = await send('Runtime.evaluate', {
    expression: `JSON.stringify((()=>{const i=document.querySelector('img[alt="spacelibre"]');
      if(!i)return null;const r=i.getBoundingClientRect();
      return {x:r.x,y:r.y,w:r.width,h:r.height};})())`,
    returnByValue: true,
  });
  const rect = JSON.parse(box.result?.result?.value || 'null');
  if (rect) {
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 3 },
    });
    require('fs').writeFileSync(`${prefix}-app.png`, Buffer.from(shot.result.data, 'base64'));
    console.log(`app mark: ${rect.w}x${rect.h} -> ${prefix}-app.png`);
  } else {
    console.log('app mark: not found');
  }

  // 2. Every approved master, on the surface it is meant for, at real sizes.
  const rows = [
    { label: 'dark surface', bg: '#0D1721', ink: 'white' },
    { label: 'light surface', bg: '#F1F5F9', ink: 'black' },
    { label: 'full colour', bg: '#FFFFFF', ink: 'primary' },
    { label: 'navy', bg: '#F1F5F9', ink: 'navy' },
  ];
  const html = `<body style="margin:0;font:12px Arial;background:#fff">
    ${rows
      .map(
        (r) => `<div style="padding:16px 24px;background:${r.bg}">
      <div style="display:flex;align-items:center;gap:28px">
        <img src="${base}/brand/horizontal-${r.ink}.svg" width="240">
        <img src="${base}/brand/stacked-${r.ink}.svg" width="120">
        <img src="${base}/brand/icon-${r.ink}.svg" width="64" height="64">
        <img src="${base}/brand/icon-${r.ink}.svg" width="32" height="32">
        <img src="${base}/brand/icon-${r.ink}.svg" width="24" height="24">
        <img src="${base}/brand/icon-${r.ink}.svg" width="16" height="16">
      </div>
    </div>`,
      )
      .join('')}
  </body>`;
  // Serve the grid from the app itself so the brand paths resolve the same way
  // they do in production, rather than from about:blank where they do not.
  await send('Page.navigate', { url: `${base}/` });
  await sleep(1500);
  await send('Runtime.evaluate', {
    expression: `(() => {
      document.head.innerHTML = '<meta charset="utf-8">';
      document.body.innerHTML = ${JSON.stringify(html)};
      document.body.style.margin = '0';
    })()`,
  });
  await sleep(2500);
  const loaded = await send('Runtime.evaluate', {
    expression: `JSON.stringify([...document.images].map(i => [i.src, i.naturalWidth]))`,
    returnByValue: true,
  });
  console.log('images:', loaded.result?.result?.value);
  const grid = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 760, height: 340, scale: 2 },
  });
  require('fs').writeFileSync(`${prefix}-sizes.png`, Buffer.from(grid.result.data, 'base64'));
  console.log(`masters grid -> ${prefix}-sizes.png`);

  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
