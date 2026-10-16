// Recovered from app.js:473250-476553.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class FreeFlyController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._dragSensitivity = .05;
    this._dragSmoothness = .8;
    this._moveSmoothedValue = new PioneerPublicApi.Vector3(0, 0, 0);
    this._changeParentToNearestEntity = true;
    this._nearestEntity = null;
    this._nearestEntityDistance = Number.POSITIVE_INFINITY;
    this._nearestEntityCheckIndex = 0;
    this._forcedMoving = new PioneerPublicApi.Vector3();
    this._isMoving = false;
    this.addModifiedState("position");
    this.addDependentState("parent", "orientation");
    this.addDependentState("parent", "ground");
  }
  getDragSensitivity() {
    return this._dragSensitivity;
  }
  setDragSensitivity(dragSensitivity) {
    this._dragSensitivity = dragSensitivity;
  }
  getDragSmoothness() {
    return this._dragSmoothness;
  }
  setDragSmoothness(dragSmoothness) {
    this._dragSmoothness = dragSmoothness;
  }
  getChangeParentToNearestEntity() {
    return this._changeParentToNearestEntity;
  }
  setChangeParentToNearestEntity(changeParentToNearestEntity) {
    this._changeParentToNearestEntity = changeParentToNearestEntity;
  }
  getForcedMoving() {
    return this._forcedMoving;
  }
  setForcedMoving(t) {
    this._forcedMoving.copy(t);
  }
  __update() {
    if (null === this.getEntity().getParent()) return;
    this._nearestEntity && (this._nearestEntityDistance = this.getEntity().getDistanceTo(this._nearestEntity, true));
    const t = this.getEntity().getScene();
    const e = t.getNumEntities();
    const i = Math.min(20, e);
    for (let s = 0; s < i; s++) {
      const nearestEntity = t.getEntityAt((this._nearestEntityCheckIndex + s) % e);
      if (nearestEntity === this.getEntity()) continue;
      const nearestEntityDistance = this.getEntity().getDistanceTo(nearestEntity, true);
      nearestEntityDistance >= 0 && this._nearestEntityDistance > nearestEntityDistance && (this._nearestEntityDistance = nearestEntityDistance, this._nearestEntity = nearestEntity);
    }
    this._nearestEntityCheckIndex = (this._nearestEntityCheckIndex + i) % e;
    this._changeParentToNearestEntity && this._nearestEntity && this._nearestEntity !== this.getEntity().getParent() && this.getEntity().setParent(this._nearestEntity);
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    this.getEntity().getPosition().isNaN() && this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    const n = PioneerPublicApi.Vector3.pool.get();
    n.set(0, 0, 0);
    const o = this.getEntity().getScene().getEngine().getInput();
    const r = o.getActiveViewport();
    if (null !== r) {
      const t = r.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        let t = 1;
        o.isKeyPressed("x") && (t = .05);
        o.isShiftPressed() && (t = 5);
        const e = o.getZoomedOffset();
        0 !== e && (n.y += -e * this._dragSensitivity * t);
        o.isKeyPressed("w") && (n.y += this._dragSensitivity * t);
        o.isKeyPressed("s") && (n.y -= this._dragSensitivity * t);
        o.isKeyPressed("d") && (n.x += this._dragSensitivity * t);
        o.isKeyPressed("a") && (n.x -= this._dragSensitivity * t);
        o.isKeyPressed("e") && (n.z += this._dragSensitivity * t);
        o.isKeyPressed("q") && (n.z -= this._dragSensitivity * t);
      }
    }
    n.add(n, this._forcedMoving);
    this._isMoving = n.magnitudeSqr() > 0;
    this._moveSmoothedValue.lerp(n, this._moveSmoothedValue, this._dragSmoothness);
    !this._isMoving && this._moveSmoothedValue.magnitudeSqr() < 1e-7 && this._moveSmoothedValue.set(0, 0, 0);
    PioneerPublicApi.Vector3.pool.release(n);
    const a = this.getEntity().getPosition();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    c.rotate(this.getEntity().getOrientation(), this._moveSmoothedValue);
    l.addMult(a, c, Math.max(1e-4, this._nearestEntityDistance));
    this.getEntity().setPosition(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(l);
  }
  _dragSensitivity;
  _dragSmoothness;
  _moveSmoothedValue;
  _changeParentToNearestEntity;
  _nearestEntity;
  _nearestEntityDistance;
  _nearestEntityCheckIndex;
  _forcedMoving;
  _isMoving;
}
export { FreeFlyController };
