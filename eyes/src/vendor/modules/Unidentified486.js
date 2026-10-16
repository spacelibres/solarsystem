/** @eyes-analysis
 * 文件职责：构造所有滑片索引并委托 removeSlide 删除
 * 依据：// Recovered from vendors.js:1710034-1710201.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1710034-1710201.
function r() {
  const e = this,
    t = [];
  for (let n = 0; n < e.slides.length; n += 1) t.push(n);
  e.removeSlide(t);
}
export { r as default };
