// Recovered from app.js:1404707-1405383.
import * as Eyes from "../../framework/eyes/index.js";
class LinkManager extends Eyes.BaseManager {
  getParsedLink(t, e) {
    const routerManager = this._app.getManager("router");
    const s = t.startsWith("/") ? t.slice(1) : t;
    const {
      currentView: currentView
    } = routerManager;
    const {
      params: params
    } = routerManager.currentRoute || {};
    const r = {
      path: `/${s}`
    };
    if ("event" === currentView) {
      const t = params?.spaceObject !== s;
      r.options = t ? {
        __remove: "all"
      } : {
        keepTime: true
      };
    }
    const {
      isEnabled: isEnabled
    } = this.app.getManager("cameraFollow") || {};
    const l = "desktop" !== e && isEnabled;
    isEnabled && (r.options = {
      __remove: "all"
    });
    "distanceSource" === e ? r.path = `${r.path}/distance` : "distanceTarget" === e || "distance" === currentView ? (delete r.path, r.query = {
      to: s
    }) : l && (delete r.path, delete r.options, r.query = {
      followId: s
    });
    return r;
  }
}
export { LinkManager };
