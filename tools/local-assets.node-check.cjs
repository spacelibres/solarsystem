'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { assetPath, dependencies, validate, isDirectoryUrl } = require('./local-assets/lib.cjs');
const { readIndexInfo, segmentUrls } = require('./lib/segments.cjs');
const { inventory } = require('./local-assets/manifest.cjs');
const { provision } = require('./local-assets/download.cjs');
const os = require('node:os');
test('asset mapping follows the runtime namespaces', () => {
  assert.equal(assetPath('https://eyes.nasa.gov/assets/static/maps/a.png'), 'static/maps/a.png');
  assert.equal(assetPath('https://eyes.nasa.gov/apps/solar-system/assets/a.png'), 'site/assets/a.png');
  assert.equal(assetPath('https://example.com/fonts/a.woff?v=2'), 'external/example.com/fonts/a.woff');
  assert.throws(() => assetPath('https://example.com/a%2f..%2fb'));
  for(const url of ['https://eyes.nasa.gov/assets/static','https://eyes.nasa.gov/assets/dynamic','https://eyes.nasa.gov/assets/static/wasm/draco','https://eyes.nasa.gov/assets/static/wasm/ktx2/'])assert(isDirectoryUrl(url));
  assert(!isDirectoryUrl('https://eyes.nasa.gov/assets/static/wasm/draco/draco_decoder.wasm'));
});
test('nested model and CSS resources resolve against original upstream URLs', () => {
  assert.deepEqual(dependencies(Buffer.from(JSON.stringify({buffers:[{uri:'a.bin'}],images:[{uri:'../a.png'},{uri:'data:image/png;base64,AA'}]})), 'https://eyes.nasa.gov/assets/static/models/x/a.gltf'), ['https://eyes.nasa.gov/assets/static/models/a.png','https://eyes.nasa.gov/assets/static/models/x/a.bin']);
  assert.deepEqual(dependencies(Buffer.from('@import "a.css"; a { background: url(../b.png) }'), 'https://example.com/css/main.css'), ['https://example.com/b.png','https://example.com/css/a.css']);
});
test('glTF display names never become requests, but exact URIs and extension URIs do',()=>{
  const json={asset:{version:'2.0'},name:'not-a-file.png',buffers:[{name:'wrong.bin',uri:'right.bin'}],images:[{name:'clear.png',uri:'clear_png.png'},{name:'capstone_pbr.jpg',uri:'capstone_pbr_jpg.jpg'}],materials:[{name:'foil_n.jpg',extensions:{TEST_external:{uri:'extension.bin'}}}]};
  assert.deepEqual(dependencies(Buffer.from(JSON.stringify(json)),'https://example.com/model/a.gltf'),['https://example.com/model/capstone_pbr_jpg.jpg','https://example.com/model/clear_png.png','https://example.com/model/extension.bin','https://example.com/model/right.bin']);
  const content={name:'never.png',title:'never-again.jpg',image:'real_(image).jpg',body:'<img src="html_(image).png">'};
  assert.deepEqual(dependencies(Buffer.from(JSON.stringify(content)),'https://example.com/descriptions/a.json'),['https://example.com/descriptions/html_(image).png','https://example.com/descriptions/real_(image).jpg']);
});
test('GLB JSON chunks discover external resources and reject malformed headers/chunks', () => {
  const json=Buffer.from(JSON.stringify({asset:{version:'2.0'},buffers:[{uri:'../geometry.bin'}],images:[{uri:'textures/a.png'}]}));
  const length=Math.ceil(json.length/4)*4;
  const glb=Buffer.alloc(20+length,0x20);
  glb.writeUInt32LE(0x46546c67,0);glb.writeUInt32LE(2,4);glb.writeUInt32LE(glb.length,8);glb.writeUInt32LE(length,12);glb.writeUInt32LE(0x4e4f534a,16);json.copy(glb,20);
  const url='https://example.com/models/rover/model.glb';
  validate(glb,url);
  assert.deepEqual(dependencies(glb,url),['https://example.com/models/geometry.bin','https://example.com/models/rover/textures/a.png']);
  const truncated=Buffer.from(glb);truncated.writeUInt32LE(length+4,12);
  assert.throws(()=>validate(truncated,url),/GLB chunk/);
  const bad=Buffer.from(glb);bad.writeUInt32LE(1,4);
  assert.throws(()=>dependencies(bad,url),/GLB header/);
});
test('real dynamo fixtures use existing measured index parser and window bounds', () => {
  const bytes = fs.readFileSync(path.join(__dirname, '../tests/fixtures/earth-sun-orb.dyn'));
  validate(bytes, 'https://eyes.nasa.gov/assets/dynamic/dynamo/earth/sun/orb/def.dyn');
  const info = readIndexInfo(bytes);
  assert.equal(info.name, 'orb');
  if (!info.hasPoints) assert.equal(dependencies(bytes, 'https://eyes.nasa.gov/assets/dynamic/dynamo/earth/sun/orb/def.dyn').length, info.count - 1);
  assert.equal(segmentUrls('moon/earth/orb',386,3).at(-1), 'https://eyes.nasa.gov/assets/dynamic/dynamo/moon/earth/orb/384.dyn');
});
test('invalid upstream responses cannot become successful mirror files', () => {
  assert.throws(() => validate(Buffer.from('<!doctype html><html>error</html>'), 'https://example.com/a.bin'));
  assert.throws(() => validate(Buffer.from('denied'), 'https://example.com/a.png'));
  assert.throws(() => validate(Buffer.from('not json'), 'https://example.com/a.gltf'));
});
test('source inventory includes actual LOD sizes, dynamo controllers and story overlays', () => {
  const result = inventory();
  const urls = new Set(result.resources.map(r => r.url));
  assert(urls.has('https://eyes.nasa.gov/assets/static/maps/moon/color_4096_5.png'));
  assert(!urls.has('https://eyes.nasa.gov/assets/static/maps/moon/color_2048_5.png'));
  assert(urls.has('https://eyes.nasa.gov/assets/dynamic/dynamo/moon/earth/orb/def.dyn'));
  assert(urls.has('https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/eclipse_1024_5.png'));
  assert(urls.has('https://eyes.nasa.gov/assets/static/models/jupiter/radiation_belt_4/jupiter_radbelt4.gltf'));
  assert(urls.has('https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00141_miranda_geologic_history_(variety_of_terrain).jpg'));
  assert(!urls.has('https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00141_miranda_geologic_history_(variety_of_terrain'));
  assert(!urls.has('https://eyes.nasa.gov/assets/static/env_maps/starmap_2048.jpg'));
  assert(urls.has('https://eyes.nasa.gov/apps/solar-system/assets/wmts_xml/1.0.0/WMTSCapabilities.xml'));
  assert(!urls.has('https://eyes.nasa.gov/apps/solar-system/assets/wmts_xml'));
  assert(result.unresolved.some(r => r.template.includes('/cmts/')));
  assert(result.resources.every(r => !/\$|\{|\}/.test(r.url)));
  assert.equal(result.localDecoders.resources.length,12);
  assert(result.localDecoders.resources.every(r=>r.runtimePath.startsWith('/eyes/decoders/'+result.localDecoders.revision+'/')));
  assert(!result.resources.some(r=>result.localDecoders.resources.some(d=>d.url===r.url)));
});
test('provisioning retries safely, discovers children, reuses verified files and distinguishes 404', async () => {
  const mirror = fs.mkdtempSync(path.join(os.tmpdir(), 'eyes-provision-'));
  let calls = 0;
  const bodies = new Map([
    ['https://example.com/model.gltf', JSON.stringify({buffers:[{uri:'model.bin'}]})],
    ['https://example.com/model.bin', 'binary-fixture']
  ]);
  const manifest = {resources:[{url:'https://example.com/model.gltf'},{url:'https://example.com/absent.png'},{url:'https://example.com/bad.png'}]};
  const fetcher = async url => {
    calls++;
    if (url.endsWith('absent.png')) return new Response('', {status:404});
    if (url.endsWith('bad.png')) return new Response('<!doctype html><html>Error</html>',{headers:{'content-type':'text/html'}});
    return new Response(bodies.get(url));
  };
  try {
    const checkpoints=[];
    const first = await provision({mirror, manifest, fetcher, retry:1, expectedMissing:['https://example.com/absent.png'],onProgress:p=>checkpoints.push(p)});
    assert.equal(first.completed.length,2);
    assert.equal(first.expectedMissing.length,1);
    assert.equal(first.failures.length,1);
    assert.equal(first.completed.find(r => r.url.endsWith('model.bin')).sha256.length,64);
    assert.equal(calls,6);
    assert.equal(checkpoints[0].completed,0);
    assert.equal(checkpoints.at(-1).completed,2);
    assert(!fs.existsSync(path.join(mirror,'external/example.com/bad.png')));
    const second = await provision({mirror, manifest:{resources:[{url:'https://example.com/model.gltf'}]}, fetcher:async()=>{throw new Error('must reuse');}});
    assert.equal(second.completed.filter(r => r.status === 'reused').length,2);
    assert.equal(second.failures.length,0);
  } finally { fs.rmSync(mirror,{recursive:true,force:true}); }
});
