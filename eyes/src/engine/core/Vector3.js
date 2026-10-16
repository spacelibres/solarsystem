// Recovered from app.js:67608-71528.
import * as PioneerPublicApi from "../pioneer/public-api.js";
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
  constructor(t = 0, e = 0, i = 0) {
    this._x = t;
    this._y = e;
    this._z = i;
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
  toString() {
    return `[${this._x}, ${this._y}, ${this._z}]`;
  }
  equals(t) {
    return this._x === t.x && this._y === t.y && this._z === t.z;
  }
  isZero() {
    return 0 === this._x && 0 === this._y && 0 === this._z;
  }
  isNaN() {
    return this._x != this._x || this._y != this._y || this._z != this._z;
  }
  copy(t) {
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  copyFromThreeJs(t) {
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
  }
  set(t, e, i) {
    this._x = t;
    this._y = e;
    this._z = i;
  }
  setFromAER(t) {
    const e = Math.cos(t.elevation);
    this._x = t.range * e * Math.cos(t.azimuth);
    this._y = t.range * e * Math.sin(t.azimuth);
    this._z = t.range * Math.sin(t.elevation);
  }
  neg(t) {
    this._x = -t.x;
    this._y = -t.y;
    this._z = -t.z;
  }
  add(t, e) {
    this._x = t.x + e.x;
    this._y = t.y + e.y;
    this._z = t.z + e.z;
  }
  sub(t, e) {
    this._x = t.x - e.x;
    this._y = t.y - e.y;
    this._z = t.z - e.z;
  }
  mult(t, e) {
    this._x = t.x * e;
    this._y = t.y * e;
    this._z = t.z * e;
  }
  addMult(t, e, i) {
    this._x = t.x + e.x * i;
    this._y = t.y + e.y * i;
    this._z = t.z + e.z * i;
  }
  div(t, e) {
    this._x = t.x / e;
    this._y = t.y / e;
    this._z = t.z / e;
  }
  scale(t, e) {
    this._x = t.x * e.x;
    this._y = t.y * e.y;
    this._z = t.z * e.z;
  }
  scaleInv(t, e) {
    this._x = t.x / e.x;
    this._y = t.y / e.y;
    this._z = t.z / e.z;
  }
  dot(t) {
    return this._x * t.x + this._y * t.y + this._z * t.z;
  }
  cross(t, e) {
    const i = t.y * e.z - t.z * e.y;
    const s = t.z * e.x - t.x * e.z;
    const n = t.x * e.y - t.y * e.x;
    this._x = i;
    this._y = s;
    this._z = n;
  }
  magnitudeSqr() {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }
  magnitude() {
    return Math.sqrt(this.magnitudeSqr());
  }
  magnitudeXY() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }
  normalize(t) {
    const e = t.magnitude();
    e > 0 ? (this._x = t.x / e, this._y = t.y / e, this._z = t.z / e) : this.copy(t);
  }
  setMagnitude(t, e) {
    this.normalize(t);
    this._x *= e;
    this._y *= e;
    this._z *= e;
  }
  distance(t) {
    const e = this._x - t.x;
    const i = this._y - t.y;
    const s = this._z - t.z;
    return Math.sqrt(e * e + i * i + s * s);
  }
  angle(t) {
    const e = this.magnitude() * t.magnitude();
    return e > 0 ? Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t) / e, -1, 1)) : Number.NaN;
  }
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
  clamp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.clamp(t.x, e.x, i.x);
    this._y = PioneerPublicApi.MathUtils.clamp(t.y, e.y, i.y);
    this._z = PioneerPublicApi.MathUtils.clamp(t.z, e.z, i.z);
  }
  lerp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.lerp(t.x, e.x, i);
    this._y = PioneerPublicApi.MathUtils.lerp(t.y, e.y, i);
    this._z = PioneerPublicApi.MathUtils.lerp(t.z, e.z, i);
  }
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
  rotate(t, e) {
    const i = t.w * e.x + t.y * e.z - t.z * e.y;
    const s = t.w * e.y + t.z * e.x - t.x * e.z;
    const n = t.w * e.z + t.x * e.y - t.y * e.x;
    const o = -t.x * e.x - t.y * e.y - t.z * e.z;
    this._x = i * t.w - o * t.x - s * t.z + n * t.y;
    this._y = s * t.w - o * t.y - n * t.x + i * t.z;
    this._z = n * t.w - o * t.z - i * t.y + s * t.x;
  }
  rotateInverse(t, e) {
    const i = t.w * e.x - t.y * e.z + t.z * e.y;
    const s = t.w * e.y - t.z * e.x + t.x * e.z;
    const n = t.w * e.z - t.x * e.y + t.y * e.x;
    const o = t.x * e.x + t.y * e.y + t.z * e.z;
    this._x = i * t.w + o * t.x + s * t.z - n * t.y;
    this._y = s * t.w + o * t.y + n * t.x - i * t.z;
    this._z = n * t.w + o * t.z + i * t.y - s * t.x;
  }
  setNormalTo(t, e) {
    const i = e.x * (t.y * t.y + t.z * t.z) - t.x * (t.y * e.y + t.z * e.z);
    const s = e.y * (t.z * t.z + t.x * t.x) - t.y * (t.z * e.z + t.x * e.x);
    const n = e.z * (t.x * t.x + t.y * t.y) - t.z * (t.x * e.x + t.y * e.y);
    this._x = i;
    this._y = s;
    this._z = n;
    this.normalize(this);
  }
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
