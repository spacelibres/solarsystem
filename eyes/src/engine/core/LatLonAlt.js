// Recovered from app.js:74701-75335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LatLonAlt {
  static pool = new PioneerPublicApi.Pool(LatLonAlt);
  constructor(lat = 0, lon = 0, alt = 0) {
    this._lat = lat;
    this._lon = lon;
    this._alt = alt;
  }
  get lat() {
    return this._lat;
  }
  set lat(lat) {
    this._lat = lat;
  }
  get lon() {
    return this._lon;
  }
  set lon(lon) {
    this._lon = lon;
  }
  get alt() {
    return this._alt;
  }
  set alt(alt) {
    this._alt = alt;
  }
  toString(t = false) {
    return t ? `[${PioneerPublicApi.MathUtils.radToDeg(this._lat)}, ${PioneerPublicApi.MathUtils.radToDeg(this._lon)}, ${this._alt}]` : `[${this._lat}, ${this._lon}, ${this._alt}]`;
  }
  copy(t) {
    this._lat = t.lat;
    this._lon = t.lon;
    this._alt = t.alt;
  }
  set(lat, lon, alt) {
    this._lat = lat;
    this._lon = lon;
    this._alt = alt;
  }
  _lat;
  _lon;
  _alt;
}
export { LatLonAlt };
