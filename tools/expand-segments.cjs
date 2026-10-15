/**
 * Expand the mirror manifest with dynamo index segments.
 *
 * Many `.dyn` controllers are *index* files listing hundreds of windows, each
 * stored as a separate `<kind>/<NNN>.dyn`. NASA downloads them lazily; we mirror
 * them so the app never reaches the network. This walks every index file already
 * in `data/mirror/`, parses its segment count, and appends the segment URLs.
 *
 * Usage: node tools/expand-segments.cjs [--mirror data/mirror] [--manifest tools/out/manifest.json]
 */
const fs = require('fs');
const path = require('path');

const args = parseArgs(process.argv.slice(2));
const mirror = args.mirror || 'data/mirror';
const manifestPath = args.manifest || 'tools/out/manifest.json';

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

/** Minimal header read: version, name, digits, then hasPoints/segments. */
function readIndexInfo(buf) {
  let o = 0;
  const i16 = () => { const v = buf.readInt16LE(o); o += 2; return v; };
  const u8 = () => buf.readUInt8(o++);
  const i32 = () => { const v = buf.readInt32LE(o); o += 4; return v; };
  const f64 = () => { o += 8; };
  const str = () => { let s = ''; for (;;) { const c = u8(); if (!c) break; s += String.fromCharCode(c); } return s; };

  const version = i16();
  const name = str();
  const digits = version === 2 ? u8() : 0;
  if (name === 'orb') { f64(); f64(); }
  const hasPoints = u8();
  const count = i32();
  return { name, digits, hasPoints, count };
}

const added = [];

/** Walk the mirrored `dynamic/dynamo` tree looking for index files. */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith('.dyn')) continue;

    let info;
    try {
      info = readIndexInfo(fs.readFileSync(full));
    } catch {
      continue;
    }
    if (info.hasPoints !== 0) continue; // inline file, no segments

    // Mirror-relative controller path without the trailing `/def.dyn`.
    const rel = path.relative(mirror, full).split(path.sep).join('/');
    const controller = rel.replace(/^dynamic\/dynamo\//, '').replace(/\/def\.dyn$/, '');

    for (let i = 0; i < info.count; i++) {
      const seg = String(i).padStart(info.digits || 3, '0');
      added.push(`https://eyes.nasa.gov/assets/dynamic/dynamo/${controller}/${seg}.dyn`);
    }
  }
}

walk(path.join(mirror, 'dynamic', 'dynamo'));

// Merge into the manifest's dynamic list, de-duplicated.
const set = new Set(manifest.dynamic);
let fresh = 0;
for (const url of added) if (!set.has(url)) { set.add(url); fresh++; }
manifest.dynamic = [...set].sort();

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`index files scanned, segments found: ${added.length}`);
console.log(`new dynamic URLs: ${fresh}`);
console.log(`dynamic total: ${manifest.dynamic.length}`);
console.log('wrote', manifestPath);

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
