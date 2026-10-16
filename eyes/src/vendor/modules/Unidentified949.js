/** @eyes-analysis
 * 文件职责：Popper 浮层定位：递归收集滚动祖先及 window/visualViewport
 * 依据：// Recovered from vendors.js:2383376-2383738.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2383376-2383738.
import * as Unidentified950 from "./Unidentified950.js";
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified933 from "./Unidentified933.js";
import * as Unidentified946 from "./Unidentified946.js";
function o(e, t) {
  var n;
  void 0 === t && (t = []);
  var c = (0, Unidentified950.default)(e),
    l = c === (null == (n = e.ownerDocument) ? void 0 : n.body),
    u = (0, Unidentified933.default)(c),
    d = l ? [u].concat(u.visualViewport || [], (0, Unidentified946.default)(c) ? c : []) : c,
    h = t.concat(d);
  return l ? h : h.concat(o((0, Unidentified951.default)(d)));
}
export { o as default };
