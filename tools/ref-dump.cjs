/**
 * Dump NASA's live scene state to a JSON file for systematic comparison.
 *
 * The reference clone at :8099 is the ground truth. This captures what the real
 * app actually instantiates, so our implementation can be diffed against it
 * rather than against an assumption about it.
 *
 * Usage: node tools/ref-dump.cjs [outFile]
 */
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const WS = require('ws');

const out = process.argv[2] || 'tools/out/ref-scene.json';
const CDP_PORT = Number(process.env.CDP_PORT || 9390);
const PAGE = 'http://localhost:8099/apps/solar-system/index.html';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (p, m = 'GET') =>
  new Promise((res, rej) => {
    const rq = http.request({ host: '127.0.0.1', port: CDP_PORT, path: p, method: m }, (r) => {
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
      '--use-gl=swiftshader',
      '--enable-unsafe-swiftshader',
      `--remote-debugging-port=${CDP_PORT}`,
      '--user-data-dir=/tmp/ref-dump-profile',
      '--window-size=1600,1000',
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
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
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
  await send('Runtime.enable');
  await send('Page.navigate', { url: PAGE });
  await sleep(30000);

  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return r.result?.result?.value;
  };

  const scene = await evaluate(`JSON.stringify((() => {
    const s = app.getManager('scene').main;
    const entities = [];
    for (let i = 0; i < s.getNumEntities(); i++) {
      const e = s.getEntityAt(i);
      const comps = [];
      for (let j = 0; j < e.getNumComponents(); j++) {
        const c = e.getComponentAt(j);
        comps.push({ type: c.constructor.name, enabled: c.getEnabled ? c.getEnabled() : null });
      }
      entities.push({
        name: e.getName(),
        radius: e.getRadius ? e.getRadius() : null,
        extentsRadius: e.getExtentsRadius ? e.getExtentsRadius() : null,
        occlusionRadius: e.getOcclusionRadius ? e.getOcclusionRadius() : null,
        parent: e.getParent ? (e.getParent() ? e.getParent().getName() : null) : null,
        components: comps,
      });
    }
    return {
      count: entities.length,
      entities,
    };
  })())`);

  const layers = await evaluate(`JSON.stringify((() => {
    const lm = app.getManager('layer');
    const out = {};
    for (const [k, v] of Object.entries(lm._layers || {})) {
      out[k] = {
        name: v.name, group: v.group, categories: v.categories,
        sublayers: v.sublayers, parent: v.parent,
        visible: v.visible, defaultVisibility: v.defaultVisibility,
      };
    }
    return { count: Object.keys(out).length, layers: out };
  })())`);

  const camera = await evaluate(`JSON.stringify((() => {
    const c = app.getManager('camera');
    return {
      keys: Object.keys(c || {}).slice(0, 40),
      fov: c?.fov, near: c?.near, far: c?.far,
    };
  })())`);

  const result = {
    capturedAt: new Date().toISOString(),
    source: PAGE,
    scene: JSON.parse(scene || '{}'),
    layers: JSON.parse(layers || '{}'),
    camera: JSON.parse(camera || '{}'),
  };

  fs.mkdirSync(require('path').dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
  console.log(`wrote ${out}`);
  console.log(`  entities: ${result.scene.count}`);
  console.log(`  layers:   ${result.layers.count}`);

  chrome.kill();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e.stack || e.message);
  process.exit(1);
});
