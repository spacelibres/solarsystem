// Recovered from app.js:1510277-1513762.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import RelatedBlockTemplate from "../templates/RelatedBlockTemplate.html";
import "../../styles/extracted/RelatedBlockStyles.js";
var getRelatedBlockTemplate = () => RelatedBlockTemplate;
class RelatedBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t) {
    super(t, null, {
      relatedMessage: "Related"
    });
    const e = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: e ? "hidden" : ""
    });
  }
  onRouteChange(t, e, i, n) {
    const o = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    null !== this._children.relatedList && (this._children.relatedList.innerHTML = "", this.populateStoryCard(i), void 0 !== e && 0 !== e.length ? (this.setState({
      moreShowing: false,
      moreMessage: "Show More",
      moreIcon: "icon-plus",
      relatedMessage: t,
      showTitleLabel: o ? "hidden" : ""
    }), e.forEach(t => {
      const e = this._app.getManager("content").getEntityInfo(t);
      if (null !== e) {
        const i = this._app.getManager("content").getCategoryShapeMap();
        const s = i[e.category] ? i[e.category].shape : "circle";
        const n = i[e.category] ? i[e.category].color : "brown";
        const o = document.createElement("li");
        const r = document.createElement("span");
        r.classList.add("shape");
        r.classList.add(s);
        n && r.classList.add(n);
        o.appendChild(r);
        o.appendChild(document.createTextNode(e.displayName ?? e.iauName));
        o.addEventListener("click", () => {
          this._app.getManager("router").navigate(t);
        }, false);
        o.setAttribute("data-value", t);
        o.classList.add("item");
        o.classList.add("clickable");
        this._children.relatedList.appendChild(o);
      }
    })) : this.hide());
  }
  populateStoryCard(t) {
    if (this._storyList && (this._storyList.innerHTML = ""), null !== t && t?.length > 0) {
      if (this._storyList = this._children.storyList, null === this._storyList || void 0 === this._storyList) return void this.setEnabled(false);
      t.forEach(e => {
        const i = document.createElement("li");
        const s = e.storyId && t.hasOwn(e.storyId) ? t[e.storyId] : e;
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
        } = s;
        const p = document.createElement("div");
        if (p.classList.add("story-container"), !iconFullSize) {
          const t = document.createElement("div");
          t.appendChild(document.createTextNode((e.isExternal ? "External" : "") + " Story"));
          t.classList.add("story-tag");
          p.appendChild(t);
        }
        if (i.appendChild(p), title) {
          const t = document.createElement("div");
          t.classList.add("story-title");
          const e = document.createElement("h2");
          e.appendChild(document.createTextNode(title));
          t.appendChild(e);
          "spaced" === titleStyle && t.classList.add("spaced");
          p.appendChild(t);
        }
        if (subtitle) {
          const t = document.createElement("div");
          t.classList.add("story-list", "story-subtitle", "wide-text", "color", "x-small");
          t.appendChild(document.createTextNode(subtitle));
          p.appendChild(t);
        }
        const _ = document.createElement("div");
        _.classList.add("story-icon");
        iconFullSize && (_.classList.add("full-size-icon"), p.classList.add("full-size-icon"));
        const m = document.createElement("img");
        const g = `${subtitle ?? ""} ${title ?? s.id}`;
        if (m.setAttribute("alt", g), m.setAttribute("src", icon), m.classList.add("story-icon-image"), _.appendChild(m), p.appendChild(_), isExternal) i.addEventListener("click", () => {
          window.open(link);
        }, false);else if (isInternal) i.addEventListener("click", async () => {
          this._app.getManager("router").navigate(link);
          await this._app.scene.getLoadedPromise();
          await this._app.getManager("camera").waitForTransitionComplete();
          contentPanelTab && this._app.getComponent("contentPanel")?.selectTab(contentPanelTab);
        }, false);else {
          const t = "story/" + e.id;
          i.addEventListener("click", () => {
            this._app.getManager("router").navigate(t);
          }, false);
        }
        if (isExternal) {
          const t = document.createElement("div");
          t.classList.add("icon", "icon-external");
          p.appendChild(t);
        }
        i.classList.add("clickable");
        this._storyList.appendChild(i);
      });
    }
  }
  resize() {
    const t = Eyes.AppUtils.isMobile() || Eyes.AppUtils.isTabletPortrait();
    this.setState({
      showTitleLabel: t ? "hidden" : ""
    });
  }
}
RelatedBlock.html = getRelatedBlockTemplate();
export { RelatedBlock };
