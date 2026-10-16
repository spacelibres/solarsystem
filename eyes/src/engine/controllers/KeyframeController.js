// Recovered from app.js:479708-488241.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class KeyframeController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._positionKeyframes = [];
    this._orientationKeyframes = [];
    this._timesAreRealTime = false;
    this._timeOfFirstUpdate = NaN;
    this.setCoverage(PioneerPublicApi.Interval.InfiniteNeg);
    this._position0 = new PioneerPublicApi.Vector3();
    this._position1 = new PioneerPublicApi.Vector3();
    this._orientation0 = new PioneerPublicApi.Quaternion();
    this._orientation1 = new PioneerPublicApi.Quaternion();
    this._newPosition = new PioneerPublicApi.Vector3();
    this._newVelocity = new PioneerPublicApi.Vector3();
    this._newOrientation = new PioneerPublicApi.Quaternion();
    this._tangent0 = new PioneerPublicApi.Vector3();
    this._tangent1 = new PioneerPublicApi.Vector3();
    this._tempA = new PioneerPublicApi.Vector3();
    this._tempB = new PioneerPublicApi.Vector3();
  }
  addPositionKeyframe(t, e, i, n, o, r) {
    const vector3 = new PioneerPublicApi.Vector3();
    vector3.copy(e);
    const l = [t, {
      position: vector3,
      relativeToEntityPosition: void 0 !== i ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), i) : void 0,
      relativeToEntityPositionTime: n,
      relativeToEntityOrientation: void 0 !== o ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), o) : void 0,
      relativeToEntityOrientationTime: r
    }];
    PioneerPublicApi.Sort.addObject(l, this._positionKeyframes, KeyframeController.isLessAdd, KeyframeController.isEqualAdd);
    1 === this._positionKeyframes.length && (this.addModifiedState("position"), this.addModifiedState("velocity"));
    this._updateCoverage();
  }
  removePositionKeyframe(t) {
    const e = PioneerPublicApi.Sort.removeObject(t, this._positionKeyframes, KeyframeController.isLess, KeyframeController.isEqual);
    e && (0 === this._positionKeyframes.length && (this.removeModifiedState("position"), this.removeModifiedState("velocity")), this._updateCoverage());
    return e;
  }
  addOrientationKeyframe(t, e, i, n) {
    const quaternion = new PioneerPublicApi.Quaternion();
    quaternion.copy(e);
    const r = [t, {
      orientation: quaternion,
      relativeToEntityOrientation: void 0 !== i ? new PioneerPublicApi.EntityRef(this.getEntity().getScene(), i) : void 0,
      relativeToEntityOrientationTime: n
    }];
    PioneerPublicApi.Sort.addObject(r, this._orientationKeyframes, KeyframeController.isLessAdd, KeyframeController.isEqualAdd);
    1 === this._orientationKeyframes.length && this.addModifiedState("orientation");
    this._updateCoverage();
  }
  removeOrientationKeyframe(t) {
    const e = PioneerPublicApi.Sort.removeObject(t, this._orientationKeyframes, KeyframeController.isLess, KeyframeController.isEqual);
    e && (0 === this._orientationKeyframes.length && this.removeModifiedState("orientation"), this._updateCoverage());
    return e;
  }
  areTimesRealTime() {
    return this._timesAreRealTime;
  }
  setTimesAreRealTime(timesAreRealTime) {
    this._timesAreRealTime = timesAreRealTime;
    this._updateCoverage();
  }
  __updatePositionAtTime(t, e) {
    this._getPositionAtTime(t, e);
  }
  __updateVelocityAtTime(t, e) {
    this._getVelocityAtTime(t, e);
  }
  __updateOrientationAtTime(t, e) {
    this._getOrientationAtTime(t, e);
  }
  __update() {
    const t = this.getEntity().getScene().getEngine();
    let e = 0;
    this._timesAreRealTime ? isNaN(this._timeOfFirstUpdate) ? this._timeOfFirstUpdate = Date.now() / 1e3 : e = Date.now() / 1e3 - this._timeOfFirstUpdate : e = t.getTime();
    this._getPositionAtTime(this._newPosition, e) && this.getEntity().setPosition(this._newPosition);
    this._getVelocityAtTime(this._newVelocity, e) && this.getEntity().setVelocity(this._newVelocity);
    this._getOrientationAtTime(this._newOrientation, e) && this.getEntity().setOrientation(this._newOrientation);
  }
  _getPositionAtTime(t, e) {
    const i = PioneerPublicApi.Sort.getIndexObject(e, this._positionKeyframes, KeyframeController.isLess);
    if (i < this._positionKeyframes.length) {
      if (0 !== i) {
        const s = i - 1;
        const n = i;
        const o = this._positionKeyframes[s];
        const r = this._positionKeyframes[n];
        const a = o[0];
        const l = r[0];
        if (this._getPositionOfKeyframe(this._position0, o), this._getPositionOfKeyframe(this._position1, r), s > 0) {
          const t = this._positionKeyframes[s - 1];
          const e = t[0];
          this._getPositionOfKeyframe(this._tempA, t);
          this._tempA.sub(this._position0, this._tempA);
          this._tempB.sub(this._position1, this._position0);
          this._tempB.mult(this._tempB, .5);
          this._tangent0.addMult(this._tempB, this._tempA, .5 * (l - a) / (a - e));
        } else this._tangent0.sub(this._position1, this._position0);
        if (n < this._positionKeyframes.length - 1) {
          const t = this._positionKeyframes[n + 1];
          const e = t[0];
          this._getPositionOfKeyframe(this._tempB, t);
          this._tempA.sub(this._position1, this._position0);
          this._tempB.sub(this._tempB, this._position1);
          this._tempA.mult(this._tempA, .5);
          this._tangent1.addMult(this._tempA, this._tempB, .5 * (l - a) / (e - l));
        } else this._tangent1.sub(this._position1, this._position0);
        const c = (e - a) / (l - a);
        this._cubicHermiteSpline(t, this._position0, this._position1, this._tangent0, this._tangent1, c);
        return true;
      }
      {
        const i = this._positionKeyframes[0];
        if (i[0] === e) {
          this._getPositionOfKeyframe(t, i);
          return true;
        }
      }
    }
    return false;
  }
  _getVelocityAtTime(t, e) {
    const i = PioneerPublicApi.Sort.getIndexObject(e, this._positionKeyframes, KeyframeController.isLess);
    if (i < this._positionKeyframes.length) {
      if (0 !== i) {
        const s = i - 1;
        const n = i;
        const o = this._positionKeyframes[s];
        const r = this._positionKeyframes[n];
        const a = o[0];
        const l = r[0];
        if (this._getPositionOfKeyframe(this._position0, o), this._getPositionOfKeyframe(this._position1, r), s > 0) {
          const t = this._positionKeyframes[s - 1];
          const e = t[0];
          this._getPositionOfKeyframe(this._tempA, t);
          this._tempA.sub(this._position0, this._tempA);
          this._tempB.sub(this._position1, this._position0);
          this._tempB.mult(this._tempB, .5);
          this._tangent0.addMult(this._tempB, this._tempA, .5 * (l - a) / (a - e));
        } else this._tangent0.sub(this._position1, this._position0);
        if (n < this._positionKeyframes.length - 1) {
          const t = this._positionKeyframes[n + 1];
          const e = t[0];
          this._getPositionOfKeyframe(this._tempB, t);
          this._tempA.sub(this._position1, this._position0);
          this._tempB.sub(this._tempB, this._position1);
          this._tempA.mult(this._tempA, .5);
          this._tangent1.addMult(this._tempA, this._tempB, .5 * (l - a) / (e - l));
        } else this._tangent1.sub(this._position1, this._position0);
        const c = (e - a) / (l - a);
        this._cubicHermiteSplineDerivative(t, this._position0, this._position1, this._tangent0, this._tangent1, c);
        t.div(t, l - a);
        return true;
      }
      {
        const i = this._positionKeyframes[0];
        if (i[0] === e) {
          if (this._positionKeyframes.length > 1) {
            const e = this._positionKeyframes[1];
            const s = i[0];
            const n = e[0];
            this._getPositionOfKeyframe(this._position0, i);
            this._getPositionOfKeyframe(this._position1, e);
            t.sub(this._position1, this._position0);
            t.div(t, n - s);
          } else t.set(0, 0, 0);
          return true;
        }
      }
    }
    return false;
  }
  _getOrientationAtTime(t, e) {
    const i = PioneerPublicApi.Sort.getIndexObject(e, this._orientationKeyframes, KeyframeController.isLess);
    if (i < this._orientationKeyframes.length) {
      if (0 !== i) {
        const s = i - 1;
        const n = i;
        const o = this._orientationKeyframes[s];
        const r = this._orientationKeyframes[n];
        const a = o[0];
        this._getOrientationOfKeyframe(this._orientation0, o);
        const l = r[0];
        this._getOrientationOfKeyframe(this._orientation1, r);
        t.slerp(this._orientation0, this._orientation1, (e - a) / (l - a));
        return true;
      }
      {
        const i = this._orientationKeyframes[0];
        if (i[0] === e) {
          this._getOrientationOfKeyframe(t, i);
          return true;
        }
      }
    }
    return false;
  }
  _getPositionOfKeyframe(t, e) {
    const i = e[1];
    if (t.copy(i.position), void 0 !== i.relativeToEntityOrientation) {
      const n = e[1].relativeToEntityOrientationTime ?? e[0];
      const o = i.relativeToEntityOrientation.get();
      if (null !== o) {
        const e = PioneerPublicApi.Quaternion.pool.get();
        o.getOrientationAtTime(e, n);
        t.rotate(e, t);
        PioneerPublicApi.Quaternion.pool.release(e);
      } else t.copy(PioneerPublicApi.Vector3.NaN);
    }
    if (void 0 !== i.relativeToEntityPosition) {
      const n = e[1].relativeToEntityPositionTime ?? e[0];
      const o = i.relativeToEntityPosition.get();
      const r = this.getEntity().getParent();
      if (null !== o && r) {
        const e = PioneerPublicApi.Vector3.pool.get();
        o.getPositionRelativeToEntity(e, PioneerPublicApi.Vector3.Zero, r, n);
        t.add(e, t);
        PioneerPublicApi.Vector3.pool.release(e);
      } else t.copy(PioneerPublicApi.Vector3.NaN);
    }
  }
  _getOrientationOfKeyframe(t, e) {
    const i = e[1];
    if (void 0 !== i.relativeToEntityOrientation) {
      const n = e[1].relativeToEntityOrientationTime ?? e[0];
      const o = i.relativeToEntityOrientation.get();
      null !== o ? (o.getOrientationAtTime(t, n), t.mult(t, i.orientation)) : t.copy(PioneerPublicApi.Quaternion.NaN);
    } else t.copy(i.orientation);
  }
  _updateCoverage() {
    if (this._timesAreRealTime) this.setCoverage(PioneerPublicApi.Interval.Infinite);else {
      const interval = new PioneerPublicApi.Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
      this._positionKeyframes.length > 0 && (interval.min = Math.min(interval.min, this._positionKeyframes[0][0]), interval.max = Math.max(interval.max, this._positionKeyframes[this._positionKeyframes.length - 1][0]));
      this._orientationKeyframes.length > 0 && (interval.min = Math.min(interval.min, this._orientationKeyframes[0][0]), interval.max = Math.max(interval.max, this._orientationKeyframes[this._orientationKeyframes.length - 1][0]));
      this.setCoverage(interval);
    }
  }
  _cubicHermiteSpline(t, e, i, s, n, o) {
    const r = o * o;
    const a = o * r;
    const l = 2 * a - 3 * r + 1;
    const c = a - 2 * r + o;
    const h = -2 * a + 3 * r;
    const d = a - r;
    t.x = l * e.x + c * s.x + h * i.x + d * n.x;
    t.y = l * e.y + c * s.y + h * i.y + d * n.y;
    t.z = l * e.z + c * s.z + h * i.z + d * n.z;
  }
  _cubicHermiteSplineDerivative(t, e, i, s, n, o) {
    const r = o * o;
    const a = 6 * r - 6 * o;
    const l = 3 * r - 4 * o + 1;
    const c = -6 * r + 6 * o;
    const h = 3 * r - 2 * o;
    t.x = a * e.x + l * s.x + c * i.x + h * n.x;
    t.y = a * e.y + l * s.y + c * i.y + h * n.y;
    t.z = a * e.z + l * s.z + c * i.z + h * n.z;
  }
  static isLessAdd = (t, e) => t[0] < e[0];
  static isLess = (t, e) => t[0] < e;
  static isEqualAdd = (t, e) => t[0] === e[0];
  static isEqual = (t, e) => t[0] === e;
  _positionKeyframes;
  _orientationKeyframes;
  _timesAreRealTime;
  _timeOfFirstUpdate;
  _position0;
  _position1;
  _orientation0;
  _orientation1;
  _newPosition;
  _newVelocity;
  _newOrientation;
  _tangent0;
  _tangent1;
  _tempA;
  _tempB;
}
export { KeyframeController };
