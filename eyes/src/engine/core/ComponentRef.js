// Recovered from app.js:71529-72327.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ComponentRef extends PioneerPublicApi.BaseRef {
  constructor(scene, componentClass, entityName = "", componentNameOrClassIndex = void 0) {
    super();
    this._scene = scene;
    this._entityName = entityName;
    this._componentClass = componentClass;
    this._componentNameOrClassIndex = componentNameOrClassIndex;
  }
  getComponentClass() {
    return this._componentClass;
  }
  getEntityName() {
    return this._entityName;
  }
  getComponentNameOrClassIndex() {
    return this._componentNameOrClassIndex;
  }
  set(entityName, componentNameOrClassIndex = 0) {
    this._entityName = entityName;
    this._componentNameOrClassIndex = componentNameOrClassIndex;
  }
  update() {
    if ("" === this._entityName) this._setRef(null);else {
      const t = this._scene.getEntity(this._entityName);
      if (t && t.isEnabled()) {
        const e = t.getComponent(this._componentClass, this._componentNameOrClassIndex);
        this._setRef(e);
      } else this._setRef(null);
    }
  }
  _scene;
  _componentClass;
  _entityName;
  _componentNameOrClassIndex;
}
export { ComponentRef };
