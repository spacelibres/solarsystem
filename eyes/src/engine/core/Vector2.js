// Recovered from app.js:65782-67607.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 算术方法原地写 this，允许逐分量输入别名；零向量 normalize 保留原输出而非强制清零，夹角缺失方向时返回 NaN。 */
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
  constructor(coordinateX = 0, coordinateY = 0) {
    this._x = coordinateX;
    this._y = coordinateY;
  }
  get x() {
    return this._x;
  }
  set x(coordinateX) {
    this._x = coordinateX;
  }
  get y() {
    return this._y;
  }
  set y(coordinateY) {
    this._y = coordinateY;
  }
  toString() {
    return `[${this._x}, ${this._y}]`;
  }
  equals(source) {
    return this._x === source.x && this._y === source.y;
  }
  isZero() {
    return 0 === this._x && 0 === this._y;
  }
  isNaN() {
    return this._x != this._x || this._y != this._y;
  }
  copy(source) {
    this._x = source.x;
    this._y = source.y;
  }
  copyFromThreeJs(source) {
    this._x = source.x;
    this._y = source.y;
  }
  set(coordinateX, coordinateY) {
    this._x = coordinateX;
    this._y = coordinateY;
  }
  neg(source) {
    this._x = -source.x;
    this._y = -source.y;
  }
  add(left, right) {
    this._x = left.x + right.x;
    this._y = left.y + right.y;
  }
  sub(left, right) {
    this._x = left.x - right.x;
    this._y = left.y - right.y;
  }
  mult(source, scalar) {
    this._x = source.x * scalar;
    this._y = source.y * scalar;
  }
  addMult(base, direction, scalar) {
    this._x = base.x + direction.x * scalar;
    this._y = base.y + direction.y * scalar;
  }
  div(source, scalar) {
    this._x = source.x / scalar;
    this._y = source.y / scalar;
  }
  scale(left, right) {
    this._x = left.x * right.x;
    this._y = left.y * right.y;
  }
  scaleInv(left, right) {
    this._x = left.x / right.x;
    this._y = left.y / right.y;
  }
  dot(source) {
    return this._x * source.x + this._y * source.y;
  }
  cross(other) {
    return this._x * other.y - this._y * other.x;
  }
  magnitudeSqr() {
    return this._x * this._x + this._y * this._y;
  }
  magnitude() {
    return Math.sqrt(this.magnitudeSqr());
  }
  normalize(source) {
    const magnitude = source.magnitude();
    if (magnitude > 0) {
      this._x = source.x / magnitude;
      this._y = source.y / magnitude;
    }
  }
  setMagnitude(source, magnitude) {
    this.normalize(source);
    this._x *= magnitude;
    this._y *= magnitude;
  }
  distance(other) {
    const deltaX = this._x - other.x;
    const deltaY = this._y - other.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  angle(source) {
    const magnitudeProduct = this.magnitude() * source.magnitude();
    return magnitudeProduct > 0 ? Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(source) / magnitudeProduct, -1, 1)) : Number.NaN;
  }
  clamp(source, minimum, maximum) {
    this._x = PioneerPublicApi.MathUtils.clamp(source.x, minimum.x, maximum.x);
    this._y = PioneerPublicApi.MathUtils.clamp(source.y, minimum.y, maximum.y);
  }
  lerp(start, end, fraction) {
    this._x = PioneerPublicApi.MathUtils.lerp(start.x, end.x, fraction);
    this._y = PioneerPublicApi.MathUtils.lerp(start.y, end.y, fraction);
  }
  _x;
  _y;
}
export { Vector2 };
