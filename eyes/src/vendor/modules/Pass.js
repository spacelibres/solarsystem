// Recovered from vendors.js:882328-883224.
import * as ThreeCore from "../three/core.js";
class Pass {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
}
const orthographicCamera = new ThreeCore.OrthographicCamera(-1, 1, 1, -1, 0, 1);
class FullscreenTriangleGeometry extends ThreeCore.BufferGeometry {
  constructor() {
    super(), this.setAttribute("position", new ThreeCore.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new ThreeCore.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
  }
}
const fullscreenTriangleGeometry = new FullscreenTriangleGeometry();
class FullScreenQuad {
  constructor(e) {
    this._mesh = new ThreeCore.Mesh(fullscreenTriangleGeometry, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, orthographicCamera);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
export { FullScreenQuad };
export { Pass };
