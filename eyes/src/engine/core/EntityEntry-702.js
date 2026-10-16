/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 2 个实体/参考系（如 phobos、deimos），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ./Entity-567.js；顶层副作用 Entity.Entity.register({phobos:{groups:["mars","moons"],radius:14,label:"Phobos",parents:[[Number.NEGATIVE_INFINITY,"mars"]],trail:{length:void 0,color:[.89,.51,.35,.7]},model:{url:"$STATIC_ASSETS_URL/models/phobos/phobo
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:903843-904609.
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
