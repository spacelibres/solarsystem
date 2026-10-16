// Extract NASA's scene-graph rules from SceneManager and related classes, and
// compare them against ours. Run this before changing scene code.
//
// Usage: node tools/audit-scene-rules.cjs
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const src = fs.readFileSync(BUNDLE, 'utf8');

function grab(marker, length = 900) {
  const i = src.indexOf(marker);
  return i < 0 ? null : src.slice(i, i + length);
}

const findings = [
  {
    id: 'ambient-light',
    what: 'Scene ambient light colour',
    nasa: 'setAmbientLightColor(new Color(.005,.005,.005))',
    raw: grab('setAmbientLightColor('),
  },
  {
    id: 'subsystem-visibility',
    what: 'When a child system becomes visible inside its parent',
    nasa: '(systemRadius || 25*radius || 25*extentsRadius) / parentExtentsRadius * parentPixelExtents >= 20',
    raw: grab('_isEntityVisibleWithinParent('),
  },
  {
    id: 'label-culling-rule',
    what: 'Which entities are drawn at all',
    nasa: 'forceVisible || (!dynamic && layerVisibility) || (dynamic && layerVisibility && visibleWithinParent) || cameraParent',
    raw: grab('update(){const t=this.app.getManager("camera")'),
  },
  {
    id: 'visibility-dispatch',
    what: 'Per-component visibility when an entity is shown/hidden',
    nasa: 'trails layer gates TrailComponent; labels layer gates DivComponent; others gated by type; "sun" is exempt',
    raw: grab('setVisibility(t,e){const i=this._entityStatuses.get(e)'),
  },
  {
    id: 'constellations-params',
    what: 'Constellation line colour and label styling',
    nasa: 'setColor(new Color(.35,.7,1,.5)) for lines; label colour (0.35,0.7,1,1); highlight lineWidth 2.5; url $STATIC_ASSETS_URL/stars/constellations.bin',
    raw: grab('toggleConstellations('),
  },
  {
    id: 'starfield-toggle',
    what: 'How many starfield layers exist',
    nasa: 'for (let e = 0; e < 7; e++) sun.getComponent(StarfieldComponent, e).setEnabled(t)',
    raw: grab('toggleStarfield('),
  },
  {
    id: 'heliosphere-toggle',
    what: 'Heliosphere owner',
    nasa: 'sun.getComponent(ModelComponent).setEnabled(t)',
    raw: grab('toggleHeliosphere('),
  },
  {
    id: 'hd-breakpoints',
    what: 'Texture size breakpoints',
    nasa: '_hdBreakpointSize 512, _maxTextureSize 4096, _mobileTextureSize 1024',
    raw: grab('_hdBreakpointSize=512'),
  },
  {
    id: 'entity-categories-with-hd',
    what: 'Categories that get HD textures',
    nasa: 'Planet, Moon, Dwarf Planet, Star',
    raw: grab('updateHDTarget('),
  },
  {
    id: 'entity-visibility-20px',
    what: 'The 20-pixel rule',
    nasa: '>= 20 at the end of _isEntityVisibleWithinParent',
    raw: grab('*i.getGreatestPixelSpaceExtentsRadius()'),
  },
];

console.log('# NASA scene-graph rules, extracted\n');
for (const f of findings) {
  console.log(`## ${f.id} — ${f.what}`);
  console.log(`NASA: ${f.nasa}`);
  if (f.raw) {
    const snippet = f.raw.replace(/\s+/g, ' ').slice(0, 420);
    console.log(`\`\`\`\n${snippet}\n\`\`\``);
  } else {
    console.log('(literal not found — check the marker)');
  }
  console.log();
}
