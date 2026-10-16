// Recovered from app.js:46209-47563.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** RGBA 分量逐项运算，标量乘除同样作用于 alpha；不自动夹紧到 [0,1]，value/min/max 仅统计 RGB。 */

class Color {
  static Black = new Color(0, 0, 0, 1);
  static Clear = new Color(1, 1, 1, 0);
  static pool = new PioneerPublicApi.Pool(Color);
  constructor(red = 1, green = 1, blue = 1, alpha = 1) {
    this._r = red;
    this._g = green;
    this._b = blue;
    this._a = alpha;
  }
  get r() {
    return this._r;
  }
  set r(red) {
    this._r = red;
  }
  get g() {
    return this._g;
  }
  set g(green) {
    this._g = green;
  }
  get b() {
    return this._b;
  }
  set b(blue) {
    this._b = blue;
  }
  get a() {
    return this._a;
  }
  set a(alpha) {
    this._a = alpha;
  }
  toString() {
    return `[${this._r}, ${this._g}, ${this._b}, ${this._a}]`;
  }
  copy(source) {
    this._r = source.r;
    this._g = source.g;
    this._b = source.b;
    this._a = source.a;
  }
  set(red, green, blue, alpha = 1) {
    this._r = red;
    this._g = green;
    this._b = blue;
    this._a = alpha;
  }
  add(left, right) {
    this._r = left.r + right.r;
    this._g = left.g + right.g;
    this._b = left.b + right.b;
    this._a = left.a + right.a;
  }
  sub(left, right) {
    this._r = left.r - right.r;
    this._g = left.g - right.g;
    this._b = left.b - right.b;
    this._a = left.a - right.a;
  }
  mult(source, scalar) {
    this._r = source.r * scalar;
    this._g = source.g * scalar;
    this._b = source.b * scalar;
    this._a = source.a * scalar;
  }
  addMult(base, direction, scalar) {
    this._r = base.r + direction.r * scalar;
    this._g = base.g + direction.g * scalar;
    this._b = base.b + direction.b * scalar;
    this._a = base.a + direction.a * scalar;
  }
  div(source, scalar) {
    this._r = source.r / scalar;
    this._g = source.g / scalar;
    this._b = source.b / scalar;
    this._a = source.a / scalar;
  }
  scale(left, right) {
    this._r = left.r * right.r;
    this._g = left.g * right.g;
    this._b = left.b * right.b;
    this._a = left.a * right.a;
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
  lerp(start, end, fraction) {
    this._r = PioneerPublicApi.MathUtils.lerp(start.r, end.r, fraction);
    this._g = PioneerPublicApi.MathUtils.lerp(start.g, end.g, fraction);
    this._b = PioneerPublicApi.MathUtils.lerp(start.b, end.b, fraction);
    this._a = PioneerPublicApi.MathUtils.lerp(start.a, end.a, fraction);
  }
  _r;
  _g;
  _b;
  _a;
}
export { Color };
