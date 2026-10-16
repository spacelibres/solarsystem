// Recovered from app.js:1386007-1390310.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class FeatureView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._rules.spaceObject = {
      value: entityId => null !== this._app.getManager("content").getEntityInfo(entityId)
    };
    this._rules.feature = {
      value: featureName => {
        const entityId = this._app.getManager("router").currentRoute.params.spaceObject;
        const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
        return !("moons" === featureName && !entityInfo.hasMoons);
      }
    };
    this._entityInfo = null;
    this._entityDesc = null;
    this._featureDesc = null;
    this._featureInfo = {};
    this._forceLoadEntities = [];
  }
  async onEnter(routeParams) {
    const contentPanel = this._app.getComponent("contentPanel");
    this._offsetPanel = contentPanel;
    await super.onEnter(routeParams, contentPanel?.components);
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
  _reset(routeParams) {
    super._reset(routeParams);
    this._entityInfo = null;
    this._entityDesc = null;
    this._featureDesc = null;
    this._featureInfo = {};
    this._forceLoadEntities = [];
    this._target = routeParams.spaceObject;
  }
  // 当前仅实现 moons 特征：过滤不存在的目录条目，前五个作为首屏，其余交给更多列表。描述键由目标和特征共同组成。
  async _updateResources(routeParams) {
    const entityCatalog = this._app.getManager("content").getEntityList();
    if (this._entityInfo = this._app.getManager("content").getEntityInfo(this._target), null === this._entityInfo) return void this._handleError(`FeatureView._updateResources: Cannot find entity named ${this._target}.`);
    this._app.getManager("content").resetContext();
    const sceneManager = this.app.getManager("scene");
    switch (null !== this._target && this._forceLoadEntities.push(this._target), this._app.cameraScripts.isBarycenter(this._target) && this._forceLoadEntities.push(this._app.cameraScripts.removeBarycenter(this._target)), sceneManager.setEntitiesForceVisible(this._forceLoadEntities, false), await this._app.scene.waitTillEntitiesInPlace(this._forceLoadEntities), this._app.getManager("layer").setTarget(this._target), this._app.getManager("selection").selectEntity(this._target), routeParams.feature) {
      case "moons":
        {
          const entityDescription = await this._app.getManager("content").getEntityDesc(this._target);
          let featuredMoonIds = [];
          if (null !== entityDescription && (featuredMoonIds = entityDescription.featuredMoons, featuredMoonIds && featuredMoonIds.length > 0)) {
            featuredMoonIds = featuredMoonIds.filter(moonId => moonId in entityCatalog);
            const moonLinks = featuredMoonIds.map(moonId => {
              const moonInfo = this._app.getManager("content").getEntityInfo(moonId);
              return {
                title: moonInfo.displayName || moonInfo.iauName,
                url: `${this._app.getManager("router").currentRoute.url}/${moonId}`
              };
            });
            const initialMoonLimit = 5;
            const initialMoonCount = moonLinks.length > initialMoonLimit ? initialMoonLimit : moonLinks.length;
            this._featureInfo = {
              initial: moonLinks.slice(0, initialMoonCount),
              more: initialMoonCount === initialMoonLimit ? moonLinks.slice(initialMoonCount) : []
            };
          }
          break;
        }
      default:
        return void this._handleError(`FeatureView._updateResources: Unrecognized feature - ${routeParams.feature}.`);
    }
    if (this._featureInfo.initial && 0 === this._featureInfo.initial.length) return void this._handleError(`FeatureView._updateResources: No data to display for ${this._target}'s ${routeParams.feature}.`);
    const featureDescriptionId = `${this._target}_${routeParams.feature}`;
    await this._app.getManager("content").loadDescriptions([this._target, featureDescriptionId]);
    routeParams.cancelToken.isCanceled || (null !== this._app.getManager("content").context[this._target] && (this._entityDesc = Eyes.AppUtils.deepCopy(this._app.getManager("content").context[this._target])), this._featureDesc = this._app.getManager("content").context[featureDescriptionId] ? Eyes.AppUtils.deepCopy(this._app.getManager("content").context[featureDescriptionId]) : {
      title: `${this._entityInfo.displayName || this._entityInfo.iauName}'s ${routeParams.feature}`
    });
  }
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    const routeParts = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts
    });
    const contentPanelComponent = this._app.getComponent("contentPanel");
    if (contentPanelComponent) {
      const shouldCollapse = true === routeParams.embed || false === routeParams.detailPanel;
      await contentPanelComponent.onRouteChangeFeature(this._target, this._entityInfo, this._featureInfo, this._featureDesc, routeParams.cancelToken, routeParts);
      contentPanelComponent.show();
      shouldCollapse && contentPanelComponent.collapse();
    }
  }
  async _updateCamera(routeParams) {
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent?.isEnabled() || (await this._app.cameraScripts.goToSystem(this._target));
    this.app.getManager("scene").setEntitiesForceVisible(this._forceLoadEntities, true);
  }
  _shouldHideControls() {
    const isPanelVisible = this._app.getComponent("contentPanel")?.getState("isVisible");
    const isPanelExpanded = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && isPanelVisible && isPanelExpanded;
  }
}
export { FeatureView };
