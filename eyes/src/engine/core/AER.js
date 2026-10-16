// Recovered from app.js:45346-46208.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 方位角与仰角内部用弧度，range 与向量长度同单位；零向量反解保留原 NaN，toString 可选择度显示。 */

class AER {
  static pool = new PioneerPublicApi.Pool(AER);
  constructor(azimuth = 0, elevation = 0, range = 0) {
    this._azimuth = azimuth;
    this._elevation = elevation;
    this._range = range;
  }
  get azimuth() {
    return this._azimuth;
  }
  set azimuth(azimuth) {
    this._azimuth = azimuth;
  }
  get elevation() {
    return this._elevation;
  }
  set elevation(elevation) {
    this._elevation = elevation;
  }
  get range() {
    return this._range;
  }
  set range(range) {
    this._range = range;
  }
  toString(useDegrees = false) {
    return useDegrees ? `[${PioneerPublicApi.MathUtils.radToDeg(this._azimuth)}, ${PioneerPublicApi.MathUtils.radToDeg(this._elevation)}, ${this._range}]` : `[${this._azimuth}, ${this._elevation}, ${this._range}]`;
  }
  copy(source) {
    this._azimuth = source.azimuth;
    this._elevation = source.elevation;
    this._range = source.range;
  }
  set(azimuth, elevation, range) {
    this._azimuth = azimuth;
    this._elevation = elevation;
    this._range = range;
  }
  setFromVector(vector) {
    this._range = vector.magnitude();
    this._elevation = Math.asin(vector.z / this._range);
    this._azimuth = Math.atan2(vector.y, vector.x);
  }
  _azimuth;
  _elevation;
  _range;
}
export { AER };
