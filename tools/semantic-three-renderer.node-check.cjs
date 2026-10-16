const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const { canonicalRenderer, rendererCorrespondence } = require('./lib/three-renderer-match.cjs');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const rendererPath = 'eyes/src/vendor/three/index.js';
const source = read(rendererPath);
const baseline = { hash: '5ea09260604f69db671df21e204c707e4915fadd48193fcd97f674352af0f662', bindings: 2644, references: 12502, writes: 737 };
assert.deepEqual(canonicalRenderer(source), baseline, 'Renderer changed beyond lexical names/comments');

// Positive shadowing and negative capture/property/import/export/write checks
// keep this proof independent from trusting a renamed source file alone.
const hash = source => canonicalRenderer(source).hash;
assert.equal(hash('/* @license upstream header */ let a=1'), hash('let b=1'));
assert.equal(hash('function a(){function a(){return 2}return a()}'), hash('function outer(){function inner(){return 2}return inner()}'));
assert.equal(hash('import {x as a} from "m";let b=a;b++;export {b as result}'), hash('import {x as c} from "m";let d=c;d++;export {d as result}'));
assert.equal(hash('function f(a=1,b=a){let c=2;return b+c}'), hash('function outer(first=1,second=first){let local=2;return second+local}'));
assert.equal(hash('function f(a=1){function g(a){return a}return g(a)}'), hash('function outer(value=1){function inner(shadow){return shadow}return inner(value)}'));
for (const [a, b] of [
  ['let a=1;function f(){let b=2;return a+b}', 'let a=1;function f(){let b=2;return b+b}'],
  ['let a={};a.value=1', 'let a={};a.other=1'],
  ['import {x as a} from "m";a()', 'import {y as a} from "m";a()'],
  ['let a=1;export {a as x}', 'let a=1;export {a as y}'],
  ['let a=1;a++', 'let a=1;a--'],
  ['let a=1;let b=2;a=b', 'let a=1;let b=2;b=a'],
  ['function f(a=1,b=a){let c=2;return b+c}', 'function f(a=1,b=2){let c=2;return b+c}'],
  ['function f(a=1){function g(a){return a}return g(a)}', 'function f(a=1){function g(b){return a}return g(a)}'],
]) assert.notEqual(hash(a), hash(b));

const ast = parser.parse(source, { sourceType: 'module' });
const shaderChunks = ast.program.body.flatMap(node => node.declarations || []).find(node => node.id.name === 'ShaderChunk').init.properties.map(node => [node.key.name, node.value.value]);
assert.equal(shaderChunks.length, 142);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(shaderChunks)).digest('hex'), 'fec686a87ead4af580b6f0c871f85bab71f2ed8f20fc01619dc56acee10f367a');
function extract(names, globals = {}) {
  const nodes = ast.program.body.filter(node => names.includes(node.id?.name));
  assert.equal(nodes.length, names.length, 'Expected renderer declarations');
  return vm.runInNewContext(nodes.map(node => generate(node).code).join('\n') + `\n({${names.join(',')}})`, globals);
}

const scheduled = [], cancelled = [], frames = [];
const { WebGLAnimation } = extract(['WebGLAnimation']);
const animation = WebGLAnimation();
animation.start();
assert.equal(scheduled.length, 0);
animation.setContext({ requestAnimationFrame(callback) { scheduled.push(callback); return scheduled.length; }, cancelAnimationFrame(id) { cancelled.push(id); } });
animation.setAnimationLoop((time, frame) => frames.push([time, frame]));
animation.start(); animation.start();
assert.equal(scheduled.length, 1);
scheduled[0](17, 'XRFrame');
assert.deepEqual(frames, [[17, 'XRFrame']]);
animation.stop();
assert.deepEqual(cancelled, [2]);

const { WebGLProperties } = extract(['WebGLProperties']);
const properties = WebGLProperties(), object = {};
const record = properties.get(object);
properties.update(object, 'version', 3);
assert.equal(properties.get(object), record);
assert.equal(record.version, 3);
properties.remove(object);
assert.notEqual(properties.get(object), record);
properties.dispose();

