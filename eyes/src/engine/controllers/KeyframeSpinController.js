/** @eyes-analysis
 * 文件职责：根据关键帧的转速/轴和时间生成连续自转姿态。
 * 依据：import ../pioneer/index.js；KeyframeSpinController extends Pioneer.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:788661-790329.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：根据关键帧的转速/轴和时间生成连续自转姿态。
 * 继承：Pioneer.BaseController；导出：KeyframeSpinController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class KeyframeSpinController extends Pioneer.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_axis`、`_keyframes`、`_startingAngle`；调用 `new Pioneer.Vector3`、`super`、`this.addModifiedState`。
   * 状态写入：_axis、_keyframes、_startingAngle。
   * 调用线索：new Pioneer.Vector3、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._keyframes = [];
    this._axis = new Pioneer.Vector3(1, 0, 0);
    this._startingAngle = 0;
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_keyframes`；调用 `Pioneer.MathUtils.wrap`、`this._keyframes.push`、`this._keyframes.sort`。
   * 状态写入：_keyframes。
   * 调用线索：Pioneer.MathUtils.wrap、this._keyframes.push、this._keyframes.sort。
   */
  setKeyframes(t) {
    this._keyframes = [];
    let e = 0;
    for (let i = 0, n = t.length; i < n; i++) {
      const n = t[i];
      if (i > 0) {
        const o = t[i - 1];
        e = Pioneer.MathUtils.wrap(e + (n[0] - o[0]) * (o[1] + n[1]) * .5, 0, 2 * Math.PI);
      }
      this._keyframes.push([n[0], n[1], e]);
    }
    this._keyframes.sort((t, e) => t[0] - e[0]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._axis.copy`。
   * 调用线索：this._axis.copy。
   */
  setAxis(t) {
    this._axis.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_startingAngle`。
   * 状态写入：_startingAngle。
   */
  setStartingAngle(startingAngle) {
    this._startingAngle = startingAngle;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.copy`、`t.isNaN`、`this._getNewOrientation`。
   * 调用线索：t.copy、t.isNaN、this._getNewOrientation。
   */
  __updateOrientationAtTime(t, e) {
    t.isNaN() && t.copy(Pioneer.Quaternion.Identity);
    this._getNewOrientation(t, e, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`t.getOrientation`、`t.getOrientation().isNaN`、`t.getScene`、`t.getScene().getEngine`。
   * 调用线索：Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release、t.getOrientation、t.getOrientation().isNaN、t.getScene等。
   */
  __update() {
    if (0 === this._keyframes.length) return;
    const t = this.getEntity();
    const e = t.getScene().getEngine().getTime();
    t.getOrientation().isNaN() && t.setOrientation(Pioneer.Quaternion.Identity);
    const i = Pioneer.Quaternion.pool.get();
    this._getNewOrientation(i, e, t.getOrientation());
    t.setOrientation(i);
    Pioneer.Quaternion.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.wrap`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Sort.getIndexObject`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`。
   * 调用线索：Pioneer.MathUtils.wrap、Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release、Pioneer.Sort.getIndexObject、Pioneer.Vector3.pool.get等。
   */
  _getNewOrientation(t, e, i) {
    0 === this._keyframes.length && t.copy(Pioneer.Quaternion.NaN);
    const n = Pioneer.Sort.getIndexObject(e, this._keyframes, (t, e) => t[0] < e);
    let o = 0;
    let r = 0;
    n === this._keyframes.length ? (o = this._keyframes.length - 1, r = this._keyframes.length - 1) : n > 0 && (o = n - 1, r = n);
    const a = this._keyframes[o];
    const l = this._keyframes[r];
    const c = l[0] > a[0] ? (e - a[0]) / (l[0] - a[0]) : 0;
    const h = Pioneer.MathUtils.wrap(this._startingAngle + a[2] + (e - a[0]) * (a[1] + c * l[1]) / (1 + c), 0, 2 * Math.PI);
    const d = Pioneer.Vector3.pool.get();
    d.rotate(i, this._axis);
    const u = Pioneer.Quaternion.pool.get();
    u.setFromAxisAngle(d, h);
    t.mult(u, i);
    Pioneer.Vector3.pool.release(d);
    Pioneer.Quaternion.pool.release(u);
  }
  _keyframes;
  _axis;
  _startingAngle;
}
export { KeyframeSpinController };
