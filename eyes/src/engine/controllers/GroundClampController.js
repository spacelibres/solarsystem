// Recovered from app.js:476554-479707.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class GroundClampController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._groundEntityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._distanceFromGround = 0;
    this._up = new PioneerPublicApi.Vector3(0, 0, 1);
    this._clampOnlyIfBelow = false;
    this.addModifiedState("position");
  }
  setGroundEntityRef(t) {
    this.removeDependentState(this._groundEntityRef.getName(), "orientation");
    this.removeDependentState(this._groundEntityRef.getName(), "ground");
    this._groundEntityRef.setName(t);
    this.addDependentState(t, "orientation");
    this.addDependentState(t, "ground");
  }
  getDistanceFromGround() {
    return this._distanceFromGround;
  }
  setDistanceFromGround(distanceFromGround) {
    this._distanceFromGround = distanceFromGround;
  }
  getUp() {
    return this._up;
  }
  setUp(t) {
    this._up.copy(t);
  }
  getClampOnlyIfBelow() {
    return this._clampOnlyIfBelow;
  }
  setClampOnlyIfBelow(clampOnlyIfBelow) {
    this._clampOnlyIfBelow = clampOnlyIfBelow;
  }
  __updatePositionAtTime(t, e) {
    const i = this.getEntity().getParentAtTime(e);
    const n = this.getEntity().getScene().getEntity(i);
    if (null === n) return;
    let o = this._groundEntityRef.get();
    let r = o?.getGroundComponent() ?? null;
    for (; o && !o.getGroundComponent();) {
      o = this.getEntity().getScene().getEntity(o.getParentAtTime(e));
      r = o?.getGroundComponent() ?? null;
    }
    if (!o || !r) return;
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    const h = PioneerPublicApi.Quaternion.pool.get();
    if (o.getOrientationAtTime(h, e), n.getPositionRelativeToEntity(a, t, o, e), a.rotateInverse(h, a), l.copy(PioneerPublicApi.Vector3.NaN), r.getGroundPosition(l, c, a), !l.isNaN()) {
      const i = PioneerPublicApi.Vector3.pool.get();
      const r = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(r, e);
      i.rotate(r, this._up);
      PioneerPublicApi.Quaternion.pool.release(r);
      i.rotateInverse(h, i);
      const d = Math.abs(i.dot(c));
      PioneerPublicApi.Vector3.pool.release(i);
      const u = Math.min(this._distanceFromGround / d, this._distanceFromGround + this.getEntity().getExtentsRadius());
      l.addMult(l, c, u);
      (!this._clampOnlyIfBelow || a.dot(c) - l.dot(c) < 0) && (a.rotate(h, l), o.getPositionRelativeToEntity(t, a, n, e));
    }
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Quaternion.pool.release(h);
  }
  __update() {
    if (null === this.getEntity().getParent()) return;
    let t = this._groundEntityRef.get();
    let e = t?.getGroundComponent() ?? null;
    for (; t && !t.getGroundComponent();) {
      t = t.getParent();
      e = t?.getGroundComponent() ?? null;
    }
    if (!t || !e) return;
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    if (this.getEntity().getPositionRelativeToEntity(i, PioneerPublicApi.Vector3.Zero, t), i.rotateInverse(t.getOrientation(), i), n.copy(PioneerPublicApi.Vector3.NaN), e.getGroundPosition(n, o, i), !n.isNaN()) {
      const e = PioneerPublicApi.Vector3.pool.get();
      e.rotate(this.getEntity().getOrientation(), this._up);
      e.rotateInverse(t.getOrientation(), e);
      const r = Math.abs(e.dot(o));
      PioneerPublicApi.Vector3.pool.release(e);
      const a = Math.min(this._distanceFromGround / r, this._distanceFromGround + this.getEntity().getExtentsRadius());
      n.addMult(n, o, a);
      const l = this.getEntity().getParent();
      (!this._clampOnlyIfBelow || i.dot(o) - n.dot(o) < 0) && l && (i.rotate(t.getOrientation(), n), t.getPositionRelativeToEntity(i, i, l), this.getEntity().setPosition(i));
    }
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  _groundEntityRef;
  _distanceFromGround;
  _up;
  _clampOnlyIfBelow;
}
export { GroundClampController };
