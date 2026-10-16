/** @eyes-analysis
 * 文件职责：提供 within、withinMaxClamp；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:2401745-2401968.；exports: within, withinMaxClamp
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2401745-2401968.
import * as max from "./max-938.js";
function within(e, t, n) {
  return (0, max.max)(e, (0, max.min)(t, n));
}
function withinMaxClamp(e, t, n) {
  var r = within(e, t, n);
  return r > n ? n : r;
}
export { within };
export { withinMaxClamp };
