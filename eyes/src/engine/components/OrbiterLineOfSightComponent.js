// Recovered from app.js:9615-11645.
import * as Pioneer from "../pioneer/index.js";
class OrbiterLineOfSightComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._targetA = null;
    this._targetB = null;
    this._ignoreDistance = false;
    this._distanceThreshold = {
      min: 2,
      max: 20
    };
    this._positions = [];
    this._colors = [];
    this._widths = [];
    this._color = new Pioneer.Color(1, 1, 0);
    this._width = 2;
    this._threeJsScene = e.getScene().getThreeJsScene();
    this._lineMesh = null;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  setTargets(targetA, targetB) {
    "string" == typeof targetA && (targetA = this.getEntity().getScene().getEntity(targetA));
    "string" == typeof targetB && (targetB = this.getEntity().getScene().getEntity(targetB));
    this._targetA = targetA;
    this._targetB = targetB;
  }
  setColor(color) {
    this._color = color;
  }
  setWidth(width) {
    this._width = width;
  }
  __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    return Promise.resolve();
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  __prepareForRender(t) {
    if (null === this._targetA || null === this._targetB) return void (this.getThreeJsObjects().length > 0 && (this.getThreeJsObjects()[0].visible = false));
    this._updatePoints(t);
    let e = 1;
    if (!this._ignoreDistance) {
      e *= (t.getEntity().getPosition().magnitude() - this._distanceThreshold.min) / (this._distanceThreshold.max - this._distanceThreshold.min);
    }
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    this._color.a = e;
    this._lineMesh.prepareForRender(t);
  }
  _updatePoints() {
    const t = Pioneer.Vector3.pool.get();
    const e = Pioneer.Vector3.pool.get();
    this._targetA.getPositionRelativeToEntity(t, Pioneer.Vector3.Zero, this.getEntity());
    this._targetB.getPositionRelativeToEntity(e, Pioneer.Vector3.Zero, this.getEntity());
    this._positions = [];
    this._positions.push(t);
    this._positions.push(e);
    this._lineMesh.setPositions(this._positions);
    const color = this._color;
    this._colors = [];
    this._colors.push(color);
    this._colors.push(color);
    this._lineMesh.setColors(this._colors);
    this._widths = [];
    this._widths.push(this._width);
    this._widths.push(this._width);
    this._lineMesh.setWidths(this._widths);
    Pioneer.Vector3.pool.release(t);
    Pioneer.Vector3.pool.release(e);
  }
}
export { OrbiterLineOfSightComponent };
