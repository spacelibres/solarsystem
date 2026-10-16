// Recovered from app.js:1423813-1434266.
import "../../vendor/modules/Unidentified989.cjs";
import * as Eyes from "../../framework/eyes/index.js";
import MenuTemplate from "../templates/MenuTemplate.html";
import "../../styles/extracted/MenuStyles.js";
var getMenuTemplate = () => MenuTemplate;
/* 菜单缓存分类列表和按首字母分组的 DOM，移动布局把分类列表从主菜单移出再单独挂载。每次切换菜单销毁旧滚动条，跳转条目按外部链接、内部链接、故事与实体分别处理。 */
class Menu extends Eyes.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: false,
      menuClass: "",
      menuText: "",
      titleText: "",
      brandingText: "EYES ON THE SOLAR SYSTEM",
      currentInfo: null,
      ...options
    });
    this._backFunction = null;
    this._categories = ["stories", "planets", "asteroids", "comets", "spacecraft"];
    this._listMenuContainer = {};
    this._listMenu = {};
    this._aToZMenu = {};
    for (let categoryIndex = 0; categoryIndex < this._categories.length; categoryIndex++) {
      const categoryName = this._categories[categoryIndex];
      this._listMenuContainer[categoryName] = null;
      this._listMenu[categoryName] = null;
      this._aToZMenu[categoryName] = null;
    }
    this.bindFunctions(["clickOnEntry", "handleBackButton", "_goToMain", "_goToList", "_goToAtoZ"]);
    this._scrollbar = null;
  }
  handleBackButton() {
    this._backFunction();
  }
  init() {
    super.init();
    this._children.backButton = Eyes.AppUtils.htmlToElement('\n\t\t\t<div class="branding clickable" onclick="handleBackButton">\n\t\t\t\t<span class="icon icon-lesser clickable"></span>\n\t\t\t\t<label class="text clickable">Back</label>\n\t\t\t</div>\n\t\t');
    this._setEventHandlersFromAttributes(this._children.backButton);
    this.resize();
  }
  resize() {
    if (super.resize(), Eyes.AppUtils.isMobileMode()) {
      this.setState({
        menuText: ""
      });
      for (const categoryName in this._listMenuContainer) {
        const categoryContainer = this._listMenuContainer[categoryName];
        const categoryList = this._listMenu[categoryName];
        null !== categoryContainer && categoryContainer.contains(categoryList) && categoryContainer.removeChild(categoryList);
      }
      "a-to-z" === this._state.menuClass && (this._backFunction = this._goToList);
    } else {
      this.setState({
        menuText: "Menu"
      });
      for (const categoryName in this._listMenuContainer) {
        const categoryContainer = this._listMenuContainer[categoryName];
        const categoryList = this._listMenu[categoryName];
        null === categoryContainer || categoryContainer.contains(categoryList) || categoryContainer.appendChild(categoryList);
      }
      "a-to-z" === this._state.menuClass && (this._backFunction = this._goToMain);
      "list" === this._state.menuClass && this.getState("isVisible") && this._goToMain();
    }
  }
  setupAtoZ(categoryInfo) {
    const alphabetGroups = ["0-9", "a-f", "g-k", "l-p", "q-u", "v-z"].map(letterRange => {
      const matchingEntries = categoryInfo.entries.filter(candidateEntry => ((entryInfo, initialPattern) => {
        const storyTitle = entryInfo.subtitle ? entryInfo.subtitle + ": " + entryInfo.title : entryInfo.title;
        const entryTitle = entryInfo.displayName || entryInfo.iauName || storyTitle;
        return initialPattern.test(entryTitle);
      })(candidateEntry, new RegExp(`^[${letterRange}]`, "i")));
      return {
        entries: matchingEntries.sort((leftEntry, rightEntry) => {
          const leftStoryTitle = leftEntry.subtitle ? leftEntry.subtitle + ": " + leftEntry.title : leftEntry.title;
          const rightStoryTitle = rightEntry.subtitle ? rightEntry.subtitle + ": " + rightEntry.title : rightEntry.title;
          let leftTitle = leftEntry.displayName || leftEntry.iauName || leftStoryTitle;
          let rightTitle = rightEntry.displayName || rightEntry.iauName || rightStoryTitle;
          leftTitle = String(leftTitle).toLowerCase();
          rightTitle = String(rightTitle).toLowerCase();
          return leftTitle < rightTitle ? -1 : leftTitle > rightTitle ? 1 : 0;
        }),
        title: letterRange
      };
    });
    const titleElement = document.createElement("h5");
    titleElement.className = "semi";
    titleElement.innerText = categoryInfo.name;
    const closeButton = document.createElement("span");
    closeButton.className = "icon icon-close clickable close-button";
    closeButton.addEventListener("click", this.hide, false);
    const menuContent = document.createElement("div");
    menuContent.className = "menu-content";
    for (let groupIndex = 0; groupIndex < alphabetGroups.length; groupIndex++) if (alphabetGroups[groupIndex] && alphabetGroups[groupIndex].entries && alphabetGroups[groupIndex].entries.length > 0) {
      const groupBlock = document.createElement("div");
      groupBlock.className = "block";
      const groupTitle = document.createElement("div");
      groupTitle.className = "small semi title";
      groupTitle.innerText = alphabetGroups[groupIndex].title;
      groupBlock.appendChild(groupTitle);
      const entryList = document.createElement("div");
      entryList.className = "list-container";
      groupBlock.appendChild(entryList);
      for (let entryIndex = 0; entryIndex < alphabetGroups[groupIndex].entries.length; entryIndex++) {
        const entryInfo = alphabetGroups[groupIndex].entries[entryIndex];
        const entryButton = document.createElement("button");
        entryButton.className = "small clickable entry-label";
        const subtitlePrefix = entryInfo.subtitle ? entryInfo.subtitle + ": " : "";
        const entryTitle = entryInfo.displayName || entryInfo.iauName || subtitlePrefix + entryInfo.title;
        if (entryInfo.icon) {
          entryButton.classList.add("with-thumb");
          const thumbnail = document.createElement("img");
          thumbnail.src = entryInfo.icon;
          thumbnail.classList.add("entry-image-all");
          const thumbnailLabel = document.createElement("span");
          if (thumbnailLabel.className = "entry-image-label", thumbnailLabel.innerText = entryTitle, entryInfo.link) {
            const externalIcon = document.createElement("span");
            externalIcon.className = "icon icon-external";
            thumbnailLabel.appendChild(externalIcon);
          }
          entryButton.appendChild(thumbnail);
          entryButton.appendChild(thumbnailLabel);
        } else entryButton.innerText = entryTitle;
        entryButton.addEventListener("click", () => {
          this.clickOnEntry(entryInfo);
        }, {
          passive: false
        });
        entryList.appendChild(entryButton);
      }
      menuContent.appendChild(groupBlock);
    }
    const menuContainer = document.createElement("div");
    menuContainer.className = "container";
    menuContainer.appendChild(menuContent);
    this._aToZMenu[categoryInfo.id] = menuContainer;
  }
  _goToMain() {
    this.setState({
      titleText: "",
      menuClass: "main"
    });
    null !== this._scrollbar && (this._scrollbar.destroy(), this._scrollbar = null);
    this._children.header.replaceChild(this._children.branding, this._children.header.firstChild);
    this._children.contentWrapper.lastChild ? this._children.contentWrapper.replaceChild(this._children.mainMenu, this._children.contentWrapper.lastChild) : this._children.contentWrapper.appendChild(this._children.mainMenu);
    Eyes.AppUtils.isMobileMode() && this._children.mainMenu?.firstChild !== this._app.getComponent("searchMobile")?.element && this._children.mainMenu.prepend(this._app.getComponent("searchMobile")?.element);
    this.getState("isVisible") && this._initScrollbar();
  }
  _goToList() {
    this._backFunction = this._goToMain;
    const {
      currentInfo: currentInfo
    } = this._state;
    this.setState({
      titleText: currentInfo.name,
      menuClass: "list"
    });
    null !== this._scrollbar && (this._scrollbar.destroy(), this._scrollbar = null);
    this._children.header.replaceChild(this._children.backButton, this._children.header.firstChild);
    this._children.contentWrapper.replaceChild(this._listMenu[currentInfo.id], this._children.contentWrapper.lastChild);
    this.getState("isVisible") && this._initScrollbar();
  }
  _goToAtoZ() {
    this._backFunction = Eyes.AppUtils.isMobileMode() ? this._goToList : this._goToMain;
    const {
      currentInfo: currentInfo
    } = this._state;
    this.setState({
      titleText: currentInfo.name,
      menuClass: "a-to-z"
    });
    null !== this._scrollbar && (this._scrollbar.destroy(), this._scrollbar = null);
    this._children.header.replaceChild(this._children.backButton, this._children.header.firstChild);
    this._children.contentWrapper.replaceChild(this._aToZMenu[currentInfo.id], this._children.contentWrapper.lastChild);
    this.getState("isVisible") && this._initScrollbar();
  }
  clickOnEntry(entryInfo) {
    if (this.hide(), entryInfo && entryInfo.id) if (entryInfo.link) entryInfo.internal ? this._app.getManager("router").navigate(entryInfo.link) : window.open(entryInfo.link);else if (entryInfo.title) {
      const storyRoute = "story/" + entryInfo.id;
      this._app.getManager("router").navigate(storyRoute);
    } else this._app.getManager("router").navigate("/" + entryInfo.id);
  }
  _initScrollbar() {
    null === this._scrollbar ? this._scrollbar = Eyes.AppUtils.addScrollbar(this._children.contentWrapper) : this._scrollbar.scroll(0);
  }
  show() {
    super.show();
    this._goToMain();
  }
  hide() {
    null !== this._scrollbar && (this._scrollbar.destroy(), this._scrollbar = null);
    super.hide();
  }
  updateMenuContent() {
    const contentManager = this._app.getManager("content");
    const featuredAsteroidIds = ["134340_pluto", "101955_bennu", "dimorphos", "16_psyche", "4_vesta"];
    const featuredAsteroids = [];
    for (let asteroidIndex = 0; asteroidIndex < featuredAsteroidIds.length; asteroidIndex++) featuredAsteroids.push(contentManager.getEntityInfo(featuredAsteroidIds[asteroidIndex]));
    const featuredCometIds = ["c_2025_n1", "1p_halley", "9p_tempel_1", "67p_churyumov_gerasimenko", "103p_hartley_2"];
    const featuredComets = [];
    for (let cometIndex = 0; cometIndex < featuredCometIds.length; cometIndex++) featuredComets.push(contentManager.getEntityInfo(featuredCometIds[cometIndex]));
    const featuredSpacecraftIds = ["sc_europa_clipper", "sc_nisar", "sc_psyche", "sc_lucy", "sc_voyager_1", "sc_artemis_1", "sc_artemis_2", "sc_iss", "sc_jwst"];
    const featuredSpacecraft = [];
    for (let spacecraftIndex = 0; spacecraftIndex < featuredSpacecraftIds.length; spacecraftIndex++) featuredSpacecraft.push(contentManager.getEntityInfo(featuredSpacecraftIds[spacecraftIndex]));
    const {
      hideExternalLinks: hideExternalLinks
    } = this._app.getManager("router").configs;
    const featuredStories = [];
    const storyCatalog = contentManager.getStoryList();
    for (let storyIndex = 0; storyIndex < storyCatalog.featured.length; storyIndex++) storyCatalog.stories[storyCatalog.featured[storyIndex]] ? featuredStories.push(storyCatalog.stories[storyCatalog.featured[storyIndex]]) : !hideExternalLinks && storyCatalog.external[storyCatalog.featured[storyIndex]] ? featuredStories.push(storyCatalog.external[storyCatalog.featured[storyIndex]]) : storyCatalog.internal[storyCatalog.featured[storyIndex]] ? featuredStories.push(storyCatalog.internal[storyCatalog.featured[storyIndex]]) : console.error(`Story not found id:${storyCatalog.featured[storyIndex]}`);
    const allStories = [];
    Object.keys(storyCatalog.stories).forEach(storyId => {
      allStories.push(storyCatalog.stories[storyId]);
    });
    !hideExternalLinks && Object.keys(storyCatalog.external).forEach(storyId => {
      allStories.push(storyCatalog.external[storyId]);
    });
    const contentInfo = {
      stories: allStories,
      ...contentManager.entitiesByCategory
    };
    const planetIds = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
    const planetEntries = [];
    for (let planetIndex = 0; planetIndex < planetIds.length; planetIndex++) planetEntries.push(contentManager.getEntityInfo(planetIds[planetIndex]));
    this.setupContent(contentInfo, featuredStories, planetEntries, featuredAsteroids, featuredComets, featuredSpacecraft);
    this._app.getComponent("searchMobile")?.registerCallback("resultselected", this.hide);
  }
  async setupContent(contentInfo, featuredStories, featuredPlanets, featuredAsteroids, featuredComets, featuredSpacecraft) {
    this._contentInfo = contentInfo;
    this._children.mainMenu.innerHTML = "";
    const categoryInfos = [{
      id: "stories",
      name: "Stories",
      max: 5,
      featuredEntries: [...featuredStories],
      entries: [...(this._contentInfo.stories || [])]
    }, {
      id: "planets",
      name: "Planets & Moons",
      max: 5,
      featuredEntries: [...featuredPlanets],
      entries: [...(this._contentInfo.Moon || []), ...(this._contentInfo.Planet || [])]
    }, {
      id: "asteroids",
      name: "Dwarf Planets & Asteroids",
      max: 5,
      featuredEntries: [...(featuredAsteroids || [])],
      entries: [...(this._contentInfo.Asteroid || []), ...(this._contentInfo["Dwarf Planet"] || [])]
    }, {
      id: "comets",
      name: "Comets",
      max: 5,
      featuredEntries: [...(featuredComets || [])],
      entries: [...(this._contentInfo.Comet || [])]
    }, {
      id: "spacecraft",
      name: "Spacecraft",
      max: 5,
      featuredEntries: [...(featuredSpacecraft || [])],
      entries: [...(this._contentInfo.Spacecraft || []), ...(this._contentInfo.Instrument || [])]
    }];
    const menuContent = document.createElement("div");
    menuContent.className = "menu-content";
    for (let categoryIndex = 0; categoryIndex < categoryInfos.length; categoryIndex++) if (categoryInfos[categoryIndex] && categoryInfos[categoryIndex].entries && categoryInfos[categoryIndex].entries.length > 0) {
      const categoryBlock = document.createElement("div");
      categoryBlock.className = "block";
      categoryBlock.addEventListener("click", () => {
        Eyes.AppUtils.isMobileMode() && (this.setState({
          currentInfo: categoryInfos[categoryIndex]
        }), this._goToList());
      }, false);
      const categoryList = document.createElement("div");
      categoryList.className = "list-container";
      this._listMenu[categoryInfos[categoryIndex].id] = categoryList;
      this._listMenuContainer[categoryInfos[categoryIndex].id] = categoryBlock;
      const categoryButton = document.createElement("button");
      categoryButton.className = "small semi title";
      categoryButton.innerText = categoryInfos[categoryIndex].name;
      categoryBlock.appendChild(categoryButton);
      categoryBlock.appendChild(categoryList);
      const expandIcon = document.createElement("span");
      if (expandIcon.className = "icon icon-greater clickable expand", categoryBlock.appendChild(expandIcon), void 0 !== categoryInfos[categoryIndex].featuredEntries) {
        const featuredContainer = document.createElement("div");
        featuredContainer.className = "entry-container featured";
        for (let featuredIndex = 0; featuredIndex < categoryInfos[categoryIndex].featuredEntries.length; featuredIndex++) {
          const entryInfo = categoryInfos[categoryIndex].featuredEntries[featuredIndex];
          const entryContainer = document.createElement("div");
          if (entryContainer.classList.add("link-container"), entryInfo.icon) {
            const thumbnail = document.createElement("img");
            thumbnail.src = entryInfo.icon;
            thumbnail.classList.add("entry-image");
            entryContainer.appendChild(thumbnail);
          }
          const entryLabel = document.createElement("span");
          const subtitlePrefix = entryInfo.subtitle ? entryInfo.subtitle + ": " : "";
          if (entryLabel.className = "small clickable entry-label", entryLabel.innerText = entryInfo.displayName || entryInfo.iauName || subtitlePrefix + entryInfo.title, entryLabel.addEventListener("click", () => {
            this.clickOnEntry(entryInfo);
          }, false), entryInfo.link && !entryInfo.internal) {
            const externalIcon = document.createElement("span");
            externalIcon.className = "icon icon-external";
            entryLabel.appendChild(externalIcon);
          }
          entryContainer.appendChild(entryLabel);
          featuredContainer.appendChild(entryContainer);
        }
        categoryList.appendChild(featuredContainer);
      } else {
        const visibleEntryCount = categoryInfos[categoryIndex].max ? Math.min(categoryInfos[categoryIndex].entries.length, categoryInfos[categoryIndex].max) : categoryInfos[categoryIndex].entries.length;
        const entriesContainer = document.createElement("div");
        entriesContainer.className = "entry-container";
        for (let entryIndex = 0; entryIndex < visibleEntryCount; entryIndex++) {
          const entryInfo = categoryInfos[categoryIndex].entries[entryIndex];
          const entryLabel = document.createElement("div");
          entryLabel.className = "small clickable entry-label";
          entryLabel.innerText = entryInfo.displayName || entryInfo.iauName;
          entryLabel.addEventListener("click", () => {
            this.clickOnEntry(entryInfo);
          }, false);
          entriesContainer.appendChild(entryLabel);
        }
        categoryList.appendChild(entriesContainer);
      }
      const alphabetLinkContainer = document.createElement("div");
      alphabetLinkContainer.className = "az-link-container clickable";
      alphabetLinkContainer.addEventListener("click", () => {
        this.setState({
          currentInfo: categoryInfos[categoryIndex]
        });
        this._goToAtoZ();
      }, false);
      const alphabetLinkButton = document.createElement("button");
      alphabetLinkButton.className = "small clickable az-link";
      alphabetLinkButton.innerHTML = `View <strong>${categoryInfos[categoryIndex].entries.length}</strong> ${categoryInfos[categoryIndex].name}`;
      alphabetLinkContainer.appendChild(alphabetLinkButton);
      const alphabetChevron = document.createElement("span");
      expandIcon.className = "icon icon-greater clickable expand";
      alphabetLinkContainer.appendChild(alphabetChevron);
      categoryList.appendChild(alphabetLinkContainer);
      menuContent.appendChild(categoryBlock);
      this.setupAtoZ(categoryInfos[categoryIndex]);
    }
    const searchMobileComponent = this._app.getComponent("searchMobile");
    searchMobileComponent && this._children.mainMenu.appendChild(searchMobileComponent?.element);
    searchMobileComponent?.setParent(this._children.mainMenu);
    this._children.mainMenu.appendChild(menuContent);
    const customEvent = new CustomEvent("setupSearch");
    window.dispatchEvent(customEvent);
    this.resize();
    this._goToMain();
  }
}
Menu.html = getMenuTemplate();
export { Menu };
