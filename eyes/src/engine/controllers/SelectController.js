// Recovered from app.js:521462-522775.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 先选命中标签矩形中距离相机最近的实体，再回退几何射线拾取；结果通过引擎回调队列交付。 */
class SelectController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._callback = null;
  }
  getCallback() {
    return this._callback;
  }
  setCallback(callback) {
    this._callback = callback;
  }
  __update() {
    const input = this.getEntity().getScene().getEngine().getInput();
    if (input.isSelected() && null !== this._callback) {
      const candidateEntity = input.getActiveViewport();
      if (null !== candidateEntity) {
        const activeCamera = candidateEntity.getCamera();
        if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
          const selectionDirection = PioneerPublicApi.Vector3.pool.get();
          candidateEntity.getNormalSpacePositionFromPixelSpacePosition(selectionDirection, input.getSelectedPosition());
          let selectedEntity = null;
          let nearestLabelDistance = 0;
          const selectionPoint = PioneerPublicApi.Vector2.pool.get();
          selectionPoint.set(selectionDirection.x, selectionDirection.y);
          const entityCount = this.getEntity().getScene().getNumEntities();
          for (let entityIndex = 0; entityIndex < entityCount; entityIndex++) {
            const candidateEntity = this.getEntity().getScene().getEntityAt(entityIndex);
            if (candidateEntity.isEnabled()) {
              const label = candidateEntity.getComponent(PioneerPublicApi.LabelComponent);
              if (null !== label && "loaded" === label.getLoadState().state) {
                const labelBounds = label.getNormalSpaceBounds(activeCamera);
                if (void 0 !== labelBounds && labelBounds.contains(selectionPoint)) {
                  const labelDistance = candidateEntity.getCameraSpacePosition(activeCamera).magnitude();
                  if (null === selectedEntity || nearestLabelDistance > labelDistance) {
                    selectedEntity = candidateEntity;
                    nearestLabelDistance = labelDistance;
                  }
                }
              }
            }
          }
          PioneerPublicApi.Vector2.pool.release(selectionPoint);
          if (null === selectedEntity) {
            activeCamera.getCameraSpacePositionFromNormalSpacePosition(selectionDirection, selectionDirection);
            selectionDirection.mult(selectionDirection, 1 / selectionDirection.magnitude());
            selectedEntity = activeCamera.getNearestIntersectingEntity(selectionDirection);
          }
          PioneerPublicApi.Vector3.pool.release(selectionDirection);
          this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, selectedEntity), false);
        }
      }
    }
  }
  _callback;
}
export { SelectController };
