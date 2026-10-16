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
