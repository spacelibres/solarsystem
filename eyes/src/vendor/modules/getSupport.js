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
