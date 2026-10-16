// Recovered from app.js:60682-65781.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Quaternion {
  static Identity = new Quaternion(1, 0, 0, 0);
  static NaN = new Quaternion(NaN, NaN, NaN, NaN);
  static pool = new PioneerPublicApi.Pool(Quaternion);
  static threeJsPool = new PioneerPublicApi.Pool(PioneerPublicApi.THREE.Quaternion);
  constructor(t = 1, e = 0, i = 0, s = 0) {
    this._w = t;
    this._x = e;
    this._y = i;
    this._z = s;
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t;
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t;
  }
  getAngle() {
    return 2 * Math.acos(this._w);
  }
  copy(t) {
    this._w = t.w;
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  copyFromThreeJs(t) {
    this._w = t.w;
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  set(t, e, i, s) {
    this._w = t;
    this._x = e;
    this._y = i;
    this._z = s;
  }
  setFromAxisAngle(t, e) {
    const i = Math.sin(e / 2);
    this._w = Math.cos(e / 2);
    this._x = i * t.x;
    this._y = i * t.y;
    this._z = i * t.z;
  }
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
  toString() {
    return `[${this._w}, ${this._x}, ${this._y}, ${this._z}]`;
  }
  isNaN() {
    return this._w != this._w || this._x != this._x || this._y != this._y || this._z != this._z;
  }
  magnitude() {
    return Math.sqrt(this._w * this._w + this._x * this._x + this._y * this._y + this._z * this._z);
  }
  normalize(t) {
    const e = t.magnitude();
    e > 0 && (this._w = t.w / e, this._x = t.x / e, this._y = t.y / e, this._z = t.z / e);
  }
  inverse(t) {
    this._w = t.w;
    this._x = -t.x;
    this._y = -t.y;
    this._z = -t.z;
  }
  mult(t, e) {
    const i = Quaternion.pool.get();
    i._w = t.w * e.w - t.x * e.x - t.y * e.y - t.z * e.z;
    i._x = t.w * e.x + t.x * e.w + t.y * e.z - t.z * e.y;
    i._y = t.w * e.y - t.x * e.z + t.y * e.w + t.z * e.x;
    i._z = t.w * e.z + t.x * e.y - t.y * e.x + t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
  multInverseL(t, e) {
    const i = Quaternion.pool.get();
    i._w = t.w * e.w + t.x * e.x + t.y * e.y + t.z * e.z;
    i._x = t.w * e.x - t.x * e.w - t.y * e.z + t.z * e.y;
    i._y = t.w * e.y + t.x * e.z - t.y * e.w - t.z * e.x;
    i._z = t.w * e.z - t.x * e.y + t.y * e.x - t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
  multInverseR(t, e) {
    const i = Quaternion.pool.get();
    i._w = +t.w * e.w + t.x * e.x + t.y * e.y + t.z * e.z;
    i._x = -t.w * e.x + t.x * e.w - t.y * e.z + t.z * e.y;
    i._y = -t.w * e.y + t.x * e.z + t.y * e.w - t.z * e.x;
    i._z = -t.w * e.z - t.x * e.y + t.y * e.x + t.z * e.w;
    this.copy(i);
    Quaternion.pool.release(i);
  }
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
  angle(t) {
    return 2 * Math.acos(this._w * t.w + this._x * t.x + this._y * t.y + this._z * t.z);
  }
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
  getAxis(t, e) {
    void 0 === e ? (t.set(this._x, this._y, this._z), t.normalize(t)) : 0 === e ? (t.x = this._w * this._w + this._x * this._x - this._y * this._y - this._z * this._z, t.y = 2 * this._w * this._z + 2 * this._x * this._y, t.z = 2 * this._x * this._z - 2 * this._w * this._y) : 1 === e ? (t.x = 2 * this._y * this._x - 2 * this._w * this._z, t.y = this._w * this._w - this._x * this._x + this._y * this._y - this._z * this._z, t.z = 2 * this._x * this._w + 2 * this._y * this._z) : 2 === e && (t.x = 2 * this._y * this._w + 2 * this._z * this._x, t.y = 2 * this._z * this._y - 2 * this._w * this._x, t.z = this._w * this._w - this._x * this._x - this._y * this._y + this._z * this._z);
  }
  static fromAxisAngle(t, e) {
    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(t, e);
    return quaternion;
  }
  static fromAxes(t, e, i) {
    const quaternion = new Quaternion();
    quaternion.setFromAxes(t, e, i);
    return quaternion;
  }
  static fromEuler(t, e, i) {
    const quaternion = new Quaternion();
    quaternion.setFromEuler(t, e, i);
    return quaternion;
  }
  static fromVectorFromTo(t, e) {
    const quaternion = new Quaternion();
    quaternion.setFromVectorFromTo(t, e);
    return quaternion;
  }
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
