// Recovered from vendors.js:1732166-1732434.
var r = /[\s_\-\/\(\)]/g;
function i(e, t) {
  if (e[t]) return e[t];
  for (var n, i = Object.keys(e), a = t.toLowerCase().replace(r, ""), s = -1; ++s < i.length;) if ((n = i[s]).toLowerCase().replace(r, "") === a) return e[n];
}
export { i as default };
