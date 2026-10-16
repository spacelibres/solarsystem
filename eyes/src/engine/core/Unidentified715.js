/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 9 个实体/参考系（如 sc_biosentinel、sc_kepler_space_telescope、sc_mariner_2、sc_parker_solar_probe、sc_spitzer、sc_stereo_ahead），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1198350-1203456.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_biosentinel: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: 2e-4,
    extentsRadius: 5e-4,
    label: "BioSentinel",
    parents: [[721866289, "earth"], [722273637, "moon"], [722923565, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_biosentinel/biosentinel.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_biosentinel/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_biosentinel/moon/orb"
    }, {
      type: "dynamo",
      url: "sc_biosentinel/sun/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_kepler_space_telescope: {
    groups: ["sun", "spacecraft", "telescope"],
    occlusionRadius: .00235,
    extentsRadius: .004,
    label: "Kepler",
    parents: [[289679042.1855, "earth"], [290348743, "sun"], [595512069.183, ""]],
    trail: {
      length: 32190048
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_kepler/Kepler.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_kepler/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_kepler/sun/orb"
    }, {
      type: "align",
      primary: {
        type: "align",
        target: "sun",
        targetAxis: new Pioneer.Vector3(.25176480336, -.66735243742, .7009092643),
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_mariner_2: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .0025,
    label: "Mariner 2",
    parents: [[-1178599200, "earth"], [-1178199300, "sun"], [-1169206910, "venus"], [-1167652800, ""]],
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mariner_2/mariner2.gltf"
    },
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mariner_2/earth"
    }, {
      type: "dynamo",
      url: "sc_mariner_2/sun"
    }, {
      type: "dynamo",
      url: "sc_mariner_2/venus"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_parker_solar_probe: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .003,
    label: "Parker Solar Probe",
    parents: [[587333783.3431, "earth"], [587454078, "sun"]],
    trail: {
      length: 12942631
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_parker_solar_probe/PSP.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_parker_solar_probe/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_parker_solar_probe/sun/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.XAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_spitzer: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .004,
    label: "Spitzer",
    parents: [[115064804, "earth"], [115493678, "sun"], [633614469, ""]],
    trail: {
      length: 32167331
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_spitzer/SPITZER.gltf",
      rotate: [{
        z: -90
      }, {
        x: -90
      }],
      shadowEntities: ["venus", "mercury"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_spitzer/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_spitzer/sun/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5258297992951877, .8139480432783324, -.1400557906856776, -.20341086625833524),
      coverage: [115064804, 174548493]
    }, {
      type: "dynamo",
      url: "sc_spitzer/quat"
    }]
  },
  sc_stereo_ahead: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .003,
    label: "STEREO Ahead",
    parents: [[215097110, "earth"], [221418192, "sun"]],
    trail: {
      length: 29809031
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_stereo_ahead/stereo_a.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["venus", "mercury"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_stereo_ahead/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_stereo_ahead/sun/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_stereo_ahead",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_stereo_behind: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .003,
    label: "STEREO Behind",
    parents: [[215097110, "earth"], [224468337, "sun"], [527860868.182, ""]],
    trail: {
      length: 33473699
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_stereo_behind/stereo_b.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["venus", "mercury"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_stereo_behind/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_stereo_behind/sun/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_stereo_behind",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_ulysses: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .002,
    label: "Ulysses",
    parents: [[-291488100, "earth"], [-291393201, "sun"], [-249645790, "jupiter"], [-248519090, "sun"], [299678465.184, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ulysses/ulysses.gltf",
      shadowEntities: ["venus", "mercury"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ulysses/earth"
    }, {
      type: "dynamo",
      url: "sc_ulysses/sun/1"
    }, {
      type: "dynamo",
      url: "sc_ulysses/jupiter"
    }, {
      type: "dynamo",
      url: "sc_ulysses/sun/2"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_ulysses",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxis,
      periodInHours: .0033
    }]
  },
  sc_wmap: {
    groups: ["sun", "spacecraft"],
    occlusionRadius: .0026,
    extentsRadius: .0026,
    label: "WMAP",
    parents: [[47207235, "earth"], [49737973, "moon"], [49835598, "earth"], [340848066, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_wmap/earth/launch"
    }, {
      type: "dynamo",
      url: "sc_wmap/moon"
    }, {
      type: "dynamo",
      url: "sc_wmap/earth/l2"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
