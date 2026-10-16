/** @eyes-analysis
 * 文件职责：观察容器 ResizeObserver 或 window resize 并发射轮播尺寸事件
 * 依据：// Recovered from vendors.js:1599514-1600376.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
