/** @eyes-analysis
 * 文件职责：继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。
 * 依据：import ../../framework/eyes/index.js；TimeManager extends Eyes.TimeManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1404189-1404706.
import * as Eyes from "../../framework/eyes/index.js";
/** @eyes-analysis
 * 类职责：继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。
 * 继承：Eyes.TimeManager；导出：TimeManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TimeManager extends Eyes.TimeManager {
  /** @eyes-analysis
   * 【结构证据】写入 `app.getView("distance")._redirect`；调用 `i.add`、`i.subtract`、`this._app.getComponent`、`this._app.getManager`、`this.app.getComponent`、`this.app.getView`。
   * 状态写入：app.getView("distance")._redirect。
   * 调用线索：i.add、i.subtract、this._app.getComponent、this._app.getComponent("clock")?.setLimitMessage、this._app.getManager等。
   */
  _onLimitReach(t) {
    const timeManager = this._app.getManager("time");
    const i = this._timeLimits[t];
    this.app.getComponent("timecontrolsCollapsible")?.setExpanded(true);
    const s = "min" === t ? i.add(1, "ms") : i.subtract(1, "ms");
    const n = "max" === t ? 1 : -1;
    this._app.getComponent("clock")?.setLimitMessage(n);
    this.app.getView("distance")._redirect = true;
    this._app.getManager("router")?.navigate({
      rate: 0,
      time: timeManager.getTimeUrl(s)
    });
  }
}
export { TimeManager };
