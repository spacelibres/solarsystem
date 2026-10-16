// Recovered from app.js:211401-213867.
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
    code: `\n\t\t\tin vec3 position;\n\t\t\tin vec2 uv;\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tout vec2 vUV;\n\n\t\t\tvoid main() {\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\t\t\t\tvUV = uv;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform sampler2D colorTexture;\n\t\t\tuniform vec4 colorMultiplier;\n\t\t\tuniform float speed;\n\t\t\tuniform float time;\n\t\t\tin vec2 vUV;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tvec2 v2_construct_func(float x, float y) {\n\t\t\t\treturn vec2(x, y);\n\t\t\t}\n\t\t\tfloat s_mult_func(float s1, float s2) {\n\t\t\t\treturn s1 * s2;\n\t\t\t}\n\t\t\tfloat s_mod_func(float s1, float s2) {\n\t\t\t\treturn mod(s1, s2);\n\t\t\t}\n\t\t\tvec2 v2s_mult_func(vec2 v, float s) {\n\t\t\t\treturn v * s;\n\t\t\t}\n\t\t\tvec2 v2_add_func(vec2 v1, vec2 v2) {\n\t\t\t\treturn v1 + v2;\n\t\t\t}\n\t\t\tvec4 texture_func(sampler2D tex, vec2 uv) {\n\t\t\t\treturn texture(tex, uv);\n\t\t\t}\n\t\t\tvec4 v4v4_mult_func(vec4 v1, vec4 v2) {\n\t\t\t\treturn v1 * v2;\n\t\t\t}\n\t\t\tfloat s_sub_func(float s1, float s2) {\n\t\t\t\treturn s1 - s2;\n\t\t\t}\n\t\t\tvec4 alpha_mult_func(vec4 color, float alpha) {\n\t\t\t\treturn vec4(color.rgb, color.a * alpha);\n\t\t\t}\n\t\t\tvoid main() {\n\t\t\t\tvec2 yAxis = v2_construct_func(0.0, 1.0);\n\t\t\t\tfloat yMultiplier = s_mult_func(time, speed);\n\t\t\t\tfloat yMultiplierMod = s_mod_func(yMultiplier, 1.0);\n\t\t\t\tvec2 uvOffset = v2s_mult_func(yAxis, yMultiplierMod);\n\t\t\t\tvec2 finalUV = v2_add_func(vUV, uvOffset);\n\t\t\t\tvec4 textureOffset = texture_func(colorTexture, finalUV);\n\t\t\t\tvec4 color = v4v4_mult_func(textureOffset, colorMultiplier);\n\t\t\t\tfloat fade = s_sub_func(1.0, vUV.y);\n\t\t\t\tvec4 color_with_fade = alpha_mult_func(color, fade);\n\t\t\t\toutColor = color_with_fade;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { PlumesShader };
