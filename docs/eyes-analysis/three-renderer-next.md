# Three 渲染器与 addon 源码对应分析

本分析覆盖恢复后的 463 KB WebGL 渲染器及 12 个已确认的 addon。源码证据来自官方 npm Three 包 **0.185.0 与 0.185.1**；宿主项目安装的 Three 0.186.1 与这份 bundle 的版本无关。两个候选补丁版本均符合以下证据，因此原始补丁版本仍无法确定。本次未复制 NASA 媒体。

## 可复现证据与限制

离线检查命令为 `node tools/semantic-three-renderer.node-check.cjs`。检查内嵌冻结的原始源码 AST 摘要，不依赖被忽略的产物或当前 Git HEAD。它覆盖全部 13 个修改后的源码文件，以及公开 import/export 名称、属性名、字符串、数值、控制流和写入操作；仅忽略注释、格式和正确解析后的词法标识符。声明先按绑定身份编号，再解析引用，因此支持嵌套函数声明同名的情况。对抗性测试区分变量捕获、写入、导入、导出和属性改动；此受限证明明确拒绝简写属性。函数声明改名会改变其反射 `name`；这是可读性改动的预期结果，不表示源码反射或堆栈文本完全相同。

复现官方源码匹配时，从两个包分别解出 `package/build/three.module.min.js`，再将两个本地路径传给检查命令。源码匹配器将具名 core 导入转换为恢复包装层的 `ThreeCore` 命名空间，并用 `(0, ThreeCore.method)` 保留无接收者调用语义。公开 export 包装层仅为声明对比而对齐；原始版与候选版 API 保持不变的证据来自另一项冻结的整模块摘要。匹配器不规范化控制流或算术运算。

| 证据文件 | SHA-256 |
| --- | --- |
| three-0.185.0.tgz | 5f52a93ffb7d5bd87735d414fad83709af45ddcb77f8c1198dda98971074433d |
| three-0.185.1.tgz | a2143f5bf978bd3470a51024b2b6bdd581913ba8f36ff1538d433f3a95adf2df |
| r1850/package/build/three.module.js | bbf5ed13fe4373f5bd38b14ea8e62e9f157327da5638edc6d3863e08b167c9c7 |
| r1851/package/build/three.module.js | bbf5ed13fe4373f5bd38b14ea8e62e9f157327da5638edc6d3863e08b167c9c7 |
| r1850/package/build/three.module.min.js | 86bcee248b64f44bcfc23c331ae74619061957d59cab040171dcb6fb5900beb6 |
| r1851/package/build/three.module.min.js | 86bcee248b64f44bcfc23c331ae74619061957d59cab040171dcb6fb5900beb6 |

恢复渲染器的冻结摘要为 `5ea09260604f69db671df21e204c707e4915fadd48193fcd97f674352af0f662`，包含 **2,644 个绑定、12,502 处引用和 737 次词法写入**。规范化后的官方渲染器摘要为 `e8786ddeab3c1d10832c063ad3ddd4dd2b0c34b242454e7ebe614cce34dbfa7b`。

**106 个顶层函数/类声明中有 105 个、49 个变量初始化器中有 49 个，与两个官方压缩版本的规范化 AST 严格一致。** 唯一不匹配项为 `WebGLShadowMap`：恢复代码通过条件表达式选择对 `result.side` 的两次赋值之一；官方压缩代码则赋值一次，右侧为条件表达式。诊断名称、条件与选中值对应上游 `getDepthMaterial`，但严格比较器仍将其保留为不匹配项。本分析不对整个声明作宽泛的等价性承诺。

CPU/模拟上下文检查覆盖动画调度与取消、属性生命周期、不透明/透射/透明对象排序、uniform 上传缓存、缓冲区分配/更新/删除、GLTF registry/cache key/extras/未知扩展/分量缩放、KTX 色彩空间选择，以及 ShaderPass 的目标/清除/纹理路由。检查未执行真实 GPU、shader 编译、XR 硬件或外部 decoder。

## 源码改动

恢复了 **94 个顶层 helper 名称**、**72 处内部 helper 对应**、**46 个顶层变量名**，并恢复渲染器类方法、赋值方法和 helper 中有上游依据的参数名。内部 helper 统计包含 3 个原本已有可读名称、此次核对或恢复参数的声明。未替换任何可执行操作、shader 字符串、URL、decoder 缓存或公开 export。12 个 addon 共恢复 12 个 helper 声明和 220 个参数绑定；179 个现有类方法名有上游同名对应。已有的方法名保持原样。`CopyShader.js` 与 `LuminosityHighPassShader.js` 仅增加来源说明注释，没有改动绑定名称；其余 10 个 addon 才包含词法改名。

## 渲染器声明对应

表中每个“严格一致”行代表整个函数/类 AST，包含方法体和内部 helper，比较前仅进行 core 导入改写与词法规范化。名称映射来自对应的官方未压缩源码；不把上游压缩标识符的拼写当作语义名称。

