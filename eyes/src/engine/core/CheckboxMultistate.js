// Recovered from app.js:651564-651706.
/* 命名导出为多态复选框，但默认导出仍是原 Checkbox；保留原兼容导出契约。 */
import "../../ui/components/CheckboxMultistate.js";
import * as Checkbox from "../../ui/components/Checkbox.js";
import "../../styles/extracted/Unidentified521.js";
let defaultExport;
defaultExport = Checkbox.default;
export { default as CheckboxMultistate } from "../../ui/components/CheckboxMultistate.js";
export { defaultExport as default };
