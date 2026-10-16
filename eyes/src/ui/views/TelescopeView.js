// Recovered from app.js:1665371-1666468.
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class TelescopeView extends ExtendedBaseView.default {
  async onEnter(routeParams, preservedComponents = []) {
    await super.onEnter(routeParams, preservedComponents);
    await this._app.getComponent("telescope").onEnter(routeParams);
  }
  // 望远镜组件先接收路由，再执行基类的资源与相机生命周期；查询参数和退出通知也转交同一组件，保持其状态所有权。
  async onRouteChange(routeParams) {
    await this._app.getComponent("telescope").onRouteChange(routeParams);
    await super.onRouteChange(routeParams);
  }
  async _updateResources(routeParams) {
    this._target = routeParams.spaceObject;
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : [], false);
  }
  async processQuery(routeParams) {
    await super.processQuery(routeParams);
    this._app.getComponent("telescope").processQuery(routeParams);
  }
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    this._entityInfo = this._app.getManager("content").getEntityInfo(routeParams.spaceObject);
    const routeParts = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts
    });
  }
  async _updateCamera(routeParams) {
    const requiredEntityIds = null !== this._target ? [this._target] : [];
    this.app.getManager("scene").setEntitiesForceVisible(requiredEntityIds, true);
  }
  async onLeave(routeParams) {
    await super.onLeave(routeParams);
    this._app.getComponent("telescope").onLeave(routeParams);
  }
}
export { TelescopeView };
