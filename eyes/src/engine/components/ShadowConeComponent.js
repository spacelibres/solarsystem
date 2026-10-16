// Recovered from app.js:747098-750608.
import * as Pioneer from "../pioneer/index.js";
class ShadowConeComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._sourceEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._shadowType = "umbra";
    this._targetEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._numberOfCirclePoints = 20;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
  }
  getSourceEntity() {
    return this._sourceEntity.getName();
  }
  setSourceEntity(t) {
    this._sourceEntity.setName(t);
  }
  getTargetEntity() {
    return this._targetEntity.getName();
  }
  setTargetEntity(t) {
    this._targetEntity.setName(t);
  }
  getShadowType() {
    return this._shadowType;
  }
  setShadowType(shadowType) {
    this._shadowType = shadowType;
    this.resetResources();
  }
  __prepareForRender(t) {
    this._updateMesh();
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    const e = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, e);
  }
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
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
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
