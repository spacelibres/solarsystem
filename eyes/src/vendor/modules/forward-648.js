/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1812827-1814513.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1812827-1814513.
let defaultExport;
function init() {
  var lat0 = this.lat0;
  this.lambda0 = this.long0;
  var t = Math.sin(lat0),
    n = this.a,
    r = 1 / this.rf,
    i = 2 * r - Math.pow(r, 2),
    a = this.e = Math.sqrt(i);
  this.R = this.k0 * n * Math.sqrt(1 - i) / (1 - i * Math.pow(t, 2)), this.alpha = Math.sqrt(1 + i / (1 - i) * Math.pow(Math.cos(lat0), 4)), this.b0 = Math.asin(t / this.alpha);
  var s = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
    o = Math.log(Math.tan(Math.PI / 4 + lat0 / 2)),
    c = Math.log((1 + a * t) / (1 - a * t));
  this.K = s - this.alpha * o + this.alpha * a / 2 * c;
}
function forward(e) {
  var t = Math.log(Math.tan(Math.PI / 4 - e.y / 2)),
    n = this.e / 2 * Math.log((1 + this.e * Math.sin(e.y)) / (1 - this.e * Math.sin(e.y))),
    r = -this.alpha * (t + n) + this.K,
    i = 2 * (Math.atan(Math.exp(r)) - Math.PI / 4),
    a = this.alpha * (e.x - this.lambda0),
    s = Math.atan(Math.sin(a) / (Math.sin(this.b0) * Math.tan(i) + Math.cos(this.b0) * Math.cos(a))),
    o = Math.asin(Math.cos(this.b0) * Math.sin(i) - Math.sin(this.b0) * Math.cos(i) * Math.cos(a));
  return e.y = this.R / 2 * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))) + this.y0, e.x = this.R * s + this.x0, e;
}
function inverse(e) {
  for (var t = e.x - this.x0, n = e.y - this.y0, r = t / this.R, i = 2 * (Math.atan(Math.exp(n / this.R)) - Math.PI / 4), a = Math.asin(Math.cos(this.b0) * Math.sin(i) + Math.sin(this.b0) * Math.cos(i) * Math.cos(r)), s = Math.atan(Math.sin(r) / (Math.cos(this.b0) * Math.cos(r) - Math.sin(this.b0) * Math.tan(i))), o = this.lambda0 + s / this.alpha, c = 0, l = a, u = -1e3, d = 0; Math.abs(l - u) > 1e-7;) {
    if (++d > 20) return;
    c = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + a / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(l)) / 2)), u = l, l = 2 * Math.atan(Math.exp(c)) - Math.PI / 2;
  }
  return e.x = o, e.y = l, e;
}
var names = ["somerc"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
};
export { forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
