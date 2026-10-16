/** @eyes-analysis
 * 文件职责：Swiper 的 Virtual 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1644920-1648806.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1644920-1648806.
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  let a;
  function s(t, n) {
    const i = swiper.params.virtual;
    if (i.cache && swiper.virtual.cache[n]) return swiper.virtual.cache[n];
    const a = i.renderSlide ? (0, Dom7Entry.default)(i.renderSlide.call(swiper, t, n)) : (0, Dom7Entry.default)(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${n}">${t}</div>`);
    return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", n), i.cache && (swiper.virtual.cache[n] = a), a;
  }
  function o(t) {
    const {
        slidesPerView: slidesPerView,
        slidesPerGroup: slidesPerGroup,
        centeredSlides: centeredSlides
      } = swiper.params,
      {
        addSlidesBefore: addSlidesBefore,
        addSlidesAfter: addSlidesAfter
      } = swiper.params.virtual,
      {
        from: from,
        to: to,
        slides: slides,
        slidesGrid: slidesGrid,
        offset: offset
      } = swiper.virtual;
    swiper.params.cssMode || swiper.updateActiveIndex();
    const p = swiper.activeIndex || 0;
    let f, m, M;
    f = swiper.rtlTranslate ? "right" : swiper.isHorizontal() ? "left" : "top", centeredSlides ? (m = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter, M = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore) : (m = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter, M = slidesPerGroup + addSlidesBefore);
    const _ = Math.max((p || 0) - M, 0),
      A = Math.min((p || 0) + m, slides.length - 1),
      g = (swiper.slidesGrid[_] || 0) - (swiper.slidesGrid[0] || 0);
    function b() {
      swiper.updateSlides(), swiper.updateProgress(), swiper.updateSlidesClasses(), swiper.lazy && swiper.params.lazy.enabled && swiper.lazy.load();
    }
    if (Object.assign(swiper.virtual, {
      from: _,
      to: A,
      offset: g,
      slidesGrid: swiper.slidesGrid
    }), from === _ && to === A && !t) return swiper.slidesGrid !== slidesGrid && g !== offset && swiper.slides.css(f, `${g}px`), void swiper.updateProgress();
    if (swiper.params.virtual.renderExternal) return swiper.params.virtual.renderExternal.call(swiper, {
      offset: g,
      from: _,
      to: A,
      slides: function () {
        const e = [];
        for (let t = _; t <= A; t += 1) e.push(slides[t]);
        return e;
      }()
    }), void (swiper.params.virtual.renderExternalUpdate && b());
    const y = [],
      L = [];
    if (t) swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();else for (let t = from; t <= to; t += 1) (t < _ || t > A) && swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();
    for (let e = 0; e < slides.length; e += 1) e >= _ && e <= A && (void 0 === to || t ? L.push(e) : (e > to && L.push(e), e < from && y.push(e)));
    L.forEach(t => {
      swiper.$wrapperEl.append(s(slides[t], t));
    }), y.sort((e, t) => t - e).forEach(t => {
      swiper.$wrapperEl.prepend(s(slides[t], t));
    }), swiper.$wrapperEl.children(".swiper-slide").css(f, `${g}px`), b();
  }
  extendParams({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  }), swiper.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: []
  }, on("beforeInit", () => {
    swiper.params.virtual.enabled && (swiper.virtual.slides = swiper.params.virtual.slides, swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`), swiper.params.watchSlidesProgress = !0, swiper.originalParams.watchSlidesProgress = !0, swiper.params.initialSlide || o());
  }), on("setTranslate", () => {
    swiper.params.virtual.enabled && (swiper.params.cssMode && !swiper._immediateVirtual ? (clearTimeout(a), a = setTimeout(() => {
      o();
    }, 100)) : o());
  }), on("init update resize", () => {
    swiper.params.virtual.enabled && swiper.params.cssMode && (0, animateCSSModeScroll.setCSSProperty)(swiper.wrapperEl, "--swiper-virtual-size", `${swiper.virtualSize}px`);
  }), Object.assign(swiper.virtual, {
    appendSlide: function (t) {
      if ("object" == typeof t && "length" in t) for (let n = 0; n < t.length; n += 1) t[n] && swiper.virtual.slides.push(t[n]);else swiper.virtual.slides.push(t);
      o(!0);
    },
    prependSlide: function (t) {
      const n = swiper.activeIndex;
      let r = n + 1,
        i = 1;
      if (Array.isArray(t)) {
        for (let n = 0; n < t.length; n += 1) t[n] && swiper.virtual.slides.unshift(t[n]);
        r = n + t.length, i = t.length;
      } else swiper.virtual.slides.unshift(t);
      if (swiper.params.virtual.cache) {
        const t = swiper.virtual.cache,
          n = {};
        Object.keys(t).forEach(e => {
          const r = t[e],
            a = r.attr("data-swiper-slide-index");
          a && r.attr("data-swiper-slide-index", parseInt(a, 10) + i), n[parseInt(e, 10) + i] = r;
        }), swiper.virtual.cache = n;
      }
      o(!0), swiper.slideTo(r, 0);
    },
    removeSlide: function (t) {
      if (null == t) return;
      let n = swiper.activeIndex;
      if (Array.isArray(t)) for (let r = t.length - 1; r >= 0; r -= 1) swiper.virtual.slides.splice(t[r], 1), swiper.params.virtual.cache && delete swiper.virtual.cache[t[r]], t[r] < n && (n -= 1), n = Math.max(n, 0);else swiper.virtual.slides.splice(t, 1), swiper.params.virtual.cache && delete swiper.virtual.cache[t], t < n && (n -= 1), n = Math.max(n, 0);
      o(!0), swiper.slideTo(n, 0);
    },
    removeAllSlides: function () {
      swiper.virtual.slides = [], swiper.params.virtual.cache && (swiper.virtual.cache = {}), o(!0), swiper.slideTo(0, 0);
    },
    update: o
  });
}
export { a as default };
