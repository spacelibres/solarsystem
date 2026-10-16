// 小天体任务目录包含 OSIRIS-REx TAGSAM 关节动画、Stardust 采集机构关键帧、返回舱与着陆轨迹；模型节点名和原时间表属于动画接口，不在整理中改变。
// Recovered from app.js:1172019-1197285.
import * as Pioneer from "../pioneer/index.js";
import * as Animation from "./Animation.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_dart: {
    groups: ["small body spacecraft", "asteroid spacecraft", "65803_didymos", "dimorphos", "spacecraft"],
    occlusionRadius: .0012,
    extentsRadius: .00625,
    label: "DART",
    parents: [[691007069, "earth"], [691418893, "sun"], [717454117, "65803_didymos"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_dart/dart.gltf",
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_dart/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_dart/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_dart/65803_didymos/pos"
    }, {
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(717503237, new Pioneer.Vector3(-10320.163052194115, 13421.106828492655, 5349.381737812169));
        keyframeController.addPositionKeyframe(717506127.238318, new Pioneer.Vector3(-.9047084058613565, -.7147384471771195, -.30125475602973617));
        return keyframeController;
      }
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_dart",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      coverage: [Number.NEGATIVE_INFINITY, 717454117]
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "dimorphos",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      },
      coverage: [717454117, Number.POSITIVE_INFINITY]
    }]
  },
  sc_dawn: {
    groups: ["small body spacecraft", "asteroid spacecraft", "dwarf planet spacecraft", "4_vesta", "1_ceres", "spacecraft"],
    occlusionRadius: 885e-6,
    extentsRadius: .00985,
    label: "Dawn",
    parents: [[244168849.8323595, "earth"], [244461608, "sun"], [288169447, "mars"], [288210177, "sun"], [363182466, "4_vesta"], [400075267, "sun"], [476712067, "1_ceres"], [594302469.184, ""]],
    trail: {
      length: 659889.75
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_dawn/model.gltf",
      rotate: [{
        z: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_dawn/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/vesta/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/sun/3/orb"
    }, {
      type: "dynamo",
      url: "sc_dawn/ceres/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.9999478154504517, .008904517167862874, .004868284692665544, -.0011729254143642916),
      coverage: [244168849.8323595, 244171353.18400002]
    }, {
      type: "dynamo",
      url: "sc_dawn/ori"
    }]
  },
  sc_deep_impact: {
    groups: ["small body spacecraft", "comet spacecraft", "9p_tempel_1", "103p_hartley_2", "spacecraft"],
    occlusionRadius: .00165,
    extentsRadius: .003,
    label: "Deep Impact",
    parents: [[158829812.068274, "earth"], [159287744, "sun"], [173560752, "9p_tempel_1"], [173923158, "sun"], [251798121, "earth"], [253531474, "sun"], [282984399, "earth"], [285405903, "sun"], [330384030, "earth"], [331534813, "sun"], [342017751, "103p_hartley_2"], [342368983, "sun"], [429192067, ""]],
    trail: {
      length: 47421459,
      lengthCoverages: [[362406, 173560752, 173923158], [1733353, 251798121, 253531474], [2421504, 282984399, 285405903], [1150783, 330384030, 331534813], [351232, 342017751, 342368983]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_deep_impact/deep_impact_wo_impactor.gltf",
      rotate: [{
        y: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_deep_impact/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/9p_tempel_1/pos"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/earth/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/earth/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/earth/flyby3/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_impact/103p_hartley_2/pos"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_deep_impact/quat"
    }]
  },
  sc_deep_impact_impactor: {
    groups: ["small body spacecraft", "comet spacecraft", "9p_tempel_1", "sc_deep_impact", "spacecraft"],
    occlusionRadius: .001,
    extentsRadius: .001,
    label: "Deep Impact Impactor",
    parents: [[158829812.068274, "sc_deep_impact"], [173642464.18400002, "9p_tempel_1"], [173727938.18158135, ""]],
    trail: {
      length: 27830
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_deep_impact_impactor/deep_impact_impactor.gltf",
      rotate: [{
        y: -90
      }]
    },
    controllers: [{
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(173642464.18400002, new Pioneer.Vector3(-713e-6, -55e-6, 0), "sc_deep_impact", void 0, "sc_deep_impact");
        keyframeController.addPositionKeyframe(173656621.40411958, new Pioneer.Vector3(-123095.24746842826, -48294.70341251187, 61743.99881253781), "sc_deep_impact", 173642464.18400002);
        keyframeController.addPositionKeyframe(173727938.18158135, new Pioneer.Vector3(1.580046751199936, 3.178179950746365, -.628457454223176));
        return keyframeController;
      }
    }, {
      type: "fixed",
      position: new Pioneer.Vector3(-713e-6, -55e-6, 0),
      orientation: Pioneer.Quaternion.Identity,
      relativeToEntity: "sc_deep_impact",
      coverage: [158829812.068274, 173642464.18400002]
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.9060465048532422, .3173702681972099, .2649483984949708, .09032269948692226),
      coverage: [173642464.18400002, Number.POSITIVE_INFINITY]
    }, {
      type: "dynamo",
      url: "sc_deep_impact_impactor/quat",
      coverage: [173642464.18400002, Number.POSITIVE_INFINITY]
    }]
  },
  sc_deep_impact_impactor_impact_site: {
    groups: ["small body sites", "comet sites", "9p_tempel_1", "sc_deep_impact", "sc_deep_impact_impactor", "sites"],
    radius: .001,
    label: "Deep Impact Impactor Impact Site",
    parents: [[173727938.18158135, "9p_tempel_1"]],
    controllers: [{
      type: "fixed",
      position: new Pioneer.Vector3(3.1153282512332603, -1.2860729555237982, -1.277920399403075),
      orientation: Pioneer.Quaternion.Identity,
      relativeToEntity: "9p_tempel_1",
      coverage: [173727938.18158135, Number.POSITIVE_INFINITY]
    }]
  },
  sc_deep_space_1: {
    groups: ["small body spacecraft", "asteroid spacecraft", "9969_braille", "spacecraft"],
    occlusionRadius: .00125,
    extentsRadius: .005,
    label: "Deep Space 1",
    parents: [[-37470248, "earth"], [-36628312, "sun"], [-13523799, "9969_braille"], [-13496699, "sun"], [54458637, "19p_borrelly"], [54476825, "sun"], [61977664.184, ""]],
    trail: {
      length: 40845609,
      lengthCoverages: [[27100, -13523799, -13496699], [18188, 54458637, 54476825]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_deep_space_1/deep_space_1.gltf",
      rotate: [{
        x: 90
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_deep_space_1/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_space_1/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_deep_space_1/9969_braille/pos"
    }, {
      type: "dynamo",
      url: "sc_deep_space_1/19p_borrelly/pos"
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "earth"
      },
      secondary: {
        type: "point",
        axis: Pioneer.Vector3.ZAxisNeg,
        target: "sun"
      }
    }, {
      type: "dynamo",
      url: "sc_deep_space_1/quat"
    }]
  },
  sc_near_shoemaker: {
    groups: ["small body spacecraft", "asteroid spacecraft", "253_mathilde", "433_eros", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .0034,
    label: "NEAR",
    parents: [[-122129937, "sun"], [-61397606, "earth"], [-60793811, "sun"], [-79403925, "253_mathilde"], [-79210250, "sun"], [-8425610, "433_eros"], [36675809.3654, ""]],
    trail: {
      length: 63919069,
      lengthCoverages: [[4e5, -8425610, 35279032.137], [0, 35279032.137, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_near_shoemaker/near.gltf",
      rotate: [{
        x: 90
      }, {
        z: 135
      }]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: -122129937,
      eccentricity: .3722732412046076,
      semiMajorAxis: 235420679.8644008,
      meanAngularMotion: 1.0085301888805118e-7,
      meanAnomalyAtEpoch: -.005941352116228519,
      orientation: new Pioneer.Quaternion(.25408339907533106, .05463135384055627, -.18986948069810847, .9467875272685549),
      coverage: [-122129937, -113227200]
    }, {
      type: "dynamo",
      url: "sc_near_shoemaker/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_near_shoemaker/earth/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_near_shoemaker/253_mathilde/pos"
    }, {
      type: "dynamo",
      url: "sc_near_shoemaker/433_eros/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5052018803124495, -.11842169431143575, .7652511949887616, -.3809697770341459),
      coverage: [-122129937, -121953528.049046]
    }, {
      type: "dynamo",
      url: "sc_near_shoemaker/quat"
    }, {
      type: "fixed",
      position: new Pioneer.Vector3(.930389249841349, 4.935129554115763, -4.002004469114965),
      orientation: new Pioneer.Quaternion(.11222410400554989, .7066112547219852, -.6897721372150081, .11099857612696495),
      coverage: [35279032.137, 36675809.3654]
    }, {
      type: "rotateByEntityOrientation",
      coverage: [35279032.137, 36675809.3654]
    }]
  },
  sc_near_shoemaker_landing_site: {
    groups: ["433_eros", "sc_near_shoemaker", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "NEAR Shoemaker Landing Site",
    parents: [[36675809.3654, "433_eros"]],
    controllers: [{
      type: "fixed",
      position: new Pioneer.Vector3(.930389249841349, 4.935129554115763, -4.002004469114965),
      orientation: new Pioneer.Quaternion(.11222410400554989, .7066112547219852, -.6897721372150081, .11099857612696495),
      relativeToEntity: "433_eros",
      coverage: [36675809.3654, Number.POSITIVE_INFINITY]
    }]
  },
  sc_lucy: {
    groups: ["small body spacecraft", "asteroid spacecraft", "52246_donaldjohanson", "3548_eurybates", "15094_polymele", "11351_leucus", "21900_orus", "617_patroclus", "menoetius", "spacecraft"],
    occlusionRadius: .002,
    extentsRadius: .007125,
    label: "Lucy",
    parents: [[687656642.763, "earth"], [687915086, "sun"], [718960993, "earth"], [719531941, "sun"], [787134972, "earth"], [787532222, "sun"], [798252820, "52246_donaldjohanson"], [798584539, "sun"], [870652086, "3548_eurybates"], [872642047, "sun"], [872642047, "15094_polymele"], [875308504, "sun"], [891166024, "11351_leucus"], [894761809, "sun"], [909384911, "21900_orus"], [912190135, "sun"], [977590306, "earth"], [978108682, "sun"], [1046169596, "617_patroclus_barycenter"], [1047892376, "sun"]],
    dependents: ["152830_dinkinesh"],
    trail: {
      length: 63919069,
      lengthCoverages: [[570948, 718960993, 719531941], [397250, 787134972, 787532222], [331719, 798252820, 798584539], [1989961, 870652086, 872642047], [2666457, 872642047, 875308504], [3595785, 891166024, 894761809], [2805224, 909384911, 912190135], [518376, 977590306, 978108682], [1722780, 1046169596, 1047892376]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_lucy/lucy.gltf",
      rotate: [{
        x: 90
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_lucy/earth/launch/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_lucy/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_lucy/earth/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_lucy/earth/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_lucy/52246_donaldjohanson/pos"
    }, {
      type: "dynamo",
      url: "sc_lucy/3548_eurybates/pos"
    }, {
      type: "dynamo",
      url: "sc_lucy/15094_polymele/pos"
    }, {
      type: "dynamo",
      url: "sc_lucy/11351_leucus/pos"
    }, {
      type: "dynamo",
      url: "sc_lucy/21900_orus/pos"
    }, {
      type: "dynamo",
      url: "sc_lucy/earth/flyby3/orb"
    }, {
      type: "dynamo",
      url: "sc_lucy/617_patroclus/pos"
    }, {
      type: "align",
      primary: {
        type: "point",
        axis: Pioneer.Vector3.XAxis,
        target: "earth"
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.YAxis,
        target: "sun",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_lucy/quat"
    }]
  },
  sc_new_horizons: {
    groups: ["small body spacecraft", "dwarf planet spacecraft", "TNO spacecraft", "134340_pluto", "486958_arrokoth", "spacecraft"],
    occlusionRadius: .00135,
    extentsRadius: .0026,
    label: "New Horizons",
    parents: [[190972278.33046317, "earth"], [191055829, "sun"], [225619606, "jupiter"], [226100665, "sun"], [490130161, "134340_pluto"], [490167848, "sun"], [598753684, "486958_arrokoth"], [600203601, "sun"]],
    trail: {
      length: 94608e3
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_new_horizons/new_horizons.gltf",
      rotate: [{
        y: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_new_horizons/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/jupiter/orb"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/pluto/orb"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/sun/3/pos"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/mu69/pos"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/sun/4/pos"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "dynamo",
      url: "sc_new_horizons/ori/1"
    }, {
      type: "dynamo",
      url: "sc_new_horizons/ori/2"
    }]
  },
  sc_rosetta: {
    groups: ["small body spacecraft", "comet spacecraft", "67p_churyumov_gerasimenko", "spacecraft"],
    occlusionRadius: .0014,
    extentsRadius: .016,
    label: "Rosetta",
    parents: [[131491581.583, "earth"], [131901500, "sun"], [162704887, "earth"], [163831232, "sun"], [225623375, "mars"], [225657862, "sun"], [248111015, "earth"], [248475560, "sun"], [311055929, "earth"], [311664877, "sun"], [452394238, "67p_churyumov_gerasimenko"], [528503957.968, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_rosetta/rosettaPhilae.gltf",
      rotate: [{
        x: 180
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_rosetta/earth/launch/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_rosetta/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/earth/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/mars/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/sun/3/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/earth/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/sun/4/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/earth/flyby3/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/sun/5/orb"
    }, {
      type: "dynamo",
      url: "sc_rosetta/67p_churyumov_gerasimenko/pos"
    }, {
      type: "dynamo",
      url: "sc_rosetta/ori"
    }, {
      type: "align",
      joint: "panels_01",
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
      joint: "panels_02",
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
      type: "coverage",
      coverage: [469053367.183, Number.POSITIVE_INFINITY],
      enter: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (null !== model) {
          model.setHiddenObject("Philae", true);
        }
      },
      exit: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (null !== model) {
          model.setHiddenObject("Philae", false);
        }
      }
    }]
  },
  sc_rosetta_impact_site: {
    groups: ["small body sites", "comet sites", "67p_churyumov_gerasimenko", "sc_rosetta", "sites"],
    radius: .001,
    label: "Rosetta Impact Site",
    parents: [[528503957.968, "67p_churyumov_gerasimenko"]],
    controllers: [{
      type: "fixed",
      position: new Pioneer.Vector3(1.7309310500292525, .3509303067271947, 1.1641920075039298),
      orientation: Pioneer.Quaternion.Identity,
      relativeToEntity: "67p_churyumov_gerasimenko",
      coverage: [528503957.968, Number.POSITIVE_INFINITY]
    }]
  },
  sc_osiris_rex: {
    groups: ["small body spacecraft", "asteroid spacecraft", "101955_bennu", "spacecraft"],
    occlusionRadius: .0016,
    extentsRadius: .005,
    label: "OSIRIS-REx",
    parents: [[526676400, "earth"], [527025408, "sun"], [558938468, "earth"], [559919190, "sun"], [591770603, "101955_bennu"], [674049669, "sun"], [748358886, "earth"], [749140122, "sun"], [924136663, "99942_apophis"]],
    dependents: ["sc_osiris_rex_src"],
    trail: {
      length: 102742.5,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 599748661], [672e3, 599748661, 668095733], [1e7, 668095733, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_osiris_rex_v2/osiris_rex_articulated_panels.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["bennu"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_osiris_rex/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/earth/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/bennu/pos"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/sun/3/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/earth/sample_return/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/sun/4/orb"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/apophis"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: new Pioneer.Vector3(.175109477645991, .45028151394683397, .8755473882299549)
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.XAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [658200668.0606446, Number.POSITIVE_INFINITY]
    }, {
      type: "dynamo",
      url: "sc_osiris_rex/ori"
    }, {
      type: "coverage",
      coverage: [748838793, Number.POSITIVE_INFINITY],
      enter: entity => {
        const label = entity.getComponent(Pioneer.DivComponent);
        if (null !== label) {
          label.getDiv().innerHTML = label.getDiv().innerHTML.replace("REx", "APEX");
        }
      },
      exit: entity => {
        const label = entity.getComponent(Pioneer.DivComponent);
        if (null !== label) {
          label.getDiv().innerHTML = label.getDiv().innerHTML.replace("APEX", "REx");
        }
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeSubobjectVisibleAnimation(model, "Tagsam_housing_cover", true, [[593036911, false]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Tagsam_rod_bottom", "z", [[595442726, 0], [595442906, -2.51758508612], [595443086, -2.51758508612], [595443266, 0], [656489486, 0], [656489846, -3.71758508612], [656502896, -3.71758508612], [656503076, 0], [657366686, 0], [657367046, -2.73771997401], [657367406, 0]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Tagsam_rod_top", "z", [[593728111, 0], [593728113, .15], [595442726, .15], [595442906, 2.73247002363], [595443086, 2.73247002363], [595443266, .15], [656489486, .15], [656489846, 3.73247002363], [656502896, 3.73247002363], [656503076, .15], [657366686, .15], [657366866, 1.16136826422], [657367046, .509601235], [657367226, 1.16136826422], [657367406, .15]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "tagsam_head", "z", [[595442906, 0], [595442996, 1.57079632679], [595443086, 1.57079632679], [656489486, 0], [656489576, 1.57079632679], [656502806, 1.57079632679], [656502896, 0], [657366686, 0], [657367046, 1.01463145268]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeSubobjectVisibleAnimation(model, "tagsam_head", true, [[657367046, false]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Gimbal_Base_Right", "z", [[656501483, -70 * Math.PI / 180], [656501603, 0], [656503242, 0], [656503602, -70 * Math.PI / 180]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Gimbal_Base_Left", "z", [[656501483, -70 * Math.PI / 180], [656501603, 0], [656503242, 0], [656503602, -70 * Math.PI / 180]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Gimbal_Pivot_Right", "x", [[656501603, 0], [656501723, 38 * Math.PI / 180], [656503242, 38 * Math.PI / 180], [656503362, 0]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeJointRotationAnimation(model, "Gimbal_Pivot_Left", "x", [[656501603, 0], [656501723, -38 * Math.PI / 180], [656503242, -38 * Math.PI / 180], [656503362, 0]]);
      }
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        return Animation.Animation.makeSubobjectVisibleAnimation(model, "heatshield", true, [[748824183.985732, false]]);
      }
    }]
  },
  sc_osiris_rex_src: {
    groups: ["small body spacecraft", "asteroid spacecraft", "101955_bennu", "sample return capsule"],
    occlusionRadius: 8e-4,
    extentsRadius: 5e-4,
    label: "OSIRIS-REx SRC",
    parents: [[748824183.985732, "sc_osiris_rex"], [748832190, "earth"], [748839215, ""]],
    dependents: ["sc_osiris_rex"],
    trail: {
      length: 360
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_osiris_rex_v2/src/osiris_rex_heatshield.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_osiris_rex_src/sc_osiris_rex"
    }, {
      type: "dynamo",
      url: "sc_osiris_rex_src/earth"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(-.7795827954678449, -.23701239922750972, .5441503490850964, -.19994045416955505)
    }, {
      type: "coverage",
      coverage: [748838642, 748839373],
      enter: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(true);
        }
      },
      exit: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(false);
        }
      }
    }, {
      type: "custom",
      func: entity => {
        const translationController = entity.addController(Pioneer.TranslateController);
        translationController.setTranslation(new Pioneer.Vector3(0, 0, .0012));
        translationController.setRelativeToOrientation(true);
        return translationController;
      },
      coverage: [748824183.985732, 748839215]
    }],
    postCreateFunction: entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (model) {
        model.setTranslation(new Pioneer.Vector3(0, 0, -.0012));
      }
    }
  },
  sc_philae: {
    groups: ["small body spacecraft", "comet spacecraft", "67p_churyumov_gerasimenko", "spacecraft", "landers"],
    occlusionRadius: 6e-4,
    extentsRadius: .001,
    label: "Philae",
    parents: [[469053367.183, "67p_churyumov_gerasimenko"], [469078512.324, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_philae/philae.gltf",
      rotate: [{
        x: 180
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_philae/67p_churyumov_gerasimenko/pos"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.05763938670269045, .04093459828351704, .6750586755218195, .7343690110337115)
    }, {
      type: "custom",
      func: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) throw new Error();
        const vector3 = new Pioneer.Vector3(.0021658104318583687, .0011575046500869896, .00011875498849156656);
        const modelOffset = new Pioneer.Vector3(.00147, 0, 0);
        const translationController = entity.addController(Pioneer.TranslateController);
        translationController.setTranslation(vector3);
        model.setTranslation(modelOffset);
        return translationController;
      },
      coverage: [469053367.183, 469078512.324]
    }]
  },
  sc_philae_landing_site: {
    groups: ["small body sites", "comet sites", "67p_churyumov_gerasimenko", "sc_philae", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Philae Landing Site",
    parents: [[469078512.324, "67p_churyumov_gerasimenko"]],
    controllers: [{
      type: "fixed",
      position: new Pioneer.Vector3(2.4452763955965984, -.12110982508097201, -.36032099522959377),
      orientation: Pioneer.Quaternion.Identity,
      relativeToEntity: "67p_churyumov_gerasimenko",
      coverage: [469078512.324, Number.POSITIVE_INFINITY]
    }]
  },
  sc_psyche: {
    groups: ["small body spacecraft", "asteroid spacecraft", "16_psyche", "spacecraft"],
    occlusionRadius: .0031,
    extentsRadius: .025,
    label: "Psyche",
    parents: [[750482453, "earth"], [750686758, "sun"], [831828698, "mars"], [832302380, "sun"], [931665741, "16_psyche"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_psyche/psyche.gltf",
      rotate: [{
        x: 90
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_psyche/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_psyche/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_psyche/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_psyche/16_psyche/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_psyche/ori"
    }, {
      type: "align",
      joint: "ArrayGimbleLeft",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "align",
      joint: "ArrayGimbleRight",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_stardust: {
    groups: ["small body spacecraft", "comet spacecraft", "81p_wild_2", "9p_tempel_1", "spacecraft"],
    occlusionRadius: 65e-5,
    extentsRadius: .003,
    label: "Stardust",
    parents: [[-28304869.3, "earth"], [-28038699, "sun"], [32627842, "earth"], [33120541, "sun"], [89379733, "5535_annefrank"], [89550209, "sun"], [126009572, "81p_wild_2"], [126678668, "sun"], [190336290, "earth"], [190866114, "sun"], [284944970, "earth"], [285742028, "sun"], [350896766, "9p_tempel_1"], [351068113, "sun"], [354279666, ""]],
    trail: {
      length: 62659492
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_stardust/stardust_articulated.gltf",
      shadowEntities: ["earth"],
      rotate: [{
        x: 90
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_stardust/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_stardust/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_stardust/earth/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_stardust/5535_annefrank/pos"
    }, {
      type: "dynamo",
      url: "sc_stardust/81p_wild_2/pos"
    }, {
      type: "dynamo",
      url: "sc_stardust/earth/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_stardust/earth/flyby3/orb"
    }, {
      type: "dynamo",
      url: "sc_stardust/9p_tempel_1/pos"
    }, {
      type: "dynamo",
      url: "sc_stardust/quat"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.382740492391079, -.1080542417135509, -.5511677923678098, -.7335175941913997),
      coverage: [351017063, 354279666]
    }, {
      type: "coverage",
      coverage: [190576690.7833838, Number.POSITIVE_INFINITY],
      enter: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (model) for (const partName of stardustModelParts) model.setHiddenObject(partName, true);
      },
      exit: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (model) for (const partName of stardustModelParts) model.setHiddenObject(partName, false);
      }
    }],
    postCreateFunction: entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (model) {
        Animation.Animation.makeJointRotationAnimation(model, "Stardust_capsule", "x", createCollectionKeyframes(1.481785, 0, 600));
        Animation.Animation.makeJointRotationAnimation(model, "Stardust_Sample_Collection1", "x", createCollectionKeyframes(-Math.PI, 610, 300));
        Animation.Animation.makeJointRotationAnimation(model, "Stardust_Sample_Collection2", "x", createCollectionKeyframes(-Math.PI, 920, 300));
      }
    }
  },
  sc_stardust_src: {
    groups: ["small body spacecraft", "comet spacecraft", "81p_wild_2", "earth", "spacecraft"],
    occlusionRadius: 4e-4,
    extentsRadius: 8e-4,
    label: "Stardust SRC",
    parents: [[190576690.7833838, "sc_stardust"], [190576755.185, "earth"], [190591985.184, ""]],
    trail: {
      length: 14547
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_stardust_src/stardust_capsule.gltf",
      shadowEntities: ["earth"],
      rotate: [{
        x: 90
      }, {
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_stardust_src/earth/pos"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.5761056269233067, .6860897901682099, .2627910947477326, .3582233199772653)
    }, {
      type: "coverage",
      coverage: [190591100, Number.POSITIVE_INFINITY],
      enter: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(true);
          trail.setStartTime(1600);
        }
      },
      exit: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(false);
          trail.setStartTime(18e3);
        }
      }
    }, {
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(190576690.7833838, new Pioneer.Vector3(-.0010057, 0, 1569e-7), "sc_stardust", void 0, "sc_stardust", void 0);
        keyframeController.addPositionKeyframe(190576755.185, new Pioneer.Vector3(-.016734488308429718, -.019199222326278687, -.00404781848192215), "sc_stardust");
        return keyframeController;
      }
    }, {
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(190591163, new Pioneer.Vector3(-1979.4577357598625, -4478.591383446022, 4136.322858267745), "earth");
        keyframeController.addPositionKeyframe(190591445.184, new Pioneer.Vector3(-1947.8360605285134, -4491.082890234251, 4123.1018367103425), "earth");
        keyframeController.addPositionKeyframe(190591985.184, new Pioneer.Vector3(-1918.7633689113482, -4478.864184129612, 4103.897124245734), "earth");
        return keyframeController;
      }
    }, {
      type: "rotateByEntityOrientation",
      coverage: [190591163, 190591985.184]
    }]
  }
});
const stardustModelParts = ["Stardust_capsule", "Stardust_tex_01_c", "Stardust_tex_02_c", "Stardust_tex_03_c", "Stardust_tex_02_c2", "Stardust_Sample_Collection1"];
function createCollectionKeyframes(angle, timeOffset, duration) {
  return [[4449664 + timeOffset, angle], [4449664 + timeOffset + duration, 0], [10411264 - timeOffset - duration, 0], [10411264 - timeOffset, angle], [81864064 + timeOffset, angle], [81864064 + timeOffset + duration, 0], [92664064 - timeOffset - duration, 0], [92664064 - timeOffset, angle], [125496064 + timeOffset, angle], [125496064 + timeOffset + duration, 0], [126363664 - timeOffset - duration, 0], [126363664 - timeOffset, angle]];
}
