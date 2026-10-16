# Three core 语义命名整理

仅修改 `eyes/src/vendor/three/core.js` 的绑定名称和官方 API 文档注释，未替换库、升级依赖或更改公式。源文件仍是既有 recovered vendor 模块。

参考是官方 npm 发布物 [three@0.185.0](https://registry.npmjs.org/three/-/three-0.185.0.tgz) 和 [three@0.185.1](https://registry.npmjs.org/three/-/three-0.185.1.tgz) 的 `package/build/three.core.js`，可对照 [Three.js r185 源码](https://github.com/mrdoob/three.js/tree/r185/src)。`REVISION = 185` 只证明修订号，不能确定本地是哪个 patch；本轮不声称查明确切 patch，也不声称恢复全部未匹配名称。版权及 MIT/SPDX 许可标记已在源文件保留补齐，官方注释沿用其许可证。

参考文件 SHA-256：

- 0.185.0：`78b2c4218834ca8670547ed2315bfc21a00ff4dc3403bbffc8c31493d31d14de`
- 0.185.1：`3718df126d69c125362a03340913204470d8c50238605150e57f808840fb7759`

## 实际覆盖

本地 218 个命名类中扫描 1624 个类方法，匹配 993 个，未匹配 631 个。匹配方法的 1719 个参数/局部绑定采用两份官方构建一致的名称；另从实际导出别名恢复 20 项公开名称，并对 54 个内部模块绑定采用相同使用角色及独立相同初始化式验证后的名称。下列模块改名表包含所有模块级变化，不包含方法内部改名。

874 个匹配方法的外部绑定名称本已一致；119 个匹配方法需要把有模块绑定的外部引用按首次使用角色抽象后才能比较。这后一类是**结构和使用角色推断**，不是宣称其外部辅助函数原名已恢复。匹配要求同类、同 kind/static/key 方法，局部词法结构与两份官方参数/局部名一致，且属性名、字符串、数值、运算符和调用结构一致。对于内部模块绑定还额外要求两份官方声明的初始化表达式与本地完全相同；不能独立验证的候选不采纳。

规范化仅用于比较：拆开多项声明，统一布尔简写，展开返回值被丢弃的逗号/三元/短路语句及顺序 return/if 条件。生产执行体没有从上游拷贝，也未用规范化结果改写算法；仅按 Babel 词法绑定进行临时命名空间中转改名，最终整文件 alpha hash 验证捕获错误改名。

冻结的完整文件规范化行为 hash 为 `973e08eac13b9c44eb412ef8f93e85459c1c6c1d984c20d3372f5b2960f26844`。测试直接内嵌该值，不读取 artifacts；公开导出集合 444 项，其名称集合 hash 为 `e41b5640743b2f6d56a327f517b678c66dd5bc1251bf4a271051d8a04924428e`。

## 模块绑定变更

| 本地旧名 | 官方/导出名称 |
| --- | --- |
| `f` | `FrontSide` |
| `A` | `NormalBlending` |
| `T` | `AddEquation` |
| `D` | `SrcAlphaFactor` |
| `N` | `OneMinusSrcAlphaFactor` |
| `j` | `LessEqualDepth` |
| `Z` | `MultiplyOperation` |
| `ue` | `AttachedBindMode` |
| `ge` | `ClampToEdgeWrapping` |
| `ye` | `NearestFilter` |
| `Oe` | `UnsignedByteType` |
| `ke` | `FloatType` |
| `Pt` | `LoopRepeat` |
| `$t` | `BasicDepthPacking` |
| `nn` | `TangentSpaceNormalMap` |
| `fn` | `KeepStencilOp` |
| `xn` | `AlwaysStencilFunc` |
| `kn` | `StaticDrawUsage` |
| `Vn` | `WebGLCoordinateSystem` |
| `vector3` | `_vector$c` |
| `quaternion` | `_quaternion$5` |
| `Fr` | `_tempVec3` |
| `Ur` | `_zero` |
| `Gr` | `_one` |
| `Qr` | `_matrix$2` |
| `Kr` | `_quaternion$4` |
| `$r` | `_v1$6` |
| `Zr` | `_q1` |
| `ei` | `_m1$1` |
| `ti` | `_target` |
| `ni` | `_position$4` |
| `ri` | `_scale$3` |
| `ii` | `_quaternion$3` |
| `ai` | `_xAxis` |
| `si` | `_yAxis` |
| `oi` | `_zAxis` |
| `fi` | `_hslA` |
| `mi` | `_hslB` |
| `color` | `_color` |
| `Ai` | `_v0$2` |
| `gi` | `_v1$5` |
| `Li` | `_vab` |
| `vi` | `_vac` |
| `Ti` | `_vbc` |
| `Si` | `_vap` |
| `wi` | `_vbp` |
| `Ei` | `_vcp` |
| `vector4` | `_v40` |
| `zi` | `_v41` |
| `Oi` | `_v42` |
| `Di` | `_vector$b` |
| `Ki` | `_vector$a` |
| `ra` | `_m1` |
| `object3D` | `_obj` |
| `aa` | `_offset` |
| `ca` | `_vector$9` |
| `la` | `_vector$8` |
| `Ea` | `_vector$7` |
| `us` | `_vector1` |
| `ds` | `_vector2` |
| `hs` | `_normalMatrix` |
| `co` | `Curves` |
| `Zo` | `DefaultLoadingManager` |
| `lc` | `_minTarget` |
| `uc` | `_maxTarget` |
| `dc` | `_customMaterials` |
| `hc` | `_customGeometries` |
| `vc` | `_position$1` |
| `Tc` | `_quaternion$1` |
| `Sc` | `_scale$1` |
| `wc` | `_forward` |
| `Ec` | `_up` |
| `Wc` | `_matrix` |
| `Hc` | `_vector$4` |

## 按类完整方法覆盖

这里逐类列出所有已匹配和未匹配方法；`get:`/`set:`/`static:` 是方法种类而非新 API。方法匹配不代表同类所有其他方法也已确认。

| 类 | 已匹配方法 | 未匹配方法 |
| --- | --- | --- |
| Vector2 | `constructor`, `get:width`, `set:width`, `get:height`, `set:height`, `set`, `setScalar`, `setX`, `setY`, `clone`, `copy`, `add`, `addScalar`, `addVectors`, `addScaledVector`, `sub`, `subScalar`, `subVectors`, `multiply`, `multiplyScalar`, `divide`, `divideScalar`, `applyMatrix3`, `min`, `max`, `clamp`, `clampScalar`, `clampLength`, `floor`, `ceil`, `round`, `roundToZero`, `negate`, `dot`, `cross`, `lengthSq`, `length`, `manhattanLength`, `normalize`, `distanceTo`, `distanceToSquared`, `manhattanDistanceTo`, `setLength`, `lerp`, `lerpVectors`, `equals`, `fromArray`, `toArray`, `fromBufferAttribute`, `rotateAround`, `random`, `Symbol.iterator` | `setComponent`, `getComponent`, `angle`, `angleTo` |
| Quaternion | `constructor`, `static:method:multiplyQuaternionsFlat`, `get:x`, `set:x`, `get:y`, `set:y`, `get:z`, `set:z`, `get:w`, `set:w`, `set`, `clone`, `copy`, `setFromAxisAngle`, `setFromUnitVectors`, `angleTo`, `identity`, `invert`, `conjugate`, `dot`, `lengthSq`, `length`, `multiply`, `premultiply`, `multiplyQuaternions`, `slerpQuaternions`, `random`, `equals`, `fromArray`, `toArray`, `fromBufferAttribute`, `toJSON`, `_onChange`, `_onChangeCallback`, `Symbol.iterator` | `static:method:slerpFlat`, `setFromEuler`, `setFromRotationMatrix`, `rotateTowards`, `normalize`, `slerp` |
| Vector3 | `constructor`, `setScalar`, `setX`, `setY`, `setZ`, `clone`, `copy`, `add`, `addScalar`, `addVectors`, `addScaledVector`, `sub`, `subScalar`, `subVectors`, `multiply`, `multiplyScalar`, `multiplyVectors`, `applyEuler`, `applyAxisAngle`, `applyMatrix3`, `applyNormalMatrix`, `applyMatrix4`, `applyQuaternion`, `project`, `unproject`, `transformDirection`, `divide`, `divideScalar`, `min`, `max`, `clamp`, `clampScalar`, `clampLength`, `floor`, `ceil`, `round`, `roundToZero`, `negate`, `dot`, `lengthSq`, `length`, `manhattanLength`, `normalize`, `setLength`, `lerp`, `lerpVectors`, `cross`, `crossVectors`, `projectOnPlane`, `reflect`, `distanceTo`, `distanceToSquared`, `manhattanDistanceTo`, `setFromSpherical`, `setFromSphericalCoords`, `setFromCylindrical`, `setFromCylindricalCoords`, `setFromMatrixPosition`, `setFromMatrixScale`, `setFromEuler`, `setFromColor`, `equals`, `fromArray`, `toArray`, `fromBufferAttribute`, `random`, `Symbol.iterator` | `set`, `setComponent`, `getComponent`, `projectOnVector`, `angleTo`, `setFromMatrixColumn`, `setFromMatrix3Column`, `randomDirection` |
| Matrix3 | `set`, `identity`, `copy`, `extractBasis`, `setFromMatrix4`, `multiply`, `premultiply`, `multiplyMatrices`, `multiplyScalar`, `determinant`, `transpose`, `getNormalMatrix`, `transposeIntoArray`, `setUvTransform`, `makeTranslation`, `makeRotation`, `makeScale`, `toArray`, `clone` | `constructor`, `invert`, `scale`, `rotate`, `translate`, `equals`, `fromArray` |
| Texture | `get:width`, `get:height`, `get:depth`, `get:image`, `set:image`, `updateMatrix`, `addUpdateRange`, `clearUpdateRanges`, `clone`, `copy` | `constructor`, `setValues`, `toJSON`, `dispose`, `transformUv`, `set:needsUpdate`, `set:needsPMREMUpdate` |
| Vector4 | `constructor`, `get:width`, `set:width`, `get:height`, `set:height`, `set`, `setScalar`, `setX`, `setY`, `setZ`, `setW`, `clone`, `add`, `addScalar`, `addVectors`, `addScaledVector`, `sub`, `subScalar`, `subVectors`, `multiply`, `multiplyScalar`, `applyMatrix4`, `divide`, `divideScalar`, `setFromMatrixPosition`, `min`, `max`, `clamp`, `clampScalar`, `clampLength`, `floor`, `ceil`, `round`, `roundToZero`, `negate`, `dot`, `lengthSq`, `length`, `manhattanLength`, `normalize`, `setLength`, `lerp`, `lerpVectors`, `equals`, `fromArray`, `toArray`, `fromBufferAttribute`, `random`, `Symbol.iterator` | `setComponent`, `getComponent`, `copy`, `setAxisAngleFromQuaternion`, `setAxisAngleFromRotationMatrix` |
| RenderTarget | `constructor`, `get:texture`, `set:texture`, `get:depthTexture`, `clone` | `_setTextureOptions`, `set:depthTexture`, `setSize`, `copy`, `dispose` |
| WebGLRenderTarget | `constructor` | — |
| DataArrayTexture | `constructor`, `addLayerUpdate`, `clearLayerUpdates` | — |
| WebGLArrayRenderTarget | `constructor` | — |
| Data3DTexture | `constructor` | — |
| WebGL3DRenderTarget | `constructor` | — |
| Matrix4 | `set`, `identity`, `clone`, `copy`, `copyPosition`, `setFromMatrix3`, `makeBasis`, `makeRotationFromQuaternion`, `multiply`, `premultiply`, `multiplyMatrices`, `multiplyScalar`, `determinant`, `determinantAffine`, `transpose`, `setPosition`, `scale`, `getMaxScaleOnAxis`, `makeTranslation`, `makeRotationX`, `makeRotationY`, `makeRotationZ`, `makeRotationAxis`, `makeScale`, `makeShear`, `compose`, `toArray` | `constructor`, `extractBasis`, `extractRotation`, `makeRotationFromEuler`, `lookAt`, `invert`, `decompose`, `makePerspective`, `makeOrthographic`, `equals`, `fromArray` |
| Euler | `constructor`, `get:x`, `set:x`, `get:y`, `set:y`, `get:z`, `set:z`, `get:order`, `set:order`, `set`, `clone`, `copy`, `setFromQuaternion`, `setFromVector3`, `reorder`, `equals`, `toArray`, `_onChange`, `_onChangeCallback`, `Symbol.iterator` | `setFromRotationMatrix`, `fromArray` |
| Layers | `disableAll` | `constructor`, `set`, `enable`, `enableAll`, `toggle`, `disable`, `test`, `isEnabled` |
| Object3D | `onBeforeShadow`, `onAfterShadow`, `onBeforeRender`, `onAfterRender`, `applyMatrix4`, `applyQuaternion`, `setRotationFromAxisAngle`, `setRotationFromEuler`, `setRotationFromMatrix`, `setRotationFromQuaternion`, `rotateOnAxis`, `rotateOnWorldAxis`, `rotateX`, `rotateY`, `rotateZ`, `translateOnAxis`, `translateX`, `translateY`, `translateZ`, `localToWorld`, `worldToLocal`, `lookAt`, `clear`, `getWorldPosition`, `getWorldQuaternion`, `getWorldScale`, `getWorldDirection`, `raycast`, `clone` | `constructor`, `add`, `remove`, `removeFromParent`, `attach`, `getObjectById`, `getObjectByName`, `getObjectByProperty`, `getObjectsByProperty`, `traverse`, `traverseVisible`, `traverseAncestors`, `updateMatrix`, `updateMatrixWorld`, `updateWorldMatrix`, `toJSON`, `copy` |
| WebXRController | `constructor` | `getHandSpace`, `getTargetRaySpace`, `getGripSpace`, `dispatchEvent`, `connect`, `disconnect`, `update`, `_getHandJoint` |
| Color | `constructor`, `setScalar`, `setRGB`, `clone`, `copy`, `copySRGBToLinear`, `copyLinearToSRGB`, `convertSRGBToLinear`, `convertLinearToSRGB`, `getRGB`, `offsetHSL`, `add`, `addColors`, `addScalar`, `sub`, `multiply`, `multiplyScalar`, `lerp`, `lerpColors`, `lerpHSL`, `setFromVector3`, `applyMatrix3`, `equals`, `fromArray`, `toArray`, `fromBufferAttribute`, `toJSON`, `Symbol.iterator` | `set`, `setHex`, `setHSL`, `setStyle`, `setColorName`, `getHex`, `getHexString`, `getHSL`, `getStyle` |
| FogExp2 | `clone` | `constructor`, `toJSON` |
| Fog | `clone` | `constructor`, `toJSON` |
| Triangle | `constructor`, `static:method:getInterpolatedAttribute`, `static:method:isFrontFacing`, `set`, `setFromPointsAndIndices`, `setFromAttributeAndIndices`, `clone`, `copy`, `getMidpoint`, `getNormal`, `getPlane`, `getBarycoord`, `getInterpolation`, `containsPoint`, `isFrontFacing`, `intersectsBox`, `closestPointToPoint`, `equals` | `static:method:getNormal`, `static:method:getBarycoord`, `static:method:containsPoint`, `static:method:getInterpolation`, `getArea` |
| Box3 | `set`, `setFromObject`, `clone`, `copy`, `isEmpty`, `getSize`, `expandByPoint`, `expandByVector`, `expandByScalar`, `containsPoint`, `containsBox`, `getParameter`, `intersectsBox`, `intersectsSphere`, `intersectsPlane`, `clampPoint`, `distanceToPoint`, `intersect`, `union`, `translate`, `equals`, `toJSON`, `fromJSON` | `constructor`, `setFromArray`, `setFromBufferAttribute`, `setFromPoints`, `setFromCenterAndSize`, `makeEmpty`, `getCenter`, `expandByObject`, `intersectsTriangle`, `getBoundingSphere`, `applyMatrix4` |
| DataUtils | `static:method:toHalfFloat`, `static:method:fromHalfFloat` | — |
| BufferAttribute | `onUploadCallback`, `setUsage`, `addUpdateRange`, `clearUpdateRanges`, `copy`, `copyArray`, `applyMatrix4`, `applyNormalMatrix`, `transformDirection`, `set`, `getComponent`, `setComponent`, `getX`, `setX`, `getY`, `setY`, `getZ`, `setZ`, `getW`, `setW`, `setXY`, `setXYZ`, `setXYZW`, `onUpload`, `clone` | `constructor`, `set:needsUpdate`, `copyAt`, `applyMatrix3`, `toJSON`, `dispose` |
| Int8BufferAttribute | `constructor` | — |
| Uint8BufferAttribute | `constructor` | — |
| Uint8ClampedBufferAttribute | `constructor` | — |
| Int16BufferAttribute | `constructor` | — |
| Uint16BufferAttribute | `constructor` | — |
| Int32BufferAttribute | `constructor` | — |
| Uint32BufferAttribute | `constructor` | — |
| Float16BufferAttribute | `constructor`, `getX`, `setX`, `getY`, `setY`, `getZ`, `setZ`, `getW`, `setW`, `setXY`, `setXYZ`, `setXYZW` | — |
| Float32BufferAttribute | `constructor` | — |
| Sphere | `constructor`, `set`, `copy`, `isEmpty`, `makeEmpty`, `containsPoint`, `distanceToPoint`, `intersectsSphere`, `intersectsBox`, `intersectsPlane`, `clampPoint`, `applyMatrix4`, `translate`, `equals`, `clone`, `toJSON`, `fromJSON` | `setFromPoints`, `getBoundingBox`, `expandByPoint`, `union` |
| BufferGeometry | `getIndex`, `setIndirect`, `getIndirect`, `getAttribute`, `setAttribute`, `deleteAttribute`, `addGroup`, `clearGroups`, `setDrawRange`, `applyQuaternion`, `rotateX`, `rotateY`, `rotateZ`, `translate`, `scale`, `lookAt`, `center`, `normalizeNormals`, `clone` | `constructor`, `setIndex`, `hasAttribute`, `applyMatrix4`, `setFromPoints`, `computeBoundingBox`, `computeBoundingSphere`, `computeTangents`, `computeVertexNormals`, `toNonIndexed`, `toJSON`, `copy`, `dispose` |
| InterleavedBuffer | `onUploadCallback`, `setUsage`, `addUpdateRange`, `clearUpdateRanges`, `copy`, `set`, `onUpload` | `constructor`, `set:needsUpdate`, `copyAt`, `clone`, `toJSON` |
| InterleavedBufferAttribute | `get:count`, `get:array`, `set:needsUpdate`, `applyMatrix4`, `applyNormalMatrix`, `transformDirection`, `getComponent`, `setComponent`, `setX`, `setY`, `setZ`, `setW`, `getX`, `getY`, `getZ`, `getW`, `setXY`, `setXYZ`, `setXYZW` | `constructor`, `clone`, `toJSON` |
| Material | `get:alphaTest`, `onBeforeRender`, `onBeforeCompile`, `customProgramCacheKey`, `clone` | `constructor`, `set:alphaTest`, `setValues`, `toJSON`, `fromJSON`, `copy`, `dispose`, `set:needsUpdate` |
| SpriteMaterial | `copy` | `constructor` |
| LOD | `copy`, `getCurrentLevel` | `constructor`, `addLevel`, `removeLevel`, `getObjectForDistance`, `raycast`, `update`, `toJSON` |
| Ray | `constructor`, `set`, `copy`, `at`, `lookAt`, `recast`, `distanceToPoint`, `applyMatrix4`, `equals`, `clone` | `closestPointToPoint`, `distanceSqToPoint`, `distanceSqToSegment`, `intersectSphere`, `intersectsSphere`, `distanceToPlane`, `intersectPlane`, `intersectsPlane`, `intersectBox`, `intersectsBox`, `intersectTriangle` |
| MeshBasicMaterial | `copy` | `constructor` |
| SkinnedMesh | `getVertexPosition`, `pose` | `constructor`, `computeBoundingBox`, `computeBoundingSphere`, `copy`, `raycast`, `bind`, `normalizeSkinWeights`, `updateMatrixWorld`, `applyBoneTransform` |
| DataTexture | `constructor` | — |
| Skeleton | `constructor`, `calculateInverses`, `pose`, `clone` | `init`, `update`, `computeBoneTexture`, `getBoneByName`, `dispose`, `fromJSON`, `toJSON` |
| InstancedBufferAttribute | `constructor`, `copy`, `toJSON` | — |
| InstancedMesh | `updateMorphTargets` | `constructor`, `computeBoundingBox`, `computeBoundingSphere`, `copy`, `getColorAt`, `getMatrixAt`, `getMorphAt`, `raycast`, `setColorAt`, `setMatrixAt`, `setMorphAt`, `dispose` |
| Plane | `constructor`, `set`, `setComponents`, `setFromNormalAndCoplanarPoint`, `setFromCoplanarPoints`, `copy`, `negate`, `distanceToPoint`, `distanceToSphere`, `projectPoint`, `intersectsLine`, `intersectsBox`, `intersectsSphere`, `coplanarPoint`, `applyMatrix4`, `translate`, `equals`, `clone` | `normalize`, `intersectLine` |
| Frustum | `constructor`, `set`, `clone` | `copy`, `setFromProjectionMatrix`, `intersectsObject`, `intersectsSprite`, `intersectsSphere`, `intersectsBox`, `containsPoint` |
| FrustumArray | `constructor`, `clone` | `setFromArrayCamera`, `intersectsObject`, `intersectsSprite`, `intersectsSphere`, `intersectsBox`, `containsPoint`, `copy` |
| MultiDrawRenderList | `constructor`, `push`, `reset` | — |
| BatchedMesh | `get:maxInstanceCount`, `get:instanceCount`, `get:unusedVertexCount`, `get:unusedIndexCount`, `_initIndirectTexture`, `_initColorsTexture`, `setCustomSort`, `deleteInstance`, `getVisibleAt`, `setGeometryIdAt`, `getGeometryIdAt`, `getGeometryRangeAt`, `onBeforeShadow` | `constructor`, `_initMatricesTexture`, `_initializeGeometry`, `_validateGeometry`, `validateInstanceId`, `validateGeometryId`, `computeBoundingBox`, `computeBoundingSphere`, `addInstance`, `addGeometry`, `setGeometryAt`, `deleteGeometry`, `optimize`, `getBoundingBoxAt`, `getBoundingSphereAt`, `setMatrixAt`, `getMatrixAt`, `setColorAt`, `getColorAt`, `setVisibleAt`, `setInstanceCount`, `setGeometrySize`, `raycast`, `copy`, `dispose`, `onBeforeRender` |
| LineBasicMaterial | `copy` | `constructor` |
| Line | `copy` | `constructor`, `computeLineDistances`, `raycast`, `updateMorphTargets` |
| PointsMaterial | `copy` | `constructor` |
| Points | `copy` | `constructor`, `raycast`, `updateMorphTargets` |
| VideoTexture | `clone` | `constructor`, `update`, `dispose` |
| VideoFrameTexture | `constructor`, `update`, `clone`, `setFrame` | — |
| FramebufferTexture | `constructor` | — |
| CompressedTexture | `constructor` | — |
| CompressedArrayTexture | `constructor`, `addLayerUpdate`, `clearLayerUpdates` | — |
| CubeTexture | `constructor`, `get:images`, `set:images` | — |
| CanvasTexture | `constructor` | — |
| DepthTexture | `copy` | `constructor`, `toJSON` |
| CubeDepthTexture | `constructor`, `get:images`, `set:images` | — |
| ExternalTexture | `constructor`, `copy` | — |
| BoxGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| CapsuleGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| CircleGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| CylinderGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| ConeGeometry | `static:method:fromJSON` | `constructor` |
| PolyhedronGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| DodecahedronGeometry | `static:method:fromJSON` | `constructor` |
| EdgesGeometry | `copy` | `constructor` |
| Curve | `getPointAt`, `getLength`, `getLengths`, `updateArcLengths`, `getTangentAt`, `clone`, `copy`, `fromJSON` | `constructor`, `getPoint`, `getPoints`, `getSpacedPoints`, `getUtoTmapping`, `getTangent`, `computeFrenetFrames`, `toJSON` |
| EllipseCurve | `copy`, `toJSON`, `fromJSON` | `constructor`, `getPoint` |
| CatmullRomCurve3 | `copy`, `toJSON`, `fromJSON` | `constructor`, `getPoint` |
| CubicBezierCurve | `getPoint`, `copy`, `toJSON`, `fromJSON` | `constructor` |
| CubicBezierCurve3 | `getPoint`, `copy`, `toJSON`, `fromJSON` | `constructor` |
| LineCurve | `getPointAt`, `getTangent`, `getTangentAt`, `copy`, `toJSON`, `fromJSON` | `constructor`, `getPoint` |
| LineCurve3 | `getPointAt`, `getTangent`, `getTangentAt`, `copy`, `toJSON`, `fromJSON` | `constructor`, `getPoint` |
| QuadraticBezierCurve | `getPoint`, `copy`, `toJSON`, `fromJSON` | `constructor` |
| QuadraticBezierCurve3 | `getPoint`, `copy`, `toJSON`, `fromJSON` | `constructor` |
| SplineCurve | `copy`, `toJSON`, `fromJSON` | `constructor`, `getPoint` |
| CurvePath | `add`, `getLength`, `updateArcLengths`, `getCurveLengths`, `copy`, `toJSON`, `fromJSON` | `constructor`, `closePath`, `getPoint`, `getSpacedPoints`, `getPoints` |
| Path | `moveTo`, `lineTo`, `quadraticCurveTo`, `bezierCurveTo`, `splineThru`, `arc`, `absarc`, `ellipse`, `absellipse`, `copy`, `toJSON`, `fromJSON` | `constructor`, `setFromPoints` |
| Shape | `extractPoints`, `copy`, `toJSON`, `fromJSON` | `constructor`, `getPointsHoles` |
| Earcut | `static:method:triangulate` | — |
| ShapeUtils | `static:method:isClockWise` | `static:method:area`, `static:method:triangulateShape` |
| ExtrudeGeometry | `copy` | `constructor`, `toJSON`, `static:method:fromJSON` |
| IcosahedronGeometry | `static:method:fromJSON` | `constructor` |
| LatheGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| OctahedronGeometry | `static:method:fromJSON` | `constructor` |
| PlaneGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| RingGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| ShapeGeometry | `copy`, `static:method:fromJSON` | `constructor`, `toJSON` |
| SphereGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| TetrahedronGeometry | `static:method:fromJSON` | `constructor` |
| TorusGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| TorusKnotGeometry | `copy`, `static:method:fromJSON` | `constructor` |
| TubeGeometry | `copy`, `toJSON`, `static:method:fromJSON` | `constructor` |
| WireframeGeometry | `copy` | `constructor` |
| ShadowMaterial | `copy` | `constructor` |
| MeshPhysicalMaterial | `get:anisotropy`, `get:clearcoat`, `get:iridescence`, `get:dispersion`, `get:sheen`, `get:transmission` | `constructor`, `set:anisotropy`, `set:clearcoat`, `set:iridescence`, `set:dispersion`, `set:sheen`, `set:transmission`, `copy` |
| MeshPhongMaterial | `copy` | `constructor` |
| MeshToonMaterial | `copy` | `constructor` |
| MeshNormalMaterial | `copy` | `constructor` |
| MeshLambertMaterial | `copy` | `constructor` |
| MeshDepthMaterial | `copy` | `constructor` |
| MeshDistanceMaterial | `copy` | `constructor` |
| LineDashedMaterial | `copy` | `constructor` |
| AnimationUtils | `static:method:convertArray`, `static:method:isTypedArray`, `static:method:getKeyframeOrder`, `static:method:sortedArray`, `static:method:flattenJSON` | `static:method:subclip`, `static:method:makeClipAdditive` |
| Interpolant | `getSettings_`, `intervalChanged_` | `constructor`, `evaluate`, `copySampleValue_`, `interpolate_` |
| CubicInterpolant | `constructor` | `intervalChanged_`, `interpolate_` |
| LinearInterpolant | `constructor` | `interpolate_` |
| DiscreteInterpolant | `constructor`, `interpolate_` | — |
| KeyframeTrack | `InterpolantFactoryMethodDiscrete`, `InterpolantFactoryMethodLinear`, `InterpolantFactoryMethodSmooth`, `InterpolantFactoryMethodBezier`, `getInterpolation`, `getValueSize` | `constructor`, `static:method:toJSON`, `setInterpolation`, `shift`, `scale`, `trim`, `validate`, `optimize`, `clone` |
| BooleanKeyframeTrack | `constructor` | — |
| ColorKeyframeTrack | `constructor` | — |
| NumberKeyframeTrack | `constructor` | — |
| QuaternionLinearInterpolant | `constructor` | `interpolate_` |
| QuaternionKeyframeTrack | `constructor`, `InterpolantFactoryMethodLinear` | — |
| StringKeyframeTrack | `constructor` | — |
| VectorKeyframeTrack | `constructor` | — |
| AnimationClip | `toJSON` | `constructor`, `static:method:parse`, `static:method:toJSON`, `static:method:CreateFromMorphTargetSequence`, `static:method:findByName`, `static:method:CreateClipsFromMorphTargetSequences`, `resetDuration`, `trim`, `validate`, `optimize`, `clone` |
| LoadingManager | `get:abortController` | `constructor` |
| Loader | `load`, `loadAsync`, `parse`, `setCrossOrigin`, `setWithCredentials`, `setPath`, `setResourcePath`, `setRequestHeader`, `abort` | `constructor` |
| HttpError | `constructor` | — |
| FileLoader | `setResponseType`, `setMimeType`, `abort` | `constructor`, `load` |
| AnimationLoader | `constructor`, `load`, `parse` | — |
| CompressedTextureLoader | `constructor` | `load` |
| ImageLoader | `constructor` | `load` |
| CubeTextureLoader | `constructor` | `load` |
| DataTextureLoader | `constructor`, `createDataTexture` | `load`, `_applyTexData` |
| TextureLoader | `constructor` | `load` |
| Light | `copy`, `toJSON` | `constructor`, `dispose` |
| HemisphereLight | `copy`, `toJSON` | `constructor` |
| LightShadow | `constructor`, `getViewportCount`, `getFrustum`, `getViewport`, `getFrameExtents`, `dispose`, `copy`, `clone` | `updateMatrices`, `toJSON` |
| Camera | `get:reversedDepth`, `copy`, `getWorldDirection`, `clone` | `constructor`, `updateMatrixWorld`, `updateWorldMatrix` |
| PerspectiveCamera | `getFilmWidth`, `getFilmHeight`, `getViewSize` | `constructor`, `copy`, `setFocalLength`, `getFocalLength`, `getEffectiveFOV`, `getViewBounds`, `setViewOffset`, `clearViewOffset`, `updateProjectionMatrix`, `toJSON` |
| SpotLightShadow | `copy` | `constructor`, `updateMatrices` |
| SpotLight | `get:power`, `set:power`, `dispose`, `copy`, `toJSON` | `constructor` |
| PointLight | `set:power`, `dispose`, `copy`, `toJSON` | `constructor`, `get:power` |
| DirectionalLight | `dispose`, `copy`, `toJSON` | `constructor` |
| RectAreaLight | `get:power`, `set:power`, `copy`, `toJSON` | `constructor` |
| SphericalHarmonics3 | `copy`, `clone` | `constructor`, `set`, `zero`, `getAt`, `getIrradianceAt`, `add`, `addScaledSH`, `scale`, `lerp`, `equals`, `fromArray`, `toArray`, `static:method:getBasisAt` |
| LightProbe | `copy`, `toJSON` | `constructor` |
| MaterialLoader | `constructor`, `load`, `parse`, `setTextures`, `createMaterialFromType`, `static:method:registerMaterial` | `static:method:createMaterialFromType` |
| InstancedBufferGeometry | `copy`, `toJSON` | `constructor` |
| BufferGeometryLoader | `constructor`, `load` | `parse` |
| ObjectLoader | `constructor`, `parseAsync`, `static:method:registerGeometry` | `load`, `loadAsync`, `parse`, `parseShapes`, `parseSkeletons`, `parseGeometries`, `parseMaterials`, `parseAnimations`, `parseImages`, `parseImagesAsync`, `parseTextures`, `parseObject`, `bindSkeletons`, `bindLightTargets` |
| ImageBitmapLoader | `setOptions`, `abort` | `constructor`, `load` |
| AudioLoader | `constructor` | `load` |
| ArrayCamera | `constructor` | — |
| Timer | `constructor`, `getTimescale`, `setTimescale`, `reset`, `dispose` | `connect`, `disconnect`, `getDelta`, `getElapsed`, `update` |
| AudioListener | `getInput`, `getFilter`, `getMasterVolume`, `updateMatrixWorld` | `constructor`, `removeFilter`, `setFilter`, `setMasterVolume` |
| Audio | `getOutput`, `getFilters`, `getDetune`, `getFilter`, `setFilter`, `getPlaybackRate`, `onEnded`, `setLoopStart`, `setLoopEnd`, `getVolume`, `clone` | `constructor`, `setNodeSource`, `setMediaElementSource`, `setMediaStreamSource`, `setBuffer`, `play`, `pause`, `stop`, `connect`, `disconnect`, `setFilters`, `setDetune`, `setPlaybackRate`, `getLoop`, `setLoop`, `setVolume`, `copy` |
| PositionalAudio | `connect`, `disconnect`, `getOutput`, `getRefDistance`, `setRefDistance`, `getRolloffFactor`, `setRolloffFactor`, `getDistanceModel`, `setDistanceModel`, `getMaxDistance`, `setMaxDistance`, `setDirectionalCone` | `constructor`, `updateMatrixWorld` |
| AudioAnalyser | `constructor`, `getFrequencyData` | `getAverageFrequency` |
| PropertyMixer | `_setAdditiveIdentityQuaternion`, `_slerp`, `_slerpAdditive`, `_lerp`, `_lerpAdditive` | `constructor`, `accumulate`, `accumulateAdditive`, `apply`, `saveOriginalState`, `restoreOriginalState`, `_setAdditiveIdentityNumeric`, `_setAdditiveIdentityOther`, `_select` |
| PropertyBinding | `constructor`, `_getValue_unavailable`, `_setValue_unavailable`, `_getValue_direct`, `_getValue_arrayElement`, `_getValue_toArray`, `_setValue_direct`, `_setValue_direct_setNeedsUpdate`, `_setValue_direct_setMatrixWorldNeedsUpdate`, `_setValue_arrayElement`, `_setValue_arrayElement_setNeedsUpdate`, `_setValue_arrayElement_setMatrixWorldNeedsUpdate`, `_setValue_fromArray`, `_setValue_fromArray_setNeedsUpdate`, `_setValue_fromArray_setMatrixWorldNeedsUpdate`, `_getValue_unbound`, `_setValue_unbound`, `unbind` | `static:method:create`, `static:method:sanitizeNodeName`, `static:method:parseTrackName`, `static:method:findNode`, `_getValue_array`, `_setValue_array`, `_setValue_array_setNeedsUpdate`, `_setValue_array_setMatrixWorldNeedsUpdate`, `bind` |
| AnimationAction | `play`, `stop`, `reset`, `isScheduled`, `startAt`, `setLoop`, `setEffectiveWeight`, `getEffectiveWeight`, `fadeIn`, `fadeOut`, `crossFadeTo`, `setEffectiveTimeScale`, `getEffectiveTimeScale`, `setDuration`, `syncWith`, `halt`, `getMixer`, `getClip`, `getRoot` | `constructor`, `isRunning`, `crossFadeFrom`, `stopFading`, `warp`, `stopWarping`, `_update`, `_updateWeight`, `_updateTimeScale`, `_updateTime`, `_setEndings`, `_scheduleFading` |
| AnimationMixer | `_initMemoryManager`, `_lendAction`, `_takeBackAction`, `_lendBinding`, `_takeBackBinding`, `_takeBackControlInterpolant`, `getRoot` | `constructor`, `_bindAction`, `_activateAction`, `_deactivateAction`, `_isActiveAction`, `_addInactiveAction`, `_removeInactiveAction`, `_removeInactiveBindingsForAction`, `_addInactiveBinding`, `_removeInactiveBinding`, `_lendControlInterpolant`, `clipAction`, `existingAction`, `stopAllAction`, `update`, `setTime`, `uncacheClip`, `uncacheRoot`, `uncacheAction` |
| RenderTarget3D | `constructor` | — |
| Uniform | `constructor` | `clone` |
| UniformsGroup | `add`, `setName`, `setUsage`, `clone` | `constructor`, `remove`, `dispose`, `copy` |
| InstancedInterleavedBuffer | `constructor`, `copy`, `clone`, `toJSON` | — |
| GLBufferAttribute | `setBuffer`, `setType`, `setItemSize`, `setCount` | `constructor`, `set:needsUpdate` |
| Raycaster | `set`, `setFromXRController`, `intersectObject` | `constructor`, `setFromCamera`, `intersectObjects` |
| Clock | `start`, `stop`, `getElapsedTime` | `constructor`, `getDelta` |
| Spherical | `constructor`, `set`, `copy`, `setFromVector3`, `clone` | `makeSafe`, `setFromCartesianCoords` |
| Cylindrical | `constructor`, `set`, `copy`, `setFromVector3`, `setFromCartesianCoords`, `clone` | — |
| Matrix2 | `identity`, `set` | `constructor`, `fromArray` |
| Box2 | `set`, `clone`, `copy`, `isEmpty`, `getSize`, `expandByPoint`, `expandByVector`, `expandByScalar`, `containsPoint`, `containsBox`, `getParameter`, `intersectsBox`, `clampPoint`, `distanceToPoint`, `intersect`, `union`, `translate`, `equals` | `constructor`, `setFromPoints`, `setFromCenterAndSize`, `makeEmpty`, `getCenter` |
| Line3 | `constructor`, `set`, `copy`, `delta`, `distanceSq`, `distance`, `at`, `closestPointToPoint`, `applyMatrix4`, `equals`, `clone` | `getCenter`, `closestPointToPointParameter`, `distanceSqToLine3` |
| SpotLightHelper | `dispose` | `constructor`, `update` |
| SkeletonHelper | `dispose` | `constructor`, `updateMatrixWorld`, `setColors` |
| PointLightHelper | `dispose` | `constructor`, `update` |
| HemisphereLightHelper | `dispose` | `constructor`, `update` |
| GridHelper | `dispose` | `constructor` |
| PolarGridHelper | `dispose` | `constructor` |
| DirectionalLightHelper | `dispose` | `constructor`, `update` |
| CameraHelper | `dispose` | `constructor`, `setColors`, `update` |
| BoxHelper | `setFromObject`, `copy`, `dispose` | `constructor`, `update` |
| Box3Helper | `dispose` | `constructor`, `updateMatrixWorld` |
| PlaneHelper | `dispose` | `constructor`, `updateMatrixWorld` |
| ArrowHelper | `setColor`, `copy`, `dispose` | `constructor`, `setDirection`, `setLength` |
| AxesHelper | `setColors`, `dispose` | `constructor` |
| ShapePath | `moveTo`, `lineTo`, `quadraticCurveTo`, `bezierCurveTo`, `splineThru` | `constructor`, `toShapes` |
| Controls | `constructor`, `disconnect`, `dispose`, `update` | `connect` |
| TextureUtils | `static:method:getByteLength` | `static:method:contain`, `static:method:cover`, `static:method:fill` |
| EventDispatcher | — | `addEventListener`, `hasEventListener`, `removeEventListener`, `dispatchEvent` |
| ImageUtils | — | `static:method:getDataURL`, `static:method:sRGBToLinear` |
| Source | — | `constructor`, `getSize`, `set:needsUpdate`, `toJSON` |
| Group | — | `constructor` |
| Scene | — | `constructor`, `copy`, `toJSON` |
| Sprite | — | `constructor`, `raycast`, `copy` |
| Mesh | — | `constructor`, `copy`, `updateMorphTargets`, `getVertexPosition`, `raycast`, `_computeIntersections` |
| Bone | — | `constructor` |
| LineSegments | — | `constructor`, `computeLineDistances` |
| LineLoop | — | `constructor` |
| CompressedCubeTexture | — | `constructor` |
| HTMLTexture | — | `constructor`, `dispose` |
| ArcCurve | — | `constructor` |
| ShaderMaterial | — | `constructor`, `copy`, `toJSON`, `fromJSON` |
| RawShaderMaterial | — | `constructor` |
| MeshStandardMaterial | — | `constructor`, `copy` |
| MeshMatcapMaterial | — | `constructor`, `copy` |
| BezierInterpolant | — | `interpolate_` |
| PointLightShadow | — | `constructor` |
| OrthographicCamera | — | `constructor`, `copy`, `setViewOffset`, `clearViewOffset`, `updateProjectionMatrix`, `toJSON` |
| DirectionalLightShadow | — | `constructor` |
| AmbientLight | — | `constructor` |
| LoaderUtils | — | `static:method:extractUrlBase`, `static:method:resolveURL` |
| AudioContext | — | `static:method:getContext`, `static:method:setContext` |
| StereoCamera | — | `constructor`, `update` |
| CubeCamera | — | `constructor`, `updateCoordinateSystem`, `update` |
| AnimationObjectGroup | — | `constructor`, `add`, `remove`, `uncache`, `subscribe_`, `unsubscribe_` |

## 未匹配原因与保留范围

- 630：body shape/constants/operators/property roles differ after normalization
- 1：reference patch methods differ

未匹配项不做 argument1/value1 等机械改名。86 个顶层函数中的未匹配辅助函数、类外闭包、1 个类表达式、6 个静态块及未独立确认的模块临时量也不宣称全部恢复。部分匹配方法的官方名称本来就是 x/y/z、a/b、t 等数学符号；这些是参考中一致的实际名称，不是可读性占位名。未匹配执行体和补丁差异保持原样。

## 检查

发布前使用专用 `tools/lib/three-alpha-contract.cjs` 完成原始→最终整文件 alpha/control-flow 等价证明。该线性工具只接受本库受限语法，拒绝 import、默认/星号/声明导出、JSX 和简写属性；公开 ExportSpecifier 的导出名称保持原样。原通用 helper 的整库慢验证尝试已终止，未完成，不能作为证明。日常 `node tools/semantic-three.node-check.cjs` 校验去除注释与格式后的最终 AST hash（保留实际命名），并直接导入本地真实 Three 模块运行 CPU 回归：Vector3 原地叉积、Quaternion 旋转、Matrix4 compose/decompose/inverse 与变换、Color 十六进制往返及线性混合、Box/SphereGeometry 顶点/索引/包围体、Ray/Sphere 求交、AnimationMixer 数字轨道插值及释放。相同 CPU 断言先在修改前本地 core 上通过。检查不依赖上游 tarball、忽略目录、浏览器或 WebGL。

整文件 hash 证明仅做绑定改名和注释后执行契约未变；它不能证明所有原库行为正确，也不能鉴定本地具体 patch。CPU 用例不覆盖 WebGL、材质着色器、浏览器事件、纹理网络下载或全部动画路径。新增官方文档只在两份参考注释一致的已匹配方法和类上采用，不把未验证行为写成 NASA 原作者确认。

为避免每次 npm test 对整库反复 scope.rename 数分钟，日常检查冻结最终源码的 semantic hash：`1b3be6fc1a647df0ae3c4e914a43222a272b832760d8cc9d4d6474cabdd662c8`。这与原始→最终的 alpha 证明是两种不同证据：前者防止后续执行体或实际名称漂移，后者证明本次改名未改原行为。需要重新执行专用线性 alpha 证明时，可运行 `node tools/semantic-three.node-check.cjs --verify-alpha`。

专用证明两侧覆盖均为 7139 个绑定、23140 个引用、31072 个选中标识符节点；1237 个局部赋值/自增写入表达式。声明、引用、写入目标遗漏均为0，444个公开导出名称逐项一致。原始 hash `973e08eac13b9c44eb412ef8f93e85459c1c6c1d984c20d3372f5b2960f26844` 与实际生成候选 hash `973e08eac13b9c44eb412ef8f93e85459c1c6c1d984c20d3372f5b2960f26844` 相同。专用工具针对本库语法子集验证；8个小型样例与通用 helper 对比，并检查捕获、属性、字面量、自由全局、公开导出改动和不支持语法拒绝。

绑定改名会改变 Function.name、Function.prototype.toString() 和堆栈等名称反射结果；整文件 alpha 证明保留的是执行运算、属性访问、控制流和公开导出契约，不承诺这些反射字符串不变。


标签名（LabeledStatement.label）不属于词法变量绑定，本次保留原有压缩标签 e/r；未匹配的631个方法及未验证辅助函数仍可能含压缩参数/局部名，不能据此声称 core 的所有短名称已经恢复。旧探针多计的3个节点正是标签声明，新工具明确排除，声明/引用/写入目标覆盖仍为零遗漏。
