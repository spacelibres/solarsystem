// Recovered from app.js:170473-190525.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 实体拥有组件、控制器与父子关系；状态相对父级存储，相机缓存按 camera 分开，并在换父级时递归清理。
class Entity extends PioneerPublicApi.CollectionItem {
  constructor(entityName, scene) {
    super(entityName, scene);
    this._enabled = true;
    this._disabledByAncestor = false;
    this._destroyed = false;
    this._parent = null;
    this._lastParent = null;
    this._children = [];
    this._parentingTable = [];
    this._parentChangedCallbacks = [];
    this._childChangedCallbacks = [];
    this._state = new EntityState();
    this._lastState = new EntityState();
    this._cameraSpacePosition = new PioneerPublicApi.FastMap();
    this._normalSpacePosition = new PioneerPublicApi.FastMap();
    this._pixelSpacePosition = new PioneerPublicApi.FastMap();
    this._normalSpaceExtentsRadius = new PioneerPublicApi.FastMap();
    this._pixelSpaceExtentsRadius = new PioneerPublicApi.FastMap();
    this._greatestPixelSpaceExtentsRadius = 0;
    this._cameraDepths = new PioneerPublicApi.FastMap();
    this._leastCameraDepth = Number.MAX_SAFE_INTEGER;
    this._components = new PioneerPublicApi.Collection(this);
    this._controllers = new PioneerPublicApi.Collection(this);
    this._occlusionRadius = 0;
    this._extentsRadius = 0;
    this._groundComponent = null;
    this._canOcclude = true;
    this._positionCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._orientationCoverage = new PioneerPublicApi.Interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this._isInPositionCoverage = false;
    this._isInOrientationCoverage = false;
  }
  getScene() {
    return this.__getCollectionParent();
  }
  isEnabled() {
    return this._enabled && !this._disabledByAncestor;
  }
  isDisabledByAncestor() {
    return this._disabledByAncestor;
  }
  setEnabled(enabled) {
    this._enabled !== enabled && (this._enabled = enabled, this._updateEnabled());
  }
  _updateEnabled() {
    for (let componentIndex = 0; componentIndex < this._components.getSize(); componentIndex++) this._components.getAt(componentIndex).__updateLoadState();
    for (let childIndex = 0, childCount = this._children.length; childIndex < childCount; childIndex++) this._children[childIndex]._updateDisabledByAncestor();
    this.getScene().getControllerDependencyGraph().needsSorting();
  }
  _updateDisabledByAncestor() {
    let disabledByAncestor = false;
    let parent = this._parent;
    for (; null !== parent;) {
      if (!parent._enabled || parent._disabledByAncestor) {
        disabledByAncestor = true;
        break;
      }
      parent = parent._parent;
    }
    this._disabledByAncestor !== disabledByAncestor && (this._disabledByAncestor = disabledByAncestor, this._updateEnabled());
  }
  isDestroyed() {
    return this._destroyed;
  }
  getPosition() {
    return this._state.position;
  }
  setPosition(position) {
    this._state.position.copy(position);
  }
  getVelocity() {
    return this._state.velocity;
  }
  setVelocity(velocity) {
    this._state.velocity.copy(velocity);
  }
  getOrientation() {
    return this._state.orientation;
  }
  setOrientation(orientation) {
    this._state.orientation.copy(orientation);
  }
  getAngularVelocity() {
    return this._state.angularVelocity;
  }
  setAngularVelocity(angularVelocity) {
    this._state.angularVelocity.copy(angularVelocity);
  }
  getLastPosition() {
    return this._lastState.position;
  }
  getLastVelocity() {
    return this._lastState.velocity;
  }
  getLastOrientation() {
    return this._lastState.orientation;
  }
  getLastAngularVelocity() {
    return this._lastState.angularVelocity;
  }
  // 先累加源端到共同祖先的偏移，再减去目标端偏移；显式时刻沿 parentingTable 查父级。池对象在各分支按原顺序归还。
  getPositionRelativeToEntity(output, localPosition, targetEntity, time) {
    let ancestor = this;
    if (output.copy(localPosition), void 0 === time) {
      const commonAncestor = this.getLowestCommonAncestor(targetEntity);
      if (null === commonAncestor) return void output.copy(PioneerPublicApi.Vector3.NaN);
      for (; ancestor !== commonAncestor;) {
        output.add(output, ancestor.getPosition());
        const parent = ancestor.getParent();
        if (null === parent) return void output.copy(PioneerPublicApi.Vector3.NaN);
        ancestor = parent;
      }
      const targetOffset = PioneerPublicApi.Vector3.pool.get();
      for (targetOffset.copy(PioneerPublicApi.Vector3.Zero), ancestor = targetEntity; ancestor !== commonAncestor;) {
        targetOffset.add(targetOffset, ancestor.getPosition());
        const parent = ancestor.getParent();
        if (null === parent) {
          output.copy(PioneerPublicApi.Vector3.NaN);
          return void PioneerPublicApi.Vector3.pool.release(targetOffset);
        }
        ancestor = parent;
      }
      output.sub(output, targetOffset);
      PioneerPublicApi.Vector3.pool.release(targetOffset);
    } else {
      const scene = this.getScene();
      const ancestorPosition = PioneerPublicApi.Vector3.pool.get();
      const commonAncestor = this.getLowestCommonAncestorAtTime(targetEntity, time);
      if (null === commonAncestor) {
        output.copy(PioneerPublicApi.Vector3.NaN);
        return void PioneerPublicApi.Vector3.pool.release(ancestorPosition);
      }
      for (; ancestor !== commonAncestor;) {
        ancestor.getPositionAtTime(ancestorPosition, time);
        output.add(output, ancestorPosition);
        const parentName = ancestor.getParentAtTime(time);
        const parent = scene.getEntity(parentName);
        if (null === parent) {
          output.copy(PioneerPublicApi.Vector3.NaN);
          return void PioneerPublicApi.Vector3.pool.release(ancestorPosition);
        }
        ancestor = parent;
      }
      ancestor = targetEntity;
      const targetOffset = PioneerPublicApi.Vector3.pool.get();
      for (targetOffset.copy(PioneerPublicApi.Vector3.Zero); ancestor !== commonAncestor;) {
        ancestor.getPositionAtTime(ancestorPosition, time);
        targetOffset.add(targetOffset, ancestorPosition);
        const parentName = ancestor.getParentAtTime(time);
        const parent = scene.getEntity(parentName);
        if (null === parent) {
          output.copy(PioneerPublicApi.Vector3.NaN);
          PioneerPublicApi.Vector3.pool.release(ancestorPosition);
          return void PioneerPublicApi.Vector3.pool.release(targetOffset);
        }
        ancestor = parent;
      }
      output.sub(output, targetOffset);
      PioneerPublicApi.Vector3.pool.release(ancestorPosition);
      PioneerPublicApi.Vector3.pool.release(targetOffset);
    }
  }
  // 输入局部速度，加减祖先链速度得到目标实体坐标系的速度；保留原有端点计入方式与早退路径。
  getVelocityRelativeToEntity(output, localVelocity, targetEntity, time) {
    let ancestor = this;
    if (output.copy(localVelocity), void 0 === time) {
      const commonAncestor = this.getLowestCommonAncestor(targetEntity);
      if (null === commonAncestor) return void output.copy(PioneerPublicApi.Vector3.NaN);
      for (output.add(output, ancestor.getVelocity()); ancestor !== commonAncestor;) {
        const parent = ancestor.getParent();
        if (null === parent) return void output.copy(PioneerPublicApi.Vector3.NaN);
        output.add(output, parent.getVelocity());
        ancestor = parent;
      }
      for (ancestor = targetEntity, output.sub(output, ancestor.getVelocity()); ancestor !== commonAncestor;) {
        const parent = ancestor.getParent();
        if (null === parent) return void output.copy(PioneerPublicApi.Vector3.NaN);
        output.sub(output, parent.getVelocity());
        ancestor = parent;
      }
    } else {
      const scene = this.getScene();
      const ancestorVelocity = PioneerPublicApi.Vector3.pool.get();
      const commonAncestor = this.getLowestCommonAncestorAtTime(targetEntity, time);
      if (null !== commonAncestor) {
        for (ancestor.getVelocityAtTime(ancestorVelocity, time), output.add(output, ancestorVelocity); ancestor !== commonAncestor;) {
          const parentName = ancestor.getParentAtTime(time);
          const parent = scene.getEntity(parentName);
          if (null === parent) return void output.copy(PioneerPublicApi.Vector3.NaN);
          parent.getVelocityAtTime(ancestorVelocity, time);
          output.add(output, ancestorVelocity);
          ancestor = parent;
        }
        for (ancestor = targetEntity, ancestor.getVelocityAtTime(ancestorVelocity, time), output.sub(output, ancestorVelocity); ancestor !== commonAncestor;) {
          const parentName = ancestor.getParentAtTime(time);
          const parent = scene.getEntity(parentName);
          if (null === parent) return void output.copy(PioneerPublicApi.Vector3.NaN);
          parent.getVelocityAtTime(ancestorVelocity, time);
          output.sub(output, ancestorVelocity);
          ancestor = parent;
        }
      } else output.copy(PioneerPublicApi.Vector3.NaN);
      PioneerPublicApi.Vector3.pool.release(ancestorVelocity);
    }
  }
  // 存在修改该状态的控制器时，只执行覆盖目标时刻的控制器；有控制器但不覆盖时刻时保留 NaN，而非回退当前状态。
  getPositionAtTime(output, time) {
    if (this.isEnabled()) {
      let useCurrentState = true;
      if (void 0 !== time) {
        output.set(Number.NaN, Number.NaN, Number.NaN);
        for (let controllerIndex = 0; controllerIndex < this._controllers.getSize(); controllerIndex++) {
          const controller = this._controllers.getAt(controllerIndex);
          controller.hasModifiedState("position") && controller.isEnabled() && (controller.getCoverage().contains(time) && controller.__updatePositionAtTime(output, time), useCurrentState = false);
        }
      }
      useCurrentState && output.copy(this._state.position);
    } else output.set(Number.NaN, Number.NaN, Number.NaN);
  }
  getVelocityAtTime(output, time) {
    if (this.isEnabled()) {
      let useCurrentState = true;
      if (void 0 !== time) {
        output.set(Number.NaN, Number.NaN, Number.NaN);
        for (let controllerIndex = 0; controllerIndex < this._controllers.getSize(); controllerIndex++) {
          const controller = this._controllers.getAt(controllerIndex);
          controller.hasModifiedState("velocity") && controller.isEnabled() && (controller.getCoverage().contains(time) && controller.__updateVelocityAtTime(output, time), useCurrentState = false);
        }
      }
      useCurrentState && output.copy(this._state.velocity);
    } else output.set(Number.NaN, Number.NaN, Number.NaN);
  }
  getOrientationAtTime(output, time) {
    if (this.isEnabled()) {
      let useCurrentState = true;
      if (void 0 !== time) {
        output.set(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
        for (let controllerIndex = 0; controllerIndex < this._controllers.getSize(); controllerIndex++) {
          const controller = this._controllers.getAt(controllerIndex);
          controller.hasModifiedState("orientation") && controller.isEnabled() && (controller.getCoverage().contains(time) && controller.__updateOrientationAtTime(output, time), useCurrentState = false);
        }
      }
      useCurrentState && output.copy(this._state.orientation);
    } else output.set(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
  }
  getDistanceTo(targetEntity, fromSurface, time) {
    const relativePosition = PioneerPublicApi.Vector3.pool.get();
    const direction = PioneerPublicApi.Vector3.pool.get();
    if (this.getPositionRelativeToEntity(relativePosition, PioneerPublicApi.Vector3.Zero, targetEntity, time), direction.normalize(relativePosition), fromSurface) {
      const sourceGround = this.getGroundComponent();
      if (sourceGround) {
        const sourceOrientation = PioneerPublicApi.Quaternion.pool.get();
        const sourceSurfaceOffset = PioneerPublicApi.Vector3.pool.get();
        this.getOrientationAtTime(sourceOrientation, time);
        sourceSurfaceOffset.rotateInverse(sourceOrientation, relativePosition);
        sourceGround.getGroundPosition(sourceSurfaceOffset, void 0, sourceSurfaceOffset);
        sourceSurfaceOffset.rotate(sourceOrientation, sourceSurfaceOffset);
        relativePosition.sub(relativePosition, sourceSurfaceOffset);
        PioneerPublicApi.Vector3.pool.release(sourceSurfaceOffset);
        PioneerPublicApi.Quaternion.pool.release(sourceOrientation);
      }
      const targetGround = targetEntity.getGroundComponent();
      if (targetGround) {
        const targetOrientation = PioneerPublicApi.Quaternion.pool.get();
        const targetSurfaceOffset = PioneerPublicApi.Vector3.pool.get();
        targetEntity.getOrientationAtTime(targetOrientation, time);
        targetSurfaceOffset.rotateInverse(targetOrientation, relativePosition);
        targetGround.getGroundPosition(targetSurfaceOffset, void 0, targetSurfaceOffset);
        targetSurfaceOffset.rotate(targetOrientation, targetSurfaceOffset);
        relativePosition.sub(relativePosition, targetSurfaceOffset);
        PioneerPublicApi.Vector3.pool.release(targetSurfaceOffset);
        PioneerPublicApi.Quaternion.pool.release(targetOrientation);
      }
    }
    const distance = relativePosition.dot(direction);
    PioneerPublicApi.Vector3.pool.release(direction);
    PioneerPublicApi.Vector3.pool.release(relativePosition);
    return distance;
  }
  getOcclusionRadius() {
    return this._occlusionRadius;
  }
  getExtentsRadius() {
    return this._extentsRadius;
  }
  setOcclusionRadius(occlusionRadius) {
    this._occlusionRadius = occlusionRadius;
  }
  setExtentsRadius(extentsRadius) {
    this._extentsRadius = extentsRadius;
  }
  getGroundComponent() {
    return this._groundComponent;
  }
  __updateGroundComponent() {
    this._groundComponent = null;
    for (let componentIndex = this._components.getSize() - 1; componentIndex >= 0; componentIndex--) {
      const groundComponent = this._components.getAt(componentIndex);
      if (groundComponent.isGroundComponent()) {
        this._groundComponent = groundComponent;
        break;
      }
    }
  }
  getPositionCoverage() {
    return this._positionCoverage;
  }
  getOrientationCoverage() {
    return this._orientationCoverage;
  }
  isInPositionCoverage() {
    return this._isInPositionCoverage;
  }
  isInOrientationCoverage() {
    return this._isInOrientationCoverage;
  }
  __updateLastState() {
    this._lastState.position.copy(this._state.position);
    this._lastState.velocity.copy(this._state.velocity);
    this._lastState.orientation.copy(this._state.orientation);
    this._lastState.angularVelocity.copy(this._state.angularVelocity);
  }
  // 合并启用控制器的覆盖；无对应控制器时使用无限覆盖，再由 parentingTable 的首尾空父级约束位置覆盖。
  __updateCoverage() {
    this._positionCoverage.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._orientationCoverage.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    let positionControllerCount = 0;
    let orientationControllerCount = 0;
    for (let controllerIndex = 0; controllerIndex < this._controllers.getSize(); controllerIndex++) {
      const controller = this._controllers.getAt(controllerIndex);
      if (controller.isEnabled()) {
        if (controller.getCoverage().isNaN()) {
          this._positionCoverage.set(NaN, NaN);
          this._orientationCoverage.set(NaN, NaN);
          positionControllerCount++;
          orientationControllerCount++;
          break;
        }
        controller.hasModifiedState("position") && (this._positionCoverage.union(this._positionCoverage, controller.getCoverage()), positionControllerCount++);
        controller.hasModifiedState("orientation") && (this._orientationCoverage.union(this._orientationCoverage, controller.getCoverage()), orientationControllerCount++);
      }
    }
    if (0 === positionControllerCount && this._positionCoverage.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), 0 === orientationControllerCount && this._orientationCoverage.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), this._parentingTable.length > 0) {
      const firstParentingEntry = this._parentingTable[0];
      const lastParentingEntry = this._parentingTable[this._parentingTable.length - 1];
      this._positionCoverage.min = Math.max(this._positionCoverage.min, "" !== firstParentingEntry[1] ? firstParentingEntry[0] : Number.POSITIVE_INFINITY);
      this._positionCoverage.max = Math.min(this._positionCoverage.max, "" !== lastParentingEntry[1] ? Number.POSITIVE_INFINITY : lastParentingEntry[0]);
    }
    this.getScene().getControllerDependencyGraph().needsSorting();
  }
  canOcclude() {
    return this._canOcclude;
  }
  setCanOcclude(canOcclude) {
    this._canOcclude = canOcclude;
  }
  isOccludingPosition(camera, cameraSpacePosition) {
    if (!this._canOcclude || !this.isInPositionCoverage()) return false;
    const sphereRadius = Math.min(this._occlusionRadius, this.getCameraSpacePosition(camera).magnitude());
    const intersection = PioneerPublicApi.Interval.pool.get();
    PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(intersection, cameraSpacePosition, this.getCameraSpacePosition(camera), sphereRadius);
    const intersectionParameterSum = intersection.min + intersection.max;
    const occludes = intersection.min < intersection.max && 0 <= intersectionParameterSum && intersectionParameterSum < 2;
    PioneerPublicApi.Interval.pool.release(intersection);
    return occludes;
  }
  getParent() {
    return this._parent;
  }
  getParentAtTime(time) {
    const entryIndex = PioneerPublicApi.Sort.getIndexObject(time, this._parentingTable, Entity.isStartTimeLessThanTime);
    return entryIndex < this._parentingTable.length && time === this._parentingTable[entryIndex][0] ? this._parentingTable[entryIndex][1] : entryIndex > 0 ? this._parentingTable[entryIndex - 1][1] : this._parentingTable.length > 0 ? "" : null !== this._parent ? this._parent.getName() : "";
  }
  // 换父级前尽量保留世界位置；先更新父子集合与相机缓存，再按旧父级移除、新父级加入的顺序通知。
  setParent(newParent) {
    if (newParent === this._parent) return;
    if (newParent) {
      const relativePosition = PioneerPublicApi.Vector3.pool.get();
      this.getPositionRelativeToEntity(relativePosition, PioneerPublicApi.Vector3.Zero, newParent);
      relativePosition.isNaN() || this.setPosition(relativePosition);
      PioneerPublicApi.Vector3.pool.release(relativePosition);
    }
    if (null !== this._parent) for (let childIndex = 0; childIndex < this._parent._children.length; childIndex++) {
      this._parent._children[childIndex] === this && this._parent._children.splice(childIndex, 1);
    }
    const parent = this._parent;
    this._parent = newParent;
    null !== this._parent && this._parent._children.push(this);
    this._clearCameraReferences();
    this._updateDisabledByAncestor();
    for (let callbackIndex = 0, callbackCount = this._parentChangedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) this._parentChangedCallbacks[callbackIndex](this, parent, this._parent);
    if (null !== parent) for (let callbackIndex = 0, callbackCount = parent._childChangedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) parent._childChangedCallbacks[callbackIndex](parent, this, false);
    if (null !== this._parent) for (let callbackIndex = 0, callbackCount = this._parent._childChangedCallbacks.length; callbackIndex < callbackCount; callbackIndex++) this._parent._childChangedCallbacks[callbackIndex](this._parent, this, true);
  }
  _clearCameraReferences() {
    this._cameraSpacePosition.clear();
    this._normalSpacePosition.clear();
    this._pixelSpacePosition.clear();
    this._normalSpaceExtentsRadius.clear();
    this._pixelSpaceExtentsRadius.clear();
    this._cameraDepths.clear();
    for (let componentIndex = 0, componentCount = this._components.getSize(); componentIndex < componentCount; componentIndex++) {
      this._components.getAt(componentIndex).__clearCameraDependentsBase();
    }
    for (let childIndex = 0, childCount = this._children.length; childIndex < childCount; childIndex++) this._children[childIndex]._clearCameraReferences();
  }
  getNumChildren() {
    return this._children.length;
  }
  getChild(childIndex) {
    return this._children[childIndex];
  }
  getLowestCommonAncestor(targetEntity) {
    if (null === targetEntity) return null;
    let sourceAncestor = this;
    let targetAncestor = targetEntity;
    let sourceDepth = 0;
    let targetDepth = 0;
    for (;;) {
      const parent = sourceAncestor.getParent();
      if (null === parent) break;
      sourceDepth += 1;
      sourceAncestor = parent;
    }
    for (;;) {
      const parent = targetAncestor.getParent();
      if (null === parent) break;
      targetDepth += 1;
      targetAncestor = parent;
    }
    for (sourceAncestor = this, targetAncestor = targetEntity; sourceDepth > targetDepth;) {
      sourceDepth -= 1;
      sourceAncestor = sourceAncestor.getParent();
    }
    for (; targetDepth > sourceDepth;) {
      targetDepth -= 1;
      targetAncestor = targetAncestor.getParent();
    }
    for (; sourceAncestor !== targetAncestor;) {
      const sourceParent = sourceAncestor.getParent();
      const targetParent = targetAncestor.getParent();
      if (!sourceParent || !targetParent) return null;
      sourceAncestor = sourceParent;
      targetAncestor = targetParent;
    }
    return sourceAncestor;
  }
  getLowestCommonAncestorAtTime(targetEntity, time) {
    if (null === targetEntity) return null;
    let sourceAncestor = this;
    let targetAncestor = targetEntity;
    let sourceDepth = 0;
    let targetDepth = 0;
    const scene = this.getScene();
    for (;;) {
      const parentName = sourceAncestor.getParentAtTime(time);
      if ("" === parentName) break;
      const parent = scene.getEntity(parentName);
      if (null === parent) return null;
      sourceDepth += 1;
      sourceAncestor = parent;
    }
    for (;;) {
      const parentName = targetAncestor.getParentAtTime(time);
      if ("" === parentName) break;
      const parent = scene.getEntity(parentName);
      if (null === parent) return null;
      targetDepth += 1;
      targetAncestor = parent;
    }
    for (sourceAncestor = this, targetAncestor = targetEntity; sourceDepth > targetDepth;) {
      sourceDepth -= 1;
      const parentName = sourceAncestor.getParentAtTime(time);
      const parent = scene.getEntity(parentName);
      if (null === parent) return null;
      sourceAncestor = parent;
    }
    for (; targetDepth > sourceDepth;) {
      targetDepth -= 1;
      const parentName = targetAncestor.getParentAtTime(time);
      const parent = scene.getEntity(parentName);
      if (null === parent) return null;
      targetAncestor = parent;
    }
    for (; sourceAncestor !== targetAncestor;) {
      const sourceParentName = sourceAncestor.getParentAtTime(time);
      const sourceParent = scene.getEntity(sourceParentName);
      const targetParentName = targetAncestor.getParentAtTime(time);
      const targetParent = scene.getEntity(targetParentName);
      if (!sourceParent || !targetParent) return null;
      sourceAncestor = sourceParent;
      targetAncestor = targetParent;
    }
    return sourceAncestor;
  }
  getNumParentingTableEntries() {
    return this._parentingTable.length;
  }
  getParentingTableEntry(entryIndex) {
    return this._parentingTable[entryIndex];
  }
  addParentingTableEntry(startTime, parentName) {
    PioneerPublicApi.Sort.addObject([startTime, parentName], this._parentingTable, Entity._isStartTimeLess, Entity._isStartTimeEqual);
    this.__updateCoverage();
  }
  removeParentingTableEntry(entryIndex) {
    this._parentingTable.splice(entryIndex);
    this.__updateCoverage();
  }
  clearParentingTableEntries() {
    this._parentingTable = [];
    this.__updateCoverage();
  }
  addParentChangedCallback(callback) {
    this._parentChangedCallbacks.push(callback);
  }
  removeParentChangedCallback(callback) {
    const callbackIndex = this._parentChangedCallbacks.indexOf(callback);
    -1 !== callbackIndex && this._parentChangedCallbacks.splice(callbackIndex, 1);
  }
  addChildChangedCallback(callback) {
    this._childChangedCallbacks.push(callback);
  }
  removeChildChangedCallback(callback) {
    const callbackIndex = this._childChangedCallbacks.indexOf(callback);
    -1 !== callbackIndex && this._childChangedCallbacks.splice(callbackIndex, 1);
  }
  getComponent(componentType, nameOrClassIndex) {
    return this._components.get(componentType, nameOrClassIndex);
  }
  getComponentAt(componentIndex) {
    return this._components.getAt(componentIndex);
  }
  getNumComponents() {
    return this._components.getSize();
  }
  addComponent(componentType, componentName = "") {
    const component = this._components.add(componentType, componentName);
    this.__updateGroundComponent();
    return component;
  }
  removeComponent(componentOrName) {
    this._components.remove(componentOrName);
    this.__updateGroundComponent();
  }
  clearComponents() {
    this._components.clear();
  }
  getController(controllerType, nameOrClassIndex) {
    return this._controllers.get(controllerType, nameOrClassIndex);
  }
  getControllerAt(controllerIndex) {
    return this._controllers.getAt(controllerIndex);
  }
  getNumControllers() {
    return this._controllers.getSize();
  }
  addController(controllerType, controllerName = "", beforeController) {
    const controller = this._controllers.add(controllerType, controllerName, beforeController);
    this.__updateCoverage();
    return controller;
  }
  removeController(controllerOrName) {
    this._controllers.remove(controllerOrName);
    this.__updateCoverage();
  }
  clearControllers() {
    this._controllers.clear();
    this.__updateCoverage();
  }
  getCameraSpacePosition(camera) {
    const position = this._cameraSpacePosition.get(camera);
    return void 0 !== position ? position : PioneerPublicApi.Vector3.NaN;
  }
  getNormalSpacePosition(camera) {
    const position = this._normalSpacePosition.get(camera);
    return void 0 !== position ? position : PioneerPublicApi.Vector3.NaN;
  }
  getPixelSpacePosition(camera) {
    const position = this._pixelSpacePosition.get(camera);
    return void 0 !== position ? position : PioneerPublicApi.Vector2.NaN;
  }
  getNormalSpaceOcclusionRadius(camera) {
    return 0 !== this._extentsRadius ? this.getNormalSpaceExtentsRadius(camera) * this._occlusionRadius / this._extentsRadius : 0;
  }
  getNormalSpaceExtentsRadius(camera) {
    const radius = this._normalSpaceExtentsRadius.get(camera);
    return void 0 !== radius ? radius : Number.NaN;
  }
  getPixelSpaceOcclusionRadius(camera) {
    return 0 !== this._extentsRadius ? this.getPixelSpaceExtentsRadius(camera) * this._occlusionRadius / this._extentsRadius : 0;
  }
  getPixelSpaceExtentsRadius(camera) {
    const radius = this._pixelSpaceExtentsRadius.get(camera);
    return void 0 !== radius ? radius : Number.NaN;
  }
  getGreatestPixelSpaceOcclusionRadius() {
    return 0 !== this._extentsRadius ? this.getGreatestPixelSpaceExtentsRadius() * this._occlusionRadius / this._extentsRadius : 0;
  }
  getGreatestPixelSpaceExtentsRadius() {
    return this._greatestPixelSpaceExtentsRadius;
  }
  getLeastCameraDepth() {
    return this._leastCameraDepth;
  }
  __setCameraDependentVariables(camera, cameraSpacePosition, cameraDepth) {
    const viewport = camera.getViewport();
    if (null === viewport) return;
    let cachedCameraPosition = this._cameraSpacePosition.get(camera);
    void 0 === cachedCameraPosition && (cachedCameraPosition = new PioneerPublicApi.Vector3(), this._cameraSpacePosition.set(camera, cachedCameraPosition));
    cachedCameraPosition.copy(cameraSpacePosition);
    let normalPosition = this._normalSpacePosition.get(camera);
    void 0 === normalPosition && (normalPosition = new PioneerPublicApi.Vector3(), this._normalSpacePosition.set(camera, normalPosition));
    camera.getNormalSpacePositionFromCameraSpacePosition(normalPosition, cachedCameraPosition);
    let pixelPosition = this._pixelSpacePosition.get(camera);
    void 0 === pixelPosition && (pixelPosition = new PioneerPublicApi.Vector2(), this._pixelSpacePosition.set(camera, pixelPosition));
    viewport.getPixelSpacePositionFromNormalSpacePosition(pixelPosition, normalPosition);
    const normalRadius = camera.getNormalSpaceRadiusFromRadius(this._extentsRadius, cachedCameraPosition.magnitude());
    this._normalSpaceExtentsRadius.set(camera, normalRadius);
    const pixelRadius = viewport.getPixelSpaceRadiusFromNormalSpaceRadius(normalRadius);
    this._pixelSpaceExtentsRadius.set(camera, pixelRadius);
    this._cameraDepths.set(camera, cameraDepth);
  }
  __removeCameraDependents(camera) {
    this._cameraSpacePosition.delete(camera);
    this._normalSpacePosition.delete(camera);
    this._pixelSpacePosition.delete(camera);
    this._normalSpaceExtentsRadius.delete(camera);
    this._pixelSpaceExtentsRadius.delete(camera);
    this._cameraDepths.delete(camera);
    for (let componentIndex = 0; componentIndex < this._components.getSize(); componentIndex++) this._components.getAt(componentIndex).__removeCameraDependentsBase(camera);
  }
  get(itemNameOrType, classIndex = 0) {
    const component = this._components.getAny(itemNameOrType, classIndex);
    return component || this._controllers.getAny(itemNameOrType, classIndex);
  }
  async getLoadedPromise(forceLoaded = false, timeout = Number.POSITIVE_INFINITY) {
    const requests = [];
    for (let componentIndex = 0, componentCount = this._components.getSize(); componentIndex < componentCount; componentIndex++) {
      const component = this._components.getAt(componentIndex);
      requests.push(component.getLoadedPromise(forceLoaded, timeout).catch(error => {
        if (error instanceof Error) throw new Error(`${component} - ${error.message}`);
      }));
    }
    for (let controllerIndex = 0, controllerCount = this._controllers.getSize(); controllerIndex < controllerCount; controllerIndex++) {
      const controller = this._controllers.getAt(controllerIndex);
      requests.push((0, PioneerPublicApi.waitUntil)(() => !controller.getCoverage().isNaN(), .25, timeout));
    }
    const results = await Promise.allSettled(requests);
    if (!results.every(result => "fulfilled" === result.status)) throw new Error(results.filter(result => "rejected" === result.status).map(result => result.reason instanceof Error ? result.reason.message : "").filter(message => "" !== message).reduce((errorMessages, message) => `${errorMessages}\n${message}`, ""));
  }
  async waitTillInPlace(time, timeout = Number.POSITIVE_INFINITY) {
    return (0, PioneerPublicApi.waitUntil)(() => {
      if (this.getPositionCoverage().isNaN() || this.getOrientationCoverage().isNaN()) return false;
      time ??= this.getScene().getEngine().getTime();
      if (!(this.getPositionCoverage().contains(time) && this.getOrientationCoverage().contains(time))) return true;
      const position = PioneerPublicApi.Vector3.pool.get();
      const orientation = PioneerPublicApi.Quaternion.pool.get();
      try {
        this.getPositionAtTime(position, time);
        return position.isNaN() ? false : (this.getOrientationAtTime(orientation, time), !orientation.isNaN());
      } finally {
        PioneerPublicApi.Quaternion.pool.release(orientation);
        PioneerPublicApi.Vector3.pool.release(position);
      }
    }, .25, timeout);
  }
  toString() {
    return this.getName();
  }
  // 先解除层级关系，再销毁控制器和组件；这里保留原有遍历顺序，未混入子数组变动相关修复。
  __destroy() {
    this._destroyed = true;
    super.__destroy();
    for (let childIndex = 0; childIndex < this._children.length; childIndex++) this._children[childIndex].setParent(null);
    null !== this._parent && this.setParent(null);
    this._controllers.__destroy();
    this._components.__destroy();
  }
  __updateParent(time) {
    const parentName = this.getParentAtTime(time);
    if ("" !== parentName) {
      const parent = this.getScene().getEntity(parentName);
      parent !== this._parent && this.setParent(parent);
    } else null !== this._parent && this.setParent(null);
    this._parent !== this._lastParent && (this.getScene().getControllerDependencyGraph().needsSorting(), this._lastParent = this._parent);
  }
  __updateIsInCoverages(time) {
    this._isInPositionCoverage = this._positionCoverage.contains(time);
    this._isInOrientationCoverage = this._orientationCoverage.contains(time);
    for (let componentIndex = 0; componentIndex < this._components.getSize(); componentIndex++) this._components.getAt(componentIndex).__updateLoadState();
  }
  __updateVisuals() {
    this._greatestPixelSpaceExtentsRadius = 0;
    for (let cameraIndex = 0, cameraCount = this._pixelSpaceExtentsRadius.getSize(); cameraIndex < cameraCount; cameraIndex++) {
      const greatestPixelSpaceExtentsRadius = this._pixelSpaceExtentsRadius.getAt(cameraIndex).value;
      this._greatestPixelSpaceExtentsRadius < greatestPixelSpaceExtentsRadius && (this._greatestPixelSpaceExtentsRadius = greatestPixelSpaceExtentsRadius);
    }
    this._leastCameraDepth = Number.MAX_SAFE_INTEGER;
    for (let cameraIndex = 0, cameraCount = this._cameraDepths.getSize(); cameraIndex < cameraCount; cameraIndex++) {
      const depth = this._cameraDepths.getAt(cameraIndex).value;
      this._leastCameraDepth = Math.min(depth, this._leastCameraDepth);
    }
    for (let componentIndex = 0, componentCount = this._components.getSize(); componentIndex < componentCount; componentIndex++) {
      const component = this._components.getAt(componentIndex);
      component.isEnabled() && component.__updateBase();
    }
  }
  // 从相机实体沿父子树传播：向父级走时减去前一实体位置，向子级走时加自身位置；previousEntity 防止立即折返。
  __updateCameraVariables(camera, previousEntity, walkingToParent, cameraDepth) {
    if (this.isEnabled()) {
      const cameraPosition = PioneerPublicApi.Vector3.pool.get();
      null === previousEntity ? cameraPosition.set(0, 0, 0) : walkingToParent ? cameraPosition.sub(previousEntity.getCameraSpacePosition(camera), previousEntity.getPosition()) : cameraPosition.add(previousEntity.getCameraSpacePosition(camera), this._state.position);
      this.__setCameraDependentVariables(camera, cameraPosition, cameraDepth);
      this._canOcclude && this.getPixelSpaceOcclusionRadius(camera) >= 1 && camera.__addToOccludingEntities(this);
      PioneerPublicApi.Vector3.pool.release(cameraPosition);
      for (let componentIndex = 0, componentCount = this._components.getSize(); componentIndex < componentCount; componentIndex++) {
        const component = this._components.getAt(componentIndex);
        component !== camera && component.isEnabled() && component.__updateCameraVariablesBase(camera);
      }
    }
    null === this._parent || !walkingToParent && this !== camera.getEntity() || this._parent.__updateCameraVariables(camera, this, true, cameraDepth + 1);
    for (let childIndex = 0, childCount = this._children.length; childIndex < childCount; childIndex++) {
      const child = this._children[childIndex];
      child !== previousEntity && child.__updateCameraVariables(camera, this, false, cameraDepth + 1);
    }
  }
  __prepareForRender(camera) {
    for (let componentIndex = 0, componentCount = this._components.getSize(); componentIndex < componentCount; componentIndex++) {
      const component = this._components.getAt(componentIndex);
      "__render" in component || component.__prepareForRenderBase(camera);
    }
  }
  static _isStartTimeLess(leftEntry, rightEntry) {
    return leftEntry[0] < rightEntry[0];
  }
  static _isStartTimeEqual(leftEntry, rightEntry) {
    return leftEntry[0] === rightEntry[0];
  }
  static isStartTimeLessThanTime(entry, time) {
    return entry[0] < time;
  }
  _enabled;
  _disabledByAncestor;
  _destroyed;
  _parent;
  _lastParent;
  _children;
  _parentingTable;
  _parentChangedCallbacks;
  _childChangedCallbacks;
  _state;
  _lastState;
  _cameraSpacePosition;
  _normalSpacePosition;
  _pixelSpacePosition;
  _normalSpaceExtentsRadius;
  _pixelSpaceExtentsRadius;
  _greatestPixelSpaceExtentsRadius;
  _cameraDepths;
  _leastCameraDepth;
  _components;
  _controllers;
  _occlusionRadius;
  _extentsRadius;
  _groundComponent;
  _canOcclude;
  _positionCoverage;
  _orientationCoverage;
  _isInPositionCoverage;
  _isInOrientationCoverage;
}
class EntityState {
  position;
  velocity;
  orientation;
  angularVelocity;
  constructor() {
    this.position = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
    this.velocity = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
    this.orientation = new PioneerPublicApi.Quaternion(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
    this.angularVelocity = new PioneerPublicApi.Vector3(Number.NaN, Number.NaN, Number.NaN);
  }
}
export { Entity };
