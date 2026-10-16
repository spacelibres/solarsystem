# eyes 引擎域源码审阅（中文）

> 这是 v0.2.31 的初始静态研究基线。后续实际重命名、控制流整理与运行验证见同目录 semantic-changes 清单；当前源码签名、行号和进度以 README.md 与 semantic-progress.json 为准。不能用本研究基线替代源码语义验收。


本报告覆盖 git 跟踪的 `eyes/src/engine` 全部 233 个文件、196 个类声明、2588 个方法声明。逐文件通过 JavaScript AST 读取正文并提取字段读写、调用、返回和副作用；关键生命周期与 Dynamo 算法另作人工语义审阅。标为「结构证据」的段落是实际代码行为摘要，不等于已恢复所有压缩变量的业务含义。没有执行 NASA 运行时、访问远程资产或验证所有边界场景；已知风险与运行时缺陷严格区分。源码行号是本次分析时的位置，后续插入注释可能使行号变化。

## 运行时链条与所有权

Engine 拥有渲染器、Downloader、ResourceManager、TextureLoader、MaterialManager、Scene 集合和 Viewport 集合。Scene 拥有 Entity；Entity 拥有 Controller/Component。Controller 改变位置、速度、姿态等仿真状态，Component 把状态转换成实际图形。相机也是实体的组件，而视口只是指定用哪个相机渲染哪一块 DOM/画布区域。Entity-62 是运行时实体；Entity-567 是声明式配置注册工厂，两者不应因同名而混为一类。

每帧：真实时间差 → 推进仿真时间 → 保存上一帧 EntityState → 按时间表更新父级与覆盖 → 依赖拓扑排序更新控制器 → 更新视口/相机投影缓存 → 更新组件资源/视觉 → 清屏并逐视口渲染 → 回调 → 复位输入。依赖图 DFS 临时标记检测环；同实体控制器按集合顺序，跨实体通过 modified/dependent state 和父级关系排序。

渲染组件以 0.5px 加载、0.25px 卸载形成迟滞。资源 acquire 不是对象创建的同义词：相同 type+URL 共享 Promise 和引用计数。最后一个使用者 release 后，已加载资源延迟 15 秒销毁，未完成资源立即取消。Dynamo 的 15 秒块回收是另一套独立机制。组件卸载必须处理 Three.js 对象、材质、纹理引用以及配置/引用回调；不能单靠移除场景节点代替释放。

## Dynamo：二进制协议与计算

`def.dyn` 首先读取小端 Int16 版本和零终止类型串；仅允许 v1/v2 和 pos/lin/ori/quat/orb。v2 额外含块名数字宽度，orb 类型头含两项引力参数。PointSet 是递归时间索引/叶样本树，v2 最后起点是区间哨兵而非真实子块。按 hintIndex 及前后邻居快速定位，退化后二分。网络尚未返回时 __update 使用上一对样本继续计算。

| 类型 | Float64 字段顺序 | 每点字节 | 算法/实体影响 |
|---|---|---:|---|
| pos | time, position.xyz, velocity.xyz | 56 | 三次 Hermite；同时输出位置及导数速度 |
| lin | time, position.xyz | 32 | 夹紧比例线性位置，差分速度 |
| ori | time, quaternion(4), angularVelocity.xyz | 64 | 两端角速度外推，再四元数 slerp；旋转角速度 |
| quat | time, quaternion(4) | 40 | 夹紧比例 slerp，应用时角速度零 |
| orb | time, a, e, meanAngularMotion, meanAnomalyAtEpoch, orientation(4) | 72 | 分别传播两端元素到目标时刻，再混合位置/速度 |

以上步长由当前源码实际读操作计算；本次未重新解码真实 NASA 文件，所以不能据此宣称完成资产协议验证。timeOffset 在查询时扣除，在暴露 coverage 时加回；用户覆盖与原始区间先求交。orb 的 body=1/2 按两引力参数把相对轨道拆成质心两侧状态，incremental 控制累加而不是覆盖。

## 解码器、纹理与 LOD