| 恢复后的声明 | 类方法（如适用） | 官方 AST 对应结果 |
| --- | --- | --- |
| WebGLAnimation | — | 严格一致 .0/.1 |
| WebGLAttributes | — | 严格一致 .0/.1 |
| WebGLBackground | — | 严格一致 .0/.1 |
| WebGLBindingStates | — | 严格一致 .0/.1 |
| WebGLBufferRenderer | — | 严格一致 .0/.1 |
| WebGLCapabilities | — | 严格一致 .0/.1 |
| WebGLClipping | — | 严格一致 .0/.1 |
| PMREMGenerator | constructor, fromScene, fromEquirectangular, fromCubemap, compileCubemapShader, compileEquirectangularShader, dispose, _setSize, _dispose, _cleanup, _fromTexture, _allocateTargets, _compileMaterial, _sceneToCubeUV, _textureToCubeUV, _applyPMREM, _applyGGXFilter, _blur, _halfBlur | 严格一致 .0/.1 |
| _createRenderTarget | — | 严格一致 .0/.1 |
| _setViewport | — | 严格一致 .0/.1 |
| _getEquirectMaterial | — | 严格一致 .0/.1 |
| _getCubemapMaterial | — | 严格一致 .0/.1 |
| _getCommonVertexShader | — | 严格一致 .0/.1 |
| WebGLCubeRenderTarget | constructor, fromEquirectangularTexture, clear | 严格一致 .0/.1 |
| WebGLEnvironments | — | 严格一致 .0/.1 |
| WebGLExtensions | — | 严格一致 .0/.1 |
| WebGLGeometries | — | 严格一致 .0/.1 |
| WebGLIndexedBufferRenderer | — | 严格一致 .0/.1 |
| WebGLInfo | — | 严格一致 .0/.1 |
| WebGLMorphtargets | — | 严格一致 .0/.1 |
| WebGLObjects | — | 严格一致 .0/.1 |
| WebGLOutput | — | 严格一致 .0/.1 |
| flatten | — | 严格一致 .0/.1 |
| arraysEqual | — | 严格一致 .0/.1 |
| copyArray | — | 严格一致 .0/.1 |
| allocTexUnits | — | 严格一致 .0/.1 |
| setValueV1f | — | 严格一致 .0/.1 |
| setValueV2f | — | 严格一致 .0/.1 |
| setValueV3f | — | 严格一致 .0/.1 |
| setValueV4f | — | 严格一致 .0/.1 |
| setValueM2 | — | 严格一致 .0/.1 |
| setValueM3 | — | 严格一致 .0/.1 |
| setValueM4 | — | 严格一致 .0/.1 |
| setValueV1i | — | 严格一致 .0/.1 |
| setValueV2i | — | 严格一致 .0/.1 |
| setValueV3i | — | 严格一致 .0/.1 |
| setValueV4i | — | 严格一致 .0/.1 |
| setValueV1ui | — | 严格一致 .0/.1 |
| setValueV2ui | — | 严格一致 .0/.1 |
| setValueV3ui | — | 严格一致 .0/.1 |
| setValueV4ui | — | 严格一致 .0/.1 |
| setValueT1 | — | 严格一致 .0/.1 |
| setValueT3D1 | — | 严格一致 .0/.1 |
| setValueT6 | — | 严格一致 .0/.1 |
| setValueT2DArray1 | — | 严格一致 .0/.1 |
| setValueV1fArray | — | 严格一致 .0/.1 |
| setValueV2fArray | — | 严格一致 .0/.1 |
| setValueV3fArray | — | 严格一致 .0/.1 |
| setValueV4fArray | — | 严格一致 .0/.1 |
| setValueM2Array | — | 严格一致 .0/.1 |
| setValueM3Array | — | 严格一致 .0/.1 |
| setValueM4Array | — | 严格一致 .0/.1 |
| setValueV1iArray | — | 严格一致 .0/.1 |
| setValueV2iArray | — | 严格一致 .0/.1 |
| setValueV3iArray | — | 严格一致 .0/.1 |
| setValueV4iArray | — | 严格一致 .0/.1 |
| setValueV1uiArray | — | 严格一致 .0/.1 |
| setValueV2uiArray | — | 严格一致 .0/.1 |
| setValueV3uiArray | — | 严格一致 .0/.1 |
| setValueV4uiArray | — | 严格一致 .0/.1 |
| setValueT1Array | — | 严格一致 .0/.1 |
| setValueT3DArray | — | 严格一致 .0/.1 |
| setValueT6Array | — | 严格一致 .0/.1 |
| setValueT2DArrayArray | — | 严格一致 .0/.1 |
| SingleUniform | constructor | 严格一致 .0/.1 |
| PureArrayUniform | constructor | 严格一致 .0/.1 |
| StructuredUniform | constructor, setValue | 严格一致 .0/.1 |
| addUniform | — | 严格一致 .0/.1 |
| parseUniform | — | 严格一致 .0/.1 |
| WebGLUniforms | constructor, setValue, setOptional, upload, seqWithValue | 严格一致 .0/.1 |
| WebGLShader | — | 严格一致 .0/.1 |
| getShaderErrors | — | 严格一致 .0/.1 |
| getTexelEncodingFunction | — | 严格一致 .0/.1 |
| getToneMappingFunction | — | 严格一致 .0/.1 |
| getLuminanceFunction | — | 严格一致 .0/.1 |
| filterEmptyLine | — | 严格一致 .0/.1 |
| replaceLightNums | — | 严格一致 .0/.1 |
| replaceClippingPlaneNums | — | 严格一致 .0/.1 |
| resolveIncludes | — | 严格一致 .0/.1 |
| includeReplacer | — | 严格一致 .0/.1 |
| unrollLoops | — | 严格一致 .0/.1 |
| loopReplacer | — | 严格一致 .0/.1 |
| generatePrecision | — | 严格一致 .0/.1 |
| WebGLProgram | — | 严格一致 .0/.1 |
| WebGLShaderCache | constructor, update, remove, getVertexShaderStage, getFragmentShaderStage, dispose, _getShaderCacheForMaterial, _getShaderStage | 严格一致 .0/.1 |
| WebGLShaderStage | constructor | 严格一致 .0/.1 |
| WebGLPrograms | — | 严格一致 .0/.1 |
| WebGLProperties | — | 严格一致 .0/.1 |
| painterSortStable | — | 严格一致 .0/.1 |
| reversePainterSortStable | — | 严格一致 .0/.1 |
| WebGLRenderList | — | 严格一致 .0/.1 |
| WebGLRenderLists | — | 严格一致 .0/.1 |
| UniformsCache | — | 严格一致 .0/.1 |
| shadowCastingAndTexturingLightsFirst | — | 严格一致 .0/.1 |
| WebGLLights | — | 严格一致 .0/.1 |
| WebGLRenderState | — | 严格一致 .0/.1 |
| WebGLRenderStates | — | 严格一致 .0/.1 |
| WebGLShadowMap | — | 条件赋值形式不匹配 |
| WebGLState | — | 严格一致 .0/.1 |
| WebGLTextures | — | 严格一致 .0/.1 |
| WebGLUtils | — | 严格一致 .0/.1 |
| WebXRDepthSensing | constructor, init, getMesh, reset, getDepthTexture | 严格一致 .0/.1 |
| WebXRManager | constructor | 严格一致 .0/.1 |
| WebGLMaterials | — | 严格一致 .0/.1 |
| WebGLUniformsGroups | — | 严格一致 .0/.1 |
| WebGLRenderer | constructor, coordinateSystem, outputColorSpace, outputColorSpace | 严格一致 .0/.1 |

