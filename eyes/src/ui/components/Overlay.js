// Recovered from app.js:573897-575128.
import "../../vendor/modules/Unidentified160.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import OverlayTemplate from "../templates/OverlayTemplate.html";
let defaultExport;
var getOverlayTemplate = () => OverlayTemplate;
/* 覆盖层持有当前内容节点，替换内容时更新同一状态引用；动画结束后才将隐藏覆盖层 display 置为 none，重新显示前恢复 display。 */
class Overlay extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: false,
      isOpenButtonVisible: true,
      content: null,
      ...options
    });
    this._class.isOpenButtonVisibleClass = {
      true: "",
      false: "hidden"
    };
    Object.assign(this._state, {
      isOpenButtonVisibleClass: this._class.isOpenButtonVisibleClass[this._state.isOpenButtonVisible]
    });
    this._scrollbar = null;
  }
  init() {
    super.init();
    null !== this._state.content && this._children.overlayContent.appendChild(this._state.content);
    this._element.addEventListener("click", this.hide);
    this._element.addEventListener("animationend", () => {
      this._children.overlay.classList.contains("hidden") && (this._children.overlay.style.display = "none");
    });
  }
  setContent(contentElement) {
    null === this._state.content ? this._children.overlayContent.appendChild(contentElement) : this._children.overlayContent.replaceChild(contentElement, this._state.content);
    this._state.content = contentElement;
  }
  show() {
    this._element.classList.add("initialized");
    this._children.overlay.style.display = "";
    super.show();
  }
  __enable() {
    super.__enable();
    null === this._scrollbar ? EyesPublicApi.AppUtils.onAttachElement(this._children.overlay, () => {
      this._scrollbar = EyesPublicApi.AppUtils.addScrollbar(this._children.overlay);
    }) : this._scrollbar.scroll(0);
  }
}
Overlay.html = getOverlayTemplate();
defaultExport = Overlay;
export { defaultExport as default };
