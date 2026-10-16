/** @eyes-analysis
 * 文件职责：将多个引用实体的相对位置叠加到当前实体。
 * 依据：import ../pioneer/index.js；PositionSumController extends Pioneer.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:790330-791478.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：将多个引用实体的相对位置叠加到当前实体。
 * 继承：Pioneer.BaseController；导出：PositionSumController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PositionSumController extends Pioneer.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_entities`；调用 `new Pioneer.FastMap`、`super`、`this.addModifiedState`。
   * 状态写入：_entities。
   * 调用线索：new Pioneer.FastMap、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._entities = new Pioneer.FastMap();
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `entityRef.setName`、`new Pioneer.EntityRef`、`this._entities.set`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getScene`。
   * 调用线索：entityRef.setName、new Pioneer.EntityRef、this._entities.set、this.addDependentState、this.getEntity等。
   */
  addEntity(t, e, i) {
    const entityRef = new Pioneer.EntityRef(this.getEntity().getScene());
    entityRef.setName(t);
    this._entities.set(t, {
      ref: entityRef,
      mult: e,
      add: i
    });
    this.addDependentState(t, "position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._entities.delete`、`this.removeDependentState`。
   * 调用线索：this._entities.delete、this.removeDependentState。
   */
  removeEntity(t) {
    this._entities.delete(t);
    this.removeDependentState(t, "position");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._entities.get`；含显式错误分支。
   * 调用线索：new Error、this._entities.get。
   */
  setEntityParams(t, e, i) {
    const s = this._entities.get(t);
    if (!s) throw new Error(`The entity ${t} has not been previously added to the controller.`);
    void 0 !== e && (s.mult = e);
    void 0 !== i && (s.add = i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.addMult`、`e.set`、`i.magnitude`、`o.ref.get`。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.addMult、e.set、i.magnitude等。
   */
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    const e = Pioneer.Vector3.pool.get();
    const i = Pioneer.Vector3.pool.get();
    e.set(0, 0, 0);
    for (let n = 0, o = this._entities.getSize(); n < o; n++) {
      const o = this._entities.getAt(n).value;
      const r = o.ref.get();
      if (null === r) continue;
      r.getPositionRelativeToEntity(i, Pioneer.Vector3.Zero, t);
      const a = i.magnitude();
      e.addMult(e, i, o.mult + (a > 0 ? o.add / a : 0));
    }
    this.getEntity().setPosition(e);
    Pioneer.Vector3.pool.release(e);
    Pioneer.Vector3.pool.release(i);
  }
  _entities;
}
export { PositionSumController };
