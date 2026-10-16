// Recovered from app.js:903843-904609.
/* 登记火星两颗卫星的模型旋转、父级与轨道/朝向描述，导入时只写入实体选项目录。 */
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  phobos: {
    groups: ["mars", "moons"],
    radius: 14,
    label: "Phobos",
    parents: [[Number.NEGATIVE_INFINITY, "mars"]],
    trail: {
      length: void 0,
      color: [.89, .51, .35, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/phobos/phobos.gltf",
      scale: [1, 1, 1],
      rotate: [{
        z: 90
      }, {
        y: 90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "phobos/mars/orb"
    }, {
      type: "dynamo",
      url: "phobos/ori"
    }]
  },
  deimos: {
    groups: ["mars", "moons"],
    radius: 8.70951,
    label: "Deimos",
    parents: [[Number.NEGATIVE_INFINITY, "mars"]],
    trail: {
      length: void 0,
      color: [.89, .51, .35, .7]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/deimos/deimos.gltf",
      scale: [1, 1, 1],
      rotate: [{
        y: -180
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "deimos/mars/orb"
    }, {
      type: "dynamo",
      url: "deimos/ori"
    }]
  }
});