## 内部 helper 对应

这些名称先在所属声明内按唯一的参数数量、按顺序排列的字符串字面量与非 core 成员属性访问建立对应，再与官方源码核对。此指纹用于识别源码对应关系，不充当等价性证明；每次改名另由冻结 AST 摘要验证。存在歧义或已被优化器内联的 helper 仍不命名。

- `WebGLAnimation.onAnimationFrame`
- `WebGLBackground.getBackground`
- `WebGLBackground.setClear`
- `WebGLBindingStates.bindVertexArrayObject`
- `WebGLBindingStates.deleteVertexArrayObject`
- `WebGLBindingStates.initAttributes`
- `WebGLBindingStates.enableAttributeAndDivisor`
- `WebGLBindingStates.disableUnusedAttributes`
- `WebGLBindingStates.vertexAttribPointer`
- `WebGLBindingStates.resetDefaultState`
- `WebGLCapabilities.getMaxPrecision`
- `WebGLClipping.projectPlanes`
- `WebGLEnvironments.mapTextureMapping`
- `WebGLExtensions.getExtension`
- `WebGLGeometries.onGeometryDispose`
- `WebGLGeometries.updateWireframeAttribute`
- `WebGLMorphtargets.disposeTexture`
- `WebGLObjects.onInstancedMeshDispose`
- `WebGLPrograms.getChannel`
- `WebGLRenderList.materialVariant`
- `WebGLRenderList.getNextRenderItem`
- `WebGLShadowMap.VSMPass`
- `WebGLShadowMap.renderObject`
- `WebGLState.createTexture`
- `WebGLState.enable`
- `WebGLState.disable`
- `WebGLState.setFlipSided`
- `WebGLState.setCullFace`
- `WebGLState.setPolygonOffset`
- `WebGLTextures.createCanvas`
- `WebGLTextures.textureNeedsGenerateMipmaps`
- `WebGLTextures.generateMipmap`
- `WebGLTextures.getTargetType`
- `WebGLTextures.getInternalFormat`
- `WebGLTextures.getInternalDepthFormat`
- `WebGLTextures.getMipLevels`
- `WebGLTextures.deleteTexture`
- `WebGLTextures.setTextureParameters`
- `WebGLTextures.getRow`
- `WebGLTextures.setupFrameBufferTexture`
- `WebGLTextures.setupRenderBufferStorage`
- `WebGLTextures.setupDepthTexture`
- `WebGLTextures.setupDepthRenderbuffer`
- `WebGLTextures.getRenderTargetSamples`
- `WebGLTextures.useMultisampledRTT`
- `WebGLTextures.verifyColorSpace`
- `WebGLTextures.getDimensions`
- `WebXRManager.onSessionEvent`
- `WebXRManager.onSessionEnd`
- `WebXRManager.onInputSourcesChange`
- `WebXRManager.updateCamera`
- `WebGLMaterials.refreshTransformUniform`
- `WebGLMaterials.refreshUniformsCommon`
- `WebGLUniformsGroups.writeUniformValue`
- `WebGLUniformsGroups.getUniformSize`
- `WebGLUniformsGroups.onUniformsGroupsDispose`
- `WebGLRenderer.getTargetPixelRatio`
- `WebGLRenderer.getContext`
- `WebGLRenderer.initGLContext`
- `WebGLRenderer.onContextLost`
- `WebGLRenderer.onContextRestore`
- `WebGLRenderer.onContextCreationError`
- `WebGLRenderer.prepareMaterial`
- `WebGLRenderer.onXRSessionStart`
- `WebGLRenderer.onXRSessionEnd`
- `WebGLRenderer.projectObject`
- `WebGLRenderer.renderScene`
- `WebGLRenderer.renderTransmissionPass`
- `WebGLRenderer.renderObjects`
- `WebGLRenderer.renderObject`
- `WebGLRenderer.getUniformList`
- `WebGLRenderer.updateCommonMaterialProperties`

