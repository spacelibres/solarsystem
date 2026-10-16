/** @eyes-analysis
 * 文件职责：将舍入后越界的输入夹到 [-1,1] 再求反正弦
 * 依据：// Recovered from vendors.js:1832530-1832666.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1832530-1832666.
function r(e) {
  return Math.abs(e) > 1 && (e = e > 1 ? 1 : -1), Math.asin(e);
}
export { r as default };
