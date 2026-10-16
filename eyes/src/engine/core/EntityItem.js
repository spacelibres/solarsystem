// Recovered from app.js:190526-191019.
/* 实体内集合项保存启用/销毁标记；所属实体由 CollectionItem 的 collectionParent 引用提供，Engine 始终沿实体所属 Scene 获取。 */
import * as PioneerPublicApi from "../pioneer/public-api.js";
class EntityItem extends PioneerPublicApi.CollectionItem {
  constructor(name, entity) {
    super(name, entity);
    this._enabled = true;
    this._destroyed = false;
  }
  getEntity() {
    return this.__getCollectionParent();
  }
  getEngine() {
    return this.getEntity().getScene().getEngine();
  }
  isDestroyed() {
    return this._destroyed;
  }
  __destroy() {
    this._destroyed = true;
    super.__destroy();
  }
  isEnabled() {
    return this._enabled;
  }
  setEnabled(enabled) {
    this._enabled = enabled;
  }
  __update() {}
  _enabled;
  _destroyed;
}
export { EntityItem };
