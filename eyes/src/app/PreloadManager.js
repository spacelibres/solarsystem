/** @eyes-analysis
 * 文件职责：在应用依赖图加载前显示普通或嵌入模式加载界面并更新进度
 * 依据：imports: ../data/StoryCatalog.json, ../data/EntityCatalog.json
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from preload.js:90-5727.
import StoryCatalog from "../data/StoryCatalog.json";
import EntityCatalog from "../data/EntityCatalog.json";
let defaultExport;
/** @eyes-analysis
 * 类职责：在应用依赖图加载前显示普通或嵌入模式加载界面并更新进度
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PreloadManager {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._isEmbed, this._isInteractPrompt, this._showEmbedScreen, this._showLoadingScreen；写入 _isTouch, _canHover, _embedEl, _loadingScreenEl, _storyList, _entityInfo, _urlParams, _hashRoute。
   * 状态写入：_canHover、_embedEl、_entityInfo、_hashRoute、_isTouch、_loadingScreenEl、_storyList、_urlParams。
   * 调用线索：(window.location.hash.split("#/")[1]??"").split、document.getElementById、matchMedia、new URLSearchParams、this._embedEl?.remove等。
   */
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
  /** @eyes-analysis
   * 执行 _isEmbed 对应的组件业务步骤；调用 this._urlParams.get。
   * 调用线索：this._urlParams.get。
   */
  _isEmbed() {
    return "true" === this._urlParams.get("embed");
  }
  /** @eyes-analysis
   * 执行 _isInteractPrompt 对应的组件业务步骤；调用 this._urlParams.get。
   * 调用线索：this._urlParams.get。
   */
  _isInteractPrompt() {
    return "true" === this._urlParams.get("interactPrompt");
  }
  /** @eyes-analysis
   * 执行 _showLoadingScreen 对应的组件业务步骤；调用 this._loadingScreenEl.appendChild, Math.random, this._loadingScreenEl.classList.add。
   * 调用线索：Math.random、document.createElement、document.getElementById、m.slice、n.slice等。
   */
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
  /** @eyes-analysis
   * 执行 _showEmbedScreen 对应的组件业务步骤；调用 this._embedEl.appendChild, this._getTitleFromURL, this._embedEl.classList.add, this.updateEmbedLoadPercent。
   * 调用线索：document.createElement、o.appendChild、this._embedEl.appendChild、this._embedEl.classList.add、this._getTitleFromURL等。
   */
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
  /** @eyes-analysis
   * 执行 showEmbedInteraction 对应的组件业务步骤；调用 this._embedEl.classList.remove, this._embedEl.classList.add。
   * 状态写入：_embedEl.className。
   * 调用线索：document.addEventListener、document.removeEventListener、s.preventDefault、this._embedEl.classList.add、this._embedEl.classList.remove。
   */
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
  /** @eyes-analysis
   * 执行 showEmbedViewButton 对应的组件业务步骤；调用 this._embedEl.classList.remove, this._embedEl.classList.add, this.showEmbedInteraction。
   * 调用线索：document.addEventListener、document.removeEventListener、s.preventDefault、this._embedEl.classList.add、this._embedEl.classList.remove等。
   */
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
  /** @eyes-analysis
   * 执行 _getTitleFromURL 对应的组件业务步骤；调用 this._hashRoute.includes, this._hashRoute.split, this._urlParams.get, this._getNameFromEntityInfo。
   * 调用线索：a.replace、s[1].slice、t.endsWith、this._getNameFromEntityInfo、this._hashRoute.includes等。
   */
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
  /** @eyes-analysis
   * 执行 _getNameFromEntityInfo 对应的组件业务步骤。
   */
  _getNameFromEntityInfo(o) {
    const {
      altName: altName,
      displayName: displayName,
      iauName: iauName
    } = this._entityInfo[o] || {};
    return altName || displayName || iauName;
  }
  /** @eyes-analysis
   * 执行 hideLoadingScreen 对应的组件业务步骤；调用 this._loadingScreenEl.classList.remove, this._loadingScreenEl.remove。
   * 状态写入：_loadingScreenEl.style.opacity、_loadingScreenEl.style.transition。
   * 调用线索：setTimeout、this._loadingScreenEl.classList.remove、this._loadingScreenEl.remove。
   */
  hideLoadingScreen() {
    if (!this._loadingScreenEl) return;
    this._loadingScreenEl.classList.remove("show");
    this._loadingScreenEl.style.transition = "opacity 0.4s ease-out";
    this._loadingScreenEl.style.opacity = "0";
    setTimeout(() => {
      this._loadingScreenEl.remove();
    }, 400);
  }
  /** @eyes-analysis
   * 执行 updateEmbedLoadPercent 对应的组件业务步骤。
   * 调用线索：this._embedEl?.style.setProperty。
   */
  updateEmbedLoadPercent(o) {
    this._embedEl?.style.setProperty("--load-percent", `${o}%`);
  }
  /** @eyes-analysis
   * 执行 embedLoading 对应的组件业务步骤。
   * 调用线索：this._embedEl?.classList.contains。
   */
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
