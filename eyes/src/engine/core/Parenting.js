/** @eyes-analysis
 * 文件职责：处理实体父级时间表与父参考系切换。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:731290-732068.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
/** @eyes-analysis
 * 类职责：处理实体父级时间表与父参考系切换。
 * 继承：无显式父类；导出：Parenting。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Parenting {
  /** @eyes-analysis
   * 【结构证据】返回 `r<o.length&&e===o[r][0]?o[r][1]:r>0?o[r-1][1]:""`；调用 `Entity.Entity.getEntityOptions`、`Pioneer.Sort.getIndexObject`、`new Error`；含显式错误分支。
   * 调用线索：Entity.Entity.getEntityOptions、Pioneer.Sort.getIndexObject、new Error。
   */
  static getParentOfEntity(t, e) {
    const i = Entity.Entity.getEntityOptions(t);
    if (void 0 === i) throw new Error(`There are no entity options for ${t}.`);
    const o = i.parents;
    const r = Pioneer.Sort.getIndexObject(e, o, Parenting._isStartTimeLessThanTime);
    return r < o.length && e === o[r][0] ? o[r][1] : r > 0 ? o[r - 1][1] : "";
  }
  /** @eyes-analysis
   * 【结构证据】返回 `set`；调用 `new Set`、`this._getAllAncestorsOfEntityRecursed`。
   * 调用线索：new Set、this._getAllAncestorsOfEntityRecursed。
   */
  static getAllAncestorsOfEntity(t) {
    const set = new Set();
    this._getAllAncestorsOfEntityRecursed(t, set);
    return set;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Entity.Entity.getEntityOptions`、`e.add`、`e.has`、`this._getAllAncestorsOfEntityRecursed`。
   * 调用线索：Entity.Entity.getEntityOptions、e.add、e.has、this._getAllAncestorsOfEntityRecursed。
   */
  static _getAllAncestorsOfEntityRecursed(t, e) {
    const i = Entity.Entity.getEntityOptions(t);
    if (void 0 === i?.parents) return;
    const s = i.parents;
    for (const t of s) {
      const i = t[1];
      e.has(i) || (e.add(i), this._getAllAncestorsOfEntityRecursed(i, e));
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t[0]<e`。
   */
  static _isStartTimeLessThanTime(t, e) {
    return t[0] < e;
  }
}
export { Parenting };
