// Recovered from vendors.js:901776-910980.
// Upstream correspondence: Three.js r185 examples/jsm/postprocessing/UnrealBloomPass.js; see docs/eyes-analysis/three-renderer-next.md.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
import * as CopyShader from "./CopyShader.js";
import * as LuminosityHighPassShader from "./LuminosityHighPassShader.js";
class UnrealBloomPass extends Pass.Pass {
  constructor(resolution, strength = 1, radius, threshold) {
    super(), this.strength = strength, this.radius = radius, this.threshold = threshold, this.resolution = void 0 !== resolution ? new ThreeCore.Vector2(resolution.x, resolution.y) : new ThreeCore.Vector2(256, 256), this.clearColor = new ThreeCore.Color(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let c = Math.round(this.resolution.x / 2),
      l = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new ThreeCore.WebGLRenderTarget(c, l, {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let e = 0; e < this.nMips; e++) {
      const webGLRenderTarget = new ThreeCore.WebGLRenderTarget(c, l, {
        type: ThreeCore.HalfFloatType
      });
      webGLRenderTarget.texture.name = "UnrealBloomPass.h" + e, webGLRenderTarget.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(webGLRenderTarget);
      const n = new ThreeCore.WebGLRenderTarget(c, l, {
        type: ThreeCore.HalfFloatType
      });
      n.texture.name = "UnrealBloomPass.v" + e, n.texture.generateMipmaps = !1, this.renderTargetsVertical.push(n), c = Math.round(c / 2), l = Math.round(l / 2);
    }
    const u = LuminosityHighPassShader.LuminosityHighPassShader;
    this.highPassUniforms = ThreeCore.UniformsUtils.clone(u.uniforms), this.highPassUniforms.luminosityThreshold.value = threshold, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new ThreeCore.ShaderMaterial({
      uniforms: this.highPassUniforms,
      vertexShader: u.vertexShader,
      fragmentShader: u.fragmentShader
    }), this.separableBlurMaterials = [];
    const d = [6, 10, 14, 18, 22];
    c = Math.round(this.resolution.x / 2), l = Math.round(this.resolution.y / 2);
    for (let e = 0; e < this.nMips; e++) this.separableBlurMaterials.push(this._getSeparableBlurMaterial(d[e])), this.separableBlurMaterials[e].uniforms.invSize.value = new ThreeCore.Vector2(1 / c, 1 / l), c = Math.round(c / 2), l = Math.round(l / 2);
    this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = strength, this.compositeMaterial.uniforms.bloomRadius.value = .1;
    this.compositeMaterial.uniforms.bloomFactors.value = [1, .8, .6, .4, .2], this.bloomTintColors = [new ThreeCore.Vector3(1, 1, 1), new ThreeCore.Vector3(1, 1, 1), new ThreeCore.Vector3(1, 1, 1), new ThreeCore.Vector3(1, 1, 1), new ThreeCore.Vector3(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = ThreeCore.UniformsUtils.clone(CopyShader.CopyShader.uniforms), this.blendMaterial = new ThreeCore.ShaderMaterial({
      uniforms: this.copyUniforms,
      vertexShader: CopyShader.CopyShader.vertexShader,
      fragmentShader: CopyShader.CopyShader.fragmentShader,
      premultipliedAlpha: !0,
      blending: ThreeCore.AdditiveBlending,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this._oldClearColor = new ThreeCore.Color(), this._oldClearAlpha = 1, this._basic = new ThreeCore.MeshBasicMaterial(), this._fsQuad = new Pass.FullScreenQuad(null);
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++) this.separableBlurMaterials[e].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose();
  }
  setSize(width, height) {
    let n = Math.round(width / 2),
      i = Math.round(height / 2);
    this.renderTargetBright.setSize(n, i);
    for (let e = 0; e < this.nMips; e++) this.renderTargetsHorizontal[e].setSize(n, i), this.renderTargetsVertical[e].setSize(n, i), this.separableBlurMaterials[e].uniforms.invSize.value = new ThreeCore.Vector2(1 / n, 1 / i), n = Math.round(n / 2), i = Math.round(i / 2);
  }
  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    renderer.getClearColor(this._oldClearColor), this._oldClearAlpha = renderer.getClearAlpha();
    const a = renderer.autoClear;
    renderer.autoClear = !1, renderer.setClearColor(this.clearColor, 0), maskActive && renderer.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = readBuffer.texture, renderer.setRenderTarget(null), renderer.clear(), this._fsQuad.render(renderer)), this.highPassUniforms.tDiffuse.value = readBuffer.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, renderer.setRenderTarget(this.renderTargetBright), renderer.clear(), this._fsQuad.render(renderer);
    let renderTargetBright = this.renderTargetBright;
    for (let t = 0; t < this.nMips; t++) this._fsQuad.material = this.separableBlurMaterials[t], this.separableBlurMaterials[t].uniforms.colorTexture.value = renderTargetBright.texture, this.separableBlurMaterials[t].uniforms.direction.value = UnrealBloomPass.BlurDirectionX, renderer.setRenderTarget(this.renderTargetsHorizontal[t]), renderer.clear(), this._fsQuad.render(renderer), this.separableBlurMaterials[t].uniforms.colorTexture.value = this.renderTargetsHorizontal[t].texture, this.separableBlurMaterials[t].uniforms.direction.value = UnrealBloomPass.BlurDirectionY, renderer.setRenderTarget(this.renderTargetsVertical[t]), renderer.clear(), this._fsQuad.render(renderer), renderTargetBright = this.renderTargetsVertical[t];
    this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, renderer.setRenderTarget(this.renderTargetsHorizontal[0]), renderer.clear(), this._fsQuad.render(renderer), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, maskActive && renderer.state.buffers.stencil.setTest(!0), this.renderToScreen ? (renderer.setRenderTarget(null), this._fsQuad.render(renderer)) : (renderer.setRenderTarget(readBuffer), this._fsQuad.render(renderer)), renderer.setClearColor(this._oldClearColor, this._oldClearAlpha), renderer.autoClear = a;
  }
  _getSeparableBlurMaterial(kernelRadius) {
    const t = [],
      n = kernelRadius / 3;
    for (let r = 0; r < kernelRadius; r++) t.push(.39894 * Math.exp(-.5 * r * r / (n * n)) / n);
    return new ThreeCore.ShaderMaterial({
      defines: {
        KERNEL_RADIUS: kernelRadius
      },
      uniforms: {
        colorTexture: {
          value: null
        },
        invSize: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        direction: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        gaussianCoefficients: {
          value: t
        }
      },
      vertexShader: "\n\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t\t\t}",
      fragmentShader: "\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 invSize;\n\t\t\t\tuniform vec2 direction;\n\t\t\t\tuniform float gaussianCoefficients[KERNEL_RADIUS];\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tfloat weightSum = gaussianCoefficients[0];\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;\n\n\t\t\t\t\tfor ( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\n\t\t\t\t\t\tfloat x = float( i );\n\t\t\t\t\t\tfloat w = gaussianCoefficients[i];\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n\t\t\t\t\t\tdiffuseSum += ( sample1 + sample2 ) * w;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tgl_FragColor = vec4( diffuseSum, 1.0 );\n\n\t\t\t\t}"
    });
  }
  _getCompositeMaterial(nMips) {
    return new ThreeCore.ShaderMaterial({
      defines: {
        NUM_MIPS: nMips
      },
      uniforms: {
        blurTexture1: {
          value: null
        },
        blurTexture2: {
          value: null
        },
        blurTexture3: {
          value: null
        },
        blurTexture4: {
          value: null
        },
        blurTexture5: {
          value: null
        },
        bloomStrength: {
          value: 1
        },
        bloomFactors: {
          value: null
        },
        bloomTintColors: {
          value: null
        },
        bloomRadius: {
          value: 0
        }
      },
      vertexShader: "\n\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t\t\t}",
      fragmentShader: "\n\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor( const in float factor ) {\n\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix( factor, mirrorFactor, bloomRadius );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\t// 3.0 for backwards compatibility with previous alpha-based intensity\n\t\t\t\t\tvec3 bloom = 3.0 * bloomStrength * (\n\t\t\t\t\t\tlerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +\n\t\t\t\t\t\tlerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +\n\t\t\t\t\t\tlerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +\n\t\t\t\t\t\tlerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +\n\t\t\t\t\t\tlerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb\n\t\t\t\t\t);\n\n\t\t\t\t\tfloat bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );\n\t\t\t\t\tgl_FragColor = vec4( bloom, bloomAlpha );\n\n\t\t\t\t}"
    });
  }
}
UnrealBloomPass.BlurDirectionX = new ThreeCore.Vector2(1, 0), UnrealBloomPass.BlurDirectionY = new ThreeCore.Vector2(0, 1);
export { UnrealBloomPass };
