// Recovered from app.js:1452945-1454968.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-1006.html";
import "../../styles/extracted/DescriptionBlockStyles-1007.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
class DescriptionBlock extends SolarSystemPublicApi.BaseContentBlock {
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
  resetScrollbar() {
    this._app.getComponent("contentPanel").getScrollbar()?.scroll(0);
  }
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
