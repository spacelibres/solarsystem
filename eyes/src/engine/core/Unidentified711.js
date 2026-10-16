/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 2 个实体/参考系（如 sc_messenger、sc_messenger_impact_site），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1148265-1150174.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_messenger: {
    groups: ["mercury", "spacecraft"],
    occlusionRadius: .00133,
    extentsRadius: .0035,
    label: "MESSENGER",
    parents: [[144789279.39320505, "earth"], [145066469, "sun"], [175801890, "earth"], [176659095, "sun"], [214828942, "venus"], [215033751, "sun"], [234289415, "venus"], [234436749, "sun"], [253547108, "mercury"], [253671753, "sun"], [276485360, "mercury"], [276627276, "sun"], [307423681, "mercury"], [307651285, "sun"], [353474040, "mercury"], [483694028.351, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_messenger/Messenger.gltf",
      rotate: [{
        z: -90
      }, {
        y: 90
      }],
      shadowEntities: ["mercury"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_messenger/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/earth/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/venus/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/3/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/venus/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/4/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/mercury/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/5/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/mercury/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/6/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/mercury/flyby3/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/sun/7/orb"
    }, {
      type: "dynamo",
      url: "sc_messenger/mercury/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mercury",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_messenger",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_messenger/ori"
    }]
  },
  sc_messenger_impact_site: {
    groups: ["mercury", "sc_messenger", "sites"],
    radius: .001,
    label: "MESSENGER Impact Site",
    parents: [[Number.NEGATIVE_INFINITY, "mercury"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(.9501527254431932, -2.615904550043192, -.910251923861324),
      coverage: [483694028.351, Number.POSITIVE_INFINITY]
    }]
  }
});
