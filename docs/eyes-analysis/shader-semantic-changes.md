# 自定义 shader：源码可读性与运行时契约

本轮逐一阅读 `eyes/src/engine/core/` 下九个自定义 shader，将转义成单行的 GLSL 展开为实际多行源码，并为投影、深度、透明度和轨迹索引约定补充说明。没有改动公式、uniform、attribute、材质配置或传给 WebGL 的字符串。

| 文件 | 已核对的约定 |
| --- | --- |
| BasicShader | 不透明基础颜色输出 |
| BasicAlphaShader | 基础颜色与 alpha 输出 |
| ConnectedSpriteShader | 连续精灵收尖、像素尺寸与透视分支 |
| LineShader | 既有视空间 y 深度投影约定 |
| PlumesShader | 羽流 UV 周期与时间偏移 |
| ShaderChunkLogDepth | 近处线性、远处对数深度以及反向深度配对 |
| SpriteParticlesShader | 粒子渐变和 alpha 输出；保留原有不 discard 的行为 |
| SpriteShader | 像素缩放除法顺序与透视处理 |
| TrailShader | 环形缓冲区索引、宽度与透明度衰减 |

`tools/semantic-shaders.node-check.cjs` 直接执行当前模块，比较九个运行时导出配置的冻结 SHA-256，包括 GLSL 字符串的每个字符。转换字符串字面量为模板字面量会改变 AST 表示，因此这里使用运行时字符串与配置证明，不能声称 AST 完全相同。字符串内原有的尾随空格也保留，以免伪造字节一致性。

这证明格式整理没有改变传入渲染器的程序文本；不等于已经穷尽每种 GPU、每个相机位置和每个材质组合的视觉验证。
