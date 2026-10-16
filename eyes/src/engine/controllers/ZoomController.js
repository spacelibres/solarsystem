// Recovered from app.js:533214-535371.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 乘法缩放平滑后作用于离地高度；父姿态用于地面局部转换，距离限制到达边界时重置平滑倍率。 */
class ZoomController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._zoomSensitivity = .05;
    this._zoomSmoothness = .8;
    this._zoomSmoothedValue = 1;
    this._distanceClamp = new PioneerPublicApi.Interval(.001, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
  }
  getZoomSensitivity() {
    return this._zoomSensitivity;
  }
  setZoomSensitivity(zoomSensitivity) {
    this._zoomSensitivity = zoomSensitivity;
  }
  getZoomSmoothness() {
    return this._zoomSmoothness;
  }
  setZoomSmoothness(zoomSmoothness) {
    this._zoomSmoothness = zoomSmoothness;
  }
  getDistanceClamp() {
    return this._distanceClamp;
  }
  setDistanceClamp(distanceClamp) {
    this._distanceClamp.copy(distanceClamp);
  }
  __update() {
    const parentEntity = this.getEntity().getParent();
    if (!parentEntity) return;
    const input = this.getEntity().getScene().getEngine().getInput();
    let zoomFactor = 1;
    const viewport = input.getActiveViewport();
    if (null !== viewport) {
      const activeCamera = viewport.getCamera();
      if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
        let sensitivityScale = 1;
        if (input.isKeyPressed("x")) {
          sensitivityScale = .05;
        }
        if (input.isShiftPressed()) {
          sensitivityScale = 5;
        }
        const zoomOffset = input.getZoomedOffset();
        if (0 !== zoomOffset) {
          zoomFactor *= 2 ** (zoomOffset * this._zoomSensitivity * sensitivityScale);
        }
        if (input.isKeyPressed("w")) {
          zoomFactor /= 2 ** (this._zoomSensitivity * sensitivityScale);
        }
        if (input.isKeyPressed("s")) {
          zoomFactor *= 2 ** (this._zoomSensitivity * sensitivityScale);
        }
      }
    }
    this._zoomSmoothedValue = PioneerPublicApi.MathUtils.clamp(PioneerPublicApi.MathUtils.lerp(zoomFactor, this._zoomSmoothedValue, this._zoomSmoothness), .8, 1.25);
    if (Math.abs(1 - this._zoomSmoothedValue) < 1e-7) {
      this._zoomSmoothedValue = 1;
    }
    const positionInParentFrame = PioneerPublicApi.Vector3.pool.get();
    positionInParentFrame.rotateInverse(parentEntity.getOrientation(), this.getEntity().getPosition());
    let groundRadius = 0;
    const groundComponent = parentEntity.getGroundComponent();
    if (groundComponent) {
      const groundPosition = PioneerPublicApi.Vector3.pool.get();
      groundComponent.getGroundPosition(groundPosition, void 0, positionInParentFrame);
      groundRadius = groundPosition.magnitude();
      PioneerPublicApi.Vector3.pool.release(groundPosition);
    }
    let altitude = Math.max(positionInParentFrame.magnitude() - groundRadius, 0);
    if (Number.isNaN(altitude)) {
      altitude = 1;
    }
    altitude *= this._zoomSmoothedValue;
    if ((0 === altitude || 0 === positionInParentFrame.magnitude()) && this._zoomSmoothedValue > 1) {
      if (0 === positionInParentFrame.magnitude()) {
        this.getEntity().getOrientation().getAxis(positionInParentFrame, 1);
        positionInParentFrame.neg(positionInParentFrame);
        positionInParentFrame.rotateInverse(parentEntity.getOrientation(), positionInParentFrame);
      }
      altitude = 1e-5;
    }
    if (altitude < this._distanceClamp.min) {
      altitude = this._distanceClamp.min;
      this._zoomSmoothedValue = 1;
    }
    if (altitude > this._distanceClamp.max) {
      altitude = this._distanceClamp.max;
      this._zoomSmoothedValue = 1;
    }
    positionInParentFrame.setMagnitude(positionInParentFrame, groundRadius + altitude);
    positionInParentFrame.rotate(parentEntity.getOrientation(), positionInParentFrame);
    this.getEntity().setPosition(positionInParentFrame);
    PioneerPublicApi.Vector3.pool.release(positionInParentFrame);
  }
  _zoomSensitivity;
  _zoomSmoothness;
  _zoomSmoothedValue;
  _distanceClamp;
}
export { ZoomController };
