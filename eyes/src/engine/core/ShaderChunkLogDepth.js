// Recovered from app.js:24505-25440.
/** 所有自定义材质共用的分段深度协议：近段线性映射到半区，远段对数压缩；invertDepth 翻转方向，nearDistance/midDistance 必须与 gl_Position.w 使用一致深度单位且不能相等。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ThreeCore from "../../vendor/three/core.js";
class ShaderChunkLogDepth {
  static Uniforms = {
    invertDepth: "float",
    nearDistance: "float",
    midDistance: "float"
  };
  static VertexHead = `
		out float depth;
	`;
  static Vertex = `
		depth = gl_Position.w;
	`;
  static FragmentHead = `
		uniform float invertDepth;
		uniform float nearDistance;
		uniform float midDistance;
		in float depth;
	`;
  static Fragment = `
		float logFactor = 0.01254291648; // 1 / log2(1 + 1e24)
		float nearFactor = 0.5 * (depth - nearDistance) / (midDistance - nearDistance);
		float farFactor = 0.5 * (1.0 + log2(1.0 + depth - midDistance) * logFactor);
		gl_FragDepth = (1.0 - 2.0 * invertDepth) * (depth >= midDistance ? farFactor : nearFactor) + invertDepth;
	`;
  // 静态共享 Uniform 模板；是否克隆由材质创建方负责。
  static ThreeUniforms = {
    invertDepth: new ThreeCore.Uniform(0),
    nearDistance: new ThreeCore.Uniform(0),
    midDistance: new ThreeCore.Uniform(0)
  };
}
export { ShaderChunkLogDepth };
