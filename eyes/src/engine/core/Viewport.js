// Recovered from app.js:234498-237822.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Viewport extends PioneerPublicApi.CollectionItem {
  constructor(t, e) {
    super(t, e);
    this._enabled = true;
    this._camera = null;
    this._div = document.createElement("div");
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._backgroundColor = new PioneerPublicApi.Color(0, 0, 0, 1);
    this._threeJsBackgroundColor = new PioneerPublicApi.THREE.Color();
    this._div.style.position = "absolute";
    this._div.style.overflow = "hidden";
    this._div.id = t;
    this._div.classList.add("viewport");
    this.getEngine().getViewportDiv().appendChild(this._div);
    const i = this.getEngine().getRootDiv();
    this._bounds.set(this._div.offsetLeft - i.offsetLeft, this._div.offsetTop - i.offsetTop, this._div.offsetWidth, this._div.offsetHeight);
    const n = this.getEngine().getInput();
    null === n.getActiveViewport() && n.__setActiveViewport(this);
  }
  getEngine() {
    return this.__getCollectionParent();
  }
  getDiv() {
    return this._div;
  }
  getBounds() {
    return this._bounds;
  }
  getBackgroundColor() {
    return this._backgroundColor;
  }
  setBackgroundColor(t) {
    this._backgroundColor.copy(t);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
  }
  getCamera() {
    return this._camera;
  }
  setCamera(camera) {
    null !== this._camera && this._camera.__setViewport(null);
    this._camera = camera;
    null !== this._camera && this._camera.__setViewport(this);
  }
  isEnabled() {
    return this._enabled;
  }
  setEnabled(enabled) {
    this._enabled = enabled;
    this._enabled ? this._div.style.display = "block" : this._div.style.display = "none";
  }
  getNormalSpacePositionFromPixelSpacePosition(t, e) {
    t.x = 2 * (e.x - this._bounds.origin.x) / this._bounds.size.x - 1;
    t.y = 1 - 2 * (e.y - this._bounds.origin.y) / this._bounds.size.y;
    t.z = -1;
  }
  getPixelSpacePositionFromNormalSpacePosition(t, e) {
    -1 < e.z && e.z < 1 ? (t.x = this._bounds.size.x * (e.x + 1) / 2 + this._bounds.origin.x, t.y = this._bounds.size.y * (1 - e.y) / 2 + this._bounds.origin.y) : t.copy(PioneerPublicApi.Vector2.NaN);
  }
  getPixelSpaceRadiusFromNormalSpaceRadius(t) {
    return t * Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  getNormalSpaceRadiusFromPixelSpaceRadius(t) {
    return t / Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  getDirectionOfCursor(t) {
    const e = this.getCamera();
    if (null === e) return void t.copy(PioneerPublicApi.Vector3.NaN);
    const i = this.getEngine().getInput();
    this.getNormalSpacePositionFromPixelSpacePosition(t, i.getCursorPosition());
    t.x < -1 || t.x > 1 || t.y < -1 || t.y > 1 || t.z < -1 || t.z > 1 ? t.copy(PioneerPublicApi.Vector3.NaN) : (e.getCameraSpacePositionFromNormalSpacePosition(t, t), t.normalize(t));
  }
  __destroy() {
    super.__destroy();
    this._div.remove();
  }
  __updateViewportVariables() {
    this._enabled && (this._bounds.set(this._div.offsetLeft, this._div.offsetTop, this._div.offsetWidth, this._div.offsetHeight), null !== this._camera && this._camera.__updateCameraVariablesForConnectedScene());
  }
  __render() {
    if (!this._enabled) return;
    const t = this.getEngine().__getThreeJsRenderer();
    const e = this.getEngine().getRootDiv().offsetHeight - this._div.offsetTop - this._div.offsetHeight;
    t.setViewport(this._bounds.origin.x, e, this._bounds.size.x, this._bounds.size.y);
    t.setScissor(this._bounds.origin.x, e, this._bounds.size.x, this._bounds.size.y);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
    t.setClearColor(this._threeJsBackgroundColor, this._backgroundColor.a);
    null !== this._camera ? (this._camera.__prepareForRender(), this._camera.__render()) : this.getEngine().__getThreeJsRenderer().clear();
  }
  _enabled;
  _camera;
  _div;
  _bounds;
  _backgroundColor;
  _threeJsBackgroundColor;
}
export { Viewport };
