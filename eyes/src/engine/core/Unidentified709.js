/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 16 个实体/参考系（如 sc_artemis_1、sc_artemis_2、sc_capstone、sc_clementine、sc_danuri、sc_grail_a），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1108291-1117755.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_artemis_1: {
    groups: ["moon", "spacecraft"],
    radius: .005,
    label: "Artemis I",
    parents: [[721860361, "earth"], [724052473, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_artemis/artemis_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_artemis_1/earth/pos"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_artemis_1",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_artemis_2: {
    groups: ["moon", "spacecraft", "human"],
    occlusionRadius: .004,
    extentsRadius: .01,
    label: "Artemis II",
    parents: [[828372485.86066, "earth"], [829137247.80165, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_artemis/artemis_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_artemis_2/earth"
    }, {
      type: "align",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg,
        targetAxis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_capstone: {
    groups: ["moon", "spacecraft"],
    radius: 5e-4,
    label: "CAPSTONE",
    parents: [[710191748, "earth"], [721583059, "moon"], [835772469, ""]],
    trail: {
      length: void 0,
      lengthCoverages: [[4e6, Number.NEGATIVE_INFINITY, 721583059], [1210909, 721583059, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_capstone/capstone.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_capstone/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_capstone/moon/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        target: "moon",
        axis: Pioneer.Vector3.XAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_clementine: {
    groups: ["moon", "spacecraft"],
    radius: .002,
    label: "Clementine",
    parents: [[-187185539, "earth"], [-185065319, "moon"], [-178496940, ""]],
    trail: {
      length: 17500
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_clementine/clementine.gltf",
      rotate: [{
        z: -90
      }],
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_clementine/earth"
    }, {
      type: "dynamo",
      url: "sc_clementine/moon"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "dynamo",
      url: "sc_clementine/ori"
    }, {
      type: "coverage",
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_clementine/clementine_isas.gltf");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_clementine/clementine.gltf");
      },
      coverage: [Number.NEGATIVE_INFINITY, -186451139]
    }]
  },
  sc_danuri: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .0032,
    label: "Danuri (Korea Pathfinder Lunar Orbiter)",
    parents: [[712929310, "earth"], [724456233, "moon"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_danuri/danuri.gltf",
      shadowEntities: ["earth", "moon"],
      rotate: [{
        x: -90
      }, {
        z: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_danuri/earth"
    }, {
      type: "dynamo",
      url: "sc_danuri/moon"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_danuri",
        axis: new Pioneer.Vector3(Math.sqrt(.5), -Math.sqrt(.5), 0)
      }
    }, {
      type: "align",
      joint: "array_01",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "array_02",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_grail_a: {
    groups: ["moon", "spacecraft"],
    radius: .001,
    label: "Ebb",
    parents: [[368932239, "earth"], [377620394, "moon"], [409055394, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grail/grail_b.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grail_a/earth"
    }, {
      type: "dynamo",
      url: "sc_grail_a/moon"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_grail_a",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_grail_b: {
    groups: ["moon", "spacecraft"],
    radius: .001,
    label: "Flow",
    parents: [[368932239, "earth"], [378599282, "moon"], [409055423, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grail/grail_b.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grail_b/earth"
    }, {
      type: "dynamo",
      url: "sc_grail_b/moon"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_grail_b",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_ladee: {
    groups: ["moon", "spacecraft"],
    radius: .0012,
    label: "LADEE",
    parents: [[431797927, "earth"], [434203267, "moon"], [451067572, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ladee/ladee.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ladee/earth"
    }, {
      type: "dynamo",
      url: "sc_ladee/moon"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_ladee",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_lcross: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: .0013,
    extentsRadius: .0022,
    label: "LCROSS",
    parents: [[298635466, "earth"], [308333606, "moon"], [308360202.356, ""]],
    dependents: ["sc_lcross_impact_site"],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_lcross/lcross.gltf",
      rotate: [{
        z: -90
      }],
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_lcross/earth"
    }, {
      type: "dynamo",
      url: "sc_lcross/moon"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_lcross",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_lcross_impact_site: {
    groups: ["moon", "sc_lcross", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "LCROSS Impact Site",
    parents: [[298635466.0304444, "moon"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(-1.4780651778549707, -.8625924931149692, -3.850305679143503),
      coverage: [298635466.0304444, Number.POSITIVE_INFINITY]
    }]
  },
  sc_lunar_flashlight: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: 25e-5,
    extentsRadius: 5e-4,
    label: "Lunar Flashlight",
    parents: [[724019554, "earth"], [737640069, ""]],
    trail: {
      length: 1e7
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_lunar_flashlight/lunar_flashlight.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_lunar_flashlight/earth"
    }, {
      type: "align",
      primary: {
        type: "align",
        target: "moon",
        axis: Pioneer.Vector3.ZAxisNeg,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_lunar_prospector: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: 653e-6,
    extentsRadius: .0022,
    label: "Lunar Prospector",
    parents: [[-62206800, "moon"], [-13402020, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_lunar_prospector/lunar_prospector.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_lunar_prospector/moon"
    }, {
      type: "align",
      primary: {
        type: "align",
        target: "moon",
        axis: Pioneer.Vector3.YAxisNeg,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .008333
    }]
  },
  sc_lunar_reconnaissance_orbiter: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: .00272,
    extentsRadius: .0038,
    label: "Lunar Reconnaissance Orbiter",
    parents: [[298635426.1844444, "earth"], [298929666, "moon"]],
    trail: {
      length: 7106.66,
      lengthCoverages: [[1e6, Number.NEGATIVE_INFINITY, 299040641], [7106.66, 299040641, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_lunar_reconnaissance_orbiter/LRO.gltf",
      rotate: [{
        z: -90
      }],
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_lunar_reconnaissance_orbiter/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_lunar_reconnaissance_orbiter/moon/orb"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_lunar_reconnaissance_orbiter",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "point",
        target: "moon",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_lunar_reconnaissance_orbiter/ori"
    }]
  },
  sc_smart_1: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .00653,
    label: "SMART-1",
    parents: [[117977163.35299999, "earth"], [153410717, "moon"], [210585600, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_smart_1/earth"
    }, {
      type: "dynamo",
      url: "sc_smart_1/moon"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_themis_b: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: .0017,
    label: "ARTEMIS P1",
    parents: [[225029706, "earth"], [362424822, "moon"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_themis/themis.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_themis_b/earth"
    }, {
      type: "dynamo",
      url: "sc_themis_b/moon"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxis,
      periodInHours: 8333e-7
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, 264427265],
      enter: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && (e.getDiv().innerHTML = e.getDiv().innerHTML.replace("ARTEMIS P1", "THEMIS B"));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && (e.getDiv().innerHTML = e.getDiv().innerHTML.replace("THEMIS B", "ARTEMIS P1"));
      }
    }]
  },
  sc_themis_c: {
    groups: ["moon", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: .0017,
    label: "ARTEMIS P2",
    parents: [[225029706, "earth"], [364189900, "moon"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_themis/themis.gltf",
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_themis_c/earth"
    }, {
      type: "dynamo",
      url: "sc_themis_c/moon"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxis,
      periodInHours: 8333e-7
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, 264427265],
      enter: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && (e.getDiv().innerHTML = e.getDiv().innerHTML.replace("ARTEMIS P2", "THEMIS C"));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && (e.getDiv().innerHTML = e.getDiv().innerHTML.replace("THEMIS C", "ARTEMIS P2"));
      }
    }]
  }
});
