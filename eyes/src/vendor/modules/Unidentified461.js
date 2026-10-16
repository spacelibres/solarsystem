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
