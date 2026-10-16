/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 127 个实体/参考系（如 "1_ceres"、"101955_bennu"、"11351_leucus"、"12923_zephyr"、"134340_pluto"、"134340_pluto_barycenter"），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:805628-854969.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  "1_ceres": {
    groups: ["dwarf planets"],
    radius: 473,
    label: "Ceres",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 482.6,
      polarRadius: 445.6,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "1_ceres/color_$SIZE_$FACE.jpg",
          sizes: [16, 512, 4096]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "1_ceres/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "101955_bennu": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .246,
    label: "Bennu",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/101955_bennu/Bennu.gltf",
      rotate: [{
        x: 83
      }, {
        z: -168
      }],
      scale: 9956e-7
    },
    controllers: [{
      type: "dynamo",
      url: "101955_bennu/sun/orb"
    }, {
      type: "dynamo",
      url: "101955_bennu/ori"
    }]
  },
  "11351_leucus": {
    groups: ["asteroids"],
    radius: 17.0775,
    label: "Leucus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 17.0775
    },
    controllers: [{
      type: "dynamo",
      url: "11351_leucus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 445.732
    }]
  },
  "12923_zephyr": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 1.03,
    label: "Zephyr",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.03, 1.03, 1.03]
    },
    controllers: [{
      type: "dynamo",
      url: "12923_zephyr/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.891
    }]
  },
  "134340_pluto": {
    groups: ["dwarf planets", "moons", "134340_pluto_barycenter"],
    radius: 1187,
    label: "Pluto",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 1187,
      polarRadius: 1187,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "134340_pluto/color_$SIZE_$FACE.png",
          sizes: [4, 512, 4096]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "134340_pluto/134340_pluto_barycenter/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "charon"
      },
      secondary: {
        type: "velocity",
        axis: Pioneer.Vector3.YAxis,
        target: "charon"
      }
    }]
  },
  "134340_pluto_barycenter": {
    groups: ["134340_pluto", "barycenters"],
    occlusionRadius: .001,
    extentsRadius: 28e3,
    systemRadius: 130153,
    label: "Barycenter",
    trail: {
      length: void 0
    },
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    controllers: [{
      type: "dynamo",
      url: "134340_pluto_barycenter/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }],
    postCreateFunction: t => {
      const e = t.getComponent(Pioneer.DivComponent);
      e && e.setVisibleInterval(Pioneer.VisibleInterval.AlwaysVisible);
      t.setCanOcclude(false);
    }
  },
  "136108_haumea": {
    groups: ["dwarf planets", "TNOs"],
    radius: 816,
    label: "Haumea",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/136108_haumea/haumea.gltf",
      scale: [1, 1, 1]
    },
    controllers: [{
      type: "dynamo",
      url: "136108_haumea/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  "136199_eris": {
    groups: ["dwarf planets", "TNOs"],
    radius: 1163,
    label: "Eris",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 1163,
      polarRadius: 1163,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "136199_eris/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "136199_eris/sun/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(-.8250880114871078, .34336511665279956, -.17771754840108506, .4120032074590774)
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "dysnomia",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  "136472_makemake": {
    groups: ["dwarf planets", "TNOs"],
    radius: 715,
    label: "Makemake",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 717,
      polarRadius: 710,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "136472_makemake/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "136472_makemake/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  "14827_hypnos": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .4535,
    label: "Hypnos",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.4535, .4535, .4535]
    },
    controllers: [{
      type: "dynamo",
      url: "14827_hypnos/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "15094_polymele": {
    groups: ["asteroids"],
    radius: 10.5375,
    label: "Polymele",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 10.5375
    },
    controllers: [{
      type: "dynamo",
      url: "15094_polymele/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 5.8607
    }]
  },
  "1566_icarus": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .805,
    label: "Icarus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.805, .8, .585]
    },
    controllers: [{
      type: "dynamo",
      url: "1566_icarus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.2726
    }]
  },
  "16_psyche": {
    groups: ["asteroids"],
    radius: 125,
    label: "16 Psyche",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/16_psyche/psycheAsteroid.gltf",
      scale: [100, 100, 100],
      rotate: [{
        x: 90
      }, {
        z: -120
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "16_psyche/sun/orb"
    }, {
      type: "dynamo",
      url: "16_psyche/ori"
    }]
  },
  "1620_geographos": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 2.5,
    label: "Geographos",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2.5, 1, 1.05]
    },
    controllers: [{
      type: "dynamo",
      url: "1620_geographos/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 5.224
    }]
  },
  "162173_ryugu": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .45,
    label: "Ryugu",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/162173_ryugu/ryugu.gltf",
      rotate: [{
        x: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "ssd/162173_ryugu/sun/orb"
    }, {
      type: "dynamo",
      url: "162173_ryugu/ori"
    }]
  },
  "1862_apollo": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .75,
    label: "Apollo",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.75, .75, .75]
    },
    controllers: [{
      type: "dynamo",
      url: "1862_apollo/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.065
    }]
  },
  "1981_midas": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .975,
    label: "Midas",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.975, .975, .975]
    },
    controllers: [{
      type: "dynamo",
      url: "1981_midas/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 5.22
    }]
  },
  "1991_vg": {
    groups: ["asteroids", "NEOs"],
    radius: .00425,
    label: "1991 VG",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.00425, .00425, .00425]
    },
    controllers: [{
      type: "dynamo",
      url: "1991_vg/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "1993_hd": {
    groups: ["asteroids", "asteroid belt"],
    radius: .005,
    label: "1993 HD",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "1993_hd/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "1994_cc_a": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .325,
    label: "1994 CC",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.325, .325, .325]
    },
    controllers: [{
      type: "dynamo",
      url: "1994_cc_a/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.3886
    }]
  },
  "1996_xb27": {
    groups: ["asteroids", "NEOs"],
    radius: .042,
    label: "1996 XB<sub>27</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.042, .042, .042]
    },
    controllers: [{
      type: "dynamo",
      url: "1996_xb27/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 1.195
    }]
  },
  "1998_ky26": {
    groups: ["asteroids", "NEOs"],
    radius: .015,
    label: "1998 KY<sub>26</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.015, .015, .015]
    },
    controllers: [{
      type: "dynamo",
      url: "1998_ky26/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .1784
    }]
  },
  "1998_ml14": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .5,
    label: "1998 ML<sub>14</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.5, .5, .5]
    },
    controllers: [{
      type: "dynamo",
      url: "1998_ml14/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 14.28
    }]
  },
  "1998_qe2": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 1.375,
    label: "1998 QE<sub>2</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.375, 1.375, 1.375]
    },
    controllers: [{
      type: "dynamo",
      url: "1998_qe2/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 4.749
    }]
  },
  "1999_ao10": {
    groups: ["asteroids", "NEOs"],
    radius: .025,
    label: "1999 AO<sub>10</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.025, .025, .025]
    },
    controllers: [{
      type: "dynamo",
      url: "1999_ao10/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "1999_cg9": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "1999 CG<sub>9</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "1999_cg9/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "1999_vx25": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "1999 VX<sub>25</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "1999_vx25/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2_pallas": {
    groups: ["asteroids", "asteroid belt"],
    radius: 291,
    label: "Pallas",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [291, 278, 250]
    },
    controllers: [{
      type: "dynamo",
      url: "2_pallas/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 7.8132
    }]
  },
  "2000_ae205": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2000 AE<sub>205</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2000_ae205/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2000_lg6": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2000 LG<sub>6</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2000_lg6/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2000_sg344": {
    groups: ["asteroids", "NEOs"],
    radius: .0185,
    label: "2000 SG<sub>344</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.0185, .0185, .0185]
    },
    controllers: [{
      type: "dynamo",
      url: "2000_sg344/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2001_bb16": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2001 BB<sub>16</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2001_bb16/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2001_fr85": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2001 FR<sub>85</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2001_fr85/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2001_gp2": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2001 GP<sub>2</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2001_gp2/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2001_qj142": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2001 QJ<sub>142</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2001_qj142/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2001_sn263_a": {
    groups: ["asteroids", "NEOs"],
    radius: 1.45,
    label: "(153591) 2001 SN<sub>263</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.4, 1.35, 1.45]
    },
    controllers: [{
      type: "dynamo",
      url: "2001_sn263_a/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.423
    }]
  },
  "2003_sm84": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2003 SM<sub>84</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2003_sm84/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2003_uv11": {
    groups: ["asteroids", "NEOs"],
    radius: .13,
    label: "(503941) 2003 UV<sub>11</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.13, .13, .13]
    },
    controllers: [{
      type: "dynamo",
      url: "2003_uv11/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 18.25
    }]
  },
  "2003_yn107": {
    groups: ["asteroids", "NEOs"],
    radius: .01,
    label: "2003 YN<sub>107</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.01, .01, .01]
    },
    controllers: [{
      type: "dynamo",
      url: "2003_yn107/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2005_er95": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2003 ER<sub>95</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2005_er95/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2005_lc": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2005 LC",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2005_lc/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2005_qp87": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2005 QP<sub>87</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2005_qp87/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2005_yu55": {
    groups: ["asteroids", "NEOs"],
    radius: .18,
    label: "2005 YU<sub>55</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.18, .18, .18]
    },
    controllers: [{
      type: "dynamo",
      url: "2005_yu55/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 18
    }]
  },
  "2006_bz147": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2006 BZ<sub>147</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2006_bz147/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2006_jy26": {
    groups: ["asteroids", "NEOs"],
    radius: .00475,
    label: "2006 JY<sub>26</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.00475, .00475, .00475]
    },
    controllers: [{
      type: "dynamo",
      url: "2006_jy26/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2006_qq56": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2006 QQ<sub>56</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2006_qq56/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2006_rh120": {
    groups: ["asteroids", "NEOs"],
    radius: .00125,
    label: "2006 RH<sub>120</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.00125, .00125, .00125]
    },
    controllers: [{
      type: "dynamo",
      url: "2006_rh120/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .04583
    }]
  },
  "2006_ub17": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2006 UB<sub>17</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2006_ub17/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2007_tf15": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2007 TF<sub>15</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2007_tf15/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2007_un12": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2007 UN<sub>12</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2007_un12/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2007_vu6": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2007 VU<sub>6</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2007_vu6/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_bt2": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 BT<sub>2</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_bt2/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_cx118": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 CX<sub>118</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_cx118/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_ea9": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 EA<sub>9</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_ea9/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_el": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 EL",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_el/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_hu4": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 HU<sub>4</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_hu4/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_jl24": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 JL<sub>24</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_jl24/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .05385
    }]
  },
  "2008_kt": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 KT",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_kt/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_tc3": {
    groups: ["asteroids", "NEOs"],
    radius: .00205,
    label: "2008 TC<sub>3</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.00205, .00205, .00205]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_tc3/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .0269409
    }]
  },
  "2008_ts10": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2008 TS<sub>10</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_ts10/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2008_ua202": {
    groups: ["asteroids", "NEOs"],
    radius: .025,
    label: "2008 UA<sub>202</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.025, .025, .025]
    },
    controllers: [{
      type: "dynamo",
      url: "2008_ua202/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2009_bd": {
    groups: ["asteroids", "NEOs"],
    radius: .0055,
    label: "2009 BD",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.0055, .0055, .0055]
    },
    controllers: [{
      type: "dynamo",
      url: "2009_bd/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2009_os5": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2009 OS<sub>5</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2009_os5/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2009_rt1": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2009 RT<sub>1</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2009_rt1/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2009_yf": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2009 YF",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2009_yf/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_an61": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 AN<sub>61</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_an61/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_dj": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 DJ",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_dj/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_jw34": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 JW<sub>34</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_jw34/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_tg19": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 TG<sub>19</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_tg19/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_tn167": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 TN<sub>167</sub>",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_tn167/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2010_ub": {
    groups: ["asteroids", "NEOs"],
    radius: .005,
    label: "2010 UB",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.005, .005, .005]
    },
    controllers: [{
      type: "dynamo",
      url: "2010_ub/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2063_bacchus": {
    groups: ["asteroids", "NEOs"],
    radius: .555,
    label: "Bacchus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.555, .265, .25]
    },
    controllers: [{
      type: "dynamo",
      url: "2063_bacchus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 14.904
    }]
  },
  "21_lutetia": {
    groups: ["asteroids", "asteroid belt"],
    radius: 60.5,
    label: "Lutetia",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [60.5, 50.5, 37.5]
    },
    controllers: [{
      type: "dynamo",
      url: "21_lutetia/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 8.1655
    }]
  },
  "2101_adonis": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .2615,
    label: "Adonis",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.2615, .2615, .2615]
    },
    controllers: [{
      type: "dynamo",
      url: "2101_adonis/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "2102_tantalus": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .8245,
    label: "Tantalus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.8245, .8245, .8245]
    },
    controllers: [{
      type: "dynamo",
      url: "2102_tantalus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.384
    }]
  },
  "2135_aristaeus": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .5,
    label: "Aristaeus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.5, .5, .5]
    },
    controllers: [{
      type: "dynamo",
      url: "2135_aristaeus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "216_kleopatra": {
    groups: ["asteroids", "asteroid belt"],
    radius: 138,
    label: "Kleopatra",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [138, 47, 39]
    },
    controllers: [{
      type: "dynamo",
      url: "216_kleopatra/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 5.385
    }]
  },
  "21900_orus": {
    groups: ["asteroids"],
    radius: 25.405,
    label: "Orus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 25.405
    },
    controllers: [{
      type: "dynamo",
      url: "21900_orus/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 13.45
    }]
  },
  "225088_gonggong": {
    groups: ["dwarf planets", "TNOs"],
    radius: 615,
    label: "225088 Gonggong",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 615,
      polarRadius: 596.55,
      planetographic: false
    },
    spheroidLOD: {},
    controllers: [{
      type: "dynamo",
      url: "225088_gonggong/sun/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.708308194360594, .645805766247582, .15064271534259474, .24195285986575663)
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 22.4,
      relativeToTime: 0
    }],
    postCreateFunction: t => {
      const e = t.getComponent(Pioneer.SpheroidLODComponent);
      e && e.setResourcesLoadedCallback(() => {
        e.getThreeJsMaterials().forEach(t => {
          t.defines.baseColor = true;
          t.uniforms.color.value.set(.463, .404, .306, 1);
        });
      });
    }
  },
  "225088_gonggong_i_xiangliu": {
    groups: ["225088_gonggong", "moons"],
    radius: 70,
    label: "Xiangliu",
    parents: [[Number.NEGATIVE_INFINITY, "225088_gonggong"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 70
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: .2908,
      semiMajorAxis: 24021,
      meanAngularMotion: 288342e-11,
      meanAnomalyAtEpoch: 0,
      inclination: 1.45001954256,
      longitudeOfAscendingNode: .55833082771,
      argumentOfPeriapsis: .1
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.708308194360594, .645805766247582, .15064271534259474, .24195285986575663)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.YAxis,
        target: "225088_gonggong"
      }
    }]
  },
  "2340_hathor": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .105,
    label: "Hathor",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.105, .105, .105]
    },
    controllers: [{
      type: "dynamo",
      url: "2340_hathor/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.35
    }]
  },
  "243_ida": {
    groups: ["asteroids", "asteroid belt"],
    radius: 29.9,
    label: "Ida",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [18.6 * 1.3, 25.4 * 1.3, 77.74],
      rotate: [{
        y: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "243_ida/sun/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.8728453580255966, .1876084386162498, -.08948587100888229, .4415159494547423)
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 4.634,
      relativeToTime: 0
    }]
  },
  "25143_itokawa": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .165,
    label: "Itokawa",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/25143_itokawa/itokawa.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "25143_itokawa/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12.132
    }]
  },
  "253_mathilde": {
    groups: ["asteroids", "asteroid belt"],
    radius: 33,
    label: "Mathilde",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [33, 24, 23]
    },
    controllers: [{
      type: "dynamo",
      url: "253_mathilde/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 417.7
    }]
  },
  "2867_steins": {
    groups: ["asteroids", "asteroid belt"],
    radius: 3.415,
    label: "Šteins",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3.415, 2.85, 2.21]
    },
    controllers: [{
      type: "dynamo",
      url: "2867_steins/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 6.049
    }]
  },
  "3_juno": {
    groups: ["asteroids", "asteroid belt"],
    radius: 160,
    label: "Juno",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [160, 133.5, 100]
    },
    controllers: [{
      type: "dynamo",
      url: "3_juno/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 7.21
    }]
  },
  "3122_florence": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 2.2,
    label: "Florence",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.2, 2.2, 2.2]
    },
    controllers: [{
      type: "dynamo",
      url: "3122_florence/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.3581
    }]
  },
  "3200_phaethon": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 2.9,
    label: "Phaethon",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2.9, 2.9, 2.9]
    },
    controllers: [{
      type: "dynamo",
      url: "3200_phaethon/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.604
    }]
  },
  "3362_khufu": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .35,
    label: "Khufu",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.35, .35, .35]
    },
    controllers: [{
      type: "dynamo",
      url: "3362_khufu/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "3548_eurybates": {
    groups: ["asteroids"],
    radius: 31.9425,
    label: "Eurybates",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 31.9425
    },
    controllers: [{
      type: "dynamo",
      url: "3548_eurybates/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 8.711
    }]
  },
  "367943_duende": {
    groups: ["asteroids", "NEOs"],
    radius: .02,
    label: "Duende",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.01, .01, .02]
    },
    controllers: [{
      type: "dynamo",
      url: "367943_duende/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 9.485
    }]
  },
  "37655_illapa": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .75,
    label: "Illapa",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.75, .75, .75]
    },
    controllers: [{
      type: "dynamo",
      url: "37655_illapa/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.6556
    }]
  },
  "4_vesta": {
    groups: ["asteroids", "asteroid belt"],
    radius: 262.7,
    label: "Vesta",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/4_vesta/4_vesta.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "4_vesta/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "4015_wilson-harrington": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 2,
    label: "Wilson-Harrington",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2]
    },
    controllers: [{
      type: "dynamo",
      url: "4015_wilson-harrington/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.5736
    }]
  },
  "4179_toutatis": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 2.13,
    label: "Toutatis",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.35, 1.015, 2.13]
    },
    controllers: [{
      type: "dynamo",
      url: "4179_toutatis/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 176
    }]
  },
  "4183_cuno": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 1.8255,
    label: "Cuno",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.8255, 1.8255, 1.89255]
    },
    controllers: [{
      type: "dynamo",
      url: "4183_cuno/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.5595
    }]
  },
  "433_eros": {
    groups: ["asteroids", "NEOs"],
    radius: 8.42,
    label: "Eros",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/433_eros/433_eros.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "433_eros/sun/orb"
    }, {
      type: "dynamo",
      url: "433_eros/ori"
    }]
  },
  "4450_pan": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .5,
    label: "Pan",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.5, .5, .5]
    },
    controllers: [{
      type: "dynamo",
      url: "4450_pan/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 56.48
    }]
  },
  "4486_mithra": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: 1.175,
    label: "Mithra",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.175, .825, .72]
    },
    controllers: [{
      type: "dynamo",
      url: "4486_mithra/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 67.5
    }]
  },
  "4769_castalia": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .9,
    label: "Castalia",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.4, .4, .9]
    },
    controllers: [{
      type: "dynamo",
      url: "4769_castalia/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 4.095
    }]
  },
  "486958_arrokoth": {
    groups: ["TNOs"],
    radius: 15,
    label: "Arrokoth",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/486958_arrokoth/mu69.gltf",
      scale: [1, 1, 1],
      rotate: [{
        x: -110
      }, {
        y: 180
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "486958_arrokoth/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "spin",
      axis: new Pioneer.Vector3(-6.121453676996425e-10, .9396926211599973, .34202014229786787),
      periodInHours: 13
    }],
    postCreateFunction: t => {
      const e = t.getController(Pioneer.SpinController);
      null !== e && (e.setReferenceAngle(0), e.setReferenceTime(599590968));
    }
  },
  "5011_ptah": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .78,
    label: "Ptah",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.78, .78, .78]
    },
    controllers: [{
      type: "dynamo",
      url: "5011_ptah/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 12
    }]
  },
  "52246_donaldjohanson": {
    groups: ["asteroids"],
    radius: 1.9475,
    label: "Donaldjohanson",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.9475
    },
    controllers: [{
      type: "dynamo",
      url: "52246_donaldjohanson/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  "5535_annefrank": {
    groups: ["asteroids"],
    radius: 2.412,
    label: "Annefrank",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2.412
    },
    controllers: [{
      type: "dynamo",
      url: "5535_annefrank/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 15.12
    }]
  },
  "617_patroclus": {
    groups: ["asteroids", "617_patroclus_barycenter"],
    radius: 64,
    label: "Patroclus",
    parents: [[Number.NEGATIVE_INFINITY, "617_patroclus_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [64, 58, 49],
      shadowEntities: ["menoetius"]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: 0,
      semiMajorAxis: 664,
      meanAngularMotion: 1697791e-11,
      meanAnomalyAtEpoch: Math.PI,
      inclination: 1.97244894756,
      argumentOfPeriapsis: 0,
      longitudeOfAscendingNode: 0
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5518423804133266, .8339484319667214, 0, 0)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "menoetius"
      }
    }]
  },
  "617_patroclus_barycenter": {
    groups: ["asteroids"],
    radius: 664,
    label: "Patroclus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "617_patroclus/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }],
    postCreateFunction: t => {
      t.setCanOcclude(false);
    }
  },
  "6239_minos": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .237,
    label: "Minos",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.237, .237, .237]
    },
    controllers: [{
      type: "dynamo",
      url: "6239_minos/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 3.5558
    }]
  },
  "6489_golevka": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .265,
    label: "Golevka",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.265, .265, .265]
    },
    controllers: [{
      type: "dynamo",
      url: "6489_golevka/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 6.026
    }]
  },
  "65803_didymos": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .39,
    label: "Didymos",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/65803_didymos/Didymos.gltf",
      rotate: [{
        z: 180
      }, {
        x: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "65803_didymos/sun/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(0, 1, 0, 0)
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.2593,
      relativeToTime: 0
    }]
  },
  "66391_moshup": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .766,
    label: "Moshup",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.766, .7475, .6735]
    },
    controllers: [{
      type: "dynamo",
      url: "66391_moshup/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 2.7645
    }]
  },
  "69230_hermes": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .425,
    label: "Hermes",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.425, .425, .425]
    },
    controllers: [{
      type: "dynamo",
      url: "69230_hermes/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 13.894
    }]
  },
  "90377_sedna": {
    groups: ["dwarf planets", "TNOs"],
    radius: 497.5,
    label: "Sedna",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [497.5, 497.5, 497.5]
    },
    controllers: [{
      type: "dynamo",
      url: "90377_sedna/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 10.273
    }]
  },
  "951_gaspra": {
    groups: ["asteroids", "asteroid belt"],
    radius: 9.1,
    label: "Gaspra",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/951_gaspra/gaspra.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "951_gaspra/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 7.042
    }]
  },
  "9969_braille": {
    groups: ["asteroids", "asteroid belt"],
    radius: 1.05,
    label: "Braille",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.05, .5, .5]
    },
    controllers: [{
      type: "dynamo",
      url: "9969_braille/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: 226.4
    }]
  },
  "99942_apophis": {
    groups: ["asteroids", "NEOs", "PHAs"],
    radius: .225,
    label: "Apophis",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/99942_apophis/apophis.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "99942_apophis/sun/orb"
    }, {
      type: "spin",
      axis: new Pioneer.Vector3(.20112425201023415, .46925803805904115, .8598522715968735),
      periodInHours: 30.4
    }]
  },
  "152830_dinkinesh": {
    groups: ["asteroids"],
    radius: .45,
    label: "Dinkinesh",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: .45
    },
    controllers: [{
      type: "dynamo",
      url: "152830_dinkinesh/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  charon: {
    groups: ["134340_pluto", "moons", "134340_pluto_barycenter"],
    radius: 603.5,
    label: "Charon",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    spheroid: {
      equatorialRadius: 603.5,
      polarRadius: 603.5,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "charon/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "charon/134340_pluto_barycenter/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "134340_pluto"
      },
      secondary: {
        type: "velocity",
        axis: Pioneer.Vector3.YAxis,
        target: "134340_pluto"
      }
    }]
  },
  dactyl: {
    groups: ["243_ida", "moons"],
    radius: .7,
    label: "Dactyl",
    parents: [[Number.NEGATIVE_INFINITY, "243_ida"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.8, .7, .6],
      rotate: [{
        z: 90
      }]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: 0,
      semiMajorAxis: 90,
      meanAngularMotion: 8726646e-11,
      meanAnomalyAtEpoch: 0,
      orientation: new Pioneer.Quaternion(.8728453580255966, .1876084386162498, -.08948587100888229, .4415159494547423)
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.8728453580255966, .1876084386162498, -.08948587100888229, .4415159494547423)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "243_ida"
      }
    }]
  },
  dimorphos: {
    groups: ["65803_didymos", "moons"],
    radius: .085,
    label: "Dimorphos",
    parents: [[Number.NEGATIVE_INFINITY, "65803_didymos"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/dimorphos/Dimorphos.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "dimorphos/65803_didymos/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "65803_didymos"
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.ZAxis,
        target: "65803_didymos",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  dysnomia: {
    groups: ["136199_eris", "moons"],
    radius: 307.5,
    label: "Dysnomia",
    parents: [[Number.NEGATIVE_INFINITY, "136199_eris"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 307.5
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: .0062,
      semiMajorAxis: 37273,
      meanAngularMotion: 460677e-11,
      meanAnomalyAtEpoch: 0,
      inclination: .79395027673,
      argumentOfPeriapsis: 3.15607888638,
      longitudeOfAscendingNode: 2.20086018676
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(-.8250880114871078, .34336511665279956, -.17771754840108506, .4120032074590774)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "136199_eris"
      }
    }]
  },
  hiiaka: {
    groups: ["136108_haumea", "moons"],
    radius: 160,
    label: "Hi'iaka",
    parents: [[Number.NEGATIVE_INFINITY, "136108_haumea"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [160, 160, 160]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: .0513,
      semiMajorAxis: 49880,
      meanAngularMotion: 148049e-11,
      meanAnomalyAtEpoch: 0,
      inclination: 2.20532822965,
      argumentOfPeriapsis: 0,
      longitudeOfAscendingNode: 0
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.45122023579401155, .8924126281098876, 0, 0)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "136108_haumea"
      }
    }]
  },
  hydra: {
    groups: ["134340_pluto", "moons", "134340_pluto_barycenter"],
    radius: 25,
    label: "Hydra",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [25, 25, 25],
      shadowEntities: ["134340_pluto"]
    },
    controllers: [{
      type: "dynamo",
      url: "hydra/134340_pluto_barycenter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kerberos: {
    groups: ["134340_pluto", "moons", "134340_pluto_barycenter"],
    radius: 8.25,
    label: "Kerberos",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [8.25, 8.25, 8.25],
      shadowEntities: ["134340_pluto"]
    },
    controllers: [{
      type: "dynamo",
      url: "kerberos/134340_pluto_barycenter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  menoetius: {
    groups: ["617_patroclus_barycenter", "moons"],
    radius: 58,
    label: "Menoetius",
    parents: [[Number.NEGATIVE_INFINITY, "617_patroclus_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [58, 54, 45],
      shadowEntities: ["617_patroclus"]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: 0,
      semiMajorAxis: 664,
      meanAngularMotion: 1697791e-11,
      meanAnomalyAtEpoch: 0,
      inclination: 1.97244894756,
      argumentOfPeriapsis: 0,
      longitudeOfAscendingNode: 0
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5518423804133266, .8339484319667214, 0, 0)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "617_patroclus"
      }
    }]
  },
  namaka: {
    groups: ["136108_haumea", "moons"],
    radius: 85,
    label: "Nāmaka",
    parents: [[Number.NEGATIVE_INFINITY, "136108_haumea"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [85, 85, 85]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: .249,
      semiMajorAxis: 25657,
      meanAngularMotion: 39786e-10,
      meanAnomalyAtEpoch: 0,
      inclination: 1.97244894756,
      argumentOfPeriapsis: 0,
      longitudeOfAscendingNode: 0
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5518423804133266, .8339484319667214, 0, 0)
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "136108_haumea"
      }
    }]
  },
  nix: {
    groups: ["134340_pluto", "moons", "134340_pluto_barycenter"],
    radius: 24,
    label: "Nix",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [24, 24, 24],
      shadowEntities: ["134340_pluto"]
    },
    controllers: [{
      type: "dynamo",
      url: "nix/134340_pluto_barycenter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  styx: {
    groups: ["134340_pluto", "moons", "134340_pluto_barycenter"],
    radius: 5.5,
    label: "Styx",
    parents: [[Number.NEGATIVE_INFINITY, "134340_pluto_barycenter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [5.5, 5.5, 5.5],
      shadowEntities: ["134340_pluto"]
    },
    controllers: [{
      type: "dynamo",
      url: "styx/134340_pluto_barycenter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
