/** @eyes-analysis
 * 文件职责：按 createElements/auto 配置创建缺失的导航等 DOM 并同步参数
 * 依据：// Recovered from vendors.js:1658004-1658340.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1658004-1658340.
import * as extend from "./extend.js";
function i(e, t, n, i) {
  const a = (0, extend.getDocument)();
  return e.params.createElements && Object.keys(i).forEach(r => {
    if (!n[r] && !0 === n.auto) {
      let s = e.$el.children(`.${i[r]}`)[0];
      s || (s = a.createElement("div"), s.className = i[r], e.$el.append(s)), n[r] = s, t[r] = s;
    }
  }), n;
}
export { i as default };
