// Recovered from app.js:517751-520916.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class RotateByEntityOrientationController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._entityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._rotatingPosition = true;
    this._rotatingOrientation = true;
    this.addModifiedState("position");
    this.addModifiedState("velocity");
    this.addModifiedState("orientation");
    this.addModifiedState("angularVelocity");
    this.addDependentState("parent", "orientation");
  }
  setEntityForOrientation(t) {
    "" !== this._entityRef.getName() ? this.removeDependentState(this._entityRef.getName(), "orientation") : this.removeDependentState("parent", "orientation");
    this._entityRef.setName(t);
    "" !== this._entityRef.getName() ? this.addDependentState(t, "orientation") : this.addDependentState("parent", "orientation");
  }
  isRotatingPosition() {
    return this._rotatingPosition;
  }
  setRotatingPosition(rotatingPosition) {
    this._rotatingPosition = rotatingPosition;
    rotatingPosition ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  isRotatingOrientation() {
    return this._rotatingOrientation;
  }
  setRotatingOrientation(rotatingOrientation) {
    this._rotatingOrientation = rotatingOrientation;
    rotatingOrientation ? (this.addModifiedState("orientation"), this.addModifiedState("angularVelocity")) : (this.removeModifiedState("orientation"), this.removeModifiedState("angularVelocity"));
  }
  __updatePositionAtTime(t, e) {
    if (this._rotatingPosition) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.rotate(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  __updateVelocityAtTime(t, e) {
    if (this._rotatingPosition) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.rotate(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  __updateOrientationAtTime(t, e) {
    if (this._rotatingOrientation) {
      const i = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getScene().getEntity(this.getEntity().getParentAtTime(e));
      if (null !== i) {
        const n = PioneerPublicApi.Quaternion.pool.get();
        i.getOrientationAtTime(n, e);
        t.mult(n, t);
        PioneerPublicApi.Quaternion.pool.release(n);
      }
    }
  }
  __update() {
    const t = "" !== this._entityRef.getName() ? this._entityRef.get() : this.getEntity().getParent();
    if (null !== t) {
      if (this._rotatingPosition) {
        const e = PioneerPublicApi.Vector3.pool.get();
        e.rotate(t.getOrientation(), this.getEntity().getPosition());
        this.getEntity().setPosition(e);
        PioneerPublicApi.Vector3.pool.release(e);
        const i = PioneerPublicApi.Vector3.pool.get();
        i.rotate(t.getOrientation(), this.getEntity().getVelocity());
        this.getEntity().setVelocity(i);
        PioneerPublicApi.Vector3.pool.release(i);
      }
      if (this._rotatingOrientation) {
        const e = PioneerPublicApi.Quaternion.pool.get();
        e.mult(t.getOrientation(), this.getEntity().getOrientation());
        this.getEntity().setOrientation(e);
        PioneerPublicApi.Quaternion.pool.release(e);
        const i = PioneerPublicApi.Vector3.pool.get();
        i.rotate(t.getOrientation(), this.getEntity().getAngularVelocity());
        this.getEntity().setAngularVelocity(i);
        PioneerPublicApi.Vector3.pool.release(i);
      }
    }
  }
  _entityRef;
  _rotatingPosition;
  _rotatingOrientation;
}
export { RotateByEntityOrientationController };
