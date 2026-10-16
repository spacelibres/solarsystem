// Recovered from vendors.js:2376505-2376718.
function r(e) {
  if (null == e) return window;
  if ("[object Window]" !== e.toString()) {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
export { r as default };
