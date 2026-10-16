/** @eyes-analysis
 * 文件职责：在引用实体之间更新带端点/颜色的距离线段。
 * 依据：import ../pioneer/index.js；DistanceLineComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:535372-539211.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：在引用实体之间更新带端点/颜色的距离线段。
 * 继承：Pioneer.BaseComponent；导出：DistanceLineComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DistanceLineComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_animation`、`_color`、`_depthTest`、`_distance`、`_lineMesh`、`_sourceMpIsSurface`、`_sourceRelRadius`、`_switchStartPos`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。
   * 状态写入：_animation、_color、_depthTest、_distance、_lineMesh、_sourceMpIsSurface、_sourceRelRadius、_switchStartPos等；完整记录见索引。
   * 调用线索：new Pioneer.Color、super、this.__setRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._targetEntity = null;
    this._color = new Pioneer.Color(.48, .56, .66);
    this._distance = null;
    this._sourceRelRadius = null;
    this._targetRelRadius = null;
    this._sourceMpIsSurface = false;
    this._targetMpIsSurface = false;
    this._switchStartPos = null;
    this._depthTest = false;
    this._animation = {
      isAnimating: false,
      duration: 300,
      sourceStartTime: null,
      targetStartTime: null
    };
    this._width = 2;
    this._lineMesh = null;
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_targetEntity`。
   * 状态写入：_targetEntity。
   */
  setTargetEntity(targetEntity) {
    this._targetEntity = targetEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_animation.isAnimating`、`_animation.sourceStartTime`、`_sourceMpIsSurface`；调用 `Date.now`。
   * 状态写入：_animation.isAnimating、_animation.sourceStartTime、_sourceMpIsSurface。
   * 调用线索：Date.now。
   */
  setSourceMeasurePoint(t) {
    const sourceMpIsSurface = "surface" === t;
    this._sourceMpIsSurface !== sourceMpIsSurface && (this._sourceMpIsSurface = sourceMpIsSurface, this._animation.isAnimating = true, this._animation.sourceStartTime = Date.now());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_animation.isAnimating`、`_animation.targetStartTime`、`_targetMpIsSurface`；调用 `Date.now`。
   * 状态写入：_animation.isAnimating、_animation.targetStartTime、_targetMpIsSurface。
   * 调用线索：Date.now。
   */
  setTargetMeasurePoint(t) {
    const targetMpIsSurface = "surface" === t;
    this._targetMpIsSurface !== targetMpIsSurface && (this._targetMpIsSurface = targetMpIsSurface, this._animation.isAnimating = true, this._animation.targetStartTime = Date.now());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_color`。
   * 状态写入：_color。
   */
  setColor(color) {
    this._color = color;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_width`。
   * 状态写入：_width。
   */
  setWidth(width) {
    this._width = width;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_distance`、`_sourceRelRadius`、`_targetRelRadius`；调用 `Math.max`、`Math.min`。
   * 状态写入：_distance、_sourceRelRadius、_targetRelRadius。
   * 调用线索：Math.max、Math.min。
   */
  setDistanceProps({
    distance: distance,
    sourceRadius: sourceRadius,
    targetRadius: targetRadius
  }) {
    this._distance = distance;
    this._sourceRelRadius = Math.max(Math.min(sourceRadius / this._distance, 1), 0);
    this._targetRelRadius = Math.max(Math.min(targetRadius / this._distance, 1), 0);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `(e<=1?Math.pow(e,4):2-Math.pow(2-e,4))/2`；调用 `Math.pow`。
   * 调用线索：Math.pow。
   */
  _applyEasing(t) {
    const e = 2 * t;
    return (e <= 1 ? Math.pow(e, 4) : 2 - Math.pow(2 - e, 4)) / 2;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_animation.isAnimating`、`_animation.sourceStartTime`、`_animation.targetStartTime`；返回 `void`；调用 `Date.now`、`e.lerp`、`t.lerp`、`this._applyEasing`。
   * 状态写入：_animation.isAnimating、_animation.sourceStartTime、_animation.targetStartTime。
   * 调用线索：Date.now、e.lerp、t.lerp、this._applyEasing。
   */
  _updateAnimation(t, e, i, s, n, o) {
    if (!this._animation.isAnimating) return;
    const {
      sourceStartTime: sourceStartTime,
      targetStartTime: targetStartTime,
      duration: duration
    } = this._animation;
    if (sourceStartTime) {
      const a = Date.now() - sourceStartTime;
      const c = a > duration ? 1 : a / duration;
      if (1 !== c) {
        const r = this._applyEasing(c);
        this._sourceMpIsSurface ? this._switchStartPos ? e.lerp(n, o, r) : t.lerp(i, s, r) : this._switchStartPos ? e.lerp(o, n, r) : t.lerp(s, i, r);
      } else {
        this._animation.isAnimating = false;
        this._animation.sourceStartTime = null;
      }
    }
    if (targetStartTime) {
      const r = Date.now() - targetStartTime;
      const c = r > duration ? 1 : r / duration;
      if (1 !== c) {
        const r = this._applyEasing(c);
        this._targetMpIsSurface ? this._switchStartPos ? t.lerp(i, s, r) : e.lerp(n, o, r) : this._switchStartPos ? t.lerp(s, i, r) : e.lerp(o, n, r);
      } else {
        this._animation.isAnimating = false;
        this._animation.targetStartTime = null;
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；返回 `Promise.resolve()`；调用 `Promise.resolve`、`new Pioneer.LineMesh`、`this._lineMesh.setColors`、`this._lineMesh.setWidths`、`this.setOpacity`。
   * 状态写入：_lineMesh。
   * 调用线索：Promise.resolve、new Pioneer.LineMesh、this._lineMesh.setColors、this._lineMesh.setWidths、this.setOpacity。
   */
  __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._lineMesh.setColors([this._color, this._color]);
    this._lineMesh.setWidths([this._width, this._width]);
    this.setOpacity(1);
    return Promise.resolve();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_color.a`；调用 `this._lineMesh.setColors`。
   * 状态写入：_color.a。
   * 调用线索：this._lineMesh.setColors。
   */
  setOpacity(t) {
    this._color.a = t;
    this._lineMesh.setColors([this._color, this._color]);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_depthTest`。
   * 状态写入：_depthTest。
   */
  setDepthTest(depthTest) {
    this._depthTest = depthTest;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_lineMesh。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void(e&&(e.visible=false))`；调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._calcStartPos`、`this._lineMesh.prepareForRender`、`this._updatePoints`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、this._calcStartPos、this._lineMesh.prepareForRender、this._updatePoints、this.getEntity等。
   */
  __prepareForRender(t) {
    const [e] = this.getThreeJsObjects();
    if (null === this._targetEntity) return void (e && (e.visible = false));
    e?.material && (e.material.depthTest = this._depthTest);
    this._calcStartPos(t);
    this._updatePoints(t);
    const i = this._switchStartPos ? this._targetEntity : this.getEntity();
    Pioneer.ThreeJsHelper.setPositionToEntity(e, i, t);
    this._lineMesh.prepareForRender(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_switchStartPos`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.magnitude`、`t.getEntity`、`t.getEntity().getPositionRelativeToEntity`。
   * 状态写入：_switchStartPos。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.magnitude、t.getEntity、t.getEntity().getPositionRelativeToEntity。
   */
  _calcStartPos(t) {
    const e = Pioneer.Vector3.pool.get();
    t.getEntity().getPositionRelativeToEntity(e, Pioneer.Vector3.Zero, this._targetEntity);
    const switchStartPos = e.magnitude() / this._distance < .001;
    this._switchStartPos !== switchStartPos && (this._switchStartPos = switchStartPos);
    Pioneer.Vector3.pool.release(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.copy`、`i.lerp`、`n.lerp`、`o.neg`。
   * 调用线索：Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、e.copy、i.lerp、n.lerp等。
   */
  _updatePoints(t) {
    if (null === this._targetEntity) return;
    const e = Pioneer.Vector3.pool.get();
    const i = Pioneer.Vector3.pool.get();
    const n = Pioneer.Vector3.pool.get();
    const o = Pioneer.Vector3.pool.get();
    e.copy(Pioneer.Vector3.Zero);
    o.sub(this._targetEntity.getCameraSpacePosition(t), this.getEntity().getCameraSpacePosition(t));
    this._switchStartPos && o.neg(o);
    const r = this._switchStartPos ? this._targetRelRadius : this._sourceRelRadius;
    const a = 1 - (this._switchStartPos ? this._sourceRelRadius : this._targetRelRadius);
    i.lerp(e, o, r);
    n.lerp(e, o, a);
    const l = (this._switchStartPos ? this._targetMpIsSurface : this._sourceMpIsSurface) ? i : e;
    const c = (this._switchStartPos ? this._sourceMpIsSurface : this._targetMpIsSurface) ? n : o;
    this._updateAnimation(l, c, e, i, o, n);
    const h = [l, c];
    this._lineMesh.setPositions(h);
    Pioneer.Vector3.pool.release(e);
    Pioneer.Vector3.pool.release(i);
    Pioneer.Vector3.pool.release(n);
    Pioneer.Vector3.pool.release(o);
  }
}
export { DistanceLineComponent };
