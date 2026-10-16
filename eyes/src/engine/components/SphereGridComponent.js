// Recovered from app.js:389793-392138.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SphereGridComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._degreesPerLine = 10;
    this._color = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._relativeToEntity = true;
    this._lineMesh = null;
    this._meshDirty = true;
  }
  setRadius(t) {
    this.__setRadius(t);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
    this._meshDirty = true;
  }
  getDegreesPerLine() {
    return this._degreesPerLine;
  }
  setDegreesPerLine(degreesPerLine) {
    this._degreesPerLine = degreesPerLine;
    this._meshDirty = true;
  }
  isRelativeToEntity() {
    return this._relativeToEntity;
  }
  setRelativeToEntity(relativeToEntity) {
    this._relativeToEntity = relativeToEntity;
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  __prepareForRender(t) {
    this._lineMesh && (this._meshDirty && this._updateMesh(), this._relativeToEntity && PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity()), PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t), this._lineMesh.prepareForRender(t));
  }
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    this._updateMesh();
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = [];
    for (let e = 0; e < 360; e += this._degreesPerLine) {
      const i = Math.min(e + this._degreesPerLine, 360);
      const n = PioneerPublicApi.MathUtils.degToRad(e);
      const o = PioneerPublicApi.MathUtils.degToRad(i);
      for (let e = -90; e < 90; e += this._degreesPerLine) {
        const i = Math.min(e + this._degreesPerLine, 90);
        const r = PioneerPublicApi.MathUtils.degToRad(e);
        const a = PioneerPublicApi.MathUtils.degToRad(i);
        -90 < e && e < 90 && (t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(r), Math.cos(n) * Math.cos(r), Math.sin(r))), t.push(new PioneerPublicApi.Vector3(Math.sin(o) * Math.cos(r), Math.cos(o) * Math.cos(r), Math.sin(r))));
        t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(r), Math.cos(n) * Math.cos(r), Math.sin(r)));
        t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(a), Math.cos(n) * Math.cos(a), Math.sin(a)));
      }
    }
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) e.push(this._color);
    const i = [];
    for (let e = 0, s = t.length; e < s; e++) i.push(2);
    this._lineMesh.setPositions(t);
    this._lineMesh.setColors(e);
    this._lineMesh.setWidths(i);
    PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), PioneerPublicApi.Quaternion.Identity);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
    this._meshDirty = false;
  }
  _degreesPerLine;
  _color;
  _relativeToEntity;
  _lineMesh;
  _meshDirty;
}
export { SphereGridComponent };
