// 圆环面中心半径取内外半径平均，管半径取差的一半；两个方向索引均取模闭合，每格保留两个三角形的原始绕序。
// Recovered from app.js:761934-763928.
import * as Pioneer from "../pioneer/index.js";
class TorusComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._innerRadius = 1;
    this._outerRadius = 10;
    this.__setRadius(this._outerRadius);
    this.__setUsesEntityOrientation(true);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
  }
  getInnerRadius() {
    return this._innerRadius;
  }
  setInnerRadius(innerRadius) {
    this._innerRadius = innerRadius;
    this.resetResources();
  }
  getOuterRadius() {
    return this._outerRadius;
  }
  setOuterRadius(outerRadius) {
    this._outerRadius = outerRadius;
    this.__setRadius(this._outerRadius);
    this.resetResources();
  }
  __prepareForRender(camera) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
    const fadeMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, fadeMultiplier);
  }
  async __loadResources() {
    const material = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("basic_alpha");
    this.getThreeJsMaterials().push(material);
    const mesh = Pioneer.ThreeJsHelper.createMeshObject(this, material, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(mesh);
    this._createMesh();
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  _createMesh() {
    const ringSegments = 100;
    const tubeSegments = 20;
    const positions = new Float32Array(6e3);
    const indices = new Uint16Array(12e3);
    const centerRadius = (this._outerRadius + this._innerRadius) / 2;
    const tubeRadius = (this._outerRadius - this._innerRadius) / 2;
    for (let ringIndex = 0; ringIndex < ringSegments; ringIndex++) {
      const ringAngle = ringIndex / ringSegments * Pioneer.MathUtils.TwoPi;
      const ringCos = Math.cos(ringAngle);
      const ringSin = Math.sin(ringAngle);
      for (let tubeIndex = 0; tubeIndex < tubeSegments; tubeIndex++) {
        const tubeAngle = tubeIndex / tubeSegments * Pioneer.MathUtils.TwoPi;
        const tubeCos = Math.cos(tubeAngle);
        const tubeSin = Math.sin(tubeAngle);
        const positionOffset = 3 * (ringIndex * tubeSegments + tubeIndex);
        positions[positionOffset + 0] = ringCos * (centerRadius + tubeRadius * tubeCos);
        positions[positionOffset + 1] = ringSin * (centerRadius + tubeRadius * tubeCos);
        positions[positionOffset + 2] = tubeRadius * tubeSin;
        const indexOffset = 6 * (ringIndex * tubeSegments + tubeIndex);
        const nextRingIndex = (ringIndex + 1) % ringSegments;
        const nextTubeIndex = (tubeIndex + 1) % tubeSegments;
        indices[indexOffset + 0] = ringIndex * tubeSegments + tubeIndex;
        indices[indexOffset + 1] = nextRingIndex * tubeSegments + tubeIndex;
        indices[indexOffset + 2] = ringIndex * tubeSegments + nextTubeIndex;
        indices[indexOffset + 3] = nextRingIndex * tubeSegments + nextTubeIndex;
        indices[indexOffset + 4] = ringIndex * tubeSegments + nextTubeIndex;
        indices[indexOffset + 5] = nextRingIndex * tubeSegments + tubeIndex;
      }
    }
    const geometry = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(geometry, "position", positions);
    Pioneer.ThreeJsHelper.setIndices(geometry, indices);
  }
  _color;
  _innerRadius;
  _outerRadius;
}
export { TorusComponent };
