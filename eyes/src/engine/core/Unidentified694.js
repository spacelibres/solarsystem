// Recovered from app.js:793205-794402.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  j2000_ecliptic: {
    label: "J2000 Ecliptic",
    extentsRadius: 1e-5,
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: new Pioneer.Quaternion(.9791532214288992, .2031230389823101, 0, 0)
    }]
  },
  l1: {
    groups: ["lagrange_points"],
    label: "L1",
    extentsRadius: 1e-5,
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    controllers: [{
      type: "dynamo",
      url: "l1"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "align",
        target: "j2000_ecliptic",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  l2: {
    groups: ["lagrange_points"],
    label: "L2",
    extentsRadius: 1e-5,
    parents: [[Number.NEGATIVE_INFINITY, "earth"]],
    controllers: [{
      type: "dynamo",
      url: "l2"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  l4: {
    groups: ["lagrange_points"],
    label: "L4",
    extentsRadius: 1e-5,
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    controllers: [{
      type: "dynamo",
      url: "l4"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  l5: {
    groups: ["lagrange_points"],
    label: "L5",
    extentsRadius: 1e-5,
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    controllers: [{
      type: "dynamo",
      url: "l5"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  }
});
