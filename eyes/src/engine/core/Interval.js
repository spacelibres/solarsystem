// Recovered from app.js:50279-51388.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 区间 contains 为左闭右开，接触端点不相交；空交集折叠到较大的下界，InfiniteNeg 用于累计包络。 */

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
  copy(source) {
    this._min = source.min;
    this._max = source.max;
  }
  set(min, max) {
    this._min = min;
    this._max = max;
  }
  length() {
    return this._max - this._min;
  }
  clamp(value) {
    return Math.min(Math.max(this._min, value), this._max);
  }
  expandTo(value) {
    this._min = Math.min(this._min, value);
    this._max = Math.max(this._max, value);
  }
  contains(value) {
    return this._min <= value && value < this._max;
  }
  intersects(other) {
    return this._min < other.max && other.min < this._max;
  }
  intersection(left, right) {
    this._min = Math.max(left.min, right.min);
    this._max = Math.min(left.max, right.max);
    if (this._max < this._min) {
      this._max = this._min;
    }
  }
  union(left, right) {
    this._min = Math.min(left.min, right.min);
    this._max = Math.max(left.max, right.max);
  }
  _min;
  _max;
}
export { Interval };