## 渲染器变量对应

全部 49 个初始化器 AST 均与两个官方压缩版本一致。未重新创建上游压缩时已内联的常量，例如 LOD_MIN、GGX_SAMPLES 和 COMPLETION_STATUS_KHR。

- `ShaderChunk`
- `UniformsLib`
- `ShaderLib`
- `_rgb`
- `_m1$1`
- `_m$1`
- `EXTRA_LOD_SIGMA`
- `MAX_SAMPLES`
- `_flatCamera`
- `_clearColor`
- `_oldTarget`
- `_oldActiveCubeFace`
- `_oldActiveMipmapLevel`
- `_oldXrEnabled`
- `_origin`
- `toneMappingMap`
- `emptyTexture`
- `emptyShadowTexture`
- `emptyArrayTexture`
- `empty3dTexture`
- `emptyCubeTexture`
- `arrayCacheF32`
- `arrayCacheI32`
- `mat4array`
- `mat3array`
- `mat2array`
- `RePathPart`
- `programIdCount`
- `_m0`
- `toneMappingFunctions`
- `_v0`
- `includePattern`
- `shaderChunkMap`
- `unrollLoopPattern`
- `shadowMapTypeDefines`
- `envMapTypeDefines`
- `envMapModeDefines`
- `envMapBlendingDefines`
- `_id`
- `nextVersion`
- `_cubeDirections`
- `_cubeUps`
- `_projScreenMatrix`
- `_lightPositionWorld`
- `_lookTarget`
- `_m1`
- `_m`
- `DATA`
- `lut`

## ShaderChunk 字符串

全部 **142** 个具名 chunk/program 作为解码后的 JavaScript 字符串，与官方 .0 和 .1 逐字节一致，名称和顺序也相同。字符串保留恢复后的表示形式。长度以 UTF-16 code unit 计；摘要为字符串 UTF-8 数据的 SHA-256，表中展示前 16 位十六进制字符。ShaderLib 和 UniformsLib 也属于 49 个严格匹配的初始化器 AST，包含全部 shader 引用和 uniform 默认值。

