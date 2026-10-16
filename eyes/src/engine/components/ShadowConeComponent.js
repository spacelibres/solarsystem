/** @eyes-analysis
 * 文件职责：按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。
 * 依据：import ../pioneer/index.js；ShadowConeComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:747098-750608.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。
 * 继承：Pioneer.BaseComponent；导出：ShadowConeComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ShadowConeComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_numberOfCirclePoints`、`_shadowType`、`_sourceEntity`、`_targetEntity`；调用 `new Pioneer.Color`、`new Pioneer.EntityRef`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_color、_numberOfCirclePoints、_shadowType、_sourceEntity、_targetEntity。
   * 调用线索：new Pioneer.Color、new Pioneer.EntityRef、super、this.__setRadius、this.getEntity等。
   */
  constructor(t, e) {
    super(t, e);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._sourceEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._shadowType = "umbra";
    this._targetEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._numberOfCirclePoints = 20;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._color.copy`。
   * 调用线索：this._color.copy。
   */
  setColor(t) {
    this._color.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sourceEntity.getName()`；调用 `this._sourceEntity.getName`。
   * 调用线索：this._sourceEntity.getName。
   */
  getSourceEntity() {
    return this._sourceEntity.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._sourceEntity.setName`。
   * 调用线索：this._sourceEntity.setName。
   */
  setSourceEntity(t) {
    this._sourceEntity.setName(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._targetEntity.getName()`；调用 `this._targetEntity.getName`。
   * 调用线索：this._targetEntity.getName。
   */
  getTargetEntity() {
    return this._targetEntity.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._targetEntity.setName`。
   * 调用线索：this._targetEntity.setName。
   */
  setTargetEntity(t) {
    this._targetEntity.setName(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._shadowType`。
   */
  getShadowType() {
    return this._shadowType;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_shadowType`；调用 `this.resetResources`。
   * 状态写入：_shadowType。
   * 调用线索：this.resetResources。
   */
  setShadowType(shadowType) {
    this._shadowType = shadowType;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、Pioneer.ThreeJsHelper.setUniformColorRGBA、this._updateMesh、this.getEntity、this.getThreeJsMaterials等。
   */
  __prepareForRender(t) {
    this._updateMesh();
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    const e = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.createMeshObject`、`this._createMesh`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。
   * 调用线索：Pioneer.ThreeJsHelper.createMeshObject、this._createMesh、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine等。
   */
  async __loadResources() {
    const t = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("basic_alpha");
    this.getThreeJsMaterials().push(t);
    const e = Pioneer.ThreeJsHelper.createMeshObject(this, t, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(e);
    this._createMesh();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setIndices`、`Pioneer.ThreeJsHelper.setVertices`、`new Float32Array`、`new Uint16Array`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setIndices、Pioneer.ThreeJsHelper.setVertices、new Float32Array、new Uint16Array、this.getThreeJsObjects。
   */
  _createMesh() {
    const float32Array = new Float32Array(2 * this._numberOfCirclePoints * 3);
    const uint16Array = new Uint16Array(6 * this._numberOfCirclePoints);
    for (let t = 0; t < this._numberOfCirclePoints; t++) {
      const i = (t + 1) % this._numberOfCirclePoints;
      uint16Array[6 * t + 0] = t;
      uint16Array[6 * t + 1] = i;
      uint16Array[6 * t + 2] = i + this._numberOfCirclePoints;
      uint16Array[6 * t + 3] = i + this._numberOfCirclePoints;
      uint16Array[6 * t + 4] = t + this._numberOfCirclePoints;
      uint16Array[6 * t + 5] = t;
    }
    const i = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(i, "position", float32Array);
    Pioneer.ThreeJsHelper.setIndices(i, uint16Array);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.cos`、`Math.min`、`Math.sin`、`Math.sqrt`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`。
   * 调用线索：Math.cos、Math.min、Math.sin、Math.sqrt、Pioneer.Quaternion.pool.get等。
   */
  _updateMesh() {
    const t = this._sourceEntity.get();
    if (null === t) return;
    const e = this._targetEntity.get();
    const i = t.getExtentsRadius();
    const n = this.getEntity().getExtentsRadius();
    const o = Pioneer.Vector3.pool.get();
    this.getEntity().getPositionRelativeToEntity(o, Pioneer.Vector3.Zero, t);
    const r = o.magnitude();
    if (o.normalize(o), o.isNaN()) return;
    let a = 10 * n;
    if (null !== e) {
      const t = Pioneer.Vector3.pool.get();
      e.getPositionRelativeToEntity(t, Pioneer.Vector3.Zero, this.getEntity());
      a = t.magnitude();
      Pioneer.Vector3.pool.release(t);
    }
    const l = this.getThreeJsObjects()[0].geometry.getAttribute("position");
    const c = l.array;
    let h;
    let d;
    let u;
    let p;
    if ("umbra" === this._shadowType) {
      const t = (i - n) / r;
      const e = n / t;
      const s = t / Math.sqrt(1 - t * t);
      u = n * t;
      p = Math.min(a, e);
      h = s * (e - u);
      d = s * (e - p);
    } else {
      const t = (i + n) / r;
      const e = -n / t;
      const s = t / Math.sqrt(1 - t * t);
      u = -n * t;
      p = a;
      h = -s * (e - u);
      d = -s * (e - p);
    }
    null !== this.getEntity().getComponent(Pioneer.SpheroidComponent) && (h *= 1.02);
    for (let t = 0; t < this._numberOfCirclePoints; t++) {
      const e = t / this._numberOfCirclePoints * Pioneer.MathUtils.TwoPi;
      const i = Math.cos(e);
      const n = Math.sin(e);
      c[3 * t + 0] = h * i;
      c[3 * t + 1] = h * n;
      c[3 * t + 2] = u;
      c[3 * (t + this._numberOfCirclePoints) + 0] = d * i;
      c[3 * (t + this._numberOfCirclePoints) + 1] = d * n;
      c[3 * (t + this._numberOfCirclePoints) + 2] = p;
    }
    l.needsUpdate = true;
    const _ = Pioneer.Quaternion.pool.get();
    const m = Pioneer.Quaternion.pool.get();
    const g = Pioneer.Vector3.pool.get();
    _.copyFromThreeJs(this.getThreeJsObjects()[0].quaternion);
    _.getAxis(g, 2);
    m.setFromVectorFromTo(g, o);
    _.mult(m, _);
    Pioneer.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], _);
    Pioneer.Quaternion.pool.release(_);
    Pioneer.Vector3.pool.release(g);
    Pioneer.Quaternion.pool.release(m);
    Pioneer.Vector3.pool.release(o);
  }
  _color;
  _sourceEntity;
  _shadowType;
  _targetEntity;
  _numberOfCirclePoints;
}
export { ShadowConeComponent };
