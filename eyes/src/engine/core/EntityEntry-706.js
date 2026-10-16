/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 5 个实体/参考系（如 ariel、miranda、oberon、titania、umbriel），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ./Entity-567.js；顶层副作用 Entity.Entity.register({ariel:{groups:["uranus","moons","major"],radius:578.9,label:"Ariel",parents:[[Number.NEGATIVE_INFINITY,"uranus"]],trail:{length:void 0,color:[.67,.92,1,.7]},spheroid:{equatorialRadius:578.9,polarR
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1028893-1031090.
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  ariel: {
    groups: ["uranus", "moons", "major"],
    radius: 578.9,
    label: "Ariel",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 578.9,
      polarRadius: 578.9,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "ariel/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "ariel/uranus/orb"
    }, {
      type: "dynamo",
      url: "ariel/ori"
    }]
  },
  miranda: {
    groups: ["uranus", "moons", "major"],
    radius: 235.8,
    label: "Miranda",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 235.8,
      polarRadius: 235.8,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "miranda/color_$SIZE_$FACE.png",
          sizes: [4, 256]
        }
      },
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "miranda/uranus/orb"
    }, {
      type: "dynamo",
      url: "miranda/ori"
    }]
  },
  oberon: {
    groups: ["uranus", "moons", "major"],
    radius: 761.4,
    label: "Oberon",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 761.4,
      polarRadius: 761.4,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "oberon/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "oberon/uranus/orb"
    }, {
      type: "dynamo",
      url: "oberon/ori"
    }]
  },
  titania: {
    groups: ["uranus", "moons", "major"],
    radius: 788.4,
    label: "Titania",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 788.4,
      polarRadius: 788.4,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "titania/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "titania/uranus/orb"
    }, {
      type: "dynamo",
      url: "titania/ori"
    }]
  },
  umbriel: {
    groups: ["uranus", "moons", "major"],
    radius: 584.7,
    label: "Umbriel",
    parents: [[Number.NEGATIVE_INFINITY, "uranus"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 584.7,
      polarRadius: 584.7,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "umbriel/color_$SIZE_$FACE.png",
          sizes: [4, 256]
        }
      },
      shadowEntities: ["uranus"]
    },
    controllers: [{
      type: "dynamo",
      url: "umbriel/uranus/orb"
    }, {
      type: "dynamo",
      url: "umbriel/ori"
    }]
  }
});
