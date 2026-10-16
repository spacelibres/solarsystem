/** @eyes-analysis
 * 文件职责：首页精选故事卡片面板
 * 依据：imports: ../../vendor/modules/Unidentified989.cjs, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedStoriesPanelTemplate.html, ../../styles/extracted/FeaturedStoriesPanelStyles.js；manager dependencies: layer, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1546674-1550315.
import "../../vendor/modules/Unidentified989.cjs";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedStoriesPanelTemplate from "../templates/FeaturedStoriesPanelTemplate.html";
import "../../styles/extracted/FeaturedStoriesPanelStyles.js";
var getFeaturedStoriesPanelTemplate = () => FeaturedStoriesPanelTemplate;
/** @eyes-analysis
 * 类职责：首页精选故事卡片面板；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：FeaturedStoriesPanel。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeaturedStoriesPanel extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _collapseMobile, _expandMobile, _collapseDesktop, _expandDesktop, _defaultState, _components, _scrollbar, _currentId, _storyBlock。
   * 状态写入：_class.isOpen、_class.isOverlay、_collapseDesktop、_collapseMobile、_components、_currentId、_defaultState、_expandDesktop等；完整记录见索引。
   * 调用线索：super、this._eventNames.push、this._initCallbacks、this.bindFunctions。
   */
  constructor(t, e) {
    super(t, null, {
      title: "Featured Stories",
      isOverlay: false,
      isOverlayClass: "",
      isOpenTitleClass: "open",
      isOpenButtonClass: "open",
      ...e
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._app.addComponentWithPlaceholder, Eyes.AppUtils.isLandscape, this._callbackRegistry.push, this._app.getManager；写入 _storyBlock, _isLandscape。
   * 状态写入：_isLandscape、_storyBlock。
   * 调用线索：Eyes.AppUtils.isLandscape、super.init、this._app.addComponentWithPlaceholder、this._app.getManager、this._callbackRegistry.push。
   */
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
  /** @eyes-analysis
   * 执行 _onRouteChange 对应的组件业务步骤；调用 this.isEnabled, this._disableAllComponents。
   * 调用线索：this._disableAllComponents、this.isEnabled。
   */
  _onRouteChange() {
    this.isEnabled() && this._disableAllComponents();
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._onRouteChange, this._storyBlock.onRouteChange, this._storyBlock.setEnabled, this._scrollbar.scroll, Eyes.AppUtils.addScrollbar；写入 _scrollbar。
   * 状态写入：_scrollbar。
   * 调用线索：Eyes.AppUtils.addScrollbar、document.getElementById、this._onRouteChange、this._scrollbar.scroll、this._storyBlock.onRouteChange等。
   */
  async onRouteChange(t, e) {
    if (!t || !t.isCanceled) {
      if (this._onRouteChange(), e && e.length > 0) {
        if (await this._storyBlock.onRouteChange("home", "", e, t), t && t.isCanceled) return;
        this._storyBlock.setEnabled(true);
      }
      this._scrollbar ? this._scrollbar.scroll(0) : this._scrollbar = Eyes.AppUtils.addScrollbar(document.getElementById("content-body"));
    }
  }
  /** @eyes-analysis
   * 执行 showOverlay 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  showOverlay() {
    this.setState({
      isOverlay: true,
      isOverlayClass: this._class.isOverlay.true,
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile
    }, () => this.triggerCallbacks("overlay", [this._state.isOverlay]));
  }
  /** @eyes-analysis
   * 执行 hideOverlay 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  hideOverlay() {
    this.setState({
      isOverlay: false,
      isOverlayClass: this._class.isOverlay.false,
      desktopIconName: this._collapseDesktop,
      mobileIconName: this._collapseMobile
    }, () => this.triggerCallbacks("overlay", [this._state.isOverlay]));
  }
  /** @eyes-analysis
   * 执行 onClickShowCollapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.hideOverlay, this.hide, this.show。
   * 调用线索：Eyes.AppUtils.isMobileMode、this.hide、this.hideOverlay、this.show。
   */
  onClickShowCollapse() {
    this._state.isVisible ? this._state.isOverlay && Eyes.AppUtils.isMobileMode() ? this.hideOverlay() : this.hide() : this.show();
  }
  /** @eyes-analysis
   * 执行 shouldOffsetRight 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
   * 调用线索：Eyes.AppUtils.isDesktop。
   */
  get shouldOffsetRight() {
    return Eyes.AppUtils.isDesktop();
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, this._app.getManager, this._app.getView, ToggleBtn.setAttribute, this._app.getComponent, this.setState。
   * 调用线索：expandToggleBtn.setAttribute、super.show、this._app.getComponent、this._app.getComponent("mobileExpandButton").showCPButton、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 super.hide, this._app.getManager, this._app.getView, ToggleBtn.setAttribute, this._app.getComponent, this.setState。
   * 调用线索：expandToggleBtn.setAttribute、super.hide、this._app.getComponent、this._app.getComponent("mobileExpandButton").showCPButton、this._app.getManager等。
   */
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
  /** @eyes-analysis
   * 执行 handleLayerToggle 对应的组件业务步骤；调用 this.show, this.hide。
   * 调用线索：this.hide、this.show。
   */
  handleLayerToggle(t, e) {
    "ui" === t && (e ? this.show() : this.hide());
  }
  /** @eyes-analysis
   * 执行 _disableAllComponents 对应的组件业务步骤；调用 this._components.forEach, this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent(t).setEnabled、this._components.forEach。
   */
  _disableAllComponents() {
    this._components.forEach(t => {
      this._app.getComponent(t).setEnabled(false);
    });
  }
  /** @eyes-analysis
   * 执行 reset 对应的组件业务步骤；调用 this.setState；写入 _currentId。
   * 状态写入：_currentId。
   * 调用线索：this.setState。
   */
  reset() {
    this.setState(this._defaultState);
    this._currentId = "";
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.reset, super.__disable。
   * 调用线索：super.__disable、this.reset。
   */
  __disable() {
    this.reset();
    super.__disable();
  }
}
FeaturedStoriesPanel.html = getFeaturedStoriesPanelTemplate();
export { FeaturedStoriesPanel };
