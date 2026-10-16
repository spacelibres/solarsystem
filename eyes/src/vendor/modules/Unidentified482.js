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
