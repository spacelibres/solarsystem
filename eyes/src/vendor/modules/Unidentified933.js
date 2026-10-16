/** @eyes-analysis
 * 文件职责：Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入
 * 依据：// Recovered from vendors.js:2376505-2376718.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2376505-2376718.
function r(e) {
  if (null == e) return window;
  if ("[object Window]" !== e.toString()) {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
export { r as default };
