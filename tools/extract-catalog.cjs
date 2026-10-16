/**
 * Extract NASA Eyes entity definitions, preserving the fields the renderer
 * actually needs.
 *
 * An earlier pass flattened `parents` to a list of names, which loses the
 * *time-segmented parenting table* that drives "launch from Earth → heliocentric
 * cruise → capture at Jupiter". This version keeps:
 *
 *   parents       [[startTime, parentName], ...]   (time-sorted, may end with "")
 *   systemRadius  visual radius of the whole sub-system (km)
 *   extentsRadius overrides for picking/framing (spacecraft use tiny values)
 *   occlusionRadius overrides for occlusion tests
 *   spheroid      equatorial/polar radii and the planetographic flag
 *
 * Usage: node tools/extract-catalog.cjs <app.js> <out.json> [entity-info.json]
 *
 * When the third argument (NASA's content database, extracted by
 * `study-content-db.cjs`) is supplied, each entity is enriched with the
 * presentation fields that only exist there:
 *
 *   category, subcategory, displayName, iauName, keywords, searchable
 *
 * Those drive the label icon, the label collision weight and which layer a body
 * belongs to, so they are not optional decoration.
 */
const fs = require('fs');
const path = require('path');

const [, , appPath = '/tmp/js_app.js', outPath = 'src/data/catalog.json', infoPath] = process.argv;
const src = fs.readFileSync(appPath, 'utf8');

/** NASA's content database: id -> {category, subcategory, displayName, ...}. */
let contentInfo = {};
if (infoPath && fs.existsSync(infoPath)) {
  contentInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
}

/** Collect every `X.register({ ... })` object body. */
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

