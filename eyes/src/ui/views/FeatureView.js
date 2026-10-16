// Recovered from app.js:1386007-1390310.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class FeatureView extends ExtendedBaseView.default {
  constructor(...t) {
    super(...t);
    this._rules.spaceObject = {
      value: t => null !== this._app.getManager("content").getEntityInfo(t)
    };
    this._rules.feature = {
      value: t => {
        const e = this._app.getManager("router").currentRoute.params.spaceObject;
        const i = this._app.getManager("content").getEntityInfo(e);
        return !("moons" === t && !i.hasMoons);
      }
    };
    this._entityInfo = null;
    this._entityDesc = null;
    this._featureDesc = null;
    this._featureInfo = {};
    this._forceLoadEntities = [];
  }
  async onEnter(t) {
    const e = this._app.getComponent("contentPanel");
    this._offsetPanel = e;
    await super.onEnter(t, e?.components);
  }
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  _reset(t) {
    super._reset(t);
    this._entityInfo = null;
    this._entityDesc = null;
    this._featureDesc = null;
    this._featureInfo = {};
    this._forceLoadEntities = [];
    this._target = t.spaceObject;
  }
  async _updateResources(t) {
    const e = this._app.getManager("content").getEntityList();
    if (this._entityInfo = this._app.getManager("content").getEntityInfo(this._target), null === this._entityInfo) return void this._handleError(`FeatureView._updateResources: Cannot find entity named ${this._target}.`);
    this._app.getManager("content").resetContext();
    const sceneManager = this.app.getManager("scene");
    switch (null !== this._target && this._forceLoadEntities.push(this._target), this._app.cameraScripts.isBarycenter(this._target) && this._forceLoadEntities.push(this._app.cameraScripts.removeBarycenter(this._target)), sceneManager.setEntitiesForceVisible(this._forceLoadEntities, false), await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities), this._app.getManager("layer").setTarget(this._target), this._app.getManager("selection").selectEntity(this._target), t.feature) {
      case "moons":
        {
          const t = await this._app.getManager("content").getEntityDesc(this._target);
          let i = [];
          if (null !== t && (i = t.featuredMoons, i && i.length > 0)) {
            i = i.filter(t => t in e);
            const t = i.map(t => {
              const e = this._app.getManager("content").getEntityInfo(t);
              return {
                title: e.displayName || e.iauName,
                url: `${this._app.getManager("router").currentRoute.url}/${t}`
              };
            });
            const s = 5;
            const n = t.length > s ? s : t.length;
            this._featureInfo = {
              initial: t.slice(0, n),
              more: n === s ? t.slice(n) : []
            };
          }
          break;
        }
      default:
        return void this._handleError(`FeatureView._updateResources: Unrecognized feature - ${t.feature}.`);
    }
    if (this._featureInfo.initial && 0 === this._featureInfo.initial.length) return void this._handleError(`FeatureView._updateResources: No data to display for ${this._target}'s ${t.feature}.`);
    const n = `${this._target}_${t.feature}`;
    await this._app.getManager("content").loadDescriptions([this._target, n]);
    t.cancelToken.isCanceled || (null !== this._app.getManager("content").context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context[this._target])), this._featureDesc = this._app.getManager("content").context[n] ? Eyes.AppUtils.deepCopy(this._app.getManager("content").context[n]) : {
      title: `${this._entityInfo.displayName || this._entityInfo.iauName}'s ${t.feature}`
    });
  }
  async _updateComponents(t) {
    super._updateComponents(t);
    const e = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: e
    });
    const contentPanelComponent = this._app.getComponent("contentPanel");
    if (contentPanelComponent) {
      const s = true === t.embed || false === t.detailPanel;
      await contentPanelComponent.onRouteChangeFeature(this._target, this._entityInfo, this._featureInfo, this._featureDesc, t.cancelToken, e);
      contentPanelComponent.show();
      s && contentPanelComponent.collapse();
    }
  }
  async _updateCamera(t) {
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent?.isEnabled() || (await this._app.cameraScripts.goToSystem(this._target));
    this.app.getManager("scene").setEntitiesForceVisible(this._forceLoadEntities, true);
  }
  _shouldHideControls() {
    const t = this._app.getComponent("contentPanel")?.getState("isVisible");
    const e = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && t && e;
  }
}
export { FeatureView };
