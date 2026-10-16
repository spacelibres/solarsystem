/** @eyes-analysis
 * 文件职责：末尾添加滑片，重建循环并按 observer 状态更新
 * 依据：// Recovered from vendors.js:1708114-1708413.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1708114-1708413.
function r(e) {
  const t = this,
    {
      $wrapperEl: $wrapperEl,
      params: params
    } = t;
  if (params.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1) e[t] && $wrapperEl.append(e[t]);else $wrapperEl.append(e);
  params.loop && t.loopCreate(), params.observer || t.update();
}
export { r as default };