| Chunk/program | 长度 | SHA-256 前缀 | 结果 |
| --- | ---: | --- | --- |
| alphahash_fragment | 96 | a996b691f1ddc8b4 | 严格一致 .0/.1 |
| alphahash_pars_fragment | 1204 | 7edfe278435c5101 | 严格一致 .0/.1 |
| alphamap_fragment | 83 | a0821bd5077f1888 | 严格一致 .0/.1 |
| alphamap_pars_fragment | 55 | cb592da3acdd4e0f | 严格一致 .0/.1 |
| alphatest_fragment | 248 | fbcfe87a4b9c9084 | 严格一致 .0/.1 |
| alphatest_pars_fragment | 53 | cfb92f9feee6f955 | 严格一致 .0/.1 |
| aomap_fragment | 571 | ca92407cb068cad5 | 严格一致 .0/.1 |
| aomap_pars_fragment | 80 | 246b78d6d9e882fc | 严格一致 .0/.1 |
| batching_pars_vertex | 1176 | 4455ad21e2f8bb34 | 严格一致 .0/.1 |
| batching_vertex | 101 | 9c058422805e4ef9 | 严格一致 .0/.1 |
| begin_vertex | 95 | 9f1251b99efaeac3 | 严格一致 .0/.1 |
| beginnormal_vertex | 104 | 781ebc71f7e65ef4 | 严格一致 .0/.1 |
| bsdfs | 669 | 69799838b2249f4e | 严格一致 .0/.1 |
| iridescence_fragment | 2713 | 6ae1ab4f1b5abc85 | 严格一致 .0/.1 |
| bumpmap_pars_fragment | 871 | c82e6f225b888bda | 严格一致 .0/.1 |
| clipping_planes_fragment | 1702 | 570a9ab0da054ae5 | 严格一致 .0/.1 |
| clipping_planes_pars_fragment | 116 | abbbd9263ed7fe0d | 严格一致 .0/.1 |
| clipping_planes_pars_vertex | 63 | 7e8750ecd3bc1090 | 严格一致 .0/.1 |
| clipping_planes_vertex | 69 | 3bc983325a703cd0 | 严格一致 .0/.1 |
| color_fragment | 86 | 13d8d05b394c0d30 | 严格一致 .0/.1 |
| color_pars_fragment | 83 | 9f3a00f2087e3d0f | 严格一致 .0/.1 |
| color_pars_vertex | 151 | 35c4bbcb070a96fa | 严格一致 .0/.1 |
| color_vertex | 413 | b40df0cad6eb04a4 | 严格一致 .0/.1 |
| common | 2565 | dc3c6539c5a37424 | 严格一致 .0/.1 |
| cube_uv_reflection_fragment | 3319 | e686959a9596ee35 | 严格一致 .0/.1 |
| defaultnormal_vertex | 912 | 1e661a2430ed5956 | 严格一致 .0/.1 |
| displacementmap_pars_vertex | 136 | ca4d50d780876478 | 严格一致 .0/.1 |
| displacementmap_vertex | 172 | e807d05ab7e88850 | 严格一致 .0/.1 |
| emissivemap_fragment | 237 | bc238a78f6655d75 | 严格一致 .0/.1 |
| emissivemap_pars_fragment | 61 | 7b641333b748f751 | 严格一致 .0/.1 |
| colorspace_fragment | 51 | 83913815c93c62c8 | 严格一致 .0/.1 |
| colorspace_pars_fragment | 490 | d04a499add70b59b | 严格一致 .0/.1 |
| envmap_fragment | 1074 | cda33d9a64d7afde | 严格一致 .0/.1 |
| envmap_common_pars_fragment | 184 | 5070c37e61b57111 | 严格一致 .0/.1 |
| envmap_pars_fragment | 307 | b92334893be6b8eb | 严格一致 .0/.1 |
| envmap_pars_vertex | 281 | c57f50b127ccbf3d | 严格一致 .0/.1 |
| envmap_physical_pars_fragment | 1418 | 3198beea0759e433 | 严格一致 .0/.1 |
| envmap_vertex | 608 | a8023ddd45d8d74c | 严格一致 .0/.1 |
| fog_vertex | 50 | 61ee13dff8bc82c0 | 严格一致 .0/.1 |
| fog_pars_vertex | 47 | 4da5038d0e6a8936 | 严格一致 .0/.1 |
| fog_fragment | 265 | 56da67f44405ce72 | 严格一致 .0/.1 |
| fog_pars_fragment | 180 | 800e0a3d91edf52b | 严格一致 .0/.1 |
| gradientmap_pars_fragment | 435 | 5b9c28b4160be4bd | 严格一致 .0/.1 |
| lightmap_pars_fragment | 89 | c60bdc960da35919 | 严格一致 .0/.1 |
| lights_lambert_fragment | 113 | 540174657087e64c | 严格一致 .0/.1 |
| lights_lambert_pars_fragment | 1022 | ce597f203257293a | 严格一致 .0/.1 |
| lights_pars_begin | 4398 | f627808e34226acf | 严格一致 .0/.1 |
| lights_toon_fragment | 64 | 9fa51ffe0126251f | 严格一致 .0/.1 |
| lights_toon_pars_fragment | 960 | 929bea28ae9a610f | 严格一致 .0/.1 |
| lights_phong_fragment | 191 | f871018153a7575a | 严格一致 .0/.1 |
| lights_phong_pars_fragment | 1292 | 3eb5b8612aa66be4 | 严格一致 .0/.1 |
| lights_physical_fragment | 4021 | ff8ddc3b4509c5ea | 严格一致 .0/.1 |
| lights_physical_pars_fragment | 18001 | 1206d7e3bb4e608a | 严格一致 .0/.1 |
| lights_fragment_begin | 6193 | 619431f5bb0ee786 | 严格一致 .0/.1 |
| lights_fragment_maps | 903 | 295622aac37a8ea9 | 严格一致 .0/.1 |
| lights_fragment_end | 472 | d7eb4352d64407d1 | 严格一致 .0/.1 |
| lightprobes_pars_fragment | 2039 | 135cbc3054d24d15 | 严格一致 .0/.1 |
| logdepthbuf_fragment | 149 | 2b962db5b8bf04d8 | 严格一致 .0/.1 |
| logdepthbuf_pars_fragment | 138 | b5bb1959dc868596 | 严格一致 .0/.1 |
| logdepthbuf_pars_vertex | 100 | 6988c7acc0149ede | 严格一致 .0/.1 |
| logdepthbuf_vertex | 145 | b96de48ef92bc429 | 严格一致 .0/.1 |
| map_fragment | 215 | db5743de8bbe8751 | 严格一致 .0/.1 |
| map_pars_fragment | 45 | e6d5f9c947b1650b | 严格一致 .0/.1 |
| map_particle_fragment | 338 | 19969375b1d1dd2c | 严格一致 .0/.1 |
| map_particle_pars_fragment | 249 | 846f36b74d1f6e0c | 严格一致 .0/.1 |
| metalnessmap_fragment | 170 | 2f7f39fe9a9106cf | 严格一致 .0/.1 |
| metalnessmap_pars_fragment | 63 | 04112fe9e1c1e5d7 | 严格一致 .0/.1 |
| morphinstance_vertex | 328 | 1ccdcb6756568117 | 严格一致 .0/.1 |
| morphcolor_vertex | 431 | 6b05182c3a50996f | 严格一致 .0/.1 |
| morphnormal_vertex | 250 | f77b4e70dd429e12 | 严格一致 .0/.1 |
| morphtarget_pars_vertex | 638 | 35fe2d84a4014e44 | 严格一致 .0/.1 |
| morphtarget_vertex | 248 | 9a9e20044685a1c1 | 严格一致 .0/.1 |
| normal_fragment_begin | 1154 | bd004a8fcc422f6e | 严格一致 .0/.1 |
| normal_fragment_maps | 666 | d090f0d03a0a7b19 | 严格一致 .0/.1 |
| normal_pars_fragment | 129 | 200b354400d98b3d | 严格一致 .0/.1 |
| normal_pars_vertex | 129 | 200b354400d98b3d | 严格一致 .0/.1 |
| normal_vertex | 270 | f3b1b5d537f8b133 | 严格一致 .0/.1 |
| normalmap_pars_fragment | 815 | e92bb3de470fba08 | 严格一致 .0/.1 |
| clearcoat_normal_fragment_begin | 71 | 91460f61d5ad688f | 严格一致 .0/.1 |
| clearcoat_normal_fragment_maps | 228 | 4a9d1cd760b609f8 | 严格一致 .0/.1 |
| clearcoat_pars_fragment | 259 | 8f2516d06f1d67f4 | 严格一致 .0/.1 |
| iridescence_pars_fragment | 154 | 8eed2177d7911346 | 严格一致 .0/.1 |
| opaque_fragment | 173 | 4a436437d533d5ec | 严格一致 .0/.1 |
| packing | 2863 | 7469a8a998e9484e | 严格一致 .0/.1 |
| premultiplied_alpha_fragment | 70 | 42ea99e56a8a8315 | 严格一致 .0/.1 |
| project_vertex | 273 | 76726eb1e5609463 | 严格一致 .0/.1 |
| dithering_fragment | 74 | 506332affc3e9d7b | 严格一致 .0/.1 |
| dithering_pars_fragment | 311 | c4708992ca63bd97 | 严格一致 .0/.1 |
| roughnessmap_fragment | 170 | 50e4b8ecae91bb45 | 严格一致 .0/.1 |
| roughnessmap_pars_fragment | 63 | 4cb169df1e804443 | 严格一致 .0/.1 |
| shadowmap_pars_fragment | 8600 | 44cdc0708072efcd | 严格一致 .0/.1 |
| shadowmap_pars_vertex | 1291 | 9714d7868feeabe7 | 严格一致 .0/.1 |
| shadowmap_vertex | 1505 | debef23f312c17b9 | 严格一致 .0/.1 |
| shadowmask_pars_fragment | 1514 | d23a101c36d9f627 | 严格一致 .0/.1 |
| skinbase_vertex | 214 | 17cd3cefb92dc81a | 严格一致 .0/.1 |
| skinning_pars_vertex | 551 | 6584cab656d424fe | 严格一致 .0/.1 |
| skinning_vertex | 365 | c89b2a2ed2acca7d | 严格一致 .0/.1 |
| skinnormal_vertex | 444 | 29d9015eb911dd07 | 严格一致 .0/.1 |
| specularmap_fragment | 185 | 40e04ffc7a079b33 | 严格一致 .0/.1 |
| specularmap_pars_fragment | 61 | 79335c8598a2ace3 | 严格一致 .0/.1 |
| tonemapping_fragment | 87 | 27992ac66d2225f7 | 严格一致 .0/.1 |
| tonemapping_pars_fragment | 3474 | 0e82e57cbc2747a2 | 严格一致 .0/.1 |
| transmission_fragment | 1097 | 1b48ab702c9dd4af | 严格一致 .0/.1 |
| transmission_pars_fragment | 5861 | a46da1a408584908 | 严格一致 .0/.1 |
| uv_pars_fragment | 1556 | 9bdcdc22267c415d | 严格一致 .0/.1 |
| uv_pars_vertex | 2417 | 478d5634039f6789 | 严格一致 .0/.1 |
| uv_vertex | 2679 | bd03fead431dab4a | 严格一致 .0/.1 |
| worldpos_vertex | 399 | 41cd967955a2a57d | 严格一致 .0/.1 |
| background_vert | 148 | abc44deba1bc266c | 严格一致 .0/.1 |
| background_frag | 494 | 13f17a38c5468191 | 严格一致 .0/.1 |
| backgroundCube_vert | 211 | b2f894bfdf14553b | 严格一致 .0/.1 |
| backgroundCube_frag | 747 | 47c2e0e7eb1262bb | 严格一致 .0/.1 |
| cube_vert | 211 | b2f894bfdf14553b | 严格一致 .0/.1 |
| cube_frag | 329 | c5bab57a49f0ea30 | 严格一致 .0/.1 |
| depth_vert | 792 | d94173e2e50c360a | 严格一致 .0/.1 |
| depth_frag | 1214 | 08541d654d77b3ad | 严格一致 .0/.1 |
| distance_vert | 770 | 6f6f04340e74f786 | 严格一致 .0/.1 |
| distance_frag | 753 | d40c86cac86b1863 | 严格一致 .0/.1 |
| equirect_vert | 179 | 659b9e9c5ec507d5 | 严格一致 .0/.1 |
| equirect_frag | 297 | 6da2a348e6831d95 | 严格一致 .0/.1 |
| linedashed_vert | 625 | 1ebe600c9e10cb93 | 严格一致 .0/.1 |
| linedashed_frag | 816 | 5775849f6d93c780 | 严格一致 .0/.1 |
| meshbasic_vert | 932 | 405cbca99b610dfc | 严格一致 .0/.1 |
| meshbasic_frag | 1619 | dffb0590521202bc | 严格一致 .0/.1 |
| meshlambert_vert | 1134 | 51e06b429457b609 | 严格一致 .0/.1 |
| meshlambert_frag | 1988 | 8da4bdfb1d004d9e | 严格一致 .0/.1 |
| meshmatcap_vert | 987 | e23e0f61f00e3cf3 | 严格一致 .0/.1 |
| meshmatcap_frag | 1506 | 5850c5b478e61941 | 严格一致 .0/.1 |
| meshnormal_vert | 1056 | dc3ecaed709fc728 | 严格一致 .0/.1 |
| meshnormal_frag | 699 | 41a2a45ff86cb866 | 严格一致 .0/.1 |
| meshphong_vert | 1132 | 1fa974aeb9aac11c | 严格一致 .0/.1 |
| meshphong_frag | 2096 | ed4929647abd738b | 严格一致 .0/.1 |
| meshphysical_vert | 1208 | d3257679d2240f66 | 严格一致 .0/.1 |
| meshphysical_frag | 3942 | 1e514d00668632ed | 严格一致 .0/.1 |
| meshtoon_vert | 1075 | 3008bfc9cb31b5d6 | 严格一致 .0/.1 |
| meshtoon_frag | 1767 | 77cbf39f046b3e5b | 严格一致 .0/.1 |
| points_vert | 864 | 79618fa511ccbaeb | 严格一致 .0/.1 |
| points_frag | 793 | 976c2350f9a21533 | 严格一致 .0/.1 |
| shadow_vert | 663 | 8044e18f571a7b63 | 严格一致 .0/.1 |
| shadow_frag | 491 | cbe6c96544c20792 | 严格一致 .0/.1 |
| sprite_vert | 964 | 0942d59518e1fff4 | 严格一致 .0/.1 |
| sprite_frag | 768 | e5b4520f335a1155 | 严格一致 .0/.1 |

