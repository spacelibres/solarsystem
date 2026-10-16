// Recovered from app.js:1244022-1252117.
/* 图层可见性由本管理器拥有，切换先执行图层回调，再同步子图层和场景实体；目标依赖集用于离开旧上下文时重置图层。贴图切换等待资源完成后移除 loading，WMTS 与普通 LOD 地图各自保留启停规则。 */
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class LayerManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._sceneManager = app.getManager("scene");
    this._contentManager = app.getManager("content");
    this._layers = {};
    this._contextualLayersList = ["majorMoons", "minorMoons", "landers", "orbiters", "satelliteGroup", "heliosphere"];
    this._targetId = "";
    this._previousTarget = [];
    this._dependencies = new Set();
    this._previousDependencies = new Set();
    this._currentSurfaceLayer = "default";
    this.bindFunctions(["resetContextualVisibility", "toggleLayer", "changeSpheroidMap", "resetContextualLayers"]);
    this._eventNames.push("toggleLayer");
    this._initCallbacks();
  }
  addLayer(layerId, {
    name: displayName = "",
    group: groupName = "",
    categories = [],
    defaultVisibility = true,
    toggleCallback: toggleCallbacks = [],
    sublayers: sublayerIds = []
  }) {
    void 0 === this._layers[layerId] && (this._layers[layerId] = {});
    this._layers[layerId].name = displayName;
    this._layers[layerId].group = groupName;
    this._layers[layerId].defaultVisibility = defaultVisibility;
    this._layers[layerId].visible = defaultVisibility;
    Array.isArray(categories) || (categories = [categories]);
    this._layers[layerId].categories = categories;
    Array.isArray(sublayerIds) || (sublayerIds = [sublayerIds]);
    this._layers[layerId].sublayers = sublayerIds;
    for (let sublayerIndex = 0; sublayerIndex < sublayerIds.length; sublayerIndex++) {
      const sublayerId = sublayerIds[sublayerIndex];
      void 0 === this._layers[sublayerId] && (this._layers[sublayerId] = {});
      this._layers[sublayerId].parent = layerId;
    }
    Array.isArray(toggleCallbacks) || (toggleCallbacks = [toggleCallbacks]);
    this._layers[layerId].toggleCallback = toggleCallbacks;
  }
  addCallback(layerId, callback) {
    const layer = this.getLayer(layerId);
    null !== layer && layer.toggleCallback.push(callback);
  }
  removeCallback(layerId, callback) {
    const layer = this.getLayer(layerId);
    if (null === layer) return;
    const callbackIndex = layer.toggleCallback.indexOf(callback);
    layer.toggleCallback.splice(callbackIndex, 1);
  }
  getLayer(layerId) {
    return void 0 === this._layers[layerId] ? null : this._layers[layerId];
  }
  getCurrentSurfaceLayer() {
    return this._currentSurfaceLayer;
  }
  async changeSpheroidMap(entityId, mapInfo, options = {}) {
    if ("cmts" === mapInfo.type) return void console.error("This function does not yet handle CMTS texture");
    const sceneManager = this.app.getManager("scene");
    const wmtsManager = this.app.getManager("wmts");
    const lodComponent = sceneManager.get("main").getEntity(entityId)?.getComponent(Pioneer.SpheroidLODComponent);
    const atmosphereComponent = sceneManager.get("main").getEntity(entityId)?.getComponent(Pioneer.AtmosphereComponent);
    const wmtsComponent = sceneManager.get("main").getEntity(entityId)?.getComponent(SolarSystemSceneExports.WMTSComponent);
    this._currentSurfaceLayer = mapInfo.id;
    lodComponent && "texture" === mapInfo.type ? (false === wmtsManager.getWMTSComponentState(entityId) && sceneManager.isEntityHD(entityId) && (await sceneManager.toggleHDTextureForEntity(entityId, false)), lodComponent.setEnabled(true), sceneManager.addLoading(entityId, "spheroidLOD"), Object.keys(mapInfo.textures).forEach(textureRole => {
      const textureUrl = "$STATIC_ASSETS_URL/maps/" + mapInfo.textures[textureRole].url;
      lodComponent.setTexture(textureRole, textureUrl, mapInfo.textures[textureRole].sizes);
    }), await lodComponent.getLoadedPromise(), null !== wmtsComponent && wmtsComponent.setEnabled(false), sceneManager.removeLoading(entityId, "spheroidLOD")) : "wmts" === mapInfo.type && (null === wmtsComponent || wmtsComponent.getName() !== mapInfo.id ? await sceneManager.addWMTSComponent(entityId, mapInfo) : false === wmtsComponent.isEnabled() && (await sceneManager.enableWMTSComponent(entityId, wmtsComponent)));
    null != atmosphereComponent && false !== options.atmosphere && atmosphereComponent.setEnabled(mapInfo.features.includes("atmosphere"));
  }
  async resetSpheroidMap(entityId) {
    const atmosphereComponent = this._app.pioneer.getScene("main").getEntity(entityId)?.getComponent(Pioneer.AtmosphereComponent);
    let preservedFeatures = ["shadowEntities"];
    atmosphereComponent?.isEnabled() && (preservedFeatures = ["shadowEntities", "atmosphere"]);
    const defaultTexture = this._app.getManager("content").getSpheroidDefaultTextureInformation(entityId, preservedFeatures);
    "default" !== defaultTexture?.id && (await this.changeSpheroidMap(entityId, defaultTexture));
  }
  async toggleLayer(layerId, options = {}, requestedVisibility) {
    const {
      spout: spout,
      spoutFontSize: spoutFontSize
    } = this.app.getManager("router").configs;
    if (void 0 === this._layers[layerId]) return;
    const {
      configs: configs
    } = this._app.getManager("router");
    if (options.layerId = layerId, void 0 !== requestedVisibility && this._layers[layerId].visible === requestedVisibility && true !== configs[layerId]) return;
    this._layers[layerId].visible = !this._layers[layerId].visible;
    for (let callbackIndex = 0; callbackIndex < this._layers[layerId].toggleCallback.length; callbackIndex++) {
      (0, this._layers[layerId].toggleCallback[callbackIndex])(this._layers[layerId].visible, options);
    }
    for (let sublayerIndex = 0; sublayerIndex < this._layers[layerId].sublayers.length; sublayerIndex++) {
      this.getLayer(this._layers[layerId].sublayers[sublayerIndex]).visible = this._layers[layerId].visible;
      this.triggerCallbacks("toggleLayer", [this._layers[layerId].sublayers[sublayerIndex], this._layers[layerId].visible, options]);
    }
    this.triggerCallbacks("toggleLayer", [layerId, this._layers[layerId].visible, options]);
    const sceneManager = this.app.getManager("scene");
    if (null !== options.parentId && void 0 !== options.parentId ? sceneManager.updateEntityLayerVisibilityForChildren(options) : sceneManager.updateEntityLayerVisibility(options), true === spout && this._layers[layerId].visible) {
      const constellationLabels = [];
      if (await this.pioneer.waitUntilNextFrame(), layerId.toLowerCase().includes("constellations")) {
        this.app.pioneer.getScene("main").getEntity("sun").getComponent(SolarSystemSceneExports.ConstellationsComponent).getNames().forEach(constellationName => {
          constellationLabels.push(this.app.pioneer.getScene("main").getEntity(`constellation_label_${constellationName}`));
        });
      }
      await this.app.getManager("spout").setUpSpoutLabels(spoutFontSize, constellationLabels?.[0]?.id);
    }
  }
  syncLayerVisibilityWithQueries() {
    const routeConfigs = this.app.getManager("router").configs;
    this._contextualLayersList.forEach(layerId => {
      const requestedVisibility = routeConfigs[layerId] ?? this._app.getManager("layer").getLayer(layerId).defaultVisibility;
      this.toggleLayer(layerId, {}, requestedVisibility);
    });
  }
  setTarget(targetId) {
    if (this._previousTarget.push(this._targetId), this._previousDependencies = new Set([...this._previousDependencies, ...this._dependencies]), this._targetId = targetId, this._dependencies.clear(), "" !== this._targetId) {
      const dependencies = this._sceneManager.getDependencies(this._targetId);
      this._dependencies = new Set(dependencies);
    }
  }
  resetTarget() {
    for (let targetIndex = 0; targetIndex < this._previousTarget.length; targetIndex++) {
      const previousTarget = this._previousTarget[targetIndex];
      const cameraEntity = this.app.getManager("camera").cameraEntity;
      if (null === cameraEntity || null === cameraEntity.getParent()) return;
      if (cameraEntity.getParent().getName() === previousTarget) return;
    }
    for (let targetIndex = 0; targetIndex < this._previousTarget.length; targetIndex++) {
      const previousTarget = this._previousTarget[targetIndex];
      this.resetContextualVisibility(previousTarget);
    }
    this._previousTarget = [];
    this._previousDependencies.clear();
  }
  resetContextualVisibility(contextId) {
    const currentTime = this._sceneManager.main.getEngine().getTime();
    let contextualLayers = this.getContextualLayers(contextId);
    for (; "" !== contextId && 0 === contextualLayers.length;) {
      contextId = SolarSystemSceneExports.Parenting.getParentOfEntity(contextId, currentTime);
      contextualLayers = this.getContextualLayers(contextId);
    }
    let targetId = this._targetId;
    for (contextualLayers = this.getContextualLayers(targetId); "" !== targetId && 0 === contextualLayers.length;) {
      targetId = SolarSystemSceneExports.Parenting.getParentOfEntity(targetId, currentTime);
      contextualLayers = this.getContextualLayers(targetId);
    }
    if (targetId !== contextId) {
      this._contextId = contextId;
      for (let layerIndex = 0; layerIndex < contextualLayers.length; layerIndex++) {
        const layerId = contextualLayers[layerIndex];
        const layer = this.getLayer(layerId);
        if (void 0 !== layer.parent) {
          this.getLayer(layer.parent).visible !== layer.visible && this.toggleLayer(layerId, {
            parentId: contextId,
            group: layer.group
          });
        } else layer.visible !== layer.defaultVisibility && this.toggleLayer(layerId, {
          parentId: contextId,
          group: layer.group
        });
      }
    }
  }
  getTarget() {
    return this._targetId;
  }
  getEntityLayer(entityId) {
    const entityInfo = this._contentManager.getEntityInfo(entityId);
    if (null === entityInfo) return null;
    const category = entityInfo.category;
    const subcategory = entityInfo.subcategory;
    return this.getLayerFromCategory(subcategory) || this.getLayerFromCategory(category);
  }
  getLayerFromCategory(category) {
    if (!category) return null;
    for (const [layerId, layer] of Object.entries(this._layers)) if (layer.categories.includes(category)) return this._layers[layerId];
    return null;
  }
  getLayerFromSatelliteGroup(satelliteGroup) {
    if (!satelliteGroup) return null;
    for (const [layerId, layer] of Object.entries(this._layers)) if (layer.categories.includes(satelliteGroup)) return this._layers[layerId];
    return null;
  }
  getAllContextualLayerOptions() {
    return this._contextualLayersList;
  }
  getContextualLayers(entityId) {
    const contextualLayers = [];
    if ("" === entityId) return contextualLayers;
    const contentManager = this.app.getManager("content");
    const entityInfo = contentManager.getEntityInfo(entityId);
    const moonIds = entityInfo?.hasMoons ? SolarSystemSceneExports.Entity.getEntityNamesInGroup(entityId + ", moons") : new Set();
    const spacecraftIds = SolarSystemSceneExports.Entity.getEntityNamesInGroup(entityId + ", spacecraft");
    "sun" === entityId && false === contextualLayers.includes("heliosphere") && contextualLayers.push("heliosphere");
    moonIds.forEach(moonId => {
      const moonInfo = contentManager.getEntityInfo(moonId);
      if (null !== moonInfo) {
        switch (moonInfo.subcategory || moonInfo.category) {
          case "Major Moon":
            false === contextualLayers.includes("majorMoons") && contextualLayers.push("majorMoons");
            break;
          case "Minor Moon":
            false === contextualLayers.includes("minorMoons") && contextualLayers.push("minorMoons");
        }
      }
    });
    const currentTime = this._app.pioneer.getTime();
    spacecraftIds.forEach(spacecraftId => {
      const spacecraftInfo = contentManager.getEntityInfo(spacecraftId);
      if (null !== spacecraftInfo) {
        switch (spacecraftInfo.subcategory || spacecraftInfo.category) {
          case "Orbiter":
            false === contextualLayers.includes("orbiters") && SolarSystemSceneExports.Parenting.getParentOfEntity(spacecraftId, currentTime) === entityId && contextualLayers.push("orbiters");
            break;
          case "Landing Site":
          case "Lander":
          case "Rover":
            false === contextualLayers.includes("landers") && SolarSystemSceneExports.Parenting.getParentOfEntity(spacecraftId, currentTime) === entityId && contextualLayers.push("landers");
        }
      }
    });
    entityInfo?.constellation && contextualLayers.push("satelliteGroup");
    contextualLayers.sort((leftLayerId, rightLayerId) => {
      const layerOrder = Object.keys(this._layers);
      return layerOrder.indexOf(leftLayerId) - layerOrder.indexOf(rightLayerId);
    });
    return contextualLayers;
  }
  resetContextualLayers(newParentId, oldParentId) {
    const availableLayers = this.getContextualLayers(newParentId);
    this._contextualLayersList.forEach(layerId => {
      false === availableLayers.includes(layerId) && ("heliosphere" === layerId ? this.toggleLayer(layerId, {
        parentId: void 0
      }, this.getLayer(layerId).defaultVisibility || false) : this.toggleLayer(layerId, {
        parentId: oldParentId
      }, this.getLayer(layerId).defaultVisibility || false));
    });
  }
  isEntityVisibleWithCurrentLayers(entityId, options = {}) {
    const {
      satelliteGroup: satelliteGroup,
      allowSublayer: allowSublayer
    } = options ?? {};
    const entityInfo = this._contentManager.getEntityInfo(entityId);
    if (null !== entityInfo) {
      const categoryLayer = this.getLayerFromCategory(entityInfo.category);
      const subcategoryLayer = this.getLayerFromCategory(entityInfo.subcategory);
      const satelliteLayer = this.getLayerFromSatelliteGroup(entityInfo.constellation);
      return null !== satelliteLayer && entityInfo.constellation === satelliteGroup ? satelliteLayer.visible : null !== subcategoryLayer ? !(subcategoryLayer.parent && !this.getLayer(subcategoryLayer.parent)?.visible && !allowSublayer) && subcategoryLayer.visible : null !== categoryLayer ? categoryLayer.visible : null === categoryLayer && null === subcategoryLayer;
    }
    return true;
  }
}
export { LayerManager };
