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
