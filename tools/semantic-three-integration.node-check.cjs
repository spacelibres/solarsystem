const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
(async () => {
  const THREE = await import(pathToFileURL(path.join(root, 'eyes/src/vendor/three/index.js')));
  function load(relative, name, api) {
    const source = fs.readFileSync(path.join(root, relative), 'utf8')
      .replace(/^import .*;\r?\n/gm, '').replace(/^export \{[^}]+\};?\s*$/gm, '');
    const context = vm.createContext({ PioneerPublicApi: api, console, Float32Array, Uint16Array, ImageBitmap: class ImageBitmap {} });
    return vm.runInContext(`${source}\n${name}`, context, { filename: relative });
  }
  const H = load('eyes/src/engine/core/ThreeJsHelper.js', 'ThreeJsHelper', { THREE });
  const Camera = load('eyes/src/engine/components/CameraComponent.js', 'CameraComponent', { THREE, BaseComponent: class {} });
  const Viewport = load('eyes/src/engine/core/Viewport.js', 'Viewport', { THREE, CollectionItem: class {}, Vector2: { NaN: new THREE.Vector2(NaN, NaN) } });
  let checks = 0; const failures = [];
  function check(name, fn) { try { fn(); checks++; console.log(`PASS ${name}`); } catch (error) { failures.push({ name, error }); console.error(`FAIL ${name}: ${error.message}`); } }
  check('interleaved position/uv preserve two independent vertices and shared backing', () => {
    const g = H.createGeometry([{ name: 'position', dimensions: 3 }, { name: 'uv', dimensions: 2 }], true);
    const p = g.getAttribute('position'), uv = g.getAttribute('uv');
    p.data.array = new Float32Array([2, 10, 4, .25, .5, -3, 20, 6, .75, 1]);
    p.data.count = 2;
    assert.equal(p.data, uv.data); assert.equal(p.data.stride, 5);
    assert.deepEqual([p.getX(1), p.getY(1), p.getZ(1)], [-3, 20, 6]);
    assert.deepEqual([uv.getX(0), uv.getY(1)], [.25, 1]);
    H.setVertices(g, 'position', new Float32Array([9, 9, 9]));
    assert.equal(p.getX(0), 2); // Current helper deliberately only accepts BufferAttribute.
  });
  check('manual transform must be committed before Three scene world propagation', () => {
    const scene = new THREE.Scene(), c = { toString: () => 'test', getEntity: () => ({ getScene: () => ({ getThreeJsScene: () => scene }) }) };
    const mesh = H.createMeshObject(c, new THREE.ShaderMaterial(), [{ name: 'position', dimensions: 3 }], false);
    H.setPosition(mesh, { x: 10, y: 20, z: 30 }); H.setScale(mesh, 2);
    scene.updateMatrixWorld(true);
    assert.deepEqual(new THREE.Vector3(1, 2, 3).applyMatrix4(mesh.matrixWorld).toArray(), [1, 2, 3]);
    mesh.updateMatrix(); scene.updateMatrixWorld(true);
    assert.deepEqual(new THREE.Vector3(1, 2, 3).applyMatrix4(mesh.matrixWorld).toArray(), [12, 24, 36]);
    assert.equal(mesh.frustumCulled, false); assert.equal(mesh.visible, false);
  });
  check('Eyes +Y forward projection and inverse recover scene points', () => {
    const camera = Object.create(Camera.prototype);
    Object.assign(camera, { _fieldOfView: Math.PI / 2, _aspectRatio: 2, _autoNearDistance: 1, _threeJsCamera: new THREE.PerspectiveCamera() });
    camera._updateProjectionMatrix();
    const projection = camera._threeJsCamera.projectionMatrix;
    const ndc = new THREE.Vector3(2, 10, 3).applyMatrix4(projection);
    assert.ok(Math.abs(ndc.x - .2) < 1e-12); assert.ok(Math.abs(ndc.y - .6) < 1e-12);
    assert.ok(new THREE.Vector3(2, 10, 3).distanceTo(ndc.clone().applyMatrix4(camera._threeJsCamera.projectionMatrixInverse)) < 1e-12);
    assert.ok(new THREE.Vector3(0, -10, 0).applyMatrix4(projection).z > 1);
  });
  check('viewport maps interior NDC and excludes exact near/far boundaries', () => {
    const viewport = Object.create(Viewport.prototype);
    viewport._bounds = { origin: { x: 100, y: 50 }, size: { x: 800, y: 400 } };
    const out = new THREE.Vector2();
    viewport.getPixelSpacePositionFromNormalSpacePosition(out, { x: .5, y: -.5, z: 0 });
    assert.deepEqual(out.toArray(), [700, 350]);
    for (const z of [-1, 1, 2]) { viewport.getPixelSpacePositionFromNormalSpacePosition(out, { x: 0, y: 0, z }); assert.ok(Number.isNaN(out.x)); }
  });
  check('clone material isolates vectors and Texture objects but shares Texture Source', () => {
    const texture = new THREE.Texture({ width: 2, height: 2 });
    const material = new THREE.ShaderMaterial({ uniforms: { nested: { value: [new THREE.Vector3(1, 2, 3)] }, map: { value: texture } } });
    const clone = H.cloneMaterial(material);
    clone.uniforms.nested.value[0].x = 99;
    assert.equal(material.uniforms.nested.value[0].x, 1);
    assert.notEqual(clone.uniforms.map.value, texture); assert.equal(clone.uniforms.map.value.source, texture.source);
    let disposed = 0; clone.uniforms.map.value.addEventListener('dispose', () => disposed++);
    H.destroyMaterial(clone, false); assert.equal(disposed, 0);
    H.destroyMaterial(clone, true); assert.equal(disposed, 1);
  });
  check('Points and Line geometries receive disposal events', () => {
    for (const ObjectClass of [THREE.Points, THREE.Line]) {
      const geometry = new THREE.BufferGeometry(); let disposed = 0;
      geometry.addEventListener('dispose', () => disposed++);
      H.destroyObject(new ObjectClass(geometry, new THREE.ShaderMaterial()));
      assert.equal(disposed, 1);
    }
  });
  check('nested never-rendered native GL attributes preserve component context', () => {
    const deleted = [], gl = { deleteBuffer: b => deleted.push(b) };
    const component = { getEntity: () => ({ getScene: () => ({ getEngine: () => ({ __getThreeJsRenderer: () => ({ getContext: () => gl }) }) }) }) };
    const geometry = new THREE.BufferGeometry(), buffer = {};
    geometry.setAttribute('position', new THREE.GLBufferAttribute(buffer, 5126, 3, 4, 1));
    const group = new THREE.Group(); group.add(new THREE.Mesh(geometry));
    H.destroyObject(group, component); assert.deepEqual(deleted, [buffer]); deleted.length = 0;
    H.destroyGeometry(geometry, component); assert.deepEqual(deleted, [buffer]);
  });
  check('destroyAll releases never-rendered external GL buffer through component', () => {
    const deleted = [], gl = { deleteBuffer: buffer => deleted.push(buffer) };
    const geometry = new THREE.BufferGeometry(), buffer = {};
    geometry.setAttribute('position', new THREE.GLBufferAttribute(buffer, 5126, 3, 4, 1));
    const mesh = new THREE.Mesh(geometry);
    const component = { getEntity: () => ({ getScene: () => ({ getEngine: () => ({ __getThreeJsRenderer: () => ({ getContext: () => gl }) }) }) }), getThreeJsObjects: () => [mesh], getThreeJsMaterials: () => [] };
    H.destroyAllObjectsAndMaterials(component); assert.deepEqual(deleted, [buffer]);
  });
  if (failures.length) throw new Error(`${failures.length} integration check(s) failed`);
  console.log(`${checks} CPU integration checks passed; recovered Three revision ${THREE.REVISION}. No WebGL context or GPU shader compilation exercised.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
