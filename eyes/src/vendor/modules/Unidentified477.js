/** @eyes-analysis
 * 文件职责：Swiper 的 Autoplay 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1697156-1700125.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1697156-1700125.
import * as extend from "./extend.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  let s;
  function o() {
    const t = swiper.slides.eq(swiper.activeIndex);
    let n = swiper.params.autoplay.delay;
    t.attr("data-swiper-autoplay") && (n = t.attr("data-swiper-autoplay") || swiper.params.autoplay.delay), clearTimeout(s), s = (0, animateCSSModeScroll.nextTick)(() => {
      let t;
      swiper.params.autoplay.reverseDirection ? swiper.params.loop ? (swiper.loopFix(), t = swiper.slidePrev(swiper.params.speed, !0, !0), emit("autoplay")) : swiper.isBeginning ? swiper.params.autoplay.stopOnLastSlide ? l() : (t = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, !0, !0), emit("autoplay")) : (t = swiper.slidePrev(swiper.params.speed, !0, !0), emit("autoplay")) : swiper.params.loop ? (swiper.loopFix(), t = swiper.slideNext(swiper.params.speed, !0, !0), emit("autoplay")) : swiper.isEnd ? swiper.params.autoplay.stopOnLastSlide ? l() : (t = swiper.slideTo(0, swiper.params.speed, !0, !0), emit("autoplay")) : (t = swiper.slideNext(swiper.params.speed, !0, !0), emit("autoplay")), (swiper.params.cssMode && swiper.autoplay.running || !1 === t) && o();
    }, n);
  }
  function c() {
    return void 0 === s && !swiper.autoplay.running && (swiper.autoplay.running = !0, emit("autoplayStart"), o(), !0);
  }
  function l() {
    return !!swiper.autoplay.running && void 0 !== s && (s && (clearTimeout(s), s = void 0), swiper.autoplay.running = !1, emit("autoplayStop"), !0);
  }
  function u(t) {
    swiper.autoplay.running && (swiper.autoplay.paused || (s && clearTimeout(s), swiper.autoplay.paused = !0, 0 !== t && swiper.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(t => {
      swiper.$wrapperEl[0].addEventListener(t, h);
    }) : (swiper.autoplay.paused = !1, o())));
  }
  function d() {
    const t = (0, extend.getDocument)();
    "hidden" === t.visibilityState && swiper.autoplay.running && u(), "visible" === t.visibilityState && swiper.autoplay.paused && (o(), swiper.autoplay.paused = !1);
  }
  function h(t) {
    swiper && !swiper.destroyed && swiper.$wrapperEl && t.target === swiper.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(t => {
      swiper.$wrapperEl[0].removeEventListener(t, h);
    }), swiper.autoplay.paused = !1, swiper.autoplay.running ? o() : l());
  }
  function p() {
    swiper.params.autoplay.disableOnInteraction ? l() : u(), ["transitionend", "webkitTransitionEnd"].forEach(t => {
      swiper.$wrapperEl[0].removeEventListener(t, h);
    });
  }
  function f() {
    swiper.params.autoplay.disableOnInteraction || (swiper.autoplay.paused = !1, o());
  }
  swiper.autoplay = {
    running: !1,
    paused: !1
  }, extendParams({
    autoplay: {
      enabled: !1,
      delay: 3e3,
      waitForTransition: !0,
      disableOnInteraction: !0,
      stopOnLastSlide: !1,
      reverseDirection: !1,
      pauseOnMouseEnter: !1
    }
  }), on("init", () => {
    if (swiper.params.autoplay.enabled) {
      c();
      (0, extend.getDocument)().addEventListener("visibilitychange", d), swiper.params.autoplay.pauseOnMouseEnter && (swiper.$el.on("mouseenter", p), swiper.$el.on("mouseleave", f));
    }
  }), on("beforeTransitionStart", (t, n, r) => {
    swiper.autoplay.running && (r || !swiper.params.autoplay.disableOnInteraction ? swiper.autoplay.pause(n) : l());
  }), on("sliderFirstMove", () => {
    swiper.autoplay.running && (swiper.params.autoplay.disableOnInteraction ? l() : u());
  }), on("touchEnd", () => {
    swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction && o();
  }), on("destroy", () => {
    swiper.$el.off("mouseenter", p), swiper.$el.off("mouseleave", f), swiper.autoplay.running && l();
    (0, extend.getDocument)().removeEventListener("visibilitychange", d);
  }), Object.assign(swiper.autoplay, {
    pause: u,
    run: o,
    start: c,
    stop: l
  });
}
export { a as default };
