// Recovered from vendors.js:1863548-1866169.
import * as Unidentified635 from "./Unidentified635.js";
let defaultExport;
function init() {
  if (this.flip_axis = "x" === this.sweep ? 1 : 0, this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) throw new Error();
  if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, 0 !== this.es) {
    var radius_p2 = 1 - this.es,
      radius_p_inv2 = 1 / radius_p2;
    this.radius_p = Math.sqrt(radius_p2), this.radius_p2 = radius_p2, this.radius_p_inv2 = radius_p_inv2, this.shape = "ellipse";
  } else this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
  this.title || (this.title = "Geostationary Satellite View");
}
var names = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
defaultExport = {
  init: init,
  forward: function (e) {
    var t,
      n,
      i,
      a,
      s = e.x,
      o = e.y;
    if (s -= this.long0, "ellipse" === this.shape) {
      o = Math.atan(this.radius_p2 * Math.tan(o));
      var c = this.radius_p / (0, Unidentified635.default)(this.radius_p * Math.cos(o), Math.sin(o));
      if (n = c * Math.cos(s) * Math.cos(o), i = c * Math.sin(s) * Math.cos(o), a = c * Math.sin(o), (this.radius_g - n) * n - i * i - a * a * this.radius_p_inv2 < 0) return e.x = Number.NaN, e.y = Number.NaN, e;
      t = this.radius_g - n, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(i / (0, Unidentified635.default)(a, t)), e.y = this.radius_g_1 * Math.atan(a / t)) : (e.x = this.radius_g_1 * Math.atan(i / t), e.y = this.radius_g_1 * Math.atan(a / (0, Unidentified635.default)(i, t)));
    } else "sphere" === this.shape && (t = Math.cos(o), n = Math.cos(s) * t, i = Math.sin(s) * t, a = Math.sin(o), t = this.radius_g - n, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(i / (0, Unidentified635.default)(a, t)), e.y = this.radius_g_1 * Math.atan(a / t)) : (e.x = this.radius_g_1 * Math.atan(i / t), e.y = this.radius_g_1 * Math.atan(a / (0, Unidentified635.default)(i, t))));
    return e.x = e.x * this.a, e.y = e.y * this.a, e;
  },
  inverse: function (e) {
    var t,
      n,
      i,
      a,
      s = -1,
      o = 0,
      c = 0;
    if (e.x = e.x / this.a, e.y = e.y / this.a, "ellipse" === this.shape) {
      this.flip_axis ? (c = Math.tan(e.y / this.radius_g_1), o = Math.tan(e.x / this.radius_g_1) * (0, Unidentified635.default)(1, c)) : (o = Math.tan(e.x / this.radius_g_1), c = Math.tan(e.y / this.radius_g_1) * (0, Unidentified635.default)(1, o));
      var l = c / this.radius_p;
      if (t = o * o + l * l + s * s, (i = (n = 2 * this.radius_g * s) * n - 4 * t * this.C) < 0) return e.x = Number.NaN, e.y = Number.NaN, e;
      a = (-n - Math.sqrt(i)) / (2 * t), s = this.radius_g + a * s, o *= a, c *= a, e.x = Math.atan2(o, s), e.y = Math.atan(c * Math.cos(e.x) / s), e.y = Math.atan(this.radius_p_inv2 * Math.tan(e.y));
    } else if ("sphere" === this.shape) {
      if (this.flip_axis ? (c = Math.tan(e.y / this.radius_g_1), o = Math.tan(e.x / this.radius_g_1) * Math.sqrt(1 + c * c)) : (o = Math.tan(e.x / this.radius_g_1), c = Math.tan(e.y / this.radius_g_1) * Math.sqrt(1 + o * o)), t = o * o + c * c + s * s, (i = (n = 2 * this.radius_g * s) * n - 4 * t * this.C) < 0) return e.x = Number.NaN, e.y = Number.NaN, e;
      a = (-n - Math.sqrt(i)) / (2 * t), s = this.radius_g + a * s, o *= a, c *= a, e.x = Math.atan2(o, s), e.y = Math.atan(c * Math.cos(e.x) / s);
    }
    return e.x = e.x + this.long0, e;
  },
  names: names
};
export { init };
export { names };
export { defaultExport as default };
