/** @eyes-analysis
 * 文件职责：遮罩显示和关闭交互
 * 依据：imports: ../../vendor/modules/Unidentified160.cjs, ../../framework/eyes/public-api.js, ../templates/OverlayTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:573897-575128.
import "../../vendor/modules/Unidentified160.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import OverlayTemplate from "../templates/OverlayTemplate.html";
let defaultExport;
var getOverlayTemplate = () => OverlayTemplate;
/** @eyes-analysis
 * 类职责：遮罩显示和关闭交互；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Overlay extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign；写入 _scrollbar。
   * 状态写入：_class.isOpenButtonVisibleClass、_scrollbar。
   * 调用线索：Object.assign、super。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._children.overlayContent.appendChild, this._element.addEventListener, this._children.overlay.classList.contains。
   * 状态写入：_children.overlay.style.display。
   * 调用线索：super.init、this._children.overlay.classList.contains、this._children.overlayContent.appendChild、this._element.addEventListener。
   */
  init() {
    super.init();
    null !== this._state.content && this._children.overlayContent.appendChild(this._state.content);
    this._element.addEventListener("click", this.hide);
    this._element.addEventListener("animationend", () => {
      this._children.overlay.classList.contains("hidden") && (this._children.overlay.style.display = "none");
    });
  }
  /** @eyes-analysis
   * 执行 setContent 对应的组件业务步骤；调用 this._children.overlayContent.appendChild, this._children.overlayContent.replaceChild。
   * 状态写入：_state.content。
   * 调用线索：this._children.overlayContent.appendChild、this._children.overlayContent.replaceChild。
   */
  setContent(t) {
    null === this._state.content ? this._children.overlayContent.appendChild(t) : this._children.overlayContent.replaceChild(t, this._state.content);
    this._state.content = t;
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this._element.classList.add, super.show。
   * 状态写入：_children.overlay.style.display。
   * 调用线索：super.show、this._element.classList.add。
   */
  show() {
    this._element.classList.add("initialized");
    this._children.overlay.style.display = "";
    super.show();
  }
  /** @eyes-analysis
   * 挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, EyesPublicApi.AppUtils.onAttachElement, EyesPublicApi.AppUtils.addScrollbar, this._scrollbar.scroll；写入 _scrollbar。
   * 状态写入：_scrollbar。
   * 调用线索：EyesPublicApi.AppUtils.addScrollbar、EyesPublicApi.AppUtils.onAttachElement、super.__enable、this._scrollbar.scroll。
   */
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
