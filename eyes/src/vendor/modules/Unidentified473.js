// Recovered from vendors.js:1687422-1689623.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  function i(e, t) {
    const n = function () {
      let e, t, n;
      return (r, i) => {
        for (t = -1, e = r.length; e - t > 1;) n = e + t >> 1, r[n] <= i ? t = n : e = n;
        return e;
      };
    }();
    let r, i;
    return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
      return e ? (i = n(this.x, e), r = i - 1, (e - this.x[r]) * (this.y[i] - this.y[r]) / (this.x[i] - this.x[r]) + this.y[r]) : 0;
    }, this;
  }
  function a() {
    swiper.controller.control && swiper.controller.spline && (swiper.controller.spline = void 0, delete swiper.controller.spline);
  }
  extendParams({
    controller: {
      control: void 0,
      inverse: !1,
      by: "slide"
    }
  }), swiper.controller = {
    control: void 0
  }, on("beforeInit", () => {
    swiper.controller.control = swiper.params.controller.control;
  }), on("update", () => {
    a();
  }), on("resize", () => {
    a();
  }), on("observerUpdate", () => {
    a();
  }), on("setTranslate", (t, n, r) => {
    swiper.controller.control && swiper.controller.setTranslate(n, r);
  }), on("setTransition", (t, n, r) => {
    swiper.controller.control && swiper.controller.setTransition(n, r);
  }), Object.assign(swiper.controller, {
    setTranslate: function (t, n) {
      const r = swiper.controller.control;
      let a, s;
      const o = swiper.constructor;
      function c(t) {
        const n = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        "slide" === swiper.params.controller.by && (!function (t) {
          swiper.controller.spline || (swiper.controller.spline = swiper.params.loop ? new i(swiper.slidesGrid, t.slidesGrid) : new i(swiper.snapGrid, t.snapGrid));
        }(t), s = -swiper.controller.spline.interpolate(-n)), s && "container" !== swiper.params.controller.by || (a = (t.maxTranslate() - t.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate()), s = (n - swiper.minTranslate()) * a + t.minTranslate()), swiper.params.controller.inverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setTranslate(s, swiper), t.updateActiveIndex(), t.updateSlidesClasses();
      }
      if (Array.isArray(r)) for (let e = 0; e < r.length; e += 1) r[e] !== n && r[e] instanceof o && c(r[e]);else r instanceof o && n !== r && c(r);
    },
    setTransition: function (t, n) {
      const i = swiper.constructor,
        a = swiper.controller.control;
      let s;
      function o(n) {
        n.setTransition(t, swiper), 0 !== t && (n.transitionStart(), n.params.autoHeight && (0, animateCSSModeScroll.nextTick)(() => {
          n.updateAutoHeight();
        }), n.$wrapperEl.transitionEnd(() => {
          a && (n.params.loop && "slide" === swiper.params.controller.by && n.loopFix(), n.transitionEnd());
        }));
      }
      if (Array.isArray(a)) for (s = 0; s < a.length; s += 1) a[s] !== n && a[s] instanceof i && o(a[s]);else a instanceof i && n !== a && o(a);
    }
  });
}
export { i as default };
