// Recovered from app.js:521462-522775.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SelectController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._callback = null;
  }
  getCallback() {
    return this._callback;
  }
  setCallback(callback) {
    this._callback = callback;
  }
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    if (t.isSelected() && null !== this._callback) {
      const e = t.getActiveViewport();
      if (null !== e) {
        const i = e.getCamera();
        if (null !== i && i.getEntity() === this.getEntity()) {
          const n = PioneerPublicApi.Vector3.pool.get();
          e.getNormalSpacePositionFromPixelSpacePosition(n, t.getSelectedPosition());
          let o = null;
          let r = 0;
          const a = PioneerPublicApi.Vector2.pool.get();
          a.set(n.x, n.y);
          const l = this.getEntity().getScene().getNumEntities();
          for (let t = 0; t < l; t++) {
            const e = this.getEntity().getScene().getEntityAt(t);
            if (e.isEnabled()) {
              const t = e.getComponent(PioneerPublicApi.LabelComponent);
              if (null !== t && "loaded" === t.getLoadState().state) {
                const s = t.getNormalSpaceBounds(i);
                if (void 0 !== s && s.contains(a)) {
                  const t = e.getCameraSpacePosition(i).magnitude();
                  (null === o || r > t) && (o = e, r = t);
                }
              }
            }
          }
          PioneerPublicApi.Vector2.pool.release(a);
          null === o && (i.getCameraSpacePositionFromNormalSpacePosition(n, n), n.mult(n, 1 / n.magnitude()), o = i.getNearestIntersectingEntity(n));
          PioneerPublicApi.Vector3.pool.release(n);
          this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, o), false);
        }
      }
    }
  }
  _callback;
}
export { SelectController };
