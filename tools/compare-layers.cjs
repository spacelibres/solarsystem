/**
 * Compare our layer defaults against the live NASA reference dump.
 *
 * The layer list drives what exists in the scene at all, so a wrong
 * `defaultVisibility` silently changes which bodies appear on first load.
 *
 * Usage:
 *   1. node tools/ref-dump.cjs tools/out/ref-scene.json
 *   2. node tools/compare-layers.cjs
 */
const fs = require('fs');

const refPath = process.argv[2] || 'tools/out/ref-scene.json';
const ref = JSON.parse(fs.readFileSync(refPath, 'utf8'));

// Pull our layer table out of the source rather than importing TS.
const src = fs.readFileSync('src/lib/nasa/astronomy.ts', 'utf8');
const block = src.slice(src.indexOf('LAYERS'), src.indexOf('] as const', src.indexOf('LAYERS')));
const ours = [];
const re = /\{\s*id:\s*'([^']+)'[\s\S]*?categories:\s*\[([^\]]*)\][\s\S]*?(?:group:\s*'([^']+)'[\s\S]*?)?(?:defaultVisible:\s*(true|false))/g;
let m;
while ((m = re.exec(block))) {
  ours.push({
    id: m[1],
    categories: m[2].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean),
    group: m[3] ?? '',
    defaultVisible: m[4] === 'true',
  });
}

const refLayers = ref.layers.layers;
console.log(`reference layers: ${Object.keys(refLayers).length}   ours: ${ours.length}\n`);

const refIds = new Set(Object.keys(refLayers));
const ourIds = new Set(ours.map((o) => o.id));

let problems = 0;

console.log('--- missing from ours ---');
for (const id of refIds) {
  if (!ourIds.has(id)) {
    console.log('  MISSING', id, '->', JSON.stringify(refLayers[id]));
    problems++;
  }
}

console.log('--- visibility mismatch ---');
for (const o of ours) {
  const r = refLayers[o.id];
  if (!r) continue;
  if (r.defaultVisibility !== o.defaultVisible) {
    console.log(`  ${o.id}: NASA=${r.defaultVisibility} ours=${o.defaultVisible}`);
    problems++;
  }
}

console.log('--- category mismatch ---');
for (const o of ours) {
  const r = refLayers[o.id];
  if (!r) continue;
  const a = [...r.categories].sort().join('|');
  const b = [...o.categories].sort().join('|');
  if (a !== b) {
    console.log(`  ${o.id}:\n    NASA=[${a}]\n    ours=[${b}]`);
    problems++;
  }
}

console.log('--- group mismatch ---');
for (const o of ours) {
  const r = refLayers[o.id];
  if (!r) continue;
  const rg = r.group ?? '';
  if (rg !== o.group) {
    console.log(`  ${o.id}: NASA="${rg}" ours="${o.group}"`);
    problems++;
  }
}

console.log();
console.log(problems === 0 ? 'ALL LAYERS MATCH THE REFERENCE' : `${problems} differences`);
process.exit(problems === 0 ? 0 : 1);
