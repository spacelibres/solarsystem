/**
 * Decode every `.bin` asset in the mirror into readable text.
 *
 * ## Why this is decoding, not decompilation
 *
 * All nine `.bin` files are **raw data**, not compiled or obfuscated code. Their
 * leading bytes are counts and length-prefixed strings, not magic numbers:
 *
 *   stars.0.bin         cb13 0000  ->  i32 count = 5067      star records
 *   stars.1..5.bin      (counts 7418, 7628, 7747, 7278, 7529)
 *   galaxies.0.bin      bb04 0000  ->  i32 count = 1211      star records
 *   constellations.bin  06 "Aquila" -> u8 length + name      constellation data
 *   voyager_heliosphere.bin         ->  float32 triples      a glTF buffer view
 *
 * None carry a container or code signature (no PK/zip, gzip, JVM `CAFEBABE`,
 * Mach-O, ELF or WASM magic), so there is nothing to decompile and no decompiler
 * would apply — `morluto/rea` targets native binaries, JVM bytecode, .NET and
 * Android, none of which these are. The formats are already documented in
 * `src/lib/scene/starfield.ts` and the constellation reader; this tool applies
 * those decoders and writes the result as plain text.
 *
 * Output goes to `deobf/bin/` (ignored), one file per input.
 *
 * Usage:
 *   node tools/decode-bins.cjs            # decode everything
 *   node tools/decode-bins.cjs stars      # only files matching "stars"
 */
const fs = require('fs');
const path = require('path');

const MIRROR = path.join(__dirname, '..', 'data', 'mirror');
const OUT = path.join(__dirname, '..', 'deobf', 'bin');
const filter = process.argv[2] || '';

/** NASA's ecliptic-J2000 -> J2000 rotation, as a quaternion (x, y, z, w). */
const ECLIP = [0.9791532214288992, 0.2031230389823101, 0, 0];
function rotate([x, y, z], [qx, qy, qz, qw]) {
  // v' = v + 2 * q.w * (q.xyz x v) + 2 * (q.xyz x (q.xyz x v))
  const cx = qy * z - qz * y;
  const cy = qz * x - qx * z;
  const cz = qx * y - qy * x;
  const c2x = qy * cz - qz * cy;
  const c2y = qz * cx - qx * cz;
  const c2z = qx * cy - qy * cx;
  return [
    x + 2 * qw * cx + 2 * c2x,
    y + 2 * qw * cy + 2 * c2y,
    z + 2 * qw * cz + 2 * c2z,
  ];
}

/** Decode a star layer: i32 count, then 23-byte records. */
function decodeStarLayer(buf, name) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const count = view.getInt32(0, true);
  const B = 23;
  const expected = 4 + count * B;
  const lines = [];
  lines.push(`# ${name}`);
  lines.push(`count: ${count}`);
  lines.push(`bytes: ${buf.length} (expected ${expected}${buf.length === expected ? '' : '  <-- MISMATCH'})`);
  lines.push('');
  lines.push('| # | mag | absMag | color (hex) | rgb raw | position (km, J2000) |');
  lines.push('|---|---|---|---|---|---|');
  for (let i = 0; i < count; i++) {
    const o = 4 + i * B;
    const mag = view.getFloat32(o, true);
    const absMag = view.getFloat32(o + 4, true);
    const r = view.getUint8(o + 8);
    const g = view.getUint8(o + 9);
    const b = view.getUint8(o + 10);
    // Position is stored y, z, x with y negated.
    const raw = [-view.getFloat32(o + 11, true), view.getFloat32(o + 15, true), view.getFloat32(o + 19, true)];
    const p = rotate([raw[2], raw[0], raw[1]], ECLIP);
    const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
    lines.push(
      `| ${i} | ${mag.toFixed(3)} | ${absMag.toFixed(3)} | ${hex} | ${r},${g},${b} | ` +
      `${p[0].toExponential(4)}, ${p[1].toExponential(4)}, ${p[2].toExponential(4)} |`,
    );
  }
  return lines.join('\n');
}

