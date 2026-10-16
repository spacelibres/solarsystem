/** @eyes-analysis
 * 文件职责：响应输入或配置更新相机绕观察方向的滚转。
 * 依据：import ../pioneer/public-api.js；RollController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:513194-514752.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：响应输入或配置更新相机绕观察方向的滚转。
 * 继承：PioneerPublicApi.BaseController；导出：RollController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RollController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_rollAngleSmoothedValue`、`_rollSensitivity`、`_rollSmoothness`；调用 `super`、`this.addModifiedState`。
   * 状态写入：_rollAngleSmoothedValue、_rollSensitivity、_rollSmoothness。
   * 调用线索：super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._rollSensitivity = .01;
    this._rollSmoothness = .8;
    this._rollAngleSmoothedValue = 0;
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rollSensitivity`。
   */
  getRollSensitivity() {
    return this._rollSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rollSensitivity`。
   * 状态写入：_rollSensitivity。
   */
  setRollSensitivity(rollSensitivity) {
    this._rollSensitivity = rollSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rollSmoothness`。
   */
  getRollSmoothness() {
    return this._rollSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rollSmoothness`。
   * 状态写入：_rollSmoothness。
   */
  setRollSmoothness(rollSmoothness) {
    this._rollSmoothness = rollSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rollAngleSmoothedValue`；调用 `Math.abs`、`PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`e.getActiveViewport`。
   * 状态写入：_rollAngleSmoothedValue。
   * 调用线索：Math.abs、PioneerPublicApi.MathUtils.clamp、PioneerPublicApi.MathUtils.lerp、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release等。
   */
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
