/** @eyes-analysis
 * 文件职责：UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。
 * 依据：import ../../ui/components/TutorialOverlay.js；import ../../styles/extracted/Unidentified502.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:612037-612113.
import * as TutorialOverlay from "../../ui/components/TutorialOverlay.js";
import "../../styles/extracted/Unidentified502.js";
let defaultExport;
defaultExport = TutorialOverlay.default;
export { defaultExport as default };
