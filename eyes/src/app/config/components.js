/** @eyes-analysis
 * 文件职责：组件名称、类型、实例选项及 postCreationFunction 配置
 * 依据：imports: ../../framework/eyes/index.js, ./settings.js；manager dependencies: cameraFollow
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1350654-1354281.
import * as Eyes from "../../framework/eyes/index.js";
import * as SettingsOptions from "./settings.js";
let defaultExport;
defaultExport = [{
  type: "Breadcrumb",
  name: "breadcrumb",
  options: {
    params: {
      title: "Eyes on the Solar System"
    }
  }
}, {
  type: "Clock",
  name: "clock",
  hasPlaceholder: false
}, {
  type: "Clock",
  name: "storyClock",
  hasPlaceholder: true
}, {
  type: "Clock",
  name: "kioskSessionClock",
  hasPlaceholder: false,
  options: {
    allowEdit: false,
    isDateVisible: false,
    isMeridiemVisible: false,
    isKioskSessionTimer: true
  }
}, {
  type: "Clock",
  name: "eventsReplayClock",
  hasPlaceholder: false,
  options: {
    allowEdit: false,
    isDateVisible: false,
    isTimeVisible: true,
    isMeridiemVisible: true
  }
}, {
  type: "ClockShortcut",
  name: "clockShortcut"
}, {
  type: "CollapsibleMenu",
  name: "collapsibleMenu"
}, {
  type: "Settings",
  name: "settings"
}, {
  type: "ContentPanel",
  name: "contentPanel"
}, {
  type: "MobileExpandButton",
  name: "mobileExpandButton"
}, {
  type: "TimeControls",
  name: "timeControls",
  hasPlaceholder: false
}, {
  type: "EventsTimeline",
  name: "eventsTimeline",
  hasPlaceholder: false
}, {
  type: "Telescope",
  name: "telescope"
}, {
  type: "Story",
  name: "story"
}, {
  type: "KioskMode",
  name: "kioskMode"
}, {
  type: "LayerPanel",
  name: "layerPanel",
  options: {
    layers: [["ui"], ["planets", "asteroids", "comets", "dwarfPlanets", "constellations"], ["spacecraft"], ["trails", "orbits", "labels", "icons"]]
  }
}, {
  type: "ShareModal",
  name: "shareModal",
  options: {
    config: {
      shareBtnParent: {
        selector: ".main-menu .menu-content",
        wideSelector: "nav.top-right-nav",
        threshold: 1025
      },
      linkAltText: "Eyes on the Solar System - Home",
      linkImageSrc: "https://eyes.nasa.gov/apps/solar-system/og_img.jpg",
      controls: SettingsOptions.default
    },
    paramsToKeep: ["to", "x", "y", "z", "id"]
  }
}, {
  type: "InfoPanel",
  name: "infoPanel",
  hasPlaceholder: false
}, {
  type: "DistancePanel",
  name: "distancePanel",
  hasPlaceholder: true
}, {
  type: "Comparison",
  name: "comparison",
  postCreationFunction: (t, e) => {
    t.getComponent("settings")?.registerCallback("unitchange", e.unitchange);
  }
}, {
  type: "Search",
  name: "searchDesktop",
  options: {
    config: {
      stopOnExactMatch: true,
      searchType: "desktop"
    }
  },
  postCreationFunction: (t, e) => {
    e.onResize = () => {
      Eyes.AppUtils.isMobileMode() ? e.hide() : e.show();
    };
  }
}, {
  type: "Search",
  name: "searchMobile",
  hasPlaceholder: false,
  options: {
    alwaysOpen: true,
    magClass: "mag-close",
    searchClass: "search-open",
    config: {
      stopOnExactMatch: true,
      searchType: "mobile"
    }
  },
  postCreationFunction: (t, e) => {
    e.onResize = () => {
      Eyes.AppUtils.isMobileMode() ? e.show() : e.hide();
    };
  }
}, {
  type: "Search",
  name: "distanceSourceSearch",
  hasPlaceholder: false,
  options: {
    alwaysOpen: true,
    magClass: "mag-close",
    searchClass: "search-open",
    config: {
      stopOnExactMatch: true,
      allowDetail: false,
      searchType: "distanceSource",
      maxEntries: 8,
      onSearchFocus: t => {
        t.eraseInput();
        t.app.getComponent("distancePanel")?.setIsSearching?.(true);
      },
      onReset: t => {
        const {
          defaultText: defaultText
        } = t._config;
        const {
          input: input
        } = t._children;
        defaultText && (input.value = defaultText);
        t.app.getComponent("distancePanel")?.setIsSearching?.(false);
      }
    }
  }
}, {
  type: "Search",
  name: "distanceTargetSearch",
  hasPlaceholder: false,
  options: {
    alwaysOpen: true,
    magClass: "mag-close",
    searchClass: "search-open",
    config: {
      stopOnExactMatch: true,
      allowDetail: false,
      searchType: "distanceTarget",
      maxEntries: 6,
      onSearchFocus: t => {
        t.eraseInput();
        t.app.getComponent("distancePanel")?.setIsSearching?.(true);
      },
      onReset: t => {
        const {
          defaultText: defaultText
        } = t._config;
        const {
          input: input
        } = t._children;
        defaultText && (input.value = defaultText);
        t.app.getComponent("distancePanel")?.setIsSearching?.(false);
      }
    }
  }
}, {
  type: "Search",
  name: "cameraFollowSearch",
  hasPlaceholder: false,
  options: {
    alwaysOpen: true,
    magClass: "mag-close",
    searchClass: "search-open",
    config: {
      maxSuggestions: 5,
      stopOnExactMatch: false,
      allowFeatured: true,
      allowDetail: false,
      allowInfo: true,
      searchType: "cameraFollow",
      maxEntries: 6,
      onSearchFocus: t => {
        t.eraseInput();
        const cameraFollowManager = t.app.getManager("cameraFollow");
        cameraFollowManager.showSearch();
        cameraFollowManager.setSearchOptions();
      }
    }
  }
}, {
  type: "Toast",
  name: "toast",
  options: {
    hideDelay: void 0
  }
}, {
  type: "Menu",
  name: "menu"
}, {
  type: "FeaturedStoriesPanel",
  name: "featuredStoriesPanel",
  options: {
    isVisible: true
  }
}];
export { defaultExport as default };
