/** @eyes-analysis
 * 文件职责：对象纹理质量选择
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/TextureQualityBlockTemplate.html, ../../styles/extracted/TextureQualityBlockStyles.js, ../../engine/solar-system/public-api.js；manager dependencies: scene, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1505687-1508222.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import TextureQualityBlockTemplate from "../templates/TextureQualityBlockTemplate.html";
import "../../styles/extracted/TextureQualityBlockStyles.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
var getTextureQualityBlockTemplate = () => TextureQualityBlockTemplate;
/** @eyes-analysis
 * 类职责：对象纹理质量选择；继承 SolarSystemPublicApi.OptionsBlock
 * 继承：SolarSystemPublicApi.OptionsBlock；导出：TextureQualityBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TextureQualityBlock extends SolarSystemPublicApi.OptionsBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this._toggleHD, this._app.pioneer.getScene, this._app.getManager, List.toggle；写入 _previousEntity, _previousChildEntity, _defaultOptions。
   * 状态写入：_defaultOptions、_previousChildEntity、_previousEntity。
   * 调用线索：Object.assign、document.getElementById、document.getElementById("hdToggle-container")?.classList.toggle、i.isEnabled、super等。
   */
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
  /** @eyes-analysis
   * 执行 _addDefaultOptions 对应的组件业务步骤；调用 Object.entries, this._createToggle, this._app.getManager, Object.keys, this._children.optionsList.appendChild。
   * 状态写入：_children.optionsList.innerHTML。
   * 调用线索：Object.entries、Object.keys、Object.keys(configs).includes、container.querySelector、container?.addEventListener等。
   */
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
  /** @eyes-analysis
   * 执行 _toggleHD 对应的组件业务步骤；调用 this.app.getManager。
   * 调用线索：this.app.getManager、this.app.getManager("scene").toggleHDTextureForEntity。
   */
  async _toggleHD() {
    return null !== this._hdToggleEntity && void 0 !== this._hdToggleEntity && (await this.app.getManager("scene").toggleHDTextureForEntity(this._hdToggleEntity));
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.scene.getEntity, this.reset, this._addDefaultOptions；写入 _hdToggleEntity, _previousEntity, _previousChildEntity。
   * 状态写入：_hdToggleEntity、_previousChildEntity、_previousEntity。
   * 调用线索：this._addDefaultOptions、this._app.scene.getEntity、this.reset。
   */
  onRouteChange(t, e, i = null, s = {}) {
    const n = this._previousEntity && this._app.scene.getEntity(this._previousEntity) && this._previousEntity !== t.id;
    (this._previousChildEntity !== s?.id || n) && this.reset();
    this._hdToggleEntity = t.id;
    this._addDefaultOptions();
    this._previousEntity = t.id;
    this._previousChildEntity = s?.id;
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 super.__disable；写入 _previousEntity, _previousChildEntity。
   * 状态写入：_previousChildEntity、_previousEntity。
   * 调用线索：super.__disable。
   */
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    super.__disable();
  }
}
TextureQualityBlock.html = getTextureQualityBlockTemplate();
export { TextureQualityBlock };
