// Recovered from preload.js:90-5727. Semantic cleanup: docs/eyes-analysis/preload-semantic-changes.md.
import StoryCatalog from "../data/StoryCatalog.json";
import EntityCatalog from "../data/EntityCatalog.json";

/**
 * 主应用初始化前显示的加载界面：普通模式拥有 loading-screen，嵌入模式拥有 embed-overlay。
 * 实例保留启动 URL 与输入设备能力；模块只暴露主应用使用的单例操作接口。
 */
class PreloadManager {
  constructor() {
    if (!PreloadManager.instance) {
      this._isTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
      this._canHover = !matchMedia("(hover: none)").matches;
      this._embedEl = document.getElementById("embed-overlay");
      this._loadingScreenEl = document.getElementById("loading-screen");
      this._storyList = StoryCatalog;
      this._entityInfo = EntityCatalog;
      // 查询参数在 hash 内部，不能使用 window.location.search。
      const [hashRoute, hashQuery] = (window.location.hash.split("#/")[1] ?? "").split("?");
      this._urlParams = new URLSearchParams(hashQuery);
      this._hashRoute = hashRoute;
      if (this._isEmbed() || this._isInteractPrompt()) {
        this._showEmbedScreen();
        this._loadingScreenEl?.remove();
      } else {
        this._showLoadingScreen();
        this._embedEl?.remove();
      }
      PreloadManager.instance = this;
    }
    return PreloadManager.instance;
  }

  _isEmbed() {
    return this._urlParams.get("embed") === "true";
  }

  _isInteractPrompt() {
    return this._urlParams.get("interactPrompt") === "true";
  }

  /** CSS 用 2px、1px 节点形成疏密星层，两组阴影必须分别写入各自节点。 */
  _showLoadingScreen() {
    if (!this._loadingScreenEl) return;
    const wrapperElement = document.createElement("div");
    wrapperElement.id = "loading-screen-wrapper";
    this._loadingScreenEl.appendChild(wrapperElement);
    const primaryStarsElement = document.createElement("div");
    primaryStarsElement.id = "loading-screen-stars1";
    wrapperElement.appendChild(primaryStarsElement);
    const secondaryStarsElement = document.createElement("div");
    secondaryStarsElement.id = "loading-screen-stars2";
    wrapperElement.appendChild(secondaryStarsElement);
    const logoElement = document.createElement("div");
    logoElement.id = "loading-screen-logo";
    wrapperElement.appendChild(logoElement);
    const loadingContainerElement = document.createElement("div");
    loadingContainerElement.id = "loading-screen-container";
    wrapperElement.appendChild(loadingContainerElement);
    const loadingTextElement = document.createElement("div");
    loadingTextElement.id = "loading-screen-text";
    loadingTextElement.innerText = "Loading";
    loadingContainerElement.appendChild(loadingTextElement);
    const progressBarElement = document.createElement("div");
    progressBarElement.id = "loading-screen-bar";
    loadingContainerElement.appendChild(progressBarElement);
    primaryStarsElement.style.boxShadow = this._createStarShadows(8);
    secondaryStarsElement.style.boxShadow = this._createStarShadows(24);
    this._loadingScreenEl.classList.add("show");
  }

  /** 每颗星仍消耗三个随机数，保持原位置分布及 20–99% 灰阶亮度；阴影复制星点。 */
  _createStarShadows(starCount) {
    const starShadows = [];
    for (let starIndex = 0; starIndex < starCount; starIndex++) {
      const horizontalPosition = parseInt(Math.random() * window.innerWidth);
      const verticalPosition = parseInt(Math.random() * window.innerHeight);
      const brightnessPercent = parseInt(80 * Math.random()) + 20;
      starShadows.push(`${horizontalPosition}px ${verticalPosition}px hsl(0deg, 0%, ${brightnessPercent}%)`);
    }
    return starShadows.join(", ");
  }

  /** 长标题以 HTML 换行；短标题作为纯文本。这里不等待主应用组件系统初始化。 */
  _showEmbedScreen() {
    if (!this._embedEl) return;
    const wrapperElement = document.createElement("div");
    wrapperElement.className = "embed-wrapper";
    this._embedEl.appendChild(wrapperElement);
    const interactionImage = document.createElement("img");
    interactionImage.src = "https://eyes.nasa.gov/apps/solar-system/assets/svg/embed_interact.svg";
    interactionImage.className = "embed-interact";
    wrapperElement.appendChild(interactionImage);
    const interactionTextElement = document.createElement("span");
    interactionTextElement.className = "interact-text";
    interactionTextElement.innerHTML = (this._isTouch ? "touch" : "click") + " & drag<br>to rotate";
    wrapperElement.appendChild(interactionTextElement);
    const viewButtonElement = document.createElement("button");
    viewButtonElement.className = "clickable view-btn";
    viewButtonElement.innerText = "View 3D";
    wrapperElement.appendChild(viewButtonElement);
    const loadingTextElement = document.createElement("span");
    loadingTextElement.className = "loader-text";
    const routeTitle = this._getTitleFromURL();
    const shouldWrapTitle = routeTitle?.length > 20;
    const titleSeparator = shouldWrapTitle ? "<br>" : " ";
    const loadingMessage = routeTitle && routeTitle !== "Home"
      ? `Loading${titleSeparator}${routeTitle}${titleSeparator}in 3D` : "Loading 3D";
    if (shouldWrapTitle) loadingTextElement.innerHTML = loadingMessage;
    else loadingTextElement.innerText = loadingMessage;
    wrapperElement.appendChild(loadingTextElement);
    const loaderElement = document.createElement("div");
    loaderElement.className = "embed-loader";
    wrapperElement.appendChild(loaderElement);
    this._embedEl.classList.add("show", "loading");
    // 读取布局使初始样式生效，再推进 CSS 进度。
    this._embedEl.offsetWidth;
    this.updateEmbedLoadPercent(10);
  }

