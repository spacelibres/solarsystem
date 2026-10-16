// Recovered from app.js:1477051-1478723.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SpecialFeaturesBlockTemplate from "../templates/SpecialFeaturesBlockTemplate.html";
import "../../styles/extracted/SpecialFeaturesBlockStyles.js";
var getSpecialFeaturesBlockTemplate = () => SpecialFeaturesBlockTemplate;
class SpecialFeaturesBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t, e) {
    super(t, e);
    this._state = {
      ...this._state,
      category: ""
    };
  }
  init() {
    super.init();
    this._element.classList.add("special-features");
  }
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
