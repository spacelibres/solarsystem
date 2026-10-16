/** @eyes-analysis
 * 文件职责：扩展模块默认参数，并规范化 enabled/auto/navigation 等输入
 * 依据：// Recovered from vendors.js:1644451-1644919.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1644451-1644919.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i(e, t) {
  return function (n = {}) {
    const i = Object.keys(n)[0],
      a = n[i];
    "object" == typeof a && null !== a ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
      auto: !0
    }), i in e && "enabled" in a ? (!0 === e[i] && (e[i] = {
      enabled: !0
    }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
      enabled: !1
    }), (0, animateCSSModeScroll.extend)(t, n)) : (0, animateCSSModeScroll.extend)(t, n)) : (0, animateCSSModeScroll.extend)(t, n);
  };
}
export { i as default };
