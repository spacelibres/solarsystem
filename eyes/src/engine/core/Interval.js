// Recovered from app.js:50279-51388.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Interval {
  static Infinite = new Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  static InfiniteNeg = new Interval(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
  static pool = new PioneerPublicApi.Pool(Interval);
  constructor(min = 0, max = 0) {
    this._min = min;
    this._max = max;
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
  toString() {
    return `[${this._min}, ${this._max}]`;
  }
  isNaN() {
    return this._min != this._min || this._max != this._max;
  }
  copy(t) {
    this._min = t.min;
    this._max = t.max;
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
  _min;
  _max;
}
export { Interval };
