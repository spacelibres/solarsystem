/** @eyes-analysis
 * 文件职责：Popper 浮层定位：按修饰器名称合并 options 和 data
 * 依据：// Recovered from vendors.js:2387330-2387650.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2387330-2387650.
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
