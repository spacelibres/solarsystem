// Recovered from vendors.js:1841245-1842734.
import * as N from "./N.js";
import * as Unidentified659 from "./Unidentified659.js";
import * as Unidentified630 from "./Unidentified630.js";
import * as Unidentified631 from "./Unidentified631.js";
import * as Unidentified632 from "./Unidentified632.js";
import * as D2R from "./D2R.js";
import * as Unidentified666 from "./Unidentified666.js";
let defaultExport;
var u = 20;
function init() {
  this.long0 = this.long0 || 0, this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = (0, Unidentified630.default)(this.es);
}
function forward(e) {
  var t,
    n,
    i = e.x,
    a = e.y;
  if (i = (0, N.default)(i - this.long0, this.over), this.sphere) {
    if (this.m) for (var o = this.n * Math.sin(a), l = u; l; --l) {
      var d = (this.m * a + Math.sin(a) - o) / (this.m + Math.cos(a));
      if (a -= d, Math.abs(d) < D2R.EPSLN) break;
    } else a = 1 !== this.n ? Math.asin(this.n * Math.sin(a)) : a;
    t = this.a * this.C_x * i * (this.m + Math.cos(a)), n = this.a * this.C_y * a;
  } else {
    var h = Math.sin(a),
      p = Math.cos(a);
    n = this.a * (0, Unidentified631.default)(a, h, p, this.en), t = this.a * i * p / Math.sqrt(1 - this.es * h * h);
  }
  return e.x = t, e.y = n, e;
}
function inverse(e) {
  var t, n, a, s;
  return e.x -= this.x0, a = e.x / this.a, e.y -= this.y0, t = e.y / this.a, this.sphere ? (t /= this.C_y, a /= this.C_x * (this.m + Math.cos(t)), this.m ? t = (0, Unidentified666.default)((this.m * t + Math.sin(t)) / this.n) : 1 !== this.n && (t = (0, Unidentified666.default)(Math.sin(t) / this.n)), a = (0, N.default)(a + this.long0, this.over), t = (0, Unidentified659.default)(t)) : (t = (0, Unidentified632.default)(e.y / this.a, this.es, this.en), (s = Math.abs(t)) < D2R.HALF_PI ? (s = Math.sin(t), n = this.long0 + e.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(t)), a = (0, N.default)(n, this.over)) : s - D2R.EPSLN < D2R.HALF_PI && (a = this.long0)), e.x = a, e.y = t, e;
}
var names = ["Sinusoidal", "sinu"];
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
