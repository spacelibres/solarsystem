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
      const t = this._scene.getEntity(this._entityName);
      if (t && t.isEnabled()) {
        const e = t.getController(this._controllerClass, this._controllerNameOrClassIndex);
        this._setRef(e);
      } else this._setRef(null);
    }
  }
  _scene;
  _controllerClass;
  _entityName;
  _controllerNameOrClassIndex;
}
export { ControllerRef };
