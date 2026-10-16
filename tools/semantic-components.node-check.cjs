const fs = require('fs'),
  path = require('path'),
  vm = require('vm'),
  assert = require('node:assert/strict');
const {
  bindingHash
} = require('./lib/semantic-source.cjs');
const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default;
const baselines = {
  "AnnulusComponent": "2a5b47d49b8d4b46b19db4c9cbfa30c20f314d6c2f8b4e77389414cc62c346b6",
  "AtmosphereComponent": "d4677fb3123de0bcd390191fc8b8f6c446aef0860b6d3c6bd110fa7c07f58714",
  "CameraComponent": "da33ce88ab1f5ebdad42f8da1e38ffe54eab33844f3f34e7611656b42a3dbb3e",
  "CometTailComponent": "2367915417ba504c16532f96eccdfb29a06d6e5b30b57d83f2b3edec00efdf8e",
  "ConnectedSpriteComponent": "ce0c277435af286087e9d89af6a40fba03126ac7412950c5f0d944509d2721f3",
  "ConstellationsComponent": "9c3b1859f1555ac9cd6f5e043735ba97cb93e6aff63294ab28e012af2f737534",
  "DiscGridComponent": "73808a264d912c05b0237b351836a6c28e86e5bb6ea2c151bbcb444aa4f5305d",
  "DistanceLineComponent": "e1c6498ab2934e465b1803f0f44ffba125198885fb28c1104ddf6dab40c0d612",
  "DivComponent": "208d335158db5d97cbac468d403f23d73b88bf9de61822e6bd0844f568403a19",
  "DynamicEnvironmentMapComponent": "7fc71d702e0668220ca04983635bd8c3caf0f025c8992b1cb4eb291558c1f691",
  "FrustumComponent": "61dc91a7a2b0740837eec006d67530bc8a299770076d5348b9b490de4cc4898f",
  "GizmoComponent": "179d64d8b072ae332dae37250a2c6973c6e970be55004b1effc7a1c2ebb98b81",
  "IndicatorComponent": "8deab80f65cbf59bba19e98d35c0831d33a4baae5d38245b00eac8ed7998e70b",
  "LabelComponent": "bacd4d5a3df2f771f36767f0437dee1f368a872000a3230ded8d4d29e1b0a03d",
  "LightSourceComponent": "754cdee0c1fc8391e5f043318570b2b1fb04159d4becff3b38e100a02516806e",
  "OrbitalParticlesComponent": "1f01b5a34d581a9421ee29946f9fa30ff14641f96cfea2b4e4e2754bb9a05304",
  "OrbiterLineOfSightComponent": "46c5fde27d07ed1acd3c7411f7ebdd1909b86e0851e0559d60f52a69d6cbd564",
  "OrbitLineComponent": "76f310b3751c29e0990c9d245316ac85ce590abe616a1f864775de979061b948",
  "ParticleSprayComponent": "8d83a34ad24a5028f43d00e7fd28639c5be36e53e30e33cd760f293fc943e3ec",
  "RingsComponent": "ff7b723e3a99c98c502a43c4980ae6290286e4d1225b0fc79512f61d242000e4",
  "ShadowConeComponent": "bbfd0301f26b3c6ffe83d6ebf8b4edc9393c88e6eaa4092c39808794b069057f",
  "SkyboxComponent": "29220d3a6078d8bc0ef096e23ff1a7323ea3602ef9d25133a2a8ab016bfef7df",
  "SphereGridComponent": "9bb9481c3e9a197687fc5a81a9f2fc1a55f2ff4ebb547556e4756f3ffefc08a3",
  "SpheroidComponent": "8cd2a1260d80e7022a3e8636533e58a099ac567d367b86bb06bacfdca6aec12b",
  "SpheroidLODComponent": "26e91e5f904a5a21e959866732902e292f0ab4372636170e8f7b8c49cf624283",
  "SpoutComponent": "5385650ebecba71d445fc688d9a6f29a1b490a26188b437aa7475bd4bea98030",
  "SpriteComponent": "e93cb020a6e9d67b42aa0ac5daacc35fc4151ca674dc6047eb591c5b25a1c799",
  "StarfieldComponent": "b9c79fcbdb1880c6419e7f4fe5a7ecb5dec8f8da5339f7c5f60c5633942e34f1",
  "TorusComponent": "6ee57e3dc85b4b349e16c0042f7beaccbf288dc34b567d597f522572d92ae049",
  "TrailComponent": "990be6f26cd3cf44d83c7369c2727527f5eac0c18ec5f42784e5ff1f9629f7d0"
};
function load(file, api = {}) {
  const source = fs.readFileSync('eyes/src/engine/components/' + file + '.js', 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export .*;\r?\n/gm, '');
  return vm.runInNewContext(source + '\n' + file, {
    Pioneer: api,
    PioneerPublicApi: api,
    Error
  });
}
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    Object.assign(this, {
      x,
      y,
      z
    });
  }
  set(x, y, z) {
    Object.assign(this, {
      x,
      y,
      z
    });
  }
  magnitude() {
    return Math.hypot(this.x, this.y, this.z);
  }
  magnitudeXY() {
    return Math.hypot(this.x, this.y);
  }
}
function geometryOwner() {
  const geometry = {};
  return {
    geometry,
    getThreeJsObjects: () => [{
      geometry
    }],
    _meshDirty: true
  };
}
function main() {
  for (const [file, hash] of Object.entries(baselines)) {
    const source = fs.readFileSync('eyes/src/engine/components/' + file + '.js', 'utf8');
    assert.equal(bindingHash(source), hash, file + ' semantic source differs');
    assert.ok(!source.includes('@eyes-analysis'), file + ' boilerplate remains');
    const seen = new Set();
    traverse(parser.parse(source, {
      sourceType: 'module'
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
  const api = { ShaderChunkLogDepth: {},
    BaseComponent: class {},
    CameraComponent: class {},
    Vector3,
    MathUtils: {
      TwoPi: 2 * Math.PI,
      Pi: Math.PI,
      HalfPi: Math.PI / 2
    },
    ThreeJsHelper: {
      setVertices: (geometry, name, data) => geometry[name] = data,
      setIndices: (geometry, data) => geometry.indices = data
    }
  };
  const Annulus = load('AnnulusComponent', api);
  const annulus = Object.assign(geometryOwner(), {
    _numPointsOnCircle: 4,
    _sizeOuter: 2,
    _sizeInner: 1
  });
  Annulus.prototype._updateMesh.call(annulus);
  assert.equal(annulus.geometry.position.length, 48);
  assert.equal(annulus.geometry.indices.length, 24);
  assert.equal(annulus.geometry.position[0], 1);
  assert.equal(annulus.geometry.position[3], 2);
  assert.equal(annulus._meshDirty, false);
  const Torus = load('TorusComponent', api);
  const torus = Object.assign(geometryOwner(), {
    _outerRadius: 10,
    _innerRadius: 2
  });
  Torus.prototype._createMesh.call(torus);
  assert.equal(torus.geometry.position.length, 6000);
  assert.equal(torus.geometry.indices.length, 12000);
  assert.equal(torus.geometry.position[0], 10);
  assert.equal(torus.geometry.position[30], 2);
  assert.ok(Math.max(...torus.geometry.indices) < 2000);
  const Spheroid = load('SpheroidComponent', api);
  const spheroid = Object.assign(Object.create(Spheroid.prototype), {
    _equatorialRadius: 3,
    _polarRadius: 2,
    _planetographic: false
  });
  const position = new Vector3();
  spheroid.xyzFromLLA(position, {
    lat: 0,
    lon: 0,
    alt: 1
  });
  assert.equal(position.x, 4);
  assert.equal(position.y, 0);
  const geodetic = {};
  spheroid.llaFromXYZ(geodetic, position);
  assert.equal(geodetic.lat, 0);
  assert.equal(geodetic.lon, 0);
  assert.equal(geodetic.alt, 1);
  spheroid._planetographic = true;
  spheroid.xyzFromLLA(position, {
    lat: Math.PI / 2,
    lon: 0,
    alt: 0
  });
  assert.ok(Math.abs(position.z - 2) < 1e-12);
  const Frustum = load('FrustumComponent', api);
  let farBase;
  Frustum.prototype._farBaseFromLengthAndFOV.call({
    _nearBase: {
      x: 2
    }
  }, {
    set: (...values) => farBase = values
  }, 3, Math.PI / 2, Math.PI / 2);
  assert.ok(Math.abs(farBase[0] - 8) < 1e-12);
  assert.ok(Math.abs(farBase[1] - 8) < 1e-12);
  const Camera = load('CameraComponent', api);
  const camera = {
    _fieldOfView: Math.PI / 3
  };
  const normalRadius = Camera.prototype.getNormalSpaceRadiusFromRadius.call(camera, 20, 100);
  assert.ok(Math.abs(Camera.prototype.getRadiusFromNormalSpaceRadius.call(camera, normalRadius, 100) - 20) < 1e-12);
  const Light = load('LightSourceComponent', api);
  const registrations = [];
  const light = {
    getEntity: () => ({
      getName: () => 'sun',
      getScene: () => ({
        __addLightSource: (...args) => registrations.push(['add', ...args]),
        __removeLightSource: (...args) => registrations.push(['remove', ...args])
      })
    }),
    getClassIndex: () => 2
  };
  Light.prototype.__loadResources.call(light);
  Light.prototype.__unloadResources.call(light);
  assert.deepEqual(registrations, [['add', 'sun', 2], ['remove', 'sun', 2]]);
  const Particle = load('ParticleSprayComponent', api);
  const attributes = {
    params: {
      array: new Float32Array(9)
    },
    color: {
      array: new Float32Array(12)
    },
    size: {
      array: new Float32Array(3)
    }
  };
  Particle.prototype._initializeParticles.call({
    _numberOfParticles: 3,
    _particleSpacingRandom: false,
    _sizeOfParticles: 4,
    getThreeJsObjects: () => [{
      geometry: {
        attributes
      }
    }]
  });
  assert.equal(attributes.params.array[2], 0);
  assert.ok(Math.abs(attributes.params.array[5] - 1 / 3) < 1e-7);
  assert.equal(attributes.size.array[2], 4);
  assert.equal(attributes.color.array[11], 1);
  assert.equal(attributes.params.needsUpdate, true);
  const Trail = load('TrailComponent', api);
  const trail = {
    _points: [{
      position: {
        x: 0
      }
    }, {
      position: {
        x: 1
      }
    }, {
      position: {
        x: 2
      }
    }, {
      position: {
        x: 3
      }
    }],
    _pointsStart: 1,
    _pointsCount: 2,
    _resize: () => {}
  };
  const dirty = {
    values: [],
    expandTo(value) {
      this.values.push(value);
    }
  };
  Trail.prototype._pushBackPoint.call(trail, dirty);
  assert.equal(trail._pointsCount, 3);
  Trail.prototype._popFrontPoint.call(trail, dirty);
  assert.equal(trail._pointsStart, 2);
  assert.equal(trail._pointsCount, 2);
  assert.ok(Number.isNaN(trail._points[1].position.x));
  console.log('components semantic checks passed: ' + Object.keys(baselines).length + ' binding hashes, readable bindings, annulus/torus topology, spheroid coordinates, frustum dimensions, camera radius, light registration, particle layout, trail deque');
}
main();
