// Recovered from app.js:508829-511101.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitalElementsController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._orbitalElementsKeyframes = [];
    this.addModifiedState("position");
    this.addModifiedState("velocity");
  }
  getNumOrbitalElements() {
    return this._orbitalElementsKeyframes.length;
  }
  getOrbitalElements(t) {
    return this._orbitalElementsKeyframes[t];
  }
  addOrbitalElements(t, e) {
    const orbitalElements = new PioneerPublicApi.OrbitalElements(e);
    PioneerPublicApi.Sort.addObject({
      time: t,
      oe: orbitalElements
    }, this._orbitalElementsKeyframes, OrbitalElementsController._isLessAdd, OrbitalElementsController._isEqualAdd);
  }
  removeOrbitalElements(t) {
    if (t < 0 || this._orbitalElementsKeyframes.length <= t) throw new Error(`Invalid index for ${this}.removeOrbitalElements`);
    this._orbitalElementsKeyframes.splice(t, 1);
  }
  __updatePositionAtTime(t, e) {
    this._getPositionAndVelocityAtTime(t, void 0, e);
  }
  __updateVelocityAtTime(t, e) {
    this._getPositionAndVelocityAtTime(void 0, t, e);
  }
  __update() {
    const t = this.getEntity().getScene().getEngine().getTime();
    if (0 === this._orbitalElementsKeyframes.length) throw new Error(`In ${this}, there are no keyframes`);
    const e = PioneerPublicApi.Vector3.pool.get();
    const i = PioneerPublicApi.Vector3.pool.get();
    this._getPositionAndVelocityAtTime(e, i, t);
    this.getEntity().setPosition(e);
    this.getEntity().setVelocity(i);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  _getPositionAndVelocityAtTime(t, e, i) {
    const n = PioneerPublicApi.Sort.getIndexObject(i, this._orbitalElementsKeyframes, OrbitalElementsController._isLess);
    const o = this._orbitalElementsKeyframes[Math.max(n - 1, 0)];
    const r = this._orbitalElementsKeyframes[Math.min(n, this._orbitalElementsKeyframes.length - 1)];
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    const h = PioneerPublicApi.Vector3.pool.get();
    o.oe.project(a, c, i);
    r.oe.project(l, h, i);
    const d = PioneerPublicApi.MathUtils.clamp01(r.time !== o.time ? (i - o.time) / (r.time - o.time) : 0);
    t && t.slerp(a, l, d);
    e && e.slerp(c, h, d);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(h);
  }
  static _isLessAdd = (t, e) => t.time < e.time;
  static _isLess = (t, e) => t.time < e;
  static _isEqualAdd = (t, e) => t.time === e.time;
  _orbitalElementsKeyframes;
}
class OrbitalElementsKeyframe {
  time;
  oe;
  constructor() {
    this.time = 0;
    this.oe = new PioneerPublicApi.OrbitalElements();
  }
}
export { OrbitalElementsController };
export { OrbitalElementsKeyframe };
