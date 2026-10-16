// Recovered from app.js:1423813-1434266.
import "../../vendor/modules/Unidentified989.cjs";
import * as Eyes from "../../framework/eyes/index.js";
import MenuTemplate from "../templates/MenuTemplate.html";
import "../../styles/extracted/MenuStyles.js";
var getMenuTemplate = () => MenuTemplate;
class Menu extends Eyes.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: false,
      menuClass: "",
      menuText: "",
      titleText: "",
      brandingText: "EYES ON THE SOLAR SYSTEM",
      currentInfo: null,
      ...e
    });
    this._backFunction = null;
    this._categories = ["stories", "planets", "asteroids", "comets", "spacecraft"];
    this._listMenuContainer = {};
    this._listMenu = {};
    this._aToZMenu = {};
    for (let t = 0; t < this._categories.length; t++) {
      const e = this._categories[t];
      this._listMenuContainer[e] = null;
      this._listMenu[e] = null;
      this._aToZMenu[e] = null;
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
      for (const t in this._listMenuContainer) {
        const e = this._listMenuContainer[t];
        const i = this._listMenu[t];
        null !== e && e.contains(i) && e.removeChild(i);
      }
      "a-to-z" === this._state.menuClass && (this._backFunction = this._goToList);
    } else {
      this.setState({
        menuText: "Menu"
      });
      for (const t in this._listMenuContainer) {
        const e = this._listMenuContainer[t];
        const i = this._listMenu[t];
        null === e || e.contains(i) || e.appendChild(i);
      }
      "a-to-z" === this._state.menuClass && (this._backFunction = this._goToMain);
      "list" === this._state.menuClass && this.getState("isVisible") && this._goToMain();
    }
  }
  setupAtoZ(t) {
    const e = ["0-9", "a-f", "g-k", "l-p", "q-u", "v-z"].map(e => {
      const i = t.entries.filter(t => ((t, e) => {
        const i = t.subtitle ? t.subtitle + ": " + t.title : t.title;
        const s = t.displayName || t.iauName || i;
        return e.test(s);
      })(t, new RegExp(`^[${e}]`, "i")));
      return {
        entries: i.sort((t, e) => {
          const i = t.subtitle ? t.subtitle + ": " + t.title : t.title;
          const s = e.subtitle ? e.subtitle + ": " + e.title : e.title;
          let n = t.displayName || t.iauName || i;
          let o = e.displayName || e.iauName || s;
          n = String(n).toLowerCase();
          o = String(o).toLowerCase();
          return n < o ? -1 : n > o ? 1 : 0;
        }),
        title: e
      };
    });
    const i = document.createElement("h5");
    i.className = "semi";
    i.innerText = t.name;
    const s = document.createElement("span");
    s.className = "icon icon-close clickable close-button";
    s.addEventListener("click", this.hide, false);
    const n = document.createElement("div");
    n.className = "menu-content";
    for (let t = 0; t < e.length; t++) if (e[t] && e[t].entries && e[t].entries.length > 0) {
      const i = document.createElement("div");
      i.className = "block";
      const s = document.createElement("div");
      s.className = "small semi title";
      s.innerText = e[t].title;
      i.appendChild(s);
      const o = document.createElement("div");
      o.className = "list-container";
      i.appendChild(o);
      for (let i = 0; i < e[t].entries.length; i++) {
        const s = e[t].entries[i];
        const n = document.createElement("button");
        n.className = "small clickable entry-label";
        const r = s.subtitle ? s.subtitle + ": " : "";
        const a = s.displayName || s.iauName || r + s.title;
        if (s.icon) {
          n.classList.add("with-thumb");
          const t = document.createElement("img");
          t.src = s.icon;
          t.classList.add("entry-image-all");
          const e = document.createElement("span");
          if (e.className = "entry-image-label", e.innerText = a, s.link) {
            const t = document.createElement("span");
            t.className = "icon icon-external";
            e.appendChild(t);
          }
          n.appendChild(t);
          n.appendChild(e);
        } else n.innerText = a;
        n.addEventListener("click", () => {
          this.clickOnEntry(s);
        }, {
          passive: false
        });
        o.appendChild(n);
      }
      n.appendChild(i);
    }
    const o = document.createElement("div");
    o.className = "container";
    o.appendChild(n);
    this._aToZMenu[t.id] = o;
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
  clickOnEntry(t) {
    if (this.hide(), t && t.id) if (t.link) t.internal ? this._app.getManager("router").navigate(t.link) : window.open(t.link);else if (t.title) {
      const e = "story/" + t.id;
      this._app.getManager("router").navigate(e);
    } else this._app.getManager("router").navigate("/" + t.id);
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
    const e = ["134340_pluto", "101955_bennu", "dimorphos", "16_psyche", "4_vesta"];
    const i = [];
    for (let s = 0; s < e.length; s++) i.push(contentManager.getEntityInfo(e[s]));
    const s = ["c_2025_n1", "1p_halley", "9p_tempel_1", "67p_churyumov_gerasimenko", "103p_hartley_2"];
    const n = [];
    for (let e = 0; e < s.length; e++) n.push(contentManager.getEntityInfo(s[e]));
    const o = ["sc_europa_clipper", "sc_nisar", "sc_psyche", "sc_lucy", "sc_voyager_1", "sc_artemis_1", "sc_artemis_2", "sc_iss", "sc_jwst"];
    const r = [];
    for (let e = 0; e < o.length; e++) r.push(contentManager.getEntityInfo(o[e]));
    const {
      hideExternalLinks: hideExternalLinks
    } = this._app.getManager("router").configs;
    const l = [];
    const c = contentManager.getStoryList();
    for (let t = 0; t < c.featured.length; t++) c.stories[c.featured[t]] ? l.push(c.stories[c.featured[t]]) : !hideExternalLinks && c.external[c.featured[t]] ? l.push(c.external[c.featured[t]]) : c.internal[c.featured[t]] ? l.push(c.internal[c.featured[t]]) : console.error(`Story not found id:${c.featured[t]}`);
    const h = [];
    Object.keys(c.stories).forEach(t => {
      h.push(c.stories[t]);
    });
    !hideExternalLinks && Object.keys(c.external).forEach(t => {
      h.push(c.external[t]);
    });
    const d = {
      stories: h,
      ...contentManager.entitiesByCategory
    };
    const u = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
    const p = [];
    for (let e = 0; e < u.length; e++) p.push(contentManager.getEntityInfo(u[e]));
    this.setupContent(d, l, p, i, n, r);
    this._app.getComponent("searchMobile")?.registerCallback("resultselected", this.hide);
  }
  async setupContent(contentInfo, e, i, n, o, r) {
    this._contentInfo = contentInfo;
    this._children.mainMenu.innerHTML = "";
    const a = [{
      id: "stories",
      name: "Stories",
      max: 5,
      featuredEntries: [...e],
      entries: [...(this._contentInfo.stories || [])]
    }, {
      id: "planets",
      name: "Planets & Moons",
      max: 5,
      featuredEntries: [...i],
      entries: [...(this._contentInfo.Moon || []), ...(this._contentInfo.Planet || [])]
    }, {
      id: "asteroids",
      name: "Dwarf Planets & Asteroids",
      max: 5,
      featuredEntries: [...(n || [])],
      entries: [...(this._contentInfo.Asteroid || []), ...(this._contentInfo["Dwarf Planet"] || [])]
    }, {
      id: "comets",
      name: "Comets",
      max: 5,
      featuredEntries: [...(o || [])],
      entries: [...(this._contentInfo.Comet || [])]
    }, {
      id: "spacecraft",
      name: "Spacecraft",
      max: 5,
      featuredEntries: [...(r || [])],
      entries: [...(this._contentInfo.Spacecraft || []), ...(this._contentInfo.Instrument || [])]
    }];
    const l = document.createElement("div");
    l.className = "menu-content";
    for (let t = 0; t < a.length; t++) if (a[t] && a[t].entries && a[t].entries.length > 0) {
      const e = document.createElement("div");
      e.className = "block";
      e.addEventListener("click", () => {
        Eyes.AppUtils.isMobileMode() && (this.setState({
          currentInfo: a[t]
        }), this._goToList());
      }, false);
      const i = document.createElement("div");
      i.className = "list-container";
      this._listMenu[a[t].id] = i;
      this._listMenuContainer[a[t].id] = e;
      const n = document.createElement("button");
      n.className = "small semi title";
      n.innerText = a[t].name;
      e.appendChild(n);
      e.appendChild(i);
      const o = document.createElement("span");
      if (o.className = "icon icon-greater clickable expand", e.appendChild(o), void 0 !== a[t].featuredEntries) {
        const e = document.createElement("div");
        e.className = "entry-container featured";
        for (let i = 0; i < a[t].featuredEntries.length; i++) {
          const s = a[t].featuredEntries[i];
          const n = document.createElement("div");
          if (n.classList.add("link-container"), s.icon) {
            const t = document.createElement("img");
            t.src = s.icon;
            t.classList.add("entry-image");
            n.appendChild(t);
          }
          const o = document.createElement("span");
          const r = s.subtitle ? s.subtitle + ": " : "";
          if (o.className = "small clickable entry-label", o.innerText = s.displayName || s.iauName || r + s.title, o.addEventListener("click", () => {
            this.clickOnEntry(s);
          }, false), s.link && !s.internal) {
            const t = document.createElement("span");
            t.className = "icon icon-external";
            o.appendChild(t);
          }
          n.appendChild(o);
          e.appendChild(n);
        }
        i.appendChild(e);
      } else {
        const e = a[t].max ? Math.min(a[t].entries.length, a[t].max) : a[t].entries.length;
        const s = document.createElement("div");
        s.className = "entry-container";
        for (let i = 0; i < e; i++) {
          const e = a[t].entries[i];
          const n = document.createElement("div");
          n.className = "small clickable entry-label";
          n.innerText = e.displayName || e.iauName;
          n.addEventListener("click", () => {
            this.clickOnEntry(e);
          }, false);
          s.appendChild(n);
        }
        i.appendChild(s);
      }
      const r = document.createElement("div");
      r.className = "az-link-container clickable";
      r.addEventListener("click", () => {
        this.setState({
          currentInfo: a[t]
        });
        this._goToAtoZ();
      }, false);
      const c = document.createElement("button");
      c.className = "small clickable az-link";
      c.innerHTML = `View <strong>${a[t].entries.length}</strong> ${a[t].name}`;
      r.appendChild(c);
      const h = document.createElement("span");
      o.className = "icon icon-greater clickable expand";
      r.appendChild(h);
      i.appendChild(r);
      l.appendChild(e);
      this.setupAtoZ(a[t]);
    }
    const searchMobileComponent = this._app.getComponent("searchMobile");
    searchMobileComponent && this._children.mainMenu.appendChild(searchMobileComponent?.element);
    searchMobileComponent?.setParent(this._children.mainMenu);
    this._children.mainMenu.appendChild(l);
    const customEvent = new CustomEvent("setupSearch");
    window.dispatchEvent(customEvent);
    this.resize();
    this._goToMain();
  }
}
Menu.html = getMenuTemplate();
export { Menu };
