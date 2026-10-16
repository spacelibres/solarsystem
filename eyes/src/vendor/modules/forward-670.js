// Recovered from vendors.js:1835209-1836061.
import * as N from "./N.js";
import * as Unidentified659 from "./Unidentified659.js";
let defaultExport;
function init() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
}
function forward(e) {
  var t = e.x,
    n = e.y,
    a = (0, N.default)(t - this.long0, this.over),
    s = (0, Unidentified659.default)(n - this.lat0);
  return e.x = this.x0 + this.a * a * this.rc, e.y = this.y0 + this.a * s, e;
}
function inverse(e) {
  var t = e.x,
    n = e.y;
  return e.x = (0, N.default)(this.long0 + (t - this.x0) / (this.a * this.rc), this.over), e.y = (0, Unidentified659.default)(this.lat0 + (n - this.y0) / this.a), e;
}
var names = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "eqc"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
};
export { forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
