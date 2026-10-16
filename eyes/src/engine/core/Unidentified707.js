// Recovered from app.js:1031091-1040639.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  belinda: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 45,
    label: "Belinda",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [45, 45, 45],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "belinda/uranus/orb"
    }, {
      type: "dynamo",
      url: "belinda/ori"
    }]
  },
  bianca: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 25.7,
    label: "Bianca",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [25.7, 25.7, 25.7],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "bianca/uranus/orb"
    }, {
      type: "dynamo",
      url: "bianca/ori"
    }]
  },
  caliban: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 36,
    label: "Caliban",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [36, 36, 36],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "caliban/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  cordelia: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 20.1,
    label: "Cordelia",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [20.1, 20.1, 20.1],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "cordelia/uranus/orb"
    }, {
      type: "dynamo",
      url: "cordelia/ori"
    }]
  },
  cressida: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 39.8,
    label: "Cressida",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [39.8, 39.8, 39.8],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "cressida/uranus/orb"
    }, {
      type: "dynamo",
      url: "cressida/ori"
    }]
  },
  cupid: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 9,
    label: "Cupid",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [9, 9, 9],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "cupid/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  desdemona: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 32,
    label: "Desdemona",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [32, 32, 32],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "desdemona/uranus/orb"
    }, {
      type: "dynamo",
      url: "desdemona/ori"
    }]
  },
  ferdinand: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 10,
    label: "Ferdinand",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [10, 10, 10],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "ferdinand/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  francisco: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 11,
    label: "Francisco",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [11, 11, 11],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "francisco/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  juliet: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 46.8,
    label: "Juliet",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [46.8, 46.8, 46.8],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "juliet/uranus/orb"
    }, {
      type: "dynamo",
      url: "juliet/ori"
    }]
  },
  mab: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 12.5,
    label: "Mab",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [12.5, 12.5, 12.5],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "mab/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  margaret: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 10,
    label: "Margaret",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [10, 10, 10],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "margaret/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  ophelia: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 22.4,
    label: "Ophelia",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [22.4, 22.4, 22.4],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "ophelia/uranus/orb"
    }, {
      type: "dynamo",
      url: "ophelia/ori"
    }]
  },
  perdita: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 15,
    label: "Perdita",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [15, 15, 15],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "perdita/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  portia: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 67.6,
    label: "Portia",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [67.6, 67.6, 67.6],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "portia/uranus/orb"
    }, {
      type: "dynamo",
      url: "portia/ori"
    }]
  },
  prospero: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 25,
    label: "Prospero",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [25, 25, 25],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "prospero/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  puck: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 81,
    label: "Puck",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [81, 81, 81],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "puck/uranus/orb"
    }, {
      type: "dynamo",
      url: "puck/ori"
    }]
  },
  rosalind: {
    groups: ["uranus", "moons", "minor", "inner"],
    radius: 36,
    label: "Rosalind",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [36, 36, 36],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "rosalind/uranus/orb"
    }, {
      type: "dynamo",
      url: "rosalind/ori"
    }]
  },
  setebos: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 24,
    label: "Setebos",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [24, 24, 24],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "setebos/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  stephano: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 16,
    label: "Stephano",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [16, 16, 16],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "stephano/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sycorax: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 82,
    label: "Sycorax",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [82, 82, 82],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "sycorax/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2023_u_1: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 5,
    label: "S/2023 U 1",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [5, 5, 5],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2023_u_1/uranus"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  s_2025_u_1: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 4,
    label: "S/2025 U 1",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [4, 4, 4],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "s_2025_u_1/uranus"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  trinculo: {
    groups: ["uranus", "moons", "minor", "irregular"],
    radius: 9,
    label: "Trinculo",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [9, 9, 9],
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "trinculo/uranus/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
