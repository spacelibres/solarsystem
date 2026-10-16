// Recovered from vendors.js:1650803-1655405.
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
  let c;
  extendParams({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null
    }
  }), swiper.mousewheel = {
    enabled: !1
  };
  let l,
    u = (0, animateCSSModeScroll.now)();
  const d = [];
  function h() {
    swiper.enabled && (swiper.mouseEntered = !0);
  }
  function p() {
    swiper.enabled && (swiper.mouseEntered = !1);
  }
  function f(t) {
    return !(swiper.params.mousewheel.thresholdDelta && t.delta < swiper.params.mousewheel.thresholdDelta) && !(swiper.params.mousewheel.thresholdTime && (0, animateCSSModeScroll.now)() - u < swiper.params.mousewheel.thresholdTime) && (t.delta >= 6 && (0, animateCSSModeScroll.now)() - u < 60 || (t.direction < 0 ? swiper.isEnd && !swiper.params.loop || swiper.animating || (swiper.slideNext(), emit("scroll", t.raw)) : swiper.isBeginning && !swiper.params.loop || swiper.animating || (swiper.slidePrev(), emit("scroll", t.raw)), u = new o.Date().getTime(), !1));
  }
  function m(t) {
    let n = t,
      r = !0;
    if (!swiper.enabled) return;
    const o = swiper.params.mousewheel;
    swiper.params.cssMode && n.preventDefault();
    let u = swiper.$el;
    if ("container" !== swiper.params.mousewheel.eventsTarget && (u = (0, Dom7Entry.default)(swiper.params.mousewheel.eventsTarget)), !swiper.mouseEntered && !u[0].contains(n.target) && !o.releaseOnEdges) return !0;
    n.originalEvent && (n = n.originalEvent);
    let h = 0;
    const p = swiper.rtlTranslate ? -1 : 1,
      m = function (e) {
        let t = 0,
          n = 0,
          r = 0,
          i = 0;
        return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), r = 10 * t, i = 10 * n, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (r = e.deltaX), e.shiftKey && !r && (r = i, i = 0), (r || i) && e.deltaMode && (1 === e.deltaMode ? (r *= 40, i *= 40) : (r *= 800, i *= 800)), r && !t && (t = r < 1 ? -1 : 1), i && !n && (n = i < 1 ? -1 : 1), {
          spinX: t,
          spinY: n,
          pixelX: r,
          pixelY: i
        };
      }(n);
    if (o.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
        h = -m.pixelX * p;
      } else {
        if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
        h = -m.pixelY;
      }
    } else h = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * p : -m.pixelY;
    if (0 === h) return !0;
    o.invert && (h = -h);
    let M = swiper.getTranslate() + h * o.sensitivity;
    if (M >= swiper.minTranslate() && (M = swiper.minTranslate()), M <= swiper.maxTranslate() && (M = swiper.maxTranslate()), r = !!swiper.params.loop || !(M === swiper.minTranslate() || M === swiper.maxTranslate()), r && swiper.params.nested && n.stopPropagation(), swiper.params.freeMode && swiper.params.freeMode.enabled) {
      const t = {
          time: (0, animateCSSModeScroll.now)(),
          delta: Math.abs(h),
          direction: Math.sign(h)
        },
        r = l && t.time < l.time + 500 && t.delta <= l.delta && t.direction === l.direction;
      if (!r) {
        l = void 0, swiper.params.loop && swiper.loopFix();
        let i = swiper.getTranslate() + h * o.sensitivity;
        const u = swiper.isBeginning,
          p = swiper.isEnd;
        if (i >= swiper.minTranslate() && (i = swiper.minTranslate()), i <= swiper.maxTranslate() && (i = swiper.maxTranslate()), swiper.setTransition(0), swiper.setTranslate(i), swiper.updateProgress(), swiper.updateActiveIndex(), swiper.updateSlidesClasses(), (!u && swiper.isBeginning || !p && swiper.isEnd) && swiper.updateSlidesClasses(), swiper.params.freeMode.sticky) {
          clearTimeout(c), c = void 0, d.length >= 15 && d.shift();
          const n = d.length ? d[d.length - 1] : void 0,
            r = d[0];
          if (d.push(t), n && (t.delta > n.delta || t.direction !== n.direction)) d.splice(0);else if (d.length >= 15 && t.time - r.time < 500 && r.delta - t.delta >= 1 && t.delta <= 6) {
            const n = h > 0 ? .8 : .2;
            l = t, d.splice(0), c = (0, animateCSSModeScroll.nextTick)(() => {
              swiper.slideToClosest(swiper.params.speed, !0, void 0, n);
            }, 0);
          }
          c || (c = (0, animateCSSModeScroll.nextTick)(() => {
            l = t, d.splice(0), swiper.slideToClosest(swiper.params.speed, !0, void 0, .5);
          }, 500));
        }
        if (r || emit("scroll", n), swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction && swiper.autoplay.stop(), i === swiper.minTranslate() || i === swiper.maxTranslate()) return !0;
      }
    } else {
      const n = {
        time: (0, animateCSSModeScroll.now)(),
        delta: Math.abs(h),
        direction: Math.sign(h),
        raw: t
      };
      d.length >= 2 && d.shift();
      const r = d.length ? d[d.length - 1] : void 0;
      if (d.push(n), r ? (n.direction !== r.direction || n.delta > r.delta || n.time > r.time + 150) && f(n) : f(n), function (t) {
        const n = swiper.params.mousewheel;
        if (t.direction < 0) {
          if (swiper.isEnd && !swiper.params.loop && n.releaseOnEdges) return !0;
        } else if (swiper.isBeginning && !swiper.params.loop && n.releaseOnEdges) return !0;
        return !1;
      }(n)) return !0;
    }
    return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1;
  }
  function M(t) {
    let n = swiper.$el;
    "container" !== swiper.params.mousewheel.eventsTarget && (n = (0, Dom7Entry.default)(swiper.params.mousewheel.eventsTarget)), n[t]("mouseenter", h), n[t]("mouseleave", p), n[t]("wheel", m);
  }
  function _() {
    return swiper.params.cssMode ? (swiper.wrapperEl.removeEventListener("wheel", m), !0) : !swiper.mousewheel.enabled && (M("on"), swiper.mousewheel.enabled = !0, !0);
  }
  function A() {
    return swiper.params.cssMode ? (swiper.wrapperEl.addEventListener(event, m), !0) : !!swiper.mousewheel.enabled && (M("off"), swiper.mousewheel.enabled = !1, !0);
  }
  on("init", () => {
    !swiper.params.mousewheel.enabled && swiper.params.cssMode && A(), swiper.params.mousewheel.enabled && _();
  }), on("destroy", () => {
    swiper.params.cssMode && _(), swiper.mousewheel.enabled && A();
  }), Object.assign(swiper.mousewheel, {
    enable: _,
    disable: A
  });
}
export { s as default };
