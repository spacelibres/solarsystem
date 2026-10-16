// Recovered from app.js:1465881-1476838.
import * as Pioneer from "../../engine/pioneer/index.js";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import CameraViewBlockTemplate from "../templates/CameraViewBlockTemplate.html";
import "../../styles/extracted/CameraViewBlockStyles.js";
var getCameraViewBlockTemplate = () => CameraViewBlockTemplate;
/* 相机选项工厂保存目标 id 与各自选择/取消回调，切换时先取消旧选项再启用新选项。航天器选项等待实体就绪并核对当前视图目标，避免旧目标的异步结果覆盖新路由。renderFlag 是原有未使用的兼容参数，不推断其未证实含义。 */
class CameraViewBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app, options = {}) {
    options.config = {
      defaultSelectionIndex: 0,
      ...options.config
    };
    super(app, null, {
      category: "",
      ...options
    });
    this.onLoaded = [];
    this._cameraOptions = {
      nearObject: (entityTitle, entityId) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearObject-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.goToCelestialObject(entityId);
        }
      }),
      nearSpacecraft: (entityTitle, entityId) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearSpacecraft-" + entityId,
        onSelect: async () => {
          const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
          const tiledEntity = this._app.getManager("scene").getCMTSEntity(entityId);
          const terrainComponent = tiledEntity?.getComponent(Pioneer.CMTSComponent);
          if (tiledEntity && terrainComponent && (this._app.getManager("scene").addLoading(tiledEntity.getName(), "cmts"), this._app.getManager("camera").updateLighting("flood")), await this._app.cameraScripts.goToSpacecraft(entityId, {
            planeId: tiledEntity?.getName() ?? "earth",
            horizontalOffset: entityInfo?.horizontalOffset ?? 0,
            verticalOffset: entityInfo?.verticalOffset ?? 0
          }), tiledEntity) {
            const cameraEntity = this._app.pioneer.getScene("main").getEntity("camera");
            if (cameraEntity) {
              const existingGroundClamp = cameraEntity?.getController(Pioneer.GroundClampController);
              existingGroundClamp && cameraEntity?.removeController(existingGroundClamp);
              const groundClamp = cameraEntity.addController(Pioneer.GroundClampController, "groundClampLander", cameraEntity.getController(Pioneer.AlignController));
              groundClamp.setGroundEntityRef(tiledEntity.getName());
              groundClamp.setClampOnlyIfBelow(true);
              const groundDistance = "Landing site" === entityInfo?.category ? .05 : .001;
              groundClamp.setDistanceFromGround(groundDistance);
            }
            terrainComponent && (tiledEntity.getComponent(Pioneer.SpheroidLODComponent, "basic").setEnabled(false), terrainComponent.setMaxLevel(12), await this._app.getManager("scene").terrainIsReady(terrainComponent), this._app.getManager("scene").removeLoading(tiledEntity.getName(), "cmts"));
          }
        }
      }),
      nearEvent: (entityTitle, entityId) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearEvent-" + entityId,
        onSelect: async () => {
          const {
            _eventDesc: _eventDesc,
            _eventInfo: _eventInfo
          } = this.app.getView("event");
          const eventCameraInfo = {
            ..._eventDesc,
            ..._eventInfo
          };
          const {
            target: target,
            duration: duration,
            distance: distance,
            horizontalOffset: horizontalOffset,
            verticalOffset: verticalOffset
          } = eventCameraInfo;
          target && (await this._app.cameraScripts.alignObjects(entityId, target, {
            duration: duration,
            distance: distance,
            horizontalOffset: horizontalOffset,
            verticalOffset: verticalOffset
          }));
        }
      }),
      alignSpacecraftPlanet: (entityTitle, entityId) => ({
        type: "nearby",
        text: "Nearby ",
        id: "alignSpacecraftPlanet-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.alignSpacecraftPlanet(entityId);
        }
      }),
      nearInstrument: (entityTitle, entityId, cameraOptions) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearInstrument-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.goToInstrument(entityId, cameraOptions);
        }
      }),
      system: (entityId, systemTitle) => ({
        type: "system",
        text: systemTitle || "System",
        id: "system-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.goToSystem(entityId);
        }
      }),
      aboveParent: (entityId, systemTitle) => ({
        type: "system",
        text: systemTitle || "System",
        id: "aboveParent-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.showLocationInParentSystem(entityId);
        }
      }),
      aboveSun: (entityId, cameraOptions) => ({
        type: "system",
        text: "Outer",
        id: "aboveSun-" + entityId,
        onSelect: async () => {
          await this._app.cameraScripts.showLocationInSolarSystem(entityId, cameraOptions);
        }
      }),
      cameraFollow: () => ({
        type: "follow",
        text: "Follow",
        id: "cameraFollow",
        onCreate: optionElement => {
          const cameraFollowManager = this.app.getManager("cameraFollow");
          cameraFollowManager.initSearch(this._element);
          cameraFollowManager.registerCallback("cameraFollowUndo", this.goBackToPreviousView);
          cameraFollowManager.registerCallback("cameraFollowSelect", this.goToFollowCameraView);
        },
        onSelect: () => {
          this.app.getManager("cameraFollow").isEnabled || this.app.getManager("cameraFollow").setEnabled(true);
        },
        onDeselect: () => {
          this._followId = "";
          this.app.getManager("cameraFollow").setEnabled(false, {
            resetLimits: false,
            removeQueries: ["followId"]
          });
        }
      }),
      trajectory: entityId => ({
        type: "trajectory",
        text: "Trajectory",
        id: "trajectory",
        onCreate: async () => {
          this.app.getManager("trajectory").registerCallback("trajectorySelect", this.goToTrajectoryView);
        },
        onSelect: async () => {
          const trajectoryEntity = this.app.pioneer.getScene("main")?.getEntity(entityId);
          trajectoryEntity && (this.app.getManager("trajectory").setEnabled(true, entityId), this.app.getManager("trajectory").createUI(this._element));
        },
        onDeselect: () => {
          this.app.getManager("trajectory").setEnabled(false, this._entityId);
        }
      })
    };
    this._activeCameraOptions = [];
    this._currentCameraView = null;
    this._prevCameraView = null;
    this._activeCamOptIndex = -1;
    this._prevCamOptIndex = -1;
    this._optionIndexMap = {};
    this._followId = "";
    this._trajectoryViewId = "";
    this._defaultViewIndexOverride = void 0;
    this._entityId = "";
    this.bindFunctions(["goBackToPreviousView", "goToFollowCameraView", "goToTrajectoryView"]);
  }
  _renderOptions(cameraOptions, renderFlag = false) {
    this._children.cameraOptions.innerHTML = "";
    this._activeCameraOptions = [];
    this._currentCameraView = null;
    this._prevCameraView = null;
    this._activeCamOptIndex = -1;
    this._prevCamOptIndex = -1;
    this._optionIndexMap = {};
    for (let optionIndex = 0; optionIndex < cameraOptions.length; optionIndex++) {
      let {
        text: text,
        id: id,
        onCreate: onCreate,
        onSelect: onSelect,
        onDeselect: onDeselect,
        type: type
      } = cameraOptions[optionIndex];
      const capturedOptionIndex = optionIndex;
      void 0 !== this._optionIndexMap[id] && (id = id + "-" + optionIndex);
      this._optionIndexMap[id] = capturedOptionIndex;
      const optionText = "function" == typeof text ? text() : text;
      const optionElement = document.createElement("li");
      optionElement.className = "option clickable";
      const labelElement = document.createElement("label");
      labelElement.innerHTML = optionText;
      const radioId = `${labelElement.innerText.toLowerCase().split(" ").join("-")}-radio-button`;
      labelElement.setAttribute("for", radioId);
      const radioInput = document.createElement("input");
      radioInput.id = radioId;
      radioInput.type = "radio";
      radioInput.name = "camera-view";
      const iconElement = document.createElement("div");
      iconElement.className = "icon " + type;
      iconElement.ariaHidden = "true";
      optionElement.appendChild(radioInput);
      optionElement.appendChild(iconElement);
      optionElement.appendChild(labelElement);
      optionElement.addEventListener("click", clickEvent => {
        this._activeCamOptIndex !== capturedOptionIndex ? this._goToView(id) : onSelect();
        radioInput.blur();
      });
      const optionTitle = optionText;
      this._activeCameraOptions.push({
        id: id,
        optionTitle: optionTitle,
        option: optionElement,
        radioButtonLabel: labelElement,
        radioButton: radioInput,
        onSelect: onSelect,
        onDeselect: onDeselect
      });
      this._children.cameraOptions.appendChild(optionElement);
      "function" == typeof onCreate && onCreate(optionElement);
    }
    this._setVariables(this._children.cameraOptions);
  }
  _addPlanetOptions(entityInfo, renderFlag = false) {
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    const cameraOptions = [this._cameraOptions.nearObject(entityTitle, entityId), this._cameraOptions.system(entityId), this._cameraOptions.cameraFollow()];
    this._renderOptions(cameraOptions, renderFlag);
  }
  _addMoonOptions(entityInfo, renderFlag = false) {
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    const parentEntityId = this._app.getManager("scene").getParent(entityId);
    const cameraOptions = [this._cameraOptions.nearObject(entityTitle, entityId), this._cameraOptions.system(parentEntityId), this._cameraOptions.cameraFollow()];
    this._renderOptions(cameraOptions, renderFlag);
  }
  _addStarOptions(entityInfo, renderFlag = false) {
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    const cameraOptions = [this._cameraOptions.nearObject(entityTitle, entityId), this._cameraOptions.system("inner_solar_system", "Inner"), this._cameraOptions.system("outer_solar_system", "Outer"), this._cameraOptions.cameraFollow()];
    this._renderOptions(cameraOptions, renderFlag);
  }
  async _addSpacecraftOptions(entityInfo, renderFlag = false) {
    const contentManager = this._app.getManager("content");
    const trajectoryManager = this._app.getManager("trajectory");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    if (await this._app.getManager("scene").isReady(entityId), entityId !== this._app.getView(currentView)?._target) return;
    const parentEntityId = this._app.getManager("scene").getParent(entityId);
    let parentTitle = null;
    let parentTerrain = false;
    if (parentEntityId) {
      const parentInfo = contentManager.getEntityInfo(parentEntityId);
      parentTitle = parentInfo?.displayName || parentInfo?.iauName;
      let terrainEntityId = parentEntityId;
      "Landing site" === parentInfo?.category && (terrainEntityId = this._app.getManager("scene").getParent(parentEntityId));
      parentTerrain = this._app.pioneer.getScene("main").getEntity(terrainEntityId).getComponent(Pioneer.CMTSComponent);
    }
    const hasLanded = contentManager.hasLanded(entityInfo);
    const cameraOptions = [];
    if ("event" === currentView) cameraOptions.push(this._cameraOptions.nearEvent(entityTitle, entityId), this._cameraOptions.cameraFollow());else if (parentTerrain || !hasLanded && "Landing site" !== entityInfo.category) {
      if ("Instrument" === entityInfo.category) cameraOptions.push(this._cameraOptions.nearInstrument(entityTitle, entityId, entityInfo.cameraOptions), this._cameraOptions.nearSpacecraft(parentTitle, parentEntityId));else {
        cameraOptions.push(this._cameraOptions.nearSpacecraft(entityTitle, entityId), this._cameraOptions.aboveParent(entityId));
        cameraOptions.push(this._cameraOptions.cameraFollow());
        const customMissions = this.app.getManager("trajectory").getCustomMissions();
        trajectoryManager.hasTrajectoryOptions(entityId) && !customMissions[entityId].disable && cameraOptions.push(this._cameraOptions.trajectory(entityId));
      }
    } else cameraOptions.push(this._cameraOptions.alignSpacecraftPlanet(entityTitle, entityId), this._cameraOptions.aboveParent(entityId));
    this._renderOptions(cameraOptions, renderFlag);
  }
  _addFeatureOptions(entityInfo, renderFlag = false) {
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    const cameraOptions = [this._cameraOptions.nearObject(entityTitle, entityId), this._cameraOptions.system(entityId)];
    this._renderOptions(cameraOptions, renderFlag);
  }
  async _addDefaultOptions(entityInfo, renderFlag) {
    const contentManager = this._app.getManager("content");
    const entityTitle = entityInfo.displayName || entityInfo.iauName;
    const entityId = entityInfo.id;
    await this._app.getManager("scene").isReady(entityId);
    const parentEntityId = this._app.getManager("scene").getParent(entityId);
    const parentInfo = contentManager.getEntityInfo(parentEntityId);
    const cameraOptions = (parentInfo.displayName || parentInfo.iauName, [this._cameraOptions.nearObject(entityTitle, entityId), this._cameraOptions.aboveParent(entityId), this._cameraOptions.cameraFollow()]);
    "sun" !== parentEntityId && cameraOptions.push(this._cameraOptions.aboveSun(entityId));
    this._renderOptions(cameraOptions, renderFlag);
  }
  _goToView(currentCameraView) {
    const activeCamOptIndex = this._optionIndexMap[currentCameraView];
    if (activeCamOptIndex !== this._activeCamOptIndex) {
      this._prevCameraView = this._currentCameraView;
      this._currentCameraView = currentCameraView;
      this._prevCamOptIndex = this._activeCamOptIndex;
      this._activeCamOptIndex = activeCamOptIndex;
      const previousOption = this._activeCameraOptions[this._prevCamOptIndex];
      "function" == typeof previousOption?.onDeselect && previousOption.onDeselect();
      previousOption?.option.classList.remove("selected");
      const activeOption = this._activeCameraOptions[this._activeCamOptIndex];
      "function" == typeof activeOption?.onSelect && activeOption.onSelect();
      activeOption?.option.classList.add("selected");
    }
  }
  goBackToPreviousView() {
    null == this._prevCameraView ? this._selectDefaultView() : this._goToView(this._prevCameraView);
  }
  goToFollowCameraView(followId) {
    this._goToView("cameraFollow");
    this._followId = followId;
  }
  goToTrajectoryView() {
    this._goToView("trajectory");
  }
  goToDefaultView() {
    this._selectDefaultView();
  }
  getCameraView() {
    return this._currentCameraView;
  }
  _selectDefaultView() {
    const {
      defaultSelectionIndex: defaultSelectionIndex
    } = this._config;
    const defaultOption = this._activeCameraOptions[this._defaultViewIndexOverride || defaultSelectionIndex];
    this._goToView(defaultOption.id);
  }
  async onRouteChange(routeParams) {
    const entityInfo = routeParams.entityInfo;
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      followId: followId,
      trajectory: trajectory
    } = this.app.getManager("router")?.query || {};
    if (!followId) {
      const cameraFollowManager = this.app.getManager("cameraFollow");
      cameraFollowManager.isEnabled && cameraFollowManager.setEnabled(false, {
        resetLimits: false,
        removeQueries: []
      });
    }
    this._entityId = entityInfo.id;
    this._defaultViewIndexOverride = routeParams.defaultView || void 0;
    const entityCategory = entityInfo.category.toLowerCase();
    const categoryClass = this._app.getManager("content").getColorClass(entityInfo.id);
    this.setState({
      category: "landing site" === entityCategory ? "spacecraft" : categoryClass
    });
    let optionCategory = entityCategory;
    "feature" === currentView && (optionCategory = "feature");
    for (let optionIndex = 0; optionIndex < this._activeCameraOptions.length; optionIndex++) {
      const cameraOption = this._activeCameraOptions[optionIndex];
      "function" == typeof cameraOption?.onDeselect && cameraOption.onDeselect();
      cameraOption?.option.classList.remove("selected");
    }
    switch (optionCategory) {
      case "planet":
        this._addPlanetOptions(entityInfo);
        break;
      case "moon":
        this._addMoonOptions(entityInfo);
        break;
      case "star":
        this._addStarOptions(entityInfo);
        break;
      case "spacecraft":
      case "landing site":
      case "instrument":
        await this._addSpacecraftOptions(entityInfo);
        break;
      case "feature":
        await this._addFeatureOptions(entityInfo);
        break;
      default:
        await this._addDefaultOptions(entityInfo);
    }
    void 0 !== (followId && this._activeCameraOptions.find(({
      id: id
    }) => "cameraFollow" === id)) || void 0 !== trajectory ? this._processQuery(routeParams) : this._selectDefaultView();
    this.onLoaded.forEach(loadedCallback => loadedCallback());
    this.onLoaded = [];
  }
  async onQueryChange(routeParams) {
    this._processQuery(routeParams);
  }
  _processQuery(routeParams) {
    const routerManager = this.app.getManager("router");
    const sceneManager = this.app.getManager("scene");
    const cameraFollowManager = this.app.getManager("cameraFollow");
    const trajectoryManager = this.app.getManager("trajectory");
    const {
      query: query,
      params: params
    } = routerManager.previousRoute;
    const {
      query: currentQuery,
      params: currentParams
    } = routerManager.currentRoute;
    const {
      followId: followId
    } = routerManager.parseQuery(query);
    const {
      followId: currentFollowId,
      trajectory: trajectory
    } = routerManager.parseQuery(currentQuery);
    const {
      spaceObject: spaceObject
    } = params || {};
    let {
      followId: requestedFollowId,
      spaceObject: requestedEntityId
    } = routeParams;
    requestedFollowId = requestedFollowId || currentFollowId;
    (requestedFollowId !== followId || requestedEntityId !== spaceObject) && (void 0 !== followId && sceneManager.setEntitiesForceVisible([followId], false, false), requestedFollowId ? (sceneManager.setEntitiesForceVisible([requestedFollowId], false, true), cameraFollowManager.follow(requestedFollowId)) : (cameraFollowManager.setEnabled(false, {
      resetLimits: false,
      removeQueries: false
    }), "cameraFollow" === this._currentCameraView && this._selectDefaultView()));
    if (trajectoryManager.hasTrajectoryOptions(this._entityId) && trajectory) {
      if (this._app.getManager("router").parseQuery(query).trajectory === trajectory && params?.spaceObject === currentParams?.spaceObject) return;
      trajectoryManager.setEnabled(true, this._entityId);
    } else this._currentCameraView || this._selectDefaultView();
  }
  get isLoaded() {
    return this._activeCameraOptions.length > 0;
  }
}
CameraViewBlock.html = getCameraViewBlockTemplate();
export { CameraViewBlock };
