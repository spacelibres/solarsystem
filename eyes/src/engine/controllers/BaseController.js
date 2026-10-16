/** @eyes-analysis
 * 文件职责：向场景依赖图登记控制器，声明覆盖时间、被修改状态与所依赖实体状态。
 * 依据：import ../pioneer/public-api.js；BaseController extends PioneerPublicApi.EntityItem @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:443425-445335.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：向场景依赖图登记控制器，声明覆盖时间、被修改状态与所依赖实体状态。
 * 继承：PioneerPublicApi.EntityItem；导出：BaseController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseController extends PioneerPublicApi.EntityItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_coverage`、`_dependentStates`、`_modifiedStates`；调用 `new PioneerPublicApi.Interval`、`new Set`、`super`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`。
   * 状态写入：_coverage、_dependentStates、_modifiedStates。
   * 调用线索：new PioneerPublicApi.Interval、new Set、super、this.getEntity、this.getEntity().getScene等。
   */
  constructor(t, e) {
    super(t, e);
    this._coverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._modifiedStates = new Set();
    this._dependentStates = new Set();
    this.getEntity().getScene().getControllerDependencyGraph().addItem(this);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().removeItem`。
   * 调用线索：super.__destroy、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getControllerDependencyGraph、this.getEntity().getScene().getControllerDependencyGraph().removeItem。
   */
  __destroy() {
    this.getEntity().getScene().getControllerDependencyGraph().removeItem(this);
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._modifiedStates.add`、`this._modifiedStates.has`、`this.getEntity`、`this.getEntity().__updateCoverage`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`。
   * 调用线索：this._modifiedStates.add、this._modifiedStates.has、this.getEntity、this.getEntity().__updateCoverage、this.getEntity().getScene等。
   */
  addModifiedState(t) {
    this._modifiedStates.has(t) || (this._modifiedStates.add(t), this.getEntity().getScene().getControllerDependencyGraph().needsSorting(), "position" !== t && "orientation" !== t || this.getEntity().__updateCoverage());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._modifiedStates.delete`、`this.getEntity`、`this.getEntity().__updateCoverage`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。
   * 调用线索：this._modifiedStates.delete、this.getEntity、this.getEntity().__updateCoverage、this.getEntity().getScene、this.getEntity().getScene().getControllerDependencyGraph等。
   */
  removeModifiedState(t) {
    this._modifiedStates.delete(t) && (this.getEntity().getScene().getControllerDependencyGraph().needsSorting(), "position" !== t && "orientation" !== t || this.getEntity().__updateCoverage());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._modifiedStates.has(t)`；调用 `this._modifiedStates.has`。
   * 调用线索：this._modifiedStates.has。
   */
  hasModifiedState(t) {
    return this._modifiedStates.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._dependentStates.add`、`this._dependentStates.has`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。
   * 调用线索：this._dependentStates.add、this._dependentStates.has、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getControllerDependencyGraph等。
   */
  addDependentState(t, e) {
    this._dependentStates.has(`${t}.${e}`) || (this._dependentStates.add(`${t}.${e}`), this.getEntity().getScene().getControllerDependencyGraph().needsSorting());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._dependentStates.delete`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。
   * 调用线索：this._dependentStates.delete、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getControllerDependencyGraph、this.getEntity().getScene().getControllerDependencyGraph().needsSorting。
   */
  removeDependentState(t, e) {
    this._dependentStates.delete(`${t}.${e}`) && this.getEntity().getScene().getControllerDependencyGraph().needsSorting();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dependentStates.has(`${t}.${e}`)`；调用 `this._dependentStates.has`。
   * 调用线索：this._dependentStates.has。
   */
  hasDependentState(t, e) {
    return this._dependentStates.has(`${t}.${e}`);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._modifiedStates`。
   */
  __getModifiedStates() {
    return this._modifiedStates;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._coverage`。
   */
  getCoverage() {
    return this._coverage;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._coverage.copy`、`this.getEntity`、`this.getEntity().__updateCoverage`。
   * 调用线索：this._coverage.copy、this.getEntity、this.getEntity().__updateCoverage。
   */
  setCoverage(t) {
    this._coverage.copy(t);
    this.getEntity().__updateCoverage();
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __updatePositionAtTime(t, e) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __updateVelocityAtTime(t, e) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __updateOrientationAtTime(t, e) {}
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `this.getEntity`、`this.getEntity().getControllerAt`、`this.getEntity().getName`、`this.getEntity().getNumControllers`。
   * 调用线索：this.getEntity、this.getEntity().getControllerAt、this.getEntity().getName、this.getEntity().getNumControllers。
   */
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
