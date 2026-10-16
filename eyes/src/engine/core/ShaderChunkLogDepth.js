// Recovered from app.js:24505-25440.
import * as ThreeCore from "../../vendor/three/core.js";
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
