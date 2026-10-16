// Recovered from app.js:523363-527918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpinController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._axis = new PioneerPublicApi.Vector3(0, 0, 1);
    this._axisRelativeToEntity = true;
    this._rate = 0;
    this._referenceAngle = 0;
    this._referenceTime = void 0;
    this._clampedToRealTime = false;
    this._usingRealTime = false;
    this._rotatingPosition = false;
    this._joint = "";
    this._jointObject = null;
    this._jointObjectIndex = 0;
    this._model = null;
    this._lastTime = e.getScene().getEngine().getTime();
    this.addModifiedState("orientation");
  }
  getAxis() {
    return this._axis;
  }
  isAxisRelativeToEntity() {
    return this._axisRelativeToEntity;
  }
  setAxis(t, axisRelativeToEntity) {
    this._axis.copy(t);
    this._axisRelativeToEntity = axisRelativeToEntity;
  }
  getRate() {
    return this._rate;
  }
  setRate(rate) {
    this._rate = rate;
  }
  getReferenceAngle() {
    return this._referenceAngle;
  }
  setReferenceAngle(referenceAngle) {
    this._referenceAngle = referenceAngle;
  }
  getReferenceTime() {
    return this._referenceTime;
  }
  setReferenceTime(referenceTime) {
    this._referenceTime = referenceTime;
  }
  isClampedToRealTime() {
    return this._clampedToRealTime;
  }
  setClampedToRealTime(clampedToRealTime) {
    this._clampedToRealTime = clampedToRealTime;
  }
  isUsingRealTime() {
    return this._usingRealTime;
  }
  setUsingRealTime(usingRealTime) {
    this._usingRealTime = usingRealTime;
  }
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    rotatingPosition ? this.addModifiedState("position") : this.removeModifiedState("position");
  }
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
    "" !== this._joint ? (this.removeModifiedState("orientation"), this.removeModifiedState("position")) : (this.addModifiedState("orientation"), this._rotatingPosition && this.addModifiedState("position"));
  }
  __updatePositionAtTime(t, e) {
    if (this._rotatingPosition) {
      let i = 0;
      this._usingRealTime || void 0 !== this._referenceTime && (i = e - this._referenceTime, i -= this._referenceAngle / this._rate);
      const n = PioneerPublicApi.Quaternion.pool.get();
      if (n.setFromAxisAngle(this._axis, this._rate * i), null === this._jointObject) {
        if (this._axisRelativeToEntity) {
          const t = PioneerPublicApi.Quaternion.pool.get();
          this.getEntity().getOrientationAtTime(t, e);
          n.mult(t, n);
          n.multInverseR(n, t);
          PioneerPublicApi.Quaternion.pool.release(t);
        }
        t.rotate(n, t);
      }
      PioneerPublicApi.Quaternion.pool.release(n);
    }
  }
  __updateOrientationAtTime(t, e) {
    t.isNaN() && t.copy(PioneerPublicApi.Quaternion.Identity);
    let i = 0;
    this._usingRealTime || void 0 !== this._referenceTime && (i = e - this._referenceTime, i -= this._referenceAngle / this._rate);
    const n = PioneerPublicApi.Quaternion.pool.get();
    n.setFromAxisAngle(this._axis, this._rate * i);
    null === this._jointObject && (this._axisRelativeToEntity && (n.mult(t, n), n.multInverseR(n, t)), t.mult(n, t), t.normalize(t));
    PioneerPublicApi.Quaternion.pool.release(n);
  }
  __update() {
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    const t = this.getEntity().getScene().getEngine();
    let e;
    if (this._usingRealTime) e = t.getDeltaTime();else if (void 0 !== this._referenceTime) {
      e = t.getTime() - this._referenceTime;
      e -= this._referenceAngle / this._rate;
    } else if (e = t.getTime() - this._lastTime, this._clampedToRealTime) {
      const i = t.getDeltaTime();
      e = PioneerPublicApi.MathUtils.clamp(e, -i, i);
    }
    const i = PioneerPublicApi.Quaternion.pool.get();
    if (i.setFromAxisAngle(this._axis, this._rate * e), null !== this._jointObject && this._model?.getThreeJsObjects()[this._jointObjectIndex] !== this._jointObject && (this._jointObject = null), "" !== this._joint && (null === this._jointObject || this._jointObject.name !== this._joint) && null !== this._model) {
      const jointObject = this._model.getThreeJsObjectByName(this._joint);
      null !== jointObject && (this._jointObject = jointObject, this._jointObjectIndex = this._model.getThreeJsObjects().indexOf(this._jointObject));
    }
    const n = this.getEntity().getOrientation();
    if (null !== this._jointObject) {
      this._axisRelativeToEntity || (i.multInverseL(n, i), i.mult(i, n));
      const t = PioneerPublicApi.Quaternion.threeJsPool.get();
      t.set(i.x, i.y, i.z, i.w);
      this._jointObject.quaternion.multiplyQuaternions(t, this._jointObject.quaternion);
      this._rotatingPosition && this._jointObject.position.applyQuaternion(t);
      PioneerPublicApi.Quaternion.threeJsPool.release(t);
    } else {
      const t = PioneerPublicApi.Quaternion.pool.get();
      this._axisRelativeToEntity && (i.mult(n, i), i.multInverseR(i, n));
      t.mult(i, n);
      t.normalize(t);
      const e = PioneerPublicApi.Vector3.pool.get();
      if (e.mult(this._axis, this._rate), this._axisRelativeToEntity && e.rotate(t, e), this.getEntity().setOrientation(t), this.getEntity().setAngularVelocity(e), PioneerPublicApi.Vector3.pool.release(e), PioneerPublicApi.Quaternion.pool.release(t), this._rotatingPosition) {
        const t = PioneerPublicApi.Vector3.pool.get();
        t.rotate(i, this.getEntity().getPosition());
        this.getEntity().setPosition(t);
        PioneerPublicApi.Vector3.pool.release(t);
      }
    }
    PioneerPublicApi.Quaternion.pool.release(i);
    this._lastTime = t.getTime();
  }
  _axis;
  _axisRelativeToEntity;
  _rate;
  _referenceAngle;
  _referenceTime;
  _clampedToRealTime;
  _usingRealTime;
  _rotatingPosition;
  _joint;
  _jointObject;
  _jointObjectIndex;
  _model;
  _lastTime;
}
export { SpinController };
