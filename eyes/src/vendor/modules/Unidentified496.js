/** @eyes-analysis
 * 文件职责：Swiper 的 EffectCards 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1721022-1722868.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1721022-1722868.
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
    cardsEffect: {
      slideShadows: !0,
      transformEl: null
    }
  });
  (0, Unidentified488.default)({
    effect: "cards",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          slides: slides,
          activeIndex: activeIndex
        } = swiper,
        i = swiper.params.cardsEffect,
        {
          startTranslate: startTranslate,
          isTouched: isTouched
        } = swiper.touchEventsData,
        c = swiper.translate;
      for (let l = 0; l < slides.length; l += 1) {
        const u = slides.eq(l),
          d = u[0].progress,
          h = Math.min(Math.max(d, -4), 4);
        let p = u[0].swiperSlideOffset;
        swiper.params.centeredSlides && !swiper.params.cssMode && swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`), swiper.params.centeredSlides && swiper.params.cssMode && (p -= slides[0].swiperSlideOffset);
        let f = swiper.params.cssMode ? -p - swiper.translate : -p,
          m = 0;
        const M = -100 * Math.abs(h);
        let _ = 1,
          A = -2 * h,
          g = 8 - .75 * Math.abs(h);
        const b = (l === activeIndex || l === activeIndex - 1) && h > 0 && h < 1 && (isTouched || swiper.params.cssMode) && c < startTranslate,
          y = (l === activeIndex || l === activeIndex + 1) && h < 0 && h > -1 && (isTouched || swiper.params.cssMode) && c > startTranslate;
        if (b || y) {
          const e = (1 - Math.abs((Math.abs(h) - .5) / .5)) ** .5;
          A += -28 * h * e, _ += -.5 * e, g += 96 * e, m = -25 * e * Math.abs(h) + "%";
        }
        if (f = h < 0 ? `calc(${f}px + (${g * Math.abs(h)}%))` : h > 0 ? `calc(${f}px + (-${g * Math.abs(h)}%))` : `${f}px`, !swiper.isHorizontal()) {
          const e = m;
          m = f, f = e;
        }
        const L = `\n        translate3d(${f}, ${m}, ${M}px)\n        rotateZ(${A}deg)\n        scale(${h < 0 ? "" + (1 + (1 - _) * h) : "" + (1 - (1 - _) * h)})\n      `;
        if (i.slideShadows) {
          let e = u.find(".swiper-slide-shadow");
          0 === e.length && (e = (0, Unidentified493.default)(i, u)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(h) - .5) / .5, 0), 1));
        }
        u[0].style.zIndex = -Math.abs(Math.round(d)) + slides.length;
        (0, Unidentified489.default)(i, u).transform(L);
      }
    },
    setTransition: t => {
      const {
        transformEl: transformEl
      } = swiper.params.cardsEffect;
      (transformEl ? swiper.slides.find(transformEl) : swiper.slides).transition(t).find(".swiper-slide-shadow").transition(t), (0, Unidentified490.default)({
        swiper: swiper,
        duration: t,
        transformEl: transformEl
      });
    },
    perspective: () => !0,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
export { o as default };
