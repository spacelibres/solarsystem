// 控制器引用按实体名和类型/名称或序号解析；禁用实体不会继续暴露控制器，缓存身份变化交由 BaseRef 统一通知。
// Recovered from app.js:72328-73141.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ControllerRef extends PioneerPublicApi.BaseRef {
  constructor(scene, controllerClass, entityName = "", controllerNameOrClassIndex = void 0) {
    super();
    this._scene = scene;
    this._controllerClass = controllerClass;
    this._entityName = entityName;
    this._controllerNameOrClassIndex = controllerNameOrClassIndex;
  }
  getControllerClass() {
    return this._controllerClass;
  }
  getEntityName() {
    return this._entityName;
  }
  getControllerNameOrClassIndex() {
    return this._controllerNameOrClassIndex;
  }
  set(entityName, controllerNameOrClassIndex = 0) {
    this._entityName = entityName;
    this._controllerNameOrClassIndex = controllerNameOrClassIndex;
  }
  update() {
    if ("" === this._entityName) this._setRef(null);else {
      const entity = this._scene.getEntity(this._entityName);
      if (entity && entity.isEnabled()) {
        const controller = entity.getController(this._controllerClass, this._controllerNameOrClassIndex);
        this._setRef(controller);
      } else this._setRef(null);
    }
  }
  _scene;
  _controllerClass;
  _entityName;
  _controllerNameOrClassIndex;
}
export { ControllerRef };
