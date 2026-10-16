/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1860666-1861106.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
