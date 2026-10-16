// Recovered from app.js:1390311-1392305.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class HomeView extends ExtendedBaseView.default {
  async onEnter(routeParams) {
    const featuredPanel = this._app.getComponent("featuredStoriesPanel");
    this._offsetPanel = featuredPanel;
    const preservedComponents = featuredPanel?.components ?? [];
    await super.onEnter(routeParams, preservedComponents);
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.registerCallback("visiblechange", this.updateVisibility);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.removeCallback("visiblechange", this.updateVisibility);
  }
  // 精选故事在深拷贝目录上标记外部或内部链接类型，避免污染 content 管理器共享目录。
  async _updateResources(routeParams) {
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : [], false);
    this._app.getManager("time").resetLimits();
    this._app.getManager("layer").setTarget("");
    const storyCatalog = Eyes.AppUtils.deepCopy(this._app.getManager("content").getStoryList());
    this._featuredCardsList = [];
    storyCatalog.featured.forEach(storyId => {
      void 0 !== storyCatalog.stories[storyId] ? this._featuredCardsList.push(storyCatalog.stories[storyId]) : storyCatalog.external && void 0 !== storyCatalog.external[storyId] ? (storyCatalog.external[storyId].isExternal = true, this._featuredCardsList.push(storyCatalog.external[storyId])) : void 0 !== storyCatalog.internal[storyId] && (storyCatalog.internal[storyId].isInternal = true, this._featuredCardsList.push(storyCatalog.internal[storyId]));
    });
  }
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    const {
      embed: embed,
      locked: locked
    } = this._app.getManager("router").configs;
    const featuredStoriesPanelComponent = this._app.getComponent("featuredStoriesPanel");
    featuredStoriesPanelComponent && (!locked && null !== this._featuredCardsList && this._featuredCardsList.length > 0 ? (await featuredStoriesPanelComponent.onRouteChange(routeParams, this._featuredCardsList), embed ? featuredStoriesPanelComponent.hide() : featuredStoriesPanelComponent.show()) : (featuredStoriesPanelComponent.hide(), featuredStoriesPanelComponent.setEnabled(false)), await this._app.getComponent("mobileExpandButton")?.showCPButton(true, "featuredStoriesPanel"));
    await this._app.getComponent("breadcrumb")?.onRouteChange(routeParams);
  }
  async _updateCamera(routeParams) {
    await this._app.cameraScripts.goToSystem("inner_solar_system");
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : ["c_2025_n1"], true);
  }
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && this._app.getComponent("featuredStoriesPanel")?.getState("isVisible");
  }
}
export { HomeView };
