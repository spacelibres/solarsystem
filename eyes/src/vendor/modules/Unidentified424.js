/** @eyes-analysis
 * 文件职责：实现 setTransition；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1616931-1617107.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1616931-1617107.
function r(e, t) {
  const n = this;
  n.params.cssMode || n.$wrapperEl.transition(e), n.emit("setTransition", e, t);
}
export { r as default };
