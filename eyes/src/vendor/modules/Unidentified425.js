// Recovered from vendors.js:1617108-1617355.
import * as Unidentified426 from "./Unidentified426.js";
function i(e = !0, t) {
  const n = this,
    {
      params: params
    } = n;
  params.cssMode || (params.autoHeight && n.updateAutoHeight(), (0, Unidentified426.default)({
    swiper: n,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
export { i as default };
