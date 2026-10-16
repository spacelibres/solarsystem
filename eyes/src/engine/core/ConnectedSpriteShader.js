// Recovered from app.js:204307-207288.
/** 两端宽度不同的连接精灵：position.z 在两端插值宽度，vAxis 给出长度方向，叉积生成面向视线的横向轴；片段修正梯形 UV 后重复/偏移纹理。
 * GLSL 现在以实际多行展示；uniform/attribute 名称、插值表达式和运行时 shader 字节均保持。
 */
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
    code: `
			in vec3 position;

			uniform mat4 modelMatrix;
			uniform mat4 viewMatrix;
			uniform mat4 projectionMatrix;

			uniform vec3 vAxis;
			uniform float width1;
			uniform float width2;

			out vec2 vPosition;
			out float vU;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}

			void main() {

				// Get the width and the model origin in world-space.
				float width = mix(width1, width2, position.z);
				vec4 modelPosition = modelMatrix * vec4(0, 0, 0, 1);

				// Get the vertex position in world space.
				// It is a combination of the origin of the model, length axis, and width axis.
				vec4 worldPosition = modelPosition
					+ vec4(vAxis, 0) * position.z
					+ vec4(normalize(cross(normalize(modelPosition.xyz), normalize(vAxis))), 0) * position.x * width;

				// Set the final projected position.
				gl_Position = projectionMatrix * viewMatrix * worldPosition;

				// Setup a vPosition and vU for use in the fragment shader.
				vPosition = vec2(0.5 * (position.x + 1.0), position.z);
				#ifdef PIXEL_BASED
					vPosition.y *= abs(gl_Position.w);
				#endif
				vU = position.z;

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}
			}`
  },
  // PIXEL_BASED 的顶点 w 放大与片段 gl_FragCoord.w 补偿成对使用；不要只修改其中一端。
  fragment: {
    code: `
			precision highp float;

			uniform vec4 color;
			uniform sampler2D colorTexture;
			uniform float width1;
			uniform float width2;
			uniform float textureYOffset;
			uniform float repeatAmount;

			in vec2 vPosition;
			in float vU;

			// The output color.
			out vec4 outColor;

			${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}

			void main() {

				// If we're using pixel-based, we need to undo the perspective divide that happened.
				#ifdef PIXEL_BASED
					vec2 uv = vec2(vPosition.x, vPosition.y * gl_FragCoord.w);
				#else
					vec2 uv = vPosition;
				#endif

				// Get a correct use that uses the repeat amount and y offset.
				// There's a complicated formula, because the widths may be different and the shape of the sprite may be a trapezoid.
				float f = width2 * vU / (width1 * (1.0 - vU) + width2 * vU);
				float uFactor = step(vU, uv.x);
				uv.x = (1.0 - uFactor) * uv.x * f / vU + uFactor * (1.0 + (uv.x - 1.0) * (1.0 - f) / (1.0 - vU));
				uv.y = uv.y * repeatAmount + textureYOffset;

				// Apply the texture and color.
				outColor = color * texture(colorTexture, uv);

				${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}
			}`
  }
};
export { ConnectedSpriteShader };
