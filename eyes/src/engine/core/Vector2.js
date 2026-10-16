// Recovered from app.js:65782-67607.
import * as PioneerPublicApi from "../pioneer/public-api.js";
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
  constructor(t = 0, e = 0) {
    this._x = t;
    this._y = e;
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
  toString() {
    return `[${this._x}, ${this._y}]`;
  }
  equals(t) {
    return this._x === t.x && this._y === t.y;
  }
  isZero() {
    return 0 === this._x && 0 === this._y;
  }
  isNaN() {
    return this._x != this._x || this._y != this._y;
  }
  copy(t) {
    this._x = t.x;
    this._y = t.y;
  }
  copyFromThreeJs(t) {
    this._x = t.x;
    this._y = t.y;
  }
  set(t, e) {
    this._x = t;
    this._y = e;
  }
  neg(t) {
    this._x = -t.x;
    this._y = -t.y;
  }
  add(t, e) {
    this._x = t.x + e.x;
    this._y = t.y + e.y;
  }
  sub(t, e) {
    this._x = t.x - e.x;
    this._y = t.y - e.y;
  }
  mult(t, e) {
    this._x = t.x * e;
    this._y = t.y * e;
  }
  addMult(t, e, i) {
    this._x = t.x + e.x * i;
    this._y = t.y + e.y * i;
  }
  div(t, e) {
    this._x = t.x / e;
    this._y = t.y / e;
  }
  scale(t, e) {
    this._x = t.x * e.x;
    this._y = t.y * e.y;
  }
  scaleInv(t, e) {
    this._x = t.x / e.x;
    this._y = t.y / e.y;
  }
  dot(t) {
    return this._x * t.x + this._y * t.y;
  }
  cross(t) {
    return this._x * t.y - this._y * t.x;
  }
  magnitudeSqr() {
    return this._x * this._x + this._y * this._y;
  }
  magnitude() {
    return Math.sqrt(this.magnitudeSqr());
  }
  normalize(t) {
    const e = t.magnitude();
    e > 0 && (this._x = t.x / e, this._y = t.y / e);
  }
  setMagnitude(t, e) {
    this.normalize(t);
    this._x *= e;
    this._y *= e;
  }
  distance(t) {
    const e = this._x - t.x;
    const i = this._y - t.y;
    return Math.sqrt(e * e + i * i);
  }
  angle(t) {
    const e = this.magnitude() * t.magnitude();
    return e > 0 ? Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t) / e, -1, 1)) : Number.NaN;
  }
  clamp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.clamp(t.x, e.x, i.x);
    this._y = PioneerPublicApi.MathUtils.clamp(t.y, e.y, i.y);
  }
  lerp(t, e, i) {
    this._x = PioneerPublicApi.MathUtils.lerp(t.x, e.x, i);
    this._y = PioneerPublicApi.MathUtils.lerp(t.y, e.y, i);
  }
  _x;
  _y;
}
export { Vector2 };
