/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1814514-1818454.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1814514-1818454.
import * as Unidentified612 from "./Unidentified612.js";
import * as N from "./N.js";
import * as Unidentified613 from "./Unidentified613.js";
import * as D2R from "./D2R.js";
import * as add from "./add.js";
let defaultExport;
var c = 1e-7;
function init() {
  var e,
    t,
    n,
    a,
    l,
    u,
    d,
    h,
    p,
    f,
    m,
    M,
    _,
    A,
    g = 0,
    b = 0,
    y = 0,
    L = 0,
    v = 0,
    T = 0,
    S = 0;
  this.no_off = (_ = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"], A = "object" == typeof (M = this).projName ? Object.keys(M.projName)[0] : M.projName, "no_uoff" in M || "no_off" in M || -1 !== _.indexOf(A) || -1 !== _.indexOf((0, add.getNormalizedProjName)(A))), this.no_rot = "no_rot" in this;
  var w = !1;
  "alpha" in this && (w = !0);
  var E = !1;
  if ("rectified_grid_angle" in this && (E = !0), w && (S = this.alpha), E && (g = this.rectified_grid_angle, w || (S = 0, w = !0)), w || E) b = this.longc;else if (y = this.long1, v = this.lat1, L = this.long2, T = this.lat2, Math.abs(v - T) <= c || (e = Math.abs(v)) <= c || Math.abs(e - D2R.HALF_PI) <= c || Math.abs(Math.abs(this.lat0) - D2R.HALF_PI) <= c || Math.abs(Math.abs(T) - D2R.HALF_PI) <= c) throw new Error();
  var x = 1 - this.es;
  t = Math.sqrt(x), Math.abs(this.lat0) > D2R.EPSLN ? (h = Math.sin(this.lat0), n = Math.cos(this.lat0), e = 1 - this.es * h * h, this.B = n * n, this.B = Math.sqrt(1 + this.es * this.B * this.B / x), this.A = this.B * this.k0 * t / e, (l = (a = this.B * t / (n * Math.sqrt(e))) * a - 1) <= 0 ? l = 0 : (l = Math.sqrt(l), this.lat0 < 0 && (l = -l)), this.E = l += a, this.E *= Math.pow((0, Unidentified612.default)(this.e, this.lat0, h), this.B)) : (this.B = 1 / t, this.A = this.k0, this.E = a = l = 1), w || E ? (w ? (m = Math.asin(Math.sin(S) / a), E || (g = S)) : (m = g, S = Math.asin(a * Math.sin(m))), this.lam0 = b - Math.asin(.5 * (l - 1 / l) * Math.tan(m)) / this.B) : (u = Math.pow((0, Unidentified612.default)(this.e, v, Math.sin(v)), this.B), d = Math.pow((0, Unidentified612.default)(this.e, T, Math.sin(T)), this.B), l = this.E / u, p = (d - u) / (d + u), f = ((f = this.E * this.E) - d * u) / (f + d * u), (e = y - L) < -Math.PI ? L -= D2R.TWO_PI : e > Math.PI && (L += D2R.TWO_PI), this.lam0 = (0, N.default)(.5 * (y + L) - Math.atan(f * Math.tan(.5 * this.B * (y - L)) / p) / this.B, this.over), m = Math.atan(2 * Math.sin(this.B * (0, N.default)(y - this.lam0, this.over)) / (l - 1 / l)), g = S = Math.asin(a * Math.sin(m))), this.singam = Math.sin(m), this.cosgam = Math.cos(m), this.sinrot = Math.sin(g), this.cosrot = Math.cos(g), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(a * a - 1) / Math.cos(S))), this.lat0 < 0 && (this.u_0 = -this.u_0)), l = .5 * m, this.v_pole_n = this.ArB * Math.log(Math.tan(D2R.FORTPI - l)), this.v_pole_s = this.ArB * Math.log(Math.tan(D2R.FORTPI + l));
}
function forward(e) {
  var t,
    n,
    i,
    a,
    o,
    l,
    u,
    d,
    h = {};
  if (e.x = e.x - this.lam0, Math.abs(Math.abs(e.y) - D2R.HALF_PI) > D2R.EPSLN) {
    if (t = .5 * ((o = this.E / Math.pow((0, Unidentified612.default)(this.e, e.y, Math.sin(e.y)), this.B)) - (l = 1 / o)), n = .5 * (o + l), a = Math.sin(this.B * e.x), i = (t * this.singam - a * this.cosgam) / n, Math.abs(Math.abs(i) - 1) < D2R.EPSLN) throw new Error();
    d = .5 * this.ArB * Math.log((1 - i) / (1 + i)), l = Math.cos(this.B * e.x), u = Math.abs(l) < c ? this.A * e.x : this.ArB * Math.atan2(t * this.cosgam + a * this.singam, l);
  } else d = e.y > 0 ? this.v_pole_n : this.v_pole_s, u = this.ArB * e.y;
  return this.no_rot ? (h.x = u, h.y = d) : (u -= this.u_0, h.x = d * this.cosrot + u * this.sinrot, h.y = u * this.cosrot - d * this.sinrot), h.x = this.a * h.x + this.x0, h.y = this.a * h.y + this.y0, h;
}
function inverse(e) {
  var t,
    n,
    r,
    i,
    o,
    c,
    l,
    u = {};
  if (e.x = (e.x - this.x0) * (1 / this.a), e.y = (e.y - this.y0) * (1 / this.a), this.no_rot ? (n = e.y, t = e.x) : (n = e.x * this.cosrot - e.y * this.sinrot, t = e.y * this.cosrot + e.x * this.sinrot + this.u_0), i = .5 * ((r = Math.exp(-this.BrA * n)) - 1 / r), o = .5 * (r + 1 / r), l = ((c = Math.sin(this.BrA * t)) * this.cosgam + i * this.singam) / o, Math.abs(Math.abs(l) - 1) < D2R.EPSLN) u.x = 0, u.y = l < 0 ? -D2R.HALF_PI : D2R.HALF_PI;else {
    if (u.y = this.E / Math.sqrt((1 + l) / (1 - l)), u.y = (0, Unidentified613.default)(this.e, Math.pow(u.y, 1 / this.B)), u.y === 1 / 0) throw new Error();
    u.x = -this.rB * Math.atan2(i * this.cosgam - c * this.singam, Math.cos(this.BrA * t));
  }
  return u.x += this.lam0, u;
}
var names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
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
