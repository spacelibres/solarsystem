/** @eyes-analysis
 * 文件职责：声明 SpriteParticlesShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。
 * 依据：import ./ShaderChunkLogDepth.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:213868-215095.
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
    code: `\n\t\t\tin vec3 position;\n\t\t\tin vec4 color;\n\t\t\tin vec3 offset;\n\t\t\tin float scale;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\tout vec4 fColor;\n\t\t\tout vec2 fPosition;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\t\t\t\tvec4 viewPosition = modelViewMatrix * vec4(offset, 1.0) + vec4(position.x, position.y, -1.0, 0.0) * scale;\n\t\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\t\tfColor = color;\n\t\t\t\tfPosition = position.xy;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tin vec4 fColor;\n\t\t\tin vec2 fPosition;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tvoid main() {\n\t\t\t\toutColor = fColor * (1.0 - length(fPosition));\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { SpriteParticlesShader };
