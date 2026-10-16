/** @eyes-analysis
 * 文件职责：Swiper 的 EffectFlip 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1715195-1716851.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1715195-1716851.
import * as Unidentified493 from "./Unidentified493.js";
import * as Unidentified488 from "./Unidentified488.js";
import * as Unidentified489 from "./Unidentified489.js";
import * as Unidentified490 from "./Unidentified490.js";
function o({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    flipEffect: {
      slideShadows: !0,
      limitRotation: !0,
      transformEl: null
    }
  });
  (0, Unidentified488.default)({
    effect: "flip",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          slides: slides,
          rtlTranslate: rtlTranslate
        } = swiper,
        i = swiper.params.flipEffect;
      for (let s = 0; s < slides.length; s += 1) {
        const o = slides.eq(s);
        let c = o[0].progress;
        swiper.params.flipEffect.limitRotation && (c = Math.max(Math.min(o[0].progress, 1), -1));
        const l = o[0].swiperSlideOffset;
        let u = -180 * c,
          d = 0,
          h = swiper.params.cssMode ? -l - swiper.translate : -l,
          p = 0;
        if (swiper.isHorizontal() ? rtlTranslate && (u = -u) : (p = h, h = 0, d = -u, u = 0), o[0].style.zIndex = -Math.abs(Math.round(c)) + slides.length, i.slideShadows) {
          let t = swiper.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
            n = swiper.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
          0 === t.length && (t = (0, Unidentified493.default)(i, o, swiper.isHorizontal() ? "left" : "top")), 0 === n.length && (n = (0, Unidentified493.default)(i, o, swiper.isHorizontal() ? "right" : "bottom")), t.length && (t[0].style.opacity = Math.max(-c, 0)), n.length && (n[0].style.opacity = Math.max(c, 0));
        }
        const f = `translate3d(${h}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${u}deg)`;
        (0, Unidentified489.default)(i, o).transform(f);
      }
    },
    setTransition: t => {
      const {
        transformEl: transformEl
      } = swiper.params.flipEffect;
      (transformEl ? swiper.slides.find(transformEl) : swiper.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), (0, Unidentified490.default)({
        swiper: swiper,
        duration: t,
        transformEl: transformEl
      });
    },
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
export { o as default };
