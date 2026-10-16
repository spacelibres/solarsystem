// 比例参照物目录，注册 Rose Bowl、校车和科学家模型；实体尺寸、模型缩放与相对位置属于比较功能约定，保持原值。
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
