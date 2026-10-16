// Recovered from app.js:737638-740173.
import * as Pioneer from "../pioneer/index.js";
class AnnulusComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._sizeInner = 1;
    this._sizeOuter = 1;
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._alphaMultiplier = 1;
    this._numPointsOnCircle = 200;
    this._meshDirty = true;
    this.__setRadius(this._sizeOuter);
    this.__setUsesEntityOrientation(true);
  }
  getInnerRadius() {
    return this._sizeInner;
  }
  setInnerRadius(sizeInner) {
    this._sizeInner = sizeInner;
    this._meshDirty = true;
  }
  getOuterRadius() {
    return this._sizeOuter;
  }
  setOuterRadius(sizeOuter) {
    this._sizeOuter = sizeOuter;
    this._meshDirty = true;
    this.__setRadius(sizeOuter);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, this._alphaMultiplier);
  }
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    this._meshDirty && this._updateMesh();
    this._alphaMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, this._alphaMultiplier);
  }
  async __loadResources() {
    const t = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("basic_alpha");
    this.getThreeJsMaterials().push(t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(t, "color", this._color, this._alphaMultiplier);
    const e = Pioneer.ThreeJsHelper.createMeshObject(this, t, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(e);
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  _updateMesh() {
    const float32Array = new Float32Array(4 * this._numPointsOnCircle * 3);
    const uint16Array = new Uint16Array(6 * this._numPointsOnCircle);
    let i = 0;
    let n = 0;
    const vector3 = new Pioneer.Vector3();
    const r = new Pioneer.Vector3();
    const sizeOuter = this._sizeOuter;
    const l = this._sizeInner / this._sizeOuter;
    for (let c = 0; c < this._numPointsOnCircle; c++) {
      const h = c / this._numPointsOnCircle * Pioneer.MathUtils.TwoPi;
      const d = (c + 1) % this._numPointsOnCircle / this._numPointsOnCircle * Pioneer.MathUtils.TwoPi;
      vector3.set(sizeOuter * Math.cos(h), sizeOuter * Math.sin(h), 0);
      r.set(sizeOuter * Math.cos(d), sizeOuter * Math.sin(d), 0);
      float32Array[i + 0] = vector3.x * l;
      float32Array[i + 1] = vector3.y * l;
      float32Array[i + 2] = vector3.z * l;
      float32Array[i + 3] = vector3.x;
      float32Array[i + 4] = vector3.y;
      float32Array[i + 5] = vector3.z;
      float32Array[i + 6] = r.x;
      float32Array[i + 7] = r.y;
      float32Array[i + 8] = r.z;
      float32Array[i + 9] = r.x * l;
      float32Array[i + 10] = r.y * l;
      float32Array[i + 11] = r.z * l;
      uint16Array[n + 0] = i / 3 + 0;
      uint16Array[n + 1] = i / 3 + 1;
      uint16Array[n + 2] = i / 3 + 2;
      uint16Array[n + 3] = i / 3 + 2;
      uint16Array[n + 4] = i / 3 + 3;
      uint16Array[n + 5] = i / 3 + 0;
      i += 12;
      n += 6;
    }
    const c = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(c, "position", float32Array);
    Pioneer.ThreeJsHelper.setIndices(c, uint16Array);
    this._meshDirty = false;
  }
  _sizeInner;
  _sizeOuter;
  _color;
  _alphaMultiplier;
  _numPointsOnCircle;
  _meshDirty;
}
export { AnnulusComponent };
