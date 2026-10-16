// Recovered from app.js:1438051-1440063.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import FeaturedStoryBlockTemplate from "../templates/FeaturedStoryBlockTemplate.html";
import "../../styles/extracted/FeaturedStoryBlockStyles.js";
var getFeaturedStoryBlockTemplate = () => FeaturedStoryBlockTemplate;
class FeaturedStoryBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t) {
    super(t, null, {
      colorClass: "spacecraft",
      blockTitle: "",
      hideTitle: ""
    });
    this._more.isHidden.moreMessage = "Show More";
    this._storyList = null;
  }
  onRouteChange(t, e, i, s) {
    if (this._storyList = this._children.storyList, null === this._storyList || void 0 === this._storyList) return void this.setEnabled(false);
    if ("home" !== t && void 0 === this._app.getManager("content").context[t]) return;
    this._storyList.innerHTML = "";
    i.forEach(t => {
      const e = document.createElement("li");
      let s = null;
      s = void 0 === t.storyId ? t : i[t.storyId];
      const {
        title: title,
        subtitle: subtitle,
        icon: icon,
        link: link,
        isExternal: isExternal,
        isInternal: isInternal
      } = s;
      const h = document.createElement("div");
      h.classList.add("story-container");
      e.appendChild(h);
      const d = document.createElement("div");
      d.classList.add("story-title");
      const u = document.createElement("h2");
      if (u.appendChild(document.createTextNode(title)), d.appendChild(u), h.appendChild(d), subtitle) {
        const t = document.createElement("div");
        t.classList.add("story-list", "story-subtitle", "wide-text", "color", "{{colorClass}}", "x-small");
        t.appendChild(document.createTextNode(subtitle));
        h.appendChild(t);
      }
      const p = document.createElement("div");
      p.classList.add("story-icon");
      const _ = document.createElement("img");
      const m = `${subtitle}: ${title}`;
      if (_.setAttribute("alt", m), _.setAttribute("src", icon), _.classList.add("story-icon-image"), p.appendChild(_), h.appendChild(p), isExternal) e.addEventListener("click", () => {
        window.open(link);
      }, false);else if (isInternal) e.addEventListener("click", () => {
        this._app.getManager("router").navigate(link);
      }, false);else {
        const i = "story/" + t.id;
        e.addEventListener("click", () => {
          this._app.getManager("router").navigate(i);
        }, false);
      }
      if (isExternal) {
        const t = document.createElement("div");
        t.classList.add("icon", "icon-external");
        h.appendChild(t);
      }
      e.classList.add("clickable");
      this._storyList.appendChild(e);
    });
    const n = "" === e ? "hidden" : "";
    this._setVariables(this._element);
    this.setState({
      blockTitle: e,
      hideTitle: n
    });
  }
}
FeaturedStoryBlock.html = getFeaturedStoryBlockTemplate();
export { FeaturedStoryBlock };
