// Recovered from app.js:1455580-1457214.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedMoonsBlockTemplate from "../templates/FeaturedMoonsBlockTemplate.html";
var getFeaturedMoonsBlockTemplate = () => FeaturedMoonsBlockTemplate;
class FeaturedMoonsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(...t) {
    super(...t);
    this.resize();
  }
  resize() {
    super.resize();
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: t ? "hidden" : ""
    });
  }
  async onRouteChange(t, e, i) {
    i && i.isCanceled || (this.hideMore(), this._children.featuredMoonsList.innerHTML = "", void 0 !== e.initial && 0 !== e.initial.length ? (this._element.classList.remove("hidden"), Array.isArray(e.more) && 0 !== e.more.length ? this.setState({
      hideMoreMessage: ""
    }) : this.setState({
      hideMoreMessage: "hidden"
    }), e.initial.forEach(t => {
      if (i && i.isCanceled) return;
      const e = this._createListElement(t);
      this._children.featuredMoonsList.appendChild(e);
    }), e.more.forEach(t => {
      if (i && i.isCanceled) return;
      const e = this._createListElement(t);
      e.classList.add("hidden", "{{moreClass}}", "hover-background");
      this._children.featuredMoonsList.appendChild(e);
    })) : this.setEnabled(false), this._setVariables(this._element));
  }
  _createListElement(t) {
    const e = document.createElement("li");
    const i = t.info ? `${t.title} (${t.info})` : t.title;
    e.appendChild(document.createTextNode(i));
    e.addEventListener("click", () => {
      this._app.getManager("router").navigate(t.url);
    }, false);
    e.classList.add("clickable", "hover-background");
    const s = document.createElement("span");
    s.classList.add("icon", "icon-greater", "mobile-icon");
    e.appendChild(s);
    e.style.paddingLeft = "1.25em";
    e.style.paddingRight = "1.25em";
    e.style.paddingTop = "0.5em";
    e.style.paddingBottom = "0.5em";
    e.style.justifyContent = "space-between";
    return e;
  }
}
FeaturedMoonsBlock.html = getFeaturedMoonsBlockTemplate();
export { FeaturedMoonsBlock };
