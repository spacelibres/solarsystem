// Recovered from vendors.js:2385420-2385925.
import * as afterMain from "./afterMain-955.js";
function i(e) {
  var map = new Map(),
    set = new Set(),
    r = [];
  function i(e) {
    set.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function (e) {
      if (!set.has(e)) {
        var r = map.get(e);
        r && i(r);
      }
    }), r.push(e);
  }
  return e.forEach(function (e) {
    map.set(e.name, e);
  }), e.forEach(function (e) {
    set.has(e.name) || i(e);
  }), r;
}
function a(e) {
  var t = i(e);
  return afterMain.modifierPhases.reduce(function (e, n) {
    return e.concat(t.filter(function (e) {
      return e.phase === n;
    }));
  }, []);
}
export { a as default };
