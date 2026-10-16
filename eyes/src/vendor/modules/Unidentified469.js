/** @eyes-analysis
 * 文件职责：Swiper 的 Scrollbar 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1665577-1670189.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1665577-1670189.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
import * as Unidentified466 from "./Unidentified466.js";
function o({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  const c = (0, extend.getDocument)();
  let l,
    u,
    d,
    h,
    p = !1,
    f = null,
    m = null;
  function M() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
        scrollbar: scrollbar,
        rtlTranslate: rtlTranslate,
        progress: progress
      } = swiper,
      {
        $dragEl: $dragEl,
        $el: $el
      } = scrollbar,
      s = swiper.params.scrollbar;
    let o = u,
      c = (d - u) * progress;
    rtlTranslate ? (c = -c, c > 0 ? (o = u - c, c = 0) : -c + u > d && (o = d + c)) : c < 0 ? (o = u + c, c = 0) : c + u > d && (o = d - c), swiper.isHorizontal() ? ($dragEl.transform(`translate3d(${c}px, 0, 0)`), $dragEl[0].style.width = `${o}px`) : ($dragEl.transform(`translate3d(0px, ${c}px, 0)`), $dragEl[0].style.height = `${o}px`), s.hide && (clearTimeout(f), $el[0].style.opacity = 1, f = setTimeout(() => {
      $el[0].style.opacity = 0, $el.transition(400);
    }, 1e3));
  }
  function _() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
        scrollbar: scrollbar
      } = swiper,
      {
        $dragEl: $dragEl,
        $el: $el
      } = scrollbar;
    $dragEl[0].style.width = "", $dragEl[0].style.height = "", d = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight, h = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0)), u = "auto" === swiper.params.scrollbar.dragSize ? d * h : parseInt(swiper.params.scrollbar.dragSize, 10), swiper.isHorizontal() ? $dragEl[0].style.width = `${u}px` : $dragEl[0].style.height = `${u}px`, $el[0].style.display = h >= 1 ? "none" : "", swiper.params.scrollbar.hide && ($el[0].style.opacity = 0), swiper.params.watchOverflow && swiper.enabled && scrollbar.$el[swiper.isLocked ? "addClass" : "removeClass"](swiper.params.scrollbar.lockClass);
  }
  function A(t) {
    return swiper.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientX : t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientY : t.clientY;
  }
  function g(t) {
    const {
        scrollbar: scrollbar,
        rtlTranslate: rtlTranslate
      } = swiper,
      {
        $el: $el
      } = scrollbar;
    let a;
    a = (A(t) - $el.offset()[swiper.isHorizontal() ? "left" : "top"] - (null !== l ? l : u / 2)) / (d - u), a = Math.max(Math.min(a, 1), 0), rtlTranslate && (a = 1 - a);
    const s = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * a;
    swiper.updateProgress(s), swiper.setTranslate(s), swiper.updateActiveIndex(), swiper.updateSlidesClasses();
  }
  function b(t) {
    const n = swiper.params.scrollbar,
      {
        scrollbar: scrollbar,
        $wrapperEl: $wrapperEl
      } = swiper,
      {
        $el: $el,
        $dragEl: $dragEl
      } = scrollbar;
    p = !0, l = t.target === $dragEl[0] || t.target === $dragEl ? A(t) - t.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), $wrapperEl.transition(100), $dragEl.transition(100), g(t), clearTimeout(m), $el.transition(0), n.hide && $el.css("opacity", 1), swiper.params.cssMode && swiper.$wrapperEl.css("scroll-snap-type", "none"), emit("scrollbarDragStart", t);
  }
  function y(t) {
    const {
        scrollbar: scrollbar,
        $wrapperEl: $wrapperEl
      } = swiper,
      {
        $el: $el,
        $dragEl: $dragEl
      } = scrollbar;
    p && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, g(t), $wrapperEl.transition(0), $el.transition(0), $dragEl.transition(0), emit("scrollbarDragMove", t));
  }
  function L(t) {
    const n = swiper.params.scrollbar,
      {
        scrollbar: scrollbar,
        $wrapperEl: $wrapperEl
      } = swiper,
      {
        $el: $el
      } = scrollbar;
    p && (p = !1, swiper.params.cssMode && (swiper.$wrapperEl.css("scroll-snap-type", ""), $wrapperEl.transition("")), n.hide && (clearTimeout(m), m = (0, animateCSSModeScroll.nextTick)(() => {
      $el.css("opacity", 0), $el.transition(400);
    }, 1e3)), emit("scrollbarDragEnd", t), n.snapOnRelease && swiper.slideToClosest());
  }
  function v(t) {
    const {
        scrollbar: scrollbar,
        touchEventsTouch: touchEventsTouch,
        touchEventsDesktop: touchEventsDesktop,
        params: params,
        support: support
      } = swiper,
      o = scrollbar.$el[0],
      l = !(!support.passiveListener || !params.passiveListeners) && {
        passive: !1,
        capture: !1
      },
      u = !(!support.passiveListener || !params.passiveListeners) && {
        passive: !0,
        capture: !1
      };
    if (!o) return;
    const d = "on" === t ? "addEventListener" : "removeEventListener";
    support.touch ? (o[d](touchEventsTouch.start, b, l), o[d](touchEventsTouch.move, y, l), o[d](touchEventsTouch.end, L, u)) : (o[d](touchEventsDesktop.start, b, l), c[d](touchEventsDesktop.move, y, l), c[d](touchEventsDesktop.end, L, u));
  }
  function T() {
    const {
      scrollbar: scrollbar,
      $el: $el
    } = swiper;
    swiper.params.scrollbar = (0, Unidentified466.default)(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: "swiper-scrollbar"
    });
    const r = swiper.params.scrollbar;
    if (!r.el) return;
    let a = (0, Dom7Entry.default)(r.el);
    swiper.params.uniqueNavElements && "string" == typeof r.el && a.length > 1 && 1 === $el.find(r.el).length && (a = $el.find(r.el));
    let o = a.find(`.${swiper.params.scrollbar.dragClass}`);
    0 === o.length && (o = (0, Dom7Entry.default)(`<div class="${swiper.params.scrollbar.dragClass}"></div>`), a.append(o)), Object.assign(scrollbar, {
      $el: a,
      el: a[0],
      $dragEl: o,
      dragEl: o[0]
    }), r.draggable && swiper.params.scrollbar.el && v("on"), a && a[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
  }
  function S() {
    swiper.params.scrollbar.el && v("off");
  }
  extendParams({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag"
    }
  }), swiper.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null
  }, on("init", () => {
    T(), _(), M();
  }), on("update resize observerUpdate lock unlock", () => {
    _();
  }), on("setTranslate", () => {
    M();
  }), on("setTransition", (t, n) => {
    !function (t) {
      swiper.params.scrollbar.el && swiper.scrollbar.el && swiper.scrollbar.$dragEl.transition(t);
    }(n);
  }), on("enable disable", () => {
    const {
      $el: $el
    } = swiper.scrollbar;
    $el && $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
  }), on("destroy", () => {
    S();
  }), Object.assign(swiper.scrollbar, {
    updateSize: _,
    setTranslate: M,
    init: T,
    destroy: S
  });
}
export { o as default };
