// Recovered from app.js:513194-514752.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class RollController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
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
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    let t = 0;
    const e = this.getEntity().getScene().getEngine().getInput();
    const i = e.getActiveViewport();
    if (null !== i) {
      const n = i.getCamera();
      if (null !== n && n.getEntity() === this.getEntity()) {
        let i = 1;
        e.isKeyPressed("x") && (i = .05);
        e.isShiftPressed() && (i = 5);
        const n = e.getRotatedOffset();
        0 !== n && (t += PioneerPublicApi.MathUtils.clamp(n * this._rollSensitivity * i, -.1, .1));
        e.isKeyPressed("c") && (t += this._rollSensitivity * i);
        e.isKeyPressed("z") && (t -= this._rollSensitivity * i);
      }
    }
    if (this._rollAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(t, this._rollAngleSmoothedValue, this._rollSmoothness), Math.abs(this._rollAngleSmoothedValue) < 1e-4 && (this._rollAngleSmoothedValue = 0), 0 !== this._rollAngleSmoothedValue) {
      const t = PioneerPublicApi.Quaternion.pool.get();
      const e = PioneerPublicApi.Quaternion.pool.get();
      e.setFromAxisAngle(PioneerPublicApi.Vector3.YAxis, this._rollAngleSmoothedValue);
      t.mult(this.getEntity().getOrientation(), e);
      this.getEntity().setOrientation(t);
      PioneerPublicApi.Quaternion.pool.release(t);
      PioneerPublicApi.Quaternion.pool.release(e);
    }
  }
  _rollSensitivity;
  _rollSmoothness;
  _rollAngleSmoothedValue;
}
export { RollController };
