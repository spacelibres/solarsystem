/** @eyes-analysis
 * 文件职责：在起终状态/时间之间平滑过渡实体位置和姿态。
 * 依据：import ../pioneer/public-api.js；TransitionController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:528378-532187.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在起终状态/时间之间平滑过渡实体位置和姿态。
 * 继承：PioneerPublicApi.BaseController；导出：TransitionController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TransitionController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_endPromise`、`_initialOrientation`、`_initialParent`、`_initialPosition`、`_rejectPromise`、`_resolvePromise`、`_transitionFunction`、`_transitionStart`；调用 `e.getOrientation`、`e.getPosition`、`i.getName`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`。
   * 状态写入：_endPromise、_initialOrientation、_initialParent、_initialPosition、_rejectPromise、_resolvePromise、_transitionFunction、_transitionStart等；完整记录见索引。
   * 调用线索：e.getOrientation、e.getPosition、i.getName、new PioneerPublicApi.EntityRef、new PioneerPublicApi.Quaternion等。
   */
  constructor(t, e) {
    super(t, e);
    this._initialPosition = new PioneerPublicApi.Vector3();
    this._initialPosition.copy(e.getPosition());
    this._initialOrientation = new PioneerPublicApi.Quaternion();
    this._initialOrientation.copy(e.getOrientation());
    this._initialParent = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._transitionStart = Number.NaN;
    this._transitionTime = 1;
    this._transitionFunction = this._lerpTransitionFunction;
    this._resolvePromise = () => {};
    this._rejectPromise = () => {};
    this._endPromise = new Promise((resolvePromise, rejectPromise) => {
      this._resolvePromise = resolvePromise;
      this._rejectPromise = rejectPromise;
    });
    const i = this.getEntity().getParent();
    null !== i && this._initialParent.setName(i.getName());
    const n = this.getEntity().getController(TransitionController);
    null !== n && this.getEntity().removeController(n);
    const o = this.getEntity().addController(PioneerPublicApi.SetParentController, "transitionSetParent", this.getEntity().getControllerAt(0));
    null !== i && o.setParent(i.getName());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._transitionTime`。
   */
  getTransitionTime() {
    return this._transitionTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_transitionTime`。
   * 状态写入：_transitionTime。
   */
  setTransitionTime(transitionTime) {
    this._transitionTime = transitionTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_transitionFunction`。
   * 状态写入：_transitionFunction。
   */
  setTransitionFunction(transitionFunction) {
    this._transitionFunction = transitionFunction;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.getName()` 或 `null!==e?e.getName():""`；调用 `e.getName`、`t.getName`、`this.getEntity`、`this.getEntity().getController`、`this.getEntity().getParent`。
   * 调用线索：e.getName、t.getName、this.getEntity、this.getEntity().getController、this.getEntity().getParent。
   */
  getParent() {
    const t = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== t) return t.getName();
    const e = this.getEntity().getParent();
    return null !== e ? e.getName() : "";
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.setParent`、`this.getEntity`、`this.getEntity().getController`。
   * 调用线索：e.setParent、this.getEntity、this.getEntity().getController。
   */
  setParent(t) {
    const e = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    null !== e && e.setParent(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.max(0,this._transitionTime-(Date.now()/1e3-this._transitionStart))`；调用 `Date.now`、`Math.max`。
   * 调用线索：Date.now、Math.max。
   */
  getTimeRemaining() {
    return Math.max(0, this._transitionTime - (Date.now() / 1e3 - this._transitionStart));
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  async getEndPromise() {
    await this._endPromise;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new PioneerPublicApi.CanceledError`、`super.__destroy`、`this._rejectPromise`、`this.getEntity`、`this.getEntity().getController`、`this.getEntity().removeController`。
   * 调用线索：new PioneerPublicApi.CanceledError、super.__destroy、this._rejectPromise、this.getEntity、this.getEntity().getController等。
   */
  __destroy() {
    super.__destroy();
    const t = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    null !== t && this.getEntity().removeController(t);
    0 !== this._transitionTime && this._rejectPromise(new PioneerPublicApi.CanceledError());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_transitionStart`、`_transitionTime`；返回 `void this.getEntity().getScene().getEngine().addCallback(()=>{this.isDestroyed()||(this._transitionTime=0,this.getEntity().removeController(this),""!=`；调用 `Date.now`、`Number.isNaN`、`PioneerPublicApi.MathUtils.clamp01`、`new Error`、`t.getPositionRelativeToEntity`、`this._initialParent.get`。
   * 状态写入：_transitionStart、_transitionTime。
   * 调用线索：Date.now、Number.isNaN、PioneerPublicApi.MathUtils.clamp01、new Error、t.getPositionRelativeToEntity等。
   */
  __update() {
    const t = this._initialParent.get();
    const e = this.getEntity().getParent();
    null === e && (this._transitionTime = 0, this.getEntity().removeController(this), this._rejectPromise(new Error("The final parent was destroyed or disabled before the transition could complete.")));
    Number.isNaN(this._transitionStart) && (this._transitionStart = Date.now() / 1e3);
    const i = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== i) {
      if (null === t) return void this.getEntity().getScene().getEngine().addCallback(() => {
        this.isDestroyed() || (this._transitionTime = 0, this.getEntity().removeController(this), "" !== this._initialParent.getName() ? this._rejectPromise(new Error(`The initial parent "${this._initialParent.getName()}" was destroyed or disabled before the first half of the transition could complete.`)) : this._resolvePromise());
      }, false);
      Date.now() / 1e3 - this._transitionStart >= this._transitionTime / 2 || t === e ? (this.getEntity().removeController(i), t !== e && null !== e && t.getPositionRelativeToEntity(this._initialPosition, this._initialPosition, e)) : this.getEntity().setParent(t);
    }
    const n = this.getEntity().getPosition();
    const o = this.getEntity().getOrientation();
    let r = PioneerPublicApi.MathUtils.clamp01((Date.now() / 1e3 - this._transitionStart) / this._transitionTime);
    Number.isNaN(r) && (r = 1);
    this._transitionFunction(this.getEntity(), this._initialPosition, n, this._initialOrientation, o, r);
    Date.now() / 1e3 - this._transitionStart >= this._transitionTime && this.getEntity().getScene().getEngine().addCallback(() => {
      this.isDestroyed() || (this._transitionTime = 0, this.getEntity().removeController(this), this._resolvePromise());
    }, false);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.lerp`、`l.slerp`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、a.lerp等。
   */
  _lerpTransitionFunction(t, e, i, n, o, r) {
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Quaternion.pool.get();
    a.lerp(e, i, r);
    l.slerp(n, o, r);
    t.setPosition(a);
    t.setOrientation(l);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Quaternion.pool.release(l);
  }
  _initialPosition;
  _initialOrientation;
  _initialParent;
  _transitionStart;
  _transitionTime;
  _transitionFunction;
  _resolvePromise;
  _rejectPromise;
  _endPromise;
}
export { TransitionController };
