// Recovered from app.js:514753-517750.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 固定旋转作用于位置/速度及姿态/角速度；关节模式只写模型关节，修改状态声明随模式切换。 */
class RotateController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
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
  setRotation(rotation) {
    this._rotation.copy(rotation);
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
    this._joint = joint;
    if (model) this._model = model;else {
      const modelComponent = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      if (null !== modelComponent) {
        this._model = modelComponent;
      }
    }
    this._updateModifiedStates();
  }
  __updatePositionAtTime(positionOut, time) {
    if (this._rotatingPosition && "" === this._joint) {
      positionOut.rotate(this._rotation, positionOut);
    }
  }
  __updateVelocityAtTime(velocityOut, time) {
    if (this._rotatingPosition && "" === this._joint) {
      velocityOut.rotate(this._rotation, velocityOut);
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (this._rotatingOrientation && "" === this._joint) {
      orientationOut.mult(this._rotation, orientationOut);
    }
  }
  __update() {
    if ("" === this._joint) {
      if (this._rotatingPosition) {
        const position = PioneerPublicApi.Vector3.pool.get();
        position.rotate(this._rotation, this.getEntity().getPosition());
        this.getEntity().setPosition(position);
        PioneerPublicApi.Vector3.pool.release(position);
        const velocity = PioneerPublicApi.Vector3.pool.get();
        velocity.rotate(this._rotation, this.getEntity().getVelocity());
        this.getEntity().setVelocity(velocity);
        PioneerPublicApi.Vector3.pool.release(velocity);
      }
      if (this._rotatingOrientation) {
        const orientation = PioneerPublicApi.Quaternion.pool.get();
        orientation.mult(this._rotation, this.getEntity().getOrientation());
        this.getEntity().setOrientation(orientation);
        PioneerPublicApi.Quaternion.pool.release(orientation);
        const angularVelocity = PioneerPublicApi.Vector3.pool.get();
        angularVelocity.rotate(this._rotation, this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(angularVelocity);
        PioneerPublicApi.Vector3.pool.release(angularVelocity);
      }
    } else {
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
      if (this._jointObject) {
        PioneerPublicApi.ThreeJsHelper.setOrientation(this._jointObject, this._rotation);
      }
    }
  }
  _updateModifiedStates() {
    if ("" === this._joint && this._rotatingOrientation) {
      this.addModifiedState("orientation");
      this.addModifiedState("angularVelocity");
    } else {
      this.removeModifiedState("orientation");
      this.removeModifiedState("angularVelocity");
    }
    if ("" === this._joint && this._rotatingPosition) {
      this.addModifiedState("position");
      this.addModifiedState("velocity");
    } else {
      this.removeModifiedState("position");
      this.removeModifiedState("velocity");
    }
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
