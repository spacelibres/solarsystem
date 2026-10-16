/** @eyes-analysis
 * 文件职责：分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓
 * 依据：// Recovered from vendors.js:884485-900662.；exports: OutlinePass
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:884485-900662.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
import * as CopyShader from "./CopyShader.js";
/** @eyes-analysis
 * 类职责：分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓
 * 继承：Pass.Pass；导出：OutlinePass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OutlinePass extends Pass.Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_fsQuad、_oldClearColor、_selectionCache、_visibilityCache、copyUniforms、depthMaterial、depthMaterial.blending、depthMaterial.depthPacking等；完整记录见索引。
   * 调用线索：Math.round、ThreeCore.UniformsUtils.clone、e.replace、function(e,t){const n=t.isPerspectiveCamera?"perspective":"orthographic";return e.replace(/DEPTH_TO_VIEW_Z/g,n+"DepthToViewZ");}、new Map等。
   */
  constructor(e, renderScene, renderCamera, s) {
    super(), this.renderScene = renderScene, this.renderCamera = renderCamera, this.selectedObjects = void 0 !== s ? s : [], this.visibleEdgeColor = new ThreeCore.Color(1, 1, 1), this.hiddenEdgeColor = new ThreeCore.Color(.1, .04, .02), this.edgeGlow = 0, this.usePatternTexture = !1, this.patternTexture = null, this.edgeThickness = 1, this.edgeStrength = 3, this.downSampleRatio = 2, this.pulsePeriod = 0, this._visibilityCache = new Map(), this._selectionCache = new Set(), this.resolution = void 0 !== e ? new ThreeCore.Vector2(e.x, e.y) : new ThreeCore.Vector2(256, 256);
    const o = Math.round(this.resolution.x / this.downSampleRatio),
      c = Math.round(this.resolution.y / this.downSampleRatio);
    this.renderTargetMaskBuffer = new ThreeCore.WebGLRenderTarget(this.resolution.x, this.resolution.y), this.renderTargetMaskBuffer.texture.name = "OutlinePass.mask", this.renderTargetMaskBuffer.texture.generateMipmaps = !1, this.depthMaterial = new ThreeCore.MeshDepthMaterial(), this.depthMaterial.side = ThreeCore.DoubleSide, this.depthMaterial.depthPacking = ThreeCore.RGBADepthPacking, this.depthMaterial.blending = ThreeCore.NoBlending, this.prepareMaskMaterial = this._getPrepareMaskMaterial(), this.prepareMaskMaterial.side = ThreeCore.DoubleSide, this.prepareMaskMaterial.fragmentShader = function (e, t) {
      const n = t.isPerspectiveCamera ? "perspective" : "orthographic";
      return e.replace(/DEPTH_TO_VIEW_Z/g, n + "DepthToViewZ");
    }(this.prepareMaskMaterial.fragmentShader, this.renderCamera), this.renderTargetDepthBuffer = new ThreeCore.WebGLRenderTarget(this.resolution.x, this.resolution.y, {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetDepthBuffer.texture.name = "OutlinePass.depth", this.renderTargetDepthBuffer.texture.generateMipmaps = !1, this.renderTargetMaskDownSampleBuffer = new ThreeCore.WebGLRenderTarget(o, c, {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetMaskDownSampleBuffer.texture.name = "OutlinePass.depthDownSample", this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps = !1, this.renderTargetBlurBuffer1 = new ThreeCore.WebGLRenderTarget(o, c, {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetBlurBuffer1.texture.name = "OutlinePass.blur1", this.renderTargetBlurBuffer1.texture.generateMipmaps = !1, this.renderTargetBlurBuffer2 = new ThreeCore.WebGLRenderTarget(Math.round(o / 2), Math.round(c / 2), {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetBlurBuffer2.texture.name = "OutlinePass.blur2", this.renderTargetBlurBuffer2.texture.generateMipmaps = !1, this.edgeDetectionMaterial = this._getEdgeDetectionMaterial(), this.renderTargetEdgeBuffer1 = new ThreeCore.WebGLRenderTarget(o, c, {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetEdgeBuffer1.texture.name = "OutlinePass.edge1", this.renderTargetEdgeBuffer1.texture.generateMipmaps = !1, this.renderTargetEdgeBuffer2 = new ThreeCore.WebGLRenderTarget(Math.round(o / 2), Math.round(c / 2), {
      type: ThreeCore.HalfFloatType
    }), this.renderTargetEdgeBuffer2.texture.name = "OutlinePass.edge2", this.renderTargetEdgeBuffer2.texture.generateMipmaps = !1;
    this.separableBlurMaterial1 = this._getSeparableBlurMaterial(4), this.separableBlurMaterial1.uniforms.texSize.value.set(o, c), this.separableBlurMaterial1.uniforms.kernelRadius.value = 1, this.separableBlurMaterial2 = this._getSeparableBlurMaterial(4), this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(o / 2), Math.round(c / 2)), this.separableBlurMaterial2.uniforms.kernelRadius.value = 4, this.overlayMaterial = this._getOverlayMaterial();
    const l = CopyShader.CopyShader;
    this.copyUniforms = ThreeCore.UniformsUtils.clone(l.uniforms), this.materialCopy = new ThreeCore.ShaderMaterial({
      uniforms: this.copyUniforms,
      vertexShader: l.vertexShader,
      fragmentShader: l.fragmentShader,
      blending: ThreeCore.NoBlending,
      depthTest: !1,
      depthWrite: !1
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new ThreeCore.Color(), this.oldClearAlpha = 1, this._fsQuad = new Pass.FullScreenQuad(null), this.tempPulseColor1 = new ThreeCore.Color(), this.tempPulseColor2 = new ThreeCore.Color(), this.textureMatrix = new ThreeCore.Matrix4();
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 调用线索：this._fsQuad.dispose、this.depthMaterial.dispose、this.edgeDetectionMaterial.dispose、this.materialCopy.dispose、this.overlayMaterial.dispose等。
   */
  dispose() {
    this.renderTargetMaskBuffer.dispose(), this.renderTargetDepthBuffer.dispose(), this.renderTargetMaskDownSampleBuffer.dispose(), this.renderTargetBlurBuffer1.dispose(), this.renderTargetBlurBuffer2.dispose(), this.renderTargetEdgeBuffer1.dispose(), this.renderTargetEdgeBuffer2.dispose(), this.depthMaterial.dispose(), this.prepareMaskMaterial.dispose(), this.edgeDetectionMaterial.dispose(), this.separableBlurMaterial1.dispose(), this.separableBlurMaterial2.dispose(), this.overlayMaterial.dispose(), this.materialCopy.dispose(), this._fsQuad.dispose();
  }
  /** @eyes-analysis
   * 更新像素尺寸及关联目标；后处理链需要同步所有通道
   * 调用线索：Math.round、this.renderTargetBlurBuffer1.setSize、this.renderTargetBlurBuffer2.setSize、this.renderTargetDepthBuffer.setSize、this.renderTargetEdgeBuffer1.setSize等。
   */
  setSize(e, t) {
    this.renderTargetMaskBuffer.setSize(e, t), this.renderTargetDepthBuffer.setSize(e, t);
    let n = Math.round(e / this.downSampleRatio),
      r = Math.round(t / this.downSampleRatio);
    this.renderTargetMaskDownSampleBuffer.setSize(n, r), this.renderTargetBlurBuffer1.setSize(n, r), this.renderTargetEdgeBuffer1.setSize(n, r), this.separableBlurMaterial1.uniforms.texSize.value.set(n, r), n = Math.round(n / 2), r = Math.round(r / 2), this.renderTargetBlurBuffer2.setSize(n, r), this.renderTargetEdgeBuffer2.setSize(n, r), this.separableBlurMaterial2.uniforms.texSize.value.set(n, r);
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 状态写入：_fsQuad.material、copyUniforms.tDiffuse.value、edgeDetectionMaterial.uniforms.hiddenEdgeColor.value、edgeDetectionMaterial.uniforms.maskTexture.value、edgeDetectionMaterial.uniforms.visibleEdgeColor.value、oldClearAlpha、overlayMaterial.uniforms.edgeGlow.value、overlayMaterial.uniforms.edgeStrength.value等；完整记录见索引。
   * 调用线索：Math.cos、e.clear、e.getClearAlpha、e.getClearColor、e.render等。
   */
  render(e, t, n, r, i) {
    if (this.selectedObjects.length > 0) {
      e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
      const t = e.autoClear;
      e.autoClear = !1, i && e.state.buffers.stencil.setTest(!1), e.setClearColor(16777215, 1), this._updateSelectionCache(), this._changeVisibilityOfSelectedObjects(!1);
      const r = this.renderScene.background,
        a = this.renderScene.overrideMaterial;
      if (this.renderScene.background = null, this.renderScene.overrideMaterial = this.depthMaterial, e.setRenderTarget(this.renderTargetDepthBuffer), e.clear(), e.render(this.renderScene, this.renderCamera), this._changeVisibilityOfSelectedObjects(!0), this._visibilityCache.clear(), this._updateTextureMatrix(), this._changeVisibilityOfNonSelectedObjects(!1), this.renderScene.overrideMaterial = this.prepareMaskMaterial, this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near, this.renderCamera.far), this.prepareMaskMaterial.uniforms.depthTexture.value = this.renderTargetDepthBuffer.texture, this.prepareMaskMaterial.uniforms.textureMatrix.value = this.textureMatrix, e.setRenderTarget(this.renderTargetMaskBuffer), e.clear(), e.render(this.renderScene, this.renderCamera), this._changeVisibilityOfNonSelectedObjects(!0), this._visibilityCache.clear(), this._selectionCache.clear(), this.renderScene.background = r, this.renderScene.overrideMaterial = a, this._fsQuad.material = this.materialCopy, this.copyUniforms.tDiffuse.value = this.renderTargetMaskBuffer.texture, e.setRenderTarget(this.renderTargetMaskDownSampleBuffer), e.clear(), this._fsQuad.render(e), this.tempPulseColor1.copy(this.visibleEdgeColor), this.tempPulseColor2.copy(this.hiddenEdgeColor), this.pulsePeriod > 0) {
        const e = .625 + .75 * Math.cos(.01 * performance.now() / this.pulsePeriod) / 2;
        this.tempPulseColor1.multiplyScalar(e), this.tempPulseColor2.multiplyScalar(e);
      }
      this._fsQuad.material = this.edgeDetectionMaterial, this.edgeDetectionMaterial.uniforms.maskTexture.value = this.renderTargetMaskDownSampleBuffer.texture, this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width, this.renderTargetMaskDownSampleBuffer.height), this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value = this.tempPulseColor1, this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value = this.tempPulseColor2, e.setRenderTarget(this.renderTargetEdgeBuffer1), e.clear(), this._fsQuad.render(e), this._fsQuad.material = this.separableBlurMaterial1, this.separableBlurMaterial1.uniforms.colorTexture.value = this.renderTargetEdgeBuffer1.texture, this.separableBlurMaterial1.uniforms.direction.value = OutlinePass.BlurDirectionX, this.separableBlurMaterial1.uniforms.kernelRadius.value = this.edgeThickness, e.setRenderTarget(this.renderTargetBlurBuffer1), e.clear(), this._fsQuad.render(e), this.separableBlurMaterial1.uniforms.colorTexture.value = this.renderTargetBlurBuffer1.texture, this.separableBlurMaterial1.uniforms.direction.value = OutlinePass.BlurDirectionY, e.setRenderTarget(this.renderTargetEdgeBuffer1), e.clear(), this._fsQuad.render(e), this._fsQuad.material = this.separableBlurMaterial2, this.separableBlurMaterial2.uniforms.colorTexture.value = this.renderTargetEdgeBuffer1.texture, this.separableBlurMaterial2.uniforms.direction.value = OutlinePass.BlurDirectionX, e.setRenderTarget(this.renderTargetBlurBuffer2), e.clear(), this._fsQuad.render(e), this.separableBlurMaterial2.uniforms.colorTexture.value = this.renderTargetBlurBuffer2.texture, this.separableBlurMaterial2.uniforms.direction.value = OutlinePass.BlurDirectionY, e.setRenderTarget(this.renderTargetEdgeBuffer2), e.clear(), this._fsQuad.render(e), this._fsQuad.material = this.overlayMaterial, this.overlayMaterial.uniforms.maskTexture.value = this.renderTargetMaskBuffer.texture, this.overlayMaterial.uniforms.edgeTexture1.value = this.renderTargetEdgeBuffer1.texture, this.overlayMaterial.uniforms.edgeTexture2.value = this.renderTargetEdgeBuffer2.texture, this.overlayMaterial.uniforms.patternTexture.value = this.patternTexture, this.overlayMaterial.uniforms.edgeStrength.value = this.edgeStrength, this.overlayMaterial.uniforms.edgeGlow.value = this.edgeGlow, this.overlayMaterial.uniforms.usePatternTexture.value = this.usePatternTexture, i && e.state.buffers.stencil.setTest(!0), e.setRenderTarget(n), this._fsQuad.render(e), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = t;
    }
    this.renderToScreen && (this._fsQuad.material = this.materialCopy, this.copyUniforms.tDiffuse.value = n.texture, e.setRenderTarget(null), this._fsQuad.render(e));
  }
  /** @eyes-analysis
   * 源码方法 _updateSelectionCache；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：selectionCache.add、selectionCache.clear、this.selectedObjects[e].traverse。
   */
  _updateSelectionCache() {
    const selectionCache = this._selectionCache;
    function t(t) {
      t.isMesh && selectionCache.add(t);
    }
    selectionCache.clear();
    for (let e = 0; e < this.selectedObjects.length; e++) {
      this.selectedObjects[e].traverse(t);
    }
  }
  /** @eyes-analysis
   * 源码方法 _changeVisibilityOfSelectedObjects；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：visibilityCache.get、visibilityCache.set。
   */
  _changeVisibilityOfSelectedObjects(e) {
    const visibilityCache = this._visibilityCache;
    for (const n of this._selectionCache) !0 === e ? n.visible = visibilityCache.get(n) : (visibilityCache.set(n, n.visible), n.visible = e);
  }
  /** @eyes-analysis
   * 源码方法 _changeVisibilityOfNonSelectedObjects；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：selectionCache.has、this.renderScene.traverse、visibilityCache.get、visibilityCache.set。
   */
  _changeVisibilityOfNonSelectedObjects(e) {
    const visibilityCache = this._visibilityCache,
      selectionCache = this._selectionCache;
    this.renderScene.traverse(function (r) {
      if (r.isPoints || r.isLine || r.isLine2) !0 === e ? r.visible = visibilityCache.get(r) : (visibilityCache.set(r, r.visible), r.visible = e);else if ((r.isMesh || r.isSprite) && !selectionCache.has(r)) {
        const n = r.visible;
        !1 !== e && !0 !== visibilityCache.get(r) || (r.visible = e), visibilityCache.set(r, n);
      }
    });
  }
  /** @eyes-analysis
   * 源码方法 _updateTextureMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this.textureMatrix.multiply、this.textureMatrix.set。
   */
  _updateTextureMatrix() {
    this.textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), this.textureMatrix.multiply(this.renderCamera.projectionMatrix), this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse);
  }
  /** @eyes-analysis
   * 源码方法 _getPrepareMaskMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：new ThreeCore.ShaderMaterial、new ThreeCore.Vector2。
   */
  _getPrepareMaskMaterial() {
    return new ThreeCore.ShaderMaterial({
      uniforms: {
        depthTexture: {
          value: null
        },
        cameraNearFar: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        textureMatrix: {
          value: null
        }
      },
      vertexShader: "#include <batching_pars_vertex>\n\t\t\t\t#include <morphtarget_pars_vertex>\n\t\t\t\t#include <skinning_pars_vertex>\n\n\t\t\t\tvarying vec4 projTexCoord;\n\t\t\t\tvarying vec4 vPosition;\n\t\t\t\tuniform mat4 textureMatrix;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\t#include <batching_vertex>\n\t\t\t\t\t#include <skinbase_vertex>\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <morphtarget_vertex>\n\t\t\t\t\t#include <skinning_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t\tvPosition = mvPosition;\n\n\t\t\t\t\tvec4 worldPosition = vec4( transformed, 1.0 );\n\n\t\t\t\t\t#ifdef USE_INSTANCING\n\n\t\t\t\t\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t\t\t\t\t#endif\n\n\t\t\t\t\tworldPosition = modelMatrix * worldPosition;\n\n\t\t\t\t\tprojTexCoord = textureMatrix * worldPosition;\n\n\t\t\t\t}",
      fragmentShader: "#include <packing>\n\t\t\t\tvarying vec4 vPosition;\n\t\t\t\tvarying vec4 projTexCoord;\n\t\t\t\tuniform sampler2D depthTexture;\n\t\t\t\tuniform vec2 cameraNearFar;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tfloat depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));\n\t\t\t\t\tfloat viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );\n\t\t\t\t\tfloat depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;\n\t\t\t\t\tgl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);\n\n\t\t\t\t}"
    });
  }
  /** @eyes-analysis
   * 源码方法 _getEdgeDetectionMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：new ThreeCore.ShaderMaterial、new ThreeCore.Vector2、new ThreeCore.Vector3。
   */
  _getEdgeDetectionMaterial() {
    return new ThreeCore.ShaderMaterial({
      uniforms: {
        maskTexture: {
          value: null
        },
        texSize: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        visibleEdgeColor: {
          value: new ThreeCore.Vector3(1, 1, 1)
        },
        hiddenEdgeColor: {
          value: new ThreeCore.Vector3(1, 1, 1)
        }
      },
      vertexShader: "varying vec2 vUv;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
      fragmentShader: "varying vec2 vUv;\n\n\t\t\t\tuniform sampler2D maskTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec3 visibleEdgeColor;\n\t\t\t\tuniform vec3 hiddenEdgeColor;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tvec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);\n\t\t\t\t\tvec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);\n\t\t\t\t\tvec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);\n\t\t\t\t\tvec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);\n\t\t\t\t\tvec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);\n\t\t\t\t\tfloat diff1 = (c1.r - c2.r)*0.5;\n\t\t\t\t\tfloat diff2 = (c3.r - c4.r)*0.5;\n\t\t\t\t\tfloat d = length( vec2(diff1, diff2) );\n\t\t\t\t\tfloat a1 = min(c1.g, c2.g);\n\t\t\t\t\tfloat a2 = min(c3.g, c4.g);\n\t\t\t\t\tfloat visibilityFactor = min(a1, a2);\n\t\t\t\t\tvec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;\n\t\t\t\t\tgl_FragColor = vec4(edgeColor, 1.0) * vec4(d);\n\t\t\t\t}"
    });
  }
  /** @eyes-analysis
   * 源码方法 _getSeparableBlurMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：new ThreeCore.ShaderMaterial、new ThreeCore.Vector2。
   */
  _getSeparableBlurMaterial(e) {
    return new ThreeCore.ShaderMaterial({
      defines: {
        MAX_RADIUS: e
      },
      uniforms: {
        colorTexture: {
          value: null
        },
        texSize: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        direction: {
          value: new ThreeCore.Vector2(.5, .5)
        },
        kernelRadius: {
          value: 1
        }
      },
      vertexShader: "varying vec2 vUv;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
      fragmentShader: "#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\t\t\t\tuniform float kernelRadius;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat sigma = kernelRadius/2.0;\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, sigma);\n\t\t\t\t\tvec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;\n\t\t\t\t\tvec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);\n\t\t\t\t\tvec2 uvOffset = delta;\n\t\t\t\t\tfor( int i = 1; i <= MAX_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = kernelRadius * float(i) / float(MAX_RADIUS);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, sigma);\n\t\t\t\t\t\tvec4 sample1 = texture2D( colorTexture, vUv + uvOffset);\n\t\t\t\t\t\tvec4 sample2 = texture2D( colorTexture, vUv - uvOffset);\n\t\t\t\t\t\tdiffuseSum += ((sample1 + sample2) * w);\n\t\t\t\t\t\tweightSum += (2.0 * w);\n\t\t\t\t\t\tuvOffset += delta;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = diffuseSum/weightSum;\n\t\t\t\t}"
    });
  }
  /** @eyes-analysis
   * 源码方法 _getOverlayMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：new ThreeCore.ShaderMaterial。
   */
  _getOverlayMaterial() {
    return new ThreeCore.ShaderMaterial({
      uniforms: {
        maskTexture: {
          value: null
        },
        edgeTexture1: {
          value: null
        },
        edgeTexture2: {
          value: null
        },
        patternTexture: {
          value: null
        },
        edgeStrength: {
          value: 1
        },
        edgeGlow: {
          value: 1
        },
        usePatternTexture: {
          value: 0
        }
      },
      vertexShader: "varying vec2 vUv;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
      fragmentShader: "varying vec2 vUv;\n\n\t\t\t\tuniform sampler2D maskTexture;\n\t\t\t\tuniform sampler2D edgeTexture1;\n\t\t\t\tuniform sampler2D edgeTexture2;\n\t\t\t\tuniform sampler2D patternTexture;\n\t\t\t\tuniform float edgeStrength;\n\t\t\t\tuniform float edgeGlow;\n\t\t\t\tuniform bool usePatternTexture;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec4 edgeValue1 = texture2D(edgeTexture1, vUv);\n\t\t\t\t\tvec4 edgeValue2 = texture2D(edgeTexture2, vUv);\n\t\t\t\t\tvec4 maskColor = texture2D(maskTexture, vUv);\n\t\t\t\t\tvec4 patternColor = texture2D(patternTexture, 6.0 * vUv);\n\t\t\t\t\tfloat visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;\n\t\t\t\t\tvec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;\n\t\t\t\t\tvec4 finalColor = edgeStrength * maskColor.r * edgeValue;\n\t\t\t\t\tif(usePatternTexture)\n\t\t\t\t\t\tfinalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);\n\t\t\t\t\tgl_FragColor = finalColor;\n\t\t\t\t}",
      blending: ThreeCore.AdditiveBlending,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    });
  }
}
OutlinePass.BlurDirectionX = new ThreeCore.Vector2(1, 0), OutlinePass.BlurDirectionY = new ThreeCore.Vector2(0, 1);
export { OutlinePass };
