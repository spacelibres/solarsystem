/** @eyes-analysis
 * 文件职责：Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断
 * 依据：// Recovered from vendors.js:2391021-2391300.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2391021-2391300.
import * as isElement from "./isElement-932.js";
function i(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && (0, isElement.isShadowRoot)(n)) {
    var i = t;
    do {
      if (i && e.isSameNode(i)) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
export { i as default };
