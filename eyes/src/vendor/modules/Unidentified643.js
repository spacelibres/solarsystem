/** @eyes-analysis
 * 文件职责：由经度推导并约束 UTM 分区
 * 依据：// Recovered from vendors.js:1806686-1806902.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1806686-1806902.
import * as N from "./N.js";
function i(e, t) {
  if (void 0 === e) {
    if ((e = Math.floor(30 * ((0, N.default)(t) + Math.PI) / Math.PI) + 1) < 0) return 0;
    if (e > 60) return 60;
  }
  return e;
}
export { i as default };
