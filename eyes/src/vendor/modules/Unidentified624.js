/** @eyes-analysis
 * 文件职责：将坐标数组转换为 x/y/z 点对象
 * 依据：// Recovered from vendors.js:1790046-1790211.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1790046-1790211.
function r(e) {
  var t = {
    x: e[0],
    y: e[1]
  };
  return e.length > 2 && (t.z = e[2]), e.length > 3 && (t.m = e[3]), t;
}
export { r as default };
