// Recovered from app.js:1405384-1405626.
import * as Eyes from "../../framework/eyes/index.js";
class LabelManager extends Eyes.LabelManager {
  _getLink(t) {
    const e = super._getLink(t);
    return this._app.getManager("link")?.getParsedLink?.(e) || e;
  }
}
export { LabelManager };
