/** @eyes-analysis
 * 文件职责：对象特征页资源与描述加载
 * 依据：imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js；manager dependencies: content, router, scene, layer, selection
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1386007-1390310.
import * as Eyes from "../../framework/eyes/index.js";
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：对象特征页资源与描述加载；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：FeatureView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeatureView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.getManager；写入 _entityInfo, _entityDesc, _featureDesc, _featureInfo, _forceLoadEntities。
   * 状态写入：_entityDesc、_entityInfo、_featureDesc、_featureInfo、_forceLoadEntities、_rules.feature、_rules.spaceObject。
   * 调用线索：super、this._app.getManager、this._app.getManager("content").getEntityInfo。
   */
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
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
   * 状态写入：_offsetPanel。
   * 调用线索：super.onEnter、this._app.getComponent。
   */
  async onEnter(t) {
    const e = this._app.getComponent("contentPanel");
    this._offsetPanel = e;
    await super.onEnter(t, e?.components);
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
   * 调用线索：contentPanelComponent.registerCallback、super.registerCallbacks、this._app.getComponent。
   */
  registerCallbacks() {
    super.registerCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.registerCallback("visiblechange", this.updateVisibility), contentPanelComponent.registerCallback("expandtoggle", this.updateVisibility), contentPanelComponent.registerCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
   * 调用线索：contentPanelComponent.removeCallback、super.removeCallbacks、this._app.getComponent。
   */
  removeCallbacks() {
    super.removeCallbacks();
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent && (contentPanelComponent.removeCallback("visiblechange", this.updateVisibility), contentPanelComponent.removeCallback("expandtoggle", this.updateVisibility), contentPanelComponent.removeCallback("overlay", this.updateVisibility));
  }
  /** @eyes-analysis
   * 重置上一目标留下的临时状态；调用 super._reset；写入 _entityInfo, _entityDesc, _featureDesc, _featureInfo, _forceLoadEntities, _target。
   * 状态写入：_entityDesc、_entityInfo、_featureDesc、_featureInfo、_forceLoadEntities、_target。
   * 调用线索：super._reset。
   */
  _reset(t) {
    super._reset(t);
    this._entityInfo = null;
    this._entityDesc = null;
    this._featureDesc = null;
    this._featureInfo = {};
    this._forceLoadEntities = [];
    this._target = t.spaceObject;
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this._app.getManager, this._handleError, this.app.getManager, this._forceLoadEntities.push, this._app.cameraScripts.isBarycenter, this._app.cameraScripts.removeBarycenter, Manager.setEntitiesForceVisible, this._app.scene.waitTillEntitiesInPlace, Eyes.AppUtils.deepCopy；写入 _entityInfo, _featureInfo, _entityDesc, _featureDesc。
   * 状态写入：_entityDesc、_entityInfo、_featureDesc、_featureInfo。
   * 调用线索：Eyes.AppUtils.deepCopy、i.filter、i.map、sceneManager.setEntitiesForceVisible、t.slice等。
   */
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
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, PanelComponent.onRouteChangeFeature, PanelComponent.show, PanelComponent.collapse。
   * 调用线索：contentPanelComponent.collapse、contentPanelComponent.onRouteChangeFeature、contentPanelComponent.show、super._updateComponents、this._app.getComponent等。
   */
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
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this._app.getComponent, this._app.cameraScripts.goToSystem, this.app.getManager。
   * 调用线索：contentPanelComponent?.isEnabled、this._app.cameraScripts.goToSystem、this._app.getComponent、this.app.getManager、this.app.getManager("scene").setEntitiesForceVisible。
   */
  async _updateCamera(t) {
    const contentPanelComponent = this._app.getComponent("contentPanel");
    contentPanelComponent?.isEnabled() || (await this._app.cameraScripts.goToSystem(this._target));
    this.app.getManager("scene").setEntitiesForceVisible(this._forceLoadEntities, true);
  }
  /** @eyes-analysis
   * 根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、this._app.getComponent、this._app.getComponent("contentPanel")?.getState。
   */
  _shouldHideControls() {
    const t = this._app.getComponent("contentPanel")?.getState("isVisible");
    const e = this._app.getComponent("contentPanel")?.getState("isExpanded");
    return Eyes.AppUtils.isMobileMode() && t && e;
  }
}
export { FeatureView };
