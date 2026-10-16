// Recovered from app.js:686839-687645.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ToastTemplate from "../templates/ToastTemplate.html";
import "../../styles/extracted/ToastStyles.js";
var getToastTemplate = () => ToastTemplate;
/* 自动隐藏计时器归本组件持有，重复显示先取消旧计时器，手动隐藏也取消计时器并清除错误样式。 */
class Toast extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: false,
      iconClass: "icon-locked",
      toastContent: "TOAST!",
      hideDelay: 2e3,
      errorClass: "",
      ...options
    });
    this._hideTimeout = null;
  }
  setIcon(iconClass) {
    this.setState({
      iconClass: iconClass
    });
  }
  setContent(messageText, appendedHtml = null) {
    const contentHtml = `<div>${`<span class="content-text">${messageText}</span>`}${null !== appendedHtml ? appendedHtml : ""}</div>`;
    this.setState({
      toastContent: contentHtml
    });
  }
  setError(isError) {
    this.setIcon(isError ? "icon-error" : "icon-locked");
    this.setState({
      errorClass: isError ? "error" : ""
    });
  }
  show() {
    super.show();
    const {
      hideDelay: hideDelay
    } = this._state;
    hideDelay && (clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(() => {
      this.hide();
    }, hideDelay));
  }
  hide() {
    super.hide();
    this.setState({
      errorClass: ""
    });
    clearTimeout(this._hideTimeout);
  }
}
Toast.html = getToastTemplate();
export { Toast };
