// Recovered from app.js:488242-492628.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 只有活动视口相机消费拖动；平滑 yaw/pitch 后先校正 up，再绕局部 pitch 轴及指定 yaw 轴旋转，保持位置。 */

class LookController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._dragSensitivity = .01;
    this._dragSmoothness = .8;
    this._yawAngleSmoothedValue = 0;
    this._pitchAngleSmoothedValue = 0;
    this._yawAxisType = "none";
    this._yawAxisEntity = null;
    this.addModifiedState("orientation");
  }
  getDragSensitivity() {
    return this._dragSensitivity;
  }
  setDragSensitivity(dragSensitivity) {
    this._dragSensitivity = dragSensitivity;
  }
  getDragSmoothness() {
    return this._dragSmoothness;
  }
  setDragSmoothness(dragSmoothness) {
    this._dragSmoothness = dragSmoothness;
  }
  getYawAxisType() {
    return this._yawAxisType;
  }
  setYawAxisType(yawAxisType) {
    if (this._yawAxisType !== yawAxisType) {
      if (null !== this._yawAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType)) {
          this.removeDependentState(this._yawAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._yawAxisType) {
            this.removeDependentState(this._yawAxisEntity.getName(), "position");
          }
        }
      }
      this._yawAxisType = yawAxisType;
      if (null !== this._yawAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType)) {
          this.addDependentState(this._yawAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._yawAxisType) {
            this.addDependentState(this._yawAxisEntity.getName(), "position");
          }
        }
      }
    }
  }
  getYawAxisEntity() {
    return this._yawAxisEntity;
  }
  setYawAxisEntity(yawAxisEntity) {
    if (this._yawAxisEntity !== yawAxisEntity) {
      if (null !== this._yawAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType)) {
          this.removeDependentState(this._yawAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._yawAxisType) {
            this.removeDependentState(this._yawAxisEntity.getName(), "position");
          }
        }
      }
      this._yawAxisEntity = yawAxisEntity;
      if (null !== this._yawAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType)) {
          this.addDependentState(this._yawAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._yawAxisType) {
            this.addDependentState(this._yawAxisEntity.getName(), "position");
          }
        }
      }
    }
  }
  __update() {
    if (null === this._yawAxisEntity) {
      this._yawAxisEntity = this.getEntity().getParent();
      if (null !== this._yawAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._yawAxisType)) {
          this.addDependentState(this._yawAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._yawAxisType) {
            this.addDependentState(this._yawAxisEntity.getName(), "position");
          }
        }
      }
    }
    if (this.getEntity().getOrientation().isNaN()) {
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    }
    const input = this.getEntity().getScene().getEngine().getInput();
    let sensitivityScale = 1;
    if (input.isKeyPressed("x")) {
      sensitivityScale = .05;
    }
    const camera = this.getEntity().getComponent(PioneerPublicApi.CameraComponent);
    if (null !== camera) {
      sensitivityScale *= Math.min(1, camera.getFieldOfView());
    }
    let yawChange = 0;
    let pitchChange = 0;
    const viewport = input.getActiveViewport();
    if (null !== viewport) {
      const activeCamera = viewport.getCamera();
      if (null !== activeCamera && activeCamera.getEntity() === this.getEntity()) {
        const dragOffset = input.getDraggedOffset();
        yawChange = -dragOffset.x * this._dragSensitivity * sensitivityScale;
        pitchChange = -dragOffset.y * this._dragSensitivity * sensitivityScale;
      }
    }
    this._yawAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(yawChange, this._yawAngleSmoothedValue, this._dragSmoothness);
    this._pitchAngleSmoothedValue = PioneerPublicApi.MathUtils.lerp(pitchChange, this._pitchAngleSmoothedValue, this._dragSmoothness);
    if (Math.abs(this._yawAngleSmoothedValue) < 1e-4 * sensitivityScale) {
      this._yawAngleSmoothedValue = 0;
    }
    if (Math.abs(this._pitchAngleSmoothedValue) < 1e-4 * sensitivityScale) {
      this._pitchAngleSmoothedValue = 0;
    }
    const yawAxis = PioneerPublicApi.Vector3.pool.get();
    if ("x-axis" === this._yawAxisType && null !== this._yawAxisEntity) {
      this._yawAxisEntity.getOrientation().getAxis(yawAxis, 0);
    } else {
      if ("y-axis" === this._yawAxisType && null !== this._yawAxisEntity) {
        this._yawAxisEntity.getOrientation().getAxis(yawAxis, 1);
      } else {
        if ("z-axis" === this._yawAxisType && null !== this._yawAxisEntity) {
          this._yawAxisEntity.getOrientation().getAxis(yawAxis, 2);
        } else {
          if ("position" === this._yawAxisType && null !== this._yawAxisEntity) {
            yawAxis.normalize(this._yawAxisEntity.getPosition());
          } else {
            this.getEntity().getOrientation().getAxis(yawAxis, 2);
          }
        }
      }
    }
    if (yawAxis.isNaN()) {
      this.getEntity().getOrientation().getAxis(yawAxis, 2);
    }
    const orientation = PioneerPublicApi.Quaternion.pool.get();
    orientation.copy(this.getEntity().getOrientation());
    const rotation = PioneerPublicApi.Quaternion.pool.get();
    const currentUp = PioneerPublicApi.Vector3.pool.get();
    const forwardDirection = PioneerPublicApi.Vector3.pool.get();
    this.getEntity().getOrientation().getAxis(forwardDirection, 1);
    this.getEntity().getOrientation().getAxis(currentUp, 2);
    const upAlignmentAngle = currentUp.angleAroundAxis(yawAxis, forwardDirection);
    rotation.setFromAxisAngle(forwardDirection, upAlignmentAngle);
    rotation.normalize(rotation);
    orientation.mult(rotation, orientation);
    PioneerPublicApi.Vector3.pool.release(currentUp);
    PioneerPublicApi.Vector3.pool.release(forwardDirection);
    const pitchAxis = PioneerPublicApi.Vector3.pool.get();
    orientation.getAxis(pitchAxis, 0);
    rotation.setFromAxisAngle(pitchAxis, this._pitchAngleSmoothedValue);
    orientation.mult(rotation, orientation);
    PioneerPublicApi.Vector3.pool.release(pitchAxis);
    rotation.setFromAxisAngle(yawAxis, this._yawAngleSmoothedValue);
    orientation.mult(rotation, orientation);
    PioneerPublicApi.Vector3.pool.release(yawAxis);
    PioneerPublicApi.Quaternion.pool.release(rotation);
    this.getEntity().setOrientation(orientation);
    PioneerPublicApi.Quaternion.pool.release(orientation);
  }
  _dragSensitivity;
  _dragSmoothness;
  _yawAngleSmoothedValue;
  _pitchAngleSmoothedValue;
  _yawAxisType;
  _yawAxisEntity;
}
export { LookController };
