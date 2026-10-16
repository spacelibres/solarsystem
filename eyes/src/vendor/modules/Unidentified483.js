/** @eyes-analysis
 * 文件职责：开头添加滑片，按新增数量修正当前索引并重建循环
 * 依据：// Recovered from vendors.js:1708414-1708771.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1708414-1708771.
function r(e) {
  const t = this,
    {
      params: params,
      $wrapperEl: $wrapperEl,
      activeIndex: activeIndex
    } = t;
  params.loop && t.loopDestroy();
  let a = activeIndex + 1;
  if ("object" == typeof e && "length" in e) {
    for (let t = 0; t < e.length; t += 1) e[t] && $wrapperEl.prepend(e[t]);
    a = activeIndex + e.length;
  } else $wrapperEl.prepend(e);
  params.loop && t.loopCreate(), params.observer || t.update(), t.slideTo(a, 0, !1);
}
export { r as default };
