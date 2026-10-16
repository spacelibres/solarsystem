// 圆盘网格以成对端点描述线段；圆圈半径按 radialPower 分布，辐条从原点到单位圆，LineMesh 统一施加实际尺寸与线宽。
// Recovered from app.js:744711-747097.
import * as Pioneer from "../pioneer/index.js";
class DiscGridComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._size = 1;
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._lineWidth = 1;
    this._numCircles = 10;
    this._numSpokes = 20;
    this._radialPower = 1;
    this._lineMesh = null;
    this._meshDirty = true;
    this.__setRadius(this._size);
    this.__setUsesEntityOrientation(true);
  }
  getSize() {
    return this._size;
  }
  setSize(size) {
    this._size = size;
    this.__setRadius(this._size);
    if (null !== this._lineMesh) {
      this._lineMesh.setScale(this._size);
    }
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
    this._meshDirty = true;
  }
  getLineWidth() {
    return this._lineWidth;
  }
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    if (null !== this._lineMesh) {
      this._lineMesh.setWidths(this._lineWidth);
    }
  }
  getNumCircles() {
    return this._numCircles;
  }
  setNumCircles(numCircles) {
    this._numCircles = numCircles;
    this._meshDirty = true;
  }
  getNumSpokes() {
    return this._numSpokes;
  }
  setNumSpokes(numSpokes) {
    this._numSpokes = numSpokes;
    this._meshDirty = true;
  }
  getRadialPower() {
    return this._radialPower;
  }
  setRadialPower(radialPower) {
    this._radialPower = radialPower;
    this._meshDirty = true;
  }
  __prepareForRender(camera) {
    if (this._lineMesh) {
      if (this._meshDirty) {
        this._updateMesh();
      }
      this._lineMesh.prepareForRender(camera);
      for (let objectIndex = 0, objectCount = this.getThreeJsObjects().length; objectIndex < objectCount; objectIndex++) {
        Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[objectIndex], this.getEntity());
        Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[objectIndex], this.getEntity(), camera);
      }
    }
  }
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._updateMesh();
    this._lineMesh.setScale(this._size);
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const positions = [];
    for (let circleIndex = 1; circleIndex <= this._numCircles; circleIndex++) {
      const radius = 1 !== this._radialPower ? this._radialPower ** (circleIndex - this._numCircles) : circleIndex / this._numCircles;
      const segments = 50;
      for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
        const startAngle = segmentIndex / segments * Pioneer.MathUtils.TwoPi;
        const endAngle = (segmentIndex + 1) % segments / segments * Pioneer.MathUtils.TwoPi;
        positions.push(new Pioneer.Vector3(radius * Math.cos(startAngle), radius * Math.sin(startAngle), 0));
        positions.push(new Pioneer.Vector3(radius * Math.cos(endAngle), radius * Math.sin(endAngle), 0));
      }
    }
    for (let spokeIndex = 0; spokeIndex < this._numSpokes; spokeIndex++) {
      const angle = spokeIndex / this._numSpokes * Pioneer.MathUtils.TwoPi;
      positions.push(Pioneer.Vector3.Zero);
      positions.push(new Pioneer.Vector3(Math.cos(angle), Math.sin(angle), 0));
    }
    const colors = [];
    for (let vertexIndex = 0, vertexCount = positions.length; vertexIndex < vertexCount; vertexIndex++) colors.push(this._color);
    this._lineMesh.setPositions(positions);
    this._lineMesh.setColors(colors);
    this._lineMesh.setWidths(this._lineWidth);
    this._meshDirty = false;
  }
  _size;
  _color;
  _lineWidth;
  _numCircles;
  _numSpokes;
  _radialPower;
  _lineMesh;
  _meshDirty;
}
export { DiscGridComponent };
