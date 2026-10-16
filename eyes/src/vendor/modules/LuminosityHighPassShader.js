/** @eyes-analysis
 * 文件职责：提供 LuminosityHighPassShader；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:910981-912002.；exports: LuminosityHighPassShader
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:910981-912002.
import * as ThreeCore from "../three/core.js";
const LuminosityHighPassShader = {
  name: "LuminosityHighPassShader",
  uniforms: {
    tDiffuse: {
      value: null
    },
    luminosityThreshold: {
      value: 1
    },
    smoothWidth: {
      value: 1
    },
    defaultColor: {
      value: new ThreeCore.Color(0)
    },
    defaultOpacity: {
      value: 0
    }
  },
  vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
  fragmentShader: "\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tfloat v = luminance( texel.xyz );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}"
};
export { LuminosityHighPassShader };
