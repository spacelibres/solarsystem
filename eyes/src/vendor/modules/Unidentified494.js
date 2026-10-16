/** @eyes-analysis
 * 文件职责：Swiper 的 EffectCoverflow 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1717177-1718926.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1717177-1718926.
import * as Unidentified493 from "./Unidentified493.js";
import * as Unidentified488 from "./Unidentified488.js";
import * as Unidentified489 from "./Unidentified489.js";
function s({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
      transformEl: null
    }
  });
  (0, Unidentified488.default)({
    effect: "coverflow",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          width: width,
          height: height,
          slides: slides,
          slidesSizesGrid: slidesSizesGrid
        } = swiper,
        o = swiper.params.coverflowEffect,
        c = swiper.isHorizontal(),
        l = swiper.translate,
        u = c ? width / 2 - l : height / 2 - l,
        d = c ? o.rotate : -o.rotate,
        h = o.depth;
      for (let e = 0, t = slides.length; e < t; e += 1) {
        const t = slides.eq(e),
          n = slidesSizesGrid[e],
          l = (u - t[0].swiperSlideOffset - n / 2) / n * o.modifier;
        let p = c ? d * l : 0,
          f = c ? 0 : d * l,
          m = -h * Math.abs(l),
          M = o.stretch;
        "string" == typeof M && -1 !== M.indexOf("%") && (M = parseFloat(o.stretch) / 100 * n);
        let _ = c ? 0 : M * l,
          A = c ? M * l : 0,
          g = 1 - (1 - o.scale) * Math.abs(l);
        Math.abs(A) < .001 && (A = 0), Math.abs(_) < .001 && (_ = 0), Math.abs(m) < .001 && (m = 0), Math.abs(p) < .001 && (p = 0), Math.abs(f) < .001 && (f = 0), Math.abs(g) < .001 && (g = 0);
        const b = `translate3d(${A}px,${_}px,${m}px)  rotateX(${f}deg) rotateY(${p}deg) scale(${g})`;
        if ((0, Unidentified489.default)(o, t).transform(b), t[0].style.zIndex = 1 - Math.abs(Math.round(l)), o.slideShadows) {
          let e = c ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
            n = c ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
          0 === e.length && (e = (0, Unidentified493.default)(o, t, c ? "left" : "top")), 0 === n.length && (n = (0, Unidentified493.default)(o, t, c ? "right" : "bottom")), e.length && (e[0].style.opacity = l > 0 ? l : 0), n.length && (n[0].style.opacity = -l > 0 ? -l : 0);
        }
      }
    },
    setTransition: t => {
      const {
        transformEl: transformEl
      } = swiper.params.coverflowEffect;
      (transformEl ? swiper.slides.find(transformEl) : swiper.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t);
    },
    perspective: () => !0,
    overwriteParams: () => ({
      watchSlidesProgress: !0
    })
  });
}
export { s as default };
