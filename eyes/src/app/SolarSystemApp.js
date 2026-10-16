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
class SolarSystemApp extends Eyes.BaseApp {
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
  async init() {
    await super.init();
    SolarSystemSceneExports.Entity._entities.get("101955_bennu").radius = .2207;
    PreloadManager.default.hideLoadingScreen();
    PreloadManager.default.updateEmbedLoadPercent(50);
    this.getComponent("menu")?.updateMenuContent();
  }
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
  async setUpScene() {
    await super.setUpScene();
    await this.scene.getLoadedPromise();
  }
  // 标题解析器读取路由参数而不修改路由；故事、子对象、事件及比较对象各有独立的标题优先级。Autoplay 管理器必须等待初始化后才能交给应用使用。
  async setUpManagers() {
    await super.setUpManagers();
    this.addManager("link", SolarSystemPublicApi.LinkManager);
    this.addManager("cameraFollow", Eyes.CameraFollowManager);
    this.addManager("trajectory", SolarSystemPublicApi.TrajectoryManager);
    const contentManager = this.getManager("content");
    contentManager.setStoryList(STORIES.STORY_LIST);
    contentManager.setStories(STORIES.STORIES);
    const entityDatabase = contentManager.getEntityList();
    this.getManager("search").setDatabase(entityDatabase);
    const titleOptions = {
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
        const entityId = spaceObject || spacecraft || planet || star || moon;
        const titleContentManager = this.getManager("content");
        const {
          altName: altName,
          displayName: displayName,
          iauName: iauName
        } = titleContentManager.getEntityInfo(entityId) || {};
        const entityTitle = altName || displayName || iauName;
        const parsedQuery = query ? this.getManager("router").parseQuery(query) : {};
        const isStoryRoute = url.includes("/story");
        if (isStoryRoute) {
          const storyId = isStoryRoute ? params.id : null;
          const {
            stories: stories
          } = titleContentManager.getStoryList();
          const story = stories[storyId];
          const slideNumber = parsedQuery.slide ? parsedQuery.slide.replace("slide_", "") : 1;
          return story?.title && slideNumber ? `${story.title} - Slide ${slideNumber}` : "Story";
        }
        if (!entityTitle) return "Home";
        if ("feature" in params) {
          if ("child" in params) {
            const {
              iauName: childIauName,
              displayName: childDisplayName
            } = titleContentManager.getEntityInfo(params.child) || {};
            const childTitle = childIauName || childDisplayName;
            if (childTitle) return childTitle;
          }
          const featureTitle = params.feature.charAt(0).toUpperCase() + params.feature.slice(1);
          return `${entityTitle}'${entityTitle.endsWith("s") ? "" : "s"} ${featureTitle}`;
        }
        if (url.includes("/telescope")) return `${entityTitle} Telescope Mode`;
        if (url.includes("/events")) {
          const hasEventChild = "child" in params;
          const eventTitle = hasEventChild ? this.getView("event")._eventInfo?.title : null;
          return hasEventChild && eventTitle ? `${entityTitle} - ${eventTitle}` : `${entityTitle}'${entityTitle.endsWith("s") ? "" : "s"} Events`;
        }
        if (url?.includes("/compare") && "id" in parsedQuery) {
          const {
            iauName: compareIauName,
            displayName: compareDisplayName
          } = titleContentManager.getEntityInfo(parsedQuery.id) || {};
          const compareTitle = compareIauName || compareDisplayName;
          if (compareTitle) return `${entityTitle} compared to ${compareTitle}`;
        }
        return entityTitle;
      }
    };
    const TitleManagerClass = SolarSystemPublicApi.Types.get("TitleManager");
    this.addManager("title", TitleManagerClass, titleOptions);
    const autoplayManager = this.addManager("autoplay", SolarSystemPublicApi.Types.get("AutoplayManager"), "https://eyes.nasa.gov/apps/solar-system/autoplay.json");
    await autoplayManager.init();
  }
  // 图层面板负责执行开关操作，保持管理器状态与 NASA 原界面的按钮状态同步；这里只确定启动时的显隐集合。
  async setUpComponents() {
    await super.setUpComponents();
    const layerManager = this.getManager("layer");
    layerManager.getLayer("starfield").toggleCallback[0](true);
    const layerPanelComponent = this.getComponent("layerPanel");
    const visibleLayerNames = ["ui", "planets", "spacecraft", "trails", "labels", "icons"];
    const hiddenLayerNames = ["asteroids", "comets", "dwarfPlanets", "constellations"];
    for (let visibleLayerIndex = 0; visibleLayerIndex < visibleLayerNames.length; visibleLayerIndex++) {
      const layerName = visibleLayerNames[visibleLayerIndex];
      layerManager.getLayer(layerName).visible || layerPanelComponent.toggleLayer(layerName);
    }
    for (let hiddenLayerIndex = 0; hiddenLayerIndex < hiddenLayerNames.length; hiddenLayerIndex++) {
      const layerName = hiddenLayerNames[hiddenLayerIndex];
      layerManager.getLayer(layerName).visible && layerPanelComponent.toggleLayer(layerName);
    }
    this.getComponent("breadcrumb")?.setCrumbClickHandler(crumbRoute => {
      const navigationOptions = {
        keepTime: true,
        __remove: "all"
      };
      this.getManager("router").navigate({}, crumbRoute, navigationOptions);
    });
    const viewportElement = this.pioneer?.getViewport("main-viewport")?.getDiv();
    viewportElement && (viewportElement.style.top = "", viewportElement.style.left = "");
  }
  getVersion() {
    return SolarSystemPublicApi.AppVersion;
  }
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
