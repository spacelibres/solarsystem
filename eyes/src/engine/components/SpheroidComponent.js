// Recovered from app.js:392139-397114.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpheroidComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._equatorialRadius = 1;
    this._polarRadius = 1;
    this._planetographic = false;
    this._changed = true;
    this._changedCallbacks = new PioneerPublicApi.FastSet();
    this.setIsGroundComponent(true);
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
  }
  getEquatorialRadius() {
    return this._equatorialRadius;
  }
  setEquatorialRadius(equatorialRadius) {
    this._equatorialRadius = equatorialRadius;
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
    this._changed = true;
  }
  getPolarRadius() {
    return this._polarRadius;
  }
  setPolarRadius(polarRadius) {
    this._polarRadius = polarRadius;
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
    this._changed = true;
  }
  isPlanetographic() {
    return this._planetographic;
  }
  setPlanetographic(planetographic) {
    this._planetographic = planetographic;
    this._changed = true;
  }
  addChangedCallback(t) {
    this._changedCallbacks.add(t);
  }
  removeChangedCallback(t) {
    this._changedCallbacks.delete(t);
  }
  __update() {
    if (this._changed) {
      for (let t = 0; t < this._changedCallbacks.getSize(); t++) this._changedCallbacks.getAt(t)();
      this._changed = false;
    }
  }
  xyzFromLLA(t, e) {
    const i = Math.cos(e.lat);
    const s = Math.sin(e.lat);
    if (this._planetographic) {
      const n = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      const o = this._equatorialRadius / Math.sqrt(1 - n * s * s);
      t.x = (o + e.alt) * i * Math.cos(e.lon);
      t.y = (o + e.alt) * i * Math.sin(e.lon);
      t.z = ((1 - n) * o + e.alt) * s;
    } else {
      const equatorialRadius = this._equatorialRadius;
      const polarRadius = this._polarRadius;
      const r = equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * i * i + equatorialRadius * equatorialRadius * s * s);
      t.x = (r + e.alt) * i * Math.cos(e.lon);
      t.y = (r + e.alt) * i * Math.sin(e.lon);
      t.z = (r + e.alt) * s;
    }
  }
  radiusFromXYZ(t, e = 5) {
    if (this._planetographic) {
      const i = t.magnitudeXY();
      const s = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      let n = Math.atan(t.z / ((1 - s) * i));
      let o = 0;
      for (let r = 0; r < e; r++) {
        const e = Math.sin(n);
        o = this._equatorialRadius / Math.sqrt(1 - s * e * e);
        n = Math.atan((t.z + o * s * e) / i);
      }
      return o;
    }
    const i = t.z * t.z / (t.x * t.x + t.y * t.y);
    const s = 1 / (1 + i);
    const n = i * s;
    const equatorialRadius = this._equatorialRadius;
    const polarRadius = this._polarRadius;
    return equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * s + equatorialRadius * equatorialRadius * n);
  }
  llaFromXYZ(t, e, i = 5) {
    if (this._planetographic) {
      t.lon = Math.atan2(e.y, e.x);
      const s = e.magnitudeXY();
      const n = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      t.lat = Math.atan(e.z / ((1 - n) * s));
      let o = 0;
      for (let r = 0; r < i; r++) {
        const i = Math.sin(t.lat);
        o = 1 / Math.sqrt(1 - n * i * i);
        t.lat = Math.atan((e.z + this._equatorialRadius * o * n * i) / s);
      }
      t.alt = s / Math.cos(t.lat) - this._equatorialRadius * o;
    } else {
      const i = e.magnitudeXY();
      t.lon = Math.atan2(e.y, e.x);
      t.lat = Math.atan(e.z / i);
      const s = Math.cos(t.lat);
      const n = Math.sin(t.lat);
      const equatorialRadius = this._equatorialRadius;
      const polarRadius = this._polarRadius;
      const a = equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * s * s + equatorialRadius * equatorialRadius * n * n);
      t.alt = e.magnitude() - a;
    }
  }
  llaToggleGraphicCentric(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    this.xyzFromLLA(i, e);
    this._planetographic = !this._planetographic;
    this.llaFromXYZ(t, i);
    this._planetographic = !this._planetographic;
    PioneerPublicApi.Vector3.pool.release(i);
  }
  upFromLLA(t, e) {
    const i = PioneerPublicApi.LatLonAlt.pool.get();
    this._planetographic ? i.copy(e) : this.llaToggleGraphicCentric(i, e);
    t.x = Math.cos(i.lat) * Math.cos(i.lon);
    t.y = Math.cos(i.lat) * Math.sin(i.lon);
    t.z = Math.sin(i.lat);
    PioneerPublicApi.LatLonAlt.pool.release(i);
  }
  eastFromLLA(t, e) {
    t.x = -Math.sin(e.lon);
    t.y = Math.cos(e.lon);
    t.z = 0;
  }
  northFromLLA(t, e) {
    const i = PioneerPublicApi.LatLonAlt.pool.get();
    this._planetographic ? i.copy(e) : this.llaToggleGraphicCentric(i, e);
    t.x = -Math.sin(i.lat) * Math.cos(i.lon);
    t.y = -Math.sin(i.lat) * Math.sin(i.lon);
    t.z = Math.cos(i.lat);
    PioneerPublicApi.LatLonAlt.pool.release(i);
  }
  orientationFromLLA(t, e) {
    const i = PioneerPublicApi.LatLonAlt.pool.get();
    this._planetographic ? i.copy(e) : this.llaToggleGraphicCentric(i, e);
    const n = Math.sin(i.lat);
    const o = Math.sin(i.lon);
    const r = Math.cos(i.lon);
    t.w = .5 * Math.sqrt((1 + n) * (1 - o));
    t.x = .5 * Math.sqrt((1 - n) * (1 - o));
    t.y = .5 * Math.sqrt((1 - n) * (1 + o)) * Math.sign(r);
    t.z = .5 * Math.sqrt((1 + n) * (1 + o)) * Math.sign(r);
    PioneerPublicApi.LatLonAlt.pool.release(i);
  }
  aerFromXYZRelToLLA(t, e, i) {
    const n = PioneerPublicApi.Vector3.pool.get();
    this.xyzFromLLA(n, i);
    const o = PioneerPublicApi.LatLonAlt.pool.get();
    this._planetographic ? o.copy(i) : this.llaFromXYZ(o, n);
    n.sub(e, n);
    t.range = n.magnitude();
    n.mult(n, 1 / t.range);
    const r = PioneerPublicApi.Vector3.pool.get();
    this.upFromLLA(r, o);
    const a = n.dot(r);
    t.elevation = PioneerPublicApi.MathUtils.HalfPi - Math.acos(a);
    n.addMult(n, r, -a);
    PioneerPublicApi.Vector3.pool.release(r);
    const l = PioneerPublicApi.Vector3.pool.get();
    this.northFromLLA(l, o);
    const c = PioneerPublicApi.Vector3.pool.get();
    this.eastFromLLA(c, o);
    t.azimuth = Math.atan2(n.dot(c), n.dot(l));
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.LatLonAlt.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(n);
  }
  getRayIntersection(t, e, i) {
    const n = this._equatorialRadius / this._polarRadius;
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    o.set(e.x, e.y, e.z * n);
    r.set(i.x, i.y, i.z * n);
    const a = PioneerPublicApi.Geometry.getLineSphereIntersectionWithSphereAtOrigin(o, r, this._equatorialRadius);
    t.addMult(o, r, a);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(r);
    t.z /= n;
  }
  getGroundPosition(t, e, i) {
    const n = PioneerPublicApi.LatLonAlt.pool.get();
    this.llaFromXYZ(n, i);
    n.alt = 0;
    this.xyzFromLLA(t, n);
    const o = PioneerPublicApi.Vector3.pool.get();
    e && this.upFromLLA(e, n);
    PioneerPublicApi.LatLonAlt.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  _equatorialRadius;
  _polarRadius;
  _planetographic;
  _changed;
  _changedCallbacks;
}
export { SpheroidComponent };