/** Split a map body into `id -> object literal` entries by brace balancing. */
function splitEntries(text) {
  const entries = [];
  let i = 0;
  while (i < text.length) {
    const m = /"?([A-Za-z0-9_]+)"?:\{/g;
    m.lastIndex = i;
    const found = m.exec(text);
    if (!found) break;
    const open = found.index + found[0].length - 1;
    let d = 0;
    let j = open;
    for (; j < text.length; j++) {
      if (text[j] === '{') d++;
      else if (text[j] === '}') { d--; if (d === 0) break; }
    }
    const literal = text.slice(open, j + 1);
    if (/\b(groups|radius|label|controllers|parents)\b/.test(literal)) {
      entries.push({ id: found[1], literal });
    }
    i = j + 1;
  }
  return entries;
}

const bodies = findRegisterBlocks(src).join(',');

const numOr = (v) => {
  if (v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

/** Parse the time-segmented parenting table: [[t,"name"],...]. */
function parseParents(literal) {
  // NUL-safe: capture everything between `parents:[` and its matching `]`.
  const at = literal.indexOf('parents:[');
  if (at < 0) return [];
  let depth = 0;
  let end = -1;
  for (let i = at + 'parents:'.length; i < literal.length; i++) {
    const c = literal[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end < 0) return [];
  const body = literal.slice(at + 'parents:'.length + 1, end);

  const out = [];
  // Time may be `Number.NEGATIVE_INFINITY` / `Number.POSITIVE_INFINITY` or a literal.
  const segRe =
    /\[\s*(Number\.NEGATIVE_INFINITY|Number\.POSITIVE_INFINITY|-?Infinity|-?\d+(?:\.\d+)?(?:e-?\d+)?)\s*,\s*"([^"]*)"\s*\]/g;
  let s;
  while ((s = segRe.exec(body))) {
    const raw = s[1];
    const t = raw.includes('NEGATIVE')
      ? Number.NEGATIVE_INFINITY
      : raw.includes('POSITIVE')
        ? Number.POSITIVE_INFINITY
        : raw === '-Infinity'
          ? Number.NEGATIVE_INFINITY
          : Number(raw);
    out.push([t, s[2]]);
  }
  // Keep the table time-sorted; NASA inserts in order but be defensive.
  out.sort((a, b) => a[0] - b[0]);
  return out;
}

function parseEntry(id, literal) {
  const groups = (literal.match(/groups:\[([^\]]*)\]/) || [, ''])[1]
    .split(',')
    .map((s) => s.trim().replace(/["']/g, ''))
    .filter(Boolean);

  const label = (literal.match(/label:"([^"]*)"/) || [, id])[1];

  const parents = parseParents(literal);

  const radius = numOr((literal.match(/[,{]radius:([-\d.eE]+)/) || [,])[1]);
  const systemRadius = numOr((literal.match(/systemRadius:([-\d.eE]+)/) || [,])[1]);
  const extentsRadius = numOr((literal.match(/extentsRadius:([-\d.eE]+)/) || [,])[1]);
  const occlusionRadius = numOr((literal.match(/occlusionRadius:([-\d.eE]+)/) || [,])[1]);

  const eq = (literal.match(/equatorialRadius:([-\d.eE]+)/) || [,])[1];
  const pol = (literal.match(/polarRadius:([-\d.eE]+)/) || [,])[1];
  const pg = (literal.match(/planetographic:(!0|!1|true|false)/) || [,])[1];
  const spheroid = eq
    ? {
        equatorialRadius: Number(eq),
        polarRadius: pol ? Number(pol) : Number(eq),
        planetographic: pg === '!0' || pg === 'true',
      }
    : null;

  // Textures within the spheroidLOD block.
  const textures = {};
  const lodStart = literal.indexOf('spheroidLOD:');
  if (lodStart >= 0) {
    const lod = literal.slice(lodStart);
    const texRe = /([A-Za-z0-9_]+):\{url:"([^"]+)",sizes:\[([^\]]*)\]\}/g;
    for (const t of lod.matchAll(texRe)) {
      textures[t[1]] = {
        url: t[2],
        sizes: t[3].split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n)),
      };
    }
  }

  const dynamo = [...literal.matchAll(/type:"dynamo",url:"([^"]+)"/g)].map((m) => m[1]);

  // Model components (spacecraft meshes).
  const modelM = literal.match(/model:\{url:"([^"]+)"/);
  const modelUrl = modelM ? modelM[1] : null;

  // Presentation fields from NASA's content database, when available.
  const info = contentInfo[id] || {};

  return {
    id,
    label,
    groups,
    /** Content category, e.g. "Planet", "Moon", "Spacecraft". */
    category: info.category ?? null,
    /** Content subcategory, e.g. "Major Moon", "Orbiter"; wins over category. */
    subcategory: info.subcategory ?? null,
    /** Preferred display name, when NASA overrides the entity label. */
    displayName: info.displayName ?? null,
    /** IAU name, which NASA prefers for some bodies. */
    iauName: info.iauName ?? null,
    /** Search keywords from the content database. */
    keywords: info.keywords ?? [],
    radius,
    systemRadius,
    extentsRadius,
    occlusionRadius,
    spheroid,
    parents,
    dynamo: dynamo[0] ? `${dynamo[0]}/def.dyn` : null,
    allDynamo: dynamo.map((u) => `${u}/def.dyn`),
    modelUrl,
    textures,
  };
}

const catalog = {};
for (const { id, literal } of splitEntries(bodies)) catalog[id] = parseEntry(id, literal);

// JSON cannot represent Infinity; NASA writes -Infinity for "always". Encode it
// as a finite sentinel far before any real epoch so consumers stay numeric.
const NEG_INF_SENTINEL = -1e18;
const POS_INF_SENTINEL = 1e18;
for (const entity of Object.values(catalog)) {
  entity.parents = entity.parents.map(([t, name]) => [
    t === Number.NEGATIVE_INFINITY ? NEG_INF_SENTINEL : t === Number.POSITIVE_INFINITY ? POS_INF_SENTINEL : t,
    name,
  ]);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n');

const all = Object.values(catalog);
const segmented = all.filter((e) => e.parents.length > 1).length;
const withModel = all.filter((e) => e.modelUrl).length;
console.log(`entities: ${all.length}`);
console.log(`segmented parents (multi-phase): ${segmented}`);
console.log(`with dynamo: ${all.filter((e) => e.dynamo).length}`);
console.log(`with model: ${withModel}`);
console.log(`with textures: ${all.filter((e) => Object.keys(e.textures).length).length}`);
if (infoPath) {
  const cats = {};
  for (const e of all) cats[e.category ?? '(none)'] = (cats[e.category ?? '(none)'] || 0) + 1;
  console.log('category coverage:', JSON.stringify(cats));
}
console.log('wrote', outPath);