## Addon 对应与补丁版本不确定性

这些文件均直接与两个包的 `examples/jsm` 源码核对。官方文件在 .0 与 .1 之间逐字节一致（SHA-256 见下表），因此无法据此区分补丁版本。恢复代码的导入通过 namespace bridge 模块路由；压缩过程内联 helper 并折叠控制流。因此这里只报告类/方法名称对应，不宣称整个 addon 与官方未压缩源码完全相同。冻结的原始版/候选版摘要能够证明全部 addon 编辑仅涉及词法名称与注释。

下表的 179 个类方法对应指现有类名、方法名和参数位置/数量相符。恢复的 addon 参数拼写是**推断的上游角色名**，并已结合方法操作核对；它们不能证明被擦除的原始标识符，也不表示整个方法 AST 已匹配。其证据强度低于渲染器的 105 个严格声明匹配。12 个 addon helper 名称表示源码角色对应；被优化器折叠的函数体不计为完整结构匹配。任何 addon 方法都未计入渲染器严格匹配数量。

| Addon | 上游源码 | 同名类方法数 | 恢复参数绑定数 | 官方源码 SHA-256（.0 = .1） |
| --- | --- | ---: | ---: | --- |
| CopyShader | examples/jsm/shaders/CopyShader.js | 0 | 0 | a33057d5ac91c43304c186ac0e8816e62bb2ed471d3a00ff3018dfd5c0389718 |
| LuminosityHighPassShader | examples/jsm/shaders/LuminosityHighPassShader.js | 0 | 0 | 5044f780b6e6cf863947f64c36fe1587132f7fbe395ada863cd1e5f0388dcf1e |
| EffectComposer | examples/jsm/postprocessing/EffectComposer.js | 11 | 8 | 4e079a5886152d7e529a59aef644e968ab4d32c6a33ce016b36bf29b2eac26f7 |
| Pass | examples/jsm/postprocessing/Pass.js | 10 | 3 | 444b409c235ead986893c472e720da1b779a56985c7d10b279c7944b52bd61c5 |
| OutlinePass | examples/jsm/postprocessing/OutlinePass.js | 12 | 14 | c8a82d251b651fad0317f52663e0f5370998bab20a88a29da5d8702cc2db86d6 |
| MaskPass | examples/jsm/postprocessing/MaskPass.js | 4 | 4 | 7cd08eee9d5d6f5578beaddbdcbe9c384f6873810af27f22ab7db3ceeb127aa3 |
| ShaderPass | examples/jsm/postprocessing/ShaderPass.js | 3 | 4 | e2500a5913b26bbf5148ceaae644c6edcff06a18b01494ee37bf856353d2ab9d |
| RenderPass | examples/jsm/postprocessing/RenderPass.js | 2 | 3 | 817f6c3cdcd0fd41515d112359ea0532568eefb5aabd3b33903957ebca1b8a6a |
| UnrealBloomPass | examples/jsm/postprocessing/UnrealBloomPass.js | 6 | 10 | 1158bb02f6467889aba19c1a788b9107054d7f6a558498b5e2152db5873bb859 |
| DRACOLoader | examples/jsm/loaders/DRACOLoader.js | 17 | 24 | fdafdf4aa11bbc65d89adb338efd844bedf94073702f9049240ff1f1ea48ad5f |
| KTX2Loader | examples/jsm/loaders/KTX2Loader.js | 11 | 16 | 3a3233ce3409443076d3414b78832e1405fcfac5ecb34d367365fd0781127d6c |
| GLTFLoader | examples/jsm/loaders/GLTFLoader.js | 103 | 134 | 97642d720f16cc9a0c9844934198e4d0c023bea8e89576d0f7545d03b2d103d2 |

