/** @eyes-analysis
 * 文件职责：选择效果 transformEl 并隐藏背面，否则返回原滑片
 * 依据：// Recovered from vendors.js:1711706-1711918.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1711706-1711918.
function r(e, t) {
  return e.transformEl ? t.find(e.transformEl).css({
    "backface-visibility": "hidden",
    "-webkit-backface-visibility": "hidden"
  }) : t;
}
export { r as default };
