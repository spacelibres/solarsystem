// Recovered from app.js:51389-53646.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 最小与最大阈值可分别使用像素半径、标准化半径或 z 距离；各自归一化渐隐后取较小值，保留单位与零阈值分支。 */
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
  copy(source) {
    this._min = source.min;
    this._max = source.max;
    this._minSpace = source.minSpace;
    this._maxSpace = source.maxSpace;
    this._fadeBlur = source.fadeBlur;
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
  getFadeMultiplier(entity, camera) {
    let minimumMetric = NaN;
    let maximumMetric = NaN;
    if ("pixel-radius" === this._minSpace || "pixel-radius" === this._maxSpace) {
      const pixelRadius = entity.getPixelSpaceExtentsRadius(camera);
      if ("pixel-radius" === this._minSpace) {
        minimumMetric = pixelRadius;
      }
      if ("pixel-radius" === this._maxSpace) {
        maximumMetric = pixelRadius;
      }
    }
    if ("normal-radius" === this._minSpace || "normal-radius" === this._maxSpace) {
      const normalRadius = entity.getNormalSpaceExtentsRadius(camera);
      if ("normal-radius" === this._minSpace) {
        minimumMetric = normalRadius;
      }
      if ("normal-radius" === this._maxSpace) {
        maximumMetric = normalRadius;
      }
    }
    if ("z-distance" === this._minSpace || "z-distance" === this._maxSpace) {
      const cameraLocalPosition = PioneerPublicApi.Vector3.pool.get();
      cameraLocalPosition.rotateInverse(entity.getOrientation(), entity.getCameraSpacePosition(camera));
      const absoluteZDistance = Math.abs(cameraLocalPosition.z);
      PioneerPublicApi.Vector3.pool.release(cameraLocalPosition);
      if ("z-distance" === this._minSpace) {
        minimumMetric = absoluteZDistance;
      }
      if ("z-distance" === this._maxSpace) {
        maximumMetric = absoluteZDistance;
      }
    }
    const minimumFade = minimumMetric > 0 || this._min > 0 ? PioneerPublicApi.MathUtils.clamp01((minimumMetric / this._min - 1) / this._fadeBlur + 1) : 1;
    const maximumFade = maximumMetric > 0 || this._max > 0 ? PioneerPublicApi.MathUtils.clamp01((1 - maximumMetric / this._max) / this._fadeBlur + 1) : 0;
    return Math.min(minimumFade, maximumFade);
  }
  _min;
  _minSpace;
  _max;
  _maxSpace;
  _fadeBlur;
}
export { VisibleInterval };
