/**
 * Run the locally mirrored NASA Eyes and interrogate its live runtime.
 *
 * This is the "reference oracle": we boot the real app offline and read its
 * actual state — scene entities, component names, layer definitions, label
 * styling, camera maths — instead of inferring any of it.
 *
 * Usage:
 *   node tools/probe-app.cjs errors                  # JS errors with stack traces
 *   node tools/probe-app.cjs entities                # scene entity list + fields
 *   node tools/probe-app.cjs entity <id>             # one entity in detail
 *   node tools/probe-app.cjs layers                  # live LayerManager state
 *   node tools/probe-app.cjs labels                  # label DOM + computed styles
 *   node tools/probe-app.cjs managers                # every manager/component name
 *   node tools/probe-app.cjs eval "<expression>"     # run anything in page context
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const [, , cmd = 'errors', arg] = process.argv;
const SITE_PORT = 8099;
const CDP_PORT = Number(process.env.CDP_PORT || 9390);
const PAGE = `http://localhost:${SITE_PORT}/apps/solar-system/index.html`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (p, m = 'GET') =>
  new Promise((res, rej) => {
    const rq = http.request({ host: '127.0.0.1', port: CDP_PORT, path: p, method: m }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    });
    rq.on('error', rej);
    rq.end();
  });

(async () => {
  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
    `--remote-debugging-port=${CDP_PORT}`,
    '--user-data-dir=/tmp/probe-app-profile',
    '--window-size=1600,1000',
    'about:blank',
  ], { stdio: 'ignore' });

  for (let i = 0; i < 60; i++) {
    try { await getJSON('/json/version'); break; } catch { await sleep(250); }
  }

  const tab = await getJSON('/json/new?about:blank', 'PUT');
  const ws = new WS(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise((r) => ws.on('open', r));

  const exceptions = [];
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      exceptions.push({
        text: d.text,
        desc: d.exception?.description,
        url: d.url,
        line: d.lineNumber,
        col: d.columnNumber,
        stack: d.stackTrace?.callFrames?.slice(0, 6).map((f) => `${f.functionName || '(anon)'} @ ${f.url}:${f.lineNumber}:${f.columnNumber}`),
      });
    }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  await send('Page.navigate', { url: PAGE });
  await sleep(30000);

  /** Evaluate an expression in the page and return its value. */
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) {
      return { error: r.result.exceptionDetails.exception?.description };
    }
    return r.result?.result?.value;
  };

  const probes = {
    errors: `JSON.stringify(${JSON.stringify(exceptions)}, null, 1)`,

    entities: `(() => {
      const scene = app.getManager('scene').main;
      const out = [];
      for (let i = 0; i < scene.getNumEntities(); i++) {
        const e = scene.getEntityAt(i);
        out.push({
          name: e.getName(),
          radius: e.getRadius?.(),
          extentsRadius: e.getExtentsRadius?.(),
          occlusionRadius: e.getOcclusionRadius?.(),
          components: (() => {
            const c = [];
            for (let j = 0; j < e.getNumComponents(); j++) c.push(e.getComponentAt(j).constructor.name);
            return c;
          })(),
        });
      }
      return JSON.stringify({ count: out.length, entities: out }, null, 1);
    })()`,

    layers: `(() => {
      const lm = app.getManager('layer');
      const out = {};
      for (const [k, v] of Object.entries(lm._layers || {})) {
        out[k] = { name: v.name, group: v.group, categories: v.categories,
                   sublayers: v.sublayers, parent: v.parent,
                   visible: v.visible, defaultVisibility: v.defaultVisibility };
      }
      return JSON.stringify({ count: Object.keys(out).length, layers: out }, null, 1);
    })()`,

    labels: `(() => {
      const out = [];
      for (const d of document.querySelectorAll('#pioneer .label, .pioneer-label-div, [class*="label"]')) {
        const t = d.querySelector('.text');
        if (!t) continue;
        const cs = getComputedStyle(t);
        const r = d.getBoundingClientRect();
        out.push({
          text: t.textContent, cls: d.className,
          box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
          font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight,
          tracking: cs.letterSpacing, transform: cs.textTransform,
          color: cs.color, opacity: cs.opacity, shadow: cs.textShadow,
        });
        if (out.length > 40) break;
      }
      return JSON.stringify({ count: out.length, labels: out }, null, 1);
    })()`,

    managers: `(() => {
      const out = {};
      for (const [k, v] of Object.entries(app._managers || {})) out[k] = v?.constructor?.name;
      const comps = {};
      for (const [k, v] of Object.entries(app._components || {})) comps[k] = v?.constructor?.name;
      return JSON.stringify({ managers: out, components: comps }, null, 1);
    })()`,
  };

  if (cmd === 'eval') {
    const value = await evaluate(arg);
    console.log(typeof value === 'string' ? value : JSON.stringify(value, null, 1));
  } else if (cmd === 'entity') {
    const value = await evaluate(`(() => {
      const scene = app.getManager('scene').main;
      const e = scene.getEntity(${JSON.stringify(arg)});
      if (!e) return JSON.stringify({ error: 'no entity ' + ${JSON.stringify(arg)} });
      const info = { name: e.getName() };
      for (const k of Object.keys(e)) {
        try { const v = e[k]; if (typeof v !== 'function') info[k] = v; } catch {}
      }
      return JSON.stringify(info, (k, v) => {
        if (v && v.constructor && !['Object','Array','String','Number','Boolean'].includes(v.constructor.name)) {
          return '[' + v.constructor.name + ']';
        }
        return v;
      }, 1);
    })()`);
    console.log(value);
  } else if (probes[cmd]) {
    console.log(await evaluate(probes[cmd]));
  } else {
    console.log('usage: probe-app.cjs errors | entities | entity <id> | layers | labels | managers | eval <expr>');
  }

  chrome.kill();
  process.exit(0);
})().catch((e) => { console.error('ERR', e.stack || e.message); process.exit(1); });