/** Decode the constellation table: u8 len + name, u8 RGBA, u8 n, n * 3 f32, u8 2*nSegs, segs. */
function decodeConstellations(buf, name) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const lines = [`# ${name}`, ''];
  let o = 0;
  let index = 0;
  while (o < buf.length) {
    const nameLen = view.getUint8(o);
    o += 1;
    let label = '';
    for (let i = 0; i < nameLen; i++) label += String.fromCharCode(view.getUint8(o + i));
    o += nameLen;
    const r = view.getUint8(o);
    const g = view.getUint8(o + 1);
    const b = view.getUint8(o + 2);
    const a = view.getUint8(o + 3);
    o += 4;
    const nStars = view.getUint8(o);
    o += 1;
    const stars = [];
    for (let i = 0; i < nStars; i++) {
      stars.push([
        view.getFloat32(o, true),
        view.getFloat32(o + 4, true),
        view.getFloat32(o + 8, true),
      ]);
      o += 12;
    }
    const nSegs = view.getUint8(o);
    o += 1;
    const segs = [];
    for (let i = 0; i < nSegs; i++) {
      segs.push([view.getUint8(o), view.getUint8(o + 1)]);
      o += 2;
    }
    lines.push(`## ${index}: ${label}  (rgba ${r},${g},${b},${a}; ${nStars} stars, ${nSegs} segments)`);
    lines.push(`stars: ${stars.map((s) => `(${s.map((v) => v.toFixed(5)).join(', ')})`).join(' ')}`);
    lines.push(`segments: ${segs.map((s) => `${s[0]}-${s[1]}`).join(' ')}`);
    lines.push('');
    index += 1;
  }
  lines.unshift(`# ${name}`, `constellations: ${index}`, `bytes: ${buf.length}`, '');
  return lines.join('\n');
}

/** Decode a headerless glTF buffer view: float32 triples (positions + normals). */
function decodeBufferView(buf, name) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const floats = Math.floor(buf.length / 4);
  const lines = [
    `# ${name}`,
    'glTF buffer view: headerless float32 data, referenced by the sibling .gltf',
    `floats: ${floats}  bytes: ${buf.length}  (trailing ${buf.length % 4} bytes)`,
    '',
    '## first 24 floats (as triples)',
    '',
  ];
  for (let i = 0; i + 2 < Math.min(floats, 24); i += 3) {
    lines.push(
      `  ${String(i).padStart(5)}: ${view.getFloat32(i * 4, true).toFixed(4)}  ` +
      `${view.getFloat32((i + 1) * 4, true).toFixed(4)}  ${view.getFloat32((i + 2) * 4, true).toFixed(4)}`,
    );
  }
  lines.push('', '## statistics');
  const all = [];
  for (let i = 0; i < floats; i++) all.push(view.getFloat32(i * 4, true));
  const finite = all.filter((v) => Number.isFinite(v));
  lines.push(`  finite ${finite.length}/${floats}, min ${Math.min(...finite).toFixed(4)}, max ${Math.max(...finite).toFixed(4)}`);
  return lines.join('\n');
}

// --- run -------------------------------------------------------------------

fs.mkdirSync(OUT, { recursive: true });
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.bin') && full.includes(filter)) files.push(full);
  }
})(MIRROR);

if (files.length === 0) {
  console.error('No .bin files matched.');
  process.exit(1);
}

let total = 0;
for (const file of files.sort()) {
  const buf = fs.readFileSync(file);
  const name = path.relative(MIRROR, file);
  let text;
  if (/constellations\.bin$/.test(file)) text = decodeConstellations(buf, name);
  else if (/stars\.\d+\.bin$|galaxies\.\d+\.bin$/.test(file)) text = decodeStarLayer(buf, name);
  else text = decodeBufferView(buf, name);

  const dest = path.join(OUT, name.replace(/\//g, '__') + '.txt');
  fs.writeFileSync(dest, text + '\n');
  console.log(`${name.padEnd(46)} -> ${path.relative(process.cwd(), dest)}  (${text.split('\n').length} lines)`);
  total += 1;
}
console.log(`\n${total} files decoded -> ${path.relative(process.cwd(), OUT)}`);
