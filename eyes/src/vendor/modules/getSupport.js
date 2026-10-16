/** @eyes-analysis
 * 文件职责：提供 getSupport；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1597721-1598267.；exports: getSupport
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1597721-1598267.
import * as extend from "./extend.js";
let i;
function getSupport() {
  return i || (i = function () {
    const e = (0, extend.getWindow)(),
      t = (0, extend.getDocument)();
    return {
      smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
      touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
      passiveListener: function () {
        let t = !1;
        try {
          const n = Object.defineProperty({}, "passive", {
            get() {
              t = !0;
            }
          });
          e.addEventListener("testPassiveListener", null, n);
        } catch (e) {}
        return t;
      }(),
      gestures: "ongesturestart" in e
    };
  }()), i;
}
export { getSupport };
