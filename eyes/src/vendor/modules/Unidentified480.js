/** @eyes-analysis
 * 文件职责：Swiper 的 Grid 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1706604-1707794.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1706604-1707794.
function r({
  swiper: swiper,
  extendParams: extendParams
}) {
  let n, r, i;
  extendParams({
    grid: {
      rows: 1,
      fill: "column"
    }
  });
  swiper.grid = {
    initSlides: t => {
      const {
          slidesPerView: slidesPerView
        } = swiper.params,
        {
          rows: rows,
          fill: fill
        } = swiper.params.grid;
      r = n / rows, i = Math.floor(t / rows), n = Math.floor(t / rows) === t / rows ? t : Math.ceil(t / rows) * rows, "auto" !== slidesPerView && "row" === fill && (n = Math.max(n, slidesPerView * rows));
    },
    updateSlide: (t, a, s, o) => {
      const {
          slidesPerGroup: slidesPerGroup,
          spaceBetween: spaceBetween
        } = swiper.params,
        {
          rows: rows,
          fill: fill
        } = swiper.params.grid;
      let h, p, f;
      if ("row" === fill && slidesPerGroup > 1) {
        const e = Math.floor(t / (slidesPerGroup * rows)),
          r = t - rows * slidesPerGroup * e,
          i = 0 === e ? slidesPerGroup : Math.min(Math.ceil((s - e * rows * slidesPerGroup) / rows), slidesPerGroup);
        f = Math.floor(r / i), p = r - f * i + e * slidesPerGroup, h = p + f * n / rows, a.css({
          "-webkit-order": h,
          order: h
        });
      } else "column" === fill ? (p = Math.floor(t / rows), f = t - p * rows, (p > i || p === i && f === rows - 1) && (f += 1, f >= rows && (f = 0, p += 1))) : (f = Math.floor(t / r), p = t - f * r);
      a.css(o("margin-top"), 0 !== f ? spaceBetween && `${spaceBetween}px` : "");
    },
    updateWrapperSize: (t, r, i) => {
      const {
          spaceBetween: spaceBetween,
          centeredSlides: centeredSlides,
          roundLengths: roundLengths
        } = swiper.params,
        {
          rows: rows
        } = swiper.params.grid;
      if (swiper.virtualSize = (t + spaceBetween) * n, swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween, swiper.$wrapperEl.css({
        [i("width")]: `${swiper.virtualSize + spaceBetween}px`
      }), centeredSlides) {
        r.splice(0, r.length);
        const t = [];
        for (let n = 0; n < r.length; n += 1) {
          let i = r[n];
          roundLengths && (i = Math.floor(i)), r[n] < swiper.virtualSize + r[0] && t.push(i);
        }
        r.push(...t);
      }
    }
  };
}
export { r as default };
