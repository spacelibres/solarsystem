// Recovered from app.js:575629-587527.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import SearchTemplate from "../templates/SearchTemplate.html";
let defaultExport;
var getSearchTemplate = () => SearchTemplate;
class Search extends EyesPublicApi.BaseComponent {
  constructor(t, e = {
    config: {}
  }) {
    e.config = {
      initialOpen: false,
      allowFeatured: false,
      allowDetail: true,
      allowInfo: false,
      stopOnExactMatch: false,
      infoText: {
        default: "most popular",
        results: "result",
        suggestions: "suggestion",
        nomatches: "no matches"
      },
      maxSuggestions: 1,
      placeholderText: "Search...",
      nameSearch: ["iauName", "displayName"],
      nameDisplay: ["displayName", "iauName"],
      ...e.config
    };
    super(t, null, {
      text: "",
      searchInfo: e.config?.infoText?.default || "",
      alwaysOpen: false,
      magClass: "mag-open",
      searchClass: "search-close",
      focusedClass: "",
      isFeaturedVisible: false,
      ...e
    });
    this._class.isItemVisible = {
      true: "",
      false: "hidden"
    };
    Object.assign(this._state, {
      allowFeaturedClass: this._class.isItemVisible[this._config.allowFeatured],
      isFeaturedVisibleClass: this._class.isItemVisible[this._config.allowFeatured && this._state.isFeaturedVisible],
      allowInfoClass: this._class.isItemVisible[this._config.allowInfo]
    });
    this._eventNames.push("resultselected");
    this._initCallbacks();
    this._resultsScrollbar = null;
    this._featuredScrollbar = null;
    this.onResize = null;
    this.results = [];
    this._excludeResults = [];
    this._suggestionsThreshold = .05;
    this.index = -1;
    this.bindFunctions(["_find", "renderResults", "open", "close", "eraseInput", "onIconClick", "reset", "keydown", "onInputFocus", "_getDetails", "_handleClick"]);
    window.addEventListener("setupSearch", this.resize);
  }
  init() {
    super.init();
    const t = .9 * this._children.input.getAttribute("placeholder").length;
    this._children.input.style.minWidth = `${t}ch`;
    this._children.input.onkeyup = t => {
      const e = 0 === this._children.input.value.length;
      this._config.allowFeatured && e !== this._state.isFeaturedVisible && (this._featuredScrollbar?.scroll(0), this.setState({
        isFeaturedVisible: e,
        isFeaturedVisibleClass: this._class.isItemVisible[e],
        ...(e && {
          searchInfo: this._config.infoText.default
        })
      }));
    };
    this.resize();
    this.registerManager(this._app.getManager("search"));
  }
  onIconClick() {
    "search-close" === this._state.searchClass ? (this._scrollbar?.scroll(0), this.open(), this._children.input.focus()) : "" === this._children.input.value ? this.reset() : this._children.results.querySelector(".active")?.firstChild.click();
  }
  resize() {
    super.resize();
    "function" == typeof this.onResize && this.onResize();
  }
  reset() {
    this.eraseInput();
    this._config.initialOpen || this.close();
  }
  keydown(t) {
    const e = t.key;
    "Escape" === e && (this.eraseInput(), this.close());
    const i = this.results.length;
    i && ("ArrowDown" === e ? (this.index = (this.index + 1) % i, t.preventDefault()) : "ArrowUp" === e ? (this.index -= 1, this.index < 0 && (this.index = i - 1), t.preventDefault()) : "Enter" === e && (this._handleClick(this.results[this.index]?.link || this.results[0]?.link, this._searchString), t.preventDefault()), this.setSelected(this.index));
  }
  setSelected(index) {
    this.index = index;
    for (let t = 0; t < this.results.length; t++) {
      const e = this.results[t].element;
      e && (t === this.index ? e.classList.add("active") : e.classList.remove("active"));
    }
  }
  onInputFocus() {
    this.setState({
      focusedClass: "input-focused"
    });
  }
  eraseInput() {
    this._resultsScrollbar?.destroy();
    this._resultsScrollbar = null;
    this._children.input.value = "";
    this._children.results.innerHTML = "";
  }
  registerManager(searchManager) {
    this._searchManager = searchManager;
  }
  _find(t, e) {
    this._searchTimeout && clearTimeout(this._searchTimeout);
    t && t.target && t.target.value && (e = t.target.value);
    const {
      maxEntries: maxEntries
    } = this._config;
    this._searchTimeout = setTimeout(async () => {
      if (this._searchManager) {
        const t = this._searchManager.find(e, maxEntries);
        const s = t?.length && this._excludeResults?.length ? t.filter(({
          item: item
        }) => !this._excludeResults.includes(item.id)) : t;
        await this.renderResults(s, e);
      }
    }, 100);
  }
  async renderResults(t, searchString) {
    if (this.index = -1, this.results = [], this._searchString = searchString, this._resultsScrollbar?.destroy(), this._resultsScrollbar = null, this._children.results.innerHTML = "", this._children.results.classList.remove("no-results"), !t || !Array.isArray(t)) return;
    const i = [];
    const s = [];
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      const {
        nameSearch: nameSearch
      } = this._config;
      const a = o.item[nameSearch.find(t => void 0 !== o.item[t])];
      if (this._config.stopOnExactMatch && searchString.toLowerCase() === a.toLowerCase()) {
        s.length = 0;
        i.length = 0;
        s.push(o);
        break;
      }
      o.score < this._suggestionsThreshold ? s.push(o) : i.push(o);
    }
    1 === s.length ? this._config.allowDetail ? await this._renderResultCard(s[0], searchString) : this._renderResultList(s, searchString) : 0 === s.length ? this._renderSuggestions(i, searchString) : this._renderResultList(s, searchString);
    s.length > 3 && (this._resultsScrollbar ??= this._createScrollbar(this._children.results));
    const {
      allowInfo: allowInfo,
      infoText: infoText,
      maxSuggestions: maxSuggestions
    } = this._config;
    if (allowInfo) {
      let t = infoText.nomatches;
      s.length ? t = `${s.length} ${infoText.results}${s.length > 1 ? "s" : ""}` : i.length && (t = `${Math.min(i.length, maxSuggestions)} ${infoText.suggestions}${i.length > 1 ? "s" : ""}`);
      this.setState({
        searchInfo: t
      });
    }
    this.setSelected(0);
  }
  async _renderResultCard(t, e) {
    try {
      let i = await this._getDetails(t);
      if (!i && t && t.item) {
        const {
          nameDisplay: nameDisplay
        } = this._config;
        i = {
          title: t.item[nameDisplay.find(e => void 0 !== t.item[e])]
        };
      }
      const n = document.createElement("div");
      n.className = "card-title result-div";
      const o = document.createElement("h4");
      o.className = "semi clickable";
      let r = i.title;
      if ("string" == typeof r) {
        const t = r.toUpperCase().indexOf(e.toUpperCase());
        if (t > -1) {
          const i = r.substring(t, t + e.length);
          const s = r.split(i);
          s && 2 === s.length && (r = "", s[0].length > 0 && (r += `<span class='unmatch'>${s[0]}</span>`), r += i, s[1].length > 0 && (r += `<span class='unmatch'>${s[1]}</span>`));
        }
      } else r = "";
      o.innerHTML = r;
      const a = EyesPublicApi.AppUtils.addStartToPath(t.item.id);
      o.addEventListener("mouseover", () => {
        this.setSelected(0);
      }, false);
      o.addEventListener("click", i => {
        t.item && this._handleClick(t.item.id, e);
        i?.stopPropagation?.();
      }, false);
      n.appendChild(o);
      this.results.push({
        link: a,
        element: n
      });
      this._children.results.innerHTML = "";
      this._children.results.appendChild(n);
      i.cards && this._createStoryBlock(i.cards);
      i.featuredEvents && i.featuredEvents.initial && this._createEventsBlock(i.featuredEvents.initial, t.item.id);
      i.exploration && i.exploration.initial && this._createExplorationBlock(i.exploration.initial);
      i.featuredMoons && this._createMoonsBlock(i.featuredMoons, t.item.id);
    } catch (i) {
      void 0 !== i.status && 404 === i.status ? this._renderResultList([t], e) : i && console.error(i);
    }
  }
  _createEventsBlock(t, e) {
    if (!Array.isArray(t) || 0 === t.length) return;
    const i = this._app.getManager("content").getEntityInfo(e);
    if (null === i || !i.hasEvents) return;
    const n = this._createBlockContainer();
    n.classList.add("events");
    this._createHeaderBlock("Featured Events", n);
    for (let i = 0; i < t.length; i++) {
      const o = t[i];
      const r = o.title;
      const a = EyesPublicApi.AppUtils.addStartToPath(e + "/events/" + o.eventId);
      const l = this._createSingleResult(r, a, n);
      this.results.push({
        link: a,
        element: l
      });
    }
  }
  _createMoonsBlock(t) {
    if (!Array.isArray(t) || 0 === t.length) return;
    const e = this._createBlockContainer();
    e.classList.add("moons");
    this._createHeaderBlock("Featured Moons", e);
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      const n = t[i];
      const o = this._createSingleResult(s, n, e);
      this.results.push({
        link: n,
        element: o
      });
    }
  }
  _createExplorationBlock(t) {
    if (!Array.isArray(t) || 0 === t.length) return;
    const e = this._createBlockContainer();
    e.classList.add("exploration");
    this._createHeaderBlock("Exploration", e);
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      let n = s.title;
      null !== s.info && void 0 !== s.info && (n += " (" + s.info + ")");
      const o = s.url;
      const r = this._createSingleResult(n, o, e);
      this.results.push({
        link: o,
        element: r
      });
    }
  }
  _createStoryBlock(t) {
    if (!Array.isArray(t) || 0 === t.length) return;
    const e = this._createBlockContainer();
    e.classList.add("stories");
    let i = false;
    for (let s = 0; s < t.length; s++) {
      const n = t[s];
      if (void 0 !== n.storyId) {
        const t = this._app.getManager("content").getStoryList().stories[n.storyId];
        if (void 0 !== t) {
          i || (this._createHeaderBlock("Stories", e), i = true);
          const s = t.title;
          const o = "/story/" + n.storyId;
          const r = this._createSingleResult(s, o, e);
          this.results.push({
            link: o,
            element: r
          });
        }
      }
    }
  }
  _createBlockContainer() {
    const t = document.createElement("div");
    t.className = "block-container";
    this._children.results.appendChild(t);
    return t;
  }
  _createHeaderBlock(t, e) {
    const i = document.createElement("div");
    i.className = "header";
    const s = document.createElement("span");
    s.className = "title small semi";
    s.innerHTML = t;
    i.appendChild(s);
    e.appendChild(i);
  }
  _createSingleResult(t, e, i) {
    const s = document.createElement("div");
    s.className = "result-div";
    const n = document.createElement("button");
    n.className = "small clickable capitalize";
    n.innerHTML = t;
    const o = this.results.length - 1 + 1;
    s.addEventListener("click", t => {
      this._handleClick(e, this._searchString);
      t?.stopPropagation?.();
    }, false);
    s.addEventListener("mouseover", () => {
      this.setSelected(o);
    }, false);
    s.appendChild(n);
    i.appendChild(s);
    return s;
  }
  _renderResultList(t, e) {
    for (let i = 0; i < t.length; i++) {
      const n = t[i].item;
      const {
        nameSearch: nameSearch
      } = this._config;
      const r = n[nameSearch.find(t => void 0 !== n[t])];
      if (!r) continue;
      const a = document.createElement("button");
      a.className = "entries clickable thin small";
      const l = n.url || n.id;
      let c = r;
      const h = r.toUpperCase().indexOf(e.toUpperCase());
      if (h > -1) {
        const t = c.substring(h, h + e.length);
        c = c.replace(t, `<span class='semi'>${t}</span>`);
      }
      a.innerHTML = c;
      const d = EyesPublicApi.AppUtils.addStartToPath(l);
      const u = document.createElement("div");
      u.className = "result-div";
      u.appendChild(a);
      u.addEventListener("mouseover", () => {
        this.setSelected(i);
      }, false);
      u.addEventListener("click", t => {
        this._handleClick(l, e);
        t?.stopPropagation?.();
      }, false);
      this.results.push({
        link: d,
        element: u
      });
      this._children.results.appendChild(u);
    }
  }
  _renderSuggestions(t, e) {
    const i = document.createElement("div");
    if (i.className = "suggestion", t.length > 0) {
      const n = document.createElement("label");
      n.className = "title small semi";
      n.innerHTML = "Did you mean...?";
      i.appendChild(n);
      for (let n = 0; n < Math.min(this._config.maxSuggestions, t.length); n++) {
        const o = document.createElement("button");
        o.className = "entries clickable";
        const r = t[n].item;
        const {
          nameSearch: nameSearch
        } = this._config;
        const l = r[nameSearch.find(t => void 0 !== r[t])];
        if (l) {
          const t = r.url || r.id;
          o.innerHTML = l;
          const a = EyesPublicApi.AppUtils.addStartToPath(t);
          o.addEventListener("mouseover", () => {
            this.setSelected(n);
          }, false);
          o.addEventListener("click", i => {
            this._handleClick(t, e);
            i?.stopPropagation?.();
          }, false);
          const c = document.createElement("div");
          c.className = "result-div small";
          c.appendChild(o);
          i.appendChild(c);
          this.results.push({
            link: a,
            element: c
          });
        }
      }
    } else if (!this._config.allowInfo) {
      const t = document.createElement("label");
      t.className = "title no-match small";
      t.innerHTML = "No matches.";
      i.appendChild(t);
      this._children.results.classList.add("no-results");
    }
    this._children.results.appendChild(i);
  }
  open() {
    this.setState({
      magClass: "mag-close",
      searchClass: "search-open",
      isFeaturedVisible: this._config.allowFeatured,
      isFeaturedVisibleClass: this._class.isItemVisible[this._config.allowFeatured],
      ...(this._config.allowFeatured && {
        searchInfo: this._config.infoText.default
      })
    });
    this.app.isSearching = true;
  }
  close() {
    this.getState("alwaysOpen") ? this.setState({
      magClass: "mag-close",
      searchClass: "search-open",
      focusedClass: "",
      isFeaturedVisible: false,
      isFeaturedVisibleClass: this._class.isItemVisible.false
    }) : this.setState({
      magClass: "mag-open",
      searchClass: "search-close",
      focusedClass: "",
      isFeaturedVisible: false,
      isFeaturedVisibleClass: this._class.isItemVisible.false
    });
    this._children.input?.blur();
    this.app.isSearching = false;
  }
  setupFeaturedSuggestion(t = []) {
    this._children.featured.innerHTML = "";
    for (let e = 0; e < t.length; e++) {
      const {
        text: text,
        url: url
      } = t[e];
      const n = document.createElement("li");
      n.innerHTML = text;
      n.className = "clickable thin";
      n.addEventListener("click", t => {
        this._handleClick(url, this._searchString);
        t?.stopPropagation?.();
      });
      this._children.featured.appendChild(n);
    }
  }
  _createScrollbar(t) {
    return EyesPublicApi.AppUtils.addScrollbar(t, {
      sizeAutoCapable: true
    });
  }
  _getLink(t) {
    return t;
  }
  _handleClick(t, e) {
    if (!t) return;
    this.reset();
    this.triggerCallbacks("resultselected");
    const routerManager = this._app.getManager("router");
    const s = this._getLink(t);
    const n = "string" == typeof s ? s : s.path ?? "";
    if (n.includes("events")) routerManager.navigate({}, n, {
      __remove: "all"
    });else {
      const {
        options: t = {
          keepTime: true
        },
        query: e = {}
      } = "object" == typeof s && s;
      routerManager.navigate(e, n, t);
    }
  }
  simulate(t) {
    const {
      input: input
    } = this._children;
    this.onIconClick();
    input.value = t;
    this._find({}, t);
    input.onkeyup();
  }
  async _getDetails(t) {
    return this._app.getManager("content").getEntityDesc(t.item.id);
  }
  setExcludeResults(excludeResults) {
    this._excludeResults = excludeResults;
  }
  __enable() {
    super.__enable();
    const {
      allowFeatured: allowFeatured
    } = this._config;
    if (allowFeatured) {
      const {
        parentElement: parentElement
      } = this._children.featured || {};
      document.body.contains(parentElement) && (this._featuredScrollbar ??= this._createScrollbar(parentElement));
    }
  }
}
Search.html = getSearchTemplate();
defaultExport = Search;
export { defaultExport as default };
