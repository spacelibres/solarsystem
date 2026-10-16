// Recovered from app.js:51389-53646.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class VisibleInterval {
  static AlwaysVisible = new VisibleInterval(0, Number.POSITIVE_INFINITY);
  static DefaultVisibleFar = new VisibleInterval(0, .02, "normal-radius");
  static pool = new PioneerPublicApi.Pool(VisibleInterval);
  constructor(min = 0, max = 0, minSpace = "pixel-radius", maxSpace = minSpace, fadeBlur = .5) {
    this._min = min;
    this._minSpace = minSpace;
    this._max = max;
    this._maxSpace = maxSpace;
    this._fadeBlur = fadeBlur;
  }
  get min() {
    return this._min;
  }
  set min(min) {
    this._min = min;
  }
  get max() {
    return this._max;
  }
  set max(max) {
    this._max = max;
  }
  get minSpace() {
    return this._minSpace;
  }
  get maxSpace() {
    return this._maxSpace;
  }
  get fadeBlur() {
    return this._fadeBlur;
  }
  set fadeBlur(fadeBlur) {
    this._fadeBlur = fadeBlur;
  }
  toString() {
    return `[${this._min}, ${this._max}]`;
  }
  copy(t) {
    this._min = t.min;
    this._max = t.max;
    this._minSpace = t.minSpace;
    this._maxSpace = t.maxSpace;
    this._fadeBlur = t.fadeBlur;
  }
  set(min, max) {
    this._min = min;
    this._max = max;
  }
  length() {
    return this._max - this._min;
  }
  clamp(t) {
    return Math.min(Math.max(this._min, t), this._max);
  }
  expandTo(t) {
    this._min = Math.min(this._min, t);
    this._max = Math.max(this._max, t);
  }
  contains(t) {
    return this._min <= t && t < this._max;
  }
  intersects(t) {
    return this._min < t.max && t.min < this._max;
  }
  intersection(t, e) {
    this._min = Math.max(t.min, e.min);
    this._max = Math.min(t.max, e.max);
    this._max < this._min && (this._max = this._min);
  }
  union(t, e) {
    this._min = Math.min(t.min, e.min);
    this._max = Math.max(t.max, e.max);
  }
  getFadeMultiplier(t, e) {
    let i = NaN;
    let n = NaN;
    if ("pixel-radius" === this._minSpace || "pixel-radius" === this._maxSpace) {
      const s = t.getPixelSpaceExtentsRadius(e);
      "pixel-radius" === this._minSpace && (i = s);
      "pixel-radius" === this._maxSpace && (n = s);
    }
    if ("normal-radius" === this._minSpace || "normal-radius" === this._maxSpace) {
      const s = t.getNormalSpaceExtentsRadius(e);
      "normal-radius" === this._minSpace && (i = s);
      "normal-radius" === this._maxSpace && (n = s);
    }
    if ("z-distance" === this._minSpace || "z-distance" === this._maxSpace) {
      const o = PioneerPublicApi.Vector3.pool.get();
      o.rotateInverse(t.getOrientation(), t.getCameraSpacePosition(e));
      const r = Math.abs(o.z);
      PioneerPublicApi.Vector3.pool.release(o);
      "z-distance" === this._minSpace && (i = r);
      "z-distance" === this._maxSpace && (n = r);
    }
    const o = i > 0 || this._min > 0 ? PioneerPublicApi.MathUtils.clamp01((i / this._min - 1) / this._fadeBlur + 1) : 1;
    const r = n > 0 || this._max > 0 ? PioneerPublicApi.MathUtils.clamp01((1 - n / this._max) / this._fadeBlur + 1) : 0;
    return Math.min(o, r);
  }
  _min;
  _minSpace;
  _max;
  _maxSpace;
  _fadeBlur;
}
export { VisibleInterval };
