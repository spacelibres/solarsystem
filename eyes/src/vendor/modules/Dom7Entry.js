/** @eyes-analysis
 * 文件职责：将 DOM 方法装配到 Dom7 原型并导出查询入口
 * 依据：// Recovered from vendors.js:1574962-1575729.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1574962-1575729.
import * as Dom7 from "./Dom7.js";
let defaultExport;
const i = {
  addClass: Dom7.addClass,
  removeClass: Dom7.removeClass,
  hasClass: Dom7.hasClass,
  toggleClass: Dom7.toggleClass,
  attr: Dom7.attr,
  removeAttr: Dom7.removeAttr,
  transform: Dom7.transform,
  transition: Dom7.transition,
  on: Dom7.on,
  off: Dom7.off,
  trigger: Dom7.trigger,
  transitionEnd: Dom7.transitionEnd,
  outerWidth: Dom7.outerWidth,
  outerHeight: Dom7.outerHeight,
  styles: Dom7.styles,
  offset: Dom7.offset,
  css: Dom7.css,
  each: Dom7.each,
  html: Dom7.html,
  text: Dom7.text,
  is: Dom7.is,
  index: Dom7.index,
  eq: Dom7.eq,
  append: Dom7.append,
  prepend: Dom7.prepend,
  next: Dom7.next,
  nextAll: Dom7.nextAll,
  prev: Dom7.prev,
  prevAll: Dom7.prevAll,
  parent: Dom7.parent,
  parents: Dom7.parents,
  closest: Dom7.closest,
  find: Dom7.find,
  children: Dom7.children,
  filter: Dom7.filter,
  remove: Dom7.remove
};
Object.keys(i).forEach(e => {
  Object.defineProperty(Dom7.$.fn, e, {
    value: i[e],
    writable: !0
  });
}), defaultExport = Dom7.$;
export { defaultExport as default };
