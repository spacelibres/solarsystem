/** @eyes-analysis
 * 文件职责：Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise
 * 依据：// Recovered from vendors.js:1092927-1093134.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1092927-1093134.
function r(e) {
  var t;
  return function () {
    return t || (t = new Promise(function (n) {
      Promise.resolve().then(function () {
        t = void 0, n(e());
      });
    })), t;
  };
}
export { r as default };
