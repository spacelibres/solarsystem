// Recovered from app.js:451722-452961.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class CoverageController extends PioneerPublicApi.BaseController {
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
  setCoverage(t) {
    this.coverage.copy(t);
  }
  setEnterFunction(enterFunction) {
    this.enterFunction = enterFunction;
  }
  setExitFunction(exitFunction) {
    this.exitFunction = exitFunction;
  }
  setUpdateFunction(updateFunction) {
    this.updateFunction = updateFunction;
  }
  setUpdateInterval(t) {
    this.updateInterval = 1e3 * t;
  }
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
