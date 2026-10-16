/** @eyes-analysis
 * 文件职责：提供 applyProjectionDefaults、d2r；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1751838-1752420.；exports: applyProjectionDefaults, d2r
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1751838-1752420.
var r = .017453292519943295;
function d2r(e) {
  return e * r;
}
function applyProjectionDefaults(e) {
  const t = (e.projName || "").toLowerCase().replace(/_/g, " ");
  void 0 === e.long0 && void 0 !== e.longc && (e.long0 = e.longc), e.lat_ts || !e.lat1 || "stereographic south pole" !== t && "polar stereographic (variant b)" !== t ? e.lat_ts || !e.lat0 || "polar stereographic" !== t && "polar stereographic (variant a)" !== t || (e.lat_ts = e.lat0, e.lat0 = d2r(e.lat0 > 0 ? 90 : -90), delete e.lat1) : (e.lat0 = d2r(e.lat1 > 0 ? 90 : -90), e.lat_ts = e.lat1, delete e.lat1);
}
export { applyProjectionDefaults };
export { d2r };
