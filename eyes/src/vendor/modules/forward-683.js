/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1857853-1860665.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1857853-1860665.
import * as D2R from "./D2R.js";
import * as N from "./N.js";
let defaultExport;
var a = [[1, 22199e-21, -715515e-10, 31103e-10], [.9986, -482243e-9, -24897e-9, -13309e-10], [.9954, -83103e-8, -448605e-10, -9.86701e-7], [.99, -.00135364, -59661e-9, 36777e-10], [.9822, -.00167442, -449547e-11, -572411e-11], [.973, -.00214868, -903571e-10, 1.8736e-8], [.96, -.00305085, -900761e-10, 164917e-11], [.9427, -.00382792, -653386e-10, -26154e-10], [.9216, -.00467746, -10457e-8, 481243e-11], [.8962, -.00536223, -323831e-10, -543432e-11], [.8679, -.00609363, -113898e-9, 332484e-11], [.835, -.00698325, -640253e-10, 9.34959e-7], [.7986, -.00755338, -500009e-10, 9.35324e-7], [.7597, -.00798324, -35971e-9, -227626e-11], [.7186, -.00851367, -701149e-10, -86303e-10], [.6732, -.00986209, -199569e-9, 191974e-10], [.6213, -.010418, 883923e-10, 624051e-11], [.5722, -.00906601, 182e-6, 624051e-11], [.5322, -.00677797, 275608e-9, 624051e-11]],
  s = [[-520417e-23, .0124, 121431e-23, -845284e-16], [.062, .0124, -1.26793e-9, 4.22642e-10], [.124, .0124, 5.07171e-9, -1.60604e-9], [.186, .0123999, -1.90189e-8, 6.00152e-9], [.248, .0124002, 7.10039e-8, -2.24e-8], [.31, .0123992, -2.64997e-7, 8.35986e-8], [.372, .0124029, 9.88983e-7, -3.11994e-7], [.434, .0123893, -369093e-11, -4.35621e-7], [.4958, .0123198, -102252e-10, -3.45523e-7], [.5571, .0121916, -154081e-10, -5.82288e-7], [.6176, .0119938, -241424e-10, -5.25327e-7], [.6769, .011713, -320223e-10, -5.16405e-7], [.7346, .0113541, -397684e-10, -6.09052e-7], [.7903, .0109107, -489042e-10, -104739e-11], [.8435, .0103431, -64615e-9, -1.40374e-9], [.8936, .00969686, -64636e-9, -8547e-9], [.9394, .00840947, -192841e-9, -42106e-10], [.9761, .00616527, -256e-6, -42106e-10], [1, .00328947, -319159e-9, -42106e-10]],
  o = .8487,
  c = 1.3523,
  l = D2R.R2D / 5,
  u = 1 / l,
  d = 18,
  h = function (e, t) {
    return e[0] + t * (e[1] + t * (e[2] + t * e[3]));
  },
  p = function (e, t) {
    return e[1] + t * (2 * e[2] + 3 * t * e[3]);
  };
function init() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
}
function forward(e) {
  var t = (0, N.default)(e.x - this.long0, this.over),
    n = Math.abs(e.y),
    p = Math.floor(n * l);
  p < 0 ? p = 0 : p >= d && (p = d - 1), n = D2R.R2D * (n - u * p);
  var f = {
    x: h(a[p], n) * t,
    y: h(s[p], n)
  };
  return e.y < 0 && (f.y = -f.y), f.x = f.x * this.a * o + this.x0, f.y = f.y * this.a * c + this.y0, f;
}
function inverse(e) {
  var t = {
    x: (e.x - this.x0) / (this.a * o),
    y: Math.abs(e.y - this.y0) / (this.a * c)
  };
  if (t.y >= 1) t.x /= a[d][0], t.y = e.y < 0 ? -D2R.HALF_PI : D2R.HALF_PI;else {
    var n = Math.floor(t.y * d);
    for (n < 0 ? n = 0 : n >= d && (n = d - 1);;) if (s[n][0] > t.y) --n;else {
      if (!(s[n + 1][0] <= t.y)) break;
      ++n;
    }
    var l = s[n],
      u = 5 * (t.y - l[0]) / (s[n + 1][0] - l[0]);
    u = function (e, t, n, r) {
      for (var i = t; r; --r) {
        var a = e(i);
        if (i -= a, Math.abs(a) < n) break;
      }
      return i;
    }(function (e) {
      return (h(l, e) - t.y) / p(l, e);
    }, u, D2R.EPSLN, 100), t.x /= h(a[n], u), t.y = (5 * n + u) * D2R.D2R, e.y < 0 && (t.y = -t.y);
  }
  return t.x = (0, N.default)(t.x + this.long0, this.over), t;
}
var names = ["Robinson", "robin"];
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
