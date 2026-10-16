const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const files = ['core/Engine', 'core/Scene', 'core/Entity-62', 'components/BaseComponent', 'controllers/BaseController', 'core/Downloader'];
function load(file, name, api = {}, globals = {}) {
  const source = fs.readFileSync('eyes/src/engine/' + file + '.js', 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export .*;\r?\n/gm, '');
  return vm.runInNewContext(source + '\n' + name, {
    PioneerPublicApi: api,
    Error,
    console,
    ...globals
  });
}
function canonical(source) {
  const parser = require('@babel/parser'),
    traverse = require('@babel/traverse').default,
    generate = require('@babel/generator').default;
  const ast = parser.parse(source, {
      sourceType: 'module'
    }),
    bindings = [],
    seen = new Set();
  traverse(ast, {
    Scope(scope) {
      for (const binding of Object.values(scope.scope.bindings)) if (!seen.has(binding)) {
        seen.add(binding);
        bindings.push(binding);
      }
    }
  });
  bindings.sort((a, b) => a.identifier.start - b.identifier.start);
  const renamed = [];
  bindings.forEach((binding, index) => {
    const temp = binding.scope.generateUidIdentifier('canonical').name;
    binding.scope.rename(binding.identifier.name, temp);
    renamed.push([binding.scope, temp, '__binding' + index]);
  });
  for (const [scope, temp, name] of renamed) scope.rename(temp, name);
  return generate(ast, {
    comments: false,
    compact: true
  }).code;
}
async function main() {
  if (process.argv[2] === '--compare-before') {
    for (const file of files) {
      const before = fs.readFileSync(path.join(process.argv[3], file.split('/').at(-1) + '-semantic-before.js'), 'utf8'),
        after = fs.readFileSync('eyes/src/engine/' + file + '.js', 'utf8');
      assert.equal(canonical(after), canonical(before), file + ' binding-normalized AST differs');
      console.log('alpha-equivalent:', file);
    }
    return;
  }
  const Engine = load('core/Engine', 'Engine');
  const order = [];
  const engine = Object.create(Engine.prototype);
  Object.assign(engine, {
    _lastAppTime: 1000,
    _fpsLimit: Infinity,
    _time: 10,
    _timeRate: 2,
    _rootDiv: {
      clientWidth: 1,
      clientHeight: 1
    },
    _renderSize: {
      x: 1,
      y: 1
    },
    _fps: {
      update: () => order.push('fps')
    },
    _scenes: {
      getSize: () => 1,
      getAt: () => ({
        __update: () => order.push('state'),
        __updateVisuals: () => order.push('visuals')
      })
    },
    _viewports: {
      getSize: () => 1,
      getAt: () => ({
        __updateViewportVariables: () => order.push('viewport'),
        __render: () => order.push('render')
      })
    },
    _threeJsRenderer: {
      setViewport() {},
      setScissor() {},
      clear() {
        order.push('clear');
      }
    },
    _callbacks: [{
      callback: () => order.push('callback'),
      recurring: false
    }],
    _callbacksToRemove: [],
    _input: {
      __resetStatesForNextFrame: () => order.push('input')
    },
    _thisLoop: () => {}
  });
  // The loop needs a controlled frame clock in its own VM realm.
  const FrameEngine = load('core/Engine', 'Engine', {}, {
    Date: {
      now: () => 2000
    },
    requestAnimationFrame: () => order.push('schedule')
  });
  FrameEngine.prototype._loop.call(engine);
  assert.deepEqual(order, ['fps', 'state', 'viewport', 'visuals', 'clear', 'render', 'callback', 'input', 'schedule']);
  assert.equal(engine._time, 12);
  assert.equal(engine._callbacksToRemove.length, 1);
  class EntityItem {
    constructor(name, entity) {
      this.entity = entity;
    }
    getEntity() {
      return this.entity;
    }
    __destroy() {}
    isEnabled() {
      return true;
    }
  }
  class Interval {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }
    copy(value) {
      Object.assign(this, value);
    }
  }
  const graphEvents = [];
  const entity = {
    getScene: () => ({
      getControllerDependencyGraph: () => ({
        addItem: () => graphEvents.push('add'),
        removeItem: () => graphEvents.push('remove'),
        needsSorting: () => graphEvents.push('sort')
      })
    }),
    __updateCoverage: () => graphEvents.push('coverage')
  };
  const BaseController = load('controllers/BaseController', 'BaseController', {
    EntityItem,
    Interval
  });
  const controller = new BaseController('motion', entity);
  controller.addModifiedState('position');
  controller.addModifiedState('position');
  controller.addDependentState('earth', 'orientation');
  assert.deepEqual(graphEvents, ['add', 'sort', 'coverage', 'sort']);
  assert.equal(controller.hasDependentState('earth', 'orientation'), true);
  controller.removeModifiedState('position');
  controller.__destroy();
  assert.deepEqual(graphEvents.slice(-3), ['sort', 'coverage', 'remove']);
  const BaseComponent = load('components/BaseComponent', 'BaseComponent', {
    EntityItem
  });
  const component = Object.create(BaseComponent.prototype);
  let completeLoad;
  const lifecycle = [];
  Object.assign(component, {
    _loadState: {
      state: 'unloaded'
    },
    _resourcesLoadedCallback: () => lifecycle.push('loaded'),
    _resourcesUnloadedCallback: () => lifecycle.push('unloaded'),
    _threeJsObjects: [{}],
    _threeJsMaterials: [{}],
    __loadResources: () => new Promise(resolve => completeLoad = resolve),
    __unloadResources: () => lifecycle.push('dispose')
  });
  component._loadResources();
  assert.equal(component.getLoadState().state, 'loading');
  component.resetResources();
  completeLoad();
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(component.getLoadState().state, 'unloaded');
  assert.deepEqual(lifecycle, ['dispose', 'unloaded']);
  assert.equal(component.getThreeJsObjects().length, 0);
  const Entity = load('core/Entity-62', 'Entity', {
    CollectionItem: class {}
  });
  const root = {
    getParent: () => null
  };
  const left = {
    getParent: () => root
  };
  const right = {
    getParent: () => root
  };
  assert.equal(Entity.prototype.getLowestCommonAncestor.call(left, right), root);
  assert.equal(Entity.prototype.getLowestCommonAncestor.call(left, null), null);
  const requests = [];
  class Request {
    open(method, url) {
      this.url = url;
    }
    send() {
      requests.push(this);
    }
    abort() {
      this.aborted = true;
    }
    getResponseHeader() {
      return 'text/plain';
    }
  }
  class CanceledError extends Error {}
  const Sort = {
    addObject(item, list, less) {
      const index = list.findIndex(other => less(item, other));
      list.splice(index < 0 ? list.length : index, 0, item);
    }
  };
  const Downloader = load('core/Downloader', 'Downloader', {
    Sort,
    CanceledError
  }, {
    XMLHttpRequest: Request
  });
  const downloader = new Downloader();
  downloader._maxCurrentDownloads = 1;
  downloader.setReplacement('ROOT', 'https://assets');
  const first = downloader.download('$ROOT/a', 'text', 1);
  const canceled = downloader.download('$ROOT/b', 'text', 2).catch(error => error);
  const last = downloader.download('$ROOT/c', 'text', 0);
  assert.equal(requests.length, 1);
  downloader.updatePriority('$ROOT/c', 3);
  assert.equal(downloader._downloadQueue[0].url, '$ROOT/c');
  downloader.cancel('$ROOT/b');
  assert.ok((await canceled) instanceof CanceledError);
  requests[0].status = 200;
  requests[0].response = 'a';
  requests[0].onload();
  assert.equal((await first).actualUrl, 'https://assets/a');
  assert.equal(requests.length, 2);
  requests[1].status = 200;
  requests[1].response = 'c';
  requests[1].onload();
  assert.equal((await last).content, 'c');
  assert.equal(downloader._currentDownloads.size, 0);
  const Scene = load('core/Scene', 'Scene', {
    CollectionItem: class {}
  });
  const coverage = {
    intersects: () => true
  };
  const states = new Set(['position']);
  const parentEntity = {
    isEnabled: () => true,
    getParent: () => null,
    getName: () => 'parent'
  };
  const childEntity = {
    isEnabled: () => true,
    getParent: () => parentEntity,
    getName: () => 'child'
  };
  const makeController = owner => ({
    getEntity: () => owner,
    isEnabled: () => true,
    getCoverage: () => coverage,
    hasModifiedState: name => states.has(name),
    __getModifiedStates: () => states,
    hasDependentState: () => false
  });
  assert.equal(Scene._compareControllers(makeController(childEntity), makeController(parentEntity)), true);
  console.log('lifecycle semantic checks passed: Engine order, controller registration, async reset, ancestor, queue cancellation, scene dependency');
}
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
