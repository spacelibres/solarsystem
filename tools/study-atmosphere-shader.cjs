// Extract NASA's AtmosphereComponent shaders verbatim from the bundle.
//
// These are the real GLSL programs, not reconstructions. They are extracted so
// the replica can port them exactly rather than approximating an atmosphere
// shell. Output goes to deobf/ (git-ignored).
//
// Usage: node tools/study-atmosphere-shader.cjs
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const OUT = path.join(__dirname, '..', 'deobf');
const src = fs.readFileSync(BUNDLE, 'utf8');

const at = src.indexOf('class AtmosphereComponent');
if (at < 0) {
  console.error('AtmosphereComponent not found');
  process.exit(1);
}
const seg = src.slice(at, at + 30000);

/** Pull a `static _name = \`...\`` template literal. */
function template(name) {
  const i = seg.indexOf(`static _${name}=`);
  if (i < 0) return null;
  const tick = seg.indexOf('`', i);
  const end = seg.indexOf('`', tick + 1);
  return seg.slice(tick + 1, end);
}

const vertex = template('vertexShader');
const fragment = template('fragmentShader');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'atmosphere.vert.glsl'), vertex + '\n');
fs.writeFileSync(path.join(OUT, 'atmosphere.frag.glsl'), fragment + '\n');

// The geometry NASA builds: a 64x129 lat/lon sphere with a 128-segment triangle
// fan, radius (radius + scaleHeight * 20) in the vertex shader.
console.log('vertex   ->', path.join(OUT, 'atmosphere.vert.glsl'));
console.log('fragment ->', path.join(OUT, 'atmosphere.frag.glsl'));
console.log(`vertex ${vertex.length} bytes, fragment ${fragment.length} bytes`);

console.log('\n=== key parameters ===');
for (const line of fragment.split('\n')) {
  if (/scaleHeightMultiplier|atmosphereRadius =|numIterations =|blendHeight =|glow\(0\.|isGroundComponent/.test(line)) {
    console.log(' ', line.trim());
  }
}
