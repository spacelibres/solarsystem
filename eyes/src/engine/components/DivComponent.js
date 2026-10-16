// DOM 标签只挂到 activeCamera 的视口；屏幕坐标减去对齐偏移和视口原点，隐藏或视口外时移到屏外，卸载只移除本组件创建的 div。
// Recovered from app.js:318406-321592.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class DivComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._activeCamera = null;
    this._canBeOccluded = true;
    this._hiddenClass = "hidden";
    this._div = document.createElement("div");
    this._div.style.position = "absolute";
    this._div.style.translate = "";
    this._alignment = new PioneerPublicApi.Vector2(0, .5);
    this._bounds = new PioneerPublicApi.Rect(0, 0, 0, 0);
    this._currentHTML = "";
    this.__setRadius(Number.POSITIVE_INFINITY);
    this.setVisibleInterval(PioneerPublicApi.VisibleInterval.DefaultVisibleFar);
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
  getCanBeOccluded() {
    return this._canBeOccluded;
  }
  setCanBeOccluded(canBeOccluded) {
    this._canBeOccluded = canBeOccluded;
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
  getAlignment() {
    return this._alignment;
  }
  setAlignment(alignment) {
    this._alignment.copy(alignment);
  }
  __unloadResources() {
    if (null !== this._div.parentNode) {
      this._div.parentNode.removeChild(this._div);
    }
  }
  _determineComponentVisibility(camera) {
    let hidden = 0 === this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    const cameraPosition = this.getEntity().getCameraSpacePosition(camera);
    if (!hidden && this._canBeOccluded) {
      hidden = camera.isPositionOccluded(cameraPosition);
    }
    if (!hidden) {
      const cameraForward = PioneerPublicApi.Vector3.pool.get();
      camera.getEntity().getOrientation().getAxis(cameraForward, 1);
      hidden = cameraForward.dot(cameraPosition) <= 0;
      PioneerPublicApi.Vector3.pool.release(cameraForward);
    }
    return hidden;
  }
  __prepareForRender(camera) {
    if (null === this._activeCamera) {
      const defaultViewport = this.getEntity().getScene().getEngine().getViewportAt(0);
      if (defaultViewport) {
        this._activeCamera = defaultViewport.getCamera();
      }
    }
    if (this._activeCamera !== camera) return;
    const activeViewport = this._activeCamera.getViewport();
    if (!activeViewport) return void this._div.remove();
    if (activeViewport.getDiv() !== this._div.parentNode) {
      activeViewport.getDiv().append(this._div);
    }
    const wasHidden = this._div.classList.contains(this._hiddenClass);
    const hidden = this._determineComponentVisibility(camera);
    this._div.classList.toggle(this._hiddenClass, hidden);
    if (!(this._currentHTML === this._div.innerHTML && wasHidden === hidden)) {
      this._bounds.size.x = this._div.offsetWidth;
      this._bounds.size.y = this._div.offsetHeight;
      this._currentHTML = this._div.innerHTML;
    }
    const viewport = camera.getViewport();
    if (viewport) {
      const viewportBounds = viewport.getBounds();
      const localBounds = PioneerPublicApi.Rect.pool.get();
      const pixelPosition = PioneerPublicApi.Vector2.pool.get();
      localBounds.copy(viewportBounds);
      localBounds.origin.set(0, 0);
      pixelPosition.copy(this.getEntity().getPixelSpacePosition(camera));
      pixelPosition.x = viewportBounds.size.x % 2 == 0 ? Math.round(pixelPosition.x) : Math.floor(pixelPosition.x);
      pixelPosition.y = viewportBounds.size.y % 2 == 0 ? Math.round(pixelPosition.y) : Math.floor(pixelPosition.y);
      this._bounds.origin.x = pixelPosition.x - this._bounds.size.x * this._alignment.x - viewportBounds.origin.x;
      this._bounds.origin.y = pixelPosition.y - this._bounds.size.y * this._alignment.y - viewportBounds.origin.y;
      PioneerPublicApi.Vector2.pool.release(pixelPosition);
      if (!this._bounds.origin.isNaN() && localBounds.intersects(this._bounds)) {
        this._div.style.translate = `${Math.round(this._bounds.origin.x)}px ${Math.round(this._bounds.origin.y)}px`;
      } else {
        this._div.style.translate = `${Math.round(10 * viewportBounds.size.x)}px ${Math.round(10 * viewportBounds.size.y)}px`;
      }
      PioneerPublicApi.Rect.pool.release(localBounds);
    }
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
  _activeCamera;
  _canBeOccluded;
  _hiddenClass;
  _div;
  _alignment;
  _bounds;
  _currentHTML;
}
export { DivComponent };
