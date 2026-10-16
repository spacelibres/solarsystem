// Recovered from app.js:671990-673409.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ButtonsBlockTemplate from "../templates/ButtonsBlockTemplate.html";
import "../../styles/extracted/ButtonsBlockStyles.js";
var getButtonsBlockTemplate = () => ButtonsBlockTemplate;
/* 按钮定义由故事配置持有；场景就绪后创建 DOM，点击时先切换时间边界与速率，再执行该按钮提供的故事回调。 */
class ButtonsBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(app, options = {}) {
    super(app, {
      ...options
    });
    this._app = app;
    this._options = options;
    app.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(loadError => {
      console.warn(loadError);
    });
  }
  async setUpHTML(options) {
    const {
      buttonContent: buttonContent
    } = options.config.info;
    const blockElements = document.getElementsByClassName("buttons-block");
    buttonContent.forEach((buttonInfo, buttonIndex) => {
      const {
        id: id,
        iconSrc: iconSrc,
        label: label
      } = buttonInfo;
      const buttonElement = document.createElement("button");
      blockElements[0].appendChild(buttonElement);
      buttonElement.classList.add("clickable");
      buttonElement.classList.add("custom-button");
      buttonElement.classList.add(`${id}`);
      0 === buttonIndex && buttonElement.classList.add("focused");
      const iconElement = document.createElement("img");
      buttonElement.appendChild(iconElement);
      iconElement.classList.add("button-icon");
      iconElement.src = iconSrc;
      const labelNode = document.createTextNode(label);
      buttonElement.appendChild(labelNode);
      buttonElement.onclick = this.buttonClick;
    });
  }
  buttonClick = async clickEvent => {
    const {
      buttonContent: buttonContent
    } = this._options.config.info;
    const timeManager = this._app.getManager("time");
    const selectedButton = Object.values(buttonContent).find(buttonInfo => clickEvent.target.classList.contains(buttonInfo.id));
    document.querySelectorAll(".custom-button").forEach(buttonElement => buttonElement.classList.remove("focused"));
    selectedButton.timeLimits ? (timeManager.setMin(selectedButton.timeLimits.min), timeManager.setMax(selectedButton.timeLimits.max)) : timeManager.resetLimits();
    const {
      _id: _id
    } = this._app.getComponent("story");
    const storyStartTime = this._app.getManager("content").getStory(_id).slides[0].time;
    timeManager.setTime(selectedButton.startTime ?? storyStartTime);
    timeManager.setTimeRate(300);
    clickEvent.target.classList.add("focused");
    selectedButton.onClick(this._app);
  };
}
ButtonsBlock.html = getButtonsBlockTemplate();
export { ButtonsBlock };
