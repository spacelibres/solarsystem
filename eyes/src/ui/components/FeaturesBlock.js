// Recovered from app.js:1508472-1510072.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturesBlockTemplate from "../templates/FeaturesBlockTemplate.html";
var getFeaturesBlockTemplate = () => FeaturesBlockTemplate;
/* 特征定义上挂接的点击函数直接切换引擎 Features 状态；UI 复选框读取同一引擎状态，目标无可用特征时沿父实体查找。 */
class FeaturesBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(app) {
    super(app, null, {});
    Object.assign(this._class, {
      checkbox: {
        true: "icon-checkmark",
        false: "checkbox-hover"
      },
      isVisible: {
        true: "active",
        false: "hidden"
      },
      showFeatures: {
        true: "active",
        false: "hidden"
      }
    });
  }
  addFeatures(entityId) {
    this._children.featuresList.innerHTML = "";
    const contentManager = this._app.getManager("content");
    const sceneManager = this._app.getManager("scene");
    const features = contentManager.getSpheroidFeatures(entityId);
    if (void 0 === features) this.setState({
      showFeatures: this._class.showFeatures.false
    });else {
      document.createElement("li").className = "coption checkbox-list clickable";
      features.forEach(featureInfo => {
        featureInfo.function = () => {
          const wasFeatureEnabled = SolarSystemSceneExports.Features.isEnabled(sceneManager.main, entityId, featureInfo.id);
          SolarSystemSceneExports.Features.setEnabled(sceneManager.main, entityId, featureInfo.id, !wasFeatureEnabled);
        };
        featureInfo.text = () => featureInfo.title;
        const isFeatureEnabled = SolarSystemSceneExports.Features.isEnabled(sceneManager.main, entityId, featureInfo.id);
        const checkbox = this._createCheckbox(featureInfo, isFeatureEnabled);
        this._children.featuresList.appendChild(checkbox.element);
      });
      this._setVariables(this._children.featuresBlock);
    }
  }
  async onRouteChange(entityInfo) {
    const contentManager = this._app.getManager("content");
    const parentEntityId = this._app.getManager("scene").get("main").getEntity(entityInfo.id)?.getParent()?.getName();
    const previousEntity = this._previousEntity && this._app.scene.getEntity(this._previousEntity);
    null !== this._defaultTextureDescription && previousEntity && this._app.getManager("layer").changeSpheroidMap(this._previousEntity, this._defaultTextureDescription);
    this._defaultTextureDescription = null;
    this._previousEntity = entityInfo.id;
    let featuresEntityId = "";
    if (0 !== contentManager.getSpheroidFeatures(entityInfo.id)?.length) featuresEntityId = entityInfo.id;else if (0 !== contentManager.getSpheroidFeatures(parentEntityId)?.length) {
      featuresEntityId = contentManager.getEntityInfo(parentEntityId).id;
    }
    this.addFeatures(featuresEntityId);
  }
}
FeaturesBlock.html = getFeaturesBlockTemplate();
export { FeaturesBlock };
