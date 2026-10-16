// Recovered from vendors.js:1752591-1753195.
import * as forward from "./forward-608.js";
import * as forwardDependency from "./forward-614.js";
let defaultExport;
var a = [forward.default, forwardDependency.default],
  s = {},
  o = [];
function add(e, t) {
  var n = o.length;
  return e.names ? (o[n] = e, e.names.forEach(function (e) {
    s[e.toLowerCase()] = n;
  }), this) : (console.log(t), !0);
}
function getNormalizedProjName(e) {
  return e.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
function get(e) {
  if (!e) return !1;
  var t = e.toLowerCase();
  return void 0 !== s[t] && o[s[t]] || (t = getNormalizedProjName(t)) in s && o[s[t]] ? o[s[t]] : void 0;
}
function start() {
  a.forEach(add);
}
defaultExport = {
  start: start,
  add: add,
  get: get
};
export { add };
export { get };
export { getNormalizedProjName };
export { start };
export { defaultExport as default };
