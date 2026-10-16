// 星表读取视星等、绝对星等、RGB 和坐标，按黄道到赤道变换后写入点云；颜色第四分量保存绝对星等供 shader 求亮度，保留资源与池对象的原释放路径。
// Recovered from app.js:421561-426233.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Star {
  mag;
  absMag;
  color;
  position;
  constructor() {
    this.mag = 0;
    this.absMag = 0;
    this.color = new PioneerPublicApi.Color();
    this.position = new PioneerPublicApi.Vector3();
  }
}
class StarfieldComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._url = "";
    this._particleSize = 1;
    this.__setRadius(1e24);
  }
  getUrl() {
    return this._url;
  }
  setUrl(url) {
    this._url = url;
    this.resetResources();
  }
  getParticleSize() {
    return this._particleSize;
  }
  setParticleSize(particleSize) {
    this._particleSize = particleSize;
  }
  __prepareForRender(camera) {
    const renderSize = PioneerPublicApi.Vector2.pool.get();
    if (camera instanceof PioneerPublicApi.SpoutComponent) renderSize.set(camera.getRenderWidth(), .5 * camera.getRenderWidth());else {
      const viewport = camera.getViewport();
      if (!viewport) return;
      renderSize.copy(viewport.getBounds().size);
    }
    const particleScale = Math.sqrt(Math.max(renderSize.x, renderSize.y) * window.devicePixelRatio) / 60;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "particleSize", this._particleSize * particleScale);
    PioneerPublicApi.Vector2.pool.release(renderSize);
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
  }
  async __loadResources() {
    const stars = await this._loadStars();
    if (this.isDestroyed()) return;
    const shaderMaterial = new PioneerPublicApi.THREE.ShaderMaterial({
      vertexShader: StarfieldComponent.vertexShader,
      fragmentShader: StarfieldComponent.fragmentShader,
      transparent: true,
      blending: PioneerPublicApi.THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        particleSize: new PioneerPublicApi.THREE.Uniform(1),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      }
    });
    this.getThreeJsMaterials().push(shaderMaterial);
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), 3));
    bufferGeometry.setAttribute("color", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), 4));
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    const points = new PioneerPublicApi.THREE.Points(bufferGeometry, shaderMaterial);
    PioneerPublicApi.ThreeJsHelper.setupObject(this, points);
    points.renderOrder = -2;
    this.getThreeJsObjects().push(points);
    const positions = new Float32Array(3 * stars.length);
    const colors = new Float32Array(4 * stars.length);
    const indices = new Uint16Array(stars.length);
    for (let starIndex = 0; starIndex < stars.length; starIndex++) {
      const star = stars[starIndex];
      positions[3 * starIndex + 0] = star.position.x;
      positions[3 * starIndex + 1] = star.position.y;
      positions[3 * starIndex + 2] = star.position.z;
      colors[4 * starIndex + 0] = star.color.r;
      colors[4 * starIndex + 1] = star.color.g;
      colors[4 * starIndex + 2] = star.color.b;
      colors[4 * starIndex + 3] = star.absMag;
      indices[starIndex] = starIndex;
    }
    PioneerPublicApi.ThreeJsHelper.setVertices(bufferGeometry, "position", positions);
    PioneerPublicApi.ThreeJsHelper.setVertices(bufferGeometry, "color", colors);
    PioneerPublicApi.ThreeJsHelper.setIndices(bufferGeometry, indices);
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  async _loadStars() {
    const download = await this.getEntity().getScene().getEngine().getDownloader().download(this._url, "binary", -this.getEntity().getLeastCameraDepth());
    const reader = new PioneerPublicApi.Reader(download.content);
    const starCount = reader.readInt32();
    const stars = [];
    for (let starIndex = 0; starIndex < starCount; starIndex++) {
      const star = new Star();
      star.mag = reader.readFloat32();
      star.absMag = reader.readFloat32();
      star.color.r = reader.readByte() / 255;
      star.color.g = reader.readByte() / 255;
      star.color.b = reader.readByte() / 255;
      star.color.div(star.color, star.color.max());
      star.position.y = -reader.readFloat32();
      star.position.z = reader.readFloat32();
      star.position.x = reader.readFloat32();
      star.position.rotate(StarfieldComponent.eclipJ2000ToJ2000Rotation, star.position);
      stars.push(star);
    }
    return stars;
  }
  _url;
  _particleSize;
  static eclipJ2000ToJ2000Rotation = new PioneerPublicApi.Quaternion(.9791532214288992, .2031230389823101, 0, 0);
  static vertexShader = `\n\t\t#define PI 3.1415926538\n\n\t\tin vec4 color;\n\t\tout vec4 fColor;\n\n\t\tuniform float particleSize;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\t// Returns the watts per km^2.\n\t\tfloat absoluteMagnitudeToFlux(float absoluteMagnitude, float distance) {\n\t\t\tfloat luminosityInWatts = 3.0128e28 * pow(10.0, absoluteMagnitude / -2.5);\n\t\t\treturn luminosityInWatts / (4.0 * PI * distance * distance);\n\t\t}\n\n\t\tvoid main() {\n\t\t\tvec4 viewPosition = modelViewMatrix * vec4(position, 1.0);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\tgl_Position.w = viewPosition.y;\n\t\t\tfColor = color;\n\n\t\t\t// Get the flux and brightness of the star at the camera's point.\n\t\t\tfloat absMag = color.a;\n\t\t\tfloat distance = length(viewPosition);\n\t\t\tfloat flux = absoluteMagnitudeToFlux(absMag, distance);\n\t\t\tfloat brightness = 2.0 * log(1.0 + flux * 1e4);\n\n\t\t\t// Adjust the color and size so that it is visually pleasing.\n\t\t\tfColor.a = clamp(brightness * particleSize, 0.05, 1.0);\n\t\t\tgl_PointSize = clamp(brightness * 4.0 * particleSize, 5.0, 50.0);\n\n\t\t\t// If it is too close, fade the star.\n\t\t\tfColor.a = mix(0.0, fColor.a, clamp((distance - 1.0e12) / 9.0e12, 0.0, 1.0));\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static fragmentShader = `\n\t\tprecision highp float;\n\n\t\tin vec4 fColor;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tvoid main(void) {\n\t\t\tfloat distanceFromEdge = clamp(1.0 - 2.0 * length(gl_PointCoord - vec2(0.5, 0.5)), 0.0, 1.0);\n\t\t\tfloat a = pow(distanceFromEdge, 5.0);\n\t\t\tpc_fragColor.rgb = fColor.rgb;\n\t\t\tpc_fragColor.a = fColor.a * a;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { StarfieldComponent };
