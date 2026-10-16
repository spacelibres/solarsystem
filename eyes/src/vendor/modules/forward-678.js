/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1846198-1847701.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1846198-1847701.
import * as N from "./N.js";
import * as D2R from "./D2R.js";
import * as Unidentified666 from "./Unidentified666.js";
let defaultExport;
function init() {
  this.R = this.a;
}
function forward(e) {
  var t,
    n,
    s = e.x,
    o = e.y,
    c = (0, N.default)(s - this.long0, this.over);
  Math.abs(o) <= D2R.EPSLN && (t = this.x0 + this.R * c, n = this.y0);
  var l = (0, Unidentified666.default)(2 * Math.abs(o / Math.PI));
  (Math.abs(c) <= D2R.EPSLN || Math.abs(Math.abs(o) - D2R.HALF_PI) <= D2R.EPSLN) && (t = this.x0, n = o >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * l) : this.y0 + Math.PI * this.R * -Math.tan(.5 * l));
  var u = .5 * Math.abs(Math.PI / c - c / Math.PI),
    d = u * u,
    h = Math.sin(l),
    p = Math.cos(l),
    f = p / (h + p - 1),
    m = f * f,
    M = f * (2 / h - 1),
    _ = M * M,
    A = Math.PI * this.R * (u * (f - _) + Math.sqrt(d * (f - _) * (f - _) - (_ + d) * (m - _))) / (_ + d);
  c < 0 && (A = -A), t = this.x0 + A;
  var g = d + f;
  return A = Math.PI * this.R * (M * g - u * Math.sqrt((_ + d) * (d + 1) - g * g)) / (_ + d), n = o >= 0 ? this.y0 + A : this.y0 - A, e.x = t, e.y = n, e;
}
function inverse(e) {
  var t, n, a, s, o, c, l, u, d, h, p, f;
  return e.x -= this.x0, e.y -= this.y0, p = Math.PI * this.R, o = (a = e.x / p) * a + (s = e.y / p) * s, p = 3 * (s * s / (u = -2 * (c = -Math.abs(s) * (1 + o)) + 1 + 2 * s * s + o * o) + (2 * (l = c - 2 * s * s + a * a) * l * l / u / u / u - 9 * c * l / u / u) / 27) / (d = (c - l * l / 3 / u) / u) / (h = 2 * Math.sqrt(-d / 3)), Math.abs(p) > 1 && (p = p >= 0 ? 1 : -1), f = Math.acos(p) / 3, n = e.y >= 0 ? (-h * Math.cos(f + Math.PI / 3) - l / 3 / u) * Math.PI : -(-h * Math.cos(f + Math.PI / 3) - l / 3 / u) * Math.PI, t = Math.abs(a) < D2R.EPSLN ? this.long0 : (0, N.default)(this.long0 + Math.PI * (o - 1 + Math.sqrt(1 + 2 * (a * a - s * s) + o * o)) / 2 / a, this.over), e.x = t, e.y = n, e;
}
var names = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"];
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
