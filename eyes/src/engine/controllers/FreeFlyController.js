// Recovered from app.js:473250-476553.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 每帧最多扫描 20 个实体寻找最近表面距离；局部输入经平滑及实体姿态旋转后，按最近距离缩放到位置参考系。 */

class FreeFlyController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._dragSensitivity = .05;
    this._dragSmoothness = .8;
    this._moveSmoothedValue = new PioneerPublicApi.Vector3(0, 0, 0);
    this._changeParentToNearestEntity = true;
    this._nearestEntity = null;
    this._nearestEntityDistance = Number.POSITIVE_INFINITY;
    this._nearestEntityCheckIndex = 0;
    this._forcedMoving = new PioneerPublicApi.Vector3();
    this._isMoving = false;
    this.addModifiedState("position");
    this.addDependentState("parent", "orientation");
    this.addDependentState("parent", "ground");
  }
  getDragSensitivity() {
    return this._dragSensitivity;
  }
  setDragSensitivity(dragSensitivity) {
    this._dragSensitivity = dragSensitivity;
  }
  getDragSmoothness() {
    return this._dragSmoothness;
  }
  setDragSmoothness(dragSmoothness) {
    this._dragSmoothness = dragSmoothness;
  }
  getChangeParentToNearestEntity() {
    return this._changeParentToNearestEntity;
  }
  setChangeParentToNearestEntity(changeParentToNearestEntity) {
    this._changeParentToNearestEntity = changeParentToNearestEntity;
  }
  getForcedMoving() {
    return this._forcedMoving;
  }
  setForcedMoving(forcedMoving) {
    this._forcedMoving.copy(forcedMoving);
  }
  __update() {
    if (null === this.getEntity().getParent()) return;
    if (this._nearestEntity) {
      this._nearestEntityDistance = this.getEntity().getDistanceTo(this._nearestEntity, true);
    }
    const scene = this.getEntity().getScene();
    const entityCount = scene.getNumEntities();
    const entitiesToCheck = Math.min(20, entityCount);
    for (let scanOffset = 0; scanOffset < entitiesToCheck; scanOffset++) {
      const nearestEntity = scene.getEntityAt((this._nearestEntityCheckIndex + scanOffset) % entityCount);
      if (nearestEntity === this.getEntity()) continue;
      const nearestEntityDistance = this.getEntity().getDistanceTo(nearestEntity, true);
      if (nearestEntityDistance >= 0 && this._nearestEntityDistance > nearestEntityDistance) {
        this._nearestEntityDistance = nearestEntityDistance;
        this._nearestEntity = nearestEntity;
      }
    }
    this._nearestEntityCheckIndex = (this._nearestEntityCheckIndex + entitiesToCheck) % entityCount;
    if (this._changeParentToNearestEntity && this._nearestEntity && this._nearestEntity !== this.getEntity().getParent()) {
      this.getEntity().setParent(this._nearestEntity);
    }
    if (this.getEntity().getOrientation().isNaN()) {
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    }
    if (this.getEntity().getPosition().isNaN()) {
      this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    }
    const inputMovement = PioneerPublicApi.Vector3.pool.get();
    inputMovement.set(0, 0, 0);
    const input = this.getEntity().getScene().getEngine().getInput();
    const viewport = input.getActiveViewport();
    if (null !== viewport) {
      const activeCamera = viewport.getCamera();
      if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
        let sensitivityScale = 1;
        if (input.isKeyPressed("x")) {
          sensitivityScale = .05;
        }
        if (input.isShiftPressed()) {
          sensitivityScale = 5;
        }
        const zoomOffset = input.getZoomedOffset();
        if (0 !== zoomOffset) {
          inputMovement.y += -zoomOffset * this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("w")) {
          inputMovement.y += this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("s")) {
          inputMovement.y -= this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("d")) {
          inputMovement.x += this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("a")) {
          inputMovement.x -= this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("e")) {
          inputMovement.z += this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("q")) {
          inputMovement.z -= this._dragSensitivity * sensitivityScale;
        }
      }
    }
    inputMovement.add(inputMovement, this._forcedMoving);
    this._isMoving = inputMovement.magnitudeSqr() > 0;
    this._moveSmoothedValue.lerp(inputMovement, this._moveSmoothedValue, this._dragSmoothness);
    if (!this._isMoving && this._moveSmoothedValue.magnitudeSqr() < 1e-7) {
      this._moveSmoothedValue.set(0, 0, 0);
    }
    PioneerPublicApi.Vector3.pool.release(inputMovement);
    const position = this.getEntity().getPosition();
    const newPosition = PioneerPublicApi.Vector3.pool.get();
    const movementInReference = PioneerPublicApi.Vector3.pool.get();
    movementInReference.rotate(this.getEntity().getOrientation(), this._moveSmoothedValue);
    newPosition.addMult(position, movementInReference, Math.max(1e-4, this._nearestEntityDistance));
    this.getEntity().setPosition(newPosition);
    PioneerPublicApi.Vector3.pool.release(movementInReference);
    PioneerPublicApi.Vector3.pool.release(newPosition);
  }
  _dragSensitivity;
  _dragSmoothness;
  _moveSmoothedValue;
  _changeParentToNearestEntity;
  _nearestEntity;
  _nearestEntityDistance;
  _nearestEntityCheckIndex;
  _forcedMoving;
  _isMoving;
}
export { FreeFlyController };
