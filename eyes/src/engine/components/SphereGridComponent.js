// 球面网格用经纬度生成成对线端点，极点不重复画纬线；单位球几何生成后由实体半径统一缩放，颜色和宽度与顶点一一对应。
// Recovered from app.js:389793-392138.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SphereGridComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._degreesPerLine = 10;
    this._color = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._relativeToEntity = true;
    this._lineMesh = null;
    this._meshDirty = true;
  }
  setRadius(radius) {
    this.__setRadius(radius);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
    this._meshDirty = true;
  }
  getDegreesPerLine() {
    return this._degreesPerLine;
  }
  setDegreesPerLine(degreesPerLine) {
    this._degreesPerLine = degreesPerLine;
    this._meshDirty = true;
  }
  isRelativeToEntity() {
    return this._relativeToEntity;
  }
  setRelativeToEntity(relativeToEntity) {
    this._relativeToEntity = relativeToEntity;
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  __prepareForRender(camera) {
    if (this._lineMesh) {
      if (this._meshDirty) {
        this._updateMesh();
      }
      if (this._relativeToEntity) {
        PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
      }
      PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), camera);
      this._lineMesh.prepareForRender(camera);
    }
  }
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    this._updateMesh();
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const positions = [];
    for (let longitudeDegrees = 0; longitudeDegrees < 360; longitudeDegrees += this._degreesPerLine) {
      const nextLongitudeDegrees = Math.min(longitudeDegrees + this._degreesPerLine, 360);
      const longitude = PioneerPublicApi.MathUtils.degToRad(longitudeDegrees);
      const nextLongitude = PioneerPublicApi.MathUtils.degToRad(nextLongitudeDegrees);
      for (let latitudeDegrees = -90; latitudeDegrees < 90; latitudeDegrees += this._degreesPerLine) {
        const nextLatitudeDegrees = Math.min(latitudeDegrees + this._degreesPerLine, 90);
        const latitude = PioneerPublicApi.MathUtils.degToRad(latitudeDegrees);
        const nextLatitude = PioneerPublicApi.MathUtils.degToRad(nextLatitudeDegrees);
        if (-90 < latitudeDegrees && latitudeDegrees < 90) {
          positions.push(new PioneerPublicApi.Vector3(Math.sin(longitude) * Math.cos(latitude), Math.cos(longitude) * Math.cos(latitude), Math.sin(latitude)));
          positions.push(new PioneerPublicApi.Vector3(Math.sin(nextLongitude) * Math.cos(latitude), Math.cos(nextLongitude) * Math.cos(latitude), Math.sin(latitude)));
        }
        positions.push(new PioneerPublicApi.Vector3(Math.sin(longitude) * Math.cos(latitude), Math.cos(longitude) * Math.cos(latitude), Math.sin(latitude)));
        positions.push(new PioneerPublicApi.Vector3(Math.sin(longitude) * Math.cos(nextLatitude), Math.cos(longitude) * Math.cos(nextLatitude), Math.sin(nextLatitude)));
      }
    }
    const colors = [];
    for (let vertexIndex = 0, vertexCount = positions.length; vertexIndex < vertexCount; vertexIndex++) colors.push(this._color);
    const widths = [];
    for (let vertexIndex = 0, vertexCount = positions.length; vertexIndex < vertexCount; vertexIndex++) widths.push(2);
    this._lineMesh.setPositions(positions);
    this._lineMesh.setColors(colors);
    this._lineMesh.setWidths(widths);
    PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), PioneerPublicApi.Quaternion.Identity);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
    this._meshDirty = false;
  }
  _degreesPerLine;
  _color;
  _relativeToEntity;
  _lineMesh;
  _meshDirty;
}
export { SphereGridComponent };
