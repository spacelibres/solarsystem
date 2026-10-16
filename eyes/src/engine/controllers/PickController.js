// Recovered from app.js:511102-513193.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 将像素游标转相机射线；椭球先按赤极比缩放为球求交，再恢复方向，命中点转换到被拾取实体参考系后延迟回调。 */
class PickController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
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
    const input = this.getEntity().getScene().getEngine().getInput();
    if ((input.isSelected() || this._triggerOnHover) && null !== this._callback && null !== this._pickedEntity) {
      const viewport = input.getActiveViewport();
      if (null !== viewport) {
        const activeCamera = viewport.getCamera();
        if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
          const rayDirection = PioneerPublicApi.Vector3.pool.get();
          viewport.getNormalSpacePositionFromPixelSpacePosition(rayDirection, input.getCursorPosition());
          activeCamera.getCameraSpacePositionFromNormalSpacePosition(rayDirection, rayDirection);
          rayDirection.normalize(rayDirection);
          const intersectionDistances = PioneerPublicApi.Interval.pool.get();
          const spheroid = this.getEntity().getParent()?.getComponent(PioneerPublicApi.SpheroidComponent);
          if (spheroid) {
            const equatorialPolarRatio = spheroid.getEquatorialRadius() / spheroid.getPolarRadius();
            rayDirection.rotateInverse(this._pickedEntity.getOrientation(), rayDirection);
            rayDirection.z *= equatorialPolarRatio;
            const scaledPickedCenter = PioneerPublicApi.Vector3.pool.get();
            scaledPickedCenter.copy(this._pickedEntity.getCameraSpacePosition(activeCamera));
            scaledPickedCenter.rotateInverse(this._pickedEntity.getOrientation(), scaledPickedCenter);
            scaledPickedCenter.z *= equatorialPolarRatio;
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(intersectionDistances, rayDirection, scaledPickedCenter, spheroid.getEquatorialRadius());
            rayDirection.z /= equatorialPolarRatio;
            rayDirection.rotate(this._pickedEntity.getOrientation(), rayDirection);
            PioneerPublicApi.Vector3.pool.release(scaledPickedCenter);
          } else {
            const pickedCenter = this._pickedEntity.getCameraSpacePosition(activeCamera);
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(intersectionDistances, rayDirection, pickedCenter, this._pickedEntity.getOcclusionRadius());
          }
          if (!Number.isNaN(intersectionDistances.min)) {
            this._pickedPosition.mult(rayDirection, intersectionDistances.min);
            activeCamera.getEntity().getPositionRelativeToEntity(this._pickedPosition, this._pickedPosition, this._pickedEntity);
            this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, this._pickedPosition), false);
          }
          PioneerPublicApi.Interval.pool.release(intersectionDistances);
          PioneerPublicApi.Vector3.pool.release(rayDirection);
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
