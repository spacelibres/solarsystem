// Recovered from vendors.js:1806125-1806685.
import * as Unidentified643 from "./Unidentified643.js";
import * as forward from "./forward-633.js";
import * as D2R from "./D2R.js";
let defaultExport;
var dependsOn = "etmerc";
function init() {
  var e = (0, Unidentified643.default)(this.zone, this.long0);
  if (void 0 === e) throw new Error("unknown utm zone");
  this.lat0 = 0, this.long0 = (6 * Math.abs(e) - 183) * D2R.D2R, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, forward.default.init.apply(this), this.forward = forward.default.forward, this.inverse = forward.default.inverse;
}
var names = ["Universal Transverse Mercator System", "utm"];
defaultExport = {
  init: init,
  names: names,
  dependsOn: dependsOn
};
export { dependsOn };
export { init };
export { names };
export { defaultExport as default };
