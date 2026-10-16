// Recovered from app.js:45346-46208.
import * as PioneerPublicApi from "../pioneer/public-api.js";
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
  toString(t = false) {
    return t ? `[${PioneerPublicApi.MathUtils.radToDeg(this._azimuth)}, ${PioneerPublicApi.MathUtils.radToDeg(this._elevation)}, ${this._range}]` : `[${this._azimuth}, ${this._elevation}, ${this._range}]`;
  }
  copy(t) {
    this._azimuth = t.azimuth;
    this._elevation = t.elevation;
    this._range = t.range;
  }
  set(azimuth, elevation, range) {
    this._azimuth = azimuth;
    this._elevation = elevation;
    this._range = range;
  }
  setFromVector(t) {
    this._range = t.magnitude();
    this._elevation = Math.asin(t.z / this._range);
    this._azimuth = Math.atan2(t.y, t.x);
  }
  _azimuth;
  _elevation;
  _range;
}
export { AER };
