/** @eyes-analysis
 * 文件职责：Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left
 * 依据：// Recovered from vendors.js:1097106-1097278.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1097106-1097278.
function r(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
export { r as default };
