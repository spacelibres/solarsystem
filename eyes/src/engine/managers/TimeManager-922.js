// Recovered from app.js:1404189-1404706.
/* 应用时间管理器覆盖边界处理：把边界 Moment 原地向内部移动 1 毫秒，展开时控并通过路由暂停；与通用 TimeManager 的 forcedPause 流程保持分层。 */
import * as Eyes from "../../framework/eyes/index.js";
class TimeManager extends Eyes.TimeManager {
  _onLimitReach(limitName) {
    const timeManager = this._app.getManager("time");
    const boundaryTime = this._timeLimits[limitName];
    this.app.getComponent("timecontrolsCollapsible")?.setExpanded(true);
    const interiorTime = "min" === limitName ? boundaryTime.add(1, "ms") : boundaryTime.subtract(1, "ms");
    const limitDirection = "max" === limitName ? 1 : -1;
    this._app.getComponent("clock")?.setLimitMessage(limitDirection);
    this.app.getView("distance")._redirect = true;
    this._app.getManager("router")?.navigate({
      rate: 0,
      time: timeManager.getTimeUrl(interiorTime)
    });
  }
}
export { TimeManager };
