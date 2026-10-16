/** @eyes-analysis
 * 文件职责：RGBA 颜色值、复制/混合与格式转换工具。
 * 依据：import ../pioneer/public-api.js；Color @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:46209-47563.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：RGBA 颜色值、复制/混合与格式转换工具。
 * 继承：无显式父类；导出：Color。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Color {
  static Black = new Color(0, 0, 0, 1);
  static Clear = new Color(1, 1, 1, 0);
  static pool = new PioneerPublicApi.Pool(Color);
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  constructor(t = 1, e = 1, i = 1, s = 1) {
    this._r = t;
    this._g = e;
    this._b = i;
    this._a = s;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._r`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get r() {
    return this._r;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_r`。
   * 状态写入：_r。
   */
  set r(t) {
    this._r = t;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._g`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get g() {
    return this._g;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_g`。
   * 状态写入：_g。
   */
  set g(t) {
    this._g = t;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._b`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get b() {
    return this._b;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_b`。
   * 状态写入：_b。
   */
  set b(t) {
    this._b = t;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._a`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get a() {
    return this._a;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_a`。
   * 状态写入：_a。
   */
  set a(t) {
    this._a = t;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._r}, ${this._g}, ${this._b}, ${this._a}]`;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  copy(t) {
    this._r = t.r;
    this._g = t.g;
    this._b = t.b;
    this._a = t.a;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  set(t, e, i, s = 1) {
    this._r = t;
    this._g = e;
    this._b = i;
    this._a = s;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  add(t, e) {
    this._r = t.r + e.r;
    this._g = t.g + e.g;
    this._b = t.b + e.b;
    this._a = t.a + e.a;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  sub(t, e) {
    this._r = t.r - e.r;
    this._g = t.g - e.g;
    this._b = t.b - e.b;
    this._a = t.a - e.a;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  mult(t, e) {
    this._r = t.r * e;
    this._g = t.g * e;
    this._b = t.b * e;
    this._a = t.a * e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  addMult(t, e, i) {
    this._r = t.r + e.r * i;
    this._g = t.g + e.g * i;
    this._b = t.b + e.b * i;
    this._a = t.a + e.a * i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  div(t, e) {
    this._r = t.r / e;
    this._g = t.g / e;
    this._b = t.b / e;
    this._a = t.a / e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`。
   * 状态写入：_a、_b、_g、_r。
   */
  scale(t, e) {
    this._r = t.r * e.r;
    this._g = t.g * e.g;
    this._b = t.b * e.b;
    this._a = t.a * e.a;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `(this._r+this._g+this._b)/3`。
   */
  value() {
    return (this._r + this._g + this._b) / 3;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.min(this._r,this._g,this._b)`；调用 `Math.min`。
   * 调用线索：Math.min。
   */
  min() {
    return Math.min(this._r, this._g, this._b);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.max(this._r,this._g,this._b)`；调用 `Math.max`。
   * 调用线索：Math.max。
   */
  max() {
    return Math.max(this._r, this._g, this._b);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_a`、`_b`、`_g`、`_r`；调用 `PioneerPublicApi.MathUtils.lerp`。
   * 状态写入：_a、_b、_g、_r。
   * 调用线索：PioneerPublicApi.MathUtils.lerp。
   */
  lerp(t, e, i) {
    this._r = PioneerPublicApi.MathUtils.lerp(t.r, e.r, i);
    this._g = PioneerPublicApi.MathUtils.lerp(t.g, e.g, i);
    this._b = PioneerPublicApi.MathUtils.lerp(t.b, e.b, i);
    this._a = PioneerPublicApi.MathUtils.lerp(t.a, e.a, i);
  }
  _r;
  _g;
  _b;
  _a;
}
export { Color };
