/** @eyes-analysis
 * 文件职责：声明 TrailShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。
 * 依据：import ./ShaderChunkLogDepth.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:216323-220972.
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const TrailShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    viewportSize: "vec2",
    alphaMultiplier: "float",
    dashLength: "float",
    dashGapLength: "float",
    glowWidth: "float",
    indexStart: "float",
    indexCount: "float",
    indexLength: "float",
    color: "vec4",
    alphaFade: "float",
    widthMin: "float",
    widthMax: "float",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {
    transparent: true,
    depthWrite: false,
    side: "double",
    blending: "additive"
  },
  vertex: {
    code: `\n\t\t\tin vec3 positionCurr;\n\t\t\tin vec3 positionPrev;\n\t\t\tin vec3 positionNext;\n\t\t\tin float side;\n\t\t\tin float index;\n\t\t\tin float dashOffset;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\tuniform vec2 viewportSize;\n\t\t\tuniform float glowWidth;\n\t\t\tuniform float indexStart;\n\t\t\tuniform float indexCount;\n\t\t\tuniform float indexLength;\n\t\t\tuniform float widthMin;\n\t\t\tuniform float widthMax;\n\n\t\t\tout float fDashOffset;\n\t\t\tout float fWidth;\n\t\t\tout float fOffsetScalar;\n\t\t\tout float fIndexU;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\t\t\t\t// Get the width depending on the length.\n\t\t\t\tfloat indexU = mod(index - indexStart + indexLength, indexLength) / (indexCount - 1.0);\n\t\t\t\tfloat width = mix(widthMin, widthMax, indexU);\n\n\t\t\t\t// Get the line vertices into pixel space.\n\t\t\t\tvec4 viewCenter = modelViewMatrix * vec4(positionCurr, 1.0);\n\t\t\t\tvec4 viewPrev = modelViewMatrix * vec4(positionPrev, 1.0);\n\t\t\t\tvec4 viewNext = modelViewMatrix * vec4(positionNext, 1.0);\n\t\t\t\tvec4 projectedCenter = projectionMatrix * viewCenter;\n\t\t\t\tvec4 projected_prev = projectionMatrix * viewPrev;\n\t\t\t\tvec4 projected_next = projectionMatrix * viewNext;\n\t\t\t\tvec2 ndcCenter = projectedCenter.xy / viewCenter.y;\n\t\t\t\tvec2 ndcPrev = projected_prev.xy / viewPrev.y;\n\t\t\t\tvec2 ndcNext = projected_next.xy / viewNext.y;\n\t\t\t\tvec2 pixelCenter = (ndcCenter.xy + 1.0) / 2.0 * viewportSize;\n\t\t\t\tvec2 pixelPrev = (ndcPrev.xy + 1.0) / 2.0 * viewportSize;\n\t\t\t\tvec2 pixelNext = (ndcNext.xy + 1.0) / 2.0 * viewportSize;\n\n\t\t\t\t// Get the offset of the part perpendicular to the lines.\n\t\t\t\tvec2 l0 = normalize(pixelCenter - pixelPrev);\n\t\t\t\tvec2 l1 = normalize(pixelNext - pixelCenter);\n\t\t\t\tfloat resolutionFactor = max(1.0, min(viewportSize.x, viewportSize.y) / 800.0);\n\t\t\t\tfloat offsetScalar = side * (width / 2.0 + glowWidth) * resolutionFactor;\n\t\t\t\tvec2 offset = vec2(offsetScalar, offsetScalar);\n\t\t\t\tif (pixelCenter == pixelPrev) {\n\t\t\t\t\tif (pixelCenter == pixelNext) {\n\t\t\t\t\t\toffset = vec2(0.0, 0.0);\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\toffset *= vec2(-l1.y, l1.x);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse if (pixelCenter == pixelNext) {\n\t\t\t\t\toffset *= vec2(-l0.y, l0.x);\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\toffset *= normalize(vec2(-l0.y - l1.y, l0.x + l1.x));\n\t\t\t\t\toffset /= sqrt((1.0 + max(0.0, dot(l0, l1))) / 2.0);\n\t\t\t\t}\n\n\t\t\t\t// Re-add the perpendicular part to the center as the final vertex.\n\t\t\t\tndcCenter = (pixelCenter + offset) / viewportSize * 2.0 - 1.0;\n\t\t\t\tgl_Position = vec4(ndcCenter * viewCenter.y, projectedCenter.z, projectedCenter.w);\n\n\t\t\t\t// Set the varyings.\n\t\t\t\tfIndexU = indexU;\n\t\t\t\tfDashOffset = dashOffset;\n\t\t\t\tfWidth = width;\n\t\t\t\tfOffsetScalar = offsetScalar;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform vec4 color;\n\t\t\tuniform float alphaMultiplier;\n\t\t\tuniform float alphaFade;\n\t\t\tuniform float dashLength;\n\t\t\tuniform float dashGapLength;\n\t\t\tuniform float glowWidth;\n\n\t\t\tin float fIndexU;\n\t\t\tin float fDashOffset;\n\t\t\tin float fWidth;\n\t\t\tin float fOffsetScalar;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\t\n\t\t\tfloat lineDash() {\n\t\t\t\tfloat u = mod(fDashOffset, dashLength + dashGapLength);\n\t\t\t\treturn float(u < dashLength);\n\t\t\t}\n\n\t\t\tfloat edgeGlow() {\n\t\t\t\tif (glowWidth > 0.0) {\n\t\t\t\t\tfloat value = clamp((fWidth / 2.0 + glowWidth - abs(fOffsetScalar)) / glowWidth, 0.0, 1.0);\n\t\t\t\t\tif (value < 1.0) {\n\t\t\t\t\t\tvalue *= 0.75;\n\t\t\t\t\t}\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t\treturn 1.0;\n\t\t\t}\n\n\t\t\tvoid main() {\n\t\t\t\toutColor = color;\n\t\t\t\toutColor.a *= alphaMultiplier * edgeGlow() * lineDash() * mix(alphaFade, 1.0, fIndexU);\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { TrailShader };
