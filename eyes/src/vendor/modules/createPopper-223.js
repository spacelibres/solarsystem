/** @eyes-analysis
 * 文件职责：提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1109826-1110188.；exports: createPopper, defaultModifiers, detectOverflow, popperGenerator
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1109826-1110188.
import * as createPopper from "./createPopper-174.js";
import "./Unidentified197.js";
import * as Unidentified210 from "./Unidentified210.js";
import * as Unidentified211 from "./Unidentified211.js";
import * as mapToStyles from "./mapToStyles-212.js";
import * as Unidentified169 from "./Unidentified169.js";
var defaultModifiers = [Unidentified210.default, Unidentified211.default, mapToStyles.default, Unidentified169.default],
  u = (0, createPopper.popperGenerator)({
    defaultModifiers: defaultModifiers
  });
export { u as createPopper };
export { defaultModifiers };
export { default as detectOverflow } from "./Unidentified197.js";
export { popperGenerator } from "./createPopper-174.js";
