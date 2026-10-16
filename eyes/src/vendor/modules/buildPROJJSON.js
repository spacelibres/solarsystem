/** @eyes-analysis
 * 文件职责：提供 buildPROJJSON；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1736923-1737265.；exports: buildPROJJSON
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1736923-1737265.
import * as PROJJSONBuilder2015 from "./PROJJSONBuilder2015.js";
import * as PROJJSONBuilder2019 from "./PROJJSONBuilder2019.js";
function buildPROJJSON(e) {
  const t = function (e) {
    return e.find(e => Array.isArray(e) && "USAGE" === e[0]) ? "2019" : (e.find(e => Array.isArray(e) && "CS" === e[0]) || "BOUNDCRS" === e[0] || "PROJCRS" === e[0] || e[0], "2015");
  }(e);
  return ("2019" === t ? PROJJSONBuilder2019.default : PROJJSONBuilder2015.default).convert(e);
}
export { buildPROJJSON };
