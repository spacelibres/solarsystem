// Recovered from app.js:1460277-1462258.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ExplorationBlockTemplate from "../templates/ExplorationBlockTemplate.html";
var getExplorationBlockTemplate = () => ExplorationBlockTemplate;
/* 初始列表和更多列表分别创建节点，更多项带状态占位符；创建完后重新扫描变量绑定，使继承的更多开关能控制这些新节点。 */
class ExplorationBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app) {
    super(app);
    this._explorationList = null;
  }
  async onRouteChange(entityId, explorationInfo, cancelToken) {
    if (null === this._children.explorationList || void 0 === this._children.explorationList) {
      console.log("explorationList is null or undefined!!!");
      return void this.setEnabled(false);
    }
    this._explorationList = this._children.explorationList;
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(entityId)
    });
    this._explorationList.innerHTML = "";
    void 0 !== explorationInfo && 0 !== explorationInfo.initial.length ? (this._element.classList.remove("hidden"), null === explorationInfo.more || void 0 === explorationInfo.more || explorationInfo.more.length <= 0 ? this.setState({
      hideMoreMessage: "hidden"
    }) : this.setState({
      hideMoreMessage: ""
    }), explorationInfo.initial.forEach(explorationLink => {
      const listItem = document.createElement("li");
      const titleElement = document.createElement("span");
      titleElement.innerHTML = explorationLink.info ? `<span class="semi">${explorationLink.title}</span> (${explorationLink.info})` : `<span class="semi">${explorationLink.title}</span>`;
      listItem.appendChild(titleElement);
      listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(explorationLink.url);
      }, false);
      listItem.classList.add("exploration-list-item", "underline");
      listItem.classList.add("clickable");
      const chevronElement = document.createElement("span");
      chevronElement.classList.add("icon", "icon-greater", "mobile-icon");
      listItem.appendChild(chevronElement);
      this._explorationList.appendChild(listItem);
    }), explorationInfo.more.forEach(explorationLink => {
      const listItem = document.createElement("li");
      const titleElement = document.createElement("span");
      titleElement.innerHTML = explorationLink.info ? `<span class="semi">${explorationLink.title}</span> (${explorationLink.info})` : `<span class="semi">${explorationLink.title}</span>`;
      listItem.appendChild(titleElement);
      listItem.addEventListener("click", () => {
        this._app.getManager("router").navigate(explorationLink.url);
      }, false);
      listItem.classList.add("exploration-list-item");
      listItem.classList.add("clickable");
      listItem.classList.add("hidden");
      this._explorationList.appendChild(listItem);
      listItem.classList.add("clickable", "{{moreClass}}", "underline");
    })) : this.setEnabled(false);
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(entityId)
    });
    this._setVariables(this._element);
  }
}
ExplorationBlock.html = getExplorationBlockTemplate();
export { ExplorationBlock };
