/** @eyes-analysis
 * 文件职责：提供对数深度和近/中距离分段深度的着色器片段。
 * 依据：import ../../vendor/three/core.js；ShaderChunkLogDepth @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:24505-25440.
import * as ThreeCore from "../../vendor/three/core.js";
/** @eyes-analysis
 * 类职责：提供对数深度和近/中距离分段深度的着色器片段。
 * 继承：无显式父类；导出：ShaderChunkLogDepth。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ShaderChunkLogDepth {
  static Uniforms = {
    invertDepth: "float",
    nearDistance: "float",
    midDistance: "float"
  };
  static VertexHead = "\n\t\tout float depth;\n\t";
  static Vertex = "\n\t\tdepth = gl_Position.w;\n\t";
  static FragmentHead = "\n\t\tuniform float invertDepth;\n\t\tuniform float nearDistance;\n\t\tuniform float midDistance;\n\t\tin float depth;\n\t";
  static Fragment = "\n\t\tfloat logFactor = 0.01254291648; // 1 / log2(1 + 1e24)\n\t\tfloat nearFactor = 0.5 * (depth - nearDistance) / (midDistance - nearDistance);\n\t\tfloat farFactor = 0.5 * (1.0 + log2(1.0 + depth - midDistance) * logFactor);\n\t\tgl_FragDepth = (1.0 - 2.0 * invertDepth) * (depth >= midDistance ? farFactor : nearFactor) + invertDepth;\n\t";
  static ThreeUniforms = {
    invertDepth: new ThreeCore.Uniform(0),
    nearDistance: new ThreeCore.Uniform(0),
    midDistance: new ThreeCore.Uniform(0)
  };
}
export { ShaderChunkLogDepth };
