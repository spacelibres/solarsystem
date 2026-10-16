// Recovered from app.js:333520-336278.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class GizmoComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._size = void 0;
    this._relativeToEntity = true;
    this._joint = "";
    this._jointObject = null;
    this._model = null;
    this._lineMesh = null;
    this.__setRadius(2 * e.getExtentsRadius());
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  getSize() {
    return void 0 !== this._size ? this._size : Math.max(1e-4, 2 * this.getEntity().getExtentsRadius());
  }
  setSize(size) {
    this._size = size;
    this.__setRadius(this.getSize());
  }
  isRelativeToEntity() {
    return this._relativeToEntity;
  }
  setRelativeToEntity(relativeToEntity) {
    this._relativeToEntity = relativeToEntity;
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
  }
  __prepareForRender(t) {
    if (this._lineMesh) {
      if ("" !== this._joint) {
        if (!this._model) return;
        if (null !== this._jointObject && this._jointObject.name === this._joint || (this._jointObject = this._model.getThreeJsObjectByName(this._joint)), !this._jointObject) return;
        const e = PioneerPublicApi.Vector3.pool.get();
        const i = PioneerPublicApi.Quaternion.pool.get();
        this._model.getThreeJsPositionInObject(e, this._jointObject);
        this._model.getThreeJsOrientationInObject(i, this._jointObject);
        e.scale(e, this._model.getScale());
        e.rotate(this._model.getRotation(), e);
        e.add(this._model.getTranslation(), e);
        i.mult(this._model.getRotation(), i);
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t, e, true);
        PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity(), i);
        PioneerPublicApi.Vector3.pool.release(e);
        PioneerPublicApi.Quaternion.pool.release(i);
      } else {
        this._relativeToEntity ? PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity()) : PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity);
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
      }
      PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects()[0], this.getSize());
      this._lineMesh.prepareForRender(t);
    }
  }
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    const t = [];
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(1, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 1, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 1));
    this._lineMesh.setPositions(t);
    const e = [];
    e.push(new PioneerPublicApi.Color(1, 0, 0));
    e.push(new PioneerPublicApi.Color(1, 0, 0));
    e.push(new PioneerPublicApi.Color(0, 1, 0));
    e.push(new PioneerPublicApi.Color(0, 1, 0));
    e.push(new PioneerPublicApi.Color(0, 0, 1));
    e.push(new PioneerPublicApi.Color(0, 0, 1));
    this._lineMesh.setColors(e);
    const i = [];
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    this._lineMesh.setWidths(i);
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _size;
  _relativeToEntity;
  _joint;
  _jointObject;
  _model;
  _lineMesh;
}
export { GizmoComponent };
