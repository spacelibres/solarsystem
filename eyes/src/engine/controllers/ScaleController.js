// Recovered from app.js:520917-521461.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 位置与时间查询速度按同一无量纲比例原地缩放；每帧更新只发布位置，保留原修改状态声明。 */
class ScaleController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._scale = 1;
    this.addModifiedState("position");
  }
  getScale() {
    return this._scale;
  }
  setScale(scale) {
    this._scale = scale;
  }
  __updatePositionAtTime(positionOut, time) {
    positionOut.mult(positionOut, this._scale);
  }
  __updateVelocityAtTime(velocityOut, time) {
    velocityOut.mult(velocityOut, this._scale);
  }
  __update() {
    const scaledPosition = PioneerPublicApi.Vector3.pool.get();
    scaledPosition.mult(this.getEntity().getPosition(), this._scale);
    this.getEntity().setPosition(scaledPosition);
    PioneerPublicApi.Vector3.pool.release(scaledPosition);
  }
  _scale;
}
export { ScaleController };
