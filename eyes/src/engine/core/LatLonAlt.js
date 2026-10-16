// Recovered from app.js:74701-75335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** lat/lon 内部为弧度，alt 长度单位由参考椭球决定；copy 只复制值，toString 可选择度显示。 */

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
  toString(useDegrees = false) {
    return useDegrees ? `[${PioneerPublicApi.MathUtils.radToDeg(this._lat)}, ${PioneerPublicApi.MathUtils.radToDeg(this._lon)}, ${this._alt}]` : `[${this._lat}, ${this._lon}, ${this._alt}]`;
  }
  copy(source) {
    this._lat = source.lat;
    this._lon = source.lon;
    this._alt = source.alt;
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
