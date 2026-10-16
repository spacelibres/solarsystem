// Recovered from app.js:1505687-1508222.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import TextureQualityBlockTemplate from "../templates/TextureQualityBlockTemplate.html";
import "../../styles/extracted/TextureQualityBlockStyles.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
var getTextureQualityBlockTemplate = () => TextureQualityBlockTemplate;
/* HD 开关依赖 scene 管理器的实际纹理状态，并受 surfaceMapEnabled 事件协调；URL 配置只在对应选项存在时应用。目标切换会重置旧选项上下文。 */
class TextureQualityBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(app) {
    super(app, null, {});
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      },
      showContextualLayers: {
        true: "",
        false: "hidden"
      }
    });
    Object.assign(this._state, {
      showContextualLayers: this._class.showContextualLayers.false
    });
    this._previousEntity = null;
    this._previousChildEntity = void 0;
    this._defaultOptions = {
      hdToggle: {
        text: "High Definition",
        function: async () => {
          await this._toggleHD();
        },
        customURLBehavior: {
          hd: async (enableHD, checkboxInput) => {
            const surfaceMapComponent = this._app.pioneer.getScene("main").getEntity(this._hdToggleEntity).getComponent(SolarSystemSceneExports.WMTSComponent);
            if (!surfaceMapComponent || !surfaceMapComponent.isEnabled()) {
              const isEntityHD = await this._app.getManager("scene").isEntityHD(this._hdToggleEntity);
              checkboxInput && true === enableHD && (checkboxInput.checked = enableHD, isEntityHD || (await this._toggleHD()));
            }
          }
        },
        customEventListeners: {
          surfaceMapEnabled: async surfaceMapEvent => {
            const surfaceMapInfo = surfaceMapEvent.detail;
            if (surfaceMapInfo) {
              const {
                configs: configs
              } = this._app.getManager("router");
              const checkboxInput = document.getElementById("hdToggle");
              const isEntityHD = await this._app.getManager("scene").isEntityHD(this._hdToggleEntity);
              document.getElementById("hdToggle-container")?.classList.toggle("disabled", "wmts" === surfaceMapInfo.type);
              checkboxInput && (true !== configs.hd || isEntityHD || (checkboxInput.checked = await this._toggleHD()));
            }
          }
        }
      }
    };
  }
  _addDefaultOptions() {
    this._children.optionsList.innerHTML = "";
    for (const [optionId, optionInfo] of Object.entries(this._defaultOptions)) {
      const {
        container: container,
        input: input
      } = this._createToggle(optionId, optionInfo.text);
      if (container?.addEventListener("click", clickEvent => {
        const checkboxInput = document.getElementById(optionId);
        optionInfo.function();
        checkboxInput && (checkboxInput.checked = !checkboxInput.checked);
      }), optionInfo.customURLBehavior) {
        const {
          configs: configs
        } = this._app.getManager("router");
        for (const [configKey, applyConfig] of Object.entries(optionInfo.customURLBehavior)) Object.keys(configs).includes(configKey) && configKey && applyConfig(configs[configKey], input);
      }
      if (optionInfo.customEventListeners) for (const [eventName, listener] of Object.entries(optionInfo.customEventListeners)) window.addEventListener(eventName, event => {
        listener(event);
      });
      container.querySelector(`#${optionId}`).checked = this._app.getManager("scene").isHD();
      this._children.optionsList.appendChild(container);
    }
  }
  async _toggleHD() {
    return null !== this._hdToggleEntity && void 0 !== this._hdToggleEntity && (await this.app.getManager("scene").toggleHDTextureForEntity(this._hdToggleEntity));
  }
  onRouteChange(entityInfo, entityDescription, cancelToken = null, childEntityInfo = {}) {
    const didEntityChange = this._previousEntity && this._app.scene.getEntity(this._previousEntity) && this._previousEntity !== entityInfo.id;
    (this._previousChildEntity !== childEntityInfo?.id || didEntityChange) && this.reset();
    this._hdToggleEntity = entityInfo.id;
    this._addDefaultOptions();
    this._previousEntity = entityInfo.id;
    this._previousChildEntity = childEntityInfo?.id;
  }
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    super.__disable();
  }
}
TextureQualityBlock.html = getTextureQualityBlockTemplate();
export { TextureQualityBlock };
