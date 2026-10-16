// Recovered from app.js:471919-473249.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class FixedToParentController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._lastParent = null;
    this._lastParentOrientation = new PioneerPublicApi.Quaternion();
    this._lastParent = this.getEntity().getParent();
    this._lastParent && this._lastParentOrientation.copy(this._lastParent.getOrientation());
    this.addModifiedState("position");
    this.addModifiedState("orientation");
    this.addDependentState("parent", "orientation");
  }
  __update() {
    const lastParent = this.getEntity().getParent();
    if (null === lastParent || null === this._lastParent) return void (this._lastParent = lastParent);
    const e = PioneerPublicApi.Quaternion.pool.get();
    if (e.inverse(this._lastParentOrientation), e.mult(this._lastParent.getOrientation(), e), !e.isNaN()) {
      const i = PioneerPublicApi.Vector3.pool.get();
      const n = PioneerPublicApi.Quaternion.pool.get();
      i.copy(this.getEntity().getPosition());
      lastParent !== this._lastParent && lastParent.getPositionRelativeToEntity(i, i, this._lastParent);
      i.rotate(e, i);
      lastParent !== this._lastParent && this._lastParent.getPositionRelativeToEntity(i, i, lastParent);
      this.getEntity().setPosition(i);
      n.mult(e, this.getEntity().getOrientation());
      this.getEntity().setOrientation(n);
      PioneerPublicApi.Quaternion.pool.release(n);
      PioneerPublicApi.Vector3.pool.release(i);
    }
    PioneerPublicApi.Quaternion.pool.release(e);
    this._lastParent = lastParent;
    this._lastParentOrientation.copy(lastParent.getOrientation());
  }
  _lastParent;
  _lastParentOrientation;
}
export { FixedToParentController };
