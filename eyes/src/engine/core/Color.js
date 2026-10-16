// Recovered from app.js:46209-47563.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Color {
  static Black = new Color(0, 0, 0, 1);
  static Clear = new Color(1, 1, 1, 0);
  static pool = new PioneerPublicApi.Pool(Color);
  constructor(t = 1, e = 1, i = 1, s = 1) {
    this._r = t;
    this._g = e;
    this._b = i;
    this._a = s;
  }
  get r() {
    return this._r;
  }
  set r(t) {
    this._r = t;
  }
  get g() {
    return this._g;
  }
  set g(t) {
    this._g = t;
  }
  get b() {
    return this._b;
  }
  set b(t) {
    this._b = t;
  }
  get a() {
    return this._a;
  }
  set a(t) {
    this._a = t;
  }
  toString() {
    return `[${this._r}, ${this._g}, ${this._b}, ${this._a}]`;
  }
  copy(t) {
    this._r = t.r;
    this._g = t.g;
    this._b = t.b;
    this._a = t.a;
  }
  set(t, e, i, s = 1) {
    this._r = t;
    this._g = e;
    this._b = i;
    this._a = s;
  }
  add(t, e) {
    this._r = t.r + e.r;
    this._g = t.g + e.g;
    this._b = t.b + e.b;
    this._a = t.a + e.a;
  }
  sub(t, e) {
    this._r = t.r - e.r;
    this._g = t.g - e.g;
    this._b = t.b - e.b;
    this._a = t.a - e.a;
  }
  mult(t, e) {
    this._r = t.r * e;
    this._g = t.g * e;
    this._b = t.b * e;
    this._a = t.a * e;
  }
  addMult(t, e, i) {
    this._r = t.r + e.r * i;
    this._g = t.g + e.g * i;
    this._b = t.b + e.b * i;
    this._a = t.a + e.a * i;
  }
  div(t, e) {
    this._r = t.r / e;
    this._g = t.g / e;
    this._b = t.b / e;
    this._a = t.a / e;
  }
  scale(t, e) {
    this._r = t.r * e.r;
    this._g = t.g * e.g;
    this._b = t.b * e.b;
    this._a = t.a * e.a;
  }
  value() {
    return (this._r + this._g + this._b) / 3;
  }
  min() {
    return Math.min(this._r, this._g, this._b);
  }
  max() {
    return Math.max(this._r, this._g, this._b);
  }
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
