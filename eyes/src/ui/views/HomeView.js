/** @eyes-analysis
 * 文件职责：首页精选故事、默认目标及全景相机流程
 * 依据：imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js；manager dependencies: scene, time, layer, content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1390311-1392305.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：首页精选故事、默认目标及全景相机流程；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：HomeView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class HomeView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
   * 状态写入：_offsetPanel。
   * 调用线索：super.onEnter、this._app.getComponent。
   */
  async onEnter(t) {
    const e = this._app.getComponent("featuredStoriesPanel");
    this._offsetPanel = e;
    const i = e?.components ?? [];
    await super.onEnter(t, i);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent。
   * 调用线索：super.registerCallbacks、this._app.getComponent、this._app.getComponent("featuredStoriesPanel")?.registerCallback。
   */
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.registerCallback("visiblechange", this.updateVisibility);
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent。
   * 调用线索：super.removeCallbacks、this._app.getComponent、this._app.getComponent("featuredStoriesPanel")?.removeCallback。
   */
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.removeCallback("visiblechange", this.updateVisibility);
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this.app.getManager, this._app.getManager, Eyes.AppUtils.deepCopy, this._featuredCardsList.push；写入 _featuredCardsList。
   * 状态写入：_featuredCardsList。
   * 调用线索：Eyes.AppUtils.deepCopy、e.featured.forEach、this._app.getManager、this._app.getManager("content").getStoryList、this._app.getManager("layer").setTarget等。
   */
  async _updateResources(t) {
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : [], false);
    this._app.getManager("time").resetLimits();
    this._app.getManager("layer").setTarget("");
    const e = Eyes.AppUtils.deepCopy(this._app.getManager("content").getStoryList());
    this._featuredCardsList = [];
    e.featured.forEach(t => {
      void 0 !== e.stories[t] ? this._featuredCardsList.push(e.stories[t]) : e.external && void 0 !== e.external[t] ? (e.external[t].isExternal = true, this._featuredCardsList.push(e.external[t])) : void 0 !== e.internal[t] && (e.internal[t].isInternal = true, this._featuredCardsList.push(e.internal[t]));
    });
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, this._app.getComponent, StoriesPanelComponent.onRouteChange, StoriesPanelComponent.hide, StoriesPanelComponent.show, StoriesPanelComponent.setEnabled。
   * 调用线索：featuredStoriesPanelComponent.hide、featuredStoriesPanelComponent.onRouteChange、featuredStoriesPanelComponent.setEnabled、featuredStoriesPanelComponent.show、super._updateComponents等。
   */
  async _updateComponents(t) {
    super._updateComponents(t);
    const {
      embed: embed,
      locked: locked
    } = this._app.getManager("router").configs;
    const featuredStoriesPanelComponent = this._app.getComponent("featuredStoriesPanel");
    featuredStoriesPanelComponent && (!locked && null !== this._featuredCardsList && this._featuredCardsList.length > 0 ? (await featuredStoriesPanelComponent.onRouteChange(t, this._featuredCardsList), embed ? featuredStoriesPanelComponent.hide() : featuredStoriesPanelComponent.show()) : (featuredStoriesPanelComponent.hide(), featuredStoriesPanelComponent.setEnabled(false)), await this._app.getComponent("mobileExpandButton")?.showCPButton(true, "featuredStoriesPanel"));
    await this._app.getComponent("breadcrumb")?.onRouteChange(t);
  }
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this._app.cameraScripts.goToSystem, this.app.getManager。
   * 调用线索：this._app.cameraScripts.goToSystem、this.app.getManager、this.app.getManager("scene").setEntitiesForceVisible。
   */
  async _updateCamera(t) {
    await this._app.cameraScripts.goToSystem("inner_solar_system");
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : ["c_2025_n1"], true);
  }
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent。
   * 调用线索：Eyes.AppUtils.isMobileMode、this._app.getComponent、this._app.getComponent("featuredStoriesPanel")?.getState。
   */
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && this._app.getComponent("featuredStoriesPanel")?.getState("isVisible");
  }
}
export { HomeView };
