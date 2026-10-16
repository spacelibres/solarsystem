// Recovered from app.js:528378-532187.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 墙钟秒驱动过渡并在半程移除临时换父控制器；旧位置转入最终父参考系，完成/取消通过 Promise 及引擎延迟队列交付。 */
class TransitionController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._initialPosition = new PioneerPublicApi.Vector3();
    this._initialPosition.copy(entity.getPosition());
    this._initialOrientation = new PioneerPublicApi.Quaternion();
    this._initialOrientation.copy(entity.getOrientation());
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
    const initialParent = this.getEntity().getParent();
    if (null !== initialParent) {
      this._initialParent.setName(initialParent.getName());
    }
    const previousTransition = this.getEntity().getController(TransitionController);
    if (null !== previousTransition) {
      this.getEntity().removeController(previousTransition);
    }
    const setParentController = this.getEntity().addController(PioneerPublicApi.SetParentController, "transitionSetParent", this.getEntity().getControllerAt(0));
    if (null !== initialParent) {
      setParentController.setParent(initialParent.getName());
    }
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
    const setParentController = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== setParentController) return setParentController.getName();
    const parentEntity = this.getEntity().getParent();
    return null !== parentEntity ? parentEntity.getName() : "";
  }
  setParent(parentName) {
    const setParentController = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== setParentController) {
      setParentController.setParent(parentName);
    }
  }
  getTimeRemaining() {
    return Math.max(0, this._transitionTime - (Date.now() / 1e3 - this._transitionStart));
  }
  async getEndPromise() {
    await this._endPromise;
  }
  __destroy() {
    super.__destroy();
    const setParentController = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== setParentController) {
      this.getEntity().removeController(setParentController);
    }
    if (0 !== this._transitionTime) {
      this._rejectPromise(new PioneerPublicApi.CanceledError());
    }
  }
  __update() {
    const initialParent = this._initialParent.get();
    const finalParent = this.getEntity().getParent();
    if (null === finalParent) {
      this._transitionTime = 0;
      this.getEntity().removeController(this);
      this._rejectPromise(new Error("The final parent was destroyed or disabled before the transition could complete."));
    }
    if (Number.isNaN(this._transitionStart)) {
      this._transitionStart = Date.now() / 1e3;
    }
    const setParentController = this.getEntity().getController(PioneerPublicApi.SetParentController, "transitionSetParent");
    if (null !== setParentController) {
      if (null === initialParent) return void this.getEntity().getScene().getEngine().addCallback(() => {
        if (!this.isDestroyed()) {
          this._transitionTime = 0;
          this.getEntity().removeController(this);
          if ("" !== this._initialParent.getName()) {
            this._rejectPromise(new Error(`The initial parent "${this._initialParent.getName()}" was destroyed or disabled before the first half of the transition could complete.`));
          } else {
            this._resolvePromise();
          }
        }
      }, false);
      if (Date.now() / 1e3 - this._transitionStart >= this._transitionTime / 2 || initialParent === finalParent) {
        this.getEntity().removeController(setParentController);
        if (initialParent !== finalParent && null !== finalParent) {
          initialParent.getPositionRelativeToEntity(this._initialPosition, this._initialPosition, finalParent);
        }
      } else {
        this.getEntity().setParent(initialParent);
      }
    }
    const finalPosition = this.getEntity().getPosition();
    const finalOrientation = this.getEntity().getOrientation();
    let fraction = PioneerPublicApi.MathUtils.clamp01((Date.now() / 1e3 - this._transitionStart) / this._transitionTime);
    if (Number.isNaN(fraction)) {
      fraction = 1;
    }
    this._transitionFunction(this.getEntity(), this._initialPosition, finalPosition, this._initialOrientation, finalOrientation, fraction);
    if (Date.now() / 1e3 - this._transitionStart >= this._transitionTime) {
      this.getEntity().getScene().getEngine().addCallback(() => {
        if (!this.isDestroyed()) {
          this._transitionTime = 0;
          this.getEntity().removeController(this);
          this._resolvePromise();
        }
      }, false);
    }
  }
  _lerpTransitionFunction(entity, initialPosition, finalPosition, initialOrientation, finalOrientation, fraction) {
    const position = PioneerPublicApi.Vector3.pool.get();
    const orientation = PioneerPublicApi.Quaternion.pool.get();
    position.lerp(initialPosition, finalPosition, fraction);
    orientation.slerp(initialOrientation, finalOrientation, fraction);
    entity.setPosition(position);
    entity.setOrientation(orientation);
    PioneerPublicApi.Vector3.pool.release(position);
    PioneerPublicApi.Quaternion.pool.release(orientation);
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
