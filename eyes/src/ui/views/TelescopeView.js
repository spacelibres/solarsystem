// Recovered from app.js:1665371-1666468.
import * as ExtendedBaseView from "./ExtendedBaseView.js";
class TelescopeView extends ExtendedBaseView.default {
  async onEnter(t, e = []) {
    await super.onEnter(t, e);
    await this._app.getComponent("telescope").onEnter(t);
  }
  async onRouteChange(t) {
    await this._app.getComponent("telescope").onRouteChange(t);
    await super.onRouteChange(t);
  }
  async _updateResources(t) {
    this._target = t.spaceObject;
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : [], false);
  }
  async processQuery(t) {
    await super.processQuery(t);
    this._app.getComponent("telescope").processQuery(t);
  }
  async _updateComponents(t) {
    super._updateComponents(t);
    this._entityInfo = this._app.getManager("content").getEntityInfo(t.spaceObject);
    const e = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: e
    });
  }
  async _updateCamera(t) {
    const e = null !== this._target ? [this._target] : [];
    this.app.getManager("scene").setEntitiesForceVisible(e, true);
  }
  async onLeave(t) {
    await super.onLeave(t);
    this._app.getComponent("telescope").onLeave(t);
  }
}
export { TelescopeView };
