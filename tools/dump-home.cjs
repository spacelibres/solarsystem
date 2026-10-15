// Dump the NASA Eyes home view: DOM, computed styles of every UI region, and
// the exact text/labels the interface shows. Used as the replica checklist.
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const [, , targetUrl = 'https://eyes.nasa.gov/apps/solar-system/#/home'] = process.argv;
const PORT = 9338;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/nasa-home-profile',
  '--window-size=1600,900',
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
  ws.on('message', (m) => {
    const msg = JSON.parse(m);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: targetUrl });
  await sleep(32000);

  const script = `(() => {
    const vis = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.01 && r.width > 0 && r.height > 0;
    };
    const out = { url: location.href, title: document.title, regions: [], texts: [] };

    // Every visible region carrying a class, with its box and key styles.
    const seen = new Set();
    document.querySelectorAll('header, nav, aside, footer, [class]').forEach((el) => {
      if (!vis(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      const cs = getComputedStyle(el);
      const key = el.tagName + '|' + el.className + '|' + Math.round(r.x) + ',' + Math.round(r.y);
      if (seen.has(key)) return;
      seen.add(key);
      const cls = typeof el.className === 'string' ? el.className : '';
      if (!cls) return;
      out.regions.push({
        tag: el.tagName, cls,
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily,
        fontSize: cs.fontSize, fontWeight: cs.fontWeight, position: cs.position,
        z: cs.zIndex, opacity: cs.opacity, border: cs.border, radius: cs.borderRadius,
        display: cs.display,
      });
    });

    // Visible text strings in the chrome (skip the 3D label layer).
    const labelLayer = document.querySelector('#main-viewport');
    document.querySelectorAll('button, h1, h2, h3, h4, h5, li, span, a, time, label, input, code, p').forEach((el) => {
      if (labelLayer && labelLayer.contains(el)) return;
      if (!vis(el)) return;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const t = (el.tagName === 'INPUT' ? el.placeholder || el.value : el.textContent || '').trim();
      if (!t || t.length > 90) return;
      out.texts.push({
        tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '',
        text: t, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        fontSize: cs.fontSize, color: cs.color, fontWeight: cs.fontWeight, transform: cs.textTransform,
        letterSpacing: cs.letterSpacing, align: cs.textAlign,
      });
    });
    return JSON.stringify(out);
  })()`;

  const res = await send('Runtime.evaluate', { expression: script, returnByValue: true });
  const data = res.result?.result?.value;
  if (data) {
    fs.writeFileSync('/tmp/nasa-home.json', data);
    const p = JSON.parse(data);
    console.log('url:', p.url);
    console.log('regions:', p.regions.length, ' texts:', p.texts.length);
  } else {
    console.log('no data', JSON.stringify(res).slice(0, 300));
  }
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/nasa-home.png', Buffer.from(shot.result.data, 'base64'));
  console.log('screenshot -> /tmp/nasa-home.png');
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
