// Recovered from vendors.js:1641116-1641435.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a(e, t, n, a, s, o) {
  const c = (0, extend.getWindow)();
  let l;
  function u() {
    o && o();
  }
  (0, Dom7Entry.default)(e).parent("picture")[0] || e.complete && s ? u() : t ? (l = new c.Image(), l.onload = u, l.onerror = u, a && (l.sizes = a), n && (l.srcset = n), t && (l.src = t)) : u();
}
export { a as default };
