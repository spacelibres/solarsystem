// Recovered from app.js:523363-527918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 角速率乘模拟或实时秒得到弧度；可按参考历元绝对求角或按帧差增量旋转，关节/实体模式及轴所在参考系分别处理。 */
class SpinController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
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
    this._lastTime = entity.getScene().getEngine().getTime();
    this.addModifiedState("orientation");
  }
  getAxis() {
    return this._axis;
  }
  isAxisRelativeToEntity() {
    return this._axisRelativeToEntity;
  }
  setAxis(axis, axisRelativeToEntity) {
    this._axis.copy(axis);
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
    if (rotatingPosition) {
      this.addModifiedState("position");
    } else {
      this.removeModifiedState("position");
    }
  }
  setJoint(joint, model) {
    this._joint = joint;
    if (model) this._model = model;else {
      const modelComponent = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      if (null !== modelComponent) {
        this._model = modelComponent;
      }
    }
    if ("" !== this._joint) {
      this.removeModifiedState("orientation");
      this.removeModifiedState("position");
    } else {
      this.addModifiedState("orientation");
      if (this._rotatingPosition) {
        this.addModifiedState("position");
      }
    }
  }
  __updatePositionAtTime(positionOut, time) {
    if (this._rotatingPosition) {
      let elapsedTime = 0;
      if (!this._usingRealTime) {
        if (void 0 !== this._referenceTime) {
          elapsedTime = time - this._referenceTime;
          elapsedTime -= this._referenceAngle / this._rate;
        }
      }
      const spinRotation = PioneerPublicApi.Quaternion.pool.get();
      spinRotation.setFromAxisAngle(this._axis, this._rate * elapsedTime);
      if (null === this._jointObject) {
        if (this._axisRelativeToEntity) {
          const entityOrientationAtTime = PioneerPublicApi.Quaternion.pool.get();
          this.getEntity().getOrientationAtTime(entityOrientationAtTime, time);
          spinRotation.mult(entityOrientationAtTime, spinRotation);
          spinRotation.multInverseR(spinRotation, entityOrientationAtTime);
          PioneerPublicApi.Quaternion.pool.release(entityOrientationAtTime);
        }
        positionOut.rotate(spinRotation, positionOut);
      }
      PioneerPublicApi.Quaternion.pool.release(spinRotation);
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (orientationOut.isNaN()) {
      orientationOut.copy(PioneerPublicApi.Quaternion.Identity);
    }
    let elapsedTime = 0;
    if (!this._usingRealTime) {
      if (void 0 !== this._referenceTime) {
        elapsedTime = time - this._referenceTime;
        elapsedTime -= this._referenceAngle / this._rate;
      }
    }
    const spinRotation = PioneerPublicApi.Quaternion.pool.get();
    spinRotation.setFromAxisAngle(this._axis, this._rate * elapsedTime);
    if (null === this._jointObject) {
      if (this._axisRelativeToEntity) {
        spinRotation.mult(orientationOut, spinRotation);
        spinRotation.multInverseR(spinRotation, orientationOut);
      }
      orientationOut.mult(spinRotation, orientationOut);
      orientationOut.normalize(orientationOut);
    }
    PioneerPublicApi.Quaternion.pool.release(spinRotation);
  }
  __update() {
    if (this.getEntity().getOrientation().isNaN()) {
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    }
    const engine = this.getEntity().getScene().getEngine();
    let elapsedTime;
    if (this._usingRealTime) elapsedTime = engine.getDeltaTime();else if (void 0 !== this._referenceTime) {
      elapsedTime = engine.getTime() - this._referenceTime;
      elapsedTime -= this._referenceAngle / this._rate;
    } else {
      elapsedTime = engine.getTime() - this._lastTime;
      if (this._clampedToRealTime) {
        const realDeltaTime = engine.getDeltaTime();
        elapsedTime = PioneerPublicApi.MathUtils.clamp(elapsedTime, -realDeltaTime, realDeltaTime);
      }
    }
    const spinRotation = PioneerPublicApi.Quaternion.pool.get();
    spinRotation.setFromAxisAngle(this._axis, this._rate * elapsedTime);
    if (null !== this._jointObject && this._model?.getThreeJsObjects()[this._jointObjectIndex] !== this._jointObject) {
      this._jointObject = null;
    }
    if ("" !== this._joint && (null === this._jointObject || this._jointObject.name !== this._joint) && null !== this._model) {
      const jointObject = this._model.getThreeJsObjectByName(this._joint);
      if (null !== jointObject) {
        this._jointObject = jointObject;
        this._jointObjectIndex = this._model.getThreeJsObjects().indexOf(this._jointObject);
      }
    }
    const initialOrientation = this.getEntity().getOrientation();
    if (null !== this._jointObject) {
      if (!this._axisRelativeToEntity) {
        spinRotation.multInverseL(initialOrientation, spinRotation);
        spinRotation.mult(spinRotation, initialOrientation);
      }
      const threeJsRotation = PioneerPublicApi.Quaternion.threeJsPool.get();
      threeJsRotation.set(spinRotation.x, spinRotation.y, spinRotation.z, spinRotation.w);
      this._jointObject.quaternion.multiplyQuaternions(threeJsRotation, this._jointObject.quaternion);
      if (this._rotatingPosition) {
        this._jointObject.position.applyQuaternion(threeJsRotation);
      }
      PioneerPublicApi.Quaternion.threeJsPool.release(threeJsRotation);
    } else {
      const orientation = PioneerPublicApi.Quaternion.pool.get();
      if (this._axisRelativeToEntity) {
        spinRotation.mult(initialOrientation, spinRotation);
        spinRotation.multInverseR(spinRotation, initialOrientation);
      }
      orientation.mult(spinRotation, initialOrientation);
      orientation.normalize(orientation);
      const angularVelocity = PioneerPublicApi.Vector3.pool.get();
      angularVelocity.mult(this._axis, this._rate);
      if (this._axisRelativeToEntity) {
        angularVelocity.rotate(orientation, angularVelocity);
      }
      this.getEntity().setOrientation(orientation);
      this.getEntity().setAngularVelocity(angularVelocity);
      PioneerPublicApi.Vector3.pool.release(angularVelocity);
      PioneerPublicApi.Quaternion.pool.release(orientation);
      if (this._rotatingPosition) {
        const position = PioneerPublicApi.Vector3.pool.get();
        position.rotate(spinRotation, this.getEntity().getPosition());
        this.getEntity().setPosition(position);
        PioneerPublicApi.Vector3.pool.release(position);
      }
    }
    PioneerPublicApi.Quaternion.pool.release(spinRotation);
    this._lastTime = engine.getTime();
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
