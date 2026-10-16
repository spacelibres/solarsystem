/** @eyes-analysis
 * 文件职责：以距离、像素/法线半径等量计算组件可见范围及边缘透明度。
 * 依据：import ../pioneer/public-api.js；VisibleInterval @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:51389-53646.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：以距离、像素/法线半径等量计算组件可见范围及边缘透明度。
 * 继承：无显式父类；导出：VisibleInterval。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class VisibleInterval {
  static AlwaysVisible = new VisibleInterval(0, Number.POSITIVE_INFINITY);
  static DefaultVisibleFar = new VisibleInterval(0, .02, "normal-radius");
  static pool = new PioneerPublicApi.Pool(VisibleInterval);
  /** @eyes-analysis
   * 【结构证据】写入 `_fadeBlur`、`_max`、`_maxSpace`、`_min`、`_minSpace`。
   * 状态写入：_fadeBlur、_max、_maxSpace、_min、_minSpace。
   */
  constructor(min = 0, max = 0, minSpace = "pixel-radius", maxSpace = minSpace, fadeBlur = .5) {
    this._min = min;
    this._minSpace = minSpace;
    this._max = max;
    this._maxSpace = maxSpace;
    this._fadeBlur = fadeBlur;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._min`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get min() {
    return this._min;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (min)；实际写入 `_min`。
   * 状态写入：_min。
   */
  set min(min) {
    this._min = min;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._max`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get max() {
    return this._max;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (max)；实际写入 `_max`。
   * 状态写入：_max。
   */
  set max(max) {
    this._max = max;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._minSpace`。
   */
  get minSpace() {
    return this._minSpace;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._maxSpace`。
   */
  get maxSpace() {
    return this._maxSpace;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._fadeBlur`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get fadeBlur() {
    return this._fadeBlur;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (fadeBlur)；实际写入 `_fadeBlur`。
   * 状态写入：_fadeBlur。
   */
  set fadeBlur(fadeBlur) {
    this._fadeBlur = fadeBlur;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._min}, ${this._max}]`;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_fadeBlur`、`_max`、`_maxSpace`、`_min`、`_minSpace`。
   * 状态写入：_fadeBlur、_max、_maxSpace、_min、_minSpace。
   */
  copy(t) {
    this._min = t.min;
    this._max = t.max;
    this._minSpace = t.minSpace;
    this._maxSpace = t.maxSpace;
    this._fadeBlur = t.fadeBlur;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`。
   * 状态写入：_max、_min。
   */
  set(min, max) {
    this._min = min;
    this._max = max;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._max-this._min`。
   */
  length() {
    return this._max - this._min;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.min(Math.max(this._min,t),this._max)`；调用 `Math.max`、`Math.min`。
   * 调用线索：Math.max、Math.min。
   */
  clamp(t) {
    return Math.min(Math.max(this._min, t), this._max);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。
   * 状态写入：_max、_min。
   * 调用线索：Math.max、Math.min。
   */
  expandTo(t) {
    this._min = Math.min(this._min, t);
    this._max = Math.max(this._max, t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._min<=t&&t<this._max`。
   */
  contains(t) {
    return this._min <= t && t < this._max;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._min<t.max&&t.min<this._max`。
   */
  intersects(t) {
    return this._min < t.max && t.min < this._max;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。
   * 状态写入：_max、_min。
   * 调用线索：Math.max、Math.min。
   */
  intersection(t, e) {
    this._min = Math.max(t.min, e.min);
    this._max = Math.min(t.max, e.max);
    this._max < this._min && (this._max = this._min);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。
   * 状态写入：_max、_min。
   * 调用线索：Math.max、Math.min。
   */
  union(t, e) {
    this._min = Math.min(t.min, e.min);
    this._max = Math.max(t.max, e.max);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.min(o,r)`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`o.rotateInverse`。
   * 调用线索：Math.abs、Math.min、PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release等。
   */
  getFadeMultiplier(t, e) {
    let i = NaN;
    let n = NaN;
    if ("pixel-radius" === this._minSpace || "pixel-radius" === this._maxSpace) {
      const s = t.getPixelSpaceExtentsRadius(e);
      "pixel-radius" === this._minSpace && (i = s);
      "pixel-radius" === this._maxSpace && (n = s);
    }
    if ("normal-radius" === this._minSpace || "normal-radius" === this._maxSpace) {
      const s = t.getNormalSpaceExtentsRadius(e);
      "normal-radius" === this._minSpace && (i = s);
      "normal-radius" === this._maxSpace && (n = s);
    }
    if ("z-distance" === this._minSpace || "z-distance" === this._maxSpace) {
      const o = PioneerPublicApi.Vector3.pool.get();
      o.rotateInverse(t.getOrientation(), t.getCameraSpacePosition(e));
      const r = Math.abs(o.z);
      PioneerPublicApi.Vector3.pool.release(o);
      "z-distance" === this._minSpace && (i = r);
      "z-distance" === this._maxSpace && (n = r);
    }
    const o = i > 0 || this._min > 0 ? PioneerPublicApi.MathUtils.clamp01((i / this._min - 1) / this._fadeBlur + 1) : 1;
    const r = n > 0 || this._max > 0 ? PioneerPublicApi.MathUtils.clamp01((1 - n / this._max) / this._fadeBlur + 1) : 0;
    return Math.min(o, r);
  }
  _min;
  _minSpace;
  _max;
  _maxSpace;
  _fadeBlur;
}
export { VisibleInterval };
