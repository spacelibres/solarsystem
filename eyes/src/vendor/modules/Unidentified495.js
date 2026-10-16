/** @eyes-analysis
 * 文件职责：Swiper 的 EffectCreative 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1718927-1721021.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1718927-1721021.
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
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const o = e => "string" == typeof e ? e : `${e}px`;
  (0, Unidentified488.default)({
    effect: "creative",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          slides: slides
        } = swiper,
        n = swiper.params.creativeEffect,
        {
          progressMultiplier: progressMultiplier
        } = n;
      for (let s = 0; s < slides.length; s += 1) {
        const c = slides.eq(s),
          l = c[0].progress,
          u = Math.min(Math.max(c[0].progress, -n.limitProgress), n.limitProgress),
          d = Math.min(Math.max(c[0].originalProgress, -n.limitProgress), n.limitProgress),
          h = c[0].swiperSlideOffset,
          p = [swiper.params.cssMode ? -h - swiper.translate : -h, 0, 0],
          f = [0, 0, 0];
        let m = !1;
        swiper.isHorizontal() || (p[1] = p[0], p[0] = 0);
        let M = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1
        };
        u < 0 ? (M = n.next, m = !0) : u > 0 && (M = n.prev, m = !0), p.forEach((e, t) => {
          p[t] = `calc(${e}px + (${o(M.translate[t])} * ${Math.abs(u * progressMultiplier)}))`;
        }), f.forEach((e, t) => {
          f[t] = M.rotate[t] * Math.abs(u * progressMultiplier);
        }), c[0].style.zIndex = -Math.abs(Math.round(l)) + slides.length;
        const _ = p.join(", "),
          A = `rotateX(${f[0]}deg) rotateY(${f[1]}deg) rotateZ(${f[2]}deg)`,
          g = d < 0 ? `scale(${1 + (1 - M.scale) * d * progressMultiplier})` : `scale(${1 - (1 - M.scale) * d * progressMultiplier})`,
          b = d < 0 ? 1 + (1 - M.opacity) * d * progressMultiplier : 1 - (1 - M.opacity) * d * progressMultiplier,
          y = `translate3d(${_}) ${A} ${g}`;
        if (m && M.shadow || !m) {
          let e = c.children(".swiper-slide-shadow");
          if (0 === e.length && M.shadow && (e = (0, Unidentified493.default)(n, c)), e.length) {
            const t = n.shadowPerProgress ? u * (1 / n.limitProgress) : u;
            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
          }
        }
        const L = (0, Unidentified489.default)(n, c);
        L.transform(y).css({
          opacity: b
        }), M.origin && L.css("transform-origin", M.origin);
      }
    },
    setTransition: t => {
      const {
        transformEl: transformEl
      } = swiper.params.creativeEffect;
      (transformEl ? swiper.slides.find(transformEl) : swiper.slides).transition(t).find(".swiper-slide-shadow").transition(t), (0, Unidentified490.default)({
        swiper: swiper,
        duration: t,
        transformEl: transformEl,
        allSlides: !0
      });
    },
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
export { o as default };
