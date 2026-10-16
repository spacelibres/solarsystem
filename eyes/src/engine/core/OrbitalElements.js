// Recovered from app.js:53647-59688.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitalElements {
  epoch;
  eccentricity;
  semiMajorAxis;
  meanAngularMotion;
  meanAnomalyAtEpoch;
  orientation;
  static pool = new PioneerPublicApi.Pool(OrbitalElements);
  constructor(t) {
    t ? "eccentricity" in t ? (this.epoch = t.epoch, this.eccentricity = t.eccentricity, this.semiMajorAxis = t.semiMajorAxis, this.meanAngularMotion = t.meanAngularMotion, this.meanAnomalyAtEpoch = t.meanAnomalyAtEpoch, this.orientation = new PioneerPublicApi.Quaternion(), "orientation" in t ? this.orientation.copy(t.orientation) : this.setOrientationFromElements(t.inclination, t.longitudeOfAscendingNode, t.argumentOfPeriapsis)) : this.setFromPositionAndVelocity(t.position, t.velocity, t.epoch, t.gm) : (this.epoch = 0, this.eccentricity = 0, this.semiMajorAxis = 0, this.meanAngularMotion = 0, this.meanAnomalyAtEpoch = 0, this.orientation = new PioneerPublicApi.Quaternion());
  }
  copy(t) {
    this.epoch = t.epoch;
    this.eccentricity = t.eccentricity;
    this.semiMajorAxis = t.semiMajorAxis;
    this.meanAnomalyAtEpoch = t.meanAnomalyAtEpoch;
    this.meanAngularMotion = t.meanAngularMotion;
    this.orientation.copy(t.orientation);
  }
  projectFromMeanAnomaly(t, e, i) {
    if (this.eccentricity < 1) {
      const s = this.getEccentricAnomalyFromMeanAnomaly(i);
      const n = this.semiMajorAxis * (1 - this.eccentricity * Math.cos(s));
      const o = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / n;
      t && (t.x = this.semiMajorAxis * (Math.cos(s) - this.eccentricity), t.y = this.semiMajorAxis * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.sin(s));
      e && (e.x = -o * Math.sin(s), e.y = o * Math.sqrt(1 - this.eccentricity * this.eccentricity) * Math.cos(s));
    } else {
      const s = this.getEccentricAnomalyFromMeanAnomaly(i);
      const n = -this.semiMajorAxis * (1 - this.eccentricity * Math.cosh(s));
      const o = this.meanAngularMotion * this.semiMajorAxis * this.semiMajorAxis / n;
      t && (t.x = this.semiMajorAxis * (this.eccentricity - Math.cosh(s)), t.y = this.semiMajorAxis * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.sinh(s));
      e && (e.x = -o * Math.sinh(s), e.y = o * Math.sqrt(this.eccentricity * this.eccentricity - 1) * Math.cosh(s));
    }
    t && (t.z = 0, t.rotate(this.orientation, t));
    e && (e.z = 0, e.rotate(this.orientation, e));
  }
  project(t, e, i) {
    let n = this.meanAnomalyAtEpoch + this.meanAngularMotion * (i - this.epoch);
    this.eccentricity < 1 && (n = PioneerPublicApi.MathUtils.wrap(n, -PioneerPublicApi.MathUtils.Pi, +PioneerPublicApi.MathUtils.Pi));
    this.projectFromMeanAnomaly(t, e, n);
  }
  getTrueAnomalyFromPosition(t) {
    const e = PioneerPublicApi.Vector3.pool.get();
    e.rotateInverse(this.orientation, t);
    const i = Math.atan2(e.y, e.x);
    PioneerPublicApi.Vector3.pool.release(e);
    return i;
  }
  getMeanAnomalyFromTrueAnomaly(t) {
    let e;
    if (this.eccentricity < 1) {
      const i = 2 * Math.atan(Math.tan(t / 2) * Math.sqrt((1 - this.eccentricity) / (1 + this.eccentricity)));
      e = i - this.eccentricity * Math.sin(i);
    } else {
      const i = 2 * Math.atanh(Math.tan(t / 2) * Math.sqrt((this.eccentricity - 1) / (1 + this.eccentricity)));
      e = this.eccentricity * Math.sinh(i) - i;
    }
    return e;
  }
  getEccentricAnomalyFromMeanAnomaly(t) {
    if (this.eccentricity < 1) {
      let e = t;
      this.eccentricity >= .8 && (e = Math.sign(t) * PioneerPublicApi.MathUtils.Pi);
      for (let i = 0; i < 20; i++) {
        const i = (e - this.eccentricity * Math.sin(e) - t) / (this.eccentricity * Math.cos(e) - 1);
        if (e += i, Math.abs(i) < .00174532925) break;
      }
      return e;
    }
    let e = Math.log(2 * Math.abs(t) / Math.E + 1.8);
    this.eccentricity <= 1.2 && (e = Math.log(2 * Math.abs(t) / Math.E + 1.8));
    t < 0 && (e *= -1);
    for (let i = 0; i < 20; i++) {
      const i = (e - this.eccentricity * Math.sinh(e) + t) / (this.eccentricity * Math.cosh(e) - 1);
      if (e += i, Math.abs(i) < .00174532925) break;
    }
    return e;
  }
  getMeanAnomalyFromEccentricAnomaly(t) {
    if (this.eccentricity < 1) {
      const e = t - this.eccentricity * Math.sin(t);
      return PioneerPublicApi.MathUtils.wrap(e, -Math.PI, +Math.PI);
    }
    return this.eccentricity * Math.sinh(t) - t;
  }
  getTrueAnomalyFromEccentricAnomaly(t) {
    return this.eccentricity < 1 ? 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)) * Math.tan(t / 2)) : 2 * Math.atan(Math.sqrt((1 + this.eccentricity) / (this.eccentricity - 1)) * Math.tanh(t / 2));
  }
  getEccentricAnomalyFromTrueAnomaly(t) {
    if (this.eccentricity < 1) {
      const e = 2 * Math.atan2(Math.tan(t / 2), Math.sqrt((1 + this.eccentricity) / (1 - this.eccentricity)));
      return PioneerPublicApi.MathUtils.wrap(e, -Math.PI, +Math.PI);
    }
    return 2 * Math.atanh(Math.sqrt((this.eccentricity - 1) / (this.eccentricity + 1)) * Math.tan(t / 2));
  }
  getInclination() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    const e = t.angle(PioneerPublicApi.Vector3.ZAxis);
    PioneerPublicApi.Vector3.pool.release(t);
    return e;
  }
  getLongitudeOfAscendingNode() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    const e = Math.atan2(t.x, -t.y);
    PioneerPublicApi.Vector3.pool.release(t);
    return PioneerPublicApi.MathUtils.wrap(e, 0, PioneerPublicApi.MathUtils.TwoPi);
  }
  getArgumentOfPeriapsis() {
    const t = PioneerPublicApi.Vector3.pool.get();
    const e = PioneerPublicApi.Vector3.pool.get();
    this.orientation.getAxis(t, 2);
    t.set(-t.y, t.x, 0);
    this.orientation.getAxis(e, 0);
    const i = t.angle(e);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.Vector3.pool.release(t);
    return PioneerPublicApi.MathUtils.wrap(i, 0, PioneerPublicApi.MathUtils.TwoPi);
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
  setOrientationFromElements(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Quaternion.pool.get();
    n.set(Math.cos(e), Math.sin(e), 0);
    o.set(Math.sin(e) * Math.sin(t), -Math.cos(e) * Math.sin(t), Math.cos(t));
    this.orientation.setFromAxes(n, void 0, o);
    r.setFromAxisAngle(o, i);
    this.orientation.mult(r, this.orientation);
    PioneerPublicApi.Quaternion.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(n);
  }
  setFromPositionAndVelocity(t, e, epoch, n) {
    const o = 1 / n;
    this.epoch = epoch;
    const r = PioneerPublicApi.Vector3.pool.get();
    r.cross(t, e);
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    l.normalize(t);
    a.cross(e, r);
    a.mult(a, o);
    a.sub(a, l);
    this.eccentricity = a.magnitude();
    const c = r.dot(r) * o;
    this.semiMajorAxis = c / (1 - this.eccentricity * this.eccentricity);
    this.eccentricity > 1 && (this.semiMajorAxis *= -1);
    let h = Math.acos(PioneerPublicApi.MathUtils.clamp(a.dot(l) / this.eccentricity, -1, 1));
    t.dot(e) < 0 && (h *= -1);
    h < -Math.PI && (h += PioneerPublicApi.MathUtils.TwoPi);
    h >= Math.PI && (h -= PioneerPublicApi.MathUtils.TwoPi);
    a.normalize(a);
    r.normalize(r);
    this.orientation.setFromAxes(a, void 0, r);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
    const d = this.getEccentricAnomalyFromTrueAnomaly(h);
    this.meanAnomalyAtEpoch = this.getMeanAnomalyFromEccentricAnomaly(d);
    this.meanAngularMotion = Math.sqrt(n / (this.semiMajorAxis * this.semiMajorAxis * this.semiMajorAxis));
  }
}
export { OrbitalElements };
