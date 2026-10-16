// 视口拥有绝对定位 div 与屏幕 bounds，相机与视口互设关联；DOM 的顶部原点转换为 WebGL 底部原点后设置 viewport/scissor，深度超界的归一化坐标返回 NaN。
// Recovered from app.js:234498-237822.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Viewport extends PioneerPublicApi.CollectionItem {
  constructor(viewportName, engine) {
    super(viewportName, engine);
    this._enabled = true;
    this._camera = null;
    this._div = document.createElement("div");
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._backgroundColor = new PioneerPublicApi.Color(0, 0, 0, 1);
    this._threeJsBackgroundColor = new PioneerPublicApi.THREE.Color();
    this._div.style.position = "absolute";
    this._div.style.overflow = "hidden";
    this._div.id = viewportName;
    this._div.classList.add("viewport");
    this.getEngine().getViewportDiv().appendChild(this._div);
    const rootDiv = this.getEngine().getRootDiv();
    this._bounds.set(this._div.offsetLeft - rootDiv.offsetLeft, this._div.offsetTop - rootDiv.offsetTop, this._div.offsetWidth, this._div.offsetHeight);
    const input = this.getEngine().getInput();
    if (null === input.getActiveViewport()) {
      input.__setActiveViewport(this);
    }
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
  setBackgroundColor(color) {
    this._backgroundColor.copy(color);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
  }
  getCamera() {
    return this._camera;
  }
  setCamera(camera) {
    if (null !== this._camera) {
      this._camera.__setViewport(null);
    }
    this._camera = camera;
    if (null !== this._camera) {
      this._camera.__setViewport(this);
    }
  }
  isEnabled() {
    return this._enabled;
  }
  setEnabled(enabled) {
    this._enabled = enabled;
    if (this._enabled) {
      this._div.style.display = "block";
    } else {
      this._div.style.display = "none";
    }
  }
  getNormalSpacePositionFromPixelSpacePosition(output, pixelPosition) {
    output.x = 2 * (pixelPosition.x - this._bounds.origin.x) / this._bounds.size.x - 1;
    output.y = 1 - 2 * (pixelPosition.y - this._bounds.origin.y) / this._bounds.size.y;
    output.z = -1;
  }
  getPixelSpacePositionFromNormalSpacePosition(output, normalPosition) {
    if (-1 < normalPosition.z && normalPosition.z < 1) {
      output.x = this._bounds.size.x * (normalPosition.x + 1) / 2 + this._bounds.origin.x;
      output.y = this._bounds.size.y * (1 - normalPosition.y) / 2 + this._bounds.origin.y;
    } else {
      output.copy(PioneerPublicApi.Vector2.NaN);
    }
  }
  getPixelSpaceRadiusFromNormalSpaceRadius(normalRadius) {
    return normalRadius * Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  getNormalSpaceRadiusFromPixelSpaceRadius(pixelRadius) {
    return pixelRadius / Math.max(this._bounds.size.x, this._bounds.size.y);
  }
  getDirectionOfCursor(output) {
    const camera = this.getCamera();
    if (null === camera) return void output.copy(PioneerPublicApi.Vector3.NaN);
    const input = this.getEngine().getInput();
    this.getNormalSpacePositionFromPixelSpacePosition(output, input.getCursorPosition());
    if (output.x < -1 || output.x > 1 || output.y < -1 || output.y > 1 || output.z < -1 || output.z > 1) {
      output.copy(PioneerPublicApi.Vector3.NaN);
    } else {
      camera.getCameraSpacePositionFromNormalSpacePosition(output, output);
      output.normalize(output);
    }
  }
  __destroy() {
    super.__destroy();
    this._div.remove();
  }
  __updateViewportVariables() {
    if (this._enabled) {
      this._bounds.set(this._div.offsetLeft, this._div.offsetTop, this._div.offsetWidth, this._div.offsetHeight);
      if (null !== this._camera) {
        this._camera.__updateCameraVariablesForConnectedScene();
      }
    }
  }
  __render() {
    if (!this._enabled) return;
    const renderer = this.getEngine().__getThreeJsRenderer();
    const bottomOffset = this.getEngine().getRootDiv().offsetHeight - this._div.offsetTop - this._div.offsetHeight;
    renderer.setViewport(this._bounds.origin.x, bottomOffset, this._bounds.size.x, this._bounds.size.y);
    renderer.setScissor(this._bounds.origin.x, bottomOffset, this._bounds.size.x, this._bounds.size.y);
    this._threeJsBackgroundColor.setRGB(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b);
    renderer.setClearColor(this._threeJsBackgroundColor, this._backgroundColor.a);
    if (null !== this._camera) {
      this._camera.__prepareForRender();
      this._camera.__render();
    } else {
      this.getEngine().__getThreeJsRenderer().clear();
    }
  }
  _enabled;
  _camera;
  _div;
  _bounds;
  _backgroundColor;
  _threeJsBackgroundColor;
}
export { Viewport };
