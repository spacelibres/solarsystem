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
