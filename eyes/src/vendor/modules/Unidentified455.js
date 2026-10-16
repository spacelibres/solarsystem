/** @eyes-analysis
 * 文件职责：实现 removeClasses；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1640827-1641000.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1640827-1641000.
function r() {
  const {
    $el: $el,
    classNames: classNames
  } = this;
  $el.removeClass(classNames.join(" ")), this.emitContainerClasses();
}
export { r as default };
