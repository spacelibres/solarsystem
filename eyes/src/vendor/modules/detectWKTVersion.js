/** @eyes-analysis
 * 文件职责：提供 detectWKTVersion；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1743129-1743551.；exports: detectWKTVersion
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1743129-1743551.
function detectWKTVersion(e) {
  const t = e.toUpperCase();
  return t.includes("PROJCRS") || t.includes("GEOGCRS") || t.includes("BOUNDCRS") || t.includes("VERTCRS") || t.includes("LENGTHUNIT") || t.includes("ANGLEUNIT") || t.includes("SCALEUNIT") ? "WKT2" : (t.includes("PROJCS") || t.includes("GEOGCS") || t.includes("LOCAL_CS") || t.includes("VERT_CS") || t.includes("UNIT"), "WKT1");
}
export { detectWKTVersion };
