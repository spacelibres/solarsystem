/** @eyes-analysis
 * 文件职责：Popper 浮层定位：取得元素 scrollLeft/scrollTop
 * 依据：// Recovered from vendors.js:2382201-2382343.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2382201-2382343.
function r(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
export { r as default };
