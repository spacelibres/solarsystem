// Recovered from vendors.js:1682813-1687421.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  extendParams({
    lazy: {
      checkInView: !1,
      enabled: !1,
      loadPrevNext: !1,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: !1,
      scrollingElement: "",
      elementClass: "swiper-lazy",
      loadingClass: "swiper-lazy-loading",
      loadedClass: "swiper-lazy-loaded",
      preloaderClass: "swiper-lazy-preloader"
    }
  }), swiper.lazy = {};
  let s = !1,
    o = !1;
  function c(t, n = !0) {
    const r = swiper.params.lazy;
    if (void 0 === t) return;
    if (0 === swiper.slides.length) return;
    const s = swiper.virtual && swiper.params.virtual.enabled ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${t}"]`) : swiper.slides.eq(t),
      o = s.find(`.${r.elementClass}:not(.${r.loadedClass}):not(.${r.loadingClass})`);
    !s.hasClass(r.elementClass) || s.hasClass(r.loadedClass) || s.hasClass(r.loadingClass) || o.push(s[0]), 0 !== o.length && o.each(t => {
      const o = (0, Dom7Entry.default)(t);
      o.addClass(r.loadingClass);
      const l = o.attr("data-background"),
        u = o.attr("data-src"),
        d = o.attr("data-srcset"),
        h = o.attr("data-sizes"),
        p = o.parent("picture");
      swiper.loadImage(o[0], u || l, d, h, !1, () => {
        if (null != swiper && swiper && (!swiper || swiper.params) && !swiper.destroyed) {
          if (l ? (o.css("background-image", `url("${l}")`), o.removeAttr("data-background")) : (d && (o.attr("srcset", d), o.removeAttr("data-srcset")), h && (o.attr("sizes", h), o.removeAttr("data-sizes")), p.length && p.children("source").each(e => {
            const t = (0, Dom7Entry.default)(e);
            t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"));
          }), u && (o.attr("src", u), o.removeAttr("data-src"))), o.addClass(r.loadedClass).removeClass(r.loadingClass), s.find(`.${r.preloaderClass}`).remove(), swiper.params.loop && n) {
            const t = s.attr("data-swiper-slide-index");
            if (s.hasClass(swiper.params.slideDuplicateClass)) {
              c(swiper.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${swiper.params.slideDuplicateClass})`).index(), !1);
            } else {
              c(swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(), !1);
            }
          }
          emit("lazyImageReady", s[0], o[0]), swiper.params.autoHeight && swiper.updateAutoHeight();
        }
      }), emit("lazyImageLoad", s[0], o[0]);
    });
  }
  function l() {
    const {
        $wrapperEl: $wrapperEl,
        params: params,
        slides: slides,
        activeIndex: activeIndex
      } = swiper,
      s = swiper.virtual && params.virtual.enabled,
      l = params.lazy;
    let u = params.slidesPerView;
    function d(e) {
      if (s) {
        if ($wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0;
      } else if (slides[e]) return !0;
      return !1;
    }
    function h(e) {
      return s ? (0, Dom7Entry.default)(e).attr("data-swiper-slide-index") : (0, Dom7Entry.default)(e).index();
    }
    if ("auto" === u && (u = 0), o || (o = !0), swiper.params.watchSlidesProgress) $wrapperEl.children(`.${params.slideVisibleClass}`).each(e => {
      c(s ? (0, Dom7Entry.default)(e).attr("data-swiper-slide-index") : (0, Dom7Entry.default)(e).index());
    });else if (u > 1) for (let e = activeIndex; e < activeIndex + u; e += 1) d(e) && c(e);else c(activeIndex);
    if (l.loadPrevNext) if (u > 1 || l.loadPrevNextAmount && l.loadPrevNextAmount > 1) {
      const e = l.loadPrevNextAmount,
        t = u,
        n = Math.min(activeIndex + t + Math.max(e, t), slides.length),
        i = Math.max(activeIndex - Math.max(t, e), 0);
      for (let e = activeIndex + u; e < n; e += 1) d(e) && c(e);
      for (let e = i; e < activeIndex; e += 1) d(e) && c(e);
    } else {
      const e = $wrapperEl.children(`.${params.slideNextClass}`);
      e.length > 0 && c(h(e));
      const r = $wrapperEl.children(`.${params.slidePrevClass}`);
      r.length > 0 && c(h(r));
    }
  }
  function u() {
    const t = (0, extend.getWindow)();
    if (!swiper || swiper.destroyed) return;
    const n = swiper.params.lazy.scrollingElement ? (0, Dom7Entry.default)(swiper.params.lazy.scrollingElement) : (0, Dom7Entry.default)(t),
      a = n[0] === t,
      o = a ? t.innerWidth : n[0].offsetWidth,
      c = a ? t.innerHeight : n[0].offsetHeight,
      d = swiper.$el.offset(),
      {
        rtlTranslate: rtlTranslate
      } = swiper;
    let p = !1;
    rtlTranslate && (d.left -= swiper.$el[0].scrollLeft);
    const f = [[d.left, d.top], [d.left + swiper.width, d.top], [d.left, d.top + swiper.height], [d.left + swiper.width, d.top + swiper.height]];
    for (let e = 0; e < f.length; e += 1) {
      const t = f[e];
      if (t[0] >= 0 && t[0] <= o && t[1] >= 0 && t[1] <= c) {
        if (0 === t[0] && 0 === t[1]) continue;
        p = !0;
      }
    }
    const m = !("touchstart" !== swiper.touchEvents.start || !swiper.support.passiveListener || !swiper.params.passiveListeners) && {
      passive: !0,
      capture: !1
    };
    p ? (l(), n.off("scroll", u, m)) : s || (s = !0, n.on("scroll", u, m));
  }
  on("beforeInit", () => {
    swiper.params.lazy.enabled && swiper.params.preloadImages && (swiper.params.preloadImages = !1);
  }), on("init", () => {
    swiper.params.lazy.enabled && (swiper.params.lazy.checkInView ? u() : l());
  }), on("scroll", () => {
    swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky && l();
  }), on("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
    swiper.params.lazy.enabled && (swiper.params.lazy.checkInView ? u() : l());
  }), on("transitionStart", () => {
    swiper.params.lazy.enabled && (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !o) && (swiper.params.lazy.checkInView ? u() : l());
  }), on("transitionEnd", () => {
    swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart && (swiper.params.lazy.checkInView ? u() : l());
  }), on("slideChange", () => {
    const {
      lazy: lazy,
      cssMode: cssMode,
      watchSlidesProgress: watchSlidesProgress,
      touchReleaseOnEdges: touchReleaseOnEdges,
      resistanceRatio: resistanceRatio
    } = swiper.params;
    lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || 0 === resistanceRatio)) && l();
  }), Object.assign(swiper.lazy, {
    load: l,
    loadInSlide: c
  });
}
export { a as default };
