/** @eyes-analysis
 * 文件职责：Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标
 * 依据：// Recovered from vendors.js:1099309-1099591.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
