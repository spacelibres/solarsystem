/** @eyes-analysis
 * 文件职责：实体所属组件/控制器的公共持有关系和启用/销毁接口。
 * 依据：import ../pioneer/public-api.js；EntityItem extends PioneerPublicApi.CollectionItem @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:190526-191019.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：实体所属组件/控制器的公共持有关系和启用/销毁接口。
 * 继承：PioneerPublicApi.CollectionItem；导出：EntityItem。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EntityItem extends PioneerPublicApi.CollectionItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_destroyed`、`_enabled`；调用 `super`。
   * 状态写入：_destroyed、_enabled。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._enabled = true;
    this._destroyed = false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。
   * 调用线索：this.__getCollectionParent。
   */
  getEntity() {
    return this.__getCollectionParent();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.getEntity().getScene().getEngine()`；调用 `this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`。
   * 调用线索：this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine。
   */
  getEngine() {
    return this.getEntity().getScene().getEngine();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._destroyed`。
   */
  isDestroyed() {
    return this._destroyed;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_destroyed`；调用 `super.__destroy`。
   * 状态写入：_destroyed。
   * 调用线索：super.__destroy。
   */
  __destroy() {
    this._destroyed = true;
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._enabled`。
   */
  isEnabled() {
    return this._enabled;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_enabled`。
   * 状态写入：_enabled。
   */
  setEnabled(enabled) {
    this._enabled = enabled;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __update() {}
  _enabled;
  _destroyed;
}
export { EntityItem };
