// Recovered from app.js:1214240-1220243.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class ContentManager extends EyesPublicApi.BaseManager {
  constructor(t) {
    super(t);
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
    for (const [e, i] of Object.entries(entityList)) true === i.disabled && delete entityList[e];
    this._entityList = entityList;
    Object.keys(this._entityList).forEach(t => {
      const {
        category: category
      } = this._entityList[t];
      this._entitiesByCategory[category] ? this._entitiesByCategory[category].push(this._entityList[t]) : this._entitiesByCategory[category] = [this._entityList[t]];
      let {
        subcategory: subcategory
      } = this._entityList[t];
      subcategory && "" !== subcategory || (subcategory = category);
      this._entitiesBySubCategory[subcategory] ? this._entitiesBySubCategory[subcategory].push(this._entityList[t]) : this._entitiesBySubCategory[subcategory] = [this._entityList[t]];
    });
  }
  getEntityInfo(t) {
    return t in this._entityList ? this._entityList[t] : null;
  }
  async getEntityDesc(t) {
    let e = null;
    try {
      e = await EyesPublicApi.AppUtils.loadJSON(this._folders.description + t + ".json");
    } catch (t) {
      e = null;
    }
    return e;
  }
  setFolders(t = {}) {
    for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && (t[e] = EyesPublicApi.AppUtils.addEndToPath(t[e]), this._folders[e] = t[e]);
  }
  getStoryList() {
    return this._storyList;
  }
  setStoryList(storyList) {
    this._storyList = storyList;
  }
  getStory(t) {
    if (!t) throw new Error("[ContentManager.getStory]: id is required.");
    if (!this._stories[t]) throw new Error(`[ContentManager.getStory]: Cannot find story with id ${t}.`);
    this._context.story = this._stories[t];
    return this._context.story;
  }
  setStories(stories) {
    this._stories = stories;
  }
  async loadDescriptions(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      const n = await this.getEntityDesc(s);
      if (e && e.isCanceled) return;
      this._context[s] = n;
    }
  }
  async loadEvents(target, e = {}, i) {
    if (!target) return;
    const s = EyesPublicApi.AppUtils.addEndToPath(this._folders.event + target);
    if (e.all && (this._target !== target || EyesPublicApi.AppUtils.isEmptyObject(this._context.events))) {
      let o = null;
      try {
        o = await EyesPublicApi.AppUtils.loadJSON(s + e.all);
      } catch (t) {
        o = null;
      }
      if (i && i.isCanceled) return;
      if (this._context.events = o, null !== this._context.events) {
        const e = [];
        for (const [i, s] of Object.entries(this._context.events)) s.start ? (s.start = getFollowName().tz(s.start, "Etc/UTC"), s.end && (s.end = getFollowName().tz(s.end, "Etc/UTC")), e.push(s)) : console.error("[Content Manager] Error: event missing start date " + target + " " + i);
        e.sort((t, e) => t.start.valueOf() - e.start.valueOf());
        this._context.orderedEvents = e;
      } else this._context.orderedEvents = null;
    }
    if (e.event) {
      const t = this._context.events[e.event];
      const n = t && t.template ? t.template : e.event;
      let o = null;
      try {
        o = await EyesPublicApi.AppUtils.loadJSON(s + n);
      } catch (t) {
        o = null;
      }
      if (i && i.isCanceled) return;
      this._context.eventDesc = o;
    }
    this._target = target;
  }
  getSpheroidLayers(t) {
    return this._entityShperoidLayersList[t];
  }
  setSpheroidLayers(entityShperoidLayersList) {
    this._entityShperoidLayersList = entityShperoidLayersList;
  }
  getSpheroidDefaultTextureInformation(t, e = []) {
    const i = {};
    const s = this.app.pioneer.getScene("main").getEntity(t).getComponent(Pioneer.SpheroidLODComponent);
    s?.getTextureNames().forEach(t => {
      i[t] = {
        url: s.getTextureUrl(t).replace("$STATIC_ASSETS_URL/maps/", ""),
        sizes: s.getTextureSizes(t)
      };
    });
    return {
      id: "default",
      title: "Default Texture",
      type: "texture",
      features: e,
      textures: i
    };
  }
  getSpheroidFeatures(t) {
    return this._entityShperoidFeaturesList[t] || [];
  }
  setSpheroidFeatures(entityShperoidFeaturesList) {
    this._entityShperoidFeaturesList = entityShperoidFeaturesList;
  }
  getSpheroidId(t) {
    const sceneManager = this._app.getManager("scene");
    let i = t.id;
    if ("Spacecraft" === t.category) i = sceneManager.getParent(i) || i;else if ("Instrument" === t.category) {
      const t = sceneManager.getParent(i);
      i = sceneManager.getParent(t) || t || i;
    }
    return i;
  }
  getCategoryShapeMap() {
    return this._categoryShapeMap;
  }
  getColorClass(t) {
    let e = "";
    if (!this.getEntityInfo(t)) return e;
    switch (this.getEntityInfo(t).category) {
      case "Asteroid":
        e = "asteroid";
        break;
      case "Instrument":
      case "Spacecraft":
        e = "spacecraft";
        break;
      case "Planet":
        e = t;
        break;
      case "Dwarf Planet":
        e = "dwarf-planet";
        break;
      case "Comet":
        e = "comet";
        break;
      case "Barycenter":
      case "Moon":
        e = "moon";
        break;
      case "Universe":
      case "Galaxy":
      case "Star":
        e = "sun";
        break;
      default:
        e = "";
    }
    return e;
  }
  hasLanded(t) {
    if (!t) return false;
    if (!t.landingDate || "" === t.landingDate) return false;
    if (["Lander", "Rover"].indexOf(t.subcategory) < 0) return false;
    const e = this._app.getManager("time").parseTime(t.landingDate);
    return !!this._app.getManager("time").getTime().isSameOrAfter(e);
  }
  isLandingSite(t) {
    const e = this.getEntityInfo(t);
    return !!e && e.category.toLowerCase().includes("landing site");
  }
  getClassName(t, e) {
    const i = this.getEntityInfo(t);
    let s = t;
    if (e) s += " " + e.toLowerCase().replace(/ /g, "-");else if (null !== i && void 0 !== i.category) {
      s += " " + i.category.toLowerCase().replace(/ /g, "-");
    }
    s.match(/^\d/) && (s = "_" + s);
    return s;
  }
  hasKeyword(t, e) {
    if (void 0 !== this.getEntityInfo(t)) return this.getEntityInfo(t).keywords.includes(e);
  }
  resetContext() {
    this._context = {};
    this._context.events = {};
    this._context.eventDesc = {};
    this._context.orderedEvents = {};
    this._context.story = {};
  }
  hideExternalLinksInText(t) {
    return t?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g, "$2");
  }
  hideExternalLinkStoryList() {
    const t = this.getStoryList();
    const e = {};
    const i = t.external ? Object.keys(t.external) : [];
    for (const [s, n] of Object.entries(t)) if ("external" !== s) {
      e[s] = n;
      if (Array.isArray(n)) {
        const t = n.filter(t => !i.includes(t));
        t.length > 0 && (e[s] = t);
      } else {
        const t = Object.keys(n).filter(t => i.includes(t));
        for (let e = 0; e < t.length; e++) delete n[t[e]];
      }
    }
    this.setStoryList(e);
  }
  _handleError(t, e = "") {
    console.error(e + t);
    let i = this.app.getManager("router").previousRoute.url;
    throw i || (i = this.app.getManager("router").homeRoute), t.previousRoute = i, t;
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
