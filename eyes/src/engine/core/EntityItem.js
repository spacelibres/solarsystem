// Recovered from app.js:190526-191019.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class EntityItem extends PioneerPublicApi.CollectionItem {
  constructor(t, e) {
    super(t, e);
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
