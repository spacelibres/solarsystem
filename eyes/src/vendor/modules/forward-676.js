// Recovered from vendors.js:1843157-1844230.
import * as N from "./N.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0;
}
function forward(e) {
  for (var t = e.x, n = e.y, a = (0, N.default)(t - this.long0, this.over), s = n, o = Math.PI * Math.sin(n);;) {
    var c = -(s + Math.sin(s) - o) / (1 + Math.cos(s));
    if (s += c, Math.abs(c) < D2R.EPSLN) break;
  }
  s /= 2, Math.PI / 2 - Math.abs(n) < D2R.EPSLN && (a = 0);
  var l = .900316316158 * this.a * a * Math.cos(s) + this.x0,
    u = 1.4142135623731 * this.a * Math.sin(s) + this.y0;
  return e.x = l, e.y = u, e;
}
function inverse(e) {
  var t, n;
  e.x -= this.x0, e.y -= this.y0, n = e.y / (1.4142135623731 * this.a), Math.abs(n) > .999999999999 && (n = .999999999999), t = Math.asin(n);
  var i = (0, N.default)(this.long0 + e.x / (.900316316158 * this.a * Math.cos(t)), this.over);
  i < -Math.PI && (i = -Math.PI), i > Math.PI && (i = Math.PI), n = (2 * t + Math.sin(2 * t)) / Math.PI, Math.abs(n) > 1 && (n = 1);
  var a = Math.asin(n);
  return e.x = i, e.y = a, e;
}
var names = ["Mollweide", "moll"];
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
