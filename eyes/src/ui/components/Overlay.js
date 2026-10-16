// Recovered from app.js:573897-575128.
import "../../vendor/modules/Unidentified160.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import OverlayTemplate from "../templates/OverlayTemplate.html";
let defaultExport;
var getOverlayTemplate = () => OverlayTemplate;
class Overlay extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: false,
      isOpenButtonVisible: true,
      content: null,
      ...e
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
  setContent(t) {
    null === this._state.content ? this._children.overlayContent.appendChild(t) : this._children.overlayContent.replaceChild(t, this._state.content);
    this._state.content = t;
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
