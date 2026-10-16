// Recovered from vendors.js:1092927-1093134.
function r(e) {
  var t;
  return function () {
    return t || (t = new Promise(function (n) {
      Promise.resolve().then(function () {
        t = void 0, n(e());
      });
    })), t;
  };
}
export { r as default };
