// Extract the per-body `postCreateFunction` blocks from NASA's entity table.
//
// The atmosphere, rings and other components are not declared as data — they are
// constructed imperatively inside each entity's `postCreateFunction`. This pulls
// those blocks out verbatim so the parameters can be transcribed exactly.
//
// Usage: node tools/study-postcreate.cjs [entityId ...]
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const src = fs.readFileSync(BUNDLE, 'utf8');

const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'moon'];

for (const id of ids) {
  const re = new RegExp('[,{]\\"?' + id + '\\"?:\\{');
  const m = re.exec(src);
  if (!m) {
    console.log(`--- ${id}: NOT FOUND\n`);
    continue;
  }
  const seg = src.slice(m.index, m.index + 4000);
  const at = seg.indexOf('postCreateFunction');
  console.log(`--- ${id}`);
  if (at < 0) {
    console.log('  (no postCreateFunction)\n');
    continue;
  }
  // Brace-match the arrow function body.
  const braceStart = seg.indexOf('{', at);
  let d = 0;
  let end = braceStart;
  for (let i = braceStart; i < seg.length; i++) {
    if (seg[i] === '{') d++;
    else if (seg[i] === '}') { d--; if (d === 0) { end = i; break; } }
  }
  const body = seg.slice(braceStart, end + 1);
  // One statement per line for readability.
  console.log(body.replace(/,(?=[a-zA-Z_$])/g, ',\n  ').replace(/\{/, '{\n  '));
  console.log();
}