### Addon 类与 helper 明细

shader 字面量另行独立核对，不依赖方法名推断。`CopyShader` 有 2/2 个程序字符串严格一致，`LuminosityHighPassShader` 为 2/2，`OutlinePass` 为 8/8，`UnrealBloomPass` 为 4/4：**16/16 个解码字符串**与两个官方版本完全一致，包含空白字符。其余本次负责的 addon 没有字面量 `vertexShader`/`fragmentShader` 对象字段（ShaderPass 从输入接收程序）。这是字符串比较，不是整个 addon 控制流的证明。

**CopyShader**


**LuminosityHighPassShader**


**EffectComposer**

- `EffectComposer`: constructor, swapBuffers, addPass, insertPass, removePass, isLastEnabledPass, render, reset, setSize, setPixelRatio, dispose.

**Pass**

- `Pass`: constructor, setSize, render, dispose.
- `FullscreenTriangleGeometry`: constructor.
- `FullScreenQuad`: constructor, dispose, render, material, material.

**OutlinePass**

- `OutlinePass`: constructor, dispose, setSize, render, _updateSelectionCache, _changeVisibilityOfSelectedObjects, _changeVisibilityOfNonSelectedObjects, _updateTextureMatrix, _getPrepareMaskMaterial, _getEdgeDetectionMaterial, _getSeparableBlurMaterial, _getOverlayMaterial.

