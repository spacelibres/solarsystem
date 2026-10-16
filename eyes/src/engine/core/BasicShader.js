// Recovered from app.js:203462-204306.
import * as ShaderChunkLogDepth from "./ShaderChunkLogDepth.js";
const BasicShader = {
  uniforms: {
    modelViewMatrix: "mat4",
    projectionMatrix: "highp mat4",
    color: "vec4",
    ...ShaderChunkLogDepth.ShaderChunkLogDepth.Uniforms
  },
  properties: {},
  vertex: {
    code: `\n\t\t\tin vec3 position;\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.VertexHead}\n\n\t\t\tvoid main() {\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Vertex}\n\t\t\t}\n\t\t\t`
  },
  fragment: {
    code: `\n\t\t\tprecision highp float;\n\n\t\t\tuniform vec4 color;\n\n\t\t\t// The output color.\n\t\t\tout vec4 outColor;\n\n\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\tvoid main() {\n\t\t\t\toutColor = color;\n\n\t\t\t\t${ShaderChunkLogDepth.ShaderChunkLogDepth.Fragment}\n\t\t\t}\n\t\t\t`
  }
};
export { BasicShader };
