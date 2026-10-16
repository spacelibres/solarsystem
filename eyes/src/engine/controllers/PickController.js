// Recovered from app.js:511102-513193.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class PickController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._pickedEntity = null;
    this._callback = null;
    this._triggerOnHover = false;
    this._pickedPosition = new PioneerPublicApi.Vector3();
  }
  getPickedEntity() {
    return this._pickedEntity;
  }
  setPickedEntity(pickedEntity) {
    this._pickedEntity = pickedEntity;
  }
  getCallback() {
    return this._callback;
  }
  setCallback(callback) {
    this._callback = callback;
  }
  getTriggerOnHover() {
    return this._triggerOnHover;
  }
  setTriggerOnHover(triggerOnHover) {
    this._triggerOnHover = triggerOnHover;
  }
  getPickedPosition() {
    return this._pickedPosition;
  }
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    if ((t.isSelected() || this._triggerOnHover) && null !== this._callback && null !== this._pickedEntity) {
      const e = t.getActiveViewport();
      if (null !== e) {
        const i = e.getCamera();
        if (null !== i && i.getEntity() === this.getEntity()) {
          const n = PioneerPublicApi.Vector3.pool.get();
          e.getNormalSpacePositionFromPixelSpacePosition(n, t.getCursorPosition());
          i.getCameraSpacePositionFromNormalSpacePosition(n, n);
          n.normalize(n);
          const o = PioneerPublicApi.Interval.pool.get();
          const r = this.getEntity().getParent()?.getComponent(PioneerPublicApi.SpheroidComponent);
          if (r) {
            const t = r.getEquatorialRadius() / r.getPolarRadius();
            n.rotateInverse(this._pickedEntity.getOrientation(), n);
            n.z *= t;
            const e = PioneerPublicApi.Vector3.pool.get();
            e.copy(this._pickedEntity.getCameraSpacePosition(i));
            e.rotateInverse(this._pickedEntity.getOrientation(), e);
            e.z *= t;
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(o, n, e, r.getEquatorialRadius());
            n.z /= t;
            n.rotate(this._pickedEntity.getOrientation(), n);
            PioneerPublicApi.Vector3.pool.release(e);
          } else {
            const t = this._pickedEntity.getCameraSpacePosition(i);
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(o, n, t, this._pickedEntity.getOcclusionRadius());
          }
          Number.isNaN(o.min) || (this._pickedPosition.mult(n, o.min), i.getEntity().getPositionRelativeToEntity(this._pickedPosition, this._pickedPosition, this._pickedEntity), this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, this._pickedPosition), false));
          PioneerPublicApi.Interval.pool.release(o);
          PioneerPublicApi.Vector3.pool.release(n);
        }
      }
    }
  }
  _pickedEntity;
  _callback;
  _triggerOnHover;
  _pickedPosition;
}
export { PickController };
