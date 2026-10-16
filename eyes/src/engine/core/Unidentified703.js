// 海王星卫星目录的注册副作用；实体以海王星为父级并声明原有轨道、朝向及表面属性，日期、半径和资产路径视为数据协议。
// Recovered from app.js:904610-910944.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  despina: {
    groups: ["neptune", "moons", "regular"],
    radius: 90,
    label: "Despina",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [90, 90, 90],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "despina/neptune/orb"
    }, {
      type: "dynamo",
      url: "despina/ori"
    }]
  },
  galatea: {
    groups: ["neptune", "moons", "regular"],
    radius: 102,
    label: "Galatea",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [102, 102, 102],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "galatea/neptune/orb"
    }, {
      type: "dynamo",
      url: "galatea/ori"
    }]
  },
  halimede: {
    groups: ["neptune", "moons", "irregular"],
    radius: 31,
    label: "Halimede",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [31, 31, 31],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "halimede/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  hippocamp: {
    groups: ["neptune", "moons", "regular"],
    radius: 17.4,
    label: "Hippocamp",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [17.4, 17.4, 17.4],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "hippocamp/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  laomedeia: {
    groups: ["neptune", "moons", "irregular"],
    radius: 21,
    label: "Laomedeia",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [21, 21, 21],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "laomedeia/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  larissa: {
    groups: ["neptune", "moons", "regular"],
    radius: 108,
    label: "Larissa",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [108, 108, 108],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "larissa/neptune/orb"
    }, {
      type: "dynamo",
      url: "larissa/ori"
    }]
  },
  naiad: {
    groups: ["neptune", "moons", "regular"],
    radius: 48,
    label: "Naiad",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [48, 48, 48],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "naiad/neptune/orb"
    }, {
      type: "dynamo",
      url: "naiad/ori"
    }]
  },
  nereid: {
    groups: ["neptune", "moons", "irregular"],
    radius: 170,
    label: "Nereid",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [170, 170, 170],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "nereid/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  neso: {
    groups: ["neptune", "moons", "irregular"],
    radius: 30,
    label: "Neso",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [30, 30, 30],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "neso/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  proteus: {
    groups: ["neptune", "moons", "regular"],
    radius: 232.5,
    label: "Proteus",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/proteus/proteus.gltf",
      scale: [1, 1, 1]
    },
    controllers: [{
      type: "dynamo",
      url: "proteus/neptune/orb"
    }, {
      type: "dynamo",
      url: "proteus/ori"
    }]
  },
  psamathe: {
    groups: ["neptune", "moons", "irregular"],
    radius: 20,
    label: "Psamathe",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [20, 20, 20],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "psamathe/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sao: {
    groups: ["neptune", "moons", "irregular"],
    radius: 22,
    label: "Sao",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [22, 22, 22],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "sao/neptune/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2002_n_5: {
    groups: ["neptune", "moons", "irregular"],
    radius: 12,
    label: "S/2002 N 5",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [12, 12, 12],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2002_n_5/neptune"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2021_n_1: {
    groups: ["neptune", "moons", "irregular"],
    radius: 8,
    label: "S/2021 N 1",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [8, 8, 8],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2021_n_1/neptune"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  thalassa: {
    groups: ["neptune", "moons", "regular"],
    radius: 54,
    label: "Thalassa",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [54, 54, 54],
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "thalassa/neptune/orb"
    }, {
      type: "dynamo",
      url: "thalassa/ori"
    }]
  },
  triton: {
    groups: ["neptune", "moons", "irregular"],
    radius: 1353.4,
    label: "Triton",
    parents: [[Number.NEGATIVE_INFINITY, "neptune"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    spheroid: {
      equatorialRadius: 1353.4,
      polarRadius: 1353.4,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "triton/color_$SIZE_$FACE.jpg",
          sizes: [16, 512, 4096]
        }
      },
      shadowEntities: ["neptune"]
    },
    controllers: [{
      type: "dynamo",
      url: "triton/neptune/orb"
    }, {
      type: "dynamo",
      url: "triton/ori"
    }]
  }
});
