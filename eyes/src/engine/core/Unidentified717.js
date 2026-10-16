/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 3 个实体/参考系（如 rose_bowl、school_bus、scientist），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1205554-1206412.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  rose_bowl: {
    groups: ["comparison"],
    radius: .15,
    label: "Rose Bowl",
    parents: [],
    model: {
      url: "$STATIC_ASSETS_URL/models/comparison/rose_bowl/rose_bowl.gltf",
      rotate: [{
        x: 90
      }, {
        z: -90
      }]
    },
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  school_bus: {
    groups: ["comparison"],
    radius: .0065,
    label: "School bus",
    parents: [],
    model: {
      url: "$STATIC_ASSETS_URL/models/comparison/school_bus/school_bus.gltf",
      rotate: [{
        x: 90
      }, {
        z: -90
      }]
    },
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  scientist: {
    groups: ["comparison"],
    radius: 835e-6,
    label: "Scientist",
    parents: [],
    model: {
      url: "$STATIC_ASSETS_URL/models/comparison/scientist/scientist.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