  /** 同一回调解除触摸和鼠标监听，避免双输入设备重复关闭交互提示。 */
  showEmbedInteraction() {
    const dismissInteractionPrompt = inputEvent => {
      inputEvent.preventDefault();
      this._embedEl.className = "";
      document.removeEventListener("touchstart", dismissInteractionPrompt);
      document.removeEventListener("mousedown", dismissInteractionPrompt);
    };
    this._embedEl.classList.remove("view");
    this._embedEl.classList.add("interact");
    if (this._isTouch) document.addEventListener("touchstart", dismissInteractionPrompt);
    if (this._canHover) document.addEventListener("mousedown", dismissInteractionPrompt);
  }

  /** 加载完成进入 view 阶段；document 级释放事件继续进入交互提示阶段。 */
  showEmbedViewButton() {
    this._embedEl.classList.remove("loading");
    this._embedEl.classList.add("view");
    const enterInteractionPrompt = inputEvent => {
      inputEvent.preventDefault();
      document.removeEventListener("touchend", enterInteractionPrompt);
      document.removeEventListener("mouseup", enterInteractionPrompt);
      this.showEmbedInteraction();
    };
    if (this._isTouch) document.addEventListener("touchend", enterInteractionPrompt);
    if (this._canHover) document.addEventListener("mouseup", enterInteractionPrompt);
  }

  /**
   * 用预加载目录推导标题，不依赖 content manager。
   * 已知实体的 events 路由缺少事件 ID 时返回 null；其他无法识别的目标回退 Home。
   */
  _getTitleFromURL() {
    if (this._hashRoute === "home") return "Home";
    let entityRoute = this._hashRoute;
    const storyRoutePrefix = "story/";
    const moonsRouteSuffix = "/moons";
    const telescopeRouteSuffix = "/telescope";
    const eventsRouteSuffix = "/events";
    const compareRouteSuffix = "/compare";
    if (this._hashRoute.includes(storyRoutePrefix)) {
      const storyId = this._hashRoute.split(storyRoutePrefix)[1];
      const storyInfo = this._storyList.stories[storyId];
      const slideParameter = this._urlParams.get("slide");
      const slideNumber = slideParameter ? slideParameter.replace("slide_", "") : 1;
      if (storyInfo?.title && slideNumber) return `${storyInfo.title} - Slide ${slideNumber}`;
    }
    if (this._hashRoute.includes(moonsRouteSuffix)) {
      const [parentRoute, moonRoute] = this._hashRoute.split(moonsRouteSuffix);
      const moonId = moonRoute.slice(1);
      const moonName = this._getNameFromEntityInfo(moonId);
      if (moonName) return moonName;
      entityRoute = parentRoute;
      const parentName = this._getNameFromEntityInfo(entityRoute);
      if (parentName) return `${parentName}'${parentName.endsWith("s") ? "" : "s"} Moons`;
    }
    if (this._hashRoute.includes(telescopeRouteSuffix)) {
      entityRoute = this._hashRoute.split(telescopeRouteSuffix)[0];
      const entityName = this._getNameFromEntityInfo(entityRoute);
      if (entityName) return `${entityName} Telescope Mode`;
    }
    if (this._hashRoute.includes(eventsRouteSuffix)) {
      const [targetRoute, eventRoute] = this._hashRoute.split(eventsRouteSuffix);
      entityRoute = targetRoute;
      const entityName = this._getNameFromEntityInfo(entityRoute);
      if (entityName) return eventRoute.slice(1) ? `${entityName} Event` : null;
    }
    if (this._hashRoute.includes(compareRouteSuffix)) {
      entityRoute = this._hashRoute.split(compareRouteSuffix)[0];
      const primaryEntityName = this._getNameFromEntityInfo(entityRoute);
      const comparisonEntityName = this._getNameFromEntityInfo(this._urlParams.get("id"));
      if (primaryEntityName) return comparisonEntityName
        ? `${primaryEntityName} compared to ${comparisonEntityName}` : `${primaryEntityName} Comparison`;
    }
    return this._getNameFromEntityInfo(entityRoute) || "Home";
  }

  /** 名称优先级与预加载目录一致：别名 → 展示名 → IAU 名称。 */
  _getNameFromEntityInfo(entityId) {
    const {altName, displayName, iauName} = this._entityInfo[entityId] || {};
    return altName || displayName || iauName;
  }

  /** 等待 400ms 淡出结束再移除 DOM，让过渡实际可见。 */
  hideLoadingScreen() {
    if (!this._loadingScreenEl) return;
    this._loadingScreenEl.classList.remove("show");
    this._loadingScreenEl.style.transition = "opacity 0.4s ease-out";
    this._loadingScreenEl.style.opacity = "0";
    setTimeout(() => this._loadingScreenEl.remove(), 400);
  }

  updateEmbedLoadPercent(loadPercent) {
    this._embedEl?.style.setProperty("--load-percent", `${loadPercent}%`);
  }

  get embedLoading() {
    return this._embedEl?.classList.contains("loading");
  }
}

const preloadManager = new PreloadManager();
const preloadInterface = {
  hideLoadingScreen: preloadManager.hideLoadingScreen.bind(preloadManager),
  showEmbedViewButton: preloadManager.showEmbedViewButton.bind(preloadManager),
  updateEmbedLoadPercent: preloadManager.updateEmbedLoadPercent.bind(preloadManager),
  get embedLoading() {
    return preloadManager.embedLoading;
  }
};
export {preloadInterface as default};
