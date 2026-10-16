/** @eyes-analysis
 * 文件职责：声明 ConnectedSpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。
 * 依据：import ./ShaderChunkLogDepth.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:204307-207288.
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const ConnectedSpriteShader = {
  uniforms: {
    projectionMatrix: "highp mat4",
    vAxis: "vec3",
    color: "vec4",
    colorTexture: "sampler2D",
    width1: "float",
    width2: "float",
    textureYOffset: "float",
    repeatAmount: "float",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {
    side: "double",
    transparent: true,
    depthWrite: false,
    blending: "normal"
  },
  vertex: {
    code: `\n\t\t\tin vec3 position;\n\n\t\t\tuniform mat4 modelMatrix;\n\t\t\tuniform mat4 viewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\tuniform vec3 vAxis;\n\t\t\tuniform float width1;\n\t\t\tuniform float width2;\n\n\t\t\tout vec2 vPosition;\n\t\t\tout float vU;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\n\t\t\t\t// Get the width and the model origin in world-space.\n\t\t\t\tfloat width = mix(width1, width2, position.z);\n\t\t\t\tvec4 modelPosition = modelMatrix * vec4(0, 0, 0, 1);\n\n\t\t\t\t// Get the vertex position in world space.\n\t\t\t\t// It is a combination of the origin of the model, length axis, and width axis.\n\t\t\t\tvec4 worldPosition = modelPosition\n\t\t\t\t\t+ vec4(vAxis, 0) * position.z\n\t\t\t\t\t+ vec4(normalize(cross(normalize(modelPosition.xyz), normalize(vAxis))), 0) * position.x * width;\n\n\t\t\t\t// Set the final projected position.\n\t\t\t\tgl_Position = projectionMatrix * viewMatrix * worldPosition;\n\n\t\t\t\t// Setup a vPosition and vU for use in the fragment shader.\n\t\t\t\tvPosition = vec2(0.5 * (position.x + 1.0), position.z);\n\t\t\t\t#ifdef PIXEL_BASED\n\t\t\t\t\tvPosition.y *= abs(gl_Position.w);\n\t\t\t\t#endif\n\t\t\t\tvU = position.z;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform vec4 color;\n\t\t\tuniform sampler2D colorTexture;\n\t\t\tuniform float width1;\n\t\t\tuniform float width2;\n\t\t\tuniform float textureYOffset;\n\t\t\tuniform float repeatAmount;\n\n\t\t\tin vec2 vPosition;\n\t\t\tin float vU;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tvoid main() {\n\n\t\t\t\t// If we're using pixel-based, we need to undo the perspective divide that happened.\n\t\t\t\t#ifdef PIXEL_BASED\n\t\t\t\t\tvec2 uv = vec2(vPosition.x, vPosition.y * gl_FragCoord.w);\n\t\t\t\t#else\n\t\t\t\t\tvec2 uv = vPosition;\n\t\t\t\t#endif\n\n\t\t\t\t// Get a correct use that uses the repeat amount and y offset.\n\t\t\t\t// There's a complicated formula, because the widths may be different and the shape of the sprite may be a trapezoid.\n\t\t\t\tfloat f = width2 * vU / (width1 * (1.0 - vU) + width2 * vU);\n\t\t\t\tfloat uFactor = step(vU, uv.x);\n\t\t\t\tuv.x = (1.0 - uFactor) * uv.x * f / vU + uFactor * (1.0 + (uv.x - 1.0) * (1.0 - f) / (1.0 - vU));\n\t\t\t\tuv.y = uv.y * repeatAmount + textureYOffset;\n\n\t\t\t\t// Apply the texture and color.\n\t\t\t\toutColor = color * texture(colorTexture, uv);\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}`
  }
};
export { ConnectedSpriteShader };
