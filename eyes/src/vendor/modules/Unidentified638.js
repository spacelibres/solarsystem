// Recovered from vendors.js:1805279-1805475.
function r(e, t) {
  for (var n, r = 2 * Math.cos(2 * t), i = e.length - 1, a = e[i], s = 0; --i >= 0;) n = r * a - s + e[i], s = a, a = n;
  return t + n * Math.sin(2 * t);
}
export { r as default };
