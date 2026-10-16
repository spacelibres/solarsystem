// Recovered from app.js:532188-533213.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class TranslateController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._translation = new PioneerPublicApi.Vector3(0, 0, 0);
    this._relativeToOrientation = false;
    this.addModifiedState("position");
  }
  getTranslation() {
    return this._translation;
  }
  setTranslation(t) {
    this._translation.copy(t);
  }
  setRelativeToOrientation(relativeToOrientation) {
    this._relativeToOrientation = relativeToOrientation;
  }
  __updatePositionAtTime(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    if (this._relativeToOrientation) {
      const t = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(t, e);
      i.rotate(t, this._translation);
      PioneerPublicApi.Quaternion.pool.release(t);
    } else i.copy(this._translation);
    t.add(i, t);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  __update() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this._relativeToOrientation ? t.rotate(this.getEntity().getOrientation(), this._translation) : t.copy(this._translation);
    t.add(t, this.getEntity().getPosition());
    this.getEntity().setPosition(t);
    PioneerPublicApi.Vector3.pool.release(t);
  }
  _translation;
  _relativeToOrientation;
}
export { TranslateController };
