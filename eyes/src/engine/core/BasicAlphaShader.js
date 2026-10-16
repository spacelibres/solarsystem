// Recovered from app.js:202550-203461.
/** 透明纯色面：position 经模型视图/投影矩阵变换，fragment 原样输出 color；双面、普通混合且不写深度，仍写入统一深度片段。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const BasicAlphaShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    color: "vec4",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {
    transparent: true,
    depthWrite: false,
    side: "double",
    blending: "normal"
  },
  vertex: {
    code: `
			in vec3 position;
			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}
			`
  },
  fragment: {
    code: `
			precision highp float;

			uniform vec4 color;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}
\t
			void main() {
				outColor = color;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { BasicAlphaShader };
