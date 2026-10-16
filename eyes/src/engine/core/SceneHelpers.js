/** @eyes-analysis
 * 文件职责：为场景建立/配置实体和辅助显示。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:733452-735146.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
/** @eyes-analysis
 * 类职责：为场景建立/配置实体和辅助显示。
 * 继承：无显式父类；导出：SceneHelpers。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SceneHelpers {
  /** @eyes-analysis
   * 【结构证据】返回 `this.eclipJ2000ToJ2000Rotation`。
   */
  static getEclipJ2000ToJ2000Rotation() {
    return this.eclipJ2000ToJ2000Rotation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.getComponent`、`e.getOrientation`、`o.xyzFromLLA`、`t.rotate`。
   * 调用线索：e.getComponent、e.getOrientation、o.xyzFromLLA、t.rotate。
   */
  static llaToXYZ(t, e, i, n) {
    const o = e.getComponent(Pioneer.SpheroidComponent);
    null !== o && (o.xyzFromLLA(t, i), n || t.rotate(e.getOrientation(), t));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getComponent`、`e.getOrientation`、`o.llaFromXYZ`、`r.copy`。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.getComponent、e.getOrientation、o.llaFromXYZ等。
   */
  static xyzToLLA(t, e, i, n) {
    const o = e.getComponent(Pioneer.SpheroidComponent);
    if (null !== o) {
      const r = Pioneer.Vector3.pool.get();
      n ? r.copy(i) : r.rotateInverse(e.getOrientation(), i);
      o.llaFromXYZ(t, r);
      Pioneer.Vector3.pool.release(r);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `set`；调用 `new Set`、`set.delete`、`this._getDependentEntitiesRecursed`。
   * 调用线索：new Set、set.delete、this._getDependentEntitiesRecursed。
   */
  static getDependentEntities(t) {
    const set = new Set();
    this._getDependentEntitiesRecursed(t, set);
    set.delete(t);
    return set;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Entity.Entity.create`、`SceneHelpers.getDependentEntities`、`e.has`、`i.getEntityAt`、`i.getNumEntities`、`i.removeEntity`。
   * 调用线索：Entity.Entity.create、SceneHelpers.getDependentEntities、e.has、i.getEntityAt、i.getNumEntities等。
   */
  static loadEntities(t, e, i, s, o, r) {
    for (let t = 0; t < i.getNumEntities(); t++) {
      const s = i.getEntityAt(t);
      e.has(s.getName()) || (r?.(s), i.removeEntity(s), t--);
    }
    const set = new Set();
    for (const e of t) {
      for (const t of SceneHelpers.getDependentEntities(e)) set.add(t);
      set.add(e);
    }
    for (const t of set) {
      const e = Entity.Entity.create(t, i, s);
      o?.(e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Entity.Entity.getEntityOptions`、`e.add`、`e.has`、`new Set`、`set.add`、`this._getDependentEntitiesRecursed`。
   * 调用线索：Entity.Entity.getEntityOptions、e.add、e.has、new Set、set.add等。
   */
  static _getDependentEntitiesRecursed(t, e) {
    const i = Entity.Entity.getEntityOptions(t);
    if (void 0 === i) return;
    const set = new Set();
    const o = i.parents;
    for (const t of o) "" !== t[1] && set.add(t[1]);
    if (void 0 !== i.lightSource && set.add(i.lightSource), void 0 !== i.trail?.relativeTo && set.add(i.trail.relativeTo), i.controllers) for (let t = 0, e = i.controllers.length; t < e; t++) {
      const e = i.controllers[t];
      "align" === e.type && (void 0 !== e.primary.target && set.add(e.primary.target), void 0 !== e.secondary?.target && set.add(e.secondary.target));
    }
    if (i.dependents) for (let t = 0, e = i.dependents.length; t < e; t++) set.add(i.dependents[t]);
    for (const t of set) e.has(t) || (e.add(t), this._getDependentEntitiesRecursed(t, e));
  }
  static eclipJ2000ToJ2000Rotation = new Pioneer.Quaternion(.9791532214288992, .2031230389823101, 0, 0);
}
export { SceneHelpers };
