// Recovered from vendors.js:1790212-1790554.
function r(e) {
  i(e.x), i(e.y);
}
function i(e) {
  if ("function" == typeof Number.isFinite) {
    if (Number.isFinite(e)) return;
    throw new TypeError("coordinates must be finite numbers");
  }
  if ("number" != typeof e || e != e || !isFinite(e)) throw new TypeError("coordinates must be finite numbers");
}
export { r as default };
