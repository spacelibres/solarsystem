/** @eyes-analysis
 * 文件职责：对象表面地图选择
 * 依据：imports: ../../engine/pioneer/index.js, ../../engine/solar-system/public-api.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/SurfaceMapBlockTemplate.html；manager dependencies: layer, scene, content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1500884-1505328.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SurfaceMapBlockTemplate from "../templates/SurfaceMapBlockTemplate.html";
var getSurfaceMapBlockTemplate = () => SurfaceMapBlockTemplate;
/** @eyes-analysis
 * 类职责：对象表面地图选择；继承 SolarSystemPublicApi.OptionsBlock
 * 继承：SolarSystemPublicApi.OptionsBlock；导出：SurfaceMapBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SurfaceMapBlock extends SolarSystemPublicApi.OptionsBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _defaultTextureDescription, _currentlyCheckedOption, _previousEntity, _previousChildEntity。
   * 状态写入：_currentlyCheckedOption、_defaultTextureDescription、_previousChildEntity、_previousEntity。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、Object.assign、super。
   */
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
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, this.setState, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.addSurfaceMaps, this._setVariables；写入 _currentLayer, _currentlyCheckedOption, _previousEntity, _previousChildEntity。
   * 状态写入：_currentLayer、_currentlyCheckedOption、_previousChildEntity、_previousEntity。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、this._app.getManager、this._app.getManager("layer").getCurrentSurfaceLayer、this._app.getManager("scene").updateHDTarget等。
   */
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
  /** @eyes-analysis
   * 执行 addSurfaceMaps 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.addDefaultTexture, this._createDefaultRadioButton, this._createRadioButton, this._children.surfaceMapList.appendChild, Array.from；写入 _currentlyCheckedOption。
   * 状态写入：_children.surfaceMapList.innerHTML、_currentlyCheckedOption。
   * 调用线索：Array.from、Array.from(i.children).find、document.getElementById、document.getElementById("default-map-radio-button")?.blur、e.forEach等。
   */
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
  /** @eyes-analysis
   * 执行 _createDefaultRadioButton 对应的组件业务步骤；调用 this.addDefaultTexture, this._app.getManager, this._children.surfaceMapList.appendChild；写入 _currentlyCheckedOption。
   * 状态写入：_currentlyCheckedOption。
   * 调用线索：document.createElement、e.addEventListener、e.appendChild、i.getName、i.removeComponent等。
   */
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
  /** @eyes-analysis
   * 执行 addDefaultTexture 对应的组件业务步骤；调用 this._app.pioneer.getScene, this._app.getManager；写入 _defaultTextureDescription, _defaultTextureType。
   * 状态写入：_defaultTextureDescription、_defaultTextureType。
   * 调用线索：e?.isEnabled、this._app.getManager、this._app.getManager("content").getSpheroidDefaultTextureInformation、this._app.pioneer.getScene、this._app.pioneer.getScene("main").getEntity等。
   */
  addDefaultTexture(t) {
    const e = this._app.pioneer.getScene("main").getEntity(t)?.getComponent(Pioneer.AtmosphereComponent);
    let i = ["shadowEntities"];
    e?.isEnabled() && (i = ["shadowEntities", "atmosphere"]);
    this._defaultTextureDescription = this._app.getManager("content").getSpheroidDefaultTextureInformation(t, i);
    this._defaultTextureType = "texture";
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this.setState, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTablet、super.resize、this.setState。
   */
  resize() {
    super.resize();
    this.setState({
      showSubtitle: this._class.showSubtitle[!(Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTablet())]
    });
  }
  /** @eyes-analysis
   * 执行 reset 对应的组件业务步骤；调用 this.app.getManager, this.addDefaultTexture, this.addSurfaceMaps, this._app.getManager；写入 _defaultTextureDescription。
   * 状态写入：_defaultTextureDescription。
   * 调用线索：this._app.getManager、this._app.getManager("layer").changeSpheroidMap、this.addDefaultTexture、this.addSurfaceMaps、this.app.getManager。
   */
  reset() {
    const {
      surfaceMapTiling: surfaceMapTiling
    } = this.app.getManager("router").configs;
    !this._defaultTextureDescription && this.addDefaultTexture(this._previousEntity);
    null !== this._defaultTextureDescription && true !== surfaceMapTiling && (this.addSurfaceMaps(this._previousEntity), this._app.getManager("layer").changeSpheroidMap(this._previousEntity, this._defaultTextureDescription));
    this._defaultTextureDescription = null;
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity, _previousChildEntity。
   * 状态写入：_previousChildEntity、_previousEntity。
   * 调用线索：super.__disable、this.setState。
   */
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
