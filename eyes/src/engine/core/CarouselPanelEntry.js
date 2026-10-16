/** @eyes-analysis
 * 文件职责：UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。
 * 依据：import ../../ui/components/CarouselPanel.js；import ../../styles/extracted/TutorialOverlayStyles-497.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:619736-619847.
import * as CarouselPanel from "../../ui/components/CarouselPanel.js";
import "../../styles/extracted/TutorialOverlayStyles-497.js";
import "../../styles/extracted/TutorialOverlayStyles-498.js";
import "../../styles/extracted/Unidentified506.js";
import "../../styles/extracted/TutorialOverlayStyles-499.js";
import "../../styles/extracted/TutorialOverlayStyles-500.js";
import "../../styles/extracted/Unidentified507.js";
let defaultExport;
defaultExport = CarouselPanel.default;
export { defaultExport as default };
