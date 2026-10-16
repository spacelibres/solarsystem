// Recovered from app.js:508829-511101.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 将两端轨道分别传播到查询时间，再对位置和速度做向量 slerp；不是先插值轨道元素。所有临时向量归还池。 */

class OrbitalElementsController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._orbitalElementsKeyframes = [];
    this.addModifiedState("position");
    this.addModifiedState("velocity");
  }
  getNumOrbitalElements() {
    return this._orbitalElementsKeyframes.length;
  }
  getOrbitalElements(index) {
    return this._orbitalElementsKeyframes[index];
  }
  addOrbitalElements(time, elements) {
    const orbitalElements = new PioneerPublicApi.OrbitalElements(elements);
    PioneerPublicApi.Sort.addObject({
      time: time,
      oe: orbitalElements
    }, this._orbitalElementsKeyframes, OrbitalElementsController._isLessAdd, OrbitalElementsController._isEqualAdd);
  }
  removeOrbitalElements(index) {
    if (index < 0 || this._orbitalElementsKeyframes.length <= index) throw new Error(`Invalid index for ${this}.removeOrbitalElements`);
    this._orbitalElementsKeyframes.splice(index, 1);
  }
  __updatePositionAtTime(positionOut, time) {
    this._getPositionAndVelocityAtTime(positionOut, void 0, time);
  }
  __updateVelocityAtTime(velocityOut, time) {
    this._getPositionAndVelocityAtTime(void 0, velocityOut, time);
  }
  __update() {
    const time = this.getEntity().getScene().getEngine().getTime();
    if (0 === this._orbitalElementsKeyframes.length) throw new Error(`In ${this}, there are no keyframes`);
    const position = PioneerPublicApi.Vector3.pool.get();
    const velocity = PioneerPublicApi.Vector3.pool.get();
    this._getPositionAndVelocityAtTime(position, velocity, time);
    this.getEntity().setPosition(position);
    this.getEntity().setVelocity(velocity);
    PioneerPublicApi.Vector3.pool.release(position);
    PioneerPublicApi.Vector3.pool.release(velocity);
  }
  _getPositionAndVelocityAtTime(positionOut, velocityOut, time) {
    const insertionIndex = PioneerPublicApi.Sort.getIndexObject(time, this._orbitalElementsKeyframes, OrbitalElementsController._isLess);
    const startKeyframe = this._orbitalElementsKeyframes[Math.max(insertionIndex - 1, 0)];
    const endKeyframe = this._orbitalElementsKeyframes[Math.min(insertionIndex, this._orbitalElementsKeyframes.length - 1)];
    const startPosition = PioneerPublicApi.Vector3.pool.get();
    const endPosition = PioneerPublicApi.Vector3.pool.get();
    const startVelocity = PioneerPublicApi.Vector3.pool.get();
    const endVelocity = PioneerPublicApi.Vector3.pool.get();
    startKeyframe.oe.project(startPosition, startVelocity, time);
    endKeyframe.oe.project(endPosition, endVelocity, time);
    const fraction = PioneerPublicApi.MathUtils.clamp01(endKeyframe.time !== startKeyframe.time ? (time - startKeyframe.time) / (endKeyframe.time - startKeyframe.time) : 0);
    if (positionOut) {
      positionOut.slerp(startPosition, endPosition, fraction);
    }
    if (velocityOut) {
      velocityOut.slerp(startVelocity, endVelocity, fraction);
    }
    PioneerPublicApi.Vector3.pool.release(startPosition);
    PioneerPublicApi.Vector3.pool.release(endPosition);
    PioneerPublicApi.Vector3.pool.release(startVelocity);
    PioneerPublicApi.Vector3.pool.release(endVelocity);
  }
  static _isLessAdd = (leftKeyframe, rightKeyframe) => leftKeyframe.time < rightKeyframe.time;
  static _isLess = (leftKeyframe, time) => leftKeyframe.time < time;
  static _isEqualAdd = (leftKeyframe, rightKeyframe) => leftKeyframe.time === rightKeyframe.time;
  _orbitalElementsKeyframes;
}
class OrbitalElementsKeyframe {
  time;
  oe;
  constructor() {
    this.time = 0;
    this.oe = new PioneerPublicApi.OrbitalElements();
  }
}
export { OrbitalElementsController };
export { OrbitalElementsKeyframe };
