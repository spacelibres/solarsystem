/** @eyes-analysis
 * 文件职责：声明 SpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。
 * 依据：import ./ShaderChunkLogDepth.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:215096-216322.
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
    code: `\n\t\t\tin vec3 position;\n\t\t\tin vec2 uv;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform float pixelBased;\n\n\t\t\tout vec2 vUV;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\t\t\t\tif (pixelBased != 0.0) {\n\t\t\t\t\tgl_Position /= abs(gl_Position.w);\n\t\t\t\t}\n\t\t\t\tvUV = uv;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform vec4 color;\n\t\t\tuniform sampler2D colorTexture;\n\n\t\t\tin vec2 vUV;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tvoid main() {\n\t\t\t\toutColor = texture(colorTexture, vUV) * color;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { SpriteShader };