const { WebGLRenderList, painterSortStable, reversePainterSortStable } = extract(['WebGLRenderList', 'painterSortStable', 'reversePainterSortStable']);
const list = WebGLRenderList();
list.init();
list.push({ id: 1 }, {}, { id: 1, transparent: false, transmission: 0 }, 0, 9, null);
list.push({ id: 2 }, {}, { id: 2, transparent: true, transmission: 0 }, 0, 3, null);
list.push({ id: 3 }, {}, { id: 3, transparent: true, transmission: 0 }, 0, 8, null);
list.push({ id: 4 }, {}, { id: 4, transparent: false, transmission: 1 }, 0, 2, null);
list.sort(painterSortStable, reversePainterSortStable);
assert.deepEqual(Array.from(list.opaque, item => item.id), [1]);
assert.deepEqual(Array.from(list.transmissive, item => item.id), [4]);
assert.deepEqual(Array.from(list.transparent, item => item.id), [3, 2]);
list.finish(); list.init();
assert.equal(list.opaque.length + list.transmissive.length + list.transparent.length, 0);

const { setValueV1f, setValueV2f, setValueV3f, arraysEqual, copyArray } = extract(['setValueV1f', 'setValueV2f', 'setValueV3f', 'arraysEqual', 'copyArray']);
const calls = [];
const gl = new Proxy({}, { get: (_, name) => (...values) => calls.push([name, ...values]) });
const scalar = { addr: 'scalar', cache: [] };
setValueV1f.call(scalar, gl, 3); setValueV1f.call(scalar, gl, 3); setValueV1f.call(scalar, gl, 4);
assert.deepEqual(calls, [['uniform1f', 'scalar', 3], ['uniform1f', 'scalar', 4]]);
calls.length = 0;
const vector = { addr: 'vector', cache: [] };
setValueV2f.call(vector, gl, { x: 2, y: 4 }); setValueV2f.call(vector, gl, { x: 2, y: 4 });
setValueV3f.call({ addr: 'color', cache: [] }, gl, { r: 1, g: 0.5, b: 0 });
assert.deepEqual(calls, [['uniform2f', 'vector', 2, 4], ['uniform3f', 'color', 1, 0.5, 0]]);

const { WebGLAttributes } = extract(['WebGLAttributes'], { Float32Array, ThreeCore: { FloatType: 1015, HalfFloatType: 1016 } });
const bufferCalls = [];
const attributeGL = { FLOAT: 5126, createBuffer: () => 'buffer', bindBuffer: (...args) => bufferCalls.push(['bind', ...args]), bufferData: (...args) => bufferCalls.push(['data', ...args]), bufferSubData: (...args) => bufferCalls.push(['sub', ...args]), deleteBuffer: (...args) => bufferCalls.push(['delete', ...args]) };
const attributes = WebGLAttributes(attributeGL);
const attribute = { array: new Float32Array([1, 2, 3]), usage: 35044, version: 0, updateRanges: [], onUploadCallback() {}, clearUpdateRanges() { this.updateRanges.length = 0; } };
attributes.update(attribute, 34962);
assert.equal(attributes.get(attribute).type, 5126);
assert.equal(attributes.get(attribute).bytesPerElement, 4);
attributes.update(attribute, 34962);
assert.equal(bufferCalls.filter(call => call[0] === 'data').length, 1);
attribute.array[1] = 9; attribute.version++;
attributes.update(attribute, 34962);
assert.equal(bufferCalls.filter(call => call[0] === 'sub').length, 1);
attributes.remove(attribute);
assert.equal(attributes.get(attribute), undefined);
assert.deepEqual(bufferCalls.at(-1), ['delete', 'buffer']);

