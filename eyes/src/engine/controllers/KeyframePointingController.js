/** @eyes-analysis
 * 文件职责：按关键帧目标向量/姿态计算朝向。
 * 依据：import ../pioneer/index.js；KeyframePointingController extends Pioneer.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:786224-788660.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：按关键帧目标向量/姿态计算朝向。
 * 继承：Pioneer.BaseController；导出：KeyframePointingController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class KeyframePointingController extends Pioneer.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_direction`、`_keyframes`；调用 `new Pioneer.Vector3`、`super`、`this.addModifiedState`。
   * 状态写入：_direction、_keyframes。
   * 调用线索：new Pioneer.Vector3、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._keyframes = [];
    this._direction = new Pioneer.Vector3(1, 0, 0);
    this.addModifiedState("orientation");
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_keyframes`；调用 `e.startsWith`、`e.substring`、`s.startsWith`、`s.substring`、`this._keyframes.push`、`this._keyframes.sort`。
   * 状态写入：_keyframes。
   * 调用线索：e.startsWith、e.substring、s.startsWith、s.substring、this._keyframes.push等。
   */
  setKeyframes(t) {
    for (let t = 0, e = this._keyframes.length; t < e; t++) {
      let e = this._keyframes[t][1];
      e.startsWith("-") && (e = e.substring(1));
      "velocity" === e ? this.removeDependentState(this.getEntity().getName(), "velocity") : this.removeDependentState(e, "position");
    }
    this._keyframes = [];
    for (let e = 0, i = t.length; e < i; e++) {
      const i = t[e];
      this._keyframes.push([i[0], i[1]]);
      let s = i[1];
      s.startsWith("-") && (s = s.substring(1));
      "velocity" === s ? this.addDependentState(this.getEntity().getName(), "velocity") : this.addDependentState(s, "position");
    }
    this._keyframes.sort((t, e) => t[0] - e[0]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._direction.copy`。
   * 调用线索：this._direction.copy。
   */
  setDirection(t) {
    this._direction.copy(t);
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
   * 【结构证据】调用 `Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Sort.getIndexObject`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`d.normalize`。
   * 调用线索：Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release、Pioneer.Sort.getIndexObject、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release等。
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
    const h = Pioneer.Vector3.pool.get();
    const d = Pioneer.Vector3.pool.get();
    this._getDirection(h, e, a[1]);
    this._getDirection(d, e, l[1]);
    d.slerp(h, d, c);
    d.normalize(d);
    h.rotate(i, this._direction);
    const u = Pioneer.Quaternion.pool.get();
    u.setFromVectorFromTo(h, d);
    t.mult(u, i);
    Pioneer.Quaternion.pool.release(u);
    Pioneer.Vector3.pool.release(d);
    Pioneer.Vector3.pool.release(h);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `(i=i.substring(8)).startsWith`、`i.startsWith`、`i.substring`、`n.getScene`、`n.getScene().getEntity`、`n.getVelocityAtTime`。
   * 调用线索：(i=i.substring(8)).startsWith、i.startsWith、i.substring、n.getScene、n.getScene().getEntity等。
   */
  _getDirection(t, e, i) {
    const n = this.getEntity();
    const o = i.startsWith("-");
    if (o && (i = i.substring(1)), i.startsWith("velocity")) {
      if ((i = i.substring(8)).startsWith(" rel ")) {
        i = i.substring(5);
        const o = n.getScene().getEntity(i);
        null !== o && n.getVelocityRelativeToEntity(t, Pioneer.Vector3.Zero, o, e);
      } else n.getVelocityAtTime(t, e);
    } else {
      const o = n.getScene().getEntity(i);
      null !== o ? o.getPositionRelativeToEntity(t, Pioneer.Vector3.Zero, n, e) : t.copy(Pioneer.Vector3.NaN);
    }
    t.normalize(t);
    o && t.mult(t, -1);
  }
  _keyframes;
  _direction;
}
export { KeyframePointingController };
