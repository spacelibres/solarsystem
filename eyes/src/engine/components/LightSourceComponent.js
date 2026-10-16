// Recovered from app.js:349430-350459.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LightSourceComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._color = new PioneerPublicApi.Color();
    this._absoluteMagnitude = 1;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
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
  __setClassIndex(t) {
    "loaded" === this.getLoadState().state && this.getEntity().getScene().__removeLightSource(this.getEntity().getName(), this.getClassIndex());
    super.__setClassIndex(t);
    "loaded" === this.getLoadState().state && this.getEntity().getScene().__addLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  _color;
  _absoluteMagnitude;
}
export { LightSourceComponent };
