// 阴影锥先以 Z 轴建立近远圆环，按光源与遮挡物半径求本影或半影的截面，再将 Z 轴旋转到光源背向；保留原三角绕序及池对象释放顺序。
// Recovered from app.js:747098-750608.
import * as Pioneer from "../pioneer/index.js";
class ShadowConeComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._sourceEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._shadowType = "umbra";
    this._targetEntity = new Pioneer.EntityRef(this.getEntity().getScene());
    this._numberOfCirclePoints = 20;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
  }
  getSourceEntity() {
    return this._sourceEntity.getName();
  }
  setSourceEntity(entityName) {
    this._sourceEntity.setName(entityName);
  }
  getTargetEntity() {
    return this._targetEntity.getName();
  }
  setTargetEntity(entityName) {
    this._targetEntity.setName(entityName);
  }
  getShadowType() {
    return this._shadowType;
  }
  setShadowType(shadowType) {
    this._shadowType = shadowType;
    this.resetResources();
  }
  __prepareForRender(camera) {
    this._updateMesh();
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
    const float32Array = new Float32Array(2 * this._numberOfCirclePoints * 3);
    const uint16Array = new Uint16Array(6 * this._numberOfCirclePoints);
    for (let segmentIndex = 0; segmentIndex < this._numberOfCirclePoints; segmentIndex++) {
      const nextSegmentIndex = (segmentIndex + 1) % this._numberOfCirclePoints;
      uint16Array[6 * segmentIndex + 0] = segmentIndex;
      uint16Array[6 * segmentIndex + 1] = nextSegmentIndex;
      uint16Array[6 * segmentIndex + 2] = nextSegmentIndex + this._numberOfCirclePoints;
      uint16Array[6 * segmentIndex + 3] = nextSegmentIndex + this._numberOfCirclePoints;
      uint16Array[6 * segmentIndex + 4] = segmentIndex + this._numberOfCirclePoints;
      uint16Array[6 * segmentIndex + 5] = segmentIndex;
    }
    const geometry = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(geometry, "position", float32Array);
    Pioneer.ThreeJsHelper.setIndices(geometry, uint16Array);
  }
  // 本影截断在锥顶之前；半影沿背光方向扩张。目标实体仅用于指定可视锥长度。
  _updateMesh() {
    const sourceEntity = this._sourceEntity.get();
    if (null === sourceEntity) return;
    const targetEntity = this._targetEntity.get();
    const sourceRadius = sourceEntity.getExtentsRadius();
    const occluderRadius = this.getEntity().getExtentsRadius();
    const shadowAxis = Pioneer.Vector3.pool.get();
    this.getEntity().getPositionRelativeToEntity(shadowAxis, Pioneer.Vector3.Zero, sourceEntity);
    const sourceDistance = shadowAxis.magnitude();
    shadowAxis.normalize(shadowAxis);
    if (shadowAxis.isNaN()) return;
    let shadowLength = 10 * occluderRadius;
    if (null !== targetEntity) {
      const targetPosition = Pioneer.Vector3.pool.get();
      targetEntity.getPositionRelativeToEntity(targetPosition, Pioneer.Vector3.Zero, this.getEntity());
      shadowLength = targetPosition.magnitude();
      Pioneer.Vector3.pool.release(targetPosition);
    }
    const positionAttribute = this.getThreeJsObjects()[0].geometry.getAttribute("position");
    const positions = positionAttribute.array;
    let nearRadius;
    let farRadius;
    let nearOffset;
    let farOffset;
    if ("umbra" === this._shadowType) {
      const angularSine = (sourceRadius - occluderRadius) / sourceDistance;
      const apexDistance = occluderRadius / angularSine;
      const angularTangent = angularSine / Math.sqrt(1 - angularSine * angularSine);
      nearOffset = occluderRadius * angularSine;
      farOffset = Math.min(shadowLength, apexDistance);
      nearRadius = angularTangent * (apexDistance - nearOffset);
      farRadius = angularTangent * (apexDistance - farOffset);
    } else {
      const angularSine = (sourceRadius + occluderRadius) / sourceDistance;
      const apexDistance = -occluderRadius / angularSine;
      const angularTangent = angularSine / Math.sqrt(1 - angularSine * angularSine);
      nearOffset = -occluderRadius * angularSine;
      farOffset = shadowLength;
      nearRadius = -angularTangent * (apexDistance - nearOffset);
      farRadius = -angularTangent * (apexDistance - farOffset);
    }
    if (null !== this.getEntity().getComponent(Pioneer.SpheroidComponent)) {
      nearRadius *= 1.02;
    }
    for (let segmentIndex = 0; segmentIndex < this._numberOfCirclePoints; segmentIndex++) {
      const angle = segmentIndex / this._numberOfCirclePoints * Pioneer.MathUtils.TwoPi;
      const angleCos = Math.cos(angle);
      const angleSin = Math.sin(angle);
      positions[3 * segmentIndex + 0] = nearRadius * angleCos;
      positions[3 * segmentIndex + 1] = nearRadius * angleSin;
      positions[3 * segmentIndex + 2] = nearOffset;
      positions[3 * (segmentIndex + this._numberOfCirclePoints) + 0] = farRadius * angleCos;
      positions[3 * (segmentIndex + this._numberOfCirclePoints) + 1] = farRadius * angleSin;
      positions[3 * (segmentIndex + this._numberOfCirclePoints) + 2] = farOffset;
    }
    positionAttribute.needsUpdate = true;
    const orientation = Pioneer.Quaternion.pool.get();
    const alignmentRotation = Pioneer.Quaternion.pool.get();
    const currentAxis = Pioneer.Vector3.pool.get();
    orientation.copyFromThreeJs(this.getThreeJsObjects()[0].quaternion);
    orientation.getAxis(currentAxis, 2);
    alignmentRotation.setFromVectorFromTo(currentAxis, shadowAxis);
    orientation.mult(alignmentRotation, orientation);
    Pioneer.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], orientation);
    Pioneer.Quaternion.pool.release(orientation);
    Pioneer.Vector3.pool.release(currentAxis);
    Pioneer.Quaternion.pool.release(alignmentRotation);
    Pioneer.Vector3.pool.release(shadowAxis);
  }
  _color;
  _sourceEntity;
  _shadowType;
  _targetEntity;
  _numberOfCirclePoints;
}
export { ShadowConeComponent };
