// Recovered from app.js:452962-470709.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Point {
  time;
  constructor() {
    this.time = NaN;
  }
  load(t) {
    this.time = t.readFloat64();
  }
  calculate(t, e, i, s) {}
  apply(t) {}
  setNaN(t) {}
  static readHeader(t) {
    return {};
  }
}
class PosPoint extends Point {
  position;
  velocity;
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  load(t) {
    super.load(t);
    this.position = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.velocity = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  calculate(t, time, i, s) {
    this.time = time;
    const n = t[1].time - t[0].time;
    const o = (time - t[0].time) / n;
    const r = 1 - o;
    const a = r * r;
    const l = o * o;
    const c = (1 + 2 * o) * a;
    const h = o * a;
    const d = l * (3 - 2 * o);
    const u = l * -r;
    this.position.mult(t[0].position, c);
    this.position.addMult(this.position, t[0].velocity, n * h);
    this.position.addMult(this.position, t[1].position, d);
    this.position.addMult(this.position, t[1].velocity, n * u);
    const p = 6 * (l - o);
    const _ = p;
    const m = 3 * l - 4 * o + 1;
    const g = -p;
    const y = 3 * l - 2 * o;
    this.velocity.mult(t[0].position, _ / n);
    this.velocity.addMult(this.velocity, t[0].velocity, m);
    this.velocity.addMult(this.velocity, t[1].position, g / n);
    this.velocity.addMult(this.velocity, t[1].velocity, y);
  }
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(t) {
    return {};
  }
}
class LinPoint extends Point {
  position;
  velocity;
  constructor() {
    super();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  load(t) {
    super.load(t);
    this.position.set(t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.velocity.copy(PioneerPublicApi.Vector3.Zero);
  }
  calculate(t, time, i, n) {
    if (this.time = time, t[1].time > t[0].time) {
      const i = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
      this.position.lerp(t[0].position, t[1].position, i);
      this.velocity.sub(t[1].position, t[0].position);
      this.velocity.div(this.velocity, t[1].time - t[0].time);
    } else {
      this.position.copy(t[1].position);
      this.velocity.copy(PioneerPublicApi.Vector3.Zero);
    }
  }
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(t) {
    return {};
  }
}
class OriPoint extends Point {
  orientation;
  angularVelocity;
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  load(t) {
    super.load(t);
    this.orientation = new PioneerPublicApi.Quaternion(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
    this.angularVelocity = new PioneerPublicApi.Vector3(t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  calculate(t, time, i, n) {
    this.time = time;
    const o = PioneerPublicApi.Quaternion.pool.get();
    const r = PioneerPublicApi.Quaternion.pool.get();
    const a = (time - t[0].time) / (t[1].time - t[0].time);
    t[0]._project(o, time, n);
    t[1]._project(r, time, n);
    this.orientation.slerp(o, r, a);
    PioneerPublicApi.Quaternion.pool.release(o);
    PioneerPublicApi.Quaternion.pool.release(r);
    this.angularVelocity.slerp(t[0].angularVelocity, t[1].angularVelocity, a);
    this.angularVelocity.neg(this.angularVelocity);
    this.angularVelocity.rotate(this.orientation, this.angularVelocity);
  }
  apply(t) {
    t.setOrientation(this.orientation);
    t.setAngularVelocity(this.angularVelocity);
  }
  _project(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Quaternion.pool.get();
    n.normalize(this.angularVelocity);
    o.setFromAxisAngle(n, this.angularVelocity.magnitude() * (e - this.time));
    PioneerPublicApi.Vector3.pool.release(n);
    i ? (o.multInverseR(this.orientation, o), t.mult(t, o)) : t.multInverseR(this.orientation, o);
    PioneerPublicApi.Quaternion.pool.release(o);
  }
  setNaN(t) {
    t.setOrientation(PioneerPublicApi.Quaternion.NaN);
    t.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(t) {
    return {};
  }
}
class QuatPoint extends Point {
  orientation;
  angularVelocity;
  constructor() {
    super();
    this.orientation = new PioneerPublicApi.Quaternion();
    this.angularVelocity = new PioneerPublicApi.Vector3();
  }
  load(t) {
    super.load(t);
    this.orientation = new PioneerPublicApi.Quaternion(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  calculate(t, time, i, n) {
    this.time = time;
    const o = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
    this.orientation.slerp(t[0].orientation, t[1].orientation, o);
  }
  apply(t) {
    t.setOrientation(this.orientation);
    t.setAngularVelocity(PioneerPublicApi.Vector3.Zero);
  }
  setNaN(t) {
    t.setOrientation(PioneerPublicApi.Quaternion.NaN);
    t.setAngularVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(t) {
    return {};
  }
}
class OrbPoint extends Point {
  oe;
  position;
  velocity;
  constructor() {
    super();
    this.oe = new PioneerPublicApi.OrbitalElements();
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
  load(t) {
    super.load(t);
    this.oe.epoch = this.time;
    this.oe.semiMajorAxis = t.readFloat64();
    this.oe.eccentricity = t.readFloat64();
    this.oe.meanAngularMotion = t.readFloat64();
    this.oe.meanAnomalyAtEpoch = t.readFloat64();
    this.oe.orientation.set(t.readFloat64(), t.readFloat64(), t.readFloat64(), t.readFloat64());
  }
  calculate(t, time, i, n) {
    this.time = time;
    this.oe.epoch = time;
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.MathUtils.clamp01((time - t[0].time) / (t[1].time - t[0].time));
    t[0]._project(o, a, time, i, n);
    t[1]._project(r, l, time, i, n);
    this.position.lerp(o, r, c);
    this.velocity.lerp(a, l, c);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
  }
  apply(t) {
    t.setPosition(this.position);
    t.setVelocity(this.velocity);
  }
  _project(t, e, i, n, o) {
    const r = PioneerPublicApi.Vector3.pool.get();
    const a = PioneerPublicApi.Vector3.pool.get();
    this.oe.project(r, a, i);
    let l = 1;
    1 === n.body ? l = (n.gravitationalParameter2 ?? 1) / ((n.gravitationalParameter1 ?? 0) + (n.gravitationalParameter2 ?? 1)) : 2 === n.body && (l = -(n.gravitationalParameter1 ?? 1) / ((n.gravitationalParameter1 ?? 1) + (n.gravitationalParameter2 ?? 0)));
    r.mult(r, l);
    a.mult(a, l);
    o ? t.add(r, t) : t.copy(r);
    e.copy(a);
    PioneerPublicApi.Vector3.pool.release(r);
    PioneerPublicApi.Vector3.pool.release(a);
  }
  setNaN(t) {
    t.setPosition(PioneerPublicApi.Vector3.NaN);
    t.setVelocity(PioneerPublicApi.Vector3.NaN);
  }
  static readHeader(t) {
    return {
      gravitationalParameter1: t.readFloat64(),
      gravitationalParameter2: t.readFloat64()
    };
  }
}
class PointSet {
  constructor(PointClass, version, numberOfDigits, name) {
    this._PointClass = PointClass;
    this._version = version;
    this._numberOfDigits = numberOfDigits;
    this._name = name;
    this._pointSets = [];
    this._points = [];
    this._hintIndex = 0;
    this._interval = new PioneerPublicApi.Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._loadedState = PointSet.State.NOT_LOADED;
    this._accessedTime = Number.POSITIVE_INFINITY;
  }
  getName() {
    return this._name;
  }
  getInterval() {
    return this._interval;
  }
  getLoadedState() {
    return this._loadedState;
  }
  getLoadedTime() {
    return this._accessedTime;
  }
  hasPointSets() {
    return 0 !== this._pointSets.length;
  }
  hasPoints() {
    return 0 !== this._points.length;
  }
  load(t) {
    let e = true;
    if ((2 === this._version || 1 === this._version && "def" === this._name) && (e = 1 === t.readByte()), e) {
      const e = t.readInt32();
      for (let i = 0; i < e; i++) {
        const _PointClass = new this._PointClass();
        _PointClass.load(t);
        this._points.push(_PointClass);
      }
      this._points.length > 0 && (this._interval.min = this._points[0].time, this._interval.max = this._points[this._points.length - 1].time);
    } else {
      const e = t.readInt32();
      1 === this._version && (this._numberOfDigits = Math.ceil(Math.log10(e)));
      for (let i = 0; i < e; i++) {
        let e;
        e = "def" === this._name ? `${i}`.padStart(this._numberOfDigits, "0") : `${this._name}_${`${i}`.padStart(this._numberOfDigits, "0")}`;
        const pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, e);
        pointSet._interval.min = t.readFloat64();
        1 === this._version ? pointSet._interval.max = t.readFloat64() : i > 0 && (this._pointSets[i - 1]._interval.max = pointSet._interval.min);
        this._pointSets.push(pointSet);
      }
      2 === this._version && this._pointSets.splice(this._pointSets.length - 1, 1);
      this._pointSets.length > 0 && (this._interval.min = this._pointSets[0]._interval.min, this._interval.max = this._pointSets[this._pointSets.length - 1]._interval.max);
    }
    this._loadedState = PointSet.State.LOADED;
    this._accessedTime = Date.now();
  }
  loadFromUrl(t, e, i, n) {
    this._loadedState = PointSet.State.LOADING;
    const o = `${e}/${this._name}.dyn`;
    n.add(o);
    t.download(o, "binary", i).finally(() => {
      n.delete(o);
    }).then(async t => {
      const reader = new PioneerPublicApi.Reader(t.content);
      this.load(reader);
    }).catch(async t => {
      if (!(t instanceof PioneerPublicApi.CanceledError)) throw this._loadedState = PointSet.State.FAILED, t;
    });
  }
  unloadOldPointSet() {
    for (let t = 0, e = this._pointSets.length; t < e; t++) {
      const e = this._pointSets[t];
      if (e._loadedState === PointSet.State.LOADED) {
        if (Date.now() - e._accessedTime > 15e3) {
          e.unload();
          return true;
        }
        if (e.unloadOldPointSet()) return true;
      }
    }
    return false;
  }
  unload() {
    this._loadedState = PointSet.State.NOT_LOADED;
    this._accessedTime = Number.POSITIVE_INFINITY;
    this._pointSets = [];
    this._points = [];
  }
  getPointSet(t) {
    if (this._accessedTime = Date.now(), 0 === this._pointSets.length) return null;
    if (this._pointSets[this._hintIndex]._interval.contains(t)) ;else if (this._hintIndex - 1 >= 0 && this._pointSets[this._hintIndex - 1]._interval.contains(t)) this._hintIndex -= 1;else if (this._hintIndex + 1 < this._pointSets.length && this._pointSets[this._hintIndex + 1]._interval.contains(t)) this._hintIndex += 1;else {
      let e;
      let hintIndex = 0;
      let s = this._pointSets.length - 1;
      for (; hintIndex !== s;) {
        e = Math.ceil((hintIndex + s) / 2);
        t < this._pointSets[e]._interval.min ? s = e - 1 : hintIndex = e;
      }
      this._hintIndex = hintIndex;
    }
    return this._pointSets[this._hintIndex];
  }
  getPoints(t, e) {
    if (this._accessedTime = Date.now(), 0 === this._points.length) {
      t[0] = null;
      return void (t[1] = null);
    }
    if (this._hintIndex + 1 < this._points.length && this._points[this._hintIndex].time <= e && e < this._points[this._hintIndex + 1].time) ;else if (this._hintIndex - 1 >= 0 && this._points[this._hintIndex - 1].time <= e && e < this._points[this._hintIndex].time) this._hintIndex -= 1;else if (this._hintIndex + 2 < this._points.length && this._points[this._hintIndex + 1].time <= e && e < this._points[this._hintIndex + 2].time) this._hintIndex += 1;else {
      let t;
      let hintIndex = 0;
      let s = this._points.length - 2;
      for (; hintIndex !== s;) {
        t = Math.ceil((hintIndex + s) / 2);
        e < this._points[t].time ? s = t - 1 : hintIndex = t;
      }
      this._hintIndex = hintIndex;
    }
    t[0] = this._points[this._hintIndex];
    t[1] = this._points[this._hintIndex + 1];
  }
  _PointClass;
  _name;
  _pointSets;
  _points;
  _version;
  _numberOfDigits;
  _hintIndex;
  _interval;
  _loadedState;
  _accessedTime;
  static State = {
    NOT_LOADED: 0,
    LOADING: 1,
    LOADED: 2,
    FAILED: 3
  };
}
class DynamoController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._baseUrl = "";
    this._timeOffset = 0;
    this._version = 0;
    this._pointType = "pos";
    this._PointClass = void 0;
    this._numberOfDigits = 0;
    this._header = {
      body: 0
    };
    this._incremental = false;
    this._pointSet = null;
    this._downloader = e.getScene().getEngine().getDownloader();
    this._currentDownloads = new Set();
    this._points = [null, null];
    this._lastPoints = [null, null];
    this._pCalc = new PosPoint();
    this._userCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN));
  }
  getPointType() {
    return this._pointType;
  }
  getHeaderValue(t) {
    return this._header[t];
  }
  setHeaderValue(t, e) {
    this._header[t] = e;
  }
  isIncremental() {
    return this._incremental;
  }
  setIncremental(incremental) {
    this._incremental = incremental;
  }
  getBaseUrl() {
    return this._baseUrl;
  }
  setBaseUrl(baseUrl) {
    for (const t of this._currentDownloads) this._downloader.cancel(t);
    "" !== this._baseUrl && (this._pointSet = null, this._PointClass = void 0, super.setCoverage(new PioneerPublicApi.Interval(NaN, NaN)), this.removeModifiedState("position"), this.removeModifiedState("velocity"), this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
    this._baseUrl = baseUrl;
    this._baseUrl.endsWith("/") && (this._baseUrl = this._baseUrl.slice(0, -1));
    this._loadDef();
  }
  getTimeOffset() {
    return this._timeOffset;
  }
  setTimeOffset(t) {
    const timeOffset = this._timeOffset;
    this._timeOffset = t;
    const interval = new PioneerPublicApi.Interval();
    interval.copy(this.getCoverage());
    interval.min += this._timeOffset - timeOffset;
    interval.max += this._timeOffset - timeOffset;
    super.setCoverage(interval);
  }
  setCoverage(t) {
    this._userCoverage.copy(t);
    const e = PioneerPublicApi.Interval.pool.get();
    null !== this._pointSet ? e.intersection(this._userCoverage, this._pointSet.getInterval()) : e.copy(new PioneerPublicApi.Interval(NaN, NaN));
    e.min += this._timeOffset;
    e.max += this._timeOffset;
    super.setCoverage(e);
    PioneerPublicApi.Interval.pool.release(e);
  }
  getOrbitalElements(t, e) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, e), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const i = this._lastPoints[0].oe;
      const n = this._lastPoints[1].oe;
      const o = PioneerPublicApi.MathUtils.clamp01((e - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      t.eccentricity = PioneerPublicApi.MathUtils.lerp(i.eccentricity, n.eccentricity, o);
      t.semiMajorAxis = PioneerPublicApi.MathUtils.lerp(i.semiMajorAxis, n.semiMajorAxis, o);
      t.epoch = PioneerPublicApi.MathUtils.lerp(i.epoch, n.epoch, o);
      t.meanAngularMotion = PioneerPublicApi.MathUtils.lerp(i.meanAngularMotion, n.meanAngularMotion, o);
      t.meanAnomalyAtEpoch = PioneerPublicApi.MathUtils.lerpAngle(i.meanAnomalyAtEpoch, n.meanAnomalyAtEpoch, o);
      t.orientation.slerp(i.orientation, n.orientation, o);
    }
  }
  getEccentricity(t) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, t), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const e = PioneerPublicApi.MathUtils.clamp01((t - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity, this._lastPoints[1].oe.eccentricity, e);
    }
    return Number.NaN;
  }
  getSemiMajorAxis(t) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, t), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const e = PioneerPublicApi.MathUtils.clamp01((t - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      return PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis, this._lastPoints[1].oe.semiMajorAxis, e);
    }
    return Number.NaN;
  }
  getOrbitOrientation(t, e) {
    if (this._PointClass === OrbPoint && null !== this._pointSet && (this._getPointsAtTime(this._points, e), null !== this._points[0] && (this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]), null !== this._lastPoints[0] && null !== this._lastPoints[1])) {
      const i = PioneerPublicApi.MathUtils.clamp01((e - this._lastPoints[0].time) / (this._lastPoints[1].time - this._lastPoints[0].time));
      t.slerp(this._lastPoints[0].oe.orientation, this._lastPoints[1].oe.orientation, i);
    }
  }
  __destroy() {
    for (const t of this._currentDownloads) this._downloader.cancel(t);
    super.__destroy();
  }
  __updatePositionAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("position" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Vector3.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.position);
      }
    } else t.copy(PioneerPublicApi.Vector3.NaN);
  }
  __updateVelocityAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("velocity" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Vector3.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.velocity);
      }
    } else t.copy(PioneerPublicApi.Vector3.NaN);
  }
  __updateOrientationAtTime(t, e) {
    if (null !== this._pointSet) {
      if ("orientation" in this._pCalc && this.getCoverage().contains(e)) {
        if (this._pCalc.time !== e) {
          if (this._getPointsAtTime(this._points, e), null === this._points[0]) return void t.copy(PioneerPublicApi.Quaternion.NaN);
          this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental);
        }
        t.copy(this._pCalc.orientation);
      }
    } else t.copy(PioneerPublicApi.Quaternion.NaN);
  }
  __update() {
    const t = this.getEntity();
    const e = t.getScene().getEngine().getTime();
    null !== this._pointSet ? (this._pointSet.unloadOldPointSet(), this._getPointsAtTime(this._points, e), null !== this._points[0] ? (this._pCalc.calculate(this._points, e - this._timeOffset, this._header, this._incremental), this._pCalc.apply(t), this._lastPoints[0] = this._points[0], this._lastPoints[1] = this._points[1]) : null !== this._lastPoints[0] && null !== this._lastPoints[1] && (this._pCalc.calculate(this._lastPoints, e - this._timeOffset, this._header, this._incremental), this._pCalc.apply(t))) : (this.getEntity().setPosition(PioneerPublicApi.Vector3.NaN), this.getEntity().setVelocity(PioneerPublicApi.Vector3.NaN), this.getEntity().setOrientation(PioneerPublicApi.Quaternion.NaN), this.getEntity().setAngularVelocity(PioneerPublicApi.Vector3.NaN));
  }
  async _loadDef() {
    const t = `${this._baseUrl}/def.dyn`;
    let e;
    this._currentDownloads.add(t);
    try {
      e = await this._downloader.download(t, "binary", -this.getEntity().getLeastCameraDepth());
    } catch (t) {
      if (t instanceof PioneerPublicApi.CanceledError) return;
      throw t;
    } finally {
      this._currentDownloads.delete(t);
    }
    try {
      const reader = new PioneerPublicApi.Reader(e.content);
      if (this._version = reader.readInt16(), 1 !== this._version && 2 !== this._version) throw new Error(`${t} is not Dynamo version 1 or 2`);
      const pointType = reader.readString();
      if ("pos" === pointType) this._PointClass = PosPoint;else if ("lin" === pointType) this._PointClass = LinPoint;else if ("ori" === pointType) this._PointClass = OriPoint;else if ("quat" === pointType) this._PointClass = QuatPoint;else {
        if ("orb" !== pointType) throw new Error(`${t} does not have valid Dynamo type`);
        this._PointClass = OrbPoint;
      }
      this._pointType = pointType;
      this._pCalc = new this._PointClass();
      this._PointClass === PosPoint || this._PointClass === LinPoint || this._PointClass === OrbPoint ? (this.addModifiedState("position"), this.addModifiedState("velocity"), this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity")) : this._PointClass !== OriPoint && this._PointClass !== QuatPoint || (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity"), this.removeModifiedState("position"), this.removeModifiedState("velocity"));
      2 === this._version && (this._numberOfDigits = reader.readByte());
      this._header = Object.assign(this._header, this._PointClass.readHeader(reader));
      this._pointSet = new PointSet(this._PointClass, this._version, this._numberOfDigits, "def");
      this._pointSet.load(reader);
      const o = PioneerPublicApi.Interval.pool.get();
      o.intersection(this._userCoverage, this._pointSet.getInterval());
      o.min += this._timeOffset;
      o.max += this._timeOffset;
      super.setCoverage(o);
      PioneerPublicApi.Interval.pool.release(o);
    } catch (e) {
      throw new Error(`While reading ${t}: ${e instanceof Error ? e.message : "unknown error"}`);
    }
  }
  _getPointsAtTime(t, e) {
    let pointSet = this._pointSet;
    for (; null !== pointSet;) {
      if (pointSet.hasPoints()) return void pointSet.getPoints(t, e - this._timeOffset);
      if (pointSet.getLoadedState() !== PointSet.State.LOADED) {
        if (pointSet.getLoadedState() === PointSet.State.NOT_LOADED) {
          pointSet.loadFromUrl(this._downloader, this._baseUrl, -this.getEntity().getLeastCameraDepth(), this._currentDownloads);
          break;
        }
        if (pointSet.getLoadedState() === PointSet.State.FAILED) {
          this.setBaseUrl(this._baseUrl);
          break;
        }
        break;
      }
      pointSet = pointSet.getPointSet(e - this._timeOffset);
    }
    t[0] = null;
    t[1] = null;
  }
  _baseUrl;
  _timeOffset;
  _version;
  _pointType;
  _PointClass;
  _numberOfDigits;
  _header;
  _incremental;
  _pointSet;
  _downloader;
  _currentDownloads;
  _points;
  _lastPoints;
  _pCalc;
  _userCoverage;
}
export { DynamoController };
