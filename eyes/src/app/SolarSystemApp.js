/** @eyes-analysis
 * 文件职责：装配太阳系应用的路由、管理器、组件配置和启动实例
 * 依据：imports: ../framework/eyes/index.js, ../styles/index.js, ./config/components.js, ../data/TimeInfo.json, ../data/SceneInfo.json, ../data/ViewInfo.json, ./config/views.js, ../engine/core/STORIES.js, ../ui/templates/SolarSystemAppTemplate.html, ./public-api.js, ../engine/solar-system/public-api.js, ./PreloadManager.js；manager dependencies: router, content, search, layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:82-3723.
import * as Eyes from "../framework/eyes/index.js";
import "../styles/index.js";
import * as ComponentInfo from "./config/components.js";
import TimeInfo from "../data/TimeInfo.json";
import SceneInfo from "../data/SceneInfo.json";
import ViewInfo from "../data/ViewInfo.json";
import * as ViewClasses from "./config/views.js";
import * as STORIES from "../engine/core/STORIES.js";
import SolarSystemAppTemplate from "../ui/templates/SolarSystemAppTemplate.html";
import * as SolarSystemPublicApi from "./public-api.js";
import * as SolarSystemSceneExports from "../engine/solar-system/public-api.js";
import * as PreloadManager from "./PreloadManager.js";
var getSolarSystemAppTemplate = () => SolarSystemAppTemplate;
/** @eyes-analysis
 * 类职责：装配太阳系应用的路由、管理器、组件配置和启动实例；继承 Eyes.BaseApp
 * 继承：Eyes.BaseApp；导出：SolarSystemApp。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SolarSystemApp extends Eyes.BaseApp {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _timeInfo, _sceneInfo, _viewClasses, _viewInfo, _componentInfo。
   * 状态写入：_componentInfo、_sceneInfo、_timeInfo、_viewClasses、_viewInfo。
   * 调用线索：super。
   */
  constructor() {
    super(SolarSystemPublicApi.Types);
    this._timeInfo = TimeInfo;
    this._sceneInfo = SceneInfo;
    this._viewClasses = {
      ...ViewClasses.default
    };
    this._viewInfo = ViewInfo;
    this._componentInfo = ComponentInfo.default;
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, SolarSystemSceneExports.Entity._entities.get, PreloadManager.default.hideLoadingScreen, PreloadManager.default.updateEmbedLoadPercent, this.getComponent。
   * 调用线索：PreloadManager.default.hideLoadingScreen、PreloadManager.default.updateEmbedLoadPercent、SolarSystemSceneExports.Entity._entities.get、super.init、this.getComponent等。
   */
  async init() {
    await super.init();
    SolarSystemSceneExports.Entity._entities.get("101955_bennu").radius = .2207;
    PreloadManager.default.hideLoadingScreen();
    PreloadManager.default.updateEmbedLoadPercent(50);
    this.getComponent("menu")?.updateMenuContent();
  }
  /** @eyes-analysis
   * 执行 setUpRoutes 对应的组件业务步骤；调用 this.getManager。
   * 调用线索：this.getManager、this.getManager("router").addRoutes。
   */
  setUpRoutes() {
    this.getManager("router").addRoutes([{
      route: this.getManager("router").homeRoute,
      view: "home"
    }, {
      route: "/story/:id",
      view: "story"
    }, {
      route: "/:spaceObject",
      view: "object"
    }, {
      route: "/:spaceObject/compare",
      view: "compare"
    }, {
      route: "/:spaceObject/telescope",
      view: "telescope"
    }, {
      route: "/:spaceObject/distance",
      view: "distance"
    }, {
      route: "/:spaceObject/:feature",
      view: "feature"
    }, {
      route: "/:spaceObject/events/:child",
      view: "event"
    }, {
      route: "/:spaceObject/:feature/:child",
      view: "object"
    }]);
  }
  /** @eyes-analysis
   * 执行 setUpScene 对应的组件业务步骤；调用 super.setUpScene, this.scene.getLoadedPromise。
   * 调用线索：super.setUpScene、this.scene.getLoadedPromise。
   */
  async setUpScene() {
    await super.setUpScene();
    await this.scene.getLoadedPromise();
  }
  /** @eyes-analysis
   * 执行 setUpManagers 对应的组件业务步骤；调用 super.setUpManagers, this.addManager, this.getManager, Manager.setStoryList, Manager.setStories, Manager.getEntityList, this.getView, SolarSystemPublicApi.Types.get。
   * 调用线索：SolarSystemPublicApi.Types.get、_.slide.replace、c.getEntityInfo、c.getStoryList、contentManager.getEntityList等。
   */
  async setUpManagers() {
    await super.setUpManagers();
    this.addManager("link", SolarSystemPublicApi.LinkManager);
    this.addManager("cameraFollow", Eyes.CameraFollowManager);
    this.addManager("trajectory", SolarSystemPublicApi.TrajectoryManager);
    const contentManager = this.getManager("content");
    contentManager.setStoryList(STORIES.STORY_LIST);
    contentManager.setStories(STORIES.STORIES);
    const e = contentManager.getEntityList();
    this.getManager("search").setDatabase(e);
    const i = {
      prefix: "Eyes on the Solar System",
      suffix: "NASA/JPL",
      parseFn: ({
        url: url,
        params: params,
        query: query
      } = {}) => {
        const {
          spaceObject: spaceObject,
          spacecraft: spacecraft,
          planet: planet,
          star: star,
          moon: moon
        } = params;
        const l = spaceObject || spacecraft || planet || star || moon;
        const c = this.getManager("content");
        const {
          altName: altName,
          displayName: displayName,
          iauName: iauName
        } = c.getEntityInfo(l) || {};
        const p = altName || displayName || iauName;
        const _ = query ? this.getManager("router").parseQuery(query) : {};
        const m = url.includes("/story");
        if (m) {
          const t = m ? params.id : null;
          const {
            stories: stories
          } = c.getStoryList();
          const s = stories[t];
          const n = _.slide ? _.slide.replace("slide_", "") : 1;
          return s?.title && n ? `${s.title} - Slide ${n}` : "Story";
        }
        if (!p) return "Home";
        if ("feature" in params) {
          if ("child" in params) {
            const {
              iauName: t,
              displayName: i
            } = c.getEntityInfo(params.child) || {};
            const s = t || i;
            if (s) return s;
          }
          const t = params.feature.charAt(0).toUpperCase() + params.feature.slice(1);
          return `${p}'${p.endsWith("s") ? "" : "s"} ${t}`;
        }
        if (url.includes("/telescope")) return `${p} Telescope Mode`;
        if (url.includes("/events")) {
          const t = "child" in params;
          const i = t ? this.getView("event")._eventInfo?.title : null;
          return t && i ? `${p} - ${i}` : `${p}'${p.endsWith("s") ? "" : "s"} Events`;
        }
        if (url?.includes("/compare") && "id" in _) {
          const {
            iauName: t,
            displayName: e
          } = c.getEntityInfo(_.id) || {};
          const i = t || e;
          if (i) return `${p} compared to ${i}`;
        }
        return p;
      }
    };
    const n = SolarSystemPublicApi.Types.get("TitleManager");
    this.addManager("title", n, i);
    const o = this.addManager("autoplay", SolarSystemPublicApi.Types.get("AutoplayManager"), "https://eyes.nasa.gov/apps/solar-system/autoplay.json");
    await o.init();
  }
  /** @eyes-analysis
   * 执行 setUpComponents 对应的组件业务步骤；调用 super.setUpComponents, this.getManager, Manager.getLayer, this.getComponent, PanelComponent.toggleLayer。
   * 调用线索：layerManager.getLayer、layerManager.getLayer("starfield").toggleCallback[0]、layerPanelComponent.toggleLayer、super.setUpComponents、this.getComponent等。
   */
  async setUpComponents() {
    await super.setUpComponents();
    const layerManager = this.getManager("layer");
    layerManager.getLayer("starfield").toggleCallback[0](true);
    const layerPanelComponent = this.getComponent("layerPanel");
    const i = ["ui", "planets", "spacecraft", "trails", "labels", "icons"];
    const s = ["asteroids", "comets", "dwarfPlanets", "constellations"];
    for (let s = 0; s < i.length; s++) {
      const n = i[s];
      layerManager.getLayer(n).visible || layerPanelComponent.toggleLayer(n);
    }
    for (let i = 0; i < s.length; i++) {
      const n = s[i];
      layerManager.getLayer(n).visible && layerPanelComponent.toggleLayer(n);
    }
    this.getComponent("breadcrumb")?.setCrumbClickHandler(t => {
      const e = {
        keepTime: true,
        __remove: "all"
      };
      this.getManager("router").navigate({}, t, e);
    });
    const n = this.pioneer?.getViewport("main-viewport")?.getDiv();
    n && (n.style.top = "", n.style.left = "");
  }
  /** @eyes-analysis
   * 执行 getVersion 对应的组件业务步骤。
   */
  getVersion() {
    return SolarSystemPublicApi.AppVersion;
  }
  /** @eyes-analysis
   * 执行 getVersions 对应的组件业务步骤；调用 this.getPioneerVersion, this.getEyesVersion, this.getVersion。
   * 调用线索：this.getEyesVersion、this.getPioneerVersion、this.getVersion。
   */
  getVersions() {
    return {
      pioneer: this.getPioneerVersion(),
      eyes: this.getEyesVersion(),
      app: this.getVersion()
    };
  }
}
SolarSystemApp.html = getSolarSystemAppTemplate();
SolarSystemApp.setAppClass();
export { SolarSystemApp };
