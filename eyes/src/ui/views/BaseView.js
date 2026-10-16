/** @eyes-analysis
 * 文件职责：路由视图共同生命周期：资源、时间、组件、相机与清理
 * 依据：imports: ../../vendor/modules/FollowName.cjs, ../../engine/solar-system/public-api.js, ../../framework/eyes/public-api.js, ../../engine/pioneer/index.js；manager dependencies: layer, router, label, selection, spout, title, scene, time, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1324617-1332515.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
var getFollowName = () => FollowName;
/** @eyes-analysis
 * 类职责：路由视图共同生命周期：资源、时间、组件、相机与清理；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：BaseView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseView extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.bindFunctions；写入 _components, _validQueries, _rules, _target, _enabled。
   * 状态写入：_components、_enabled、_rules、_target、_validQueries。
   * 调用线索：super、this.bindFunctions。
   */
  constructor(t, e, i = []) {
    super(t, e);
    this._components = [...i];
    this._validQueries = [];
    this._rules = {};
    this._target = null;
    this._enabled = false;
    this.bindFunctions(["resize", "updateVisibility", "toggleViewUI"]);
  }
  /** @eyes-analysis
   * 执行 app 对应的组件业务步骤。
   */
  get app() {
    return super.app;
  }
  /** @eyes-analysis
   * 执行 _showControls 对应的组件业务步骤。
   */
  _showControls() {}
  /** @eyes-analysis
   * 执行 _hideControls 对应的组件业务步骤。
   */
  _hideControls() {}
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项。
   */
  _shouldHideControls() {
    return false;
  }
  /** @eyes-analysis
   * 执行 updateVisibility 对应的组件业务步骤；调用 this._app.getManager, this._shouldHideControls, this._hideControls, this._showControls。
   * 调用线索：this._app.getManager、this._app.getManager("layer").getLayer、this._hideControls、this._shouldHideControls、this._showControls。
   */
  updateVisibility() {
    this._app.getManager("layer").getLayer("ui").visible && (this._shouldHideControls() ? this._hideControls() : this._showControls());
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 this.updateVisibility。
   * 调用线索：this.updateVisibility。
   */
  resize() {
    this.updateVisibility();
  }
  /** @eyes-analysis
   * 执行 toggleViewUI 对应的组件业务步骤。
   */
  toggleViewUI() {}
  /** @eyes-analysis
   * 执行 _shouldResetStatus 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("layer").getLayer。
   */
  _shouldResetStatus() {
    return this._app.getManager("layer").getLayer("ui").visible;
  }
  /** @eyes-analysis
   * 执行 _resetStatus 对应的组件业务步骤；调用 this._shouldResetStatus, Object.keys, this._app.getComponents, this._app.getComponent, this._components.includes。
   * 调用线索：Object.keys、t.includes、this._app.getComponent、this._app.getComponent(s).setEnabled、this._app.getComponents等。
   */
  _resetStatus(t = []) {
    if (this._shouldResetStatus()) {
      const e = Object.keys(this._app.getComponents());
      for (let i = e.length - 1; i >= 0; i--) {
        const s = e[i];
        t.includes(s) || this._app.getComponent(s).setEnabled(this._components.includes(s));
      }
    }
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("layer").addCallback。
   */
  registerCallbacks() {
    this._app.getManager("layer").addCallback("ui", this.toggleViewUI);
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("layer").removeCallback。
   */
  removeCallbacks() {
    this._app.getManager("layer").removeCallback("ui", this.toggleViewUI);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._resetStatus, this.registerCallbacks, this._app.getManager, List.add。
   * 调用线索：document.body.classList.add、this._app.getManager、this._app.getManager("label").setClickable、this._app.getManager("selection").setClickable、this._resetStatus等。
   */
  async onEnter(t, e = []) {
    if (t.cancelToken.isCanceled) return;
    this._resetStatus(e);
    window.addEventListener("resize", this.resize);
    this.registerCallbacks();
    const i = this._app.getManager("router").currentView + "-view";
    document.body.classList.add(i);
    this._app.getManager("router").configs.locked && (document.body.classList.add("locked"), this._app.getManager("label").setClickable(false), this._app.getManager("selection").setClickable(false));
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.before, this._reset, this._updateResources, this.processQuery, this._updateComponentsVisibility, this._checkReady, this._updateCamera, this._updateLoading, this.after, this.app.getManager。
   * 调用线索：this._checkReady、this._reset、this._updateCamera、this._updateComponentsVisibility、this._updateLoading等。
   */
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
  /** @eyes-analysis
   * 响应查询参数变化；调用 this.processQuery。
   * 调用线索：this.processQuery。
   */
  async onQueryChange(t) {
    t.cancelToken.isCanceled || (await this.processQuery(t));
  }
  /** @eyes-analysis
   * 检查查询规则并重定向、补默认值或报错；调用 Object.keys, this._app.getManager, this._rules.redirect, Manager.navigate, EyesPublicApi.AppUtils.isEmptyObject, this._handleError, JSON.stringify。
   * 调用线索：EyesPublicApi.AppUtils.isEmptyObject、JSON.stringify、Object.keys、a.value、routerManager.navigate等。
   */
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
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 this._updateTimeRate, this._updateTime, this._app.getManager, Manager.parseQuery, Object.keys, this._app.getComponent, Manager.getLayer, PanelComponent.toggleLayer, this.app.getManager。
   * 调用线索：Object.keys、layerManager.getLayer、layerPanelComponent.toggleLayer、layerPanelComponent?.isCategoryEnabled、layerPanelComponent?.setCategoryEnabled等。
   */
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
  /** @eyes-analysis
   * 执行 _handleError 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：console.error、new Error、this._app.getManager、this._app.getManager("router").navigate。
   */
  _handleError(t = "") {
    const error = new Error(t);
    console.error(error);
    if (null !== this._app.getManager("router")) {
      let t = this._app.getManager("router").previousRoute.url;
      t || (t = this._app.getManager("router").homeRoute);
      this._app.getManager("router").navigate(t);
    }
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this.removeCallbacks, this._app.getManager, List.remove。
   * 调用线索：document.body.classList.remove、this._app.getManager、this._app.getManager("router").navigate、this._app.getManager("scene").clearForceLoad、this._app.getManager("selection").unselect等。
   */
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
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("scene").clearForceLoad。
   */
  _reset(t) {
    this._app.getManager("scene").clearForceLoad();
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体。
   */
  async _updateResources(t) {}
  /** @eyes-analysis
   * 执行 _updateTimeRate 对应的组件业务步骤；调用 this._app.getManager, Manager.setTimeRate, Manager.resetTimeRate。
   * 调用线索：parseInt、this._app.getManager、timeManager.resetTimeRate、timeManager.setTimeRate。
   */
  _updateTimeRate(t) {
    const timeManager = this._app.getManager("time");
    "rate" in t ? timeManager.setTimeRate(parseInt(t.rate)) : timeManager.resetTimeRate();
  }
  /** @eyes-analysis
   * 按查询参数或当前目标设置时间；调用 this._app.getManager, Route.url.includes, Manager.resetMin, Manager.resetMax, this._updateTimeForTarget。
   * 调用线索：this._app.getManager、this._app.getManager("content").getStory、this._app.getManager("router").currentRoute.url.includes、this._app.getManager("router").navigate、this._app.getManager("time").parseTime等。
   */
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
  /** @eyes-analysis
   * 将时间限制收敛到目标覆盖范围；调用 this._app.getManager, Manager.timeLimits.min.clone, Manager.timeLimits.max.clone, Manager.getDefaultLimits, Manager.parseTime, this._app.getComponent, Manager.navigate, Manager.setMax, Manager.setMin, Manager.setTime, Manager.setTimeRate, Manager.setToNow。
   * 调用线索：console.error、e.isAfter、e.isBefore、getFollowName、getFollowName().max等。
   */
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
  /** @eyes-analysis
   * 执行 _updateComponentsVisibility 对应的组件业务步骤；调用 this._updateComponents, this.updateVisibility。
   * 调用线索：this._updateComponents、this.updateVisibility。
   */
  async _updateComponentsVisibility(t) {
    await this._updateComponents(t);
    t.cancelToken.isCanceled || this.updateVisibility();
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件。
   */
  async _updateComponents(t) {}
  /** @eyes-analysis
   * 按当前模式定位相机与目标。
   */
  async _updateCamera(t) {}
  /** @eyes-analysis
   * 把目标组件加载状态关联到场景加载提示；调用 this._app.getManager, Manager.getEntityInfo, Manager.addLoading, Manager._scene.getEntity, Manager.get, Manager.forceLoad, Manager.componentIsReady, Promise.all, Manager.removeLoading。
   * 调用线索：Promise.all、Promise.all(t).then、contentManager.getEntityInfo、sceneManager._scene.getEntity、sceneManager._scene.getEntity(this._target).getParent等。
   */
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
  /** @eyes-analysis
   * 等待所需实体就位；调用 this._app.getManager, this._app.pioneer.getScene, this._app.pioneer.waitUntilNextFrame。
   * 调用线索：e.push、t.getName、this._app.getManager、this._app.getManager("scene").get、this._app.getManager("scene").get("main").getEntity等。
   */
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
  /** @eyes-analysis
   * 执行路由更新前置步骤。
   */
  async before(t) {}
  /** @eyes-analysis
   * 执行路由更新后的收尾步骤；调用 this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("layer").resetTarget、this._app.getManager("scene").clearTempEntities。
   */
  after(t) {
    this._app.getManager("layer").resetTarget();
    this._app.getManager("scene").clearTempEntities();
  }
}
export { BaseView };
