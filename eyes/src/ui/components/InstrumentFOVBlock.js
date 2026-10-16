/** @eyes-analysis
 * 文件职责：仪器视场选项内容块
 * 依据：imports: ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../app/public-api.js, ../../styles/extracted/InstrumentFOVBlockStyles.js, ../templates/InstrumentFOVBlockTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1489381-1500476.
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/InstrumentFOVBlockStyles.js";
import InstrumentFOVBlockTemplate from "../templates/InstrumentFOVBlockTemplate.html";
var getInstrumentFOVBlockTemplate = () => InstrumentFOVBlockTemplate;
/** @eyes-analysis
 * 类职责：仪器视场选项内容块；继承 SolarSystemPublicApi.OptionsBlock
 * 继承：SolarSystemPublicApi.OptionsBlock；导出：InstrumentFOVBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class InstrumentFOVBlock extends SolarSystemPublicApi.OptionsBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, Pioneer.Vector3, Pioneer.Color；写入 _previousEntity, _spacecraft, _instrumentCheckboxes。
   * 状态写入：_instrumentCheckboxes、_previousEntity、_spacecraft。
   * 调用线索：Object.assign、new Pioneer.Color、new Pioneer.Vector3、super。
   */
  constructor(t) {
    super(t, null, {
      entityName: ""
    });
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      }
    });
    this._previousEntity = null;
    this._spacecraft = {
      sc_cassini: {
        enabled: false,
        instruments: [{
          id: "radar",
          name: "Radar",
          enabled: 1,
          frustumType: "cone",
          frustumLength: 4e3,
          numConeLines: 2,
          intersectionEntities: ["titan"],
          spinAngle: Math.PI / 2,
          keyframes: l,
          instances: [{
            fov: {
              x: 1.3,
              y: 1.3
            },
            position: new Pioneer.Vector3(0, 0, -.002),
            direction: new Pioneer.Vector3(0, -.03838, -.99926),
            color: new Pioneer.Color(.4, .4, .15)
          }, {
            fov: {
              x: 1.35,
              y: 1.35
            },
            position: new Pioneer.Vector3(0, 0, -.002),
            direction: new Pioneer.Vector3(.02094, -.01484, -.99977),
            color: new Pioneer.Color(.4, .4, .15)
          }, {
            fov: {
              x: .35,
              y: .35
            },
            position: new Pioneer.Vector3(0, 0, -.002),
            direction: Pioneer.Vector3.ZAxisNeg,
            color: new Pioneer.Color(.9, .5, .3)
          }, {
            fov: {
              x: 1.35,
              y: 1.35
            },
            position: new Pioneer.Vector3(0, 0, -.002),
            direction: new Pioneer.Vector3(.02093, .01484, -.99976),
            color: new Pioneer.Color(.4, .4, .15)
          }, {
            fov: {
              x: 1.3,
              y: 1.3
            },
            position: new Pioneer.Vector3(0, 0, -.002),
            direction: new Pioneer.Vector3(0, .03838, -.99926),
            color: new Pioneer.Color(.4, .4, .15)
          }]
        }, {
          id: "wac",
          name: "ISS Wide-Angle Camera",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: 3.5,
              y: 3.5
            },
            position: new Pioneer.Vector3(.001565, -43e-5, 29e-5),
            direction: Pioneer.Vector3.YAxisNeg,
            color: new Pioneer.Color(0, .8, 1),
            nearBase: {
              x: 12288e-9,
              y: 12288e-9
            }
          }]
        }, {
          id: "nac",
          name: "ISS Narrow-Angle Camera",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: .35,
              y: .35
            },
            position: new Pioneer.Vector3(.00156, -43e-5, -1e-4),
            direction: new Pioneer.Vector3(-426e-6, -.9999996, -822e-6),
            color: new Pioneer.Color(0, 1, .4),
            nearBase: {
              x: 12288e-9,
              y: 12288e-9
            },
            spinAngle: .46199892
          }]
        }, {
          id: "vims",
          name: "VIMS (Visible and Infrared Mapping Spectrometer)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: 1.83,
              y: 1.83
            },
            position: new Pioneer.Vector3(.001382, -44e-5, -705e-6),
            direction: Pioneer.Vector3.YAxisNeg,
            color: new Pioneer.Color(.8, .2, .32),
            nearBase: {
              x: 25e-7,
              y: 25e-7
            },
            spinAngle: Math.PI / 2
          }]
        }, {
          id: "uvis",
          name: "UVIS (Ultraviolet Imaging Spectrograph)",
          enabled: false,
          frustumType: "pyramid",
          frustumLength: 4e3,
          direction: Pioneer.Vector3.YAxisNeg,
          color: new Pioneer.Color(.4, .3, .7),
          nearBase: {
            x: 256e-7,
            y: 64e-7
          },
          spinAngle: Math.PI / 2,
          instances: [{
            fov: {
              x: .04297183,
              y: 3.49504
            },
            position: new Pioneer.Vector3(.00105, -44e-5, 15e-5),
            hiddenPyramidEdges: [0, 1, 2, 3]
          }, {
            fov: {
              x: .0859437,
              y: 3.49504
            },
            position: new Pioneer.Vector3(.00105, -44e-5, 1e-4),
            hiddenPyramidEdges: [0, 1, 2, 3]
          }, {
            fov: {
              x: .343775,
              y: 3.49504
            },
            position: new Pioneer.Vector3(.00105, -44e-5, 1e-4)
          }, {
            fov: {
              x: .34377468,
              y: .366693
            },
            position: new Pioneer.Vector3(.00105, -44e-5, 5e-5),
            nearBase: {
              x: 8e-6,
              y: 8e-6
            }
          }, {
            frustumType: "cone",
            fov: {
              x: 3.32,
              y: 3.32
            },
            position: new Pioneer.Vector3(.00105, -44e-5, 0),
            nearBase: {
              x: 13e-6,
              y: 13e-6
            },
            numConeLines: 0
          }]
        }]
      },
      sc_new_horizons: {
        enabled: false,
        instruments: [{
          id: "mvic",
          name: "MVIC (Multispectral Visible Imaging Camera)",
          enabled: false,
          frustumType: "pyramid",
          frustumLength: 4e3,
          fov: {
            x: 5.7,
            y: .037
          },
          position: new Pioneer.Vector3(-9e-4, -63e-6, .001038),
          nearBase: {
            x: 65312e-9,
            y: 416e-9
          },
          instances: [{
            fov: {
              x: 5.7,
              y: .15
            },
            direction: new Pioneer.Vector3(-.9999685, .0078494, -.0012505),
            color: new Pioneer.Color(1, .84, 0),
            nearBase: {
              x: 65312e-9,
              y: 1664e-9
            }
          }, {
            direction: new Pioneer.Vector3(-.999777, .0210862, -.0012505),
            color: new Pioneer.Color(.87, .41, .41)
          }, {
            direction: new Pioneer.Vector3(-.9998146, .0192191, -.0012505),
            color: new Pioneer.Color(.35, .46, .34)
          }, {
            direction: new Pioneer.Vector3(-.9998487, .0173519, -.0012505),
            color: new Pioneer.Color(.8, .16, .16)
          }, {
            direction: new Pioneer.Vector3(-.9998794, .0154847, -.0012505),
            color: new Pioneer.Color(.3, .4, .6)
          }, {
            direction: new Pioneer.Vector3(-.9999066, .0136174, -.0012505),
            color: new Pioneer.Color(.71, .71, .73)
          }, {
            direction: new Pioneer.Vector3(-.9999303, .01175, -.0012505),
            color: new Pioneer.Color(.71, .71, .73)
          }]
        }, {
          id: "leisa",
          name: "LEISA (Linear Etalon Imaging Spectral Array)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: .911,
              y: .911
            },
            position: new Pioneer.Vector3(-9e-4, -63e-6, .001038),
            direction: new Pioneer.Vector3(-.9999136, .013085, -.0012696),
            color: new Pioneer.Color(.25, .8, 1),
            nearBase: {
              x: 1024e-8,
              y: 1024e-8
            }
          }]
        }, {
          id: "lorri",
          name: "LORRI (Long Range Reconnaissance Imager)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: .29,
              y: .29
            },
            position: new Pioneer.Vector3(-7e-4, -2e-5, -323e-6),
            direction: new Pioneer.Vector3(-.9999955, 3382e-7, -.0029684),
            color: new Pioneer.Color(.51, .75, .59),
            nearBase: {
              x: 133e-7,
              y: 133e-7
            }
          }]
        }, {
          id: "alice",
          name: "Alice (UV Spectrometer)",
          enabled: false,
          frustumType: "pyramid",
          frustumLength: 4e3,
          position: new Pioneer.Vector3(-85e-5, 3e-4, 995e-6),
          color: new Pioneer.Color(.65, .45, 1),
          spinAngle: -.0349066,
          instances: [{
            fov: {
              x: 4,
              y: .1
            },
            direction: new Pioneer.Vector3(-.9997723, 8516e-7, .0213245),
            hiddenPyramidEdges: [1, 2]
          }, {
            fov: {
              x: 2,
              y: 2
            },
            direction: new Pioneer.Vector3(-.9995182, .0025548, -.0310288)
          }]
        }]
      },
      sc_europa_clipper: {
        enabled: false,
        instruments: [{
          id: "wac",
          name: "EIS WAC (Europa Imaging System)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: 48,
              y: 28
            },
            position: new Pioneer.Vector3(-43e-5, .0013, .00212),
            direction: Pioneer.Vector3.YAxis,
            color: new Pioneer.Color(.678, .435, .231),
            nearBase: {
              x: 4096e-8,
              y: 2048e-8
            },
            spinAngle: Math.PI / 2
          }]
        }, {
          id: "nac",
          name: "EIS NAC (Europa Imaging System)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            fov: {
              x: 2.3,
              y: 1.2
            },
            position: new Pioneer.Vector3(-393e-6, .0016, .001407),
            direction: Pioneer.Vector3.YAxis,
            color: new Pioneer.Color(.204, .455, .831),
            nearBase: {
              x: 4e-5,
              y: 2e-5
            },
            spinAngle: Math.PI / 2
          }]
        }, {
          id: "e-themis",
          name: "E-THEMIS (Thermal Emission Imaging System)",
          enabled: false,
          frustumType: "pyramid",
          frustumLength: 4e3,
          fov: {
            x: 5.7,
            y: 1
          },
          position: new Pioneer.Vector3(-18e-5, .00125, .002069),
          color: new Pioneer.Color(.45, .65, .45),
          nearBase: {
            x: 168e-8,
            y: 1104e-8
          },
          instances: [{
            direction: new Pioneer.Vector3(0, .9995854, -.028794)
          }, {
            direction: Pioneer.Vector3.YAxis,
            spinAngle: Math.PI / 2
          }, {
            direction: new Pioneer.Vector3(0, .9995854, .028794)
          }]
        }, {
          id: "uvs",
          name: "Europa Ultraviolet Spectrograph (Europa-UVS)",
          enabled: false,
          frustumType: "pyramid",
          frustumLength: 4e3,
          position: new Pioneer.Vector3(-67e-5, .00135, .002),
          color: new Pioneer.Color(.486, .306, .639),
          instances: [{
            fov: {
              x: 7.3,
              y: .1
            },
            direction: new Pioneer.Vector3(0, .9999452, .0104718),
            hiddenPyramidEdges: [3, 4]
          }, {
            fov: {
              x: .2,
              y: .2
            },
            direction: new Pioneer.Vector3(.0645288, .9978609, .0104718),
            spinAngle: .13
          }]
        }, {
          id: "mise",
          name: "MISE (Mapping Imaging Spectrometer)",
          enabled: false,
          instances: [{
            frustumType: "pyramid",
            frustumLength: 4e3,
            position: new Pioneer.Vector3(39e-5, .0011, .00194),
            color: new Pioneer.Color(.395, .13, .195),
            fov: {
              x: 4.3,
              y: .007
            },
            direction: Pioneer.Vector3.YAxis,
            nearBase: {
              x: 96e-7,
              y: 144e-7
            },
            spinAngle: Math.PI / 2
          }]
        }]
      }
    };
    this._instrumentCheckboxes = [];
  }
  /** @eyes-analysis
   * 执行 hasInstrumentsWithFOV 对应的组件业务步骤。
   */
  hasInstrumentsWithFOV(t) {
    return void 0 !== this._spacecraft[t];
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init。
   * 调用线索：super.init。
   */
  init() {
    super.init();
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.reset, this.setState, this._addInstrumentOptions, this._setVariables；写入 _previousEntity。
   * 状态写入：_children.instrumentsList.innerHTML、_previousEntity。
   * 调用线索：this._addInstrumentOptions、this._setVariables、this.reset、this.setState。
   */
  onRouteChange(t, e) {
    const previousEntity = t.id;
    this._previousEntity && this._previousEntity !== previousEntity && this.reset();
    this.setState({
      entityName: e
    });
    const s = this._spacecraft[previousEntity];
    s ? (this._addInstrumentOptions(previousEntity, s), this._previousEntity = previousEntity, this._setVariables(this._children.instrumentFOVBlock)) : this._children.instrumentsList.innerHTML = "";
  }
  /** @eyes-analysis
   * 执行 _addInstrumentOptions 对应的组件业务步骤；调用 this.reset, this._instrumentCheckboxes.forEach, this._toggleFrustums, this._createMultistateCheckbox, this._createCheckbox, this._children.instrumentsList.appendChild, this._instrumentCheckboxes.some, this._instrumentCheckboxes.push。
   * 状态写入：_children.instrumentsList.innerHTML。
   * 调用线索：a、checkbox.cycle、checkbox.toggle、console.warn、i.every等。
   */
  _addInstrumentOptions(t, e) {
    this._children.instrumentsList.innerHTML = "";
    this.reset();
    const i = e.instruments;
    if (void 0 === i) return void console.warn(`Spacecraft ${t} is missing instruments`);
    const s = t => t.keyframes || t.instances.some(t => t.keyframes);
    const n = t => "number" == typeof t ? t : t ? 2 : 0;
    i.forEach(t => {
      void 0 === t.enabled && (t.enabled = false);
      s(t) && (t.enabled = n(t.enabled));
    });
    const o = i.every(s);
    let r;
    const a = i => {
      e.enabled = i;
      this._instrumentCheckboxes.forEach(({
        instrument: instrument,
        checkbox: checkbox
      }) => {
        (r.cycle ? i !== instrument.enabled : n(i) !== n(instrument.enabled)) && (checkbox.cycle ? (instrument.enabled = n(i), checkbox.cycle(null, true, instrument.enabled)) : (instrument.enabled = i, checkbox.toggle(null, true)), this._toggleFrustums(t, instrument, e.enabled));
      });
    };
    const l = t => ({
      key: "allInstruments",
      text: () => "All Instruments",
      function: () => a(t())
    });
    o ? (e.enabled = n(e.enabled), r = this._createMultistateCheckbox(l(() => r.getCurrentStateIndex()), 3, e.enabled), r.setClassesForIndex({
      checkbox: "checked",
      icon: "fov-coverage"
    }, 1)) : r = this._createCheckbox(l(() => !e.enabled), e.enabled);
    r.setEnabled(true);
    this._children.instrumentsList.appendChild(r.element);
    i.forEach(i => {
      let o;
      const a = s => {
        i.enabled = s;
        const o = !this._instrumentCheckboxes.some(({
          instrument: instrument
        }) => 2 !== n(instrument.enabled));
        const a = !this._instrumentCheckboxes.some(({
          instrument: instrument
        }) => 1 !== n(instrument.enabled));
        if (r.cycle) {
          const t = o ? 2 : a ? 1 : 0;
          e.enabled !== t && (e.enabled = t, r.cycle(null, true, e.enabled));
        } else e.enabled !== o && (e.enabled = o, r.toggle(null, true, e.enabled));
        this._toggleFrustums(t, i, e.enabled);
      };
      const l = t => ({
        key: i.id,
        text: () => i.name,
        function: () => a(t())
      });
      s(i) ? (o = this._createMultistateCheckbox(l(() => o.getCurrentStateIndex()), 3, n(e.enabled || i.enabled)), o.setClassesForIndex({
        checkbox: "checked",
        icon: "fov-coverage"
      }, 1)) : o = this._createCheckbox(l(() => !i.enabled), e.enabled || i.enabled);
      this._toggleFrustums(t, i, e.enabled);
      o.setEnabled(true);
      this._children.instrumentsList.appendChild(o.element);
      this._instrumentCheckboxes.push({
        instrument: i,
        checkbox: o
      });
    });
  }
  /** @eyes-analysis
   * 执行 _toggleFrustums 对应的组件业务步骤；调用 this._app.scene.getEntity, Object.entries。
   * 调用线索：Object.entries、Object.entries(i).forEach、e.instances.forEach、n.addComponent、n.getComponent等。
   */
  _toggleFrustums(t, e, i = false) {
    const n = this._app.scene.getEntity(t);
    i || e.enabled ? e.instances.forEach((t, i) => {
      const o = `${e.id}_${i}`;
      let r = n.getComponent(SolarSystemSceneExports.FrustumComponent, o);
      if (!r) {
        r = n.addComponent(SolarSystemSceneExports.FrustumComponent, o);
        const i = {
          frustumType: t => r.setFrustumType(t),
          color: t => r.setColor(t),
          position: t => r.setOriginOffset(t),
          direction: t => r.setDirection(t),
          fov: t => r.setFOVDegrees(t.x, t.y),
          nearBase: t => r.setNearBase(t.x, t.y),
          farBase: t => r.setFarBase(t.x, t.y),
          frustumLength: t => r.setLength(t),
          spinAngle: t => r.setSpinAngle(t),
          numConeLines: t => r.setNumConeLines(t),
          numCirlePoints: t => r.setNumberOfCirclePoints(t),
          intersectionEntities: t => r.setIntersectionEntities(t),
          hiddenPyramidEdges: t => r.setHiddenPyramidEdges(t),
          keyframes: t => r.setKeyframes(t)
        };
        Object.entries(i).forEach(([i, s]) => {
          const n = t[i] ?? e[i];
          void 0 !== n && s(n);
        });
      }
      "number" == typeof e.enabled && (t.keyframes || e.keyframes) && r.setUseKeyframes(1 === e.enabled);
      r.setEnabled(true);
    }) : e.instances.forEach((t, i) => {
      const o = n.getComponent(SolarSystemSceneExports.FrustumComponent, `${e.id}_${i}`);
      o && o.setEnabled(false);
    });
  }
  /** @eyes-analysis
   * 执行 reset 对应的组件业务步骤；写入 _instrumentCheckboxes, _triggeredByInstrumentCheckbox, _triggeredByAllCheckbox。
   * 状态写入：_instrumentCheckboxes、_triggeredByAllCheckbox、_triggeredByInstrumentCheckbox。
   */
  reset() {
    this._instrumentCheckboxes = [];
    this._triggeredByInstrumentCheckbox = false;
    this._triggeredByAllCheckbox = false;
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity。
   * 状态写入：_previousEntity。
   * 调用线索：super.__disable、this.setState。
   */
  __disable() {
    this._previousEntity = null;
    this.setState({
      entityName: null
    });
    super.__disable();
  }
}
const l = [[152076418.941, 152077844.412], [161721448.394, 161724013.234], [179351880.56, 179352668.353], [183743728.557, 183746127.345], [199702044.251, 199703987.076], [206798889.687, 206801144.93200004], [210932215.601, 210932517.45200002], [212309741.233, 212310243.7950001], [213685760.527, 213688255.84599993], [219195475.712, 219197059.475], [221948389.032, 221950786.682], [225384888.335, 225387096.692], [229516775.022, 229519123.281], [230894296.139, 230896399.898], [232272791.587, 232273835.696], [244571878.159, 244572546.418], [251462344.531, 251463838.295], [256972389.815, 256974676.527], [263857450.298, 263859678.339], [265234202.56, 265236244.55], [281758018.902, 281759595.803], [283135322.768, 283137674.735], [287268409.109, 287269025.629], [296212054.577, 296214379.301], [297589376.218, 297591620.304], [298967209.919, 298970186.382], [300343766.246, 300345887.534], [301721355.559, 301722016.9010002], [304475666.639, 304477841.213], [315231186.563, 315232652.162], [316609663.387, 316610787.603], [331733884.384, 331734589.517], [361865506.41000015, 361866749.799], [390920724.199, 390922243.28], [392298523.298, 392300869.696], [422601256.394, 422602979.474], [426733393.407, 426735687.991], [434998223.861, 434999085.116], [444640446.583, 444641556.386], [461880883.82, 461881966.261], [546113407.629, 546114474.108]];
InstrumentFOVBlock.html = getInstrumentFOVBlockTemplate();
export { InstrumentFOVBlock };
