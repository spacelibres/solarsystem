// Recovered from app.js:791479-793204.
import * as Pioneer from "../pioneer/index.js";
class ZoomFitController extends Pioneer.BaseController {
  constructor(t, e) {
    super(t, e);
    this._entities = new Pioneer.FastMap();
    this._tightFit = false;
    this._zoomOutOnly = false;
    this._edgeSize = 0;
    this.addModifiedState("position");
  }
  addEntity(t) {
    const entityRef = new Pioneer.EntityRef(this.getEntity().getScene());
    entityRef.setName(t);
    this._entities.set(t, {
      ref: entityRef
    });
    this.addDependentState(t, "position");
  }
  removeEntity(t) {
    this._entities.delete(t);
    this.removeDependentState(t, "position");
  }
  setTightFit(tightFit) {
    this._tightFit = tightFit;
  }
  setZoomOutOnly(zoomOutOnly) {
    this._zoomOutOnly = zoomOutOnly;
  }
  setEdgeSize(edgeSize) {
    this._edgeSize = edgeSize;
  }
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    let e = 1;
    const i = this.getEntity().getComponent(Pioneer.CameraComponent);
    if (null !== i) {
      const t = Math.min(i.getHorizontalFieldOfView(), i.getVerticalFieldOfView());
      e = Math.tan(t / 2);
    }
    const n = Pioneer.Vector3.pool.get();
    n.normalize(this.getEntity().getPosition());
    0 === n.magnitudeSqr() && (this.getEntity().getOrientation().getAxis(n, 1), n.neg(n));
    n.isNaN() && n.copy(Pioneer.Vector3.YAxisNeg);
    const o = (1 + this._edgeSize / (.5 - this._edgeSize)) / e;
    let r = 0;
    const a = Pioneer.Vector3.pool.get();
    for (let e = 0, i = this._entities.getSize(); e < i; e++) {
      const i = this._entities.getAt(e).value.ref.get();
      if (null === i) continue;
      i.getPositionRelativeToEntity(a, Pioneer.Vector3.Zero, t);
      const l = i.getExtentsRadius();
      let c;
      if (this._tightFit) {
        const t = a.dot(n);
        a.addMult(a, n, -t);
        c = t + o * a.magnitude() + l * Math.sqrt(o * o + 1);
      } else c = a.magnitude() + l;
      r = Math.max(r, c);
    }
    Pioneer.Vector3.pool.release(a);
    this._tightFit || (r *= Math.sqrt(o * o + 1));
    (!this._zoomOutOnly || r > this.getEntity().getPosition().magnitude()) && (n.mult(n, r), this.getEntity().setPosition(n));
    Pioneer.Vector3.pool.release(n);
  }
  _entities;
  _tightFit;
  _zoomOutOnly;
  _edgeSize;
}
export { ZoomFitController };
