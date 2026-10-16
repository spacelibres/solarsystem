// Recovered from vendors.js:1093135-1093455.
function r(e) {
  var t = e.reduce(function (e, t) {
    var n = e[t.name];
    return e[t.name] = n ? Object.assign({}, n, t, {
      options: Object.assign({}, n.options, t.options),
      data: Object.assign({}, n.data, t.data)
    }) : t, e;
  }, {});
  return Object.keys(t).map(function (e) {
    return t[e];
  });
}
export { r as default };
