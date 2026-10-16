// 轨道线由当前位置和速度反求瞬时轨道要素；每度对应一对共享端点，当前偏近点角插入相应区段，非椭圆轨道末端及无效采样用透明度隐藏。
// Recovered from app.js:757816-761933.
import * as Pioneer from "../pioneer/index.js";
class OrbitLineComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._farSideAlphaFade = 1;
    this._lineWidth = 5;
    this._glowWidth = 0;
    this._lineMesh = null;
    this._positions = [];
    this._colors = [];
    this._widths = [];
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
    if (null !== this._lineMesh) {
      for (let vertexIndex = 0, vertexCount = this._colors.length; vertexIndex < vertexCount; vertexIndex++) this._colors[vertexIndex].copy(this._color);
      this._lineMesh.setColors(this._colors);
    }
  }
  getFarSideAlphaFade() {
    return this._farSideAlphaFade;
  }
  setFarSideAlphaFade(farSideAlphaFade) {
    this._farSideAlphaFade = farSideAlphaFade;
  }
  getLineWidth() {
    return this._lineWidth;
  }
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    if (null !== this._lineMesh) {
      for (let vertexIndex = 0, vertexCount = this._widths.length; vertexIndex < vertexCount; vertexIndex++) this._widths[vertexIndex] = this._lineWidth;
      this._lineMesh.setWidths(this._widths);
    }
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    Pioneer.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "glowWidth", this._glowWidth);
  }
  __prepareForRender(camera) {
    if (this._lineMesh) {
      this._updateMesh();
      Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), camera);
      this._lineMesh.prepareForRender(camera);
    }
  }
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    for (let vertexIndex = 0, vertexCount = 720; vertexIndex < vertexCount; vertexIndex++) {
      this._positions.push(new Pioneer.Vector3());
      this._colors.push(new Pioneer.Color());
      this._colors[vertexIndex].copy(this._color);
      this._widths.push(this._lineWidth);
    }
    this._lineMesh.setColors(this._colors);
    this._lineMesh.setWidths(this._widths);
    this._lineMesh.setGlowWidth(this._glowWidth);
  }
  __unloadResources() {
    this._positions = [];
    this._colors = [];
    this._widths = [];
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const entity = this.getEntity();
    const time = entity.getScene().getEngine().getTime();
    let gravitationalParameter = 0;
    for (let controllerIndex = entity.getNumControllers() - 1; controllerIndex >= 0; controllerIndex--) {
      const controller = entity.getController(Pioneer.DynamoController, controllerIndex);
      if (null !== controller && controller.getCoverage().contains(time) && "orb" === controller.getPointType()) {
        gravitationalParameter = (controller.getHeaderValue("gravitationalParameter1") ?? 1) + (controller.getHeaderValue("gravitationalParameter2") ?? 0);
        break;
      }
    }
    OrbitLineComponent.orbitalElements.setFromPositionAndVelocity(entity.getPosition(), entity.getVelocity(), time, gravitationalParameter);
    const currentPosition = entity.getPosition();
    const trueAnomaly = OrbitLineComponent.orbitalElements.getTrueAnomalyFromPosition(currentPosition);
    const eccentricAnomaly = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(trueAnomaly);
    let previousInvalid = false;
    for (let degreeIndex = 0; degreeIndex < 360; degreeIndex += 1) {
      const vertexIndex = 2 * degreeIndex;
      const previousVertexIndex = (2 * degreeIndex - 1 + this._positions.length) % this._positions.length;
      const position = this._positions[vertexIndex];
      const previousPosition = this._positions[previousVertexIndex];
      const color = this._colors[vertexIndex];
      const previousColor = this._colors[previousVertexIndex];
      let segmentAnomaly = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(Pioneer.MathUtils.degToRad(degreeIndex - 180));
      const nextSegmentAnomaly = OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly(Pioneer.MathUtils.degToRad(degreeIndex + 1 - 180));
      if (segmentAnomaly < eccentricAnomaly && eccentricAnomaly < nextSegmentAnomaly || nextSegmentAnomaly < segmentAnomaly && segmentAnomaly < eccentricAnomaly && eccentricAnomaly < nextSegmentAnomaly + Pioneer.MathUtils.TwoPi) {
        segmentAnomaly = eccentricAnomaly;
      }
      const meanAnomaly = OrbitLineComponent.orbitalElements.getMeanAnomalyFromEccentricAnomaly(segmentAnomaly);
      const sampleTime = OrbitLineComponent.orbitalElements.epoch + (meanAnomaly - OrbitLineComponent.orbitalElements.meanAnomalyAtEpoch) / OrbitLineComponent.orbitalElements.meanAngularMotion;
      OrbitLineComponent.orbitalElements.project(position, OrbitLineComponent.velocity, sampleTime);
      position.sub(position, currentPosition);
      previousPosition.copy(position);
      if (isNaN(meanAnomaly)) {
        previousInvalid = true;
        const nextVertexIndex = (vertexIndex + 1) % this._positions.length;
        const earlierVertexIndex = (previousVertexIndex - 1 + this._positions.length) % this._positions.length;
        const nextPosition = this._positions[nextVertexIndex];
        const earlierPosition = this._positions[earlierVertexIndex];
        const nextColor = this._colors[nextVertexIndex];
        const earlierColor = this._colors[earlierVertexIndex];
        position.set(0, 0, 0);
        previousPosition.set(0, 0, 0);
        nextPosition.set(0, 0, 0);
        earlierPosition.set(0, 0, 0);
        color.a = 0;
        previousColor.a = 0;
        nextColor.a = 0;
        earlierColor.a = 0;
        continue;
      }
      let farSideFactor = Pioneer.MathUtils.angle(segmentAnomaly, eccentricAnomaly) / Math.PI;
      farSideFactor = Pioneer.MathUtils.clamp01(farSideFactor);
      const alphaMultiplier = Pioneer.MathUtils.lerp(1, this._farSideAlphaFade, farSideFactor);
      color.mult(this._color, alphaMultiplier);
      if (!previousInvalid) {
        previousColor.mult(this._color, alphaMultiplier);
      }
      previousInvalid = false;
    }
    if (OrbitLineComponent.orbitalElements.eccentricity >= 1) {
      this._positions[this._positions.length - 2].copy(this._positions[this._positions.length - 3]);
      this._positions[this._positions.length - 1].copy(this._positions[this._positions.length - 3]);
      this._colors[this._colors.length - 2].a = 0;
      this._colors[this._colors.length - 1].a = 0;
    }
    this._lineMesh.setPositions(this._positions);
    this._lineMesh.setColors(this._colors);
  }
  _color;
  _farSideAlphaFade;
  _lineWidth;
  _glowWidth;
  _lineMesh;
  _positions;
  _colors;
  _widths;
  static orbitalElements = new Pioneer.OrbitalElements();
  static velocity = new Pioneer.Vector3();
}
export { OrbitLineComponent };
