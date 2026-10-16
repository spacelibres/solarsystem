// 测距线在中心与表面端点之间做四次缓动；接近目标时切换局部原点以减小数值误差，同时交换端点半径与表面标志，临时向量在 LineMesh 取得端点后归还。
// Recovered from app.js:535372-539211.
import * as Pioneer from "../pioneer/index.js";
class DistanceLineComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  setSourceMeasurePoint(measurePoint) {
    const sourceMpIsSurface = "surface" === measurePoint;
    if (this._sourceMpIsSurface !== sourceMpIsSurface) {
      this._sourceMpIsSurface = sourceMpIsSurface;
      this._animation.isAnimating = true;
      this._animation.sourceStartTime = Date.now();
    }
  }
  setTargetMeasurePoint(measurePoint) {
    const targetMpIsSurface = "surface" === measurePoint;
    if (this._targetMpIsSurface !== targetMpIsSurface) {
      this._targetMpIsSurface = targetMpIsSurface;
      this._animation.isAnimating = true;
      this._animation.targetStartTime = Date.now();
    }
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
  _applyEasing(progress) {
    const doubledProgress = 2 * progress;
    return (doubledProgress <= 1 ? Math.pow(doubledProgress, 4) : 2 - Math.pow(2 - doubledProgress, 4)) / 2;
  }
  _updateAnimation(startPosition, endPosition, startCenter, startSurface, endCenter, endSurface) {
    if (!this._animation.isAnimating) return;
    const {
      sourceStartTime: sourceStartTime,
      targetStartTime: targetStartTime,
      duration: duration
    } = this._animation;
    if (sourceStartTime) {
      const elapsed = Date.now() - sourceStartTime;
      const progress = elapsed > duration ? 1 : elapsed / duration;
      if (1 !== progress) {
        const easedProgress = this._applyEasing(progress);
        if (this._sourceMpIsSurface) {
          if (this._switchStartPos) {
            endPosition.lerp(endCenter, endSurface, easedProgress);
          } else {
            startPosition.lerp(startCenter, startSurface, easedProgress);
          }
        } else {
          if (this._switchStartPos) {
            endPosition.lerp(endSurface, endCenter, easedProgress);
          } else {
            startPosition.lerp(startSurface, startCenter, easedProgress);
          }
        }
      } else {
        this._animation.isAnimating = false;
        this._animation.sourceStartTime = null;
      }
    }
    if (targetStartTime) {
      const elapsed = Date.now() - targetStartTime;
      const progress = elapsed > duration ? 1 : elapsed / duration;
      if (1 !== progress) {
        const easedProgress = this._applyEasing(progress);
        if (this._targetMpIsSurface) {
          if (this._switchStartPos) {
            startPosition.lerp(startCenter, startSurface, easedProgress);
          } else {
            endPosition.lerp(endCenter, endSurface, easedProgress);
          }
        } else {
          if (this._switchStartPos) {
            startPosition.lerp(startSurface, startCenter, easedProgress);
          } else {
            endPosition.lerp(endSurface, endCenter, easedProgress);
          }
        }
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
  setOpacity(opacity) {
    this._color.a = opacity;
    this._lineMesh.setColors([this._color, this._color]);
  }
  setDepthTest(depthTest) {
    this._depthTest = depthTest;
  }
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  __prepareForRender(camera) {
    const [object] = this.getThreeJsObjects();
    if (null === this._targetEntity) return void (object && (object.visible = false));
    if (object?.material) {
      object.material.depthTest = this._depthTest;
    }
    this._calcStartPos(camera);
    this._updatePoints(camera);
    const originEntity = this._switchStartPos ? this._targetEntity : this.getEntity();
    Pioneer.ThreeJsHelper.setPositionToEntity(object, originEntity, camera);
    this._lineMesh.prepareForRender(camera);
  }
  _calcStartPos(camera) {
    const cameraOffset = Pioneer.Vector3.pool.get();
    camera.getEntity().getPositionRelativeToEntity(cameraOffset, Pioneer.Vector3.Zero, this._targetEntity);
    const switchStartPos = cameraOffset.magnitude() / this._distance < .001;
    if (this._switchStartPos !== switchStartPos) {
      this._switchStartPos = switchStartPos;
    }
    Pioneer.Vector3.pool.release(cameraOffset);
  }
  _updatePoints(camera) {
    if (null === this._targetEntity) return;
    const startCenter = Pioneer.Vector3.pool.get();
    const startSurface = Pioneer.Vector3.pool.get();
    const endSurface = Pioneer.Vector3.pool.get();
    const endCenter = Pioneer.Vector3.pool.get();
    startCenter.copy(Pioneer.Vector3.Zero);
    endCenter.sub(this._targetEntity.getCameraSpacePosition(camera), this.getEntity().getCameraSpacePosition(camera));
    if (this._switchStartPos) {
      endCenter.neg(endCenter);
    }
    const startFraction = this._switchStartPos ? this._targetRelRadius : this._sourceRelRadius;
    const endFraction = 1 - (this._switchStartPos ? this._sourceRelRadius : this._targetRelRadius);
    startSurface.lerp(startCenter, endCenter, startFraction);
    endSurface.lerp(startCenter, endCenter, endFraction);
    const startPosition = (this._switchStartPos ? this._targetMpIsSurface : this._sourceMpIsSurface) ? startSurface : startCenter;
    const endPosition = (this._switchStartPos ? this._sourceMpIsSurface : this._targetMpIsSurface) ? endSurface : endCenter;
    this._updateAnimation(startPosition, endPosition, startCenter, startSurface, endCenter, endSurface);
    const positions = [startPosition, endPosition];
    this._lineMesh.setPositions(positions);
    Pioneer.Vector3.pool.release(startCenter);
    Pioneer.Vector3.pool.release(startSurface);
    Pioneer.Vector3.pool.release(endSurface);
    Pioneer.Vector3.pool.release(endCenter);
  }
}
export { DistanceLineComponent };
