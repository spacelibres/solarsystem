/** @eyes-analysis
 * 文件职责：Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器
 * 依据：// Recovered from vendors.js:1091225-1091730.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1091225-1091730.
import * as afterMain from "./afterMain-194.js";
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
