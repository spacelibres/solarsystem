// Recovered from app.js:528378-532187.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class TransitionController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._initialPosition = new PioneerPublicApi.Vector3();
    this._initialPosition.copy(e.getPosition());
    this._initialOrientation = new PioneerPublicApi.Quaternion();
    this._initialOrientation.copy(e.getOrientation());
    this._initialParent = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._transitionStart = Number.NaN;
    this._transitionTime = 1;
    this._transitionFunction = this._lerpTransitionFunction;
    this._resolvePromise = () => {};
    this._rejectPromise = () => {};
    this._endPromise = new Promise((resolvePromise, rejectPromise) => {
      this._resolvePromise = resolvePromise;
      this._rejectPromise = rejectPromise;
    });
    const i = this.getEntity().getParent();
    null !== i && this._initialParent.setName(i.getName());
    const n = this.getEntity().getController(TransitionController);
    null !== n && this.getEntity().removeController(n);
    const o = this.getEntity().addController(PioneerPublicApi.SetParentController, "transitionSetParent", this.getEntity().getControllerAt(0));
    null !== i && o.setParent(i.getName());
  }
  getTransitionTime() {
    return this._transitionTime;
  }
  setTransitionTime(transitionTime) {
    this._transitionTime = transitionTime;
  }
  setTransitionFunction(transitionFunction) {
    this._transitionFunction = transitionFunction;
  }
  getParent() {
    const t = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== t) return t.getName();
    const e = this.getEntity().getParent();
    return null !== e ? e.getName() : "";
  }
  setParent(t) {
    const e = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    null !== e && e.setParent(t);
  }
  getTimeRemaining() {
    return Math.max(0, this._transitionTime - (Date.now() / 1e3 - this._transitionStart));
  }
  async getEndPromise() {
    await this._endPromise;
  }
  __destroy() {
    super.__destroy();
    const t = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    null !== t && this.getEntity().removeController(t);
    0 !== this._transitionTime && this._rejectPromise(new PioneerPublicApi.CanceledError());
  }
  __update() {
    const t = this._initialParent.get();
    const e = this.getEntity().getParent();
    null === e && (this._transitionTime = 0, this.getEntity().removeController(this), this._rejectPromise(new Error("The final parent was destroyed or disabled before the transition could complete.")));
    Number.isNaN(this._transitionStart) && (this._transitionStart = Date.now() / 1e3);
    const i = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== i) {
      if (null === t) return void this.getEntity().getScene().getEngine().addCallback(() => {
        this.isDestroyed() || (this._transitionTime = 0, this.getEntity().removeController(this), "" !== this._initialParent.getName() ? this._rejectPromise(new Error(`The initial parent "${this._initialParent.getName()}" was destroyed or disabled before the first half of the transition could complete.`)) : this._resolvePromise());
      }, false);
      Date.now() / 1e3 - this._transitionStart >= this._transitionTime / 2 || t === e ? (this.getEntity().removeController(i), t !== e && null !== e && t.getPositionRelativeToEntity(this._initialPosition, this._initialPosition, e)) : this.getEntity().setParent(t);
    }
    const n = this.getEntity().getPosition();
    const o = this.getEntity().getOrientation();
    let r = PioneerPublicApi.MathUtils.clamp01((Date.now() / 1e3 - this._transitionStart) / this._transitionTime);
    Number.isNaN(r) && (r = 1);
    this._transitionFunction(this.getEntity(), this._initialPosition, n, this._initialOrientation, o, r);
    Date.now() / 1e3 - this._transitionStart >= this._transitionTime && this.getEntity().getScene().getEngine().addCallback(() => {
      this.isDestroyed() || (this._transitionTime = 0, this.getEntity().removeController(this), this._resolvePromise());
    }, false);
  }
  _lerpTransitionFunction(t, e, i, n, o, r) {
    const a = PioneerPublicApi.Vector3.pool.get();
    const l = PioneerPublicApi.Quaternion.pool.get();
    a.lerp(e, i, r);
    l.slerp(n, o, r);
    t.setPosition(a);
    t.setOrientation(l);
    PioneerPublicApi.Vector3.pool.release(a);
    PioneerPublicApi.Quaternion.pool.release(l);
  }
  _initialPosition;
  _initialOrientation;
  _initialParent;
  _transitionStart;
  _transitionTime;
  _transitionFunction;
  _resolvePromise;
  _rejectPromise;
  _endPromise;
}
export { TransitionController };
