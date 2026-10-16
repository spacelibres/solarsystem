/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1833823-1834792.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
