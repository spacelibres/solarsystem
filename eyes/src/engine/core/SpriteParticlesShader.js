// Recovered from app.js:213868-215095.
/** 粒子实例以 offset 定位、scale 缩放面向视图的平面；fragment 乘以 1-length(fPosition) 形成径向衰减，原式不显式 discard 圆外片段；加法混合。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const SpriteParticlesShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {
    transparent: true,
    depthWrite: false,
    side: "double",
    blending: "additive"
  },
  vertex: {
    code: `
			in vec3 position;
			in vec4 color;
			in vec3 offset;
			in float scale;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			out vec4 fColor;
			out vec2 fPosition;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {
				vec4 viewPosition = modelViewMatrix * vec4(offset, 1.0) + vec4(position.x, position.y, -1.0, 0.0) * scale;
				gl_Position = projectionMatrix * viewPosition;
				fColor = color;
				fPosition = position.xy;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}
			`
  },
  fragment: {
    code: `
			precision highp float;

			in vec4 fColor;
			in vec2 fPosition;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}

			void main() {
				outColor = fColor * (1.0 - length(fPosition));

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { SpriteParticlesShader };
