// Recovered from app.js:443425-445335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class BaseController extends PioneerPublicApi.EntityItem {
  constructor(t, e) {
    super(t, e);
    this._coverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._modifiedStates = new Set();
    this._dependentStates = new Set();
    this.getEntity().getScene().getControllerDependencyGraph().addItem(this);
  }
  __destroy() {
    this.getEntity().getScene().getControllerDependencyGraph().removeItem(this);
    super.__destroy();
  }
  addModifiedState(t) {
    this._modifiedStates.has(t) || (this._modifiedStates.add(t), this.getEntity().getScene().getControllerDependencyGraph().needsSorting(), "position" !== t && "orientation" !== t || this.getEntity().__updateCoverage());
  }
  removeModifiedState(t) {
    this._modifiedStates.delete(t) && (this.getEntity().getScene().getControllerDependencyGraph().needsSorting(), "position" !== t && "orientation" !== t || this.getEntity().__updateCoverage());
  }
  hasModifiedState(t) {
    return this._modifiedStates.has(t);
  }
  addDependentState(t, e) {
    this._dependentStates.has(`${t}.${e}`) || (this._dependentStates.add(`${t}.${e}`), this.getEntity().getScene().getControllerDependencyGraph().needsSorting());
  }
  removeDependentState(t, e) {
    this._dependentStates.delete(`${t}.${e}`) && this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
  }
  hasDependentState(t, e) {
    return this._dependentStates.has(`${t}.${e}`);
  }
  __getModifiedStates() {
    return this._modifiedStates;
  }
  getCoverage() {
    return this._coverage;
  }
  setCoverage(t) {
    this._coverage.copy(t);
    this.getEntity().__updateCoverage();
  }
  __updatePositionAtTime(t, e) {}
  __updateVelocityAtTime(t, e) {}
  __updateOrientationAtTime(t, e) {}
  toString() {
    let t = 0;
    for (let e = 0, i = this.getEntity().getNumControllers(); e < i; e++) {
      const i = this.getEntity().getControllerAt(e);
      if (this === i) break;
      this.constructor === i.constructor && (t += 1);
    }
    return `${this.getEntity().getName()}.${this.constructor.name}.${t}`;
  }
  _coverage;
  _modifiedStates;
  _dependentStates;
}
export { BaseController };
