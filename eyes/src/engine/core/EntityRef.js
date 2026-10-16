// Recovered from app.js:74234-74700.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class EntityRef extends PioneerPublicApi.BaseRef {
  constructor(scene, name = "") {
    super();
    this._scene = scene;
    this._name = name;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  update() {
    if ("" === this._name) this.getRef() && this._setRef(null);else {
      const t = this.getRef();
      if (!t || t.isDestroyed() || !t.isEnabled() || t.getName() !== this._name) {
        const t = this._scene.getEntity(this._name);
        this._setRef(t);
      }
    }
  }
  _scene;
  _name;
}
export { EntityRef };
