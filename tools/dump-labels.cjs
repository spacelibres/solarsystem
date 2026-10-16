// Extract the exact computed styles of NASA's body labels and their icon
// geometry, so our labels can be matched precisely rather than approximated.
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const WS = require('ws');

const PORT = 9343;
const chrome = spawn('/usr/bin/google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
  '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/label-profile',
  '--window-size=1600,900', 'about:blank',
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

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'https://eyes.nasa.gov/apps/solar-system/#/home' });
  await sleep(32000);

  const script = `(() => {
    const out = { labels: [], icons: [] };
    // Every visible body label, with the label's own and its children's styles.
    document.querySelectorAll('.pioneer-label-div').forEach((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (cs.opacity === '0' || r.width === 0) return;
      const icon = el.querySelector('span.icon');
      const text = el.querySelector('span.text');
      const ics = icon ? getComputedStyle(icon) : null;
      const tcs = text ? getComputedStyle(text) : null;
      const ir = icon ? icon.getBoundingClientRect() : null;
      const tr = text ? text.getBoundingClientRect() : null;
      const bgImg = ics ? ics.backgroundImage : null;
      out.labels.push({
        cls: el.className.replace(/no-select |clickable|hidden |hiddenByLabelQuadtree/g, '').trim(),
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        fontSize: cs.fontSize, color: cs.color, letterSpacing: cs.letterSpacing,
        top: cs.top, left: cs.left, position: cs.position,
        text: text ? text.textContent : null,
        textStyle: tcs ? {
          fontSize: tcs.fontSize, fontWeight: tcs.fontWeight, letterSpacing: tcs.letterSpacing,
          textTransform: tcs.textTransform, color: tcs.color,
          textShadow: tcs.textShadow, opacity: tcs.opacity,
        } : null,
        iconStyle: ics ? {
          width: ics.width, height: ics.height,
          transform: ics.transform, opacity: ics.opacity,
          backgroundImage: bgImg ? bgImg.slice(0, 80) : null,
          backgroundSize: ics.backgroundSize, backgroundPosition: ics.backgroundPosition,
        } : null,
        iconBox: ir ? { x: Math.round(ir.x), y: Math.round(ir.y), w: Math.round(ir.width), h: Math.round(ir.height) } : null,
        textBox: tr ? { x: Math.round(tr.x), y: Math.round(tr.y), w: Math.round(tr.width), h: Math.round(tr.height) } : null,
      });
    });
    // The body icon sprites themselves.
    document.querySelectorAll('span.icon.icon-circle-earth, span.icon.icon-circle-jupiter, span.icon.icon-circle-sun').forEach((el) => {
      const cs = getComputedStyle(el);
      out.icons.push({ cls: el.className, bg: cs.backgroundImage ? cs.backgroundImage.slice(0, 90) : null, size: cs.backgroundSize, pos: cs.backgroundPosition, w: cs.width, h: cs.height });
    });
    return JSON.stringify(out);
  })()`;

  const res = await send('Runtime.evaluate', { expression: script, returnByValue: true });
  const data = res.result?.result?.value;
  if (data) {
    fs.writeFileSync('/tmp/nasa-labels.json', data);
    const p = JSON.parse(data);
    console.log('labels:', p.labels.length);
    for (const l of p.labels.slice(0, 5)) {
      console.log('\n== ' + l.cls);
      console.log('  box', l.x, l.y, l.w + 'x' + l.h, '| font', l.fontSize, l.color, 'ls', l.letterSpacing);
      console.log('  text:', JSON.stringify(l.text));
      console.log('  textStyle:', JSON.stringify(l.textStyle));
      console.log('  iconStyle:', JSON.stringify(l.iconStyle));
      console.log('  iconBox:', JSON.stringify(l.iconBox), ' textBox:', JSON.stringify(l.textBox));
    }
  } else {
    console.log('no data', JSON.stringify(res).slice(0, 300));
  }
  chrome.kill(); process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(1); });
