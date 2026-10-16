// Recovered from vendors.js:1599514-1600376.
import * as extend from "./extend.js";
function i({
  swiper: swiper,
  on: on,
  emit: emit
}) {
  const i = (0, extend.getWindow)();
  let a = null;
  const s = () => {
      swiper && !swiper.destroyed && swiper.initialized && (emit("beforeResize"), emit("resize"));
    },
    o = () => {
      swiper && !swiper.destroyed && swiper.initialized && emit("orientationchange");
    };
  on("init", () => {
    swiper.params.resizeObserver && void 0 !== i.ResizeObserver ? swiper && !swiper.destroyed && swiper.initialized && (a = new ResizeObserver(t => {
      const {
        width: width,
        height: height
      } = swiper;
      let i = width,
        a = height;
      t.forEach(({
        contentBoxSize: contentBoxSize,
        contentRect: contentRect,
        target: target
      }) => {
        target && target !== swiper.el || (i = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize, a = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize);
      }), i === width && a === height || s();
    }), a.observe(swiper.el)) : (i.addEventListener("resize", s), i.addEventListener("orientationchange", o));
  }), on("destroy", () => {
    a && a.unobserve && swiper.el && (a.unobserve(swiper.el), a = null), i.removeEventListener("resize", s), i.removeEventListener("orientationchange", o);
  });
}
export { i as default };
