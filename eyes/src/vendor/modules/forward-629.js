// Recovered from vendors.js:1797945-1800339.
import * as Unidentified630 from "./Unidentified630.js";
import * as Unidentified631 from "./Unidentified631.js";
import * as Unidentified632 from "./Unidentified632.js";
import * as N from "./N.js";
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
let defaultExport;
function init() {
  this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.es && (this.en = (0, Unidentified630.default)(this.es), this.ml0 = (0, Unidentified631.default)(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
}
function forward(e) {
  var t,
    n,
    r,
    a = e.x,
    c = e.y,
    l = (0, N.default)(a - this.long0, this.over),
    u = Math.sin(c),
    d = Math.cos(c);
  if (this.es) {
    var h = d * l,
      p = Math.pow(h, 2),
      f = this.ep2 * Math.pow(d, 2),
      m = Math.pow(f, 2),
      M = Math.abs(d) > D2R.EPSLN ? Math.tan(c) : 0,
      _ = Math.pow(M, 2),
      A = Math.pow(_, 2);
    t = 1 - this.es * Math.pow(u, 2), h /= Math.sqrt(t);
    var g = (0, Unidentified631.default)(c, u, d, this.en);
    n = this.a * (this.k0 * h * (1 + p / 6 * (1 - _ + f + p / 20 * (5 - 18 * _ + A + 14 * f - 58 * _ * f + p / 42 * (61 + 179 * A - A * _ - 479 * _))))) + this.x0, r = this.a * (this.k0 * (g - this.ml0 + u * l * h / 2 * (1 + p / 12 * (5 - _ + 9 * f + 4 * m + p / 30 * (61 + A - 58 * _ + 270 * f - 330 * _ * f + p / 56 * (1385 + 543 * A - A * _ - 3111 * _)))))) + this.y0;
  } else {
    var b = d * Math.sin(l);
    if (Math.abs(Math.abs(b) - 1) < D2R.EPSLN) return 93;
    if (n = .5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0, r = d * Math.cos(l) / Math.sqrt(1 - Math.pow(b, 2)), (b = Math.abs(r)) >= 1) {
      if (b - 1 > D2R.EPSLN) return 93;
      r = 0;
    } else r = Math.acos(r);
    c < 0 && (r = -r), r = this.a * this.k0 * (r - this.lat0) + this.y0;
  }
  return e.x = n, e.y = r, e;
}
function inverse(e) {
  var t,
    n,
    r,
    i,
    l = (e.x - this.x0) * (1 / this.a),
    u = (e.y - this.y0) * (1 / this.a);
  if (this.es) {
    if (t = this.ml0 + u / this.k0, n = (0, Unidentified632.default)(t, this.es, this.en), Math.abs(n) < D2R.HALF_PI) {
      var d = Math.sin(n),
        h = Math.cos(n),
        p = Math.abs(h) > D2R.EPSLN ? Math.tan(n) : 0,
        f = this.ep2 * Math.pow(h, 2),
        m = Math.pow(f, 2),
        M = Math.pow(p, 2),
        _ = Math.pow(M, 2);
      t = 1 - this.es * Math.pow(d, 2);
      var A = l * Math.sqrt(t) / this.k0,
        g = Math.pow(A, 2);
      r = n - (t *= p) * g / (1 - this.es) * .5 * (1 - g / 12 * (5 + 3 * M - 9 * f * M + f - 4 * m - g / 30 * (61 + 90 * M - 252 * f * M + 45 * _ + 46 * f - g / 56 * (1385 + 3633 * M + 4095 * _ + 1574 * _ * M)))), i = (0, N.default)(this.long0 + A * (1 - g / 6 * (1 + 2 * M + f - g / 20 * (5 + 28 * M + 24 * _ + 8 * f * M + 6 * f - g / 42 * (61 + 662 * M + 1320 * _ + 720 * _ * M)))) / h, this.over);
    } else r = D2R.HALF_PI * (0, Unidentified611.default)(u), i = 0;
  } else {
    var b = Math.exp(l / this.k0),
      y = .5 * (b - 1 / b),
      L = this.lat0 + u / this.k0,
      v = Math.cos(L);
    t = Math.sqrt((1 - Math.pow(v, 2)) / (1 + Math.pow(y, 2))), r = Math.asin(t), u < 0 && (r = -r), i = 0 === y && 0 === v ? 0 : (0, N.default)(Math.atan2(y, v) + this.long0, this.over);
  }
  return e.x = i, e.y = r, e;
}
var names = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
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
