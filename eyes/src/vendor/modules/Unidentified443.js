/** @eyes-analysis
 * 文件职责：实现 events；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1627181-1628495.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1627181-1628495.
import * as extend from "./extend.js";
import * as Unidentified444 from "./Unidentified444.js";
import * as Unidentified445 from "./Unidentified445.js";
import * as Unidentified446 from "./Unidentified446.js";
import * as Unidentified447 from "./Unidentified447.js";
import * as Unidentified448 from "./Unidentified448.js";
import * as Unidentified449 from "./Unidentified449.js";
let defaultExport;
let u = !1;
function d() {}
const h = (e, t) => {
  const n = (0, extend.getDocument)(),
    {
      params: params,
      touchEvents: touchEvents,
      el: el,
      wrapperEl: wrapperEl,
      device: device,
      support: support
    } = e,
    d = !!params.nested,
    h = "on" === t ? "addEventListener" : "removeEventListener",
    p = t;
  if (support.touch) {
    const t = !("touchstart" !== touchEvents.start || !support.passiveListener || !params.passiveListeners) && {
      passive: !0,
      capture: !1
    };
    el[h](touchEvents.start, e.onTouchStart, t), el[h](touchEvents.move, e.onTouchMove, support.passiveListener ? {
      passive: !1,
      capture: d
    } : d), el[h](touchEvents.end, e.onTouchEnd, t), touchEvents.cancel && el[h](touchEvents.cancel, e.onTouchEnd, t);
  } else el[h](touchEvents.start, e.onTouchStart, !1), n[h](touchEvents.move, e.onTouchMove, d), n[h](touchEvents.end, e.onTouchEnd, !1);
  (params.preventClicks || params.preventClicksPropagation) && el[h]("click", e.onClick, !0), params.cssMode && wrapperEl[h]("scroll", e.onScroll), params.updateOnWindowResize ? e[p](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Unidentified447.default, !0) : e[p]("observerUpdate", Unidentified447.default, !0);
};
defaultExport = {
  attachEvents: function () {
    const e = this,
      t = (0, extend.getDocument)(),
      {
        params: params,
        support: support
      } = e;
    e.onTouchStart = Unidentified444.default.bind(e), e.onTouchMove = Unidentified445.default.bind(e), e.onTouchEnd = Unidentified446.default.bind(e), params.cssMode && (e.onScroll = Unidentified449.default.bind(e)), e.onClick = Unidentified448.default.bind(e), support.touch && !u && (t.addEventListener("touchstart", d), u = !0), h(e, "on");
  },
  detachEvents: function () {
    h(this, "off");
  }
};
export { defaultExport as default };
