// Recovered from vendors.js:1710202-1711163.
import * as Unidentified488 from "./Unidentified488.js";
import * as Unidentified489 from "./Unidentified489.js";
import * as Unidentified490 from "./Unidentified490.js";
function s({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    fadeEffect: {
      crossFade: !1,
      transformEl: null
    }
  });
  (0, Unidentified488.default)({
    effect: "fade",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          slides: slides
        } = swiper,
        n = swiper.params.fadeEffect;
      for (let r = 0; r < slides.length; r += 1) {
        const t = swiper.slides.eq(r);
        let a = -t[0].swiperSlideOffset;
        swiper.params.virtualTranslate || (a -= swiper.translate);
        let s = 0;
        swiper.isHorizontal() || (s = a, a = 0);
        const o = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
        (0, Unidentified489.default)(n, t).css({
          opacity: o
        }).transform(`translate3d(${a}px, ${s}px, 0px)`);
      }
    },
    setTransition: t => {
      const {
        transformEl: transformEl
      } = swiper.params.fadeEffect;
      (transformEl ? swiper.slides.find(transformEl) : swiper.slides).transition(t), (0, Unidentified490.default)({
        swiper: swiper,
        duration: t,
        transformEl: transformEl,
        allSlides: !0
      });
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
export { s as default };
