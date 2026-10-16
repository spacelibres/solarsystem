/** @eyes-analysis
 * 文件职责：拖动或动画期间按配置阻止点击默认行为及传播
 * 依据：// Recovered from vendors.js:1637170-1637442.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1637170-1637442.
function r(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
export { r as default };
