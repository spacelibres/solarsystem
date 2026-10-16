// Recovered from app.js:1723208-1734752.
/** 旅行者故事：临时轨迹长度、标签例外、回到当前时刻的定时器与相机缩放适配。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
let voyagerGrandTourStory;
const savedStoryState = {
  layers: []
};
voyagerGrandTourStory = {
  type: "nonsequential",
  entities: ["sc_voyager_1", "sc_voyager_2"],
  onEnter: async app => {
    const layerManager = app.getManager("layer");
    const layerPanelComponent = app.getComponent("layerPanel");
    ["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft"].forEach(layerId => {
      if (layerManager.getLayer(layerId).visible) {
        savedStoryState.layers.push(layerId);
        layerPanelComponent.toggleLayer(layerId);
      }
    });
    ["planets", "majorMoons"].forEach(layerId => {
      if (!layerManager.getLayer(layerId).visible) {
        savedStoryState.layers.push(layerId);
        layerPanelComponent.toggleLayer(layerId);
      }
    });
  },
  onLeave: app => {
    if (savedStoryState.zoomFitController && app.scene.getEntity("camera").getController(SolarSystemSceneExports.ZoomFitController)) {
      app.scene.getEntity("camera").removeController(savedStoryState.zoomFitController);
      delete savedStoryState.zoomFitController;
    }
    const {
      layers: layers
    } = savedStoryState;
    const layerPanelComponent = app.getComponent("layerPanel");
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) layerPanelComponent.toggleLayer(layers[layerIndex]);
    savedStoryState.layers = [];
  },
  slides: [{
    id: "slide_1",
    type: "overlay",
    classList: ["opaque", "black"],
    content: [{
      type: "title",
      title: "Voyager's Grand Tour",
      subtitle: "1977 - Today"
    }],
    time: "1977-09-05T12:56:00Z",
    rate: 0,
    camera: [async app => {
      await app.cameraScripts.goToSystem("outer_solar_system");
    }]
  }, {
    id: "slide_2",
    type: "panel",
    content: [{
      type: "description",
      description: "The twin spacecraft Voyager 1 and Voyager 2 were launched by NASA in separate months in the summer of 1977. The Voyager mission was designed to take advantage of a rare geometric arrangement of the outer planets in the late 1970s and the 1980s which allowed for a four-planet tour for a minimum of propellant and trip time. This layout of Jupiter, Saturn, Uranus and Neptune, which occurs about every 175 years, allows a spacecraft on a particular flight path to swing from one planet to the next without the need for large onboard propulsion systems."
    }, {
      type: "replay"
    }],
    time: "1977-09-05T12:56:00Z",
    rate: 25228800,
    onEnter: async app => {
      app.getManager("label").addExceptions(["sc_voyager_1", "sc_voyager_2"]);
      if (!savedStoryState.trail) {
        const voyagerOneTrail = app.scene.getEntity("sc_voyager_1").getComponent(Pioneer.TrailComponent);
        const voyagerTwoTrail = app.scene.getEntity("sc_voyager_2").getComponent(Pioneer.TrailComponent);
        savedStoryState.trail = {
          sc_voyager_1: voyagerOneTrail.getStartTime(),
          sc_voyager_2: voyagerTwoTrail.getStartTime()
        };
        voyagerOneTrail.setStartTime(1e8 * voyagerOneTrail.getStartTime());
        voyagerTwoTrail.setStartTime(1e8 * voyagerTwoTrail.getStartTime());
      }
      // 500ms 只检查是否到达真实现在；到达或离开 slide 都必须释放该定时器。
      if (!savedStoryState.timeCheck) {
        const timeManager = app.getManager("time");
        savedStoryState.timeCheck = setInterval(() => {
          if (timeManager.getTime().valueOf() >= timeManager.getNow().valueOf()) {
            clearInterval(savedStoryState.timeCheck);
            timeManager.resetTimeRate();
            timeManager.setToNow();
            delete savedStoryState.timeCheck;
          }
        }, 500);
      }
      await app.getManager("scene").isListReady(["sun", "earth", "sc_voyager_1", "sc_voyager_2"]);
    },
    onLeave: app => {
      app.getManager("label").removeExceptions(["sc_voyager_1", "sc_voyager_2"]);
      app.scene.getEntity("sc_voyager_1").getComponent(Pioneer.TrailComponent).setStartTime(savedStoryState.trail.sc_voyager_1);
      app.scene.getEntity("sc_voyager_2").getComponent(Pioneer.TrailComponent).setStartTime(savedStoryState.trail.sc_voyager_2);
      delete savedStoryState.trail;
      if (savedStoryState.timeCheck) {
        clearInterval(savedStoryState.timeCheck);
        delete savedStoryState.timeCheck;
      }
    },
    camera: [async app => {
      const timeManager = app.getManager("time");
      timeManager.pause();
      await app.cameraScripts.showLocation("sun", "earth", "earth", "planeNormal", {
        distance: 6e8,
        duration: 2,
        startFromTarget: false,
        rotateByScreenRatio: false
      });
      await app.scene.getLoadedPromise();
      const cameraEntity = app.scene.getEntity("camera");
      savedStoryState.zoomFitController = cameraEntity.addController(SolarSystemSceneExports.ZoomFitController, "", cameraEntity.getController(Pioneer.AlignController));
      savedStoryState.zoomFitController.addEntity("sun");
      savedStoryState.zoomFitController.addEntity("sc_voyager_1");
      savedStoryState.zoomFitController.addEntity("sc_voyager_2");
      savedStoryState.zoomFitController.setEdgeSize(.04);
      savedStoryState.zoomFitController.setTightFit(true);
      savedStoryState.zoomFitController.setZoomOutOnly(false);
      await app.scene.getLoadedPromise();
      timeManager.play();
    }]
  }, {
    id: "slide_3",
    type: "panel",
    content: [{
      type: "description",
      description: "Voyager 1 was the first to reach Jupiter, in March of 1979, followed by Voyager 2 in August. Discovery of active volcanism on the satellite Io was easily the greatest unexpected discovery at Jupiter. It was the first time active volcanoes had been seen on another body in the solar system. The Voyagers also discovered that the Great Red Spot was revealed as a complex storm moving in a counterclockwise direction, and a movie was made of it as Voyager 1 was inbound."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA02855_blue_movie.gif",
      title: 'Voyager 1 "Blue Movie"',
      alt: 'Voyager 1 "Blue Movie"',
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA01971_volcanic_explosion_on_io.jpg",
      title: "Volcanic Explosion on Io",
      alt: "Volcanic Explosion on Io",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00010_io_with_loki_plume_on_bright_limb.jpg",
      title: "Io with Loki Plume on Bright Limb",
      alt: "Io with Loki Plume on Bright Limb",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00014_jupiter_great_red_spot.jpg",
      title: "Jupiter's Great Red Spot",
      alt: "Jupiter's Great Red Spot",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA02857_io_rotation_movie.gif",
      title: "Io Rotation Movie",
      alt: "Io Rotation Movie",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA01384_jupiter_great_red_spot.jpg",
      title: "Jupiter's Great Red Spot",
      alt: "Jupiter's Great Red Spot",
      clickable: true
    }],
    time: "1979-03-04T15:56:00-08:00",
    rate: 600,
    entities: ["jupiter", "io"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_voyager_1", "jupiter", {
        duration: 4,
        distance: .04,
        horizontalOffset: 10
      });
    }]
  }, {
    id: "slide_4",
    type: "panel",
    content: [{
      type: "description",
      description: 'The Voyager spacecraft both used Jupiter\'s gravity as a free speed boost, or a "slingshot" to reach Saturn. At Saturn, the Voyagers discovered many new details about Saturn\'s rings, as well as new data about Saturn\'s large moon Titan, which has an atmosphere. After the Saturn encounter, Voyager 1 headed "up" from Saturn, out of the plane of the ecliptic, whereas Voyager 2 continued on towards Uranus and Neptune.'
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA02269_saturn_ring_system.jpg",
      title: "Saturn's Ring System",
      alt: "Saturn's Ring System",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA02238_titan_thick_haze_layer.jpg",
      title: "Titan's Thick Haze Layer",
      alt: "Titan's Thick Haze Layer",
      clickable: true
    }],
    time: "1980-11-11T15:00:00-08:00",
    rate: 3600,
    entities: ["saturn", "titan"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_voyager_1", "saturn", {
        duration: 4,
        distance: .04,
        horizontalOffset: 10,
        verticalOffset: -5
      });
    }]
  }, {
    id: "slide_5",
    type: "panel",
    content: [{
      type: "description",
      description: "With Voyager 1's primary science phase over, Voyager 2 made the long journey out to Uranus, arriving in January of 1986. The planet had never been visited before, and the encounter did not disappoint: Voyager 2 found eleven new moons and two new rings around the planet. This was the first-ever visit to Uranus."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA18182_uranus_as_seen_by_nasa_voyager_2.jpg",
      title: "Uranus as seen by NASA's Voyager 2",
      alt: "Uranus as seen by NASA's Voyager 2",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00036_titania_high-resolution_color_composite.jpg",
      title: "Titania High-Resolution Color Composite",
      alt: "Titania High-Resolution Color Composite",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00141_miranda_geologic_history_(variety_of_terrain).jpg",
      title: "Miranda's Geologic History (Variety of Terrain)",
      alt: "Miranda's Geologic History (Variety of Terrain)",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA01977_uranus_rings.jpg",
      title: "Uranus Rings",
      alt: "Uranus Rings",
      clickable: true
    }],
    time: "1986-01-23T04:00:00-08:00",
    rate: 3600,
    entities: ["uranus"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_voyager_2", "uranus", {
        duration: 4,
        distance: .08,
        horizontalOffset: 15
      });
    }]
  }, {
    id: "slide_6",
    type: "panel",
    content: [{
      type: "description",
      description: "Voyager 2 makes its closest approach to Neptune, making it the first spacecraft to observe Neptune up close and the first to visit four planets beyond Earth. Highlights from the encounter include the discovery of six new moons, the first images of Neptune's rings, and the discovery of a huge, counter-clockwise rotating storm in Neptune's southern hemisphere, named \"The Great Dark Spot\"."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA02245_neptune_blue-green_atmosphere.jpg",
      title: "Neptune's Blue-green Atmosphere",
      alt: "Neptune's Blue-green Atmosphere",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00058_neptune_clouds_showing_vertical_relief.jpg",
      title: "Neptune Clouds Showing Vertical Relief",
      alt: "Neptune Clouds Showing Vertical Relief",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/PIA00317_global_color_mosaic_of_triton.jpg",
      title: "Global Color Mosaic of Triton",
      alt: "Global Color Mosaic of Triton",
      clickable: true
    }],
    time: "1989-08-24T16:30:00Z",
    rate: 3e3,
    entities: ["neptune", "triton"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_voyager_2", "neptune", {
        duration: 4,
        distance: .07,
        verticalOffset: 10
      });
    }],
    onEnter: app => {
      app.getComponent("settings").toggleLightOptions("flood");
    },
    onLeave: app => {
      app.getComponent("settings").toggleLightOptions("shadow");
    }
  }, {
    id: "slide_7",
    type: "panel",
    content: [{
      type: "description",
      description: 'After visiting Neptune, Voyager 2 turned "down" or south of the ecliptic plane, while Voyager 1 turned "up" or north of the plane. Each spacecraft headed out in a different direction, and they will never stop. In August of 2012, it was determined that Voyager 1 had reached the edge of the sun\'s influence(the heliopause), which is the boundary where the solar wind is balanced by the interstellar wind. Voyager 2 reached the heliopause in 2018.'
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/heliosphere.jpg",
      title: "Heliosphere",
      alt: "Heliosphere",
      clickable: true
    }],
    time: "2012-08-25T00:00:00-08:00",
    onEnter: app => {
      app.scene.getEntity("sun").getComponent(Pioneer.ModelComponent)?.setEnabled(true);
    },
    onLeave: app => {
      app.scene.getEntity("sun").getComponent(Pioneer.ModelComponent)?.setEnabled(false);
    },
    camera: [async app => {
      await app.getManager("camera").goToEntity("sc_voyager_1", {
        duration: 3,
        destination: new Pioneer.Vector3(82226007739.1375, -56908057519.63546, 597193963.1270928),
        destinationUp: Pioneer.Vector3.ZAxis
      });
    }]
  }, {
    id: "slide_8",
    type: "panel",
    content: [{
      type: "description",
      description: "The Voyager spacecraft are still sending back data to this day, and will wander the Milky Way forever. Each spacecraft carries a message, prepared by a team headed by Carl Sagan, in the form of a 12 inch (30-centimeter) diameter gold-plated copper disc for potential extraterrestrials who might find the spacecraft. Like the plaques on Pioneers 10 and 11, the record has symbols to show the location of Earth relative to several pulsars. The records also contain instructions to play them using a cartridge and a needle, much like a vinyl record player. The audio on the disc includes greetings in 55 languages, 35 sounds from life on Earth (such as whale songs, laughter, etc.), 90 minutes of generally Western music including everything from Mozart and Bach to Chuck Berry and Blind Willie Johnson. It also includes 115 images of life on Earth and recorded greetings."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/voyager_golden_record_cover.jpg",
      title: "Voyager's Golden Record Cover",
      alt: "Voyager's Golden Record Cover",
      clickable: true
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/voyager_golden_record.jpg",
      title: "Voyager's Golden Record",
      alt: "Voyager's Golden Record",
      clickable: true
    }],
    onEnter: async app => {
      const sceneManager = app.getManager("scene");
      await sceneManager.isReady("sc_voyager_1");
      SolarSystemSceneExports.Entity.createFromOptions("voyager_disc", {
        occlusionRadius: 1e-4,
        extentsRadius: 1e-4,
        parents: [[Number.NEGATIVE_INFINITY, "sc_voyager_1"]],
        controllers: [{
          type: "fixed",
          position: new Pioneer.Vector3(95e-5, 0, 0),
          orientation: Pioneer.Quaternion.Identity
        }, {
          type: "rotateByEntityOrientation"
        }]
      }, app.scene);
      await sceneManager.isReady("voyager_disc");
      await app.pioneer.waitUntilNextFrame();
    },
    onLeave: async app => {
      app.scene.getEntity("camera").setParent(app.scene.getEntity("sc_voyager_1"));
      app.scene.removeEntity("voyager_disc");
    },
    camera: [async app => {
      await app.cameraScripts.goToInstrument("voyager_disc", {
        distance: .005,
        upVector: "-z-axis",
        forwardVector: "x-axis"
      });
    }]
  }]
};
export { voyagerGrandTourStory as default };
