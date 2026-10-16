// Recovered from app.js:1510277-1513762.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import RelatedBlockTemplate from "../templates/RelatedBlockTemplate.html";
import "../../styles/extracted/RelatedBlockStyles.js";
var getRelatedBlockTemplate = () => RelatedBlockTemplate;
/* 相关对象列表按目录分类生成形状；故事卡片可跳外部、内部或故事路由。内部链接等待场景与相机完成后才选择内容标签页。 */
class RelatedBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app, null, {
      relatedMessage: "Related"
    });
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: isCompact ? "hidden" : ""
    });
  }
  onRouteChange(sectionTitle, relatedEntityIds, relatedStories, cancelToken) {
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    null !== this._children.relatedList && (this._children.relatedList.innerHTML = "", this.populateStoryCard(relatedStories), void 0 !== relatedEntityIds && 0 !== relatedEntityIds.length ? (this.setState({
      moreShowing: false,
      moreMessage: "Show More",
      moreIcon: "icon-plus",
      relatedMessage: sectionTitle,
      showTitleLabel: isCompact ? "hidden" : ""
    }), relatedEntityIds.forEach(entityId => {
      const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
      if (null !== entityInfo) {
        const categoryShapes = this._app.getManager("content").getCategoryShapeMap();
        const shapeType = categoryShapes[entityInfo.category] ? categoryShapes[entityInfo.category].shape : "circle";
        const shapeColor = categoryShapes[entityInfo.category] ? categoryShapes[entityInfo.category].color : "brown";
        const listItem = document.createElement("li");
        const shapeElement = document.createElement("span");
        shapeElement.classList.add("shape");
        shapeElement.classList.add(shapeType);
        shapeColor && shapeElement.classList.add(shapeColor);
        listItem.appendChild(shapeElement);
        listItem.appendChild(document.createTextNode(entityInfo.displayName ?? entityInfo.iauName));
        listItem.addEventListener("click", () => {
          this._app.getManager("router").navigate(entityId);
        }, false);
        listItem.setAttribute("data-value", entityId);
        listItem.classList.add("item");
        listItem.classList.add("clickable");
        this._children.relatedList.appendChild(listItem);
      }
    })) : this.hide());
  }
  populateStoryCard(stories) {
    if (this._storyList && (this._storyList.innerHTML = ""), null !== stories && stories?.length > 0) {
      if (this._storyList = this._children.storyList, null === this._storyList || void 0 === this._storyList) return void this.setEnabled(false);
      stories.forEach(storyEntry => {
        const listItem = document.createElement("li");
        const storyInfo = storyEntry.storyId && stories.hasOwn(storyEntry.storyId) ? stories[storyEntry.storyId] : storyEntry;
        const {
          title: title,
          subtitle: subtitle,
          icon: icon,
          link: link,
          isExternal: isExternal,
          isInternal: isInternal,
          titleStyle: titleStyle,
          iconFullSize: iconFullSize,
          contentPanelTab: contentPanelTab
        } = storyInfo;
        const storyContainer = document.createElement("div");
        if (storyContainer.classList.add("story-container"), !iconFullSize) {
          const tagElement = document.createElement("div");
          tagElement.appendChild(document.createTextNode((storyEntry.isExternal ? "External" : "") + " Story"));
          tagElement.classList.add("story-tag");
          storyContainer.appendChild(tagElement);
        }
        if (listItem.appendChild(storyContainer), title) {
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("story-title");
          const titleElement = document.createElement("h2");
          titleElement.appendChild(document.createTextNode(title));
          titleContainer.appendChild(titleElement);
          "spaced" === titleStyle && titleContainer.classList.add("spaced");
          storyContainer.appendChild(titleContainer);
        }
        if (subtitle) {
          const subtitleElement = document.createElement("div");
          subtitleElement.classList.add("story-list", "story-subtitle", "wide-text", "color", "x-small");
          subtitleElement.appendChild(document.createTextNode(subtitle));
          storyContainer.appendChild(subtitleElement);
        }
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("story-icon");
        iconFullSize && (iconContainer.classList.add("full-size-icon"), storyContainer.classList.add("full-size-icon"));
        const imageElement = document.createElement("img");
        const imageAltText = `${subtitle ?? ""} ${title ?? storyInfo.id}`;
        if (imageElement.setAttribute("alt", imageAltText), imageElement.setAttribute("src", icon), imageElement.classList.add("story-icon-image"), iconContainer.appendChild(imageElement), storyContainer.appendChild(iconContainer), isExternal) listItem.addEventListener("click", () => {
          window.open(link);
        }, false);else if (isInternal) listItem.addEventListener("click", async () => {
          this._app.getManager("router").navigate(link);
          await this._app.scene.getLoadedPromise();
          await this._app.getManager("camera").waitForTransitionComplete();
          contentPanelTab && this._app.getComponent("contentPanel")?.selectTab(contentPanelTab);
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
    }
  }
  resize() {
    const isCompact = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: isCompact ? "hidden" : ""
    });
  }
}
RelatedBlock.html = getRelatedBlockTemplate();
export { RelatedBlock };
