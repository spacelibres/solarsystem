/** @eyes-analysis
 * 文件职责：按场景、实体名、组件类和名称/类序号重新解析可用组件引用。
 * 依据：import ../pioneer/public-api.js；ComponentRef extends PioneerPublicApi.BaseRef @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:71529-72327.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按场景、实体名、组件类和名称/类序号重新解析可用组件引用。
 * 继承：PioneerPublicApi.BaseRef；导出：ComponentRef。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ComponentRef extends PioneerPublicApi.BaseRef {
  /** @eyes-analysis
   * 【结构证据】写入 `_componentClass`、`_componentNameOrClassIndex`、`_entityName`、`_scene`；调用 `super`。
   * 状态写入：_componentClass、_componentNameOrClassIndex、_entityName、_scene。
   * 调用线索：super。
   */
  constructor(scene, componentClass, entityName = "", componentNameOrClassIndex = void 0) {
    super();
    this._scene = scene;
    this._entityName = entityName;
    this._componentClass = componentClass;
    this._componentNameOrClassIndex = componentNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._componentClass`。
   */
  getComponentClass() {
    return this._componentClass;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityName`。
   */
  getEntityName() {
    return this._entityName;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._componentNameOrClassIndex`。
   */
  getComponentNameOrClassIndex() {
    return this._componentNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_componentNameOrClassIndex`、`_entityName`。
   * 状态写入：_componentNameOrClassIndex、_entityName。
   */
  set(entityName, componentNameOrClassIndex = 0) {
    this._entityName = entityName;
    this._componentNameOrClassIndex = componentNameOrClassIndex;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getComponent`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`。
   * 调用线索：t.getComponent、t.isEnabled、this._scene.getEntity、this._setRef。
   */
  update() {
    if ("" === this._entityName) this._setRef(null);else {
      const t = this._scene.getEntity(this._entityName);
      if (t && t.isEnabled()) {
        const e = t.getComponent(this._componentClass, this._componentNameOrClassIndex);
        this._setRef(e);
      } else this._setRef(null);
    }
  }
  _scene;
  _componentClass;
  _entityName;
  _componentNameOrClassIndex;
}
export { ComponentRef };
