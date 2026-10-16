// 土星主要卫星目录；Enceladus 的固定喷流由创建回调逐股添加，Titan 创建大气组件，父级/纹理/遮影关系由实体工厂解释。
// Recovered from app.js:910945-915921.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
import * as EntityUtils from "./EntityUtils.js";
Entity.Entity.register({
  dione: {
    groups: ["saturn", "moons", "inner", "major"],
    radius: 561.7,
    label: "Dione",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 561.7,
      polarRadius: 561.7,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "dione/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "dione/saturn/orb"
    }, {
      type: "dynamo",
      url: "dione/ori"
    }]
  },
  enceladus: {
    groups: ["saturn", "moons", "inner", "major"],
    radius: 252.1,
    label: "Enceladus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 252.1,
      polarRadius: 252.1,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "enceladus/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "enceladus/saturn/orb"
    }, {
      type: "dynamo",
      url: "enceladus/ori"
    }],
    postCreateFunction: entity => {
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [-20.16, .8 * -69.23, .8 * -240.99], [-.0999, -.2747, -.9563]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [-49.384, .8 * -24.61, .8 * -243.08], [-.2449, -.0976, -.9646]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [.8 * -35.82, -37.496, -196], [-.1421, -.1859, -.9722]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [21.259, .7 * -17.54, -174.685], [.1205, -.0696, -.9902]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [0, 1.54, -176.393], [0, .0087, -.9999]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [-21.658, 21.658, -173.719], [-.1227, .1227, -.9848]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [32.193, .7 * -34.55, .7 * -245.35], [.1824, -.1371, -.9736]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [-46.719, .68 * .9, -221.931], [-.2059, .0026, -.9785]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [.9 * -31.81, -12.024, -224.667], [-.1262, -.053, -.9905]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [.9 * -5.49, -26.793, -225.162], [-.0217, -.1181, -.9927]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [14.886, -42.39, -222.309], [.0656, -.1869, -.9801]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [-13.176, 48.112, -195.328], [-.0653, .2386, -.9689]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [51.52 * .8, 19.176, .8 * -245.51], [.2044, .0951, -.9742]);
      EntityUtils.EntityUtils.addGeyser(entity, 100, .1, 20, .002, 4, [22.504, 33.52 * .8, -198.536], [.1116, .133, -.9848]);
    }
  },
  hyperion: {
    groups: ["saturn", "moons", "outer", "major"],
    radius: 135,
    label: "Hyperion",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/hyperion/hyperion.gltf",
      scale: [1, 1, 1]
    },
    controllers: [{
      type: "dynamo",
      url: "hyperion/saturn/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  iapetus: {
    groups: ["saturn", "moons", "outer", "major"],
    radius: 735.6,
    label: "Iapetus",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 735.6,
      polarRadius: 735.6,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "iapetus/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "iapetus/saturn/orb"
    }, {
      type: "dynamo",
      url: "iapetus/ori"
    }]
  },
  mimas: {
    groups: ["saturn", "moons", "inner", "major"],
    radius: 198.3,
    label: "Mimas",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/mimas/mimas.gltf",
      scale: [1, 1, 1],
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "mimas/saturn/orb"
    }, {
      type: "dynamo",
      url: "mimas/ori"
    }]
  },
  rhea: {
    groups: ["saturn", "moons", "outer", "major"],
    radius: 764.3,
    label: "Rhea",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 764.3,
      polarRadius: 764.3,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "rhea/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "rhea/saturn/orb"
    }, {
      type: "dynamo",
      url: "rhea/ori"
    }]
  },
  tethys: {
    groups: ["saturn", "moons", "inner", "major"],
    radius: 538.4,
    label: "Tethys",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 538.4,
      polarRadius: 527.5,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "tethys/color_$SIZE_$FACE.png",
          sizes: [4, 512, 2048]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "tethys/saturn/orb"
    }, {
      type: "dynamo",
      url: "tethys/ori"
    }]
  },
  titan: {
    groups: ["saturn", "moons", "outer", "major"],
    radius: 2575,
    label: "Titan",
    parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 2575,
      polarRadius: 2575,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "titan/color_$SIZE_$FACE.png",
          sizes: [4, 512, 1024]
        }
      },
      shadowEntities: ["saturn"]
    },
    controllers: [{
      type: "dynamo",
      url: "titan/saturn/orb"
    }, {
      type: "dynamo",
      url: "titan/ori"
    }],
    postCreateFunction: entity => {
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(75);
      atmosphere.setDensity(5e-4);
      atmosphere.setColor(new Pioneer.Color(179 / 255, 145 / 255, 53 / 255));
      atmosphere.setSunsetColor(new Pioneer.Color(0, 71 / 255, .8));
      atmosphere.setSunsetIntensity(.5);
    }
  }
});