TextureLoader 只做下载内容到 GPU 纹理的转换；共享缓存实际在 ResourceManager。KTX2Loader 是静态共享对象，并以首个创建时的 renderer 检测支持。ModelComponent 的 GLTF LoadingManager 重定向依赖 URL，将图像/KTX2/Draco 请求接入资源引用计数。模型标准材质转换为 Pioneer PBR 时移交贴图并清空旧材质贴图字段，避免旧材质销毁时连带释放已转移纹理。模型动画片段独立缓存为 clip map。TextureLOD 按最大屏幕半径选尺寸，下载完成后才释放旧纹理。

## 需单独复现的静态风险

1. ModelComponent 静态 DracoLoader 捕获首次模型的 owner/loadState/priority，后续模型可能给错误组件记账/报告错误。
2. 圆柱环境贴图分支检查 cylindrical URL，却加载 cubemap URL；updateMaterial 只改局部变量而未给 mesh.material 赋值。
3. TextureLOD 没有显式请求代际校验，较旧异步结果可能覆盖较新的 uniform。
4. ResourceManager 持有者移除只匹配 URL，没有同时匹配 type；缓存键也没有包含纹理加载选项。
5. PointSet 假设叶至少两点且时间单调；Reader 没有自定义边界校验，依赖 DataView RangeError。
6. Tile._split 捕获加载异常后仍在 finally 把状态设 Loaded；该状态不能直接解释为资源全部成功。

这些只是当前源码直接暴露的行为/风险，本次不改变运行逻辑，也不把未复现风险写成已确认运行故障。


## 补充人工语义审阅

- `Entity.getPositionRelativeToEntity`：参数为 output、localPosition、targetEntity、optionalTime。沿双方到最近共同祖先的父链分别累加并相减；此路径只平移，不自动旋转父姿态。指定时间则查询历史父级和控制器状态，断链写 NaN。
- `Entity.getVelocityRelativeToEntity`：沿源和目标到共同祖先的链加减速度，optionalTime 决定当前值或按时刻求值；不包含额外刚体旋转速度项。
- `Entity.getPositionAtTime`：启用时按顺序调用所有修改 position 且覆盖该时刻的控制器。若没有相关控制器才返回当前状态；有相关控制器但该时刻无覆盖则保留 NaN。
- `Entity.__destroy`：销毁组件/控制器集合并清理父子关系和相机缓存；Collection.remove 的生命周期入口应调用此方法，而不是只从 Three.js 移除网格。
- `OrbitalElements.project`：meanAnomaly=meanAnomalyAtEpoch+meanAngularMotion*(time-epoch)，椭圆分支将角度 wrap 到 [-π,π]，再调用 projectFromMeanAnomaly 输出位置/速度。
- `OrbitalElements.projectFromMeanAnomaly`：eccentricity<1 使用 sin/cos 椭圆参数，否则使用 sinh/cosh 双曲参数；先计算轨道平面位置/速度，设 z=0 后按 orientation 旋转到实体参考系。
- `OrbitalElements.getEccentricAnomalyFromMeanAnomaly`：分别解 E-e*sin(E)=M 或 e*sinh(H)-H=M。最多 20 次牛顿迭代，以更新量绝对值小于 0.00174532925 退出；未提供额外收敛失败标记。
- `OrbitalElements.setFromPositionAndVelocity`：用 r×v 得角动量，(v×h)/gm-r/|r| 得偏心率向量，推导半长轴、真近点角与姿态，再算历元平近点角和平均角运动；圆轨道/奇异输入应另做数值验证。
- `CameraComponent.__updateCameraVariablesForConnectedScene`：根据 viewport bounds 调整 composer 尺寸和 aspectRatio；以相机距父实体/地面的距离推导 near 与 mid，更新投影并递归刷新实体相机缓存；移除小于 1px、禁用或已删除遮挡体。
- `CameraComponent._updateProjectionMatrix`：按 fieldOfView 与宽高比手工构建投影矩阵和逆矩阵；这里采用自定义轴布局，不能直接套 Three.js 常规 -Z 相机假设。
- `CameraComponent.getRaycast`：强制准备目标实体，逐个可渲染组件更新世界矩阵并 intersectObjects；跳过重复三角面命中，把命中点转回目标实体局部姿态坐标。
- `CameraComponent.getRaycastColor`：在射线命中 UV 处逐个 shader texture uniform 画到临时 canvas 再采样像素；返回 textureName+color，并非最终光照后屏幕颜色。
- `CameraComponent.__destroy`：调用组件销毁，再让 Scene 清除对该相机的缓存依赖，若绑定 viewport 则解绑。
- `CMTSTile._getNearestDistance`：读取所有视口相机的局部位置与视场，对瓦片距离按 tan(FOV/2) 归一以便屏幕尺度细分判定。
- `CMTSTile._getFromData`：对高程/纹理数据网格做索引与插值采样；应遵循该文件像素边界和裙边布局，不能假定原始影像无边框。
- `CMTSComponent.getGroundPosition`：将输入 XYZ 转 LLA，在可见瓦片层级寻找高程，再由 spheroid.xyzFromLLA 转回地表位置；细分纹理状态会影响可用地形细节。
- `TrailComponent.__update`：推进轨迹采样与几何缓存，具体 timeStart/end、相对参考实体和每帧点数影响工作量；与 Dynamo 样本加载解耦。

