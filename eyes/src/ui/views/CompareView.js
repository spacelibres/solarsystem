// Recovered from app.js:1360626-1363885.
import * as ExtendedBaseView from "./ExtendedBaseView.js";
import * as Eyes from "../../framework/eyes/index.js";
import Unidentified775 from "../../data/Unidentified775.json";
const radiusUnitConverters = {
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
class CompareView extends ExtendedBaseView.default {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this._validQueries.push("id");
    this._rules.spaceObject = {
      value: entityId => null !== this._app.getManager("content").getEntityInfo(entityId)
    };
    this.defaultConfig = null;
    this._category = "";
    this._compare = null;
    this.bindFunctions(["togglePhotoMode"]);
  }
  async onEnter(routeParams) {
    await super.onEnter(routeParams);
    this._app.getManager("time").resetLimits();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  async _updateResources(routeParams) {
    this._app.getManager("layer").setTarget("");
    const entityInfo = this._app.getManager("content").getEntityInfo(routeParams.spaceObject);
    this._category = entityInfo.category;
  }
  // 候选对象从分类列表中排除当前对象，查询 id 优先于默认候选；两侧文字清理与比较管理器更新顺序保持原样。
  async processQuery(routeParams) {
    await super.processQuery(routeParams);
    const {
      spaceObject: sourceEntityId,
      id: id
    } = routeParams;
    let candidateEntityIds = Unidentified775.default;
    this._category && Unidentified775[this._category] && (candidateEntityIds = Unidentified775[this._category]);
    candidateEntityIds = candidateEntityIds.filter(candidateEntityId => candidateEntityId !== sourceEntityId);
    const compareTo = id || candidateEntityIds[0];
    sourceEntityId !== this._compare && this._app.getComponent("comparison").clearLeftPanelText(sourceEntityId);
    this._compare = sourceEntityId;
    this._compareTo = compareTo;
    this._entityInfo = this._app.getManager("content").getEntityInfo(this._compare);
    this._compareEntityInfo = this._app.getManager("content").getEntityInfo(this._compareTo);
    this._app.getComponent("comparison").clearRightPanelText(compareTo);
    await this._app.getManager("comparison").compare(sourceEntityId, compareTo);
    this._app.getComponent("comparison").setup({
      list: candidateEntityIds,
      name: sourceEntityId,
      compare: compareTo,
      unitConverter: radiusUnitConverters,
      ...routeParams
    });
  }
  async _updateComponents(routeParams) {
    super._updateComponents(routeParams);
    const routeParts = this._app.getManager("router").currentRoute.url.match(/[^/]+/g);
    this._app.getComponent("breadcrumb").onRouteChange({
      ...routeParams,
      routeParts: routeParts
    });
    this._app.getComponent("settings").toggleLightOptions("flood");
    const settingsComponent = this._app.getComponent("settings");
    if (settingsComponent) {
      const comparisonSettings = settingsComponent.getConfig();
      this.defaultConfig = Eyes.AppUtils.deepCopy(comparisonSettings);
      comparisonSettings.advancedSettings = false;
      comparisonSettings.allowGuidedCamera = false;
      comparisonSettings.allowZoom = true;
      comparisonSettings.allowLayers = false;
      comparisonSettings.allowInfoPanel = false;
      comparisonSettings.allowToggleUnit = true;
      comparisonSettings.allowPhotoMode = true;
      comparisonSettings.zoomIn = this._app.getManager("comparison").zoomIn;
      comparisonSettings.zoomOut = this._app.getManager("comparison").zoomOut;
      settingsComponent.setConfig(comparisonSettings);
    }
    this._app.getComponent("settings").getState("isPhotoMode") && this._app.getComponent("settings").togglePhotoMode();
  }
  togglePhotoMode(isPhotoMode) {
    isPhotoMode ? (this._app.getComponent("settings").collapse(), this._app.getComponent("comparison").hide()) : this._app.getComponent("comparison").show();
  }
  // 比较模式临时接管缩放回调与设置能力，退出时将保存的设置交还常规相机。
  onLeave(routeParams) {
    super.onLeave(routeParams);
    this._app.getManager("comparison").exit();
    this._compare = null;
    this._app.getManager("time").resetLimits();
    const settingsComponent = this._app.getComponent("settings");
    settingsComponent && this.defaultConfig && (this.defaultConfig.zoomIn = this._app.getManager("camera").zoomIn, this.defaultConfig.zoomOut = this._app.getManager("camera").zoomOut, settingsComponent.setConfig(this.defaultConfig));
  }
  resize() {
    super.resize();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  registerCallbacks() {
    super.registerCallbacks();
    this._app.getComponent("settings").registerCallback("photomodechange", this.togglePhotoMode);
  }
  removeCallbacks() {
    super.removeCallbacks();
    this._app.getComponent("settings").removeCallback("photomodechange", this.togglePhotoMode);
  }
}
export { CompareView };
