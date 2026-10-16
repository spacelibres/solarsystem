// Recovered from app.js:532188-533213.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 平移在父参考系或经实体姿态旋转后相加；时间查询使用该时刻姿态，调用者输出只加偏移。 */
class TranslateController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._translation = new PioneerPublicApi.Vector3(0, 0, 0);
    this._relativeToOrientation = false;
    this.addModifiedState("position");
  }
  getTranslation() {
    return this._translation;
  }
  setTranslation(translation) {
    this._translation.copy(translation);
  }
  setRelativeToOrientation(relativeToOrientation) {
    this._relativeToOrientation = relativeToOrientation;
  }
  __updatePositionAtTime(positionOut, time) {
    const translationInReference = PioneerPublicApi.Vector3.pool.get();
    if (this._relativeToOrientation) {
      const orientationAtTime = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(orientationAtTime, time);
      translationInReference.rotate(orientationAtTime, this._translation);
      PioneerPublicApi.Quaternion.pool.release(orientationAtTime);
    } else translationInReference.copy(this._translation);
    positionOut.add(translationInReference, positionOut);
    PioneerPublicApi.Vector3.pool.release(translationInReference);
  }
  __update() {
    const translatedPosition = PioneerPublicApi.Vector3.pool.get();
    if (this._relativeToOrientation) {
      translatedPosition.rotate(this.getEntity().getOrientation(), this._translation);
    } else {
      translatedPosition.copy(this._translation);
    }
    translatedPosition.add(translatedPosition, this.getEntity().getPosition());
    this.getEntity().setPosition(translatedPosition);
    PioneerPublicApi.Vector3.pool.release(translatedPosition);
  }
  _translation;
  _relativeToOrientation;
}
export { TranslateController };
