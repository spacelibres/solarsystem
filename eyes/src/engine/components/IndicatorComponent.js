// 屏外指示器在相机坐标系中将来源到目标的连线与四个留白视锥面求交，取最小正参数落到边界；最后投影成像素位置，左右箭头方向决定旋转支点。
// Recovered from app.js:336279-341094.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class IndicatorComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._activeCamera = null;
    this._hiddenClass = "hidden";
    this._arrowClass = "arrow";
    this._padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this._sourceEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._div = document.createElement("div");
    this._div.style.position = "absolute";
    this._div.style.translate = "";
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._currentHTML = "";
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getDiv() {
    return this._div;
  }
  getActiveCamera() {
    return this._activeCamera;
  }
  setActiveCamera(activeCamera) {
    this._activeCamera = activeCamera;
    this.resetResources();
  }
  getBounds() {
    return this._bounds;
  }
  getHiddenClass() {
    return this._hiddenClass;
  }
  setHiddenClass(hiddenClass) {
    const wasHidden = this._div.classList.contains(this._hiddenClass);
    this._div.classList.remove(this._hiddenClass);
    this._hiddenClass = hiddenClass;
    if (wasHidden) {
      this._div.classList.add(this._hiddenClass);
    }
  }
  getArrowClass() {
    return this._arrowClass;
  }
  setArrowClass(arrowClass) {
    this._div.classList.remove(`${this._arrowClass}Left`);
    this._div.classList.remove(`${this._arrowClass}Right`);
    this._arrowClass = arrowClass;
  }
  setPadding(left, right, top, bottom) {
    this._padding.left = left;
    this._padding.right = right;
    this._padding.top = top;
    this._padding.bottom = bottom;
  }
  getSourceEntity() {
    return "" !== this._sourceEntity.getName() ? this._sourceEntity.getName() : void 0;
  }
  setSourceEntity(entityName) {
    this._sourceEntity.setName(entityName ?? "");
  }
  __unloadResources() {
    if (null !== this._div.parentNode) {
      this._div.parentNode.removeChild(this._div);
    }
  }
  __prepareForRender(camera) {
    if (!this._activeCamera) {
      const defaultViewport = this.getEntity().getScene().getEngine().getViewportAt(0);
      if (defaultViewport) {
        this._activeCamera = defaultViewport.getCamera();
      }
    }
    if (this._activeCamera !== camera) return;
    const viewport = camera.getViewport();
    if (!viewport) return void this._div.remove();
    if (viewport.getDiv() !== this._div.parentNode) {
      viewport.getDiv().append(this._div);
    }
    let hidden = false;
    const viewportSize = viewport.getBounds().size;
    const entityPixelPosition = this.getEntity().getPixelSpacePosition(camera);
    let sourceEntity;
    if (entityPixelPosition.x >= this._padding.left && entityPixelPosition.y >= this._padding.top && entityPixelPosition.x < viewportSize.x - this._padding.right && entityPixelPosition.y < viewportSize.y - this._padding.bottom) {
      hidden = true;
    }
    sourceEntity = "" !== this._sourceEntity.getName() ? this._sourceEntity.get() : camera.getEntity().getParent();
    if (!sourceEntity) {
      hidden = true;
    }
    const wasHidden = this._div.classList.contains(this._hiddenClass);
    this._div.classList.toggle(this._hiddenClass, hidden);
    if (hidden) return void (this._div.style.translate = `${Math.round(100 * viewportSize.x)}px ${Math.round(100 * viewportSize.y)}px`);
    const entityFramePosition = PioneerPublicApi.Vector3.pool.get();
    const sourceFramePosition = PioneerPublicApi.Vector3.pool.get();
    const leftAngle = Math.atan(Math.tan(camera.getHorizontalFieldOfView() / 2) * (1 - 2 * this._padding.left / viewportSize.x));
    const rightAngle = Math.atan(Math.tan(camera.getHorizontalFieldOfView() / 2) * (1 - 2 * this._padding.right / viewportSize.x));
    const topAngle = Math.atan(Math.tan(camera.getVerticalFieldOfView() / 2) * (1 - 2 * this._padding.top / viewportSize.y));
    const bottomAngle = Math.atan(Math.tan(camera.getVerticalFieldOfView() / 2) * (1 - 2 * this._padding.bottom / viewportSize.y));
    const leftCos = Math.cos(leftAngle);
    const leftSin = Math.sin(leftAngle);
    const rightCos = Math.cos(rightAngle);
    const rightSin = Math.sin(rightAngle);
    const topCos = Math.cos(topAngle);
    const topSin = Math.sin(topAngle);
    const bottomCos = Math.cos(bottomAngle);
    const bottomSin = Math.sin(bottomAngle);
    entityFramePosition.rotateInverse(camera.getEntity().getOrientation(), this.getEntity().getCameraSpacePosition(camera));
    sourceFramePosition.rotateInverse(camera.getEntity().getOrientation(), sourceEntity.getCameraSpacePosition(camera));
    const leftParameter = (-sourceFramePosition.x * leftCos + -sourceFramePosition.y * leftSin) / ((entityFramePosition.x - sourceFramePosition.x) * leftCos + (entityFramePosition.y - sourceFramePosition.y) * leftSin);
    const rightParameter = (-sourceFramePosition.x * -rightCos + -sourceFramePosition.y * rightSin) / ((entityFramePosition.x - sourceFramePosition.x) * -rightCos + (entityFramePosition.y - sourceFramePosition.y) * rightSin);
    const topParameter = (-sourceFramePosition.z * -topCos + -sourceFramePosition.y * topSin) / ((entityFramePosition.z - sourceFramePosition.z) * -topCos + (entityFramePosition.y - sourceFramePosition.y) * topSin);
    const bottomParameter = (-sourceFramePosition.z * bottomCos + -sourceFramePosition.y * bottomSin) / ((entityFramePosition.z - sourceFramePosition.z) * bottomCos + (entityFramePosition.y - sourceFramePosition.y) * bottomSin);
    let boundaryParameter = Number.POSITIVE_INFINITY;
    boundaryParameter = leftParameter > 0 ? Math.min(boundaryParameter, leftParameter) : boundaryParameter;
    boundaryParameter = rightParameter > 0 ? Math.min(boundaryParameter, rightParameter) : boundaryParameter;
    boundaryParameter = topParameter > 0 ? Math.min(boundaryParameter, topParameter) : boundaryParameter;
    boundaryParameter = bottomParameter > 0 ? Math.min(boundaryParameter, bottomParameter) : boundaryParameter;
    entityFramePosition.lerp(sourceFramePosition, entityFramePosition, boundaryParameter);
    const indicatorPixelPosition = PioneerPublicApi.Vector2.pool.get();
    const sourcePixelPosition = PioneerPublicApi.Vector2.pool.get();
    this._getPixelSpaceFromFrameSpace(indicatorPixelPosition, entityFramePosition, viewportSize, camera);
    this._getPixelSpaceFromFrameSpace(sourcePixelPosition, sourceFramePosition, viewportSize, camera);
    PioneerPublicApi.Vector3.pool.release(entityFramePosition);
    PioneerPublicApi.Vector3.pool.release(sourceFramePosition);
    const wasPointingRight = this._div.classList.contains(`${this._arrowClass}Right`);
    const pointingRight = indicatorPixelPosition.x - sourcePixelPosition.x > 0;
    this._div.classList.toggle(`${this._arrowClass}Left`, !pointingRight);
    this._div.classList.toggle(`${this._arrowClass}Right`, pointingRight);
    const arrowAngle = Math.atan((indicatorPixelPosition.y - sourcePixelPosition.y) / (indicatorPixelPosition.x - sourcePixelPosition.x));
    if (!(this._currentHTML === this._div.innerHTML && wasHidden === hidden && wasPointingRight === pointingRight)) {
      this._bounds.size.x = this._div.offsetWidth;
      this._bounds.size.y = this._div.offsetHeight;
      this._currentHTML = this._div.innerHTML;
    }
    this._bounds.origin.copy(indicatorPixelPosition);
    PioneerPublicApi.Vector2.pool.release(sourcePixelPosition);
    PioneerPublicApi.Vector2.pool.release(indicatorPixelPosition);
    if (pointingRight) {
      this._bounds.origin.x -= this._bounds.size.x;
    }
    this._bounds.origin.y -= Math.floor(.5 * this._bounds.size.y);
    this._div.style.translate = `${Math.round(this._bounds.origin.x)}px ${Math.round(this._bounds.origin.y)}px`;
    this._div.style.rotate = Math.round(100 * arrowAngle) / 100 + "rad";
    this._div.style.transformOrigin = pointingRight ? "right center" : "left center";
  }
  __setVisible(visible) {
    if (!visible && this._activeCamera) {
      const viewport = this._activeCamera.getViewport();
      if (viewport) {
        const viewportBounds = viewport.getBounds();
        this._div.style.translate = `${Math.round(10 * viewportBounds.size.x)}px ${Math.round(10 * viewportBounds.size.y)}px`;
      }
    }
  }
  _getPixelSpaceFromFrameSpace(output, framePosition, viewportSize, camera) {
    const normalPosition = PioneerPublicApi.Vector2.pool.get();
    normalPosition.x = framePosition.x / framePosition.y / Math.tan(camera.getHorizontalFieldOfView() / 2);
    normalPosition.y = framePosition.z / framePosition.y / Math.tan(camera.getVerticalFieldOfView() / 2);
    output.x = viewportSize.x * (normalPosition.x + 1) / 2;
    output.y = viewportSize.y * (1 - normalPosition.y) / 2;
    PioneerPublicApi.Vector2.pool.release(normalPosition);
  }
  _activeCamera;
  _hiddenClass;
  _arrowClass;
  _padding;
  _sourceEntity;
  _div;
  _bounds;
  _currentHTML;
}
export { IndicatorComponent };
