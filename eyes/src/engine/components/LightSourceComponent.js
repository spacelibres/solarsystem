// 光源以实体名和组件类型序号注册到场景；已加载时更改类型序号必须先移除旧引用，再注册新引用。
// Recovered from app.js:349430-350459.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LightSourceComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._color = new PioneerPublicApi.Color();
    this._absoluteMagnitude = 1;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
  }
  getAbsoluteMagnitude() {
    return this._absoluteMagnitude;
  }
  setAbsoluteMagnitude(absoluteMagnitude) {
    this._absoluteMagnitude = absoluteMagnitude;
  }
  async __loadResources() {
    this.getEntity().getScene().__addLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  __unloadResources() {
    this.getEntity().getScene().__removeLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  __setClassIndex(classIndex) {
    if ("loaded" === this.getLoadState().state) {
      this.getEntity().getScene().__removeLightSource(this.getEntity().getName(), this.getClassIndex());
    }
    super.__setClassIndex(classIndex);
    if ("loaded" === this.getLoadState().state) {
      this.getEntity().getScene().__addLightSource(this.getEntity().getName(), this.getClassIndex());
    }
  }
  _color;
  _absoluteMagnitude;
}
export { LightSourceComponent };
