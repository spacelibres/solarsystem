// Recovered from app.js:1324617-1332515.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getFollowName = () => FollowName;
class BaseView extends EyesPublicApi.BaseComponent {
  constructor(t, e, i = []) {
    super(t, e);
    this._components = [...i];
    this._validQueries = [];
    this._rules = {};
    this._target = null;
    this._enabled = false;
    this.bindFunctions(["resize", "updateVisibility", "toggleViewUI"]);
  }
  get app() {
    return super.app;
  }
  _showControls() {}
  _hideControls() {}
  _shouldHideControls() {
    return false;
  }
  updateVisibility() {
    this._app.getManager("layer").getLayer("ui").visible && (this._shouldHideControls() ? this._hideControls() : this._showControls());
  }
  resize() {
    this.updateVisibility();
  }
  toggleViewUI() {}
  _shouldResetStatus() {
    return this._app.getManager("layer").getLayer("ui").visible;
  }
  _resetStatus(t = []) {
    if (this._shouldResetStatus()) {
      const e = Object.keys(this._app.getComponents());
      for (let i = e.length - 1; i >= 0; i--) {
        const s = e[i];
        t.includes(s) || this._app.getComponent(s).setEnabled(this._components.includes(s));
      }
    }
  }
  registerCallbacks() {
    this._app.getManager("layer").addCallback("ui", this.toggleViewUI);
  }
  removeCallbacks() {
    this._app.getManager("layer").removeCallback("ui", this.toggleViewUI);
  }
  async onEnter(t, e = []) {
    if (t.cancelToken.isCanceled) return;
    this._resetStatus(e);
    window.addEventListener("resize", this.resize);
    this.registerCallbacks();
    const i = this._app.getManager("router").currentView + "-view";
    document.body.classList.add(i);
    this._app.getManager("router").configs.locked && (document.body.classList.add("locked"), this._app.getManager("label").setClickable(false), this._app.getManager("selection").setClickable(false));
  }
  async onRouteChange(t) {
    if (await this.before(t), t.cancelToken.isCanceled) return;
    if (this._reset(t), await this._updateResources(t), t.cancelToken.isCanceled) return;
    if (t.setTimeLimits = true, await this.processQuery(t), await this._updateComponentsVisibility(t), t.cancelToken.isCanceled) return;
    await this._checkReady(t);
    try {
      await this._updateCamera(t);
      this._updateLoading(t);
    } finally {
      await this.after(t);
    }
    const {
      spout: spout
    } = this.app.getManager("router").configs;
    if (true === spout) {
      const {
        spoutGlobe: spoutGlobe,
        spoutRenderWidth: spoutRenderWidth,
        spoutGlobeDistance: spoutGlobeDistance,
        spoutTarget: spoutTarget,
        spoutFontSize: spoutFontSize,
        spoutLonAngleOffset: spoutLonAngleOffset,
        spoutAlignToNorthPole: spoutAlignToNorthPole
      } = this.app.getManager("router").configs;
      const l = spoutTarget || (await this.app.getManager("spout").getSpoutCameraTargetEntity(t));
      this.app.getManager("spout").enableSpout(spoutGlobe, spoutRenderWidth, spoutGlobeDistance, l, spoutFontSize, spoutLonAngleOffset, spoutAlignToNorthPole);
    }
  }
  async onQueryChange(t) {
    t.cancelToken.isCanceled || (await this.processQuery(t));
  }
  validateQuery(t) {
    const e = {
      ...t
    };
    const i = Object.keys(e);
    const s = {};
    const n = {};
    const routerManager = this._app.getManager("router");
    for (let t = i.length - 1; t >= 0; t--) {
      const r = i[t];
      if (!(r in this._rules)) {
        delete e[r];
        continue;
      }
      const a = this._rules[r];
      if (!("function" == typeof a.value ? a.value(e[r]) : a.value === e[r])) {
        if (n[r] = e[r], "function" == typeof this._rules.redirect) {
          this._rules.redirect(e[r]);
          return false;
        }
        if ("route" in a) {
          routerManager.navigate(a.route);
          return false;
        }
        "default" in a && (s[r] = a.default);
      }
    }
    return EyesPublicApi.AppUtils.isEmptyObject(s) ? !!EyesPublicApi.AppUtils.isEmptyObject(n) || (this._handleError(`validateQuery: Invalid input - ${JSON.stringify(n)}`), false) : (routerManager.navigate({
      ...e,
      ...s
    }), false);
  }
  async processQuery(t) {
    this._updateTimeRate(t);
    await this._updateTime(t);
    const routerManager = this._app.getManager("router");
    const i = routerManager.parseQuery(routerManager.previousRoute?.query);
    for (const s of Object.keys(routerManager._queryCallbacks)) {
      const n = t[s];
      const o = i[s];
      (n || o) && routerManager._queryCallbacks[s].forEach(t => t(n, o));
    }
    const layerManager = this._app.getManager("layer");
    const layerPanelComponent = this._app.getComponent("layerPanel");
    const o = {
      layerUI: "ui",
      layerTrails: "trails",
      layerOrbits: "orbits",
      layerLabels: "labels",
      layerIcons: "icons",
      layerPlanets: "planets",
      layerAsteroids: "asteroids",
      layerComets: "comets",
      layerDwarfPlanets: "dwarfPlanets",
      layerConstellations: "constellations",
      layerSpacecraft: "spacecraft"
    };
    for (const e in o) if (e in t) {
      const i = o[e];
      "disable" === t[e] ? layerPanelComponent?.setCategoryEnabled(i, false) : layerPanelComponent?.isCategoryEnabled(i) && ("show" === t[e] ? layerManager.getLayer(i).visible || layerPanelComponent.toggleLayer(i) : "hide" === t[e] && layerManager.getLayer(i).visible && layerPanelComponent.toggleLayer(i));
    }
    this.app.getManager("title")?.updateTitle(routerManager.currentRoute);
  }
  _handleError(t = "") {
    const error = new Error(t);
    console.error(error);
    if (null !== this._app.getManager("router")) {
      let t = this._app.getManager("router").previousRoute.url;
      t || (t = this._app.getManager("router").homeRoute);
      this._app.getManager("router").navigate(t);
    }
  }
  onLeave(t) {
    window.removeEventListener("resize", this.resize);
    this.removeCallbacks();
    const e = this._app.getManager("router").previousView + "-view";
    document.body.classList.remove(e);
    this._app.getManager("selection").unselect();
    this._app.getManager("scene").clearForceLoad();
    this._validQueries.length && this._app.getManager("router").navigate({
      __remove: this._validQueries
    });
  }
  _reset(t) {
    this._app.getManager("scene").clearForceLoad();
  }
  async _updateResources(t) {}
  _updateTimeRate(t) {
    const timeManager = this._app.getManager("time");
    "rate" in t ? timeManager.setTimeRate(parseInt(t.rate)) : timeManager.resetTimeRate();
  }
  async _updateTime(t) {
    const timeManager = this._app.getManager("time");
    const i = this._app.getManager("router").currentRoute.url.includes("story");
    let s = 0;
    if (i && this._storyId) {
      s = this._app.getManager("content").getStory(this._storyId).slides.length;
    }
    if ((!this._target && s > 1 || i && !this._target && !this._storyId) && (timeManager.resetMin(), timeManager.resetMax()), this._target) await this._updateTimeForTarget(t);else if (t.time) {
      this._app.getManager("time").parseTime(t.time).isValid() ? this._app.getManager("time").setTime(t.time) : this._app.getManager("router").navigate({
        __remove: ["time"]
      });
    } else this._app.getManager("time").setToNow();
  }
  async _updateTimeForTarget(t, e = true) {
    const timeManager = this._app.getManager("time");
    let s = timeManager.timeLimits.min.clone();
    let o = timeManager.timeLimits.max.clone();
    if (t.setTimeLimits) {
      const t = timeManager.getDefaultLimits();
      s = t.min.clone();
      o = t.max.clone();
      e && (await this._app.getManager("scene").get("main").getEntity(this._target).getLoadedPromise());
      const r = this._app.getManager("scene").getCoverage(this._target);
      if (null !== r.min && (s = getFollowName().max(s, r.min)), null !== r.max && (o = getFollowName().min(o, r.max)), this._entityDesc?.dates?.start) {
        const t = timeManager.parseTime(this._entityDesc.dates.start);
        s = getFollowName().max(t, s);
      }
      if (this._entityDesc?.dates?.end) {
        const t = timeManager.parseTime(this._entityDesc.dates.end);
        o = getFollowName().min(t, o);
      }
      if (s.isAfter(o)) {
        console.error("Start date provided is after end date.");
        const routerManager = this._app.getManager("router");
        this._app.getComponent("clock")?.setLimitMessage(1, "time limit error");
        return void setTimeout(() => routerManager.navigate("/"), 1e3);
      }
      timeManager.setMax(o);
      timeManager.setMin(s);
    }
    if (!t.time && this._eventInfo?.start) {
      const t = timeManager.parseTime(this._eventInfo.start);
      timeManager.setTime(getFollowName().max(t, s));
    } else if (t.time) {
      const e = timeManager.parseTime(t.time);
      e.isAfter(o) ? (timeManager.setTime(o), timeManager.setTimeRate(0), this._app.getComponent("clock")?.setLimitMessage(1)) : e.isBefore(s) ? (timeManager.setTime(s), this._app.getComponent("clock")?.setLimitMessage(-1)) : timeManager.setTime(e);
    } else {
      const t = this._app.getManager("time").getNow();
      t.isAfter(o) || t.isBefore(s) ? timeManager.setTime(s) : timeManager.setToNow();
    }
  }
  async _updateComponentsVisibility(t) {
    await this._updateComponents(t);
    t.cancelToken.isCanceled || this.updateVisibility();
  }
  async _updateComponents(t) {}
  async _updateCamera(t) {}
  _updateLoading(t) {
    if (null !== this._target) {
      const t = [];
      const e = [Pioneer.ModelComponent, SolarSystemSceneExports.WMTSComponent, Pioneer.SpheroidLODComponent];
      const sceneManager = this._app.getManager("scene");
      const contentManager = this._app.getManager("content");
      const n = contentManager.getEntityInfo(this._target)?.category;
      n && "Instrument" === n && sceneManager.addLoading(sceneManager._scene.getEntity(this._target).getParent().getName(), "view");
      sceneManager.addLoading(this._target, "view");
      for (let s = 0; s < e.length; s++) {
        const n = sceneManager.get("main").getEntity(this._target).getComponent(e[s]);
        null !== n && (sceneManager.forceLoad(n), t.push(sceneManager.componentIsReady(n)));
      }
      Promise.all(t).then(() => {
        n && "Instrument" === n && sceneManager.removeLoading(sceneManager._scene.getEntity(this._target).getParent().getName(), "view");
        sceneManager.removeLoading(this._target, "view");
      });
    }
  }
  async _checkReady(t) {
    if (null === this._target) return;
    const e = [];
    let target = this._target;
    for (; "sun" !== target;) {
      e.push(target);
      const t = this._app.getManager("scene").get("main").getEntity(target)?.getParent();
      if (!t) break;
      target = t.getName();
    }
    await this._app.pioneer.getScene("main").waitTillEntitiesInPlace(e);
    await this._app.pioneer.waitUntilNextFrame();
  }
  async before(t) {}
  after(t) {
    this._app.getManager("layer").resetTarget();
    this._app.getManager("scene").clearTempEntities();
  }
}
export { BaseView };
