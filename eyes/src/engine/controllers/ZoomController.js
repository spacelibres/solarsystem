// Recovered from app.js:533214-535371.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ZoomController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._zoomSensitivity = .05;
    this._zoomSmoothness = .8;
    this._zoomSmoothedValue = 1;
    this._distanceClamp = new PioneerPublicApi.Interval(.001, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
  }
  getZoomSensitivity() {
    return this._zoomSensitivity;
  }
  setZoomSensitivity(zoomSensitivity) {
    this._zoomSensitivity = zoomSensitivity;
  }
  getZoomSmoothness() {
    return this._zoomSmoothness;
  }
  setZoomSmoothness(zoomSmoothness) {
    this._zoomSmoothness = zoomSmoothness;
  }
  getDistanceClamp() {
    return this._distanceClamp;
  }
  setDistanceClamp(t) {
    this._distanceClamp.copy(t);
  }
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    const e = this.getEntity().getScene().getEngine().getInput();
    let i = 1;
    const n = e.getActiveViewport();
    if (null !== n) {
      const t = n.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        let t = 1;
        e.isKeyPressed("x") && (t = .05);
        e.isShiftPressed() && (t = 5);
        const s = e.getZoomedOffset();
        0 !== s && (i *= 2 ** (s * this._zoomSensitivity * t));
        e.isKeyPressed("w") && (i /= 2 ** (this._zoomSensitivity * t));
        e.isKeyPressed("s") && (i *= 2 ** (this._zoomSensitivity * t));
      }
    }
    this._zoomSmoothedValue = PioneerPublicApi.MathUtils.clamp(PioneerPublicApi.MathUtils.lerp(i, this._zoomSmoothedValue, this._zoomSmoothness), .8, 1.25);
    Math.abs(1 - this._zoomSmoothedValue) < 1e-7 && (this._zoomSmoothedValue = 1);
    const o = PioneerPublicApi.Vector3.pool.get();
    o.rotateInverse(t.getOrientation(), this.getEntity().getPosition());
    let r = 0;
    const a = t.getGroundComponent();
    if (a) {
      const t = PioneerPublicApi.Vector3.pool.get();
      a.getGroundPosition(t, void 0, o);
      r = t.magnitude();
      PioneerPublicApi.Vector3.pool.release(t);
    }
    let l = Math.max(o.magnitude() - r, 0);
    Number.isNaN(l) && (l = 1);
    l *= this._zoomSmoothedValue;
    (0 === l || 0 === o.magnitude()) && this._zoomSmoothedValue > 1 && (0 === o.magnitude() && (this.getEntity().getOrientation().getAxis(o, 1), o.neg(o), o.rotateInverse(t.getOrientation(), o)), l = 1e-5);
    l < this._distanceClamp.min && (l = this._distanceClamp.min, this._zoomSmoothedValue = 1);
    l > this._distanceClamp.max && (l = this._distanceClamp.max, this._zoomSmoothedValue = 1);
    o.setMagnitude(o, r + l);
    o.rotate(t.getOrientation(), o);
    this.getEntity().setPosition(o);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  _zoomSensitivity;
  _zoomSmoothness;
  _zoomSmoothedValue;
  _distanceClamp;
}
export { ZoomController };
