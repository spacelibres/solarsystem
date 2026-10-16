// Recovered from app.js:203462-204306.
/** 纯色基础面：与透明版使用相同位置与 color 路径，但 properties 为空，具体透明/深度状态沿用材质默认值。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const BasicShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    color: "vec4",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {},
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

			void main() {
				outColor = color;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { BasicShader };
