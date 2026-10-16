/**
 * Mirror a specific set of dynamo controllers (index files plus their windows).
 *
 * `download-mirror.cjs` covers the static inventory; `download-windows.cjs`
 * seeds one window per already-mirrored index. This script pulls a named set of
 * controllers from scratch — useful when the app starts loading new bodies
 * (featured-story targets, for instance) that were not in the first pass.
 *
 * Usage:
 *   node tools/mirror-controllers.cjs <controller/1/def.dyn> [more...]
 *                                   [--time 2026-01-01T00:00:00Z]
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const controllers = args.filter((a) => !a.startsWith('--'));
const timeIdx = args.indexOf('--time');
const isoDate = timeIdx >= 0 ? args[timeIdx + 1] : '2026-01-01T00:00:00Z';
const atTime = (Date.parse(isoDate) - Date.UTC(2000, 0, 1, 12)) / 1000;

const BASE = 'https://eyes.nasa.gov/assets/dynamic/dynamo';
const MIRROR = 'data/mirror/dynamic/dynamo';

/** Read an index file's point type and segment starts. */
function readIndex(buf) {
  let o = 0;
  const i16 = () => { const v = buf.readInt16LE(o); o += 2; return v; };
  const u8 = () => buf.readUInt8(o++);
  const i32 = () => { const v = buf.readInt32LE(o); o += 4; return v; };
  const f64 = () => { const v = buf.readDoubleLE(o); o += 8; return v; };
  const str = () => { let s = ''; for (;;) { const c = u8(); if (!c) break; s += String.fromCharCode(c); } return s; };

  const version = i16();
  const name = str();
  const digits = version === 2 ? u8() : 0;
  if (name === 'orb') { f64(); f64(); }
  const hasPoints = u8();
  const count = i32();
  if (hasPoints !== 0) return { digits, starts: null };
  const starts = [];
  for (let i = 0; i < count; i++) starts.push(f64());
  return { digits, starts };
}

async function fetchTo(url, dest) {
  if (fs.existsSync(dest)) return 'skip';
  try {
    const res = await fetch(url);
    if (!res.ok) return `http ${res.status}`;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    return 'ok';
  } catch (err) {
    return `err ${err.message}`;
  }
}

(async () => {
  for (const controller of controllers) {
    const dest = path.join(MIRROR, controller);
    const r = await fetchTo(`${BASE}/${controller}`, dest);
    console.log(`${r.padEnd(12)} ${controller}`);
    if (r !== 'ok' && r !== 'skip') continue;

    if (r === 'skip' && !fs.existsSync(dest)) continue;

    let info;
    try {
      info = readIndex(fs.readFileSync(dest));
    } catch {
      continue;
    }
    if (!info.starts) continue;

    const dir = path.dirname(controller);
    let idx = 0;
    for (let i = 0; i < info.starts.length; i++) {
      if (info.starts[i] <= atTime) idx = i;
      else break;
    }
    const seg = String(idx).padStart(info.digits || 3, '0');
    const segRel = path.join(dir, `${seg}.dyn`);
    const sr = await fetchTo(`${BASE}/${segRel}`, path.join(MIRROR, segRel));
    console.log(`${sr.padEnd(12)} ${segRel}`);
  }
})();