function addonDeclarations(file, names, globals = {}) {
  const tree = parser.parse(read(`eyes/src/vendor/modules/${file}.js`), { sourceType: 'module' });
  const nodes = tree.program.body.filter(node => names.includes(node.id?.name));
  assert.equal(nodes.length, names.length);
  return vm.runInNewContext(nodes.map(node => generate(node).code).join('\n') + `\n({${names.join(',')}})`, globals);
}
const gltf = addonDeclarations('GLTFLoader', ['GLTFRegistry', 'createAttributesKey', 'createPrimitiveKey', 'assignExtrasToUserData', 'addUnknownExtensionsToUserData', 'getNormalizedComponentScale'], { Int8Array, Uint8Array, Int16Array, Uint16Array, c: { KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression' }, console });
const registry = gltf.GLTFRegistry();
registry.add('mesh:1', 7); assert.equal(registry.get('mesh:1'), 7);
registry.remove('mesh:1'); assert.equal(registry.get('mesh:1'), undefined);
registry.add('mesh:2', 8); registry.removeAll(); assert.equal(registry.get('mesh:2'), undefined);
assert.equal(gltf.createAttributesKey({ NORMAL: 3, POSITION: 2 }), 'NORMAL:3;POSITION:2;');
assert.equal(gltf.createPrimitiveKey({ indices: 4, attributes: { POSITION: 2 }, mode: 4 }), '4:POSITION:2;:4');
const userObject = { userData: {} };
gltf.assignExtrasToUserData(userObject, { extras: { source: 'fixture' } });
gltf.addUnknownExtensionsToUserData({ known: true }, userObject, { extensions: { known: {}, custom: { enabled: true } } });
assert.equal(userObject.userData.source, 'fixture');
assert.equal(userObject.userData.gltfExtensions.custom.enabled, true);
assert.equal(userObject.userData.gltfExtensions.known, undefined);
assert.equal(gltf.getNormalizedComponentScale(Uint16Array), 1 / 65535);
assert.throws(() => gltf.getNormalizedComponentScale(Float32Array), /Unsupported normalized/);

const colorSpaces = addonDeclarations('KTX2Loader', ['parseColorSpace'], { Ci: { KHR_DF_PRIMARIES_BT709: 1, KHR_DF_PRIMARIES_DISPLAYP3: 12, KHR_DF_PRIMARIES_UNSPECIFIED: 0, KHR_DF_TRANSFER_SRGB: 2 }, ThreeCore: { SRGBColorSpace: 'srgb', LinearSRGBColorSpace: 'linear', NoColorSpace: '' }, DisplayP3ColorSpace: { DisplayP3ColorSpace: 'p3', LinearDisplayP3ColorSpace: 'linear-p3' }, console });
for (const [colorPrimaries, transferFunction, expected] of [[1, 2, 'srgb'], [1, 1, 'linear'], [12, 2, 'p3'], [12, 1, 'linear-p3'], [0, 1, '']]) {
  assert.equal(colorSpaces.parseColorSpace({ dataFormatDescriptor: [{ colorPrimaries, transferFunction }] }), expected);
}

// Exercise the real pass's destination/clear/texture routing without a GPU.
const pass = addonDeclarations('ShaderPass', ['ShaderPass'], { Pass: { Pass: class {}, FullScreenQuad: class {} } }).ShaderPass.prototype;
const routed = [], passState = { uniforms: { tDiffuse: { value: null } }, textureID: 'tDiffuse', material: 'shader', renderToScreen: false, clear: true, _fsQuad: { render() { routed.push('draw'); } } };
const renderer = { autoClearColor: true, autoClearDepth: false, autoClearStencil: true, setRenderTarget(target) { routed.push(target); }, clear(...flags) { routed.push(flags); } };
pass.render.call(passState, renderer, 'write-target', { texture: 'read-texture' });
assert.equal(passState.uniforms.tDiffuse.value, 'read-texture');
assert.deepEqual(routed, ['write-target', [true, false, true], 'draw']);
routed.length = 0; passState.renderToScreen = true;
pass.render.call(passState, renderer, 'write-target', { texture: 'next-texture' });
assert.deepEqual(routed, [null, 'draw']);

const addonBaselines = {
  "eyes/src/vendor/modules/CopyShader.js": {
    "hash": "1f08f9676fe932ce6dff25ca073304e315cbf88f65db977ad9528454681431c7",
    "bindings": 1,
    "references": 1,
    "writes": 0
  },
  "eyes/src/vendor/modules/LuminosityHighPassShader.js": {
    "hash": "7bef0ea5d35266c42b22cfdb6d0cc1de2e233ea8eadbd19a3f0c279cc5e7fd1f",
    "bindings": 2,
    "references": 2,
    "writes": 0
  },
  "eyes/src/vendor/modules/EffectComposer.js": {
    "hash": "2878faf9d6442fabfe65ae474fe3f96bd6b98eb4f8b5b3ff454c2ac1c9ef3b5b",
    "bindings": 32,
    "references": 73,
    "writes": 8
  },
  "eyes/src/vendor/modules/Pass.js": {
    "hash": "3d2e93a1542715fd74e6865419009ea5fd49f03401d5d0cc59d535a1ebab263c",
    "bindings": 9,
    "references": 13,
    "writes": 0
  },
  "eyes/src/vendor/modules/OutlinePass.js": {
    "hash": "d4ddc8d0a4c3fa2d00f92eeb03056dac46217e80b022153ad64c419d00c3be2b",
    "bindings": 40,
    "references": 190,
    "writes": 3
  },
  "eyes/src/vendor/modules/MaskPass.js": {
    "hash": "a00879510e922dda6d0c65fbab2d69391c46652ec17056a2362bccd7a27a5a3c",
    "bindings": 13,
    "references": 45,
    "writes": 4
  },
  "eyes/src/vendor/modules/ShaderPass.js": {
    "hash": "1c5a360db55ad1f41edd090c66a9f482531f93a64e254262473febb5407b1700",
    "bindings": 8,
    "references": 27,
    "writes": 0
  },
  "eyes/src/vendor/modules/RenderPass.js": {
    "hash": "47dcc8c837826409895344f9ea1ffa61e43cf392ea4593ef6f90bdf8fb4f7301",
    "bindings": 14,
    "references": 29,
    "writes": 2
  },
  "eyes/src/vendor/modules/UnrealBloomPass.js": {
    "hash": "1f75c916c161e9cbb45a89dcff14a0bbea60a0d08ac31d6db0cd03b8f80f303a",
    "bindings": 38,
    "references": 163,
    "writes": 17
  },
  "eyes/src/vendor/modules/DRACOLoader.js": {
    "hash": "aeb9e542c7a418af70d0c6040f482a954b4e1865a2ccae461a0aa4176557d430",
    "bindings": 147,
    "references": 362,
    "writes": 21
  },
  "eyes/src/vendor/modules/KTX2Loader.js": {
    "hash": "c36a32bb350029797501f8400093de9be7aa2b9590e18aeedb3fe1eee4a63531",
    "bindings": 154,
    "references": 704,
    "writes": 36
  },
  "eyes/src/vendor/modules/GLTFLoader.js": {
    "hash": "e03db4ea3912850e810459d1fdd1148f1133efb4d535e254042b03ffe23b7d3a",
    "bindings": 812,
    "references": 2436,
    "writes": 118
  }
};
for (const [file, baseline] of Object.entries(addonBaselines)) assert.deepEqual(canonicalRenderer(read(file)), baseline, file);

for (const upstream of process.argv.slice(2)) {
  const result = rendererCorrespondence(source, fs.readFileSync(upstream, 'utf8'));
  assert.equal(result.normalizedOfficialHash, 'e8786ddeab3c1d10832c063ad3ddd4dd2b0c34b242454e7ebe614cce34dbfa7b');
  assert.equal(result.declarations.length, 106);
  assert.equal(result.variables.length, 49);
  assert.equal(result.variables.filter(item => !item.equal).length, 0);
  assert.deepEqual(result.declarations.filter(item => !item.equal).map(item => item.name), ['WebGLShadowMap']);
  console.log(`${upstream}: 105/106 exact declaration AST matches after core-import normalization`);
}
console.log('Renderer: frozen AST proof, capture rejection and CPU/mock-GL checks passed');
