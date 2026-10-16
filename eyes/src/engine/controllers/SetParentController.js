// Recovered from app.js:522776-523362.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 父引用名称变更时迁移 position 依赖；每帧把解析后的引用交给实体 setParent，空引用行为保留。 */
class SetParentController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._parent = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
  }
  getParent() {
    return this._parent.getName();
  }
  setParent(entityName) {
    if ("" !== this._parent.getName()) {
      this.removeDependentState(this._parent.getName(), "position");
    }
    this._parent.setName(entityName);
    if ("" !== this._parent.getName()) {
      this.addDependentState(this._parent.getName(), "position");
    }
  }
  __update() {
    const parentEntity = this._parent.get();
    this.getEntity().setParent(parentEntity);
  }
  _parent;
}
export { SetParentController };
