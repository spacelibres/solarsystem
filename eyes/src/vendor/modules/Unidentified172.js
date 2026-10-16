// Recovered from vendors.js:1082310-1082523.
function r(e) {
  if (null == e) return window;
  if ("[object Window]" !== e.toString()) {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
export { r as default };
