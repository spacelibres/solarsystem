// Recovered from app.js:1405627-1405885.
/* 应用选择管理器仅扩展链接解析，通用三维选择状态和 suppression 生命周期继续由父类拥有；不与另一同名类合并。 */
import * as Eyes from "../../framework/eyes/index.js";
class SelectionManager extends Eyes.SelectionManager {
  _getLink(entityId) {
    const baseLink = super._getLink(entityId);
    return this._app.getManager("link")?.getParsedLink?.(baseLink) || baseLink;
  }
}
export { SelectionManager };
