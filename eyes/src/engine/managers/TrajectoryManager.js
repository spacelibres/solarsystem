// Recovered from app.js:1405886-1422621.
/* 任务定义表与生命周期钩子分别拥有静态选项和交互行为；轨迹组件按任务 ID 挂在实体上，停用时移除任务轨迹并恢复默认轨迹、标签和时间控件。日期 URL 先转 ET 秒，逐帧检查选中任务终点与实体覆盖终点；关联 Voyager 的相对时间计算和强制加载规则保持原样。DOM 观察器只在启用期连接，帧回调由 _callbackEnabled 防止重复注册。 */
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../pioneer/index.js";
class TrajectoryManager extends Eyes.BaseManager {
  constructor(app) {
    super(app);
    this._app = app;
    this._entityId = null;
    this._prevEntityId = null;
    this._wasAlreadyEnabled = false;
    this._isEnabled = false;
    this._atSystem = false;
    this._urlMissionChoice = "primary";
    this._callbackEnabled = false;
    this.bindFunctions(["customEngineLoopCallback", "setEngineLoopCallback"]);
    this._eventNames.push("trajectorySelect");
    this._initCallbacks();
    this._offsetObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        "class" === mutation.attributeName && this._calcIndicatorPadding();
      });
    });
    this._resizeObserver = new ResizeObserver(() => {
      this._calcIndicatorPadding();
    });
  }
  getCustomMissions() {
    return missionDefinitions;
  }
  createTrajectory(entity, missionId, startTimeOverride = null) {
    let entityId = entity.getName();
    if ("" === entityId && (entityId = this._entityId), "all" === missionId) return;
    const {
      cameraOnEnterParams: cameraOnEnterParams
    } = missionDefinitions[entityId] ?? {};
    const missionOptions = missionDefinitions[entityId]?.missionOptions[missionId];
    const {
      start: start,
      end: end,
      color: color
    } = missionOptions ?? {};
    const startET = startTimeOverride ?? this._app.getManager("time").urlToET(start);
    const endET = this._app.getManager("time").urlToET(end);
    const trailComponent = entity.getComponent(Pioneer.TrailComponent, missionId) ?? entity.addComponent(Pioneer.TrailComponent, missionId);
    trailComponent.setAlphaFade(1);
    trailComponent.setColor(color ?? new Pioneer.Color(1, 1, 1, .7));
    cameraOnEnterParams?.system && trailComponent.setRelativeToEntity(cameraOnEnterParams.system);
    startET && (trailComponent.setRelativeStartTime(false), trailComponent.setStartTime(startET), trailComponent.setDrawStartTime(startET));
    endET ? (trailComponent.setEndTime(endET), trailComponent.setRelativeEndTime(false)) : (trailComponent.setEndTime(0), trailComponent.setRelativeEndTime(true));
    endET - startET > 2628e3 && trailComponent.setPointsPerFrame(18);
    trailComponent.setEnabled(false);
  }
  hasTrajectoryOptions(entityId) {
    return !!entityId && Object.keys(this.getCustomMissions()).includes(entityId);
  }
  async setEnabled(isEnabled, entityId, removedQueries = ["trajectory"]) {
    this._wasAlreadyEnabled = this._isEnabled;
    this._isEnabled = isEnabled;
    const {
      query: query
    } = this.app.getManager("router").currentRoute;
    const {
      trajectory: requestedMission
    } = this.app.getManager("router").parseQuery(query);
    this._urlMissionChoice = requestedMission;
    const missionIds = this.hasTrajectoryOptions(entityId) ? Object.keys(missionDefinitions[entityId]?.missionOptions) : null;
    missionIds && !missionIds.includes(requestedMission) && (this._urlMissionChoice = missionIds[0]);
    this._prevEntityId = this._entityId;
    this._entityId = entityId;
    this._toggleLayers();
    isEnabled ? (this._onEnable(), this._enterSelectedTrajectoryView(entityId, this._urlMissionChoice), this._resizeObserver.observe(document.body), this._offsetObserver.observe(document.body, {
      attributes: true
    })) : (await this._onDisable(), this._resizeObserver.disconnect(), this._offsetObserver.disconnect(), this._app.getManager("router").navigate({
      __remove: removedQueries
    }));
  }
  async _enterSelectedTrajectoryView(entityId, requestedMission) {
    this._entityId = entityId;
    let selectedMission = "primary";
    Object.keys(missionDefinitions[entityId]?.missionOptions)?.includes(requestedMission) && (selectedMission = requestedMission);
    const lifecycleHooks = missionLifecycleHooks[entityId];
    const {
      cameraOnEnterParams: cameraOnEnterParams
    } = missionDefinitions[entityId];
    this._atSystem || (await this.app.cameraScripts.goToSystem(cameraOnEnterParams.system), this._atSystem = true);
    this.triggerCallbacks("trajectorySelect", [selectedMission]);
    await lifecycleHooks?.onSelect?.(this.app, selectedMission);
    this._toggleLayers();
    Object.keys(missionDefinitions[entityId].missionOptions).forEach(missionId => {
      const radioButton = document.getElementById(`${missionId}-radio-button`);
      radioButton?.classList.toggle("checked", missionId === selectedMission);
    });
  }
  _toggleLayers() {
    const {
      hideLayers: hideLayers
    } = missionDefinitions[this._entityId] ?? missionDefinitions[this._prevEntityId] ?? {};
    hideLayers?.forEach(layerId => {
      this._app.getManager("layer").toggleLayer(layerId, {}, !this._isEnabled);
    });
    this._app.getComponent("layersBlock")?.syncAllLayerCheckboxes();
  }
  _onEnable() {
    if (this._wasAlreadyEnabled) return;
    const {
      showStoryClock: showStoryClock
    } = missionDefinitions[this._entityId] ?? {};
    missionLifecycleHooks[this._entityId]?.onCreate?.(this._app);
    const timeControlsComponent = this._app.getComponent("timeControls");
    timeControlsComponent?.isEnabled() && timeControlsComponent?.setEnabled(false);
    const clockShortcutComponent = this._app.getComponent("clockShortcut");
    clockShortcutComponent?.isEnabled() && clockShortcutComponent?.setEnabled(false);
    const clockComponent = this._app.getComponent("clock");
    clockComponent?.isEnabled() && clockComponent?.setEnabled(false);
    showStoryClock && (Eyes.AppUtils.isMobile() && document.getElementById("extended-controls")?.classList.add("mobile-bottom-margin"), this._app.getComponent("storyClock")?.setEnabled(true), this._app.getComponent("storyClock")?.show(), this._app.getComponent("storyClock")?.setState({
      allowEdit: false
    }));
    this._app.scene.getEntity(this._entityId)?.getComponent(Pioneer.TrailComponent)?.setEnabled(false);
    this._app.getManager("label").setClickable(false);
    this._app.getManager("selection").setClickable(false);
    this._app.getComponent("contentPanel")?.selectTab("viewOptions");
  }
  async _onDisable() {
    const timeManager = this._app.getManager("time");
    missionLifecycleHooks[this._entityId]?.onLeave?.(this._app);
    if (false !== this._app.getManager("router").configs.timeControls) {
      const timeControlsComponent = this._app.getComponent("timeControls");
      timeControlsComponent?.isEnabled() || timeControlsComponent?.setEnabled(true);
      const clockShortcutComponent = this._app.getComponent("clockShortcut");
      clockShortcutComponent?.isEnabled() || clockShortcutComponent?.setEnabled(true);
      const clockComponent = this._app.getComponent("clock");
      clockComponent?.isEnabled() || clockComponent?.setEnabled(true);
    }
    Eyes.AppUtils.isMobile() && document.getElementById("extended-controls")?.classList.remove("mobile-bottom-margin");
    this._app.getComponent("storyClock")?.setEnabled(false);
    const entityId = this._entityId ?? this._prevEntityId;
    if (entityId) {
      const entity = this._app.scene.getEntity(entityId);
      missionDefinitions[entityId]?.missionOptions && Object.keys(missionDefinitions[entityId].missionOptions).forEach(missionId => {
        const missionTrail = entity?.getComponent(Pioneer.TrailComponent, missionId);
        missionTrail && entity?.removeComponent(missionTrail);
      });
      this._setUpIndicatorForEntity(entity, false);
      missionDefinitions[entityId]?.associatedEntities?.length && missionDefinitions[entityId].associatedEntities.forEach(associatedEntityId => {
        const associatedEntity = this._app.pioneer.getScene("main").getEntity(associatedEntityId);
        associatedEntity && this.setUpAssociatedEntities(associatedEntity, false);
      });
    }
    const defaultTrail = this._app.pioneer.getScene("main")?.getEntity(this._entityId)?.getComponent(Pioneer.TrailComponent);
    defaultTrail?.setEnabled(true);
    this._app.getManager("time").getTimeRate() > this._app.getManager("time").getDefaultTimeRate() && this._app.getManager("time").resetTimeRate();
    this._callbackEnabled && this.setEngineLoopCallback(false);
    this._atSystem = false;
    this._app.getManager("label").setClickable(true);
    this._app.getManager("selection").setClickable(true);
    timeManager.getTimeRate() !== timeManager.getDefaultTimeRate() && timeManager.resetTimeRate();
    document.getElementById("trajectory-options-container")?.remove();
    this._toggleLayers();
    this._app.getComponent("contentPanel")?.selectTab("info");
  }
  isEnabled() {
    return this._isEnabled;
  }
  createUI(parentElement) {
    if (!parentElement) return;
    if (!(Array.from(parentElement.children).filter(childElement => childElement.classList.contains("trajectory-options")).length > 0)) {
      const entity = this._app.pioneer.getScene("main").getEntity(this._entityId);
      const optionsElement = this._createCheckboxOptions(entity);
      parentElement.appendChild(optionsElement);
      const exitButton = this._createExitButton();
      optionsElement?.appendChild(exitButton);
    }
  }
  _createExitButton() {
    const exitButton = document.createElement("button");
    exitButton.className = "trajectory-exit-button clickable";
    exitButton.innerHTML = "Exit Trajectory View";
    exitButton.addEventListener("click", () => {
      this.setEnabled(false, this._entityId);
      this._app.getComponent("cameraViewBlock") && this._app.getComponent("cameraViewBlock").goToDefaultView();
    });
    return exitButton;
  }
  _createCheckboxOptions(entity) {
    if (!entity) return;
    const optionsElement = document.createElement("div");
    optionsElement.className = "trajectory-options option clickable";
    optionsElement.id = "trajectory-options-container";
    const radioButtons = [];
    Object.keys(missionDefinitions[entity.getName()].missionOptions).forEach(missionId => {
      const missionOptions = missionDefinitions[entity.getName()].missionOptions[missionId];
      if (!missionOptions) return;
      this._trajectoryViewId = entity?.getName();
      const optionElement = document.createElement("div");
      optionElement.className = "option-container";
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = "mission";
      radioButton.className = "radio-button clickable";
      const radioId = `${missionId}-radio-button`;
      radioButton.id = radioId;
      const labelElement = document.createElement("label");
      labelElement.innerHTML = `Draw ${missionOptions?.displayName ?? ""}`;
      labelElement.setAttribute("for", radioId);
      labelElement.className = "mission-option-label";
      const radioIcon = document.createElement("span");
      radioIcon.className = "radio-icon";
      radioButtons.push(radioButton);
      entity.getComponent(Pioneer.TrailComponent, missionId) || this.createTrajectory(entity, missionId);
      radioButton.addEventListener("click", async () => {
        radioButtons.forEach(optionRadioButton => {
          optionRadioButton.classList.toggle("checked", optionRadioButton.id === radioButton.id);
        });
        this.app.getManager("router").navigate(`/${entity.getName()}?trajectory=${missionId}`);
      });
      optionElement.appendChild(radioButton);
      optionElement.appendChild(labelElement);
      optionElement.appendChild(radioIcon);
      optionsElement.appendChild(optionElement);
      missionId === this._urlMissionChoice && radioButton.click();
    });
    return optionsElement;
  }
  customEngineLoopCallback() {
    const timeManager = this._app.getManager("time");
    const entity = this._app.pioneer.getScene("main").getEntity(this._entityId);
    const currentTime = timeManager.getTime();
    const currentET = timeManager.momentToET(currentTime);
    const limitEndET = timeManager.momentToET(timeManager.getLimits().max);
    const coverageEndET = Math.round(Math.min(entity?.getPositionCoverage()?.max, limitEndET));
    const missionOptions = missionDefinitions[this._entityId].missionOptions;
    Object.keys(missionOptions).forEach(missionId => {
      const startET = timeManager.urlToET(missionOptions[missionId].start);
      const endET = timeManager.urlToET(missionOptions[missionId].end);
      if (startET && endET) {
        if (startET <= currentET && currentET <= endET && timeManager.getTimeRate() > 0) {
          const missionTrail = entity?.getComponent(Pioneer.TrailComponent, missionId);
          missionTrail?.isEnabled() || missionTrail?.setEnabled(true);
        }
      }
      missionId === this._urlMissionChoice && (Math.round(currentET + timeManager.getTimeRate()) >= endET || Math.round(currentET + timeManager.getTimeRate()) >= coverageEndET) && entity?.isInPositionCoverage() && (timeManager.pause(), isNaN(coverageEndET) || this._app.pioneer.setTime(isNaN(endET) ? coverageEndET : endET));
    });
  }
  setEngineLoopCallback(enabled) {
    enabled !== this._callbackEnabled && (enabled ? (this._app.pioneer.addCallback(this.customEngineLoopCallback, true), this._callbackEnabled = true) : (this._app.pioneer.removeCallback(this.customEngineLoopCallback), this._callbackEnabled = false));
  }
  enableAssociatedEntities(entityId) {
    missionDefinitions[entityId].associatedEntities.length && missionDefinitions[entityId].associatedEntities.forEach(associatedEntityId => {
      this._app.getManager("scene").setEntitiesForceVisible([associatedEntityId], false);
      this._app.pioneer.getScene("main").getEntity(associatedEntityId).setEnabled(true);
    });
  }
  setUpAssociatedEntities(entity, enabled = true) {
    this._setUpAssociatedEntityTrails(entity, enabled);
    this._setUpIndicatorForEntity(entity, enabled);
  }
  _setUpAssociatedEntityTrails(entity, enabled = true) {
    if (!entity) return;
    const missionId = Object.keys(missionDefinitions[entity.getName()]?.missionOptions)[0];
    if (!enabled) {
      entity.getComponent(Pioneer.TrailComponent)?.setEnabled(true);
      return void entity.getComponent(Pioneer.TrailComponent, missionId)?.setEnabled(false);
    }
    const defaultTrail = entity.getComponent(Pioneer.TrailComponent);
    const trailStart = defaultTrail?.getStartTime();
    const trailEnd = defaultTrail?.getEndTime();
    const trailDuration = Math.abs(trailEnd - trailStart) ?? 1e8;
    const relativeStartTime = defaultTrail?.getStartTime() * trailDuration;
    this.createTrajectory(entity, missionId, relativeStartTime);
    const missionTrail = entity.getComponent(Pioneer.TrailComponent, missionId);
    defaultTrail?.setEnabled(false);
    missionTrail?.setEnabled(true);
    missionTrail?.setRelativeStartTime(true);
    missionTrail?.setRelativeEndTime(true);
    missionTrail?.setRelativeToEntity("sun");
  }
  _setUpIndicatorForEntity(entity, enabled = true) {
    if (!enabled) {
      const existingIndicator = entity.getComponent(Pioneer.IndicatorComponent, "indicator");
      return void (existingIndicator && entity.removeComponent(existingIndicator));
    }
    const {
      iauName: iauName
    } = this._app.getManager("content").getEntityInfo(entity.getName());
    const indicatorComponent = entity.getComponent(Pioneer.IndicatorComponent, "indicator") ?? entity.addComponent(Pioneer.IndicatorComponent, "indicator");
    indicatorComponent.getDiv().innerHTML = `<span class="left">« </span><span>${iauName}</span><span class="right"> »</span>`;
    indicatorComponent.getDiv().classList.add("pioneer-indicator");
    this._calcIndicatorPadding(entity.getName());
  }
  _calcIndicatorPadding(entityId = this._entityId) {
    const offsetRight = document.body.classList.contains("offset-right");
    const contentPanelComponent = this._app.getComponent("contentPanel");
    const basePadding = 25;
    let leftPadding = basePadding;
    let rightPadding = basePadding;
    if (offsetRight) {
      const activeViewport = this.app.pioneer.getInput().getActiveViewport();
      const viewportWidth = activeViewport?.getBounds().size.x;
      const contentPanelWidth = contentPanelComponent?.element.offsetWidth;
      if (viewportWidth) {
        const viewportInset = Math.round(.12 * viewportWidth);
        leftPadding = contentPanelWidth - viewportInset + basePadding;
        rightPadding = viewportWidth - (viewportWidth - viewportInset) + basePadding;
      }
    }
    [entityId, ...(missionDefinitions[entityId]?.associatedEntities ?? [])].forEach(indicatedEntityId => {
      const indicatorComponent = this._app.pioneer.getScene("main").getEntity(indicatedEntityId)?.getComponent(Pioneer.IndicatorComponent);
      if (Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet()) {
        const bottomPadding = (contentPanelComponent?.element.offsetHeight ?? 100) + basePadding;
        indicatorComponent?.setPadding(basePadding, basePadding, basePadding, bottomPadding);
      } else indicatorComponent?.setPadding(leftPadding, rightPadding, basePadding, basePadding);
    });
  }
  setUpVoyagers(entityId, missionId) {
    const companionEntityId = "sc_voyager_1" === entityId ? "sc_voyager_2" : "sc_voyager_1";
    const {
      start: start,
      timeRate: timeRate,
      setForceLoadEntity: setForceLoadEntity
    } = missionDefinitions[entityId].missionOptions[missionId];
    const startET = this._app.getManager("time").urlToET(start);
    this._app.pioneer.setTime(startET);
    this._app.getManager("time").setTimeRate(timeRate);
    const entity = this._app.pioneer.getScene("main").getEntity(entityId);
    const defaultTrail = entity.getComponent(Pioneer.TrailComponent);
    const missionTrail = entity.getComponent(Pioneer.TrailComponent, missionId) ?? entity.addComponent(Pioneer.TrailComponent, missionId);
    const trailDuration = Math.abs(defaultTrail?.getEndTime() - defaultTrail?.getStartTime()) ?? 1e8;
    const relativeStartTime = defaultTrail?.getStartTime() * trailDuration;
    missionTrail.setStartTime(relativeStartTime);
    missionTrail.setDrawStartTime(relativeStartTime);
    missionTrail.setEndTime(defaultTrail?.getEndTime() || 0);
    missionTrail.setRelativeStartTime(true);
    missionTrail.setRelativeEndTime(true);
    missionTrail.setRelativeToEntity("sun");
    missionTrail.setEnabled(true);
    this._setUpIndicatorForEntity(entity);
    setForceLoadEntity ? this._app.getView("object").appendForceLoadEntities(companionEntityId) : this._app.getView("object").removeForceLoadEntities(companionEntityId);
    this._app.getManager("scene").setEntitiesForceVisible([entityId, companionEntityId], true);
    const companionEntity = this._app.pioneer.getScene("main").getEntity(companionEntityId);
    this._app.getManager("scene").setVisibility(true === setForceLoadEntity, "sc_voyager_2");
    companionEntity?.setEnabled(true === setForceLoadEntity);
    setForceLoadEntity && this.setUpAssociatedEntities(companionEntity);
  }
}
const missionLifecycleHooks = {
  sc_artemis_1: {
    onSelect: async (app, missionId) => {
      const timeManager = app.getManager("time");
      const selectedMissionId = missionId;
      const entity = app.pioneer.getScene("main").getEntity("sc_artemis_1");
      const {
        customAppTime: customAppTime,
        start: start,
        timeRate: timeRate,
        cameraAngle: cameraAngle,
        resetCameraToSystem: resetCameraToSystem
      } = missionDefinitions.sc_artemis_1.missionOptions[missionId];
      const startET = timeManager.urlToET(start);
      const appTimeET = timeManager.urlToET(customAppTime) ?? startET;
      app.pioneer.setTime(appTimeET);
      const selectedTrail = entity.getComponent(Pioneer.TrailComponent, missionId);
      if (selectedTrail?.setEnabled(false), resetCameraToSystem) {
        const {
          distance: distance,
          angle: angle
        } = resetCameraToSystem;
        await app.cameraScripts.goToSystem("earth", {
          distance: distance,
          angle: angle
        });
      }
      if (cameraAngle) {
        const {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = cameraAngle;
        await app.cameraScripts.alignObjects("moon", "earth", {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        });
      }
      Object.keys(missionDefinitions.sc_artemis_1.missionOptions).forEach(optionId => {
        const optionTrail = entity?.getComponent(Pioneer.TrailComponent, optionId);
        optionTrail && optionTrail?.setEnabled(optionId === selectedMissionId);
      });
      timeManager.setTimeRate(timeRate);
    }
  },
  sc_artemis_2: {
    onSelect: async (app, missionId) => {
      const timeManager = app.getManager("time");
      const selectedMissionId = missionId;
      const entity = app.pioneer.getScene("main").getEntity("sc_artemis_2");
      const {
        customAppTime: customAppTime,
        start: start,
        timeRate: timeRate,
        cameraAngle: cameraAngle,
        resetCameraToSystem: resetCameraToSystem
      } = missionDefinitions.sc_artemis_2.missionOptions[missionId];
      const startET = timeManager.urlToET(start);
      const appTimeET = timeManager.urlToET(customAppTime) ?? startET;
      app.pioneer.setTime(appTimeET);
      const selectedTrail = entity.getComponent(Pioneer.TrailComponent, missionId);
      if (selectedTrail?.setEnabled(false), resetCameraToSystem) {
        const {
          distance: distance,
          angle: angle
        } = resetCameraToSystem;
        await app.cameraScripts.goToSystem("earth", {
          distance: distance,
          angle: angle
        });
      }
      if (cameraAngle) {
        const {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        } = cameraAngle;
        await app.cameraScripts.alignObjects("moon", "earth", {
          distance: distance,
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset
        });
      }
      Object.keys(missionDefinitions.sc_artemis_2.missionOptions).forEach(optionId => {
        const optionTrail = entity?.getComponent(Pioneer.TrailComponent, optionId);
        optionTrail && optionTrail?.setEnabled(optionId === selectedMissionId);
      });
      timeManager.setTimeRate(timeRate);
    }
  },
  sc_cassini: {
    onSelect: async (app, missionId) => {
      const selectedMissionId = missionId;
      const entity = app.pioneer.getScene("main").getEntity("sc_cassini");
      entity?.getComponent(Pioneer.DivComponent)?.setRenderingEnabled(false);
      const {
        start: start,
        timeRate: timeRate
      } = missionDefinitions.sc_cassini.missionOptions[selectedMissionId];
      const startET = app.getManager("time").urlToET(start);
      if (timeRate && app.pioneer.setTimeRate(timeRate), "all" !== missionId) {
        app.pioneer.setTime(startET);
        Object.keys(missionDefinitions.sc_cassini.missionOptions).forEach(optionId => {
          const optionTrail = entity?.getComponent(Pioneer.TrailComponent, optionId);
          optionTrail?.setEnabled(false);
        });
        entity?.getComponent(Pioneer.TrailComponent, selectedMissionId)?.setEnabled(true);
      } else {
        const primaryMission = missionDefinitions.sc_cassini.missionOptions.primary;
        const primaryStartET = app.getManager("time").urlToET(primaryMission.start);
        app.pioneer.setTime(primaryStartET);
        Object.keys(missionDefinitions.sc_cassini.missionOptions).forEach(optionId => {
          const optionTrail = entity?.getComponent(Pioneer.TrailComponent, optionId);
          optionTrail?.setEnabled(false);
        });
      }
      app.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: async app => {
      app.pioneer.getScene("main").getEntity("sc_cassini")?.getComponent(Pioneer.DivComponent)?.setRenderingEnabled(true);
      app.getManager("trajectory").setEngineLoopCallback(false);
    }
  },
  sc_voyager_1: {
    onCreate: app => {
      app.getManager("trajectory").enableAssociatedEntities("sc_voyager_1");
    },
    onSelect: async (app, missionId) => {
      app.getManager("trajectory").setUpVoyagers("sc_voyager_1", missionId);
      app.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: app => {
      app.getManager("trajectory").setEngineLoopCallback(false);
    }
  },
  sc_voyager_2: {
    onCreate: app => {
      app.getManager("trajectory").enableAssociatedEntities("sc_voyager_2");
    },
    onSelect: async (app, missionId) => {
      app.getManager("trajectory").setUpVoyagers("sc_voyager_2", missionId);
      app.getManager("trajectory").setEngineLoopCallback(true);
    },
    onLeave: async app => {
      app.getManager("trajectory").setEngineLoopCallback(false);
    }
  }
};
const missionDefinitions = {
  sc_artemis_1: {
    cameraOnEnterParams: {
      system: "earth"
    },
    hideLayers: ["spacecraft"],
    missionOptions: {
      primary: {
        displayName: "Mission",
        start: "2022-11-16T06:50:44",
        end: "2022-12-11T17:40:30",
        relativeEndTime: false,
        customAppTime: "2022-11-25T17:40:30",
        timeRate: 0,
        resetCameraToSystem: {
          distance: 100
        }
      },
      near_moon: {
        displayName: "Near Moon",
        start: "2022-11-16T06:50:44",
        end: "2022-12-11T17:40:30",
        relativeEndTime: false,
        customAppTime: "2022-11-21T13:08:38.546+00:00",
        color: new Pioneer.Color(1, 1, 1, 1),
        timeRate: 1,
        cameraAngle: {
          distance: 15e3,
          horizontalOffset: 15,
          verticalOffset: 15
        }
      }
    }
  },
  sc_artemis_2: {
    cameraOnEnterParams: {
      system: "earth"
    },
    hideLayers: ["spacecraft"],
    missionOptions: {
      primary: {
        displayName: "Mission",
        start: "2026-04-02T02:59:07",
        end: "2026-04-10T23:53:05",
        customAppTime: "2026-04-06T22:24:13.098+00:00",
        timeRate: 0,
        resetCameraToSystem: {
          distance: 50,
          angle: 15
        }
      },
      near_moon: {
        displayName: "Near Moon",
        start: "2026-04-02T02:59:07",
        end: "2026-04-10T23:53:05",
        customAppTime: "2026-04-06T22:24:13.098+00:00",
        color: new Pioneer.Color(1, 1, 1, 1),
        timeRate: 1,
        cameraAngle: {
          distance: 15e3,
          horizontalOffset: 15,
          verticalOffset: 15
        }
      }
    }
  },
  sc_cassini: {
    cameraOnEnterParams: {
      system: "saturn"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft", "majorMoons"],
    missionOptions: {
      primary: {
        displayName: "Primary Mission (2004 - 2008)",
        start: "2004-06-30T12:38:22.527+00:00",
        end: "2008-06-30T15:16:30.000+00:00",
        color: new Pioneer.Color(.715, .578, .3),
        timeRate: 5e6
      },
      equinox: {
        displayName: "Equinox Mission (2008 - 2010)",
        start: "2008-07-01T09:26:18.000+00:00",
        end: "2010-10-10T09:26:18.000+00:00",
        color: new Pioneer.Color(.484, .294, .101, .7),
        timeRate: 5e6
      },
      solstice: {
        displayName: "Solstice Mission (2010 - 2017)",
        start: "2010-10-11T09:26:18.000+00:00",
        end: "2017-09-15T09:26:18.000+00:00",
        color: new Pioneer.Color(.543, .184, .105, .7),
        timeRate: 5e6
      },
      all: {
        displayName: "All (2004 - 2017)",
        start: "2004-06-30T12:38:22.527+00:00",
        end: "2017-09-15T09:26:18.000+00:00",
        timeRate: 5e6
      }
    }
  },
  sc_voyager_1: {
    cameraOnEnterParams: {
      system: "sun"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft"],
    associatedEntities: ["sc_voyager_2"],
    missionOptions: {
      primary: {
        displayName: "Voyager 1 Mission",
        start: "1977-09-06T12:56:00",
        timeRate: 25228800
      },
      both: {
        displayName: "Voyager 1 and Voyager 2",
        start: "1977-09-06T12:56:00",
        timeRate: 25228800,
        setForceLoadEntity: true
      }
    }
  },
  sc_voyager_2: {
    cameraOnEnterParams: {
      system: "sun"
    },
    showStoryClock: true,
    hideLayers: ["spacecraft"],
    associatedEntities: ["sc_voyager_1"],
    missionOptions: {
      primary: {
        displayName: "Voyager 2 Mission",
        start: "1977-08-21T14:29:00",
        timeRate: 25228800
      },
      both: {
        displayName: "Voyager 1 and Voyager 2",
        start: "1977-08-21T14:29:00",
        timeRate: 25228800,
        setForceLoadEntity: true
      }
    }
  }
};
export { TrajectoryManager };
