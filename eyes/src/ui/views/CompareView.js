/** @eyes-analysis
 * 文件职责：对象比较模式和照片模式切换
 * 依据：imports: ./ExtendedBaseView.js, ../../framework/eyes/index.js, ../../data/Unidentified775.json；manager dependencies: content, time, layer, comparison, router, camera
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1360626-1363885.
import * as ExtendedBaseView from "./ExtendedBaseView.js";
import * as Eyes from "../../framework/eyes/index.js";
import Unidentified775 from "../../data/Unidentified775.json";
const r = {
  metric: {
    radius: {
      unit: "KM",
      small: {
        unit: "M",
        multiplier: Eyes.AppUtils.conversionTable.kmToM
      }
    }
  },
  imperial: {
    radius: {
      unit: "MI",
      multiplier: Eyes.AppUtils.conversionTable.kmToMi,
      small: {
        unit: "FT",
        multiplier: Eyes.AppUtils.conversionTable.kmToFt
      }
    }
  }
};
/** @eyes-analysis
 * 类职责：对象比较模式和照片模式切换；继承 ExtendedBaseView.default
 * 继承：ExtendedBaseView.default；导出：CompareView。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CompareView extends ExtendedBaseView.default {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._validQueries.push, this._app.getManager, this.bindFunctions；写入 defaultConfig, _category, _compare。
   * 状态写入：_category、_compare、_rules.spaceObject、defaultConfig。
   * 调用线索：super、this._app.getManager、this._app.getManager("content").getEntityInfo、this._validQueries.push、this.bindFunctions。
   */
  constructor(...t) {
    super(...t);
    this._validQueries.push("id");
    this._rules.spaceObject = {
      value: t => null !== this._app.getManager("content").getEntityInfo(t)
    };
    this.defaultConfig = null;
    this._category = "";
    this._compare = null;
    this.bindFunctions(["togglePhotoMode"]);
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 super.onEnter, this._app.getManager, this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、super.onEnter、this._app.getComponent、this._app.getComponent("menu")?.setEnabled、this._app.getManager等。
   */
  async onEnter(t) {
    await super.onEnter(t);
    this._app.getManager("time").resetLimits();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  /** @eyes-analysis
   * 按目标和路由准备数据及实体；调用 this._app.getManager；写入 _category。
   * 状态写入：_category。
   * 调用线索：this._app.getManager、this._app.getManager("content").getEntityInfo、this._app.getManager("layer").setTarget。
   */
  async _updateResources(t) {
    this._app.getManager("layer").setTarget("");
    const e = this._app.getManager("content").getEntityInfo(t.spaceObject);
    this._category = e.category;
  }
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this._app.getComponent, this._app.getManager；写入 _compare, _compareTo, _entityInfo, _compareEntityInfo。
   * 状态写入：_compare、_compareEntityInfo、_compareTo、_entityInfo。
   * 调用线索：s.filter、super.processQuery、this._app.getComponent、this._app.getComponent("comparison").clearLeftPanelText、this._app.getComponent("comparison").clearRightPanelText等。
   */
  async processQuery(t) {
    await super.processQuery(t);
    const {
      spaceObject: e,
      id: id
    } = t;
    let s = Unidentified775.default;
    this._category && Unidentified775[this._category] && (s = Unidentified775[this._category]);
    s = s.filter(t => t !== e);
    const compareTo = id || s[0];
    e !== this._compare && this._app.getComponent("comparison").clearLeftPanelText(e);
    this._compare = e;
    this._compareTo = compareTo;
    this._entityInfo = this._app.getManager("content").getEntityInfo(this._compare);
    this._compareEntityInfo = this._app.getManager("content").getEntityInfo(this._compareTo);
    this._app.getComponent("comparison").clearRightPanelText(compareTo);
    await this._app.getManager("comparison").compare(e, compareTo);
    this._app.getComponent("comparison").setup({
      list: s,
      name: e,
      compare: compareTo,
      unitConverter: r,
      ...t
    });
  }
  /** @eyes-analysis
   * 把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, Component.getConfig, Eyes.AppUtils.deepCopy, Component.setConfig；写入 defaultConfig。
   * 状态写入：defaultConfig。
   * 调用线索：Eyes.AppUtils.deepCopy、settingsComponent.getConfig、settingsComponent.setConfig、super._updateComponents、this._app.getComponent等。
   */
  async _updateComponents(t) {
    super._updateComponents(t);
    const e = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...t,
      routeParts: e
    });
    this._app.getComponent("settings").toggleLightOptions("flood");
    const settingsComponent = this._app.getComponent("settings");
    if (settingsComponent) {
      const t = settingsComponent.getConfig();
      this.defaultConfig = Eyes.AppUtils.deepCopy(t);
      t.advancedSettings = false;
      t.allowGuidedCamera = false;
      t.allowZoom = true;
      t.allowLayers = false;
      t.allowInfoPanel = false;
      t.allowToggleUnit = true;
      t.allowPhotoMode = true;
      t.zoomIn = this._app.getManager("comparison").zoomIn;
      t.zoomOut = this._app.getManager("comparison").zoomOut;
      settingsComponent.setConfig(t);
    }
    this._app.getComponent("settings").getState("isPhotoMode") && this._app.getComponent("settings").togglePhotoMode();
  }
  /** @eyes-analysis
   * 执行 togglePhotoMode 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("comparison").hide、this._app.getComponent("comparison").show、this._app.getComponent("settings").collapse。
   */
  togglePhotoMode(t) {
    t ? (this._app.getComponent("settings").collapse(), this._app.getComponent("comparison").hide()) : this._app.getComponent("comparison").show();
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getManager, this._app.getComponent, Component.setConfig；写入 _compare。
   * 状态写入：_compare、defaultConfig.zoomIn、defaultConfig.zoomOut。
   * 调用线索：settingsComponent.setConfig、super.onLeave、this._app.getComponent、this._app.getManager、this._app.getManager("comparison").exit等。
   */
  onLeave(t) {
    super.onLeave(t);
    this._app.getManager("comparison").exit();
    this._compare = null;
    this._app.getManager("time").resetLimits();
    const settingsComponent = this._app.getComponent("settings");
    settingsComponent && this.defaultConfig && (this.defaultConfig.zoomIn = this._app.getManager("camera").zoomIn, this.defaultConfig.zoomOut = this._app.getManager("camera").zoomOut, settingsComponent.setConfig(this.defaultConfig));
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this._app.getComponent, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、super.resize、this._app.getComponent、this._app.getComponent("menu")?.setEnabled。
   */
  resize() {
    super.resize();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  /** @eyes-analysis
   * 登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent。
   * 调用线索：super.registerCallbacks、this._app.getComponent、this._app.getComponent("settings").registerCallback。
   */
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getComponent("settings").registerCallback("photomodechange", this.togglePhotoMode);
  }
  /** @eyes-analysis
   * 移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent。
   * 调用线索：super.removeCallbacks、this._app.getComponent、this._app.getComponent("settings").removeCallback。
   */
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getComponent("settings").removeCallback("photomodechange", this.togglePhotoMode);
  }
}
export { CompareView };
