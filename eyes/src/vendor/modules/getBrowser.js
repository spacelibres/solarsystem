/** @eyes-analysis
 * 文件职责：提供 getBrowser；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1599110-1599513.；exports: getBrowser
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1599110-1599513.
import * as extend from "./extend.js";
let i;
function getBrowser() {
  return i || (i = function () {
    const e = (0, extend.getWindow)();
    return {
      isSafari: function () {
        const t = e.navigator.userAgent.toLowerCase();
        return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
      }(),
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
    };
  }()), i;
}
export { getBrowser };
