// Recovered from vendors.js:2398721-2398898.
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
