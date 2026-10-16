// Recovered from app.js:686839-687645.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ToastTemplate from "../templates/ToastTemplate.html";
import "../../styles/extracted/ToastStyles.js";
var getToastTemplate = () => ToastTemplate;
class Toast extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: false,
      iconClass: "icon-locked",
      toastContent: "TOAST!",
      hideDelay: 2e3,
      errorClass: "",
      ...e
    });
    this._hideTimeout = null;
  }
  setIcon(t) {
    this.setState({
      iconClass: t
    });
  }
  setContent(t, e = null) {
    const i = `<div>${`<span class="content-text">${t}</span>`}${null !== e ? e : ""}</div>`;
    this.setState({
      toastContent: i
    });
  }
  setError(t) {
    this.setIcon(t ? "icon-error" : "icon-locked");
    this.setState({
      errorClass: t ? "error" : ""
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
