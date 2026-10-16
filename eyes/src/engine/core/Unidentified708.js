/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 152 个实体/参考系（如 sc_3d_winds、sc_ace、sc_acrimsat、sc_acs3、sc_aim、sc_aqua），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1040640-1108290.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
import * as EntityUtils from "./EntityUtils.js";
Entity.Entity.register({
  sc_3d_winds: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .0025,
    label: "3D-Winds",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5573
    },
    controllers: [{
      type: "dynamo",
      url: "sc_3d_winds"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_ace: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 8e-4,
    extentsRadius: .0023,
    label: "ACE",
    parents: [[115387273, "earth"]],
    trail: {
      length: 31715490
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ace/ace.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ace"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .0033
    }]
  },
  sc_acrimsat: {
    groups: ["earth", "spacecraft"],
    radius: .0015,
    label: "ACRIMSAT",
    parents: [[-963797, "earth"], [459950467, ""]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_acrimsat/acrimsat.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_acrimsat"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .00238
    }]
  },
  sc_acs3: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 143783e-9,
    extentsRadius: .0073102,
    label: "ACS3",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_acs3/acs3.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_acs3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_acs3",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_aim: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 7e-4,
    extentsRadius: .0014,
    label: "AIM",
    parents: [[230808524, "earth"], [731980869, ""]],
    trail: {
      length: 5788.83
    },
    controllers: [{
      type: "dynamo",
      url: "sc_aim"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_aqua: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .015,
    label: "Aqua",
    parents: [[73781738, "earth"]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_aqua/Aqua.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_aqua"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_aqua",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_ascends: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "ASCENDS",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5573
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ascends"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_aura: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00345,
    extentsRadius: .017,
    label: "Aura",
    parents: [[143161358, "earth"]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_aura/Aura.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_aura"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_aura",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_c_nofs: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "C/NOFS",
    parents: [[352800006.1854904, "earth"], [502051928.18300515, ""]],
    trail: {
      length: 5573
    },
    controllers: [{
      type: "dynamo",
      url: "sc_c_nofs"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_calipso: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00165,
    extentsRadius: .005,
    label: "CALIPSO",
    parents: [[199506047, "earth"], [744120069, ""]],
    trail: {
      length: 5933
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_calipso/calipso.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_calipso"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_calipso",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_chandra: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0059,
    extentsRadius: .01,
    label: "Chandra",
    parents: [[-12716935, "earth"]],
    trail: {
      length: 228505.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_chandra/chandra.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_chandra"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: new Pioneer.Vector3(-.70710678118, -.70710678118, 0)
      },
      secondary: {
        type: "align",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_clarreo: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "CLARREO",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5573
    },
    controllers: [{
      type: "dynamo",
      url: "sc_clarreo"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_cloudsat: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0025,
    extentsRadius: .0025,
    label: "CloudSat",
    parents: [[199491286, "earth"], [756302469, ""]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cloudsat/CloudSat.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cloudsat"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_cloudsat",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_cluster_ii_fm5: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00145,
    extentsRadius: .00435,
    label: "Rumba",
    parents: [[19105314, "earth"]],
    trail: {
      length: 195541.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cluster_ii/cluster_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cluster_ii_fm5"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_cluster_ii_fm5",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_cluster_ii_fm6: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00145,
    extentsRadius: .00435,
    label: "Salsa",
    parents: [[17028089, "earth"], [779099035, ""]],
    trail: {
      length: 195351
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cluster_ii/cluster_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cluster_ii_fm6"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_cluster_ii_fm6",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_cluster_ii_fm7: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00145,
    extentsRadius: .00435,
    label: "Samba",
    parents: [[17028093, "earth"]],
    trail: {
      length: 195316
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cluster_ii/cluster_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cluster_ii_fm7"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_cluster_ii_fm7",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_cluster_ii_fm8: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00145,
    extentsRadius: .00435,
    label: "Tango",
    parents: [[19105052, "earth"]],
    trail: {
      length: 195388
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cluster_ii/cluster_ii.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cluster_ii_fm8"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_cluster_ii_fm8",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_cygnss_1: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 1",
    parents: [[535085801, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_1",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_2: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 2",
    parents: [[535085716, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_2",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_3: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 3",
    parents: [[535092760, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_3",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_4: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 4",
    parents: [[535085490, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_4"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_4",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_5: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 5",
    parents: [[535085366, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_5"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_5",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_6: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 6",
    parents: [[535092973, "earth"], [722736069, ""]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_6"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_6",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_7: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 7",
    parents: [[535092761, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_7"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_7",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_cygnss_8: {
    groups: ["earth", "spacecraft"],
    radius: 8e-4,
    label: "CYGNSS 8",
    parents: [[535085874, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cygnss/CYGNSS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cygnss_8"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_cygnss_8",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_dscovr: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 9e-4,
    extentsRadius: .002,
    label: "DSCOVR",
    parents: [[476970068, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_dscovr/dscovr.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_dscovr/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_dscovr",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_eo_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .001,
    label: "EO-1",
    parents: [[344589947.18311954, "earth"], [544104069.186, ""]],
    trail: {
      length: 5933.33
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_eo_1/eo-1.gltf",
      rotate: [{
        y: 45
      }],
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_eo_1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_eo_1",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_euclid: {
    groups: ["earth", "spacecraft", "telescope"],
    radius: .0035,
    label: "Euclid",
    parents: [[741498789, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_euclid/euclid.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_euclid/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_explorer_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .001,
    extentsRadius: .001,
    label: "Explorer 1",
    parents: [[-1322726967, "earth"], [-939025103, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_explorer_1_v2/explorer_1.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_explorer_1/earth"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_explorer_1",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: 22e-6
    }]
  },
  sc_face: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "FACE",
    parents: [[347025366.1839032, "earth"], [631022168.1838934, ""]],
    trail: {
      length: 5933.33
    },
    controllers: [{
      type: "dynamo",
      url: "sc_face"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_fgrst: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0014,
    extentsRadius: .004,
    label: "FGRST",
    parents: [[266471102, "earth"]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_fgrst"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_gacm: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "GACM",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_gacm"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_galex: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .001,
    extentsRadius: .0014,
    label: "GALEX",
    parents: [[352800006.1854904, "earth"], [425718607.184, ""]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_galex"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_geo_cape: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "GEO-CAPE",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_geo_cape"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_geotail: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0018,
    extentsRadius: .003,
    label: "Geotail",
    parents: [[-234758765, "earth"], [722891591, ""]],
    trail: {
      length: 450372
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_geotail/geotail.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_geotail/earth/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.662, .749, 0, 0)
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxis,
      periodInHours: .00083333333,
      relativeToTime: 0
    }]
  },
  sc_goes_12: {
    groups: ["earth", "spacecraft"],
    radius: .003,
    label: "GOES 12",
    parents: [[344589947.18311954, "earth"], [429930067, ""]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_goes_12"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_goes_13: {
    groups: ["earth", "spacecraft"],
    radius: .003,
    label: "GOES 13",
    parents: [[201763548, "earth"], [752025669, ""]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_goes_13"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_goes_14: {
    groups: ["earth", "spacecraft"],
    radius: .003,
    label: "GOES 14",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_goes_14"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_goes_15: {
    groups: ["earth", "spacecraft"],
    radius: .003,
    label: "GOES 15",
    parents: [[321002156, "earth"]],
    trail: {
      length: 5733
    },
    controllers: [{
      type: "dynamo",
      url: "sc_goes_15"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_gpm: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .007,
    label: "GPM",
    parents: [[629484755.7856493, "earth"]],
    trail: {
      length: 5549.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_gpm/GPM.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_gpm"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_gpm",
        axis: Pioneer.Vector3.ZAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("GPM_antenna");
      e.setRate(Pioneer.MathUtils.degToRad(192));
      e.setAxis(Pioneer.Vector3.YAxisNeg, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_grace_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .0019,
    label: "GRACE-1",
    parents: [[69656411.096817, "earth"], [562382552.2587994, ""]],
    trail: {
      length: 5575
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grace/grace.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grace_1/earth/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sc_grace_2",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
      update: t => {
        const e = t.getComponent(Pioneer.ConnectedSpriteComponent, "microwave");
        if (!e) return;
        const i = t.getScene().getEngine();
        const n = Pioneer.MathUtils.wrap(e.getTextureYOffset() - Pioneer.MathUtils.clamp(i.getTimeRate(), -1, 1) * i.getDeltaTime(), 0, 1);
        e.setTextureYOffset(n);
        const o = t.getScene().getEntity("sc_grace_2");
        const r = null !== o && o.getPosition().distance(t.getPosition()) <= 3929;
        r !== e.isEnabled() && e.setEnabled(r);
      }
    }],
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.ConnectedSpriteComponent, "microwave");
      e.setTextureUrl("$STATIC_ASSETS_URL/sprites/sine_wave.png");
      e.setEntity1("sc_grace_1");
      e.setEntity1Offset(new Pioneer.Vector3(0, -.00165, 0));
      e.setEntity2("sc_grace_2");
      e.setEntity2Offset(new Pioneer.Vector3(0, -.00165, 0));
      e.setWidths(5e-4, 5e-4);
      e.setColorMultiplier(new Pioneer.Color(.5, 1, 1));
      e.setTextureRepeat(true);
      e.setTextureStretch(4);
    }
  },
  sc_grace_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .0019,
    label: "GRACE-2",
    parents: [[69656411.096817, "earth"], [562382552.2588, ""]],
    trail: {
      length: 5575
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grace/grace.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grace_2/earth/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sc_grace_1",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_grace_fo1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .0019,
    label: "GRACE-FO 1",
    parents: [[580290547.185, "earth"]],
    trail: {
      length: 5575
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grace_fo/graceFO.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grace_fo1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sc_grace_fo2",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
      update: t => {
        const e = t.getComponent(Pioneer.ConnectedSpriteComponent, "microwave");
        if (!e) return;
        const i = t.getScene().getEngine();
        const n = Pioneer.MathUtils.wrap(e.getTextureYOffset() - Pioneer.MathUtils.clamp(i.getTimeRate(), -1, 1) * i.getDeltaTime(), 0, 1);
        e.setTextureYOffset(n);
        const o = t.getScene().getEntity("sc_grace_fo2");
        const r = null !== o && o.getPosition().distance(t.getPosition()) <= 3929;
        if (r !== e.isEnabled()) {
          e.setEnabled(r);
          const i = t.getComponent(Pioneer.ConnectedSpriteComponent, "laser1");
          const n = t.getComponent(Pioneer.ConnectedSpriteComponent, "laser2");
          i && i.setEnabled(r);
          n && n.setEnabled(r);
        }
      }
    }],
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.ConnectedSpriteComponent, "microwave");
      e.setTextureUrl("$STATIC_ASSETS_URL/sprites/sine_wave.png");
      e.setEntity1("sc_grace_fo1");
      e.setEntity1Offset(new Pioneer.Vector3(0, 0, -.00165));
      e.setEntity2("sc_grace_fo2");
      e.setEntity2Offset(new Pioneer.Vector3(0, 0, -.00165));
      e.setWidths(5e-4, 5e-4);
      e.setColorMultiplier(new Pioneer.Color(.5, 1, 1));
      e.setTextureRepeat(true);
      e.setTextureStretch(4);
      const i = t.addComponent(Pioneer.ConnectedSpriteComponent, "laser1");
      i.setTextureUrl("$STATIC_ASSETS_URL/sprites/line.png");
      i.setEntity1("sc_grace_fo1");
      i.setEntity1Offset(new Pioneer.Vector3(3e-4, 15e-5, -.00165));
      i.setEntity2("sc_grace_fo2");
      i.setEntity2Offset(new Pioneer.Vector3(-3e-4, 15e-5, -.00165));
      i.setWidths(2e-5, 2e-5);
      i.setColorMultiplier(new Pioneer.Color(1, .24, .64));
      i.setTextureRepeat(false);
      const n = t.addComponent(Pioneer.ConnectedSpriteComponent, "laser2");
      n.setTextureUrl("$STATIC_ASSETS_URL/sprites/line.png");
      n.setEntity1("sc_grace_fo1");
      n.setEntity1Offset(new Pioneer.Vector3(-3e-4, 15e-5, -.00165));
      n.setEntity2("sc_grace_fo2");
      n.setEntity2Offset(new Pioneer.Vector3(3e-4, 15e-5, -.00165));
      n.setWidths(2e-5, 2e-5);
      n.setColorMultiplier(new Pioneer.Color(1, .24, .64));
      n.setTextureRepeat(false);
    }
  },
  sc_grace_fo2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .0019,
    label: "GRACE-FO 2",
    parents: [[580290547.185, "earth"]],
    trail: {
      length: 5575
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grace_fo/graceFO.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grace_fo2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sc_grace_fo1",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      }
    }]
  },
  sc_grifex: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 15e-5,
    extentsRadius: 34e-5,
    label: "GRIFEX",
    parents: [[476542806.1849232, "earth"]],
    trail: {
      length: 5706.25
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_grifex/grifex.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_grifex"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_grifex",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_hubble_space_telescope: {
    groups: ["earth", "spacecraft", "telescope"],
    occlusionRadius: .0066,
    extentsRadius: .0066,
    label: "Hubble",
    parents: [[-305719099.92837775, "earth"]],
    trail: {
      length: 5748.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_hubble/Hubble.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_hubble_space_telescope/earth/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_hubble_space_telescope",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_hyspiri: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .012,
    label: "HyspIRI",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5733
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_hyspiri/HyspIRI.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_hyspiri"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_hyspiri",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_ibex: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 5e-4,
    extentsRadius: .001,
    label: "IBEX",
    parents: [[277712672, "earth"]],
    trail: {
      length: 797489.16
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ibex/iBEX.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ibex/earth"
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
      periodInHours: .00416
    }]
  },
  sc_icesat_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00198,
    extentsRadius: .0065,
    label: "ICESat-2",
    parents: [[590288589.182, "earth"]],
    trail: {
      length: 5653.2
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_icesatii/ICESat2.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_icesat_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_icesat_2",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_image: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00113,
    extentsRadius: .006,
    label: "IMAGE",
    parents: [[7288547.186, "earth"], [188163587.1835355, ""]],
    trail: {
      length: 55541
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_image/image.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_image"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_image",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_imap: {
    groups: ["earth", "spacecraft"],
    radius: .0034,
    label: "IMAP",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_imap/imap.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_imap/earth"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxis,
      periodInHours: .00416666666
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_integral: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0025,
    extentsRadius: .005,
    label: "INTEGRAL",
    parents: [[367498866.18276465, "earth"], [793972869, ""]],
    trail: {
      length: 229689
    },
    controllers: [{
      type: "dynamo",
      url: "sc_integral"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_ipex: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 1e-4,
    extentsRadius: 15e-5,
    label: "IPEX",
    parents: [[439589738, "earth"], [475891267, ""]],
    trail: {
      length: 5862
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ipex/IPEX.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ipex"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_ipex",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_iss: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .008,
    extentsRadius: .072,
    label: "ISS",
    parents: [[-35183336, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_iss/ISS_stationary.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_iss"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_iss",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "20_P4_Truss",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "23_S4_Truss",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "20_P4_Truss_01",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "20_P4_Truss_02",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "32_S6_Truss_01",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "32_S6_Truss_02",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "23_S4_Truss_01",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "23_S4_Truss_02",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "08_P6_Truss_01",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "align",
      joint: "08_P6_Truss_02",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("RapidScat_dish");
      e.setRate(Pioneer.MathUtils.degToRad(108));
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
      e.setCoverage(new Pioneer.Interval(Number.NEGATIVE_INFINITY, 524890952));
      const i = t.addController(Pioneer.SpinController);
      i.setJoint("COWVR_top_spin");
      i.setRate(Pioneer.MathUtils.degToRad(180));
      i.setAxis(Pioneer.Vector3.YAxis, true);
      i.setClampedToRealTime(true);
      EntityUtils.EntityUtils.showSubObjectDuringInterval(t, "Ecostress", 584127348, Number.POSITIVE_INFINITY);
      EntityUtils.EntityUtils.showSubObjectDuringInterval(t, "EMIT", 711345507, Number.POSITIVE_INFINITY);
      EntityUtils.EntityUtils.showSubObjectDuringInterval(t, "OCO3", 610718469, Number.POSITIVE_INFINITY);
      EntityUtils.EntityUtils.showSubObjectDuringInterval(t, "45_RapidScat", 465418867, 575406069);
      EntityUtils.EntityUtils.showSubObjectDuringInterval(t, "COWVR_TEMPEST", 693360069, Number.POSITIVE_INFINITY);
    }
  },
  sc_iss_cowvr_tempest: {
    groups: ["instrument", "sc_iss"],
    occlusionRadius: 8e-4,
    extentsRadius: .0012,
    label: "COWVR/TEMPEST",
    parents: [[693360069, "sc_iss"]],
    controllers: [{
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      position: new Pioneer.Vector3(.01455, -.00235, .01402),
      coverage: [693360069, Number.POSITIVE_INFINITY]
    }],
    postCreateFunction: t => {
      t.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(693360069, Number.POSITIVE_INFINITY));
    }
  },
  sc_iss_ecostress: {
    groups: ["instrument", "sc_iss"],
    occlusionRadius: .001,
    extentsRadius: .0012,
    label: "ECOSTRESS",
    parents: [[584127348, "sc_iss"]],
    controllers: [{
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      position: new Pioneer.Vector3(.0200195, -.00202631, .0161099),
      coverage: [584127348, Number.POSITIVE_INFINITY]
    }],
    postCreateFunction: t => {
      t.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(584127348, Number.POSITIVE_INFINITY));
    }
  },
  sc_iss_emit: {
    groups: ["instrument", "sc_iss"],
    occlusionRadius: 8e-4,
    extentsRadius: .0013,
    label: "EMIT",
    parents: [[711345507, "sc_iss"]],
    controllers: [{
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      position: new Pioneer.Vector3(.024, -.00225, .00325),
      coverage: [711345507, Number.POSITIVE_INFINITY]
    }],
    postCreateFunction: t => {
      t.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(711345507, Number.POSITIVE_INFINITY));
    }
  },
  sc_iss_oco_3: {
    groups: ["instrument", "sc_iss"],
    occlusionRadius: 8e-4,
    extentsRadius: .0012,
    label: "OCO-3",
    parents: [[610718469, "sc_iss"]],
    controllers: [{
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      position: new Pioneer.Vector3(.0156458, -.00195982, .0200232),
      coverage: [610718469, Number.POSITIVE_INFINITY]
    }],
    postCreateFunction: t => {
      t.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(610718469, Number.POSITIVE_INFINITY));
    }
  },
  sc_iss_rapidscat: {
    groups: ["instrument", "sc_iss"],
    occlusionRadius: 8e-4,
    extentsRadius: 2e-4,
    label: "RapidScat",
    parents: [[465418867.184, "sc_iss"], [575406069.184, ""]],
    controllers: [{
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      position: new Pioneer.Vector3(-.0100725, -.00133401, .0162145),
      coverage: [465418867.184, 575406069.184]
    }],
    postCreateFunction: t => {
      t.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(465418867.184, 575406069.184));
    }
  },
  sc_ixpe: {
    groups: ["earth", "spacecraft", "telescope"],
    occlusionRadius: .0055,
    extentsRadius: .0026,
    label: "IXPE",
    parents: [[692324766.6007013, "earth"]],
    trail: {
      length: 5400
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ixpe/ixpe.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_ixpe"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_jason_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0014,
    extentsRadius: .004,
    label: "Jason-1",
    parents: [[61013725, "earth"], [425835792, ""]],
    trail: {
      length: 6744.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ostm/ostm.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_jason_1/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_jason_1",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_jason_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0014,
    extentsRadius: .004,
    label: "OSTM/Jason-2",
    parents: [[344589947.18311954, "earth"], [623851269.182, ""]],
    trail: {
      length: 6744.25
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ostm/ostm.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_jason_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_jason_2",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_jason_3: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0014,
    extentsRadius: .004,
    label: "Jason-3",
    parents: [[506497796.18443054, "earth"]],
    trail: {
      length: 6721
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_ostm/ostm.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_jason_3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_jason_3",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_jwst: {
    groups: ["earth", "spacecraft", "telescope"],
    radius: .01,
    label: "James Webb Space Telescope",
    parents: [[693708549.184, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_jwst/webb_deployed.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_jwst/earth/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, 694937889.184],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_jwst/webb_stowed.gltf");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_jwst/webb_deployed.gltf");
      }
    }]
  },
  sc_landsat_1: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Landsat 1",
    parents: [[-865949142, "earth"], [-693791978, ""]],
    trail: {
      length: 7022
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_1"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_landsat_2: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Landsat 2",
    parents: [[-787078921, "earth"], [-563241570, ""]],
    trail: {
      length: 6190
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_2"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_landsat_3: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Landsat 3",
    parents: [[-688755821, "earth"], [-514943957, ""]],
    trail: {
      length: 6189
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_3"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_landsat_4: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Landsat 4",
    parents: [[-551033969, "earth"], [45918681, ""]],
    trail: {
      length: 5928
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_4"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_landsat_5: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Landsat 5",
    parents: [[-499706458, "earth"], [423705617, ""]],
    trail: {
      length: 5923
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_5"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_landsat_7: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .012,
    label: "Landsat 7",
    parents: [[-22517306, "earth"], [802267269, ""]],
    trail: {
      length: 5929
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_landsat_7/LandSat7.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_7"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_landsat_7",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_landsat_8: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .0095,
    label: "Landsat 8",
    parents: [[413881382, "earth"]],
    trail: {
      length: 5928
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_landsat_8/LandSat8.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_8"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_landsat_8",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_landsat_9: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .015,
    label: "Landsat 9",
    parents: [[686043940, "earth"]],
    trail: {
      length: 5940
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_landsat_9/Landsat9.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_landsat_9"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_landsat_9",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_list: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "LIST",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5933.33
    },
    controllers: [{
      type: "dynamo",
      url: "sc_list"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_m_cubed: {
    groups: ["earth", "spacecraft"],
    radius: 1e-4,
    label: "M-Cubed",
    parents: [[373032066.182, "earth"]],
    trail: {
      length: 5768.333333333333
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_m_cubed/mCubed.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_m_cubed"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_m_cubed",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_mcubed_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 1e-4,
    extentsRadius: 2e-4,
    label: "MCubed-2",
    parents: [[439589738, "earth"], [835174641, ""]],
    trail: {
      length: 5861
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mcubed_2/M-Cubed2.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mcubed_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_mcubed_2",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_mms_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0017,
    extentsRadius: .013,
    label: "MMS 1",
    parents: [[479519767.1855569, "earth"]],
    trail: {
      length: 85994
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mms/MMS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mms_1"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .00556
    }]
  },
  sc_mms_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0017,
    extentsRadius: .013,
    label: "MMS 2",
    parents: [[479519767.1855569, "earth"]],
    trail: {
      length: 85962
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mms/MMS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mms_2"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .00556
    }]
  },
  sc_mms_3: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0017,
    extentsRadius: .013,
    label: "MMS 3",
    parents: [[479519767.1855569, "earth"]],
    trail: {
      length: 86347
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mms/MMS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mms_3"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .00556
    }]
  },
  sc_mms_4: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0017,
    extentsRadius: .013,
    label: "MMS 4",
    parents: [[479519767.1855569, "earth"]],
    trail: {
      length: 86024
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mms/MMS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mms_4"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.YAxisNeg,
      periodInHours: .00556
    }]
  },
  sc_neo_surveyor: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .004,
    extentsRadius: .006,
    label: "NEO Surveyor",
    parents: [[874108800, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_neo_surveyor/neosurveyor.gltf",
      translate: new Pioneer.Vector3(0, 0, -5e-4),
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_neo_surveyor/earth"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_neo_surveyor/ori"
    }]
  },
  sc_nisar: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .006,
    extentsRadius: .017,
    label: "NISAR",
    parents: [[757339269, "earth"]],
    trail: {
      length: 5573
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_nisar/Nisar.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_nisar"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_nisar",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_noaa_14: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 14",
    parents: [[-157942275, "earth"], [233225989, ""]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_14"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_15: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 15",
    parents: [[-51652265, "earth"], [808907889, ""]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_15"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_16: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 16",
    parents: [[22819972, "earth"], [455587267, ""]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_16"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_17: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 17",
    parents: [[78218948, "earth"], [418867267, ""]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_17"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_18: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 18",
    parents: [[169866395, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_18"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_19: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 19",
    parents: [[287191476, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_19"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_noaa_20: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 20",
    parents: [[564276620, "earth"]],
    trail: {
      length: 5933
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_noaa_20/noaa20.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_20"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_noaa_20",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        axis: Pioneer.Vector3.YAxis,
        target: "earth"
      }
    }, {
      type: "align",
      joint: "Part__Panel_011001",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        axis: Pioneer.Vector3.ZAxisNeg,
        target: "sun"
      }
    }]
  },
  sc_noaa_21: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "NOAA 21",
    parents: [[721352468, "earth"]],
    trail: {
      length: 5933
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_noaa_21/noaa21.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_noaa_21"
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_noaa_21",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        axis: Pioneer.Vector3.YAxis,
        target: "earth"
      }
    }, {
      type: "align",
      joint: "Panels_Lo_Res002_Cylinder001",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        axis: Pioneer.Vector3.YAxis,
        target: "sun"
      }
    }]
  },
  sc_nustar: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .006,
    extentsRadius: .006,
    label: "NuSTAR",
    parents: [[392875303.185, "earth"]],
    trail: {
      length: 5798.66
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_nustar/nustar.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_nustar"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.XAxis,
        target: "sun",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_oco_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0021,
    extentsRadius: .004,
    label: "OCO-2",
    parents: [[457567050.184, "earth"]],
    trail: {
      length: 5933.333333333333
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_oco_2/oco2.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_oco_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_pace: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .004,
    label: "PACE",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_pace/pace.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_pace"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_pace",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_path: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "PATH",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_path"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_polar: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0012,
    extentsRadius: .005,
    label: "Polar",
    parents: [[-121504384, "earth"], [262694890, ""]],
    trail: {
      length: 66571
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_polar/polar.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_polar/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_polar",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_prefire_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 127431e-9,
    extentsRadius: 49617e-8,
    label: "PREFIRE-1",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_prefire/prefire.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_prefire_1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_prefire_1",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_prefire_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 127431e-9,
    extentsRadius: 49617e-8,
    label: "PREFIRE-2",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_prefire/prefire.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_prefire_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_prefire_2",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_quikscat: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0016,
    extentsRadius: .0018,
    label: "QuikSCAT",
    parents: [[344589947.18311954, "earth"], [591710469.182, ""]],
    trail: {
      length: 6061.33
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_quikscat/QuikSCAT.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_quikscat"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_quikscat",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_race: {
    groups: ["earth", "spacecraft"],
    radius: 15e-5,
    label: "RACE",
    parents: [[467726467.182, "earth"], [467812867.182, ""]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_race"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_raincube: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 35e-5,
    extentsRadius: 5e-4,
    label: "RainCube",
    parents: [[608189026.1856545, "earth"], [662040069.184, ""]],
    trail: {
      length: 5743
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_raincube/Raincube.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_raincube"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_raincube",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_rax_2: {
    groups: ["earth", "spacecraft"],
    radius: 2e-4,
    label: "RAX-2",
    parents: [[373067348.182, "earth"], [418824067.186, ""]],
    trail: {
      length: 5743
    },
    controllers: [{
      type: "dynamo",
      url: "sc_rax_2"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_rbsp_a: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Van Allen Probe A",
    parents: [[399585967.183, "earth"], [624628869.182, ""]],
    trail: {
      length: 32214
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_rbsp/rbsp.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_rbsp_a"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_rbsp_a",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_rbsp_b: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "Van Allen Probe B",
    parents: [[399585967.183, "earth"], [616766469.184, ""]],
    trail: {
      length: 32574
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_rbsp/rbsp.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_rbsp_b"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_rbsp_b",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_roman_space_telescope: {
    groups: ["earth", "spacecraft", "telescope"],
    occlusionRadius: .0022,
    extentsRadius: .0064,
    label: "Nancy Grace Roman Space Telescope",
    dependents: ["l2"],
    parents: [[841363150, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_roman_space_telescope/roman.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_roman_space_telescope/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_sac_d: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .0045,
    label: "Aquarius",
    parents: [[360987666.185, "earth"], [486907267.185, ""]],
    trail: {
      length: 5884.25
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sac_d/aquarius.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sac_d"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_sac_d",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_sclp: {
    groups: ["earth", "spacecraft"],
    radius: .004,
    label: "SCLP",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sclp"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_sdo: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0022,
    extentsRadius: .00315,
    label: "SDO",
    parents: [[505918808.18474686, "earth"]],
    trail: {
      length: 86137.66
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sdo/sdo.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sdo"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_sdo",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_sentinel_6: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0026,
    extentsRadius: .0031,
    label: "Sentinel-6 Michael Freilich",
    parents: [[659322339.7879795, "earth"]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sentinel_6/Sentinel6.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sentinel_6"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_sentinel_6",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_sentinel_6b: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0026,
    extentsRadius: .0031,
    label: "Sentinel-6B",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: 5933.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sentinel_6/Sentinel6.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sentinel_6b"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_sentinel_6b",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_smap: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .009,
    label: "SMAP",
    parents: [[476542806.1849232, "earth"]],
    trail: {
      length: 5906.8
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_smap/SMAP.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_smap"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_smap",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("arm_etc");
      e.setRate(Pioneer.MathUtils.degToRad(87.6));
      e.setAxis(Pioneer.Vector3.YAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_soho: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00215,
    extentsRadius: .00425,
    label: "SOHO",
    parents: [[-128831107, "earth"]],
    trail: {
      length: 31536e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_soho/soho.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_soho"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_soho",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_solar_1: {
    groups: ["earth", "spacecraft", "l1"],
    occlusionRadius: .0015,
    extentsRadius: .01,
    label: "SOLAR-1",
    parents: [[811990990, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_solar_1/swfo.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_solar_1/earth"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sorce: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .001,
    extentsRadius: .0022,
    label: "SORCE",
    parents: [[344589947.18311954, "earth"], [635860869.185, ""]],
    trail: {
      length: 5812.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sorce/sorce.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sorce"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_sorce",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_spherex: {
    groups: ["earth", "spacecraft", "telescope"],
    radius: .002,
    label: "SPHEREx",
    parents: [[795026933, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_spherex/spherex.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_spherex"
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
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_starling_1: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 23e-5,
    extentsRadius: 76e-5,
    label: "Starling-1",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_starling/starling.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_starling_1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_starling_1",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_starling_2: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 23e-5,
    extentsRadius: 76e-5,
    label: "Starling-2",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_starling/starling.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_starling_2"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_starling_2",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_starling_3: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 23e-5,
    extentsRadius: 76e-5,
    label: "Starling-3",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_starling/starling.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_starling_3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_starling_3",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_starling_4: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 23e-5,
    extentsRadius: 76e-5,
    label: "Starling-4",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_starling/starling.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_starling_4"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_starling_4",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_sunrise_faye: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Faye",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_faye"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sunrise_jet: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Jet",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_jet"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sunrise_ein: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Ein",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_ein"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sunrise_edward: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Edward",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_edward"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sunrise_spike: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Spike",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_spike"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_sunrise_bebop: {
    groups: ["earth", "spacecraft"],
    radius: 5e-4,
    label: "SunRISE Bebop",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_sunrise/sunrise.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_sunrise_bebop"
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
        targetAxis: Pioneer.Vector3.ZAxis,
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_suomi_npp: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0022,
    extentsRadius: .008,
    label: "Suomi NPP",
    parents: [[373076770, "earth"]],
    trail: {
      length: 5798.66
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_npp/NPP.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_suomi_npp"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_suomi_npp",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_swift: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0028,
    extentsRadius: .0028,
    label: "Swift",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_swift"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_swot: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .005,
    extentsRadius: .009,
    label: "SWOT",
    parents: [[347025366.1839032, "earth"]],
    trail: {
      length: 5933
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_swot_v2/swot.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_swot"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_swot",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_tdrs_3: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 3",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86137.33
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_5: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 5",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86137.66
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_5"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_6: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 6",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86137.66
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_6"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_7: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 7",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86151
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_7"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_8: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 8",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86151.2
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_8"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_9: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 9",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86151
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_9"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_10: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 10",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 86151.2
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_10"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_11: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 11",
    parents: [[412868947.185, "earth"]],
    trail: {
      length: 86151
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_11"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_12: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 12",
    parents: [[443808067.185, "earth"]],
    trail: {
      length: 86151
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_12"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tdrs_13: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0085,
    extentsRadius: .0085,
    label: "TDRS 13",
    parents: [[556338669.183, "earth"]],
    trail: {
      length: 86151
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tdrs/tdrs.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tdrs_13"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_tempo: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .003021525,
    extentsRadius: .00975015,
    label: "TEMPO",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tempo/tempo.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tempo"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tempo",
        axis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_terra: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0034,
    extentsRadius: .012,
    label: "Terra",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 5933.33
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_terra/Terra.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_terra"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_terra",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_tess: {
    groups: ["earth", "spacecraft", "telescope"],
    occlusionRadius: .002,
    extentsRadius: .003,
    label: "TESS",
    parents: [[577366932.3626, "earth"]],
    trail: {
      length: 591840
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tess/TESS.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tess/earth/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_themis_a: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: .0017,
    label: "THEMIS A",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 98428
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_themis/themis.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_themis_a"
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
    }]
  },
  sc_themis_d: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: .0017,
    label: "THEMIS D",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 114807
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_themis/themis.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_themis_d"
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
    }]
  },
  sc_themis_e: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: .0017,
    label: "THEMIS E",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 105907.5
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_themis/themis.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_themis_e"
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
    }]
  },
  sc_timed: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0015,
    extentsRadius: .005,
    label: "TIMED",
    parents: [[344589947.18311954, "earth"]],
    trail: {
      length: 5933
    },
    controllers: [{
      type: "dynamo",
      url: "sc_timed"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_trmm: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00255,
    extentsRadius: .0073,
    label: "TRMM",
    parents: [[-66052736.817, "earth"], [482328067.186, ""]],
    trail: {
      length: 5545.6
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_trmm/TRMM.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: .00111201719,
      semiMajorAxis: 6744.5,
      meanAngularMotion: .0011382582,
      meanAnomalyAtEpoch: 0,
      inclination: Math.PI / 180 * 30,
      longitudeOfAscendingNode: 0,
      argumentOfPeriapsis: 0,
      coverage: [-66052736.817, 482328067.186]
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_trmm",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_tropics_01: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 18e-5,
    extentsRadius: 36e-5,
    label: "TROPICS-01",
    parents: [[678364666, "earth"], [756086469, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tropics/tropics.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tropics_01"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tropics_01",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "solar_rotate",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("microwave_radiometer");
      e.setRate(Math.PI);
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_tropics_03: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 18e-5,
    extentsRadius: 36e-5,
    label: "TROPICS-03",
    parents: [[738358900, "earth"], [816134469, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tropics/tropics.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tropics_03"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tropics_03",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "solar_rotate",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("microwave_radiometer");
      e.setRate(Math.PI);
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_tropics_05: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 18e-5,
    extentsRadius: 36e-5,
    label: "TROPICS-05",
    parents: [[736805769, "earth"], [815616069, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tropics/tropics.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tropics_05"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tropics_05",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "solar_rotate",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("microwave_radiometer");
      e.setRate(Math.PI);
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_tropics_06: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 18e-5,
    extentsRadius: 36e-5,
    label: "TROPICS-06",
    parents: [[736784406, "earth"], [795312069, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tropics/tropics.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tropics_06"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tropics_06",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "solar_rotate",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("microwave_radiometer");
      e.setRate(Math.PI);
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_tropics_07: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: 18e-5,
    extentsRadius: 36e-5,
    label: "TROPICS-07",
    parents: [[738353510, "earth"], [744163269, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_tropics/tropics.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_tropics_07"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_tropics_07",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "align",
      joint: "solar_rotate",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxis
      }
    }],
    postCreateFunction: t => {
      const e = t.addController(Pioneer.SpinController);
      e.setJoint("microwave_radiometer");
      e.setRate(Math.PI);
      e.setAxis(Pioneer.Vector3.ZAxis, true);
      e.setClampedToRealTime(true);
    }
  },
  sc_uars: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00535,
    extentsRadius: .00535,
    label: "UARS",
    parents: [[-261769807, "earth"], [187876864, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_uars"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_wind: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .0012,
    extentsRadius: .0075,
    label: "WIND",
    parents: [[543931270, "earth"]],
    trail: {
      length: 16485927
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_wind/wind.gltf",
      shadowEntities: ["earth", "moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_wind/earth/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "velocity",
        target: "sc_wind",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }]
  },
  sc_wise: {
    groups: ["earth", "spacecraft"],
    occlusionRadius: .00142,
    extentsRadius: .00142,
    label: "WISE",
    parents: [[314075404, "earth"], [776402558, ""]],
    trail: {
      length: 5715.4
    },
    controllers: [{
      type: "dynamo",
      url: "sc_wise"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
