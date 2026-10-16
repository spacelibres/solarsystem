/** @eyes-analysis
 * 文件职责：实现 updateSize；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1603126-1603734.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1603126-1603734.
function r() {
  const e = this;
  let t, n;
  const r = e.$el;
  t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : r[0].clientWidth, n = void 0 !== e.params.height && null !== e.params.height ? e.params.height : r[0].clientHeight, 0 === t && e.isHorizontal() || 0 === n && e.isVertical() || (t = t - parseInt(r.css("padding-left") || 0, 10) - parseInt(r.css("padding-right") || 0, 10), n = n - parseInt(r.css("padding-top") || 0, 10) - parseInt(r.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(n) && (n = 0), Object.assign(e, {
    width: t,
    height: n,
    size: e.isHorizontal() ? t : n
  }));
}
export { r as default };
