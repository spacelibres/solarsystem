// Recovered from vendors.js:1840643-1841244.
import * as N from "./N.js";
let defaultExport;
function init() {}
function forward(e) {
  var t = e.x,
    n = e.y,
    i = (0, N.default)(t - this.long0, this.over),
    a = this.x0 + this.a * i,
    s = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + n / 2.5)) * 1.25;
  return e.x = a, e.y = s, e;
}
function inverse(e) {
  e.x -= this.x0, e.y -= this.y0;
  var t = (0, N.default)(this.long0 + e.x / this.a, this.over),
    n = 2.5 * (Math.atan(Math.exp(.8 * e.y / this.a)) - Math.PI / 4);
  return e.x = t, e.y = n, e;
}
var names = ["Miller_Cylindrical", "mill"];
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
