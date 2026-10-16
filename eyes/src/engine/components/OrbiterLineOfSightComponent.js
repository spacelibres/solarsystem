// 视线端点先转换到组件实体坐标系，再复制到 LineMesh；临时向量随后归还池，渲染时按相机距离更新透明度。
// Recovered from app.js:9615-11645.
import * as Pioneer from "../pioneer/index.js";
class OrbiterLineOfSightComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
    this._threeJsScene = entity.getScene().getThreeJsScene();
    this._lineMesh = null;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  setTargets(targetA, targetB) {
    if ("string" == typeof targetA) {
      targetA = this.getEntity().getScene().getEntity(targetA);
    }
    if ("string" == typeof targetB) {
      targetB = this.getEntity().getScene().getEntity(targetB);
    }
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
  __prepareForRender(camera) {
    if (null === this._targetA || null === this._targetB) return void (this.getThreeJsObjects().length > 0 && (this.getThreeJsObjects()[0].visible = false));
    this._updatePoints(camera);
    let alpha = 1;
    if (!this._ignoreDistance) {
      alpha *= (camera.getEntity().getPosition().magnitude() - this._distanceThreshold.min) / (this._distanceThreshold.max - this._distanceThreshold.min);
    }
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
    this._color.a = alpha;
    this._lineMesh.prepareForRender(camera);
  }
  _updatePoints() {
    const targetPositionA = Pioneer.Vector3.pool.get();
    const targetPositionB = Pioneer.Vector3.pool.get();
    this._targetA.getPositionRelativeToEntity(targetPositionA, Pioneer.Vector3.Zero, this.getEntity());
    this._targetB.getPositionRelativeToEntity(targetPositionB, Pioneer.Vector3.Zero, this.getEntity());
    this._positions = [];
    this._positions.push(targetPositionA);
    this._positions.push(targetPositionB);
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
    Pioneer.Vector3.pool.release(targetPositionA);
    Pioneer.Vector3.pool.release(targetPositionB);
  }
}
export { OrbiterLineOfSightComponent };
