/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1801172-1804624.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1801172-1804624.
import * as forward from "./forward-629.js";
import * as Unidentified634 from "./Unidentified634.js";
import * as Unidentified635 from "./Unidentified635.js";
import * as Unidentified636 from "./Unidentified636.js";
import * as Unidentified638 from "./Unidentified638.js";
import * as Unidentified639 from "./Unidentified639.js";
import * as Unidentified640 from "./Unidentified640.js";
import * as N from "./N.js";
let defaultExport;
function init() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  this.approx && (forward.default.init.apply(this), this.forward = forward.default.forward, this.inverse = forward.default.inverse), this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
  var e = this.es / (1 + Math.sqrt(1 - this.es)),
    t = e / (2 - e),
    n = t;
  this.cgb[0] = t * (2 + t * (-2 / 3 + t * (t * (116 / 45 + t * (26 / 45 + t * (-2854 / 675))) - 2))), this.cbg[0] = t * (t * (2 / 3 + t * (4 / 3 + t * (-82 / 45 + t * (32 / 45 + t * (4642 / 4725))))) - 2), n *= t, this.cgb[1] = n * (7 / 3 + t * (t * (-227 / 45 + t * (2704 / 315 + t * (2323 / 945))) - 1.6)), this.cbg[1] = n * (5 / 3 + t * (-16 / 15 + t * (-13 / 9 + t * (904 / 315 + t * (-1522 / 945))))), n *= t, this.cgb[2] = n * (56 / 15 + t * (-136 / 35 + t * (-1262 / 105 + t * (73814 / 2835)))), this.cbg[2] = n * (-26 / 15 + t * (34 / 21 + t * (1.6 + t * (-12686 / 2835)))), n *= t, this.cgb[3] = n * (4279 / 630 + t * (-332 / 35 + t * (-399572 / 14175))), this.cbg[3] = n * (1237 / 630 + t * (t * (-24832 / 14175) - 2.4)), n *= t, this.cgb[4] = n * (4174 / 315 + t * (-144838 / 6237)), this.cbg[4] = n * (-734 / 315 + t * (109598 / 31185)), n *= t, this.cgb[5] = n * (601676 / 22275), this.cbg[5] = n * (444337 / 155925), n = Math.pow(t, 2), this.Qn = this.k0 / (1 + t) * (1 + n * (1 / 4 + n * (1 / 64 + n / 256))), this.utg[0] = t * (t * (2 / 3 + t * (-37 / 96 + t * (1 / 360 + t * (81 / 512 + t * (-96199 / 604800))))) - .5), this.gtu[0] = t * (.5 + t * (-2 / 3 + t * (5 / 16 + t * (41 / 180 + t * (-127 / 288 + t * (7891 / 37800)))))), this.utg[1] = n * (-1 / 48 + t * (-1 / 15 + t * (437 / 1440 + t * (-46 / 105 + t * (1118711 / 3870720))))), this.gtu[1] = n * (13 / 48 + t * (t * (557 / 1440 + t * (281 / 630 + t * (-1983433 / 1935360))) - .6)), n *= t, this.utg[2] = n * (-17 / 480 + t * (37 / 840 + t * (209 / 4480 + t * (-5569 / 90720)))), this.gtu[2] = n * (61 / 240 + t * (-103 / 140 + t * (15061 / 26880 + t * (167603 / 181440)))), n *= t, this.utg[3] = n * (-4397 / 161280 + t * (11 / 504 + t * (830251 / 7257600))), this.gtu[3] = n * (49561 / 161280 + t * (-179 / 168 + t * (6601661 / 7257600))), n *= t, this.utg[4] = n * (-4583 / 161280 + t * (108847 / 3991680)), this.gtu[4] = n * (34729 / 80640 + t * (-3418889 / 1995840)), n *= t, this.utg[5] = n * (-20648693 / 638668800), this.gtu[5] = .6650675310896665 * n;
  var i = (0, Unidentified638.default)(this.cbg, this.lat0);
  this.Zb = -this.Qn * (i + (0, Unidentified639.default)(this.gtu, 2 * i));
}
function h(e) {
  var t = (0, N.default)(e.x - this.long0, this.over),
    n = e.y;
  n = (0, Unidentified638.default)(this.cbg, n);
  var r = Math.sin(n),
    i = Math.cos(n),
    c = Math.sin(t),
    d = Math.cos(t);
  n = Math.atan2(r, d * i), t = Math.atan2(c * i, (0, Unidentified635.default)(r, i * d)), t = (0, Unidentified636.default)(Math.tan(t));
  var h,
    p,
    f = (0, Unidentified640.default)(this.gtu, 2 * n, 2 * t);
  return n += f[0], t += f[1], Math.abs(t) <= 2.623395162778 ? (h = this.a * (this.Qn * t) + this.x0, p = this.a * (this.Qn * n + this.Zb) + this.y0) : (h = 1 / 0, p = 1 / 0), e.x = h, e.y = p, e;
}
function inverse(e) {
  var t,
    n,
    r = (e.x - this.x0) * (1 / this.a),
    s = (e.y - this.y0) * (1 / this.a);
  if (s = (s - this.Zb) / this.Qn, r /= this.Qn, Math.abs(r) <= 2.623395162778) {
    var c = (0, Unidentified640.default)(this.utg, 2 * s, 2 * r);
    s += c[0], r += c[1], r = Math.atan((0, Unidentified634.default)(r));
    var d = Math.sin(s),
      h = Math.cos(s),
      p = Math.sin(r),
      f = Math.cos(r);
    s = Math.atan2(d * f, (0, Unidentified635.default)(p, f * h)), r = Math.atan2(p, f * h), t = (0, N.default)(r + this.long0, this.over), n = (0, Unidentified638.default)(this.cgb, s);
  } else t = 1 / 0, n = 1 / 0;
  return e.x = t, e.y = n, e;
}
var names = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
defaultExport = {
  init: init,
  forward: h,
  inverse: inverse,
  names: names
};
export { h as forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
