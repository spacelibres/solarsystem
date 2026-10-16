// 圆环每段使用四个顶点和两个三角形；内圈坐标由内外半径比缩放外圈，保持同一角度，几何仅在 meshDirty 时重建。
// Recovered from app.js:737638-740173.
import * as Pioneer from "../pioneer/index.js";
class AnnulusComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._sizeInner = 1;
    this._sizeOuter = 1;
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._alphaMultiplier = 1;
    this._numPointsOnCircle = 200;
    this._meshDirty = true;
    this.__setRadius(this._sizeOuter);
    this.__setUsesEntityOrientation(true);
  }
  getInnerRadius() {
    return this._sizeInner;
  }
  setInnerRadius(sizeInner) {
    this._sizeInner = sizeInner;
    this._meshDirty = true;
  }
  getOuterRadius() {
    return this._sizeOuter;
  }
  setOuterRadius(sizeOuter) {
    this._sizeOuter = sizeOuter;
    this._meshDirty = true;
    this.__setRadius(sizeOuter);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, this._alphaMultiplier);
  }
  __prepareForRender(camera) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
    if (this._meshDirty) {
      this._updateMesh();
    }
    this._alphaMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, this._alphaMultiplier);
  }
  async __loadResources() {
    const material = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("basic_alpha");
    this.getThreeJsMaterials().push(material);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(material, "color", this._color, this._alphaMultiplier);
    const mesh = Pioneer.ThreeJsHelper.createMeshObject(this, material, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(mesh);
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  _updateMesh() {
    const positions = new Float32Array(4 * this._numPointsOnCircle * 3);
    const indices = new Uint16Array(6 * this._numPointsOnCircle);
    let positionOffset = 0;
    let indexOffset = 0;
    const currentOuterPoint = new Pioneer.Vector3();
    const nextOuterPoint = new Pioneer.Vector3();
    const sizeOuter = this._sizeOuter;
    const innerRatio = this._sizeInner / this._sizeOuter;
    for (let segmentIndex = 0; segmentIndex < this._numPointsOnCircle; segmentIndex++) {
      const startAngle = segmentIndex / this._numPointsOnCircle * Pioneer.MathUtils.TwoPi;
      const endAngle = (segmentIndex + 1) % this._numPointsOnCircle / this._numPointsOnCircle * Pioneer.MathUtils.TwoPi;
      currentOuterPoint.set(sizeOuter * Math.cos(startAngle), sizeOuter * Math.sin(startAngle), 0);
      nextOuterPoint.set(sizeOuter * Math.cos(endAngle), sizeOuter * Math.sin(endAngle), 0);
      positions[positionOffset + 0] = currentOuterPoint.x * innerRatio;
      positions[positionOffset + 1] = currentOuterPoint.y * innerRatio;
      positions[positionOffset + 2] = currentOuterPoint.z * innerRatio;
      positions[positionOffset + 3] = currentOuterPoint.x;
      positions[positionOffset + 4] = currentOuterPoint.y;
      positions[positionOffset + 5] = currentOuterPoint.z;
      positions[positionOffset + 6] = nextOuterPoint.x;
      positions[positionOffset + 7] = nextOuterPoint.y;
      positions[positionOffset + 8] = nextOuterPoint.z;
      positions[positionOffset + 9] = nextOuterPoint.x * innerRatio;
      positions[positionOffset + 10] = nextOuterPoint.y * innerRatio;
      positions[positionOffset + 11] = nextOuterPoint.z * innerRatio;
      indices[indexOffset + 0] = positionOffset / 3 + 0;
      indices[indexOffset + 1] = positionOffset / 3 + 1;
      indices[indexOffset + 2] = positionOffset / 3 + 2;
      indices[indexOffset + 3] = positionOffset / 3 + 2;
      indices[indexOffset + 4] = positionOffset / 3 + 3;
      indices[indexOffset + 5] = positionOffset / 3 + 0;
      positionOffset += 12;
      indexOffset += 6;
    }
    const geometry = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(geometry, "position", positions);
    Pioneer.ThreeJsHelper.setIndices(geometry, indices);
    this._meshDirty = false;
  }
  _sizeInner;
  _sizeOuter;
  _color;
  _alphaMultiplier;
  _numPointsOnCircle;
  _meshDirty;
}
export { AnnulusComponent };
