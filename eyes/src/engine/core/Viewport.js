// 视口拥有绝对定位 div 与屏幕 bounds，相机与视口互设关联；DOM 的顶部原点转换为 WebGL 底部原点后设置 viewport/scissor，深度超界的归一化坐标返回 NaN。
// Recovered from app.js:234498-237822.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Viewport extends PioneerPublicApi.CollectionItem {
  /* 建立 CSS 定位容器，并在尚无活动视口时交给 Input。构造时 bounds 会减去 rootDiv 偏移，逐帧更新直接读 div 偏移；这里保留既有坐标基准差异。 */
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
  /* 先解除旧相机的反向 viewport 引用，再连接新相机；相机的屏幕比例与拾取范围通过这条关联更新。 */
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
  /* 输入为视口所在 DOM 坐标系的像素，输出 NDC：左上为 (-1,+1)，z=-1 选择投影近平面；这不是实体世界坐标。 */
  getNormalSpacePositionFromPixelSpacePosition(output, pixelPosition) {
    output.x = 2 * (pixelPosition.x - this._bounds.origin.x) / this._bounds.size.x - 1;
    output.y = 1 - 2 * (pixelPosition.y - this._bounds.origin.y) / this._bounds.size.y;
    output.z = -1;
  }
  /* 只接受严格位于 (-1,1) 的投影深度；边界与背后点输出 NaN，供标签/拾取调用方跳过。 */
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
  /* 先把像素映射到近平面，再用自定义相机逆投影及实体朝向恢复方向。输出仍使用世界轴，原点是相机位置。 */
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
  /* 先更新 DOM bounds，再通知连接场景的相机计算投影与实体屏幕位置；这一阶段发生在组件 LOD 更新之前。 */
  __updateViewportVariables() {
    if (this._enabled) {
      this._bounds.set(this._div.offsetLeft, this._div.offsetTop, this._div.offsetWidth, this._div.offsetHeight);
      if (null !== this._camera) {
        this._camera.__updateCameraVariablesForConnectedScene();
      }
    }
  }
  /* CSS 视口从顶部计 y，WebGL viewport/scissor 从底部计 y；宽高仍为逻辑像素，renderer 按 pixelRatio 转物理像素。Camera 的 composer 负责真正绘制。 */
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
