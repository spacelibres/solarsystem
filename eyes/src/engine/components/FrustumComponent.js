// 视锥由近远截面及长度定义；方向与参考轴叉乘建立截面基，平行时换备用轴，再叠加 spinAngle。相交实体可缩短长度并重算远截面；圆锥与棱锥保留各自线段拓扑，临时基向量只在构建期间持有。
// Recovered from app.js:750609-757815.
import * as Pioneer from "../pioneer/index.js";
class FrustumComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._frustumType = "pyramid";
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._lineWidth = 1;
    this._lineMesh = null;
    this._intersectionEntities = [];
    this._length = 1;
    this._hFOVRad = 1;
    this._vFOVRad = 1;
    this._nearBase = new Pioneer.Vector2(0, 0);
    this._farBase = new Pioneer.Vector2(0, 0);
    this._originOffset = new Pioneer.Vector3(0, 0, 0);
    this._direction = new Pioneer.Vector3(1, 0, 0);
    this._spinAngle = 0;
    this._relativeToEntityOrientation = true;
    this._numberOfCirclePoints = 24;
    this._numConeLines = 2;
    this._hiddenPyramidEdges = [];
    this._keyframes = [];
    this._useKeyframes = false;
  }
  getFrustumType() {
    return this._frustumType;
  }
  setFrustumType(frustumType) {
    this._frustumType = frustumType;
  }
  getIntersectionEntities() {
    return this._intersectionEntities;
  }
  setIntersectionEntities(intersectionEntities) {
    this._intersectionEntities = intersectionEntities;
  }
  getHorizontalFOV() {
    return this._hFOVRad;
  }
  getVerticalFOV() {
    return this._vFOVRad;
  }
  setFOVRadians(hFOVRad, vFOVRad = hFOVRad) {
    this._hFOVRad = hFOVRad;
    this._vFOVRad = vFOVRad;
    this._farBaseFromLengthAndFOV(this._farBase, this._length, this._hFOVRad, this._vFOVRad);
  }
  setFOVDegrees(horizontalDegrees, verticalDegrees = horizontalDegrees) {
    this.setFOVRadians(Pioneer.MathUtils.degToRad(horizontalDegrees), Pioneer.MathUtils.degToRad(verticalDegrees));
  }
  getLength() {
    return this._length;
  }
  setLength(length) {
    this._length = length;
    this.setFOVRadians(this._hFOVRad, this._vFOVRad);
  }
  getNearBase() {
    return this._nearBase;
  }
  setNearBase(width, height = width) {
    this._nearBase.set(width, height);
    this._updateFOVFromBases();
  }
  getFarBase() {
    return this._farBase;
  }
  setFarBase(width, height = width) {
    this._farBase.set(width, height);
    this._updateFOVFromBases();
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
  }
  getOriginOffset() {
    return this._originOffset;
  }
  setOriginOffset(offset) {
    this._originOffset.copy(offset);
  }
  getDirection() {
    return this._direction;
  }
  setDirection(direction) {
    this._direction.normalize(direction);
  }
  getSpinAngle() {
    return this._spinAngle;
  }
  setSpinAngle(spinAngle) {
    this._spinAngle = spinAngle;
  }
  getNumberOfCirclePoints() {
    return this._numberOfCirclePoints;
  }
  setNumberOfCirclePoints(numberOfCirclePoints) {
    this._numberOfCirclePoints = numberOfCirclePoints;
  }
  getNumConeLines() {
    return this._numConeLines;
  }
  setNumConeLines(numConeLines) {
    this._numConeLines = numConeLines;
  }
  getHiddenPyramidEdges() {
    return this._hiddenPyramidEdges;
  }
  setHiddenPyramidEdges(hiddenPyramidEdges) {
    this._hiddenPyramidEdges = hiddenPyramidEdges;
  }
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  getKeyframes() {
    return this._keyframes;
  }
  setKeyframes(keyframes) {
    this._keyframes = keyframes;
    this._updateMesh();
  }
  getUseKeyframes() {
    return this._useKeyframes;
  }
  setUseKeyframes(useKeyframes) {
    this._useKeyframes = useKeyframes;
    this._updateMesh();
  }
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  _farBaseFromLengthAndFOV(output, length, horizontalFov, verticalFov) {
    length += this._nearBase.x / 2 / Math.tan(horizontalFov / 2);
    output.set(Math.tan(horizontalFov / 2) * length * 2, Math.tan(verticalFov / 2) * length * 2);
  }
  _updateFOVFromBases() {
    if (this._nearBase.x > 0 && this._length > 0) {
      const apexDistance = this._nearBase.x / 2 / Math.tan(this._hFOVRad / 2) + this._length;
      this._hFOVRad = 2 * Math.atan(this._farBase.x / 2 / apexDistance);
      this._vFOVRad = 2 * Math.atan(this._farBase.y / 2 / apexDistance);
    }
  }
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._updateMesh();
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  __prepareForRender(camera) {
    if (this._lineMesh) {
      this._updateMesh();
      if (this._relativeToEntityOrientation) {
        const rotatedOrigin = Pioneer.Vector3.pool.get();
        const rotatedDirection = Pioneer.Vector3.pool.get();
        rotatedOrigin.rotate(this.getEntity().getOrientation(), this._originOffset);
        rotatedDirection.rotate(this.getEntity().getOrientation(), this._direction);
        Pioneer.Vector3.pool.release(rotatedOrigin);
        Pioneer.Vector3.pool.release(rotatedDirection);
      }
      Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
      this._lineMesh.prepareForRender(camera);
    }
  }
  _updateMesh() {
    if (!this._lineMesh) return;
    const positions = [];
    if (this._useKeyframes) {
      if (0 === this._keyframes.length) return void this._updateLineMesh(positions);
      const time = this.getEntity().getScene().getEngine().getTime();
      const keyframeIndex = Pioneer.Sort.getIndexObject(time, this._keyframes, (keyframe, sampleTime) => keyframe[1] < sampleTime);
      const keyframe = this._keyframes[keyframeIndex];
      if (keyframe) {
        const startTime = keyframe[0];
        const endTime = keyframe[1];
        if (startTime > time || time >= endTime) return void this._updateLineMesh(positions);
      }
    }
    let direction = this._direction;
    let originOffset = this._originOffset;
    const referenceUp = Pioneer.Vector3.pool.get();
    const referenceRight = Pioneer.Vector3.pool.get();
    if (this._relativeToEntityOrientation) {
      referenceUp.rotate(this.getEntity().getOrientation(), Pioneer.Vector3.YAxis);
      referenceRight.rotate(this.getEntity().getOrientation(), Pioneer.Vector3.XAxis);
      const rotatedDirection = Pioneer.Vector3.pool.get();
      const rotatedOrigin = Pioneer.Vector3.pool.get();
      rotatedDirection.rotate(this.getEntity().getOrientation(), this._direction);
      rotatedOrigin.rotate(this.getEntity().getOrientation(), this._originOffset);
      direction = rotatedDirection;
      originOffset = rotatedOrigin;
    } else {
      referenceUp.copy(Pioneer.Vector3.YAxis);
      referenceRight.copy(Pioneer.Vector3.XAxis);
    }
    let length = this._length;
    let farBase = this._farBase;
    if (this._intersectionEntities.length > 0) {
      const intersection = Pioneer.Interval.pool.get();
      const rayVector = Pioneer.Vector3.pool.get();
      rayVector.setMagnitude(direction, this._length);
      const entityPosition = Pioneer.Vector3.pool.get();
      this._intersectionEntities.forEach(entityName => {
        const entity = this.getEntity().getScene().getEntity(entityName);
        if (entity && (entity.getPositionRelativeToEntity(entityPosition, Pioneer.Vector3.Zero, this.getEntity()), Pioneer.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(intersection, rayVector, entityPosition, entity.getExtentsRadius()), !isNaN(intersection.min) && intersection.min >= 0 && intersection.min <= 1)) {
          const hitDistance = intersection.min * this._length;
          const clearance = hitDistance > 100 ? 11 : 5;
          length = Math.min(length, hitDistance - clearance);
        }
      });
      Pioneer.Interval.pool.release(intersection);
      Pioneer.Vector3.pool.release(entityPosition);
      Pioneer.Vector3.pool.release(rayVector);
      if (length < this._length) {
        farBase = Pioneer.Vector2.pool.get();
        this._farBaseFromLengthAndFOV(farBase, length, this._hFOVRad, this._vFOVRad);
      }
    }
    const right = Pioneer.Vector3.pool.get();
    const verticalAxis = Pioneer.Vector3.pool.get();
    const farCenter = Pioneer.Vector3.pool.get();
    farCenter.set(originOffset.x + direction.x * length, originOffset.y + direction.y * length, originOffset.z + direction.z * length);
    const spinRotation = Pioneer.Quaternion.pool.get();
    spinRotation.setFromAxisAngle(direction, this._spinAngle);
    right.cross(direction, referenceUp);
    if (right.isZero()) {
      right.cross(direction, referenceRight);
    }
    right.normalize(right);
    verticalAxis.cross(direction, right);
    verticalAxis.normalize(verticalAxis);
    right.rotate(spinRotation, right);
    verticalAxis.rotate(spinRotation, verticalAxis);
    const nearHalfWidth = .5 * this._nearBase.x;
    const nearHalfHeight = .5 * this._nearBase.y;
    const farHalfWidth = .5 * farBase.x;
    const farHalfHeight = .5 * farBase.y;
    if ("pyramid" === this._frustumType) {
      const corners = [this._calcPoint(originOffset, right, verticalAxis, -1, -1, nearHalfWidth, nearHalfHeight), this._calcPoint(originOffset, right, verticalAxis, 1, -1, nearHalfWidth, nearHalfHeight), this._calcPoint(originOffset, right, verticalAxis, 1, 1, nearHalfWidth, nearHalfHeight), this._calcPoint(originOffset, right, verticalAxis, -1, 1, nearHalfWidth, nearHalfHeight), this._calcPoint(farCenter, right, verticalAxis, -1, -1, farHalfWidth, farHalfHeight), this._calcPoint(farCenter, right, verticalAxis, 1, -1, farHalfWidth, farHalfHeight), this._calcPoint(farCenter, right, verticalAxis, 1, 1, farHalfWidth, farHalfHeight), this._calcPoint(farCenter, right, verticalAxis, -1, 1, farHalfWidth, farHalfHeight)];
      for (let edgeIndex = 0; edgeIndex < 4; edgeIndex++) {
        positions.push(corners[edgeIndex], corners[(edgeIndex + 1) % 4]);
        positions.push(corners[4 + edgeIndex], corners[4 + (edgeIndex + 1) % 4]);
        if (!this._hiddenPyramidEdges.includes(edgeIndex)) {
          positions.push(corners[edgeIndex], corners[4 + edgeIndex]);
        }
      }
    } else {
      const angleStep = 2 * Math.PI / this._numberOfCirclePoints;
      let angle = angleStep;
      let previousNear = this._calcPoint(originOffset, right, verticalAxis, nearHalfWidth, nearHalfHeight, 1, 0);
      let previousFar = this._calcPoint(farCenter, right, verticalAxis, farHalfWidth, farHalfHeight, 1, 0);
      for (let segmentIndex = 0; segmentIndex < this._numberOfCirclePoints; segmentIndex++) {
        const nearPoint = this._calcPoint(originOffset, right, verticalAxis, nearHalfWidth, nearHalfHeight, Math.cos(angle), Math.sin(angle));
        const farPoint = this._calcPoint(farCenter, right, verticalAxis, farHalfWidth, farHalfHeight, Math.cos(angle), Math.sin(angle));
        positions.push(previousNear, nearPoint);
        positions.push(previousFar, farPoint);
        previousNear = nearPoint;
        previousFar = farPoint;
        angle += angleStep;
      }
      for (let lineIndex = 0; lineIndex < this._numConeLines; lineIndex++) {
        const angle = lineIndex * (2 * Math.PI / this._numConeLines);
        const nearPoint = this._calcPoint(originOffset, right, verticalAxis, nearHalfWidth, nearHalfHeight, Math.cos(angle), Math.sin(angle));
        const farPoint = this._calcPoint(farCenter, right, verticalAxis, farHalfWidth, farHalfHeight, Math.cos(angle), Math.sin(angle));
        positions.push(nearPoint, farPoint);
      }
    }
    Pioneer.Vector3.pool.release(right);
    Pioneer.Vector3.pool.release(verticalAxis);
    Pioneer.Vector3.pool.release(farCenter);
    Pioneer.Quaternion.pool.release(spinRotation);
    if (this._relativeToEntityOrientation) {
      Pioneer.Vector3.pool.release(direction);
      Pioneer.Vector3.pool.release(originOffset);
    }
    Pioneer.Vector3.pool.release(referenceUp);
    Pioneer.Vector3.pool.release(referenceRight);
    if (length < this._length) {
      Pioneer.Vector2.pool.release(farBase);
    }
    this._updateLineMesh(positions);
  }
  _calcPoint(center, right, verticalAxis, widthFactor, heightFactor, horizontalFactor, verticalFactor) {
    const horizontalOffset = widthFactor * horizontalFactor;
    const verticalOffset = heightFactor * verticalFactor;
    return new Pioneer.Vector3(center.x + horizontalOffset * right.x + verticalOffset * verticalAxis.x, center.y + horizontalOffset * right.y + verticalOffset * verticalAxis.y, center.z + horizontalOffset * right.z + verticalOffset * verticalAxis.z);
  }
  _updateLineMesh(positions) {
    if (!this._lineMesh) return;
    const colors = [];
    for (let vertexIndex = 0, vertexCount = positions.length; vertexIndex < vertexCount; vertexIndex++) colors.push(this._color);
    const widths = [];
    for (let vertexIndex = 0, vertexCount = positions.length; vertexIndex < vertexCount; vertexIndex++) widths.push(this._lineWidth);
    this._lineMesh.setPositions(positions);
    this._lineMesh.setColors(colors);
    this._lineMesh.setWidths(widths);
  }
  _frustumType;
  _color;
  _lineWidth;
  _lineMesh;
  _intersectionEntities;
  _length;
  _hFOVRad;
  _vFOVRad;
  _nearBase;
  _farBase;
  _originOffset;
  _direction;
  _spinAngle;
  _relativeToEntityOrientation;
  _numberOfCirclePoints;
  _numConeLines;
  _hiddenPyramidEdges;
  _keyframes;
  _useKeyframes;
}
export { FrustumComponent };
