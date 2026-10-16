// Recovered from vendors.js:1829908-1830214.
var r = .3333333333333333,
  i = .17222222222222222,
  a = .10257936507936508,
  s = .06388888888888888,
  o = .0664021164021164,
  c = .016415012942191543;
function l(e) {
  var t,
    n = [];
  return n[0] = e * r, t = e * e, n[0] += t * i, n[1] = t * s, t *= e, n[0] += t * a, n[1] += t * o, n[2] = t * c, n;
}
export { l as default };
