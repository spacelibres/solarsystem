// 组件引用每次 update 都按实体名与组件类型/名称或序号重新解析；实体缺失或禁用时清空，由 BaseRef 处理身份变化回调。
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
      const entity = this._scene.getEntity(this._entityName);
      if (entity && entity.isEnabled()) {
        const component = entity.getComponent(this._componentClass, this._componentNameOrClassIndex);
        this._setRef(component);
      } else this._setRef(null);
    }
  }
  _scene;
  _componentClass;
  _entityName;
  _componentNameOrClassIndex;
}
export { ComponentRef };
