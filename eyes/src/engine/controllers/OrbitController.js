// Recovered from app.js:494121-501753.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._dragSensitivity = .01;
    this._dragSmoothness = .8;
    this._yawChangeSmoothedValue = 0;
    this._pitchChangeSmoothedValue = 0;
    this._yawAxisType = "none";
    this._yawAxisEntity = null;
    this._pitchAxisType = "none";
    this._pitchAxisEntity = null;
    this._yawAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._pitchAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
    this.addModifiedState("orientation");
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
  getYawAxisType() {
    return this._yawAxisType;
  }
  setYawAxisType(yawAxisType) {
    this._yawAxisType !== yawAxisType && (null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.removeDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.removeDependentState(this._yawAxisEntity.getName(), "position")), this._yawAxisType = yawAxisType, null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.addDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.addDependentState(this._yawAxisEntity.getName(), "position")));
  }
  getPitchAxisType() {
    return this._pitchAxisType;
  }
  setPitchAxisType(pitchAxisType) {
    this._pitchAxisType !== pitchAxisType && (null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.removeDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.removeDependentState(this._pitchAxisEntity.getName(), "position")), this._pitchAxisType = pitchAxisType, null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.addDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.addDependentState(this._pitchAxisEntity.getName(), "position")));
  }
  getYawAxisEntity() {
    return this._yawAxisEntity;
  }
  setYawAxisEntity(yawAxisEntity) {
    this._yawAxisEntity !== yawAxisEntity && (null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.removeDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.removeDependentState(this._yawAxisEntity.getName(), "position")), this._yawAxisEntity = yawAxisEntity, null !== this._yawAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType) ? this.addDependentState(this._yawAxisEntity.getName(), "orientation") : "position" === this._yawAxisType && this.addDependentState(this._yawAxisEntity.getName(), "position")));
  }
  getPitchAxisEntity() {
    return this._pitchAxisEntity;
  }
  setPitchAxisEntity(pitchAxisEntity) {
    this._pitchAxisEntity !== pitchAxisEntity && (null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.removeDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.removeDependentState(this._pitchAxisEntity.getName(), "position")), this._pitchAxisEntity = pitchAxisEntity, null !== this._pitchAxisEntity && (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType) ? this.addDependentState(this._pitchAxisEntity.getName(), "orientation") : "position" === this._pitchAxisType && this.addDependentState(this._pitchAxisEntity.getName(), "position")));
  }
  getYawAngleLimits() {
    return this._yawAngleLimits;
  }
  setYawAngleLimits(t) {
    this._yawAngleLimits.copy(t);
  }
  getPitchAngleLimits() {
    return this._pitchAngleLimits;
  }
  setPitchAngleLimits(t) {
    this._pitchAngleLimits.copy(t);
  }
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    this.getEntity().getPosition().isNaN() && this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    const e = this.getEntity().getScene().getEngine().getInput();
    let i = 1;
    e.isKeyPressed("x") && (i = .05);
    e.isShiftPressed() && (i = 5);
    const n = this.getEntity().getComponent(PioneerPublicApi.CameraComponent);
    null !== n && (i *= Math.min(1, n.getFieldOfView()));
    let o = 0;
    let r = 0;
    const a = e.getActiveViewport();
    if (null !== a) {
      const t = a.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        const t = e.getDraggedOffset();
        o = -t.x * this._dragSensitivity * i;
        r = t.y * this._dragSensitivity * i;
        e.isKeyPressed("d") && (o += this._dragSensitivity * i);
        e.isKeyPressed("a") && (o -= this._dragSensitivity * i);
        e.isKeyPressed("e") && (r -= this._dragSensitivity * i);
        e.isKeyPressed("q") && (r += this._dragSensitivity * i);
      }
    }
    this._yawChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(o, this._yawChangeSmoothedValue, this._dragSmoothness);
    this._pitchChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(r, this._pitchChangeSmoothedValue, this._dragSmoothness);
    Math.abs(this._yawChangeSmoothedValue) < 1e-4 * i && (this._yawChangeSmoothedValue = 0);
    Math.abs(this._pitchChangeSmoothedValue) < 1e-4 * i && (this._pitchChangeSmoothedValue = 0);
    const l = PioneerPublicApi.Vector3.pool.get();
    this._yawAxisEntity ??= this.getEntity().getParent();
    "x-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 0) : "y-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 1) : "z-axis" === this._yawAxisType && null !== this._yawAxisEntity ? this._yawAxisEntity.getOrientation().getAxis(l, 2) : "position" === this._yawAxisType && null !== this._yawAxisEntity ? l.normalize(this._yawAxisEntity.getPosition()) : this.getEntity().getOrientation().getAxis(l, 2);
    (l.isNaN() || l.isZero()) && this.getEntity().getOrientation().getAxis(l, 2);
    const c = PioneerPublicApi.Vector3.pool.get();
    this._pitchAxisEntity ??= this.getEntity().getParent();
    "x-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 0) : "y-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 1) : "z-axis" === this._pitchAxisType && null !== this._pitchAxisEntity ? this._pitchAxisEntity.getOrientation().getAxis(c, 2) : "position" === this._pitchAxisType && null !== this._pitchAxisEntity ? c.normalize(this._pitchAxisEntity.getPosition()) : this.getEntity().getOrientation().getAxis(c, 0);
    (c.isNaN() || c.isZero()) && this.getEntity().getOrientation().getAxis(c, 0);
    c.setNormalTo(l, c);
    const h = PioneerPublicApi.Quaternion.pool.get();
    h.setFromAxes(c, void 0, l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(l);
    const d = PioneerPublicApi.Vector3.pool.get();
    d.copy(this.getEntity().getPosition());
    (d.isZero() || d.isNaN()) && (this.getEntity().getOrientation().getAxis(d, 1), d.setMagnitude(d, -1e-5));
    d.rotateInverse(h, d);
    let u = 1;
    const p = t.getGroundComponent();
    if (p) {
      const e = PioneerPublicApi.Vector3.pool.get();
      const i = PioneerPublicApi.Vector3.pool.get();
      i.rotateInverse(t.getOrientation(), this.getEntity().getPosition());
      p.getGroundPosition(e, void 0, i);
      const n = e.magnitude();
      const o = i.distance(e);
      n > 0 && (u = Math.min(o / n, 1));
      PioneerPublicApi.Vector3.pool.release(e);
      PioneerPublicApi.Vector3.pool.release(i);
    }
    const _ = PioneerPublicApi.LatLonAlt.pool.get();
    PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(_, d, 0);
    _.lat += this._pitchChangeSmoothedValue * u;
    _.lon += this._yawChangeSmoothedValue * u;
    _.lat < 1e-4 - PioneerPublicApi.MathUtils.HalfPi && (_.lat = 1e-4 - PioneerPublicApi.MathUtils.HalfPi);
    _.lat > PioneerPublicApi.MathUtils.HalfPi - 1e-4 && (_.lat = PioneerPublicApi.MathUtils.HalfPi - 1e-4);
    _.lat < this._pitchAngleLimits.min && (_.lat = this._pitchAngleLimits.min);
    _.lat > this._pitchAngleLimits.max && (_.lat = this._pitchAngleLimits.max);
    _.lon < this._yawAngleLimits.min && (_.lon = this._yawAngleLimits.min);
    _.lon > this._yawAngleLimits.max && (_.lon = this._yawAngleLimits.max);
    PioneerPublicApi.Geometry.getXYZFromLLAOnSphere(d, _, 0);
    PioneerPublicApi.LatLonAlt.pool.release(_);
    d.rotate(h, d);
    PioneerPublicApi.Quaternion.pool.release(h);
    this.getEntity().setPosition(d);
    PioneerPublicApi.Vector3.pool.release(d);
  }
  _dragSensitivity;
  _dragSmoothness;
  _yawChangeSmoothedValue;
  _pitchChangeSmoothedValue;
  _yawAxisType;
  _yawAxisEntity;
  _pitchAxisType;
  _pitchAxisEntity;
  _yawAngleLimits;
  _pitchAngleLimits;
}
export { OrbitController };
