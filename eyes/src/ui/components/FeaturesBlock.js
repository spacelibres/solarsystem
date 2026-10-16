// Recovered from app.js:1508472-1510072.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturesBlockTemplate from "../templates/FeaturesBlockTemplate.html";
var getFeaturesBlockTemplate = () => FeaturesBlockTemplate;
class FeaturesBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(t) {
    super(t, null, {});
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
  addFeatures(t) {
    this._children.featuresList.innerHTML = "";
    const contentManager = this._app.getManager("content");
    const sceneManager = this._app.getManager("scene");
    const n = contentManager.getSpheroidFeatures(t);
    if (void 0 === n) this.setState({
      showFeatures: this._class.showFeatures.false
    });else {
      document.createElement("li").className = "coption checkbox-list clickable";
      n.forEach(e => {
        e.function = () => {
          const n = SolarSystemSceneExports.Features.isEnabled(sceneManager.main, t, e.id);
          SolarSystemSceneExports.Features.setEnabled(sceneManager.main, t, e.id, !n);
        };
        e.text = () => e.title;
        const n = SolarSystemSceneExports.Features.isEnabled(sceneManager.main, t, e.id);
        const o = this._createCheckbox(e, n);
        this._children.featuresList.appendChild(o.element);
      });
      this._setVariables(this._children.featuresBlock);
    }
  }
  async onRouteChange(t) {
    const contentManager = this._app.getManager("content");
    const i = this._app.getManager("scene").get("main").getEntity(t.id)?.getParent()?.getName();
    const s = this._previousEntity && this._app.scene.getEntity(this._previousEntity);
    null !== this._defaultTextureDescription && s && this._app.getManager("layer").changeSpheroidMap(this._previousEntity, this._defaultTextureDescription);
    this._defaultTextureDescription = null;
    this._previousEntity = t.id;
    let n = "";
    if (0 !== contentManager.getSpheroidFeatures(t.id)?.length) n = t.id;else if (0 !== contentManager.getSpheroidFeatures(i)?.length) {
      n = contentManager.getEntityInfo(i).id;
    }
    this.addFeatures(n);
  }
}
FeaturesBlock.html = getFeaturesBlockTemplate();
export { FeaturesBlock };
