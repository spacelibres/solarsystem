// Recovered from vendors.js:1842735-1843156.
import * as forward from "./forward-674.js";
let defaultExport;
function init() {
  this.sphere = !0, this.b = this.a, this.m = 1, this.n = 2.5707963267948966, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1);
}
var a = forward.forward,
  inverse = forward.inverse,
  names = ["Eckert_VI", "eck6"];
defaultExport = {
  init: init,
  forward: a,
  inverse: inverse,
  names: names
};
export { a as forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
