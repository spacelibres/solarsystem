/** @eyes-analysis
 * 文件职责：处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据
 * 依据：// Recovered from vendors.js:1742552-1743128.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1742552-1743128.
import * as Unidentified599 from "./Unidentified599.js";
let defaultExport;
/** @eyes-analysis
 * 类职责：处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据
 * 继承：Unidentified599.default；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PROJJSONBuilder2019 extends Unidentified599.default {
  /** @eyes-analysis
   * 源码方法 convert；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：Array.isArray、e.find、i.slice、r.find、super.convert等。
   */
  static convert(e, t = {}) {
    super.convert(e, t);
    const n = e.find(e => Array.isArray(e) && "CS" === e[0]);
    n && (t.coordinate_system = {
      subtype: n[1],
      axis: this.extractAxes(e)
    });
    const r = e.find(e => Array.isArray(e) && "USAGE" === e[0]);
    if (r) {
      const e = r.find(e => Array.isArray(e) && "SCOPE" === e[0]),
        n = r.find(e => Array.isArray(e) && "AREA" === e[0]),
        i = r.find(e => Array.isArray(e) && "BBOX" === e[0]);
      t.usage = {}, e && (t.usage.scope = e[1]), n && (t.usage.area = n[1]), i && (t.usage.bbox = i.slice(1));
    }
    return t;
  }
}
defaultExport = PROJJSONBuilder2019;
export { defaultExport as default };
