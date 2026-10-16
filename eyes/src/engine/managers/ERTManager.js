// Recovered from app.js:1285875-1286769.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class ERTManager extends EyesPublicApi.BaseManager {
  constructor(t, {
    isERT = false,
    ertTarget = "",
    sceneMgr = null
  } = {}) {
    super(t);
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
  getERTFromTime(t) {
    const e = this.getERTOffset();
    t.add(e, "s");
    return t;
  }
  getTimeFromERT(t) {
    const e = this.getERTOffset();
    t.subtract(e, "s");
    return t;
  }
  getNow(t) {
    return this._isERT ? this.getTimeFromERT(t) : t;
  }
}
export { ERTManager };
