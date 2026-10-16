/** @eyes-analysis
 * 文件职责：提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:2404021-2404383.；exports: createPopper, defaultModifiers, detectOverflow, popperGenerator
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2404021-2404383.
import * as createPopper from "./createPopper-935.js";
import "./Unidentified958.js";
import * as Unidentified971 from "./Unidentified971.js";
import * as Unidentified972 from "./Unidentified972.js";
import * as mapToStyles from "./mapToStyles-973.js";
import * as Unidentified930 from "./Unidentified930.js";
var defaultModifiers = [Unidentified971.default, Unidentified972.default, mapToStyles.default, Unidentified930.default],
  u = (0, createPopper.popperGenerator)({
    defaultModifiers: defaultModifiers
  });
export { u as createPopper };
export { defaultModifiers };
export { default as detectOverflow } from "./Unidentified958.js";
export { popperGenerator } from "./createPopper-935.js";
