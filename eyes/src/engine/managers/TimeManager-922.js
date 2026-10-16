// Recovered from app.js:1404189-1404706.
import * as Eyes from "../../framework/eyes/index.js";
class TimeManager extends Eyes.TimeManager {
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
