// Recovered from app.js:1505687-1508222.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import TextureQualityBlockTemplate from "../templates/TextureQualityBlockTemplate.html";
import "../../styles/extracted/TextureQualityBlockStyles.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
var getTextureQualityBlockTemplate = () => TextureQualityBlockTemplate;
class TextureQualityBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(t) {
    super(t, null, {});
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
          hd: async (t, e) => {
            const i = this._app.pioneer.getScene("main").getEntity(this._hdToggleEntity).getComponent(SolarSystemSceneExports.WMTSComponent);
            if (!i || !i.isEnabled()) {
              const i = await this._app.getManager("scene").isEntityHD(this._hdToggleEntity);
              e && true === t && (e.checked = t, i || (await this._toggleHD()));
            }
          }
        },
        customEventListeners: {
          surfaceMapEnabled: async t => {
            const e = t.detail;
            if (e) {
              const {
                configs: configs
              } = this._app.getManager("router");
              const i = document.getElementById("hdToggle");
              const s = await this._app.getManager("scene").isEntityHD(this._hdToggleEntity);
              document.getElementById("hdToggle-container")?.classList.toggle("disabled", "wmts" === e.type);
              i && (true !== configs.hd || s || (i.checked = await this._toggleHD()));
            }
          }
        }
      }
    };
  }
  _addDefaultOptions() {
    this._children.optionsList.innerHTML = "";
    for (const [t, e] of Object.entries(this._defaultOptions)) {
      const {
        container: container,
        input: input
      } = this._createToggle(t, e.text);
      if (container?.addEventListener("click", i => {
        const s = document.getElementById(t);
        e.function();
        s && (s.checked = !s.checked);
      }), e.customURLBehavior) {
        const {
          configs: configs
        } = this._app.getManager("router");
        for (const [i, n] of Object.entries(e.customURLBehavior)) Object.keys(configs).includes(i) && i && n(configs[i], input);
      }
      if (e.customEventListeners) for (const [t, i] of Object.entries(e.customEventListeners)) window.addEventListener(t, t => {
        i(t);
      });
      container.querySelector(`#${t}`).checked = this._app.getManager("scene").isHD();
      this._children.optionsList.appendChild(container);
    }
  }
  async _toggleHD() {
    return null !== this._hdToggleEntity && void 0 !== this._hdToggleEntity && (await this.app.getManager("scene").toggleHDTextureForEntity(this._hdToggleEntity));
  }
  onRouteChange(t, e, i = null, s = {}) {
    const n = this._previousEntity && this._app.scene.getEntity(this._previousEntity) && this._previousEntity !== t.id;
    (this._previousChildEntity !== s?.id || n) && this.reset();
    this._hdToggleEntity = t.id;
    this._addDefaultOptions();
    this._previousEntity = t.id;
    this._previousChildEntity = s?.id;
  }
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    super.__disable();
  }
}
TextureQualityBlock.html = getTextureQualityBlockTemplate();
export { TextureQualityBlock };
