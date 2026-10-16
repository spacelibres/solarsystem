/** @eyes-analysis
 * 文件职责：距离模式的源目标、覆盖时间交集及双目标相机
 * 依据：imports: ../../framework/eyes/index.js, ../../engine/managers/DistanceManager.js, ./ExtendedBaseView.js；manager dependencies: content, router, scene, time, layer, selection
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1666469-1673135.
import * as Eyes from "../../framework/eyes/index.js";
import * as DistanceManager from "../../engine/managers/DistanceManager.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：距离模式的源目标、覆盖时间交集及双目标相机；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：DistanceView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DistanceView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.getManager, Manager.getEntityInfo, Manager._entityStatuses.get, this.bindFunctions；写入 _rules, _forceLoadEntities, _spaceObjectChanged, _targetChanged, _timeChanged, _rateChanged, _redirect。
   * 状态写入：_forceLoadEntities、_rateChanged、_redirect、_rules、_spaceObjectChanged、_targetChanged、_timeChanged。
   * 调用线索：Boolean、contentManager.getEntityInfo、n.every、n.some、sceneManager._entityStatuses.get等。
   */
  constructor(...t) {
    super(...t);
    this._rules = {
      ...this._rules,
      spaceObject: {
        value: t => null !== this._app.getManager("content").getEntityInfo(t)
      },
      to: {
        value: t => {
          const {
            spaceObject: spaceObject
          } = this._app.getManager("router").currentRoute.params;
          const contentManager = this._app.getManager("content");
          const sceneManager = this._app.getManager("scene");
          const n = "string" == typeof t ? t?.split(",") : [];
          const o = n.every(t => null !== contentManager.getEntityInfo(t));
          const r = n.some(t => t === spaceObject);
          const a = n.every(t => Boolean(sceneManager._entityStatuses.get(t)));
          return o && a && !r;
        }
      }
    };
    this._forceLoadEntities = [];
    this._spaceObjectChanged = null;
    this._targetChanged = null;
    this._timeChanged = null;
    this._rateChanged = null;
    this._redirect = null;
    this.bindFunctions(["onIsMobileChange"]);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this.app.addManager, this.app.getComponent, this.distancePanel.show, this.distanceManager.init, this.distancePanel.initSearchUI, this.setBreadcrumbStaticTextVisible, this.updateVisibility, super.onEnter。
   * 状态写入：distanceManager、distancePanel、distancePanel.isMobileChangedCallback。
   * 调用线索：super.onEnter、this.app.addManager、this.app.getComponent、this.app.getComponent("collapsibleMenu")?.setAllowMultiple、this.distanceManager.init等。
   */
  async onEnter(t) {
    this.distanceManager ??= this.app.addManager("distance", DistanceManager.DistanceManager);
    this.distancePanel ??= this.app.getComponent("distancePanel");
    this.distancePanel.show();
    this.distanceManager.init();
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(false);
    this.distancePanel.initSearchUI();
    this.distancePanel.isMobileChangedCallback = this.onIsMobileChange;
    this.setBreadcrumbStaticTextVisible();
    this.updateVisibility();
    await super.onEnter(t);
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this.app.getComponent, this.distanceManager.deinit, this.setBreadcrumbStaticTextVisible, super.onLeave。
   * 状态写入：distancePanel.isMobileChangedCallback。
   * 调用线索：super.onLeave、this.app.getComponent、this.app.getComponent("collapsibleMenu")?.setAllowMultiple、this.distanceManager.deinit、this.setBreadcrumbStaticTextVisible。
   */
  async onLeave(t) {
    this.app.getComponent("collapsibleMenu")?.setAllowMultiple(true);
    this.distancePanel.isMobileChangedCallback = null;
    this.distanceManager.deinit();
    this.setBreadcrumbStaticTextVisible(true);
    await super.onLeave(t);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getManager。
   * 调用线索：super.registerCallbacks、this._app.getManager、this._app.getManager("time").registerCallback。
   */
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getManager("time").registerCallback("update", this.distanceManager.update);
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getManager。
   * 调用线索：super.removeCallbacks、this._app.getManager、this._app.getManager("time").removeCallback。
   */
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getManager("time").removeCallback("update", this.distanceManager.update);
  }
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this.app.getManager, Manager.parseQuery, Token.cancel, this.distanceManager.setIsWaitingForEntities, this.distanceManager.setBetweenPosHidden, this._forceLoadEntities.push, this._forceLoadEntities.map, Manager.getDependencies, this._forceLoadEntities.flat, Manager.setEntitiesForceVisible, this.distanceManager.setTargetDistanceEntities；写入 _spaceObjectChanged, _targetChanged, _timeChanged, _rateChanged, _forceLoadEntities。
   * 状态写入：_forceLoadEntities、_rateChanged、_spaceObjectChanged、_targetChanged、_timeChanged。
   * 调用线索：new Set、routerManager.parseQuery、sceneManager.getDependencies、sceneManager.setEntitiesForceVisible、super.processQuery等。
   */
  async processQuery(t) {
    await super.processQuery(t);
    const {
      spaceObject: spaceObject,
      to: to,
      time: time,
      rate: rate
    } = t;
    const routerManager = this.app.getManager("router");
    const sceneManager = this.app.getManager("scene");
    const {
      query: query,
      params: params
    } = routerManager.previousRoute;
    const {
      to: c,
      time: h,
      rate: d
    } = routerManager.parseQuery(query);
    if (this._spaceObjectChanged = params?.spaceObject !== spaceObject, this._targetChanged = c !== to, this._timeChanged = h !== time, this._rateChanged = d !== rate, query && !this._spaceObjectChanged && !this._targetChanged && !this._redirect) return void t.cancelToken.cancel();
    this.distanceManager.setIsWaitingForEntities(true);
    this.distanceManager.setBetweenPosHidden(true);
    this._forceLoadEntities = [spaceObject];
    const u = "string" == typeof to ? to.split(",") : [];
    u && this._forceLoadEntities.push(...u);
    this._forceLoadEntities = this._forceLoadEntities.map(t => [t, ...sceneManager.getDependencies(t)]);
    this._forceLoadEntities = [...new Set(this._forceLoadEntities.flat())];
    sceneManager.setEntitiesForceVisible(this._forceLoadEntities, true);
    this.distanceManager.setTargetDistanceEntities(u);
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 this.distanceManager.setIsWaitingForEntities, super.onQueryChange, this.distanceManager.updateMeasurement, this._updateComponents, this._checkReady, this._updateCamera。
   * 调用线索：super.onQueryChange、this._checkReady、this._updateCamera、this._updateComponents、this.distanceManager.setIsWaitingForEntities等。
   */
  async onQueryChange(t) {
    if (this.distanceManager.setIsWaitingForEntities(true), await super.onQueryChange(t), t.cancelToken.isCanceled) {
      this.distanceManager.setIsWaitingForEntities(false);
      return void this.distanceManager.updateMeasurement(false);
    }
    this._updateComponents(t);
    await this._checkReady(t);
    await this._updateCamera(t);
  }
  /** @eyes-analysis
   * 按查询参数或当前目标设置时间；调用 this.app.getManager, Manager.parseTime, Manager.setTime, this._app.getManager。
   * 调用线索：this._app.getManager、this._app.getManager("router").navigate、this.app.getManager、timeManager.parseTime、timeManager.parseTime(t.time).isValid等。
   */
  async _updateTime(t) {
    const timeManager = this.app.getManager("time");
    if (t.time) {
      timeManager.parseTime(t.time).isValid() ? timeManager.setTime(t.time) : this._app.getManager("router").navigate({
        __remove: ["time"]
      });
    }
  }
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 super._reset, this.distanceManager.resetAllDistanceEntities；写入 _forceLoadEntities。
   * 状态写入：_forceLoadEntities。
   * 调用线索：super._reset、this.distanceManager.resetAllDistanceEntities。
   */
  _reset(t) {
    super._reset(t);
    this._forceLoadEntities = [];
    this.distanceManager.resetAllDistanceEntities();
  }
  /** @eyes-analysis
   * 源码扩展或访问入口；调用 this._app.getManager, this._app.getManager("layer").setTarget, this._app.getManager("selection").selectEntity, this.app.getManager, this.app.getManager("scene").setEntitiesForceVisible, this.distanceManager.setSourceDistanceEntity；写入 。
   * 调用线索：this._app.getManager、this._app.getManager("layer").setTarget、this._app.getManager("selection").selectEntity、this.app.getManager、this.app.getManager("scene").setEntitiesForceVisible等。
   */
  async _updateResources({
    spaceObject: spaceObject
  }) {
    this.app.getManager("scene").setEntitiesForceVisible([spaceObject], false);
    this.distanceManager.setSourceDistanceEntity(spaceObject);
    this._app.getManager("layer").setTarget(spaceObject);
    this._app.getManager("selection").selectEntity(spaceObject);
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, this._app.getComponent, DisplayNames.join, Manager.currentRoute.url.match, Component.onRouteChange。
   * 调用线索：breadcrumbComponent.onRouteChange、routerManager.currentRoute.url.match、super._updateComponents、targetDisplayNames.join、this._app.getComponent等。
   */
  async _updateComponents(t) {
    super._updateComponents(t);
    const routerManager = this._app.getManager("router");
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const {
      targetDisplayNames: targetDisplayNames
    } = this.distanceManager;
    const n = "Distance to" + (targetDisplayNames.length ? ` ${targetDisplayNames.join(" & ")}` : "");
    breadcrumbComponent._crumbTexts.distance = n;
    const o = routerManager.currentRoute.url.match(/[^/]+/g);
    breadcrumbComponent.onRouteChange({
      routeParts: o
    });
  }
  /** @eyes-analysis
   * 等待所需实体就位；调用 this.app.getManager, Manager.parseTime, Manager.getTime, Manager.momentToET, this.distanceManager.measureDistance, this.distancePanel.setIsLoading, this._app.scene.waitTillEntitiesInPlace, this._checkCoverageOverlap, this.distanceManager.setTempErrorResult, this._app.getManager, this.distanceManager.setIsWaitingForEntities, this.distanceManager.updateMeasurement；写入 _redirect。
   * 状态写入：_redirect。
   * 调用线索：this._app.getManager、this._app.getManager("router").navigate、this._app.scene.waitTillEntitiesInPlace、this._checkCoverageOverlap、this.app.getManager等。
   */
  async _checkReady(t) {
    const timeManager = this.app.getManager("time");
    const i = t.time ? timeManager.parseTime(t.time) : timeManager.getTime();
    const s = timeManager.momentToET(i);
    const n = this.distanceManager.measureDistance(false, s);
    if (this.distanceManager.hasTarget && this.distancePanel.setIsLoading(true), await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities, s), this.distancePanel.setIsLoading(false), !t.cancelToken.isCanceled) {
      if (this.distanceManager.hasTarget && !this._checkCoverageOverlap(t)) {
        await this.distanceManager.setTempErrorResult("« Source and target do not co-exist »");
        this._redirect = true;
        return void this._app.getManager("router").navigate({
          __remove: ["to"]
        });
      }
      this.distanceManager.setIsWaitingForEntities(false);
      this._redirect = false;
      !n && this.distanceManager.updateMeasurement(null, true);
    }
  }
  /** @eyes-analysis
   * 执行 _checkCoverageOverlap 对应的组件业务步骤；调用 this.app.getManager, Manager.getDefaultLimits, Manager.getCoverage, Manager.setMin, Manager.setMax, Manager.getTime, Manager.isWithinLimits, Manager.getLimits, this.app.getComponent, Manager.navigate, Manager.getTimeUrl；写入 _redirect。
   * 状态写入：_redirect。
   * 调用线索：c.valueOf、c?.isValid、d?.isValid、d?.valueOf、h?.isValid等。
   */
  _checkCoverageOverlap(t) {
    const timeManager = this.app.getManager("time");
    const sceneManager = this.app.getManager("scene");
    const routerManager = this.app.getManager("router");
    const {
      id: id
    } = this.distanceManager.sourceDistanceEntity || {};
    const {
      id: o
    } = this.distanceManager.targetDistanceEntities[0] || {};
    const {
      min: min,
      max: max
    } = timeManager.getDefaultLimits();
    const {
      min: l,
      max: c
    } = id ? sceneManager.getCoverage(id) : {};
    const {
      min: h,
      max: d
    } = o ? sceneManager.getCoverage(o) : {};
    const u = l?.isValid() ? l.valueOf() : min.valueOf();
    const p = c?.isValid() ? c.valueOf() : max.valueOf();
    const _ = h?.isValid() ? h?.valueOf() : min.valueOf();
    const m = d?.isValid() ? d?.valueOf() : max.valueOf();
    const g = _ && _ >= u ? _ : u;
    const y = m && m <= p ? m : p;
    if (!(g < y)) return false;
    timeManager.setMin(g);
    timeManager.setMax(y);
    const f = timeManager.getTime();
    const T = timeManager.isWithinLimits(f);
    if (-1 === T || 1 === T) {
      const {
        min: t
      } = timeManager.getLimits();
      if (t.isValid()) {
        routerManager._previousRoute = {
          ...routerManager._currentRoute
        };
        this.app.getComponent("timecontrolsCollapsible")?.setExpanded(true);
        this._redirect = true;
        routerManager.navigate({
          time: timeManager.getTimeUrl(t)
        });
        return false;
      }
    }
    return true;
  }
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this.distanceManager.camToBetweenPos, this.app.cameraScripts.goToCelestialObject, this.distanceManager.setBetweenPosHidden。
   * 调用线索：this.app.cameraScripts.goToCelestialObject、this.distanceManager.camToBetweenPos、this.distanceManager.setBetweenPosHidden。
   */
  async _updateCamera() {
    const {
      id: id
    } = this.distanceManager.sourceDistanceEntity || {};
    const {
      hasTarget: hasTarget,
      measuredDistance: measuredDistance
    } = this.distanceManager;
    hasTarget ? await this.distanceManager.camToBetweenPos({
      force: true
    }) : await this.app.cameraScripts.goToCelestialObject(id, {
      distance: 3
    });
    hasTarget && measuredDistance >= 0 && this.distanceManager.setBetweenPosHidden(false);
  }
  /** @eyes-analysis
   * 执行 _updateCollapsibleMenu 对应的组件业务步骤；调用 this._collapsibleItemOptions.filter, this._collapsibleItemOptions.push, super._updateCollapsibleMenu；写入 _collapsibleItemOptions。
   * 状态写入：_collapsibleItemOptions。
   * 调用线索：Eyes.AppUtils.isMobile、super._updateCollapsibleMenu、this._collapsibleItemOptions.filter、this._collapsibleItemOptions.push。
   */
  _updateCollapsibleMenu(t = Eyes.AppUtils.isMobile()) {
    this._collapsibleItemOptions = this._collapsibleItemOptions.filter(t => "Time Controls" === t.itemTitle && (t.expand = false, true));
    t && this._collapsibleItemOptions.push({
      itemTitle: "Distance",
      componentNames: ["distancePanel"],
      positionIndex: 0,
      dimensions: {
        width: {
          min: 320,
          max: 400
        },
        height: {
          min: 30,
          max: 150
        }
      }
    });
    super._updateCollapsibleMenu();
  }
  /** @eyes-analysis
   * 执行 onIsMobileChange 对应的组件业务步骤；调用 this._updateCollapsibleMenu, Promise.all, this._collapsibleItems.find, this.distancePanel.setParent；写入 _collapsibleItems。
   * 状态写入：_collapsibleItems。
   * 调用线索：Promise.all、Promise.all(this._collapsibleItems).then、t.filter、t.getState、this._collapsibleItems.find等。
   */
  async onIsMobileChange(t) {
    this._updateCollapsibleMenu(t);
    this._collapsibleItems = await Promise.all(this._collapsibleItems).then(t => t.filter(t => t));
    const e = this._collapsibleItems.find(t => "Distance" === t.getState("itemTitle"));
    const i = t && e?._children.componentContainer || this.app._dynamicElement;
    this.distancePanel.setParent(i);
  }
  /** @eyes-analysis
   * 执行 setBreadcrumbStaticTextVisible 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：Eyes.AppUtils.isMobile、breadcrumbComponent?._element.querySelector、this._app.getComponent。
   */
  setBreadcrumbStaticTextVisible(t = !Eyes.AppUtils.isMobile()) {
    const breadcrumbComponent = this._app.getComponent("breadcrumb");
    const i = breadcrumbComponent?._element.querySelector("h1");
    i && (i.style.display = t ? "" : "none");
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this.setBreadcrumbStaticTextVisible。
   * 调用线索：super.resize、this.setBreadcrumbStaticTextVisible。
   */
  resize() {
    super.resize();
    this.setBreadcrumbStaticTextVisible();
  }
  /** @eyes-analysis
   * 执行 shouldOffsetRight 对应的组件业务步骤。
   */
  get shouldOffsetRight() {
    return false;
  }
  /** @eyes-analysis
   * 执行 shouldOffsetUp 对应的组件业务步骤。
   */
  get shouldOffsetUp() {
    return false;
  }
}
export { DistanceView };
