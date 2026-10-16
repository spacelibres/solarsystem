// Recovered from app.js:471919-473249.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 用上一父实体姿态到当前姿态的增量旋转位置与姿态；换父时先后转换位置参考系，最后更新缓存。 */

class FixedToParentController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._lastParent = null;
    this._lastParentOrientation = new PioneerPublicApi.Quaternion();
    this._lastParent = this.getEntity().getParent();
    if (this._lastParent) {
      this._lastParentOrientation.copy(this._lastParent.getOrientation());
    }
    this.addModifiedState("position");
    this.addModifiedState("orientation");
    this.addDependentState("parent", "orientation");
  }
  __update() {
    const lastParent = this.getEntity().getParent();
    if (null === lastParent || null === this._lastParent) return void (this._lastParent = lastParent);
    const parentRotationDelta = PioneerPublicApi.Quaternion.pool.get();
    parentRotationDelta.inverse(this._lastParentOrientation);
    parentRotationDelta.mult(this._lastParent.getOrientation(), parentRotationDelta);
    if (!parentRotationDelta.isNaN()) {
      const position = PioneerPublicApi.Vector3.pool.get();
      const orientation = PioneerPublicApi.Quaternion.pool.get();
      position.copy(this.getEntity().getPosition());
      if (lastParent !== this._lastParent) {
        lastParent.getPositionRelativeToEntity(position, position, this._lastParent);
      }
      position.rotate(parentRotationDelta, position);
      if (lastParent !== this._lastParent) {
        this._lastParent.getPositionRelativeToEntity(position, position, lastParent);
      }
      this.getEntity().setPosition(position);
      orientation.mult(parentRotationDelta, this.getEntity().getOrientation());
      this.getEntity().setOrientation(orientation);
      PioneerPublicApi.Quaternion.pool.release(orientation);
      PioneerPublicApi.Vector3.pool.release(position);
    }
    PioneerPublicApi.Quaternion.pool.release(parentRotationDelta);
    this._lastParent = lastParent;
    this._lastParentOrientation.copy(lastParent.getOrientation());
  }
  _lastParent;
  _lastParentOrientation;
}
export { FixedToParentController };
