// Recovered from vendors.js:1088341-1088532.
import * as isElement from "./isElement-171.js";
function i(e) {
  return (((0, isElement.isElement)(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
export { i as default };
