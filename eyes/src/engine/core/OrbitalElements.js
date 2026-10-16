// Recovered from app.js:53647-59688.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 角量均为弧度；时间、长度和引力参数必须使用相容单位。此实现不额外处理抛物线或圆轨道的退化情况。 */
class OrbitalElements {
  epoch;
  eccentricity;
  semiMajorAxis;
  meanAngularMotion;
  meanAnomalyAtEpoch;
  orientation;
  static pool = new PioneerPublicApi.Pool(OrbitalElements);
  constructor(initialState) {
    if (initialState) {
      if ("eccentricity" in initialState) {
        this.epoch = initialState.epoch;
        this.eccentricity = initialState.eccentricity;
        this.semiMajorAxis = initialState.semiMajorAxis;
        this.meanAngularMotion = initialState.meanAngularMotion;
        this.meanAnomalyAtEpoch = initialState.meanAnomalyAtEpoch;
        this.orientation = new PioneerPublicApi.Quaternion();
        if ("orientation" in initialState) {
          this.orientation.copy(initialState.orientation);
        } else {
          this.setOrientationFromElements(initialState.inclination, initialState.longitudeOfAscendingNode, initialState.argumentOfPeriapsis);
        }
      } else {
        this.setFromPositionAndVelocity(initialState.position, initialState.velocity, initialState.epoch, initialState.gm);
      }
    } else {
      this.epoch = 0;
      this.eccentricity = 0;
      this.semiMajorAxis = 0;
      this.meanAngularMotion = 0;
      this.meanAnomalyAtEpoch = 0;
      this.orientation = new PioneerPublicApi.Quaternion();
    }
  }
  copy(sourceElements) {
    this.epoch = sourceElements.epoch;
    this.eccentricity = sourceElements.eccentricity;
    this.semiMajorAxis = sourceElements.semiMajorAxis;
    this.meanAnomalyAtEpoch = sourceElements.meanAnomalyAtEpoch;
    this.meanAngularMotion = sourceElements.meanAngularMotion;
    this.orientation.copy(sourceElements.orientation);
  }
  /** 先在轨道平面计算位置与速度，再用同一 orientation 转到参考系；输出参数可省略，函数不替调用者分配向量。 */
  projectFromMeanAnomaly(positionOut, velocityOut, meanAnomaly) {
    if (this.eccentricity < 1) {
      const eccentricAnomaly = this.getEccentricAnomalyFromMeanAnomaly(meanAnomaly);
      const orbitalRadius = this.semiMajorAxis * (1 - this.eccentricity * Math.cos(eccentricAnomaly));
      const velocityScale = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / orbitalRadius;
      if (positionOut) {
        positionOut.x = this.semiMajorAxis * (Math.cos(eccentricAnomaly) - this.eccentricity);
        positionOut.y = this.semiMajorAxis * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.sin(eccentricAnomaly);
      }
      if (velocityOut) {
        velocityOut.x = -velocityScale * Math.sin(eccentricAnomaly);
        velocityOut.y = velocityScale * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.cos(eccentricAnomaly);
      }
    } else {
      const eccentricAnomaly = this.getEccentricAnomalyFromMeanAnomaly(meanAnomaly);
      const orbitalRadius = -this.semiMajorAxis * (1 - this.eccentricity * Math.cosh(eccentricAnomaly));
      const velocityScale = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / orbitalRadius;
      if (positionOut) {
        positionOut.x = this.semiMajorAxis * (this.eccentricity - Math.cosh(eccentricAnomaly));
        positionOut.y = this.semiMajorAxis * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.sinh(eccentricAnomaly);
      }
      if (velocityOut) {
        velocityOut.x = -velocityScale * Math.sinh(eccentricAnomaly);
        velocityOut.y = velocityScale * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.cosh(eccentricAnomaly);
      }
    }
    if (positionOut) {
      positionOut.z = 0;
      positionOut.rotate(this.orientation, positionOut);
    }
    if (velocityOut) {
      velocityOut.z = 0;
      velocityOut.rotate(this.orientation, velocityOut);
    }
  }
  /** M=M0+n·(time−epoch)；只对椭圆周期角归一化，双曲轨道保留非周期平近点角。 */
  project(positionOut, velocityOut, time) {
    let meanAnomaly = this.meanAnomalyAtEpoch + this.meanAngularMotion * (time - this.epoch);
    if (this.eccentricity < 1) {
      meanAnomaly = PioneerPublicApi.MathUtils.wrap(meanAnomaly, -PioneerPublicApi.MathUtils.Pi, +PioneerPublicApi.MathUtils.Pi);
    }
    this.projectFromMeanAnomaly(positionOut, velocityOut, meanAnomaly);
  }
  getTrueAnomalyFromPosition(position) {
    const orbitalPosition = PioneerPublicApi.Vector3.pool.get();
    orbitalPosition.rotateInverse(this.orientation, position);
    const trueAnomaly = Math.atan2(orbitalPosition.y, orbitalPosition.x);
    PioneerPublicApi.Vector3.pool.release(orbitalPosition);
    return trueAnomaly;
  }
  getMeanAnomalyFromTrueAnomaly(trueAnomaly) {
    let meanAnomaly;
    if (this.eccentricity < 1) {
      const eccentricAnomaly = 2 * Math.atan(Math.tan(trueAnomaly / 2) * Math.sqrt((1 - this.eccentricity) / (1 + this.eccentricity)));
      meanAnomaly = eccentricAnomaly - this.eccentricity * Math.sin(eccentricAnomaly);
    } else {
      const eccentricAnomaly = 2 * Math.atanh(Math.tan(trueAnomaly / 2) * Math.sqrt((this.eccentricity - 1) / (1 + this.eccentricity)));
      meanAnomaly = this.eccentricity * Math.sinh(eccentricAnomaly) - eccentricAnomaly;
    }
    return meanAnomaly;
  }
  /** 牛顿法解椭圆 E−e sin E=M 或双曲 e sinh H−H=M；最多 20 次，更新量小于 0.00174532925 弧度退出。 */
  getEccentricAnomalyFromMeanAnomaly(meanAnomaly) {
    if (this.eccentricity < 1) {
      let eccentricAnomaly = meanAnomaly;
      if (this.eccentricity >= .8) {
        eccentricAnomaly = Math.sign(meanAnomaly) * PioneerPublicApi.MathUtils.Pi;
      }
      for (let iteration = 0; iteration < 20; iteration++) {
        const newtonCorrection = (eccentricAnomaly - this.eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (this.eccentricity * Math.cos(eccentricAnomaly) - 1);
        eccentricAnomaly += newtonCorrection;
        if (Math.abs(newtonCorrection) < .00174532925) {
          break;
        }
      }
      return eccentricAnomaly;
    }
    let eccentricAnomaly = Math.log(2 * Math.abs(meanAnomaly) / Math.E + 1.8);
    if (this.eccentricity <= 1.2) {
      eccentricAnomaly = Math.log(2 * Math.abs(meanAnomaly) / Math.E + 1.8);
    }
    if (meanAnomaly < 0) {
      eccentricAnomaly *= -1;
    }
    for (let iteration = 0; iteration < 20; iteration++) {
      const newtonCorrection = (eccentricAnomaly - this.eccentricity * Math.sinh(eccentricAnomaly) + meanAnomaly) / (this.eccentricity * Math.cosh(eccentricAnomaly) - 1);
      eccentricAnomaly += newtonCorrection;
      if (Math.abs(newtonCorrection) < .00174532925) {
        break;
      }
    }
    return eccentricAnomaly;
  }
  getMeanAnomalyFromEccentricAnomaly(eccentricAnomaly) {
    if (this.eccentricity < 1) {
      const meanAnomaly = eccentricAnomaly - this.eccentricity * Math.sin(eccentricAnomaly);
      return PioneerPublicApi.MathUtils.wrap(meanAnomaly, -Math.PI, +Math.PI);
    }
    return this.eccentricity * Math.sinh(eccentricAnomaly) - eccentricAnomaly;
  }
  getTrueAnomalyFromEccentricAnomaly(eccentricAnomaly) {
    return this.eccentricity < 1 ? 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)) * Math.tan(eccentricAnomaly / 2)) : 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (this.eccentricity - 1)) * Math.tanh(eccentricAnomaly / 2));
  }
  getEccentricAnomalyFromTrueAnomaly(trueAnomaly) {
    if (this.eccentricity < 1) {
      const eccentricAnomaly = 2 * Math.atan2(Math.tan(trueAnomaly / 2), Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)));
      return PioneerPublicApi.MathUtils.wrap(eccentricAnomaly, -Math.PI, +Math.PI);
    }
    return 2 * Math.atanh(Math.sqrt((this.eccentricity - 1) / (this.eccentricity + 1)) * Math.tan(trueAnomaly / 2));
  }
  getInclination() {
    const orbitNormal = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(orbitNormal, 2);
    const inclination = orbitNormal.angle(PioneerPublicApi.Vector3.ZAxis);
    PioneerPublicApi.Vector3.pool.release(orbitNormal);
    return inclination;
  }
  getLongitudeOfAscendingNode() {
    const orbitNormal = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(orbitNormal, 2);
    const longitudeOfAscendingNode = Math.atan2(orbitNormal.x, -orbitNormal.y);
    PioneerPublicApi.Vector3.pool.release(orbitNormal);
    return PioneerPublicApi.MathUtils.wrap(longitudeOfAscendingNode, 0, PioneerPublicApi.MathUtils.TwoPi);
  }
  /** 升交点方向与近心点方向取向量夹角再 wrap；保留原实现的无符号夹角选择，不补造象限信息。 */
  getArgumentOfPeriapsis() {
    const ascendingNodeDirection = PioneerPublicApi.Vector3.pool.get();
    const periapsisDirection = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(ascendingNodeDirection, 2);
    ascendingNodeDirection.set(-ascendingNodeDirection.y, ascendingNodeDirection.x, 0);
    this.orientation.getAxis(periapsisDirection, 0);
    const argumentOfPeriapsis = ascendingNodeDirection.angle(periapsisDirection);
    PioneerPublicApi.Vector3.pool.release(periapsisDirection);
    PioneerPublicApi.Vector3.pool.release(ascendingNodeDirection);
    return PioneerPublicApi.MathUtils.wrap(argumentOfPeriapsis, 0, PioneerPublicApi.MathUtils.TwoPi);
  }
  getPeriod() {
    return PioneerPublicApi.MathUtils.TwoPi / this.meanAngularMotion;
  }
  getPeriapsis() {
    return this.semiMajorAxis * (1 - this.eccentricity);
  }
  getApoapsis() {
    return this.semiMajorAxis * (1 + this.eccentricity);
  }
  /** 升交点方向和轨道法线确定初始坐标架，再绕法线转近心点幅角；所有输入角均为弧度。 */
  setOrientationFromElements(inclination, longitudeOfAscendingNode, argumentOfPeriapsis) {
    const ascendingNodeDirection = PioneerPublicApi.Vector3.pool.get();
    const orbitNormal = PioneerPublicApi.Vector3.pool.get();
    const periapsisRotation = PioneerPublicApi.Quaternion.pool.get();
    ascendingNodeDirection.set(Math.cos(longitudeOfAscendingNode), Math.sin(longitudeOfAscendingNode), 0);
    orbitNormal.set(Math.sin(longitudeOfAscendingNode) * Math.sin(inclination), -Math.cos(longitudeOfAscendingNode) * Math.sin(inclination), Math.cos(inclination));
    this.orientation.setFromAxes(ascendingNodeDirection, void 0, orbitNormal);
    periapsisRotation.setFromAxisAngle(orbitNormal, argumentOfPeriapsis);
    this.orientation.mult(periapsisRotation, this.orientation);
    PioneerPublicApi.Quaternion.pool.release(periapsisRotation);
    PioneerPublicApi.Vector3.pool.release(orbitNormal);
    PioneerPublicApi.Vector3.pool.release(ascendingNodeDirection);
  }
  /** 由 r×v 得轨道法线，由 (v×h)/μ−r̂ 得偏心率向量；长度和速度单位必须与 μ 相容。池内向量在建立姿态后释放。 */
  setFromPositionAndVelocity(position, velocity, epoch, gravitationalParameter) {
    const inverseGravitationalParameter = 1 / gravitationalParameter;
    this.epoch = epoch;
    const angularMomentum = PioneerPublicApi.Vector3.pool.get();
    angularMomentum.cross(position, velocity);
    const eccentricityVector = PioneerPublicApi.Vector3.pool.get();
    const radialDirection = PioneerPublicApi.Vector3.pool.get();
    radialDirection.normalize(position);
    eccentricityVector.cross(velocity, angularMomentum);
    eccentricityVector.mult(eccentricityVector, inverseGravitationalParameter);
    eccentricityVector.sub(eccentricityVector, radialDirection);
    this.eccentricity = eccentricityVector.magnitude();
    const semiLatusRectum = angularMomentum.dot(angularMomentum) * inverseGravitationalParameter;
    this.semiMajorAxis = semiLatusRectum / (1 - this.eccentricity * this.eccentricity);
    if (this.eccentricity > 1) {
      this.semiMajorAxis *= -1;
    }
    let trueAnomaly = Math.acos(PioneerPublicApi.MathUtils.clamp(eccentricityVector.dot(radialDirection) / this.eccentricity, -1, 1));
    if (position.dot(velocity) < 0) {
      trueAnomaly *= -1;
    }
    if (trueAnomaly < -Math.PI) {
      trueAnomaly += PioneerPublicApi.MathUtils.TwoPi;
    }
    if (trueAnomaly >= Math.PI) {
      trueAnomaly -= PioneerPublicApi.MathUtils.TwoPi;
    }
    eccentricityVector.normalize(eccentricityVector);
    angularMomentum.normalize(angularMomentum);
    this.orientation.setFromAxes(eccentricityVector, void 0, angularMomentum);
    PioneerPublicApi.Vector3.pool.release(radialDirection);
    PioneerPublicApi.Vector3.pool.release(angularMomentum);
    PioneerPublicApi.Vector3.pool.release(eccentricityVector);
    const eccentricAnomaly = this.getEccentricAnomalyFromTrueAnomaly(trueAnomaly);
    this.meanAnomalyAtEpoch = this.getMeanAnomalyFromEccentricAnomaly(eccentricAnomaly);
    this.meanAngularMotion = Math.sqrt(gravitationalParameter / (this.semiMajorAxis * this.semiMajorAxis * this.semiMajorAxis));
  }
}
export { OrbitalElements };
