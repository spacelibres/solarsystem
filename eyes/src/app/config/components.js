// Recovered from app.js:1350654-1354281.
/** 组件注册及创建后连接：应用实例与新组件是不同参数，搜索焦点/重置显式通知距离或相机跟随面板。 */
import * as Eyes from "../../framework/eyes/index.js";
import * as SettingsOptions from "./settings.js";
let componentDefinitions;
componentDefinitions = [{
  type: "Breadcrumb",
  name: "breadcrumb",
  options: {
    params: {
      title: "Solar System"
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
  postCreationFunction: (app, comparisonComponent) => {
    app.getComponent("settings")?.registerCallback("unitchange", comparisonComponent.unitchange);
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
  postCreationFunction: (app, searchComponent) => {
    searchComponent.onResize = () => {
      if (Eyes.AppUtils.isMobileMode()) {
        searchComponent.hide();
      } else {
        searchComponent.show();
      }
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
  postCreationFunction: (app, searchComponent) => {
    searchComponent.onResize = () => {
      if (Eyes.AppUtils.isMobileMode()) {
        searchComponent.show();
      } else {
        searchComponent.hide();
      }
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
      onSearchFocus: searchComponent => {
        searchComponent.eraseInput();
        searchComponent.app.getComponent("distancePanel")?.setIsSearching?.(true);
      },
      onReset: searchComponent => {
        const {
          defaultText: defaultText
        } = searchComponent._config;
        const {
          input: input
        } = searchComponent._children;
        if (defaultText) {
          input.value = defaultText;
        }
        searchComponent.app.getComponent("distancePanel")?.setIsSearching?.(false);
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
      onSearchFocus: searchComponent => {
        searchComponent.eraseInput();
        searchComponent.app.getComponent("distancePanel")?.setIsSearching?.(true);
      },
      onReset: searchComponent => {
        const {
          defaultText: defaultText
        } = searchComponent._config;
        const {
          input: input
        } = searchComponent._children;
        if (defaultText) {
          input.value = defaultText;
        }
        searchComponent.app.getComponent("distancePanel")?.setIsSearching?.(false);
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
      onSearchFocus: searchComponent => {
        searchComponent.eraseInput();
        const cameraFollowManager = searchComponent.app.getManager("cameraFollow");
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
export { componentDefinitions as default };
