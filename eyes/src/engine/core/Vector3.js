/** @eyes-analysis
 * 文件职责：三维向量代数、旋转、插值和池化。
 * 依据：import ../pioneer/public-api.js；Vector3 @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:67608-71528.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：三维向量代数、旋转、插值和池化。
 * 继承：无显式父类；导出：Vector3。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Vector3 {
  static Zero = new Vector3(0, 0, 0);
  static One = new Vector3(1, 1, 1);
  static XAxis = new Vector3(1, 0, 0);
  static YAxis = new Vector3(0, 1, 0);
  static ZAxis = new Vector3(0, 0, 1);
  static XAxisNeg = new Vector3(-1, 0, 0);
  static YAxisNeg = new Vector3(0, -1, 0);
  static ZAxisNeg = new Vector3(0, 0, -1);
  static NaN = new Vector3(NaN, NaN, NaN);
  static pool = new PioneerPublicApi.Pool(Vector3);
  static threeJsPool = new PioneerPublicApi.Pool(PioneerPublicApi.THREE.Vector3);
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  constructor(t = 0, e = 0, i = 0) {
    this._x = t;
    this._y = e;
    this._z = i;
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
   * 【结构证据】读取访问器，返回 `this._z`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get z() {
    return this._z;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_z`。
   * 状态写入：_z。
   */
  set z(t) {
    this._z = t;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._x}, ${this._y}, ${this._z}]`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x===t.x&&this._y===t.y&&this._z===t.z`。
   */
  equals(t) {
    return this._x === t.x && this._y === t.y && this._z === t.z;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `0===this._x&&0===this._y&&0===this._z`。
   */
  isZero() {
    return 0 === this._x && 0 === this._y && 0 === this._z;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x!=this._x||this._y!=this._y||this._z!=this._z`。
   */
  isNaN() {
    return this._x != this._x || this._y != this._y || this._z != this._z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  copy(t) {
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  copyFromThreeJs(t) {
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  set(t, e, i) {
    this._x = t;
    this._y = e;
    this._z = i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。
   * 状态写入：_x、_y、_z。
   * 调用线索：Math.cos、Math.sin。
   */
  setFromAER(t) {
    const e = Math.cos(t.elevation);
    this._x = t.range * e * Math.cos(t.azimuth);
    this._y = t.range * e * Math.sin(t.azimuth);
    this._z = t.range * Math.sin(t.elevation);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  neg(t) {
    this._x = -t.x;
    this._y = -t.y;
    this._z = -t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  add(t, e) {
    this._x = t.x + e.x;
    this._y = t.y + e.y;
    this._z = t.z + e.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  sub(t, e) {
    this._x = t.x - e.x;
    this._y = t.y - e.y;
    this._z = t.z - e.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  mult(t, e) {
    this._x = t.x * e;
    this._y = t.y * e;
    this._z = t.z * e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  addMult(t, e, i) {
    this._x = t.x + e.x * i;
    this._y = t.y + e.y * i;
    this._z = t.z + e.z * i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  div(t, e) {
    this._x = t.x / e;
    this._y = t.y / e;
    this._z = t.z / e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  scale(t, e) {
    this._x = t.x * e.x;
    this._y = t.y * e.y;
    this._z = t.z * e.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  scaleInv(t, e) {
    this._x = t.x / e.x;
    this._y = t.y / e.y;
    this._z = t.z / e.z;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x*t.x+this._y*t.y+this._z*t.z`。
   */
  dot(t) {
    return this._x * t.x + this._y * t.y + this._z * t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  cross(t, e) {
    const i = t.y * e.z - t.z * e.y;
    const s = t.z * e.x - t.x * e.z;
    const n = t.x * e.y - t.y * e.x;
    this._x = i;
    this._y = s;
    this._z = n;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._x*this._x+this._y*this._y+this._z*this._z`。
   */
  magnitudeSqr() {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(this.magnitudeSqr())`；调用 `Math.sqrt`、`this.magnitudeSqr`。
   * 调用线索：Math.sqrt、this.magnitudeSqr。
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSqr());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(this._x*this._x+this._y*this._y)`；调用 `Math.sqrt`。
   * 调用线索：Math.sqrt。
   */
  magnitudeXY() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `t.magnitude`、`this.copy`。
   * 状态写入：_x、_y、_z。
   * 调用线索：t.magnitude、this.copy。
   */
  normalize(t) {
    const e = t.magnitude();
    e > 0 ? (this._x = t.x / e, this._y = t.y / e, this._z = t.z / e) : this.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `this.normalize`。
   * 状态写入：_x、_y、_z。
   * 调用线索：this.normalize。
   */
  setMagnitude(t, e) {
    this.normalize(t);
    this._x *= e;
    this._y *= e;
    this._z *= e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(e*e+i*i+s*s)`；调用 `Math.sqrt`。
   * 调用线索：Math.sqrt。
   */
  distance(t) {
    const e = this._x - t.x;
    const i = this._y - t.y;
    const s = this._z - t.z;
    return Math.sqrt(e * e + i * i + s * s);
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
   * 【结构证据】返回 `n`；调用 `Vector3.pool.get`、`Vector3.pool.release`、`i.addMult`、`i.angle`、`i.cross`、`i.dot`。
   * 调用线索：Vector3.pool.get、Vector3.pool.release、i.addMult、i.angle、i.cross等。
   */
  angleAroundAxis(t, e) {
    const i = Vector3.pool.get();
    const s = Vector3.pool.get();
    i.addMult(this, e, -this.dot(e));
    s.addMult(t, e, -t.dot(e));
    let n = i.angle(s);
    i.cross(i, s);
    i.dot(e) < 0 && (n *= -1);
    Vector3.pool.release(i);
    Vector3.pool.release(s);
    return n;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `PioneerPublicApi.MathUtils.clamp`。
   * 状态写入：_x、_y、_z。
   * 调用线索：PioneerPublicApi.MathUtils.clamp。
   */
  clamp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.clamp(t.x, e.x, i.x);
    this._y = PioneerPublicApi.MathUtils.clamp(t.y, e.y, i.y);
    this._z = PioneerPublicApi.MathUtils.clamp(t.z, e.z, i.z);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `PioneerPublicApi.MathUtils.lerp`。
   * 状态写入：_x、_y、_z。
   * 调用线索：PioneerPublicApi.MathUtils.lerp。
   */
  lerp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.lerp(t.x, e.x, i);
    this._y = PioneerPublicApi.MathUtils.lerp(t.y, e.y, i);
    this._z = PioneerPublicApi.MathUtils.lerp(t.z, e.z, i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.abs`、`Math.acos`、`Math.sin`、`PioneerPublicApi.MathUtils.clamp`、`e.magnitude`、`t.dot`。
   * 调用线索：Math.abs、Math.acos、Math.sin、PioneerPublicApi.MathUtils.clamp、e.magnitude等。
   */
  slerp(t, e, i) {
    const n = t.magnitude();
    const o = e.magnitude();
    if (n > 0 && o > 0) {
      const r = Math.acos(PioneerPublicApi.MathUtils.clamp(t.dot(e) / (n * o), -1, 1));
      if (Math.abs(r) > .01745327777) {
        const s = 1 / Math.sin(r);
        const a = Math.sin((1 - i) * r) * s;
        const l = Math.sin(i * r) * s;
        this.set(t.x * a / n + e.x * l / o, t.y * a / n + e.y * l / o, t.z * a / n + e.z * l / o);
        this.mult(this, (1 - i) * n + i * o);
      } else this.lerp(t, e, i);
    } else this.lerp(t, e, i);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  rotate(t, e) {
    const i = t.w * e.x + t.y * e.z - t.z * e.y;
    const s = t.w * e.y + t.z * e.x - t.x * e.z;
    const n = t.w * e.z + t.x * e.y - t.y * e.x;
    const o = -t.x * e.x - t.y * e.y - t.z * e.z;
    this._x = i * t.w - o * t.x - s * t.z + n * t.y;
    this._y = s * t.w - o * t.y - n * t.x + i * t.z;
    this._z = n * t.w - o * t.z - i * t.y + s * t.x;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`。
   * 状态写入：_x、_y、_z。
   */
  rotateInverse(t, e) {
    const i = t.w * e.x - t.y * e.z + t.z * e.y;
    const s = t.w * e.y - t.z * e.x + t.x * e.z;
    const n = t.w * e.z - t.x * e.y + t.y * e.x;
    const o = t.x * e.x + t.y * e.y + t.z * e.z;
    this._x = i * t.w + o * t.x + s * t.z - n * t.y;
    this._y = s * t.w + o * t.y + n * t.x - i * t.z;
    this._z = n * t.w + o * t.z + i * t.y - s * t.x;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_x`、`_y`、`_z`；调用 `this.normalize`。
   * 状态写入：_x、_y、_z。
   * 调用线索：this.normalize。
   */
  setNormalTo(t, e) {
    const i = e.x * (t.y * t.y + t.z * t.z) - t.x * (t.y * e.y + t.z * e.z);
    const s = e.y * (t.z * t.z + t.x * t.x) - t.y * (t.z * e.z + t.x * e.x);
    const n = e.z * (t.x * t.x + t.y * t.y) - t.z * (t.x * e.x + t.y * e.y);
    this._x = i;
    this._y = s;
    this._z = n;
    this.normalize(this);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `vector3`；调用 `new Vector3`、`vector3.setFromAER`。
   * 调用线索：new Vector3、vector3.setFromAER。
   */
  static fromAER(t) {
    const vector3 = new Vector3();
    vector3.setFromAER(t);
    return vector3;
  }
  _x;
  _y;
  _z;
}
export { Vector3 };
