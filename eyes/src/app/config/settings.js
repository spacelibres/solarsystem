// Recovered from app.js:1354282-1357388.
/** 分享/嵌入查询项定义；强制重启必须有正会话时长，将时长设为零会关闭强制重启并触发 change。 */
let settingsDefinitions;
const settingsGroups = [{
  groupName: "User Interface",
  isAdvanced: false,
  items: [{
    name: "Show Interact Prompt on Load",
    description: "When the app is first loading, show an overlay to prompt the user to view and start interacting",
    query: "interactPrompt",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: false
  }, {
    name: "Show Featured Stories/Events",
    description: "Shows the featured stories panel on the left side of the home page",
    query: "featured",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }]
}, {
  groupName: "3D",
  isAdvanced: false,
  items: [{
    name: "Enable Surface Texture Tiling",
    description: "When zooming into 3D spherical surfaces, dynamically loads texture tiles in greater detail. Currently available for Earth/Moon/Mars only",
    query: "surfaceMapTiling",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: false
  }, {
    name: "Enable HD Textures",
    description: "Loads high-definition textures, where available, for 3D entities",
    query: "hd",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: false
  }, {
    groupName: "Layers",
    nestedGroup: true,
    items: [{
      name: "Orbiters",
      query: "orbiters",
      type: "checkbox",
      inputDefault: true,
      appQueryDefault: true,
      description: "Show spacecraft orbiting a celestial body, if any"
    }, {
      name: "Landers",
      query: "landers",
      type: "checkbox",
      inputDefault: true,
      appQueryDefault: true,
      description: "Show landers on a celestial body, if any"
    }, {
      name: "Major Moons",
      query: "majorMoons",
      type: "checkbox",
      inputDefault: true,
      appQueryDefault: true,
      description: "Show major moons of planets, if any"
    }, {
      name: "Minor Moons",
      query: "minorMoons",
      type: "checkbox",
      inputDefault: false,
      appQueryDefault: false,
      description: "Show minor moons of planets, if any"
    }, {
      name: "Heliosphere",
      query: "heliosphere",
      type: "checkbox",
      inputDefault: false,
      appQueryDefault: false,
      description: "Show the heliosphere"
    }]
  }]
}, {
  groupName: "Kiosk/Museum Mode",
  isAdvanced: true,
  items: [{
    name: "Force Restart Session",
    description: "At the end of a session, a forced restart means there is no option to continue the session. Requires a session time greater than zero",
    query: "forceRestart",
    type: "checkbox",
    onChange: forceRestartEnabled => {
      if (forceRestartEnabled) {
        const maxSessionTimeInput = document.getElementById("input-maxSessionTime");
        if ("0" === maxSessionTimeInput.value) {
          maxSessionTimeInput.value = "1";
          maxSessionTimeInput.dispatchEvent(new Event("change", {
            bubbles: true
          }));
        }
      }
    },
    inputDefault: false,
    appQueryDefault: false
  }, {
    name: "Session Time (minutes)",
    description: "Specifies the maximum duration of an individual session, represented by a countdown clock. A value of zero disables the session time limit",
    query: "maxSessionTime",
    type: "number",
    onChange: sessionMinutes => {
      if ("0" === sessionMinutes) {
        const forceRestartInput = document.getElementById("input-forceRestart");
        forceRestartInput.checked = false;
        forceRestartInput.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
    },
    values: [0, 1 / 0, .1],
    inputDefault: 0,
    greyValue: 0,
    appQueryDefault: 0
  }, {
    name: "Inactivity Time (minutes)",
    description: "Specifies the time of inactivity before auto-play is triggered. A value of zero disables auto-play",
    query: "maxInactivityTime",
    type: "number",
    values: [0, 1 / 0, .1],
    inputDefault: 0,
    greyValue: 0,
    appQueryDefault: 0
  }]
}, {
  groupName: "Spout",
  isAdvanced: true,
  items: [{
    name: "Enable Spout Projection",
    description: "Enables Spout projection onto a 3D sphere with relevant third party software",
    query: "spout",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: false
  }]
}];
settingsDefinitions = settingsGroups;
export { settingsDefinitions as default };
