// Recovered from app.js:211401-213867.
/** 喷流贴图：time*speed 沿 UV 的 Y 方向以周期 1 滚动，colorMultiplier 调色，再以 1-vUV.y 衰减 alpha；生成式 GLSL helper 名称原样保留。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const PlumesShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    colorTexture: "sampler2D",
    colorMultiplier: "vec4",
    speed: "float",
    time: "float",
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

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			out vec2 vUV;

			void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				vUV = uv;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}
			`
  },
  fragment: {
    code: `
			precision highp float;

			uniform sampler2D colorTexture;
			uniform vec4 colorMultiplier;
			uniform float speed;
			uniform float time;
			in vec2 vUV;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}

			vec2 v2_construct_func(float x, float y) {
				return vec2(x, y);
			}
			float s_mult_func(float s1, float s2) {
				return s1 * s2;
			}
			float s_mod_func(float s1, float s2) {
				return mod(s1, s2);
			}
			vec2 v2s_mult_func(vec2 v, float s) {
				return v * s;
			}
			vec2 v2_add_func(vec2 v1, vec2 v2) {
				return v1 + v2;
			}
			vec4 texture_func(sampler2D tex, vec2 uv) {
				return texture(tex, uv);
			}
			vec4 v4v4_mult_func(vec4 v1, vec4 v2) {
				return v1 * v2;
			}
			float s_sub_func(float s1, float s2) {
				return s1 - s2;
			}
			vec4 alpha_mult_func(vec4 color, float alpha) {
				return vec4(color.rgb, color.a * alpha);
			}
			void main() {
				vec2 yAxis = v2_construct_func(0.0, 1.0);
				float yMultiplier = s_mult_func(time, speed);
				float yMultiplierMod = s_mod_func(yMultiplier, 1.0);
				vec2 uvOffset = v2s_mult_func(yAxis, yMultiplierMod);
				vec2 finalUV = v2_add_func(vUV, uvOffset);
				vec4 textureOffset = texture_func(colorTexture, finalUV);
				vec4 color = v4v4_mult_func(textureOffset, colorMultiplier);
				float fade = s_sub_func(1.0, vUV.y);
				vec4 color_with_fade = alpha_mult_func(color, fade);
				outColor = color_with_fade;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { PlumesShader };
