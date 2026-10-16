// Recovered from app.js:1438051-1440063.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedStoryBlockTemplate from "../templates/FeaturedStoryBlockTemplate.html";
import "../../styles/extracted/FeaturedStoryBlockStyles.js";
var getFeaturedStoryBlockTemplate = () => FeaturedStoryBlockTemplate;
/* 故事卡片支持外部链接、内部路由和故事 id 三种跳转。节点由此块重建，标题和颜色等 class 占位符在创建后登记到基类状态绑定。 */
class FeaturedStoryBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app, null, {
      colorClass: "spacecraft",
      blockTitle: "",
      hideTitle: ""
    });
    this._more.isHidden.moreMessage = "Show More";
    this._storyList = null;
  }
  onRouteChange(entityId, blockTitle, stories, cancelToken) {
    if (this._storyList = this._children.storyList, null === this._storyList || void 0 === this._storyList) return void this.setEnabled(false);
    if ("home" !== entityId && void 0 === this._app.getManager("content").context[entityId]) return;
    this._storyList.innerHTML = "";
    stories.forEach(storyEntry => {
      const listItem = document.createElement("li");
      let storyInfo = null;
      storyInfo = void 0 === storyEntry.storyId ? storyEntry : stories[storyEntry.storyId];
      const {
        title: title,
        subtitle: subtitle,
        icon: icon,
        link: link,
        isExternal: isExternal,
        isInternal: isInternal
      } = storyInfo;
      const storyContainer = document.createElement("div");
      storyContainer.classList.add("story-container");
      listItem.appendChild(storyContainer);
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("story-title");
      const titleElement = document.createElement("h2");
      if (titleElement.appendChild(document.createTextNode(title)), titleContainer.appendChild(titleElement), storyContainer.appendChild(titleContainer), subtitle) {
        const subtitleElement = document.createElement("div");
        subtitleElement.classList.add("story-list", "story-subtitle", "wide-text", "color", "{{colorClass}}", "x-small");
        subtitleElement.appendChild(document.createTextNode(subtitle));
        storyContainer.appendChild(subtitleElement);
      }
      const iconContainer = document.createElement("div");
      iconContainer.classList.add("story-icon");
      const iconElement = document.createElement("img");
      const iconAltText = `${subtitle}: ${title}`;
      if (iconElement.setAttribute("alt", iconAltText), iconElement.setAttribute("src", icon), iconElement.classList.add("story-icon-image"), iconContainer.appendChild(iconElement), storyContainer.appendChild(iconContainer), isExternal) listItem.addEventListener("click", () => {
        window.open(link);
      }, false);else if (isInternal) listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(link);
      }, false);else {
        const storyRoute = "story/" + storyEntry.id;
        listItem.addEventListener("click", () => {
          this._app.getManager("router").navigate(storyRoute);
        }, false);
      }
      if (isExternal) {
        const externalIcon = document.createElement("div");
        externalIcon.classList.add("icon", "icon-external");
        storyContainer.appendChild(externalIcon);
      }
      listItem.classList.add("clickable");
      this._storyList.appendChild(listItem);
    });
    const hideTitleClass = "" === blockTitle ? "hidden" : "";
    this._setVariables(this._element);
    this.setState({
      blockTitle: blockTitle,
      hideTitle: hideTitleClass
    });
  }
}
FeaturedStoryBlock.html = getFeaturedStoryBlockTemplate();
export { FeaturedStoryBlock };
