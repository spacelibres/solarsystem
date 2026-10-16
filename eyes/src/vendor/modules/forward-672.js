/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、iterations、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1838307-1840642.；exports: forward, init, inverse, iterations, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1838307-1840642.
import * as D2R from "./D2R.js";
let defaultExport;
var iterations = 1;
function init() {
  this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013;
}
function forward(e) {
  var t,
    n = e.x,
    i = e.y - this.lat0,
    a = n - this.long0,
    s = i / D2R.SEC_TO_RAD * 1e-5,
    o = a,
    c = 1,
    l = 0;
  for (t = 1; t <= 10; t++) c *= s, l += this.A[t] * c;
  var u,
    d = l,
    h = o,
    p = 1,
    f = 0,
    m = 0,
    M = 0;
  for (t = 1; t <= 6; t++) u = f * d + p * h, p = p * d - f * h, f = u, m = m + this.B_re[t] * p - this.B_im[t] * f, M = M + this.B_im[t] * p + this.B_re[t] * f;
  return e.x = M * this.a + this.x0, e.y = m * this.a + this.y0, e;
}
function inverse(e) {
  var t,
    n,
    i = e.x,
    a = e.y,
    s = i - this.x0,
    o = (a - this.y0) / this.a,
    c = s / this.a,
    l = 1,
    u = 0,
    d = 0,
    h = 0;
  for (t = 1; t <= 6; t++) n = u * o + l * c, l = l * o - u * c, u = n, d = d + this.C_re[t] * l - this.C_im[t] * u, h = h + this.C_im[t] * l + this.C_re[t] * u;
  for (var p = 0; p < this.iterations; p++) {
    var f,
      m = d,
      M = h,
      _ = o,
      A = c;
    for (t = 2; t <= 6; t++) f = M * d + m * h, m = m * d - M * h, M = f, _ += (t - 1) * (this.B_re[t] * m - this.B_im[t] * M), A += (t - 1) * (this.B_im[t] * m + this.B_re[t] * M);
    m = 1, M = 0;
    var g = this.B_re[1],
      b = this.B_im[1];
    for (t = 2; t <= 6; t++) f = M * d + m * h, m = m * d - M * h, M = f, g += t * (this.B_re[t] * m - this.B_im[t] * M), b += t * (this.B_im[t] * m + this.B_re[t] * M);
    var y = g * g + b * b;
    d = (_ * g + A * b) / y, h = (A * g - _ * b) / y;
  }
  var L = d,
    v = h,
    T = 1,
    S = 0;
  for (t = 1; t <= 9; t++) T *= L, S += this.D[t] * T;
  var w = this.lat0 + S * D2R.SEC_TO_RAD * 1e5,
    E = this.long0 + v;
  return e.x = E, e.y = w, e;
}
var names = ["New_Zealand_Map_Grid", "nzmg"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
};
export { forward };
export { init };
export { inverse };
export { iterations };
export { names };
export { defaultExport as default };
