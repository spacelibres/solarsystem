/** @eyes-analysis
 * 文件职责：Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置
 * 依据：// Recovered from vendors.js:2390468-2391020.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2390468-2391020.
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified947 from "./Unidentified947.js";
import * as Unidentified944 from "./Unidentified944.js";
import * as Unidentified942 from "./Unidentified942.js";
import * as max from "./max-938.js";
function c(e) {
  var t,
    n = (0, Unidentified945.default)(e),
    c = (0, Unidentified942.default)(e),
    l = null == (t = e.ownerDocument) ? void 0 : t.body,
    u = (0, max.max)(n.scrollWidth, n.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0),
    d = (0, max.max)(n.scrollHeight, n.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0),
    h = -c.scrollLeft + (0, Unidentified944.default)(e),
    p = -c.scrollTop;
  return "rtl" === (0, Unidentified947.default)(l || n).direction && (h += (0, max.max)(n.clientWidth, l ? l.clientWidth : 0) - u), {
    width: u,
    height: d,
    x: h,
    y: p
  };
}
export { c as default };
