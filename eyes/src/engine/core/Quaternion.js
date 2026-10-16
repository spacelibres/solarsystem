/** @eyes-analysis
 * 文件职责：四元数乘法、逆、旋转轴、方向转换及球面插值；包含 Three.js 对接与对象池。
 * 依据：import ../pioneer/public-api.js；Quaternion @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:60682-65781.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：四元数乘法、逆、旋转轴、方向转换及球面插值；包含 Three.js 对接与对象池。
 * 继承：无显式父类；导出：Quaternion。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Quaternion {
  static Identity = new Quaternion(1, 0, 0, 0);
  static NaN = new Quaternion(NaN, NaN, NaN, NaN);
  static pool = new PioneerPublicApi.Pool(Quaternion);
  static threeJsPool = new PioneerPublicApi.Pool(PioneerPublicApi.THREE.Quaternion);
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`。
   * 状态写入：_w、_x、_y、_z。
   */
  constructor(t = 1, e = 0, i = 0, s = 0) {
    this._w = t;
    this._x = e;
    this._y = i;
    this._z = s;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._w`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get w() {
    return this._w;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；实际写入 `_w`。
   * 状态写入：_w。
   */
  set w(t) {
    this._w = t;
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
   * 【结构证据】返回 `2*Math.acos(this._w)`；调用 `Math.acos`。
   * 调用线索：Math.acos。
   */
  getAngle() {
    return 2 * Math.acos(this._w);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`。
   * 状态写入：_w、_x、_y、_z。
   */
  copy(t) {
    this._w = t.w;
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`。
   * 状态写入：_w、_x、_y、_z。
   */
  copyFromThreeJs(t) {
    this._w = t.w;
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`。
   * 状态写入：_w、_x、_y、_z。
   */
  set(t, e, i, s) {
    this._w = t;
    this._x = e;
    this._y = i;
    this._z = s;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：Math.cos、Math.sin。
   */
  setFromAxisAngle(t, e) {
    const i = Math.sin(e / 2);
    this._w = Math.cos(e / 2);
    this._x = i * t.x;
    this._y = i * t.y;
    this._z = i * t.z;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.sqrt`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`n.cross`、`new Error`；含显式错误分支。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：Math.sqrt、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、n.cross、new Error。
   */
  setFromAxes(t, e, i) {
    let n;
    if (!t && e && i) {
      n = PioneerPublicApi.Vector3.pool.get();
      n.cross(e, i);
      t = n;
    } else if (!e && i && t) {
      n = PioneerPublicApi.Vector3.pool.get();
      n.cross(i, t);
      e = n;
    } else {
      if (i || !t || !e) throw new Error("At least two of xAxis, yAxis, and zAxis must be defined");
      n = PioneerPublicApi.Vector3.pool.get();
      n.cross(t, e);
      i = n;
    }
    const o = t.x + e.y + i.z;
    if (o > 0) {
      const s = 2 * Math.sqrt(o + 1);
      this._w = .25 * s;
      this._x = (e.z - i.y) / s;
      this._y = (i.x - t.z) / s;
      this._z = (t.y - e.x) / s;
    } else if (t.x > e.y && t.x > i.z) {
      const s = 2 * Math.sqrt(1 + t.x - e.y - i.z);
      this._w = (e.z - i.y) / s;
      this._x = .25 * s;
      this._y = (e.x + t.y) / s;
      this._z = (i.x + t.z) / s;
    } else if (e.y > i.z) {
      const s = 2 * Math.sqrt(1 + e.y - i.z - t.x);
      this._w = (i.x - t.z) / s;
      this._x = (e.x + t.y) / s;
      this._y = .25 * s;
      this._z = (i.y + e.z) / s;
    } else {
      const s = 2 * Math.sqrt(1 + i.z - t.x - e.y);
      this._w = (t.y - e.x) / s;
      this._x = (i.x + t.z) / s;
      this._y = (i.y + e.z) / s;
      this._z = .25 * s;
    }
    PioneerPublicApi.Vector3.pool.release(n);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：Math.cos、Math.sin。
   */
  setFromEuler(t, e, i) {
    const s = .5 * t;
    const n = .5 * e;
    const o = .5 * i;
    const r = Math.cos(s);
    const a = Math.sin(s);
    const l = Math.cos(n);
    const c = Math.sin(n);
    const h = Math.cos(o);
    const d = Math.sin(o);
    this._w = r * l * h + a * c * d;
    this._x = a * l * h - r * c * d;
    this._y = r * c * h + a * l * d;
    this._z = r * l * d - a * c * h;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.acos`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.cross`、`i.normalize`、`t.dot`。
   * 调用线索：Math.acos、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、i.cross、i.normalize等。
   */
  setFromVectorFromTo(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = t.dot(e);
    if (n >= 1) this.set(1, 0, 0, 0);else if (n <= -1) this.set(0, 1, 0, 0);else {
      i.cross(t, e);
      i.normalize(i);
      const s = Math.acos(n);
      this.setFromAxisAngle(i, s);
    }
    PioneerPublicApi.Vector3.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.normalize`、`n.cross`、`n.isZero`、`n.normalize`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、i.normalize、n.cross、n.isZero等。
   */
  setFromAxis(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    i.normalize(t);
    n.cross(i, PioneerPublicApi.Vector3.XAxis);
    n.isZero() && n.cross(i, PioneerPublicApi.Vector3.YAxis);
    n.normalize(n);
    0 === e ? this.setFromAxes(i, n, void 0) : 1 === e ? this.setFromAxes(void 0, i, n) : 2 === e && this.setFromAxes(n, void 0, i);
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(n);
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
  toString() {
    return `[${this._w}, ${this._x}, ${this._y}, ${this._z}]`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._w!=this._w||this._x!=this._x||this._y!=this._y||this._z!=this._z`。
   */
  isNaN() {
    return this._w != this._w || this._x != this._x || this._y != this._y || this._z != this._z;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.sqrt(this._w*this._w+this._x*this._x+this._y*this._y+this._z*this._z)`；调用 `Math.sqrt`。
   * 调用线索：Math.sqrt。
   */
  magnitude() {
    return Math.sqrt(this._w * this._w + this._x * this._x + this._y * this._y + this._z * this._z);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `t.magnitude`。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：t.magnitude。
   */
  normalize(t) {
    const e = t.magnitude();
    e > 0 && (this._w = t.w / e, this._x = t.x / e, this._y = t.y / e, this._z = t.z / e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`。
   * 状态写入：_w、_x、_y、_z。
   */
  inverse(t) {
    this._w = t.w;
    this._x = -t.x;
    this._y = -t.y;
    this._z = -t.z;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。
   * 调用线索：Quaternion.pool.get、Quaternion.pool.release、this.copy。
   */
  mult(t, e) {
    const i = Quaternion.pool.get();
    i._w = t.w * e.w - t.x * e.x - t.y * e.y - t.z * e.z;
    i._x = t.w * e.x + t.x * e.w + t.y * e.z - t.z * e.y;
    i._y = t.w * e.y - t.x * e.z + t.y * e.w + t.z * e.x;
    i._z = t.w * e.z + t.x * e.y - t.y * e.x + t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。
   * 调用线索：Quaternion.pool.get、Quaternion.pool.release、this.copy。
   */
  multInverseL(t, e) {
    const i = Quaternion.pool.get();
    i._w = t.w * e.w + t.x * e.x + t.y * e.y + t.z * e.z;
    i._x = t.w * e.x - t.x * e.w - t.y * e.z + t.z * e.y;
    i._y = t.w * e.y + t.x * e.z - t.y * e.w - t.z * e.x;
    i._z = t.w * e.z - t.x * e.y + t.y * e.x - t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。
   * 调用线索：Quaternion.pool.get、Quaternion.pool.release、this.copy。
   */
  multInverseR(t, e) {
    const i = Quaternion.pool.get();
    i._w = +t.w * e.w + t.x * e.x + t.y * e.y + t.z * e.z;
    i._x = -t.w * e.x + t.x * e.w - t.y * e.z + t.z * e.y;
    i._y = -t.w * e.y + t.x * e.z + t.y * e.w - t.z * e.x;
    i._z = -t.w * e.z - t.x * e.y + t.y * e.x + t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；返回 `void this.copy(t)`；调用 `Math.acos`、`Math.cos`、`Math.sin`、`this.copy`。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：Math.acos、Math.cos、Math.sin、this.copy。
   */
  scaleAngle(t, e) {
    const i = Math.acos(t.w);
    const s = Math.sin(i);
    if (0 === s) return void this.copy(t);
    const n = Math.sin(i * e);
    this._w = Math.cos(i * e);
    this._x = t.x / s * n;
    this._y = t.y / s * n;
    this._z = t.z / s * n;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `2*Math.acos(this._w*t.w+this._x*t.x+this._y*t.y+this._z*t.z)`；调用 `Math.acos`。
   * 调用线索：Math.acos。
   */
  angle(t) {
    return 2 * Math.acos(this._w * t.w + this._x * t.x + this._y * t.y + this._z * t.z);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.acos`、`Math.sin`、`this.normalize`。
   * 状态写入：_w、_x、_y、_z。
   * 调用线索：Math.acos、Math.sin、this.normalize。
   */
  slerp(t, e, i) {
    let s = t.w * e.w + t.x * e.x + t.y * e.y + t.z * e.z;
    let n = 1;
    if (s < 0 && (n = -1, s = -s), s <= .9995) {
      const o = Math.acos(s);
      const r = n * Math.sin((1 - i) * o) / Math.sin(o);
      const a = Math.sin(i * o) / Math.sin(o);
      this._w = r * t.w + a * e.w;
      this._x = r * t.x + a * e.x;
      this._y = r * t.y + a * e.y;
      this._z = r * t.z + a * e.z;
    } else {
      const s = n * (1 - i);
      const o = i;
      this._w = s * t.w + o * e.w;
      this._x = s * t.x + o * e.x;
      this._y = s * t.y + o * e.y;
      this._z = s * t.z + o * e.z;
      this.normalize(this);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.normalize`、`t.set`。
   * 调用线索：t.normalize、t.set。
   */
  getAxis(t, e) {
    void 0 === e ? (t.set(this._x, this._y, this._z), t.normalize(t)) : 0 === e ? (t.x = this._w * this._w + this._x * this._x - this._y * this._y - this._z * this._z, t.y = 2 * this._w * this._z + 2 * this._x * this._y, t.z = 2 * this._x * this._z - 2 * this._w * this._y) : 1 === e ? (t.x = 2 * this._y * this._x - 2 * this._w * this._z, t.y = this._w * this._w - this._x * this._x + this._y * this._y - this._z * this._z, t.z = 2 * this._x * this._w + 2 * this._y * this._z) : 2 === e && (t.x = 2 * this._y * this._w + 2 * this._z * this._x, t.y = 2 * this._z * this._y - 2 * this._w * this._x, t.z = this._w * this._w - this._x * this._x - this._y * this._y + this._z * this._z);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxisAngle`。
   * 调用线索：new Quaternion、quaternion.setFromAxisAngle。
   */
  static fromAxisAngle(t, e) {
    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(t, e);
    return quaternion;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxes`。
   * 调用线索：new Quaternion、quaternion.setFromAxes。
   */
  static fromAxes(t, e, i) {
    const quaternion = new Quaternion();
    quaternion.setFromAxes(t, e, i);
    return quaternion;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromEuler`。
   * 调用线索：new Quaternion、quaternion.setFromEuler。
   */
  static fromEuler(t, e, i) {
    const quaternion = new Quaternion();
    quaternion.setFromEuler(t, e, i);
    return quaternion;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromVectorFromTo`。
   * 调用线索：new Quaternion、quaternion.setFromVectorFromTo。
   */
  static fromVectorFromTo(t, e) {
    const quaternion = new Quaternion();
    quaternion.setFromVectorFromTo(t, e);
    return quaternion;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxis`。
   * 调用线索：new Quaternion、quaternion.setFromAxis。
   */
  static fromFromAxis(t, e) {
    const quaternion = new Quaternion();
    quaternion.setFromAxis(t, e);
    return quaternion;
  }
  _w;
  _x;
  _y;
  _z;
}
export { Quaternion };
