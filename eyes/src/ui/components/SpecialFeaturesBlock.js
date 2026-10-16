// Recovered from app.js:1477051-1478723.
import "../../framework/eyes/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import SpecialFeaturesBlockTemplate from "../templates/SpecialFeaturesBlockTemplate.html";
import "../../styles/extracted/SpecialFeaturesBlockStyles.js";
var getSpecialFeaturesBlockTemplate = () => SpecialFeaturesBlockTemplate;
/* 可用工具列表由实体能力生成，已着陆对象隐藏此块；各条目拥有独立查询和导航选项，距离工具保留时间。 */
class SpecialFeaturesBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app, options) {
    super(app, options);
    this._state = {
      ...this._state,
      category: ""
    };
  }
  init() {
    super.init();
    this._element.classList.add("special-features");
  }
  onRouteChange(entityInfo) {
    if (this._app.getManager("content").hasLanded(entityInfo)) return void this.hide();
    if (!this._children.specialFeatures) return;
    this._children.specialFeatures.innerHTML = "";
    this.show();
    const categoryClass = this._app.getManager("content").getColorClass(entityInfo.id);
    this.setState({
      category: categoryClass
    });
    const featureLinks = [];
    if (false !== entityInfo.comparisonFeature && featureLinks.push({
      title: "Compare size",
      link: "/compare"
    }), false !== entityInfo.distanceTool && featureLinks.push({
      title: "Distance Tool",
      link: "/distance",
      options: {
        keepTime: true
      }
    }), entityInfo.hasMoons) {
      if (SolarSystemSceneExports.Entity.getEntityNamesInGroup(entityInfo.id + ", moons").size > 1) {
        const entityTitle = entityInfo.displayName || entityInfo.iauName;
        const moonsTitle = entityTitle + ("s" === entityTitle.slice(-1) ? "'" : "'s") + " Moons";
        featureLinks.push({
          title: moonsTitle,
          link: "/moons"
        });
      }
    }
    0 !== featureLinks.length ? ("Planet" !== entityInfo.category && "moon" !== entityInfo.id || featureLinks.push({
      title: "Telescope Mode",
      link: "/telescope"
    }), featureLinks.forEach(featureLink => {
      const {
        link: link,
        query: queryParams = {},
        options: navigationOptions = {
          __remove: "all"
        }
      } = featureLink;
      const featureRoute = `/${entityInfo.id}${link}`;
      const listItem = document.createElement("li");
      listItem.classList.add("item");
      listItem.classList.add("clickable");
      listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(queryParams, featureRoute, navigationOptions);
      }, false);
      const buttonElement = document.createElement("button");
      buttonElement.classList.add("clickable", "underline", "capitalize");
      buttonElement.innerHTML = featureLink.title;
      listItem.appendChild(buttonElement);
      const chevronElement = document.createElement("span");
      chevronElement.classList.add("icon", "icon-greater", "mobile-icon");
      listItem.appendChild(chevronElement);
      this._children.specialFeatures.appendChild(listItem);
    })) : this.hide();
  }
}
SpecialFeaturesBlock.html = getSpecialFeaturesBlockTemplate();
export { SpecialFeaturesBlock };
