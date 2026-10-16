/** @eyes-analysis
 * 文件职责：对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。
 * 依据：import ../pioneer/public-api.js；Point @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:426234-443424.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：轨迹缓存点：保存采样时间、位置和速度，供轨迹几何更新使用。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Point {
  time;
  position;
  velocity;
  /** @eyes-analysis
   * 【结构证据】写入 `position`、`time`、`velocity`；调用 `new PioneerPublicApi.Vector3`。
   * 状态写入：position、time、velocity。
   * 调用线索：new PioneerPublicApi.Vector3。
   */
  constructor() {
    this.time = 0;
    this.position = new PioneerPublicApi.Vector3();
    this.velocity = new PioneerPublicApi.Vector3();
  }
}
/** @eyes-analysis
 * 类职责：对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。
 * 继承：PioneerPublicApi.BaseComponent；导出：TrailComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TrailComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_alphaFade`、`_angleCurveThreshold`、`_color`、`_currentRelativeToEntity`、`_dashGapLength`、`_dashLength`、`_dashOffsetTime`、`_drawStartTime`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.EntityRef`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_alphaFade、_angleCurveThreshold、_color、_currentRelativeToEntity、_dashGapLength、_dashLength、_dashOffsetTime、_drawStartTime等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Color、new PioneerPublicApi.EntityRef、super、this.__setRadius、this.getEntity等。
   */
  constructor(t, e) {
    super(t, e);
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._color.copy`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA、this._color.copy、this.getThreeJsMaterials。
   */
  setColor(t) {
    this._color.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._alphaFade`。
   */
  getAlphaFade() {
    return this._alphaFade;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_widthMax`、`_widthMin`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_widthMax、_widthMin。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setWidths(widthMin, widthMax) {
    this._widthMin = widthMin;
    this._widthMax = widthMax;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "widthMin", widthMin);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "widthMax", widthMax);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_alphaFade`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_alphaFade。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setAlphaFade(alphaFade) {
    this._alphaFade = alphaFade;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "alphaFade", alphaFade);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dashGapLength`、`_dashLength`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_dashGapLength、_dashLength。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setDashLength(dashLength, dashGapLength) {
    this._dashLength = dashLength;
    this._dashGapLength = dashGapLength;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "dashLength", dashLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "dashGapLength", dashGapLength);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_glowWidth`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_glowWidth。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "glowWidth", this._glowWidth);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._startTime`。
   */
  getStartTime() {
    return this._startTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_startTime`。
   * 状态写入：_startTime。
   */
  setStartTime(startTime) {
    this._startTime = startTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._endTime`。
   */
  getEndTime() {
    return this._endTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_endTime`。
   * 状态写入：_endTime。
   */
  setEndTime(endTime) {
    this._endTime = endTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeStartTime`。
   */
  isRelativeStartTime() {
    return this._relativeStartTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeStartTime`；调用 `this.resetPoints`。
   * 状态写入：_relativeStartTime。
   * 调用线索：this.resetPoints。
   */
  setRelativeStartTime(relativeStartTime) {
    this._relativeStartTime = relativeStartTime;
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeEndTime`。
   */
  isRelativeEndTime() {
    return this._relativeEndTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeEndTime`；调用 `this.resetPoints`。
   * 状态写入：_relativeEndTime。
   * 调用线索：this.resetPoints。
   */
  setRelativeEndTime(relativeEndTime) {
    this._relativeEndTime = relativeEndTime;
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._startTimeMultiplier`。
   */
  getStartTimeMultiplier() {
    return this._startTimeMultiplier;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_startTimeMultiplier`。
   * 状态写入：_startTimeMultiplier。
   */
  setStartTimeMultiplier(startTimeMultiplier) {
    this._startTimeMultiplier = startTimeMultiplier;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._endTimeMultiplier`。
   */
  getEndTimeMultiplier() {
    return this._endTimeMultiplier;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_endTimeMultiplier`。
   * 状态写入：_endTimeMultiplier。
   */
  setEndTimeMultiplier(endTimeMultiplier) {
    this._endTimeMultiplier = endTimeMultiplier;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeToEntity.getName()`；调用 `this._relativeToEntity.getName`。
   * 调用线索：this._relativeToEntity.getName。
   */
  getRelativeToEntity() {
    return this._relativeToEntity.getName();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._currentRelativeToEntity.setName`、`this._relativeToEntity.setName`、`this.resetPoints`。
   * 调用线索：this._currentRelativeToEntity.setName、this._relativeToEntity.setName、this.resetPoints。
   */
  setRelativeToEntity(t) {
    this._relativeToEntity.setName(t);
    this._currentRelativeToEntity.setName(t);
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeToEntityOrientation`。
   */
  isRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToEntityOrientation`；调用 `PioneerPublicApi.ThreeJsHelper.setOrientation`、`this.getThreeJsObjects`、`this.resetPoints`。
   * 状态写入：_relativeToEntityOrientation。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setOrientation、this.getThreeJsObjects、this.resetPoints。
   */
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
    relativeToEntityOrientation || PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), PioneerPublicApi.Quaternion.Identity);
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._angleCurveThreshold`。
   */
  getAngleCurveThreshold() {
    return this._angleCurveThreshold;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_angleCurveThreshold`；调用 `this.resetPoints`。
   * 状态写入：_angleCurveThreshold。
   * 调用线索：this.resetPoints。
   */
  setAngleCurveThreshold(angleCurveThreshold) {
    this._angleCurveThreshold = angleCurveThreshold;
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._initialTimeStep`。
   */
  getInitialTimeStep() {
    return this._initialTimeStep;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_initialTimeStep`；调用 `this.resetPoints`。
   * 状态写入：_initialTimeStep。
   * 调用线索：this.resetPoints。
   */
  setInitialTimeStep(initialTimeStep) {
    this._initialTimeStep = initialTimeStep;
    this.resetPoints();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._drawStartTime`。
   */
  getDrawStartTime() {
    return this._drawStartTime;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_drawStartTime`。
   * 状态写入：_drawStartTime。
   */
  setDrawStartTime(drawStartTime) {
    this._drawStartTime = drawStartTime;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pointsPerFrame`。
   */
  getPointsPerFrame() {
    return this._pointsPerFrame;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pointsPerFrame`。
   * 状态写入：_pointsPerFrame。
   */
  setPointsPerFrame(pointsPerFrame) {
    this._pointsPerFrame = pointsPerFrame;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._updatePointPositions`。
   */
  getUpdatePointPositions() {
    return this._updatePointPositions;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_updatePointPositions`。
   * 状态写入：_updatePointPositions。
   */
  setUpdatePointPositions(updatePointPositions) {
    this._updatePointPositions = updatePointPositions;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_points`、`_pointsCount`、`_pointsStart`；调用 `new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`、`new Uint16Array`、`t.setAttribute`。
   * 状态写入：_points、_pointsCount、_pointsStart。
   * 调用线索：new Float32Array、new PioneerPublicApi.THREE.BufferAttribute、new PioneerPublicApi.THREE.InterleavedBuffer、new PioneerPublicApi.THREE.InterleavedBufferAttribute、new Uint16Array等。
   */
  resetPoints() {
    if (this._points = [], this._pointsCount = 0, this._pointsStart = 0, this.getThreeJsObjects().length > 0) {
      const t = this.getThreeJsObjects()[0].geometry;
      const float32Array = new Float32Array(0);
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(float32Array, TrailComponent.VERTEX_SIZE);
      t.setAttribute("position", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      t.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
      t.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
      t.setAttribute("side", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 9, false));
      t.setAttribute("index", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 10, false));
      t.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 11, false));
      t.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.createMeshObject`、`t.uniforms.color.value.set`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.createMeshObject、t.uniforms.color.value.set、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine等。
   */
  async __loadResources() {
    const t = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("trail");
    this.getThreeJsMaterials().push(t);
    t.uniforms.dashLength.value = this._dashLength;
    t.uniforms.dashGapLength.value = this._dashGapLength;
    t.uniforms.indexStart.value = 0;
    t.uniforms.indexCount.value = 0;
    t.uniforms.indexLength.value = 0;
    t.uniforms.color.value.set(this._color.r, this._color.g, this._color.b, this._color.a);
    t.uniforms.widthMin.value = this._widthMin;
    t.uniforms.widthMax.value = this._widthMax;
    t.uniforms.glowWidth.value = this._glowWidth;
    t.uniforms.alphaFade.value = this._alphaFade;
    const e = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, t, [{
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
    this.getThreeJsObjects().push(e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_points`、`_pointsCount`、`_pointsStart`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`、`this.getEntity().getScene().getEngine().getMaterialManager().release`。
   * 状态写入：_points、_pointsCount、_pointsStart。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine、this.getEntity().getScene().getEngine().getMaterialManager等。
   */
  __unloadResources() {
    this.getEntity().getScene().getEngine().getMaterialManager().release(this.getThreeJsMaterials()[0]);
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._points = [];
    this._pointsCount = 0;
    this._pointsStart = 0;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setPosition`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`。
   * 调用线索：PioneerPublicApi.MathUtils.clamp01、PioneerPublicApi.ThreeJsHelper.setOrientation、PioneerPublicApi.ThreeJsHelper.setPosition、PioneerPublicApi.ThreeJsHelper.setUniformNumber、PioneerPublicApi.ThreeJsHelper.setUniformVector2等。
   */
  __prepareForRender(t) {
    const e = this.getEntity().getParent();
    "" === this._relativeToEntity.getName() && null !== e && this._currentRelativeToEntity.get() !== this.getEntity().getParent() && (this._currentRelativeToEntity.setName(e.getName()), this.resetPoints());
    this._updatePoints();
    const i = this.getThreeJsMaterials()[0];
    i.uniforms.indexStart.value = this._pointsStart;
    i.uniforms.indexCount.value = this._pointsCount;
    i.uniforms.indexLength.value = this._points.length;
    let n = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    const o = this.getEntity().getCameraSpacePosition(t).magnitude() / this.getEntity().getPosition().magnitude();
    n *= PioneerPublicApi.MathUtils.clamp01(1e3 * o);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(i, "alphaMultiplier", n);
    const r = PioneerPublicApi.Vector2.pool.get();
    if (t instanceof PioneerPublicApi.SpoutComponent) r.set(.1 * t.getRenderWidth(), .5 * t.getRenderWidth() * .1);else {
      const e = t.getViewport();
      e && r.copy(e.getBounds().size);
    }
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(i, "viewportSize", r);
    PioneerPublicApi.Vector2.pool.release(r);
    const a = this._currentRelativeToEntity.get();
    null !== a && (PioneerPublicApi.ThreeJsHelper.setPosition(this.getThreeJsObjects(), a.getCameraSpacePosition(t)), this._relativeToEntityOrientation && PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), a.getOrientation()));
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_updatePointPositionsLastIndex`；返回 `void PioneerPublicApi.Interval.pool.release(t)`；调用 `Math.min`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.position.copy`。
   * 状态写入：_updatePointPositionsLastIndex。
   * 调用线索：Math.min、PioneerPublicApi.Interval.pool.get、PioneerPublicApi.Interval.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release等。
   */
  _updatePoints() {
    const t = PioneerPublicApi.Interval.pool.get();
    const e = this.getEntity().getScene().getEngine().getTime();
    if (this._getIntervalForUpdate(t, e), isNaN(t.min) || isNaN(t.max)) return void PioneerPublicApi.Interval.pool.release(t);
    const i = this._initialTimeStep ?? t.length() * this._angleCurveThreshold / (2 * Math.PI);
    const n = PioneerPublicApi.Interval.pool.get();
    for (n.set(Number.POSITIVE_INFINITY, 0), this._relativeStartTime && this._pointsCount > 0 && this._points[this._pointsStart].time !== t.min && this._popFrontPoint(n); this._pointsCount > 0 && this._points[this._pointsStart].time < t.min;) this._popFrontPoint(n);
    let o = 0;
    for (; 0 === this._pointsCount || this._points[this._pointsStart].time > t.min;) {
      this._pushFrontPoint(n);
      const s = this._points[this._pointsStart];
      let r = 1;
      let a = Number.POSITIVE_INFINITY;
      let l = i;
      this._pointsCount > 2 && (l = this._points[(this._pointsStart + 2) % this._points.length].time - this._points[(this._pointsStart + 1) % this._points.length].time);
      let c = 0;
      for (; c < 20;) {
        let n;
        if (n = this._pointsCount > 1 ? this._points[(this._pointsStart + 1) % this._points.length].time - l : this._drawStartTime ?? e, n = t.clamp(n), s.time = n, this._getPositionAndVelocity(s.position, s.velocity, s.time), s.position.isNaN()) break;
        let o = 0;
        if (this._pointsCount >= 2 && (o = this._points[(this._pointsStart + 1) % this._points.length].position.distance(s.position) < .001 ? Number.NaN : this._points[(this._pointsStart + 1) % this._points.length].velocity.angle(s.velocity)), o > this._angleCurveThreshold) {
          a = l;
          l = (r + l) / 2;
        } else {
          if (!(this._pointsCount > 1 && l < 10 * i && (isNaN(o) || o < this._angleCurveThreshold / 3) && n !== t.min)) break;
          r = l;
          a === Number.POSITIVE_INFINITY ? l *= 2 : l = (l + a) / 2;
        }
        c++;
      }
      if (s.position.isNaN()) {
        this._popFrontPoint(n);
        break;
      }
      if (o++, o >= this._pointsPerFrame) break;
    }
    for (this._relativeEndTime && this._pointsCount > 0 && this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time !== t.max && this._popBackPoint(n); this._pointsCount > 0 && this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time > t.max;) this._popBackPoint(n);
    for (o = 0; 0 === this._pointsCount || this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length].time < t.max;) {
      this._pushBackPoint(n);
      const s = this._points[(this._pointsStart + this._pointsCount - 1) % this._points.length];
      let r = 1;
      let a = Number.POSITIVE_INFINITY;
      let l = i;
      this._pointsCount > 2 && (l = this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].time - this._points[(this._pointsStart + this._pointsCount - 3) % this._points.length].time);
      let c = 0;
      for (; c < 20;) {
        let n;
        if (n = this._pointsCount > 1 ? this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].time + l : this._drawStartTime ?? e, n = t.clamp(n), s.time = n, this._getPositionAndVelocity(s.position, s.velocity, s.time), s.position.isNaN()) break;
        let o = 0;
        if (this._pointsCount >= 2 && (o = this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].position.distance(s.position) < .001 ? Number.NaN : this._points[(this._pointsStart + this._pointsCount - 2) % this._points.length].velocity.angle(s.velocity)), o > this._angleCurveThreshold) {
          a = l;
          l = (r + l) / 2;
        } else {
          if (!(this._pointsCount > 1 && l < 10 * i && (isNaN(o) || o < this._angleCurveThreshold / 3) && n !== t.max)) break;
          r = l;
          a === Number.POSITIVE_INFINITY ? l *= 2 : l = (l + a) / 2;
        }
        c++;
      }
      if (s.position.isNaN()) {
        this._popBackPoint(n);
        break;
      }
      if (o++, o >= this._pointsPerFrame) break;
    }
    if (PioneerPublicApi.Interval.pool.release(t), this._updatePointPositions && this._pointsCount > 0) for (let t = 0, e = Math.min(this._pointsCount, 5); t < e; t++) {
      this._updatePointPositionsLastIndex = (this._updatePointPositionsLastIndex + 1) % this._pointsCount;
      const t = (this._pointsStart + this._updatePointPositionsLastIndex) % this._points.length;
      const e = this._points[t];
      const i = PioneerPublicApi.Vector3.pool.get();
      const o = PioneerPublicApi.Vector3.pool.get();
      this._getPositionAndVelocity(i, o, e.time);
      i.isNaN() || e.position.copy(i);
      o.isNaN() || e.velocity.copy(o);
      PioneerPublicApi.Vector3.pool.release(i);
      PioneerPublicApi.Vector3.pool.release(o);
      n.expandTo(t);
    }
    const r = this.getThreeJsObjects()[0].geometry.attributes.positionCurr.data;
    const a = r.array;
    for (let t = n.min, e = Math.min(this._points.length - 1, n.max); t <= e; t++) {
      const e = this._points[t].position;
      const i = isNaN(this._points[(t + this._points.length - 1) % this._points.length].position.x) ? e : this._points[(t + this._points.length - 1) % this._points.length].position;
      const s = isNaN(this._points[(t + 1) % this._points.length].position.x) ? e : this._points[(t + 1) % this._points.length].position;
      a[2 * t * TrailComponent.VERTEX_SIZE + 0] = e.x;
      a[2 * t * TrailComponent.VERTEX_SIZE + 1] = e.y;
      a[2 * t * TrailComponent.VERTEX_SIZE + 2] = e.z;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 0] = e.x;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 1] = e.y;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 2] = e.z;
      a[2 * t * TrailComponent.VERTEX_SIZE + 3] = i.x;
      a[2 * t * TrailComponent.VERTEX_SIZE + 4] = i.y;
      a[2 * t * TrailComponent.VERTEX_SIZE + 5] = i.z;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 3] = i.x;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 4] = i.y;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 5] = i.z;
      a[2 * t * TrailComponent.VERTEX_SIZE + 6] = s.x;
      a[2 * t * TrailComponent.VERTEX_SIZE + 7] = s.y;
      a[2 * t * TrailComponent.VERTEX_SIZE + 8] = s.z;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 6] = s.x;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 7] = s.y;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 8] = s.z;
      a[2 * t * TrailComponent.VERTEX_SIZE + 9] = 1;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 9] = -1;
      a[2 * t * TrailComponent.VERTEX_SIZE + 10] = t;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 10] = t;
      a[2 * t * TrailComponent.VERTEX_SIZE + 11] = this._points[t].time - this._dashOffsetTime;
      a[(2 * t + 1) * TrailComponent.VERTEX_SIZE + 11] = this._points[t].time - this._dashOffsetTime;
    }
    r.needsUpdate = true;
    r.clearUpdateRanges();
    n.min <= n.max && r.addUpdateRange(2 * n.min * TrailComponent.VERTEX_SIZE, 2 * (n.length() + 1) * TrailComponent.VERTEX_SIZE);
    PioneerPublicApi.Interval.pool.release(n);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.intersection`、`this._getAutoLength`、`this.getEntity`、`this.getEntity().getPositionCoverage`。
   * 调用线索：t.intersection、this._getAutoLength、this.getEntity、this.getEntity().getPositionCoverage。
   */
  _getIntervalForUpdate(t, e) {
    this._relativeStartTime ? void 0 !== this._startTime ? t.min = e - this._startTimeMultiplier * this._startTime : t.min = e - this._startTimeMultiplier * this._getAutoLength(e) : t.min = this._startTime ?? NaN;
    this._relativeEndTime ? void 0 !== this._endTime ? t.max = e + this._endTimeMultiplier * this._endTime : t.max = e + this._endTimeMultiplier * this._getAutoLength(e) : t.max = this._endTime ?? NaN;
    t.intersection(t, this.getEntity().getPositionCoverage());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pointsCount`、`_pointsStart`、`_points[this._pointsStart].position.x`；调用 `t.expandTo`、`this._resize`。
   * 状态写入：_pointsCount、_pointsStart、_points[this._pointsStart].position.x。
   * 调用线索：t.expandTo、this._resize。
   */
  _popFrontPoint(t) {
    this._pointsCount > 0 && (this._resize(this._pointsCount - 1, t), t.expandTo(this._pointsStart), this._pointsCount > 1 && t.expandTo((this._pointsStart + 1) % this._points.length), this._points[this._pointsStart].position.x = NaN, this._pointsStart = (this._pointsStart + 1) % this._points.length, this._pointsCount -= 1);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pointsCount`、`_points[(this._pointsStart+this._pointsCount)%this._points.length].position.x`；调用 `t.expandTo`、`this._resize`。
   * 状态写入：_pointsCount、_points[(this._pointsStart+this._pointsCount)%this._points.length].position.x。
   * 调用线索：t.expandTo、this._resize。
   */
  _popBackPoint(t) {
    this._pointsCount > 0 && (this._resize(this._pointsCount - 1, t), this._pointsCount -= 1, t.expandTo((this._pointsStart + this._pointsCount) % this._points.length), this._pointsCount > 0 && t.expandTo((this._pointsStart + this._pointsCount - 1) % this._points.length), this._points[(this._pointsStart + this._pointsCount) % this._points.length].position.x = NaN);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pointsCount`、`_pointsStart`；调用 `t.expandTo`、`this._resize`。
   * 状态写入：_pointsCount、_pointsStart。
   * 调用线索：t.expandTo、this._resize。
   */
  _pushFrontPoint(t) {
    this._resize(this._pointsCount + 1, t);
    this._pointsStart = (this._pointsStart + this._points.length - 1) % this._points.length;
    t.expandTo(this._pointsStart);
    this._pointsCount > 0 && t.expandTo((this._pointsStart + 1) % this._points.length);
    this._pointsCount += 1;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pointsCount`；调用 `t.expandTo`、`this._resize`。
   * 状态写入：_pointsCount。
   * 调用线索：t.expandTo、this._resize。
   */
  _pushBackPoint(t) {
    this._resize(this._pointsCount + 1, t);
    this._pointsCount += 1;
    t.expandTo((this._pointsStart + this._pointsCount - 1) % this._points.length);
    this._pointsCount > 1 && t.expandTo((this._pointsStart + this._pointsCount - 2) % this._points.length);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dashOffsetTime`、`_points`、`_pointsStart`；调用 `Math.max`、`PioneerPublicApi.MathUtils.ceilPow2`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`。
   * 状态写入：_dashOffsetTime、_points、_pointsStart。
   * 调用线索：Math.max、PioneerPublicApi.MathUtils.ceilPow2、new Float32Array、new PioneerPublicApi.THREE.BufferAttribute、new PioneerPublicApi.THREE.InterleavedBuffer等。
   */
  _resize(t, e) {
    let i = false;
    if ((t + 1 > this._points.length || t <= this._points.length / 4 && t >= 8) && (i = true), i) {
      const i = Math.max(8, PioneerPublicApi.MathUtils.ceilPow2(t + 1));
      const points = [];
      for (let t = 0, pointsCount = this._pointsCount; t < pointsCount; t++) points.push(this._points[(this._pointsStart + t) % this._points.length]);
      this._pointsStart = 0;
      for (let pointsCount = this._pointsCount, e = i; pointsCount < e; pointsCount++) {
        const point = new Point();
        point.position.x = Number.NaN;
        points.push(point);
      }
      this._points = points;
      const o = this.getThreeJsObjects()[0].geometry;
      const float32Array = new Float32Array(2 * this._points.length * TrailComponent.VERTEX_SIZE);
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(float32Array, TrailComponent.VERTEX_SIZE);
      o.setAttribute("positionCurr", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      o.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
      o.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
      o.setAttribute("side", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 9, false));
      o.setAttribute("index", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 10, false));
      o.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 11, false));
      const l = 2 * this._points.length < 65536 ? new Uint16Array(6 * this._points.length) : new Uint32Array(6 * this._points.length);
      for (let t = 0; t < this._points.length; t++) {
        l[6 * t + 0] = (2 * t + 0) % (2 * this._points.length);
        l[6 * t + 1] = (2 * t + 2) % (2 * this._points.length);
        l[6 * t + 2] = (2 * t + 3) % (2 * this._points.length);
        l[6 * t + 3] = (2 * t + 3) % (2 * this._points.length);
        l[6 * t + 4] = (2 * t + 1) % (2 * this._points.length);
        l[6 * t + 5] = (2 * t + 0) % (2 * this._points.length);
      }
      o.setIndex(new PioneerPublicApi.THREE.BufferAttribute(l, 1));
      this._dashOffsetTime = this._points[this._pointsStart].time;
      e.min = 0;
      e.max = i;
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `o`；调用 `Math.abs`、`Math.min`、`Math.sqrt`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getEccentricity`。
   * 调用线索：Math.abs、Math.min、Math.sqrt、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release等。
   */
  _getAutoLength(t) {
    let e = null;
    for (let i = 0;; i++) {
      const n = this.getEntity().getController(PioneerPublicApi.DynamoController, i);
      if (null === n) break;
      "orb" === n.getPointType() && n.getCoverage().contains(t) && (e = n);
    }
    const i = PioneerPublicApi.Vector3.pool.get();
    const n = PioneerPublicApi.Vector3.pool.get();
    let o;
    if (this.getEntity().getPositionAtTime(i, t), this.getEntity().getVelocityAtTime(n, t), i.cross(i, n), null !== e) {
      const s = e.getEccentricity(t);
      const n = (e.getHeaderValue("gravitationalParameter1") ?? 1) + (e.getHeaderValue("gravitationalParameter2") ?? 0);
      const r = n * n / i.magnitudeSqr() * -.5 * (1 - s * s);
      o = 2 * Math.PI * n / Math.sqrt(8 * Math.abs(Math.min(1, r * r * r)));
    } else o = 2 * Math.PI * i.magnitude() / n.magnitudeSqr();
    PioneerPublicApi.Vector3.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(n);
    return o;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`e.copy`、`e.rotateInverse`、`n.getOrientationAtTime`、`o.getName`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、e.copy、e.rotateInverse、n.getOrientationAtTime等。
   */
  _getPositionAndVelocity(t, e, i) {
    const n = "" !== this._relativeToEntity.getName() ? this._relativeToEntity.get() : this.getEntity().getParent();
    if ("" === this._relativeToEntity.getName()) {
      this.getEntity().getPositionAtTime(t, i);
      this.getEntity().getVelocityAtTime(e, i);
      const n = this.getEntity().getParentAtTime(i);
      const o = this._currentRelativeToEntity.get();
      if (null !== o && "" !== n && n !== o.getName()) {
        const r = this.getEntity().getScene().getEntity(n);
        null !== r ? (r.getPositionRelativeToEntity(t, t, o, i), r.getVelocityRelativeToEntity(e, e, o, i)) : (t.copy(PioneerPublicApi.Vector3.NaN), e.copy(PioneerPublicApi.Vector3.NaN));
      }
    } else null !== n ? (this.getEntity().getPositionRelativeToEntity(t, PioneerPublicApi.Vector3.Zero, n, i), this.getEntity().getVelocityRelativeToEntity(e, PioneerPublicApi.Vector3.Zero, n, i)) : (t.copy(PioneerPublicApi.Vector3.NaN), e.copy(PioneerPublicApi.Vector3.NaN));
    if (this._relativeToEntityOrientation && null !== n) {
      const o = PioneerPublicApi.Quaternion.pool.get();
      n.getOrientationAtTime(o, i);
      t.rotateInverse(o, t);
      e.rotateInverse(o, e);
      PioneerPublicApi.Quaternion.pool.release(o);
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
