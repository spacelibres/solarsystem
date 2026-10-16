// Recovered from vendors.js:1860666-1861106.
import * as compareDatums from "./compareDatums.js";
let defaultExport;
function init() {
  this.name = "geocent";
}
function forward(e) {
  return (0, compareDatums.geodeticToGeocentric)(e, this.es, this.a);
}
function inverse(e) {
  return (0, compareDatums.geocentricToGeodetic)(e, this.es, this.a, this.b);
}
var names = ["Geocentric", "geocentric", "geocent", "Geocent"];
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
