/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1753196-1754627.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1753196-1754627.
import * as Unidentified609 from "./Unidentified609.js";
import * as N from "./N.js";
import * as Unidentified612 from "./Unidentified612.js";
import * as Unidentified613 from "./Unidentified613.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  var e = this.b / this.a;
  this.es = 1 - e * e, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = (0, Unidentified609.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
}
function forward(e) {
  var t,
    n,
    r = e.x,
    s = e.y;
  if (s * D2R.R2D > 90 && s * D2R.R2D < -90 && r * D2R.R2D > 180 && r * D2R.R2D < -180) return null;
  if (Math.abs(Math.abs(s) - D2R.HALF_PI) <= D2R.EPSLN) return null;
  if (this.sphere) t = this.x0 + this.a * this.k0 * (0, N.default)(r - this.long0, this.over), n = this.y0 + this.a * this.k0 * Math.log(Math.tan(D2R.FORTPI + .5 * s));else {
    var c = Math.sin(s),
      l = (0, Unidentified612.default)(this.e, s, c);
    t = this.x0 + this.a * this.k0 * (0, N.default)(r - this.long0, this.over), n = this.y0 - this.a * this.k0 * Math.log(l);
  }
  return e.x = t, e.y = n, e;
}
function inverse(e) {
  var t,
    n,
    r = e.x - this.x0,
    a = e.y - this.y0;
  if (this.sphere) n = D2R.HALF_PI - 2 * Math.atan(Math.exp(-a / (this.a * this.k0)));else {
    var c = Math.exp(-a / (this.a * this.k0));
    if (-9999 === (n = (0, Unidentified613.default)(this.e, c))) return null;
  }
  return t = (0, N.default)(this.long0 + r / (this.a * this.k0), this.over), e.x = t, e.y = n, e;
}
var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"];
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
