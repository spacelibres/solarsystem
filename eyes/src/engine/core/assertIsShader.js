/** @eyes-analysis
 * 文件职责：检查对象是否满足着色器描述结构并在无效时抛错。
 * 依据：import ./JsonHelper.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:37560-39658.
import * as JsonHelper from "./JsonHelper.js";
function assertIsShader(t) {
  if (!JsonHelper.JsonHelper.isObject(t)) throw new Error("Json is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(t, "uniforms", JsonHelper.JsonHelper.isObjectOfStrings)) throw new Error("The uniforms property is not an object of strings.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t, "properties", JsonHelper.JsonHelper.isObject)) throw new Error("The properties property is not an object.");
  if (t.properties) {
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.properties, "transparent", JsonHelper.JsonHelper.isBoolean)) throw new Error("The properties.transparent property is not a boolean.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.properties, "depthWrite", JsonHelper.JsonHelper.isBoolean)) throw new Error("The properties.depthWrite property is not a boolean.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.properties, "side", t => "front" === t || "back" === t || "double" === t)) throw new Error("The properties.side property is not front, back, or double.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.properties, "blending", t => "normal" === t || "additive" === t || "subtractive" === t || "multiply" === t || "custom" === t)) throw new Error("The properties.blending property is not normal, additive, subtractive, multiply, or custom.");
  }
  if (!JsonHelper.JsonHelper.hasPropOfType(t, "vertex", JsonHelper.JsonHelper.isObject)) throw new Error("The vertex property is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(t.vertex, "code", JsonHelper.JsonHelper.isString)) throw new Error("The vertex.code property is not a string.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.vertex, "extensions", JsonHelper.JsonHelper.isArrayOfStrings)) throw new Error("The vertex.extensions property is not an array of strings.");
  if (!JsonHelper.JsonHelper.hasPropOfType(t, "fragment", JsonHelper.JsonHelper.isObject)) throw new Error("The fragment property is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(t.fragment, "code", JsonHelper.JsonHelper.isString)) throw new Error("The fragment.code property is not a string.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(t.fragment, "extensions", JsonHelper.JsonHelper.isArrayOfStrings)) throw new Error("The fragment.extensions property is not an array of strings.");
}
export { assertIsShader };
