// Recovered from app.js:671990-673409.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ButtonsBlockTemplate from "../templates/ButtonsBlockTemplate.html";
import "../../styles/extracted/ButtonsBlockStyles.js";
var getButtonsBlockTemplate = () => ButtonsBlockTemplate;
class ButtonsBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(app, options = {}) {
    super(app, {
      ...options
    });
    this._app = app;
    this._options = options;
    app.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(t => {
      console.warn(t);
    });
  }
  async setUpHTML(t) {
    const {
      buttonContent: buttonContent
    } = t.config.info;
    const i = document.getElementsByClassName("buttons-block");
    buttonContent.forEach((t, e) => {
      const {
        id: id,
        iconSrc: iconSrc,
        label: label
      } = t;
      const r = document.createElement("button");
      i[0].appendChild(r);
      r.classList.add("clickable");
      r.classList.add("custom-button");
      r.classList.add(`${id}`);
      0 === e && r.classList.add("focused");
      const a = document.createElement("img");
      r.appendChild(a);
      a.classList.add("button-icon");
      a.src = iconSrc;
      const l = document.createTextNode(label);
      r.appendChild(l);
      r.onclick = this.buttonClick;
    });
  }
  buttonClick = async t => {
    const {
      buttonContent: buttonContent
    } = this._options.config.info;
    const timeManager = this._app.getManager("time");
    const s = Object.values(buttonContent).find(e => t.target.classList.contains(e.id));
    document.querySelectorAll(".custom-button").forEach(t => t.classList.remove("focused"));
    s.timeLimits ? (timeManager.setMin(s.timeLimits.min), timeManager.setMax(s.timeLimits.max)) : timeManager.resetLimits();
    const {
      _id: _id
    } = this._app.getComponent("story");
    const o = this._app.getManager("content").getStory(_id).slides[0].time;
    timeManager.setTime(s.startTime ?? o);
    timeManager.setTimeRate(300);
    t.target.classList.add("focused");
    s.onClick(this._app);
  };
}
ButtonsBlock.html = getButtonsBlockTemplate();
export { ButtonsBlock };
