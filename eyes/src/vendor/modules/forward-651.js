/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1820514-1822924.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1820514-1822924.
import * as N from "./N.js";
let defaultExport;
function init() {
  this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = .863937979737193), this.long0 || (this.long0 = .4334234309119251), this.k0 || (this.k0 = .9999), this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
}
function forward(e) {
  var t,
    n,
    i,
    a,
    s,
    o,
    c,
    l = e.x,
    u = e.y,
    d = (0, N.default)(l - this.long0, this.over);
  return t = Math.pow((1 + this.e * Math.sin(u)) / (1 - this.e * Math.sin(u)), this.alfa * this.e / 2), n = 2 * (Math.atan(this.k * Math.pow(Math.tan(u / 2 + this.s45), this.alfa) / t) - this.s45), i = -d * this.alfa, a = Math.asin(Math.cos(this.ad) * Math.sin(n) + Math.sin(this.ad) * Math.cos(n) * Math.cos(i)), s = Math.asin(Math.cos(n) * Math.sin(i) / Math.cos(a)), o = this.n * s, c = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(a / 2 + this.s45), this.n), e.y = c * Math.cos(o) / 1, e.x = c * Math.sin(o) / 1, this.czech || (e.y *= -1, e.x *= -1), e;
}
function inverse(e) {
  var t,
    n,
    r,
    i,
    a,
    s,
    o,
    c = e.x;
  e.x = e.y, e.y = c, this.czech || (e.y *= -1, e.x *= -1), a = Math.sqrt(e.x * e.x + e.y * e.y), i = Math.atan2(e.y, e.x) / Math.sin(this.s0), r = 2 * (Math.atan(Math.pow(this.ro0 / a, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), t = Math.asin(Math.cos(this.ad) * Math.sin(r) - Math.sin(this.ad) * Math.cos(r) * Math.cos(i)), n = Math.asin(Math.cos(r) * Math.sin(i) / Math.cos(t)), e.x = this.long0 - n / this.alfa, s = t, o = 0;
  var l = 0;
  do {
    e.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(t / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(s)) / (1 - this.e * Math.sin(s)), this.e / 2)) - this.s45), Math.abs(s - e.y) < 1e-10 && (o = 1), s = e.y, l += 1;
  } while (0 === o && l < 15);
  return l >= 15 ? null : e;
}
var names = ["Krovak", "Krovak Modified", "Krovak (North Orientated)", "Krovak Modified (North Orientated)", "krovak"];
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
