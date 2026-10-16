// Recovered from app.js:215096-216322.
/** 贴图精灵：color 与 colorTexture 相乘；pixelBased 非零时将整个 gl_Position 除以 abs(w)，随后才记录统一深度，保留此既有顺序。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const SpriteShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    pixelBased: "float",
    color: "vec4",
    colorTexture: "sampler2D",
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
			in vec2 uv;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
			uniform float pixelBased;

			out vec2 vUV;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				if (pixelBased != 0.0) {
					gl_Position /= abs(gl_Position.w);
				}
				vUV = uv;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}
			`
  },
  fragment: {
    code: `
			precision highp float;

			uniform vec4 color;
			uniform sampler2D colorTexture;

			in vec2 vUV;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}

			void main() {
				outColor = texture(colorTexture, vUV) * color;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { SpriteShader };
