// Recovered from app.js:216323-220972.
/** 环形轨迹以 indexStart/indexCount/indexLength 还原连续位置比例，插值宽度并在像素空间构造双侧带；fragment 将轨迹透明度梯度、虚线及边缘辉光相乘。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
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
  // 屏幕换算沿用当前引擎的 view.y 分母；此处没有改成常见的投影 w 或视图 z。
  vertex: {
    code: `
			in vec3 positionCurr;
			in vec3 positionPrev;
			in vec3 positionNext;
			in float side;
			in float index;
			in float dashOffset;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			uniform vec2 viewportSize;
			uniform float glowWidth;
			uniform float indexStart;
			uniform float indexCount;
			uniform float indexLength;
			uniform float widthMin;
			uniform float widthMax;

			out float fDashOffset;
			out float fWidth;
			out float fOffsetScalar;
			out float fIndexU;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {
				// Get the width depending on the length.
				float indexU = mod(index - indexStart + indexLength, indexLength) / (indexCount - 1.0);
				float width = mix(widthMin, widthMax, indexU);

				// Get the line vertices into pixel space.
				vec4 viewCenter = modelViewMatrix * vec4(positionCurr, 1.0);
				vec4 viewPrev = modelViewMatrix * vec4(positionPrev, 1.0);
				vec4 viewNext = modelViewMatrix * vec4(positionNext, 1.0);
				vec4 projectedCenter = projectionMatrix * viewCenter;
				vec4 projected_prev = projectionMatrix * viewPrev;
				vec4 projected_next = projectionMatrix * viewNext;
				vec2 ndcCenter = projectedCenter.xy / viewCenter.y;
				vec2 ndcPrev = projected_prev.xy / viewPrev.y;
				vec2 ndcNext = projected_next.xy / viewNext.y;
				vec2 pixelCenter = (ndcCenter.xy + 1.0) / 2.0 * viewportSize;
				vec2 pixelPrev = (ndcPrev.xy + 1.0) / 2.0 * viewportSize;
				vec2 pixelNext = (ndcNext.xy + 1.0) / 2.0 * viewportSize;

				// Get the offset of the part perpendicular to the lines.
				vec2 l0 = normalize(pixelCenter - pixelPrev);
				vec2 l1 = normalize(pixelNext - pixelCenter);
				float resolutionFactor = max(1.0, min(viewportSize.x, viewportSize.y) / 800.0);
				float offsetScalar = side * (width / 2.0 + glowWidth) * resolutionFactor;
				vec2 offset = vec2(offsetScalar, offsetScalar);
				if (pixelCenter == pixelPrev) {
					if (pixelCenter == pixelNext) {
						offset = vec2(0.0, 0.0);
					}
					else {
						offset *= vec2(-l1.y, l1.x);
					}
				}
				else if (pixelCenter == pixelNext) {
					offset *= vec2(-l0.y, l0.x);
				}
				else {
					offset *= normalize(vec2(-l0.y - l1.y, l0.x + l1.x));
					offset /= sqrt((1.0 + max(0.0, dot(l0, l1))) / 2.0);
				}

				// Re-add the perpendicular part to the center as the final vertex.
				ndcCenter = (pixelCenter + offset) / viewportSize * 2.0 - 1.0;
				gl_Position = vec4(ndcCenter * viewCenter.y, projectedCenter.z, projectedCenter.w);

				// Set the varyings.
				fIndexU = indexU;
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

			uniform vec4 color;
			uniform float alphaMultiplier;
			uniform float alphaFade;
			uniform float dashLength;
			uniform float dashGapLength;
			uniform float glowWidth;

			in float fIndexU;
			in float fDashOffset;
			in float fWidth;
			in float fOffsetScalar;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}
\t
			float lineDash() {
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
				outColor = color;
				outColor.a *= alphaMultiplier * edgeGlow() * lineDash() * mix(alphaFade, 1.0, fIndexU);

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}
			`
  }
};
export { TrailShader };
