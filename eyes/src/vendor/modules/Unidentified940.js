/** @eyes-analysis
 * 文件职责：Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent
 * 依据：// Recovered from vendors.js:2381548-2381801.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2381548-2381801.
function r() {
  var e = navigator.userAgentData;
  return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map(function (e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
export { r as default };
