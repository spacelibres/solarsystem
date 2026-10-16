/** @eyes-analysis
 * 文件职责：DescriptionBlock-541 模块
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/DescriptionBlockTemplate-542.html, ../../styles/extracted/DescriptionBlockStyles-543.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:669611-670544.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import DescriptionBlockTemplate from "../templates/DescriptionBlockTemplate-542.html";
import "../../styles/extracted/DescriptionBlockStyles-543.js";
var getDescriptionBlockTemplate = () => DescriptionBlockTemplate;
/** @eyes-analysis
 * 类职责：可展开的描述正文与更多内容；继承 EyesPublicApi.StoryBaseContentBlock
 * 继承：EyesPublicApi.StoryBaseContentBlock；导出：DescriptionBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DescriptionBlock extends EyesPublicApi.StoryBaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign；写入 _more。
   * 状态写入：_class.hasMoreClass、_more。
   * 调用线索：Object.assign、super。
   */
  constructor(t, e = {}) {
    super(t, {
      hasMore: false,
      isMoreVisible: false,
      ...e
    });
    this._class.hasMoreClass = {
      true: "",
      false: "hidden"
    };
    this._more = {
      isVisible: {
        moreMessage: "Show Less",
        moreIcon: "icon-minus",
        moreClass: ""
      },
      isHidden: {
        moreMessage: "Show More",
        moreIcon: "icon-plus",
        moreClass: "hidden"
      }
    };
    Object.assign(this._state, this._more.isHidden, {
      hasMoreClass: this._class.hasMoreClass[this._state.hasMore]
    });
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this.setState。
   * 调用线索：Boolean、super.init、this.setState。
   */
  init() {
    super.init();
    const t = Boolean(this._config.info.more);
    this.setState({
      hasMore: t,
      hasMoreClass: this._class.hasMoreClass[t]
    });
  }
  /** @eyes-analysis
   * 执行 showMore 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  showMore() {
    this.setState({
      isMoreVisible: true,
      ...this._more.isVisible
    });
  }
  /** @eyes-analysis
   * 执行 hideMore 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  hideMore() {
    this.setState({
      isMoreVisible: false,
      ...this._more.isHidden
    });
  }
  /** @eyes-analysis
   * 执行 toggleMore 对应的组件业务步骤；调用 this.hideMore, this.showMore。
   * 调用线索：this.hideMore、this.showMore。
   */
  toggleMore() {
    this._state.isMoreVisible ? this.hideMore() : this.showMore();
  }
}
DescriptionBlock.html = getDescriptionBlockTemplate();
export { DescriptionBlock };
