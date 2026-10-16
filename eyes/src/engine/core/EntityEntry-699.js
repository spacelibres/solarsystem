/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 1 个实体/参考系（如 moon），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ./Entity-567.js；顶层副作用 Entity.Entity.register({moon:{groups:["earth","moons"],radius:1737.4,label:"Moon",parents:[[Number.NEGATIVE_INFINITY,"earth"]],trail:{length:void 0,color:[0,.6,.8,.7]},spheroid:{equatorialRadius:1737.4,polarRadius:1737.4
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:861815-862287.
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  moon: {
    groups: ["earth", "moons"],
    radius: 1737.4,
    label: "Moon",
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    trail: {
      length: void 0,
      color: [0, .6, .8, .7]
    },
    spheroid: {
      equatorialRadius: 1737.4,
      polarRadius: 1737.4,
      planetographic: true
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "moon/color_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        }
      },
      shadowEntities: ["earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "moon/earth/orb"
    }, {
      type: "dynamo",
      url: "moon/ori"
    }]
  }
});
