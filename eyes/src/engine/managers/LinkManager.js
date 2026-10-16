// Recovered from app.js:1404707-1405383.
/* 链接策略按当前视图与搜索类型选择路径、to 或 followId 查询；事件切换目标时移除旧查询，保持同目标则保留时间。cameraFollow 开启时非桌面搜索优先成为跟随查询。 */
import * as Eyes from "../../framework/eyes/index.js";
class LinkManager extends Eyes.BaseManager {
  getParsedLink(selectedLink, searchType) {
    const routerManager = this._app.getManager("router");
    const entityId = selectedLink.startsWith("/") ? selectedLink.slice(1) : selectedLink;
    const {
      currentView: currentView
    } = routerManager;
    const {
      params: params
    } = routerManager.currentRoute || {};
    const parsedLink = {
      path: `/${entityId}`
    };
    if ("event" === currentView) {
      const targetChanged = params?.spaceObject !== entityId;
      parsedLink.options = targetChanged ? {
        __remove: "all"
      } : {
        keepTime: true
      };
    }
    const {
      isEnabled: isEnabled
    } = this.app.getManager("cameraFollow") || {};
    const useFollowQuery = "desktop" !== searchType && isEnabled;
    isEnabled && (parsedLink.options = {
      __remove: "all"
    });
    "distanceSource" === searchType ? parsedLink.path = `${parsedLink.path}/distance` : "distanceTarget" === searchType || "distance" === currentView ? (delete parsedLink.path, parsedLink.query = {
      to: entityId
    }) : useFollowQuery && (delete parsedLink.path, delete parsedLink.options, parsedLink.query = {
      followId: entityId
    });
    return parsedLink;
  }
}
export { LinkManager };
