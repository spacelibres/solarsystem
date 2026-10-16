/** @eyes-analysis
 * 文件职责：注册和读取 EPSG、ESRI、IAU2000 等命名坐标定义
 * 依据：// Recovered from vendors.js:1726729-1727388.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1726729-1727388.
import * as Unidentified590 from "./Unidentified590.js";
import * as Unidentified591 from "./Unidentified591.js";
import * as Unidentified596 from "./Unidentified596.js";
let defaultExport;
function s(e) {
  var t = this;
  if (2 === arguments.length) {
    var n = arguments[1];
    "string" == typeof n ? "+" === n.charAt(0) ? s[e] = (0, Unidentified591.default)(arguments[1]) : s[e] = (0, Unidentified596.default)(arguments[1]) : n && "object" == typeof n && !("projName" in n) ? s[e] = (0, Unidentified596.default)(arguments[1]) : (s[e] = n, n || delete s[e]);
  } else if (1 === arguments.length) {
    if (Array.isArray(e)) return e.map(function (e) {
      return Array.isArray(e) ? s.apply(t, e) : s(e);
    });
    if ("string" == typeof e) {
      if (e in s) return s[e];
    } else "EPSG" in e ? s["EPSG:" + e.EPSG] = e : "ESRI" in e ? s["ESRI:" + e.ESRI] = e : "IAU2000" in e ? s["IAU2000:" + e.IAU2000] = e : console.log(e);
    return;
  }
}
(0, Unidentified590.default)(s), defaultExport = s;
export { defaultExport as default };
