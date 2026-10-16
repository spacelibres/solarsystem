// Recovered from app.js:1489381-1500476.
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/InstrumentFOVBlockStyles.js";
import InstrumentFOVBlockTemplate from "../templates/InstrumentFOVBlockTemplate.html";
var getInstrumentFOVBlockTemplate = () => InstrumentFOVBlockTemplate;
/* 仪器配置与实例几何分离，实例属性优先于仪器公共属性。存在 keyframes 的仪器使用三态开关：关闭、覆盖区间、完整视锥；总开关与单仪器互相同步时跳过回调，避免循环触发。 */
class InstrumentFOVBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(app) {
    super(app, null, {
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
          keyframes: cassiniRadarCoverageIntervals,
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
  hasInstrumentsWithFOV(spacecraftId) {
    return void 0 !== this._spacecraft[spacecraftId];
  }
  init() {
    super.init();
  }
  onRouteChange(entityInfo, entityName) {
    const previousEntity = entityInfo.id;
    this._previousEntity && this._previousEntity !== previousEntity && this.reset();
    this.setState({
      entityName: entityName
    });
    const spacecraftInfo = this._spacecraft[previousEntity];
    spacecraftInfo ? (this._addInstrumentOptions(previousEntity, spacecraftInfo), this._previousEntity = previousEntity, this._setVariables(this._children.instrumentFOVBlock)) : this._children.instrumentsList.innerHTML = "";
  }
  _addInstrumentOptions(spacecraftId, spacecraftInfo) {
    this._children.instrumentsList.innerHTML = "";
    this.reset();
    const instruments = spacecraftInfo.instruments;
    if (void 0 === instruments) return void console.warn(`Spacecraft ${spacecraftId} is missing instruments`);
    const hasKeyframes = instrumentInfo => instrumentInfo.keyframes || instrumentInfo.instances.some(instanceInfo => instanceInfo.keyframes);
    const toStateIndex = enabledState => "number" == typeof enabledState ? enabledState : enabledState ? 2 : 0;
    instruments.forEach(instrumentInfo => {
      void 0 === instrumentInfo.enabled && (instrumentInfo.enabled = false);
      hasKeyframes(instrumentInfo) && (instrumentInfo.enabled = toStateIndex(instrumentInfo.enabled));
    });
    const allUseKeyframes = instruments.every(hasKeyframes);
    let allCheckbox;
    const setAllInstruments = enabledState => {
      spacecraftInfo.enabled = enabledState;
      this._instrumentCheckboxes.forEach(({
        instrument: instrument,
        checkbox: checkbox
      }) => {
        (allCheckbox.cycle ? enabledState !== instrument.enabled : toStateIndex(enabledState) !== toStateIndex(instrument.enabled)) && (checkbox.cycle ? (instrument.enabled = toStateIndex(enabledState), checkbox.cycle(null, true, instrument.enabled)) : (instrument.enabled = enabledState, checkbox.toggle(null, true)), this._toggleFrustums(spacecraftId, instrument, spacecraftInfo.enabled));
      });
    };
    const allCheckboxOptions = readState => ({
      key: "allInstruments",
      text: () => "All Instruments",
      function: () => setAllInstruments(readState())
    });
    allUseKeyframes ? (spacecraftInfo.enabled = toStateIndex(spacecraftInfo.enabled), allCheckbox = this._createMultistateCheckbox(allCheckboxOptions(() => allCheckbox.getCurrentStateIndex()), 3, spacecraftInfo.enabled), allCheckbox.setClassesForIndex({
      checkbox: "checked",
      icon: "fov-coverage"
    }, 1)) : allCheckbox = this._createCheckbox(allCheckboxOptions(() => !spacecraftInfo.enabled), spacecraftInfo.enabled);
    allCheckbox.setEnabled(true);
    this._children.instrumentsList.appendChild(allCheckbox.element);
    instruments.forEach(instrumentInfo => {
      let instrumentCheckbox;
      const setInstrumentState = enabledState => {
        instrumentInfo.enabled = enabledState;
        const allFrustumsEnabled = !this._instrumentCheckboxes.some(({
          instrument: instrument
        }) => 2 !== toStateIndex(instrument.enabled));
        const allCoverageEnabled = !this._instrumentCheckboxes.some(({
          instrument: instrument
        }) => 1 !== toStateIndex(instrument.enabled));
        if (allCheckbox.cycle) {
          const aggregateState = allFrustumsEnabled ? 2 : allCoverageEnabled ? 1 : 0;
          spacecraftInfo.enabled !== aggregateState && (spacecraftInfo.enabled = aggregateState, allCheckbox.cycle(null, true, spacecraftInfo.enabled));
        } else spacecraftInfo.enabled !== allFrustumsEnabled && (spacecraftInfo.enabled = allFrustumsEnabled, allCheckbox.toggle(null, true, spacecraftInfo.enabled));
        this._toggleFrustums(spacecraftId, instrumentInfo, spacecraftInfo.enabled);
      };
      const instrumentCheckboxOptions = readState => ({
        key: instrumentInfo.id,
        text: () => instrumentInfo.name,
        function: () => setInstrumentState(readState())
      });
      hasKeyframes(instrumentInfo) ? (instrumentCheckbox = this._createMultistateCheckbox(instrumentCheckboxOptions(() => instrumentCheckbox.getCurrentStateIndex()), 3, toStateIndex(spacecraftInfo.enabled || instrumentInfo.enabled)), instrumentCheckbox.setClassesForIndex({
        checkbox: "checked",
        icon: "fov-coverage"
      }, 1)) : instrumentCheckbox = this._createCheckbox(instrumentCheckboxOptions(() => !instrumentInfo.enabled), spacecraftInfo.enabled || instrumentInfo.enabled);
      this._toggleFrustums(spacecraftId, instrumentInfo, spacecraftInfo.enabled);
      instrumentCheckbox.setEnabled(true);
      this._children.instrumentsList.appendChild(instrumentCheckbox.element);
      this._instrumentCheckboxes.push({
        instrument: instrumentInfo,
        checkbox: instrumentCheckbox
      });
    });
  }
  _toggleFrustums(spacecraftId, instrumentInfo, allEnabled = false) {
    const spacecraftEntity = this._app.scene.getEntity(spacecraftId);
    allEnabled || instrumentInfo.enabled ? instrumentInfo.instances.forEach((instanceInfo, instanceIndex) => {
      const componentId = `${instrumentInfo.id}_${instanceIndex}`;
      let frustumComponent = spacecraftEntity.getComponent(SolarSystemSceneExports.FrustumComponent, componentId);
      if (!frustumComponent) {
        frustumComponent = spacecraftEntity.addComponent(SolarSystemSceneExports.FrustumComponent, componentId);
        const propertySetters = {
          frustumType: frustumType => frustumComponent.setFrustumType(frustumType),
          color: color => frustumComponent.setColor(color),
          position: originOffset => frustumComponent.setOriginOffset(originOffset),
          direction: direction => frustumComponent.setDirection(direction),
          fov: fieldOfView => frustumComponent.setFOVDegrees(fieldOfView.x, fieldOfView.y),
          nearBase: nearBase => frustumComponent.setNearBase(nearBase.x, nearBase.y),
          farBase: farBase => frustumComponent.setFarBase(farBase.x, farBase.y),
          frustumLength: frustumLength => frustumComponent.setLength(frustumLength),
          spinAngle: spinAngle => frustumComponent.setSpinAngle(spinAngle),
          numConeLines: coneLineCount => frustumComponent.setNumConeLines(coneLineCount),
          numCirlePoints: circlePointCount => frustumComponent.setNumberOfCirclePoints(circlePointCount),
          intersectionEntities: intersectionEntityIds => frustumComponent.setIntersectionEntities(intersectionEntityIds),
          hiddenPyramidEdges: hiddenEdges => frustumComponent.setHiddenPyramidEdges(hiddenEdges),
          keyframes: keyframes => frustumComponent.setKeyframes(keyframes)
        };
        Object.entries(propertySetters).forEach(([propertyName, applyProperty]) => {
          const propertyValue = instanceInfo[propertyName] ?? instrumentInfo[propertyName];
          void 0 !== propertyValue && applyProperty(propertyValue);
        });
      }
      "number" == typeof instrumentInfo.enabled && (instanceInfo.keyframes || instrumentInfo.keyframes) && frustumComponent.setUseKeyframes(1 === instrumentInfo.enabled);
      frustumComponent.setEnabled(true);
    }) : instrumentInfo.instances.forEach((instanceInfo, instanceIndex) => {
      const frustumComponent = spacecraftEntity.getComponent(SolarSystemSceneExports.FrustumComponent, `${instrumentInfo.id}_${instanceIndex}`);
      frustumComponent && frustumComponent.setEnabled(false);
    });
  }
  reset() {
    this._instrumentCheckboxes = [];
    this._triggeredByInstrumentCheckbox = false;
    this._triggeredByAllCheckbox = false;
  }
  __disable() {
    this._previousEntity = null;
    this.setState({
      entityName: null
    });
    super.__disable();
  }
}
const cassiniRadarCoverageIntervals = [[152076418.941, 152077844.412], [161721448.394, 161724013.234], [179351880.56, 179352668.353], [183743728.557, 183746127.345], [199702044.251, 199703987.076], [206798889.687, 206801144.93200004], [210932215.601, 210932517.45200002], [212309741.233, 212310243.7950001], [213685760.527, 213688255.84599993], [219195475.712, 219197059.475], [221948389.032, 221950786.682], [225384888.335, 225387096.692], [229516775.022, 229519123.281], [230894296.139, 230896399.898], [232272791.587, 232273835.696], [244571878.159, 244572546.418], [251462344.531, 251463838.295], [256972389.815, 256974676.527], [263857450.298, 263859678.339], [265234202.56, 265236244.55], [281758018.902, 281759595.803], [283135322.768, 283137674.735], [287268409.109, 287269025.629], [296212054.577, 296214379.301], [297589376.218, 297591620.304], [298967209.919, 298970186.382], [300343766.246, 300345887.534], [301721355.559, 301722016.9010002], [304475666.639, 304477841.213], [315231186.563, 315232652.162], [316609663.387, 316610787.603], [331733884.384, 331734589.517], [361865506.41000015, 361866749.799], [390920724.199, 390922243.28], [392298523.298, 392300869.696], [422601256.394, 422602979.474], [426733393.407, 426735687.991], [434998223.861, 434999085.116], [444640446.583, 444641556.386], [461880883.82, 461881966.261], [546113407.629, 546114474.108]];
InstrumentFOVBlock.html = getInstrumentFOVBlockTemplate();
export { InstrumentFOVBlock };
