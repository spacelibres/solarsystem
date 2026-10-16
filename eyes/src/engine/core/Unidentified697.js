/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 14 个实体/参考系（如 "1i_oumuamua"、"1p_halley"、"103p_hartley_2"、"9p_tempel_1"、"81p_wild_2"、"67p_churyumov_gerasimenko"），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:854970-860930.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
import * as EntityUtils from "./EntityUtils.js";
Entity.Entity.register({
  "1i_oumuamua": {
    groups: ["comets"],
    occlusionRadius: .03,
    extentsRadius: .225,
    label: "ʻOumuamua",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/1i_oumuamua/oumuamua.gltf"
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "1i_oumuamua/sun/orb"
    }, {
      type: "spin",
      axis: new Pioneer.Vector3(.57735026919, .57735026919, .57735026919),
      periodInHours: 8.1
    }]
  },
  "1p_halley": {
    groups: ["comets"],
    radius: 6,
    label: "Halley (1P/Halley)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [6, 6, 6]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "1p_halley/sun/orb"
    }, {
      type: "spin",
      periodInHours: 52,
      axis: Pioneer.Vector3.ZAxis,
      axisInFrameSpace: false
    }]
  },
  "103p_hartley_2": {
    groups: ["comets"],
    radius: 2,
    label: "Hartley 2 (103P/Hartley)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/103p_hartley_2/hartley_2.gltf"
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "103p_hartley_2/sun/orb"
    }, {
      type: "dynamo",
      url: "103p_hartley_2/ori"
    }]
  },
  "9p_tempel_1": {
    groups: ["comets"],
    radius: 5,
    label: "Tempel 1 (9P/Tempel)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/9p_tempel_1/9p_tempel.gltf",
      rotate: [{
        y: 90
      }]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "9p_tempel_1/sun/orb"
    }, {
      type: "dynamo",
      url: "9p_tempel_1/ori"
    }]
  },
  "81p_wild_2": {
    groups: ["comets"],
    radius: 2.5,
    label: "Wild 2 (81P/Wild)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"], [-800047271, "jupiter"], [-797029475, "sun"]],
    trail: {
      length: void 0,
      lengthCoverages: [[1356976800, Number.NEGATIVE_INFINITY, -611927948.817], [189345600, -611927948.817, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.5, 2.5, 2.5]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "81p_wild_2/sun/1/orb"
    }, {
      type: "dynamo",
      url: "81p_wild_2/jupiter/orb"
    }, {
      type: "dynamo",
      url: "81p_wild_2/sun/2/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  "67p_churyumov_gerasimenko": {
    groups: ["comets"],
    radius: 4.1,
    label: "Churyumov–Gerasimenko (67P/C-G)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/67p_churyumov_gerasimenko/67p_churyumov_gerasimenko.gltf",
      rotate: [{
        x: 90
      }],
      scale: .00124
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "67p_churyumov_gerasimenko/sun/orb"
    }, {
      type: "spin",
      axis: new Pioneer.Vector3(.15191127889562422, .404099951782066, .9020123016422935),
      axisInFrameSpace: false,
      periodInHours: 12.0550932412
    }, {
      type: "dynamo",
      url: "67p_churyumov_gerasimenko/ori"
    }],
    postCreateFunction: t => {
      t.setOrientation(new Pioneer.Quaternion(.26732846830704055, .017948528101847026, .22012096235022358, .9379552773483394));
      EntityUtils.EntityUtils.addGeyser(t, 1, 1, 100, 1, 1, [1, -.25, 1.2], [0, 0, 1]);
      EntityUtils.EntityUtils.addGeyser(t, 2, .5, 100, 1, 1, [-1.2, -.25, .6], [.2, -.5, 1]);
      EntityUtils.EntityUtils.addGeyser(t, 1, .07, 100, 1, 10, [-1.2, .1, .6], [.2, -.5, 1]);
      EntityUtils.EntityUtils.addGeyser(t, 1, 1, 100, 1, 1, [-.8, .75, 1], [.2, .5, 1]);
      EntityUtils.EntityUtils.addGeyser(t, 1, .5, 100, 1, 1, [-.8, .35, -1], [.2, .25, -1]);
    }
  },
  "19p_borrelly": {
    groups: ["comets"],
    radius: 2.4,
    label: "Borrelly (19P/Borrelly)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/19p_borrelly/borrelly.gltf"
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "19p_borrelly/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  c_1995_o1: {
    groups: ["comets"],
    radius: 5,
    label: "Hale-Bopp (C/1995 O1)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [5, 5, 5]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_1995_o1/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      axisInFrameSpace: false,
      periodInHours: 11.766666666
    }]
  },
  c_2010_x1: {
    groups: ["comets"],
    radius: 5,
    label: "Elenin (C/2010 X1)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"], [370699266.182, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_1/generic_asteroid_1.gltf",
      scale: [5, 5, 5]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2010_x1/sun/pos"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  c_2012_s1: {
    groups: ["comets"],
    radius: 3,
    label: "ISON (C/2012 S1)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"], [440596867.184, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2012_s1/sun/pos"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  c_2013_a1: {
    groups: ["comets"],
    radius: 5,
    label: "Siding Spring (C/2013 A1)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [5, 5, 5]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2013_a1/sun/pos"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      axisInFrameSpace: false,
      periodInHours: 8
    }]
  },
  c_2019_y4: {
    groups: ["comets"],
    radius: 3,
    label: "ATLAS (C/2019 Y4)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [3, 3, 3]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2019_y4/sun/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  c_2020_f3: {
    groups: ["comets"],
    radius: 6,
    label: "NEOWISE (C/2020 F3)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_2/generic_asteroid_2.gltf",
      scale: [6, 6, 6]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2020_f3/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      axisInFrameSpace: false,
      periodInHours: 7.58
    }]
  },
  c_2025_n1: {
    groups: ["comets"],
    radius: 2.8,
    label: "3I/ATLAS (C/2025 N1)",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/generic/asteroid_3/generic_asteroid_3.gltf",
      scale: [2.8, 2.8, 2.8]
    },
    comet: {},
    controllers: [{
      type: "dynamo",
      url: "c_2025_n1/sun/orb"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      axisInFrameSpace: false,
      periodInHours: 16.16
    }]
  }
});
