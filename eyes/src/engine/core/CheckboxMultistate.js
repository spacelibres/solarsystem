/** @eyes-analysis
 * 文件职责：复选框入口适配：副作用导入多态复选框，默认导出基础 Checkbox，另命名导出 CheckboxMultistate，并加载样式。
 * 依据：import ../../ui/components/CheckboxMultistate.js；import ../../ui/components/Checkbox.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:651564-651706.
import "../../ui/components/CheckboxMultistate.js";
import * as Checkbox from "../../ui/components/Checkbox.js";
import "../../styles/extracted/Unidentified521.js";
let defaultExport;
defaultExport = Checkbox.default;
export { default as CheckboxMultistate } from "../../ui/components/CheckboxMultistate.js";
export { defaultExport as default };
