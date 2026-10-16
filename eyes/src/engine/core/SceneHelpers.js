// Recovered from app.js:733452-735146.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class SceneHelpers {
  static getEclipJ2000ToJ2000Rotation() {
    return this.eclipJ2000ToJ2000Rotation;
  }
  static llaToXYZ(t, e, i, n) {
    const o = e.getComponent(Pioneer.SpheroidComponent);
    null !== o && (o.xyzFromLLA(t, i), n || t.rotate(e.getOrientation(), t));
  }
  static xyzToLLA(t, e, i, n) {
    const o = e.getComponent(Pioneer.SpheroidComponent);
    if (null !== o) {
      const r = Pioneer.Vector3.pool.get();
      n ? r.copy(i) : r.rotateInverse(e.getOrientation(), i);
      o.llaFromXYZ(t, r);
      Pioneer.Vector3.pool.release(r);
    }
  }
  static getDependentEntities(t) {
    const set = new Set();
    this._getDependentEntitiesRecursed(t, set);
    set.delete(t);
    return set;
  }
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
