// Recovered from app.js:1452945-1454968.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-1006.html";
import "../../styles/extracted/DescriptionBlockStyles-1007.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
/* 描述文本中的月球计数来自实体分组，必要时退回父实体；移动布局直接显示更多内容，桌面展开时保留原滚动位置规则。 */
class DescriptionBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app, null, {});
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: isCompact ? "hidden" : "",
      isButtonVisible: isCompact ? "hidden" : "",
      isMoreVisible: isCompact ? "expanded" : "hidden",
      moreDescription: "",
      isExpanded: "",
      readMsg: "More"
    });
    this._app = app;
  }
  onRouteChange(entityId, entityDescription) {
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    const {
      hideExternalLinks: hideExternalLinks,
      kiosk: kiosk
    } = this._app.getManager("router").configs;
    const shouldHideExternalLinks = true === hideExternalLinks || true === kiosk;
    if (!entityDescription.description) return;
    let blurbText = entityDescription.description.blurb;
    let moonCount = SolarSystemSceneExports.Entity.getEntityNamesInGroup(`${entityId}, moons`)?.size;
    if (moonCount < 1) {
      const parentEntityId = this.app.pioneer.getScene("main")?.getEntity(entityId)?.getParent()?.getName();
      parentEntityId && (moonCount = SolarSystemSceneExports.Entity.getEntityNamesInGroup(`${parentEntityId}, moons`)?.size);
    }
    blurbText = blurbText.replace("[##moon_count##]", moonCount);
    let moreText = entityDescription.description.more;
    moreText = moreText?.replace("[##moon_count##]", moonCount);
    shouldHideExternalLinks && (blurbText = this._app.getManager("content").hideExternalLinksInText(entityDescription.description.blurb), moreText = this._app.getManager("content").hideExternalLinksInText(entityDescription.description.more));
    this.setState({
      blurbDescription: blurbText,
      moreDescription: moreText,
      showTitleLabel: isCompact ? "hidden" : "",
      isButtonVisible: isCompact || !moreText ? "hidden" : "",
      isMoreVisible: entityDescription.description.more && isCompact ? "expanded" : "hidden",
      isExpanded: "",
      readMsg: "More"
    });
    this.resetScrollbar();
  }
  resetScrollbar() {
    this._app.getComponent("contentPanel").getScrollbar()?.scroll(0);
  }
  resize() {
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: isCompact ? "hidden" : "",
      isButtonVisible: isCompact ? "hidden" : "",
      isMoreVisible: isCompact ? "expanded" : "hidden",
      isExpanded: "",
      readMsg: isCompact ? "Less" : "More"
    });
  }
  onClickReadMore() {
    const shouldExpand = "hidden" === this.getState("isMoreVisible");
    document.documentElement.style.setProperty("--overviewBlockHeight", `${document.getElementById("overview-block").offsetHeight}px`);
    shouldExpand || this.resetScrollbar();
    this.setState({
      isExpanded: shouldExpand ? "expanded" : "",
      isMoreVisible: shouldExpand ? "expanded" : "hidden",
      readMsg: shouldExpand ? "Less" : "More"
    });
  }
}
DescriptionBlock.html = getDescriptionBlockTemplate();
export { DescriptionBlock };
