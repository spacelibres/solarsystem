/** @eyes-analysis
 * 文件职责：按父实体状态维持相对固定的位置和姿态。
 * 依据：import ../pioneer/public-api.js；FixedToParentController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:471919-473249.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按父实体状态维持相对固定的位置和姿态。
 * 继承：PioneerPublicApi.BaseController；导出：FixedToParentController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FixedToParentController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_lastParent`、`_lastParentOrientation`；调用 `new PioneerPublicApi.Quaternion`、`super`、`this._lastParent.getOrientation`、`this._lastParentOrientation.copy`、`this.addDependentState`、`this.addModifiedState`。
   * 状态写入：_lastParent、_lastParentOrientation。
   * 调用线索：new PioneerPublicApi.Quaternion、super、this._lastParent.getOrientation、this._lastParentOrientation.copy、this.addDependentState等。
   */
  constructor(t, e) {
    super(t, e);
    this._lastParent = null;
    this._lastParentOrientation = new PioneerPublicApi.Quaternion();
    this._lastParent = this.getEntity().getParent();
    this._lastParent && this._lastParentOrientation.copy(this._lastParent.getOrientation());
    this.addModifiedState("position");
    this.addModifiedState("orientation");
    this.addDependentState("parent", "orientation");
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lastParent`；返回 `void(this._lastParent=lastParent)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.inverse`、`e.isNaN`。
   * 状态写入：_lastParent。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、e.inverse等。
   */
  __update() {
    const lastParent = this.getEntity().getParent();
    if (null === lastParent || null === this._lastParent) return void (this._lastParent = lastParent);
    const e = PioneerPublicApi.Quaternion.pool.get();
    if (e.inverse(this._lastParentOrientation), e.mult(this._lastParent.getOrientation(), e), !e.isNaN()) {
      const i = PioneerPublicApi.Vector3.pool.get();
      const n = PioneerPublicApi.Quaternion.pool.get();
      i.copy(this.getEntity().getPosition());
      lastParent !== this._lastParent && lastParent.getPositionRelativeToEntity(i, i, this._lastParent);
      i.rotate(e, i);
      lastParent !== this._lastParent && this._lastParent.getPositionRelativeToEntity(i, i, lastParent);
      this.getEntity().setPosition(i);
      n.mult(e, this.getEntity().getOrientation());
      this.getEntity().setOrientation(n);
      PioneerPublicApi.Quaternion.pool.release(n);
      PioneerPublicApi.Vector3.pool.release(i);
    }
    PioneerPublicApi.Quaternion.pool.release(e);
    this._lastParent = lastParent;
    this._lastParentOrientation.copy(lastParent.getOrientation());
  }
  _lastParent;
  _lastParentOrientation;
}
export { FixedToParentController };
