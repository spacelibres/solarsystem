// Recovered from app.js:520917-521461.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ScaleController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._scale = 1;
    this.addModifiedState("position");
  }
  getScale() {
    return this._scale;
  }
  setScale(scale) {
    this._scale = scale;
  }
  __updatePositionAtTime(t, e) {
    t.mult(t, this._scale);
  }
  __updateVelocityAtTime(t, e) {
    t.mult(t, this._scale);
  }
  __update() {
    const t = PioneerPublicApi.Vector3.pool.get();
    t.mult(this.getEntity().getPosition(), this._scale);
    this.getEntity().setPosition(t);
    PioneerPublicApi.Vector3.pool.release(t);
  }
  _scale;
}
export { ScaleController };
