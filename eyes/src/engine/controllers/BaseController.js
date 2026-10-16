// Recovered from app.js:443425-445335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 控制器构造时加入场景依赖图、销毁时移除；modifiedStates 描述写入，dependentStates 描述跨实体读取依赖。
/** 控制器在依赖图登记修改与依赖状态；位置或姿态修改集合变化时更新实体覆盖。时间查询钩子原地写入调用者输出。 */

class BaseController extends PioneerPublicApi.EntityItem {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._coverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._modifiedStates = new Set();
    this._dependentStates = new Set();
    this.getEntity().getScene().getControllerDependencyGraph().addItem(this);
  }
  __destroy() {
    this.getEntity().getScene().getControllerDependencyGraph().removeItem(this);
    super.__destroy();
  }
  // 仅新增状态才触发重排；位置或朝向写入还会改变实体覆盖区间。
  addModifiedState(stateName) {
    if (!this._modifiedStates.has(stateName)) {
      this._modifiedStates.add(stateName);
      this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
      if (!("position" !== stateName && "orientation" !== stateName)) {
        this.getEntity().__updateCoverage();
      }
    }
  }
  removeModifiedState(stateName) {
    if (this._modifiedStates.delete(stateName)) {
      this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
      if (!("position" !== stateName && "orientation" !== stateName)) {
        this.getEntity().__updateCoverage();
      }
    }
  }
  hasModifiedState(stateName) {
    return this._modifiedStates.has(stateName);
  }
  addDependentState(entityName, stateName) {
    if (!this._dependentStates.has(`${entityName}.${stateName}`)) {
      this._dependentStates.add(`${entityName}.${stateName}`);
      this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
    }
  }
  removeDependentState(entityName, stateName) {
    if (this._dependentStates.delete(`${entityName}.${stateName}`)) {
      this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
    }
  }
  hasDependentState(entityName, stateName) {
    return this._dependentStates.has(`${entityName}.${stateName}`);
  }
  __getModifiedStates() {
    return this._modifiedStates;
  }
  getCoverage() {
    return this._coverage;
  }
  setCoverage(coverage) {
    this._coverage.copy(coverage);
    this.getEntity().__updateCoverage();
  }
  // 时间采样钩子由派生控制器填充 output；基类保持空实现，不承诺所有控制器均支持历史采样。
  __updatePositionAtTime(output, time) {}
  __updateVelocityAtTime(output, time) {}
  __updateOrientationAtTime(output, time) {}
  toString() {
    let classIndex = 0;
    for (let controllerIndex = 0, controllerCount = this.getEntity().getNumControllers(); controllerIndex < controllerCount; controllerIndex++) {
      const controller = this.getEntity().getControllerAt(controllerIndex);
      if (this === controller) break;
      if (this.constructor === controller.constructor) {
        classIndex += 1;
      }
    }
    return `${this.getEntity().getName()}.${this.constructor.name}.${classIndex}`;
  }
  _coverage;
  _modifiedStates;
  _dependentStates;
}
export { BaseController };
