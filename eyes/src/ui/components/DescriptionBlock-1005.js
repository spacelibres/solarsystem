/** @eyes-analysis
 * 文件职责：DescriptionBlock-1005 模块
 * 依据：imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../engine/solar-system/public-api.js, ../templates/DescriptionBlockTemplate-1006.html, ../../styles/extracted/DescriptionBlockStyles-1007.js；manager dependencies: router, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1452945-1454968.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-1006.html";
import "../../styles/extracted/DescriptionBlockStyles-1007.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
/** @eyes-analysis
 * 类职责：可展开的描述正文与更多内容；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：DescriptionBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DescriptionBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState；写入 _app。
   * 状态写入：_app。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTabletPortrait、super、this.setState。
   */
  constructor(app) {
    super(app, null, {});
    const e = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: e ? "hidden" : "",
      isButtonVisible: e ? "hidden" : "",
      isMoreVisible: e ? "expanded" : "hidden",
      moreDescription: "",
      isExpanded: "",
      readMsg: "More"
    });
    this._app = app;
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this._app.getManager, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this.app.pioneer.getScene, this.setState, this.resetScrollbar。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTabletPortrait、SolarSystemSceneExports.Entity.getEntityNamesInGroup、h?.replace、l.replace等。
   */
  onRouteChange(t, e) {
    const i = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    const {
      hideExternalLinks: hideExternalLinks,
      kiosk: kiosk
    } = this._app.getManager("router").configs;
    const a = true === hideExternalLinks || true === kiosk;
    if (!e.description) return;
    let l = e.description.blurb;
    let c = SolarSystemSceneExports.Entity.getEntityNamesInGroup(`${t}, moons`)?.size;
    if (c < 1) {
      const e = this.app.pioneer.getScene("main")?.getEntity(t)?.getParent()?.getName();
      e && (c = SolarSystemSceneExports.Entity.getEntityNamesInGroup(`${e}, moons`)?.size);
    }
    l = l.replace("[##moon_count##]", c);
    let h = e.description.more;
    h = h?.replace("[##moon_count##]", c);
    a && (l = this._app.getManager("content").hideExternalLinksInText(e.description.blurb), h = this._app.getManager("content").hideExternalLinksInText(e.description.more));
    this.setState({
      blurbDescription: l,
      moreDescription: h,
      showTitleLabel: i ? "hidden" : "",
      isButtonVisible: i || !h ? "hidden" : "",
      isMoreVisible: e.description.more && i ? "expanded" : "hidden",
      isExpanded: "",
      readMsg: "More"
    });
    this.resetScrollbar();
  }
  /** @eyes-analysis
   * 执行 resetScrollbar 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("contentPanel").getScrollbar、this._app.getComponent("contentPanel").getScrollbar()?.scroll。
   */
  resetScrollbar() {
    this._app.getComponent("contentPanel").getScrollbar()?.scroll(0);
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。
   * 调用线索：Eyes.AppUtils.isMobile、Eyes.AppUtils.isTabletPortrait、this.setState。
   */
  resize() {
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: t ? "hidden" : "",
      isButtonVisible: t ? "hidden" : "",
      isMoreVisible: t ? "expanded" : "hidden",
      isExpanded: "",
      readMsg: t ? "Less" : "More"
    });
  }
  /** @eyes-analysis
   * 执行 onClickReadMore 对应的组件业务步骤；调用 this.getState, Element.style.setProperty, this.resetScrollbar, this.setState。
   * 调用线索：document.documentElement.style.setProperty、document.getElementById、this.getState、this.resetScrollbar、this.setState。
   */
  onClickReadMore() {
    const t = "hidden" === this.getState("isMoreVisible");
    document.documentElement.style.setProperty("--overviewBlockHeight", `${document.getElementById("overview-block").offsetHeight}px`);
    t || this.resetScrollbar();
    this.setState({
      isExpanded: t ? "expanded" : "",
      isMoreVisible: t ? "expanded" : "hidden",
      readMsg: t ? "Less" : "More"
    });
  }
}
DescriptionBlock.html = getDescriptionBlockTemplate();
export { DescriptionBlock };
