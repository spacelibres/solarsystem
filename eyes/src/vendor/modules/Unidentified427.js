// Recovered from vendors.js:1617788-1618032.
import * as Unidentified426 from "./Unidentified426.js";
function i(e = !0, t) {
  const n = this,
    {
      params: params
    } = n;
  n.animating = !1, params.cssMode || (n.setTransition(0), (0, Unidentified426.default)({
    swiper: n,
    runCallbacks: e,
    direction: t,
    step: "End"
  }));
}
export { i as default };
