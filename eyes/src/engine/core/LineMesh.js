// Recovered from app.js:75336-82494.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LineMesh {
  constructor(component) {
    this._component = component;
    this._position = new PioneerPublicApi.Vector3();
    this._orientation = new PioneerPublicApi.Quaternion();
    this._scale = 1;
    this._dashGapLength = 0;
    this._dashLength = 1;
    this._glowWidth = 0;
    this._threeJsObjects = [];
    this._threeJsMaterial = component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("line");
    component.getThreeJsMaterials().push(this._threeJsMaterial);
    this._threeJsMaterial.uniforms.dashLength.value = this._dashLength;
    this._threeJsMaterial.uniforms.dashGapLength.value = this._dashGapLength;
    this._threeJsMaterial.uniforms.glowWidth.value = this._glowWidth;
  }
  setPositions(t) {
    if (t.length % 2 != 0) throw new Error("Number of positions in the LineMesh must be even.");
    this._adjustVerticesInGeometries(2 * t.length);
    const e = PioneerPublicApi.Vector3.pool.get();
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    let a = 0;
    for (let n = 0; n < this._threeJsObjects.length; n++) {
      const o = this._threeJsObjects[n].geometry.getAttribute("position");
      const l = o.array;
      for (let o = 0; o < l.length / (2 * LineMesh._floatsPerVertex); o++) {
        const c = o + n * (LineMesh._maxVerticesPerGeometry / 2);
        const h = t[c];
        l[2 * o * LineMesh._floatsPerVertex + 0] = h.x;
        l[2 * o * LineMesh._floatsPerVertex + 1] = h.y;
        l[2 * o * LineMesh._floatsPerVertex + 2] = h.z;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 0] = h.x;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 1] = h.y;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 2] = h.z;
        c % 2 == 0 ? h.equals(t[PioneerPublicApi.MathUtils.wrap(c - 1, 0, t.length)]) ? (e.copy(t[PioneerPublicApi.MathUtils.wrap(c - 2, 0, t.length)]), i.copy(t[c + 1])) : (e.copy(h), i.copy(t[c + 1]), a = 0) : c % 2 == 1 && (h.equals(t[PioneerPublicApi.MathUtils.wrap(c + 1, 0, t.length)]) ? (e.copy(t[c - 1]), i.copy(t[PioneerPublicApi.MathUtils.wrap(c + 2, 0, t.length)])) : (e.copy(t[c - 1]), i.copy(h)), r.sub(h, t[c - 1]), a += r.magnitude());
        l[2 * o * LineMesh._floatsPerVertex + 3] = e.x;
        l[2 * o * LineMesh._floatsPerVertex + 4] = e.y;
        l[2 * o * LineMesh._floatsPerVertex + 5] = e.z;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 3] = e.x;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 4] = e.y;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 5] = e.z;
        l[2 * o * LineMesh._floatsPerVertex + 6] = i.x;
        l[2 * o * LineMesh._floatsPerVertex + 7] = i.y;
        l[2 * o * LineMesh._floatsPerVertex + 8] = i.z;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 6] = i.x;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 7] = i.y;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 8] = i.z;
        l[2 * o * LineMesh._floatsPerVertex + 14] = a;
        l[(2 * o + 1) * LineMesh._floatsPerVertex + 14] = a;
      }
      o.data.needsUpdate = true;
    }
    PioneerPublicApi.Vector3.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(r);
  }
  setColors(t) {
    if (t.length % 2 != 0) throw new Error("Number of colors in the LineMesh must be even.");
    this._adjustVerticesInGeometries(2 * t.length);
    for (let e = 0; e < this._threeJsObjects.length; e++) {
      const i = this._threeJsObjects[e].geometry.getAttribute("color");
      const s = i.array;
      for (let i = 0; i < s.length / (2 * LineMesh._floatsPerVertex); i++) {
        const n = t[i + e * (LineMesh._maxVerticesPerGeometry / 2)];
        s[2 * i * LineMesh._floatsPerVertex + 9] = n.r;
        s[2 * i * LineMesh._floatsPerVertex + 10] = n.g;
        s[2 * i * LineMesh._floatsPerVertex + 11] = n.b;
        s[2 * i * LineMesh._floatsPerVertex + 12] = n.a;
        s[(2 * i + 1) * LineMesh._floatsPerVertex + 9] = n.r;
        s[(2 * i + 1) * LineMesh._floatsPerVertex + 10] = n.g;
        s[(2 * i + 1) * LineMesh._floatsPerVertex + 11] = n.b;
        s[(2 * i + 1) * LineMesh._floatsPerVertex + 12] = n.a;
      }
      i.data.needsUpdate = true;
    }
  }
  setWidths(t) {
    if ("number" == typeof t) for (let e = 0; e < this._threeJsObjects.length; e++) {
      const i = this._threeJsObjects[e].geometry.getAttribute("width");
      const s = i.array;
      for (let e = 0; e < s.length / (2 * LineMesh._floatsPerVertex); e++) {
        s[2 * e * LineMesh._floatsPerVertex + 13] = t;
        s[(2 * e + 1) * LineMesh._floatsPerVertex + 13] = -t;
      }
      i.data.needsUpdate = true;
    } else {
      if (t.length % 2 != 0) throw new Error("Number of widths in the LineMesh must be even.");
      this._adjustVerticesInGeometries(2 * t.length);
      for (let e = 0; e < this._threeJsObjects.length; e++) {
        const i = this._threeJsObjects[e].geometry.getAttribute("width");
        const s = i.array;
        for (let i = 0; i < s.length / (2 * LineMesh._floatsPerVertex); i++) {
          const n = t[i + e * (LineMesh._maxVerticesPerGeometry / 2)];
          s[2 * i * LineMesh._floatsPerVertex + 13] = n;
          s[(2 * i + 1) * LineMesh._floatsPerVertex + 13] = -n;
        }
        i.data.needsUpdate = true;
      }
    }
  }
  setDashLength(dashLength, dashGapLength) {
    this._dashLength = dashLength;
    this._dashGapLength = dashGapLength;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashLength", this._dashLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashGapLength", this._dashGapLength);
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "glowWidth", this._glowWidth);
  }
  setScale(scale) {
    this._scale = scale;
    PioneerPublicApi.ThreeJsHelper.setScale(this._threeJsObjects, scale);
  }
  prepareForRender(t) {
    const e = PioneerPublicApi.Vector2.pool.get();
    if (t instanceof PioneerPublicApi.SpoutComponent) e.set(.1 * t.getRenderWidth(), .5 * t.getRenderWidth() * .1);else {
      const i = t.getViewport();
      i && e.copy(i.getBounds().size);
    }
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this._threeJsMaterial, "viewportSize", e);
    PioneerPublicApi.Vector2.pool.release(e);
    const i = this._component.getVisibleInterval().getFadeMultiplier(this._component.getEntity(), t);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "alphaMultiplier", i);
  }
  _adjustVerticesInGeometries(t) {
    const e = Math.ceil(t / LineMesh._maxVerticesPerGeometry);
    for (; this._threeJsObjects.length > e;) {
      const t = this._threeJsObjects[this._threeJsObjects.length - 1];
      PioneerPublicApi.ThreeJsHelper.destroyObject(t);
      this._threeJsObjects.splice(this._threeJsObjects.length - 1, 1);
      for (let e = 0, i = this._component.getThreeJsObjects().length; e < i; e++) if (this._component.getThreeJsObjects()[e] === t) {
        this._component.getThreeJsObjects().splice(e, 1);
        break;
      }
    }
    if (this._threeJsObjects.length < e) {
      this._threeJsObjects.length > 0 && this._setupThreeJsGeometry(this._threeJsObjects[this._threeJsObjects.length - 1].geometry, LineMesh._maxVerticesPerGeometry);
      for (let i = this._threeJsObjects.length; i < e; i++) {
        const e = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._threeJsMaterial, [], false);
        this._threeJsObjects.push(e);
        this._component.getThreeJsObjects().push(e);
        const n = Math.min(t - i * LineMesh._maxVerticesPerGeometry, LineMesh._maxVerticesPerGeometry);
        this._setupThreeJsGeometry(e.geometry, n);
        PioneerPublicApi.ThreeJsHelper.setPosition(e, this._position);
        PioneerPublicApi.ThreeJsHelper.setOrientation(e, this._orientation);
        PioneerPublicApi.ThreeJsHelper.setScale(e, this._scale);
        e.frustumCulled = false;
      }
    } else if (e > 0) {
      const i = this._threeJsObjects[e - 1].geometry;
      const s = t - (e - 1) * LineMesh._maxVerticesPerGeometry;
      i.getAttribute("position").array.length !== s * LineMesh._floatsPerVertex && this._setupThreeJsGeometry(i, s);
    }
  }
  _setupThreeJsGeometry(t, e) {
    const float32Array = new Float32Array(e * LineMesh._floatsPerVertex);
    const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(float32Array, LineMesh._floatsPerVertex);
    t.setAttribute("position", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
    t.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
    t.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
    t.setAttribute("color", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 4, 9, false));
    t.setAttribute("width", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 13, false));
    t.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 14, false));
    const uint16Array = new Uint16Array(6 * e / 4);
    for (let t = 0; t < e / 4; t++) {
      uint16Array[6 * t + 0] = 4 * t;
      uint16Array[6 * t + 1] = 4 * t + 2;
      uint16Array[6 * t + 2] = 4 * t + 3;
      uint16Array[6 * t + 3] = 4 * t;
      uint16Array[6 * t + 4] = 4 * t + 3;
      uint16Array[6 * t + 5] = 4 * t + 1;
    }
    t.setIndex(new PioneerPublicApi.THREE.BufferAttribute(uint16Array, 1));
  }
  static _floatsPerVertex = 15;
  static _maxVerticesPerGeometry = 65536;
  _component;
  _position;
  _orientation;
  _scale;
  _dashGapLength;
  _dashLength;
  _glowWidth;
  _threeJsObjects;
  _threeJsMaterial;
}
export { LineMesh };
