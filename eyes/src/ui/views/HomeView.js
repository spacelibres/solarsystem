// Recovered from app.js:1390311-1392305.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class HomeView extends ExtendedBaseView.default {
  async onEnter(t) {
    const e = this._app.getComponent("featuredStoriesPanel");
    this._offsetPanel = e;
    const i = e?.components ?? [];
    await super.onEnter(t, i);
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.registerCallback("visiblechange", this.updateVisibility);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getComponent("featuredStoriesPanel")?.removeCallback("visiblechange", this.updateVisibility);
  }
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
  async _updateCamera(t) {
    await this._app.cameraScripts.goToSystem("inner_solar_system");
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : ["c_2025_n1"], true);
  }
  _shouldHideControls() {
    return Eyes.AppUtils.isMobileMode() && this._app.getComponent("featuredStoriesPanel")?.getState("isVisible");
  }
}
export { HomeView };
