// Recovered from vendors.js:1648807-1650802.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  const s = (0, extend.getDocument)(),
    o = (0, extend.getWindow)();
  function c(t) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtlTranslate
    } = swiper;
    let r = t;
    r.originalEvent && (r = r.originalEvent);
    const i = r.keyCode || r.charCode,
      c = swiper.params.keyboard.pageUpDown,
      l = c && 33 === i,
      u = c && 34 === i,
      d = 37 === i,
      h = 39 === i,
      p = 38 === i,
      f = 40 === i;
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && h || swiper.isVertical() && f || u)) return !1;
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && d || swiper.isVertical() && p || l)) return !1;
    if (!(r.shiftKey || r.altKey || r.ctrlKey || r.metaKey || s.activeElement && s.activeElement.nodeName && ("input" === s.activeElement.nodeName.toLowerCase() || "textarea" === s.activeElement.nodeName.toLowerCase()))) {
      if (swiper.params.keyboard.onlyInViewport && (l || u || d || h || p || f)) {
        let t = !1;
        if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && 0 === swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length) return;
        const r = swiper.$el,
          i = r[0].clientWidth,
          a = r[0].clientHeight,
          s = o.innerWidth,
          c = o.innerHeight,
          l = swiper.$el.offset();
        rtlTranslate && (l.left -= swiper.$el[0].scrollLeft);
        const u = [[l.left, l.top], [l.left + i, l.top], [l.left, l.top + a], [l.left + i, l.top + a]];
        for (let e = 0; e < u.length; e += 1) {
          const n = u[e];
          if (n[0] >= 0 && n[0] <= s && n[1] >= 0 && n[1] <= c) {
            if (0 === n[0] && 0 === n[1]) continue;
            t = !0;
          }
        }
        if (!t) return;
      }
      swiper.isHorizontal() ? ((l || u || d || h) && (r.preventDefault ? r.preventDefault() : r.returnValue = !1), ((u || h) && !rtlTranslate || (l || d) && rtlTranslate) && swiper.slideNext(), ((l || d) && !rtlTranslate || (u || h) && rtlTranslate) && swiper.slidePrev()) : ((l || u || p || f) && (r.preventDefault ? r.preventDefault() : r.returnValue = !1), (u || f) && swiper.slideNext(), (l || p) && swiper.slidePrev()), emit("keyPress", i);
    }
  }
  function l() {
    swiper.keyboard.enabled || ((0, Dom7Entry.default)(s).on("keydown", c), swiper.keyboard.enabled = !0);
  }
  function u() {
    swiper.keyboard.enabled && ((0, Dom7Entry.default)(s).off("keydown", c), swiper.keyboard.enabled = !1);
  }
  swiper.keyboard = {
    enabled: !1
  }, extendParams({
    keyboard: {
      enabled: !1,
      onlyInViewport: !0,
      pageUpDown: !0
    }
  }), on("init", () => {
    swiper.params.keyboard.enabled && l();
  }), on("destroy", () => {
    swiper.keyboard.enabled && u();
  }), Object.assign(swiper.keyboard, {
    enable: l,
    disable: u
  });
}
export { a as default };
