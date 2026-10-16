/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 93 个实体/参考系（如 aitne、ananke、aoede、arche、autonoe、callirrhoe），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:865895-903842.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  aitne: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1.5,
    label: "Aitne",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "aitne/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  ananke: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 14,
    label: "Ananke",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [14, 14, 14],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "ananke/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  aoede: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 2,
    label: "Aoede",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "aoede/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  arche: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1.5,
    label: "Arche",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "arche/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  autonoe: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 2,
    label: "Autonoe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "autonoe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  callirrhoe: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 4.3,
    label: "Callirrhoe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [4.3, 4.3, 4.3],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "callirrhoe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  carme: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 23,
    label: "Carme",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [23, 23, 23],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "carme/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  carpo: {
    groups: ["jupiter", "moons", "irregular"],
    radius: 1.5,
    label: "Carpo",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "carpo/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  chaldene: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1.9,
    label: "Chaldene",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.9, 1.9, 1.9],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "chaldene/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  cyllene: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Cyllene",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "cyllene/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  dia: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 2,
    label: "Dia",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "dia/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  eirene: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 2,
    label: "Eirene",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "eirene/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  elara: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 43,
    label: "Elara",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [43, 43, 43],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "elara/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  erinome: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1.6,
    label: "Erinome",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.6, 1.6, 1.6],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "erinome/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  ersa: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 1.5,
    label: "Ersa",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "ersa/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  euanthe: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1.5,
    label: "Euanthe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "euanthe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  eukelade: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 2,
    label: "Eukelade",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "eukelade/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  eupheme: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Eupheme",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "eupheme/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  euporie: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Euporie",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "euporie/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  eurydome: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1.5,
    label: "Eurydome",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "eurydome/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  harpalyke: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 2.2,
    label: "Harpalyke",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2.2, 2.2, 2.2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "harpalyke/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  hegemone: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1.5,
    label: "Hegemone",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "hegemone/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  helike: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 2,
    label: "Helike",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "helike/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  hermippe: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 2,
    label: "Hermippe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "hermippe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  herse: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Herse",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "herse/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  himalia: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 85,
    label: "Himalia",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [85, 85, 85],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "himalia/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  iocaste: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 2.6,
    label: "Iocaste",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2.6, 2.6, 2.6],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "iocaste/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  isonoe: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1.9,
    label: "Isonoe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.9, 1.9, 1.9],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "isonoe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_li: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Jupiter LI",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_li/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lii: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "Jupiter LII",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lii/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_liv: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "Jupiter LIV",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_liv/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lv: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Jupiter LV",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lv/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lvi: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: .5,
    label: "Jupiter LVI",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lvi/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lix: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Jupiter LIX",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lix/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxi: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Jupiter LXI",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxi/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxiii: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Jupiter LXIII",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxiii/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxiv: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Jupiter LXIV",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxiv/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxvi: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Jupiter LXVI",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxvi/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxvii: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Jupiter LXVII",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxvii/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxviii: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Jupiter LXVIII",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxviii/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxix: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "Jupiter LXIX",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxix/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxx: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1.5,
    label: "Jupiter LXX",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxx/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  jupiter_lxxii: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Jupiter LXXII",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter_lxxii/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kale: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Kale",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "kale/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kallichore: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Kallichore",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "kallichore/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kalyke: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 2.6,
    label: "Kalyke",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.6, 2.6, 2.6],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "kalyke/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kore: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Kore",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "kore/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  leda: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 10,
    label: "Leda",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [10, 10, 10],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "leda/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  lysithea: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 18,
    label: "Lysithea",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [18, 18, 18],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "lysithea/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  megaclite: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 2.7,
    label: "Megaclite",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2.7, 2.7, 2.7],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "megaclite/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  mneme: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Mneme",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "mneme/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  orthosie: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Orthosie",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "orthosie/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  pandia: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 1.5,
    label: "Pandia",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "pandia/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  pasiphae: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 30,
    label: "Pasiphae",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [30, 30, 30],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "pasiphae/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  pasithee: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "Pasithee",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "pasithee/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  philophrosyne: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Philophrosyne",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "philophrosyne/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  praxidike: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 3.4,
    label: "Praxidike",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [3.4, 3.4, 3.4],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "praxidike/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_2: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "S/2003 J 2",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_2/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_4: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "S/2003 J 4",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_4/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_9: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2003 J 9",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_9/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_10: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "S/2003 J 10",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_10/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_12: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "S/2003 J 12",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_12/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_16: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "S/2003 J 16",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_16/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_23: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "S/2003 J 23",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_23/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2003_j_24: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "S/2003 J 24",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2003_j_24/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2011_j_3: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 1.5,
    label: "S/2011 J 3",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2011_j_3/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2011_j_4: {
    groups: ["jupiter", "moons", "minor"],
    radius: 1.5,
    label: "S/2011 J 4",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2011_j_4/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2011_j_5: {
    groups: ["jupiter", "moons", "minor"],
    radius: 1,
    label: "S/2011 J 5",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2011_j_5/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2016_j_3: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "S/2016 J 3",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2016_j_3/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2016_j_4: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: .5,
    label: "S/2016 J 4",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2016_j_4/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2017_j_10: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "S/2017 J 10",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [.5, .5, .5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2017_j_10/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2017_j_11: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2017 J 11",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [.5, .5, .5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2017_j_11/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2018_j_2: {
    groups: ["jupiter", "moons", "irregular", "himalia"],
    radius: 1.5,
    label: "S/2018 J 2",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2018_j_2/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2018_j_3: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2018 J 3",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2018_j_3/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2018_j_4: {
    groups: ["jupiter", "moons", "irregular", "carpo"],
    radius: 1,
    label: "S/2018 J 4",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2018_j_4/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2018_j_5: {
    groups: ["jupiter", "moons", "minor"],
    radius: 1,
    label: "S/2018 J 5",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2018_j_5/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_1: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "S/2021 J 1",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_1/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_2: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "S/2021 J 2",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_2/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_3: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "S/2021 J 3",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_3/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_4: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2021 J 4",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_4/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_5: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 1,
    label: "S/2021 J 5",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_5/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_j_6: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2021 J 6",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_j_6/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2022_j_1: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2022 J 1",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2022_j_1/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2022_j_2: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: .5,
    label: "S/2022 J 2",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2022_j_2/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2022_j_3: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: .5,
    label: "S/2022 J 3",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2022_j_3/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2024_j_1: {
    groups: ["jupiter", "moons", "minor"],
    radius: 1,
    label: "S/2024 J 1",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2024_j_1/jupiter"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sinope: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 19,
    label: "Sinope",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [19, 19, 19],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "sinope/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sponde: {
    groups: ["jupiter", "moons", "irregular", "pasiphae"],
    radius: 1,
    label: "Sponde",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "sponde/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  taygete: {
    groups: ["jupiter", "moons", "irregular", "carme"],
    radius: 2.5,
    label: "Taygete",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "taygete/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  thelxinoe: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 1,
    label: "Thelxinoe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "thelxinoe/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  themisto: {
    groups: ["jupiter", "moons", "irregular"],
    radius: 4,
    label: "Themisto",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [4, 4, 4],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "themisto/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  thyone: {
    groups: ["jupiter", "moons", "irregular", "ananke"],
    radius: 2,
    label: "Thyone",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "thyone/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  valetudo: {
    groups: ["jupiter", "moons", "irregular"],
    radius: .5,
    label: "Valetudo",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .5,
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "valetudo/jupiter/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
