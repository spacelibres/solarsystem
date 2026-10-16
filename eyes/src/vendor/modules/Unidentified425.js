/** @eyes-analysis
 * 文件职责：实现 transitionStart；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1617108-1617355.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1617108-1617355.
import * as Unidentified426 from "./Unidentified426.js";
function i(e = !0, t) {
  const n = this,
    {
      params: params
    } = n;
  params.cssMode || (params.autoHeight && n.updateAutoHeight(), (0, Unidentified426.default)({
    swiper: n,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
export { i as default };
