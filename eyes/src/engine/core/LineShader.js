// Recovered from app.js:207289-211400.
/** 以相邻顶点在像素空间构造宽线和接缝；viewportSize 控制分辨率补偿，片段将虚线、辉光和 alphaMultiplier 相乘，使用加法混合且不写深度。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
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
  // 屏幕换算沿用当前引擎的 view.y 分母；此处没有改成常见的投影 w 或视图 z。
  vertex: {
    code: `
			in vec3 position;
			in vec3 positionPrev;
			in vec3 positionNext;
			in vec4 color;
			in float width;
			in float dashOffset;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
			uniform vec2 viewportSize;
			uniform float glowWidth;

			out vec4 fColor;
			out float fDashOffset;
			out float fWidth;
			out float fOffsetScalar;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {
				// Get the line vertices into pixel space.
				vec4 view_center = modelViewMatrix * vec4(position, 1.0);
				vec4 view_prev = modelViewMatrix * vec4(positionPrev, 1.0);
				vec4 view_next = modelViewMatrix * vec4(positionNext, 1.0);
				vec4 projected_center = projectionMatrix * view_center;
				vec4 projected_prev = projectionMatrix * view_prev;
				vec4 projected_next = projectionMatrix * view_next;
				vec2 ndc_center = projected_center.xy / view_center.y;
				vec2 ndc_prev = projected_prev.xy / view_prev.y;
				vec2 ndc_next = projected_next.xy / view_next.y;
				vec2 pixel_center = (ndc_center.xy + 1.0) / 2.0 * viewportSize;
				vec2 pixel_prev = (ndc_prev.xy + 1.0) / 2.0 * viewportSize;
				vec2 pixel_next = (ndc_next.xy + 1.0) / 2.0 * viewportSize;

				// Get the offset of the part perpendicular to the lines.
				vec2 l0 = normalize(pixel_center - pixel_prev);
				vec2 l1 = normalize(pixel_next - pixel_center);
				float resolutionFactor = max(1.0, min(viewportSize.x, viewportSize.y) / 800.0);
				float offsetScalar = sign(width) * (abs(width) / 2.0 + glowWidth) * resolutionFactor;
				vec2 offset = vec2(offsetScalar, offsetScalar);
				if (pixel_center == pixel_prev) {
					if (pixel_center == pixel_next) {
						offset = vec2(0.0, 0.0);
					}
					else {
						offset *= vec2(-l1.y, l1.x);
					}
				}
				else if (pixel_center == pixel_next) {
					offset *= vec2(-l0.y, l0.x);
				}
				else {
					offset *= normalize(vec2(-l0.y - l1.y, l0.x + l1.x));
					offset /= max(0.25, sqrt((1.0 + dot(l0, l1)) / 2.0));
				}

				// Re-add the perpendicular part to the center as the final vertex.
				ndc_center = (pixel_center + offset) / viewportSize * 2.0 - 1.0;
				gl_Position = vec4(ndc_center * view_center.y, projected_center.z, projected_center.w);

				// Set the varyings.
				fColor = color;
				fDashOffset = dashOffset;
				fWidth = width;
				fOffsetScalar = offsetScalar;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}
			`
  },
  fragment: {
    code: `
			precision highp float;

			uniform float alphaMultiplier;
			uniform float dashLength;
			uniform float dashGapLength;
			uniform float glowWidth;

			in vec4 fColor;
			in float fDashOffset;
			in float fWidth;
			in float fOffsetScalar;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}

			float line_dash_func() {
				float u = mod(fDashOffset, dashLength + dashGapLength);
				return float(u < dashLength);
			}

			float edgeGlow() {
				if (glowWidth > 0.0) {
					float value = clamp((fWidth / 2.0 + glowWidth - abs(fOffsetScalar)) / glowWidth, 0.0, 1.0);
					if (value < 1.0) {
						value *= 0.75;
					}
					return value;
				}
				return 1.0;
			}

			void main() {
				outColor = fColor;
				outColor.a *= alphaMultiplier * edgeGlow() * line_dash_func();

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { LineShader };
