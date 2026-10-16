// Recovered from vendors.js:1790555-1791171.
import * as forward from "./forward-627.js";
let defaultExport;
function i(e, t, n) {
  if (!(this instanceof i)) return new i(e, t, n);
  if (Array.isArray(e)) this.x = e[0], this.y = e[1], this.z = e[2] || 0;else if ("object" == typeof e) this.x = e.x, this.y = e.y, this.z = e.z || 0;else if ("string" == typeof e && void 0 === t) {
    var r = e.split(",");
    this.x = parseFloat(r[0]), this.y = parseFloat(r[1]), this.z = parseFloat(r[2]) || 0;
  } else this.x = e, this.y = t, this.z = n || 0;
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
i.fromMGRS = function (e) {
  return new i((0, forward.toPoint)(e));
}, i.prototype.toMGRS = function (e) {
  return (0, forward.forward)([this.x, this.y], e);
}, defaultExport = i;
export { defaultExport as default };
