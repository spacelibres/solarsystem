// Recovered from app.js:1673136-1697979.
/* 测距模式持有源/目标测量点、连接线、插值锚点与临时标签权重/遮挡半径，init 借用池向量，deinit 恢复实体状态并归还向量和事件监听。距离以千米、速度先从每秒换算每小时；光行时以 299792.458 km/s 计算。U 始终相对当前锚点父实体，切换父实体时取 1-U；表面限制与半径限制分开用于命中和缩放。动画 duration 输入秒、内部存毫秒；暂停只记录是否允许恢复播放，避免覆盖用户已暂停状态。 */
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
const {
  formatNumber: formatNumber,
  conversionTable: conversionTable,
  throttle: throttle
} = Eyes.AppUtils;
const CENTER_MEASURE_POINT = "center";
const SURFACE_MEASURE_POINT = "surface";
const DEFAULT_MEASURE_POINT = CENTER_MEASURE_POINT;
const METRIC_UNITS = "metric";
const IMPERIAL_UNITS = "imperial";
const currentUnitSystem = METRIC_UNITS;
class DistanceManager extends Eyes.BaseManager {
  constructor(app) {
    super(app);
    this._sourceDistanceEntity = null;
    this._targetDistanceEntities = [];
    this.hasTarget = null;
    this._areRelated = null;
    this._areClose = null;
    this._currentSecond = null;
    this.distanceInfo = {
      centerValue: null,
      measuredValue: null,
      sourceTargetDiff: null
    };
    this._allowRaycasting = null;
    this._allowPlay = null;
    this._prevValues = {
      weights: {},
      occRadii: {}
    };
    this._currentUnitSystem = currentUnitSystem;
    this.errorResultTimeout = null;
    this._vectors = {};
    this._uValueCurrent = null;
    this._uValueHold = null;
    this.intersect = null;
    this._bpAnimation = null;
    this._bpParentIsSource = null;
    this._currBetweenOffset = {};
    this._isTransitioning = null;
    this._isBelowZero = null;
    this._tooltipOpts = {
      contentSuffix: "the line to adjust the camera's orbit center",
      height: null,
      isTouch: null,
      instance: null
    };
    this._isWaitingForEntities = null;
    this.distancePanel = null;
    this.pionerEl = null;
    this.bindFunctions(["update", "on3dLineMouseMove", "on3dLineClick", "showTooltip", "hideTooltip"]);
    this._on3dLineMouseMoveThrottled = throttle(this.on3dLineMouseMove, 200, {
      leading: true,
      trailing: true
    });
  }
  init() {
    this._betweenPosEntity ??= this._createBetweenEntity();
    this._bpController ??= this._betweenPosEntity.addController(SolarSystemSceneExports.PositionSumController, "bp_position_sum");
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.pionerEl ??= document.getElementById("pioneer");
    this._grabVectors();
    this.addEvents();
  }
  deinit() {
    this.resetAllDistanceEntities();
    this.resetUValue();
    this._releaseVectors();
    this.removeEvents();
    this.setBetweenPosHidden(true);
  }
  hideSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    visible && layerManager.toggleLayer("spacecraft");
  }
  showSpacecraftLayer() {
    const layerManager = this.app.getManager("layer");
    const {
      visible: visible
    } = layerManager.getLayer("spacecraft");
    !visible && layerManager.toggleLayer("spacecraft");
  }
  addEvents() {
    const {
      canHover: canHover
    } = this.app;
    this.pionerEl?.addEventListener("click", this.on3dLineClick);
    canHover && this.pionerEl?.addEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  removeEvents() {
    this.pionerEl?.removeEventListener("click", this.on3dLineClick);
    this.pionerEl?.removeEventListener("mousemove", this._on3dLineMouseMoveThrottled);
  }
  resetEvents() {
    this.removeEvents();
    this.addEvents();
  }
  _updateTooltip() {
    const {
      contentSuffix: contentSuffix,
      height: height,
      isTouch: isTouch,
      instance: instance
    } = this._tooltipOpts;
    const viewportHeight = window.innerHeight;
    const {
      isTouch: touchInput
    } = this.app;
    if (viewportHeight === height && touchInput === isTouch) return;
    const tooltipOptions = {
      content: `${touchInput ? "Tap" : "Click"} ${contentSuffix}`,
      placement: viewportHeight > 640 ? "top" : "right",
      arrow: !touchInput,
      hideOnClick: !touchInput || "toggle",
      delay: [1e3, null]
    };
    if (instance) instance.setProps(tooltipOptions);else {
      const tooltipAnchor = this._betweenPosEntity.getComponent(Pioneer.DivComponent).getDiv()?.firstChild;
      this._tooltipOpts.instance = (0, animateFill.default)(tooltipAnchor, tooltipOptions);
    }
    this._tooltipOpts.height = viewportHeight;
    this._tooltipOpts.isTouch = touchInput;
  }
  showTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.show();
  }
  hideTooltip() {
    const {
      instance: instance
    } = this._tooltipOpts;
    instance?.hide();
  }
  on3dLineMouseMove(event) {
    if (this._isTransitioning) return;
    const {
      buttons: pressedButtons = 0
    } = event || {};
    if (0 !== pressedButtons) return void (this.intersect = null);
    const cameraComponent = this.app.pioneer.getInput().getActiveViewport().getCamera();
    const intersect = this.calcIntersect();
    const intersectionChanged = null === this.intersect && intersect || this.intersect && null === intersect;
    if (this.intersect = intersect, intersectionChanged && this.setBetweenIntersectClass(Boolean(this.intersect)), null === this.intersect) {
      intersectionChanged && this.playTime();
      return void this.distancePanel.setLineGraphicDotOffset(null);
    }
    const isRealTime = 1 === this.app.getManager("time").getTimeRate();
    intersectionChanged && !isRealTime && this.pauseTime();
    const {
      normalSpacePoint: normalSpacePoint,
      pixelSpacePoint: pixelSpacePoint
    } = this._vectors;
    cameraComponent.getNormalSpacePositionFromCameraSpacePosition(normalSpacePoint, this.intersect.linePoint);
    cameraComponent.getViewport().getPixelSpacePositionFromNormalSpacePosition(pixelSpacePoint, normalSpacePoint);
    const {
      x: iconPixelX = 0,
      y: iconPixelY = 0
    } = this._betweenPosEntity?.getPixelSpacePosition(cameraComponent) || {};
    const offsetX = pixelSpacePoint.x - iconPixelX;
    const offsetY = pixelSpacePoint.y - iconPixelY;
    this.setBetweenOffsetVars(offsetX, offsetY);
    const graphicInterpolation = this.getInterpolationU(this.intersect.u);
    this.distancePanel.setLineGraphicDotOffset(graphicInterpolation);
  }
  getInterpolationU(interpolationU) {
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(interpolationU);
    const surfaceInterpolation = (limitedU - minSurfaceU) / (maxSurfaceU - minSurfaceU);
    return this._bpParentIsSource ? surfaceInterpolation : 1 - surfaceInterpolation;
  }
  getOffsetU(graphicInterpolation) {
    const parentInterpolation = this._bpParentIsSource ? graphicInterpolation : 1 - graphicInterpolation;
    const {
      limitedU: limitedU,
      minSurfaceU: minSurfaceU,
      maxSurfaceU: maxSurfaceU
    } = this.getLimitedU(parentInterpolation);
    return .5 !== graphicInterpolation ? limitedU : minSurfaceU + (maxSurfaceU - minSurfaceU) * graphicInterpolation;
  }
  on3dLineClick(event, requestedU) {
    if (this.app.canHover || (this.intersect = this.calcIntersect()), null === this.intersect && void 0 === requestedU) return;
    const uValueCurrent = this._uValueCurrent;
    const {
      limitedU: limitedU
    } = this.getLimitedU(requestedU ?? this.intersect.u);
    const {
      x: initialOffsetX,
      y: initialOffsetY
    } = this._currBetweenOffset;
    if (this.valuesWithPrecisionAreEqual(uValueCurrent, limitedU)) return;
    const crossesWholeLine = void 0 !== requestedU && Math.abs(uValueCurrent - requestedU) > .8;
    this.setHoldU(null);
    this.setIsTransitioning(true);
    this.setBetweenPosHidden(true);
    const cameraTransition = this.camToBetweenPos({
      targetU: limitedU,
      duration: 1
    });
    this.setBpAnimation({
      initialU: uValueCurrent,
      targetU: limitedU,
      duration: 1,
      onUpdate: (easedProgress, linearProgress) => {
        const remainingProgress = Math.max(1 - easedProgress, 0);
        const offsetX = initialOffsetX * remainingProgress;
        const offsetY = initialOffsetY * remainingProgress;
        if (this.setBetweenOffsetVars(offsetX, offsetY), crossesWholeLine) {
          const opacityCurve = Math.pow(2 * Math.abs(linearProgress - .5), 12);
          const opacity = parseFloat(opacityCurve.toFixed(2));
          this._distanceLine?.setOpacity(opacity);
        }
      },
      onEnd: async () => {
        await cameraTransition;
        limitedU > .5 && this.toggleBetweenParent(limitedU);
        this.setIsTransitioning(false);
        this.setBetweenPosHidden(false);
        this.setBetweenIntersectClass(false);
        this.playTime();
      }
    });
  }
  onNewULimit() {
    const currentU = this._uValueCurrent ?? 0;
    const {
      limitedU: limitedU
    } = this.getLimitedU(currentU);
    if (currentU === limitedU) return;
    this.setIsTransitioning(true);
    this.setBpAnimation({
      initialU: currentU,
      targetU: limitedU,
      duration: .3,
      onEnd: async () => {
        limitedU > .5 && this.toggleBetweenParent(limitedU);
        0 !== currentU && 1 !== currentU || this.setHoldU(currentU);
        this.setIsTransitioning(false);
      }
    });
  }
  async camToBetweenPos({
    targetU: targetU,
    duration = 1.5,
    force = false
  } = {}) {
    const {
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity,
      measurePoint: targetMeasurePoint
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (null === sourceTargetDiff) return;
    const parentEntity = this._bpParentIsSource ? entity : targetEntity;
    const otherEntity = this._bpParentIsSource ? targetEntity : entity;
    const parentMeasurePoint = this._bpParentIsSource ? measurePoint : targetMeasurePoint;
    const otherMeasurePoint = this._bpParentIsSource ? targetMeasurePoint : measurePoint;
    const heldU = null !== this._uValueHold ? this.getOffsetU(this._uValueHold) : null;
    const defaultU = this._bpParentIsSource ? 0 : 1;
    const initialU = heldU ?? this._uValueCurrent ?? defaultU;
    const {
      limitedU: limitedU,
      minRadiusU: minRadiusU,
      maxRadiusU: maxRadiusU
    } = this.getLimitedU(initialU);
    const destinationU = targetU ?? limitedU;
    const cameraManager = this.app.getManager("camera");
    const midpointCameraDistance = 4 * this.centerDistance;
    const endpointCameraDistance = 20 * (destinationU > .5 ? otherMeasurePoint.radius : parentMeasurePoint.radius);
    const destinationCameraDistance = endpointCameraDistance + (midpointCameraDistance - endpointCameraDistance) * (-2 * Math.abs(destinationU - .5) + 1);
    const currentCameraDistance = cameraManager.cameraEntity.getPosition().magnitude();
    const cameraDistanceChange = Math.abs(currentCameraDistance - destinationCameraDistance);
    const distanceChangeThreshold = endpointCameraDistance;
    const interpolationChange = Math.abs(destinationU - initialU);
    if (!force && !(cameraDistanceChange > distanceChangeThreshold || interpolationChange > .1)) return;
    const cameraAngleDegrees = -168 * destinationU - 6;
    const vector3 = new Pioneer.Vector3();
    const otherUpAxis = new Pioneer.Vector3();
    const interpolatedUpAxis = new Pioneer.Vector3();
    const perpendicularAxis = new Pioneer.Vector3();
    const destinationPosition = new Pioneer.Vector3();
    destinationPosition.copy(sourceTargetDiff);
    destinationPosition.neg(destinationPosition);
    destinationPosition.normalize(destinationPosition);
    destinationPosition.mult(destinationPosition, destinationCameraDistance);
    parentEntity.getOrientation().getAxis(vector3, 2);
    otherEntity.getOrientation().getAxis(otherUpAxis, 2);
    interpolatedUpAxis.lerp(vector3, otherUpAxis, destinationU);
    perpendicularAxis.cross(destinationPosition, interpolatedUpAxis);
    perpendicularAxis.normalize(perpendicularAxis);
    const rotationAxis = window.innerHeight > 640 ? perpendicularAxis : interpolatedUpAxis;
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(rotationAxis, Pioneer.MathUtils.degToRad(cameraAngleDegrees));
    destinationPosition.rotate(quaternion, destinationPosition);
    const destinationUp = new Pioneer.Vector3();
    this._bpParentIsSource ? destinationUp.neg(sourceTargetDiff) : destinationUp.copy(sourceTargetDiff);
    destinationUp.normalize(destinationUp);
    const transitionFunction = this.app.cameraScripts._easeInOutExpoTransition;
    let interiorZoomFactor = 1;
    destinationU < minRadiusU || destinationU > maxRadiusU ? interiorZoomFactor = 0 : destinationU < .1 ? interiorZoomFactor = (destinationU - minRadiusU) / (.1 - minRadiusU) : destinationU > .9 && (interiorZoomFactor = (destinationU - .9) / (maxRadiusU - .9));
    interiorZoomFactor = Math.max(interiorZoomFactor, 0);
    const radiusMultiplier = 2.5 + 17.5 * interiorZoomFactor;
    let minimumZoomDistance = (parentMeasurePoint.radius + (otherMeasurePoint.radius - parentMeasurePoint.radius) * destinationU) * radiusMultiplier;
    const maximumRadius = Math.max(parentMeasurePoint.radius, otherMeasurePoint.radius);
    const minimumRadius = Math.min(parentMeasurePoint.radius, otherMeasurePoint.radius);
    const minimumInteriorDistance = .1 * this.measuredDistance;
    this.centerDistance < 20 * maximumRadius ? minimumZoomDistance = 2.5 * minimumRadius : 1 === interiorZoomFactor && minimumZoomDistance < minimumInteriorDistance && (minimumZoomDistance = minimumInteriorDistance);
    const maximumZoomDistance = Math.max(maximumRadius, 50 * Math.abs(this.centerDistance));
    const interval = new Pioneer.Interval(minimumZoomDistance, maximumZoomDistance);
    await cameraManager.goToBetweenPos?.(this._betweenPosEntity, {
      destination: destinationPosition,
      destinationUp: destinationUp,
      transitionFunction: transitionFunction,
      duration: duration,
      zoomInterval: interval
    });
  }
  setBpAnimation({
    initialU: initialU,
    targetU: targetU,
    onUpdate: onUpdate,
    onEnd: onEnd,
    duration = 1.5
  }) {
    this._bpAnimation = {
      duration: 1e3 * duration,
      startTime: Date.now(),
      initialU: initialU,
      targetU: targetU,
      onUpdate: onUpdate,
      onEnd: onEnd
    };
  }
  _updateBpAnimation() {
    const {
      duration: duration,
      startTime: startTime,
      initialU: initialU,
      targetU: targetU,
      onUpdate: onUpdate,
      onEnd: onEnd
    } = this._bpAnimation;
    const elapsedMilliseconds = Date.now() - startTime;
    let easedProgress = elapsedMilliseconds > duration ? 1 : elapsedMilliseconds / duration;
    const linearProgress = easedProgress;
    if (1 !== easedProgress) {
      const easingExponent = 4;
      easedProgress = ((easedProgress *= 2) <= 1 ? Math.pow(easedProgress, easingExponent) : 2 - Math.pow(2 - easedProgress, easingExponent)) / 2;
    }
    "function" == typeof onUpdate && onUpdate(easedProgress, linearProgress);
    const interpolatedU = initialU + (targetU - initialU) * easedProgress;
    this.updateBetweenPoint(interpolatedU, false);
    1 === easedProgress && ("function" == typeof onEnd && onEnd(), this._bpAnimation = null);
  }
  pauseTime() {
    const timeControlsComponent = this.app.getComponent("timeControls");
    const timeManager = this.app.getManager("time");
    const alreadyPaused = 0 === timeManager.getTimeRate();
    this.setAllowPlay(!alreadyPaused);
    alreadyPaused || (timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, true) : timeManager.pause());
  }
  playTime() {
    const timeManager = this.app.getManager("time");
    const alreadyPlaying = 0 !== timeManager.getTimeRate();
    if (!this._allowPlay || alreadyPlaying) return;
    const timeControlsComponent = this.app.getComponent("timeControls");
    timeControlsComponent._canUpdate ? timeControlsComponent.playPauseRate(null, false) : timeManager.play();
  }
  swapSourceAndTarget() {
    const {
      id: id
    } = this.sourceDistanceEntity;
    const {
      id: targetId
    } = this.targetDistanceEntities[0];
    const routePath = `${targetId}/distance`;
    const queryParams = {
      to: id
    };
    this.app.getManager("router")?.navigate(queryParams, routePath, {
      keepTime: true
    });
  }
  setBetweenOffsetVars(offsetX, offsetY) {
    const {
      x: previousOffsetX,
      y: previousOffsetY
    } = this._currBetweenOffset;
    if (offsetX === previousOffsetX && offsetY === previousOffsetY) return;
    this._currBetweenOffset = {
      x: offsetX,
      y: offsetY
    };
    const betweenElement = this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv();
    betweenElement.style.setProperty("--icon-offset-x", `${offsetX}px`);
    betweenElement.style.setProperty("--icon-offset-y", `${offsetY}px`);
  }
  getAccurateRadius(entity, reverseDirection = false) {
    const groundDirection = Pioneer.Vector3.pool.get();
    const groundNormal = Pioneer.Vector3.pool.get();
    reverseDirection ? groundDirection.neg(this.distanceInfo.sourceTargetDiff) : groundDirection.copy(this.distanceInfo.sourceTargetDiff);
    groundDirection.rotateInverse(entity.getOrientation(), groundDirection);
    let foundGround = false;
    for (let componentIndex = entity.getNumComponents() - 1; componentIndex >= 0; componentIndex--) {
      const component = entity.getComponentAt(componentIndex);
      if (void 0 !== component.getGroundPosition) {
        component.getGroundPosition(groundDirection, groundNormal, groundDirection);
        foundGround = true;
        break;
      }
    }
    const accurateRadius = foundGround ? groundDirection.magnitude() : null;
    Pioneer.Vector3.pool.release(groundDirection);
    Pioneer.Vector3.pool.release(groundNormal);
    return accurateRadius;
  }
  measureDistance(forceUpdate = false, ephemerisTime = void 0) {
    const {
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity,
      measurePoint: targetMeasurePoint
    } = this.targetDistanceEntities[0] || {};
    if (!entity || !targetEntity) return null;
    if (this.setDistanceInfo(ephemerisTime), !this.distanceIsValid(this.centerDistance)) return null;
    const sourceAdjustable = measurePoint.radius > .01 && measurePoint.radius / this.centerDistance > .001;
    const targetAdjustable = targetMeasurePoint.radius > .01 && targetMeasurePoint.radius / this.centerDistance > .001;
    const sourceAdjustabilityChanged = this.setMPAdjustable(this.sourceDistanceEntity, sourceAdjustable);
    const targetAdjustabilityChanged = this.setMPAdjustable(this.targetDistanceEntities[0], targetAdjustable);
    const {
      sourceMpPosChanged: sourceMpPosChanged,
      targetMpPosChanged: targetMpPosChanged
    } = this.calcMPPositions();
    let measurePointsChanged = false;
    if (forceUpdate || sourceAdjustabilityChanged || sourceMpPosChanged) {
      const {
        position: position
      } = this.sourceDistanceEntity.measurePoint;
      this.distancePanel.setSourceMpState(sourceAdjustable && position);
      measurePointsChanged = true;
      this._distanceLine?.setSourceMeasurePoint(sourceAdjustable && position);
    }
    if (forceUpdate || targetAdjustabilityChanged || targetMpPosChanged) {
      const {
        position: position
      } = this.targetDistanceEntities[0].measurePoint;
      this.distancePanel.setTargetMpState(targetAdjustable && position);
      measurePointsChanged = true;
      this._distanceLine?.setTargetMeasurePoint(targetAdjustable && position);
    }
    const sourceAtSurface = measurePoint.adjustable && measurePoint.position === SURFACE_MEASURE_POINT;
    const targetAtSurface = targetMeasurePoint.adjustable && targetMeasurePoint.position === SURFACE_MEASURE_POINT;
    if (sourceAtSurface) {
      const sourceRadius = this.getAccurateRadius(entity);
      sourceRadius && (this.sourceDistanceEntity.measurePoint.radius = sourceRadius);
      this.distanceInfo.measuredValue -= measurePoint.radius;
    }
    if (targetAtSurface) {
      const targetRadius = this.getAccurateRadius(targetEntity, true);
      targetRadius && (this.targetDistanceEntities[0].measurePoint.radius = targetRadius);
      this.distanceInfo.measuredValue -= targetMeasurePoint.radius;
    }
    if (measurePointsChanged && this.onNewULimit(), this._distanceLine?.setDistanceProps({
      distance: this.centerDistance,
      sourceRadius: measurePoint.radius,
      targetRadius: targetMeasurePoint.radius
    }), !this.distanceIsValid(this.measuredDistance)) return null;
    const isBelowZero = this.measuredDistance < 0;
    this._isBelowZero !== isBelowZero && (this.setBetweenPosHidden(isBelowZero), this._distanceLine.setRenderingEnabled(!isBelowZero), this._isBelowZero = isBelowZero);
    return this._getDistanceParams(this.measuredDistance);
  }
  _getDistanceParams(distanceKilometers) {
    const imperial = this._currentUnitSystem === IMPERIAL_UNITS;
    const kilometersPerLightYear = 9460730472580.8;
    const billion = 1e9;
    const million = 1e6;
    const {
      kmToMi: kmToMi,
      miToFt: miToFt,
      kmToM: kmToM
    } = conversionTable;
    let convertedDistance = imperial ? distanceKilometers * kmToMi : distanceKilometers;
    convertedDistance = Math.max(0, convertedDistance);
    let displayValue = convertedDistance;
    let prefix = "";
    let scale = "";
    let unit = imperial ? "mi" : "km";
    const actualDistanceValue = convertedDistance;
    distanceKilometers >= kilometersPerLightYear ? (displayValue = distanceKilometers / kilometersPerLightYear, unit = "light years") : convertedDistance >= billion ? (displayValue = convertedDistance / billion, scale = "billion") : convertedDistance >= million ? (displayValue = convertedDistance / million, scale = "million") : convertedDistance >= 1e3 ? (displayValue = convertedDistance / 1e3, scale = "thousand") : convertedDistance < 1 && (prefix = "~ ", displayValue = imperial ? convertedDistance * miToFt : convertedDistance * kmToM, unit = imperial ? "ft" : "m");
    const precisionParts = displayValue.toPrecision(4).split(".");
    return {
      prefix: prefix,
      value: displayValue,
      scale: scale,
      unit: unit,
      dps: precisionParts.length > 1 && precisionParts[1].length > 1 ? 2 : 1,
      actualDistanceValue: actualDistanceValue
    };
  }
  measureRelativeVelocity(ephemerisTime) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity
    } = this.targetDistanceEntities[0] || {};
    if (!entity || !targetEntity) return null;
    const relativeVelocity = Pioneer.Vector3.pool.get();
    entity.getVelocityRelativeToEntity(relativeVelocity, Pioneer.Vector3.Zero, targetEntity, ephemerisTime);
    const velocityParams = this._getDistanceParams(3600 * relativeVelocity.magnitude());
    velocityParams.unit += "/hr";
    Pioneer.Vector3.pool.release(relativeVelocity);
    return velocityParams;
  }
  _createDistanceEntity(entityId) {
    const entityInfo = this.app.getManager("content").getEntityInfo(entityId);
    const entity = this.app.scene.getEntity(entityId);
    if (null === entityInfo || !entity) throw Error(`DistanceView._createDistanceEntity: Cannot find entity ${entityId}.`);
    const measurePoint = {
      adjustable: false,
      position: DEFAULT_MEASURE_POINT,
      radius: entity.getExtentsRadius()
    };
    return {
      id: entityId,
      entity: entity,
      info: entityInfo,
      measurePoint: measurePoint
    };
  }
  _createBetweenEntity() {
    const labelManager = this.app.getManager("label");
    const betweenEntityId = "distance_betweenPos";
    const betweenEntity = SolarSystemSceneExports.Entity.createFromOptions(betweenEntityId, {
      parents: [],
      label: "~"
    }, this.app.scene);
    betweenEntity.setPosition(Pioneer.Vector3.Zero);
    betweenEntity.setOrientation(Pioneer.Quaternion.Identity);
    betweenEntity.setOcclusionRadius(.001);
    betweenEntity.setExtentsRadius(.001);
    labelManager.addLabel(betweenEntity);
    labelManager.setLabelProps({
      getLabelClass: () => "no-select distance-between-pos"
    }, [betweenEntityId]);
    labelManager.setLabelClickable(betweenEntityId, false);
    this.setLabelWeight(betweenEntityId, false, "201");
    return betweenEntity;
  }
  setBetweenEntityParent(parentEntity) {
    this._betweenPosEntity.setParent(parentEntity);
    this._bpParentIsSource = parentEntity === this.sourceDistanceEntity?.entity;
  }
  toggleBetweenParent(interpolationU) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity
    } = this.targetDistanceEntities[0] || {};
    const newParent = this._bpParentIsSource ? targetEntity : entity;
    this.setBetweenEntityParent(newParent);
    this.setDistanceInfo();
    this.updateBetweenPoint(1 - interpolationU);
  }
  setHoldU(uValueHold) {
    this._uValueHold = uValueHold;
  }
  updateBetweenPoint(requestedU, applyLimit = true) {
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (!this.hasTarget || null === sourceTargetDiff) return;
    const heldU = null !== this._uValueHold ? this.getOffsetU(this._uValueHold) : null;
    const defaultU = this._bpParentIsSource ? 0 : 1;
    let uValueCurrent = requestedU ?? heldU ?? this._uValueCurrent ?? defaultU;
    const {
      limitedU: limitedU
    } = this.getLimitedU(uValueCurrent);
    applyLimit && (uValueCurrent = limitedU);
    this.setBpControllerMults(uValueCurrent);
    const graphicInterpolation = this.getInterpolationU(uValueCurrent);
    this.distancePanel.setLineGraphicDotPos(graphicInterpolation);
    this._uValueCurrent !== uValueCurrent && (this._uValueCurrent = uValueCurrent);
  }
  setBpControllerMults(interpolationU) {
    const {
      id: id
    } = this.sourceDistanceEntity || {};
    const {
      id: targetId
    } = this.targetDistanceEntities[0] || {};
    const inverseU = 1 - interpolationU;
    const sourceMultiplier = this._bpParentIsSource ? inverseU : interpolationU;
    const targetMultiplier = this._bpParentIsSource ? interpolationU : inverseU;
    const sourceContribution = this._bpController._entities.get(id);
    const targetContribution = this._bpController._entities.get(targetId);
    sourceContribution && targetContribution && (sourceContribution.mult = sourceMultiplier, targetContribution.mult = targetMultiplier);
  }
  resetUValue() {
    this._uValueCurrent = null;
  }
  resetAreRelated() {
    this._areRelated = null;
  }
  resetDistanceInfo() {
    this.distanceInfo = {
      centerValue: null,
      measuredValue: null,
      sourceTargetDiff: null
    };
  }
  setBetweenPosHidden(hidden) {
    const betweenElement = this._betweenPosEntity?.getComponent(Pioneer.DivComponent).getDiv();
    betweenElement.classList.toggle("hide", hidden);
  }
  toggleCurrentUnitSystem() {
    const nextUnitSystem = this._currentUnitSystem === METRIC_UNITS ? IMPERIAL_UNITS : METRIC_UNITS;
    this._currentUnitSystem = nextUnitSystem;
  }
  setMPPosition(distanceEntity, position = DEFAULT_MEASURE_POINT) {
    const {
      measurePoint: measurePoint
    } = distanceEntity || {};
    const changed = measurePoint?.position !== position;
    changed && (measurePoint.position = position);
    return changed;
  }
  setMPAdjustable(distanceEntity, adjustable) {
    const {
      measurePoint: measurePoint
    } = distanceEntity || {};
    const changed = measurePoint?.adjustable !== adjustable;
    changed && (measurePoint.adjustable = adjustable);
    return changed;
  }
  toggleSourceMeasurePoint() {
    const {
      adjustable: adjustable,
      position: position
    } = this.sourceDistanceEntity?.measurePoint || {};
    if (!adjustable) return;
    const nextPosition = position === CENTER_MEASURE_POINT ? SURFACE_MEASURE_POINT : CENTER_MEASURE_POINT;
    this.setMPPosition(this.sourceDistanceEntity, nextPosition);
    this.updateMeasurement(null, true);
  }
  toggleTargetMeasurePoint() {
    const {
      adjustable: adjustable,
      position: position
    } = this.targetDistanceEntities[0]?.measurePoint || {};
    if (!adjustable) return;
    const nextPosition = position === CENTER_MEASURE_POINT ? SURFACE_MEASURE_POINT : CENTER_MEASURE_POINT;
    this.setMPPosition(this.targetDistanceEntities[0], nextPosition);
    this.updateMeasurement(null, true);
  }
  setSourceDistanceEntity(entityId) {
    this.resetSourceDistanceEntity();
    this._sourceDistanceEntity = this._createDistanceEntity(entityId);
    const {
      entity: entity,
      id: id
    } = this.sourceDistanceEntity || {};
    this._distanceLine = entity && entity.addComponent(Eyes.DistanceLineComponent, "distance_line");
    this.setBetweenEntityParent(entity);
    this.distancePanel.setSourceText(this.sourceDisplayName);
    this.distancePanel.targetSearch?.setExcludeResults([id]);
    this.toggleSourceIconClass("distance-source", true);
    this.setLabelWeight(id);
    entity && this.setOcclusionRadius(entity);
    this._bpController.addEntity(id, 1, 0);
    null === this._uValueHold && this.setHoldU(0);
  }
  setTargetDistanceEntities(entityIds) {
    this.resetTargetDistanceEntities();
    entityIds.forEach(entityId => this.addTargetDistanceEntity(entityId));
    const hasTarget = Boolean(this.targetDistanceEntities.length);
    if (hasTarget) {
      const {
        id: id,
        entity: entity
      } = this.targetDistanceEntities[0] || {};
      const {
        entity: sourceEntity
      } = this.sourceDistanceEntity || {};
      this.setHasTarget(hasTarget);
      this.hideSpacecraftLayer();
      this.setBetweenEntityParent(sourceEntity);
      this.distancePanel.setTargetText(this.targetDisplayNames[0]);
      this.distancePanel.sourceSearch?.setExcludeResults([id]);
      this.distancePanel.setResult({
        text: ""
      });
      this.toggleTargetIconClass("distance-target", true);
      this.setLabelWeight(id);
      entity && this.setOcclusionRadius(entity);
      this._distanceLine.setTargetEntity(entity);
      this._bpController.addEntity(id, 0, 0);
      null === this._uValueHold && this.setHoldU(0);
    } else this.resetUValue();
  }
  async setTempErrorResult(errorText) {
    this.distancePanel.setResult({
      text: errorText
    });
    return new Promise(resolveTimeout => {
      this.errorResultTimeout = setTimeout(() => {
        this.distancePanel.setResult();
        resolveTimeout();
      }, 3e3);
    });
  }
  setLabelWeight(entityId, reset = false, requestedWeight) {
    if (!entityId) return;
    if (null === this.app.scene.getEntity(entityId)) return;
    const weight = requestedWeight ?? "200";
    const labelManager = this.app.getManager("label");
    const defaultWeight = labelManager.getDefaultWeight(entityId);
    0 === defaultWeight && (labelManager._weights[entityId] = {});
    reset ? this._prevValues.weights[entityId] && labelManager.setWeight(entityId, this._prevValues.weights[entityId]) : (labelManager.setWeight(entityId, weight), this._prevValues.weights[entityId] = defaultWeight);
  }
  setOcclusionRadius(entity, reset = false) {
    const entityId = entity.getName();
    const occlusionRadius = entity.getOcclusionRadius();
    reset ? this._prevValues.occRadii[entityId] && entity.setOcclusionRadius(this._prevValues.occRadii[entityId]) : (entity.setOcclusionRadius(0), this._prevValues.occRadii[entityId] = occlusionRadius);
  }
  setBetweenIntersectClass(intersects) {
    this._betweenPosEntity?.getComponent(Pioneer.DivComponent)?.getDiv()?.classList?.toggle("intersect", intersects);
  }
  toggleSourceIconClass(className, enabled) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    if (!entity) return;
    const divComponent = entity?.getComponent(Pioneer.DivComponent);
    const iconElement = divComponent?.getDiv()?.firstChild;
    iconElement && iconElement.classList.toggle(className, enabled);
  }
  toggleTargetIconClass(className, enabled) {
    const {
      entity: entity
    } = this.targetDistanceEntities[0] || {};
    if (!entity) return;
    const divComponent = entity?.getComponent(Pioneer.DivComponent);
    const iconElement = divComponent?.getDiv()?.firstChild;
    iconElement && iconElement.classList.toggle(className, enabled);
  }
  calcMPPositions() {
    if (!this.hasTarget) return;
    const {
      id: id,
      entity: entity,
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      id: targetId,
      entity: targetEntity,
      measurePoint: targetMeasurePoint
    } = this.targetDistanceEntities[0] || {};
    const areRelated = entity?.getParent()?.getName() === targetId || targetEntity?.getParent()?.getName() === id;
    const relationshipChanged = this._areRelated !== areRelated;
    const areClose = measurePoint.radius / this.measuredDistance < .01 || targetMeasurePoint.radius / this.measuredDistance < .01;
    const proximityChanged = this._areClose !== areClose;
    const changedPositions = {
      sourceMpPosChanged: false,
      targetMpPosChanged: false
    };
    if (relationshipChanged || proximityChanged) {
      const sourceUseSurface = measurePoint.adjustable && (areRelated || areClose);
      const targetUseSurface = targetMeasurePoint.adjustable && (areRelated || areClose);
      const sourcePosition = sourceUseSurface ? SURFACE_MEASURE_POINT : DEFAULT_MEASURE_POINT;
      const targetPosition = targetUseSurface ? SURFACE_MEASURE_POINT : DEFAULT_MEASURE_POINT;
      changedPositions.sourceMpPosChanged = this.setMPPosition(this.sourceDistanceEntity, sourcePosition);
      changedPositions.targetMpPosChanged = this.setMPPosition(this.targetDistanceEntities[0], targetPosition);
      this._areRelated = areRelated;
      this._areClose = areClose;
    }
    return changedPositions;
  }
  resetSourceDistanceEntity() {
    const {
      entity: entity,
      id: id
    } = this.sourceDistanceEntity || {};
    entity && entity.removeComponent("distance_line");
    this.resetAreRelated();
    1 === this._uValueHold && this.setHoldU(null);
    this._bpController.removeEntity(id);
    this.toggleSourceIconClass("distance-source", false);
    this.setLabelWeight(id, true);
    entity && this.setOcclusionRadius(entity, true);
    this._sourceDistanceEntity = null;
    this.distancePanel.setSourceText("");
    this.distancePanel.setSourceMpState("");
    this.distancePanel.targetSearch?.setExcludeResults([]);
    this.resetDistanceInfo();
  }
  addTargetDistanceEntity(entityId) {
    this.targetDistanceEntities.find(({
      id: id
    }) => id === entityId) && console.error(`DistanceManager.addTargetDistanceEntity: The entity, '${entityId}', is already a target.`);
    const distanceEntity = this._createDistanceEntity(entityId);
    this._targetDistanceEntities.push(distanceEntity);
  }
  resetTargetDistanceEntities() {
    const {
      entity: entity,
      id: id
    } = this._targetDistanceEntities[0] || {};
    this.resetAreRelated();
    1 === this._uValueHold && this.setHoldU(null);
    this._bpController.removeEntity(id);
    this.toggleTargetIconClass("distance-target", false);
    this.setLabelWeight(id, true);
    entity && this.setOcclusionRadius(entity, true);
    this._targetDistanceEntities = [];
    this.setHasTarget(false);
    this.distancePanel.setTargetText("");
    this.distancePanel.setTargetMpState("");
    this.distancePanel.setResult();
    this.distancePanel.setSourceMpState("");
    this.distancePanel.sourceSearch?.setExcludeResults([]);
    this._distanceLine?.setTargetEntity(null);
    this.resetDistanceInfo();
    this.showSpacecraftLayer();
  }
  valuesWithPrecisionAreEqual(leftValue, rightValue, precision = 5) {
    return null != leftValue && null != rightValue && (null == precision ? leftValue === rightValue : leftValue.toPrecision(precision) === rightValue.toPrecision(precision));
  }
  resetAllDistanceEntities() {
    this.resetSourceDistanceEntity();
    this.resetTargetDistanceEntities();
  }
  setHasTarget(hasTarget) {
    this.hasTarget = hasTarget;
    this.distancePanel.setCanMinimize(this.hasTarget);
    this.distancePanel.setSwapButtonVisible(this.hasTarget);
  }
  setAllowRaycasting(allowRaycasting) {
    this._allowRaycasting = allowRaycasting;
  }
  setAllowPlay(allowPlay) {
    this._allowPlay = allowPlay;
  }
  setIsTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }
  setIsWaitingForEntities(isWaitingForEntities) {
    this._isWaitingForEntities = isWaitingForEntities;
  }
  getEntitiesToLoad() {
    const entityIds = [];
    this.sourceDistanceEntity?.id && entityIds.push(this.sourceDistanceEntity.id);
    this.targetDistanceEntities.length && entityIds.push(...this.targetDistanceEntities.map(({
      id: id
    }) => id));
    return entityIds;
  }
  setDistanceInfo(ephemerisTime) {
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this._vectors;
    const relativeEntity = this._bpParentIsSource ? entity : targetEntity;
    (this._bpParentIsSource ? targetEntity : entity).getPositionRelativeToEntity(sourceTargetDiff, Pioneer.Vector3.Zero, relativeEntity, ephemerisTime);
    const centerDistance = sourceTargetDiff.magnitude();
    this.distanceIsValid(centerDistance) && this.distanceInfo.value !== centerDistance && (this.distanceInfo.measuredValue = centerDistance, this.distanceInfo.centerValue = centerDistance, this.distanceInfo.sourceTargetDiff = sourceTargetDiff);
  }
  isCloseEnough() {
    const {
      measurePoint: measurePoint
    } = this.sourceDistanceEntity;
    const {
      measurePoint: targetMeasurePoint
    } = this.targetDistanceEntities[0];
    if (this.distanceIsValid(this.measuredDistance)) {
      const radiusDistanceRatio = Math.max(measurePoint.radius, targetMeasurePoint.radius) / this.measuredDistance;
      const cameraDistanceRatio = this.app.getManager("camera").cameraEntity.getPosition().magnitude() / this.centerDistance;
      return cameraDistanceRatio < 5 && (cameraDistanceRatio < .5 || radiusDistanceRatio > 1);
    }
    return true;
  }
  updateMeasurement(time, forceUpdate = false) {
    const currentSecond = time && parseInt(.001 * time.valueOf());
    const sameSecond = time && currentSecond === this._currentSecond;
    if (!forceUpdate && (!this.hasTarget || this._isWaitingForEntities || sameSecond && !this.isCloseEnough())) return false;
    time && (this._currentSecond = currentSecond);
    const {
      prefix: prefix,
      value: distanceValue = null,
      scale: scale,
      unit: unit,
      dps: dps,
      actualDistanceValue: actualDistanceValue
    } = this.measureDistance(forceUpdate) || {};
    const {
      prefix: velocityPrefix,
      value: velocityValue = null,
      scale: velocityScale,
      unit: velocityUnit,
      dps: velocityDecimals
    } = this.measureRelativeVelocity() || {};
    if (null === distanceValue) return false;
    const distanceText = this._formatText(prefix, distanceValue, scale, unit, dps);
    const velocityText = this._formatText(velocityPrefix, velocityValue, velocityScale, velocityUnit.split("/")[0], velocityDecimals);
    const {
      resultText: resultText,
      resultUnit: resultUnit,
      relVelocityText: relVelocityText,
      relVelocityUnit: relVelocityUnit
    } = this.distancePanel._state;
    distanceText === resultText && unit === resultUnit && velocityText === relVelocityText && velocityUnit === relVelocityUnit || this.distancePanel.setResult({
      text: distanceText,
      unit: unit,
      isDistance: true,
      relText: velocityText,
      relUnit: velocityUnit,
      isRelVelocity: true
    });
    const {
      kmToMi: kmToMi
    } = conversionTable;
    const {
      timeHours: timeHours,
      timeMin: timeMin,
      timeSec: timeSec,
      timeMillisec: timeMillisec
    } = this.calculateLightTime("km" === unit ? actualDistanceValue : actualDistanceValue / kmToMi);
    let lightTimeText = null;
    lightTimeText = timeHours > 9 ? `${timeHours} hr` : timeHours > 0 ? `${timeHours} hr ${timeMin.toString().padStart(2, "0")} min` : timeMin > 0 ? `${timeMin} min ${timeSec.toString().padStart(2, "0")} sec` : timeSec > 5 ? `${timeSec} sec` : timeSec > 0 ? `${timeSec} sec ${timeMillisec.toFixed(0)} ms` : `${timeMillisec.toFixed(2)} ms`;
    this.distancePanel.setLightTime(lightTimeText);
    return true;
  }
  calculateLightTime(distanceKilometers) {
    const fractionalHours = distanceKilometers / 299792.458 / 3600;
    const hours = Math.floor(fractionalHours);
    const fractionalMinutes = 60 * (fractionalHours - hours);
    const minutes = Math.floor(fractionalMinutes);
    const fractionalSeconds = 60 * (fractionalMinutes - minutes);
    const seconds = Math.floor(fractionalSeconds);
    return {
      timeHours: hours,
      timeMin: minutes,
      timeSec: seconds,
      timeMillisec: 1e3 * (fractionalSeconds - seconds)
    };
  }
  _formatText(prefix, value, scale, unit, decimalPlaces) {
    return `${prefix}${formatNumber(value, "m" === unit || "ft" === unit ? 0 : decimalPlaces, "m" === unit || "ft" === unit ? 0 : decimalPlaces)} ${scale}`;
  }
  calcIntersect() {
    if (!this._allowRaycasting) return null;
    const {
      entity: entity
    } = this.sourceDistanceEntity || {};
    const {
      entity: targetEntity
    } = this.targetDistanceEntities[0] || {};
    const {
      sourceTargetDiff: sourceTargetDiff
    } = this.distanceInfo;
    if (!entity || !targetEntity || sourceTargetDiff.isNaN()) return null;
    const input = this.app.pioneer.getInput();
    const viewport = input.getActiveViewport();
    const cursorPosition = input.getCursorPosition();
    const cameraComponent = viewport.getCamera();
    const parentEntity = this._bpParentIsSource ? entity : targetEntity;
    const otherEntity = this._bpParentIsSource ? targetEntity : entity;
    const {
      rayDirection: rayDirection,
      parentEntityPosition: parentEntityPosition,
      otherEntityPosition: otherEntityPosition,
      planeNormal: planeNormal,
      intersectionPoint: intersectionPoint,
      intersectToSource: intersectToSource,
      closestPointOnLine: closestPointOnLine
    } = this._vectors;
    viewport.getNormalSpacePositionFromPixelSpacePosition(rayDirection, cursorPosition);
    cameraComponent.getCameraSpacePositionFromNormalSpacePosition(rayDirection, rayDirection);
    rayDirection.normalize(rayDirection);
    parentEntityPosition.copy(parentEntity.getCameraSpacePosition(cameraComponent));
    otherEntityPosition.copy(otherEntity.getCameraSpacePosition(cameraComponent));
    const parentCameraDistance = parentEntityPosition.magnitude();
    const otherCameraDistance = otherEntityPosition.magnitude();
    const lineLength = sourceTargetDiff.magnitude();
    let parentHitRadius = viewport.getNormalSpaceRadiusFromPixelSpaceRadius(80);
    let otherHitRadius = parentHitRadius;
    parentHitRadius = cameraComponent.getRadiusFromNormalSpaceRadius(parentHitRadius, parentCameraDistance);
    otherHitRadius = cameraComponent.getRadiusFromNormalSpaceRadius(otherHitRadius, otherCameraDistance);
    planeNormal.cross(sourceTargetDiff, rayDirection);
    planeNormal.cross(planeNormal, sourceTargetDiff);
    planeNormal.normalize(planeNormal);
    const rayDistance = parentEntityPosition.dot(planeNormal) / planeNormal.dot(rayDirection);
    if (rayDistance < 0) return null;
    intersectionPoint.copy(rayDirection);
    intersectionPoint.mult(intersectionPoint, rayDistance);
    intersectToSource.sub(intersectionPoint, parentEntityPosition);
    const interpolationU = intersectToSource.dot(sourceTargetDiff) / Math.pow(lineLength, 2);
    if (interpolationU > 1 || interpolationU < 0) return null;
    closestPointOnLine.lerp(parentEntityPosition, otherEntityPosition, interpolationU);
    const distanceFromLine = intersectionPoint.distance(closestPointOnLine);
    const hitRadius = parentHitRadius + interpolationU * (otherHitRadius - parentHitRadius);
    if (distanceFromLine < -hitRadius || distanceFromLine > hitRadius) return null;
    const limitedU = this.getLimitedU(interpolationU).limitedU;
    closestPointOnLine.lerp(parentEntityPosition, otherEntityPosition, limitedU);
    return {
      u: interpolationU,
      linePoint: closestPointOnLine
    };
  }
  getLimitedU(interpolationU) {
    const {
      measurePoint: measurePoint
    } = this.sourceDistanceEntity || {};
    const {
      measurePoint: targetMeasurePoint
    } = this.targetDistanceEntities[0] || {};
    const limits = {
      limitedU: 0,
      minSurfaceU: 0,
      maxSurfaceU: 1
    };
    if (null == measurePoint || null == targetMeasurePoint) return limits;
    const sourceRadiusU = Math.min(measurePoint.radius / this.centerDistance, 1);
    const targetRadiusU = Math.min(targetMeasurePoint.radius / this.centerDistance, 1);
    const sourceSurfaceU = measurePoint.position === SURFACE_MEASURE_POINT ? sourceRadiusU : 0;
    const targetSurfaceU = targetMeasurePoint.position === SURFACE_MEASURE_POINT ? targetRadiusU : 0;
    const minimumSurfaceU = this._bpParentIsSource ? sourceSurfaceU : targetSurfaceU;
    const maximumSurfaceU = 1 - (this._bpParentIsSource ? targetSurfaceU : sourceSurfaceU);
    const minimumRadiusU = this._bpParentIsSource ? sourceRadiusU : targetRadiusU;
    const maximumRadiusU = 1 - (this._bpParentIsSource ? targetRadiusU : sourceRadiusU);
    limits.limitedU = Math.min(maximumSurfaceU, Math.max(minimumSurfaceU, interpolationU));
    limits.minSurfaceU = minimumSurfaceU;
    limits.maxSurfaceU = maximumSurfaceU;
    limits.minRadiusU = minimumRadiusU;
    limits.maxRadiusU = maximumRadiusU;
    return limits;
  }
  _grabVectors() {
    const {
      pool: pool
    } = Pioneer.Vector3;
    const {
      pool: pixelPointPool
    } = Pioneer.Vector3;
    this._vectors = {
      rayDirection: pool.get(),
      parentEntityPosition: pool.get(),
      otherEntityPosition: pool.get(),
      planeNormal: pool.get(),
      intersectionPoint: pool.get(),
      intersectToSource: pool.get(),
      closestPointOnLine: pool.get(),
      sourceTargetDiff: pool.get(),
      normalSpacePoint: pool.get(),
      pixelSpacePoint: pixelPointPool.get()
    };
  }
  _releaseVectors() {
    for (const pooledVector of Object.values(this._vectors)) Pioneer.Vector3.pool.release(pooledVector);
  }
  update(time) {
    const input = this.app.pioneer.getInput();
    const isDragging = !input.getDraggedOffset().isZero();
    const isZooming = Math.abs(input.getZoomedOffset()) > 0;
    const isAnimating = null !== this._bpAnimation || this._isTransitioning;
    const isWaitingForEntities = this._isWaitingForEntities;
    const allowRaycasting = !isWaitingForEntities && !isAnimating && !(isDragging || isZooming);
    const allowPointUpdate = !isWaitingForEntities && !isAnimating;
    const hasPointAnimation = null !== this._bpAnimation;
    const allowIconOffset = this.distancePanel.allowBpOffset;
    const resetIconOffset = null === this.intersect || isDragging || isZooming;
    this.setAllowRaycasting(allowRaycasting);
    resetIconOffset && this.setBetweenOffsetVars(0, 0);
    allowPointUpdate && this.updateBetweenPoint();
    hasPointAnimation && this._updateBpAnimation();
    allowIconOffset && this.distancePanel.setBpCSSOffsets();
    this._updateTooltip();
    !isWaitingForEntities && this.updateMeasurement(time);
  }
  distanceIsValid(distance) {
    return "number" == typeof distance && !isNaN(distance) && null != distance && distance !== 1 / 0;
  }
  get centerDistance() {
    return this.distanceInfo.centerValue;
  }
  get measuredDistance() {
    return this.distanceInfo.measuredValue;
  }
  get sourceDisplayName() {
    const {
      info: info
    } = this.sourceDistanceEntity || {};
    return info?.displayName || info?.iauName;
  }
  get targetDisplayNames() {
    return this.targetDistanceEntities.map(({
      info: info
    }) => info.displayName || info.iauName);
  }
  get targetDistanceEntities() {
    return this._targetDistanceEntities;
  }
  get sourceDistanceEntity() {
    return this._sourceDistanceEntity;
  }
}
export { DistanceManager };
