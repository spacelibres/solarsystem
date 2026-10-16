# Three core 第二轮交叉分析

比较官方 0.185.0/0.185.1 的本地已验证发布物；未确定 bundled patch。研究入口：`node tools/lib/three-core-match-next.cjs --baseline-ref=87c030f`；加 `--apply` 才写源文件，普通测试不读取 artifacts。完整 JSON 证据输出 artifacts/semantic-dynamo/three-core-next-report.json。

比较规范化新增：去除 literal raw 拼写；未遮蔽 undefined 与 void 0；常量侧等值比较（不移动可求值操作数）；typeof 字符串的松/严格相等；循环单语句括号；返回三元与 if-return；布尔三元与双否定。沿用原有语句逗号/短路展开、多声明拆分。所有规范化仅用于匹配证据，生产只改词法名称与注释。仅把无副作用的数值字面量移到乘法/交换性位运算右侧，绝不交换两个可求值操作数或加法操作数；折叠纯数值常量和已证实的 int32 冗余转换；单次引用 const 只内联到紧邻 return 或成员调用接收器，保留其求值位置；剩余绑定按原源位置对应；规范化空返回、逻辑布尔返回、同返回值提前退出和直接循环 continue，函数声明只在原块内按提升语义归前。不猜其余被内联消失的声明，不把首差异当作全部差异。

本轮：1629 方法中 1498 匹配，425 方法实际改名，131 保留；86 顶层辅助函数中 53 唯一匹配，52 实际改名。实际局部绑定改名 2335，模块函数改名 71；零修改匹配不计改名进度。原文件全量 alpha 0bb15f10215ea2328751e4185d5ac8e90451a8dc608adb0c0e2ae2ad1550c6eb，候选 0bb15f10215ea2328751e4185d5ac8e90451a8dc608adb0c0e2ae2ad1550c6eb，一致 true；导出 444。冻结最终语义 AST 94b4dbb6915544f8f81c00d786361e99033e3b9669ea92a08ebec76e2d5a3144。

外部模块引用按绑定的首次使用角色抽象，属于结构推断，不单凭角色推断给外部绑定改名。辅助函数要求两版分别唯一完整结构匹配及局部名一致；余下33项采用人工完整操作与调用身份核对，详见下表及独立语义文档；没有把最近前缀候选当作身份。函数反射 name / toString 随命名或打印变化，alpha 证明不声称反射字节一致。

## 未匹配方法：规范化 AST 的第一处实际差异

列出每项的字段路径、双方实际值；数组长度表示声明/语句/参数结构差异，type 表示控制流/表达式种类差异，operator 表示运算顺序或运算形式差异，name 表示未证实的外部标识；均保留原实现。patch 列非空表示两份参考自身不同。

