/** @eyes-analysis
 * 文件职责：依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。
 * 依据：import ../pioneer/public-api.js；EntityRef extends PioneerPublicApi.BaseRef @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:74234-74700.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。
 * 继承：PioneerPublicApi.BaseRef；导出：EntityRef。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EntityRef extends PioneerPublicApi.BaseRef {
  /** @eyes-analysis
   * 【结构证据】写入 `_name`、`_scene`；调用 `super`。
   * 状态写入：_name、_scene。
   * 调用线索：super。
   */
  constructor(scene, name = "") {
    super();
    this._scene = scene;
    this._name = name;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._name`。
   */
  getName() {
    return this._name;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_name`。
   * 状态写入：_name。
   */
  setName(name) {
    this._name = name;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getName`、`t.isDestroyed`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`、`this.getRef`。
   * 调用线索：t.getName、t.isDestroyed、t.isEnabled、this._scene.getEntity、this._setRef等。
   */
  update() {
    if ("" === this._name) this.getRef() && this._setRef(null);else {
      const t = this.getRef();
      if (!t || t.isDestroyed() || !t.isEnabled() || t.getName() !== this._name) {
        const t = this._scene.getEntity(this._name);
        this._setRef(t);
      }
    }
  }
  _scene;
  _name;
}
export { EntityRef };
