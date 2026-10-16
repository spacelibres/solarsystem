// Recovered from vendors.js:1804751-1804948.
function r(e, t) {
  e = Math.abs(e), t = Math.abs(t);
  var n = Math.max(e, t),
    r = Math.min(e, t) / (n || 1);
  return n * Math.sqrt(1 + Math.pow(r, 2));
}
export { r as default };
