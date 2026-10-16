// Recovered from vendors.js:1825573-1825867.
function r(e, t, n, r, i) {
  var a, s;
  a = e / t;
  for (var o = 0; o < 15; o++) if (a += s = (e - (t * a - n * Math.sin(2 * a) + r * Math.sin(4 * a) - i * Math.sin(6 * a))) / (t - 2 * n * Math.cos(2 * a) + 4 * r * Math.cos(4 * a) - 6 * i * Math.cos(6 * a)), Math.abs(s) <= 1e-10) return a;
  return NaN;
}
export { r as default };
