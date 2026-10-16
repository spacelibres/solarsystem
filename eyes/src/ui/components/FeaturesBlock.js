/** @eyes-analysis
 * 文件职责：对象特征选项列表
 * 依据：imports: ../../framework/eyes/index.js, ../../engine/solar-system/public-api.js, ../../app/public-api.js, ../templates/FeaturesBlockTemplate.html；manager dependencies: content, scene, layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1508472-1510072.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturesBlockTemplate from "../templates/FeaturesBlockTemplate.html";
var getFeaturesBlockTemplate = () => FeaturesBlockTemplate;
/** @eyes-analysis
 * 类职责：对象特征选项列表；继承 SolarSystemPublicApi.OptionsBlock
 * 继承：SolarSystemPublicApi.OptionsBlock；导出：FeaturesBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FeaturesBlock extends SolarSystemPublicApi.OptionsBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign。
   * 调用线索：Object.assign、super。
   */
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
  /** @eyes-analysis
   * 执行 addFeatures 对应的组件业务步骤；调用 this._app.getManager, Manager.getSpheroidFeatures, this.setState, SolarSystemSceneExports.Features.isEnabled, SolarSystemSceneExports.Features.setEnabled, this._createCheckbox, this._children.featuresList.appendChild, this._setVariables。
   * 状态写入：_children.featuresList.innerHTML。
   * 调用线索：SolarSystemSceneExports.Features.isEnabled、SolarSystemSceneExports.Features.setEnabled、contentManager.getSpheroidFeatures、document.createElement、n.forEach等。
   */
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
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, this._app.scene.getEntity, Manager.getSpheroidFeatures, Manager.getEntityInfo, this.addFeatures；写入 _defaultTextureDescription, _previousEntity。
   * 状态写入：_defaultTextureDescription、_previousEntity。
   * 调用线索：contentManager.getEntityInfo、contentManager.getSpheroidFeatures、this._app.getManager、this._app.getManager("layer").changeSpheroidMap、this._app.getManager("scene").get等。
   */
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
