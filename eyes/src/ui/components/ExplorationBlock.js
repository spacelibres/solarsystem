// Recovered from app.js:1460277-1462258.
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import ExplorationBlockTemplate from "../templates/ExplorationBlockTemplate.html";
var getExplorationBlockTemplate = () => ExplorationBlockTemplate;
class ExplorationBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(t) {
    super(t);
    this._explorationList = null;
  }
  async onRouteChange(t, e, i) {
    if (null === this._children.explorationList || void 0 === this._children.explorationList) {
      console.log("explorationList is null or undefined!!!");
      return void this.setEnabled(false);
    }
    this._explorationList = this._children.explorationList;
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(t)
    });
    this._explorationList.innerHTML = "";
    void 0 !== e && 0 !== e.initial.length ? (this._element.classList.remove("hidden"), null === e.more || void 0 === e.more || e.more.length <= 0 ? this.setState({
      hideMoreMessage: "hidden"
    }) : this.setState({
      hideMoreMessage: ""
    }), e.initial.forEach(t => {
      const e = document.createElement("li");
      const i = document.createElement("span");
      i.innerHTML = t.info ? `<span class="semi">${t.title}</span> (${t.info})` : `<span class="semi">${t.title}</span>`;
      e.appendChild(i);
      e.addEventListener("click", () => {
        this._app.getManager("router").navigate(t.url);
      }, false);
      e.classList.add("exploration-list-item", "underline");
      e.classList.add("clickable");
      const s = document.createElement("span");
      s.classList.add("icon", "icon-greater", "mobile-icon");
      e.appendChild(s);
      this._explorationList.appendChild(e);
    }), e.more.forEach(t => {
      const e = document.createElement("li");
      const i = document.createElement("span");
      i.innerHTML = t.info ? `<span class="semi">${t.title}</span> (${t.info})` : `<span class="semi">${t.title}</span>`;
      e.appendChild(i);
      e.addEventListener("click", () => {
        this._app.getManager("router").navigate(t.url);
      }, false);
      e.classList.add("exploration-list-item");
      e.classList.add("clickable");
      e.classList.add("hidden");
      this._explorationList.appendChild(e);
      e.classList.add("clickable", "{{moreClass}}", "underline");
    })) : this.setEnabled(false);
    this.setState({
      colorClass: this._app.getManager("content").getColorClass(t)
    });
    this._setVariables(this._element);
  }
}
ExplorationBlock.html = getExplorationBlockTemplate();
export { ExplorationBlock };
