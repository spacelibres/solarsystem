/** @eyes-analysis
 * 文件职责：提供 applyStyles、arrow、computeStyles、createPopper、createPopperLite、defaultModifiers、detectOverflow、eventListeners、flip、hide、offset、popperGenerator、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:2376719-2377622.；exports: applyStyles, arrow, computeStyles, createPopper, createPopperLite, defaultModifiers, detectOverflow, eventListeners, flip, hide, offset, popperGenerator, popperOffsets, preventOverflow
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2376719-2377622.
import * as createPopper from "./createPopper-935.js";
import "./Unidentified958.js";
import * as Unidentified971 from "./Unidentified971.js";
import * as Unidentified972 from "./Unidentified972.js";
import * as mapToStyles from "./mapToStyles-973.js";
import * as Unidentified930 from "./Unidentified930.js";
import * as distanceAndSkiddingToXY from "./distanceAndSkiddingToXY-974.js";
import * as Unidentified975 from "./Unidentified975.js";
import * as Unidentified979 from "./Unidentified979.js";
import * as Unidentified982 from "./Unidentified982.js";
import * as Unidentified983 from "./Unidentified983.js";
import "./createPopper-984.js";
import "./applyStyles-985.js";
var defaultModifiers = [Unidentified971.default, Unidentified972.default, mapToStyles.default, Unidentified930.default, distanceAndSkiddingToXY.default, Unidentified975.default, Unidentified979.default, Unidentified982.default, Unidentified983.default],
  _ = (0, createPopper.popperGenerator)({
    defaultModifiers: defaultModifiers
  });
export { applyStyles } from "./applyStyles-985.js";
export { arrow } from "./applyStyles-985.js";
export { computeStyles } from "./applyStyles-985.js";
export { _ as createPopper };
export { createPopper as createPopperLite } from "./createPopper-984.js";
export { defaultModifiers };
export { default as detectOverflow } from "./Unidentified958.js";
export { eventListeners } from "./applyStyles-985.js";
export { flip } from "./applyStyles-985.js";
export { hide } from "./applyStyles-985.js";
export { offset } from "./applyStyles-985.js";
export { popperGenerator } from "./createPopper-935.js";
export { popperOffsets } from "./applyStyles-985.js";
export { preventOverflow } from "./applyStyles-985.js";
