/** @eyes-analysis
 * 文件职责：将类名转换为选择器并转义特殊标点
 * 依据：// Recovered from vendors.js:1665416-1665576.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1665416-1665576.
function r(e = "") {
  return `.${e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
}
export { r as default };
