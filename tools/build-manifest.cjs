/**
 * Enumerate every NASA Eyes asset referenced by the app bundle and catalogue it.
 *
 * NASA's bucket forbids listings, so the inventory must be derived from the JS
 * itself. This script extracts:
 *   - every literal `$STATIC_ASSETS_URL/...` and `$DYNAMIC_ASSETS_URL/...` path
 *   - every spheroid texture descriptor (maps/<body>/<map>_$SIZE_$FACE.ext)
 *   - every dynamo controller (dynamo/<...>/def.dyn), expanded per entity
 *   - starfield layers and named sprites/models
 *
 * It writes a manifest with sizes (HEAD requests) so the download cost is known
 * before committing to it.
 *
 * Usage: node tools/build-manifest.cjs <path-to-app.js> <out.json>
 */
const fs = require('fs');
const path = require('path');

const [, , appPath = '/tmp/js_app.js', outPath = 'tools/out/manifest.json'] = process.argv;
const src = fs.readFileSync(appPath, 'utf8');

const STATIC = 'https://eyes.nasa.gov/assets/static';
const DYNAMIC = 'https://eyes.nasa.gov/assets/dynamic';

/** All `$STATIC_ASSETS_URL/...` / `$DYNAMIC_ASSETS_URL/...` literals. */
function literalAssets() {
  const out = new Set();
  const re = /\$(STATIC|DYNAMIC)_ASSETS_URL\/([A-Za-z0-9_./$\-{]+)/g;
  let m;
  while ((m = re.exec(src))) {
    const base = m[1] === 'STATIC' ? STATIC : DYNAMIC;
    out.add(`${base}/${m[2]}`);
  }
  return out;
}

/** Texture descriptors from spheroidLOD blocks: role -> {url, sizes}. */
function textureDescriptors() {
  const out = new Map();
  const re = /([A-Za-z0-9_]+):\{url:"([^"]+)",sizes:\[([^\]]*)\]\}/g;
  let m;
  while ((m = re.exec(src))) {
    const sizes = m[3].split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n));
    out.set(m[2], sizes);
  }
  return out;
}

/**
 * Expand a texture descriptor into concrete URLs.
 * `$SIZE` -> each offered size, `$FACE` -> 0..5.
 */
function expandTexture(template, sizes) {
  const urls = [];
  for (const size of sizes) {
    for (let face = 0; face < 6; face++) {
      urls.push(
        `${STATIC}/maps/${template.replace('$SIZE', String(size)).replace('$FACE', String(face))}`,
      );
    }
  }
  return urls;
}

const literals = literalAssets();
const textures = textureDescriptors();

const staticUrls = new Set();
const dynamicUrls = new Set();

for (const url of literals) {
  // Skip unresolved template fragments such as `${e.skyboxResolution}`.
  if (/[$]\{/.test(url)) continue;
  if (url.startsWith(DYNAMIC)) dynamicUrls.add(url);
  else staticUrls.add(url);
}

// Dynamo controllers are stored as bare paths in entity configs; expand every
// `<controller>/def.dyn` found in the bundle, and also pull the extracted
// catalog so multi-phase spacecraft (earth/launch, sun/1, ...) are included.
{
  const re = /type:"dynamo",url:"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) dynamicUrls.add(`${DYNAMIC}/dynamo/${m[1]}/def.dyn`);
}
{
  const catalogPath = path.join(path.dirname(outPath), '..', '..', 'src', 'data', 'catalog.json');
  if (fs.existsSync(catalogPath)) {
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const entity of Object.values(catalog)) {
      for (const c of entity.allDynamo || []) dynamicUrls.add(`${DYNAMIC}/dynamo/${c}`);
    }
  }
}

for (const [template, sizes] of textures) {
  for (const url of expandTexture(template, sizes)) staticUrls.add(url);
}

// Starfield layers 0..5 and known singletons referenced in code.
for (let i = 0; i < 6; i++) staticUrls.add(`${STATIC}/stars/stars.${i}.bin`);
staticUrls.add(`${STATIC}/stars/galaxies.0.bin`);
staticUrls.add(`${STATIC}/stars/constellations.bin`);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
const cleanStatic = [...staticUrls]
  .filter((u) => !/[$]\{/.test(u) && !u.endsWith('/maps/'))
  .sort();
const cleanDynamic = [...dynamicUrls].filter((u) => !/[$]\{/.test(u)).sort();
fs.writeFileSync(
  outPath,
  JSON.stringify(
    {
      generatedFrom: appPath,
      static: cleanStatic,
      dynamic: cleanDynamic,
      textures: [...textures.entries()].map(([url, sizes]) => ({ url, sizes })),
    },
    null,
    2,
  ) + '\n',
);

console.log(`static assets: ${cleanStatic.length}`);
console.log(`dynamic .dyn  : ${cleanDynamic.length}`);
console.log(`texture kinds : ${textures.size}`);
console.log(`wrote ${outPath}`);
