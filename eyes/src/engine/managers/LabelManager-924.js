// Recovered from app.js:1405384-1405626.
/* 应用标签管理器继承通用标签逻辑，只把基类实体链接交给应用 link 管理器解析，保留动态跟随/测距路由语义。 */
import * as Eyes from "../../framework/eyes/index.js";
class LabelManager extends Eyes.LabelManager {
  _getLink(entityId) {
    const baseLink = super._getLink(entityId);
    return this._app.getManager("link")?.getParsedLink?.(baseLink) || baseLink;
  }
}
export { LabelManager };
