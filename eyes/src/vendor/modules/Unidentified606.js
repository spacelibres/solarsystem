/** @eyes-analysis
 * 文件职责：复制非 undefined 属性到目标对象
 * 依据：// Recovered from vendors.js:1752421-1752590.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1752421-1752590.
function r(e, t) {
  var n, r;
  if (e = e || {}, !t) return e;
  for (r in t) void 0 !== (n = t[r]) && (e[r] = n);
  return e;
}
export { r as default };
