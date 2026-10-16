// Recovered from app.js:60682-65781.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 构造和 set 分量顺序为 w,x,y,z；inverse 是共轭，假定单位四元数。乘法先写池内临时对象，允许输出与任一输入别名。 */
class Quaternion {
  static Identity = new Quaternion(1, 0, 0, 0);
  static NaN = new Quaternion(NaN, NaN, NaN, NaN);
  static pool = new PioneerPublicApi.Pool(Quaternion);
  static threeJsPool = new PioneerPublicApi.Pool(PioneerPublicApi.THREE.Quaternion);
  constructor(scalar = 1, vectorX = 0, vectorY = 0, vectorZ = 0) {
    this._w = scalar;
    this._x = vectorX;
    this._y = vectorY;
    this._z = vectorZ;
  }
  get w() {
    return this._w;
  }
  set w(scalar) {
    this._w = scalar;
  }
  get x() {
    return this._x;
  }
  set x(vectorX) {
    this._x = vectorX;
  }
  get y() {
    return this._y;
  }
  set y(vectorY) {
    this._y = vectorY;
  }
  get z() {
    return this._z;
  }
  set z(vectorZ) {
    this._z = vectorZ;
  }
  getAngle() {
    return 2 * Math.acos(this._w);
  }
  copy(source) {
    this._w = source.w;
    this._x = source.x;
    this._y = source.y;
    this._z = source.z;
  }
  copyFromThreeJs(source) {
    this._w = source.w;
    this._x = source.x;
    this._y = source.y;
    this._z = source.z;
  }
  set(scalar, vectorX, vectorY, vectorZ) {
    this._w = scalar;
    this._x = vectorX;
    this._y = vectorY;
    this._z = vectorZ;
  }
  setFromAxisAngle(axis, angle) {
    const sinHalfAngle = Math.sin(angle / 2);
    this._w = Math.cos(angle / 2);
    this._x = sinHalfAngle * axis.x;
    this._y = sinHalfAngle * axis.y;
    this._z = sinHalfAngle * axis.z;
  }
  /** 原分支要求恰有一根轴缺省，再由叉积补齐；输入正交/归一化由调用者保证。三根轴全给时仍按原实现抛错。 */
  setFromAxes(xAxis, yAxis, zAxis) {
    let missingAxis;
    if (!xAxis && yAxis && zAxis) {
      missingAxis = PioneerPublicApi.Vector3.pool.get();
      missingAxis.cross(yAxis, zAxis);
      xAxis = missingAxis;
    } else if (!yAxis && zAxis && xAxis) {
      missingAxis = PioneerPublicApi.Vector3.pool.get();
      missingAxis.cross(zAxis, xAxis);
      yAxis = missingAxis;
    } else {
      if (zAxis || !xAxis || !yAxis) throw new Error("At least two of xAxis, yAxis, and zAxis must be defined");
      missingAxis = PioneerPublicApi.Vector3.pool.get();
      missingAxis.cross(xAxis, yAxis);
      zAxis = missingAxis;
    }
    const matrixTrace = xAxis.x + yAxis.y + zAxis.z;
    if (matrixTrace > 0) {
      const componentScale = 2 * Math.sqrt(matrixTrace + 1);
      this._w = .25 * componentScale;
      this._x = (yAxis.z - zAxis.y) / componentScale;
      this._y = (zAxis.x - xAxis.z) / componentScale;
      this._z = (xAxis.y - yAxis.x) / componentScale;
    } else if (xAxis.x > yAxis.y && xAxis.x > zAxis.z) {
      const componentScale = 2 * Math.sqrt(1 + xAxis.x - yAxis.y - zAxis.z);
      this._w = (yAxis.z - zAxis.y) / componentScale;
      this._x = .25 * componentScale;
      this._y = (yAxis.x + xAxis.y) / componentScale;
      this._z = (zAxis.x + xAxis.z) / componentScale;
    } else if (yAxis.y > zAxis.z) {
      const componentScale = 2 * Math.sqrt(1 + yAxis.y - zAxis.z - xAxis.x);
      this._w = (zAxis.x - xAxis.z) / componentScale;
      this._x = (yAxis.x + xAxis.y) / componentScale;
      this._y = .25 * componentScale;
      this._z = (zAxis.y + yAxis.z) / componentScale;
    } else {
      const componentScale = 2 * Math.sqrt(1 + zAxis.z - xAxis.x - yAxis.y);
      this._w = (xAxis.y - yAxis.x) / componentScale;
      this._x = (zAxis.x + xAxis.z) / componentScale;
      this._y = (zAxis.y + yAxis.z) / componentScale;
      this._z = .25 * componentScale;
    }
    PioneerPublicApi.Vector3.pool.release(missingAxis);
  }
  setFromEuler(xAngle, yAngle, zAngle) {
    const halfX = .5 * xAngle;
    const halfY = .5 * yAngle;
    const halfZ = .5 * zAngle;
    const cosHalfX = Math.cos(halfX);
    const sinHalfX = Math.sin(halfX);
    const cosHalfY = Math.cos(halfY);
    const sinHalfY = Math.sin(halfY);
    const cosHalfZ = Math.cos(halfZ);
    const sinHalfZ = Math.sin(halfZ);
    this._w = cosHalfX * cosHalfY * cosHalfZ + sinHalfX * sinHalfY * sinHalfZ;
    this._x = sinHalfX * cosHalfY * cosHalfZ - cosHalfX * sinHalfY * sinHalfZ;
    this._y = cosHalfX * sinHalfY * cosHalfZ + sinHalfX * cosHalfY * sinHalfZ;
    this._z = cosHalfX * cosHalfY * sinHalfZ - sinHalfX * sinHalfY * cosHalfZ;
  }
  setFromVectorFromTo(fromDirection, toDirection) {
    const rotationAxis = PioneerPublicApi.Vector3.pool.get();
    const directionDot = fromDirection.dot(toDirection);
    if (directionDot >= 1) this.set(1, 0, 0, 0);else if (directionDot <= -1) this.set(0, 1, 0, 0);else {
      rotationAxis.cross(fromDirection, toDirection);
      rotationAxis.normalize(rotationAxis);
      const angle = Math.acos(directionDot);
      this.setFromAxisAngle(rotationAxis, angle);
    }
    PioneerPublicApi.Vector3.pool.release(rotationAxis);
  }
  setFromAxis(axis, axisIndex) {
    const normalizedAxis = PioneerPublicApi.Vector3.pool.get();
    const perpendicularAxis = PioneerPublicApi.Vector3.pool.get();
    normalizedAxis.normalize(axis);
    perpendicularAxis.cross(normalizedAxis, PioneerPublicApi.Vector3.XAxis);
    if (perpendicularAxis.isZero()) {
      perpendicularAxis.cross(normalizedAxis, PioneerPublicApi.Vector3.YAxis);
    }
    perpendicularAxis.normalize(perpendicularAxis);
    if (0 === axisIndex) {
      this.setFromAxes(normalizedAxis, perpendicularAxis, void 0);
    } else {
      if (1 === axisIndex) {
        this.setFromAxes(void 0, normalizedAxis, perpendicularAxis);
      } else {
        if (2 === axisIndex) {
          this.setFromAxes(perpendicularAxis, void 0, normalizedAxis);
        }
      }
    }
    PioneerPublicApi.Vector3.pool.release(normalizedAxis);
    PioneerPublicApi.Vector3.pool.release(perpendicularAxis);
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
  normalize(source) {
    const magnitude = source.magnitude();
    if (magnitude > 0) {
      this._w = source.w / magnitude;
      this._x = source.x / magnitude;
      this._y = source.y / magnitude;
      this._z = source.z / magnitude;
    }
  }
  inverse(source) {
    this._w = source.w;
    this._x = -source.x;
    this._y = -source.y;
    this._z = -source.z;
  }
  mult(left, right) {
    const product = Quaternion.pool.get();
    product._w = left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z;
    product._x = left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y;
    product._y = left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x;
    product._z = left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w;
    this.copy(product);
    Quaternion.pool.release(product);
  }
  multInverseL(left, right) {
    const product = Quaternion.pool.get();
    product._w = left.w * right.w + left.x * right.x + left.y * right.y + left.z * right.z;
    product._x = left.w * right.x - left.x * right.w - left.y * right.z + left.z * right.y;
    product._y = left.w * right.y + left.x * right.z - left.y * right.w - left.z * right.x;
    product._z = left.w * right.z - left.x * right.y + left.y * right.x - left.z * right.w;
    this.copy(product);
    Quaternion.pool.release(product);
  }
  multInverseR(left, right) {
    const product = Quaternion.pool.get();
    product._w = +left.w * right.w + left.x * right.x + left.y * right.y + left.z * right.z;
    product._x = -left.w * right.x + left.x * right.w - left.y * right.z + left.z * right.y;
    product._y = -left.w * right.y + left.x * right.z + left.y * right.w - left.z * right.x;
    product._z = -left.w * right.z - left.x * right.y + left.y * right.x + left.z * right.w;
    this.copy(product);
    Quaternion.pool.release(product);
  }
  scaleAngle(source, angleScale) {
    const halfAngle = Math.acos(source.w);
    const sinHalfAngle = Math.sin(halfAngle);
    if (0 === sinHalfAngle) return void this.copy(source);
    const scaledSinHalfAngle = Math.sin(halfAngle * angleScale);
    this._w = Math.cos(halfAngle * angleScale);
    this._x = source.x / sinHalfAngle * scaledSinHalfAngle;
    this._y = source.y / sinHalfAngle * scaledSinHalfAngle;
    this._z = source.z / sinHalfAngle * scaledSinHalfAngle;
  }
  angle(other) {
    return 2 * Math.acos(this._w * other.w + this._x * other.x + this._y * other.y + this._z * other.z);
  }
  /** 点积负时选择等价半球；接近同向改用线性混合后归一化，阈值与符号落在起点权重的原约定保持。 */
  slerp(startQuaternion, endQuaternion, fraction) {
    let cosAngle = startQuaternion.w * endQuaternion.w + startQuaternion.x * endQuaternion.x + startQuaternion.y * endQuaternion.y + startQuaternion.z * endQuaternion.z;
    let hemisphereSign = 1;
    if (cosAngle < 0) {
      hemisphereSign = -1;
      cosAngle = -cosAngle;
    }
    if (cosAngle <= .9995) {
      const angle = Math.acos(cosAngle);
      const startWeight = hemisphereSign * Math.sin((1 - fraction) * angle) / Math.sin(angle);
      const endWeight = Math.sin(fraction * angle) / Math.sin(angle);
      this._w = startWeight * startQuaternion.w + endWeight * endQuaternion.w;
      this._x = startWeight * startQuaternion.x + endWeight * endQuaternion.x;
      this._y = startWeight * startQuaternion.y + endWeight * endQuaternion.y;
      this._z = startWeight * startQuaternion.z + endWeight * endQuaternion.z;
    } else {
      const startWeight = hemisphereSign * (1 - fraction);
      const endWeight = fraction;
      this._w = startWeight * startQuaternion.w + endWeight * endQuaternion.w;
      this._x = startWeight * startQuaternion.x + endWeight * endQuaternion.x;
      this._y = startWeight * startQuaternion.y + endWeight * endQuaternion.y;
      this._z = startWeight * startQuaternion.z + endWeight * endQuaternion.z;
      this.normalize(this);
    }
  }
  getAxis(axisOut, axisIndex) {
    if (void 0 === axisIndex) {
      axisOut.set(this._x, this._y, this._z);
      axisOut.normalize(axisOut);
    } else {
      if (0 === axisIndex) {
        axisOut.x = this._w * this._w + this._x * this._x - this._y * this._y - this._z * this._z;
        axisOut.y = 2 * this._w * this._z + 2 * this._x * this._y;
        axisOut.z = 2 * this._x * this._z - 2 * this._w * this._y;
      } else {
        if (1 === axisIndex) {
          axisOut.x = 2 * this._y * this._x - 2 * this._w * this._z;
          axisOut.y = this._w * this._w - this._x * this._x + this._y * this._y - this._z * this._z;
          axisOut.z = 2 * this._x * this._w + 2 * this._y * this._z;
        } else {
          if (2 === axisIndex) {
            axisOut.x = 2 * this._y * this._w + 2 * this._z * this._x;
            axisOut.y = 2 * this._z * this._y - 2 * this._w * this._x;
            axisOut.z = this._w * this._w - this._x * this._x - this._y * this._y + this._z * this._z;
          }
        }
      }
    }
  }
  static fromAxisAngle(axis, angle) {
    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(axis, angle);
    return quaternion;
  }
  static fromAxes(xAxis, yAxis, zAxis) {
    const quaternion = new Quaternion();
    quaternion.setFromAxes(xAxis, yAxis, zAxis);
    return quaternion;
  }
  static fromEuler(xAngle, yAngle, zAngle) {
    const quaternion = new Quaternion();
    quaternion.setFromEuler(xAngle, yAngle, zAngle);
    return quaternion;
  }
  static fromVectorFromTo(fromDirection, toDirection) {
    const quaternion = new Quaternion();
    quaternion.setFromVectorFromTo(fromDirection, toDirection);
    return quaternion;
  }
  static fromFromAxis(axis, axisIndex) {
    const quaternion = new Quaternion();
    quaternion.setFromAxis(axis, axisIndex);
    return quaternion;
  }
  _w;
  _x;
  _y;
  _z;
}
export { Quaternion };
