/** @eyes-analysis
 * 文件职责：计算地球接收时间/光程延迟并协调仿真时间显示。
 * 依据：import ../../framework/eyes/public-api.js；ERTManager extends EyesPublicApi.BaseManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1285875-1286769.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：计算地球接收时间/光程延迟并协调仿真时间显示。
 * 继承：EyesPublicApi.BaseManager；导出：ERTManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ERTManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_ertTarget`、`_isERT`、`_sceneMgr`、`getNow`；调用 `super`、`this.getNow.bind`。
   * 状态写入：_ertTarget、_isERT、_sceneMgr、getNow。
   * 调用线索：super、this.getNow.bind。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._isERT`。
   */
  isERT() {
    return this._isERT;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isERT`。
   * 状态写入：_isERT。
   */
  setERT(isERT) {
    this._isERT = isERT;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._ertTarget`。
   */
  getERTTarget() {
    return this._ertTarget;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_ertTarget`。
   * 状态写入：_ertTarget。
   */
  setERTTarget(ertTarget) {
    this._ertTarget = ertTarget;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sceneMgr`。
   */
  getERTScene() {
    return this._sceneMgr;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_sceneMgr`。
   * 状态写入：_sceneMgr。
   */
  setERTScene(sceneMgr) {
    this._sceneMgr = sceneMgr;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sceneMgr.getDistance(this._ertTarget,"earth",{subtractRadius:true})/EyesPublicApi.AppUtils.constants.speedOfLight` 或 `0`；调用 `console.warn`、`this._sceneMgr.getDistance`。
   * 调用线索：console.warn、this._sceneMgr.getDistance。
   */
  getERTOffset() {
    if (null !== this._sceneMgr) {
      return this._sceneMgr.getDistance(this._ertTarget, "earth", {
        subtractRadius: true
      }) / EyesPublicApi.AppUtils.constants.speedOfLight;
    }
    console.warn("Clock: could not get scene manager.");
    return 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `t.add`、`this.getERTOffset`。
   * 调用线索：t.add、this.getERTOffset。
   */
  getERTFromTime(t) {
    const e = this.getERTOffset();
    t.add(e, "s");
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `t.subtract`、`this.getERTOffset`。
   * 调用线索：t.subtract、this.getERTOffset。
   */
  getTimeFromERT(t) {
    const e = this.getERTOffset();
    t.subtract(e, "s");
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._isERT?this.getTimeFromERT(t):t`；调用 `this.getTimeFromERT`。
   * 调用线索：this.getTimeFromERT。
   */
  getNow(t) {
    return this._isERT ? this.getTimeFromERT(t) : t;
  }
}
export { ERTManager };
