/** @eyes-analysis
 * 文件职责：创建或复用 swiper-slide-shadow 节点用于 3D 效果明暗
 * 依据：// Recovered from vendors.js:1716852-1717176.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1716852-1717176.
import * as Dom7Entry from "./Dom7Entry.js";
function i(e, t, n) {
  const i = "swiper-slide-shadow" + (n ? `-${n}` : ""),
    a = e.transformEl ? t.find(e.transformEl) : t;
  let s = a.children(`.${i}`);
  return s.length || (s = (0, Dom7Entry.default)(`<div class="swiper-slide-shadow${n ? `-${n}` : ""}"></div>`), a.append(s)), s;
}
export { i as default };
