// Recovered from app.js:494121-501753.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 拖动映射为经纬变化；构建 yaw/pitch 轴坐标架，在球面局部系应用角度限制，靠近地面时降低灵敏度后转回参考系。 */

class OrbitController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._dragSensitivity = .01;
    this._dragSmoothness = .8;
    this._yawChangeSmoothedValue = 0;
    this._pitchChangeSmoothedValue = 0;
    this._yawAxisType = "none";
    this._yawAxisEntity = null;
    this._pitchAxisType = "none";
    this._pitchAxisEntity = null;
    this._yawAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._pitchAngleLimits = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
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
  getPitchAxisType() {
    return this._pitchAxisType;
  }
  setPitchAxisType(pitchAxisType) {
    if (this._pitchAxisType !== pitchAxisType) {
      if (null !== this._pitchAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType)) {
          this.removeDependentState(this._pitchAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._pitchAxisType) {
            this.removeDependentState(this._pitchAxisEntity.getName(), "position");
          }
        }
      }
      this._pitchAxisType = pitchAxisType;
      if (null !== this._pitchAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType)) {
          this.addDependentState(this._pitchAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._pitchAxisType) {
            this.addDependentState(this._pitchAxisEntity.getName(), "position");
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
  getPitchAxisEntity() {
    return this._pitchAxisEntity;
  }
  setPitchAxisEntity(pitchAxisEntity) {
    if (this._pitchAxisEntity !== pitchAxisEntity) {
      if (null !== this._pitchAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType)) {
          this.removeDependentState(this._pitchAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._pitchAxisType) {
            this.removeDependentState(this._pitchAxisEntity.getName(), "position");
          }
        }
      }
      this._pitchAxisEntity = pitchAxisEntity;
      if (null !== this._pitchAxisEntity) {
        if (["x-axis", "y-axis", "z-axis"].includes(this._pitchAxisType)) {
          this.addDependentState(this._pitchAxisEntity.getName(), "orientation");
        } else {
          if ("position" === this._pitchAxisType) {
            this.addDependentState(this._pitchAxisEntity.getName(), "position");
          }
        }
      }
    }
  }
  getYawAngleLimits() {
    return this._yawAngleLimits;
  }
  setYawAngleLimits(yawAngleLimits) {
    this._yawAngleLimits.copy(yawAngleLimits);
  }
  getPitchAngleLimits() {
    return this._pitchAngleLimits;
  }
  setPitchAngleLimits(pitchAngleLimits) {
    this._pitchAngleLimits.copy(pitchAngleLimits);
  }
  __update() {
    const parentEntity = this.getEntity().getParent();
    if (!parentEntity) return;
    if (this.getEntity().getOrientation().isNaN()) {
      this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    }
    if (this.getEntity().getPosition().isNaN()) {
      this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    }
    const input = this.getEntity().getScene().getEngine().getInput();
    let sensitivityScale = 1;
    if (input.isKeyPressed("x")) {
      sensitivityScale = .05;
    }
    if (input.isShiftPressed()) {
      sensitivityScale = 5;
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
        pitchChange = dragOffset.y * this._dragSensitivity * sensitivityScale;
        if (input.isKeyPressed("d")) {
          yawChange += this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("a")) {
          yawChange -= this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("e")) {
          pitchChange -= this._dragSensitivity * sensitivityScale;
        }
        if (input.isKeyPressed("q")) {
          pitchChange += this._dragSensitivity * sensitivityScale;
        }
      }
    }
    this._yawChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(yawChange, this._yawChangeSmoothedValue, this._dragSmoothness);
    this._pitchChangeSmoothedValue = PioneerPublicApi.MathUtils.lerp(pitchChange, this._pitchChangeSmoothedValue, this._dragSmoothness);
    if (Math.abs(this._yawChangeSmoothedValue) < 1e-4 * sensitivityScale) {
      this._yawChangeSmoothedValue = 0;
    }
    if (Math.abs(this._pitchChangeSmoothedValue) < 1e-4 * sensitivityScale) {
      this._pitchChangeSmoothedValue = 0;
    }
    const yawAxis = PioneerPublicApi.Vector3.pool.get();
    this._yawAxisEntity ??= this.getEntity().getParent();
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
    if (yawAxis.isNaN() || yawAxis.isZero()) {
      this.getEntity().getOrientation().getAxis(yawAxis, 2);
    }
    const pitchAxis = PioneerPublicApi.Vector3.pool.get();
    this._pitchAxisEntity ??= this.getEntity().getParent();
    if ("x-axis" === this._pitchAxisType && null !== this._pitchAxisEntity) {
      this._pitchAxisEntity.getOrientation().getAxis(pitchAxis, 0);
    } else {
      if ("y-axis" === this._pitchAxisType && null !== this._pitchAxisEntity) {
        this._pitchAxisEntity.getOrientation().getAxis(pitchAxis, 1);
      } else {
        if ("z-axis" === this._pitchAxisType && null !== this._pitchAxisEntity) {
          this._pitchAxisEntity.getOrientation().getAxis(pitchAxis, 2);
        } else {
          if ("position" === this._pitchAxisType && null !== this._pitchAxisEntity) {
            pitchAxis.normalize(this._pitchAxisEntity.getPosition());
          } else {
            this.getEntity().getOrientation().getAxis(pitchAxis, 0);
          }
        }
      }
    }
    if (pitchAxis.isNaN() || pitchAxis.isZero()) {
      this.getEntity().getOrientation().getAxis(pitchAxis, 0);
    }
    pitchAxis.setNormalTo(yawAxis, pitchAxis);
    const orbitFrame = PioneerPublicApi.Quaternion.pool.get();
    orbitFrame.setFromAxes(pitchAxis, void 0, yawAxis);
    PioneerPublicApi.Vector3.pool.release(pitchAxis);
    PioneerPublicApi.Vector3.pool.release(yawAxis);
    const positionInOrbitFrame = PioneerPublicApi.Vector3.pool.get();
    positionInOrbitFrame.copy(this.getEntity().getPosition());
    if (positionInOrbitFrame.isZero() || positionInOrbitFrame.isNaN()) {
      this.getEntity().getOrientation().getAxis(positionInOrbitFrame, 1);
      positionInOrbitFrame.setMagnitude(positionInOrbitFrame, -1e-5);
    }
    positionInOrbitFrame.rotateInverse(orbitFrame, positionInOrbitFrame);
    let altitudeSensitivity = 1;
    const groundComponent = parentEntity.getGroundComponent();
    if (groundComponent) {
      const groundPosition = PioneerPublicApi.Vector3.pool.get();
      const positionInGround = PioneerPublicApi.Vector3.pool.get();
      positionInGround.rotateInverse(parentEntity.getOrientation(), this.getEntity().getPosition());
      groundComponent.getGroundPosition(groundPosition, void 0, positionInGround);
      const groundRadius = groundPosition.magnitude();
      const altitude = positionInGround.distance(groundPosition);
      if (groundRadius > 0) {
        altitudeSensitivity = Math.min(altitude / groundRadius, 1);
      }
      PioneerPublicApi.Vector3.pool.release(groundPosition);
      PioneerPublicApi.Vector3.pool.release(positionInGround);
    }
    const latitudeLongitudeAltitude = PioneerPublicApi.LatLonAlt.pool.get();
    PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(latitudeLongitudeAltitude, positionInOrbitFrame, 0);
    latitudeLongitudeAltitude.lat += this._pitchChangeSmoothedValue * altitudeSensitivity;
    latitudeLongitudeAltitude.lon += this._yawChangeSmoothedValue * altitudeSensitivity;
    if (latitudeLongitudeAltitude.lat < 1e-4 - PioneerPublicApi.MathUtils.HalfPi) {
      latitudeLongitudeAltitude.lat = 1e-4 - PioneerPublicApi.MathUtils.HalfPi;
    }
    if (latitudeLongitudeAltitude.lat > PioneerPublicApi.MathUtils.HalfPi - 1e-4) {
      latitudeLongitudeAltitude.lat = PioneerPublicApi.MathUtils.HalfPi - 1e-4;
    }
    if (latitudeLongitudeAltitude.lat < this._pitchAngleLimits.min) {
      latitudeLongitudeAltitude.lat = this._pitchAngleLimits.min;
    }
    if (latitudeLongitudeAltitude.lat > this._pitchAngleLimits.max) {
      latitudeLongitudeAltitude.lat = this._pitchAngleLimits.max;
    }
    if (latitudeLongitudeAltitude.lon < this._yawAngleLimits.min) {
      latitudeLongitudeAltitude.lon = this._yawAngleLimits.min;
    }
    if (latitudeLongitudeAltitude.lon > this._yawAngleLimits.max) {
      latitudeLongitudeAltitude.lon = this._yawAngleLimits.max;
    }
    PioneerPublicApi.Geometry.getXYZFromLLAOnSphere(positionInOrbitFrame, latitudeLongitudeAltitude, 0);
    PioneerPublicApi.LatLonAlt.pool.release(latitudeLongitudeAltitude);
    positionInOrbitFrame.rotate(orbitFrame, positionInOrbitFrame);
    PioneerPublicApi.Quaternion.pool.release(orbitFrame);
    this.getEntity().setPosition(positionInOrbitFrame);
    PioneerPublicApi.Vector3.pool.release(positionInOrbitFrame);
  }
  _dragSensitivity;
  _dragSmoothness;
  _yawChangeSmoothedValue;
  _pitchChangeSmoothedValue;
  _yawAxisType;
  _yawAxisEntity;
  _pitchAxisType;
  _pitchAxisEntity;
  _yawAngleLimits;
  _pitchAngleLimits;
}
export { OrbitController };
