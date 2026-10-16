/** @eyes-analysis
 * 文件职责：实现 setGrabCursor；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1626505-1626929.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1626505-1626929.
function r(e) {
  const t = this;
  if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
  const n = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
  n.style.cursor = "move", n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", n.style.cursor = e ? "-moz-grabbin" : "-moz-grab", n.style.cursor = e ? "grabbing" : "grab";
}
export { r as default };
