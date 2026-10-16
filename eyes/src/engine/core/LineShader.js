// Recovered from app.js:207289-211400.
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const LineShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    viewportSize: "vec2",
    alphaMultiplier: "float",
    dashLength: "float",
    dashGapLength: "float",
    glowWidth: "float",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {
    transparent: true,
    depthWrite: false,
    side: "double",
    blending: "additive"
  },
  vertex: {
    code: `\n\t\t\tin vec3 position;\n\t\t\tin vec3 positionPrev;\n\t\t\tin vec3 positionNext;\n\t\t\tin vec4 color;\n\t\t\tin float width;\n\t\t\tin float dashOffset;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\t\t\tuniform vec2 viewportSize;\n\t\t\tuniform float glowWidth;\n\n\t\t\tout vec4 fColor;\n\t\t\tout float fDashOffset;\n\t\t\tout float fWidth;\n\t\t\tout float fOffsetScalar;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\t\t\t\t// Get the line vertices into pixel space.\n\t\t\t\tvec4 view_center = modelViewMatrix * vec4(position, 1.0);\n\t\t\t\tvec4 view_prev = modelViewMatrix * vec4(positionPrev, 1.0);\n\t\t\t\tvec4 view_next = modelViewMatrix * vec4(positionNext, 1.0);\n\t\t\t\tvec4 projected_center = projectionMatrix * view_center;\n\t\t\t\tvec4 projected_prev = projectionMatrix * view_prev;\n\t\t\t\tvec4 projected_next = projectionMatrix * view_next;\n\t\t\t\tvec2 ndc_center = projected_center.xy / view_center.y;\n\t\t\t\tvec2 ndc_prev = projected_prev.xy / view_prev.y;\n\t\t\t\tvec2 ndc_next = projected_next.xy / view_next.y;\n\t\t\t\tvec2 pixel_center = (ndc_center.xy + 1.0) / 2.0 * viewportSize;\n\t\t\t\tvec2 pixel_prev = (ndc_prev.xy + 1.0) / 2.0 * viewportSize;\n\t\t\t\tvec2 pixel_next = (ndc_next.xy + 1.0) / 2.0 * viewportSize;\n\n\t\t\t\t// Get the offset of the part perpendicular to the lines.\n\t\t\t\tvec2 l0 = normalize(pixel_center - pixel_prev);\n\t\t\t\tvec2 l1 = normalize(pixel_next - pixel_center);\n\t\t\t\tfloat resolutionFactor = max(1.0, min(viewportSize.x, viewportSize.y) / 800.0);\n\t\t\t\tfloat offsetScalar = sign(width) * (abs(width) / 2.0 + glowWidth) * resolutionFactor;\n\t\t\t\tvec2 offset = vec2(offsetScalar, offsetScalar);\n\t\t\t\tif (pixel_center == pixel_prev) {\n\t\t\t\t\tif (pixel_center == pixel_next) {\n\t\t\t\t\t\toffset = vec2(0.0, 0.0);\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\toffset *= vec2(-l1.y, l1.x);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse if (pixel_center == pixel_next) {\n\t\t\t\t\toffset *= vec2(-l0.y, l0.x);\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\toffset *= normalize(vec2(-l0.y - l1.y, l0.x + l1.x));\n\t\t\t\t\toffset /= max(0.25, sqrt((1.0 + dot(l0, l1)) / 2.0));\n\t\t\t\t}\n\n\t\t\t\t// Re-add the perpendicular part to the center as the final vertex.\n\t\t\t\tndc_center = (pixel_center + offset) / viewportSize * 2.0 - 1.0;\n\t\t\t\tgl_Position = vec4(ndc_center * view_center.y, projected_center.z, projected_center.w);\n\n\t\t\t\t// Set the varyings.\n\t\t\t\tfColor = color;\n\t\t\t\tfDashOffset = dashOffset;\n\t\t\t\tfWidth = width;\n\t\t\t\tfOffsetScalar = offsetScalar;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform float alphaMultiplier;\n\t\t\tuniform float dashLength;\n\t\t\tuniform float dashGapLength;\n\t\t\tuniform float glowWidth;\n\n\t\t\tin vec4 fColor;\n\t\t\tin float fDashOffset;\n\t\t\tin float fWidth;\n\t\t\tin float fOffsetScalar;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tfloat line_dash_func() {\n\t\t\t\tfloat u = mod(fDashOffset, dashLength + dashGapLength);\n\t\t\t\treturn float(u < dashLength);\n\t\t\t}\n\n\t\t\tfloat edgeGlow() {\n\t\t\t\tif (glowWidth > 0.0) {\n\t\t\t\t\tfloat value = clamp((fWidth / 2.0 + glowWidth - abs(fOffsetScalar)) / glowWidth, 0.0, 1.0);\n\t\t\t\t\tif (value < 1.0) {\n\t\t\t\t\t\tvalue *= 0.75;\n\t\t\t\t\t}\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t\treturn 1.0;\n\t\t\t}\n\n\t\t\tvoid main() {\n\t\t\t\toutColor = fColor;\n\t\t\t\toutColor.a *= alphaMultiplier * edgeGlow() * line_dash_func();\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { LineShader };
