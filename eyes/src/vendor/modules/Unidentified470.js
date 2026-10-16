// Recovered from vendors.js:1670190-1672147.
import * as Dom7Entry from "./Dom7Entry.js";
function i({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    parallax: {
      enabled: !1
    }
  });
  const i = (t, n) => {
      const {
          rtl: rtl
        } = swiper,
        a = (0, Dom7Entry.default)(t),
        s = rtl ? -1 : 1,
        o = a.attr("data-swiper-parallax") || "0";
      let c = a.attr("data-swiper-parallax-x"),
        l = a.attr("data-swiper-parallax-y");
      const u = a.attr("data-swiper-parallax-scale"),
        d = a.attr("data-swiper-parallax-opacity");
      if (c || l ? (c = c || "0", l = l || "0") : swiper.isHorizontal() ? (c = o, l = "0") : (l = o, c = "0"), c = c.indexOf("%") >= 0 ? parseInt(c, 10) * n * s + "%" : c * n * s + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * n + "%" : l * n + "px", null != d) {
        const e = d - (d - 1) * (1 - Math.abs(n));
        a[0].style.opacity = e;
      }
      if (null == u) a.transform(`translate3d(${c}, ${l}, 0px)`);else {
        const e = u - (u - 1) * (1 - Math.abs(n));
        a.transform(`translate3d(${c}, ${l}, 0px) scale(${e})`);
      }
    },
    a = () => {
      const {
        $el: $el,
        slides: slides,
        progress: progress,
        snapGrid: snapGrid
      } = swiper;
      $el.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
        i(e, progress);
      }), slides.each((t, n) => {
        let o = t.progress;
        swiper.params.slidesPerGroup > 1 && "auto" !== swiper.params.slidesPerView && (o += Math.ceil(n / 2) - progress * (snapGrid.length - 1)), o = Math.min(Math.max(o, -1), 1), (0, Dom7Entry.default)(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
          i(e, o);
        });
      });
    };
  on("beforeInit", () => {
    swiper.params.parallax.enabled && (swiper.params.watchSlidesProgress = !0, swiper.originalParams.watchSlidesProgress = !0);
  }), on("init", () => {
    swiper.params.parallax.enabled && a();
  }), on("setTranslate", () => {
    swiper.params.parallax.enabled && a();
  }), on("setTransition", (t, n) => {
    swiper.params.parallax.enabled && ((t = swiper.params.speed) => {
      const {
        $el: $el
      } = swiper;
      $el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
        const n = (0, Dom7Entry.default)(e);
        let i = parseInt(n.attr("data-swiper-parallax-duration"), 10) || t;
        0 === t && (i = 0), n.transition(i);
      });
    })(n);
  });
}
export { i as default };
