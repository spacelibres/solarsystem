// Recovered from vendors.js:1672148-1682812.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function s({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  const o = (0, extend.getWindow)();
  extendParams({
    zoom: {
      enabled: !1,
      maxRatio: 3,
      minRatio: 1,
      toggle: !0,
      containerClass: "swiper-zoom-container",
      zoomedSlideClass: "swiper-slide-zoomed"
    }
  }), swiper.zoom = {
    enabled: !1
  };
  let c,
    l,
    u,
    d = 1,
    h = !1;
  const p = {
      $slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      $imageEl: void 0,
      $imageWrapEl: void 0,
      maxRatio: 3
    },
    f = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {}
    },
    m = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0
    };
  let M = 1;
  function _(e) {
    if (e.targetTouches.length < 2) return 1;
    const t = e.targetTouches[0].pageX,
      n = e.targetTouches[0].pageY,
      r = e.targetTouches[1].pageX,
      i = e.targetTouches[1].pageY;
    return Math.sqrt((r - t) ** 2 + (i - n) ** 2);
  }
  function A(t) {
    const n = swiper.support,
      r = swiper.params.zoom;
    if (l = !1, u = !1, !n.gestures) {
      if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
      l = !0, p.scaleStart = _(t);
    }
    p.$slideEl && p.$slideEl.length || (p.$slideEl = (0, Dom7Entry.default)(t.target).closest(`.${swiper.params.slideClass}`), 0 === p.$slideEl.length && (p.$slideEl = swiper.slides.eq(swiper.activeIndex)), p.$imageEl = p.$slideEl.find(`.${r.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), p.$imageWrapEl = p.$imageEl.parent(`.${r.containerClass}`), p.maxRatio = p.$imageWrapEl.attr("data-swiper-zoom") || r.maxRatio, 0 !== p.$imageWrapEl.length) ? (p.$imageEl && p.$imageEl.transition(0), h = !0) : p.$imageEl = void 0;
  }
  function g(t) {
    const n = swiper.support,
      r = swiper.params.zoom,
      i = swiper.zoom;
    if (!n.gestures) {
      if ("touchmove" !== t.type || "touchmove" === t.type && t.targetTouches.length < 2) return;
      u = !0, p.scaleMove = _(t);
    }
    p.$imageEl && 0 !== p.$imageEl.length ? (n.gestures ? i.scale = t.scale * d : i.scale = p.scaleMove / p.scaleStart * d, i.scale > p.maxRatio && (i.scale = p.maxRatio - 1 + (i.scale - p.maxRatio + 1) ** .5), i.scale < r.minRatio && (i.scale = r.minRatio + 1 - (r.minRatio - i.scale + 1) ** .5), p.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === t.type && A(t);
  }
  function b(t) {
    const n = swiper.device,
      r = swiper.support,
      i = swiper.params.zoom,
      a = swiper.zoom;
    if (!r.gestures) {
      if (!l || !u) return;
      if ("touchend" !== t.type || "touchend" === t.type && t.changedTouches.length < 2 && !n.android) return;
      l = !1, u = !1;
    }
    p.$imageEl && 0 !== p.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, p.maxRatio), i.minRatio), p.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${a.scale})`), d = a.scale, h = !1, 1 === a.scale && (p.$slideEl = void 0));
  }
  function y(t) {
    const n = swiper.zoom;
    if (!p.$imageEl || 0 === p.$imageEl.length) return;
    if (swiper.allowClick = !1, !f.isTouched || !p.$slideEl) return;
    f.isMoved || (f.width = p.$imageEl[0].offsetWidth, f.height = p.$imageEl[0].offsetHeight, f.startX = (0, animateCSSModeScroll.getTranslate)(p.$imageWrapEl[0], "x") || 0, f.startY = (0, animateCSSModeScroll.getTranslate)(p.$imageWrapEl[0], "y") || 0, p.slideWidth = p.$slideEl[0].offsetWidth, p.slideHeight = p.$slideEl[0].offsetHeight, p.$imageWrapEl.transition(0));
    const r = f.width * n.scale,
      i = f.height * n.scale;
    if (!(r < p.slideWidth && i < p.slideHeight)) {
      if (f.minX = Math.min(p.slideWidth / 2 - r / 2, 0), f.maxX = -f.minX, f.minY = Math.min(p.slideHeight / 2 - i / 2, 0), f.maxY = -f.minY, f.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, f.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, !f.isMoved && !h) {
        if (swiper.isHorizontal() && (Math.floor(f.minX) === Math.floor(f.startX) && f.touchesCurrent.x < f.touchesStart.x || Math.floor(f.maxX) === Math.floor(f.startX) && f.touchesCurrent.x > f.touchesStart.x)) return void (f.isTouched = !1);
        if (!swiper.isHorizontal() && (Math.floor(f.minY) === Math.floor(f.startY) && f.touchesCurrent.y < f.touchesStart.y || Math.floor(f.maxY) === Math.floor(f.startY) && f.touchesCurrent.y > f.touchesStart.y)) return void (f.isTouched = !1);
      }
      t.cancelable && t.preventDefault(), t.stopPropagation(), f.isMoved = !0, f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX, f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY, f.currentX < f.minX && (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** .8), f.currentX > f.maxX && (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** .8), f.currentY < f.minY && (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** .8), f.currentY > f.maxY && (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** .8), m.prevPositionX || (m.prevPositionX = f.touchesCurrent.x), m.prevPositionY || (m.prevPositionY = f.touchesCurrent.y), m.prevTime || (m.prevTime = Date.now()), m.x = (f.touchesCurrent.x - m.prevPositionX) / (Date.now() - m.prevTime) / 2, m.y = (f.touchesCurrent.y - m.prevPositionY) / (Date.now() - m.prevTime) / 2, Math.abs(f.touchesCurrent.x - m.prevPositionX) < 2 && (m.x = 0), Math.abs(f.touchesCurrent.y - m.prevPositionY) < 2 && (m.y = 0), m.prevPositionX = f.touchesCurrent.x, m.prevPositionY = f.touchesCurrent.y, m.prevTime = Date.now(), p.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`);
    }
  }
  function L() {
    const t = swiper.zoom;
    p.$slideEl && swiper.previousIndex !== swiper.activeIndex && (p.$imageEl && p.$imageEl.transform("translate3d(0,0,0) scale(1)"), p.$imageWrapEl && p.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, d = 1, p.$slideEl = void 0, p.$imageEl = void 0, p.$imageWrapEl = void 0);
  }
  function v(t) {
    const n = swiper.zoom,
      r = swiper.params.zoom;
    if (p.$slideEl || (t && t.target && (p.$slideEl = (0, Dom7Entry.default)(t.target).closest(`.${swiper.params.slideClass}`)), p.$slideEl || (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? p.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`) : p.$slideEl = swiper.slides.eq(swiper.activeIndex)), p.$imageEl = p.$slideEl.find(`.${r.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), p.$imageWrapEl = p.$imageEl.parent(`.${r.containerClass}`)), !p.$imageEl || 0 === p.$imageEl.length || !p.$imageWrapEl || 0 === p.$imageWrapEl.length) return;
    let a, s, c, l, u, h, m, M, _, A, g, b, y, L, v, T, S, w;
    swiper.params.cssMode && (swiper.wrapperEl.style.overflow = "hidden", swiper.wrapperEl.style.touchAction = "none"), p.$slideEl.addClass(`${r.zoomedSlideClass}`), void 0 === f.touchesStart.x && t ? (a = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, s = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (a = f.touchesStart.x, s = f.touchesStart.y), n.scale = p.$imageWrapEl.attr("data-swiper-zoom") || r.maxRatio, d = p.$imageWrapEl.attr("data-swiper-zoom") || r.maxRatio, t ? (S = p.$slideEl[0].offsetWidth, w = p.$slideEl[0].offsetHeight, c = p.$slideEl.offset().left + o.scrollX, l = p.$slideEl.offset().top + o.scrollY, u = c + S / 2 - a, h = l + w / 2 - s, _ = p.$imageEl[0].offsetWidth, A = p.$imageEl[0].offsetHeight, g = _ * n.scale, b = A * n.scale, y = Math.min(S / 2 - g / 2, 0), L = Math.min(w / 2 - b / 2, 0), v = -y, T = -L, m = u * n.scale, M = h * n.scale, m < y && (m = y), m > v && (m = v), M < L && (M = L), M > T && (M = T)) : (m = 0, M = 0), p.$imageWrapEl.transition(300).transform(`translate3d(${m}px, ${M}px,0)`), p.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${n.scale})`);
  }
  function T() {
    const t = swiper.zoom,
      n = swiper.params.zoom;
    p.$slideEl || (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? p.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`) : p.$slideEl = swiper.slides.eq(swiper.activeIndex), p.$imageEl = p.$slideEl.find(`.${n.containerClass}`).eq(0).find("img, svg, canvas, picture, .swiper-zoom-target"), p.$imageWrapEl = p.$imageEl.parent(`.${n.containerClass}`)), p.$imageEl && 0 !== p.$imageEl.length && p.$imageWrapEl && 0 !== p.$imageWrapEl.length && (swiper.params.cssMode && (swiper.wrapperEl.style.overflow = "", swiper.wrapperEl.style.touchAction = ""), t.scale = 1, d = 1, p.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), p.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), p.$slideEl.removeClass(`${n.zoomedSlideClass}`), p.$slideEl = void 0);
  }
  function S(t) {
    const n = swiper.zoom;
    n.scale && 1 !== n.scale ? T() : v(t);
  }
  function w() {
    const t = swiper.support;
    return {
      passiveListener: !("touchstart" !== swiper.touchEvents.start || !t.passiveListener || !swiper.params.passiveListeners) && {
        passive: !0,
        capture: !1
      },
      activeListenerWithCapture: !t.passiveListener || {
        passive: !1,
        capture: !0
      }
    };
  }
  function E() {
    return `.${swiper.params.slideClass}`;
  }
  function x(t) {
    const {
        passiveListener: passiveListener
      } = w(),
      r = E();
    swiper.$wrapperEl[t]("gesturestart", r, A, passiveListener), swiper.$wrapperEl[t]("gesturechange", r, g, passiveListener), swiper.$wrapperEl[t]("gestureend", r, b, passiveListener);
  }
  function C() {
    c || (c = !0, x("on"));
  }
  function z() {
    c && (c = !1, x("off"));
  }
  function O() {
    const t = swiper.zoom;
    if (t.enabled) return;
    t.enabled = !0;
    const n = swiper.support,
      {
        passiveListener: passiveListener,
        activeListenerWithCapture: activeListenerWithCapture
      } = w(),
      a = E();
    n.gestures ? (swiper.$wrapperEl.on(swiper.touchEvents.start, C, passiveListener), swiper.$wrapperEl.on(swiper.touchEvents.end, z, passiveListener)) : "touchstart" === swiper.touchEvents.start && (swiper.$wrapperEl.on(swiper.touchEvents.start, a, A, passiveListener), swiper.$wrapperEl.on(swiper.touchEvents.move, a, g, activeListenerWithCapture), swiper.$wrapperEl.on(swiper.touchEvents.end, a, b, passiveListener), swiper.touchEvents.cancel && swiper.$wrapperEl.on(swiper.touchEvents.cancel, a, b, passiveListener)), swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, y, activeListenerWithCapture);
  }
  function B() {
    const t = swiper.zoom;
    if (!t.enabled) return;
    const n = swiper.support;
    t.enabled = !1;
    const {
        passiveListener: passiveListener,
        activeListenerWithCapture: activeListenerWithCapture
      } = w(),
      a = E();
    n.gestures ? (swiper.$wrapperEl.off(swiper.touchEvents.start, C, passiveListener), swiper.$wrapperEl.off(swiper.touchEvents.end, z, passiveListener)) : "touchstart" === swiper.touchEvents.start && (swiper.$wrapperEl.off(swiper.touchEvents.start, a, A, passiveListener), swiper.$wrapperEl.off(swiper.touchEvents.move, a, g, activeListenerWithCapture), swiper.$wrapperEl.off(swiper.touchEvents.end, a, b, passiveListener), swiper.touchEvents.cancel && swiper.$wrapperEl.off(swiper.touchEvents.cancel, a, b, passiveListener)), swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, y, activeListenerWithCapture);
  }
  Object.defineProperty(swiper.zoom, "scale", {
    get() {
      return M;
    },
    set(e) {
      if (M !== e) {
        const t = p.$imageEl ? p.$imageEl[0] : void 0,
          n = p.$slideEl ? p.$slideEl[0] : void 0;
        emit("zoomChange", e, t, n);
      }
      M = e;
    }
  }), on("init", () => {
    swiper.params.zoom.enabled && O();
  }), on("destroy", () => {
    B();
  }), on("touchStart", (t, n) => {
    swiper.zoom.enabled && function (t) {
      const n = swiper.device;
      p.$imageEl && 0 !== p.$imageEl.length && (f.isTouched || (n.android && t.cancelable && t.preventDefault(), f.isTouched = !0, f.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, f.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY));
    }(n);
  }), on("touchEnd", (t, n) => {
    swiper.zoom.enabled && function () {
      const t = swiper.zoom;
      if (!p.$imageEl || 0 === p.$imageEl.length) return;
      if (!f.isTouched || !f.isMoved) return f.isTouched = !1, void (f.isMoved = !1);
      f.isTouched = !1, f.isMoved = !1;
      let n = 300,
        r = 300;
      const i = m.x * n,
        a = f.currentX + i,
        s = m.y * r,
        o = f.currentY + s;
      0 !== m.x && (n = Math.abs((a - f.currentX) / m.x)), 0 !== m.y && (r = Math.abs((o - f.currentY) / m.y));
      const c = Math.max(n, r);
      f.currentX = a, f.currentY = o;
      const l = f.width * t.scale,
        u = f.height * t.scale;
      f.minX = Math.min(p.slideWidth / 2 - l / 2, 0), f.maxX = -f.minX, f.minY = Math.min(p.slideHeight / 2 - u / 2, 0), f.maxY = -f.minY, f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX), f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY), p.$imageWrapEl.transition(c).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`);
    }();
  }), on("doubleTap", (t, n) => {
    !swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle && S(n);
  }), on("transitionEnd", () => {
    swiper.zoom.enabled && swiper.params.zoom.enabled && L();
  }), on("slideChange", () => {
    swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode && L();
  }), Object.assign(swiper.zoom, {
    enable: O,
    disable: B,
    in: v,
    out: T,
    toggle: S
  });
}
export { s as default };
