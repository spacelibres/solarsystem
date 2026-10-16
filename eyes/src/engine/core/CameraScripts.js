// Recovered from app.js:1267847-1285874.
/* 相机脚本根据场景实体、轨道平面和视场计算目的位置，再串行提交 camera 管理器过渡。upDirection、sideDirection 与各轴索引分别表达朝向约束，保留全部叉积/旋转顺序和距离倍率。系统视图可沿旧相机方向过渡，再进入最终拟合距离；比较视图的左右相机并行等待。缓动函数从池借用位置/朝向并在提交后归还，原四次方插值公式与回调时机完全保留。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class CameraScripts extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._cameraManager = null;
    this._customSystemDistances = {
      mercury: 425648,
      venus: 862136,
      earth: 1040264,
      mars: 8e4,
      jupiter: 7157638,
      saturn: 4869142,
      uranus: 1886367,
      neptune: 2407045,
      "134340_pluto": 122231,
      "136199_eris": 180309,
      "1_ceres": 87225,
      "136108_haumea": 126609,
      "136472_makemake": 118584
    };
    this._onCameraTransition = null;
    this._easeInOutExpoTransition = this._easeInOutExpoTransition.bind(this);
    this._easeOutExpoTransition = this._easeOutExpoTransition.bind(this);
  }
  setCameraManager(cameraManager) {
    this._cameraManager = cameraManager;
  }
  get scene() {
    return this._scene;
  }
  set scene(scene) {
    this._scene = scene;
  }
  get cameraEntity() {
    return this._cameraEntity;
  }
  set cameraEntity(cameraEntity) {
    this._cameraEntity = cameraEntity;
  }
  getNormalToEcliptic(outputNormal, planeEntityId) {
    const quaternion = new Pioneer.Quaternion();
    this._cameraManager.pioneer.getScene("main").getEntity(planeEntityId).getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, this._cameraManager.pioneer.getTime());
    quaternion.getAxis(outputNormal, 2);
  }
  isBarycenter(entityId) {
    return !!entityId.includes("_barycenter");
  }
  removeBarycenter(entityId) {
    return this.isBarycenter(entityId) ? entityId.replace("_barycenter", "") : entityId;
  }
  async lookAtSurfaceLatLon(entityId, latitudeDegrees = 0, longitudeDegrees = 0, {
    scene: scene,
    cinematic = false,
    duration = 1.5,
    distance: distanceMultiplier = 1.3
  } = {}) {
    this._cameraManager.setContext({
      id: "id",
      context: CameraScripts.CONTEXT.LOOK_SURFACE_LAT_LON
    });
    void 0 === scene && (scene = this._scene);
    const targetEntity = scene.getEntity(entityId);
    const spheroidComponent = targetEntity.getComponent(Pioneer.SpheroidComponent);
    if (null === spheroidComponent) return;
    const vector3 = new Pioneer.Vector3();
    const latLonAlt = new Pioneer.LatLonAlt();
    latLonAlt.lat = Pioneer.MathUtils.degToRad(latitudeDegrees);
    latLonAlt.lon = Pioneer.MathUtils.degToRad(longitudeDegrees);
    latLonAlt.alt = 0;
    spheroidComponent.xyzFromLLA(vector3, latLonAlt);
    const upDirection = new Pioneer.Vector3();
    targetEntity.getOrientation().getAxis(upDirection, 2);
    vector3.normalize(vector3);
    vector3.rotate(targetEntity.getOrientation(), vector3);
    let targetRadius = targetEntity.getOcclusionRadius();
    null !== spheroidComponent && (targetRadius = targetEntity.getComponent(Pioneer.SpheroidComponent).getEquatorialRadius());
    const minimumRadius = 1.2 * targetRadius;
    const maximumRadius = 15 * targetRadius;
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, vector3, upDirection);
    let fittedDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, targetEntity, [targetEntity]);
    fittedDistance *= distanceMultiplier;
    vector3.mult(vector3, fittedDistance);
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration / 2,
      maxRadius: maximumRadius
    });
  }
  async goToCelestialObject(entityId, {
    scene: scene,
    starId = "sun",
    cinematic = true,
    duration = 1.5,
    distance: distanceMultiplier = 1.3,
    verticalOffset = 0,
    horizontalOffset = 0
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.CELESTIAL_OBJECT
    });
    void 0 === scene && (scene = this._scene);
    const targetEntity = scene.getEntity(entityId);
    const starEntity = scene.getEntity(starId);
    let vector3 = new Pioneer.Vector3();
    targetEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, starEntity);
    0 === vector3.magnitude() && (vector3 = new Pioneer.Vector3(0, 1, 0));
    const upDirection = new Pioneer.Vector3();
    targetEntity.getOrientation().getAxis(upDirection, 2);
    vector3.neg(vector3);
    vector3.normalize(vector3);
    let targetRadius = targetEntity.getOcclusionRadius();
    const spheroidComponent = targetEntity.getComponent(Pioneer.SpheroidComponent);
    null !== spheroidComponent && (targetRadius = spheroidComponent.getEquatorialRadius());
    const minimumRadius = .25 * targetRadius;
    const sideDirection = new Pioneer.Vector3();
    sideDirection.cross(vector3, upDirection);
    sideDirection.normalize(sideDirection);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(sideDirection, Pioneer.MathUtils.degToRad(verticalOffset));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(upDirection, Pioneer.MathUtils.degToRad(horizontalOffset));
    vector3.rotate(quaternion, vector3);
    const viewOrientation = new Pioneer.Quaternion();
    viewOrientation.setFromAxes(void 0, vector3, upDirection);
    let fittedDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, viewOrientation, targetEntity, [targetEntity]);
    fittedDistance *= distanceMultiplier;
    vector3.mult(vector3, fittedDistance);
    await this._cameraManager.goToEntity(entityId, {
      distance: fittedDistance,
      duration: duration / 2
    });
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration / 2
    });
  }
  _easeOutExpoTransition(cameraEntity, startPosition, endPosition, startOrientation, endOrientation, progress) {
    const interpolatedPosition = Pioneer.Vector3.pool.get();
    const interpolatedOrientation = Pioneer.Quaternion.pool.get();
    const easedProgress = 1 - Math.pow(1 - progress, 4);
    interpolatedPosition.lerp(startPosition, endPosition, easedProgress);
    interpolatedOrientation.slerp(startOrientation, endOrientation, easedProgress);
    this._onCameraTransition?.(easedProgress);
    cameraEntity.setPosition(interpolatedPosition);
    cameraEntity.setOrientation(interpolatedOrientation);
    Pioneer.Vector3.pool.release(interpolatedPosition);
    Pioneer.Quaternion.pool.release(interpolatedOrientation);
  }
  _easeInOutExpoTransition(cameraEntity, startPosition, endPosition, startOrientation, endOrientation, progress) {
    const interpolatedPosition = Pioneer.Vector3.pool.get();
    const interpolatedOrientation = Pioneer.Quaternion.pool.get();
    const easedProgress = ((progress *= 2) <= 1 ? Math.pow(progress, 4) : 2 - Math.pow(2 - progress, 4)) / 2;
    interpolatedPosition.lerp(startPosition, endPosition, easedProgress);
    interpolatedOrientation.slerp(startOrientation, endOrientation, easedProgress);
    this._onCameraTransition?.(easedProgress);
    cameraEntity.setPosition(interpolatedPosition);
    cameraEntity.setOrientation(interpolatedOrientation);
    Pioneer.Vector3.pool.release(interpolatedPosition);
    Pioneer.Quaternion.pool.release(interpolatedOrientation);
  }
  async goToSpacecraft(entityId, {
    scene: scene,
    starId = "sun",
    planeId = "earth",
    distance: distance,
    cinematic = true,
    duration = 1.5,
    verticalOffset = 0,
    horizontalOffset = 0
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.SPACECRAFT
    });
    void 0 === scene && (scene = this._scene);
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    const requestedDistance = entityInfo?.customDistance || distance;
    await scene.waitTillEntitiesInPlace([entityId]);
    const spacecraftEntity = scene.getEntity(entityId);
    const minimumRadius = 1.2 * spacecraftEntity.getOcclusionRadius();
    const vector3 = new Pioneer.Vector3();
    vector3.normalize(spacecraftEntity.getPosition());
    const upDirection = new Pioneer.Vector3();
    const parentEntity = spacecraftEntity.getParent();
    parentEntity && (parentEntity.getName() === starId && null !== scene.getEntity(planeId) ? (this.getNormalToEcliptic(upDirection, planeId), upDirection.isNaN() && upDirection.copy(new Pioneer.Vector3(0, 0, 1))) : parentEntity.getOrientation().getAxis(upDirection, 2));
    upDirection.normalize(upDirection);
    vector3.magnitude() < 1e-4 && (spacecraftEntity.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    const sideDirection = new Pioneer.Vector3();
    sideDirection.cross(vector3, upDirection);
    sideDirection.normalize(sideDirection);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(sideDirection, Pioneer.MathUtils.degToRad(verticalOffset));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(upDirection, Pioneer.MathUtils.degToRad(horizontalOffset));
    vector3.rotate(quaternion, vector3);
    let fittedDistance = 0;
    if (void 0 !== requestedDistance) fittedDistance = requestedDistance;else {
      const viewOrientation = new Pioneer.Quaternion();
      viewOrientation.setFromAxes(void 0, vector3, upDirection);
      fittedDistance = 1.3 * SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, viewOrientation, spacecraftEntity, [spacecraftEntity]);
    }
    vector3.mult(vector3, fittedDistance);
    await this._cameraManager.goToEntity(entityId, {
      distance: fittedDistance
    });
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration
    });
  }
  async goToInstrument(entityId, {
    scene: scene,
    distance: distance,
    duration = 1.5,
    upVector: upAxisName = "z-axis",
    forwardVector: forwardAxisName = "y-axis"
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.INSTRUMENT
    });
    void 0 === scene && (scene = this._scene);
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    const requestedDistance = entityInfo?.customDistance || distance;
    const instrumentEntity = scene.getEntity(entityId);
    const parentEntity = instrumentEntity.getParent();
    await scene.waitTillEntitiesInPlace([parentEntity.getName(), entityId]);
    const instrumentRadius = instrumentEntity.getOcclusionRadius();
    const parentRadius = parentEntity.getOcclusionRadius();
    const minimumRadius = 1.2 * instrumentRadius;
    const vector3 = new Pioneer.Vector3();
    instrumentEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, parentEntity);
    const forwardDirection = new Pioneer.Vector3();
    const forwardAxisIndex = forwardAxisName.endsWith("y-axis") ? 1 : forwardAxisName.endsWith("z-axis") ? 2 : 0;
    parentEntity.getOrientation().getAxis(forwardDirection, forwardAxisIndex);
    forwardAxisName.startsWith("-") && forwardDirection.mult(forwardDirection, -1);
    vector3.mult(forwardDirection, -1);
    const upDirection = new Pioneer.Vector3();
    let upAxisIndex = forwardAxisName.endsWith("y-axis") ? 2 : 1;
    upAxisName.endsWith("x-axis") ? upAxisIndex = 0 : upAxisName.endsWith("z-axis") && (upAxisIndex = 2);
    parentEntity.getOrientation().getAxis(upDirection, upAxisIndex);
    upAxisName.startsWith("-") && upDirection.mult(upDirection, -1);
    let fittedDistance = 4 * minimumRadius;
    void 0 !== requestedDistance && (fittedDistance = requestedDistance);
    vector3.mult(vector3, fittedDistance);
    await this._cameraManager.goToEntity(parentEntity.getName(), {
      destinationUp: upDirection,
      distance: 1.2 * parentRadius
    });
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration
    });
  }
  async compareObjects(leftEntityId, rightEntityId, {
    cameraLeft: cameraLeft,
    cameraRight: cameraRight,
    cameraLeftPosition: cameraLeftPosition,
    cameraRightPosition: cameraRightPosition,
    cameraUp: cameraUp,
    scene: scene,
    minRadius: minRadius,
    maxRadius: maxRadius,
    duration = .75
  }) {
    this._cameraManager.setContext({
      id: leftEntityId,
      context: CameraScripts.CONTEXT.COMPARE,
      to: rightEntityId
    });
    const customEvent = new CustomEvent("cameracompare", {
      detail: {
        left: leftEntityId,
        right: rightEntityId
      }
    });
    window.dispatchEvent(customEvent);
    const leftTransition = this._cameraManager.goToEntity(leftEntityId, {
      minRadius: minRadius,
      maxRadius: maxRadius,
      camera: cameraLeft,
      destination: cameraLeftPosition,
      destinationUp: cameraUp,
      scene: scene,
      select: false,
      duration: duration,
      zoom: true,
      cinematic: true
    });
    const rightTransition = this._cameraManager.goToEntity(rightEntityId, {
      minRadius: minRadius,
      maxRadius: maxRadius,
      camera: cameraRight,
      destination: cameraRightPosition,
      destinationUp: cameraUp,
      scene: scene,
      select: false,
      duration: duration,
      zoom: true,
      cinematic: true
    });
    await Promise.all([leftTransition, rightTransition]);
  }
  async showLocation(entityId, planeEntityId, referenceEntityId, planeMode = "northPole", {
    duration = 2,
    otherEntityNames = [],
    distance: distance,
    rotateByScreenRatio = true
  } = {}) {
    this._cameraManager.setContext({
      id: "",
      targetEntityName: entityId,
      context: CameraScripts.CONTEXT.LOCATION,
      options: {
        otherEntityNames: otherEntityNames
      }
    });
    const targetEntity = this._scene.getEntity(entityId);
    const planeEntity = this._scene.getEntity(planeEntityId);
    const referenceEntity = this._scene.getEntity(referenceEntityId);
    if (null === targetEntity || null === planeEntity || null === referenceEntity) return;
    const fittedEntities = [];
    fittedEntities.push(targetEntity);
    fittedEntities.push(planeEntity);
    fittedEntities.push(referenceEntity);
    for (let entityIndex = 0, entityCount = otherEntityNames.length; entityIndex < entityCount; entityIndex++) {
      const additionalEntity = this._scene.getEntity(otherEntityNames[entityIndex]);
      null !== additionalEntity && fittedEntities.push(additionalEntity);
    }
    const vector3 = new Pioneer.Vector3();
    "northPole" === planeMode ? planeEntity.getOrientation().getAxis(vector3, 2) : "planeNormal" === planeMode && (vector3.cross(planeEntity.getPosition(), planeEntity.getVelocity()), vector3.normalize(vector3));
    const viewDirection = new Pioneer.Vector3();
    viewDirection.neg(vector3);
    const upDirection = new Pioneer.Vector3();
    targetEntity.getPositionRelativeToEntity(upDirection, Pioneer.Vector3.Zero, referenceEntity);
    upDirection.normalize(upDirection);
    upDirection.setNormalTo(viewDirection, upDirection);
    upDirection.neg(upDirection);
    const cameraComponent = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    rotateByScreenRatio && cameraComponent.getHorizontalFieldOfView() > cameraComponent.getVerticalFieldOfView() && upDirection.cross(upDirection, viewDirection);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, viewDirection, upDirection);
    let fittedDistance = distance || SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, targetEntity, fittedEntities);
    cameraComponent.getHorizontalFieldOfView() < cameraComponent.getVerticalFieldOfView() && (fittedDistance *= 1.3 * cameraComponent.getVerticalFieldOfView());
    fittedDistance *= 2;
    vector3.setMagnitude(vector3, fittedDistance);
    null === this._cameraEntity.getParent() && (await this._cameraManager.goToEntity(entityId, {
      distance: fittedDistance
    }));
    const cameraKeyframes = {
      up: [{
        frame: duration,
        up: upDirection
      }],
      position: [{
        frame: duration,
        position: vector3,
        relativeTo: targetEntity.getName()
      }],
      focus: [{
        frame: duration,
        name: entityId
      }]
    };
    await this._cameraManager.goToEntity(entityId, {
      keyframes: cameraKeyframes,
      destination: vector3,
      destinationUp: upDirection,
      cinematic: false,
      duration: .2
    });
  }
  async alignObjects(entityId, focusEntityId, {
    verticalOffset = 0,
    horizontalOffset = 0,
    duration = 1.5,
    transitionDuration: transitionDuration,
    alignDuration: alignDuration,
    distance = 1,
    cinematic = false,
    useEase = true
  } = {}) {
    this._cameraManager.setContext({
      id: "",
      targetEntityName: entityId,
      context: CameraScripts.CONTEXT.ALIGN_OBJECTS,
      focus: focusEntityId
    });
    const targetEntity = this._scene.getEntity(entityId);
    const focusEntity = this._scene.getEntity(focusEntityId);
    await this._scene.waitTillEntitiesInPlace([entityId, focusEntityId]);
    const minimumRadius = targetEntity.getOcclusionRadius();
    const vector3 = new Pioneer.Vector3();
    const currentTime = this._cameraManager.pioneer.getTime();
    targetEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, focusEntity, currentTime);
    vector3.isNaN() ? vector3.copy(new Pioneer.Vector3(0, -1, 0)) : vector3.normalize(vector3);
    vector3.mult(vector3, distance);
    const upDirection = new Pioneer.Vector3();
    focusEntity.getOrientation().getAxis(upDirection, 2);
    const sideDirection = new Pioneer.Vector3();
    sideDirection.cross(vector3, upDirection);
    sideDirection.normalize(sideDirection);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(sideDirection, Pioneer.MathUtils.degToRad(verticalOffset));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(upDirection, Pioneer.MathUtils.degToRad(horizontalOffset));
    vector3.rotate(quaternion, vector3);
    await this._cameraManager.goToEntity(entityId, {
      distance: distance,
      destinationUp: upDirection,
      duration: transitionDuration || .5 * duration,
      transitionFunction: useEase ? this._easeOutExpoTransition : void 0
    });
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: alignDuration || .5 * duration,
      transitionFunction: useEase ? this._easeOutExpoTransition : void 0
    });
  }
  async alignSpacecraftPlanet(entityId, {
    duration = 1.5,
    minRadius: minimumRadius = 50,
    distanceMultiplier = 3
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.ALIGN_SPACECRAFT
    });
    const spacecraftEntity = this._scene.getEntity(entityId);
    let surfaceEntity = spacecraftEntity.getParent();
    for (; null !== surfaceEntity && null === surfaceEntity.getComponent(Pioneer.SpheroidComponent) && null === surfaceEntity.getComponent(Pioneer.ModelComponent);) surfaceEntity = surfaceEntity.getParent();
    let surfaceRadius = surfaceEntity.getOcclusionRadius();
    const spheroidComponent = surfaceEntity.getComponent(Pioneer.SpheroidComponent);
    null !== spheroidComponent && (surfaceRadius = spheroidComponent.getEquatorialRadius());
    const vector3 = new Pioneer.Vector3();
    spacecraftEntity.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, surfaceEntity);
    vector3.normalize(vector3);
    vector3.magnitude() < 1e-4 && (spacecraftEntity.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    vector3.mult(vector3, Math.max(minimumRadius, distanceMultiplier * surfaceRadius));
    const upDirection = new Pioneer.Vector3();
    surfaceEntity.getOrientation().getAxis(upDirection, 2);
    await this._cameraManager.goToEntity(surfaceEntity.getName());
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: false,
      minRadius: Math.min(surfaceRadius, minimumRadius),
      destinationUp: upDirection,
      duration: duration
    });
  }
  async viewFromSide(entityId, {
    planeId = "earth",
    distance: distance,
    cinematic = false,
    duration = .75,
    verticalOffset = 0,
    horizontalOffset = 0,
    forwardVector: forwardAxisName = "x-axis",
    upVector: upAxisName = ""
  } = {}) {
    const targetEntity = this._scene.getEntity(entityId);
    const planeEntity = this._scene.getEntity(planeId) || targetEntity.getParent();
    await this._scene.waitTillEntitiesInPlace([entityId, planeId]);
    const targetRadius = targetEntity.getOcclusionRadius();
    const minimumRadius = 1.2 * targetRadius;
    const vector3 = new Pioneer.Vector3();
    const forwardDirection = new Pioneer.Vector3();
    let forwardAxisIndex = 0;
    "z-axis" === forwardAxisName ? forwardAxisIndex = 2 : "y-axis" === forwardAxisName && (forwardAxisIndex = 1);
    targetEntity.getOrientation().getAxis(forwardDirection, forwardAxisIndex);
    forwardDirection.normalize(forwardDirection);
    const radialDirection = new Pioneer.Vector3();
    targetEntity.getPositionRelativeToEntity(radialDirection, Pioneer.Vector3.Zero, planeEntity);
    radialDirection.normalize(radialDirection);
    vector3.cross(forwardDirection, radialDirection);
    vector3.normalize(vector3);
    vector3.mult(vector3, -1);
    const upDirection = new Pioneer.Vector3();
    if (upAxisName) {
      let upAxisIndex = 1;
      upAxisName.includes("x-axis") ? upAxisIndex = 0 : upAxisName.includes("z-axis") && (upAxisIndex = 2);
      targetEntity.getOrientation().getAxis(upDirection, upAxisIndex);
      upAxisName.startsWith("-") && upDirection.mult(upDirection, -1);
    } else {
      targetEntity.getPositionRelativeToEntity(upDirection, Pioneer.Vector3.Zero, planeEntity);
      upDirection.normalize(upDirection);
    }
    const sideDirection = new Pioneer.Vector3();
    if (sideDirection.cross(vector3, upDirection), sideDirection.normalize(sideDirection), upDirection.cross(sideDirection, vector3), 0 !== verticalOffset) {
      const quaternion = new Pioneer.Quaternion();
      const verticalAngleRadians = Pioneer.MathUtils.degToRad(verticalOffset);
      quaternion.setFromAxisAngle(sideDirection, verticalAngleRadians);
      vector3.rotate(quaternion, vector3);
    }
    if (upDirection.cross(sideDirection, vector3), 0 !== horizontalOffset) {
      const quaternion = new Pioneer.Quaternion();
      const horizontalAngleRadians = Pioneer.MathUtils.degToRad(horizontalOffset);
      quaternion.setFromAxisAngle(upDirection, horizontalAngleRadians);
      vector3.rotate(quaternion, vector3);
    }
    sideDirection.cross(vector3, upDirection);
    sideDirection.normalize(sideDirection);
    void 0 === distance ? vector3.mult(vector3, 10 * targetRadius) : vector3.mult(vector3, distance);
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration
    });
  }
  async spacecraftLookAtTarget(entityId, targetEntityId) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.LOOK_AT,
      target: targetEntityId
    });
  }
  async spacecraftLockedOnTarget(entityId, targetEntityId) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.LOCKED_ON,
      target: targetEntityId
    });
  }
  async goToSystemSideway(entityId, {
    distance: distance,
    minDistance: minimumDistance = 0,
    duration = 1,
    otherEntityNames = [],
    includeChildren = true,
    angleInDegree: angleDegrees = 0,
    cinematic = false
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.SYSTEM
    });
    const targetEntity = this._scene.getEntity(entityId);
    const physicalEntityId = this.isBarycenter(entityId) ? this.removeBarycenter(entityId) : entityId;
    const customDistance = physicalEntityId in this._customSystemDistances ? this._customSystemDistances[physicalEntityId] : 0;
    const fittedEntities = [targetEntity];
    for (let entityIndex = 0; entityIndex < otherEntityNames.length; entityIndex++) fittedEntities.push(this._scene.getEntity(otherEntityNames[entityIndex]));
    if (includeChildren) for (let childIndex = 0; childIndex < targetEntity.getNumChildren(); childIndex++) {
      const childEntity = targetEntity.getChild(childIndex);
      null === childEntity.getComponent(Pioneer.CameraComponent) && (childEntity.getName().startsWith("sc") || childEntity.getPosition().isNaN() || fittedEntities.push(childEntity));
    }
    const vector3 = new Pioneer.Vector3();
    vector3.normalize(targetEntity.getVelocity());
    const radialDirection = new Pioneer.Vector3();
    radialDirection.normalize(targetEntity.getPosition());
    radialDirection.setNormalTo(vector3, radialDirection);
    const upDirection = new Pioneer.Vector3();
    upDirection.cross(radialDirection, vector3);
    const destinationDirection = new Pioneer.Vector3();
    destinationDirection.mult(vector3, -1);
    destinationDirection.addMult(destinationDirection, upDirection, Math.tan(Pioneer.MathUtils.degToRad(angleDegrees)));
    let targetRadius = targetEntity.getOcclusionRadius();
    const spheroidComponent = targetEntity.getComponent(Pioneer.SpheroidComponent);
    if (null !== spheroidComponent) targetRadius = spheroidComponent.getEquatorialRadius();else if (this.isBarycenter(entityId)) {
      const barycenterBodyId = this.removeBarycenter(entityId);
      const physicalSpheroid = this._scene.getEntity(barycenterBodyId).getComponent(Pioneer.SpheroidComponent);
      null !== spheroidComponent && (targetRadius = physicalSpheroid.getEquatorialRadius());
    }
    const minimumRadius = 1.2 * targetRadius;
    let fittedDistance = distance;
    if (void 0 === fittedDistance) {
      const quaternion = new Pioneer.Quaternion();
      quaternion.setFromAxes(radialDirection, destinationDirection, void 0);
      fittedDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, targetEntity, fittedEntities);
      fittedDistance *= 1.3;
    }
    fittedDistance = Math.max(customDistance, fittedDistance);
    const cameraComponent = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    cameraComponent.getHorizontalFieldOfView() < cameraComponent.getVerticalFieldOfView() && (fittedDistance *= 1.3 * cameraComponent.getVerticalFieldOfView());
    destinationDirection.setMagnitude(destinationDirection, fittedDistance);
    await this._cameraManager.goToEntity(entityId, {
      destination: destinationDirection,
      cinematic: cinematic,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration
    });
  }
  async goToSystem(entityId, options = {}) {
    if ("inner_solar_system" === entityId) {
      Object.assign(options, {
        distance: 7e8,
        angle: 25,
        planeId: "earth"
      });
      await this._goToSystem("sun", options);
    } else if ("outer_solar_system" === entityId) {
      Object.assign(options, {
        distance: 1e10,
        angle: 25,
        planeId: "earth"
      });
      await this._goToSystem("sun", options);
    } else {
      const physicalEntityId = this.isBarycenter(entityId) ? this.removeBarycenter(entityId) : entityId;
      const minimumDistance = physicalEntityId in this._customSystemDistances ? this._customSystemDistances[physicalEntityId] : 0;
      const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
      const planeId = "planeId" in options ? options.planeId : entityInfo?.planeEntity || "";
      Object.assign(options, {
        minDistance: minimumDistance,
        planeId: planeId
      });
      await this._goToSystem(entityId, options);
    }
  }
  async _goToSystem(entityId, {
    distance: distance,
    angle: angleDegrees = 25,
    minDistance: minimumDistance = 0,
    duration = 1,
    planeId = "",
    otherEntityNames = [],
    includeChildren = true,
    isRelativeToPreviousCamera: relativeToPreviousCamera = true
  } = {}) {
    this._cameraManager.setContext({
      id: entityId,
      context: CameraScripts.CONTEXT.SYSTEM
    });
    this.app.getManager("camera").setIsTransitioning(true);
    const targetEntity = this._scene.getEntity(entityId);
    const fittedEntities = [targetEntity];
    for (let entityIndex = 0; entityIndex < otherEntityNames.length; entityIndex++) fittedEntities.push(this._scene.getEntity(otherEntityNames[entityIndex]));
    if (includeChildren) for (let childIndex = 0; childIndex < targetEntity.getNumChildren(); childIndex++) {
      const childEntity = targetEntity.getChild(childIndex);
      null === childEntity.getComponent(Pioneer.CameraComponent) && (childEntity.getName().startsWith("sc") || childEntity.getPosition().isNaN() || fittedEntities.push(childEntity));
    }
    const vector3 = new Pioneer.Vector3();
    const previousCameraPosition = new Pioneer.Vector3();
    relativeToPreviousCamera ? (this._cameraEntity.getPositionRelativeToEntity(previousCameraPosition, Pioneer.Vector3.Zero, targetEntity), previousCameraPosition.isNaN() ? (vector3.copy(new Pioneer.Vector3(0, -1, 0)), vector3.mult(vector3, 1e10)) : vector3.copy(previousCameraPosition)) : (vector3.normalize(targetEntity.getPosition()), vector3.mult(vector3, -1));
    const upDirection = new Pioneer.Vector3();
    "" !== planeId && null !== this._scene.getEntity(planeId) ? (this.getNormalToEcliptic(upDirection, planeId), upDirection.isNaN() && upDirection.copy(new Pioneer.Vector3(0, 0, 1))) : targetEntity.getOrientation().getAxis(upDirection, 2);
    const sideDirection = new Pioneer.Vector3();
    sideDirection.cross(vector3, upDirection);
    sideDirection.normalize(sideDirection);
    vector3.setNormalTo(upDirection, vector3);
    vector3.normalize(vector3);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(sideDirection, Pioneer.MathUtils.degToRad(angleDegrees));
    vector3.rotate(quaternion, vector3);
    let targetRadius = targetEntity.getOcclusionRadius();
    const spheroidComponent = targetEntity.getComponent(Pioneer.SpheroidComponent);
    if (null !== spheroidComponent) targetRadius = spheroidComponent.getEquatorialRadius();else if (this.isBarycenter(entityId)) {
      const physicalEntityId = this.removeBarycenter(entityId);
      const physicalSpheroid = this._scene.getEntity(physicalEntityId).getComponent(Pioneer.SpheroidComponent);
      null !== spheroidComponent && (targetRadius = physicalSpheroid.getEquatorialRadius());
    }
    const minimumRadius = 1.2 * targetRadius;
    let fittedDistance = distance;
    if (void 0 === fittedDistance) {
      const viewOrientation = new Pioneer.Quaternion();
      viewOrientation.setFromAxes(sideDirection, vector3, void 0);
      fittedDistance = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, viewOrientation, targetEntity, fittedEntities);
      fittedDistance *= 1.3;
    }
    fittedDistance = Math.max(minimumDistance, fittedDistance);
    const cameraComponent = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    if (cameraComponent.getHorizontalFieldOfView() < cameraComponent.getVerticalFieldOfView() && (fittedDistance *= 1.3 * cameraComponent.getVerticalFieldOfView()), relativeToPreviousCamera) {
      const transitionDestination = new Pioneer.Vector3();
      this._cameraEntity.getPositionRelativeToEntity(previousCameraPosition, Pioneer.Vector3.Zero, targetEntity);
      previousCameraPosition.isNaN() ? (transitionDestination.copy(new Pioneer.Vector3(0, -1, 0)), transitionDestination.setNormalTo(upDirection, transitionDestination), transitionDestination.mult(transitionDestination, 1e10), transitionDestination.rotate(quaternion, transitionDestination)) : transitionDestination.copy(previousCameraPosition);
      await this._cameraManager.goToEntity(entityId, {
        destination: transitionDestination,
        destinationUp: upDirection,
        duration: duration
      });
    } else await this._cameraManager.goToEntity(entityId, {
      distance: distance,
      duration: duration / 2
    });
    vector3.mult(vector3, fittedDistance);
    await this._cameraManager.goToEntity(entityId, {
      destination: vector3,
      cinematic: false,
      minRadius: minimumRadius,
      destinationUp: upDirection,
      duration: duration
    });
    this.app.getManager("camera").setIsTransitioning(false);
  }
  async goToCenter(entityIds, parentEntityId, sampleTime, options = {}) {
    this._cameraManager.setContext({
      id: "centerSystem",
      context: CameraScripts.CONTEXT.CENTER_SYSTEM
    });
    const vector3 = new Pioneer.Vector3();
    const parentEntity = this._scene.getEntity(parentEntityId);
    const relativePosition = new Pioneer.Vector3();
    const centerEntities = [];
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entity = this._scene.getEntity(entityIds[entityIndex]);
      centerEntities.push(entity);
      entity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, parentEntity, sampleTime);
      vector3.addMult(vector3, relativePosition, 1 / entityIds.length);
    }
    let centerEntity = this._scene.getEntity("center");
    null === centerEntity && (centerEntity = this._scene.addEntity("center"), centerEntity.setOrientation(Pioneer.Quaternion.Identity));
    centerEntity.setParent(parentEntity);
    centerEntity.setPosition(vector3);
    await this._scene.getLoadedPromise();
    options.otherEntityNames = entityIds;
    await this._goToSystem(centerEntity.getName(), options);
  }
  async showLocationCenter(entityIds, parentEntityId, sampleTime, planeEntityId, referenceEntityId, planeMode, options = {}) {
    this._cameraManager.setContext({
      id: "centerLocation",
      context: CameraScripts.CONTEXT.CENTER_LOCATION
    });
    const vector3 = new Pioneer.Vector3();
    const parentEntity = this._scene.getEntity(parentEntityId);
    const relativePosition = new Pioneer.Vector3();
    const centerEntities = [];
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entity = this._scene.getEntity(entityIds[entityIndex]);
      centerEntities.push(entity);
      entity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, parentEntity, sampleTime);
      vector3.addMult(vector3, relativePosition, 1 / entityIds.length);
    }
    let centerEntity = this._scene.getEntity("center");
    null === centerEntity && (centerEntity = this._scene.addEntity("center"), centerEntity.setOrientation(Pioneer.Quaternion.Identity));
    centerEntity.setParent(parentEntity);
    centerEntity.setPosition(vector3);
    await this._scene.getLoadedPromise();
    options.otherEntityNames = entityIds;
    await this.showLocation(centerEntity.getName(), planeEntityId, referenceEntityId, planeMode, options);
  }
  async showLocationInParentSystem(entityId, options = {}) {
    const contentManager = this._app.getManager("content");
    let parentEntityId = this._app.getManager("scene").getParent(entityId);
    parentEntityId = "Landing site" === contentManager.getEntityInfo(parentEntityId).category ? this._app.getManager("scene").getParent(parentEntityId) : parentEntityId;
    await this.showLocation(entityId, parentEntityId, parentEntityId, "northPole", options);
  }
  async showLocationInSolarSystem(entityId, options = {}) {
    let planeEntity = this._scene.getEntity(entityId).getParent();
    if ("sun" !== planeEntity.getName()) for (; "sun" !== planeEntity.getParent().getName();) planeEntity = planeEntity.getParent();else planeEntity = this._scene.getEntity("earth");
    await this.showLocation(entityId, planeEntity.getName(), "sun", "planeNormal", options);
  }
}
CameraScripts.CONTEXT = {
  CELESTIAL_OBJECT: 0,
  SPACECRAFT: 1,
  ALIGN_SPACECRAFT: 2,
  LOCATION: 3,
  SYSTEM: 4,
  COMPARE: 5,
  LOOK_AT: 6,
  LOCKED_ON: 7,
  INSTRUMENT: 8,
  ALIGN_OBJECTS: 9,
  CENTER_SYSTEM: 10,
  CENTER_LOCATION: 11,
  LOOK_SURFACE_LAT_LON: 12
};
export { CameraScripts };
