/** @eyes-analysis
 * 文件职责：在控制器时间覆盖内切换父实体参考系。
 * 依据：import ../pioneer/public-api.js；SetParentController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:522776-523362.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在控制器时间覆盖内切换父实体参考系。
 * 继承：PioneerPublicApi.BaseController；导出：SetParentController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SetParentController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_parent`；调用 `new PioneerPublicApi.EntityRef`、`super`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_parent。
   * 调用线索：new PioneerPublicApi.EntityRef、super、this.getEntity、this.getEntity().getScene。
   */
  constructor(t, e) {
    super(t, e);
    this._parent = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._parent.getName()`；调用 `this._parent.getName`。
   * 调用线索：this._parent.getName。
   */
  getParent() {
    return this._parent.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._parent.getName`、`this._parent.setName`、`this.addDependentState`、`this.removeDependentState`。
   * 调用线索：this._parent.getName、this._parent.setName、this.addDependentState、this.removeDependentState。
   */
  setParent(t) {
    "" !== this._parent.getName() && this.removeDependentState(this._parent.getName(), "position");
    this._parent.setName(t);
    "" !== this._parent.getName() && this.addDependentState(this._parent.getName(), "position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._parent.get`、`this.getEntity`、`this.getEntity().setParent`。
   * 调用线索：this._parent.get、this.getEntity、this.getEntity().setParent。
   */
  __update() {
    const t = this._parent.get();
    this.getEntity().setParent(t);
  }
  _parent;
}
export { SetParentController };
