/** @eyes-analysis
 * 文件职责：兼容数组、对象、逗号字符串的旧 proj4.Point 接口
 * 依据：// Recovered from vendors.js:1790555-1791171.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
