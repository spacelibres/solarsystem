// Recovered from app.js:151412-159259.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ThreeJsHelper {
  static createGeometry(t, e) {
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    if (e) {
      let e = 0;
      for (let i = 0; i < t.length; i++) e += t[i].dimensions;
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(new Float32Array(0), e);
      let o = 0;
      for (let e = 0; e < t.length; e++) {
        const r = t[e];
        bufferGeometry.setAttribute(r.name, new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, r.dimensions, o));
        o += r.dimensions;
      }
    } else for (let e = 0; e < t.length; e++) {
      const n = t[e];
      bufferGeometry.setAttribute(n.name, new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), n.dimensions));
    }
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    return bufferGeometry;
  }
  static setupObject(t, e) {
    e.name = `${t}.${Math.floor(1e4 * Math.random())}`;
    e.matrixAutoUpdate = false;
    e.frustumCulled = false;
    e.visible = false;
    t.getEntity().getScene().getThreeJsScene().add(e);
  }
  static createMeshObjectGivenGeometry(t, e, i) {
    const mesh = new PioneerPublicApi.THREE.Mesh(i, e);
    this.setupObject(t, mesh);
    return mesh;
  }
  static createMeshObject(t, e, i, s) {
    const n = this.createGeometry(i, s);
    return this.createMeshObjectGivenGeometry(t, e, n);
  }
  static destroyGeometry(t, e) {
    const i = e?.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    for (const e of Object.values(t.attributes)) e instanceof PioneerPublicApi.THREE.GLBufferAttribute && i?.deleteBuffer(e.buffer);
    t.dispose();
  }
  static destroyObject(t, e) {
    for (; t.children.length > 0;) this.destroyObject(t.children[t.children.length - 1]);
    null !== t.parent && t.parent.remove(t);
    t instanceof PioneerPublicApi.THREE.Mesh && t.geometry instanceof PioneerPublicApi.THREE.BufferGeometry && this.destroyGeometry(t.geometry, e);
  }
  static destroyMaterial(t, e) {
    if (e) {
      const e = t.uniforms;
      for (const t in e) if (Object.hasOwn(e, t)) {
        const i = e[t].value;
        i instanceof PioneerPublicApi.THREE.Texture && ThreeJsHelper.destroyTexture(i);
      }
    }
    t.dispose();
  }
  static destroyTexture(t) {
    if (Array.isArray(t.source.data)) for (let e = 0, i = t.source.data.length; e < i; e++) {
      const i = t.source.data[e];
      i instanceof ImageBitmap && i.close();
    } else t.source.data instanceof ImageBitmap && t.source.data.close();
    t.dispose();
  }
  static destroyRenderTarget(t) {
    t.dispose();
  }
  static destroyAllObjectsAndMaterials(t, e = true) {
    const i = t.getThreeJsObjects();
    const s = t.getThreeJsMaterials();
    for (let t = 0; t < i.length; t++) this.destroyObject(i[t]);
    for (let t = 0; t < s.length; t++) this.destroyMaterial(s[t], e);
  }
  static setPosition(t, e) {
    if (t) if (Array.isArray(t)) for (let i = 0, s = t.length; i < s; i++) t[i].position.set(e.x, e.y, e.z);else t.position.set(e.x, e.y, e.z);
  }
  static setPositionToEntity(t, e, i, n, o) {
    if (!t) return;
    const r = e.getCameraSpacePosition(i);
    const a = PioneerPublicApi.Vector3.threeJsPool.get();
    if (a.set(r.x, r.y, r.z), n) {
      const t = PioneerPublicApi.Vector3.pool.get();
      true === o ? t.rotate(e.getOrientation(), n) : t.copy(n);
      a.x += t.x;
      a.y += t.y;
      a.z += t.z;
      PioneerPublicApi.Vector3.pool.release(t);
    }
    if (Array.isArray(t)) for (let e = 0, i = t.length; e < i; e++) t[e].position.copy(a);else t.position.copy(a);
    PioneerPublicApi.Vector3.threeJsPool.release(a);
  }
  static setScale(t, e) {
    if (t) if (Array.isArray(t)) for (let i = 0, s = t.length; i < s; i++) "number" == typeof e ? t[i].scale.set(e, e, e) : t[i].scale.set(e.x, e.y, e.z);else "number" == typeof e ? t.scale.set(e, e, e) : t.scale.set(e.x, e.y, e.z);
  }
  static setOrientation(t, e) {
    if (!t) return;
    const i = PioneerPublicApi.Quaternion.threeJsPool.get();
    if (i.set(e.x, e.y, e.z, e.w), Array.isArray(t)) for (let e = 0, s = t.length; e < s; e++) t[e].setRotationFromQuaternion(i);else t.setRotationFromQuaternion(i);
    PioneerPublicApi.Quaternion.threeJsPool.release(i);
  }
  static setOrientationToBillboard(t, e) {
    if (!t) return;
    const i = PioneerPublicApi.Quaternion.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    e.getEntity().getOrientation().getAxis(n, 1);
    e.getEntity().getOrientation().getAxis(o, 0);
    o.setNormalTo(n, o);
    i.setFromAxes(o, void 0, n);
    const r = PioneerPublicApi.Quaternion.threeJsPool.get();
    if (r.set(i.x, i.y, i.z, i.w), Array.isArray(t)) for (let e = 0, i = t.length; e < i; e++) t[e].setRotationFromQuaternion(r);else t.setRotationFromQuaternion(r);
    PioneerPublicApi.Quaternion.threeJsPool.release(r);
    PioneerPublicApi.Quaternion.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  static setOrientationToEntity(t, e, i) {
    if (!t) return;
    const n = e.getOrientation();
    const o = PioneerPublicApi.Quaternion.threeJsPool.get();
    if (void 0 === i) o.set(n.x, n.y, n.z, n.w);else {
      const t = PioneerPublicApi.Quaternion.pool.get();
      t.mult(n, i);
      o.set(t.x, t.y, t.z, t.w);
      PioneerPublicApi.Quaternion.pool.release(t);
    }
    if (Array.isArray(t)) for (let e = 0, i = t.length; e < i; e++) t[e].setRotationFromQuaternion(o);else t.setRotationFromQuaternion(o);
    PioneerPublicApi.Quaternion.threeJsPool.release(o);
  }
  static useInDynEnvMap(t, e) {
    e ? t.layers.enable(1) : t.layers.disable(1);
  }
  static createGLBufferAttribute(t, e, i, n, o) {
    const r = o.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    const a = r.createBuffer();
    const l = "vertex" === t ? r.ARRAY_BUFFER : r.ELEMENT_ARRAY_BUFFER;
    let c;
    l === r.ELEMENT_ARRAY_BUFFER && (c = r.getParameter(r.ELEMENT_ARRAY_BUFFER_BINDING));
    r.bindBuffer(l, a);
    let h = r.FLOAT;
    let d = 4;
    "unsignedByte" === i ? (h = r.UNSIGNED_BYTE, d = 1) : "unsignedShort" === i ? (h = r.UNSIGNED_SHORT, d = 2) : "unsignedInt" === i && (h = r.UNSIGNED_INT, d = 4);
    r.bufferData(l, e.length * d, r.STATIC_DRAW);
    c && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, c);
    return new PioneerPublicApi.THREE.GLBufferAttribute(a, h, n, d, e.length / n);
  }
  static updateGLBufferAttribute(t, e, i, s, n, o) {
    const r = o.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    const a = "vertex" === e ? r.ARRAY_BUFFER : r.ELEMENT_ARRAY_BUFFER;
    let l;
    a === r.ELEMENT_ARRAY_BUFFER && (l = r.getParameter(r.ELEMENT_ARRAY_BUFFER_BINDING));
    r.bindBuffer(a, t.buffer);
    r.bufferSubData(a, s * t.elementSize, i, s, n);
    l && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, l);
  }
  static setVertices(t, e, i) {
    const n = t.getAttribute(e);
    n instanceof PioneerPublicApi.THREE.BufferAttribute && (n.array.length === i.length ? (n.copyArray(i), n.needsUpdate = true) : t.setAttribute(e, new PioneerPublicApi.THREE.BufferAttribute(i, t.getAttribute(e).itemSize)));
  }
  static setIndices(t, e) {
    const i = t.getIndex();
    i && i.array.length === e.length ? (i.copyArray(e), i.needsUpdate = true) : t.setIndex(new PioneerPublicApi.THREE.BufferAttribute(e, 1));
  }
  static computeTangents(t) {
    t.computeTangents();
  }
  static setRenderOrder(t, e) {
    t && (t.renderOrder = e);
  }
  static cloneMaterial(t) {
    const e = t.clone();
    for (const [i, s] of Object.entries(t.uniforms)) {
      const t = s.value;
      e.uniforms[i].value = this._cloneUniformValue(t);
    }
    e.needsUpdate = true;
    return e;
  }
  static _cloneUniformValue(t) {
    if (null === t) return null;
    if ("number" == typeof t) return t;
    if (Array.isArray(t)) {
      const e = [];
      for (let i = 0; i < t.length; i++) e.push(this._cloneUniformValue(t[i]));
      return e;
    }
    return t.clone();
  }
  static async loadTexture(t, e, i) {
    return t.getEntity().getScene().getEngine().getTextureLoader().loadTexture(e, -t.getEntity().getLeastCameraDepth(), i);
  }
  static loadTextureFromCanvas(t) {
    const canvasTexture = new PioneerPublicApi.THREE.CanvasTexture(t);
    canvasTexture.magFilter = PioneerPublicApi.THREE.NearestFilter;
    canvasTexture.minFilter = PioneerPublicApi.THREE.NearestFilter;
    canvasTexture.flipY = false;
    canvasTexture.needsUpdate = true;
    return canvasTexture;
  }
  static async loadTextureIntoUniform(t, e, i, s) {
    const n = await this.loadTexture(t, i, s);
    e.value && ThreeJsHelper.destroyTexture(e.value);
    e.value = n;
  }
  static setOverlay(t, e) {
    t && (t.depthFunc = e ? PioneerPublicApi.THREE.AlwaysDepth : PioneerPublicApi.THREE.LessEqualDepth);
  }
  static setTransparent(t, e) {
    t && (t.transparent = e, t.depthWrite = !e);
  }
  static setBlending(t, e) {
    if (t) {
      switch (e) {
        case "normal":
          t.blending = PioneerPublicApi.THREE.NormalBlending;
          break;
        case "additive":
          t.blending = PioneerPublicApi.THREE.AdditiveBlending;
          break;
        case "subtractive":
          t.blending = PioneerPublicApi.THREE.SubtractiveBlending;
          break;
        case "multiply":
          t.blending = PioneerPublicApi.THREE.MultiplyBlending;
          break;
        case "custom":
          t.blending = PioneerPublicApi.THREE.CustomBlending;
          break;
        case "none":
          t.blending = PioneerPublicApi.THREE.NoBlending;
      }
      t.needsUpdate = true;
    }
  }
  static setDefine(t, e, i) {
    !i || false !== t.defines[e] && void 0 !== t.defines[e] ? i || true !== t.defines[e] || (delete t.defines[e], t.needsUpdate = true) : (t.defines[e] = true, t.needsUpdate = true);
  }
  static setUniformNumber(t, e, i) {
    t && (t.uniforms[e].value = i);
  }
  static setUniformVector2(t, e, i) {
    if (!t) return;
    t.uniforms[e].value.set(i.x, i.y);
  }
  static setUniformVector3(t, e, i) {
    if (!t) return;
    t.uniforms[e].value.set(i.x, i.y, i.z);
  }
  static setUniformColorRGB(t, e, i) {
    if (!t) return;
    t.uniforms[e].value.set(i.r, i.g, i.b);
  }
  static setUniformColorRGBA(t, e, i, s = 1) {
    if (!t) return;
    t.uniforms[e].value.set(i.r, i.g, i.b, i.a * s);
  }
  static setUniformQuaternion(t, e, i) {
    if (!t) return;
    t.uniforms[e].value.set(i.x, i.y, i.z, i.w);
  }
  static setUniformTexture(t, e, i) {
    if (!t) return;
    const s = t.uniforms[e].value;
    s && ThreeJsHelper.destroyTexture(s);
    t.uniforms[e].value = i;
  }
}
export { ThreeJsHelper };
