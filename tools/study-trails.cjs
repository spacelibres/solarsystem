// Extract every entity's `trail` block from NASA's entity table.
//
// Trails are declared as data: `trail: { length, lengthCoverages, color }`.
// `length` is the trail's temporal span in seconds; `lengthCoverages` override it
// over time windows (so a trail can lengthen after a launch or flyby). `color`
// is [r, g, b, a] and defaults to white at 0.5 when absent.
//
// Usage: node tools/study-trails.cjs
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const src = fs.readFileSync(BUNDLE, 'utf8');

// Walk the entity table: `"id":{groups:[...],...,trail:{...},...}`.
const re = /[,{]"?([A-Za-z0-9_]+)"?:\{groups:\[/g;
let m;
const rows = [];
while ((m = re.exec(src))) {
  const id = m[1];
  const seg = src.slice(m.index, m.index + 3000);
  const t = seg.indexOf('trail:{');
  if (t < 0) continue;
  // Brace-match the trail object.
  let d = 0;
  let end = t;
  for (let i = seg.indexOf('{', t); i < seg.length; i++) {
    if (seg[i] === '{') d++;
    else if (seg[i] === '}') { d--; if (d === 0) { end = i; break; } }
  }
  const body = seg.slice(t + 'trail:'.length, end + 1);
  const len = /length:([^,}]+)/.exec(body);
  const col = /color:\[([^\]]+)\]/.exec(body);
  rows.push({
    id,
    length: len ? len[1] : '(unset)',
    color: col ? col[1] : '(default 1,1,1,0.5)',
    coverages: /lengthCoverages:\[/.test(body),
  });
}

console.log(`${rows.length} entities with a trail\n`);
for (const r of rows) {
  console.log(
    `${r.id.padEnd(34)} length=${r.length.padEnd(12)} color=${r.color}${r.coverages ? '  [coverages]' : ''}`,
  );
}
