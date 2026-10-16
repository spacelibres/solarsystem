// Recovered from vendors.js:1829740-1829907.
function r(e, t) {
  var n;
  return e > 1e-7 ? (1 - e * e) * (t / (1 - (n = e * t) * n) - .5 / e * Math.log((1 - n) / (1 + n))) : 2 * t;
}
export { r as default };
