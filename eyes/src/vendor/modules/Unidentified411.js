/** @eyes-analysis
 * 文件职责：实现 updateSlidesOffset；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1608893-1609103.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1608893-1609103.
function r() {
  const e = this,
    t = e.slides;
  for (let n = 0; n < t.length; n += 1) t[n].swiperSlideOffset = e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop;
}
export { r as default };
