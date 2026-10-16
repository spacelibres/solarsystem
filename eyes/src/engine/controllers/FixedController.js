// Recovered from app.js:470710-471918.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class FixedController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._position = null;
    this._orientation = null;
  }
  getPosition() {
    return this._position;
  }
  setPosition(t) {
    null !== t ? (this._position ??= new PioneerPublicApi.Vector3(), this._position.copy(t)) : this._position = null;
    null !== t ? (this.addModifiedState("position"), this.addModifiedState("velocity")) : (this.removeModifiedState("position"), this.removeModifiedState("velocity"));
  }
  getOrientation() {
    return this._orientation;
  }
  setOrientation(t) {
    null !== t ? (this._orientation ??= new PioneerPublicApi.Quaternion(), this._orientation.copy(t)) : this._orientation = null;
    null !== t ? this.addModifiedState("orientation") : this.removeModifiedState("orientation");
  }
  __updatePositionAtTime(t, e) {
    null !== this._position && t.copy(this._position);
  }
  __updateVelocityAtTime(t, e) {
    null !== this._position && t.set(0, 0, 0);
  }
  __updateOrientationAtTime(t, e) {
    null !== this._orientation && t.copy(this._orientation);
  }
  __update() {
    null !== this._position && (this.getEntity().setPosition(this._position), this.getEntity().setVelocity(PioneerPublicApi.Vector3.Zero));
    null !== this._orientation && this.getEntity().setOrientation(this._orientation);
  }
  _position;
  _orientation;
}
export { FixedController };
