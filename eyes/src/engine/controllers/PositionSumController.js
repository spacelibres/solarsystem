// Recovered from app.js:790330-791478.
import * as Pioneer from "../pioneer/index.js";
class PositionSumController extends Pioneer.BaseController {
  constructor(t, e) {
    super(t, e);
    this._entities = new Pioneer.FastMap();
    this.addModifiedState("position");
  }
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
  removeEntity(t) {
    this._entities.delete(t);
    this.removeDependentState(t, "position");
  }
  setEntityParams(t, e, i) {
    const s = this._entities.get(t);
    if (!s) throw new Error(`The entity ${t} has not been previously added to the controller.`);
    void 0 !== e && (s.mult = e);
    void 0 !== i && (s.add = i);
  }
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
