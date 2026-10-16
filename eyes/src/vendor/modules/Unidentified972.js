// Recovered from vendors.js:2393504-2393786.
import * as Unidentified964 from "./Unidentified964.js";
let defaultExport;
defaultExport = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: function (e) {
    var t = e.state,
      n = e.name;
    t.modifiersData[n] = (0, Unidentified964.default)({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement
    });
  },
  data: {}
};
export { defaultExport as default };
