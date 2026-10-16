// Recovered from vendors.js:1104308-1104525.
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
