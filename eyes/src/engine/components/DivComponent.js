// Recovered from app.js:318406-321592.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class DivComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
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
    const e = this._div.classList.contains(this._hiddenClass);
    this._div.classList.remove(this._hiddenClass);
    this._hiddenClass = hiddenClass;
    e && this._div.classList.add(this._hiddenClass);
  }
  getAlignment() {
    return this._alignment;
  }
  setAlignment(t) {
    this._alignment.copy(t);
  }
  __unloadResources() {
    null !== this._div.parentNode && this._div.parentNode.removeChild(this._div);
  }
  _determineComponentVisibility(t) {
    let e = 0 === this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    const i = this.getEntity().getCameraSpacePosition(t);
    if (!e && this._canBeOccluded && (e = t.isPositionOccluded(i)), !e) {
      const n = PioneerPublicApi.Vector3.pool.get();
      t.getEntity().getOrientation().getAxis(n, 1);
      e = n.dot(i) <= 0;
      PioneerPublicApi.Vector3.pool.release(n);
    }
    return e;
  }
  __prepareForRender(t) {
    if (null === this._activeCamera) {
      const t = this.getEntity().getScene().getEngine().getViewportAt(0);
      t && (this._activeCamera = t.getCamera());
    }
    if (this._activeCamera !== t) return;
    const e = this._activeCamera.getViewport();
    if (!e) return void this._div.remove();
    e.getDiv() !== this._div.parentNode && e.getDiv().append(this._div);
    const i = this._div.classList.contains(this._hiddenClass);
    const n = this._determineComponentVisibility(t);
    this._div.classList.toggle(this._hiddenClass, n);
    this._currentHTML === this._div.innerHTML && i === n || (this._bounds.size.x = this._div.offsetWidth, this._bounds.size.y = this._div.offsetHeight, this._currentHTML = this._div.innerHTML);
    const o = t.getViewport();
    if (o) {
      const e = o.getBounds();
      const i = PioneerPublicApi.Rect.pool.get();
      const n = PioneerPublicApi.Vector2.pool.get();
      i.copy(e);
      i.origin.set(0, 0);
      n.copy(this.getEntity().getPixelSpacePosition(t));
      n.x = e.size.x % 2 == 0 ? Math.round(n.x) : Math.floor(n.x);
      n.y = e.size.y % 2 == 0 ? Math.round(n.y) : Math.floor(n.y);
      this._bounds.origin.x = n.x - this._bounds.size.x * this._alignment.x - e.origin.x;
      this._bounds.origin.y = n.y - this._bounds.size.y * this._alignment.y - e.origin.y;
      PioneerPublicApi.Vector2.pool.release(n);
      !this._bounds.origin.isNaN() && i.intersects(this._bounds) ? this._div.style.translate = `${Math.round(this._bounds.origin.x)}px ${Math.round(this._bounds.origin.y)}px` : this._div.style.translate = `${Math.round(10 * e.size.x)}px ${Math.round(10 * e.size.y)}px`;
      PioneerPublicApi.Rect.pool.release(i);
    }
  }
  __setVisible(t) {
    if (!t && this._activeCamera) {
      const t = this._activeCamera.getViewport();
      if (t) {
        const e = t.getBounds();
        this._div.style.translate = `${Math.round(10 * e.size.x)}px ${Math.round(10 * e.size.y)}px`;
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
