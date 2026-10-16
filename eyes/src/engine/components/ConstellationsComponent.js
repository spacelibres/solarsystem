// 星座二进制依次读取名称、颜色、星点与连线索引；星点轴向转换后绘制，标签放在等距归一化星点包围盒中心。标签实体由本组件创建并在卸载时移除。
// Recovered from app.js:740174-744710.
import * as Pioneer from "../pioneer/index.js";
import * as SceneHelpers from "../core/SceneHelpers.js";
class ConstellationsComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._url = "";
    this._database = [];
    this._labelEntities = [];
    this._color = new Pioneer.Color();
    this._lineWidth = 2;
    this._glowWidth = 0;
    this._highlightedIndex = void 0;
    this._highlightColor = new Pioneer.Color();
    this._highlightWidth = 0;
    this._meshes = [];
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  setColor(color) {
    this._color.copy(color);
    for (let meshIndex = 0; meshIndex < this._meshes.length; meshIndex++) {
      const mesh = this._meshes[meshIndex];
      const colors = [];
      for (let vertexIndex = 0; vertexIndex < mesh.numVertices; vertexIndex++) colors.push(this._color);
      mesh.lineMesh.setColors(colors);
    }
  }
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    for (let meshIndex = 0; meshIndex < this._meshes.length; meshIndex++) this._meshes[meshIndex].lineMesh.setWidths(lineWidth);
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    for (let meshIndex = 0, meshCount = this._meshes.length; meshIndex < meshCount; meshIndex++) this._meshes[meshIndex].lineMesh.setGlowWidth(this._glowWidth);
  }
  setUrl(url) {
    this._url = url;
    this.resetResources();
  }
  getNames() {
    const names = [];
    for (let constellationIndex = 0, constellationCount = this._database.length; constellationIndex < constellationCount; constellationIndex++) names.push(this._database[constellationIndex].name);
    return names;
  }
  setHighlight(highlightedIndex, highlightColor, highlightWidth) {
    let mesh = void 0 !== this._highlightedIndex ? this._meshes[this._highlightedIndex] : void 0;
    if (mesh) {
      const colors = [];
      for (let vertexIndex = 0, vertexCount = mesh.numVertices; vertexIndex < vertexCount; vertexIndex++) colors.push(this._color);
      mesh.lineMesh.setColors(colors);
      mesh.lineMesh.setWidths(this._lineWidth);
    }
    this._highlightedIndex = highlightedIndex;
    this._highlightColor.copy(highlightColor);
    this._highlightWidth = highlightWidth;
    mesh = void 0 !== this._highlightedIndex ? this._meshes[this._highlightedIndex] : void 0;
    if (mesh) {
      const colors = [];
      for (let vertexIndex = 0, vertexCount = mesh.numVertices; vertexIndex < vertexCount; vertexIndex++) colors.push(this._highlightColor);
      mesh.lineMesh.setColors(colors);
      mesh.lineMesh.setWidths(this._highlightWidth);
    }
  }
  getNearestConstellationIndex(pixelPosition, camera) {
    let nearestIndex;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let labelIndex = 0, labelCount = this._labelEntities.length; labelIndex < labelCount; labelIndex++) {
      const distance = pixelPosition.distance(this._labelEntities[labelIndex].getPixelSpacePosition(camera));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = labelIndex;
      }
    }
    return nearestIndex;
  }
  __prepareForRender(camera) {
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), camera);
    for (let meshIndex = 0; meshIndex < this._meshes.length; meshIndex++) this._meshes[meshIndex].lineMesh.prepareForRender(camera);
  }
  async __loadResources() {
    this._labelEntities = [];
    this._meshes = [];
    const download = await this.getEntity().getScene().getEngine().getDownloader().download(this._url, "binary", -this.getEntity().getLeastCameraDepth());
    const reader = new Pioneer.Reader(download.content);
    for (; !reader.isAtEnd();) {
      const constellation = {
        name: "",
        stars: [],
        segments: [],
        color: []
      };
      constellation.name = reader.readString(reader.readByte());
      constellation.color = [reader.readByte(), reader.readByte(), reader.readByte(), reader.readByte()];
      const starCount = reader.readByte();
      for (let starIndex = 0; starIndex < starCount; starIndex++) constellation.stars.push([reader.readFloat32(), reader.readFloat32(), reader.readFloat32()]);
      const segmentVertexCount = 2 * reader.readByte();
      for (let vertexIndex = 0; vertexIndex < segmentVertexCount; vertexIndex++) constellation.segments.push(reader.readByte());
      this._database.push(constellation);
    }
    for (let constellationIndex = 0; constellationIndex < this._database.length; constellationIndex++) {
      const constellation = this._database[constellationIndex];
      const stars = constellation.stars;
      const segmentIndices = constellation.segments;
      const positions = [];
      const colors = [];
      const widths = [];
      for (let vertexIndex = 0; vertexIndex < segmentIndices.length; vertexIndex++) {
        const star = stars[segmentIndices[vertexIndex]];
        if (void 0 !== star) {
          positions.push(new Pioneer.Vector3(star[2], -star[0], star[1]));
          colors.push(constellationIndex === this._highlightedIndex ? this._highlightColor : this._color);
          widths.push(constellationIndex === this._highlightedIndex ? this._highlightWidth : this._lineWidth);
        }
      }
      const lineMesh = new Pioneer.LineMesh(this);
      lineMesh.setPositions(positions);
      lineMesh.setColors(colors);
      lineMesh.setWidths(widths);
      lineMesh.setGlowWidth(this._glowWidth);
      this._meshes.push({
        numVertices: segmentIndices.length,
        lineMesh: lineMesh
      });
    }
    Pioneer.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation());
    for (let constellationIndex = 0; constellationIndex < this._database.length; constellationIndex++) {
      const constellation = this._database[constellationIndex];
      const stars = constellation.stars;
      if (0 === stars.length) continue;
      const firstStar = stars[0];
      const boundsMin = new Pioneer.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      const boundsMax = new Pioneer.Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
      const radius = Math.sqrt(firstStar[0] * firstStar[0] + firstStar[1] * firstStar[1] + firstStar[2] * firstStar[2]);
      for (let starIndex = 0; starIndex < stars.length; starIndex++) {
        const star = stars[starIndex];
        const position = new Pioneer.Vector3();
        position.set(star[2], -star[0], star[1]);
        position.rotate(SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation(), position);
        position.normalize(position);
        position.mult(position, radius);
        if (boundsMin.x > position.x) {
          boundsMin.x = position.x;
        }
        if (boundsMax.x < position.x) {
          boundsMax.x = position.x;
        }
        if (boundsMin.y > position.y) {
          boundsMin.y = position.y;
        }
        if (boundsMax.y < position.y) {
          boundsMax.y = position.y;
        }
        if (boundsMin.z > position.z) {
          boundsMin.z = position.z;
        }
        if (boundsMax.z < position.z) {
          boundsMax.z = position.z;
        }
      }
      const labelPosition = new Pioneer.Vector3();
      labelPosition.add(boundsMin, boundsMax);
      labelPosition.mult(labelPosition, .5);
      const labelEntity = this.getEntity().getScene().addEntity(`constellation_label_${constellation.name}`);
      labelEntity.setParent(this.getEntity());
      labelEntity.setOrientation(Pioneer.Quaternion.Identity);
      labelEntity.setPosition(labelPosition);
      const labelComponent = labelEntity.addComponent(Pioneer.DivComponent);
      labelComponent.setAlignment(new Pioneer.Vector2(.5, .5));
      const labelDiv = labelComponent.getDiv();
      labelDiv.classList.add("pioneer-constellation-label");
      labelDiv.innerHTML = constellation.name;
      this._labelEntities.push(labelEntity);
    }
  }
  __unloadResources() {
    for (let labelIndex = 0; labelIndex < this._labelEntities.length; labelIndex++) this.getEntity().getScene().removeEntity(this._labelEntities[labelIndex]);
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._meshes = [];
    this._database = [];
  }
  _url;
  _database;
  _labelEntities;
  _color;
  _lineWidth;
  _glowWidth;
  _highlightedIndex;
  _highlightColor;
  _highlightWidth;
  _meshes;
}
export { ConstellationsComponent };
