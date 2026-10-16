/** @eyes-analysis
 * 文件职责：从 WKT 树构造 2015 规范的 PROJJSON 结构
 * 依据：// Recovered from vendors.js:1737266-1737556.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1737266-1737556.
import * as Unidentified599 from "./Unidentified599.js";
let defaultExport;
/** @eyes-analysis
 * 类职责：从 WKT 树构造 2015 规范的 PROJJSON 结构
 * 继承：Unidentified599.default；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PROJJSONBuilder2015 extends Unidentified599.default {
  /** @eyes-analysis
   * 源码方法 convert；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：super.convert。
   */
  static convert(e, t = {}) {
    return super.convert(e, t), t.coordinate_system && "Cartesian" === t.coordinate_system.subtype && delete t.coordinate_system, t.usage && delete t.usage, t;
  }
}
defaultExport = PROJJSONBuilder2015;
export { defaultExport as default };
