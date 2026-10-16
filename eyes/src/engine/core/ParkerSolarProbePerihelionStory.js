// Recovered from app.js:1734753-1739455.
/** 帕克近日点故事：复用近日点时刻，按 slide 设置空间器视角；进入/退出显式切换 spacecraft 图层。 */
let parkerSolarProbePerihelionStory;
const perihelionTime = "2024-12-24T12:56:00Z";
parkerSolarProbePerihelionStory = {
  type: "nonsequential",
  entities: ["sc_parker_solar_probe"],
  onEnter: async app => {
    app.getManager("layer").toggleLayer("spacecraft", {}, false);
  },
  slides: [{
    id: "slide_1",
    type: "overlay",
    classList: ["opaque", "black"],
    content: [{
      type: "title",
      title: "Parker Solar Probe's Closest Pass by the Sun "
    }],
    rate: 0,
    camera: [async app => {
      await app.cameraScripts.goToSpacecraft("sc_parker_solar_probe");
    }]
  }, {
    id: "slide_2",
    type: "panel",
    content: [{
      type: "description",
      description: "NASA’s Parker Solar Probe is a mission to “touch” the Sun. Moving at up to 430,000 miles per hour (692,017 km per hour), the spacecraft endures temperatures up to 1,800 degrees Fahrenheit (982 degrees Celsius) as it flies through the tenuous outer atmosphere of the Sun called the corona to help scientists better understand our closest star. On Dec. 24, 2024, Parker Solar Probe made history with a record-breaking closest approach to the Sun."
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/psp_sun.png",
      title: "Conceptual image of Parker Solar Probe about to enter the solar corona. Credit: NASA SVS",
      alt: "Conceptual image of Parker Solar Probe about to enter the solar corona. Credit: NASA SVS",
      clickable: true
    }],
    time: perihelionTime,
    rate: 1814400,
    entities: ["sc_parker_solar_probe", "sun"],
    camera: [async app => {
      await app.cameraScripts.viewFromSide("sun", {
        distance: 4e8,
        verticalOffset: -50,
        upVector: "z-axis"
      });
    }]
  }, {
    id: "slide_3",
    type: "panel",
    content: [{
      type: "description",
      description: "Since its launch in 2018, Parker Solar Probe has circled gradually closer to the Sun, using flybys of Venus to gravitationally move it into a tighter orbit. These flybys have also enabled new discoveries about Venus. One instrument aboard the spacecraft captured visible and near-infrared light from Venus, giving scientists a new way to see through the planet’s thick clouds to the Venusian surface below, which had only been done with radar and infrared imagery before. The last planned Venus flyby occurred on Nov. 6, 2024, and set the spacecraft up for its closest approach to the Sun. "
    }, {
      type: "replay"
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/psp_venus_flyby.webp",
      title: "Venus as seen by Parker Solar Probe. Credit: NASA",
      alt: "Venus as seen by Parker Solar Probe. Credit: NASA",
      clickable: true
    }],
    time: "2024-10-15T00:10:00",
    rate: 432e3,
    entities: ["sc_parker_solar_probe", "venus"],
    camera: [async app => {
      await app.cameraScripts.goToCenter(["sun", "venus"], "sun", 782223069.182, {
        distance: 35e7
      });
    }]
  }, {
    id: "slide_4",
    type: "panel",
    content: [{
      type: "description",
      description: "Parker Solar Probe’s first pass by the Sun after the final gravity assist of the mission occurred on Dec. 24, 2024, and brought the spacecraft to a record-breaking 3.8 million miles (6.1 million km) above the surface of the Sun. This distance put the spacecraft well within the corona, enabling Parker Solar Probe to conduct unrivaled scientific measurements with the potential to change our understanding of our closest star. When the spacecraft first passed into the solar atmosphere in 2021, it made unexpected findings about the boundary of the corona and imaged structures called coronal streamers, which previously had only been seen from afar. "
    }, {
      type: "replay"
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/psp_coronal_streamers.png",
      title: "Coronal streamers up close. Credit: NASA SVS",
      alt: "Coronal streamers up close. Credit: NASA SVS",
      clickable: true
    }],
    time: perihelionTime,
    rate: 600,
    entities: ["sc_parker_solar_probe", "sun"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_parker_solar_probe", "sun", {
        distance: .04
      });
    }]
  }, {
    id: "slide_5",
    type: "panel",
    content: [{
      type: "description",
      description: "During its closest approach, Parker Solar Probe was out of contact with Earth due to constraints on signal transmission so close to the Sun. It was not until December 27, 2024, that the spacecraft was able to send a beacon signal back to Earth, giving operators at the Johns Hopkins Applied Physics Laboratory – where the probe was designed and built – a hint of its condition after its closest pass of the Sun. When the spacecraft reached a position in its orbit with a clear view of Earth at the end of January 2025, it then sent back the science data it took on its closest flyby of the Sun."
    }, {
      type: "replay"
    }, {
      type: "image",
      src: "https://eyes.nasa.gov/apps/solar-system/assets/images/psp_corona.png",
      title: "Conceptual image of Parker Solar Probe passing through the corona. Credit: NASA SVS",
      alt: "Conceptual image of Parker Solar Probe passing through the corona. Credit: NASA SVS",
      clickable: true
    }],
    time: "2024-12-27T12:16:25.007",
    rate: 10800,
    entities: ["sc_parker_solar_probe", "sun"],
    camera: [async app => {
      await app.cameraScripts.alignObjects("sc_parker_solar_probe", "sun", {
        distance: .04
      });
    }]
  }],
  onLeave: async app => {
    app.getManager("layer").toggleLayer("spacecraft", {}, true);
  }
};
export { parkerSolarProbePerihelionStory as default };
