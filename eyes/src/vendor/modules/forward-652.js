/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1822925-1824637.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1822925-1824637.
import * as Unidentified653 from "./Unidentified653.js";
import * as Unidentified654 from "./Unidentified654.js";
import * as Unidentified655 from "./Unidentified655.js";
import * as Unidentified656 from "./Unidentified656.js";
import * as Unidentified657 from "./Unidentified657.js";
import * as Unidentified658 from "./Unidentified658.js";
import * as N from "./N.js";
import * as Unidentified659 from "./Unidentified659.js";
import * as Unidentified660 from "./Unidentified660.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  this.sphere || (this.e0 = (0, Unidentified654.default)(this.es), this.e1 = (0, Unidentified655.default)(this.es), this.e2 = (0, Unidentified656.default)(this.es), this.e3 = (0, Unidentified657.default)(this.es), this.ml0 = this.a * (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, this.lat0));
}
function forward(e) {
  var t,
    n,
    i = e.x,
    a = e.y;
  if (i = (0, N.default)(i - this.long0, this.over), this.sphere) t = this.a * Math.asin(Math.cos(a) * Math.sin(i)), n = this.a * (Math.atan2(Math.tan(a), Math.cos(i)) - this.lat0);else {
    var s = Math.sin(a),
      o = Math.cos(a),
      u = (0, Unidentified658.default)(this.a, this.e, s),
      d = Math.tan(a) * Math.tan(a),
      h = i * Math.cos(a),
      p = h * h,
      f = this.es * o * o / (1 - this.es);
    t = u * h * (1 - p * d * (1 / 6 - (8 - d + 8 * f) * p / 120)), n = this.a * (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, a) - this.ml0 + u * s / o * p * (.5 + (5 - d + 6 * f) * p / 24);
  }
  return e.x = t + this.x0, e.y = n + this.y0, e;
}
function inverse(e) {
  e.x -= this.x0, e.y -= this.y0;
  var t,
    n,
    r = e.x / this.a,
    i = e.y / this.a;
  if (this.sphere) {
    var a = i + this.lat0;
    t = Math.asin(Math.sin(a) * Math.cos(r)), n = Math.atan2(Math.tan(r), Math.cos(a));
  } else {
    var s = this.ml0 / this.a + i,
      o = (0, Unidentified660.default)(s, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(o) - D2R.HALF_PI) <= D2R.EPSLN) return e.x = this.long0, e.y = D2R.HALF_PI, i < 0 && (e.y *= -1), e;
    var p = (0, Unidentified658.default)(this.a, this.e, Math.sin(o)),
      f = p * p * p / this.a / this.a * (1 - this.es),
      m = Math.pow(Math.tan(o), 2),
      M = r * this.a / p,
      _ = M * M;
    t = o - p * Math.tan(o) / f * M * M * (.5 - (1 + 3 * m) * M * M / 24), n = M * (1 - _ * (m / 3 + (1 + 3 * m) * m * _ / 15)) / Math.cos(o);
  }
  return e.x = (0, N.default)(n + this.long0, this.over), e.y = (0, Unidentified659.default)(t), e;
}
var names = ["Cassini", "Cassini_Soldner", "cass"];
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
