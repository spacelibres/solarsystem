// Recovered from app.js:1500884-1505328.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SurfaceMapBlockTemplate from "../templates/SurfaceMapBlockTemplate.html";
var getSurfaceMapBlockTemplate = () => SurfaceMapBlockTemplate;
/* 表面地图选项向 layer 管理器提交地图描述，并发出 surfaceMapEnabled 供 HD 开关同步。默认地图另保留原贴图信息；火星默认项恢复 CMTS，其余对象切回默认纹理。 */
class SurfaceMapBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(app) {
    super(app, null, {
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
  async onRouteChange(entityInfo, entityName, cancelToken = null, childEntityInfo = {}, featureRoute = null) {
    const {
      id: entityId
    } = entityInfo;
    this._currentLayer = this._app.getManager("layer").getCurrentSurfaceLayer();
    this.setState({
      entityName: entityName,
      childEntityId: childEntityInfo?.id,
      featureRoute: featureRoute,
      showSubtitle: this._class.showSubtitle[!(Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet())]
    }, () => {
      this._currentlyCheckedOption = "default";
      this.addSurfaceMaps(entityId);
    });
    await this._app.getManager("scene").updateHDTarget(entityInfo, entityInfo.id);
    this._previousEntity = entityId;
    this._previousChildEntity = childEntityInfo?.id;
    this._setVariables(this._children.surfaceMapBlock);
  }
  addSurfaceMaps(entityId) {
    this._children.surfaceMapList.innerHTML = "";
    const surfaceMaps = this._app.getManager("content").getSpheroidLayers(entityId);
    void 0 === surfaceMaps ? this.setState({
      showSurfaceMaps: this._class.showSurfaceMaps.false
    }) : (this.addDefaultTexture(entityId), this._createDefaultRadioButton(entityId), surfaceMaps.forEach(surfaceMapInfo => {
      const radioItem = this._createRadioButton(surfaceMapInfo);
      radioItem.addEventListener("click", () => {
        this._app.getManager("layer").changeSpheroidMap(entityId, surfaceMapInfo);
        document.getElementById("default-map-radio-button")?.blur();
        const tiledEntity = this._app.getManager("scene").getCMTSEntity(entityId);
        tiledEntity && tiledEntity?.getComponent(Pioneer.CMTSComponent)?.setEnabled(false);
        this._currentlyCheckedOption = surfaceMapInfo.id;
        const customEvent = new CustomEvent("surfaceMapEnabled", {
          detail: surfaceMapInfo
        });
        window.dispatchEvent(customEvent);
      });
      this._children.surfaceMapList.appendChild(radioItem);
      const currentRadioInput = Array.from(radioItem.children).find(childElement => childElement.id === `${this._currentLayer}-radio-button`);
      currentRadioInput && currentRadioInput.click();
      const {
        configs: configs
      } = this._app.getManager("router");
      if (true === configs.surfaceMapTiling && "wmts" === surfaceMapInfo.type) {
        const tilingRadioInput = Array.from(radioItem.children).find(childElement => childElement.id === `${surfaceMapInfo.id}-radio-button`);
        tilingRadioInput?.click();
      }
    }), this.setState({
      showSurfaceMaps: this._class.showSurfaceMaps.true
    }));
  }
  _createDefaultRadioButton(entityId) {
    const listItem = document.createElement("li");
    listItem.className = "option radio-option clickable";
    const defaultRadioId = "default-map-radio-button";
    const labelElement = document.createElement("label");
    labelElement.innerText = "Default Map";
    labelElement.setAttribute("for", defaultRadioId);
    const radioInput = document.createElement("input");
    radioInput.id = defaultRadioId;
    radioInput.className = "radio-button clickable";
    radioInput.type = "radio";
    radioInput.name = "radio-layers";
    radioInput.checked = "default" === this._currentlyCheckedOption;
    listItem.appendChild(radioInput);
    listItem.appendChild(labelElement);
    listItem.addEventListener("click", () => {
      !this._defaultTextureDescription && this.addDefaultTexture(entityId);
      const customEvent = new CustomEvent("surfaceMapEnabled", {
        detail: this._defaultTextureDescription
      });
      window.dispatchEvent(customEvent);
      radioInput.blur();
      this._currentlyCheckedOption = "default";
      const tiledEntity = this._app.getManager("scene").getCMTSEntity(entityId);
      if (tiledEntity && "mars" === tiledEntity.getName()) {
        tiledEntity.removeComponent(tiledEntity?.getComponent(SolarSystemSceneExports.WMTSComponent));
        return void tiledEntity?.getComponent(Pioneer.CMTSComponent)?.setEnabled(true);
      }
      this._defaultTextureDescription && this._app.getManager("layer").changeSpheroidMap(entityId, this._defaultTextureDescription);
    });
    const radioIcon = document.createElement("span");
    radioIcon.className = "radio-icon bg-color";
    listItem.appendChild(radioIcon);
    this._children.surfaceMapList.appendChild(listItem);
  }
  addDefaultTexture(entityId) {
    const atmosphereComponent = this._app.pioneer.getScene("main").getEntity(entityId)?.getComponent(Pioneer.AtmosphereComponent);
    let preservedProperties = ["shadowEntities"];
    atmosphereComponent?.isEnabled() && (preservedProperties = ["shadowEntities", "atmosphere"]);
    this._defaultTextureDescription = this._app.getManager("content").getSpheroidDefaultTextureInformation(entityId, preservedProperties);
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
