/** @eyes-analysis
 * 文件职责：土卫二发现故事定义：围绕 Enceladus 的幻灯片、介绍内容和相机/图层操作。
 * 依据：import ../pioneer/index.js；顶层副作用 defaultExport={type:"nonsequential",entities:["sc_cassini","enceladus"],onEnter:async t=>{const layerManager=t.getManager("layer");const layerPanelComponent=t.getComponent("layerPanel");["asteroids","comets","dwarfPlanet
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1714328-1723207.
import * as Pioneer from "../pioneer/index.js";
let defaultExport;
const n = {
  layers: []
};
defaultExport = {
  type: "nonsequential",
  entities: ["sc_cassini", "enceladus"],
  onEnter: async t => {
    const layerManager = t.getManager("layer");
    const layerPanelComponent = t.getComponent("layerPanel");
    ["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft"].forEach(t => {
      layerManager.getLayer(t).visible && (n.layers.push(t), layerPanelComponent.toggleLayer(t));
    });
    ["planets", "majorMoons"].forEach(t => {
      layerManager.getLayer(t).visible || (n.layers.push(t), layerPanelComponent.toggleLayer(t));
    });
    n.maxTextureSize = t.pioneer.getConfig().getValue("maxTextureSize");
    t.pioneer.getConfig().setValue("maxTextureSize", 2048);
  },
  onLeave: t => {
    const {
      layers: layers
    } = n;
    const layerPanelComponent = t.getComponent("layerPanel");
    for (let t = 0; t < layers.length; t++) layerPanelComponent.toggleLayer(layers[t]);
    t.pioneer.getConfig().setValue("maxTextureSize", n.maxTextureSize);
    n.layers = [];
    delete n.trail;
    delete n.maxTextureSize;
  },
  slides: [{
    id: "slide_1",
    type: "overlay",
    classList: ["opaque", "black"],
    content: [{
      type: "title",
      title: "Discovery at Enceladus"
    }]
  }, {
    id: "slide_2",
    type: "panel",
    content: [{
      type: "description",
      title: "There is Something Happening on Enceladus",
      subtitle: "February 2005",
      description: "The Cassini mission spent 13 years orbiting Saturn and its moons, arriving at Saturn in 2004. But no one was expecting what was found on the moon named Enceladus."
    }],
    time: "2005-02-14T05:22:35Z",
    camera: [async t => {
      const e = "enceladus";
      const sceneManager = t.getManager("scene");
      await sceneManager.isReady(e);
      const n = t.pioneer.getScene("main").getEntity(e).getComponent(Pioneer.SpheroidLODComponent);
      sceneManager.addLoading(e, "spheroidLOD");
      await n.getTexturesLoadedPromise();
      sceneManager.removeLoading(e, "spheroidLOD");
      await t.cameraScripts.goToCelestialObject(e, {
        duration: 3
      });
    }]
  }, {
    id: "slide_3",
    type: "panel",
    content: [{
      type: "description",
      title: "Detection",
      subtitle: "Feb 16th, 2005",
      description: "The magnetometer aboard NASA's robotic Cassini spacecraft discovers something -- perhaps an atmosphere -- is pushing against Saturn's magnetic field around Enceladus, a small, icy moon of Saturn barely 300 miles (500 kilometers) in diameter. There is evidence that gases may be originating from the moon's surface or interior. Cassini's cosmic dust analyzer records thousands of hits from tiny particles of dust or ice, possibly coming from a cloud around the moon or from the adjacent E ring, a broad ring of dust-sized ice particles in which Enceladus orbits. The science team makes plans to return to Enceladus for a closer look."
    }],
    time: "2005-02-17T03:15:30Z",
    rate: 12,
    camera: [async t => {
      await t.cameraScripts.alignObjects("sc_cassini", "enceladus", {
        transitionDuration: 3,
        alignDuration: 3,
        distance: .04,
        horizontalOffset: 10
      });
    }],
    onEnter: t => {},
    onLeave: t => {}
  }, {
    id: "slide_4",
    type: "panel",
    content: [{
      type: "description",
      title: "Water Vapor at the South Pole",
      subtitle: "July 2005",
      description: "During this pivotal flyby, the Cassini cameras obtain new, detailed images of the south polar region of Enceladus.To their amazement, Cassini scientists detect a huge cloud of water vapor over the area -- and relatively warm fractures in the crust that are supplying the cloud of water vapor and ice particles that extend into space. Cassini data also confirms that this activity is the major source of material in the E ring. Cassini has already made a major discovery, and something that no telescope could have seen."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_terrain.jpg",
      title: "Enceladus Terrain",
      alt: "Enceladus Terrain",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_temperature.jpg",
      title: "Enceladus Temperature",
      alt: "Enceladus Temperature",
      clickable: true
    }],
    time: "2005-07-14T19:51:20Z",
    rate: 5,
    camera: [async t => {
      await t.cameraScripts.alignObjects("sc_cassini", "enceladus", {
        transitionDuration: 1,
        alignDuration: 2,
        distance: .04,
        horizontalOffset: 12
      });
    }]
  }, {
    id: "slide_5",
    type: "panel",
    content: [{
      type: "description",
      title: "A Major Announcement",
      subtitle: "March 2006",
      description: "Cassini scientists announced they have found evidence of liquid water reservoirs feeding the Enceladus plume, possibly in the form of geysers. After examining high-resolution Cassini images and other data showing icy jets ejecting large quantities of particles at high speed, scientists rule out the idea that the particles are produced by or blown off the moon's surface by vapor created when warm water ice converts to a gas. Instead, they find evidence that the jets might be erupting from near-surface pockets of liquid water."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_icy_jets.jpg",
      title: "Enceladus Icy Jets",
      alt: "Enceladus Icy Jets",
      clickable: true
    }],
    time: "2022-01-25T22:15:00Z",
    camera: [async t => {
      await t.getManager("scene").isReady("enceladus");
      await t.cameraScripts.goToCelestialObject("enceladus");
    }]
  }, {
    id: "slide_6",
    type: "panel",
    content: [{
      type: "description",
      title: "Cassini and the Jets",
      description: "During a very close flyby on March 12th, 2008, Cassini's instruments sample the plume directly, and detect a surprising brew of volatile gases, water vapor, carbon dioxide and carbon monoxide, as well as organic materials, some 20 times denser than expected. The brew is described as being 'like carbonated water with an essence of natural gas.' New heat maps of the surface show higher temperatures than previously known in the south polar region, with higher-than-expected temperatures running the length of the giant fissures near the south pole."
    }, {
      type: "replay"
    }],
    time: "2008-03-12T19:06:15Z",
    onEnter: t => {
      t.getComponent("settings").toggleLightOptions("flood");
      t.scene.getEntity("sc_cassini").getComponent(Pioneer.TrailComponent).setEnabled(false);
    },
    onLeave: t => {
      t.getComponent("settings").toggleLightOptions("shadow");
      t.scene.getEntity("sc_cassini").getComponent(Pioneer.TrailComponent).setEnabled(true);
    },
    camera: [async t => {
      await t.cameraScripts.alignObjects("sc_cassini", "enceladus", {
        duration: 4,
        distance: .4,
        horizontalOffset: 10
      });
    }]
  }, {
    id: "slide_7",
    type: "panel",
    content: [{
      type: "description",
      title: "What We Learned Along the Way",
      description: "Over the next nine years, Cassini completes 23 flybys of Enceladus, unlocking new clues with each event. In subsequent flybys, Cassini found that the ice fractures called “tiger stripes” are about 300 meters (980 feet) deep, with V-shaped inner walls. Cassini also found that the particles in the plume were water ice with a surprising amount of salt in addition to methane, ammonia and carbon dioxide. Gravitational measurements indicated that the jets are supplied by a global subsurface ocean, probably regional to the south pole. Tiny silica grains, also found in the plume, suggest that the ocean of Enceladus likely contains hydrothermal vents - one of the places scientists suspect life could have begun on Earth."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_cutaway.jpg",
      title: "Enceladus cutaway",
      alt: "Enceladus cutaway",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_cutaway_description.jpg",
      title: "Enceladus cutaway with description",
      alt: "Enceladus cutaway with description",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/enceladus_geyser_cutaway.jpg",
      title: "Enceladus cutaway with geysers",
      alt: "Enceladus cutaway with geysers",
      clickable: true
    }],
    time: "2008-10-09T19:06:46Z",
    camera: [async t => {
      await t.getManager("scene").isReady("sc_cassini");
      await t.cameraScripts.goToSpacecraft("sc_cassini");
    }]
  }, {
    id: "slide_8",
    type: "panel",
    content: [{
      type: "description",
      title: "Shoot the Plumes",
      description: "On October 28th, 2015, the Cassini mission managers decided to boldly send the spacecraft directly through the plumes. This entailed a very small amount of risk of damage to Cassini, but since it was nearing the end of the mission, it was a chance they were willing to take. This flyby, informally called the “Cassini car wash” was a complete success.\nThanks to the hard work of scientists and engineers, we discovered something that was completely unknown to us about this incredible moon of Saturn. This knowledge was not possible without actually visiting the site; no Earth-based telescopes could discover the geysers of water ice that emanate from the south pole. Over a decade of visiting, we learned that this moon harbors a sub-surface ocean of water, complete with organic material and an energy source which remains to be determined with certainty. This means something deeply significant; there could be life in that ocean, under the frozen crust, similar to what we have on Earth at the bottom of the Atlantic ocean, where there are hydrothermal vents."
    }],
    time: "2015-10-28T15:22:30Z",
    camera: [async t => {
      await t.cameraScripts.viewFromSide("sc_cassini", {
        duration: 2,
        distance: 1e3,
        planeId: "enceladus",
        upVector: "-z-axis"
      });
    }],
    onEnter: t => {
      t.getComponent("settings").toggleLightOptions("flood");
      const e = t.scene.getEntity("sc_cassini").getComponent(Pioneer.TrailComponent);
      n.trail = {
        sc_cassini: e.getStartTime()
      };
      e.setRelativeToEntity("enceladus");
      e.setStartTime(1e3);
    },
    onLeave: t => {
      t.getComponent("settings").toggleLightOptions("shadow");
      const e = t.scene.getEntity("sc_cassini").getComponent(Pioneer.TrailComponent);
      e.setRelativeToEntity("");
      e.setStartTime(n.trail.sc_cassini);
      n.trail = {};
    }
  }]
};
export { defaultExport as default };
