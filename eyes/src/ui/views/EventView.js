/** @eyes-analysis
 * 文件职责：对象事件的有效时间、重播及相关实体相机
 * 依据：imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js, ../../vendor/modules/Unidentified777.cjs；manager dependencies: content, layer, cameraFollow, selection, scene, router, time
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1373291-1381946.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
var getUnidentified777 = () => Unidentified777;
/** @eyes-analysis
 * 类职责：对象事件的有效时间、重播及相关实体相机；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：EventView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EventView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.getManager, this.bindFunctions；写入 _entityInfo, _entityDesc, _scEvents, _scOrderedEvents, _eventName, _eventInfo, _eventDesc, _isSpacecraft, _hasLoaded, _onLoaded, _onAfter。
   * 状态写入：_entityDesc、_entityInfo、_eventDesc、_eventInfo、_eventName、_hasLoaded、_isSpacecraft、_onAfter等；完整记录见索引。
   * 调用线索：super、this._app.getManager、this._app.getManager("content").getEntityInfo、this.bindFunctions。
   */
  constructor(...t) {
    super(...t);
    this._rules.spaceObject = {
      value: t => null !== this._app.getManager("content").getEntityInfo(t)
    };
    this._entityInfo = null;
    this._entityDesc = null;
    this._scEvents = null;
    this._scOrderedEvents = null;
    this._eventName = null;
    this._eventInfo = null;
    this._eventDesc = null;
    this._isSpacecraft = true;
    this._hasLoaded = false;
    this._onLoaded = null;
    this._onAfter = null;
    this.bindFunctions(["_backToLive"]);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
   * 状态写入：_offsetPanel。
   * 调用线索：super.onEnter、this._app.getComponent、this._app.getComponent("clockShortcut").setCallback。
   */
  async onEnter(t) {
    this._app.getComponent("clockShortcut").setCallback(this._backToLive);
    this._offsetPanel = this._app.getComponent("contentPanel");
    await super.onEnter(t);
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this._app.getManager, this.app.getManager, super.onLeave, this._app.getComponent, MenuParent.setExpanded。
   * 调用线索：super.onLeave、this._app.getComponent、this._app.getComponent("timeControls")?._cMenuParent.setExpanded、this._app.getComponent("timeControls")?.isEnabled、this._app.getManager等。
   */
  async onLeave(t) {
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    this.app.getManager("cameraFollow").setEnabled(false, {
      resetCam: false,
      resetLimits: false,
      removeQueries: false
    });
    await super.onLeave(t);
    this._app.getComponent("timeControls")?.isEnabled() && this._app.getComponent("timeControls")?._cMenuParent.setExpanded(true);
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 super.onQueryChange, this._app.getComponent, PanelComponent.onQueryChange。
   * 调用线索：contentPanelComponent.onQueryChange、super.onQueryChange、this._app.getComponent。
   */
  async onQueryChange(t) {
    await super.onQueryChange(t);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    await contentPanelComponent.onQueryChange(t);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
   * 调用线索：contentPanelComponent.registerCallback、super.registerCallbacks、this._app.getComponent。
   */
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
   * 调用线索：contentPanelComponent.removeCallback、super.removeCallbacks、this._app.getComponent。
   */
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 super._reset；写入 _entityInfo, _entityDesc, _scEvents, _scOrderedEvents, _eventName, _eventInfo, _eventDesc, _hasLoaded, _onLoaded, _target。
   * 状态写入：_entityDesc、_entityInfo、_eventDesc、_eventInfo、_eventName、_hasLoaded、_onLoaded、_scEvents等；完整记录见索引。
   * 调用线索：super._reset。
   */
  _reset(t) {
    super._reset(t);
    this._entityInfo = null;
    this._entityDesc = null;
    this._scEvents = null;
    this._scOrderedEvents = null;
    this._eventName = null;
    this._eventInfo = null;
    this._eventDesc = null;
    this._hasLoaded = false;
    this._onLoaded = null;
    this._target = t.spaceObject;
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this._app.getManager, this._handleError, Eyes.AppUtils.deepCopy, this.app.getManager, Manager.setEntitiesForceVisible；写入 _entityInfo, _hasLoaded, _scEvents, _scOrderedEvents, _entityDesc, _eventName, _eventInfo, _eventDesc。
   * 状态写入：_entityDesc、_entityInfo、_eventDesc、_eventInfo、_eventName、_hasLoaded、_scEvents、_scOrderedEvents。
   * 调用线索：Eyes.AppUtils.deepCopy、new Set、o.push、sceneManager.setEntitiesForceVisible、this._app.getManager等。
   */
  async _updateResources(t) {
    if (this._app.getManager("layer").setTarget(this._target), this._app.getManager("selection").selectEntity(this._target), this._entityInfo = this._app.getManager("content").getEntityInfo(this._target), null === this._entityInfo) return void this._handleError(`EventView._updateResources: Cannot find entity named ${this._target}.`);
    if (this._app.getManager("content").resetContext(), this._hasLoaded = false, await this._app.getManager("content").loadEvents(this._target, {
      all: "all_events"
    }), t.cancelToken.isCanceled) return;
    if (null === this._app.getManager("content").context.events) return void this._handleError(`EventView._updateResources: Cannot find events list of ${this._target}.`);
    if (this._scEvents = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.events), null !== this._app.getManager("content").context.orderedEvents && (this._scOrderedEvents = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.orderedEvents)), await this._app.getManager("content").loadDescriptions([this._target]), t.cancelToken.isCanceled) return;
    if (null !== this._app.getManager("content").context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context[this._target])), void 0 !== t.child) {
      if (void 0 === this._scEvents[t.child]) {
        this._eventName = null;
        return void this._handleError(`EventView._updateResources: Cannot find event named ${t.child}.`);
      }
      this._eventName = t.child;
      this._eventInfo = this._scEvents[this._eventName];
    } else {
      this._eventName = null;
      this._eventInfo = null;
    }
    if (null !== this._eventName) {
      if (await this._app.getManager("content").loadEvents(this._target, {
        event: this._eventName
      }), t.cancelToken.isCanceled) return;
      null !== this._app.getManager("content").context.eventDesc && (this._eventDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.eventDesc));
    } else this._eventDesc = null;
    const e = this._eventDesc?.target || this._eventInfo?.target;
    const sceneManager = this.app.getManager("scene");
    const {
      followId: followId
    } = t;
    const o = [];
    this._eventDesc?.related && o.push(...this._eventDesc.related);
    e && o.push(e);
    null !== this._target && o.push(this._target);
    followId && o.push(followId);
    const r = [...new Set(o)];
    sceneManager.setEntitiesForceVisible(r, false);
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Manager.currentRoute.url.match, this._app.getComponent, PanelComponent.onRouteChangeEvent, PanelComponent.show, PanelComponent.collapse, MenuParent.setExpanded, Promise.all, this._collapsibleItems.find, TimelineComponent.setTarget, TimelineComponent.resize, this._onLoaded；写入 _collapsibleItems, _onLoaded。
   * 状态写入：_collapsibleItems、_onLoaded。
   * 调用线索：Promise.all、Promise.all(this._collapsibleItems).then、contentPanelComponent.collapse、contentPanelComponent.onRouteChangeEvent、contentPanelComponent.show等。
   */
  async _updateComponents(t) {
    await super._updateComponents(t);
    const routerManager = this._app.getManager("router");
    const i = routerManager.currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: i.filter(t => "events" !== t)
    });
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    if (contentPanelComponent) {
      const e = true === t.embed || false === t.detailPanel;
      this._eventName && (await contentPanelComponent.onRouteChangeEvent(this._target, this._eventName, this._eventInfo, this._eventDesc, this._scOrderedEvents, t.cancelToken, i));
      contentPanelComponent.show();
      e && contentPanelComponent.collapse();
    }
    if (this._app.getComponent("timeControls")?.isEnabled() && this._app.getComponent("timeControls")?._cMenuParent.setExpanded(false), t.cancelToken.isCanceled) return;
    this._collapsibleItems = await Promise.all(this._collapsibleItems).then(t => t.filter(t => t));
    const n = this._collapsibleItems.find(t => "Events Timeline" === t.getState("itemTitle"));
    routerManager.previousRoute.params?.spaceObject !== this._target && n?.hide();
    const {
      id: id,
      iauName: iauName,
      displayName: displayName
    } = this._entityInfo;
    const {
      dates: dates
    } = this._entityDesc;
    const c = {
      id: id,
      title: iauName || displayName,
      dates: dates,
      orderedEvents: this._scOrderedEvents
    };
    this._onLoaded = () => {
      const eventsTimelineComponent = this._app.getComponent("eventsTimeline");
      eventsTimelineComponent.setTarget(c);
      eventsTimelineComponent.resize();
      n?.show();
    };
    this._hasLoaded && (this._onLoaded(), this._onLoaded = null);
  }
  /** @eyes-analysis
   * 将时间限制收敛到目标覆盖范围；调用 super._updateTimeForTarget, this._app.getManager, Manager.getTime, this._setMinEventEnd, Manager.setMin, Manager.setMax, Manager.parseTime, Manager.isWithinLimits, Manager.setTime, Manager.getTimeUrl, C.isAfter, C.isBefore, Manager.getDefaultLimits, this._app.getComponent；写入 _onAfter。
   * 状态写入：_eventInfo.end、_eventInfo.start、_onAfter。
   * 调用线索：C.isAfter、C.isBefore、C?.isValid、g?.valueOf、getUnidentified777等。
   */
  async _updateTimeForTarget(t, e = true) {
    const {
      start: start,
      end: end
    } = this._eventInfo || {};
    const n = !start || !end;
    await super._updateTimeForTarget(t, n);
    const timeManager = this._app.getManager("time");
    const routerManager = this._app.getManager("router");
    const {
      setTimeLimits: setTimeLimits
    } = t;
    const c = this._eventInfo?.rate || this._eventDesc?.rate;
    const h = (routerManager.previousRoute.query?.includes("followId"), timeManager.getTime());
    const {
      min: min,
      max: max
    } = this._app.getManager("scene").getCoverage(this._target);
    this._eventInfo && (start || (this._eventInfo.start = min), end || (this._eventInfo.end = max));
    const p = start || min.toISOString();
    const _ = end || max.toISOString();
    const [m, g] = [p && getUnidentified777()(p), _ && getUnidentified777()(_)];
    m && g && this._setMinEventEnd(m, g);
    const y = void 0 === t.rate;
    const f = void 0 === t.time;
    const T = y && f;
    const b = h.valueOf() === g?.valueOf();
    const E = !T && 0 === t.rate && getUnidentified777()(t.time).valueOf() === h.valueOf();
    const S = m && (T || g && h.isAfter(g) || m && h.isBefore(m) || b && t.rate > 0);
    const v = void 0 !== c && (y || S);
    setTimeLimits && (m && timeManager.setMin(m), g && timeManager.setMax(g));
    let C = timeManager.parseTime(t.time);
    const x = timeManager.isWithinLimits(C);
    const I = -1 === x || 1 === x;
    if (C?.isValid() || (C = timeManager.parseTime(m), timeManager.setTime(C)), I) {
      const t = `/${this._target}`;
      let e = timeManager.getTimeUrl(C);
      let i = 1;
      let s = "time outside event limits";
      const {
        min: n,
        max: r
      } = this._app.getManager("scene").getCoverage(this._target);
      C.isAfter(r) ? (e = timeManager.getTimeUrl(r), i = 0, s = "time exceeds mission end") : C.isBefore(n) && (e = timeManager.getTimeUrl(n), s = "time precedes mission start");
      const l = {
        rate: i,
        time: e
      };
      timeManager.setMin(n ?? timeManager.getDefaultLimits().min);
      timeManager.setMax(r ?? timeManager.getDefaultLimits().max);
      this._app.getComponent("clock")?.setLimitMessage(x, s);
      return void (await routerManager.navigate(l, t));
    }
    E || !v && !S || (this._onAfter = () => {
      routerManager.reroute(routerManager.currentRoute.url, {
        ...(v && {
          rate: c
        }),
        ...(S && {
          time: timeManager.getTimeUrl(m)
        })
      });
    });
  }
  /** @eyes-analysis
   * 执行 _setMinEventEnd 对应的组件业务步骤；调用 Math.abs。
   * 调用线索：Math.abs、e.add、e.valueOf、t.valueOf。
   */
  _setMinEventEnd(t, e) {
    const i = Math.abs(e.valueOf() - t.valueOf());
    if (i < 6e4) {
      const t = 6e4 - i;
      e.add(t, "ms");
    }
  }
  /** @eyes-analysis
   * 执行 _loaded 对应的组件业务步骤；调用 super._loaded, this._onLoaded；写入 _onLoaded, _hasLoaded。
   * 状态写入：_hasLoaded、_onLoaded。
   * 调用线索：super._loaded、this._onLoaded。
   */
  _loaded(t) {
    super._loaded(t);
    "function" == typeof this._onLoaded && this._onLoaded();
    this._onLoaded = null;
    this._hasLoaded = true;
  }
  /** @eyes-analysis
   * 执行 _backToLive 对应的组件业务步骤；调用 this._app.getManager, Manager.getTimeUrl, Manager.getNow。
   * 调用线索：this._app.getManager、this._app.getManager("router").navigate、timeManager.getNow、timeManager.getTimeUrl。
   */
  _backToLive() {
    const timeManager = this._app.getManager("time");
    const e = timeManager.getTimeUrl(timeManager.getNow());
    this._app.getManager("router").navigate({
      time: e,
      rate: 1
    });
  }
  /** @eyes-analysis
   * 执行 replayEvent 对应的组件业务步骤；调用 this._app.getManager, Manager.getTime, Manager.lastRouteResolved, this._updateCamera, Manager.getTimeUrl, Eyes.AppUtils.deepEqual, Manager.reload, Manager.navigate。
   * 调用线索：Eyes.AppUtils.deepEqual、min.valueOf、n.valueOf、routerManager.lastRouteResolved、routerManager.navigate等。
   */
  replayEvent(t = true) {
    const routerManager = this._app.getManager("router");
    const timeManager = this._app.getManager("time");
    const n = timeManager.getTime();
    const o = "followId" in routerManager.query;
    if (t && "event" === routerManager.currentView && !o) {
      const {
        params: params
      } = routerManager.lastRouteResolved();
      this._updateCamera({
        ...params
      });
    }
    const {
      min: min
    } = timeManager.timeLimits;
    const a = n.valueOf() === min.valueOf();
    const l = {
      rate: "event" === routerManager.currentView ? this._eventInfo?.rate ?? this._eventDesc?.rate ?? 1 : 1,
      ...(min && !a && {
        time: timeManager.getTimeUrl(min)
      })
    };
    Eyes.AppUtils.deepEqual(routerManager.query, l) ? routerManager.reload() : routerManager.navigate(l);
  }
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this._app.getManager, this._app.cameraScripts.alignSpacecraftPlanet, this._app.cameraScripts.alignObjects, this._app.cameraScripts.goToSpacecraft, this.app.getManager。
   * 调用线索：this._app.cameraScripts.alignObjects、this._app.cameraScripts.alignSpacecraftPlanet、this._app.cameraScripts.goToSpacecraft、this._app.getManager、this._app.getManager("cameraFollow").follow等。
   */
  async _updateCamera(t) {
    const e = {
      ...this._eventDesc,
      ...this._eventInfo
    };
    const {
      target: target,
      related: related
    } = e;
    const {
      followId: followId
    } = this._app.getManager("router").query;
    if (followId) return;
    if (this._app.getManager("content").hasLanded(this._entityInfo)) await this._app.cameraScripts.alignSpacecraftPlanet(this._target);else if (target) {
      const {
        duration: duration,
        distance: distance,
        horizontalOffset: horizontalOffset,
        verticalOffset: verticalOffset
      } = e;
      await this._app.cameraScripts.alignObjects(this._target, target, {
        duration: duration,
        distance: distance,
        horizontalOffset: horizontalOffset,
        verticalOffset: verticalOffset
      });
      this._app.getManager("cameraFollow").follow(target);
    } else await this._app.cameraScripts.goToSpacecraft(this._target);
    this.app.getManager("scene").setEntitiesForceVisible([...(related || []), ...(followId ? [followId] : []), ...(target ? [target] : []), ...(null !== this._target ? [this._target] : [])], true);
  }
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、this._app.getComponent、this._app.getComponent("contentPanel")?.getState。
   */
  _shouldHideControls() {
    const t = this._app.getComponent("contentPanel")?.getState("isVisible");
    const e = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && t && e;
  }
  /** @eyes-analysis
   * 执行路由更新后的收尾步骤；调用 this._onAfter；写入 _onAfter。
   * 状态写入：_onAfter。
   * 调用线索：this._onAfter。
   */
  after() {
    "function" == typeof this._onAfter && this._onAfter();
    this._onAfter = null;
  }
}
export { EventView };
