// Recovered from app.js:535372-539211.
import * as Pioneer from "../pioneer/index.js";
class DistanceLineComponent extends Pioneer.BaseComponent {
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
  setTargetEntity(targetEntity) {
    this._targetEntity = targetEntity;
  }
  setSourceMeasurePoint(t) {
    const sourceMpIsSurface = "surface" === t;
    this._sourceMpIsSurface !== sourceMpIsSurface && (this._sourceMpIsSurface = sourceMpIsSurface, this._animation.isAnimating = true, this._animation.sourceStartTime = Date.now());
  }
  setTargetMeasurePoint(t) {
    const targetMpIsSurface = "surface" === t;
    this._targetMpIsSurface !== targetMpIsSurface && (this._targetMpIsSurface = targetMpIsSurface, this._animation.isAnimating = true, this._animation.targetStartTime = Date.now());
  }
  setColor(color) {
    this._color = color;
  }
  setWidth(width) {
    this._width = width;
  }
  setDistanceProps({
    distance: distance,
    sourceRadius: sourceRadius,
    targetRadius: targetRadius
  }) {
    this._distance = distance;
    this._sourceRelRadius = Math.max(Math.min(sourceRadius / this._distance, 1), 0);
    this._targetRelRadius = Math.max(Math.min(targetRadius / this._distance, 1), 0);
  }
  _applyEasing(t) {
    const e = 2 * t;
    return (e <= 1 ? Math.pow(e, 4) : 2 - Math.pow(2 - e, 4)) / 2;
  }
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
  __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._lineMesh.setColors([this._color, this._color]);
    this._lineMesh.setWidths([this._width, this._width]);
    this.setOpacity(1);
    return Promise.resolve();
  }
  setOpacity(t) {
    this._color.a = t;
    this._lineMesh.setColors([this._color, this._color]);
  }
  setDepthTest(depthTest) {
    this._depthTest = depthTest;
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
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
  _calcStartPos(t) {
    const e = Pioneer.Vector3.pool.get();
    t.getEntity().getPositionRelativeToEntity(e, Pioneer.Vector3.Zero, this._targetEntity);
    const switchStartPos = e.magnitude() / this._distance < .001;
    this._switchStartPos !== switchStartPos && (this._switchStartPos = switchStartPos);
    Pioneer.Vector3.pool.release(e);
  }
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
