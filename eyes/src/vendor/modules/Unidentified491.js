// Recovered from vendors.js:1712365-1715194.
import * as Dom7Entry from "./Dom7Entry.js";
import * as Unidentified488 from "./Unidentified488.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: .94
    }
  });
  (0, Unidentified488.default)({
    effect: "cube",
    swiper: swiper,
    on: on,
    setTranslate: () => {
      const {
          $el: $el,
          $wrapperEl: $wrapperEl,
          slides: slides,
          width: width,
          height: height,
          rtlTranslate: rtlTranslate,
          size: size,
          browser: browser
        } = swiper,
        u = swiper.params.cubeEffect,
        d = swiper.isHorizontal(),
        h = swiper.virtual && swiper.params.virtual.enabled;
      let p,
        f = 0;
      u.shadow && (d ? (p = $wrapperEl.find(".swiper-cube-shadow"), 0 === p.length && (p = (0, Dom7Entry.default)('<div class="swiper-cube-shadow"></div>'), $wrapperEl.append(p)), p.css({
        height: `${width}px`
      })) : (p = $el.find(".swiper-cube-shadow"), 0 === p.length && (p = (0, Dom7Entry.default)('<div class="swiper-cube-shadow"></div>'), $el.append(p))));
      for (let e = 0; e < slides.length; e += 1) {
        const t = slides.eq(e);
        let n = e;
        h && (n = parseInt(t.attr("data-swiper-slide-index"), 10));
        let a = 90 * n,
          s = Math.floor(a / 360);
        rtlTranslate && (a = -a, s = Math.floor(-a / 360));
        const l = Math.max(Math.min(t[0].progress, 1), -1);
        let p = 0,
          m = 0,
          M = 0;
        n % 4 == 0 ? (p = 4 * -s * size, M = 0) : (n - 1) % 4 == 0 ? (p = 0, M = 4 * -s * size) : (n - 2) % 4 == 0 ? (p = size + 4 * s * size, M = size) : (n - 3) % 4 == 0 && (p = -size, M = 3 * size + 4 * size * s), rtlTranslate && (p = -p), d || (m = p, p = 0);
        const _ = `rotateX(${d ? 0 : -a}deg) rotateY(${d ? a : 0}deg) translate3d(${p}px, ${m}px, ${M}px)`;
        if (l <= 1 && l > -1 && (f = 90 * n + 90 * l, rtlTranslate && (f = 90 * -n - 90 * l)), t.transform(_), u.slideShadows) {
          let e = d ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
            n = d ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
          0 === e.length && (e = (0, Dom7Entry.default)(`<div class="swiper-slide-shadow-${d ? "left" : "top"}"></div>`), t.append(e)), 0 === n.length && (n = (0, Dom7Entry.default)(`<div class="swiper-slide-shadow-${d ? "right" : "bottom"}"></div>`), t.append(n)), e.length && (e[0].style.opacity = Math.max(-l, 0)), n.length && (n[0].style.opacity = Math.max(l, 0));
        }
      }
      if ($wrapperEl.css({
        "-webkit-transform-origin": `50% 50% -${size / 2}px`,
        "transform-origin": `50% 50% -${size / 2}px`
      }), u.shadow) if (d) p.transform(`translate3d(0px, ${width / 2 + u.shadowOffset}px, ${-width / 2}px) rotateX(90deg) rotateZ(0deg) scale(${u.shadowScale})`);else {
        const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
          t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
          n = u.shadowScale,
          r = u.shadowScale / t,
          i = u.shadowOffset;
        p.transform(`scale3d(${n}, 1, ${r}) translate3d(0px, ${height / 2 + i}px, ${-height / 2 / r}px) rotateX(-90deg)`);
      }
      const m = browser.isSafari || browser.isWebView ? -size / 2 : 0;
      $wrapperEl.transform(`translate3d(0px,0,${m}px) rotateX(${swiper.isHorizontal() ? 0 : f}deg) rotateY(${swiper.isHorizontal() ? -f : 0}deg)`);
    },
    setTransition: t => {
      const {
        $el: $el,
        slides: slides
      } = swiper;
      slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), swiper.params.cubeEffect.shadow && !swiper.isHorizontal() && $el.find(".swiper-cube-shadow").transition(t);
    },
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0
    })
  });
}
export { a as default };
