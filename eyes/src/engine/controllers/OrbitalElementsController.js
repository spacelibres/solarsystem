/** @eyes-analysis
 * 文件职责：保存轨道元素关键帧，在指定时间传播位置/速度并在相邻元素之间混合。
 * 依据：import ../pioneer/public-api.js；OrbitalElementsController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:508829-511101.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：保存轨道元素关键帧，在指定时间传播位置/速度并在相邻元素之间混合。
 * 继承：PioneerPublicApi.BaseController；导出：OrbitalElementsController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitalElementsController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_orbitalElementsKeyframes`；调用 `super`、`this.addModifiedState`。
   * 状态写入：_orbitalElementsKeyframes。
   * 调用线索：super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._orbitalElementsKeyframes = [];
    this.addModifiedState("position");
    this.addModifiedState("velocity");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._orbitalElementsKeyframes.length`。
   */
  getNumOrbitalElements() {
    return this._orbitalElementsKeyframes.length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._orbitalElementsKeyframes[t]`。
   */
  getOrbitalElements(t) {
    return this._orbitalElementsKeyframes[t];
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`new PioneerPublicApi.OrbitalElements`。
   * 调用线索：PioneerPublicApi.Sort.addObject、new PioneerPublicApi.OrbitalElements。
   */
  addOrbitalElements(t, e) {
    const orbitalElements = new PioneerPublicApi.OrbitalElements(e);
    PioneerPublicApi.Sort.addObject({
      time: t,
      oe: orbitalElements
    }, this._orbitalElementsKeyframes, OrbitalElementsController._isLessAdd, OrbitalElementsController._isEqualAdd);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._orbitalElementsKeyframes.splice`；含显式错误分支。
   * 调用线索：new Error、this._orbitalElementsKeyframes.splice。
   */
  removeOrbitalElements(t) {
    if (t < 0 || this._orbitalElementsKeyframes.length <= t) throw new Error(`Invalid index for ${this}.removeOrbitalElements`);
    this._orbitalElementsKeyframes.splice(t, 1);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._getPositionAndVelocityAtTime`。
   * 调用线索：this._getPositionAndVelocityAtTime。
   */
  __updatePositionAtTime(t, e) {
    this._getPositionAndVelocityAtTime(t, void 0, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._getPositionAndVelocityAtTime`。
   * 调用线索：this._getPositionAndVelocityAtTime。
   */
  __updateVelocityAtTime(t, e) {
    this._getPositionAndVelocityAtTime(void 0, t, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`new Error`、`this._getPositionAndVelocityAtTime`、`this.getEntity`、`this.getEntity().getScene`；含显式错误分支。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、new Error、this._getPositionAndVelocityAtTime、this.getEntity等。
   */
  __update() {
    const t = this.getEntity().getScene().getEngine().getTime();
    if (0 === this._orbitalElementsKeyframes.length) throw new Error(`In ${this}, there are no keyframes`);
    const e = PioneerPublicApi.Vector3.pool.get();
    const i = PioneerPublicApi.Vector3.pool.get();
    this._getPositionAndVelocityAtTime(e, i, t);
    this.getEntity().setPosition(e);
    this.getEntity().setVelocity(i);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`Math.min`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.Sort.getIndexObject`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。
   * 调用线索：Math.max、Math.min、PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.Sort.getIndexObject、PioneerPublicApi.Vector3.pool.get等。
   */
  _getPositionAndVelocityAtTime(t, e, i) {
    const n = PioneerPublicApi.Sort.getIndexObject(i, this._orbitalElementsKeyframes, OrbitalElementsController._isLess);
    const o = this._orbitalElementsKeyframes[Math.max(n - 1, 0)];
    const r = this._orbitalElementsKeyframes[Math.min(n, this._orbitalElementsKeyframes.length - 1)];
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    const h = PioneerPublicApi.Vector3.pool.get();
    o.oe.project(a, c, i);
    r.oe.project(l, h, i);
    const d = PioneerPublicApi.MathUtils.clamp01(r.time !== o.time ? (i - o.time) / (r.time - o.time) : 0);
    t && t.slerp(a, l, d);
    e && e.slerp(c, h, d);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(h);
  }
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 读取：；返回：。
   */
  static _isLessAdd = (t, e) => t.time < e.time;
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 读取：；返回：。
   */
  static _isLess = (t, e) => t.time < e;
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 读取：；返回：。
   */
  static _isEqualAdd = (t, e) => t.time === e.time;
  _orbitalElementsKeyframes;
}
/** @eyes-analysis
 * 类职责：按时间索引的一组轨道元素。
 * 继承：无显式父类；导出：OrbitalElementsKeyframe。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitalElementsKeyframe {
  time;
  oe;
  /** @eyes-analysis
   * 【结构证据】写入 `oe`、`time`；调用 `new PioneerPublicApi.OrbitalElements`。
   * 状态写入：oe、time。
   * 调用线索：new PioneerPublicApi.OrbitalElements。
   */
  constructor() {
    this.time = 0;
    this.oe = new PioneerPublicApi.OrbitalElements();
  }
}
export { OrbitalElementsController };
export { OrbitalElementsKeyframe };
