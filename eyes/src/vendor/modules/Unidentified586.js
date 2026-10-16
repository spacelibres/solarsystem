// Recovered from vendors.js:1723512-1724633.
import * as Unidentified587 from "./Unidentified587.js";
import * as transformInternal from "./transformInternal.js";
import * as Unidentified624 from "./Unidentified624.js";
let defaultExport;
var s = (0, Unidentified587.default)("WGS84");
function o(e, t, n, r) {
  var s, o, c;
  return Array.isArray(n) ? (s = (0, transformInternal.transformInternal)(e, t, (0, Unidentified624.default)(n), r) || {
    x: NaN,
    y: NaN
  }, n.length > 2 ? (o = void 0 !== e.name && "geocent" === e.name || void 0 !== t.name && "geocent" === t.name) ? "number" == typeof s.z ? [s.x, s.y, s.z].concat(n.slice(3)) : [s.x, s.y, n[2]].concat(n.slice(3)) : r && "number" == typeof s.z ? [s.x, s.y, s.z].concat(n.slice(3)) : [s.x, s.y].concat(n.slice(2)) : [s.x, s.y]) : (s = (0, transformInternal.transformInternal)(e, t, {
    x: n.x,
    y: n.y,
    z: n.z,
    m: n.m
  }, r) || {
    x: NaN,
    y: NaN
  }, 2 === (c = Object.keys(n)).length || (o = void 0 !== e.name && "geocent" === e.name || void 0 !== t.name && "geocent" === t.name, c.forEach(function (e) {
    "x" !== e && "y" !== e && ("z" === e && (o || r) || (s[e] = n[e]));
  })), s);
}
function c(e) {
  return e instanceof Unidentified587.default ? e : "object" == typeof e && "oProj" in e ? e.oProj : (0, Unidentified587.default)(e);
}
defaultExport = function (e, t, n) {
  var r,
    i,
    a,
    l = !1;
  return void 0 === t ? (i = c(e), r = s, l = !0) : (void 0 !== t.x || Array.isArray(t)) && (n = t, i = c(e), r = s, l = !0), r || (r = c(e)), i || (i = c(t)), n ? o(r, i, n) : (a = {
    forward: function (e, t) {
      return o(r, i, e, t);
    },
    inverse: function (e, t) {
      return o(i, r, e, t);
    }
  }, l && (a.oProj = i), a);
};
export { defaultExport as default };
