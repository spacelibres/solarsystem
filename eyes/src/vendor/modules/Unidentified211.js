// Recovered from vendors.js:1099309-1099591.
import * as Unidentified203 from "./Unidentified203.js";
let defaultExport;
defaultExport = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: function (e) {
    var t = e.state,
      n = e.name;
    t.modifiersData[n] = (0, Unidentified203.default)({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement
    });
  },
  data: {}
};
export { defaultExport as default };
