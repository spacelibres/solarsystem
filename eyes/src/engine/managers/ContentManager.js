// Recovered from app.js:1214240-1220243.
/* 目录、故事定义和当前路由 context 分开保存；loadDescriptions/loadEvents 在 await 后检查取消才写入 context。事件日期会原地转为 Moment，setEntityList 会删除 disabled 条目并建立分类索引；调用方若需独立所有权须自行复制。 */
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class ContentManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._entityList = null;
    this._entitiesByCategory = {};
    this._entitiesBySubCategory = {};
    this._stories = {};
    this._storyList = null;
    this._target = null;
    this._context = {};
    this._context.events = {};
    this._context.orderedEvents = {};
    this._context.eventDesc = {};
    this._context.story = {};
    this._folders = {
      description: "/",
      event: "/",
      stories: "/"
    };
    this._categoryShapeMap = {
      Planet: {
        shape: "circle",
        color: "blue"
      },
      Moon: {
        shape: "crescent",
        color: ""
      },
      Asteroid: {
        shape: "circle",
        color: "brown"
      },
      Star: {
        shape: "circle",
        color: "yellow"
      },
      Spacecraft: {
        shape: "hexagon",
        color: "gray"
      }
    };
  }
  getEntityList() {
    return this._entityList;
  }
  setEntityList(entityList) {
    for (const [entityId, entityInfo] of Object.entries(entityList)) true === entityInfo.disabled && delete entityList[entityId];
    this._entityList = entityList;
    Object.keys(this._entityList).forEach(entityId => {
      const {
        category: category
      } = this._entityList[entityId];
      this._entitiesByCategory[category] ? this._entitiesByCategory[category].push(this._entityList[entityId]) : this._entitiesByCategory[category] = [this._entityList[entityId]];
      let {
        subcategory: subcategory
      } = this._entityList[entityId];
      subcategory && "" !== subcategory || (subcategory = category);
      this._entitiesBySubCategory[subcategory] ? this._entitiesBySubCategory[subcategory].push(this._entityList[entityId]) : this._entitiesBySubCategory[subcategory] = [this._entityList[entityId]];
    });
  }
  getEntityInfo(entityId) {
    return entityId in this._entityList ? this._entityList[entityId] : null;
  }
  async getEntityDesc(entityId) {
    let description = null;
    try {
      description = await EyesPublicApi.AppUtils.loadJSON(this._folders.description + entityId + ".json");
    } catch (descriptionError) {
      description = null;
    }
    return description;
  }
  setFolders(folders = {}) {
    for (const folderName in folders) Object.prototype.hasOwnProperty.call(folders, folderName) && (folders[folderName] = EyesPublicApi.AppUtils.addEndToPath(folders[folderName]), this._folders[folderName] = folders[folderName]);
  }
  getStoryList() {
    return this._storyList;
  }
  setStoryList(storyList) {
    this._storyList = storyList;
  }
  getStory(storyId) {
    if (!storyId) throw new Error("[ContentManager.getStory]: id is required.");
    if (!this._stories[storyId]) throw new Error(`[ContentManager.getStory]: Cannot find story with id ${storyId}.`);
    this._context.story = this._stories[storyId];
    return this._context.story;
  }
  setStories(stories) {
    this._stories = stories;
  }
  async loadDescriptions(entityIds, cancelToken) {
    for (let entityIndex = 0; entityIndex < entityIds.length; entityIndex++) {
      const entityId = entityIds[entityIndex];
      const description = await this.getEntityDesc(entityId);
      if (cancelToken && cancelToken.isCanceled) return;
      this._context[entityId] = description;
    }
  }
  async loadEvents(target, eventFiles = {}, cancelToken) {
    if (!target) return;
    const eventFolder = EyesPublicApi.AppUtils.addEndToPath(this._folders.event + target);
    if (eventFiles.all && (this._target !== target || EyesPublicApi.AppUtils.isEmptyObject(this._context.events))) {
      let eventsById = null;
      try {
        eventsById = await EyesPublicApi.AppUtils.loadJSON(eventFolder + eventFiles.all);
      } catch (eventsError) {
        eventsById = null;
      }
      if (cancelToken && cancelToken.isCanceled) return;
      if (this._context.events = eventsById, null !== this._context.events) {
        const orderedEvents = [];
        for (const [eventId, eventInfo] of Object.entries(this._context.events)) eventInfo.start ? (eventInfo.start = getFollowName().tz(eventInfo.start, "Etc/UTC"), eventInfo.end && (eventInfo.end = getFollowName().tz(eventInfo.end, "Etc/UTC")), orderedEvents.push(eventInfo)) : console.error("[Content Manager] Error: event missing start date " + target + " " + eventId);
        orderedEvents.sort((leftEvent, rightEvent) => leftEvent.start.valueOf() - rightEvent.start.valueOf());
        this._context.orderedEvents = orderedEvents;
      } else this._context.orderedEvents = null;
    }
    if (eventFiles.event) {
      const eventInfo = this._context.events[eventFiles.event];
      const descriptionName = eventInfo && eventInfo.template ? eventInfo.template : eventFiles.event;
      let eventDescription = null;
      try {
        eventDescription = await EyesPublicApi.AppUtils.loadJSON(eventFolder + descriptionName);
      } catch (descriptionError) {
        eventDescription = null;
      }
      if (cancelToken && cancelToken.isCanceled) return;
      this._context.eventDesc = eventDescription;
    }
    this._target = target;
  }
  getSpheroidLayers(entityId) {
    return this._entityShperoidLayersList[entityId];
  }
  setSpheroidLayers(entityShperoidLayersList) {
    this._entityShperoidLayersList = entityShperoidLayersList;
  }
  getSpheroidDefaultTextureInformation(entityId, preservedFeatures = []) {
    const textures = {};
    const lodComponent = this.app.pioneer.getScene("main").getEntity(entityId).getComponent(Pioneer.SpheroidLODComponent);
    lodComponent?.getTextureNames().forEach(textureRole => {
      textures[textureRole] = {
        url: lodComponent.getTextureUrl(textureRole).replace("$STATIC_ASSETS_URL/maps/", ""),
        sizes: lodComponent.getTextureSizes(textureRole)
      };
    });
    return {
      id: "default",
      title: "Default Texture",
      type: "texture",
      features: preservedFeatures,
      textures: textures
    };
  }
  getSpheroidFeatures(entityId) {
    return this._entityShperoidFeaturesList[entityId] || [];
  }
  setSpheroidFeatures(entityShperoidFeaturesList) {
    this._entityShperoidFeaturesList = entityShperoidFeaturesList;
  }
  getSpheroidId(entityInfo) {
    const sceneManager = this._app.getManager("scene");
    let spheroidId = entityInfo.id;
    if ("Spacecraft" === entityInfo.category) spheroidId = sceneManager.getParent(spheroidId) || spheroidId;else if ("Instrument" === entityInfo.category) {
      const parentEntityId = sceneManager.getParent(spheroidId);
      spheroidId = sceneManager.getParent(parentEntityId) || parentEntityId || spheroidId;
    }
    return spheroidId;
  }
  getCategoryShapeMap() {
    return this._categoryShapeMap;
  }
  getColorClass(entityId) {
    let colorClass = "";
    if (!this.getEntityInfo(entityId)) return colorClass;
    switch (this.getEntityInfo(entityId).category) {
      case "Asteroid":
        colorClass = "asteroid";
        break;
      case "Instrument":
      case "Spacecraft":
        colorClass = "spacecraft";
        break;
      case "Planet":
        colorClass = entityId;
        break;
      case "Dwarf Planet":
        colorClass = "dwarf-planet";
        break;
      case "Comet":
        colorClass = "comet";
        break;
      case "Barycenter":
      case "Moon":
        colorClass = "moon";
        break;
      case "Universe":
      case "Galaxy":
      case "Star":
        colorClass = "sun";
        break;
      default:
        colorClass = "";
    }
    return colorClass;
  }
  hasLanded(entityInfo) {
    if (!entityInfo) return false;
    if (!entityInfo.landingDate || "" === entityInfo.landingDate) return false;
    if (["Lander", "Rover"].indexOf(entityInfo.subcategory) < 0) return false;
    const landingTime = this._app.getManager("time").parseTime(entityInfo.landingDate);
    return !!this._app.getManager("time").getTime().isSameOrAfter(landingTime);
  }
  isLandingSite(entityId) {
    const entityInfo = this.getEntityInfo(entityId);
    return !!entityInfo && entityInfo.category.toLowerCase().includes("landing site");
  }
  getClassName(entityId, categoryName) {
    const entityInfo = this.getEntityInfo(entityId);
    let className = entityId;
    if (categoryName) className += " " + categoryName.toLowerCase().replace(/ /g, "-");else if (null !== entityInfo && void 0 !== entityInfo.category) {
      className += " " + entityInfo.category.toLowerCase().replace(/ /g, "-");
    }
    className.match(/^\d/) && (className = "_" + className);
    return className;
  }
  hasKeyword(entityId, keyword) {
    if (void 0 !== this.getEntityInfo(entityId)) return this.getEntityInfo(entityId).keywords.includes(keyword);
  }
  resetContext() {
    this._context = {};
    this._context.events = {};
    this._context.eventDesc = {};
    this._context.orderedEvents = {};
    this._context.story = {};
  }
  hideExternalLinksInText(text) {
    return text?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g, "$2");
  }
  hideExternalLinkStoryList() {
    const storyCatalog = this.getStoryList();
    const filteredCatalog = {};
    const externalIds = storyCatalog.external ? Object.keys(storyCatalog.external) : [];
    for (const [sectionName, sectionEntries] of Object.entries(storyCatalog)) if ("external" !== sectionName) {
      filteredCatalog[sectionName] = sectionEntries;
      if (Array.isArray(sectionEntries)) {
        const retainedIds = sectionEntries.filter(storyId => !externalIds.includes(storyId));
        retainedIds.length > 0 && (filteredCatalog[sectionName] = retainedIds);
      } else {
        const removedIds = Object.keys(sectionEntries).filter(storyId => externalIds.includes(storyId));
        for (let entryIndex = 0; entryIndex < removedIds.length; entryIndex++) delete sectionEntries[removedIds[entryIndex]];
      }
    }
    this.setStoryList(filteredCatalog);
  }
  _handleError(error, messagePrefix = "") {
    console.error(messagePrefix + error);
    let previousRouteUrl = this.app.getManager("router").previousRoute.url;
    throw previousRouteUrl || (previousRouteUrl = this.app.getManager("router").homeRoute), error.previousRoute = previousRouteUrl, error;
  }
  get entitiesByCategory() {
    return this._entitiesByCategory;
  }
  get entitiesBySubCategory() {
    return this._entitiesBySubCategory;
  }
  get context() {
    return this._context;
  }
  get events() {
    return this._context.events;
  }
  get orderedEvents() {
    return this._context.orderedEvents;
  }
  get eventDesc() {
    return this._context.eventDesc;
  }
}
export { ContentManager };
