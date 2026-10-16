// Recovered from app.js:761934-763928.
import * as Pioneer from "../pioneer/index.js";
class TorusComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._innerRadius = 1;
    this._outerRadius = 10;
    this.__setRadius(this._outerRadius);
    this.__setUsesEntityOrientation(true);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
  }
  getInnerRadius() {
    return this._innerRadius;
  }
  setInnerRadius(innerRadius) {
    this._innerRadius = innerRadius;
    this.resetResources();
  }
  getOuterRadius() {
    return this._outerRadius;
  }
  setOuterRadius(outerRadius) {
    this._outerRadius = outerRadius;
    this.__setRadius(this._outerRadius);
    this.resetResources();
  }
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
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
    const t = 100;
    const e = 20;
    const float32Array = new Float32Array(6e3);
    const uint16Array = new Uint16Array(12e3);
    const o = (this._outerRadius + this._innerRadius) / 2;
    const r = (this._outerRadius - this._innerRadius) / 2;
    for (let a = 0; a < t; a++) {
      const l = a / t * Pioneer.MathUtils.TwoPi;
      const c = Math.cos(l);
      const h = Math.sin(l);
      for (let l = 0; l < e; l++) {
        const d = l / e * Pioneer.MathUtils.TwoPi;
        const u = Math.cos(d);
        const p = Math.sin(d);
        const _ = 3 * (a * e + l);
        float32Array[_ + 0] = c * (o + r * u);
        float32Array[_ + 1] = h * (o + r * u);
        float32Array[_ + 2] = r * p;
        const m = 6 * (a * e + l);
        const g = (a + 1) % t;
        const y = (l + 1) % e;
        uint16Array[m + 0] = a * e + l;
        uint16Array[m + 1] = g * e + l;
        uint16Array[m + 2] = a * e + y;
        uint16Array[m + 3] = g * e + y;
        uint16Array[m + 4] = a * e + y;
        uint16Array[m + 5] = g * e + l;
      }
    }
    const a = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(a, "position", float32Array);
    Pioneer.ThreeJsHelper.setIndices(a, uint16Array);
  }
  _color;
  _innerRadius;
  _outerRadius;
}
export { TorusComponent };
