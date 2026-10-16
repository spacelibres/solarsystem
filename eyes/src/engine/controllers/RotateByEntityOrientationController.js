// Recovered from app.js:517751-520916.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 选定实体或父实体姿态左乘 orientation 并旋转线/角速度与位置；时间查询选择该时刻的父参考，不增加平移。 */
class RotateByEntityOrientationController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._entityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._rotatingPosition = true;
    this._rotatingOrientation = true;
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
    this.addDependentState("parent", "orientation");
  }
  setEntityForOrientation(entityName) {
    if ("" !== this._entityRef.getName()) {
      this.removeDependentState(this._entityRef.getName(), "orientation");
    } else {
      this.removeDependentState("parent", "orientation");
    }
    this._entityRef.setName(entityName);
    if ("" !== this._entityRef.getName()) {
      this.addDependentState(entityName, "orientation");
    } else {
      this.addDependentState("parent", "orientation");
    }
  }
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    if (rotatingPosition) {
      this.addModifiedState("position");
      this.addModifiedState("velocity");
    } else {
      this.removeModifiedState("position");
      this.removeModifiedState("velocity");
    }
  }
  isRotatingOrientation() {
    return this._rotatingOrientation;
  }
  setRotatingOrientation(rotatingOrientation) {
    this._rotatingOrientation = rotatingOrientation;
    if (rotatingOrientation) {
      this.addModifiedState("orientation");
      this.addModifiedState("angularVelocity");
    } else {
      this.removeModifiedState("orientation");
      this.removeModifiedState("angularVelocity");
    }
  }
  __updatePositionAtTime(positionOut, time) {
    if (this._rotatingPosition) {
      const referenceEntity = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(time));
      if (null !== referenceEntity) {
        const referenceOrientation = PioneerPublicApi.Quaternion.pool.get();
        referenceEntity.getOrientationAtTime(referenceOrientation, time);
        positionOut.rotate(referenceOrientation, positionOut);
        PioneerPublicApi.Quaternion.pool.release(referenceOrientation);
      }
    }
  }
  __updateVelocityAtTime(velocityOut, time) {
    if (this._rotatingPosition) {
      const referenceEntity = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(time));
      if (null !== referenceEntity) {
        const referenceOrientation = PioneerPublicApi.Quaternion.pool.get();
        referenceEntity.getOrientationAtTime(referenceOrientation, time);
        velocityOut.rotate(referenceOrientation, velocityOut);
        PioneerPublicApi.Quaternion.pool.release(referenceOrientation);
      }
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (this._rotatingOrientation) {
      const referenceEntity = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(time));
      if (null !== referenceEntity) {
        const referenceOrientation = PioneerPublicApi.Quaternion.pool.get();
        referenceEntity.getOrientationAtTime(referenceOrientation, time);
        orientationOut.mult(referenceOrientation, orientationOut);
        PioneerPublicApi.Quaternion.pool.release(referenceOrientation);
      }
    }
  }
  __update() {
    const referenceEntity = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getParent();
    if (null !== referenceEntity) {
      if (this._rotatingPosition) {
        const position = PioneerPublicApi.Vector3.pool.get();
        position.rotate(referenceEntity.getOrientation(), this.getEntity().getPosition());
        this.getEntity().setPosition(position);
        PioneerPublicApi.Vector3.pool.release(position);
        const velocity = PioneerPublicApi.Vector3.pool.get();
        velocity.rotate(referenceEntity.getOrientation(), this.getEntity().getVelocity());
        this.getEntity().setVelocity(velocity);
        PioneerPublicApi.Vector3.pool.release(velocity);
      }
      if (this._rotatingOrientation) {
        const orientation = PioneerPublicApi.Quaternion.pool.get();
        orientation.mult(referenceEntity.getOrientation(), this.getEntity().getOrientation());
        this.getEntity().setOrientation(orientation);
        PioneerPublicApi.Quaternion.pool.release(orientation);
        const angularVelocity = PioneerPublicApi.Vector3.pool.get();
        angularVelocity.rotate(referenceEntity.getOrientation(), this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(angularVelocity);
        PioneerPublicApi.Vector3.pool.release(angularVelocity);
      }
    }
  }
  _entityRef;
  _rotatingPosition;
  _rotatingOrientation;
}
export { RotateByEntityOrientationController };
