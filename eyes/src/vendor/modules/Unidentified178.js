/** @eyes-analysis
 * 文件职责：Popper 浮层定位：根据 Safari UA 判断视口偏移策略
 * 依据：// Recovered from vendors.js:1087189-1087352.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1087189-1087352.
import * as Unidentified179 from "./Unidentified179.js";
function i() {
  return !/^((?!chrome|android).)*safari/i.test((0, Unidentified179.default)());
}
export { i as default };
