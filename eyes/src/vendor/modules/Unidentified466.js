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
