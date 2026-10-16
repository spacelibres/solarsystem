/** @eyes-analysis
 * 文件职责：临时通知消息及定时隐藏
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/ToastTemplate.html, ../../styles/extracted/ToastStyles.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:686839-687645.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ToastTemplate from "../templates/ToastTemplate.html";
import "../../styles/extracted/ToastStyles.js";
var getToastTemplate = () => ToastTemplate;
/** @eyes-analysis
 * 类职责：临时通知消息及定时隐藏；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：Toast。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Toast extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；写入 _hideTimeout。
   * 状态写入：_hideTimeout。
   * 调用线索：super。
   */
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
  /** @eyes-analysis
   * 执行 setIcon 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setIcon(t) {
    this.setState({
      iconClass: t
    });
  }
  /** @eyes-analysis
   * 执行 setContent 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  setContent(t, e = null) {
    const i = `<div>${`<span class="content-text">${t}</span>`}${null !== e ? e : ""}</div>`;
    this.setState({
      toastContent: i
    });
  }
  /** @eyes-analysis
   * 执行 setError 对应的组件业务步骤；调用 this.setIcon, this.setState。
   * 调用线索：this.setIcon、this.setState。
   */
  setError(t) {
    this.setIcon(t ? "icon-error" : "icon-locked");
    this.setState({
      errorClass: t ? "error" : ""
    });
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, this.hide；写入 _hideTimeout。
   * 状态写入：_hideTimeout。
   * 调用线索：clearTimeout、setTimeout、super.show、this.hide。
   */
  show() {
    super.show();
    const {
      hideDelay: hideDelay
    } = this._state;
    hideDelay && (clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(() => {
      this.hide();
    }, hideDelay));
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 super.hide, this.setState。
   * 调用线索：clearTimeout、super.hide、this.setState。
   */
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
