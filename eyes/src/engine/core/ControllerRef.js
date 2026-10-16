/** @eyes-analysis
 * 文件职责：按实体名、控制器类和名称/类序号重新解析可用控制器引用。
 * 依据：import ../pioneer/public-api.js；ControllerRef extends PioneerPublicApi.BaseRef @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:72328-73141.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按实体名、控制器类和名称/类序号重新解析可用控制器引用。
 * 继承：PioneerPublicApi.BaseRef；导出：ControllerRef。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ControllerRef extends PioneerPublicApi.BaseRef {
  /** @eyes-analysis
   * 【结构证据】写入 `_controllerClass`、`_controllerNameOrClassIndex`、`_entityName`、`_scene`；调用 `super`。
   * 状态写入：_controllerClass、_controllerNameOrClassIndex、_entityName、_scene。
   * 调用线索：super。
   */
  constructor(scene, controllerClass, entityName = "", controllerNameOrClassIndex = void 0) {
    super();
    this._scene = scene;
    this._controllerClass = controllerClass;
    this._entityName = entityName;
    this._controllerNameOrClassIndex = controllerNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._controllerClass`。
   */
  getControllerClass() {
    return this._controllerClass;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityName`。
   */
  getEntityName() {
    return this._entityName;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._controllerNameOrClassIndex`。
   */
  getControllerNameOrClassIndex() {
    return this._controllerNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_controllerNameOrClassIndex`、`_entityName`。
   * 状态写入：_controllerNameOrClassIndex、_entityName。
   */
  set(entityName, controllerNameOrClassIndex = 0) {
    this._entityName = entityName;
    this._controllerNameOrClassIndex = controllerNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getController`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`。
   * 调用线索：t.getController、t.isEnabled、this._scene.getEntity、this._setRef。
   */
  update() {
    if ("" === this._entityName) this._setRef(null);else {
      const t = this._scene.getEntity(this._entityName);
      if (t && t.isEnabled()) {
        const e = t.getController(this._controllerClass, this._controllerNameOrClassIndex);
        this._setRef(e);
      } else this._setRef(null);
    }
  }
  _scene;
  _controllerClass;
  _entityName;
  _controllerNameOrClassIndex;
}
export { ControllerRef };
