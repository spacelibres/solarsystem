// Recovered from app.js:513194-514752.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 活动相机的滚转输入经限制与平滑后绕局部 Y 轴右乘；小于阈值时归零以停止尾随。 */
class RollController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._rollSensitivity = .01;
    this._rollSmoothness = .8;
    this._rollAngleSmoothedValue = 0;
    this.addModifiedState("orientation");
  }
  getRollSensitivity() {
    return this._rollSensitivity;
  }
  setRollSensitivity(rollSensitivity) {
    this._rollSensitivity = rollSensitivity;
  }
  getRollSmoothness() {
    return this._rollSmoothness;
  }
  setRollSmoothness(rollSmoothness) {
    this._rollSmoothness = rollSmoothness;
  }
  __update() {
    if (this.getEntity().getOrientation().isNaN()) {
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    }
    let rollChange = 0;
    const input = this.getEntity().getScene().getEngine().getInput();
    const viewport = input.getActiveViewport();
    if (null !== viewport) {
      const activeCamera = viewport.getCamera();
      if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
        let sensitivityScale = 1;
        if (input.isKeyPressed("x")) {
          sensitivityScale = .05;
        }
        if (input.isShiftPressed()) {
          sensitivityScale = 5;
        }
        const rotationOffset = input.getRotatedOffset();
        if (0 !== rotationOffset) {
          rollChange += PioneerPublicApi.MathUtils.clamp(rotationOffset * this._rollSensitivity * sensitivityScale, -.1, .1);
        }
        if (input.isKeyPressed("c")) {
          rollChange += this._rollSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("z")) {
          rollChange -= this._rollSensitivity * sensitivityScale;
        }
      }
    }
    this._rollAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(rollChange, this._rollAngleSmoothedValue, this._rollSmoothness);
    if (Math.abs(this._rollAngleSmoothedValue) < 1e-4) {
      this._rollAngleSmoothedValue = 0;
    }
    if (0 !== this._rollAngleSmoothedValue) {
      const orientation = PioneerPublicApi.Quaternion.pool.get();
      const rollRotation = PioneerPublicApi.Quaternion.pool.get();
      rollRotation.setFromAxisAngle(PioneerPublicApi.Vector3.YAxis, this._rollAngleSmoothedValue);
      orientation.mult(this.getEntity().getOrientation(), rollRotation);
      this.getEntity().setOrientation(orientation);
      PioneerPublicApi.Quaternion.pool.release(orientation);
      PioneerPublicApi.Quaternion.pool.release(rollRotation);
    }
  }
  _rollSensitivity;
  _rollSmoothness;
  _rollAngleSmoothedValue;
}
export { RollController };
