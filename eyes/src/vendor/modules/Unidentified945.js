// Recovered from vendors.js:2382536-2382727.
import * as isElement from "./isElement-932.js";
function i(e) {
  return (((0, isElement.isElement)(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
export { i as default };