## 数据模块的实际注册范围

- `eyes/src/engine/core/EntityEntry-699.js`：Entity.register 顶层键：moon。
- `eyes/src/engine/core/EntityEntry-700.js`：Entity.register 顶层键：adrastea, amalthea, callisto, europa, ganymede, io, metis, thebe。
- `eyes/src/engine/core/EntityEntry-702.js`：Entity.register 顶层键：phobos, deimos。
- `eyes/src/engine/core/EntityEntry-706.js`：Entity.register 顶层键：ariel, miranda, oberon, titania, umbriel。
- `eyes/src/engine/core/Unidentified694.js`：Entity.register 顶层键：j2000_ecliptic, l1, l2, l4, l5。
- `eyes/src/engine/core/Unidentified695.js`：Entity.register 顶层键：observable_universe, milky_way, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune。
- `eyes/src/engine/core/Unidentified696.js`：Entity.register 顶层键："1_ceres", "101955_bennu", "11351_leucus", "12923_zephyr", "134340_pluto", "134340_pluto_barycenter", "136108_haumea", "136199_eris", "136472_makemake", "14827_hypnos", "15094_polymele", "1566_icarus", "16_psyche", "1620_geographos", "162173_ryugu", "1862_apollo", "1981_midas", "1991_vg", "1993_hd", "1994_cc_a", "1996_xb27", "1998_ky26", "1998_ml14", "1998_qe2", "1999_ao10", "1999_cg9", "1999_vx25", "2_pallas", "2000_ae205", "2000_lg6", "2000_sg344", "2001_bb16", "2001_fr85", "2001_gp2", "2001_qj142", "2001_sn263_a", "2003_sm84", "2003_uv11", "2003_yn107", "2005_er95", "2005_lc", "2005_qp87", "2005_yu55", "2006_bz147", "2006_jy26", "2006_qq56", "2006_rh120", "2006_ub17", "2007_tf15", "2007_un12", "2007_vu6", "2008_bt2", "2008_cx118", "2008_ea9", "2008_el", "2008_hu4", "2008_jl24", "2008_kt", "2008_tc3", "2008_ts10", "2008_ua202", "2009_bd", "2009_os5", "2009_rt1", "2009_yf", "2010_an61", "2010_dj", "2010_jw34", "2010_tg19", "2010_tn167", "2010_ub", "2063_bacchus", "21_lutetia", "2101_adonis", "2102_tantalus", "2135_aristaeus", "216_kleopatra", "21900_orus", "225088_gonggong", "225088_gonggong_i_xiangliu", "2340_hathor", "243_ida", "25143_itokawa", "253_mathilde", "2867_steins", "3_juno", "3122_florence", "3200_phaethon", "3362_khufu", "3548_eurybates", "367943_duende", "37655_illapa", "4_vesta", "4015_wilson-harrington", "4179_toutatis", "4183_cuno", "433_eros", "4450_pan", "4486_mithra", "4769_castalia", "486958_arrokoth", "5011_ptah", "52246_donaldjohanson", "5535_annefrank", "617_patroclus", "617_patroclus_barycenter", "6239_minos", "6489_golevka", "65803_didymos", "66391_moshup", "69230_hermes", "90377_sedna", "951_gaspra", "9969_braille", "99942_apophis", "152830_dinkinesh", charon, dactyl, dimorphos, dysnomia, hiiaka, hydra, kerberos, menoetius, namaka, nix, styx。
- `eyes/src/engine/core/Unidentified697.js`：Entity.register 顶层键："1i_oumuamua", "1p_halley", "103p_hartley_2", "9p_tempel_1", "81p_wild_2", "67p_churyumov_gerasimenko", "19p_borrelly", c_1995_o1, c_2010_x1, c_2012_s1, c_2013_a1, c_2019_y4, c_2020_f3, c_2025_n1。
- `eyes/src/engine/core/Unidentified701.js`：Entity.register 顶层键：aitne, ananke, aoede, arche, autonoe, callirrhoe, carme, carpo, chaldene, cyllene, dia, eirene, elara, erinome, ersa, euanthe, eukelade, eupheme, euporie, eurydome, harpalyke, hegemone, helike, hermippe, herse, himalia, iocaste, isonoe, jupiter_li, jupiter_lii, jupiter_liv, jupiter_lv, jupiter_lvi, jupiter_lix, jupiter_lxi, jupiter_lxiii, jupiter_lxiv, jupiter_lxvi, jupiter_lxvii, jupiter_lxviii, jupiter_lxix, jupiter_lxx, jupiter_lxxii, kale, kallichore, kalyke, kore, leda, lysithea, megaclite, mneme, orthosie, pandia, pasiphae, pasithee, philophrosyne, praxidike, s_2003_j_2, s_2003_j_4, s_2003_j_9, s_2003_j_10, s_2003_j_12, s_2003_j_16, s_2003_j_23, s_2003_j_24, s_2011_j_3, s_2011_j_4, s_2011_j_5, s_2016_j_3, s_2016_j_4, s_2017_j_10, s_2017_j_11, s_2018_j_2, s_2018_j_3, s_2018_j_4, s_2018_j_5, s_2021_j_1, s_2021_j_2, s_2021_j_3, s_2021_j_4, s_2021_j_5, s_2021_j_6, s_2022_j_1, s_2022_j_2, s_2022_j_3, s_2024_j_1, sinope, sponde, taygete, thelxinoe, themisto, thyone, valetudo。
- `eyes/src/engine/core/Unidentified703.js`：Entity.register 顶层键：despina, galatea, halimede, hippocamp, laomedeia, larissa, naiad, nereid, neso, proteus, psamathe, sao, s_2002_n_5, s_2021_n_1, thalassa, triton。
- `eyes/src/engine/core/Unidentified704.js`：Entity.register 顶层键：dione, enceladus, hyperion, iapetus, mimas, rhea, tethys, titan。
- `eyes/src/engine/core/Unidentified705.js`：Entity.register 顶层键：aegaeon, aegir, albiorix, alvaldi, angrboda, anthe, atlas, bebhionn, beli, bergelmir, bestla, calypso, daphnis, eggther, epimetheus, erriapus, farbauti, fenrir, fornjot, geirrod, gerd, greip, gridr, gunnlod, hati, helene, hyrrokkin, ijiraq, janus, jarnsaxa, kari, kiviuq, loge, methone, mundilfari, narvi, paaliaq, pallene, pan, pandora, phoebe, polydeuces, prometheus, s_2004_s_7, s_2004_s_12, s_2004_s_13, s_2004_s_17, s_2004_s_21, s_2004_s_24, s_2004_s_28, s_2004_s_31, s_2004_s_36, s_2004_s_37, s_2004_s_39, s_2006_s_1, s_2006_s_3, s_2007_s_2, s_2007_s_3, s_2009_s_1, s_2019_s_1, saturn_lviii, saturn_lx, saturn_lxiv, siarnaq, skathi, skoll, skrymir, surtur, suttungr, tarqeq, tarvos, telesto, thiazzi, thrymr, ymir, s_2004_s_40, s_2004_s_41, s_2004_s_42, s_2004_s_43, s_2004_s_44, s_2004_s_45, s_2004_s_46, s_2004_s_47, s_2004_s_48, s_2004_s_49, s_2004_s_50, s_2004_s_51, s_2004_s_52, s_2004_s_53, s_2004_s_54, s_2004_s_55, s_2004_s_56, s_2004_s_57, s_2004_s_58, s_2004_s_59, s_2004_s_60, s_2004_s_61, s_2005_s_4, s_2005_s_5, s_2005_s_6, s_2005_s_7, s_2006_s_10, s_2006_s_11, s_2006_s_12, s_2006_s_13, s_2006_s_14, s_2006_s_15, s_2006_s_16, s_2006_s_17, s_2006_s_18, s_2006_s_19, s_2006_s_20, s_2006_s_21, s_2006_s_22, s_2006_s_23, s_2006_s_24, s_2006_s_25, s_2006_s_26, s_2006_s_27, s_2006_s_28, s_2006_s_29, s_2006_s_9, s_2007_s_5, s_2007_s_6, s_2007_s_7, s_2007_s_8, s_2007_s_9, s_2007_s_10, s_2007_s_11, s_2019_s_10, s_2019_s_11, s_2019_s_12, s_2019_s_13, s_2019_s_14, s_2019_s_15, s_2019_s_16, s_2019_s_17, s_2019_s_18, s_2019_s_19, s_2019_s_2, s_2019_s_20, s_2019_s_21, s_2019_s_22, s_2019_s_23, s_2019_s_24, s_2019_s_25, s_2019_s_26, s_2019_s_27, s_2019_s_28, s_2019_s_29, s_2019_s_3, s_2019_s_30, s_2019_s_31, s_2019_s_32, s_2019_s_33, s_2019_s_34, s_2019_s_35, s_2019_s_36, s_2019_s_37, s_2019_s_38, s_2019_s_39, s_2019_s_4, s_2019_s_40, s_2019_s_41, s_2019_s_42, s_2019_s_43, s_2019_s_44, s_2019_s_5, s_2019_s_6, s_2019_s_7, s_2019_s_8, s_2019_s_9, s_2020_s_1, s_2020_s_10, s_2020_s_11, s_2020_s_12, s_2020_s_13, s_2020_s_14, s_2020_s_15, s_2020_s_16, s_2020_s_17, s_2020_s_18, s_2020_s_19, s_2020_s_2, s_2020_s_20, s_2020_s_21, s_2020_s_22, s_2020_s_23, s_2020_s_24, s_2020_s_25, s_2020_s_26, s_2020_s_27, s_2020_s_28, s_2020_s_29, s_2020_s_3, s_2020_s_30, s_2020_s_31, s_2020_s_32, s_2020_s_33, s_2020_s_34, s_2020_s_35, s_2020_s_36, s_2020_s_37, s_2020_s_38, s_2020_s_39, s_2020_s_4, s_2020_s_40, s_2020_s_41, s_2020_s_42, s_2020_s_43, s_2020_s_44, s_2020_s_45, s_2020_s_46, s_2020_s_47, s_2020_s_48, s_2020_s_49, s_2020_s_5, s_2020_s_6, s_2020_s_7, s_2020_s_8, s_2020_s_9, s_2023_s_1, s_2023_s_2, s_2023_s_3, s_2023_s_4, s_2023_s_5, s_2023_s_6, s_2023_s_7, s_2023_s_8, s_2023_s_9, s_2023_s_10, s_2023_s_11, s_2023_s_12, s_2023_s_13, s_2023_s_14, s_2023_s_15, s_2023_s_16, s_2023_s_17, s_2023_s_18, s_2023_s_19, s_2023_s_20, s_2023_s_21, s_2023_s_22, s_2023_s_23, s_2023_s_24, s_2023_s_25, s_2023_s_26, s_2023_s_27, s_2023_s_28, s_2023_s_29, s_2023_s_30, s_2023_s_31, s_2023_s_32, s_2023_s_33, s_2023_s_34, s_2023_s_35, s_2023_s_36, s_2023_s_37, s_2023_s_38, s_2023_s_39, s_2023_s_40, s_2023_s_41, s_2023_s_42, s_2023_s_43, s_2023_s_44, s_2023_s_45, s_2023_s_46, s_2023_s_47, s_2023_s_48, s_2023_s_49, s_2023_s_50, s_2023_s_51, s_2023_s_52, s_2023_s_53, s_2023_s_54, s_2023_s_55, s_2023_s_56, s_2023_s_57, s_2023_s_58, s_2023_s_59, s_2023_s_60, s_2023_s_61, s_2023_s_62, s_2023_s_63。
- `eyes/src/engine/core/Unidentified707.js`：Entity.register 顶层键：belinda, bianca, caliban, cordelia, cressida, cupid, desdemona, ferdinand, francisco, juliet, mab, margaret, ophelia, perdita, portia, prospero, puck, rosalind, setebos, stephano, sycorax, s_2023_u_1, s_2025_u_1, trinculo。
- `eyes/src/engine/core/Unidentified708.js`：Entity.register 顶层键：sc_3d_winds, sc_ace, sc_acrimsat, sc_acs3, sc_aim, sc_aqua, sc_ascends, sc_aura, sc_c_nofs, sc_calipso, sc_chandra, sc_clarreo, sc_cloudsat, sc_cluster_ii_fm5, sc_cluster_ii_fm6, sc_cluster_ii_fm7, sc_cluster_ii_fm8, sc_cygnss_1, sc_cygnss_2, sc_cygnss_3, sc_cygnss_4, sc_cygnss_5, sc_cygnss_6, sc_cygnss_7, sc_cygnss_8, sc_dscovr, sc_eo_1, sc_euclid, sc_explorer_1, sc_face, sc_fgrst, sc_gacm, sc_galex, sc_geo_cape, sc_geotail, sc_goes_12, sc_goes_13, sc_goes_14, sc_goes_15, sc_gpm, sc_grace_1, sc_grace_2, sc_grace_fo1, sc_grace_fo2, sc_grifex, sc_hubble_space_telescope, sc_hyspiri, sc_ibex, sc_icesat_2, sc_image, sc_imap, sc_integral, sc_ipex, sc_iss, sc_iss_cowvr_tempest, sc_iss_ecostress, sc_iss_emit, sc_iss_oco_3, sc_iss_rapidscat, sc_ixpe, sc_jason_1, sc_jason_2, sc_jason_3, sc_jwst, sc_landsat_1, sc_landsat_2, sc_landsat_3, sc_landsat_4, sc_landsat_5, sc_landsat_7, sc_landsat_8, sc_landsat_9, sc_list, sc_m_cubed, sc_mcubed_2, sc_mms_1, sc_mms_2, sc_mms_3, sc_mms_4, sc_neo_surveyor, sc_nisar, sc_noaa_14, sc_noaa_15, sc_noaa_16, sc_noaa_17, sc_noaa_18, sc_noaa_19, sc_noaa_20, sc_noaa_21, sc_nustar, sc_oco_2, sc_pace, sc_path, sc_polar, sc_prefire_1, sc_prefire_2, sc_quikscat, sc_race, sc_raincube, sc_rax_2, sc_rbsp_a, sc_rbsp_b, sc_roman_space_telescope, sc_sac_d, sc_sclp, sc_sdo, sc_sentinel_6, sc_sentinel_6b, sc_smap, sc_soho, sc_solar_1, sc_sorce, sc_spherex, sc_starling_1, sc_starling_2, sc_starling_3, sc_starling_4, sc_sunrise_faye, sc_sunrise_jet, sc_sunrise_ein, sc_sunrise_edward, sc_sunrise_spike, sc_sunrise_bebop, sc_suomi_npp, sc_swift, sc_swot, sc_tdrs_3, sc_tdrs_5, sc_tdrs_6, sc_tdrs_7, sc_tdrs_8, sc_tdrs_9, sc_tdrs_10, sc_tdrs_11, sc_tdrs_12, sc_tdrs_13, sc_tempo, sc_terra, sc_tess, sc_themis_a, sc_themis_d, sc_themis_e, sc_timed, sc_trmm, sc_tropics_01, sc_tropics_03, sc_tropics_05, sc_tropics_06, sc_tropics_07, sc_uars, sc_wind, sc_wise。
- `eyes/src/engine/core/Unidentified709.js`：Entity.register 顶层键：sc_artemis_1, sc_artemis_2, sc_capstone, sc_clementine, sc_danuri, sc_grail_a, sc_grail_b, sc_ladee, sc_lcross, sc_lcross_impact_site, sc_lunar_flashlight, sc_lunar_prospector, sc_lunar_reconnaissance_orbiter, sc_smart_1, sc_themis_b, sc_themis_c。
- `eyes/src/engine/core/Unidentified710.js`：Entity.register 顶层键：sc_escapade_blue, sc_escapade_gold, sc_mars_2020, sc_mars_2020_landing_site, sc_mars_science_laboratory, sc_mars_science_laboratory_landing_site, sc_mars_exploration_rover_1, sc_mars_exploration_rover_1_landing_site, sc_mars_exploration_rover_2, sc_mars_exploration_rover_2_landing_site, sc_insight, sc_insight_landing_site, sc_marco_a, sc_marco_b, sc_mars_odyssey, sc_mars_reconnaissance_orbiter, sc_maven, sc_mars_express, sc_phoenix, sc_phoenix_landing_site, sc_trace_gas_orbiter, sc_mars_orbiter_mission, sc_mars_global_surveyor, sc_mars_climate_orbiter, sc_mars_pathfinder, sc_mars_pathfinder_landing_site, sc_mars_polar_lander, sc_viking_1_orbiter, sc_viking_1_lander_landing_site, sc_viking_2_orbiter, sc_viking_2_lander_landing_site。
- `eyes/src/engine/core/Unidentified711.js`：Entity.register 顶层键：sc_messenger, sc_messenger_impact_site。
- `eyes/src/engine/core/Unidentified712.js`：Entity.register 顶层键：sc_juno, sc_cassini, sc_europa_clipper, sc_galileo, sc_galileo_probe, sc_huygens, sc_huygens_landing_site, sc_juice, sc_pioneer_10, sc_pioneer_11, sc_voyager_1, sc_voyager_2。
- `eyes/src/engine/core/Unidentified713.js`：Entity.register 顶层键：sc_dart, sc_dawn, sc_deep_impact, sc_deep_impact_impactor, sc_deep_impact_impactor_impact_site, sc_deep_space_1, sc_near_shoemaker, sc_near_shoemaker_landing_site, sc_lucy, sc_new_horizons, sc_rosetta, sc_rosetta_impact_site, sc_osiris_rex, sc_osiris_rex_src, sc_philae, sc_philae_landing_site, sc_psyche, sc_stardust, sc_stardust_src。
- `eyes/src/engine/core/Unidentified715.js`：Entity.register 顶层键：sc_biosentinel, sc_kepler_space_telescope, sc_mariner_2, sc_parker_solar_probe, sc_spitzer, sc_stereo_ahead, sc_stereo_behind, sc_ulysses, sc_wmap。
- `eyes/src/engine/core/Unidentified716.js`：Entity.register 顶层键：sc_magellan, sc_venus_express。
- `eyes/src/engine/core/Unidentified717.js`：Entity.register 顶层键：rose_bowl, school_bus, scientist。

`CheckboxMultistate.js` 既默认导出基础 Checkbox，也单独命名导出多态 CheckboxMultistate；不是空类，也不是类实现主体。
