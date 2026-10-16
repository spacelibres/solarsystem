// Recovered from app.js:476554-479707.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 沿指定地面实体祖先寻找 ground；位置与 up 先转入地面局部系，按法线偏移后再转换回父参考系。 */

class GroundClampController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._groundEntityRef = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._distanceFromGround = 0;
    this._up = new PioneerPublicApi.Vector3(0, 0, 1);
    this._clampOnlyIfBelow = false;
    this.addModifiedState("position");
  }
  setGroundEntityRef(entityName) {
    this.removeDependentState(this._groundEntityRef.getName(), "orientation");
    this.removeDependentState(this._groundEntityRef.getName(), "ground");
    this._groundEntityRef.setName(entityName);
    this.addDependentState(entityName, "orientation");
    this.addDependentState(entityName, "ground");
  }
  getDistanceFromGround() {
    return this._distanceFromGround;
  }
  setDistanceFromGround(distanceFromGround) {
    this._distanceFromGround = distanceFromGround;
  }
  getUp() {
    return this._up;
  }
  setUp(upVector) {
    this._up.copy(upVector);
  }
  getClampOnlyIfBelow() {
    return this._clampOnlyIfBelow;
  }
  setClampOnlyIfBelow(clampOnlyIfBelow) {
    this._clampOnlyIfBelow = clampOnlyIfBelow;
  }
  __updatePositionAtTime(positionOut, time) {
    const parentName = this.getEntity().getParentAtTime(time);
    const parentEntity = this.getEntity().getScene().getEntity(parentName);
    if (null === parentEntity) return;
    let groundEntity = this._groundEntityRef.get();
    let groundComponent = groundEntity?.getGroundComponent() ?? null;
    for (; groundEntity && !groundEntity.getGroundComponent();) {
      groundEntity = this.getEntity().getScene().getEntity(groundEntity.getParentAtTime(time));
      groundComponent = groundEntity?.getGroundComponent() ?? null;
    }
    if (!groundEntity || !groundComponent) return;
    const positionInGround = PioneerPublicApi.Vector3.pool.get();
    const groundPosition = PioneerPublicApi.Vector3.pool.get();
    const groundNormal = PioneerPublicApi.Vector3.pool.get();
    const groundOrientation = PioneerPublicApi.Quaternion.pool.get();
    groundEntity.getOrientationAtTime(groundOrientation, time);
    parentEntity.getPositionRelativeToEntity(positionInGround, positionOut, groundEntity, time);
    positionInGround.rotateInverse(groundOrientation, positionInGround);
    groundPosition.copy(PioneerPublicApi.Vector3.NaN);
    groundComponent.getGroundPosition(groundPosition, groundNormal, positionInGround);
    if (!groundPosition.isNaN()) {
      const upInGround = PioneerPublicApi.Vector3.pool.get();
      const entityOrientation = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(entityOrientation, time);
      upInGround.rotate(entityOrientation, this._up);
      PioneerPublicApi.Quaternion.pool.release(entityOrientation);
      upInGround.rotateInverse(groundOrientation, upInGround);
      const upNormalAlignment = Math.abs(upInGround.dot(groundNormal));
      PioneerPublicApi.Vector3.pool.release(upInGround);
      const normalOffset = Math.min(this._distanceFromGround / upNormalAlignment, this._distanceFromGround + this.getEntity().getExtentsRadius());
      groundPosition.addMult(groundPosition, groundNormal, normalOffset);
      if (!this._clampOnlyIfBelow || positionInGround.dot(groundNormal) - groundPosition.dot(groundNormal) < 0) {
        positionInGround.rotate(groundOrientation, groundPosition);
        groundEntity.getPositionRelativeToEntity(positionOut, positionInGround, parentEntity, time);
      }
    }
    PioneerPublicApi.Vector3.pool.release(positionInGround);
    PioneerPublicApi.Vector3.pool.release(groundPosition);
    PioneerPublicApi.Vector3.pool.release(groundNormal);
    PioneerPublicApi.Quaternion.pool.release(groundOrientation);
  }
  __update() {
    if (null === this.getEntity().getParent()) return;
    let groundEntity = this._groundEntityRef.get();
    let groundComponent = groundEntity?.getGroundComponent() ?? null;
    for (; groundEntity && !groundEntity.getGroundComponent();) {
      groundEntity = groundEntity.getParent();
      groundComponent = groundEntity?.getGroundComponent() ?? null;
    }
    if (!groundEntity || !groundComponent) return;
    const positionInGround = PioneerPublicApi.Vector3.pool.get();
    const groundPosition = PioneerPublicApi.Vector3.pool.get();
    const groundNormal = PioneerPublicApi.Vector3.pool.get();
    this.getEntity().getPositionRelativeToEntity(positionInGround, PioneerPublicApi.Vector3.Zero, groundEntity);
    positionInGround.rotateInverse(groundEntity.getOrientation(), positionInGround);
    groundPosition.copy(PioneerPublicApi.Vector3.NaN);
    groundComponent.getGroundPosition(groundPosition, groundNormal, positionInGround);
    if (!groundPosition.isNaN()) {
      const upInGround = PioneerPublicApi.Vector3.pool.get();
      upInGround.rotate(this.getEntity().getOrientation(), this._up);
      upInGround.rotateInverse(groundEntity.getOrientation(), upInGround);
      const upNormalAlignment = Math.abs(upInGround.dot(groundNormal));
      PioneerPublicApi.Vector3.pool.release(upInGround);
      const normalOffset = Math.min(this._distanceFromGround / upNormalAlignment, this._distanceFromGround + this.getEntity().getExtentsRadius());
      groundPosition.addMult(groundPosition, groundNormal, normalOffset);
      const parentEntity = this.getEntity().getParent();
      if ((!this._clampOnlyIfBelow || positionInGround.dot(groundNormal) - groundPosition.dot(groundNormal) < 0) && parentEntity) {
        positionInGround.rotate(groundEntity.getOrientation(), groundPosition);
        groundEntity.getPositionRelativeToEntity(positionInGround, positionInGround, parentEntity);
        this.getEntity().setPosition(positionInGround);
      }
    }
    PioneerPublicApi.Vector3.pool.release(positionInGround);
    PioneerPublicApi.Vector3.pool.release(groundPosition);
    PioneerPublicApi.Vector3.pool.release(groundNormal);
  }
  _groundEntityRef;
  _distanceFromGround;
  _up;
  _clampOnlyIfBelow;
}
export { GroundClampController };
