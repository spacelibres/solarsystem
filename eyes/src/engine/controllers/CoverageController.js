/** @eyes-analysis
 * 文件职责：在时间覆盖进入/退出与更新时调用用户函数，管理更新间隔。
 * 依据：import ../pioneer/public-api.js；CoverageController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:451722-452961.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在时间覆盖进入/退出与更新时调用用户函数，管理更新间隔。
 * 继承：PioneerPublicApi.BaseController；导出：CoverageController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CoverageController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `active`、`coverage`、`enterFunction`、`exitFunction`、`lastUpdateTime`、`updateFunction`、`updateInterval`；调用 `new PioneerPublicApi.Interval`、`super`。
   * 状态写入：active、coverage、enterFunction、exitFunction、lastUpdateTime、updateFunction、updateInterval。
   * 调用线索：new PioneerPublicApi.Interval、super。
   */
  constructor(t, e) {
    super(t, e);
    this.coverage = new PioneerPublicApi.Interval();
    this.enterFunction = void 0;
    this.exitFunction = void 0;
    this.updateFunction = void 0;
    this.active = false;
    this.lastUpdateTime = Number.NEGATIVE_INFINITY;
    this.updateInterval = 0;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.coverage.copy`。
   * 调用线索：this.coverage.copy。
   */
  setCoverage(t) {
    this.coverage.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `enterFunction`。
   * 状态写入：enterFunction。
   */
  setEnterFunction(enterFunction) {
    this.enterFunction = enterFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `exitFunction`。
   * 状态写入：exitFunction。
   */
  setExitFunction(exitFunction) {
    this.exitFunction = exitFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `updateFunction`。
   * 状态写入：updateFunction。
   */
  setUpdateFunction(updateFunction) {
    this.updateFunction = updateFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `updateInterval`。
   * 状态写入：updateInterval。
   */
  setUpdateInterval(t) {
    this.updateInterval = 1e3 * t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `active`、`lastUpdateTime`；调用 `Date.now`、`i.coverage.contains`、`i.exitFunction`、`this.coverage.contains`、`this.enterFunction`、`this.getClassIndex`。
   * 状态写入：active、lastUpdateTime。
   * 调用线索：Date.now、i.coverage.contains、i.exitFunction、this.coverage.contains、this.enterFunction等。
   */
  __update() {
    const t = this.getEntity().getScene().getEngine().getTime();
    if (0 === this.getClassIndex()) for (let e = 0;; e++) {
      const i = this.getEntity().getController(CoverageController, e);
      if (null === i) break;
      const s = i.coverage.contains(t);
      i.active && !s && i.exitFunction && i.exitFunction(this.getEntity());
    }
    const active = this.coverage.contains(t);
    if (!this.active && active && this.enterFunction && this.enterFunction(this.getEntity()), active && this.updateFunction) {
      const lastUpdateTime = Date.now();
      lastUpdateTime - this.lastUpdateTime >= this.updateInterval && (this.lastUpdateTime = lastUpdateTime, this.updateFunction(this.getEntity()));
    }
    this.active = active;
  }
  coverage;
  enterFunction;
  exitFunction;
  updateFunction;
  active;
  lastUpdateTime;
  updateInterval;
}
export { CoverageController };
