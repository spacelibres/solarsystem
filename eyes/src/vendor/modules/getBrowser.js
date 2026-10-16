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
