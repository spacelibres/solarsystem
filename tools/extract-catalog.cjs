/**
 * Extract NASA Eyes entity definitions from the downloaded `app.js` bundle.
 *
 * NASA ships every entity as a large object literal keyed by entity id. The
 * values contain functions and library references, so evaluating the whole map
 * is brittle. Instead we scan for top-level `id:{ ... }` entries by brace
 * balancing, then pull the handful of fields the explorer needs with targeted
 * regular expressions. This keeps the extractor robust against bundle changes
 * that do not alter the fields we care about.
 *
 * Usage: node tools/extract-catalog.cjs <path-to-app.js> <out.json>
 */
const fs = require('fs');
const path = require('path');

const [, , appPath = '/tmp/js_app.js', outPath = 'src/data/catalog.json'] = process.argv;
const src = fs.readFileSync(appPath, 'utf8');

/**
 * Find every `X.register({ ... })` block and return the object-literal bodies.
 * NASA spreads its entity definitions across many such calls (top-level bodies
 * in one, moons in another, spacecraft in several), so all must be scanned.
 */
function findRegisterBlocks(source) {
  const blocks = [];
  const re = /[A-Za-z_$][A-Za-z0-9_$]*\.register\(\{/g;
  let m;
  while ((m = re.exec(source))) {
    const open = m.index + m[0].length - 1;
    let depth = 0;
    let close = -1;
    for (let i = open; i < source.length; i++) {
      const c = source[i];
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) { close = i; break; }
      }
    }
    if (close > 0) blocks.push(source.slice(open + 1, close));
  }
  return blocks;
}

const bodies = findRegisterBlocks(src).join(',');

/** Split the map body into `id -> object-literal` entries by brace balancing. */
function splitEntries(text) {
  const entries = [];
  let i = 0;
  const isIdChar = (c) => /[A-Za-z0-9_]/.test(c);
  while (i < text.length) {
    // Match `id:{` at a top level position; keys may be quoted (e.g. "1_ceres").
    const m = /"?([A-Za-z0-9_]+)"?:\{/g;
    m.lastIndex = i;
    const found = m.exec(text);
    if (!found) break;
    const id = found[1];
    const open = found.index + found[0].length - 1;
    let d = 0;
    let j = open;
    for (; j < text.length; j++) {
      if (text[j] === '{') d++;
      else if (text[j] === '}') { d--; if (d === 0) break; }
    }
    const literal = text.slice(open, j + 1);
    // Only accept entries that look like entity configs.
    if (/\b(groups|radius|label|controllers|parents)\b/.test(literal)) {
      entries.push({ id, literal });
    }
    i = j + 1;
    void isIdChar;
  }
  return entries;
}

const num = (v) => (v === undefined ? null : Number(v));

function parseEntry(id, literal) {
  const groups = (literal.match(/groups:\[([^\]]*)\]/) || [, ''])[1]
    .split(',')
    .map((s) => s.trim().replace(/["']/g, ''))
    .filter(Boolean);

  const radius = num((literal.match(/[,{]radius:([-\d.eE]+)/) || [,])[1]);
  const label = (literal.match(/label:"([^"]*)"/) || [, id])[1];

  // parents:[[n,"sun"],...] -> ["sun"]
  const parentsRaw = (literal.match(/parents:\[([^\]]*(?:\][^\]]*)*?)\](?=,)/) || [, ''])[1];
  const parents = [...parentsRaw.matchAll(/"([A-Za-z0-9_]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== 'milky_way' && p !== 'observable_universe');

  // Texture roles: within the spheroidLOD block, find role:{url:"...",sizes:[...]}
  const textures = {};
  const lodStart = literal.indexOf('spheroidLOD:');
  if (lodStart >= 0) {
    const lod = literal.slice(lodStart);
    const texRe = /([A-Za-z0-9_]+):\{url:"([^"]+)",sizes:\[([^\]]*)\]\}/g;
    for (const m of lod.matchAll(texRe)) {
      textures[m[1]] = {
        url: m[2],
        sizes: m[3].split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n)),
      };
    }
  }

  const dynamo = [...literal.matchAll(/type:"dynamo",url:"([^"]+)"/g)].map((m) => m[1]);

  return {
    id,
    label,
    groups,
    radius,
    parents,
    dynamo: dynamo[0] ? `${dynamo[0]}/def.dyn` : null,
    allDynamo: dynamo.map((u) => `${u}/def.dyn`),
    textures,
  };
}

const entries = splitEntries(bodies);
const catalog = {};
for (const { id, literal } of entries) catalog[id] = parseEntry(id, literal);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n');

const withDynamo = Object.values(catalog).filter((e) => e.dynamo).length;
const withTex = Object.values(catalog).filter((e) => Object.keys(e.textures).length).length;
console.log(`entities: ${Object.keys(catalog).length}, with dynamo: ${withDynamo}, with textures: ${withTex}`);
console.log('wrote', outPath);
