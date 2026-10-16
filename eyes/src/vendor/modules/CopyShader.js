/** @eyes-analysis
 * 文件职责：提供 CopyShader；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:880790-881346.；exports: CopyShader
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:880790-881346.
const CopyShader = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: {
      value: null
    },
    opacity: {
      value: 1
    }
  },
  vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
  fragmentShader: "\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor = opacity * texel;\n\n\n\t\t}"
};
export { CopyShader };
