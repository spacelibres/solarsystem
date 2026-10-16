// Recovered from app.js:1285875-1286769.
/* 地球接收时间偏移由目标到地球的距离除光速得到，单位为秒；转换方法直接修改传入 Moment 并返回同一对象，调用方必须自行决定是否先 clone。 */
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class ERTManager extends EyesPublicApi.BaseManager {
  constructor(app, {
    isERT = false,
    ertTarget = "",
    sceneMgr = null
  } = {}) {
    super(app);
    this._isERT = isERT;
    this._ertTarget = ertTarget;
    this._sceneMgr = sceneMgr;
    this.getNow = this.getNow.bind(this);
  }
  isERT() {
    return this._isERT;
  }
  setERT(isERT) {
    this._isERT = isERT;
  }
  getERTTarget() {
    return this._ertTarget;
  }
  setERTTarget(ertTarget) {
    this._ertTarget = ertTarget;
  }
  getERTScene() {
    return this._sceneMgr;
  }
  setERTScene(sceneMgr) {
    this._sceneMgr = sceneMgr;
  }
  getERTOffset() {
    if (null !== this._sceneMgr) {
      return this._sceneMgr.getDistance(this._ertTarget, "earth", {
        subtractRadius: true
      }) / EyesPublicApi.AppUtils.constants.speedOfLight;
    }
    console.warn("Clock: could not get scene manager.");
    return 0;
  }
  getERTFromTime(timeValue) {
    const lightDelaySeconds = this.getERTOffset();
    timeValue.add(lightDelaySeconds, "s");
    return timeValue;
  }
  getTimeFromERT(timeValue) {
    const lightDelaySeconds = this.getERTOffset();
    timeValue.subtract(lightDelaySeconds, "s");
    return timeValue;
  }
  getNow(timeValue) {
    return this._isERT ? this.getTimeFromERT(timeValue) : timeValue;
  }
}
export { ERTManager };
