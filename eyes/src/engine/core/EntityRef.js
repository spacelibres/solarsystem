// 实体引用在缓存缺失、销毁、禁用或名称变化时重新查场景；空名称表示清除，普通 get 通过 BaseRef 触发 update。
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
    if ("" === this._name) {
      if (this.getRef()) {
        this._setRef(null);
      }
    } else {
      const cachedEntity = this.getRef();
      if (!cachedEntity || cachedEntity.isDestroyed() || !cachedEntity.isEnabled() || cachedEntity.getName() !== this._name) {
        const resolvedEntity = this._scene.getEntity(this._name);
        this._setRef(resolvedEntity);
      }
    }
  }
  _scene;
  _name;
}
export { EntityRef };
