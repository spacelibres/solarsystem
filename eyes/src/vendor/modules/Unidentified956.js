// Recovered from vendors.js:2387122-2387329.
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
