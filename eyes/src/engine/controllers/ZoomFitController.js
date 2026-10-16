// Recovered from app.js:791479-793204.
import * as Pioneer from "../pioneer/index.js";
/** 取较小视场角及边缘留白计算包络斜率；tightFit 分解视轴与横向距离，否则使用包围球，zoomOutOnly 禁止缩近。 */
class ZoomFitController extends Pioneer.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._entities = new Pioneer.FastMap();
    this._tightFit = false;
    this._zoomOutOnly = false;
    this._edgeSize = 0;
    this.addModifiedState("position");
  }
  addEntity(entityName) {
    const entityRef = new Pioneer.EntityRef(this.getEntity().getScene());
    entityRef.setName(entityName);
    this._entities.set(entityName, {
      ref: entityRef
    });
    this.addDependentState(entityName, "position");
  }
  removeEntity(entityName) {
    this._entities.delete(entityName);
    this.removeDependentState(entityName, "position");
  }
  setTightFit(tightFit) {
    this._tightFit = tightFit;
  }
  setZoomOutOnly(zoomOutOnly) {
    this._zoomOutOnly = zoomOutOnly;
  }
  setEdgeSize(edgeSize) {
    this._edgeSize = edgeSize;
  }
  __update() {
    const parentEntity = this.getEntity().getParent();
    if (!parentEntity) return;
    let halfFieldOfViewTangent = 1;
    const camera = this.getEntity().getComponent(Pioneer.CameraComponent);
    if (null !== camera) {
      const fieldOfView = Math.min(camera.getHorizontalFieldOfView(), camera.getVerticalFieldOfView());
      halfFieldOfViewTangent = Math.tan(fieldOfView / 2);
    }
    const viewDirection = Pioneer.Vector3.pool.get();
    viewDirection.normalize(this.getEntity().getPosition());
    if (0 === viewDirection.magnitudeSqr()) {
      this.getEntity().getOrientation().getAxis(viewDirection, 1);
      viewDirection.neg(viewDirection);
    }
    if (viewDirection.isNaN()) {
      viewDirection.copy(Pioneer.Vector3.YAxisNeg);
    }
    const fitSlope = (1 + this._edgeSize / (.5 - this._edgeSize)) / halfFieldOfViewTangent;
    let requiredDistance = 0;
    const relativePosition = Pioneer.Vector3.pool.get();
    for (let entityIndex = 0, entityCount = this._entities.getSize(); entityIndex < entityCount; entityIndex++) {
      const fitEntity = this._entities.getAt(entityIndex).value.ref.get();
      if (null === fitEntity) continue;
      fitEntity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, parentEntity);
      const entityRadius = fitEntity.getExtentsRadius();
      let entityFitDistance;
      if (this._tightFit) {
        const axialDistance = relativePosition.dot(viewDirection);
        relativePosition.addMult(relativePosition, viewDirection, -axialDistance);
        entityFitDistance = axialDistance + fitSlope * relativePosition.magnitude() + entityRadius * Math.sqrt(fitSlope * fitSlope + 1);
      } else entityFitDistance = relativePosition.magnitude() + entityRadius;
      requiredDistance = Math.max(requiredDistance, entityFitDistance);
    }
    Pioneer.Vector3.pool.release(relativePosition);
    if (!this._tightFit) {
      requiredDistance *= Math.sqrt(fitSlope * fitSlope + 1);
    }
    if (!this._zoomOutOnly || requiredDistance > this.getEntity().getPosition().magnitude()) {
      viewDirection.mult(viewDirection, requiredDistance);
      this.getEntity().setPosition(viewDirection);
    }
    Pioneer.Vector3.pool.release(viewDirection);
  }
  _entities;
  _tightFit;
  _zoomOutOnly;
  _edgeSize;
}
export { ZoomFitController };
