// Recovered from vendors.js:1805476-1805666.
function r(e, t) {
  for (var n, r = 2 * Math.cos(t), i = e.length - 1, a = e[i], s = 0; --i >= 0;) n = r * a - s + e[i], s = a, a = n;
  return Math.sin(t) * n;
}
export { r as default };
