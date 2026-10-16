// Recovered from app.js:1307039-1318432.
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import FollowName from "../../vendor/modules/FollowName.cjs";
var getFollowName = () => FollowName;
class CameraFollowManager extends EyesPublicApi.BaseManager {
  constructor(t, e = {}) {
    super(t);
    this._options = {
      placeholder: "Search target to follow...",
      maxFeatured: 5,
      hideSearchDelay: 1e3,
      cameraDuration: 1.5,
      ...e
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
    this._offsetObserver = new MutationObserver(t => {
      t.forEach(t => {
        "class" === t.attributeName && this.setYawPitchLimits();
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
    reset: t = false
  } = {}) {
    const toastComponent = this.app.getComponent("toast");
    if (t) {
      toastComponent.hide();
      return void toastComponent.setContent("");
    }
    const i = `Camera is following ${["Sun", "Moon", "ISS"].includes(this.followName) ? "the " : ""}${this.followName}`;
    toastComponent.setContent(i, '<button class="clickable undo" aria-label="Undo camera follow">Undo</button>');
    const {
      toastContent: toastContent
    } = toastComponent._children;
    const n = toastContent.querySelector("button");
    n?.addEventListener("click", () => {
      this.triggerCallbacks("cameraFollowUndo", [this]);
    });
  }
  showToast() {
    this.app.getComponent("toast").show();
  }
  validateTimeLimits() {
    const timeManager = this.app.getManager("time");
    const e = timeManager.getTime();
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      min: min,
      max: max
    } = this.targetEntity?.getPositionCoverage() || {};
    const {
      min: o,
      max: r
    } = this.followEntity?.getPositionCoverage() || {};
    if (!(min && max && o && r)) return {
      isValid: false
    };
    let l = timeManager.etToMoment(min);
    let c = timeManager.etToMoment(max);
    let h = timeManager.etToMoment(o);
    let d = timeManager.etToMoment(r);
    l = null == l ? timeManager.getDefaultLimits().min : l;
    c = null == c ? timeManager.getDefaultLimits().max : c;
    h = null == h ? timeManager.getDefaultLimits().min : h;
    d = null == d ? timeManager.getDefaultLimits().max : d;
    if ("event" === currentView && this.app.getView("event")._eventName) {
      const {
        min: e,
        max: i
      } = timeManager.getLimits() || {};
      l = e;
      c = i;
    }
    const u = getFollowName().max(h, l);
    const p = getFollowName().min(d, c);
    if (h.valueOf() > c.valueOf() || d.valueOf() < l.valueOf()) {
      this.app.getComponent("clock")?.setLimitMessage(null, "Entity timelines do not overlap");
      this.setEnabled(false, {
        removeQueries: ["followId"]
      });
      return {
        isValid: false
      };
    }
    if (e.valueOf() < h.valueOf() || e.valueOf() > d.valueOf()) {
      const e = timeManager.getTimeUrl(u);
      this.app.getManager("router").navigate({
        time: e
      });
    }
    return {
      isValid: true,
      minTime: u,
      maxTime: p
    };
  }
  async follow(t) {
    const {
      currentRoute: currentRoute,
      previousRoute: previousRoute
    } = this.app.getManager("router");
    const {
      params: params
    } = previousRoute || {};
    const {
      params: n
    } = currentRoute || {};
    const {
      spaceObject: spaceObject
    } = params || {};
    const {
      spaceObject: r
    } = n || {};
    const {
      cameraDuration: cameraDuration
    } = this._options;
    this._isEnabled = true;
    !this.search && this.initSearch();
    this.followId && this.setLabelWeight(this.followId, true);
    spaceObject && spaceObject !== r && this.setTargetNotClickable(spaceObject, true);
    this.app.getManager("scene").setEntitiesForceVisible([t]);
    this.setFollowVars(t);
    this.triggerCallbacks("cameraFollowSelect", [t, this]);
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
    const d = () => {
      const timeManager = this.app.getManager("time");
      timeManager.pause();
      this.followName && this.showToast();
      this.animateCamera(cameraDuration).then(() => (timeManager.play(), !!this._isEnabled && (this.setTimeLimits({
        minTime: minTime,
        maxTime: maxTime
      }), this.setYawPitchLimits(), this.setLabelWeight(this.followId), this.updateOccludedEntities(), this.setTargetNotClickable(this.targetId), true))).catch(t => t);
    };
    const {
      isLoaded: isLoaded,
      onLoaded: onLoaded
    } = this.app.getComponent("cameraViewBlock");
    isLoaded ? d() : onLoaded.push(d);
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
    const n = this.app.scene.getEntity(spaceObject);
    this.setParentsChangedCallbacks({
      targetEntity: n,
      reset: true
    });
    this.setFollowVars(null);
    this.setSearchOptions({
      reset: true
    });
    this._offsetObserver.disconnect();
    this._resizeObserver.disconnect();
  }
  animateCamera(t) {
    this._sumParent.clearControllers();
    const e = this.targetEntity?.getExtentsRadius() || .1;
    const i = this._sumParent.addController(SolarSystemSceneExports.PositionSumController);
    i.addEntity(this.targetId, 1, 0);
    i.addEntity(this.followId, 0, -e);
    const o = this._sumParent.addController(Pioneer.AlignController);
    o.setPrimaryAlignType("point");
    o.setPrimaryAxis(Pioneer.Vector3.YAxis);
    o.setPrimaryTargetEntity(this.targetId);
    const r = this._sumParent.addController(Pioneer.TransitionController);
    r.setTransitionTime(t);
    r.setParent(this.targetId);
    const {
      _easeOutExpoTransition: _easeOutExpoTransition
    } = this.app.cameraScripts;
    r.setTransitionFunction(_easeOutExpoTransition);
    return this.app.getManager("camera").followTheEntity(this.targetId, this.followId, this._sumParent.getName(), t);
  }
  setParentsChangedCallbacks({
    targetEntity: t = this.targetEntity,
    reset: e = false
  } = {}) {
    if (e) {
      t?.removeParentChangedCallback(this.updateOccludedEntities);
      return void this.followEntity?.removeParentChangedCallback(this.updateOccludedEntities);
    }
    t?.addParentChangedCallback(this.updateOccludedEntities);
    this.followEntity?.addParentChangedCallback(this.updateOccludedEntities);
  }
  setLabelWeight(t, e = false, i = "201") {
    if (!t) return;
    const labelManager = this.app.getManager("label");
    const n = labelManager.getDefaultWeight(t);
    0 === n && (labelManager._weights[t] = {});
    e ? this._prevValues.weights[t] && (labelManager.setWeight(t, this._prevValues.weights[t]), delete this._prevValues.weights[t]) : (labelManager.setWeight(t, i), this._prevValues.weights[t] = n);
  }
  updateOccludedEntities({
    reset: t = false
  } = {}) {
    const e = !t && this.getEntitiesToUnocclude();
    this.setOcclusionProps(e);
  }
  getEntitiesToUnocclude() {
    const t = [this.followId];
    return [...new Set(t)].filter(Boolean);
  }
  setOcclusionProps(t) {
    const {
      occlusion: occlusion
    } = this._prevValues;
    Object.keys(occlusion).forEach(t => {
      const i = this.app.scene.getEntity(t);
      i?.setCanOcclude(occlusion[t]);
      i?.getComponent(Pioneer.DivComponent).setCanBeOccluded(occlusion[t]);
    });
    this._prevValues.occlusion = {};
    t?.length && t.forEach(t => {
      const e = this.app.scene.getEntity(t);
      e && (this._prevValues.occlusion[t] = e.canOcclude(), e?.getComponent(Pioneer.DivComponent).setCanBeOccluded(false));
    });
  }
  setTargetNotClickable(t, e = false) {
    const labelManager = this.app.getManager("label");
    const s = labelManager._labels[t];
    if (!s) return;
    const {
      labelsClickable: labelsClickable
    } = this._prevValues;
    e ? void 0 !== labelsClickable[t] && (labelManager.setLabelClickable(t, labelsClickable[t]), delete labelsClickable[t]) : (labelsClickable[t] = s.isClickable, labelManager.setLabelClickable(t, false));
  }
  _createReframeElement() {
    const {
      staticElement: staticElement
    } = this.app;
    staticElement.querySelector(".follow-reframe") || (this._reframeElement = document.createElement("div"), this._reframeElement.classList.add("follow-reframe"), staticElement.appendChild(this._reframeElement));
  }
  _createSumParent() {
    const t = SolarSystemSceneExports.Entity.createFromOptions("follow_sum_parent", {
      parents: []
    }, this.app.scene);
    t.setPosition(Pioneer.Vector3.Zero);
    t.setOrientation(Pioneer.Quaternion.Identity);
    return t;
  }
  initSearch(t) {
    if (!this.search) {
      this.search = this.app.getComponent("cameraFollowSearch");
      this.search.element.addEventListener("click", t => {
        t.stopPropagation();
      });
      const {
        placeholder: placeholder
      } = this._options;
      const {
        input: input
      } = this.search._children;
      input && input.setAttribute("placeholder", placeholder);
      const i = "related";
      this.search._config.infoText.default = i;
      this.search.setState({
        searchInfo: i
      });
      this.search.element.classList.add("camera-follow");
    }
    t && (t.appendChild(this.search.element), this.search.setParent(t));
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
    reset: i = false
  } = {}) {
    const timeManager = this.app.getManager("time");
    if (i) {
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
    const t = document.body.classList.contains("offset-right");
    const e = document.body.classList.contains("offset-up");
    const i = this.app.scene.getEntity("camera");
    const s = i.getComponent(Pioneer.CameraComponent);
    const o = s.getHorizontalFieldOfView();
    const r = s.getVerticalFieldOfView();
    const a = i.getController(Pioneer.OrbitController);
    if (!a) return;
    const l = t ? .05 * o : 0;
    const c = e ? .2 * r : 0;
    const h = -.5 * Math.PI;
    const d = .45 * o;
    const u = .4 * r;
    const p = h - d + l;
    const _ = h + d - l;
    const m = -u + c;
    const g = u - c;
    a.setYawAngleLimits(new Pioneer.Interval(p, _));
    a.setPitchAngleLimits(new Pioneer.Interval(m, g));
  }
  async setSearchOptions({
    targetId: t = this.targetId,
    followId: e = this.followId,
    reset: i = false
  } = {}) {
    if (i) return void this.search?.setExcludeResults([]);
    await this.entitiesInPlace();
    const s = [t, e].filter(Boolean);
    const {
      maxFeatured: maxFeatured
    } = this._options;
    const o = [];
    const routerManager = this.app.getManager("router");
    let a;
    if (routerManager && "event" === routerManager.currentView) {
      const t = routerManager.currentRoute.params.child;
      const e = this._app.getManager("content").events[t];
      a = e?.target || void 0;
    }
    const timeManager = this.app.getManager("time");
    const c = timeManager.getTime();
    const h = timeManager.momentToET(c);
    const d = this.targetEntity || this.app.scene.getEntity(t);
    const u = this.followEntity ? d.getLowestCommonAncestorAtTime(this.followEntity, h)?.getName() : d.getParentAtTime(h);
    const contentManager = this.app.getManager("content");
    let _ = [];
    if ("sun" !== t) {
      const t = await contentManager.getEntityDesc(u).catch(() => ({}));
      t && t.featuredMoons && (_ = t.featuredMoons);
    }
    if (!s.length || !this.isEnabled) return;
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      _entityDesc: _entityDesc,
      _eventDesc: _eventDesc
    } = this.app.getView(currentView);
    const {
      related: f = []
    } = _entityDesc || {};
    const {
      related: T = []
    } = _eventDesc || {};
    const {
      featuredMoons: b = []
    } = _entityDesc || {};
    o.push(a, u, ...T, ...f, ...b, ..._);
    "sun" !== t && o.push("sun");
    const E = [...new Set(o)].filter(i => ![t, e].includes(i)).slice(0, maxFeatured).map(t => {
      const {
        id: id,
        iauName: iauName,
        displayName: displayName
      } = this.app.getManager("content")?.getEntityInfo(t) || {};
      const n = displayName || iauName;
      return !(!id || !n) && {
        text: n,
        url: `/${id}`
      };
    }).filter(Boolean);
    this.search?.setExcludeResults(s);
    this.search?.setupFeaturedSuggestion(E);
  }
  async entitiesInPlace() {
    const t = [this.targetId, this.followId].filter(Boolean);
    await this.app.scene.waitTillEntitiesInPlace(t);
  }
  update() {
    const t = !this._pioneer.getInput().getDraggedOffset().isZero();
    if (!this.followId) return;
    const {
      staticElement: staticElement
    } = this.app;
    staticElement.classList.toggle("follow-dragging", t);
    t && this.showToast();
  }
  setEnabled(t, {
    resetLimits: e = true,
    removeQueries: i = ["followId", "time", "rate"]
  } = {}) {
    const isEnabled = this._isEnabled;
    this._isEnabled = t;
    const {
      currentRoute: currentRoute,
      currentView: currentView
    } = this.app.getManager("router");
    const {
      params: params
    } = currentRoute || {};
    if (!this.search && this.initSearch(), t) {
      (!this.followId || isEnabled) && this.showSearch();
      this.triggerCallbacks("cameraFollowStart", [this]);
    } else isEnabled && (this.followId && this.unfollow(), e && this.setTimeLimits({
      reset: true
    }), Array.isArray(i) && this.app.getManager("router").navigate({
      __remove: i
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
