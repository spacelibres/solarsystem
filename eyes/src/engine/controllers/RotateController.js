// Recovered from app.js:514753-517750.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class RotateController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._rotation = new PioneerPublicApi.Quaternion();
    this._rotatingPosition = true;
    this._rotatingOrientation = true;
    this._joint = "";
    this._jointObject = null;
    this._jointObjectIndex = 0;
    this._model = null;
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
  }
  getRotation() {
    return this._rotation;
  }
  setRotation(t) {
    this._rotation.copy(t);
  }
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    this._updateModifiedStates();
  }
  isRotatingOrientation() {
    return this._rotatingOrientation;
  }
  setRotatingOrientation(rotatingOrientation) {
    this._rotatingOrientation = rotatingOrientation;
    this._updateModifiedStates();
  }
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    this._updateModifiedStates();
  }
  __updatePositionAtTime(t, e) {
    this._rotatingPosition && "" === this._joint && t.rotate(this._rotation, t);
  }
  __updateVelocityAtTime(t, e) {
    this._rotatingPosition && "" === this._joint && t.rotate(this._rotation, t);
  }
  __updateOrientationAtTime(t, e) {
    this._rotatingOrientation && "" === this._joint && t.mult(this._rotation, t);
  }
  __update() {
    if ("" === this._joint) {
      if (this._rotatingPosition) {
        const t = PioneerPublicApi.Vector3.pool.get();
        t.rotate(this._rotation, this.getEntity().getPosition());
        this.getEntity().setPosition(t);
        PioneerPublicApi.Vector3.pool.release(t);
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(this._rotation, this.getEntity().getVelocity());
        this.getEntity().setVelocity(e);
        PioneerPublicApi.Vector3.pool.release(e);
      }
      if (this._rotatingOrientation) {
        const t = PioneerPublicApi.Quaternion.pool.get();
        t.mult(this._rotation, this.getEntity().getOrientation());
        this.getEntity().setOrientation(t);
        PioneerPublicApi.Quaternion.pool.release(t);
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(this._rotation, this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(e);
        PioneerPublicApi.Vector3.pool.release(e);
      }
    } else {
      if (null !== this._jointObject && this._model?.getThreeJsObjects()[this._jointObjectIndex] !== this._jointObject && (this._jointObject = null), "" !== this._joint && (null === this._jointObject || this._jointObject.name !== this._joint) && null !== this._model) {
        const jointObject = this._model.getThreeJsObjectByName(this._joint);
        null !== jointObject && (this._jointObject = jointObject, this._jointObjectIndex = this._model.getThreeJsObjects().indexOf(this._jointObject));
      }
      this._jointObject && PioneerPublicApi.ThreeJsHelper.setOrientation(this._jointObject, this._rotation);
    }
  }
  _updateModifiedStates() {
    "" === this._joint && this._rotatingOrientation ? (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity")) : (this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
    "" === this._joint && this._rotatingPosition ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  _rotation;
  _rotatingPosition;
  _rotatingOrientation;
  _joint;
  _jointObject;
  _jointObjectIndex;
  _model;
}
export { RotateController };
