/** @eyes-analysis
 * 文件职责：扩展基础标签管理器，加入太阳系实体分类与应用标签策略。
 * 依据：import ../../framework/eyes/index.js；LabelManager extends Eyes.LabelManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1405384-1405626.
import * as Eyes from "../../framework/eyes/index.js";
/** @eyes-analysis
 * 类职责：扩展基础标签管理器，加入太阳系实体分类与应用标签策略。
 * 继承：Eyes.LabelManager；导出：LabelManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LabelManager extends Eyes.LabelManager {
  /** @eyes-analysis
   * 【结构证据】返回 `this._app.getManager("link")?.getParsedLink?.(e)||e`；调用 `super._getLink`、`this._app.getManager`。
   * 调用线索：super._getLink、this._app.getManager、this._app.getManager("link")?.getParsedLink。
   */
  _getLink(t) {
    const e = super._getLink(t);
    return this._app.getManager("link")?.getParsedLink?.(e) || e;
  }
}
export { LabelManager };
