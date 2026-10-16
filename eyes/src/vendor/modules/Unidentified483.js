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
