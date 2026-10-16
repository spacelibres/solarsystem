// Extract and document NASA's distance/unit formatting rules from the bundle.
//
// `DistanceManager._getDistanceParams` is the single place NASA turns a kilometre
// value into a display string. Replicating it exactly is cheap and makes every
// distance readout in our UI match NASA's.
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const src = fs.readFileSync(BUNDLE, 'utf8');

// 1. The unit conversion object (kmToMi, miToFt, kmToM) and the two systems.
const conv = src.match(/kmToMi:[^}]{0,200}\}/);
console.log('=== unit conversion table ===');
console.log(conv ? conv[0] : 'NOT FOUND');

// 2. The thresholds used by _getDistanceParams.
const idx = src.indexOf('_getDistanceParams(');
if (idx > 0) {
  const body = src.slice(idx, idx + 1100);
  console.log('\n=== _getDistanceParams ===');
  console.log(body.replace(/;/g, ';\n'));
}

// 3. Find the module-level constants for the unit systems.
console.log('\n=== unit system identifiers ===');
for (const m of src.matchAll(/(?:^|[,;])\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*"(imperial|metric|metric_si|[a-z_]+)"/g)) {
  console.log(m[1], '=', m[2]);
}
