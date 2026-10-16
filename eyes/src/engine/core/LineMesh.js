/** @eyes-analysis
 * 文件职责：构建宽线所需的顶点、索引和相邻点属性。
 * 依据：import ../pioneer/public-api.js；LineMesh @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:75336-82494.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：构建宽线所需的顶点、索引和相邻点属性。
 * 继承：无显式父类；导出：LineMesh。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LineMesh {
  /** @eyes-analysis
   * 【结构证据】写入 `_component`、`_dashGapLength`、`_dashLength`、`_glowWidth`、`_orientation`、`_position`、`_scale`、`_threeJsMaterial`；调用 `component.getEntity`、`component.getEntity().getScene`、`component.getEntity().getScene().getEngine`、`component.getEntity().getScene().getEngine().getMaterialManager`、`component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded`、`component.getThreeJsMaterials`。
   * 状态写入：_component、_dashGapLength、_dashLength、_glowWidth、_orientation、_position、_scale、_threeJsMaterial等；完整记录见索引。
   * 调用线索：component.getEntity、component.getEntity().getScene、component.getEntity().getScene().getEngine、component.getEntity().getScene().getEngine().getMaterialManager、component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.copy`、`h.equals`、`i.copy`；含显式错误分支。
   * 调用线索：PioneerPublicApi.MathUtils.wrap、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、e.copy、h.equals等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._adjustVerticesInGeometries`、`this._threeJsObjects[e].geometry.getAttribute`；含显式错误分支。
   * 调用线索：new Error、this._adjustVerticesInGeometries、this._threeJsObjects[e].geometry.getAttribute。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._adjustVerticesInGeometries`、`this._threeJsObjects[e].geometry.getAttribute`；含显式错误分支。
   * 调用线索：new Error、this._adjustVerticesInGeometries、this._threeJsObjects[e].geometry.getAttribute。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_dashGapLength`、`_dashLength`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`。
   * 状态写入：_dashGapLength、_dashLength。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber。
   */
  setDashLength(dashLength, dashGapLength) {
    this._dashLength = dashLength;
    this._dashGapLength = dashGapLength;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashLength", this._dashLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashGapLength", this._dashGapLength);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_glowWidth`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`。
   * 状态写入：_glowWidth。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber。
   */
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "glowWidth", this._glowWidth);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_scale`；调用 `PioneerPublicApi.ThreeJsHelper.setScale`。
   * 状态写入：_scale。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setScale。
   */
  setScale(scale) {
    this._scale = scale;
    PioneerPublicApi.ThreeJsHelper.setScale(this._threeJsObjects, scale);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`e.copy`、`e.set`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、PioneerPublicApi.ThreeJsHelper.setUniformVector2、PioneerPublicApi.Vector2.pool.get、PioneerPublicApi.Vector2.pool.release、e.copy等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `Math.ceil`、`Math.min`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.destroyObject`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setPosition`。
   * 调用线索：Math.ceil、Math.min、PioneerPublicApi.ThreeJsHelper.createMeshObject、PioneerPublicApi.ThreeJsHelper.destroyObject、PioneerPublicApi.ThreeJsHelper.setOrientation等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`、`new Uint16Array`、`t.setAttribute`。
   * 调用线索：new Float32Array、new PioneerPublicApi.THREE.BufferAttribute、new PioneerPublicApi.THREE.InterleavedBuffer、new PioneerPublicApi.THREE.InterleavedBufferAttribute、new Uint16Array等。
   */
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
