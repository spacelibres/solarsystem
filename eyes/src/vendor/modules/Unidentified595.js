/** @eyes-analysis
 * 文件职责：忽略大小写、空白和标点匹配投影参数名称
 * 依据：// Recovered from vendors.js:1732166-1732434.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1732166-1732434.
var r = /[\s_\-\/\(\)]/g;
function i(e, t) {
  if (e[t]) return e[t];
  for (var n, i = Object.keys(e), a = t.toLowerCase().replace(r, ""), s = -1; ++s < i.length;) if ((n = i[s]).toLowerCase().replace(r, "") === a) return e[n];
}
export { i as default };
