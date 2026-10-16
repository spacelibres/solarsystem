// Recovered from app.js:451722-452961.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** coverage 使用场景时间，更新节流使用 Date.now 毫秒；同类首控制器先执行全部离开回调，再执行当前进入及更新回调。 */

class CoverageController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this.coverage = new PioneerPublicApi.Interval();
    this.enterFunction = void 0;
    this.exitFunction = void 0;
    this.updateFunction = void 0;
    this.active = false;
    this.lastUpdateTime = Number.NEGATIVE_INFINITY;
    this.updateInterval = 0;
  }
  setCoverage(coverage) {
    this.coverage.copy(coverage);
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
  setUpdateInterval(seconds) {
    this.updateInterval = 1e3 * seconds;
  }
  __update() {
    const time = this.getEntity().getScene().getEngine().getTime();
    if (0 === this.getClassIndex()) for (let controllerIndex = 0;; controllerIndex++) {
      const coverageController = this.getEntity().getController(CoverageController, controllerIndex);
      if (null === coverageController) break;
      const isCovered = coverageController.coverage.contains(time);
      if (coverageController.active && !isCovered && coverageController.exitFunction) {
        coverageController.exitFunction(this.getEntity());
      }
    }
    const active = this.coverage.contains(time);
    if (!this.active && active && this.enterFunction) {
      this.enterFunction(this.getEntity());
    }
    if (active && this.updateFunction) {
      const lastUpdateTime = Date.now();
      if (lastUpdateTime - this.lastUpdateTime >= this.updateInterval) {
        this.lastUpdateTime = lastUpdateTime;
        this.updateFunction(this.getEntity());
      }
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
