/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1755501-1755770.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1755501-1755770.
let defaultExport;
function init() {}
function i(e) {
  return e;
}
var names = ["longlat", "identity"];
defaultExport = {
  init: init,
  forward: i,
  inverse: i,
  names: names
};
export { i as forward };
export { init };
export { i as inverse };
export { names };
export { defaultExport as default };
