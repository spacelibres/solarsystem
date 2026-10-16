/** @eyes-analysis
 * 文件职责：对象特殊功能入口
 * 依据：imports: ../../framework/eyes/index.js, ../../engine/solar-system/public-api.js, ../../app/public-api.js, ../templates/SpecialFeaturesBlockTemplate.html, ../../styles/extracted/SpecialFeaturesBlockStyles.js；manager dependencies: content, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1477051-1478723.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SpecialFeaturesBlockTemplate from "../templates/SpecialFeaturesBlockTemplate.html";
import "../../styles/extracted/SpecialFeaturesBlockStyles.js";
var getSpecialFeaturesBlockTemplate = () => SpecialFeaturesBlockTemplate;
/** @eyes-analysis
 * 类职责：对象特殊功能入口；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：SpecialFeaturesBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpecialFeaturesBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _state。
   * 状态写入：_state。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._state = {
      ...this._state,
      category: ""
    };
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._element.classList.add。
   * 调用线索：super.init、this._element.classList.add。
   */
  init() {
    super.init();
    this._element.classList.add("special-features");
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.getManager, this.hide, this.show, this.setState, SolarSystemSceneExports.Entity.getEntityNamesInGroup, List.add, this._children.specialFeatures.appendChild。
   * 状态写入：_children.specialFeatures.innerHTML。
   * 调用线索：SolarSystemSceneExports.Entity.getEntityNamesInGroup、a.classList.add、document.createElement、e.slice、i.forEach等。
   */
  onRouteChange(t) {
    if (this._app.getManager("content").hasLanded(t)) return void this.hide();
    if (!this._children.specialFeatures) return;
    this._children.specialFeatures.innerHTML = "";
    this.show();
    const e = this._app.getManager("content").getColorClass(t.id);
    this.setState({
      category: e
    });
    const i = [];
    if (false !== t.comparisonFeature && i.push({
      title: "Compare size",
      link: "/compare"
    }), false !== t.distanceTool && i.push({
      title: "Distance Tool",
      link: "/distance",
      options: {
        keepTime: true
      }
    }), t.hasMoons) {
      if (SolarSystemSceneExports.Entity.getEntityNamesInGroup(t.id + ", moons").size > 1) {
        const e = t.displayName || t.iauName;
        const s = e + ("s" === e.slice(-1) ? "'" : "'s") + " Moons";
        i.push({
          title: s,
          link: "/moons"
        });
      }
    }
    0 !== i.length ? ("Planet" !== t.category && "moon" !== t.id || i.push({
      title: "Telescope Mode",
      link: "/telescope"
    }), i.forEach(e => {
      const {
        link: link,
        query: s = {},
        options: n = {
          __remove: "all"
        }
      } = e;
      const o = `/${t.id}${link}`;
      const r = document.createElement("li");
      r.classList.add("item");
      r.classList.add("clickable");
      r.addEventListener("click", () => {
        this._app.getManager("router").navigate(s, o, n);
      }, false);
      const a = document.createElement("button");
      a.classList.add("clickable", "underline", "capitalize");
      a.innerHTML = e.title;
      r.appendChild(a);
      const l = document.createElement("span");
      l.classList.add("icon", "icon-greater", "mobile-icon");
      r.appendChild(l);
      this._children.specialFeatures.appendChild(r);
    })) : this.hide();
  }
}
SpecialFeaturesBlock.html = getSpecialFeaturesBlockTemplate();
export { SpecialFeaturesBlock };
