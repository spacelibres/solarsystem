// Extract NASA's LayerManager layer definitions from the bundle.
//
// `LayerManager.addLayer(id, {name, group, categories, defaultVisibility,
// sublayers, toggleCallback})` is called once per layer at app init. This pulls
// every call out verbatim so our layer taxonomy can match NASA's exactly rather
// than being reconstructed from screenshots.
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const src = fs.readFileSync(BUNDLE, 'utf8');

// Find the init block where the layers are registered, then walk each addLayer.
const anchor = src.indexOf('addLayer("planets"');
if (anchor < 0) {
  console.error('Could not find addLayer("planets"). Bundle may have changed.');
  process.exit(1);
}

// Walk backwards to the start of the statement chain, then read forward until
// the calls stop.
let start = anchor;
while (start > 0 && !/[;{]\s*[a-zA-Z_$][\w$]*\.addLayer\("/.test(src.slice(start - 60, start + 20))) {
  start -= 1;
  if (anchor - start > 200) { start = anchor; break; }
}

// Read a generous window and pull balanced addLayer(...) calls from it.
const windowText = src.slice(anchor - 200, anchor + 6000);
const calls = [];
const re = /addLayer\(\s*"([^"]+)"\s*,/g;
let m;
while ((m = re.exec(windowText))) {
  const from = anchor - 200 + m.index;
  // Brace-match the options object.
  const braceStart = src.indexOf('{', from);
  let depth = 0;
  let end = braceStart;
  for (let i = braceStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  calls.push({ id: m[1], options: src.slice(braceStart, end + 1) });
}

console.log(`=== ${calls.length} addLayer calls ===\n`);
for (const c of calls) {
  console.log(`--- ${c.id}`);
  console.log(c.options.replace(/,(?=[a-zA-Z_$"'])/g, ',\n    '));
  console.log();
}
