// Recovered from app.js:1500884-1505328.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SurfaceMapBlockTemplate from "../templates/SurfaceMapBlockTemplate.html";
var getSurfaceMapBlockTemplate = () => SurfaceMapBlockTemplate;
class SurfaceMapBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(t) {
    super(t, null, {
      entityName: "",
      childEntityId: null,
      featureRoute: null
    });
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      },
      showSurfaceMaps: {
        true: "",
        false: "hidden"
      },
      showSubtitle: {
        true: "",
        false: "hidden"
      }
    });
    Object.assign(this._state, {
      showSurfaceMaps: this._class.showSurfaceMaps.false,
      showSubtitle: this._class.showSubtitle[!(Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet())]
    });
    this._defaultTextureDescription = null;
    this._currentlyCheckedOption = "default";
    this._previousEntity = null;
    this._previousChildEntity = void 0;
  }
  async onRouteChange(t, e, i = null, s = {}, n = null) {
    const {
      id: r
    } = t;
    this._currentLayer = this._app.getManager("layer").getCurrentSurfaceLayer();
    this.setState({
      entityName: e,
      childEntityId: s?.id,
      featureRoute: n,
      showSubtitle: this._class.showSubtitle[!(Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet())]
    }, () => {
      this._currentlyCheckedOption = "default";
      this.addSurfaceMaps(r);
    });
    await this._app.getManager("scene").updateHDTarget(t, t.id);
    this._previousEntity = r;
    this._previousChildEntity = s?.id;
    this._setVariables(this._children.surfaceMapBlock);
  }
  addSurfaceMaps(t) {
    this._children.surfaceMapList.innerHTML = "";
    const e = this._app.getManager("content").getSpheroidLayers(t);
    void 0 === e ? this.setState({
      showSurfaceMaps: this._class.showSurfaceMaps.false
    }) : (this.addDefaultTexture(t), this._createDefaultRadioButton(t), e.forEach(e => {
      const i = this._createRadioButton(e);
      i.addEventListener("click", () => {
        this._app.getManager("layer").changeSpheroidMap(t, e);
        document.getElementById("default-map-radio-button")?.blur();
        const i = this._app.getManager("scene").getCMTSEntity(t);
        i && i?.getComponent(Pioneer.CMTSComponent)?.setEnabled(false);
        this._currentlyCheckedOption = e.id;
        const customEvent = new CustomEvent("surfaceMapEnabled", {
          detail: e
        });
        window.dispatchEvent(customEvent);
      });
      this._children.surfaceMapList.appendChild(i);
      const n = Array.from(i.children).find(t => t.id === `${this._currentLayer}-radio-button`);
      n && n.click();
      const {
        configs: configs
      } = this._app.getManager("router");
      if (true === configs.surfaceMapTiling && "wmts" === e.type) {
        const t = Array.from(i.children).find(t => t.id === `${e.id}-radio-button`);
        t?.click();
      }
    }), this.setState({
      showSurfaceMaps: this._class.showSurfaceMaps.true
    }));
  }
  _createDefaultRadioButton(t) {
    const e = document.createElement("li");
    e.className = "option radio-option clickable";
    const i = "default-map-radio-button";
    const o = document.createElement("label");
    o.innerText = "Default Map";
    o.setAttribute("for", i);
    const r = document.createElement("input");
    r.id = i;
    r.className = "radio-button clickable";
    r.type = "radio";
    r.name = "radio-layers";
    r.checked = "default" === this._currentlyCheckedOption;
    e.appendChild(r);
    e.appendChild(o);
    e.addEventListener("click", () => {
      !this._defaultTextureDescription && this.addDefaultTexture(t);
      const customEvent = new CustomEvent("surfaceMapEnabled", {
        detail: this._defaultTextureDescription
      });
      window.dispatchEvent(customEvent);
      r.blur();
      this._currentlyCheckedOption = "default";
      const i = this._app.getManager("scene").getCMTSEntity(t);
      if (i && "mars" === i.getName()) {
        i.removeComponent(i?.getComponent(SolarSystemSceneExports.WMTSComponent));
        return void i?.getComponent(Pioneer.CMTSComponent)?.setEnabled(true);
      }
      this._defaultTextureDescription && this._app.getManager("layer").changeSpheroidMap(t, this._defaultTextureDescription);
    });
    const a = document.createElement("span");
    a.className = "radio-icon bg-color";
    e.appendChild(a);
    this._children.surfaceMapList.appendChild(e);
  }
  addDefaultTexture(t) {
    const e = this._app.pioneer.getScene("main").getEntity(t)?.getComponent(Pioneer.AtmosphereComponent);
    let i = ["shadowEntities"];
    e?.isEnabled() && (i = ["shadowEntities", "atmosphere"]);
    this._defaultTextureDescription = this._app.getManager("content").getSpheroidDefaultTextureInformation(t, i);
    this._defaultTextureType = "texture";
  }
  resize() {
    super.resize();
    this.setState({
      showSubtitle: this._class.showSubtitle[!(Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet())]
    });
  }
  reset() {
    const {
      surfaceMapTiling: surfaceMapTiling
    } = this.app.getManager("router").configs;
    !this._defaultTextureDescription && this.addDefaultTexture(this._previousEntity);
    null !== this._defaultTextureDescription && true !== surfaceMapTiling && (this.addSurfaceMaps(this._previousEntity), this._app.getManager("layer").changeSpheroidMap(this._previousEntity, this._defaultTextureDescription));
    this._defaultTextureDescription = null;
  }
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    this.setState({
      entityName: null,
      childEntityId: null
    });
    super.__disable();
  }
}
SurfaceMapBlock.html = getSurfaceMapBlockTemplate();
export { SurfaceMapBlock };
