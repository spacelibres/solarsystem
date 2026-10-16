// 材质描述校验要求 uniforms 为字符串类型映射，vertex/fragment 各含 code 字符串；properties 与 extensions 可缺省，但存在时逐项验证枚举和类型。
// Recovered from app.js:37560-39658.
import * as JsonHelper from "./JsonHelper.js";
function assertIsShader(shader) {
  if (!JsonHelper.JsonHelper.isObject(shader)) throw new Error("Json is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(shader, "uniforms", JsonHelper.JsonHelper.isObjectOfStrings)) throw new Error("The uniforms property is not an object of strings.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader, "properties", JsonHelper.JsonHelper.isObject)) throw new Error("The properties property is not an object.");
  if (shader.properties) {
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.properties, "transparent", JsonHelper.JsonHelper.isBoolean)) throw new Error("The properties.transparent property is not a boolean.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.properties, "depthWrite", JsonHelper.JsonHelper.isBoolean)) throw new Error("The properties.depthWrite property is not a boolean.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.properties, "side", side => "front" === side || "back" === side || "double" === side)) throw new Error("The properties.side property is not front, back, or double.");
    if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.properties, "blending", blending => "normal" === blending || "additive" === blending || "subtractive" === blending || "multiply" === blending || "custom" === blending)) throw new Error("The properties.blending property is not normal, additive, subtractive, multiply, or custom.");
  }
  if (!JsonHelper.JsonHelper.hasPropOfType(shader, "vertex", JsonHelper.JsonHelper.isObject)) throw new Error("The vertex property is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(shader.vertex, "code", JsonHelper.JsonHelper.isString)) throw new Error("The vertex.code property is not a string.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.vertex, "extensions", JsonHelper.JsonHelper.isArrayOfStrings)) throw new Error("The vertex.extensions property is not an array of strings.");
  if (!JsonHelper.JsonHelper.hasPropOfType(shader, "fragment", JsonHelper.JsonHelper.isObject)) throw new Error("The fragment property is not an object.");
  if (!JsonHelper.JsonHelper.hasPropOfType(shader.fragment, "code", JsonHelper.JsonHelper.isString)) throw new Error("The fragment.code property is not a string.");
  if (!JsonHelper.JsonHelper.hasOptionalPropOfType(shader.fragment, "extensions", JsonHelper.JsonHelper.isArrayOfStrings)) throw new Error("The fragment.extensions property is not an array of strings.");
}
export { assertIsShader };
