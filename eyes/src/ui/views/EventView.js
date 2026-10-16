// Recovered from app.js:1373291-1381946.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
import Unidentified777 from "../../vendor/modules/Unidentified777.cjs";
var getUnidentified777 = () => Unidentified777;
class EventView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._rules.spaceObject = {
      value: entityId => null !== this._app.getManager("content").getEntityInfo(entityId)
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
  async onEnter(routeParams) {
    this._app.getComponent("clockShortcut").setCallback(this._backToLive);
    this._offsetPanel = this._app.getComponent("contentPanel");
    await super.onEnter(routeParams);
  }
  async onLeave(routeParams) {
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    this.app.getManager("cameraFollow").setEnabled(false, {
      resetCam: false,
      resetLimits: false,
      removeQueries: false
    });
    await super.onLeave(routeParams);
    this._app.getComponent("timeControls")?.isEnabled() && this._app.getComponent("timeControls")?._cMenuParent.setExpanded(true);
  }
  async onQueryChange(routeParams) {
    await super.onQueryChange(routeParams);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    await contentPanelComponent.onQueryChange(routeParams);
  }
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  _reset(routeParams) {
    super._reset(routeParams);
    this._entityInfo = null;
    this._entityDesc = null;
    this._scEvents = null;
    this._scOrderedEvents = null;
    this._eventName = null;
    this._eventInfo = null;
    this._eventDesc = null;
    this._hasLoaded = false;
    this._onLoaded = null;
    this._target = routeParams.spaceObject;
  }
  // 事件列表、对象描述与单事件描述分开加载；每次异步加载后检查取消令牌，避免已经离开的路由继续读取共享 content 上下文。
  async _updateResources(routeParams) {
    if (this._app.getManager("layer").setTarget(this._target), this._app.getManager("selection").selectEntity(this._target), this._entityInfo = this._app.getManager("content").getEntityInfo(this._target), null === this._entityInfo) return void this._handleError(`EventView._updateResources: Cannot find entity named ${this._target}.`);
    if (this._app.getManager("content").resetContext(), this._hasLoaded = false, await this._app.getManager("content").loadEvents(this._target, {
      all: "all_events"
    }), routeParams.cancelToken.isCanceled) return;
    if (null === this._app.getManager("content").context.events) return void this._handleError(`EventView._updateResources: Cannot find events list of ${this._target}.`);
    if (this._scEvents = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.events), null !== this._app.getManager("content").context.orderedEvents && (this._scOrderedEvents = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.orderedEvents)), await this._app.getManager("content").loadDescriptions([this._target]), routeParams.cancelToken.isCanceled) return;
    if (null !== this._app.getManager("content").context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context[this._target])), void 0 !== routeParams.child) {
      if (void 0 === this._scEvents[routeParams.child]) {
        this._eventName = null;
        return void this._handleError(`EventView._updateResources: Cannot find event named ${routeParams.child}.`);
      }
      this._eventName = routeParams.child;
      this._eventInfo = this._scEvents[this._eventName];
    } else {
      this._eventName = null;
      this._eventInfo = null;
    }
    if (null !== this._eventName) {
      if (await this._app.getManager("content").loadEvents(this._target, {
        event: this._eventName
      }), routeParams.cancelToken.isCanceled) return;
      null !== this._app.getManager("content").context.eventDesc && (this._eventDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context.eventDesc));
    } else this._eventDesc = null;
    const eventTargetId = this._eventDesc?.target || this._eventInfo?.target;
    const sceneManager = this.app.getManager("scene");
    const {
      followId: followId
    } = routeParams;
    const requiredEntityIds = [];
    this._eventDesc?.related && requiredEntityIds.push(...this._eventDesc.related);
    eventTargetId && requiredEntityIds.push(eventTargetId);
    null !== this._target && requiredEntityIds.push(this._target);
    followId && requiredEntityIds.push(followId);
    const uniqueEntityIds = [...new Set(requiredEntityIds)];
    sceneManager.setEntitiesForceVisible(uniqueEntityIds, false);
  }
  async _updateComponents(routeParams) {
    await super._updateComponents(routeParams);
    const routerManager = this._app.getManager("router");
    const routeParts = routerManager.currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts.filter(routePart => "events" !== routePart)
    });
    this._app.getManager("layer").toggleLayer("heliosphere", {
      parentId: "sun"
    }, false);
    const contentPanelComponent = this._app.getComponent("contentPanel");
    if (contentPanelComponent) {
      const shouldCollapse = true === routeParams.embed || false === routeParams.detailPanel;
      this._eventName && (await contentPanelComponent.onRouteChangeEvent(this._target, this._eventName, this._eventInfo, this._eventDesc, this._scOrderedEvents, routeParams.cancelToken, routeParts));
      contentPanelComponent.show();
      shouldCollapse && contentPanelComponent.collapse();
    }
    if (this._app.getComponent("timeControls")?.isEnabled() && this._app.getComponent("timeControls")?._cMenuParent.setExpanded(false), routeParams.cancelToken.isCanceled) return;
    this._collapsibleItems = await Promise.all(this._collapsibleItems).then(resolvedItems => resolvedItems.filter(collapsibleItem => collapsibleItem));
    const timelineItem = this._collapsibleItems.find(collapsibleItem => "Events Timeline" === collapsibleItem.getState("itemTitle"));
    routerManager.previousRoute.params?.spaceObject !== this._target && timelineItem?.hide();
    const {
      id: id,
      iauName: iauName,
      displayName: displayName
    } = this._entityInfo;
    const {
      dates: dates
    } = this._entityDesc;
    const timelineTarget = {
      id: id,
      title: iauName || displayName,
      dates: dates,
      orderedEvents: this._scOrderedEvents
    };
    this._onLoaded = () => {
      const eventsTimelineComponent = this._app.getComponent("eventsTimeline");
      eventsTimelineComponent.setTarget(timelineTarget);
      eventsTimelineComponent.resize();
      timelineItem?.show();
    };
    this._hasLoaded && (this._onLoaded(), this._onLoaded = null);
  }
  // 事件时间与实体覆盖共同限定播放区间；显式暂停当前帧优先于默认事件速率。重定向延迟到 after，避免在本轮相机更新中途切换路由。
  async _updateTimeForTarget(routeParams, waitForEntity = true) {
    const {
      start: start,
      end: end
    } = this._eventInfo || {};
    const needsEntityCoverage = !start || !end;
    await super._updateTimeForTarget(routeParams, needsEntityCoverage);
    const timeManager = this._app.getManager("time");
    const routerManager = this._app.getManager("router");
    const {
      setTimeLimits: setTimeLimits
    } = routeParams;
    const eventRate = this._eventInfo?.rate || this._eventDesc?.rate;
    const currentTime = (routerManager.previousRoute.query?.includes("followId"), timeManager.getTime());
    const {
      min: min,
      max: max
    } = this._app.getManager("scene").getCoverage(this._target);
    this._eventInfo && (start || (this._eventInfo.start = min), end || (this._eventInfo.end = max));
    const eventStartValue = start || min.toISOString();
    const eventEndValue = end || max.toISOString();
    const [eventStart, eventEnd] = [eventStartValue && getUnidentified777()(eventStartValue), eventEndValue && getUnidentified777()(eventEndValue)];
    eventStart && eventEnd && this._setMinEventEnd(eventStart, eventEnd);
    const rateUnspecified = void 0 === routeParams.rate;
    const timeUnspecified = void 0 === routeParams.time;
    const hasNoTimeOverrides = rateUnspecified && timeUnspecified;
    const isAtEventEnd = currentTime.valueOf() === eventEnd?.valueOf();
    const isExplicitlyPausedHere = !hasNoTimeOverrides && 0 === routeParams.rate && getUnidentified777()(routeParams.time).valueOf() === currentTime.valueOf();
    const shouldResetToStart = eventStart && (hasNoTimeOverrides || eventEnd && currentTime.isAfter(eventEnd) || eventStart && currentTime.isBefore(eventStart) || isAtEventEnd && routeParams.rate > 0);
    const shouldApplyEventRate = void 0 !== eventRate && (rateUnspecified || shouldResetToStart);
    setTimeLimits && (eventStart && timeManager.setMin(eventStart), eventEnd && timeManager.setMax(eventEnd));
    let requestedTime = timeManager.parseTime(routeParams.time);
    const limitDirection = timeManager.isWithinLimits(requestedTime);
    const isOutsideLimits = -1 === limitDirection || 1 === limitDirection;
    if (requestedTime?.isValid() || (requestedTime = timeManager.parseTime(eventStart), timeManager.setTime(requestedTime)), isOutsideLimits) {
      const objectRoute = `/${this._target}`;
      let redirectTime = timeManager.getTimeUrl(requestedTime);
      let redirectRate = 1;
      let limitMessage = "time outside event limits";
      const {
        min: coverageStart,
        max: coverageEnd
      } = this._app.getManager("scene").getCoverage(this._target);
      requestedTime.isAfter(coverageEnd) ? (redirectTime = timeManager.getTimeUrl(coverageEnd), redirectRate = 0, limitMessage = "time exceeds mission end") : requestedTime.isBefore(coverageStart) && (redirectTime = timeManager.getTimeUrl(coverageStart), limitMessage = "time precedes mission start");
      const redirectQuery = {
        rate: redirectRate,
        time: redirectTime
      };
      timeManager.setMin(coverageStart ?? timeManager.getDefaultLimits().min);
      timeManager.setMax(coverageEnd ?? timeManager.getDefaultLimits().max);
      this._app.getComponent("clock")?.setLimitMessage(limitDirection, limitMessage);
      return void (await routerManager.navigate(redirectQuery, objectRoute));
    }
    isExplicitlyPausedHere || !shouldApplyEventRate && !shouldResetToStart || (this._onAfter = () => {
      routerManager.reroute(routerManager.currentRoute.url, {
        ...(shouldApplyEventRate && {
          rate: eventRate
        }),
        ...(shouldResetToStart && {
          time: timeManager.getTimeUrl(eventStart)
        })
      });
    });
  }
  // 直接扩展传入的结束时间对象，使短于一分钟的事件仍有可操作的播放范围；调用方持有同一个时间对象。
  _setMinEventEnd(eventStart, eventEnd) {
    const durationMillis = Math.abs(eventEnd.valueOf() - eventStart.valueOf());
    if (durationMillis < 6e4) {
      const missingMillis = 6e4 - durationMillis;
      eventEnd.add(missingMillis, "ms");
    }
  }
  _loaded(loadedEntityId) {
    super._loaded(loadedEntityId);
    "function" == typeof this._onLoaded && this._onLoaded();
    this._onLoaded = null;
    this._hasLoaded = true;
  }
  _backToLive() {
    const timeManager = this._app.getManager("time");
    const liveTime = timeManager.getTimeUrl(timeManager.getNow());
    this._app.getManager("router").navigate({
      time: liveTime,
      rate: 1
    });
  }
  replayEvent(resetCamera = true) {
    const routerManager = this._app.getManager("router");
    const timeManager = this._app.getManager("time");
    const currentTime = timeManager.getTime();
    const hasFollowTarget = "followId" in routerManager.query;
    if (resetCamera && "event" === routerManager.currentView && !hasFollowTarget) {
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
    const isAtStart = currentTime.valueOf() === min.valueOf();
    const replayQuery = {
      rate: "event" === routerManager.currentView ? this._eventInfo?.rate ?? this._eventDesc?.rate ?? 1 : 1,
      ...(min && !isAtStart && {
        time: timeManager.getTimeUrl(min)
      })
    };
    Eyes.AppUtils.deepEqual(routerManager.query, replayQuery) ? routerManager.reload() : routerManager.navigate(replayQuery);
  }
  async _updateCamera(routeParams) {
    const eventCameraInfo = {
      ...this._eventDesc,
      ...this._eventInfo
    };
    const {
      target: target,
      related: related
    } = eventCameraInfo;
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
      } = eventCameraInfo;
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
  _shouldHideControls() {
    const isPanelVisible = this._app.getComponent("contentPanel")?.getState("isVisible");
    const isPanelExpanded = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && isPanelVisible && isPanelExpanded;
  }
  after() {
    "function" == typeof this._onAfter && this._onAfter();
    this._onAfter = null;
  }
}
export { EventView };
