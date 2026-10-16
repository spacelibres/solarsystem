// Recovered from vendors.js:1833823-1834792.
import * as N from "./N.js";
import * as Unidentified662 from "./Unidentified662.js";
import * as Unidentified609 from "./Unidentified609.js";
import * as Unidentified669 from "./Unidentified669.js";
let defaultExport;
function init() {
  this.sphere || (this.k0 = (0, Unidentified609.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
}
function forward(e) {
  var t,
    n,
    a = e.x,
    s = e.y,
    o = (0, N.default)(a - this.long0, this.over);
  if (this.sphere) t = this.x0 + this.a * o * Math.cos(this.lat_ts), n = this.y0 + this.a * Math.sin(s) / Math.cos(this.lat_ts);else {
    var c = (0, Unidentified662.default)(this.e, Math.sin(s));
    t = this.x0 + this.a * this.k0 * o, n = this.y0 + this.a * c * .5 / this.k0;
  }
  return e.x = t, e.y = n, e;
}
function inverse(e) {
  var t, n;
  return e.x -= this.x0, e.y -= this.y0, this.sphere ? (t = (0, N.default)(this.long0 + e.x / this.a / Math.cos(this.lat_ts), this.over), n = Math.asin(e.y / this.a * Math.cos(this.lat_ts))) : (n = (0, Unidentified669.default)(this.e, 2 * e.y * this.k0 / this.a), t = (0, N.default)(this.long0 + e.x / (this.a * this.k0), this.over)), e.x = t, e.y = n, e;
}
var names = ["cea"];
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
