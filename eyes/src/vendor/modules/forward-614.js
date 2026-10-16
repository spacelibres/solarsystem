// Recovered from vendors.js:1755501-1755770.
let defaultExport;
function init() {}
function i(e) {
  return e;
}
var names = ["longlat", "identity"];
defaultExport = {
  init: init,
  forward: i,
  inverse: i,
  names: names
};
export { i as forward };
export { init };
export { i as inverse };
export { names };
export { defaultExport as default };
