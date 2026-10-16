/** @eyes-analysis
 * 文件职责：闭区间表示、包含/交集/并集和空值判定工具。
 * 依据：import ../pioneer/public-api.js；Interval @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:50279-51388.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：闭区间表示、包含/交集/并集和空值判定工具。
 * 继承：无显式父类；导出：Interval。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Interval {
  static Infinite = new Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  static InfiniteNeg = new Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
  static pool = new PioneerPublicApi.Pool(Interval);
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`。
   * 状态写入：_max、_min。
   */
  constructor(min = 0, max = 0) {
    this._min = min;
    this._max = max;
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
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._min}, ${this._max}]`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._min!=this._min||this._max!=this._max`。
   */
  isNaN() {
    return this._min != this._min || this._max != this._max;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_max`、`_min`。
   * 状态写入：_max、_min。
   */
  copy(t) {
    this._min = t.min;
    this._max = t.max;
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
  _min;
  _max;
}
export { Interval };
