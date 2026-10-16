// Recovered from app.js:1455580-1457214.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedMoonsBlockTemplate from "../templates/FeaturedMoonsBlockTemplate.html";
var getFeaturedMoonsBlockTemplate = () => FeaturedMoonsBlockTemplate;
/* 路由取消令牌同时守住整次刷新和逐项 DOM 构建；更多项重新登记模板 class 绑定，以便继承的展开逻辑控制可见性。 */
class FeaturedMoonsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(...constructorArgs) {
    super(...constructorArgs);
    this.resize();
  }
  resize() {
    super.resize();
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: isCompact ? "hidden" : ""
    });
  }
  async onRouteChange(entityId, moonLinks, cancelToken) {
    cancelToken && cancelToken.isCanceled || (this.hideMore(), this._children.featuredMoonsList.innerHTML = "", void 0 !== moonLinks.initial && 0 !== moonLinks.initial.length ? (this._element.classList.remove("hidden"), Array.isArray(moonLinks.more) && 0 !== moonLinks.more.length ? this.setState({
      hideMoreMessage: ""
    }) : this.setState({
      hideMoreMessage: "hidden"
    }), moonLinks.initial.forEach(moonLink => {
      if (cancelToken && cancelToken.isCanceled) return;
      const listItem = this._createListElement(moonLink);
      this._children.featuredMoonsList.appendChild(listItem);
    }), moonLinks.more.forEach(moonLink => {
      if (cancelToken && cancelToken.isCanceled) return;
      const listItem = this._createListElement(moonLink);
      listItem.classList.add("hidden", "{{moreClass}}", "hover-background");
      this._children.featuredMoonsList.appendChild(listItem);
    })) : this.setEnabled(false), this._setVariables(this._element));
  }
  _createListElement(moonLink) {
    const listItem = document.createElement("li");
    const moonTitle = moonLink.info ? `${moonLink.title} (${moonLink.info})` : moonLink.title;
    listItem.appendChild(document.createTextNode(moonTitle));
    listItem.addEventListener("click", () => {
      this._app.getManager("router").navigate(moonLink.url);
    }, false);
    listItem.classList.add("clickable", "hover-background");
    const chevronElement = document.createElement("span");
    chevronElement.classList.add("icon", "icon-greater", "mobile-icon");
    listItem.appendChild(chevronElement);
    listItem.style.paddingLeft = "1.25em";
    listItem.style.paddingRight = "1.25em";
    listItem.style.paddingTop = "0.5em";
    listItem.style.paddingBottom = "0.5em";
    listItem.style.justifyContent = "space-between";
    return listItem;
  }
}
FeaturedMoonsBlock.html = getFeaturedMoonsBlockTemplate();
export { FeaturedMoonsBlock };
