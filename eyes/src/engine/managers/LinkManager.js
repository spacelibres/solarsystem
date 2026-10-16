/** @eyes-analysis
 * 文件职责：解析实体链接及路由目标，为选择/内容导航提供映射。
 * 依据：import ../../framework/eyes/index.js；LinkManager extends Eyes.BaseManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1404707-1405383.
import * as Eyes from "../../framework/eyes/index.js";
/** @eyes-analysis
 * 类职责：解析实体链接及路由目标，为选择/内容导航提供映射。
 * 继承：Eyes.BaseManager；导出：LinkManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LinkManager extends Eyes.BaseManager {
  /** @eyes-analysis
   * 【结构证据】返回 `r`；调用 `t.slice`、`t.startsWith`、`this._app.getManager`、`this.app.getManager`。
   * 调用线索：t.slice、t.startsWith、this._app.getManager、this.app.getManager。
   */
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
