const fs = require('node:fs'),
  vm = require('node:vm'),
  assert = require('node:assert/strict'),
  path = require('node:path');
const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default;
const {
  bindingHash
} = require('./lib/semantic-source.cjs');
const baselines = {
  "assertIsShader.js": "2d0542810f11f4583c5fc612c8605dce36f27c82672cb641e168282966cc1f24",
  "CanceledError.js": "18437beec51fe66a418320c8cc8d333db1811682d187add2784015c24fc430d7",
  "CancelToken.js": "f1366bd4ccb560825b3b565c27cc1fdaf7582679d910792958c322d770024197",
  "Capabilities-58.js": "0127b0c4a5a9a2d71a559a746586913cdfba8719a5c1b2e0440948f936fc012a",
  "Capabilities-584.js": "4751fba0f80cab0575844802c092b2a8481f14e84a17dbd439300198ccb916cf",
  "CollectionItem.js": "31ba42e177fe34dc4ac15e0d1490e40a2affdcb4d0610c9e4b6d0e7928abd6f2",
  "ComponentRef.js": "abb2dca713101406ada84b6e52a760a810760cbb1815dac163b9ed258ebf182c",
  "Config.js": "fa063c5d501a3c4356a4c6c0f59e1d5c28c6cf7deb7c65bc417c5960cee59f10",
  "ControllerRef.js": "b3c0024438d6f136c33b0dad4e8595c7b887783ff259c3a8e6b926997fee2d94",
  "DependencyGraph.js": "17ae81819889d625aeb9877024559fee25da02fe46ed07871e0305193daefaad",
  "Devices.js": "b3032e679b23b310d6a873610b7e625df2754ff7b0163f26ed0d902b5646e8e1",
  "EntityRef.js": "c1881346c6149fab0892a46c75b4ca402080f24b80e3bb7269ef6175718785ef",
  "EntityUtils.js": "c3a8bb2725345b92c790ab56350b3548bc7b3c494f38fcd07b9a2f8b1bb3b342",
  "FPS.js": "6b2ab13049fb740af9e5da9afa952d675d5f7a4a0f8b3e9143c94173f2db2b85",
  "Input.js": "fbcbc271e4c5bd00611f58f96a838bc67edd2fb403fc5cfbf4b00a8522370f3b",
  "JsonHelper.js": "5a067b4afa2ec326d44d1eaabda20b51d58fa745779750ec334980fdef7b6af9",
  "LineMesh.js": "6459e874f197d271148f7cfdf85345336b23183eca5440b423d40f885cf4ef49",
  "MaterialUtils.js": "85544434eb991294ce394be75d2a2cc6b7417a2ef633e6dd5c3dc8a911d646dc",
  "MaterialUtilsPhong.js": "c65cdfe7f381e7b661f38bf9e32e2512b0aeffbcf01889301fb3b05c1eb35fbd",
  "MaterialUtilsStandard.js": "f0763bb064cca606bee035a75b52a9ec42b03211b917dfa01901257bf4f4dba8",
  "MomentLocalesPrimary.cjs": "25107d8ac0c8d716c0001b706c29240fc986e04bd924d8bd4f92b3f1451d8409",
  "MomentLocalesSecondary.cjs": "8d64b68cbaceda36a21ffa1344b10e3a6fa93c976dfde890f064a306f91c1ab4",
  "ObjectUtils.js": "0e41fa08409350cd5444184e05fb9485a00ee9edade82e24f1bdf4ee84611489",
  "RandomString.js": "338ea7135d2e90b1948709bce82acc8ca7665eab7a59e040c6df81526abfd832",
  "SceneHelpers.js": "6e4963306686c60309d36929b80f1bf67598254fd6bd394cabfd45eba9695205",
  "SpriteParticles.js": "374ac655749a0c92aa9f529ef4ef8ed15052eb1d4f051003232a6f3263c41f36",
  "ThreeJsHelper.js": "f4767f7bea908fe440c7d973020556f0079df8c9003455dcbdbed38de2032faa",
  "Tile.js": "ea4a0758daf092818e41b3eb30f569e734cf6067063c8befbd017bcab913f8b7",
  "Types-1075.js": "538eb54221192cd94def6219618c978c056e21a660a5d633deb4d0e7b67e0dc0",
  "Types-754.js": "132d32a5e065184a6a4688a9de992d7b85f46af628bfef44507ff4869dd3f776",
  "Unidentified511.js": "96b377144cc8938d92ccfb8367790e8c2095a22d3873f7e5dcd3d4ddeabe52a7",
  "Unidentified694.js": "b4bea8af390694c8cb0e77ccde4a57edff7bbcab11a06992ab125a60e73c9071",
  "Unidentified695.js": "f1f344557701580723c64e474e05aded78ac800a69e76447b7f2943d62cb093e",
  "Unidentified696.js": "d5e6ca8e9652f0ea3e384c5c01493426ad92379823c7470e6ec6ca9bff120e26",
  "Unidentified697.js": "a976ed1757b8852ab9826fc6fac29833e1e909c2d471860306862cc676defec9",
  "Unidentified701.js": "a855f5febd0e50f588666149b80735d0fd42ee0df81e833cb5618493a60a62c2",
  "Unidentified703.js": "faa5e288af81f3b8aa2fd37eb2d75ed9d0bc487146fe9462bb0380a515431929",
  "Unidentified704.js": "1d3ef9011755d38597c2e0aac2679878955eaa102ffb888dcaddb258b7d8ef61",
  "Unidentified705.js": "7031eb2b9fe430d0f6c79f22819b80aa738a7c0a84881490023c417f75c1cbd1",
  "Unidentified707.js": "99a48430cd09fde6fbd64b96c7d54c980f7b0f95daf2bb3b7806f5ef53bc1147",
  "Unidentified708.js": "1e983e85f2bd281200da66abd57ce0c9758b79cd25c5f77a0d0362d06993bfd2",
  "Unidentified709.js": "b088ca7e0d61a3554468dfaedfb1f41cdaa4945846edfbca5ed05b57f6009e60",
  "Unidentified710.js": "232797243ca1037db58e9487a86e02d90e11c5ae9e16179192d4aa508efc38ee",
  "Unidentified711.js": "4d1d235596b44aafb496eec6ed0b413de7d7d8a136653e82ef3d0b25aab55d4b",
  "Unidentified712.js": "fc1e88011cde10578fb8134714e151440fdec9bebfaf5292cb6ed71dea393e4b",
  "Unidentified713.js": "6701ef803b69900cc0e166cf65b50b1647727d115cebb8902fc4bfa2f5bd8b8b",
  "Unidentified715.js": "7694f044e712656e5c9f5f08f58eee6b27a22fb2a9f5497d07b80c1dd7043c96",
  "Unidentified716.js": "7cac6d5041c9e5bb25d6ae2ee4145f32dacc1d85358c9de39464c2cd1cd84c0c",
  "Unidentified717.js": "afc12efbabbc563e42a9fbaef9871e98b8113d5238bceadac557b87101d8c08f",
  "Unidentified738.js": "3c3acbccff894d07ecc168da7b988b458001f8172ac2f398e80000e2e6acaf5b",
  "Unidentified752.js": "7dd0b7d43dadb20f3fb6f779f20a32429b6be29529546ca8121d27b0b7a99922",
  "Unidentified753.js": "ed896e151b1f2bfffb2a7afb8298d53d41144637b801832587f8e9da10ee2a3d",
  "version-8.js": "babc4feda7dd50fd96c2f477a8e63107e0d3b3bbe53d393302e3e1d4586f62c3",
  "Version-84.js": "1817e45461f5d2022ab67b2bb684e01d365035efa4beb694b44f6bad97dfc133",
  "Viewport.js": "722a1f86116769f042ba2730cea1add6fa905193f64db43d0a04e32dbc845f5d",
  "waitUntil.js": "ce2106385e95cc658b2be606acd07d79dba9b966f337da547c4b48ed0dc0f3fe"
};
function load(file, name, api = {}, globals = {}) {
  const source = fs.readFileSync('eyes/src/engine/core/' + file, 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export .*;\r?\n/gm, '');
  return vm.runInNewContext(source + '\n' + name, {
    Pioneer: api,
    PioneerPublicApi: api,
    Error,
    console,
    ...globals
  });
}
async function main() {
  for (const [file, hash] of Object.entries(baselines)) {
    const source = fs.readFileSync('eyes/src/engine/core/' + file, 'utf8');
    assert.equal(bindingHash(source), hash, file + ' differs from HEAD binding baseline');
    assert.ok(!source.includes('@eyes-analysis'));
    const seen = new Set();
    traverse(parser.parse(source, {
      sourceType: 'unambiguous'
    }), {
      Scope(p) {
        for (const binding of Object.values(p.scope.bindings)) {
          if (seen.has(binding)) continue;
          seen.add(binding);
          assert.ok(binding.identifier.name.length > 2, file + ' compressed binding ' + binding.identifier.name);
        }
      }
    });
  }
  const Config = load('Config.js', 'Config'),
    config = new Config(),
    notifications = [];
  const notify = (...args) => notifications.push(args);
  config.addEventListener('quality', notify);
  config.setValue('quality', 2);
  config.setValue('quality', 2);
  config.removeEventListener('quality', notify);
  config.setValue('quality', 3);
  assert.deepEqual(notifications, [['quality', 2]]);
  const {
    Collection,
    CollectionItem
  } = load('CollectionItem.js', '({Collection,CollectionItem})');
  class Item extends CollectionItem {
    __destroy() {
      this.destroyed = true;
    }
  }
  const ownerA = {},
    ownerB = {},
    source = new Collection(ownerA),
    destination = new Collection(ownerB);
  const first = source.add(Item, 'first'),
    second = source.add(Item, 'second');
  assert.equal(second.getClassIndex(), 1);
  source.move(first, destination);
  assert.equal(first.__getCollectionParent(), ownerB);
  assert.equal(source.get(Item, 0), second);
  assert.equal(second.getIndex(), 0);
  destination.remove(first);
  assert.equal(first.destroyed, true);
  assert.equal(destination.getSize(), 0);
  const DependencyGraph = load('DependencyGraph.js', 'DependencyGraph'),
    order = [];
  const graph = new DependencyGraph(item => order.push(item), (dependent, dependency) => dependent === 'child' && dependency === 'parent');
  graph.addItem('child');
  graph.addItem('parent');
  graph.update();
  assert.deepEqual(order, ['parent', 'child']);
  const cyclic = new DependencyGraph(() => {}, (left, right) => left !== right);
  cyclic.addItem('one');
  cyclic.addItem('two');
  assert.throws(() => cyclic.update(), /Dependency cycle/);
  const BaseRef = load('BaseRef.js', 'BaseRef'),
    ComponentRef = load('ComponentRef.js', 'ComponentRef', {
      BaseRef
    });
  let enabled = true;
  const component = {
      isEnabled: () => true
    },
    entity = {
      isEnabled: () => enabled,
      getComponent: () => component
    };
  const reference = new ComponentRef({
    getEntity: () => entity
  }, class Component {}, 'body');
  assert.equal(reference.get(), component);
  enabled = false;
  assert.equal(reference.get(), null);
  const Tile = load('Tile.js', 'Tile');
  class TestTile extends Tile {
    constructor(parent) {
      super(parent);
      this.events = [];
    }
    async load() {
      this.events.push('load');
    }
    unload() {
      this.events.push('unload');
    }
    setVisible(visible) {
      this.events.push(visible ? 'show' : 'hide');
    }
    checkSplit() {
      return false;
    }
    checkJoin() {
      return true;
    }
  }
  const tile = new TestTile(null);
  await tile.forceLoad();
  assert.deepEqual(tile.events, ['load', 'show']);
  tile.destroy();
  assert.deepEqual(tile.events, ['load', 'show', 'hide', 'unload']);
  assert.equal(tile.isDestroyed(), true);
  let cloned = 0,
    disposed = 0,
    closed = 0;
  class Bitmap {
    close() {
      closed++;
    }
  }
  class Texture {
    constructor(data) {
      this.source = {
        data
      };
    }
    dispose() {
      disposed++;
    }
    clone() {
      cloned++;
      return new Texture(this.source.data);
    }
  }
  const ThreeJsHelper = load('ThreeJsHelper.js', 'ThreeJsHelper', {
    THREE: {
      Texture
    }
  }, {
    ImageBitmap: Bitmap
  });
  const oldTexture = new Texture(new Bitmap()),
    replacement = new Texture(null),
    material = {
      uniforms: {
        colorTexture: {
          value: oldTexture
        }
      }
    };
  ThreeJsHelper.setUniformTexture(material, 'colorTexture', replacement);
  assert.equal(material.uniforms.colorTexture.value, replacement);
  assert.equal(disposed, 1);
  assert.equal(closed, 1);
  const values = ThreeJsHelper._cloneUniformValue([1, null, replacement]);
  assert.equal(values[0], 1);
  assert.equal(values[1], null);
  assert.equal(cloned, 1);
  const defines = {
    defines: {}
  };
  ThreeJsHelper.setDefine(defines, 'colorMap', true);
  assert.equal(defines.defines.colorMap, true);
  ThreeJsHelper.setDefine(defines, 'colorMap', false);
  assert.equal('colorMap' in defines.defines, false);
  let tick,
    cleared = 0;
  const waitUntil = load('waitUntil.js', 'waitUntil', {}, {
    setInterval: callback => {
      tick = callback;
      return 7;
    },
    clearInterval: id => {
      assert.equal(id, 7);
      cleared++;
    }
  });
  let ready = false;
  const waiting = waitUntil(() => ready, .25, 1);
  tick();
  ready = true;
  tick();
  await waiting;
  assert.equal(cleared, 1);
  const timedOut = waitUntil(() => false, .25, .25).catch(error => error);
  tick();
  assert.match((await timedOut).message, /Timed out/);
  const Input = load('Input.js', 'Input'),
    input = Object.create(Input.prototype);
  const inputEvents = [];
  Object.assign(input, {
    _touches: [{
      lastFramePosition: {
        copy: () => inputEvents.push('copy')
      },
      thisFramePosition: {}
    }],
    _selected: true,
    _draggedOffset: {
      set: (...args) => inputEvents.push(args)
    },
    _zoomedOffset: 2,
    _rotatedOffset: 3
  });
  input.__resetStatesForNextFrame();
  assert.equal(input._selected, false);
  assert.equal(input._zoomedOffset, 0);
  assert.equal(input._rotatedOffset, 0);
  assert.equal(inputEvents[0], 'copy');
  const JsonHelper = load('JsonHelper.js', 'JsonHelper');
  assert.equal(JsonHelper.isObject(null), false);
  assert.equal(JsonHelper.isObject([]), false);
  assert.equal(JsonHelper.hasOptionalPropOfType({}, 'x', JsonHelper.isString), true);
  assert.equal(JsonHelper.isArrayOfNumbers([1, 2]), true);
  const assertIsShader = load('assertIsShader.js', 'assertIsShader', {}, {
    JsonHelper: {
      JsonHelper
    }
  });
  assert.doesNotThrow(() => assertIsShader({
    uniforms: {
      color: 'vec4'
    },
    vertex: {
      code: ''
    },
    fragment: {
      code: ''
    }
  }));
  assert.throws(() => assertIsShader({
    uniforms: []
  }), /uniforms/);
  for (const file of ['MomentLocalesPrimary.cjs', 'MomentLocalesSecondary.cjs']) {
    const context = require(path.resolve('eyes/src/engine/core/' + file));
    assert.ok(context.keys().includes('./en-gb'));
    assert.equal(typeof context.resolve('./en-gb'), 'number');
    assert.throws(() => context.resolve('./missing-language'), error => error.code === 'MODULE_NOT_FOUND');
  }
  console.log('core semantic checks passed: ' + Object.keys(baselines).length + ' HEAD hashes, readable bindings, config, collection move, dependency cycles, refs, tile disposal, texture ownership, polling, input reset, schema, locale contexts');
}
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
