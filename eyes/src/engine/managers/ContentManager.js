/** @eyes-analysis
 * 文件职责：读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。
 * 依据：import ../../vendor/modules/FollowName.cjs；import ../pioneer/index.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1214240-1220243.
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
/** @eyes-analysis
 * 类职责：读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。
 * 继承：EyesPublicApi.BaseManager；导出：ContentManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ContentManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_categoryShapeMap`、`_context`、`_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_context.story`、`_entitiesByCategory`、`_entitiesBySubCategory`；调用 `super`。
   * 状态写入：_categoryShapeMap、_context、_context.eventDesc、_context.events、_context.orderedEvents、_context.story、_entitiesByCategory、_entitiesBySubCategory等；完整记录见索引。
   * 调用线索：super。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityList`。
   */
  getEntityList() {
    return this._entityList;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_entitiesByCategory[category]`、`_entitiesBySubCategory[subcategory]`、`_entityList`；调用 `Object.entries`、`Object.keys`、`Object.keys(this._entityList).forEach`、`this._entitiesByCategory[category].push`、`this._entitiesBySubCategory[subcategory].push`。
   * 状态写入：_entitiesByCategory[category]、_entitiesBySubCategory[subcategory]、_entityList。
   * 调用线索：Object.entries、Object.keys、Object.keys(this._entityList).forEach、this._entitiesByCategory[category].push、this._entitiesBySubCategory[subcategory].push。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `t in this._entityList?this._entityList[t]:null`。
   */
  getEntityInfo(t) {
    return t in this._entityList ? this._entityList[t] : null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `EyesPublicApi.AppUtils.loadJSON`。
   * 调用线索：EyesPublicApi.AppUtils.loadJSON。
   */
  async getEntityDesc(t) {
    let e = null;
    try {
      e = await EyesPublicApi.AppUtils.loadJSON(this._folders.description + t + ".json");
    } catch (t) {
      e = null;
    }
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_folders[e]`；调用 `EyesPublicApi.AppUtils.addEndToPath`、`Object.prototype.hasOwnProperty.call`。
   * 状态写入：_folders[e]。
   * 调用线索：EyesPublicApi.AppUtils.addEndToPath、Object.prototype.hasOwnProperty.call。
   */
  setFolders(t = {}) {
    for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && (t[e] = EyesPublicApi.AppUtils.addEndToPath(t[e]), this._folders[e] = t[e]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._storyList`。
   */
  getStoryList() {
    return this._storyList;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_storyList`。
   * 状态写入：_storyList。
   */
  setStoryList(storyList) {
    this._storyList = storyList;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_context.story`；返回 `this._context.story`；调用 `new Error`；含显式错误分支。
   * 状态写入：_context.story。
   * 调用线索：new Error。
   */
  getStory(t) {
    if (!t) throw new Error("[ContentManager.getStory]: id is required.");
    if (!this._stories[t]) throw new Error(`[ContentManager.getStory]: Cannot find story with id ${t}.`);
    this._context.story = this._stories[t];
    return this._context.story;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_stories`。
   * 状态写入：_stories。
   */
  setStories(stories) {
    this._stories = stories;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_context[s]`；返回 `void`；调用 `this.getEntityDesc`。
   * 状态写入：_context[s]。
   * 调用线索：this.getEntityDesc。
   */
  async loadDescriptions(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      const n = await this.getEntityDesc(s);
      if (e && e.isCanceled) return;
      this._context[s] = n;
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_target`；返回 `void`；调用 `EyesPublicApi.AppUtils.addEndToPath`、`EyesPublicApi.AppUtils.isEmptyObject`、`EyesPublicApi.AppUtils.loadJSON`、`Object.entries`、`console.error`、`e.push`。
   * 状态写入：_context.eventDesc、_context.events、_context.orderedEvents、_target。
   * 调用线索：EyesPublicApi.AppUtils.addEndToPath、EyesPublicApi.AppUtils.isEmptyObject、EyesPublicApi.AppUtils.loadJSON、Object.entries、console.error等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityShperoidLayersList[t]`。
   */
  getSpheroidLayers(t) {
    return this._entityShperoidLayersList[t];
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_entityShperoidLayersList`。
   * 状态写入：_entityShperoidLayersList。
   */
  setSpheroidLayers(entityShperoidLayersList) {
    this._entityShperoidLayersList = entityShperoidLayersList;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{id:"default",title:"Default Texture",type:"texture",features:e,textures:i}`；调用 `s.getTextureSizes`、`s.getTextureUrl`、`s.getTextureUrl(t).replace`、`this.app.pioneer.getScene`、`this.app.pioneer.getScene("main").getEntity`、`this.app.pioneer.getScene("main").getEntity(t).getComponent`。
   * 调用线索：s.getTextureSizes、s.getTextureUrl、s.getTextureUrl(t).replace、s?.getTextureNames、s?.getTextureNames().forEach等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._entityShperoidFeaturesList[t]||[]`。
   */
  getSpheroidFeatures(t) {
    return this._entityShperoidFeaturesList[t] || [];
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_entityShperoidFeaturesList`。
   * 状态写入：_entityShperoidFeaturesList。
   */
  setSpheroidFeatures(entityShperoidFeaturesList) {
    this._entityShperoidFeaturesList = entityShperoidFeaturesList;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `sceneManager.getParent`、`this._app.getManager`。
   * 调用线索：sceneManager.getParent、this._app.getManager。
   */
  getSpheroidId(t) {
    const sceneManager = this._app.getManager("scene");
    let i = t.id;
    if ("Spacecraft" === t.category) i = sceneManager.getParent(i) || i;else if ("Instrument" === t.category) {
      const t = sceneManager.getParent(i);
      i = sceneManager.getParent(t) || t || i;
    }
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._categoryShapeMap`。
   */
  getCategoryShapeMap() {
    return this._categoryShapeMap;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `this.getEntityInfo`。
   * 调用线索：this.getEntityInfo。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `!!this._app.getManager("time").getTime().isSameOrAfter(e)`；调用 `["Lander","Rover"].indexOf`、`this._app.getManager`、`this._app.getManager("time").getTime`、`this._app.getManager("time").getTime().isSameOrAfter`、`this._app.getManager("time").parseTime`。
   * 调用线索：["Lander","Rover"].indexOf、this._app.getManager、this._app.getManager("time").getTime、this._app.getManager("time").getTime().isSameOrAfter、this._app.getManager("time").parseTime。
   */
  hasLanded(t) {
    if (!t) return false;
    if (!t.landingDate || "" === t.landingDate) return false;
    if (["Lander", "Rover"].indexOf(t.subcategory) < 0) return false;
    const e = this._app.getManager("time").parseTime(t.landingDate);
    return !!this._app.getManager("time").getTime().isSameOrAfter(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `!!e&&e.category.toLowerCase().includes("landing site")`；调用 `e.category.toLowerCase`、`e.category.toLowerCase().includes`、`this.getEntityInfo`。
   * 调用线索：e.category.toLowerCase、e.category.toLowerCase().includes、this.getEntityInfo。
   */
  isLandingSite(t) {
    const e = this.getEntityInfo(t);
    return !!e && e.category.toLowerCase().includes("landing site");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `e.toLowerCase`、`e.toLowerCase().replace`、`i.category.toLowerCase`、`i.category.toLowerCase().replace`、`s.match`、`this.getEntityInfo`。
   * 调用线索：e.toLowerCase、e.toLowerCase().replace、i.category.toLowerCase、i.category.toLowerCase().replace、s.match等。
   */
  getClassName(t, e) {
    const i = this.getEntityInfo(t);
    let s = t;
    if (e) s += " " + e.toLowerCase().replace(/ /g, "-");else if (null !== i && void 0 !== i.category) {
      s += " " + i.category.toLowerCase().replace(/ /g, "-");
    }
    s.match(/^\d/) && (s = "_" + s);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.getEntityInfo(t).keywords.includes(e)`；调用 `this.getEntityInfo`、`this.getEntityInfo(t).keywords.includes`。
   * 调用线索：this.getEntityInfo、this.getEntityInfo(t).keywords.includes。
   */
  hasKeyword(t, e) {
    if (void 0 !== this.getEntityInfo(t)) return this.getEntityInfo(t).keywords.includes(e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_context`、`_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_context.story`。
   * 状态写入：_context、_context.eventDesc、_context.events、_context.orderedEvents、_context.story。
   */
  resetContext() {
    this._context = {};
    this._context.events = {};
    this._context.eventDesc = {};
    this._context.orderedEvents = {};
    this._context.story = {};
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g,"$2")`。
   * 调用线索：t?.replaceAll。
   */
  hideExternalLinksInText(t) {
    return t?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g, "$2");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`Object.entries`、`Object.keys`、`Object.keys(n).filter`、`i.includes`、`n.filter`。
   * 调用线索：Array.isArray、Object.entries、Object.keys、Object.keys(n).filter、i.includes等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `console.error`、`this.app.getManager`；含显式错误分支。
   * 调用线索：console.error、this.app.getManager。
   */
  _handleError(t, e = "") {
    console.error(e + t);
    let i = this.app.getManager("router").previousRoute.url;
    throw i || (i = this.app.getManager("router").homeRoute), t.previousRoute = i, t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entitiesByCategory`。
   */
  get entitiesByCategory() {
    return this._entitiesByCategory;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._entitiesBySubCategory`。
   */
  get entitiesBySubCategory() {
    return this._entitiesBySubCategory;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._context`。
   */
  get context() {
    return this._context;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._context.events`。
   */
  get events() {
    return this._context.events;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._context.orderedEvents`。
   */
  get orderedEvents() {
    return this._context.orderedEvents;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._context.eventDesc`。
   */
  get eventDesc() {
    return this._context.eventDesc;
  }
}
export { ContentManager };
