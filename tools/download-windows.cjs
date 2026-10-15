/**
 * Download only the dynamo segments the app needs at its start epoch.
 *
 * A full segment mirror would be ~106,000 files. The app loads one window per
 * controller at a time (see `lib/dynamo/loader.ts`), so mirroring the window for
 * the default simulation epoch is enough to run fully offline; other times pull
 * on demand, or can be pre-seeded by passing `--time`.
 *
 * Usage:
 *   node tools/download-windows.cjs [--mirror data/mirror] [--time <isoDate>]
 *                                   [--concurrency 12]
 */
const fs = require('fs');
const path = require('path');

const args = parseArgs(process.argv.slice(2));
const mirror = args.mirror || 'data/mirror';
const concurrency = Number(args.concurrency || 12);
const isoDate = args.time || '2026-01-01T00:00:00Z';
const atTime = (Date.parse(isoDate) - Date.UTC(2000, 0, 1, 12)) / 1000;

const BASE = 'https://eyes.nasa.gov/assets/dynamic/dynamo';

/** Parse an index file's segment start times and digit padding. */
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
  if (hasPoints !== 0) return null;

  const starts = [];
  for (let i = 0; i < count; i++) starts.push(f64());
  return { digits, starts };
}

const targets = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!entry.name.endsWith('.dyn')) continue;

    let info;
    try { info = readIndex(fs.readFileSync(full)); } catch { continue; }
    if (!info) continue;

    // Segment covering `atTime`, else the last one.
    let idx = 0;
    for (let i = 0; i < info.starts.length; i++) {
      if (info.starts[i] <= atTime) idx = i; else break;
    }
    const rel = path.relative(mirror, full).split(path.sep).join('/');
    const controller = rel.replace(/^dynamic\/dynamo\//, '').replace(/\/def\.dyn$/, '');
    const seg = String(idx).padStart(info.digits || 3, '0');
    targets.push(`${BASE}/${controller}/${seg}.dyn`);
  }
}

walk(path.join(mirror, 'dynamic', 'dynamo'));
console.log(`controllers with windows: ${targets.length}`);
console.log(`epoch: ${isoDate}  (t=${atTime.toFixed(0)}s)`);

let i = 0;
let ok = 0;
let skip = 0;
let fail = 0;

async function worker() {
  while (i < targets.length) {
    const url = targets[i++];
    const rel = url.replace(`${BASE}/`, '');
    const dest = path.join(mirror, 'dynamic', 'dynamo', rel);
    if (fs.existsSync(dest)) { skip++; continue; }
    try {
      const res = await fetch(url);
      if (!res.ok) { fail++; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      ok++;
    } catch {
      fail++;
    }
    if ((ok + skip + fail) % 50 === 0) {
      process.stderr.write(`${ok + skip + fail}/${targets.length}\r`);
    }
  }
}

(async () => {
  await Promise.all(Array.from({ length: concurrency }, worker));
  process.stderr.write('\n');
  console.log(`downloaded: ${ok}  skipped: ${skip}  failed: ${fail}`);
})();

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) { out[key] = next; i++; } else out[key] = true;
    }
  }
  return out;
}
