// Recovered from preload.js:90-5727.
import StoryCatalog from "../data/StoryCatalog.json";
import EntityCatalog from "../data/EntityCatalog.json";
let defaultExport;
class PreloadManager {
  constructor() {
    if (!PreloadManager.instance) {
      this._isTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
      this._canHover = !matchMedia("(hover: none)").matches;
      this._embedEl = document.getElementById("embed-overlay");
      this._loadingScreenEl = document.getElementById("loading-screen");
      this._storyList = StoryCatalog;
      this._entityInfo = EntityCatalog;
      const o = (window.location.hash.split("#/")[1] ?? "").split("?");
      this._urlParams = new URLSearchParams(o[1]);
      this._hashRoute = o[0];
      this._isEmbed() || this._isInteractPrompt() ? (this._showEmbedScreen(), this._loadingScreenEl?.remove()) : (this._showLoadingScreen(), this._embedEl?.remove());
      PreloadManager.instance = this;
    }
    return PreloadManager.instance;
  }
  _isEmbed() {
    return "true" === this._urlParams.get("embed");
  }
  _isInteractPrompt() {
    return "true" === this._urlParams.get("interactPrompt");
  }
  _showLoadingScreen() {
    if (!this._loadingScreenEl) return;
    const o = document.createElement("div");
    o.id = "loading-screen-wrapper";
    this._loadingScreenEl.appendChild(o);
    const s = document.createElement("div");
    s.id = "loading-screen-stars1";
    o.appendChild(s);
    const e = document.createElement("div");
    e.id = "loading-screen-stars2";
    o.appendChild(e);
    const a = document.createElement("div");
    a.id = "loading-screen-logo";
    o.appendChild(a);
    const r = document.createElement("div");
    r.id = "loading-screen-container";
    o.appendChild(r);
    const t = document.createElement("div");
    t.id = "loading-screen-text";
    t.innerText = "Loading";
    r.appendChild(t);
    const i = document.createElement("div");
    i.id = "loading-screen-bar";
    r.appendChild(i);
    let n = "";
    for (let o = 0; o < 8; o++) n += `${parseInt(Math.random() * window.innerWidth)}px ${parseInt(Math.random() * window.innerHeight)}px hsl(0deg, 0%, ${parseInt(80 * Math.random()) + 20}%), `;
    document.getElementById("loading-screen-stars1").style.boxShadow = n.slice(0, -2);
    let m = "";
    for (let o = 0; o < 24; o++) m += `${parseInt(Math.random() * window.innerWidth)}px ${parseInt(Math.random() * window.innerHeight)}px hsl(0deg, 0%, ${parseInt(80 * Math.random()) + 20}%), `;
    document.getElementById("loading-screen-stars1").style.boxShadow = m.slice(0, -2);
    this._loadingScreenEl.classList.add("show");
  }
  _showEmbedScreen() {
    if (!this._embedEl) return;
    const o = document.createElement("div");
    o.className = "embed-wrapper";
    this._embedEl.appendChild(o);
    const s = document.createElement("img");
    s.src = "https://eyes.nasa.gov/apps/solar-system/assets/svg/embed_interact.svg";
    s.className = "embed-interact";
    o.appendChild(s);
    const e = document.createElement("span");
    e.className = "interact-text";
    e.innerHTML = (this._isTouch ? "touch" : "click") + " & drag<br>to rotate";
    o.appendChild(e);
    const a = document.createElement("button");
    a.className = "clickable view-btn";
    a.innerText = "View 3D";
    o.appendChild(a);
    const r = document.createElement("span");
    r.className = "loader-text";
    const t = this._getTitleFromURL();
    const i = t?.length > 20;
    const n = i ? "<br>" : " ";
    const m = t && "Home" !== t ? `Loading${n}${t}${n}in 3D` : "Loading 3D";
    i ? r.innerHTML = m : r.innerText = m;
    o.appendChild(r);
    const c = document.createElement("div");
    c.className = "embed-loader";
    o.appendChild(c);
    this._embedEl.classList.add("show", "loading");
    this._embedEl.offsetWidth;
    this.updateEmbedLoadPercent(10);
  }
  showEmbedInteraction() {
    const o = s => {
      s.preventDefault();
      this._embedEl.className = "";
      document.removeEventListener("touchstart", o);
      document.removeEventListener("mousedown", o);
    };
    this._embedEl.classList.remove("view");
    this._embedEl.classList.add("interact");
    this._isTouch && document.addEventListener("touchstart", o);
    this._canHover && document.addEventListener("mousedown", o);
  }
  showEmbedViewButton() {
    this._embedEl.classList.remove("loading");
    this._embedEl.classList.add("view");
    const o = s => {
      s.preventDefault();
      document.removeEventListener("touchend", o);
      document.removeEventListener("mouseup", o);
      this.showEmbedInteraction();
    };
    this._isTouch && document.addEventListener("touchend", o);
    this._canHover && document.addEventListener("mouseup", o);
  }
  _getTitleFromURL() {
    if ("home" === this._hashRoute) return "Home";
    let hashRoute = this._hashRoute;
    const s = "story/";
    const e = "/moons";
    const a = "/telescope";
    const r = "/events";
    const t = "/compare";
    if (this._hashRoute.includes(s)) {
      const o = this._hashRoute.split(s)[1];
      const e = this._storyList.stories[o];
      const a = this._urlParams.get("slide");
      const r = a ? a.replace("slide_", "") : 1;
      if (e?.title && r) return `${e.title} - Slide ${r}`;
    }
    if (this._hashRoute.includes(e)) {
      const s = this._hashRoute.split(e);
      const a = s[1].slice(1);
      const r = this._getNameFromEntityInfo(a);
      if (r) return r;
      hashRoute = s[0];
      const t = this._getNameFromEntityInfo(hashRoute);
      if (t) return `${t}'${t.endsWith("s") ? "" : "s"} Moons`;
    }
    if (this._hashRoute.includes(a)) {
      hashRoute = this._hashRoute.split(a)[0];
      const s = this._getNameFromEntityInfo(hashRoute);
      if (s) return `${s} Telescope Mode`;
    }
    if (this._hashRoute.includes(r)) {
      const s = this._hashRoute.split(r);
      hashRoute = s[0];
      const e = this._getNameFromEntityInfo(hashRoute);
      if (e) {
        return s[1].slice(1) ? `${e} Event` : null;
      }
    }
    if (this._hashRoute.includes(t)) {
      hashRoute = this._hashRoute.split(t)[0];
      const s = this._getNameFromEntityInfo(hashRoute);
      const e = this._getNameFromEntityInfo(this._urlParams.get("id"));
      if (s) return e ? `${s} compared to ${e}` : `${s} Comparison`;
    }
    return this._getNameFromEntityInfo(hashRoute) || "Home";
  }
  _getNameFromEntityInfo(o) {
    const {
      altName: altName,
      displayName: displayName,
      iauName: iauName
    } = this._entityInfo[o] || {};
    return altName || displayName || iauName;
  }
  hideLoadingScreen() {
    if (!this._loadingScreenEl) return;
    this._loadingScreenEl.classList.remove("show");
    this._loadingScreenEl.style.transition = "opacity 0.4s ease-out";
    this._loadingScreenEl.style.opacity = "0";
    setTimeout(() => {
      this._loadingScreenEl.remove();
    }, 400);
  }
  updateEmbedLoadPercent(o) {
    this._embedEl?.style.setProperty("--load-percent", `${o}%`);
  }
  get embedLoading() {
    return this._embedEl?.classList.contains("loading");
  }
}
const preloadManager = new PreloadManager();
defaultExport = {
  hideLoadingScreen: preloadManager.hideLoadingScreen.bind(preloadManager),
  showEmbedViewButton: preloadManager.showEmbedViewButton.bind(preloadManager),
  updateEmbedLoadPercent: preloadManager.updateEmbedLoadPercent.bind(preloadManager),
  get embedLoading() {
    return preloadManager.embedLoading;
  }
};
export { defaultExport as default };
