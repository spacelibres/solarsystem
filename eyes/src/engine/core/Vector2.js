/** @eyes-analysis
 * 文件职责：二维向量代数、插值和池化。
 * 依据：import ../pioneer/public-api.js；Vector2 @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:65782-67607.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：二维向量代数、插值和池化。
 * 继承：无显式父类；导出：Vector2。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Vector2 {
  static Zero = new Vector2(0, 0);
  static One = new Vector2(1, 1);
  static XAxis = new Vector2(1, 0);
  static YAxis = new Vector2(0, 1);
  static XAxisNeg = new Vector2(-1, 0);
  static YAxisNeg = new Vector2(0, -1);
  static NaN = new Vector2(NaN, NaN);
  static pool = new PioneerPublicApi.Pool(Vector2);
  static threeJsPool = new PioneerPublicApi.Pool(PioneerPublicApi.THREE.Vector2);
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  constructor(t = 0, e = 0) {
    this._x = t;
    this._y = e;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._x`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get x() {
    return this._x;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_x`。
   * 状态写入：_x。
   */
  set x(t) {
    this._x = t;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._y`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get y() {
    return this._y;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_y`。
   * 状态写入：_y。
   */
  set y(t) {
    this._y = t;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._x}, ${this._y}]`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x===t.x&&this._y===t.y`。
   */
  equals(t) {
    return this._x === t.x && this._y === t.y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `0===this._x&&0===this._y`。
   */
  isZero() {
    return 0 === this._x && 0 === this._y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x!=this._x||this._y!=this._y`。
   */
  isNaN() {
    return this._x != this._x || this._y != this._y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  copy(t) {
    this._x = t.x;
    this._y = t.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  copyFromThreeJs(t) {
    this._x = t.x;
    this._y = t.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  set(t, e) {
    this._x = t;
    this._y = e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  neg(t) {
    this._x = -t.x;
    this._y = -t.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  add(t, e) {
    this._x = t.x + e.x;
    this._y = t.y + e.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  sub(t, e) {
    this._x = t.x - e.x;
    this._y = t.y - e.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  mult(t, e) {
    this._x = t.x * e;
    this._y = t.y * e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  addMult(t, e, i) {
    this._x = t.x + e.x * i;
    this._y = t.y + e.y * i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  div(t, e) {
    this._x = t.x / e;
    this._y = t.y / e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  scale(t, e) {
    this._x = t.x * e.x;
    this._y = t.y * e.y;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`。
   * 状态写入：_x、_y。
   */
  scaleInv(t, e) {
    this._x = t.x / e.x;
    this._y = t.y / e.y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x*t.x+this._y*t.y`。
   */
  dot(t) {
    return this._x * t.x + this._y * t.y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x*t.y-this._y*t.x`。
   */
  cross(t) {
    return this._x * t.y - this._y * t.x;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x*this._x+this._y*this._y`。
   */
  magnitudeSqr() {
    return this._x * this._x + this._y * this._y;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(this.magnitudeSqr())`；调用 `Math.sqrt`、`this.magnitudeSqr`。
   * 调用线索：Math.sqrt、this.magnitudeSqr。
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSqr());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`；调用 `t.magnitude`。
   * 状态写入：_x、_y。
   * 调用线索：t.magnitude。
   */
  normalize(t) {
    const e = t.magnitude();
    e > 0 && (this._x = t.x / e, this._y = t.y / e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`；调用 `this.normalize`。
   * 状态写入：_x、_y。
   * 调用线索：this.normalize。
   */
  setMagnitude(t, e) {
    this.normalize(t);
    this._x *= e;
    this._y *= e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(e*e+i*i)`；调用 `Math.sqrt`。
   * 调用线索：Math.sqrt。
   */
  distance(t) {
    const e = this._x - t.x;
    const i = this._y - t.y;
    return Math.sqrt(e * e + i * i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e>0?Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t)/e,-1,1)):Number.NaN`；调用 `Math.acos`、`PioneerPublicApi.MathUtils.clamp`、`t.magnitude`、`this.dot`、`this.magnitude`。
   * 调用线索：Math.acos、PioneerPublicApi.MathUtils.clamp、t.magnitude、this.dot、this.magnitude。
   */
  angle(t) {
    const e = this.magnitude() * t.magnitude();
    return e > 0 ? Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t) / e, -1, 1)) : Number.NaN;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`；调用 `PioneerPublicApi.MathUtils.clamp`。
   * 状态写入：_x、_y。
   * 调用线索：PioneerPublicApi.MathUtils.clamp。
   */
  clamp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.clamp(t.x, e.x, i.x);
    this._y = PioneerPublicApi.MathUtils.clamp(t.y, e.y, i.y);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`；调用 `PioneerPublicApi.MathUtils.lerp`。
   * 状态写入：_x、_y。
   * 调用线索：PioneerPublicApi.MathUtils.lerp。
   */
  lerp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.lerp(t.x, e.x, i);
    this._y = PioneerPublicApi.MathUtils.lerp(t.y, e.y, i);
  }
  _x;
  _y;
}
export { Vector2 };
