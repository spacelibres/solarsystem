// Recovered from app.js:1546674-1550315.
import "../../vendor/modules/Unidentified989.cjs";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedStoriesPanelTemplate from "../templates/FeaturedStoriesPanelTemplate.html";
import "../../styles/extracted/FeaturedStoriesPanelStyles.js";
var getFeaturedStoriesPanelTemplate = () => FeaturedStoriesPanelTemplate;
/* 面板拥有 featuredStoryBlock 和滚动条；路由取消后不启用故事块。显隐同时通知当前视图调整视口，并同步移动展开按钮与可访问标签。 */
class FeaturedStoriesPanel extends Eyes.BaseComponent {
  constructor(app, options) {
    super(app, null, {
      title: "Featured Stories",
      isOverlay: false,
      isOverlayClass: "",
      isOpenTitleClass: "open",
      isOpenButtonClass: "open",
      ...options
    });
    this._class.isOverlay = {
      true: "overlay",
      false: ""
    };
    this._class.isOpen = {
      true: "open",
      false: "closed"
    };
    this._collapseMobile = "icon-collapse";
    this._expandMobile = "icon-expand";
    this._collapseDesktop = "icon-collapse-side";
    this._expandDesktop = "icon-expand-side";
    this._defaultState = {
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile
    };
    this._state.desktopIconName = this._collapseDesktop;
    this._state.mobileIconName = this._collapseMobile;
    this._components = ["featuredStoryBlock"];
    this._eventNames.push("overlay", "expandtoggle");
    this._initCallbacks();
    this._scrollbar = null;
    this._currentId = "";
    this._storyBlock = null;
    this.bindFunctions(["onClickShowCollapse", "showOverlay", "hideOverlay", "handleLayerToggle"]);
  }
  async init() {
    super.init();
    this._storyBlock = await this._app.addComponentWithPlaceholder({
      type: SolarSystemPublicApi.FeaturedStoryBlock,
      name: "featuredStoryBlock"
    }, this._element);
    this._isLandscape = Eyes.AppUtils.isLandscape();
    this._callbackRegistry.push({
      emitter: this._app.getManager("layer"),
      event: "toggleLayer",
      callback: this.handleLayerToggle
    });
  }
  _onRouteChange() {
    this.isEnabled() && this._disableAllComponents();
  }
  async onRouteChange(cancelToken, featuredStories) {
    if (!cancelToken || !cancelToken.isCanceled) {
      if (this._onRouteChange(), featuredStories && featuredStories.length > 0) {
        if (await this._storyBlock.onRouteChange("home", "", featuredStories, cancelToken), cancelToken && cancelToken.isCanceled) return;
        this._storyBlock.setEnabled(true);
      }
      this._scrollbar ? this._scrollbar.scroll(0) : this._scrollbar = Eyes.AppUtils.addScrollbar(document.getElementById("content-body"));
    }
  }
  showOverlay() {
    this.setState({
      isOverlay: true,
      isOverlayClass: this._class.isOverlay.true,
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile
    }, () => this.triggerCallbacks("overlay", [this._state.isOverlay]));
  }
  hideOverlay() {
    this.setState({
      isOverlay: false,
      isOverlayClass: this._class.isOverlay.false,
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile
    }, () => this.triggerCallbacks("overlay", [this._state.isOverlay]));
  }
  onClickShowCollapse() {
    this._state.isVisible ? this._state.isOverlay && Eyes.AppUtils.isMobileMode() ? this.hideOverlay() : this.hide() : this.show();
  }
  get shouldOffsetRight() {
    return Eyes.AppUtils.isDesktop();
  }
  show() {
    super.show();
    const {
      currentView: currentView
    } = this._app.getManager("router");
    this._app.getView(currentView)?.setViewportOffset(true);
    const {
      expandToggleBtn: expandToggleBtn
    } = this._children;
    expandToggleBtn.setAttribute("aria-label", "Collapse featured stories panel");
    this._app.getComponent("mobileExpandButton").showCPButton(false, "featuredStoriesPanel");
    this.setState({
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile,
      isOpenTitleClass: this._class.isOpen.true,
      isOpenButtonClass: this._class.isOpen.true
    });
  }
  hide() {
    super.hide();
    const {
      currentView: currentView
    } = this._app.getManager("router");
    this._app.getView(currentView)?.setViewportOffset(false);
    const {
      expandToggleBtn: expandToggleBtn
    } = this._children;
    expandToggleBtn.setAttribute("aria-label", "Expand featured stories panel");
    this._app.getComponent("mobileExpandButton").showCPButton(true, "featuredStoriesPanel");
    this.setState({
      desktopIconName: this._expandDesktop,
      mobileIconName: this._expandMobile,
      isOpenTitleClass: this._class.isOpen.false,
      isOpenButtonClass: this._class.isOpen.false
    });
  }
  handleLayerToggle(layerName, isVisible) {
    "ui" === layerName && (isVisible ? this.show() : this.hide());
  }
  _disableAllComponents() {
    this._components.forEach(componentName => {
      this._app.getComponent(componentName).setEnabled(false);
    });
  }
  reset() {
    this.setState(this._defaultState);
    this._currentId = "";
  }
  __disable() {
    this.reset();
    super.__disable();
  }
}
FeaturedStoriesPanel.html = getFeaturedStoriesPanelTemplate();
export { FeaturedStoriesPanel };
