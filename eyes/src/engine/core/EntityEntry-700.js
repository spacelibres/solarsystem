/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 8 个实体/参考系（如 adrastea、amalthea、callisto、europa、ganymede、io），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ./Entity-567.js；顶层副作用 Entity.Entity.register({adrastea:{groups:["jupiter","moons","amalthea","inner","regular"],radius:8.2,label:"Adrastea",parents:[[Number.NEGATIVE_INFINITY,"jupiter"]],trail:{length:void 0,color:[.95,.71,.64,.7]},model:{url
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:862288-865894.
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  adrastea: {
    groups: ["jupiter", "moons", "amalthea", "inner", "regular"],
    radius: 8.2,
    label: "Adrastea",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [8.2, 8.2, 8.2],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "adrastea/jupiter/orb"
    }, {
      type: "dynamo",
      url: "adrastea/ori"
    }]
  },
  amalthea: {
    groups: ["jupiter", "moons", "amalthea", "inner", "regular"],
    radius: 83.5,
    label: "Amalthea",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [83.5, 83.5, 83.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "amalthea/jupiter/orb"
    }, {
      type: "dynamo",
      url: "amalthea/ori"
    }]
  },
  callisto: {
    groups: ["jupiter", "moons", "main", "galilean", "regular"],
    radius: 2410.3,
    label: "Callisto",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    spheroid: {
      equatorialRadius: 2410.3,
      polarRadius: 2410.3,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "callisto/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["jupiter", "io", "europa", "ganymede"]
    },
    controllers: [{
      type: "dynamo",
      url: "callisto/jupiter/orb"
    }, {
      type: "dynamo",
      url: "callisto/ori"
    }]
  },
  europa: {
    groups: ["jupiter", "moons", "main", "galilean", "regular"],
    radius: 1569,
    label: "Europa",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    spheroid: {
      equatorialRadius: 1569,
      polarRadius: 1569,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "europa/color_$SIZE_$FACE.png",
          sizes: [4, 512, 1024]
        }
      },
      shadowEntities: ["jupiter", "io", "callisto", "ganymede"]
    },
    controllers: [{
      type: "dynamo",
      url: "europa/jupiter/orb"
    }, {
      type: "dynamo",
      url: "europa/ori"
    }]
  },
  ganymede: {
    groups: ["jupiter", "moons", "main", "galilean", "regular"],
    radius: 2634.1,
    label: "Ganymede",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    spheroid: {
      equatorialRadius: 2634.1,
      polarRadius: 2634.1,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "ganymede/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["jupiter", "io", "europa", "callisto"]
    },
    controllers: [{
      type: "dynamo",
      url: "ganymede/jupiter/orb"
    }, {
      type: "dynamo",
      url: "ganymede/ori"
    }]
  },
  io: {
    groups: ["jupiter", "moons", "main", "galilean", "regular"],
    radius: 1821.3,
    label: "Io",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    spheroid: {
      equatorialRadius: 1821.3,
      polarRadius: 1821.3,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "io/color_$SIZE_$FACE.png",
          sizes: [4, 512, 1024]
        }
      },
      shadowEntities: ["jupiter", "europa", "ganymede", "callisto"]
    },
    controllers: [{
      type: "dynamo",
      url: "io/jupiter/orb"
    }, {
      type: "dynamo",
      url: "io/ori"
    }]
  },
  metis: {
    groups: ["jupiter", "moons", "amalthea", "inner", "regular"],
    radius: 21.5,
    label: "Metis",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [21.5, 21.5, 21.5],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "metis/jupiter/orb"
    }, {
      type: "dynamo",
      url: "metis/ori"
    }]
  },
  thebe: {
    groups: ["jupiter", "moons", "amalthea", "inner", "regular"],
    radius: 49,
    label: "Thebe",
    parents: [[Number.NEGATIVE_INFINITY, "jupiter"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [49, 49, 49],
      shadowEntities: ["jupiter"]
    },
    controllers: [{
      type: "dynamo",
      url: "thebe/jupiter/orb"
    }, {
      type: "dynamo",
      url: "thebe/ori"
    }]
  }
});
