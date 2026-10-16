/** @eyes-analysis
 * 文件职责：提供 add、get、getNormalizedProjName、start、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1752591-1753195.；exports: add, get, getNormalizedProjName, start, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1752591-1753195.
import * as forward from "./forward-608.js";
import * as forwardDependency from "./forward-614.js";
let defaultExport;
var a = [forward.default, forwardDependency.default],
  s = {},
  o = [];
function add(e, t) {
  var n = o.length;
  return e.names ? (o[n] = e, e.names.forEach(function (e) {
    s[e.toLowerCase()] = n;
  }), this) : (console.log(t), !0);
}
function getNormalizedProjName(e) {
  return e.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
function get(e) {
  if (!e) return !1;
  var t = e.toLowerCase();
  return void 0 !== s[t] && o[s[t]] || (t = getNormalizedProjName(t)) in s && o[s[t]] ? o[s[t]] : void 0;
}
function start() {
  a.forEach(add);
}
defaultExport = {
  start: start,
  add: add,
  get: get
};
export { add };
export { get };
export { getNormalizedProjName };
export { start };
export { defaultExport as default };