**MaskPass**

- `MaskPass`: constructor, render.
- `ClearMaskPass`: constructor, render.

**ShaderPass**

- `ShaderPass`: constructor, render, dispose.

**RenderPass**

- `RenderPass`: constructor, render.

**UnrealBloomPass**

- `UnrealBloomPass`: constructor, dispose, setSize, render, _getSeparableBlurMaterial, _getCompositeMaterial.

**DRACOLoader**

- `DRACOLoader`: constructor, setDecoderPath, setDecoderConfig, setWorkerLimit, load, parse, decodeDracoFile, decodeGeometry, _createGeometry, _assignVertexColorSpace, _loadLibrary, preload, _initDecoder, _getWorker, _releaseTask, debug, dispose.
- Helper 名称： `DRACOWorker`.

**KTX2Loader**

- `KTX2Loader`: constructor, setTranscoderPath, setWorkerLimit, detectSupportAsync, detectSupport, init, load, parse, _createTextureFrom, _createTexture, dispose.
- Helper 名称： `parseColorSpace`.

**GLTFLoader**

- `GLTFLoader`: constructor, load, setDRACOLoader, setKTX2Loader, setMeshoptDecoder, register, unregister, parse, parseAsync.
- `GLTFLightsExtension`: constructor, _markDefs, _loadLight, getDependency, createNodeAttachment.
- `GLTFMaterialsUnlitExtension`: constructor, getMaterialType, extendParams.
- `GLTFMaterialsEmissiveStrengthExtension`: constructor, extendMaterialParams.
- `GLTFMaterialsClearcoatExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsDispersionExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsIridescenceExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsSheenExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsTransmissionExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsVolumeExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsIorExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsSpecularExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsBumpExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFMaterialsAnisotropyExtension`: constructor, getMaterialType, extendMaterialParams.
- `GLTFTextureBasisUExtension`: constructor, loadTexture.
- `GLTFTextureWebPExtension`: constructor, loadTexture.
- `GLTFTextureAVIFExtension`: constructor, loadTexture.
- `GLTFMeshoptCompression`: constructor, loadBufferView.
- `GLTFMeshGpuInstancing`: constructor, createNodeMesh.
- `GLTFBinaryExtension`: constructor.
- `GLTFDracoMeshCompressionExtension`: constructor, decodePrimitive.
- `GLTFTextureTransformExtension`: constructor, extendTexture.
- `GLTFMeshQuantizationExtension`: constructor.
- `GLTFCubicSplineInterpolant`: constructor, copySampleValue_, interpolate_.
- `GLTFCubicSplineQuaternionInterpolant`: interpolate_.
- `GLTFParser`: constructor, setExtensions, setPlugins, parse, _markDefs, _addNodeRef, _getNodeRef, _invokeOne, _invokeAll, getDependency, getDependencies, loadBuffer, loadBufferView, loadAccessor, loadTexture, loadTextureImage, loadImageSource, assignTexture, assignFinalMaterial, getMaterialType, loadMaterial, createUniqueName, loadGeometries, loadMesh, loadCamera, loadSkin, loadAnimation, createNodeMesh, loadNode, _loadNodeShallow, loadScene, _createAnimationTracks, _getArrayFromAccessor, _createCubicSplineTrackInterpolant.
- Helper 名称： `GLTFRegistry`, `getMaterialExtension`, `createDefaultMaterial`, `addUnknownExtensionsToUserData`, `assignExtrasToUserData`, `updateMorphTargets`, `createPrimitiveKey`, `createAttributesKey`, `getNormalizedComponentScale`, `addPrimitiveAttributes`.

### 明确未匹配项与应用定制边界

- DRACOLoader 恢复代码中的 decoder URL 模块与 `DRACO_GLTF_CONFIG` 属于应用打包器集成，并非从上游 addon 复制。原有 URL 解析、可转移 buffer 缓存、worker 源码构造、decoder 选择和错误处理均保留。DRACOWorker 依据上游 addon 识别；Draco codec 本身是独立依赖，不宣称其为恢复后的 Three 源码。
- KTX2Loader 的 `Ci` namespace 为 KTX parser bridge，ZSTD decoder 与 Display P3 模块属于独立依赖，生成的 transcoder URL 属于应用集成。本分析不将这些实现重新归为 Three。保留了内联 Basis worker 及能力检测/transcoder 决策；未执行 codec 二进制行为验证。
- GLTFLoader 的 26 个具名类以及 GLTFRegistry/material/attribute/extras helper 均有上游对应。若干上游 helper（addMorphTargets、computeBounds 和 URI MIME 处理）被优化器折叠到较大的方法/函数中。本次未重新创建这些函数，也不将其宣称为独立严格匹配项。
- CopyShader 与 LuminosityHighPassShader 没有类；其具名 uniform/program 对象保持原样，两个源码文件仅补来源注释。其余后处理 shader 以内联字符串存在于 pass 方法中，并由冻结源码摘要覆盖；未应用 shader 格式化或替换。
- 缺乏唯一源码证据的内部局部变量仍保留压缩名称。标识符恢复不能证明未公开的原始仓库结构，也不能抹去应用定制差异。
