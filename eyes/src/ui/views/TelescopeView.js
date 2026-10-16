/** @eyes-analysis
 * 文件职责：将路由生命周期转交望远镜组件
 * 依据：imports: ./ExtendedBaseView.js；manager dependencies: scene, content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1665371-1666468.
import * as ExtendedBaseView from "./ExtendedBaseView.js";
/** @eyes-analysis
 * 类职责：将路由生命周期转交望远镜组件；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：TelescopeView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TelescopeView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 super.onEnter, this._app.getComponent。
   * 调用线索：super.onEnter、this._app.getComponent、this._app.getComponent("telescope").onEnter。
   */
  async onEnter(t, e = []) {
    await super.onEnter(t, e);
    await this._app.getComponent("telescope").onEnter(t);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getComponent, super.onRouteChange。
   * 调用线索：super.onRouteChange、this._app.getComponent、this._app.getComponent("telescope").onRouteChange。
   */
  async onRouteChange(t) {
    await this._app.getComponent("telescope").onRouteChange(t);
    await super.onRouteChange(t);
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this.app.getManager；写入 _target。
   * 状态写入：_target。
   * 调用线索：this.app.getManager、this.app.getManager("scene").setEntitiesForceVisible。
   */
  async _updateResources(t) {
    this._target = t.spaceObject;
    this.app.getManager("scene").setEntitiesForceVisible(null !== this._target ? [this._target] : [], false);
  }
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this._app.getComponent。
   * 调用线索：super.processQuery、this._app.getComponent、this._app.getComponent("telescope").processQuery。
   */
  async processQuery(t) {
    await super.processQuery(t);
    this._app.getComponent("telescope").processQuery(t);
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent；写入 _entityInfo。
   * 状态写入：_entityInfo。
   * 调用线索：super._updateComponents、this._app.getComponent、this._app.getComponent("breadcrumb").onRouteChange、this._app.getManager、this._app.getManager("content").getEntityInfo等。
   */
  async _updateComponents(t) {
    super._updateComponents(t);
    this._entityInfo = this._app.getManager("content").getEntityInfo(t.spaceObject);
    const e = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: e
    });
  }
  /** @eyes-analysis
   * 按当前模式定位相机与目标；调用 this.app.getManager。
   * 调用线索：this.app.getManager、this.app.getManager("scene").setEntitiesForceVisible。
   */
  async _updateCamera(t) {
    const e = null !== this._target ? [this._target] : [];
    this.app.getManager("scene").setEntitiesForceVisible(e, true);
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getComponent。
   * 调用线索：super.onLeave、this._app.getComponent、this._app.getComponent("telescope").onLeave。
   */
  async onLeave(t) {
    await super.onLeave(t);
    this._app.getComponent("telescope").onLeave(t);
  }
}
export { TelescopeView };
