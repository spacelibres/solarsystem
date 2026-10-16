// Recovered from app.js:915922-1028892.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  aegaeon: {
    groups: ["saturn", "moons", "minor", "ring moonlet"],
    radius: .12,
    label: "Aegaeon",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.12, .12, .12],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "aegaeon/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  aegir: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Aegir",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "aegir/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  albiorix: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 16,
    label: "Albiorix",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [16, 16, 16],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "albiorix/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  alvaldi: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Alvaldi",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "alvaldi/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  angrboda: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "Angrboda",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "angrboda/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  anthe: {
    groups: ["saturn", "moons", "minor", "alkyonides"],
    radius: .9,
    label: "Anthe",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [.9, .9, .9],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "anthe/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  atlas: {
    groups: ["saturn", "moons", "minor", "ring shepherd"],
    radius: 15.1,
    label: "Atlas",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [15.1, 15.1, 15.1],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "atlas/saturn/orb"
    }, {
      type: "dynamo",
      url: "atlas/ori"
    }]
  },
  bebhionn: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 3,
    label: "Bebhionn",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "bebhionn/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  beli: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "Beli",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "beli/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  bergelmir: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Bergelmir",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "bergelmir/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  bestla: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3.5,
    label: "Bestla",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3.5, 3.5, 3.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "bestla/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  calypso: {
    groups: ["saturn", "moons", "minor", "trojan"],
    radius: 10.7,
    label: "Calypso",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [10.7, 10.7, 10.7],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "calypso/saturn/orb"
    }, {
      type: "dynamo",
      url: "calypso/ori"
    }]
  },
  daphnis: {
    groups: ["saturn", "moons", "minor", "ring shepherd"],
    radius: 3.8,
    label: "Daphnis",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3.8, 3.8, 3.8],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "daphnis/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  eggther: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Eggther",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "eggther/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  epimetheus: {
    groups: ["saturn", "moons", "minor", "co-orbital"],
    radius: 58.1,
    label: "Epimetheus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [58.1, 58.1, 58.1],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "epimetheus/saturn/orb"
    }, {
      type: "dynamo",
      url: "epimetheus/ori"
    }]
  },
  erriapus: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 5,
    label: "Erriapus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [5, 5, 5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "erriapus/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  farbauti: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "Farbauti",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "farbauti/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  fenrir: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Fenrir",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "fenrir/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  fornjot: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Fornjot",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "fornjot/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  geirrod: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Geirrod",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "geirrod/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  gerd: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Gerd",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "gerd/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  greip: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Greip",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "greip/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  gridr: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Gridr",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "gridr/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  gunnlod: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Gunnlod",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "gunnlod/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  hati: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Hati",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "hati/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  helene: {
    groups: ["saturn", "moons", "minor", "trojan"],
    radius: 17.6,
    label: "Helene",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [17.6, 17.6, 17.6],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "helene/saturn/orb"
    }, {
      type: "dynamo",
      url: "helene/ori"
    }]
  },
  hyrrokkin: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Hyrrokkin",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "hyrrokkin/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  ijiraq: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 6,
    label: "Ijiraq",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [6, 6, 6],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "ijiraq/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  janus: {
    groups: ["saturn", "moons", "minor", "co-orbital"],
    radius: 89.5,
    label: "Janus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [89.5, 89.5, 89.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "janus/saturn/orb"
    }, {
      type: "dynamo",
      url: "janus/ori"
    }]
  },
  jarnsaxa: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Jarnsaxa",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "jarnsaxa/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kari: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Kari",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "kari/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  kiviuq: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 8,
    label: "Kiviuq",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [8, 8, 8],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "kiviuq/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  loge: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Loge",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "loge/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  methone: {
    groups: ["saturn", "moons", "minor", "alkyonides"],
    radius: 1.6,
    label: "Methone",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.6, 1.6, 1.6],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "methone/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  mundilfari: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3.5,
    label: "Mundilfari",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [3.5, 3.5, 3.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "mundilfari/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  narvi: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3.5,
    label: "Narvi",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3.5, 3.5, 3.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "narvi/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  paaliaq: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 11,
    label: "Paaliaq",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [11, 11, 11],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "paaliaq/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  pallene: {
    groups: ["saturn", "moons", "minor", "alkyonides"],
    radius: 2.5,
    label: "Pallene",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "pallene/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  pan: {
    groups: ["saturn", "moons", "minor", "ring shepherd"],
    radius: 14.1,
    label: "Pan",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [14.1, 14.1, 14.1],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "pan/saturn/orb"
    }, {
      type: "dynamo",
      url: "pan/ori"
    }]
  },
  pandora: {
    groups: ["saturn", "moons", "minor", "ring shepherd"],
    radius: 40.7,
    label: "Pandora",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [40.7, 40.7, 40.7],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "pandora/saturn/orb"
    }, {
      type: "dynamo",
      url: "pandora/ori"
    }]
  },
  phoebe: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 106.5,
    label: "Phoebe",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/phoebe/phoebe.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "phoebe/saturn/orb"
    }, {
      type: "dynamo",
      url: "phoebe/ori"
    }]
  },
  polydeuces: {
    groups: ["saturn", "moons", "minor", "trojan"],
    radius: 1.3,
    label: "Polydeuces",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.3, 1.3, 1.3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "polydeuces/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  prometheus: {
    groups: ["saturn", "moons", "minor", "ring shepherd"],
    radius: 43.1,
    label: "Prometheus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [43.1, 43.1, 43.1],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "prometheus/saturn/orb"
    }, {
      type: "dynamo",
      url: "prometheus/ori"
    }]
  },
  s_2004_s_7: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "S/2004 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_7/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_12: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "S/2004 S 12",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_12/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_13: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "S/2004 S 13",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_13/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_17: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 17",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_17/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_21: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 21",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_21/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_24: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 1.5,
    label: "S/2004 S 24",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_24/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_28: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 28",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_28/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_31: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2,
    label: "S/2004 S 31",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_31/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_36: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 36",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_36/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_37: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 37",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_37/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_39: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 39",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_39/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_1: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "S/2006 S 1",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_1/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_3: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "S/2006 S 3",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_3/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_2: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "S/2007 S 2",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_2/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_3: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "S/2007 S 3",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_3/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2009_s_1: {
    groups: ["saturn", "moons", "propeller moonlet"],
    radius: .15,
    label: "S/2009 S 1",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: .15,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: 0,
      semiMajorAxis: 117e3,
      meanAngularMotion: .00015472777,
      meanAnomalyAtEpoch: -1.5,
      orientation: new Pioneer.Quaternion(-.9397445462795919, .02005900203250964, -.052689008288728606, -.33719681579275607)
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_1: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 3,
    label: "S/2019 S 1",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 3,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_1/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  saturn_lviii: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Saturn LVIII",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "saturn_lviii/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  saturn_lx: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2,
    label: "Saturn LX",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "saturn_lx/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  saturn_lxiv: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "Saturn LXIV",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "saturn_lxiv/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  siarnaq: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 20,
    label: "Siarnaq",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [20, 20, 20],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "siarnaq/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  skathi: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 4,
    label: "Skathi",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [4, 4, 4],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "skathi/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  skoll: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Skoll",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "skoll/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  skrymir: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Skrymir",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "skrymir/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  surtur: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3,
    label: "Surtur",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "surtur/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  suttungr: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3.5,
    label: "Suttungr",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [3.5, 3.5, 3.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "suttungr/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  tarqeq: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 3,
    label: "Tarqeq",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3, 3, 3],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "tarqeq/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  tarvos: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 7.5,
    label: "Tarvos",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [7.5, 7.5, 7.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "tarvos/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  telesto: {
    groups: ["saturn", "moons", "minor", "trojan"],
    radius: 12.4,
    label: "Telesto",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [12.4, 12.4, 12.4],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "telesto/saturn/orb"
    }, {
      type: "dynamo",
      url: "telesto/ori"
    }]
  },
  thiazzi: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "Thiazzi",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "thiazzi/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  thrymr: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 3.5,
    label: "Thrymr",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [3.5, 3.5, 3.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "thrymr/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  ymir: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 9,
    label: "Ymir",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [9, 9, 9],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "ymir/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_40: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 40",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 66061440,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_40/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_41: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 41",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 79022304,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_41/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_42: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 42",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 79998624,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_42/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_43: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 43",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 84678912,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_43/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_44: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "S/2004 S 44",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 88660224,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_44/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_45: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 45",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 89743680,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_45/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_46: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 46",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 95694912,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_46/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_47: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 47",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 65879136,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_47/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_48: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 48",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 107343360,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_48/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_49: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 49",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 109231200,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_49/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_50: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 50",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 108902016,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_50/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_51: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 51",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 131278752,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_51/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_52: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2004 S 52",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 141175872,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_52/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_53: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2004 S 53",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 115986816,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_53/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_54: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2004 S 54",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_54/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_55: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2004 S 55",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_55/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_56: {
    groups: ["saturn", "moons", "minor"],
    radius: 2.5,
    label: "S/2004 S 56",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_56/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_57: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2004 S 57",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_57/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_58: {
    groups: ["saturn", "moons", "minor"],
    radius: 2.5,
    label: "S/2004 S 58",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_58/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_59: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2004 S 59",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_59/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_60: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2004 S 60",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_60/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2004_s_61: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2004 S 61",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2004_s_61/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2005_s_4: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2.5,
    label: "S/2005 S 4",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 38899008,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2005_s_4/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2005_s_5: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2005 S 5",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 101763648,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2005_s_5/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2005_s_6: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2005 S 6",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2005_s_6/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2005_s_7: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2005 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2005_s_7/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_10: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2006 S 10",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 84943296,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_10/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_11: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2006 S 11",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 90052992,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_11/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_12: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 2,
    label: "S/2006 S 12",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 89428320,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_12/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_13: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2006 S 13",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 91638432,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_13/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_14: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2006 S 14",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 99591552,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_14/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_15: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2006 S 15",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 104886144,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_15/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_16: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2006 S 16",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 104329728,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_16/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_17: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2006 S 17",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 109259712,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_17/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_18: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2006 S 18",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 112181760,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_18/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_19: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2006 S 19",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 120038112,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_19/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_20: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2.5,
    label: "S/2006 S 20",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 49012128,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2.5, 2.5, 2.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_20/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_21: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 21",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_21/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_22: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 22",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_22/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_23: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 23",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_23/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_24: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 24",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_24/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_25: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 25",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_25/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_26: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 26",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_26/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_27: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2006 S 27",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_27/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_28: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2006 S 28",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_28/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_29: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2006 S 29",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_29/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2006_s_9: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2006 S 9",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 55977696,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2006_s_9/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_5: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2007 S 5",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 64530432,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_5/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_6: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2007 S 6",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 82036800,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_6/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_7: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2007 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 65170656,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_7/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_8: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 2,
    label: "S/2007 S 8",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 72308160,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_8/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_9: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2007 S 9",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 93145248,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_9/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_10: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2007 S 10",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_10/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2007_s_11: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2007 S 11",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2007_s_11/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_10: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 10",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 97030656,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_10/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_11: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 11",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 96336e3,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_11/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_12: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 12",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 98396640,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_12/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_13: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 13",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 98921088,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_13/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_14: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2,
    label: "S/2019 S 14",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 77167296,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2, 2, 2],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_14/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_15: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 15",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 100357056,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_15/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_16: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 16",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 115877088,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_16/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_17: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 17",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 111576096,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_17/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_18: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 18",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 114657984,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_18/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_19: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 19",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 113879520,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_19/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_2: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 2",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 69104448,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_2/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_20: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 20",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 118838880,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_20/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_21: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 21",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 141378048,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_21/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_22: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 22",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_22/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_23: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 23",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_23/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_24: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2019 S 24",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_24/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_25: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2019 S 25",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_25/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_26: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 26",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_26/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_27: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 27",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_27/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_28: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2019 S 28",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_28/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_29: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 29",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_29/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_3: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 3",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 72380736,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_3/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_30: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 30",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_30/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_31: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 31",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_31/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_32: {
    groups: ["saturn", "moons", "minor"],
    radius: 2.5,
    label: "S/2019 S 32",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_32/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_33: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2019 S 33",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_33/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_34: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 34",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_34/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_35: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 35",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_35/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_36: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 36",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_36/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_37: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 37",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_37/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_38: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 38",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_38/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_39: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 39",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_39/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_4: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 4",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 78128064,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_4/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_40: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 40",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_40/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_41: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 41",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_41/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_42: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2019 S 42",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_42/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_43: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 43",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_43/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_44: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2019 S 44",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_44/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_5: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2019 S 5",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 85568832,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_5/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_6: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2.5,
    label: "S/2019 S 6",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 79202880,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_6/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_7: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 93337056,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_7/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_8: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 8",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 94061952,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_8/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2019_s_9: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2019 S 9",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 94444704,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2019_s_9/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_1: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 2,
    label: "S/2020 S 1",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 38975040,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_1/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_10: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2020 S 10",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 131951808,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_10/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_11: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 11",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_11/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_12: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 12",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_12/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_13: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 13",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_13/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_14: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 14",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_14/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_15: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 15",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_15/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_16: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 16",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_16/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_17: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2020 S 17",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_17/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_18: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 18",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_18/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_19: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 19",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_19/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_2: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2020 S 2",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 77552640,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_2/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_20: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 20",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_20/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_21: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 21",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_21/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_22: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 22",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_22/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_23: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 23",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_23/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_24: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 24",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_24/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_25: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 25",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_25/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_26: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 26",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_26/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_27: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 27",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_27/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_28: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 28",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_28/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_29: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 29",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_29/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_3: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 1.5,
    label: "S/2020 S 3",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 78450336,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_3/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_30: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 30",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_30/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_31: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 31",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_31/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_32: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 32",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_32/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_33: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 33",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_33/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_34: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 34",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_34/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_35: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 35",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_35/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_36: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 36",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_36/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_37: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 37",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_37/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_38: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2020 S 38",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_38/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_39: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 39",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_39/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_4: {
    groups: ["saturn", "moons", "minor", "gallic"],
    radius: 1.5,
    label: "S/2020 S 4",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 80085888,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [1.5, 1.5, 1.5],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_4/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_40: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 40",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_40/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_41: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 41",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_41/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_42: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 42",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_42/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_43: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 43",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_43/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_44: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 44",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_44/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_45: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 45",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_45/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_46: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 46",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_46/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_47: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 47",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_47/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_48: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2020 S 48",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_48/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_49: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2020 S 49",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_49/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_5: {
    groups: ["saturn", "moons", "minor", "inuit"],
    radius: 1.5,
    label: "S/2020 S 5",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 80687232,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_5/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_6: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2020 S 6",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 100989504,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_6/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_7: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2020 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 74450880,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_7/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_8: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 1.5,
    label: "S/2020 S 8",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 106109568,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_8/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2020_s_9: {
    groups: ["saturn", "moons", "minor", "norse"],
    radius: 2,
    label: "S/2020 S 9",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: 132621408,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2020_s_9/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_1: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 1",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_1/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_2: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 2",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_2/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_3: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 3",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_3/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_4: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 4",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_4/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_5: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 5",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_5/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_6: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 6",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_6/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_7: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2023 S 7",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_7/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_8: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 8",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_8/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_9: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 9",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_9/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_10: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 10",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_10/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_11: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 11",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_11/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_12: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 12",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_12/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_13: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 13",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_13/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_14: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 14",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_14/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_15: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 15",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_15/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_16: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 16",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_16/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_17: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 17",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_17/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_18: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 18",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_18/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_19: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 19",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_19/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_20: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 20",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_20/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_21: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 21",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_21/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_22: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 22",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_22/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_23: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 23",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_23/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_24: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 24",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_24/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_25: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 25",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_25/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_26: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 26",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_26/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_27: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 27",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_27/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_28: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 28",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_28/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_29: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 29",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_29/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_30: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 30",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_30/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_31: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 31",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_31/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_32: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 32",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_32/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_33: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 33",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_33/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_34: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 34",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_34/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_35: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 35",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_35/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_36: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 36",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_36/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_37: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 37",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_37/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_38: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 38",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_38/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_39: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 39",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_39/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_40: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 40",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_40/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_41: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 41",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_41/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_42: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 42",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_42/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_43: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 43",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_43/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_44: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 44",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_44/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_45: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 45",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_45/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_46: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 46",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_46/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_47: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 47",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_47/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_48: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 48",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_48/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_49: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 49",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_49/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_50: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 50",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_50/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_51: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 51",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_51/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_52: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 52",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_52/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_53: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 53",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_53/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_54: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 54",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_54/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_55: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 55",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_55/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_56: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 56",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_56/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_57: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2023 S 57",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_57/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_58: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2023 S 58",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_58/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_59: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2023 S 59",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_59/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_60: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2023 S 60",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_60/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_61: {
    groups: ["saturn", "moons", "minor"],
    radius: 1.5,
    label: "S/2023 S 61",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: 1.5,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_61/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_62: {
    groups: ["saturn", "moons", "minor"],
    radius: 1,
    label: "S/2023 S 62",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 1,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_62/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_s_63: {
    groups: ["saturn", "moons", "minor"],
    radius: 2,
    label: "S/2023 S 63",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: 2,
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_s_63/saturn"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
