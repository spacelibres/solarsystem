// Recovered from app.js:1307039-1318432.
/* 跟随模式临时拥有标签权重、点击状态、遮挡与时间范围，停用时按 _prevValues 还原并断开 DOM 观察器。目标和跟随实体的覆盖区间先求交集，ET 转 Moment 后再比较；相机角度限制均为弧度。异步资源就绪后仍检查启用状态，搜索隐藏 timeout 由独立停止方法清理；相机完成后的播放/恢复顺序保持原契约。 */
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import FollowName from "../../vendor/modules/FollowName.cjs";
var getFollowName = () => FollowName;
class CameraFollowManager extends EyesPublicApi.BaseManager {
  constructor(app, options = {}) {
    super(app);
    this._options = {
      placeholder: "Search target to follow...",
      maxFeatured: 5,
      hideSearchDelay: 1e3,
      cameraDuration: 1.5,
      ...options
    };
    this._isEnabled = null;
    this.followId = null;
    this.followName = null;
    this.optionElement = null;
    this.search = null;
    this._returnToPreviousCamView = null;
    this._hideSearchTimeout = null;
    this._prevValues = {
      weights: {},
      occRadii: {},
      labelsClickable: {},
      occlusion: {},
      timeLimits: {
        min: null,
        max: null
      }
    };
    this._resizeObserver = new ResizeObserver(() => {
      this.setYawPitchLimits();
    });
    this._offsetObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        "class" === mutation.attributeName && this.setYawPitchLimits();
      });
    });
    this._sumParent = this._createSumParent();
    this._createReframeElement();
    this._eventNames.push("cameraFollowStart", "cameraFollowStop", "cameraFollowUndo", "cameraFollowSelect");
    this._initCallbacks();
    this.bindFunctions(["update", "setSearchOptions", "updateOccludedEntities"]);
    this.pioneer.addCallback(this.update, true);
    const routerManager = this.app.getManager("router");
    routerManager.setValidQueries([...routerManager.getValidQueries(), "followId"]);
  }
  setFollowVars(followId) {
    const contentManager = this.app.getManager("content");
    const {
      input: input
    } = this.search?._children || {};
    const {
      altName: altName,
      displayName: displayName,
      iauName: iauName
    } = contentManager.getEntityInfo(followId) ?? {};
    const followName = altName || displayName || iauName || "";
    input && (input.value = followName);
    this.followId = followId;
    this.followEntity = followId ? this.app.scene.getEntity(followId) : null;
    this.followName = followName;
  }
  setToastContent({
    reset = false
  } = {}) {
    const toastComponent = this.app.getComponent("toast");
    if (reset) {
      toastComponent.hide();
      return void toastComponent.setContent("");
    }
    const toastMessage = `Camera is following ${["Sun", "Moon", "ISS"].includes(this.followName) ? "the " : ""}${this.followName}`;
    toastComponent.setContent(toastMessage, '<button class="clickable undo" aria-label="Undo camera follow">Undo</button>');
    const {
      toastContent: toastContent
    } = toastComponent._children;
    const undoButton = toastContent.querySelector("button");
    undoButton?.addEventListener("click", () => {
      this.triggerCallbacks("cameraFollowUndo", [this]);
    });
  }
  showToast() {
    this.app.getComponent("toast").show();
  }
  validateTimeLimits() {
    const timeManager = this.app.getManager("time");
    const currentTime = timeManager.getTime();
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      min: min,
      max: max
    } = this.targetEntity?.getPositionCoverage() || {};
    const {
      min: followCoverageStart,
      max: followCoverageEnd
    } = this.followEntity?.getPositionCoverage() || {};
    if (!(min && max && followCoverageStart && followCoverageEnd)) return {
      isValid: false
    };
    let targetStart = timeManager.etToMoment(min);
    let targetEnd = timeManager.etToMoment(max);
    let followStart = timeManager.etToMoment(followCoverageStart);
    let followEnd = timeManager.etToMoment(followCoverageEnd);
    targetStart = null == targetStart ? timeManager.getDefaultLimits().min : targetStart;
    targetEnd = null == targetEnd ? timeManager.getDefaultLimits().max : targetEnd;
    followStart = null == followStart ? timeManager.getDefaultLimits().min : followStart;
    followEnd = null == followEnd ? timeManager.getDefaultLimits().max : followEnd;
    if ("event" === currentView && this.app.getView("event")._eventName) {
      const {
        min: eventStart,
        max: eventEnd
      } = timeManager.getLimits() || {};
      targetStart = eventStart;
      targetEnd = eventEnd;
    }
    const overlapStart = getFollowName().max(followStart, targetStart);
    const overlapEnd = getFollowName().min(followEnd, targetEnd);
    if (followStart.valueOf() > targetEnd.valueOf() || followEnd.valueOf() < targetStart.valueOf()) {
      this.app.getComponent("clock")?.setLimitMessage(null, "Entity timelines do not overlap");
      this.setEnabled(false, {
        removeQueries: ["followId"]
      });
      return {
        isValid: false
      };
    }
    if (currentTime.valueOf() < followStart.valueOf() || currentTime.valueOf() > followEnd.valueOf()) {
      const timeUrl = timeManager.getTimeUrl(overlapStart);
      this.app.getManager("router").navigate({
        time: timeUrl
      });
    }
    return {
      isValid: true,
      minTime: overlapStart,
      maxTime: overlapEnd
    };
  }
  async follow(followId) {
    const {
      currentRoute: currentRoute,
      previousRoute: previousRoute
    } = this.app.getManager("router");
    const {
      params: params
    } = previousRoute || {};
    const {
      params: currentParams
    } = currentRoute || {};
    const {
      spaceObject: spaceObject
    } = params || {};
    const {
      spaceObject: currentSpaceObject
    } = currentParams || {};
    const {
      cameraDuration: cameraDuration
    } = this._options;
    this._isEnabled = true;
    !this.search && this.initSearch();
    this.followId && this.setLabelWeight(this.followId, true);
    spaceObject && spaceObject !== currentSpaceObject && this.setTargetNotClickable(spaceObject, true);
    this.app.getManager("scene").setEntitiesForceVisible([followId]);
    this.setFollowVars(followId);
    this.triggerCallbacks("cameraFollowSelect", [followId, this]);
    this.setToastContent();
    this._offsetObserver.observe(document.body, {
      attributes: true
    });
    this._resizeObserver.observe(document.body);
    await this.entitiesInPlace();
    const {
      isValid: isValid,
      minTime: minTime,
      maxTime: maxTime
    } = this.validateTimeLimits();
    if (!isValid || !this.isEnabled) return;
    this.setParentsChangedCallbacks();
    const startCameraTransition = () => {
      const timeManager = this.app.getManager("time");
      timeManager.pause();
      this.followName && this.showToast();
      this.animateCamera(cameraDuration).then(() => (timeManager.play(), !!this._isEnabled && (this.setTimeLimits({
        minTime: minTime,
        maxTime: maxTime
      }), this.setYawPitchLimits(), this.setLabelWeight(this.followId), this.updateOccludedEntities(), this.setTargetNotClickable(this.targetId), true))).catch(transitionError => transitionError);
    };
    const {
      isLoaded: isLoaded,
      onLoaded: onLoaded
    } = this.app.getComponent("cameraViewBlock");
    isLoaded ? startCameraTransition() : onLoaded.push(startCameraTransition);
  }
  unfollow() {
    const {
      previousRoute: previousRoute,
      currentView: currentView
    } = this.app.getManager("router");
    const {
      params: params
    } = previousRoute || {};
    const {
      spaceObject: spaceObject
    } = params || {};
    this.setToastContent({
      reset: true
    });
    this.setLabelWeight(this.followId, true);
    this.updateOccludedEntities({
      reset: true
    });
    this.setTargetNotClickable(spaceObject, true);
    const previousTarget = this.app.scene.getEntity(spaceObject);
    this.setParentsChangedCallbacks({
      targetEntity: previousTarget,
      reset: true
    });
    this.setFollowVars(null);
    this.setSearchOptions({
      reset: true
    });
    this._offsetObserver.disconnect();
    this._resizeObserver.disconnect();
  }
  animateCamera(duration) {
    this._sumParent.clearControllers();
    const targetRadius = this.targetEntity?.getExtentsRadius() || .1;
    const positionSumController = this._sumParent.addController(SolarSystemSceneExports.PositionSumController);
    positionSumController.addEntity(this.targetId, 1, 0);
    positionSumController.addEntity(this.followId, 0, -targetRadius);
    const alignController = this._sumParent.addController(Pioneer.AlignController);
    alignController.setPrimaryAlignType("point");
    alignController.setPrimaryAxis(Pioneer.Vector3.YAxis);
    alignController.setPrimaryTargetEntity(this.targetId);
    const transitionController = this._sumParent.addController(Pioneer.TransitionController);
    transitionController.setTransitionTime(duration);
    transitionController.setParent(this.targetId);
    const {
      _easeOutExpoTransition: _easeOutExpoTransition
    } = this.app.cameraScripts;
    transitionController.setTransitionFunction(_easeOutExpoTransition);
    return this.app.getManager("camera").followTheEntity(this.targetId, this.followId, this._sumParent.getName(), duration);
  }
  setParentsChangedCallbacks({
    targetEntity = this.targetEntity,
    reset = false
  } = {}) {
    if (reset) {
      targetEntity?.removeParentChangedCallback(this.updateOccludedEntities);
      return void this.followEntity?.removeParentChangedCallback(this.updateOccludedEntities);
    }
    targetEntity?.addParentChangedCallback(this.updateOccludedEntities);
    this.followEntity?.addParentChangedCallback(this.updateOccludedEntities);
  }
  setLabelWeight(entityId, reset = false, followWeight = "201") {
    if (!entityId) return;
    const labelManager = this.app.getManager("label");
    const defaultWeight = labelManager.getDefaultWeight(entityId);
    0 === defaultWeight && (labelManager._weights[entityId] = {});
    reset ? this._prevValues.weights[entityId] && (labelManager.setWeight(entityId, this._prevValues.weights[entityId]), delete this._prevValues.weights[entityId]) : (labelManager.setWeight(entityId, followWeight), this._prevValues.weights[entityId] = defaultWeight);
  }
  updateOccludedEntities({
    reset = false
  } = {}) {
    const unoccludedEntityIds = !reset && this.getEntitiesToUnocclude();
    this.setOcclusionProps(unoccludedEntityIds);
  }
  getEntitiesToUnocclude() {
    const entityIds = [this.followId];
    return [...new Set(entityIds)].filter(Boolean);
  }
  setOcclusionProps(entityIds) {
    const {
      occlusion: occlusion
    } = this._prevValues;
    Object.keys(occlusion).forEach(restoredEntityId => {
      const restoredEntity = this.app.scene.getEntity(restoredEntityId);
      restoredEntity?.setCanOcclude(occlusion[restoredEntityId]);
      restoredEntity?.getComponent(Pioneer.DivComponent).setCanBeOccluded(occlusion[restoredEntityId]);
    });
    this._prevValues.occlusion = {};
    entityIds?.length && entityIds.forEach(unoccludedEntityId => {
      const unoccludedEntity = this.app.scene.getEntity(unoccludedEntityId);
      unoccludedEntity && (this._prevValues.occlusion[unoccludedEntityId] = unoccludedEntity.canOcclude(), unoccludedEntity?.getComponent(Pioneer.DivComponent).setCanBeOccluded(false));
    });
  }
  setTargetNotClickable(entityId, reset = false) {
    const labelManager = this.app.getManager("label");
    const labelRecord = labelManager._labels[entityId];
    if (!labelRecord) return;
    const {
      labelsClickable: labelsClickable
    } = this._prevValues;
    reset ? void 0 !== labelsClickable[entityId] && (labelManager.setLabelClickable(entityId, labelsClickable[entityId]), delete labelsClickable[entityId]) : (labelsClickable[entityId] = labelRecord.isClickable, labelManager.setLabelClickable(entityId, false));
  }
  _createReframeElement() {
    const {
      staticElement: staticElement
    } = this.app;
    staticElement.querySelector(".follow-reframe") || (this._reframeElement = document.createElement("div"), this._reframeElement.classList.add("follow-reframe"), staticElement.appendChild(this._reframeElement));
  }
  _createSumParent() {
    const sumParent = SolarSystemSceneExports.Entity.createFromOptions("follow_sum_parent", {
      parents: []
    }, this.app.scene);
    sumParent.setPosition(Pioneer.Vector3.Zero);
    sumParent.setOrientation(Pioneer.Quaternion.Identity);
    return sumParent;
  }
  initSearch(searchParent) {
    if (!this.search) {
      this.search = this.app.getComponent("cameraFollowSearch");
      this.search.element.addEventListener("click", event => {
        event.stopPropagation();
      });
      const {
        placeholder: placeholder
      } = this._options;
      const {
        input: input
      } = this.search._children;
      input && input.setAttribute("placeholder", placeholder);
      const defaultInfoText = "related";
      this.search._config.infoText.default = defaultInfoText;
      this.search.setState({
        searchInfo: defaultInfoText
      });
      this.search.element.classList.add("camera-follow");
    }
    searchParent && (searchParent.appendChild(this.search.element), this.search.setParent(searchParent));
  }
  showSearch() {
    this.stopHideTimeout();
    this.search?.show();
    this.search?.open();
  }
  hideSearch() {
    this.search?.hide();
    this.search?.close();
  }
  setTimeLimits({
    minTime: minTime,
    maxTime: maxTime,
    reset = false
  } = {}) {
    const timeManager = this.app.getManager("time");
    if (reset) {
      const {
        min: min,
        max: max
      } = this._prevValues.timeLimits;
      null !== min && null !== max && (timeManager.setMin(min), timeManager.setMax(max));
    } else {
      const {
        min: min,
        max: max
      } = timeManager.getLimits();
      this._prevValues.timeLimits = {
        min: min,
        max: max
      };
      timeManager.setMin(minTime);
      timeManager.setMax(maxTime);
    }
  }
  setYawPitchLimits() {
    const offsetRight = document.body.classList.contains("offset-right");
    const offsetUp = document.body.classList.contains("offset-up");
    const cameraEntity = this.app.scene.getEntity("camera");
    const cameraComponent = cameraEntity.getComponent(Pioneer.CameraComponent);
    const horizontalFieldOfView = cameraComponent.getHorizontalFieldOfView();
    const verticalFieldOfView = cameraComponent.getVerticalFieldOfView();
    const orbitController = cameraEntity.getController(Pioneer.OrbitController);
    if (!orbitController) return;
    const yawOffset = offsetRight ? .05 * horizontalFieldOfView : 0;
    const pitchOffset = offsetUp ? .2 * verticalFieldOfView : 0;
    const centerYaw = -.5 * Math.PI;
    const yawHalfRange = .45 * horizontalFieldOfView;
    const pitchHalfRange = .4 * verticalFieldOfView;
    const minimumYaw = centerYaw - yawHalfRange + yawOffset;
    const maximumYaw = centerYaw + yawHalfRange - yawOffset;
    const minimumPitch = -pitchHalfRange + pitchOffset;
    const maximumPitch = pitchHalfRange - pitchOffset;
    orbitController.setYawAngleLimits(new Pioneer.Interval(minimumYaw, maximumYaw));
    orbitController.setPitchAngleLimits(new Pioneer.Interval(minimumPitch, maximumPitch));
  }
  async setSearchOptions({
    targetId = this.targetId,
    followId = this.followId,
    reset = false
  } = {}) {
    if (reset) return void this.search?.setExcludeResults([]);
    await this.entitiesInPlace();
    const excludedEntityIds = [targetId, followId].filter(Boolean);
    const {
      maxFeatured: maxFeatured
    } = this._options;
    const suggestionCandidates = [];
    const routerManager = this.app.getManager("router");
    let eventTargetId;
    if (routerManager && "event" === routerManager.currentView) {
      const eventId = routerManager.currentRoute.params.child;
      const eventInfo = this._app.getManager("content").events[eventId];
      eventTargetId = eventInfo?.target || void 0;
    }
    const timeManager = this.app.getManager("time");
    const currentTime = timeManager.getTime();
    const ephemerisTime = timeManager.momentToET(currentTime);
    const targetEntity = this.targetEntity || this.app.scene.getEntity(targetId);
    const commonAncestorId = this.followEntity ? targetEntity.getLowestCommonAncestorAtTime(this.followEntity, ephemerisTime)?.getName() : targetEntity.getParentAtTime(ephemerisTime);
    const contentManager = this.app.getManager("content");
    let ancestorFeaturedMoons = [];
    if ("sun" !== targetId) {
      const ancestorDescription = await contentManager.getEntityDesc(commonAncestorId).catch(() => ({}));
      ancestorDescription && ancestorDescription.featuredMoons && (ancestorFeaturedMoons = ancestorDescription.featuredMoons);
    }
    if (!excludedEntityIds.length || !this.isEnabled) return;
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      _entityDesc: _entityDesc,
      _eventDesc: _eventDesc
    } = this.app.getView(currentView);
    const {
      related: relatedEntities = []
    } = _entityDesc || {};
    const {
      related: relatedEvents = []
    } = _eventDesc || {};
    const {
      featuredMoons = []
    } = _entityDesc || {};
    suggestionCandidates.push(eventTargetId, commonAncestorId, ...relatedEvents, ...relatedEntities, ...featuredMoons, ...ancestorFeaturedMoons);
    "sun" !== targetId && suggestionCandidates.push("sun");
    const featuredSuggestions = [...new Set(suggestionCandidates)].filter(candidateId => ![targetId, followId].includes(candidateId)).slice(0, maxFeatured).map(suggestedEntityId => {
      const {
        id: id,
        iauName: iauName,
        displayName: displayName
      } = this.app.getManager("content")?.getEntityInfo(suggestedEntityId) || {};
      const suggestionName = displayName || iauName;
      return !(!id || !suggestionName) && {
        text: suggestionName,
        url: `/${id}`
      };
    }).filter(Boolean);
    this.search?.setExcludeResults(excludedEntityIds);
    this.search?.setupFeaturedSuggestion(featuredSuggestions);
  }
  async entitiesInPlace() {
    const entityIds = [this.targetId, this.followId].filter(Boolean);
    await this.app.scene.waitTillEntitiesInPlace(entityIds);
  }
  update() {
    const isDragging = !this._pioneer.getInput().getDraggedOffset().isZero();
    if (!this.followId) return;
    const {
      staticElement: staticElement
    } = this.app;
    staticElement.classList.toggle("follow-dragging", isDragging);
    isDragging && this.showToast();
  }
  setEnabled(enabled, {
    resetLimits = true,
    removeQueries: removedQueries = ["followId", "time", "rate"]
  } = {}) {
    const isEnabled = this._isEnabled;
    this._isEnabled = enabled;
    const {
      currentRoute: currentRoute,
      currentView: currentView
    } = this.app.getManager("router");
    const {
      params: params
    } = currentRoute || {};
    if (!this.search && this.initSearch(), enabled) {
      (!this.followId || isEnabled) && this.showSearch();
      this.triggerCallbacks("cameraFollowStart", [this]);
    } else isEnabled && (this.followId && this.unfollow(), resetLimits && this.setTimeLimits({
      reset: true
    }), Array.isArray(removedQueries) && this.app.getManager("router").navigate({
      __remove: removedQueries
    }), this.hideSearch(), this.triggerCallbacks("cameraFollowStop", [this]));
  }
  setHideTimeout() {
    this.stopHideTimeout();
    this._hideSearchTimeout = setTimeout(() => {
      this.hideSearch();
      this.stopHideTimeout();
    }, this._options.hideSearchDelay);
  }
  stopHideTimeout() {
    clearTimeout(this._hideSearchTimeout);
    this._hideSearchTimeout = null;
  }
  get targetId() {
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      _target: _target
    } = this.app.getView(currentView);
    return _target;
  }
  get targetEntity() {
    return this.app.scene.getEntity(this.targetId);
  }
  get followInnerHtml() {
    return this.followName ? `Following <span class='camera-follow-name'>${this.followName}</span>` : "Follow Target";
  }
  get isEnabled() {
    return this._isEnabled;
  }
}
export { CameraFollowManager };
