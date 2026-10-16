// Recovered from app.js:744711-747097.
import * as Pioneer from "../pioneer/index.js";
class DiscGridComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._size = 1;
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._lineWidth = 1;
    this._numCircles = 10;
    this._numSpokes = 20;
    this._radialPower = 1;
    this._lineMesh = null;
    this._meshDirty = true;
    this.__setRadius(this._size);
    this.__setUsesEntityOrientation(true);
  }
  getSize() {
    return this._size;
  }
  setSize(size) {
    this._size = size;
    this.__setRadius(this._size);
    null !== this._lineMesh && this._lineMesh.setScale(this._size);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
    this._meshDirty = true;
  }
  getLineWidth() {
    return this._lineWidth;
  }
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    null !== this._lineMesh && this._lineMesh.setWidths(this._lineWidth);
  }
  getNumCircles() {
    return this._numCircles;
  }
  setNumCircles(numCircles) {
    this._numCircles = numCircles;
    this._meshDirty = true;
  }
  getNumSpokes() {
    return this._numSpokes;
  }
  setNumSpokes(numSpokes) {
    this._numSpokes = numSpokes;
    this._meshDirty = true;
  }
  getRadialPower() {
    return this._radialPower;
  }
  setRadialPower(radialPower) {
    this._radialPower = radialPower;
    this._meshDirty = true;
  }
  __prepareForRender(t) {
    if (this._lineMesh) {
      this._meshDirty && this._updateMesh();
      this._lineMesh.prepareForRender(t);
      for (let e = 0, i = this.getThreeJsObjects().length; e < i; e++) {
        Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[e], this.getEntity());
        Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[e], this.getEntity(), t);
      }
    }
  }
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._updateMesh();
    this._lineMesh.setScale(this._size);
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = [];
    for (let e = 1; e <= this._numCircles; e++) {
      const i = 1 !== this._radialPower ? this._radialPower ** (e - this._numCircles) : e / this._numCircles;
      const n = 50;
      for (let e = 0; e < n; e++) {
        const o = e / n * Pioneer.MathUtils.TwoPi;
        const r = (e + 1) % n / n * Pioneer.MathUtils.TwoPi;
        t.push(new Pioneer.Vector3(i * Math.cos(o), i * Math.sin(o), 0));
        t.push(new Pioneer.Vector3(i * Math.cos(r), i * Math.sin(r), 0));
      }
    }
    for (let e = 0; e < this._numSpokes; e++) {
      const i = e / this._numSpokes * Pioneer.MathUtils.TwoPi;
      t.push(Pioneer.Vector3.Zero);
      t.push(new Pioneer.Vector3(Math.cos(i), Math.sin(i), 0));
    }
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) e.push(this._color);
    this._lineMesh.setPositions(t);
    this._lineMesh.setColors(e);
    this._lineMesh.setWidths(this._lineWidth);
    this._meshDirty = false;
  }
  _size;
  _color;
  _lineWidth;
  _numCircles;
  _numSpokes;
  _radialPower;
  _lineMesh;
  _meshDirty;
}
export { DiscGridComponent };
