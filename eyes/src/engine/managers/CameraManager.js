// Recovered from app.js:1257303-1267846.
/* 相机实体由管理器持有，视口与 CameraComponent 只创建一次。过渡先替换控制器，完成后恢复选择/缩放控制器；goToEntity 在 finally 释放过渡标记，取消异常沿用静默处理。距离沿用场景坐标单位，角半径为弧度；向量池仅用于同步缩放并在写回后归还。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class CameraManager extends EyesPublicApi.BaseManager {
  constructor(app, defaultScene) {
    super(app);
    this._viewport = null;
    this._defaultScene = defaultScene;
    this._cameraEntity = null;
    this._id = null;
    this._previousId = null;
    this._context = {
      id: ""
    };
    this._isTransitioning = false;
    this._defaultMaxDistance = 2e18;
    this._selectionCallback = null;
    this._dynEnvMap = null;
    this._isFreeFly = false;
    this._zoomSensitivity = {
      click: .3,
      hold: .1
    };
    this._fullLightColor = new Pioneer.Color(1, 1, 1, 1);
    this._shadowLightColor = new Pioneer.Color(.15, .15, .15, 1);
    this.bindFunctions(["zoomIn", "zoomOut", "addDynamicEnvMap", "getShadowLightColor", "getFullLightColor"]);
    window.addEventListener("keydown", keyboardEvent => {
      "k" === keyboardEvent.key && this.toggleFreeFly();
    });
  }
  createViewportAndCamera(defaultScene) {
    defaultScene && (this._defaultScene = defaultScene);
    null === this.pioneer.getViewport("main-viewport") && (this._viewport = this.pioneer.addViewport("main-viewport"), this._viewport.getDiv().style.width = "100%", this._viewport.getDiv().style.height = "100%", this._viewport.getDiv().style.left = "0", this._viewport.getDiv().style.top = "0");
    null === this._defaultScene.getEntity("camera") && (this._cameraEntity = this._defaultScene.addEntity("camera"));
    this._cameraEntity.setOrientation(Pioneer.Quaternion.Identity);
    let cameraComponent = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    null === cameraComponent && (cameraComponent = this._cameraEntity.addComponent(Pioneer.CameraComponent));
    this._viewport.setCamera(cameraComponent);
    this._cameraLight = this._cameraEntity.getComponent(Pioneer.LightSourceComponent);
    null === this._cameraLight && (this._cameraLight = this._cameraEntity.addComponent(Pioneer.LightSourceComponent), this._cameraLight.setEnabled(false), this.toggleCameraLight(true, this._shadowLightColor));
    null === this._dynEnvMap && (this._dynEnvMap = this._cameraEntity.addComponent(Pioneer.DynamicEnvironmentMapComponent));
  }
  getContext() {
    return this._context;
  }
  getIsTransitioning() {
    return this._isTransitioning;
  }
  setIsTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }
  waitForTransitionComplete() {
    return new Promise(resolveTransition => {
      let transitionPoll = setInterval(() => {
        this._isTransitioning || (clearInterval(transitionPoll), transitionPoll = null, resolveTransition(true));
      }, 1e3);
    });
  }
  setContext(context) {
    this._context = context;
    this._previousId = this._id;
    this._id = this._context.id;
    const customEvent = new CustomEvent("cameraupdate", {
      detail: {
        target: this._id,
        context: this._context
      }
    });
    window.dispatchEvent(customEvent);
  }
  getCurrentId() {
    return this._id;
  }
  getShadowLightColor() {
    return this._shadowLightColor;
  }
  getFullLightColor() {
    return this._fullLightColor;
  }
  get defaultScene() {
    return this._defaultScene;
  }
  get cameraEntity() {
    return this._cameraEntity;
  }
  get cameraLight() {
    return this._cameraLight;
  }
  get dynamicEnvMap() {
    return this._dynEnvMap;
  }
  toggleCameraLight(enabled, lightColor) {
    null !== this._cameraLight && (this._cameraLight.setEnabled(enabled), void 0 !== lightColor && this._cameraLight.setColor(lightColor));
  }
  updateLighting(lightingMode) {
    "flood" === lightingMode ? this.toggleCameraLight(true, this._fullLightColor) : "natural" === lightingMode ? this.toggleCameraLight(false) : "shadow" === lightingMode && this.toggleCameraLight(true, this._shadowLightColor);
  }
  getSelectionCallback() {
    return this._selectionCallback;
  }
  setSelectionCallback(selectionCallback) {
    "function" == typeof selectionCallback && (this._selectionCallback = selectionCallback);
  }
  getIsFreeFly() {
    return this._isFreeFly;
  }
  setUpFreeFlyCamera() {
    this._cameraEntity.clearControllers();
    this._cameraEntity.addController(Pioneer.FreeFlyController);
    this._cameraEntity.addController(Pioneer.LookController);
    this._cameraEntity.addController(Pioneer.RollController);
    this._cameraEntity.addController(Pioneer.FixedToParentController);
  }
  async resetFreeFlyCamera() {
    switch (this._context.context) {
      case EyesPublicApi.CameraScripts.CONTEXT.CELESTIAL_OBJECT:
        await this.app.cameraScripts.goToCelestialObject(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.SPACECRAFT:
        await this.app.cameraScripts.goToSpacecraft(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.INSTRUMENT:
        await this.app.cameraScripts.goToInstrument(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.ALIGN_SPACECRAFT:
        await this.app.cameraScripts.alignSpacecraftPlanet(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOCATION:
        await this.app.cameraScripts.showLocation(this._id, "", "", this._context.options);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.SYSTEM:
        await this.app.cameraScripts.goToSystem(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOOK_AT:
        await this.app.cameraScripts.spacecraftLookAtTarget(this._id, this._context.target);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOCKED_ON:
        await this.app.cameraScripts.spacecraftLockedOnTarget(this._id, this._context.target);
        break;
      default:
        console.error(`resetFreeFlyCamera: Unsupported camera context - ${this._context.context}`);
    }
  }
  enableFreeFly() {
    this._isFreeFly = true;
    this.setUpFreeFlyCamera();
    const toastComponent = this.app.getComponent("toast");
    toastComponent?.setContent("Now in free fly camera mode. Press K again to exit this mode.");
    toastComponent?.show();
  }
  disableFreeFly() {
    this._isFreeFly = false;
    this.resetFreeFlyCamera();
    this.app.getComponent("toast")?.hide();
  }
  async toggleFreeFly() {
    if (this._app.getManager("cameraFollow").isEnabled) {
      this._app.getManager("cameraFollow").setEnabled(false, {
        resetLimits: false,
        removeQueries: ["followId"]
      });
      await this.waitForTransitionComplete();
      return void this.enableFreeFly();
    }
    this._isFreeFly ? this.disableFreeFly() : this.enableFreeFly();
  }
  async goToEntity(id, {
    camera: camera,
    scene: scene,
    destination: destination,
    distance: distance,
    cinematic = false,
    minRadius: minimumRadius = .001,
    maxRadius: maximumRadius = this._defaultMaxDistance,
    duration: transitionDuration = .75,
    destinationUp: destinationUp,
    zoom: enableZoom = true,
    select: enableSelection = true,
    useSpheroidRadiusForDistance = false,
    roll: enableRoll = false,
    keyframes: keyframes,
    transitionFunction: transitionFunction
  } = {}) {
    const cameraEntity = camera || this._cameraEntity;
    const targetScene = scene || this._defaultScene;
    if (this._id = id, await targetScene.waitTillEntitiesInPlace([id]), this._isFreeFly && (await this.toggleFreeFly()), this._isTransitioning = true, void 0 !== destination) {
      const vector3 = new Pioneer.Vector3();
      vector3.sub(cameraEntity.getPosition(), destination);
      const cameraParent = cameraEntity.getParent();
      if (null !== cameraParent) {
        const cameraParentName = cameraParent.getName();
        if (!isNaN(vector3.magnitude())) {
          const relativeTravelDistance = Pioneer.MathUtils.clamp01(vector3.magnitude() / cameraEntity.getPosition().magnitude());
          transitionDuration = Math.max(transitionDuration / 5, transitionDuration * relativeTravelDistance);
        }
        if (!isNaN(vector3.magnitude()) && vector3.magnitude() <= .001 && id === cameraParentName) return void (this._isTransitioning = false);
      }
    }
    try {
      if (void 0 !== keyframes) {
        cameraEntity.clearControllers();
        const keyframeController = cameraEntity.addController(Pioneer.OrbitKeyframeController);
        if (keyframes.position) for (let keyframeIndex = 0; keyframeIndex < keyframes.position.length; keyframeIndex++) {
          const positionKeyframe = keyframes.position[keyframeIndex];
          keyframeController.setPositionKeyframe(positionKeyframe.frame, positionKeyframe.position, positionKeyframe.relativeTo);
        }
        if (keyframes.up) for (let keyframeIndex = 0; keyframeIndex < keyframes.up.length; keyframeIndex++) {
          const upKeyframe = keyframes.up[keyframeIndex];
          keyframeController.setUpKeyframe(upKeyframe.frame, upKeyframe.up);
        }
        if (keyframes.focus) for (let keyframeIndex = 0; keyframeIndex < keyframes.focus.length; keyframeIndex++) {
          const focusKeyframe = keyframes.focus[keyframeIndex];
          keyframeController.setFocusKeyframe(focusKeyframe.frame, focusKeyframe.name);
        }
        await keyframeController.getEndPromise();
        cameraEntity.clearControllers();
      }
      if (await SolarSystemSceneExports.Cameras.goToEntity(cameraEntity, targetScene.getEntity(id), {
        destination: destination,
        distance: distance,
        up: false,
        duration: transitionDuration,
        destinationUp: destinationUp,
        zoom: enableZoom,
        transitionFunction: transitionFunction
      }), enableSelection) {
        const selectionController = cameraEntity.addController(Pioneer.SelectController);
        null !== this._selectionCallback && selectionController.setCallback(this._selectionCallback);
      }
      const zoomController = cameraEntity.getController(Pioneer.ZoomController);
      if (zoomController && zoomController instanceof Pioneer.ZoomController && zoomController.setDistanceClamp(new Pioneer.Interval(minimumRadius, maximumRadius)), enableRoll) {
        cameraEntity.getController(Pioneer.RollController) instanceof Pioneer.RollController || cameraEntity.addController(Pioneer.RollController);
      }
      if (cinematic) {
        const alignController = cameraEntity.getController(Pioneer.AlignController);
        const spinController = cameraEntity.addController(Pioneer.SpinController, "", alignController);
        spinController instanceof Pioneer.SpinController && (spinController.setAxis(Pioneer.Vector3.ZAxis, true), spinController.setRate(.01), spinController.setUsingRealTime(true), spinController.setRotatingPosition(true));
        const tapController = cameraEntity.addController(Pioneer.TapController);
        tapController instanceof Pioneer.TapController && tapController.setTapCallback(() => {
          cameraEntity.removeController(spinController);
          cameraEntity.removeController(tapController);
        });
      }
    } catch (transitionError) {
      transitionError instanceof Pioneer.CanceledError || console.error(transitionError);
    } finally {
      this._isTransitioning = false;
    }
  }
  async followTheEntity(targetId, focusId, transitionParentId, transitionDuration) {
    const targetEntity = this._defaultScene.getEntity(targetId);
    const focusEntity = this._defaultScene.getEntity(focusId);
    this.cameraEntity.clearControllers();
    const vector3 = new Pioneer.Vector3();
    targetEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, focusEntity);
    const paddedTargetRadius = 1.25 * targetEntity.getExtentsRadius();
    const targetFocusDistance = vector3.magnitude();
    const targetAngularRadius = Math.atan(paddedTargetRadius / targetFocusDistance);
    const cameraOffset = 5 * targetEntity.getExtentsRadius();
    const cameraFocusDistance = targetFocusDistance + cameraOffset;
    const cameraTargetOffset = Math.tan(targetAngularRadius) * cameraFocusDistance;
    vector3.normalize(vector3);
    const upDirection = new Pioneer.Vector3(0, 0, 1);
    const targetParent = targetEntity.getParent();
    if (targetParent) if (targetParent.getOrientation().getAxis(upDirection, 2), targetParent.getName() === focusId) {
      const quaternion = new Pioneer.Quaternion();
      const dynamoController = this.pioneer.getScene("main").getEntity(focusId).getController(Pioneer.DynamoController);
      dynamoController && (dynamoController.getOrbitOrientation(quaternion, this.pioneer.getTime()), quaternion.getAxis(upDirection, 2));
      upDirection.isNaN() && upDirection.copy(new Pioneer.Vector3(0, 0, 1));
    } else targetParent.getOrientation().getAxis(upDirection, 2);
    upDirection.normalize(upDirection);
    vector3.magnitude() < 1e-4 && (targetEntity.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    upDirection.mult(upDirection, cameraTargetOffset);
    vector3.mult(vector3, cameraOffset);
    vector3.add(vector3, upDirection);
    upDirection.normalize(upDirection);
    const fixedController = this.cameraEntity.addController(Pioneer.FixedController);
    fixedController.setPosition(vector3);
    const forwardDirection = new Pioneer.Vector3();
    const orthogonalUp = new Pioneer.Vector3();
    forwardDirection.neg(vector3);
    forwardDirection.normalize(forwardDirection);
    orthogonalUp.setNormalTo(forwardDirection, upDirection);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, forwardDirection, orthogonalUp);
    fixedController.setOrientation(quaternion);
    SolarSystemSceneExports.Cameras.focusOnEntity(this.cameraEntity, focusEntity, {
      up: false
    });
    const transitionController = this.cameraEntity.addController(Pioneer.TransitionController);
    transitionController.setTransitionTime(transitionDuration);
    transitionController.setParent(transitionParentId);
    const {
      _easeOutExpoTransition: _easeOutExpoTransition
    } = this.app.cameraScripts;
    _easeOutExpoTransition && transitionController.setTransitionFunction(_easeOutExpoTransition);
    await transitionController.getEndPromise();
    this.cameraEntity.clearControllers();
    this.cameraEntity.addController(Pioneer.OrbitController).setDragSensitivity(5e-4);
    this.cameraEntity.addController(Pioneer.FixedToParentController);
    this.cameraEntity.addController(Pioneer.RollController);
    const maximumRadiusMultiplier = 1e3;
    const targetRadius = targetEntity.getExtentsRadius();
    const maximumZoomDistance = Math.max(targetEntity.getExtentsRadius() * maximumRadiusMultiplier, focusEntity.getExtentsRadius() * maximumRadiusMultiplier, targetRadius * maximumRadiusMultiplier);
    const interval = new Pioneer.Interval(targetRadius, maximumZoomDistance);
    this.cameraEntity.addController(Pioneer.ZoomController).setDistanceClamp(interval);
    const selectionController = this.cameraEntity.addController(Pioneer.SelectController);
    null !== this._selectionCallback && selectionController.setCallback(this._selectionCallback);
    SolarSystemSceneExports.Cameras.focusOnEntity(this.cameraEntity, focusEntity, {
      up: false
    });
  }
  async goToBetweenPos(focusEntity, {
    duration: duration,
    destination: destination,
    destinationUp: destinationUp,
    transitionFunction: transitionFunction,
    zoomInterval: zoomInterval
  }) {
    const cameraEntity = this._cameraEntity;
    cameraEntity.clearControllers();
    const fixedController = cameraEntity.addController(Pioneer.FixedController);
    fixedController.setPosition(destination);
    const vector3 = new Pioneer.Vector3();
    const orthogonalUp = new Pioneer.Vector3();
    vector3.neg(destination);
    vector3.normalize(vector3);
    orthogonalUp.setNormalTo(vector3, destinationUp);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, vector3, orthogonalUp);
    fixedController.setOrientation(quaternion);
    SolarSystemSceneExports.Cameras.focusOnEntity(cameraEntity, focusEntity, {
      up: false,
      orbiter: false
    });
    const transitionController = cameraEntity.addController(Pioneer.TransitionController);
    transitionController.setTransitionTime(duration);
    transitionController.setParent(focusEntity.getName());
    transitionFunction && transitionController.setTransitionFunction(transitionFunction);
    await transitionController.getEndPromise();
    cameraEntity.clearControllers();
    const selectionController = cameraEntity.addController(Pioneer.SelectController);
    null !== this._selectionCallback && selectionController.setCallback(this._selectionCallback);
    cameraEntity.addController(Pioneer.OrbitController);
    cameraEntity.addController(Pioneer.RollController);
    const zoomController = cameraEntity.addController(Pioneer.ZoomController);
    zoomInterval && zoomController.setDistanceClamp(zoomInterval);
    SolarSystemSceneExports.Cameras.focusOnEntity(cameraEntity, focusEntity, {
      up: false,
      orbiter: false
    });
  }
  zoom(zoomMultiplier, cameraEntity = this._cameraEntity) {
    let currentDistance = cameraEntity.getPosition().magnitude();
    Number.isNaN(currentDistance) && (currentDistance = 1);
    currentDistance *= zoomMultiplier;
    const cameraPosition = Pioneer.Vector3.pool.get();
    cameraPosition.normalize(cameraEntity.getPosition());
    cameraPosition.mult(cameraPosition, currentDistance);
    cameraEntity.setPosition(cameraPosition);
    Pioneer.Vector3.pool.release(cameraPosition);
  }
  zoomIn(isHeld = false) {
    let zoomMultiplier = 1;
    const zoomSensitivity = isHeld ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    zoomMultiplier /= Math.pow(2, zoomSensitivity);
    this.zoom(zoomMultiplier);
  }
  zoomOut(isHeld = false) {
    let zoomMultiplier = 1;
    const zoomSensitivity = isHeld ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    zoomMultiplier *= Math.pow(2, zoomSensitivity);
    this.zoom(zoomMultiplier);
  }
  get defaultMaxDistance() {
    return this._defaultMaxDistance;
  }
  set defaultMaxDistance(defaultMaxDistance) {
    this._defaultMaxDistance = defaultMaxDistance;
  }
  addDynamicEnvMap(entity) {
    if (!this.dynamicEnvMap) return;
    const modelComponent = entity.getComponent(Pioneer.ModelComponent);
    null !== modelComponent && modelComponent.setDynamicEnvironmentMapComponent(this.dynamicEnvMap);
  }
}
export { CameraManager };
