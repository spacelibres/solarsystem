// Dump the real rendered DOM and computed styles of NASA Eyes once loaded,
// so the layout can be replicated from the actual output rather than guesses.
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const PORT = 9337;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/nasa-dom-profile',
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
  await send('Page.navigate', { url: 'https://eyes.nasa.gov/apps/solar-system/#/earth' });
  await sleep(30000);

  const script = `(() => {
    const out = { title: document.title, bodyClass: document.body.className };
    // Capture the outerHTML of the app shell, trimmed of long inline data.
    const shell = document.querySelector('#app') || document.body;
    out.html = shell.outerHTML.replace(/data:[^"']{80,}/g, 'data:...');
    // Computed styles for notable chrome elements.
    const styles = {};
    const sel = ['header','.header','nav','aside','footer','[class*=panel]','[class*=sidebar]','[class*=toolbar]','[class*=time]','[class*=menu]','[class*=legend]'];
    for (const s of sel) {
      const el = document.querySelector(s);
      if (!el) continue;
      const cs = getComputedStyle(el);
      styles[s] = {
        tag: el.tagName, cls: el.className, w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height,
        bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily, fontSize: cs.fontSize, position: cs.position,
        top: cs.top, left: cs.left, right: cs.right, bottom: cs.bottom, zIndex: cs.zIndex, display: cs.display,
      };
    }
    out.styles = styles;
    // Body/text colours for the palette.
    const bcs = getComputedStyle(document.body);
    out.body = { bg: bcs.backgroundColor, color: bcs.color, font: bcs.fontFamily };
    return JSON.stringify(out);
  })()`;

  const res = await send('Runtime.evaluate', { expression: script, returnByValue: true });
  const data = res.result?.result?.value;
  if (data) {
    fs.writeFileSync('/tmp/nasa-dom.json', data);
    const parsed = JSON.parse(data);
    console.log('title:', parsed.title);
    console.log('body:', JSON.stringify(parsed.body));
    console.log('html length:', parsed.html.length);
    console.log('style keys:', Object.keys(parsed.styles).join(', '));
  } else {
    console.log('no data', JSON.stringify(res).slice(0, 400));
  }

  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
