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
class CompareView extends ExtendedBaseView.default {
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
  async onEnter(t) {
    await super.onEnter(t);
    this._app.getManager("time").resetLimits();
    this._app.getComponent("menu")?.setEnabled(Eyes.AppUtils.isMobileMode());
  }
  async _updateResources(t) {
    this._app.getManager("layer").setTarget("");
    const e = this._app.getManager("content").getEntityInfo(t.spaceObject);
    this._category = e.category;
  }
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
  togglePhotoMode(t) {
    t ? (this._app.getComponent("settings").collapse(), this._app.getComponent("comparison").hide()) : this._app.getComponent("comparison").show();
  }
  onLeave(t) {
    super.onLeave(t);
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
