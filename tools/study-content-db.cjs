// Extract NASA's content database (entity info) into a clean JSON file.
//
// In the `preload.js` chunk, module 2 is `e.exports = JSON.parse('<json>')`, and
// `PreloadManager` assigns it to `this._entityInfo`. It is the authoritative
// source for each entity's `category`, `subcategory`, `displayName`, `iauName`,
// `searchable`, `disabled` and feature flags — none of which appear in the main
// `app.js` entity table.
//
// Output (ignored, never committed — it is NASA's data):
//   data/mirror/apps/solar-system/bundle/entity-info.json
//   data/mirror/apps/solar-system/bundle/entity-categories.json   (id -> category)
const fs = require('fs');
const path = require('path');

const BUNDLE_DIR = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle',
);
const RAW = path.join(BUNDLE_DIR, 'entity-info.raw.js');

if (!fs.existsSync(RAW)) {
  console.error(`Missing ${RAW}. Run: node tools/study-content-db.cjs /tmp/preload.js`);
  process.exit(1);
}

const raw = fs.readFileSync(RAW, 'utf8');

// The module body is:  {e.exports=JSON.parse('....')}   (quotes escaped)
const m = raw.match(/JSON\.parse\('([\s\S]*)'\)\s*}?\s*$/);
if (!m) {
  console.error('Could not find the JSON.parse payload.');
  process.exit(1);
}

// Unescape the JS single-quoted string.
const json = m[1]
  .replace(/\\'/g, "'")
  .replace(/\\\\/g, '\\');

const data = JSON.parse(json);
const ids = Object.keys(data);
fs.writeFileSync(path.join(BUNDLE_DIR, 'entity-info.json'), JSON.stringify(data, null, 2));

const byCategory = {};
for (const id of ids) {
  const c = data[id].category ?? '(none)';
  byCategory[c] = (byCategory[c] || 0) + 1;
}

fs.writeFileSync(
  path.join(BUNDLE_DIR, 'entity-categories.json'),
  JSON.stringify(Object.fromEntries(ids.map((id) => [id, data[id].category ?? null])), null, 2),
);

console.log(`${ids.length} entities`);
console.log('categories:', JSON.stringify(byCategory, null, 1));

const sub = {};
for (const id of ids) {
  const s = data[id].subcategory;
  if (s) sub[s] = (sub[s] || 0) + 1;
}
console.log('subcategories:', JSON.stringify(sub, null, 1));

// Show a planet and a moon for field inspection.
for (const id of ['earth', 'moon', 'sun', 'jupiter', '1_ceres']) {
  if (data[id]) console.log(id, '->', JSON.stringify(data[id]));
}
