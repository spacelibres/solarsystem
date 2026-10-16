// Recovered from app.js:67608-71528.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 旋转与叉积先缓存全部分量再写输出，支持 this 与输入别名；零向量 normalize 复制输入，球面混合同时线性混合长度。 */
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
  constructor(coordinateX = 0, coordinateY = 0, coordinateZ = 0) {
    this._x = coordinateX;
    this._y = coordinateY;
    this._z = coordinateZ;
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
  get z() {
    return this._z;
  }
  set z(coordinateZ) {
    this._z = coordinateZ;
  }
  toString() {
    return `[${this._x}, ${this._y}, ${this._z}]`;
  }
  equals(source) {
    return this._x === source.x && this._y === source.y && this._z === source.z;
  }
  isZero() {
    return 0 === this._x && 0 === this._y && 0 === this._z;
  }
  isNaN() {
    return this._x != this._x || this._y != this._y || this._z != this._z;
  }
  copy(source) {
    this._x = source.x;
    this._y = source.y;
    this._z = source.z;
  }
  copyFromThreeJs(source) {
    this._x = source.x;
    this._y = source.y;
    this._z = source.z;
  }
  set(coordinateX, coordinateY, coordinateZ) {
    this._x = coordinateX;
    this._y = coordinateY;
    this._z = coordinateZ;
  }
  setFromAER(aer) {
    const cosElevation = Math.cos(aer.elevation);
    this._x = aer.range * cosElevation * Math.cos(aer.azimuth);
    this._y = aer.range * cosElevation * Math.sin(aer.azimuth);
    this._z = aer.range * Math.sin(aer.elevation);
  }
  neg(source) {
    this._x = -source.x;
    this._y = -source.y;
    this._z = -source.z;
  }
  add(left, right) {
    this._x = left.x + right.x;
    this._y = left.y + right.y;
    this._z = left.z + right.z;
  }
  sub(left, right) {
    this._x = left.x - right.x;
    this._y = left.y - right.y;
    this._z = left.z - right.z;
  }
  mult(source, scalar) {
    this._x = source.x * scalar;
    this._y = source.y * scalar;
    this._z = source.z * scalar;
  }
  addMult(base, direction, scalar) {
    this._x = base.x + direction.x * scalar;
    this._y = base.y + direction.y * scalar;
    this._z = base.z + direction.z * scalar;
  }
  div(source, scalar) {
    this._x = source.x / scalar;
    this._y = source.y / scalar;
    this._z = source.z / scalar;
  }
  scale(left, right) {
    this._x = left.x * right.x;
    this._y = left.y * right.y;
    this._z = left.z * right.z;
  }
  scaleInv(left, right) {
    this._x = left.x / right.x;
    this._y = left.y / right.y;
    this._z = left.z / right.z;
  }
  dot(source) {
    return this._x * source.x + this._y * source.y + this._z * source.z;
  }
  cross(left, right) {
    const crossX = left.y * right.z - left.z * right.y;
    const crossY = left.z * right.x - left.x * right.z;
    const crossZ = left.x * right.y - left.y * right.x;
    this._x = crossX;
    this._y = crossY;
    this._z = crossZ;
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
  normalize(source) {
    const magnitude = source.magnitude();
    if (magnitude > 0) {
      this._x = source.x / magnitude;
      this._y = source.y / magnitude;
      this._z = source.z / magnitude;
    } else {
      this.copy(source);
    }
  }
  setMagnitude(source, magnitude) {
    this.normalize(source);
    this._x *= magnitude;
    this._y *= magnitude;
    this._z *= magnitude;
  }
  distance(other) {
    const deltaX = this._x - other.x;
    const deltaY = this._y - other.y;
    const deltaZ = this._z - other.z;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
  }
  angle(source) {
    const magnitudeProduct = this.magnitude() * source.magnitude();
    return magnitudeProduct > 0 ? Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(source) / magnitudeProduct, -1, 1)) : Number.NaN;
  }
  /** 减去沿 axis 的投影后求有符号夹角；axis 假定单位向量，池向量在返回前归还。 */
  angleAroundAxis(targetVector, axis) {
    const projectedSource = Vector3.pool.get();
    const projectedTarget = Vector3.pool.get();
    projectedSource.addMult(this, axis, -this.dot(axis));
    projectedTarget.addMult(targetVector, axis, -targetVector.dot(axis));
    let signedAngle = projectedSource.angle(projectedTarget);
    projectedSource.cross(projectedSource, projectedTarget);
    if (projectedSource.dot(axis) < 0) {
      signedAngle *= -1;
    }
    Vector3.pool.release(projectedSource);
    Vector3.pool.release(projectedTarget);
    return signedAngle;
  }
  clamp(source, minimum, maximum) {
    this._x = PioneerPublicApi.MathUtils.clamp(source.x, minimum.x, maximum.x);
    this._y = PioneerPublicApi.MathUtils.clamp(source.y, minimum.y, maximum.y);
    this._z = PioneerPublicApi.MathUtils.clamp(source.z, minimum.z, maximum.z);
  }
  lerp(start, end, fraction) {
    this._x = PioneerPublicApi.MathUtils.lerp(start.x, end.x, fraction);
    this._y = PioneerPublicApi.MathUtils.lerp(start.y, end.y, fraction);
    this._z = PioneerPublicApi.MathUtils.lerp(start.z, end.z, fraction);
  }
  slerp(startVector, endVector, fraction) {
    const startMagnitude = startVector.magnitude();
    const endMagnitude = endVector.magnitude();
    if (startMagnitude > 0 && endMagnitude > 0) {
      const angle = Math.acos(PioneerPublicApi.MathUtils.clamp(startVector.dot(endVector) / (startMagnitude * endMagnitude), -1, 1));
      if (Math.abs(angle) > .01745327777) {
        const inverseSinAngle = 1 / Math.sin(angle);
        const startWeight = Math.sin((1 - fraction) * angle) * inverseSinAngle;
        const endWeight = Math.sin(fraction * angle) * inverseSinAngle;
        this.set(startVector.x * startWeight / startMagnitude + endVector.x * endWeight / endMagnitude, startVector.y * startWeight / startMagnitude + endVector.y * endWeight / endMagnitude, startVector.z * startWeight / startMagnitude + endVector.z * endWeight / endMagnitude);
        this.mult(this, (1 - fraction) * startMagnitude + fraction * endMagnitude);
      } else this.lerp(startVector, endVector, fraction);
    } else this.lerp(startVector, endVector, fraction);
  }
  rotate(rotation, vector) {
    const productX = rotation.w * vector.x + rotation.y * vector.z - rotation.z * vector.y;
    const productY = rotation.w * vector.y + rotation.z * vector.x - rotation.x * vector.z;
    const productZ = rotation.w * vector.z + rotation.x * vector.y - rotation.y * vector.x;
    const productW = -rotation.x * vector.x - rotation.y * vector.y - rotation.z * vector.z;
    this._x = productX * rotation.w - productW * rotation.x - productY * rotation.z + productZ * rotation.y;
    this._y = productY * rotation.w - productW * rotation.y - productZ * rotation.x + productX * rotation.z;
    this._z = productZ * rotation.w - productW * rotation.z - productX * rotation.y + productY * rotation.x;
  }
  rotateInverse(rotation, vector) {
    const productX = rotation.w * vector.x - rotation.y * vector.z + rotation.z * vector.y;
    const productY = rotation.w * vector.y - rotation.z * vector.x + rotation.x * vector.z;
    const productZ = rotation.w * vector.z - rotation.x * vector.y + rotation.y * vector.x;
    const productW = rotation.x * vector.x + rotation.y * vector.y + rotation.z * vector.z;
    this._x = productX * rotation.w + productW * rotation.x + productY * rotation.z - productZ * rotation.y;
    this._y = productY * rotation.w + productW * rotation.y + productZ * rotation.x - productX * rotation.z;
    this._z = productZ * rotation.w + productW * rotation.z + productX * rotation.y - productY * rotation.x;
  }
  setNormalTo(normal, preferredDirection) {
    const projectedX = preferredDirection.x * (normal.y * normal.y + normal.z * normal.z) - normal.x * (normal.y * preferredDirection.y + normal.z * preferredDirection.z);
    const projectedY = preferredDirection.y * (normal.z * normal.z + normal.x * normal.x) - normal.y * (normal.z * preferredDirection.z + normal.x * preferredDirection.x);
    const projectedZ = preferredDirection.z * (normal.x * normal.x + normal.y * normal.y) - normal.z * (normal.x * preferredDirection.x + normal.y * preferredDirection.y);
    this._x = projectedX;
    this._y = projectedY;
    this._z = projectedZ;
    this.normalize(this);
  }
  static fromAER(aer) {
    const vector3 = new Vector3();
    vector3.setFromAER(aer);
    return vector3;
  }
  _x;
  _y;
  _z;
}
export { Vector3 };
