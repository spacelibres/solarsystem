// Recovered from vendors.js:2398503-2398720.
var r = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function i(e) {
  return e.replace(/left|right|bottom|top/g, function (e) {
    return r[e];
  });
}
export { i as default };
