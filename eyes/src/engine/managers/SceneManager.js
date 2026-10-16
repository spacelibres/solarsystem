// Recovered from app.js:1220244-1241305.
/* 场景状态表持有动态加载、图层可见性与依赖引用，创建/卸载前后通知独立回调；强制可见的实体也会保持所依赖实体可见。纹理切换由 loading 键记录所有权，WMTS 就绪后才关闭基础 LOD；轮询遇到禁用时沿用各方法原有完成/拒绝规则。ET 以秒传给引擎，覆盖范围转 UTC 毫秒后按边界方向舍入；距离和速度使用场景单位，池向量的读取/归还顺序保留原行为。 */
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class SceneManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._scenes = {};
    this._scene = this.add("main");
    this._isHD = false;
    this._hdWMTSMap = {};
    this._loadingItems = [];
    this._loadedComponents = [];
    this._wmtsServerStates = new Map();
    this._wmtsComponentStates = new Map();
    this._hdBreakpointSize = 512;
    this._maxTextureSize = 4096;
    this._eventNames.push("loading", "loaded");
    this._initCallbacks();
    this._isLoading = false;
    this._entityStatuses = new Pioneer.FastMap();
    this._entityExtraOptions = void 0;
    this._entityLoadedCallbacks = [];
    this._entityWillBeUnloadedCallbacks = [];
    this._componentTypesNotVisible = new Set();
    this._hdToggleEntity = null;
    this._mobileTextureSize = 1024;
    this.bindFunctions(["addLoading", "removeLoading", "update", "toggleStarfield", "toggleHeliosphere", "toggleConstellations", "addWMTSComponent", "tileIsReady", "enableWMTSComponent", "forceTextureSizeForEntity", "toggleHDTextureForEntity", "isEntityHD"]);
    this._tempEntities = [];
  }
  getHDToggleEntity() {
    return this._hdToggleEntity;
  }
  add(sceneName) {
    return "main" === sceneName && this._scene ? this._scene : (this._scenes[sceneName] = this.pioneer.addScene(sceneName), this._scenes[sceneName].setAmbientLightColor(new Pioneer.Color(.005, .005, .005)), this._scenes[sceneName]);
  }
  addEntity(entityId, dynamic) {
    if (this._entityStatuses.has(entityId)) throw new Error(`Error adding entity: The entity ${entityId} has already been added.`);
    this._entityStatuses.set(entityId, {
      forceVisible: false,
      layerVisibility: this.app.getManager("layer").isEntityVisibleWithCurrentLayers(entityId),
      dynamic: dynamic,
      dependentEntities: [],
      entitiesForcingThisVisible: new Set(),
      visible: true,
      componentTypesNotVisible: new Set()
    });
  }
  removeEntity(entityId) {
    if (!this._entityStatuses.delete(entityId)) throw new Error(`Error removing entity: The entity ${entityId} was not in the scene manager.`);
    const entity = this._scene.getEntity(entityId);
    if (null !== entity) {
      for (let callbackIndex = 0, callbackCount = this._entityWillBeUnloadedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) this._entityWillBeUnloadedCallbacks[callbackIndex](entity);
      this._scene.removeEntity(entityId);
    }
  }
  getEntityStatus(entityId) {
    return this._entityStatuses.get(entityId);
  }
  addEntitiesFromSceneInfo(sceneInfo) {
    const map = new Map();
    void 0 !== sceneInfo.staticEntities && (1 === sceneInfo.staticEntities.length && "all" === sceneInfo.staticEntities[0] ? SolarSystemSceneExports.Entity.getEntityNamesInGroup("").forEach(staticEntityId => map.set(staticEntityId, false)) : sceneInfo.staticEntities.forEach(staticEntityId => map.set(staticEntityId, false)));
    void 0 !== sceneInfo.staticEntityGroups && sceneInfo.staticEntityGroups.forEach(staticGroup => {
      SolarSystemSceneExports.Entity.getEntityNamesInGroup(staticGroup).forEach(staticEntityId => map.set(staticEntityId, false));
    });
    void 0 !== sceneInfo.dynamicEntities && (1 === sceneInfo.dynamicEntities.length && "all" === sceneInfo.dynamicEntities[0] ? SolarSystemSceneExports.Entity.getEntityNamesInGroup("").forEach(dynamicEntityId => {
      map.has(dynamicEntityId) || map.set(dynamicEntityId, true);
    }) : sceneInfo.dynamicEntities.forEach(dynamicEntityId => {
      map.has(dynamicEntityId) || map.set(dynamicEntityId, true);
    }));
    void 0 !== sceneInfo.dynamicEntityGroups && sceneInfo.dynamicEntityGroups.forEach(dynamicGroup => {
      SolarSystemSceneExports.Entity.getEntityNamesInGroup(dynamicGroup).forEach(dynamicEntityId => {
        map.has(dynamicEntityId) || map.set(dynamicEntityId, true);
      });
    });
    const contentManager = this.app.getManager("content");
    for (const entityId of map.keys()) null === contentManager.getEntityInfo(entityId) && map.delete(entityId);
    map.forEach((dynamic, entityId) => this.addEntity(entityId, dynamic));
    this.setExtraEntityOptions(sceneInfo.entityOptions);
    this.updateEntityLayerVisibility();
  }
  addEntityLoadedCallback(callback) {
    this._entityLoadedCallbacks.push(callback);
  }
  removeEntityLoadedCallback(callback) {
    for (let callbackIndex = 0, callbackCount = this._entityLoadedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) if (this._entityLoadedCallbacks[callbackIndex] === callback) return void this._entityLoadedCallbacks.splice(callbackIndex, 1);
  }
  addEntityWillBeUnloadedCallback(callback) {
    this._entityWillBeUnloadedCallbacks.push(callback);
  }
  removeEntityWillBeUnloadedCallback(callback) {
    for (let callbackIndex = 0, callbackCount = this._entityWillBeUnloadedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) if (this._entityWillBeUnloadedCallbacks[callbackIndex] === callback) return void this._entityWillBeUnloadedCallbacks.splice(callbackIndex, 1);
  }
  setEntitiesForceVisible(entityIds, resetExisting, forceVisible = true) {
    if (resetExisting) for (let statusIndex = 0, statusCount = this._entityStatuses.getSize(); statusIndex < statusCount; statusIndex++) {
      this._entityStatuses.getAt(statusIndex).value.forceVisible = false;
    }
    for (let entityIndex = 0, entityCount = entityIds.length; entityIndex < entityCount; entityIndex++) {
      const entityId = entityIds[entityIndex];
      const entityStatus = this._entityStatuses.get(entityId);
      if (void 0 === entityStatus) throw new Error(`Entity ${entityId} was set to force load, but isn't in the scene manager. Use addEntity().`);
      entityStatus.forceVisible = forceVisible;
    }
    this.update();
  }
  setExtraEntityOptions(options) {
    this._entityExtraOptions = {
      ...options
    };
  }
  updateEntityLayerVisibilityForChildren(layerOptions) {
    const layerManager = this.app.getManager("layer");
    const ephemerisTime = this._scene.getEngine().getTime();
    for (let statusIndex = 0, statusCount = this._entityStatuses.getSize(); statusIndex < statusCount; statusIndex++) {
      const statusEntry = this._entityStatuses.getAt(statusIndex);
      SolarSystemSceneExports.Parenting.getAllAncestorsOfEntity(statusEntry.key, ephemerisTime).has(layerOptions.parentId) && (statusEntry.value.layerVisibility = layerManager.isEntityVisibleWithCurrentLayers(statusEntry.key, layerOptions));
    }
  }
  updateEntityLayerVisibility(layerOptions) {
    const layerManager = this.app.getManager("layer");
    for (let statusIndex = 0, statusCount = this._entityStatuses.getSize(); statusIndex < statusCount; statusIndex++) {
      const statusEntry = this._entityStatuses.getAt(statusIndex);
      statusEntry.value.layerVisibility = layerManager.isEntityVisibleWithCurrentLayers(statusEntry.key, layerOptions);
    }
  }
  update() {
    const cameraEntity = this.app.getManager("camera").cameraEntity;
    const contentManager = this.app.getManager("content");
    for (let statusIndex = 0, statusCount = this._entityStatuses.getSize(); statusIndex < statusCount; statusIndex++) {
      const statusEntry = this._entityStatuses.getAt(statusIndex);
      const entityId = statusEntry.key;
      const entityStatus = statusEntry.value;
      const shouldLoad = entityStatus.forceVisible || !entityStatus.dynamic && entityStatus.layerVisibility || entityStatus.dynamic && entityStatus.layerVisibility && this._isEntityVisibleWithinParent(entityId) || cameraEntity?.getParent()?.getName() === entityId;
      let entity = this._scene.getEntity(entityId);
      if (shouldLoad && null === entity) {
        this._createEntity(entityId);
        const dependencies = SolarSystemSceneExports.SceneHelpers.getDependentEntities(entityId);
        for (const dependencyId of dependencies) null === this._scene.getEntity(dependencyId) && this._createEntity(dependencyId);
      } else if (!shouldLoad && null !== entity) {
        const cameraParentId = cameraEntity.getParent()?.getName();
        const ignoredDependencies = contentManager.getEntityInfo(entityId)?.ignoreDependentWhenUnloading;
        let hasLoadedDependent = false;
        for (let dependencyIndex = 0, dependencyCount = entityStatus.dependentEntities.length; dependencyIndex < dependencyCount; dependencyIndex++) {
          const loadedDependencyId = this._scene.getEntity(entityStatus.dependentEntities[dependencyIndex])?.getName();
          if (loadedDependencyId) {
            if (loadedDependencyId === cameraParentId && ignoredDependencies?.includes(cameraParentId)) {
              hasLoadedDependent = false;
              break;
            }
            hasLoadedDependent = true;
          }
        }
        if (!hasLoadedDependent) {
          for (let callbackIndex = 0, callbackCount = this._entityWillBeUnloadedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) {
            this._entityWillBeUnloadedCallbacks[callbackIndex](entity);
            entity = null;
          }
          entityStatus.dependentEntities = [];
          this._scene.removeEntity(entityId);
        }
      }
      const parentStatus = this._entityStatuses.get(entity?.getParent()?.getName());
      const shouldBeVisible = entityStatus.forceVisible || entityStatus.layerVisibility && parentStatus?.visible || this._isAncestorOfCamera(cameraEntity, entityId) || entityStatus.entitiesForcingThisVisible.size > 0;
      null !== entity && entityStatus.visible !== shouldBeVisible && this.setVisibility(shouldBeVisible, entityId);
    }
  }
  _createEntity(entityId) {
    const entity = SolarSystemSceneExports.Entity.create(entityId, this._scene, this._entityExtraOptions);
    this._entityStatuses.get(entityId).visible || this.setVisibility(false, entityId);
    const dependencies = SolarSystemSceneExports.SceneHelpers.getDependentEntities(entityId);
    for (const dependencyId of dependencies) {
      let dependencyStatus = this._entityStatuses.get(dependencyId);
      void 0 === dependencyStatus && (this.addEntity(dependencyId, this._entityStatuses.get(entityId).dynamic), dependencyStatus = this._entityStatuses.get(dependencyId));
      dependencyStatus.dependentEntities.push(entityId);
    }
    for (let callbackIndex = 0, callbackCount = this._entityLoadedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) this._entityLoadedCallbacks[callbackIndex](entity);
    return entity;
  }
  _isAncestorOfCamera(cameraEntity, ancestorId) {
    let ancestor = cameraEntity;
    for (; null !== ancestor;) {
      if (ancestor.getName() === ancestorId) return true;
      for (let parentEntryIndex = 0, parentEntryCount = ancestor.getNumParentingTableEntries(); parentEntryIndex < parentEntryCount; parentEntryIndex++) if (ancestor.getParentingTableEntry(parentEntryIndex)[1] === ancestorId) return true;
      ancestor = ancestor.getParent();
    }
    return false;
  }
  setVisibility(visible, entityId) {
    const entityStatus = this._entityStatuses.get(entityId);
    void 0 !== entityStatus && (entityStatus.visible = visible);
    const entity = this._scene.getEntity(entityId);
    if (null === entity) return;
    const layerManager = this.app.getManager("layer");
    const trailsVisible = layerManager.getLayer("trails").visible;
    const labelsVisible = layerManager.getLayer("labels").visible;
    for (let componentIndex = 0; componentIndex < entity.getNumComponents(); componentIndex++) {
      const component = entity.getComponentAt(componentIndex);
      "sun" !== entity.getName() && (visible && component instanceof Pioneer.TrailComponent ? component.setEnabled(visible && trailsVisible && !entityStatus.componentTypesNotVisible.has(Pioneer.TrailComponent)) : visible && component instanceof Pioneer.DivComponent ? component.setEnabled(visible && labelsVisible && !entityStatus.componentTypesNotVisible.has(Pioneer.DivComponent)) : component.setEnabled(visible && !Array.from(entityStatus.componentTypesNotVisible).some(hiddenComponentType => component instanceof hiddenComponentType)));
    }
    const entityInfo = this.app.getManager("content").getEntityInfo(entityId);
    if (void 0 !== entityInfo?.forceVisibleEntities) for (let forcedEntityIndex = 0, forcedEntityCount = entityInfo.forceVisibleEntities.length; forcedEntityIndex < forcedEntityCount; forcedEntityIndex++) {
      const forcedEntityStatus = this._entityStatuses.get(entityInfo.forceVisibleEntities[forcedEntityIndex]);
      if (void 0 === forcedEntityStatus) throw new Error(`Entity ${entityId} was set to force load, but isn't in the scene manager. Use addEntity().`);
      visible ? forcedEntityStatus.entitiesForcingThisVisible.add(entityId) : forcedEntityStatus.entitiesForcingThisVisible.delete(entityId);
    }
  }
  _isEntityVisibleWithinParent(entityId) {
    const parentId = SolarSystemSceneExports.Parenting.getParentOfEntity(entityId, this._scene.getEngine().getTime());
    const parentEntity = this._scene.getEntity(parentId);
    if (null === parentEntity) return false;
    const parentOptions = SolarSystemSceneExports.Entity.getEntityOptions(parentId);
    return (parentOptions.systemRadius || 25 * parentOptions.radius || 25 * parentOptions.extentsRadius) / parentEntity.getExtentsRadius() * parentEntity.getGreatestPixelSpaceExtentsRadius() >= 20;
  }
  get(sceneName) {
    return void 0 !== this._scenes[sceneName] ? this._scenes[sceneName] : null;
  }
  getEntitiesNames() {
    const entityNames = [];
    for (let entityIndex = 0; entityIndex < this._scene.getNumEntities(); entityIndex++) {
      const entity = this._scene.getEntityAt(entityIndex);
      entityNames.push(entity.getName());
    }
    return entityNames;
  }
  getParent(entityId) {
    const entity = this._scene.getEntity(entityId);
    if (null !== entity) {
      const parentEntity = entity.getParent();
      if (null !== parentEntity) return parentEntity.getName();
    }
    return null;
  }
  getParentList(entityId) {
    let parentId = this.getParent(entityId);
    const parentIds = [];
    for (; null !== parentId && "" !== parentId;) {
      parentIds.push(parentId);
      parentId = this.getParent(parentId);
    }
    return parentIds;
  }
  getDependencies(entityId) {
    const entity = this._scene.getEntity(entityId);
    const set = new Set();
    if (null !== entity) for (let parentEntryIndex = 0; parentEntryIndex < entity.getNumParentingTableEntries(); parentEntryIndex++) {
      const parentId = entity.getParentingTableEntry(parentEntryIndex)[1];
      "" !== parentId && set.add(parentId);
    }
    const entityOptions = SolarSystemSceneExports.Entity.getEntityOptions(entityId);
    if (void 0 !== entityOptions) for (const optionName of Object.keys(entityOptions)) {
      const optionValue = entityOptions[optionName];
      if ("parents" === optionName) for (let parentEntryIndex = 0; parentEntryIndex < optionValue.length; parentEntryIndex++) {
        const parentId = optionValue[parentEntryIndex][1];
        "" !== parentId && set.add(parentId);
      }
      "align" === optionName && (optionValue.primary && optionValue.primary.target && optionValue.primary.target !== entityId && set.add(optionValue.primary.target), optionValue.secondary && optionValue.secondary.target && optionValue.secondary.target !== entityId && set.add(optionValue.secondary.target));
    }
    return Array.from(set);
  }
  async isReady(entityId, time) {
    time = void 0 === time ? this.pioneer.getTime() : this.app.getManager("time").momentToET(time);
    await this._scene.waitTillEntitiesInPlace([entityId], time);
  }
  async isListReady(entityIds, times) {
    const readinessPromises = [];
    void 0 === times && (times = [void 0]);
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) for (let timeIndex = 0; timeIndex < times.length; timeIndex++) readinessPromises.push(this.isReady(entityIds[entityIndex], times[timeIndex]));
    await Promise.all(readinessPromises);
  }
  async tileIsReady(component) {
    let tilesPromise = null;
    return new Promise((resolveReady, rejectReady) => {
      const readinessPoll = setInterval(() => {
        component.isEnabled() && component.getEntity().isEnabled() || (clearInterval(readinessPoll), rejectReady(new Error("disabled")));
        null === tilesPromise && null !== component.getTilesLoadedPromise() && (tilesPromise = component.getTilesLoadedPromise().then(() => {
          clearInterval(readinessPoll);
          resolveReady(true);
        }));
      }, 30);
    });
  }
  hasCMTS(entityId) {
    return !!SolarSystemSceneExports.Mapping.getOptions()[entityId] && "cmts" in SolarSystemSceneExports.Mapping.getOptions()[entityId];
  }
  getCMTSEntity(entityId) {
    if (!entityId) return null;
    if (this.hasCMTS(entityId)) return this._scene.getEntity(entityId);
    let ancestorId = entityId;
    for (; !this.hasCMTS(ancestorId) && (ancestorId = this._scene.getEntity(ancestorId)?.getParent()?.getName(), ancestorId && !ancestorId.includes("universe")););
    return this.hasCMTS(ancestorId) ? this._scene.getEntity(ancestorId) : null;
  }
  async terrainIsReady(component) {
    let tilesPromise = null;
    return new Promise(resolveReady => {
      const readinessPoll = setInterval(() => {
        component.isEnabled() && component.getEntity().isEnabled() || (clearInterval(readinessPoll), resolveReady(true));
        null === tilesPromise && null !== component._loadedPromise && (tilesPromise = component.getTilesLoadedPromise().then(() => {
          clearInterval(readinessPoll);
          resolveReady(true);
        }));
      }, 30);
    });
  }
  async componentIsReady(component) {
    if (component.isEnabled() && "loaded" === component.getLoadState().state) return;
    return new Promise(resolveReady => {
      const readinessPoll = setInterval(() => {
        component.isEnabled() && component.getEntity().isEnabled() || (clearInterval(readinessPoll), resolveReady(true));
        "loaded" === component.getLoadState().state && (clearInterval(readinessPoll), resolveReady(true));
      }, 30);
    });
  }
  toggleStarfield(enabled) {
    for (let starfieldIndex = 0; starfieldIndex < 7; starfieldIndex++) this._scene.getEntity("sun").getComponent(Pioneer.StarfieldComponent, starfieldIndex).setEnabled(enabled);
  }
  toggleHeliosphere(enabled) {
    this._scene.getEntity("sun").getComponent(Pioneer.ModelComponent).setEnabled(enabled);
  }
  async toggleConstellations(enabled) {
    const sunEntity = this._scene.getEntity("sun");
    if (null === sunEntity) return;
    let constellationsComponent = sunEntity.getComponent(SolarSystemSceneExports.ConstellationsComponent);
    if (enabled && null === constellationsComponent) {
      constellationsComponent = sunEntity.addComponent(SolarSystemSceneExports.ConstellationsComponent);
      constellationsComponent instanceof SolarSystemSceneExports.ConstellationsComponent && (constellationsComponent.setUrl("$STATIC_ASSETS_URL/stars/constellations.bin"), constellationsComponent.setColor(new Pioneer.Color(.35, .7, 1, .5)));
      await constellationsComponent.getLoadedPromise();
      const labelManager = this.app.getManager("label");
      const contentManager = this.app.getManager("content");
      const color = new Pioneer.Color(.35, .7, 1, 1);
      const cameraComponent = this.get("main").getEntity("camera").getComponent(Pioneer.CameraComponent);
      constellationsComponent.getNames().forEach(constellationName => {
        const labelId = `constellation_label_${constellationName}`;
        const labelEntity = this._scene.getEntity(labelId);
        const labelWeight = labelManager.getDefaultWeight(labelId);
        labelManager.addLabel(labelEntity, labelWeight);
        labelManager.setLabelProps({
          getLabelClass: entityId => `no-select ${contentManager.getClassName(entityId, "constellation") ?? "constellation"}`,
          handleTouch: null,
          handleMouseEnter: event => {
            constellationsComponent.setHighlight(constellationsComponent.getNearestConstellationIndex(new Pioneer.Vector2(event.x, event.y), cameraComponent), color, 2.5);
          },
          handleMouseLeave: () => {
            constellationsComponent.setHighlight(void 0, color, 2.5);
          },
          handleClick: null
        }, [labelId]);
      });
    } else if (!enabled && null !== constellationsComponent) {
      const labelManager = this.app.getManager("label");
      constellationsComponent.getNames().forEach(constellationName => {
        const labelId = `constellation_label_${constellationName}`;
        const labelEntity = this._scene.getEntity(labelId);
        labelManager.removeLabel(labelEntity);
      });
      sunEntity.removeComponent(constellationsComponent);
    }
  }
  isHD() {
    return this._isHD;
  }
  hasHD(entityId) {
    const entity = this._scene.getEntity(entityId);
    if (null === entity) return false;
    if (Object.prototype.hasOwnProperty.call(this._hdWMTSMap, entityId)) return true;
    if (null !== entity.getParent() && Object.prototype.hasOwnProperty.call(this._hdWMTSMap, entity.getParent().getName())) return true;
    if (null !== entity.getComponent(Pioneer.SpheroidLODComponent)) {
      const textureSizes = entity.getComponent(Pioneer.SpheroidLODComponent).getTextureSizes("color");
      for (let textureIndex = 0; textureIndex < textureSizes.length; textureIndex++) if (textureSizes[textureIndex] > this._hdBreakpointSize) return true;
    }
    return false;
  }
  setHDBreakpoints(hdBreakpointSize, maxTextureSize) {
    this._hdBreakpointSize = hdBreakpointSize;
    this._maxTextureSize = maxTextureSize;
  }
  async toggleHD() {
    this._isHD = !this._isHD;
    this._isHD || this.pioneer.getConfig().setValue("maxTextureSize", this._hdBreakpointSize);
    for (const entityId in this._hdWMTSMap) {
      const wmtsName = this._hdWMTSMap[entityId];
      const entity = this._scene.getEntity(entityId);
      const lodComponent = entity.getComponent(Pioneer.SpheroidLODComponent);
      const wmtsComponent = entity.getComponent(SolarSystemSceneExports.WMTSComponent, wmtsName);
      if (EyesPublicApi.AppUtils.isMobileMode() && wmtsComponent.setMaxLevel(5), wmtsComponent.setEnabled(this._isHD), this._isHD) {
        this.addLoading(entityId, "wmts");
        await this.pioneer.waitUntilNextFrame();
        true === (await this.tileIsReady(wmtsComponent).catch(() => {
          this.removeLoading(entityId, "wmts");
        })) && (lodComponent.setEnabled(false), this.removeLoading(entityId, "wmts"));
      } else lodComponent.setEnabled(true);
      this._isHD && this.pioneer.getConfig().setValue("maxTextureSize", this._maxTextureSize);
    }
  }
  async updateHDTarget(entityInfo, entityId) {
    const contentManager = this.app.getManager("content");
    const currentView = this.app.getManager("router").currentView;
    let hdToggleEntity = entityId;
    if (this._hdToggleEntity = null, "Planet" === entityInfo.category || "Moon" === entityInfo.category || "Dwarf Planet" === entityInfo.category || "Star" === entityInfo.category) hdToggleEntity = entityId;else {
      const parentId = this.getParent(entityId);
      if ("event" === currentView) return void (hdToggleEntity = this.app.getView("event")._eventInfo?.target);
      const closestSpaceObjectId = await this.findClosestSpaceObjectTo(entityId);
      if (null !== parentId) {
        const parentInfo = contentManager.getEntityInfo(parentId);
        if ("Planet" === parentInfo.category || "Moon" === parentInfo.category) return void (hdToggleEntity = parentId);
        if ("Landing site" === parentInfo.category) {
          return void (hdToggleEntity = this.getParent(parentId));
        }
        if (closestSpaceObjectId) return parentId === closestSpaceObjectId ? void (hdToggleEntity = parentId) : void (hdToggleEntity = closestSpaceObjectId);
      }
    }
    null !== hdToggleEntity && this.hasHD(hdToggleEntity) ? this._hdToggleEntity = hdToggleEntity : this._hdToggleEntity = null;
  }
  async findClosestSpaceObjectTo(entityId) {
    const scene = this.get("main");
    const dependencies = SolarSystemSceneExports.SceneHelpers.getDependentEntities(entityId);
    const dependencyIds = Array.from(dependencies);
    const hdDependencyIds = dependencyIds.filter(dependencyId => this.hasHD(dependencyId));
    return scene.waitTillEntitiesInPlace(dependencyIds, this.app.pioneer.getTime(), 3).then(async () => {
      let closestEntityId = "";
      let closestDistance = scene.getEntity(hdDependencyIds[0])?.getDistanceTo(scene.getEntity(entityId), false);
      hdDependencyIds.forEach(candidateId => {
        const candidateDistance = scene.getEntity(candidateId).getDistanceTo(scene.getEntity(entityId), false);
        candidateDistance < closestDistance && (closestDistance = candidateDistance, closestEntityId = candidateId);
      });
      return closestEntityId;
    }).catch(readinessError => {
      console.warn(readinessError);
    });
  }
  async forceTextureSizeForEntity(entityId, textureSize, textureRole = "color") {
    const lodComponent = this.app.pioneer.getScene("main").getEntity(entityId).getComponent(Pioneer.SpheroidLODComponent);
    null != lodComponent && lodComponent.forceTextureSize(textureRole, textureSize);
  }
  async isEntityHD(entityId) {
    const lodComponent = this.app.pioneer.getScene("main").getEntity(entityId).getComponent(Pioneer.SpheroidLODComponent);
    return !(null == lodComponent || !lodComponent.isEnabled()) && (await lodComponent.getTexturesLoadedPromise(3).catch(() => false), lodComponent.getTextureCurrentSize("color", 0) > this._hdBreakpointSize);
  }
  async toggleHDTextureForEntity(entityId, requestedHD = null) {
    const currentlyHD = await this.isEntityHD(entityId);
    if (null !== requestedHD && currentlyHD === requestedHD) return requestedHD;
    const lodComponent = this.app.pioneer.getScene("main").getEntity(entityId).getComponent(Pioneer.SpheroidLODComponent);
    const isHD = null !== requestedHD ? requestedHD : !currentlyHD;
    const textureSize = isHD ? EyesPublicApi.AppUtils.isiPhone() ? this._mobileTextureSize : this._maxTextureSize : this._hdBreakpointSize;
    this.addLoading(entityId, "spheroidLOD");
    lodComponent.getTextureNames().forEach(textureRole => {
      this.forceTextureSizeForEntity(entityId, textureSize, textureRole);
    });
    await lodComponent?.getTexturesLoadedPromise(3).catch(async () => {
      const defaultTextureInfo = this.app.getManager("content").getSpheroidDefaultTextureInformation(entityId);
      this.app.getManager("layer").changeSpheroidMap(entityId, defaultTextureInfo);
      this._isHD = false;
      return false;
    });
    this.removeLoading(entityId, "spheroidLOD");
    this._isHD = isHD;
    return isHD;
  }
  createRing(ringId, radius, parentId, {
    orbitPlaneEntityName: orbitPlaneEntityName,
    color: color,
    numCircles: circleCount = 1,
    numSpokes: spokeCount = 0,
    labelPosition = new Pioneer.Vector3(-radius, 0, 0),
    labelText = "",
    isEnable: enabled = true
  } = {}) {
    const ringEntity = this._scene.addEntity(ringId);
    ringEntity.setPosition(Pioneer.Vector3.Zero);
    const parentEntity = this._scene.getEntity(parentId);
    ringEntity.setParent(parentEntity);
    const discGridComponent = ringEntity.addComponent(SolarSystemSceneExports.DiscGridComponent);
    discGridComponent.setLineWidth(6);
    discGridComponent.setSize(radius);
    discGridComponent.setNumCircles(circleCount);
    discGridComponent.setNumSpokes(spokeCount);
    orbitPlaneEntityName && this.setAlignPlane(ringEntity, orbitPlaneEntityName);
    color instanceof Pioneer.Color && discGridComponent.setColor(color);
    const labelEntity = this._scene.addEntity(`${ringId}Label`);
    labelEntity.setPosition(Pioneer.Vector3.Zero);
    labelEntity.setParent(parentEntity);
    labelEntity.addController(Pioneer.FixedController).setPosition(labelPosition);
    const divComponent = labelEntity.addComponent(Pioneer.DivComponent);
    divComponent.getDiv().classList.add("ring-label");
    divComponent.getDiv().innerHTML = labelText;
    ringEntity.setEnabled(enabled);
    labelEntity.setEnabled(enabled);
  }
  createTorus(torusId, innerRadius, outerRadius, parentId, {
    orbitPlaneEntityName: orbitPlaneEntityName,
    color: color,
    visibleDistance = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    labelPosition = new Pioneer.Vector3(-outerRadius, 0, 0),
    labelText = "",
    isEnable: enabled = true
  } = {}) {
    const torusEntity = this._scene.addEntity(torusId);
    torusEntity.setPosition(Pioneer.Vector3.Zero);
    const parentEntity = this._scene.getEntity(parentId);
    torusEntity.setParent(parentEntity);
    const torusComponent = torusEntity.addComponent(SolarSystemSceneExports.TorusComponent);
    torusComponent.setInnerRadius(innerRadius);
    torusComponent.setOuterRadius(outerRadius);
    torusComponent.setVisibleInterval(new Pioneer.VisibleInterval(...visibleDistance));
    orbitPlaneEntityName && this.setAlignPlane(torusEntity, orbitPlaneEntityName);
    color instanceof Pioneer.Color && torusComponent.setColor(color);
    const labelEntity = this._scene.addEntity(`${torusId}Label`);
    labelEntity.setPosition(Pioneer.Vector3.Zero);
    labelEntity.setParent(parentEntity);
    labelEntity.addController(Pioneer.FixedController).setPosition(labelPosition);
    const divComponent = labelEntity.addComponent(Pioneer.DivComponent);
    divComponent.getDiv().classList.add("ring-label");
    divComponent.getDiv().innerHTML = labelText;
    torusEntity.setEnabled(enabled);
    labelEntity.setEnabled(enabled);
  }
  setEntityHDWMTS(entityId, wmtsName) {
    this._hdWMTSMap[entityId] = wmtsName;
  }
  async enableWMTSComponent(entityId, wmtsComponent) {
    EyesPublicApi.AppUtils.isMobileMode() && wmtsComponent.setMaxLevel(5);
    const lodComponent = this.get("main").getEntity(entityId).getComponent(Pioneer.SpheroidLODComponent);
    this.addLoading(entityId, "wmts");
    wmtsComponent.setEnabled(true);
    await this.pioneer.waitUntilNextFrame();
    (await this.tileIsReady(wmtsComponent).catch(() => {
      this.removeLoading(entityId, "wmts");
    })) ? (lodComponent.setEnabled(false), this.removeLoading(entityId, "wmts")) : lodComponent.setEnabled(true);
  }
  async addWMTSComponent(entityId, options) {
    this.addLoading(entityId, "wmts");
    const wmtsManager = this.app.getManager("wmts");
    const wmtsComponent = await wmtsManager.initWMTS(entityId, options);
    wmtsComponent ? (this.removeLoading(entityId, "wmts"), await this.enableWMTSComponent(entityId, wmtsComponent)) : await this.showWMTSError(entityId);
  }
  async showWMTSError(entityId) {
    this.removeLoading(entityId, "wmts");
    const toastComponent = this.app.getComponent("toast");
    const errorMessage = "WMTS Data could not be loaded. Switching to " + (this.hasHD(entityId) ? "HD" : "standard") + " map.";
    toastComponent.setError(true);
    toastComponent.setContent(errorMessage);
    toastComponent.show();
    this.hasHD(entityId) && !this.isHD() && (await this.toggleHDTextureForEntity(entityId));
  }
  loadWMTSFromJSON(wmtsDefinitions) {
    for (const entityId in wmtsDefinitions) {
      let hdDefinition = "";
      for (const mapName in wmtsDefinitions[entityId]) if ("hd" === mapName || "" === hdDefinition) {
        hdDefinition = wmtsDefinitions[entityId][mapName];
        this._hdWMTSMap[entityId] = hdDefinition;
      } else {
        const mapDefinition = wmtsDefinitions[entityId][mapName];
        const wmtsComponent = this._scene.getEntity(entityId).addComponent(SolarSystemSceneExports.WMTSComponent, mapName);
        wmtsComponent.setEnabled(false);
        wmtsComponent.setEndPoint(mapDefinition.endPoint);
        wmtsComponent.setLayer(mapDefinition.layer);
        mapDefinition.tile && wmtsComponent.setTileMatrixSet(mapDefinition.tile);
        const date = new Date();
        "yesterday" === mapDefinition.time ? (date.setDate(date.getDate() - 1), wmtsComponent.setDimensionValue("Time", date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"))) : "now" === mapDefinition.time && wmtsComponent.setDimensionValue("Time", date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"));
        mapDefinition.level ? wmtsComponent.setMaxLevel(mapDefinition.level) : wmtsComponent.setMaxLevel(1 / 0);
      }
    }
  }
  setAlignPlane(entity, orbitPlaneEntityId) {
    const orbitPlaneEntity = this._scene.getEntity(orbitPlaneEntityId);
    const quaternion = new Pioneer.Quaternion();
    orbitPlaneEntity.getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, this.app.pioneer.getTime());
    entity.setOrientation(quaternion);
  }
  clearTempEntities() {
    const cameraEntity = this.app.getManager("camera").cameraEntity;
    if (null === cameraEntity || null === cameraEntity.getParent()) return;
    const cameraParentId = cameraEntity.getParent().getName();
    this._tempEntities = this._tempEntities.filter(temporaryEntity => {
      if (cameraParentId === temporaryEntity.getName()) return true;
      this.app.getManager("label").removeLabel(temporaryEntity);
      this._scene.removeEntity(temporaryEntity?.getName());
      return false;
    });
  }
  addTempEntity(entity) {
    this._tempEntities.push(entity);
  }
  addLoading(entityId, loadingKind) {
    const loadingKey = entityId + "_" + loadingKind;
    this._loadingItems.indexOf(loadingKey) < 0 && this._loadingItems.push(loadingKey);
    this._loadingItems.length > 0 && (this._isLoading = true, this.triggerCallbacks("loading"));
  }
  removeLoading(entityId, loadingKind) {
    if ("*" === entityId) for (let loadingIndex = 0; loadingIndex < this._loadingItems.length; loadingIndex++) this._loadingItems[loadingIndex].includes(loadingKind) && this._loadingItems.splice(loadingIndex, 1);else {
      const loadingKey = entityId + "_" + loadingKind;
      const loadingIndex = this._loadingItems.indexOf(loadingKey);
      loadingIndex >= 0 && this._loadingItems.splice(loadingIndex, 1);
    }
    0 === this._loadingItems.length && (this._isLoading = false, this.triggerCallbacks("loaded", [entityId]));
  }
  forceLoad(component) {
    component.setForceLoaded(true);
    this._loadedComponents.push(component);
  }
  removeForceLoad(component) {
    this._loadedComponents = this._loadedComponents.filter(loadedComponent => loadedComponent !== component || (component.setForceLoaded(false), false));
  }
  clearForceLoad() {
    for (let componentIndex = 0; componentIndex < this._loadedComponents.length; componentIndex++) {
      this._loadedComponents[componentIndex].setForceLoaded(false);
    }
    this._loadedComponents = [];
  }
  getDistance(entityId, relativeEntityId, {
    time: time,
    subtractRadius = false,
    precision = 0
  } = {}) {
    const relativePosition = Pioneer.Vector3.pool.get();
    const entity = this._scene.getEntity(entityId);
    const relativeEntity = this._scene.getEntity(relativeEntityId);
    let distance = 0;
    if (void 0 !== time) {
      const ephemerisTime = Pioneer.TimeUtils.unixToEt(time.valueOf() / 1e3);
      entity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, relativeEntity, ephemerisTime);
    } else entity.getPositionRelativeToEntity(relativePosition, Pioneer.Vector3.Zero, relativeEntity);
    if (distance = relativePosition.magnitude(), subtractRadius) {
      distance -= entity.getExtentsRadius() + relativeEntity.getExtentsRadius();
    }
    if (precision > 0) {
      const roundingStep = Math.pow(10, Math.floor(Math.log10(distance)) - precision);
      distance = Math.round(distance / roundingStep) * roundingStep;
    }
    Pioneer.Vector3.pool.release(relativePosition);
    return distance;
  }
  getSpeed(entityId, relativeEntityId, {
    time: time
  } = {}) {
    const relativeVelocity = Pioneer.Vector3.pool.get();
    const entity = this._scene.getEntity(entityId);
    let relativeEntity = null;
    if (relativeEntity = void 0 === relativeEntityId ? entity.getParent() : this._scene.getEntity(relativeEntityId), void 0 !== time) {
      const ephemerisTime = this.app.getManager("time").momentToET(time);
      entity.getVelocityRelativeToEntity(relativeVelocity, Pioneer.Vector3.Zero, relativeEntity, ephemerisTime);
    } else entity.getVelocityRelativeToEntity(relativeVelocity, Pioneer.Vector3.Zero, relativeEntity);
    Pioneer.Vector3.pool.release(relativeVelocity);
    return relativeVelocity.magnitude();
  }
  getCoverage(entityId, includeOrientation = true) {
    const coverage = {
      min: EyesPublicApi.AppUtils.constants.maxDate,
      max: EyesPublicApi.AppUtils.constants.minDate
    };
    const entity = this.pioneer.getScene("main").getEntity(entityId);
    let coverageStart = entity.getPositionCoverage().min;
    let coverageEnd = entity.getPositionCoverage().max;
    if (includeOrientation && (coverageStart = Math.max(entity.getPositionCoverage().min, entity.getOrientationCoverage().min), coverageEnd = Math.min(entity.getPositionCoverage().max, entity.getOrientationCoverage().max)), coverage.min = entity ? Math.min(coverageStart, coverage.min) : coverage.min, coverage.max = entity ? Math.max(coverageEnd - .001, coverage.max) : coverage.max, coverage.min === -1 / 0 || coverage.min < EyesPublicApi.AppUtils.minDate) coverage.min = getFollowName()(EyesPublicApi.AppUtils.constants.minDate);else {
      coverage.min = Math.ceil(1e3 * coverage.min) / 1e3;
      let startUnixMilliseconds = 1e3 * Pioneer.TimeUtils.etToUnix(coverage.min);
      startUnixMilliseconds = Math.ceil(1e3 * startUnixMilliseconds) / 1e3;
      coverage.min = getFollowName().tz(startUnixMilliseconds, "ETC/Utc");
    }
    if (coverage.max === 1 / 0 || coverage.max > EyesPublicApi.AppUtils.maxDate) coverage.max = getFollowName()(EyesPublicApi.AppUtils.constants.maxDate);else {
      coverage.max = Math.floor(1e3 * coverage.max) / 1e3;
      let endUnixMilliseconds = 1e3 * Pioneer.TimeUtils.etToUnix(coverage.max);
      endUnixMilliseconds = Math.floor(1e3 * endUnixMilliseconds) / 1e3;
      coverage.max = getFollowName().tz(endUnixMilliseconds, "ETC/Utc");
    }
    return coverage;
  }
  async toggleRing(enabled) {
    console.log("toggleRing", enabled);
  }
  get main() {
    return this._scene;
  }
  get isLoading() {
    return this._isLoading;
  }
}
export { SceneManager };