| 方法 | 本地与 0.185.0 首差异 | 两参考首差异 |
| --- | --- | --- |
| Quaternion.static:method:slerpFlat | {"path":"root.program.body.0.body.body.0.body.body.8.consequent.body.3.consequent.body.length","local":7,"upstream":8} | null |
| Texture.method:setValues | {"path":"root.program.body.0.body.body.0.body.body.0.body.body.length","local":4,"upstream":5} | null |
| Texture.method:transformUv | {"path":"root.program.body.0.body.body.0.body.body.0.consequent.body.1.consequent.body.0.cases.2.consequent.length","local":1,"upstream":2} | null |
| Matrix4.method:makePerspective | {"path":"root.program.body.0.body.body.0.body.body.7.alternate.body.0.alternate.body.length","local":3,"upstream":1} | null |
| Matrix4.method:makeOrthographic | {"path":"root.program.body.0.body.body.0.body.body.7.alternate.body.0.alternate.body.length","local":3,"upstream":1} | null |
| Object3D.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":33,"upstream":35} | null |
| Color.method:setStyle | {"path":"root.program.body.0.body.body.0.body.body.0.body.body.0.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| Color.method:getHSL | {"path":"root.program.body.0.body.body.0.body.body.9.alternate.body.length","local":3,"upstream":4} | null |
| Box3.method:intersectsTriangle | {"path":"root.program.body.0.body.body.0.body.body.length","local":11,"upstream":16} | null |
| BufferGeometry.method:setIndex | {"path":"root.program.body.0.body.body.0.body.body.0.consequent.body.0.expression.right.callee.test.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| BufferGeometry.method:computeTangents | {"path":"root.program.body.0.body.body.0.body.body.0.body.body.11.test.type","local":"CallExpression","upstream":"UnaryExpression"} | null |
| BufferGeometry.method:toNonIndexed | {"path":"root.program.body.0.body.body.0.body.body.0.body.body.6.body.body.0.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| Material.method:setValues | {"path":"root.program.body.0.body.body.0.body.body.0.consequent.body.0.body.body.length","local":4,"upstream":5} | null |
| Sprite.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.18.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| LOD.method:addLevel | {"path":"root.program.body.0.body.body.0.body.body.3.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| LOD.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.length","local":1,"upstream":2} | null |
| LOD.method:update | {"path":"root.program.body.0.body.body.0.body.body.1.consequent.body.length","local":7,"upstream":9} | null |
| Ray.method:intersectsPlane | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":4} | null |
| Ray.method:intersectTriangle | {"path":"root.program.body.0.body.body.0.body.body.3.declarations.0.init","local":null,"upstream":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"ThisExpression"},"computed":false,"property":{"type":"Identifier","name":"direction"}},"computed":false,"property":{"type":"Identifier","name":"dot"}},"arguments":[{"type":"Identifier","name":"moduleReference2"}]}} | null |
| Mesh.method:updateMorphTargets | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} | null |
| Mesh.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.3.consequent.body.length","local":8,"upstream":9} | null |
| Mesh.method:_computeIntersections | {"path":"root.program.body.0.body.body.0.body.body.10.consequent.body.0.consequent.body.0.body.body.length","local":3,"upstream":5} | null |
| SkinnedMesh.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.2.consequent.body.length","local":4,"upstream":8} | null |
| InstancedMesh.method:getMorphAt | {"path":"root.program.body.0.body.body.0.body.body.length","local":4,"upstream":5} | null |
| InstancedMesh.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.4.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| Frustum.method:setFromProjectionMatrix | {"path":"root.program.body.0.body.body.0.body.body.22.alternate.body.1.alternate.body.length","local":2,"upstream":1} | null |
| Frustum.method:intersectsSphere | {"path":"root.program.body.0.body.body.0.body.body.3.body.body.length","local":1,"upstream":2} | null |
| BatchedMesh.method:addInstance | {"path":"root.program.body.0.body.body.0.body.body.length","local":11,"upstream":12} | null |
| BatchedMesh.method:addGeometry | {"path":"root.program.body.0.body.body.0.body.body.length","local":15,"upstream":16} | null |
| BatchedMesh.method:optimize | {"path":"root.program.body.0.body.body.0.body.body.3.declarations.0.init.arguments.0.body.type","local":"BinaryExpression","upstream":"BlockStatement"} | null |
| BatchedMesh.method:setInstanceCount | {"path":"root.program.body.0.body.body.0.body.body.length","local":21,"upstream":22} | null |
| BatchedMesh.method:setGeometrySize | {"path":"root.program.body.0.body.body.0.body.body.length","local":11,"upstream":12} | null |
| Line.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.length","local":17,"upstream":18} | null |
| Line.method:updateMorphTargets | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} | null |
| Points.method:raycast | {"path":"root.program.body.0.body.body.0.body.body.length","local":16,"upstream":17} | null |
| Points.method:updateMorphTargets | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} | null |
| VideoTexture.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":7} | null |
| VideoTexture.method:update | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":3} | null |
| DepthTexture.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":7} | null |
| CapsuleGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.19.body.body.4.alternate.body.0.consequent.body.1.expression.right.left.type","local":"BinaryExpression","upstream":"UnaryExpression"} | null |
| CylinderGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":21,"upstream":22} | null |
| PolyhedronGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":18,"upstream":23} | null |
| DodecahedronGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":5,"upstream":7} | null |
| EdgesGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.3.consequent.body.11.body.body.9.test.type","local":"LogicalExpression","upstream":"UnaryExpression"} | null |
| Curve.method:getUtoTmapping | {"path":"root.program.body.0.body.body.0.body.body.length","local":13,"upstream":16} | null |
| EllipseCurve.method:getPoint | {"path":"root.program.body.0.body.body.0.body.body.4.type","local":"ForStatement","upstream":"WhileStatement"} | null |
| CatmullRomCurve3.method:getPoint | {"path":"root.program.body.0.body.body.0.body.body.4.declarations.0.init","local":null,"upstream":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Math"},"computed":false,"property":{"type":"Identifier","name":"floor"}},"arguments":[{"type":"Identifier","name":"localBinding5"}]}} | null |
| CurvePath.method:getPoint | {"path":"root.program.body.0.body.body.0.body.body.3.type","local":"ForStatement","upstream":"WhileStatement"} | null |
| ExtrudeGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.0.body.body.length","local":53,"upstream":56} | null |
| ExtrudeGeometry.method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":4} | null |
| IcosahedronGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":4,"upstream":6} | null |
| OctahedronGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":5} | null |
| RingGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":18,"upstream":19} | null |
| ShapeGeometry.method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":3} | null |
| TetrahedronGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":5} | null |
| TubeGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":21,"upstream":24} | null |
| WireframeGeometry.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.3.consequent.body.4.consequent.body.4.body.body.length","local":3,"upstream":4} | null |
| ShaderMaterial.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.6.expression.right.type","local":"StringLiteral","upstream":"Identifier"} | null |
| ShaderMaterial.method:copy | {"path":"root.program.body.0.body.body.0.body.body.4.expression.right.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| ShaderMaterial.method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.3.body.body.length","local":2,"upstream":3} | null |
| ShaderMaterial.method:fromJSON | {"path":"root.program.body.0.body.body.0.body.body.1.consequent.body.0.body.body.length","local":2,"upstream":3} | null |
| MeshStandardMaterial.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.3.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshStandardMaterial.method:copy | {"path":"root.program.body.0.body.body.0.body.body.1.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshPhysicalMaterial.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.2.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshPhysicalMaterial.method:copy | {"path":"root.program.body.0.body.body.0.body.body.1.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshToonMaterial.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.2.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshMatcapMaterial.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.2.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| MeshMatcapMaterial.method:copy | {"path":"root.program.body.0.body.body.0.body.body.1.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| AnimationUtils.static:method:subclip | {"path":"root.program.body.0.body.body.0.body.body.0.argument.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| AnimationUtils.static:method:makeClipAdditive | {"path":"root.program.body.0.body.body.0.body.body.0.argument.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| Interpolant.method:evaluate | {"path":"root.program.body.0.body.body.0.body.body.4.body.body.0.body.body.1.body.body.0.body.consequent.body.0.body.body.0.consequent.body.0.consequent.body.0.label.name","local":"r","upstream":"forward_scan"} | null |
| BezierInterpolant.method:interpolate_ | {"path":"root.program.body.0.body.body.0.body.body.10.body.body.8.declarations.0.init","local":null,"upstream":{"type":"BinaryExpression","left":{"type":"BinaryExpression","left":{"type":"Identifier","name":"localBinding2"},"operator":"-","right":{"type":"Identifier","name":"localBinding1"}},"operator":"/","right":{"type":"BinaryExpression","left":{"type":"Identifier","name":"localBinding3"},"operator":"-","right":{"type":"Identifier","name":"localBinding1"}}}} | null |
| KeyframeTrack.static:method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.2.alternate.body.0.expression.right.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| KeyframeTrack.method:setInterpolation | {"path":"root.program.body.0.body.body.0.body.body.1.cases.3.consequent.length","local":1,"upstream":2} | null |
| KeyframeTrack.method:trim | {"path":"root.program.body.0.body.body.0.body.body.4.type","local":"ForStatement","upstream":"WhileStatement"} | null |
| KeyframeTrack.method:validate | {"path":"root.program.body.0.body.body.0.body.body.9.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| KeyframeTrack.method:optimize | {"path":"root.program.body.0.body.body.0.body.body.6.body.body.length","local":4,"upstream":5} | null |
| KeyframeTrack.method:clone | {"path":"root.program.body.0.body.body.0.body.body.length","local":5,"upstream":6} | null |
| AnimationClip.static:method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.2.declarations.0.init.properties.0.key.type","local":"Identifier","upstream":"StringLiteral"} | null |
| AnimationClip.static:method:CreateFromMorphTargetSequence | {"path":"root.program.body.0.body.body.0.body.body.2.body.body.7.test.type","local":"UnaryExpression","upstream":"LogicalExpression"} | null |
| AnimationClip.method:resetDuration | {"path":"root.program.body.0.body.body.0.body.body.length","local":4,"upstream":5} | null |
| LoadingManager.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.1.declarations.0.init","local":null,"upstream":{"type":"BooleanLiteral","value":false}} | null |
| FileLoader.method:load | {"path":"root.program.body.0.body.body.0.body.body.11.expression.callee.object.callee.object.callee.object.callee.object.arguments.0.body.body.0.consequent.body.8.declarations.0.init.arguments.0.properties.0.body.body.length","local":1,"upstream":2} | null |
| ImageLoader.method:load | {"path":"root.program.body.0.body.body.0.body.body.11.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| LightShadow.method:toJSON | {"path":"root.program.body.0.body.body.0.body.body.5.test.type","local":"UnaryExpression","upstream":"LogicalExpression"} | null |
| SpotLightShadow.method:updateMatrices | {"path":"root.program.body.0.body.body.0.body.body.4.test.type","local":"UnaryExpression","upstream":"LogicalExpression"} | null |
| MaterialLoader.static:method:createMaterialFromType | {"path":"root.program.body.0.body.body.0.body.body.length","local":4,"upstream":5} | null |
| LoaderUtils.static:method:resolveURL | {"path":"root.program.body.0.body.body.0.body.body.length","local":4,"upstream":6} | null |
| BufferGeometryLoader.method:parse | {"path":"root.program.body.0.body.body.0.body.body.length","local":18,"upstream":20} | null |
| ObjectLoader.method:loadAsync | {"path":"root.program.body.0.body.body.0.body.body.length","local":12,"upstream":13} | null |
| ObjectLoader.method:parseImages | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":7} | null |
| ObjectLoader.method:parseTextures | {"path":"root.program.body.0.body.body.0.body.body.2.consequent.body.0.body.body.6.alternate.body.0.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| ObjectLoader.method:bindLightTargets | {"path":"root.program.body.0.body.body.0.body.body.0.expression.arguments.0.body.body.0.consequent.body.2.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| StereoCamera.method:update | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":7} | null |
| CubeCamera.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.5.declarations.0.init.arguments.1.type","local":"NumericLiteral","upstream":"Identifier"} | null |
| CubeCamera.method:updateCoordinateSystem | {"path":"root.program.body.0.body.body.0.body.body.4.alternate.body.length","local":13,"upstream":1} | null |
| CubeCamera.method:update | {"path":"root.program.body.0.body.body.0.body.body.12.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| Audio.method:pause | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":3} | null |
| Audio.method:stop | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":5} | null |
| Audio.method:setPlaybackRate | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":4} | null |
| Audio.method:setLoop | {"path":"root.program.body.0.body.body.0.body.body.length","local":2,"upstream":4} | null |
| PropertyMixer.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":13,"upstream":15} | null |
| PropertyBinding.static:method:create | {"path":"root.program.body.0.body.body.0.body.body.0.test.type","local":"LogicalExpression","upstream":"UnaryExpression"} | null |
| PropertyBinding.method:bind | {"path":"root.program.body.0.body.body.0.body.body.11.consequent.body.length","local":2,"upstream":3} | null |
| AnimationObjectGroup.method:add | {"path":"root.program.body.0.body.body.0.body.body.6.declarations.0.init","local":null,"upstream":{"type":"Identifier","name":"undefined"}} | null |
| AnimationObjectGroup.method:uncache | {"path":"root.program.body.0.body.body.0.body.body.6.body.body.length","local":3,"upstream":4} | null |
| AnimationObjectGroup.method:unsubscribe_ | {"path":"root.program.body.0.body.body.0.body.body.2.consequent.body.length","local":12,"upstream":13} | null |
| AnimationAction.method:_update | {"path":"root.program.body.0.body.body.0.body.body.6.consequent.body.2.type","local":"IfStatement","upstream":"SwitchStatement"} | null |
| AnimationAction.method:_updateTimeScale | {"path":"root.program.body.0.body.body.0.body.body.1.consequent.body.2.consequent.body.length","local":2,"upstream":3} | null |
| AnimationAction.method:_updateTime | {"path":"root.program.body.0.body.body.0.body.body.5.consequent.body.0.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} | null |
| AnimationAction.method:_setEndings | {"path":"root.program.body.0.body.body.0.body.body.1.alternate.body.0.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| AnimationMixer.method:_removeInactiveAction | {"path":"root.program.body.0.body.body.0.body.body.length","local":20,"upstream":22} | null |
| AnimationMixer.method:clipAction | {"path":"root.program.body.0.body.body.0.body.body.6.consequent.body.0.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| AnimationMixer.method:existingAction | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":7} | null |
| AnimationMixer.method:stopAllAction | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} | null |
| AnimationMixer.method:uncacheRoot | {"path":"root.program.body.0.body.body.0.body.body.length","local":5,"upstream":6} | null |
| Line3.method:closestPointToPointParameter | {"path":"root.program.body.0.body.body.0.body.body.length","local":7,"upstream":8} | null |
| Line3.method:distanceSqToLine3 | {"path":"root.program.body.0.body.body.0.body.body.14.alternate.body.1.alternate.body.2.type","local":"ExpressionStatement","upstream":"IfStatement"} | null |
| SkeletonHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":17,"upstream":18} | null |
| PointLightHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":7,"upstream":9} | null |
| GridHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":13,"upstream":14} | null |
| PolarGridHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":11,"upstream":12} | null |
| CameraHelper.method:update | {"path":"root.program.body.0.body.body.0.body.body.length","local":28,"upstream":30} | null |
| Box3Helper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":8,"upstream":9} | null |
| PlaneHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":12,"upstream":14} | null |
| AxesHelper.constructor:constructor | {"path":"root.program.body.0.body.body.0.body.body.length","local":6,"upstream":8} | null |
| ShapePath.method:toShapes | {"path":"root.program.body.0.body.body.0.body.body.8.body.body.2.body.body.1.test.type","local":"LogicalExpression","upstream":"UnaryExpression"} | {"path":"root.program.body.0.body.body.0.body.body.8.body.body.2.body.body.1.test.argument.argument.callee.property.name","local":"containsPoint","upstream":"containsBox"} |
| Controls.method:connect | {"path":"root.program.body.0.body.body.0.body.body.length","local":1,"upstream":3} | null |
| TextureUtils.static:method:contain | {"path":"root.program.body.0.body.body.0.body.body.0.argument.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| TextureUtils.static:method:cover | {"path":"root.program.body.0.body.body.0.body.body.0.argument.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |
| TextureUtils.static:method:fill | {"path":"root.program.body.0.body.body.0.body.body.0.argument.callee.type","local":"FunctionExpression","upstream":"Identifier"} | null |

## 顶层辅助函数逐项覆盖

53项完整结构匹配与33项人工完整操作/公式/调用身份对应分级记录；人工对应不是整函数等价证明，具体逐段合同及本地新行链接见 [保留项语义](three-core-remaining-semantics.md)。身份表依据独立逐读修正，未采用最近前缀候选。

| 基线名称 | 证据级别 | 已确认角色、公式或调用证据 | 两份官方文件行 |
| --- | --- | --- | --- |
| tr | 完整结构匹配 | getTypedArray；局部绑定改名 2 项 | [0.185.0:1821](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1821) · [0.185.1:1821](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1821) |
| isTypedArray | 完整结构匹配 | isTypedArray；局部绑定改名 1 项 | [0.185.0:1833](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1833) · [0.185.1:1833](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1833) |
| createElementNS | 完整结构匹配 | createElementNS；局部绑定改名 1 项 | [0.185.0:1849](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1849) · [0.185.1:1849](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1849) |
| createCanvasElement | 完整结构匹配 | createCanvasElement；局部绑定改名 1 项 | [0.185.0:1864](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1864) · [0.185.1:1864](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1864) |
| setConsoleFunction | 完整结构匹配 | setConsoleFunction；局部绑定改名 1 项 | [0.185.0:1898](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1898) · [0.185.1:1898](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1898) |
| getConsoleFunction | 完整结构匹配 | getConsoleFunction；局部绑定改名 0 项 | [0.185.0:1909](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1909) · [0.185.1:1909](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1909) |
| log | 完整结构匹配 | log；局部绑定改名 2 项 | [0.185.0:1925](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1925) · [0.185.1:1925](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1925) |
| ur | 完整结构匹配 | enhanceLogMessage；局部绑定改名 3 项 | [0.185.0:1947](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1947) · [0.185.1:1947](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1947) |
| warn | 人工公式与调用对应 | warn；console.warn 分支及增强日志调用；仅模块函数名，内部局部名未冒认 | [0.185.0:1981](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1981) · [0.185.1:1981](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1981) |
| error | 人工公式与调用对应 | error；console.error 分支及增强日志调用；仅模块函数名，内部局部名未冒认 | [0.185.0:2019](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2019) · [0.185.1:2019](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2019) |
| warnOnce | 完整结构匹配 | warnOnce；局部绑定改名 2 项 | [0.185.0:2056](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2056) · [0.185.1:2056](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2056) |
| yieldToMain | 人工公式与调用对应 | yieldToMain；scheduler.yield 与延迟调度回退；仅模块函数名，内部局部名未冒认 | [0.185.0:2074](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2074) · [0.185.1:2074](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2074) |
| probeAsync | 人工公式与调用对应 | probeAsync；WebGL clientWaitSync 的轮询与 WAIT_FAILED/CONDITION_SATISFIED 分支；仅模块函数名，内部局部名未冒认 | [0.185.0:2104](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2104) · [0.185.1:2104](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2104) |
| yr | 完整结构匹配 | generateUUID；局部绑定改名 4 项 | [0.185.0:2295](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2295) · [0.185.1:2295](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2295) |
| Lr | 完整结构匹配 | clamp；局部绑定改名 3 项 | [0.185.0:2321](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2321) · [0.185.1:2321](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2321) |
| vr | 完整结构匹配 | euclideanModulo；局部绑定改名 2 项 | [0.185.0:2335](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2335) · [0.185.1:2335](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2335) |
| Tr | 完整结构匹配 | lerp；局部绑定改名 3 项 | [0.185.0:2394](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2394) · [0.185.1:2394](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2394) |
| Sr | 完整结构匹配 | denormalize；局部绑定改名 2 项 | [0.185.0:2666](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2666) · [0.185.1:2666](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2666) |
| wr | 完整结构匹配 | normalize；局部绑定改名 2 项 | [0.185.0:2713](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2713) · [0.185.1:2713](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2713) |
| Dr | 人工公式与调用对应 | createColorManagement；workingColorSpace/spaces/convert/getTransfer 色彩管理对象工厂；仅模块函数名，内部局部名未冒认 | [0.185.0:6680](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:6680) · [0.185.1:6680](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:6680) |
| Ir | 完整结构匹配 | SRGBToLinear；局部绑定改名 1 项 | [0.185.0:6868](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:6868) · [0.185.1:6868](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:6868) |
| Rr | 完整结构匹配 | LinearToSRGB；局部绑定改名 1 项 | [0.185.0:6874](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:6874) · [0.185.1:6874](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:6874) |
| Yr | 完整结构匹配 | serializeImage；局部绑定改名 1 项 | [0.185.0:7204](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:7204) · [0.185.1:7204](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:7204) |
| Mi | 完整结构匹配 | hue2rgb；局部绑定改名 3 项 | [0.185.0:13913](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:13913) · [0.185.1:13913](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:13913) |
| Gi | 完整结构匹配 | satForAxes；局部绑定改名 11 项 | [0.185.0:16501](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16501) · [0.185.1:16501](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16501) |
| ji | 人工公式与调用对应 | _generateTables；512/2048/64项半精度指数尾数位表的构造和返回；仅模块函数名，内部局部名未冒认 | [0.185.0:16531](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16531) · [0.185.1:16531](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16531) |
| Vi | 完整结构匹配 | toHalfFloat；局部绑定改名 3 项 | [0.185.0:16673](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16673) · [0.185.1:16673](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16673) |
| Qi | 完整结构匹配 | fromHalfFloat；局部绑定改名 2 项 | [0.185.0:16693](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16693) · [0.185.1:16693](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16693) |
| Ta | 完整结构匹配 | transformVertex；局部绑定改名 6 项 | [0.185.0:22032](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22032) · [0.185.1:22032](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22032) |
| Ga | 人工公式与调用对应 | checkGeometryIntersection；取三顶点、射线三角形求交、uv/normal 插值及 face/barycoord 命中结果；仅模块函数名，内部局部名未冒认 | [0.185.0:23731](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23731) · [0.185.1:23731](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23731) |
| _s | 完整结构匹配 | ascIdSort；局部绑定改名 2 项 | [0.185.0:25970](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:25970) · [0.185.1:25970](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:25970) |
| As | 完整结构匹配 | sortOpaque；局部绑定改名 2 项 | [0.185.0:25976](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:25976) · [0.185.1:25976](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:25976) |
| gs | 完整结构匹配 | sortTransparent；局部绑定改名 2 项 | [0.185.0:25982](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:25982) · [0.185.1:25982](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:25982) |
| Bs | 完整结构匹配 | copyAttributeData；局部绑定改名 7 项 | [0.185.0:26049](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:26049) · [0.185.1:26049](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:26049) |
| Ds | 完整结构匹配 | copyArrayContents；局部绑定改名 5 项 | [0.185.0:26079](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:26079) · [0.185.1:26079](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:26079) |
| Fs | 人工公式与调用对应 | checkIntersection；线段端点与 distanceSqToSegment、near/far 和 index 命中结果；仅模块函数名，内部局部名未冒认 | [0.185.0:28052](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28052) · [0.185.1:28052](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28052) |
| Vs | 完整结构匹配 | testPoint；局部绑定改名 10 项 | [0.185.0:28516](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28516) · [0.185.1:28516](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28516) |
| Zs | 人工公式与调用对应 | CubicPoly；initCatmullRom/initNonuniformCatmullRom/calc 四系数多项式工厂；仅模块函数名，内部局部名未冒认 | [0.185.0:31808](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:31808) · [0.185.1:31808](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:31808) |
| ao | 人工公式与调用对应 | CatmullRom；四控制点 Catmull-Rom 的二次三次项公式及曲线调用；仅模块函数名，内部局部名未冒认 | [0.185.0:32149](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32149) · [0.185.1:32149](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32149) |
| so | 人工公式与调用对应 | QuadraticBezier；(1-t)^2 p0 + 2(1-t)t p1 + t^2 p2 公式及曲线调用；仅模块函数名，内部局部名未冒认 | [0.185.0:32189](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32189) · [0.185.1:32189](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32189) |
| oo | 人工公式与调用对应 | CubicBezier；三次 Bernstein 四权重公式及曲线调用；仅模块函数名，内部局部名未冒认 | [0.185.0:32234](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32234) · [0.185.1:32234](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32234) |
| lo | 人工公式与调用对应 | earcut；维度参数、孔环消除、三角索引输出的 Earcut 入口；仅模块函数名，内部局部名未冒认 | [0.185.0:33922](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33922) · [0.185.1:33922](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33922) |
| uo | 人工公式与调用对应 | linkedList；按面积方向构建环状顶点链并去重复端点；仅模块函数名，内部局部名未冒认 | [0.185.0:33962](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33962) · [0.185.1:33962](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33962) |
| ho | 人工公式与调用对应 | filterPoints；删除相等或共线的非 Steiner 顶点；仅模块函数名，内部局部名未冒认 | [0.185.0:33980](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33980) · [0.185.1:33980](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33980) |
| po | 人工公式与调用对应 | earcutLinked；顺环剪耳、空间索引及多遍恢复调度；仅模块函数名，内部局部名未冒认 | [0.185.0:34004](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34004) · [0.185.1:34004](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34004) |
| fo | 人工公式与调用对应 | isEar；凸性和其他顶点在候选耳内检测；仅模块函数名，内部局部名未冒认 | [0.185.0:34053](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34053) · [0.185.1:34053](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34053) |
| mo | 人工公式与调用对应 | isEarHashed；耳包围盒 z 序范围筛选和点内检测；仅模块函数名，内部局部名未冒认 | [0.185.0:34080](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34080) · [0.185.1:34080](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34080) |
| Mo | 完整结构匹配 | cureLocalIntersections；局部绑定改名 5 项 | [0.185.0:34131](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34131) · [0.185.1:34131](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34131) |
| _o | 人工公式与调用对应 | splitEarcut；搜索有效对角线、拆环并递归剪耳；仅模块函数名，内部局部名未冒认 | [0.185.0:34154](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34154) · [0.185.1:34154](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34154) |
| Ao | 人工公式与调用对应 | compareXYSlope；孔队列的 x、y、出边斜率三级排序比较；仅模块函数名，内部局部名未冒认 | [0.185.0:34201](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34201) · [0.185.1:34201](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34201) |
| go | 人工公式与调用对应 | eliminateHole；桥接孔和外环并过滤桥边；findHoleBridge 已内联；仅模块函数名，内部局部名未冒认 | [0.185.0:34217](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34217) · [0.185.1:34217](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34217) |
| bo | 完整结构匹配 | sectorContainsSector；局部绑定改名 2 项 | [0.185.0:34288](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34288) · [0.185.1:34288](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34288) |
| yo | 人工公式与调用对应 | zOrder；0x55555555/0x33333333/0x0f0f0f0f 位交织 Morton 编码；仅模块函数名，内部局部名未冒认 | [0.185.0:34363](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34363) · [0.185.1:34363](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34363) |
| Lo | 完整结构匹配 | getLeftmost；局部绑定改名 3 项 | [0.185.0:34382](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34382) · [0.185.1:34382](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34382) |
| vo | 完整结构匹配 | pointInTriangle；局部绑定改名 8 项 | [0.185.0:34394](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34394) · [0.185.1:34394](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34394) |
| To | 完整结构匹配 | pointInTriangleExceptFirst；局部绑定改名 8 项 | [0.185.0:34401](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34401) · [0.185.1:34401](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34401) |
| So | 人工公式与调用对应 | isValidDiagonal；相邻索引排除、边交叉、局部可见与中点内测试（后两辅助被内联）；仅模块函数名，内部局部名未冒认 | [0.185.0:34406](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34406) · [0.185.1:34406](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34406) |
| wo | 完整结构匹配 | area；局部绑定改名 3 项 | [0.185.0:34414](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34414) · [0.185.1:34414](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34414) |
| Eo | 完整结构匹配 | equals；局部绑定改名 2 项 | [0.185.0:34419](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34419) · [0.185.1:34419](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34419) |
| xo | 人工公式与调用对应 | intersects；四个有向面积符号和共线 onSegment 分支；仅模块函数名，内部局部名未冒认 | [0.185.0:34424](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34424) · [0.185.1:34424](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34424) |
| Co | 完整结构匹配 | onSegment；局部绑定改名 3 项 | [0.185.0:34441](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34441) · [0.185.1:34441](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34441) |
| zo | 完整结构匹配 | sign；局部绑定改名 1 项 | [0.185.0:34445](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34445) · [0.185.1:34445](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34445) |
| Oo | 完整结构匹配 | locallyInside；局部绑定改名 2 项 | [0.185.0:34462](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34462) · [0.185.1:34462](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34462) |
| Bo | 完整结构匹配 | splitPolygon；局部绑定改名 6 项 | [0.185.0:34486](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34486) · [0.185.1:34486](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34486) |
| Do | 人工公式与调用对应 | insertNode；createNode 后接入双向环，空环自连；仅模块函数名，内部局部名未冒认 | [0.185.0:34508](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34508) · [0.185.1:34508](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34508) |
| No | 完整结构匹配 | removeNode；局部绑定改名 1 项 | [0.185.0:34524](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34524) · [0.185.1:34524](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34524) |
| Io | 完整结构匹配 | createNode；局部绑定改名 3 项 | [0.185.0:34532](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34532) · [0.185.1:34532](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34532) |
| Ro | 完整结构匹配 | removeDupEndPts；局部绑定改名 2 项 | [0.185.0:34667](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34667) · [0.185.1:34667](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34667) |
| ko | 完整结构匹配 | addContour；局部绑定改名 3 项 | [0.185.0:34679](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34679) · [0.185.1:34679](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34679) |
| Yo | 人工公式与调用对应 | isUniqueEdge；将三维端点序列化为正反向字符串键，查询并写入 Set 以排除重复边；仅模块函数名，内部局部名未冒认 | [0.185.0:37442](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37442) · [0.185.1:37442](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37442) |
| cloneUniforms | 完整结构匹配 | cloneUniforms；局部绑定改名 8 项 | [0.185.0:37587](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37587) · [0.185.1:37587](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37587) |
| mergeUniforms | 完整结构匹配 | mergeUniforms；局部绑定改名 5 项 | [0.185.0:37654](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37654) · [0.185.1:37654](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37654) |
| Ho | 完整结构匹配 | isThreeObject；局部绑定改名 1 项 | [0.185.0:37674](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37674) · [0.185.1:37674](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37674) |
| getUnlitUniformColorSpace | 完整结构匹配 | getUnlitUniformColorSpace；局部绑定改名 2 项 | [0.185.0:37697](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37697) · [0.185.1:37697](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37697) |
| Xo | 人工公式与调用对应 | convertArray；构造器一致保留原数组，TypedArray BYTES_PER_ELEMENT 与普通数组转换；仅模块函数名，内部局部名未冒认 | [0.185.0:41314](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41314) · [0.185.1:41314](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41314) |
| jo | 人工公式与调用对应 | getKeyframeOrder；按 times 排序的原始索引数组；仅模块函数名，内部局部名未冒认 | [0.185.0:41334](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41334) · [0.185.1:41334](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41334) |
| Vo | 完整结构匹配 | sortedArray；局部绑定改名 9 项 | [0.185.0:41360](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41360) · [0.185.1:41360](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41360) |
| Qo | 人工公式与调用对应 | flattenJSON；提取 time 与 valuePropertyName，处理数组/toArray/标量；仅模块函数名，内部局部名未冒认 | [0.185.0:41389](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41389) · [0.185.1:41389](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41389) |
| Ko | 人工公式与调用对应 | parseKeyframeTrack；由 JSON type/name/times/values/interpolation 构造对应关键帧轨道；类型分派已内联；仅模块函数名，内部局部名未冒认 | [0.185.0:43791](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43791) · [0.185.1:43791](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43791) |
| $o | 人工公式与调用对应 | isBlobURL；blob: URL 前缀识别及 Cache 调用；仅模块函数名，内部局部名未冒认 | [0.185.0:43922](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43922) · [0.185.1:43922](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43922) |
| Lc | 完整结构匹配 | handleVisibilityChange；局部绑定改名 0 项 | [0.185.0:50746](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:50746) · [0.185.1:50746](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:50746) |
| Fc | 完整结构匹配 | ascSort；局部绑定改名 2 项 | [0.185.0:56182](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:56182) · [0.185.1:56182](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:56182) |
| qc | 人工公式与调用对应 | intersect；layers 检查、object.raycast 和 recursive 子对象遍历；仅模块函数名，内部局部名未冒认 | [0.185.0:56188](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:56188) · [0.185.1:56188](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:56188) |
| tl | 完整结构匹配 | getBoneList；局部绑定改名 3 项 | [0.185.0:57758](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:57758) · [0.185.1:57758](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:57758) |
| ul | 完整结构匹配 | setPoint；局部绑定改名 11 项 | [0.185.0:58655](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58655) · [0.185.1:58655](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58655) |
| getByteLength | 人工公式与调用对应 | getByteLength；纹理格式宽高块计数和字节数分派；仅模块函数名，内部局部名未冒认 | [0.185.0:59787](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59787) · [0.185.1:59788](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59788) |

## 验证与边界

本轮起点是 git 87c030f (v0.2.32)。跨越本轮已修改源文件重跑时使用上述 baseline-ref，才能复现本轮改名计数。参考来源为官方 npm [0.185.0](https://registry.npmjs.org/three/-/three-0.185.0.tgz)、[0.185.1](https://registry.npmjs.org/three/-/three-0.185.1.tgz)；工具锁定两份发布物 SHA-256（见同目录 three-semantic-changes.md），拒绝参考漂移。

首差异分类：{"length":80,"type":45,"init":5,"name":1}。这是每项第一处差异，并非列出该项所有变换。剩余项包含函数表达式被内联、被消去的多次使用临时量、改变了声明位置和顺序的分支、复杂早退/循环变换。例如 BufferGeometry.setIndex 内联了选择索引宽度的辅助函数；Object3D 构造器把官方具名回调内联为匿名回调；这类结构身份尚未得到完整证明，不给不确定局部绑定冒领原名。

最终作用域检查拒绝 m → frustum，因为该局部名会遮蔽现有模块 frustum 引用。先模拟所有目标名解析，再用临时命名空间两阶段改名，最后全文件 alpha 再检。旧 alpha 973e... 来自旧验证器把同名内层函数声明错误标成外层绑定；修正声明节点身份之后，旧原件、本轮前后文件均为上文 0bb15...。这是证明器修正，不是执行体变化。覆盖为 7139 绑定、23140 引用、31072 选中标识、1237 写入/更新，声明/引用/写入遗漏均为零；444 导出名集合逐项相等。

CPU 验证：node tools/semantic-three-core-next.node-check.cjs 冻结完整最终语义 AST；正反规范化测试锁定常量折叠、字面量侧乘法、邻接 const 返回和布尔短路，同时拒绝两可求值操作数互换、加法换序和越过副作用内联。实际 API 执行包括 MathUtils/typed-array、Layers 第31位、半精度转换、UUID 格式、矩阵列索引、派发中删除监听器、带孔轮廓面积、盒/三角形 SAT、uniform 克隆隔离、点云射线 near/far。测试不读取 artifacts、不联网、不构造 WebGL。

## 根级函数表达式

类范围：218声明 + 1具名表达式 Composite，共1629方法。另22根函数表达式：{"total":22,"matched":17,"changed":16}。

| 属性角色 | 结果 |
| --- | --- |
| expression:MathUtils.mapLinear | 完整结构匹配; 5 local edits |
| expression:MathUtils.inverseLerp | 完整结构匹配; 3 local edits |
| expression:MathUtils.damp | 完整结构匹配; 4 local edits |
| expression:MathUtils.pingpong | 完整结构匹配; 2 local edits |
| expression:MathUtils.smoothstep | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} |
| expression:MathUtils.smootherstep | {"path":"root.program.body.0.body.body.0.body.body.length","local":3,"upstream":4} |
| expression:MathUtils.randInt | 完整结构匹配; 2 local edits |
| expression:MathUtils.randFloat | 完整结构匹配; 2 local edits |
| expression:MathUtils.randFloatSpread | 完整结构匹配; 1 local edits |
| expression:MathUtils.seededRandom | 完整结构匹配; 1 local edits |
| expression:MathUtils.degToRad | 完整结构匹配; 1 local edits |
| expression:MathUtils.radToDeg | 完整结构匹配; 1 local edits |
| expression:MathUtils.isPowerOfTwo | {"path":"root.program.body.0.body.body.0.body.body.0.argument.left.type","local":"UnaryExpression","upstream":"BinaryExpression"} |
| expression:MathUtils.ceilPowerOfTwo | 完整结构匹配; 1 local edits |
| expression:MathUtils.floorPowerOfTwo | 完整结构匹配; 1 local edits |
| expression:MathUtils.setQuaternionFromProperEuler | 完整结构匹配; 15 local edits |
| expression:Po.generateTopUV | 完整结构匹配; 11 local edits |
| expression:Po.generateSideWallUV | 完整结构匹配; 18 local edits |
| expression:Cache.add | {"path":"root.program.body.0.body.body.0.body.body.0.consequent.body.length","local":1,"upstream":2} |
| expression:Cache.get | {"path":"root.program.body.0.body.body.0.body.body.0.test.type","local":"LogicalExpression","upstream":"BinaryExpression"} |
| expression:Cache.remove | 完整结构匹配; 1 local edits |
| expression:Cache.clear | 完整结构匹配; 0 local edits |

人工辅助函数身份 33项，其中模块名实际改动28项；这与53项完整结构匹配分开。详见 [逐项语义合同](three-core-remaining-semantics.md)。

## 尚未完整结构匹配的五项根表达式

以下五项的公开属性角色和操作已理解；为保持证据分级，原参数/局部名未按较弱证据批量恢复。它们不计入17项完整结构匹配。

| 属性 | 已核实操作 | 保留原因 |
| --- | --- | --- |
| MathUtils.smoothstep | 先按 min/max 截到0/1，再以归一化 t 计算 t²(3−2t)。 | 条件返回与参数赋值被合并，语句结构不同。 |
| MathUtils.smootherstep | 同样夹取区间，内部计算 t³(t(6t−15)+10)。 | 条件返回与参数赋值被合并，语句结构不同。 |
| MathUtils.isPowerOfTwo | 以32位位运算检测 value & (value−1) 为0，并排除0。 | 本地数值否定与官方显式等零仍保留为不同AST。 |
| Cache.add | 仅enabled开启且key不是blob URL时写入files。 | 合并了两级早退/短路分支。 |
| Cache.get | 同样排除disabled和blob key，返回缓存值，否则undefined。 | 合并了两级早退/短路分支。 |

131项保留类方法的具体中文机制/边界合同已经写入core源文件，164项独立语义文档已刷新本地行链接。插入仅为注释：最终执行AST仍为94b4dbb6915544f8f81c00d786361e99033e3b9669ea92a08ebec76e2d5a3144，整文件alpha仍为0bb15f10215ea2328751e4185d5ac8e90451a8dc608adb0c0e2ae2ad1550c6eb。

审查回归先红后绿：被参数遮蔽的undefined不能当常量换侧；含词法声明的else保留块作用域；裸return合并采用void0；guard-tail含词法声明时拒绝搬移；全局可访问器标识的自比较不改松/严形式；函数表达式包装保留async/generator标志。
