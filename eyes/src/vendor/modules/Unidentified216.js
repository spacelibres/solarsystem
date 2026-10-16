// Recovered from vendors.js:1104526-1104703.
var r = {
  start: "end",
  end: "start"
};
function i(e) {
  return e.replace(/start|end/g, function (e) {
    return r[e];
  });
}
export { i as default };
