/** @eyes-analysis
 * 文件职责：依据输入变化更新实体/目标的缩放量。
 * 依据：import ../pioneer/public-api.js；ScaleController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:520917-521461.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：依据输入变化更新实体/目标的缩放量。
 * 继承：PioneerPublicApi.BaseController；导出：ScaleController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ScaleController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_scale`；调用 `super`、`this.addModifiedState`。
   * 状态写入：_scale。
   * 调用线索：super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._scale = 1;
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scale`。
   */
  getScale() {
    return this._scale;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_scale`。
   * 状态写入：_scale。
   */
  setScale(scale) {
    this._scale = scale;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.mult`。
   * 调用线索：t.mult。
   */
  __updatePositionAtTime(t, e) {
    t.mult(t, this._scale);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.mult`。
   * 调用线索：t.mult。
   */
  __updateVelocityAtTime(t, e) {
    t.mult(t, this._scale);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.mult`、`this.getEntity`、`this.getEntity().getPosition`、`this.getEntity().setPosition`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t.mult、this.getEntity、this.getEntity().getPosition等。
   */
  __update() {
    const t = PioneerPublicApi.Vector3.pool.get();
    t.mult(this.getEntity().getPosition(), this._scale);
    this.getEntity().setPosition(t);
    PioneerPublicApi.Vector3.pool.release(t);
  }
  _scale;
}
export { ScaleController };
