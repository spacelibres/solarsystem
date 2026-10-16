// Recovered from app.js:470710-471918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 非空固定值声明对应修改状态；位置固定时速度归零。查询在调用者输出上覆盖写入，空值不修改输出。 */

class FixedController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._position = null;
    this._orientation = null;
  }
  getPosition() {
    return this._position;
  }
  setPosition(position) {
    if (null !== position) {
      this._position ??= new PioneerPublicApi.Vector3();
      this._position.copy(position);
    } else {
      this._position = null;
    }
    if (null !== position) {
      this.addModifiedState("position");
      this.addModifiedState("velocity");
    } else {
      this.removeModifiedState("position");
      this.removeModifiedState("velocity");
    }
  }
  getOrientation() {
    return this._orientation;
  }
  setOrientation(orientation) {
    if (null !== orientation) {
      this._orientation ??= new PioneerPublicApi.Quaternion();
      this._orientation.copy(orientation);
    } else {
      this._orientation = null;
    }
    if (null !== orientation) {
      this.addModifiedState("orientation");
    } else {
      this.removeModifiedState("orientation");
    }
  }
  __updatePositionAtTime(positionOut, time) {
    if (null !== this._position) {
      positionOut.copy(this._position);
    }
  }
  __updateVelocityAtTime(velocityOut, time) {
    if (null !== this._position) {
      velocityOut.set(0, 0, 0);
    }
  }
  __updateOrientationAtTime(orientationOut, time) {
    if (null !== this._orientation) {
      orientationOut.copy(this._orientation);
    }
  }
  __update() {
    if (null !== this._position) {
      this.getEntity().setPosition(this._position);
      this.getEntity().setVelocity(PioneerPublicApi.Vector3.Zero);
    }
    if (null !== this._orientation) {
      this.getEntity().setOrientation(this._orientation);
    }
  }
  _position;
  _orientation;
}
export { FixedController };
