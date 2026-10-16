// 轨迹以环形缓冲保存 time/position/velocity；首尾各按速度夹角自适应二分时间步，每帧限制新增点数。每点展开左右两个顶点，12 分量交错数据保存当前位置、前后点、side、index 与 dashOffset；dirtyRange 只上传受影响区间，扩容时按逻辑顺序重排并重建索引。
// Recovered from app.js:426234-443424.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Point {
  time;
  position;
  velocity;
  constructor() {
    this.time = 0;
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
}
class TrailComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._color = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._alphaFade = 0;
    this._widthMin = 0;
    this._widthMax = 2;
    this._startTime = void 0;
    this._endTime = 0;
    this._relativeStartTime = true;
    this._relativeEndTime = true;
    this._startTimeMultiplier = 1;
    this._endTimeMultiplier = 1;
    this._relativeToEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._relativeToEntityOrientation = false;
    this._angleCurveThreshold = .05235987755;
    this._initialTimeStep = void 0;
    this._drawStartTime = void 0;
    this._pointsPerFrame = 4;
    this._points = [];
    this._pointsStart = 0;
    this._pointsCount = 0;
    this._currentRelativeToEntity = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._dashLength = 1;
    this._dashGapLength = 0;
    this._glowWidth = 0;
    this._dashOffsetTime = 0;
    this._updatePointPositions = false;
    this._updatePointPositionsLastIndex = 0;
    this.setVisibleInterval(PioneerPublicApi.VisibleInterval.DefaultVisibleFar);
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color);
  }
  getAlphaFade() {
    return this._alphaFade;
  }
  setWidths(widthMin, widthMax) {
    this._widthMin = widthMin;
    this._widthMax = widthMax;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "widthMin", widthMin);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "widthMax", widthMax);
  }
  setAlphaFade(alphaFade) {
    this._alphaFade = alphaFade;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "alphaFade", alphaFade);
  }
  setDashLength(dashLength, dashGapLength) {
    this._dashLength = dashLength;
    this._dashGapLength = dashGapLength;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "dashLength", dashLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "dashGapLength", dashGapLength);
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "glowWidth", this._glowWidth);
  }
  getStartTime() {
    return this._startTime;
  }
  setStartTime(startTime) {
    this._startTime = startTime;
  }
  getEndTime() {
    return this._endTime;
  }
  setEndTime(endTime) {
    this._endTime = endTime;
  }
  isRelativeStartTime() {
    return this._relativeStartTime;
  }
  setRelativeStartTime(relativeStartTime) {
    this._relativeStartTime = relativeStartTime;
    this.resetPoints();
  }
  isRelativeEndTime() {
    return this._relativeEndTime;
  }
  setRelativeEndTime(relativeEndTime) {
    this._relativeEndTime = relativeEndTime;
    this.resetPoints();
  }
  getStartTimeMultiplier() {
    return this._startTimeMultiplier;
  }
  setStartTimeMultiplier(startTimeMultiplier) {
    this._startTimeMultiplier = startTimeMultiplier;
  }
  getEndTimeMultiplier() {
    return this._endTimeMultiplier;
  }
  setEndTimeMultiplier(endTimeMultiplier) {
    this._endTimeMultiplier = endTimeMultiplier;
  }
  getRelativeToEntity() {
    return this._relativeToEntity.getName();
  }
  setRelativeToEntity(entityName) {
    this._relativeToEntity.setName(entityName);
    this._currentRelativeToEntity.setName(entityName);
    this.resetPoints();
  }
  isRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
    if (!relativeToEntityOrientation) {
      PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), PioneerPublicApi.Quaternion.Identity);
    }
    this.resetPoints();
  }
  getAngleCurveThreshold() {
    return this._angleCurveThreshold;
  }
  setAngleCurveThreshold(angleCurveThreshold) {
    this._angleCurveThreshold = angleCurveThreshold;
    this.resetPoints();
  }
  getInitialTimeStep() {
    return this._initialTimeStep;
  }
  setInitialTimeStep(initialTimeStep) {
    this._initialTimeStep = initialTimeStep;
    this.resetPoints();
  }
  getDrawStartTime() {
    return this._drawStartTime;
  }
  setDrawStartTime(drawStartTime) {
    this._drawStartTime = drawStartTime;
  }
  getPointsPerFrame() {
    return this._pointsPerFrame;
  }
  setPointsPerFrame(pointsPerFrame) {
    this._pointsPerFrame = pointsPerFrame;
  }
  getUpdatePointPositions() {
    return this._updatePointPositions;
  }
  setUpdatePointPositions(updatePointPositions) {
    this._updatePointPositions = updatePointPositions;
  }
  resetPoints() {
    this._points = [];
    this._pointsCount = 0;
    this._pointsStart = 0;
    if (this.getThreeJsObjects().length > 0) {
      const geometry = this.getThreeJsObjects()[0].geometry;
      const vertexData = new Float32Array(0);
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(vertexData, TrailComponent.VERTEX_SIZE);
      geometry.setAttribute("position", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      geometry.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
      geometry.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
      geometry.setAttribute("side", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 9, false));
      geometry.setAttribute("index", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 10, false));
      geometry.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 11, false));
      geometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    }
  }
  async __loadResources() {
    const material = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("trail");
    this.getThreeJsMaterials().push(material);
    material.uniforms.dashLength.value = this._dashLength;
    material.uniforms.dashGapLength.value = this._dashGapLength;
    material.uniforms.indexStart.value = 0;
    material.uniforms.indexCount.value = 0;
    material.uniforms.indexLength.value = 0;
    material.uniforms.color.value.set(this._color.r, this._color.g, this._color.b, this._color.a);
    material.uniforms.widthMin.value = this._widthMin;
    material.uniforms.widthMax.value = this._widthMax;
    material.uniforms.glowWidth.value = this._glowWidth;
    material.uniforms.alphaFade.value = this._alphaFade;
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, material, [{
      name: "position",
      dimensions: 3
    }, {
      name: "positionPrev",
      dimensions: 3
    }, {
      name: "positionNext",
      dimensions: 3
    }, {
      name: "side",
      dimensions: 1
    }, {
      name: "index",
      dimensions: 1
    }, {
      name: "dashOffset",
      dimensions: 1
    }], true);
    this.getThreeJsObjects().push(mesh);
  }
  __unloadResources() {
    this.getEntity().getScene().getEngine().getMaterialManager().release(this.getThreeJsMaterials()[0]);
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._points = [];
    this._pointsCount = 0;
    this._pointsStart = 0;
  }
  __prepareForRender(camera) {
    const parentEntity = this.getEntity().getParent();
    if ("" === this._relativeToEntity.getName() && null !== parentEntity && this._currentRelativeToEntity.get() !== this.getEntity().getParent()) {
      this._currentRelativeToEntity.setName(parentEntity.getName());
      this.resetPoints();
    }
    this._updatePoints();
    const material = this.getThreeJsMaterials()[0];
    material.uniforms.indexStart.value = this._pointsStart;
    material.uniforms.indexCount.value = this._pointsCount;
    material.uniforms.indexLength.value = this._points.length;
    let fadeMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    const relativeDistance = this.getEntity().getCameraSpacePosition(camera).magnitude() / this.getEntity().getPosition().magnitude();
    fadeMultiplier *= PioneerPublicApi.MathUtils.clamp01(1e3 * relativeDistance);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "alphaMultiplier", fadeMultiplier);
    const viewportSize = PioneerPublicApi.Vector2.pool.get();
    if (camera instanceof PioneerPublicApi.SpoutComponent) viewportSize.set(.1 * camera.getRenderWidth(), .5 * camera.getRenderWidth() * .1);else {
      const viewport = camera.getViewport();
      if (viewport) {
        viewportSize.copy(viewport.getBounds().size);
      }
    }
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(material, "viewportSize", viewportSize);
    PioneerPublicApi.Vector2.pool.release(viewportSize);
    const referenceEntity = this._currentRelativeToEntity.get();
    if (null !== referenceEntity) {
      PioneerPublicApi.ThreeJsHelper.setPosition(this.getThreeJsObjects(), referenceEntity.getCameraSpacePosition(camera));
      if (this._relativeToEntityOrientation) {
        PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), referenceEntity.getOrientation());
      }
    }
  }
  // 首尾各扩展到时间区间边界；曲率过大缩步，过小增步，最多试探 20 次并受每帧新增预算约束。
  _updatePoints() {
    const interval = PioneerPublicApi.Interval.pool.get();
    const time = this.getEntity().getScene().getEngine().getTime();
    this._getIntervalForUpdate(interval, time);
    if (isNaN(interval.min) || isNaN(interval.max)) return void PioneerPublicApi.Interval.pool.release(interval);
    const initialStep = this._initialTimeStep ?? interval.length() * this._angleCurveThreshold / (2 * Math.PI);
    const dirtyRange = PioneerPublicApi.Interval.pool.get();
    for (dirtyRange.set(Number.POSITIVE_INFINITY, 0), this._relativeStartTime && this._pointsCount > 0 && this._points[this._pointsStart].time !== interval.min && this._popFrontPoint(dirtyRange); this._pointsCount > 0 && this._points[this._pointsStart].time < interval.min;) this._popFrontPoint(dirtyRange);
    let addedCount = 0;
    for (; 0 === this._pointsCount || this._points[this._pointsStart].time > interval.min;) {
      this._pushFrontPoint(dirtyRange);
      const point = this._points[this._pointsStart];
      let lowerStep = 1;
      let upperStep = Number.POSITIVE_INFINITY;
      let timeStep = initialStep;
      if (this._pointsCount > 2) {
        timeStep = this._points[(this._pointsStart + 2) % this._points.length].time - this._points[(this._pointsStart + 1) % this._points.length].time;
      }
      let attempts = 0;
      for (; attempts < 20;) {
        let sampleTime;
        sampleTime = this._pointsCount > 1 ? this._points[(this._pointsStart + 1) % this._points.length].time - timeStep : this._drawStartTime ?? time;
        sampleTime = interval.clamp(sampleTime);
        point.time = sampleTime;
        this._getPositionAndVelocity(point.position, point.velocity, point.time);
        if (point.position.isNaN()) break;
        let curveAngle = 0;
        if (this._pointsCount >= 2) {
          curveAngle = this._points[(this._pointsStart + 1) % this._points.length].position.distance(point.position) < .001 ? Number.NaN : this._points[(this._pointsStart + 1) % this._points.length].velocity.angle(point.velocity);
        }
        if (curveAngle > this._angleCurveThreshold) {
          upperStep = timeStep;
          timeStep = (lowerStep + timeStep) / 2;
        } else {
          if (!(this._pointsCount > 1 && timeStep < 10 * initialStep && (isNaN(curveAngle) || curveAngle < this._angleCurveThreshold / 3) && sampleTime !== interval.min)) break;
          lowerStep = timeStep;
          if (upperStep === Number.POSITIVE_INFINITY) {
            timeStep *= 2;
          } else {
            timeStep = (timeStep + upperStep) / 2;
          }
        }
        attempts++;
      }
      if (point.position.isNaN()) {
        this._popFrontPoint(dirtyRange);
        break;
      }
      addedCount++;
      if (addedCount >= this._pointsPerFrame) break;
    }
    for (this._relativeEndTime && this._pointsCount > 0 && this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time !== interval.max && this._popBackPoint(dirtyRange); this._pointsCount > 0 && this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time > interval.max;) this._popBackPoint(dirtyRange);
    for (addedCount = 0; 0 === this._pointsCount || this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time < interval.max;) {
      this._pushBackPoint(dirtyRange);
      const point = this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length];
      let lowerStep = 1;
      let upperStep = Number.POSITIVE_INFINITY;
      let timeStep = initialStep;
      if (this._pointsCount > 2) {
        timeStep = this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].time - this._points[(this._pointsStart + this._pointsCount - 3) % this._points.length].time;
      }
      let attempts = 0;
      for (; attempts < 20;) {
        let sampleTime;
        sampleTime = this._pointsCount > 1 ? this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].time + timeStep : this._drawStartTime ?? time;
        sampleTime = interval.clamp(sampleTime);
        point.time = sampleTime;
        this._getPositionAndVelocity(point.position, point.velocity, point.time);
        if (point.position.isNaN()) break;
        let curveAngle = 0;
        if (this._pointsCount >= 2) {
          curveAngle = this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].position.distance(point.position) < .001 ? Number.NaN : this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].velocity.angle(point.velocity);
        }
        if (curveAngle > this._angleCurveThreshold) {
          upperStep = timeStep;
          timeStep = (lowerStep + timeStep) / 2;
        } else {
          if (!(this._pointsCount > 1 && timeStep < 10 * initialStep && (isNaN(curveAngle) || curveAngle < this._angleCurveThreshold / 3) && sampleTime !== interval.max)) break;
          lowerStep = timeStep;
          if (upperStep === Number.POSITIVE_INFINITY) {
            timeStep *= 2;
          } else {
            timeStep = (timeStep + upperStep) / 2;
          }
        }
        attempts++;
      }
      if (point.position.isNaN()) {
        this._popBackPoint(dirtyRange);
        break;
      }
      addedCount++;
      if (addedCount >= this._pointsPerFrame) break;
    }
    PioneerPublicApi.Interval.pool.release(interval);
    if (this._updatePointPositions && this._pointsCount > 0) for (let refreshIndex = 0, refreshCount = Math.min(this._pointsCount, 5); refreshIndex < refreshCount; refreshIndex++) {
      this._updatePointPositionsLastIndex = (this._updatePointPositionsLastIndex + 1) % this._pointsCount;
      const pointIndex = (this._pointsStart + this._updatePointPositionsLastIndex) % this._points.length;
      const point = this._points[pointIndex];
      const position = PioneerPublicApi.Vector3.pool.get();
      const velocity = PioneerPublicApi.Vector3.pool.get();
      this._getPositionAndVelocity(position, velocity, point.time);
      if (!position.isNaN()) {
        point.position.copy(position);
      }
      if (!velocity.isNaN()) {
        point.velocity.copy(velocity);
      }
      PioneerPublicApi.Vector3.pool.release(position);
      PioneerPublicApi.Vector3.pool.release(velocity);
      dirtyRange.expandTo(pointIndex);
    }
    const vertexBuffer = this.getThreeJsObjects()[0].geometry.attributes.positionCurr.data;
    const vertexData = vertexBuffer.array;
    for (let pointIndex = dirtyRange.min, lastPointIndex = Math.min(this._points.length - 1, dirtyRange.max); pointIndex <= lastPointIndex; pointIndex++) {
      const position = this._points[pointIndex].position;
      const previousPosition = isNaN(this._points[(pointIndex + this._points.length - 1) % this._points.length].position.x) ? position : this._points[(pointIndex + this._points.length - 1) % this._points.length].position;
      const nextPosition = isNaN(this._points[(pointIndex + 1) % this._points.length].position.x) ? position : this._points[(pointIndex + 1) % this._points.length].position;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 0] = position.x;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 1] = position.y;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 2] = position.z;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 0] = position.x;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 1] = position.y;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 2] = position.z;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 3] = previousPosition.x;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 4] = previousPosition.y;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 5] = previousPosition.z;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 3] = previousPosition.x;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 4] = previousPosition.y;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 5] = previousPosition.z;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 6] = nextPosition.x;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 7] = nextPosition.y;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 8] = nextPosition.z;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 6] = nextPosition.x;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 7] = nextPosition.y;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 8] = nextPosition.z;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 9] = 1;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 9] = -1;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 10] = pointIndex;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 10] = pointIndex;
      vertexData[2 * pointIndex * TrailComponent.VERTEX_SIZE + 11] = this._points[pointIndex].time - this._dashOffsetTime;
      vertexData[(2 * pointIndex + 1) * TrailComponent.VERTEX_SIZE + 11] = this._points[pointIndex].time - this._dashOffsetTime;
    }
    vertexBuffer.needsUpdate = true;
    vertexBuffer.clearUpdateRanges();
    if (dirtyRange.min <= dirtyRange.max) {
      vertexBuffer.addUpdateRange(2 * dirtyRange.min * TrailComponent.VERTEX_SIZE, 2 * (dirtyRange.length() + 1) * TrailComponent.VERTEX_SIZE);
    }
    PioneerPublicApi.Interval.pool.release(dirtyRange);
  }
  _getIntervalForUpdate(output, time) {
    if (this._relativeStartTime) {
      if (void 0 !== this._startTime) {
        output.min = time - this._startTimeMultiplier * this._startTime;
      } else {
        output.min = time - this._startTimeMultiplier * this._getAutoLength(time);
      }
    } else {
      output.min = this._startTime ?? NaN;
    }
    if (this._relativeEndTime) {
      if (void 0 !== this._endTime) {
        output.max = time + this._endTimeMultiplier * this._endTime;
      } else {
        output.max = time + this._endTimeMultiplier * this._getAutoLength(time);
      }
    } else {
      output.max = this._endTime ?? NaN;
    }
    output.intersection(output, this.getEntity().getPositionCoverage());
  }
  _popFrontPoint(dirtyRange) {
    if (this._pointsCount > 0) {
      this._resize(this._pointsCount - 1, dirtyRange);
      dirtyRange.expandTo(this._pointsStart);
      if (this._pointsCount > 1) {
        dirtyRange.expandTo((this._pointsStart + 1) % this._points.length);
      }
      this._points[this._pointsStart].position.x = NaN;
      this._pointsStart = (this._pointsStart + 1) % this._points.length;
      this._pointsCount -= 1;
    }
  }
  _popBackPoint(dirtyRange) {
    if (this._pointsCount > 0) {
      this._resize(this._pointsCount - 1, dirtyRange);
      this._pointsCount -= 1;
      dirtyRange.expandTo((this._pointsStart + this._pointsCount) % this._points.length);
      if (this._pointsCount > 0) {
        dirtyRange.expandTo((this._pointsStart + this._pointsCount - 1) % this._points.length);
      }
      this._points[(this._pointsStart + this._pointsCount) % this._points.length].position.x = NaN;
    }
  }
  _pushFrontPoint(dirtyRange) {
    this._resize(this._pointsCount + 1, dirtyRange);
    this._pointsStart = (this._pointsStart + this._points.length - 1) % this._points.length;
    dirtyRange.expandTo(this._pointsStart);
    if (this._pointsCount > 0) {
      dirtyRange.expandTo((this._pointsStart + 1) % this._points.length);
    }
    this._pointsCount += 1;
  }
  _pushBackPoint(dirtyRange) {
    this._resize(this._pointsCount + 1, dirtyRange);
    this._pointsCount += 1;
    dirtyRange.expandTo((this._pointsStart + this._pointsCount - 1) % this._points.length);
    if (this._pointsCount > 1) {
      dirtyRange.expandTo((this._pointsStart + this._pointsCount - 2) % this._points.length);
    }
  }
  // 环形缓冲变容量时先按逻辑顺序复制已有点；两倍顶点数决定索引必须用 Uint16 还是 Uint32。
  _resize(pointCount, dirtyRange) {
    let needsResize = false;
    if (pointCount + 1 > this._points.length || pointCount <= this._points.length / 4 && pointCount >= 8) {
      needsResize = true;
    }
    if (needsResize) {
      const capacity = Math.max(8, PioneerPublicApi.MathUtils.ceilPow2(pointCount + 1));
      const points = [];
      for (let pointIndex = 0, pointsCount = this._pointsCount; pointIndex < pointsCount; pointIndex++) points.push(this._points[(this._pointsStart + pointIndex) % this._points.length]);
      this._pointsStart = 0;
      for (let pointsCount = this._pointsCount, fillLimit = capacity; pointsCount < fillLimit; pointsCount++) {
        const point = new Point();
        point.position.x = Number.NaN;
        points.push(point);
      }
      this._points = points;
      const geometry = this.getThreeJsObjects()[0].geometry;
      const vertexData = new Float32Array(2 * this._points.length * TrailComponent.VERTEX_SIZE);
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(vertexData, TrailComponent.VERTEX_SIZE);
      geometry.setAttribute("positionCurr", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      geometry.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
      geometry.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
      geometry.setAttribute("side", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 9, false));
      geometry.setAttribute("index", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 10, false));
      geometry.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 11, false));
      const indices = 2 * this._points.length < 65536 ? new Uint16Array(6 * this._points.length) : new Uint32Array(6 * this._points.length);
      for (let pointIndex = 0; pointIndex < this._points.length; pointIndex++) {
        indices[6 * pointIndex + 0] = (2 * pointIndex + 0) % (2 * this._points.length);
        indices[6 * pointIndex + 1] = (2 * pointIndex + 2) % (2 * this._points.length);
        indices[6 * pointIndex + 2] = (2 * pointIndex + 3) % (2 * this._points.length);
        indices[6 * pointIndex + 3] = (2 * pointIndex + 3) % (2 * this._points.length);
        indices[6 * pointIndex + 4] = (2 * pointIndex + 1) % (2 * this._points.length);
        indices[6 * pointIndex + 5] = (2 * pointIndex + 0) % (2 * this._points.length);
      }
      geometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(indices, 1));
      this._dashOffsetTime = this._points[this._pointsStart].time;
      dirtyRange.min = 0;
      dirtyRange.max = capacity;
    }
  }
  _getAutoLength(time) {
    let orbitalController = null;
    for (let controllerIndex = 0;; controllerIndex++) {
      const controller = this.getEntity().getController(PioneerPublicApi.DynamoController, controllerIndex);
      if (null === controller) break;
      if ("orb" === controller.getPointType() && controller.getCoverage().contains(time)) {
        orbitalController = controller;
      }
    }
    const angularMomentum = PioneerPublicApi.Vector3.pool.get();
    const velocity = PioneerPublicApi.Vector3.pool.get();
    let duration;
    this.getEntity().getPositionAtTime(angularMomentum, time);
    this.getEntity().getVelocityAtTime(velocity, time);
    angularMomentum.cross(angularMomentum, velocity);
    if (null !== orbitalController) {
      const eccentricity = orbitalController.getEccentricity(time);
      const gravitationalParameter = (orbitalController.getHeaderValue("gravitationalParameter1") ?? 1) + (orbitalController.getHeaderValue("gravitationalParameter2") ?? 0);
      const specificEnergy = gravitationalParameter * gravitationalParameter / angularMomentum.magnitudeSqr() * -.5 * (1 - eccentricity * eccentricity);
      duration = 2 * Math.PI * gravitationalParameter / Math.sqrt(8 * Math.abs(Math.min(1, specificEnergy * specificEnergy * specificEnergy)));
    } else duration = 2 * Math.PI * angularMomentum.magnitude() / velocity.magnitudeSqr();
    PioneerPublicApi.Vector3.pool.release(angularMomentum);
    PioneerPublicApi.Vector3.pool.release(velocity);
    return duration;
  }
  _getPositionAndVelocity(outputPosition, outputVelocity, time) {
    const referenceEntity = "" !== this._relativeToEntity.getName() ? this._relativeToEntity.get() : this.getEntity().getParent();
    if ("" === this._relativeToEntity.getName()) {
      this.getEntity().getPositionAtTime(outputPosition, time);
      this.getEntity().getVelocityAtTime(outputVelocity, time);
      const parentName = this.getEntity().getParentAtTime(time);
      const currentReference = this._currentRelativeToEntity.get();
      if (null !== currentReference && "" !== parentName && parentName !== currentReference.getName()) {
        const parentEntity = this.getEntity().getScene().getEntity(parentName);
        if (null !== parentEntity) {
          parentEntity.getPositionRelativeToEntity(outputPosition, outputPosition, currentReference, time);
          parentEntity.getVelocityRelativeToEntity(outputVelocity, outputVelocity, currentReference, time);
        } else {
          outputPosition.copy(PioneerPublicApi.Vector3.NaN);
          outputVelocity.copy(PioneerPublicApi.Vector3.NaN);
        }
      }
    } else if (null !== referenceEntity) {
      this.getEntity().getPositionRelativeToEntity(outputPosition, PioneerPublicApi.Vector3.Zero, referenceEntity, time);
      this.getEntity().getVelocityRelativeToEntity(outputVelocity, PioneerPublicApi.Vector3.Zero, referenceEntity, time);
    } else {
      outputPosition.copy(PioneerPublicApi.Vector3.NaN);
      outputVelocity.copy(PioneerPublicApi.Vector3.NaN);
    }
    if (this._relativeToEntityOrientation && null !== referenceEntity) {
      const orientation = PioneerPublicApi.Quaternion.pool.get();
      referenceEntity.getOrientationAtTime(orientation, time);
      outputPosition.rotateInverse(orientation, outputPosition);
      outputVelocity.rotateInverse(orientation, outputVelocity);
      PioneerPublicApi.Quaternion.pool.release(orientation);
    }
  }
  _color;
  _alphaFade;
  _widthMin;
  _widthMax;
  _startTime;
  _endTime;
  _relativeStartTime;
  _relativeEndTime;
  _startTimeMultiplier;
  _endTimeMultiplier;
  _relativeToEntity;
  _relativeToEntityOrientation;
  _angleCurveThreshold;
  _initialTimeStep;
  _drawStartTime;
  _pointsPerFrame;
  _points;
  _pointsStart;
  _pointsCount;
  _currentRelativeToEntity;
  _dashLength;
  _dashGapLength;
  _glowWidth;
  _dashOffsetTime;
  _updatePointPositions;
  _updatePointPositionsLastIndex;
  static VERTEX_SIZE = 12;
}
export { TrailComponent };
