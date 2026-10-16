/** @eyes-analysis
 * 文件职责：把预设位置/速度/姿态写入实体，为固定参考系或表面点提供状态。
 * 依据：import ../pioneer/public-api.js；FixedController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:470710-471918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：把预设位置/速度/姿态写入实体，为固定参考系或表面点提供状态。
 * 继承：PioneerPublicApi.BaseController；导出：FixedController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FixedController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_orientation`、`_position`；调用 `super`。
   * 状态写入：_orientation、_position。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._position = null;
    this._orientation = null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._position`。
   */
  getPosition() {
    return this._position;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_position`；调用 `new PioneerPublicApi.Vector3`、`this._position.copy`、`this.addModifiedState`、`this.removeModifiedState`。
   * 状态写入：_position。
   * 调用线索：new PioneerPublicApi.Vector3、this._position.copy、this.addModifiedState、this.removeModifiedState。
   */
  setPosition(t) {
    null !== t ? (this._position ??= new PioneerPublicApi.Vector3(), this._position.copy(t)) : this._position = null;
    null !== t ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._orientation`。
   */
  getOrientation() {
    return this._orientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_orientation`；调用 `new PioneerPublicApi.Quaternion`、`this._orientation.copy`、`this.addModifiedState`、`this.removeModifiedState`。
   * 状态写入：_orientation。
   * 调用线索：new PioneerPublicApi.Quaternion、this._orientation.copy、this.addModifiedState、this.removeModifiedState。
   */
  setOrientation(t) {
    null !== t ? (this._orientation ??= new PioneerPublicApi.Quaternion(), this._orientation.copy(t)) : this._orientation = null;
    null !== t ? this.addModifiedState("orientation") : this.removeModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.copy`。
   * 调用线索：t.copy。
   */
  __updatePositionAtTime(t, e) {
    null !== this._position && t.copy(this._position);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.set`。
   * 调用线索：t.set。
   */
  __updateVelocityAtTime(t, e) {
    null !== this._position && t.set(0, 0, 0);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.copy`。
   * 调用线索：t.copy。
   */
  __updateOrientationAtTime(t, e) {
    null !== this._orientation && t.copy(this._orientation);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.getEntity`、`this.getEntity().setOrientation`、`this.getEntity().setPosition`、`this.getEntity().setVelocity`。
   * 调用线索：this.getEntity、this.getEntity().setOrientation、this.getEntity().setPosition、this.getEntity().setVelocity。
   */
  __update() {
    null !== this._position && (this.getEntity().setPosition(this._position), this.getEntity().setVelocity(PioneerPublicApi.Vector3.Zero));
    null !== this._orientation && this.getEntity().setOrientation(this._orientation);
  }
  _position;
  _orientation;
}
export { FixedController };
