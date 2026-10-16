const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function load(relative, api = {}, names = [], extraContext = {}) {
  const sourcePath = process.env.EYES_SEMANTIC_BASELINE
    ? `${process.env.EYES_SEMANTIC_BASELINE}/${relative.split('/').at(-1)}.js`
    : `eyes/src/engine/${relative}.js`;
  const source = fs.readFileSync(sourcePath, 'utf8')
    .replace(/^import .*;$/gm, '').replace(/^export .*;$/gm, '');
  return vm.runInNewContext(`${source}\n({${names.join(',')}})`, { PioneerPublicApi: api, TextDecoder, DataView, Uint8Array, console, ...extraContext });
}
const {Reader} = load('core/Reader', {}, ['Reader']);
const buffer = new ArrayBuffer(32), view = new DataView(buffer);
view.setUint16(0, 513, true); view.setFloat64(2, Math.PI, true);
view.setBigInt64(10, -9007199254740991n, true); view.setBigUint64(18, 9007199254740992n, true);
const reader = new Reader(buffer);
assert.equal(reader.readUInt16(), 513); assert.equal(reader.readFloat64(), Math.PI);
assert.equal(reader.readInt64(), -9007199254740991); assert.ok(Number.isNaN(reader.readUInt64()));
const text = new Reader(Uint8Array.from(Buffer.from('中文\r\nabc\0xyz')).buffer);
assert.equal(text.readLine(), '中文'); assert.equal(text.readString(), 'abc'); assert.equal(text.readString(3), 'xyz'); assert.ok(text.isAtEnd());
assert.throws(() => new Reader(new ArrayBuffer(0)).readByte());
class Vector3 {
  constructor(x=0,y=0,z=0) { Object.assign(this,{x,y,z}); }
  mult(v,k) {this.x=v.x*k;this.y=v.y*k;this.z=v.z*k;}
  addMult(v,w,k) {this.x=v.x+w.x*k;this.y=v.y+w.y*k;this.z=v.z+w.z*k;}
}
const api={Vector3,Interval:class {constructor(min,max){Object.assign(this,{min,max});} contains(x){return this.min<=x && x<=this.max;}}, BaseController:class {}, MathUtils:{clamp01:x=>Math.min(1,Math.max(0,x)),Pi:Math.PI,TwoPi:2*Math.PI,wrap:(x,a,b)=>((x-a)%(b-a)+(b-a))%(b-a)+a},Pool:class {}};
const {PosPoint, PointSet}=load('controllers/DynamoController',api,['PosPoint','PointSet']);
const points=[0,10].map(time=>({time,position:new Vector3(time,0,0),velocity:new Vector3(1,0,0)}));
for(const time of [-2,0,2.5,10,12]) { const result=new PosPoint();result.calculate(points,time);assert.ok(Math.abs(result.position.x-time)<1e-12);assert.ok(Math.abs(result.velocity.x-1)<1e-12); }
for(const version of [1,2]) {
 const payload=new ArrayBuffer(version===1?37:29), data=new DataView(payload); let offset=0;
 data.setUint8(offset++,0); data.setInt32(offset,2,true);offset+=4;
 for(const time of version===1?[0,5,5,10]:[0,5,10]) {data.setFloat64(offset,time,true);offset+=8;}
 // v2 uses one trailing boundary, so three boundaries represent two children.
 if(version===2)data.setInt32(1,3,true);
 const set=new PointSet(PosPoint,version,2,'def');set.load(new Reader(payload));
 assert.equal(set.getInterval().min,0);assert.equal(set.getInterval().max,10);
 assert.equal(set.getPointSet(6).getName(),version===1?'1':'01');
}
const {OrbitalElements}=load('core/OrbitalElements',api,['OrbitalElements']);
api.OrbitalElements=OrbitalElements;
api.Quaternion=class {constructor(...components){this.components=components;}set(...components){this.components=components;}};
const {OrbPoint,OriPoint}=load('controllers/DynamoController',api,['OrbPoint','OriPoint']);
for(const [name,expectedCount] of [['earth-sun-orb.dyn',429],['mercury-sun-orb.dyn',37],['jupiter-sun-orb.dyn',35],['earth-ori.dyn',3]]) {
 const bytes=fs.readFileSync(`tests/fixtures/${name}`);
 const fixtureReader=new Reader(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
 const version=fixtureReader.readInt16(), type=fixtureReader.readString(), digits=fixtureReader.readByte();
 assert.equal(version,2);if(name==='earth-sun-orb.dyn')assert.equal(digits,4);
 const SampleClass=type==='orb'?OrbPoint:OriPoint,header=SampleClass.readHeader(fixtureReader);
 if(name==='earth-sun-orb.dyn'){assert.equal(header.gravitationalParameter1,398600.4355070226);assert.equal(header.gravitationalParameter2,132712440041.27939);}
 const set=new PointSet(SampleClass,version,digits,'def');set.load(fixtureReader);
 assert.equal(set._points.length,expectedCount);assert.ok(fixtureReader.isAtEnd());
 for(let index=1;index<set._points.length;index++)assert.ok(set._points[index].time>set._points[index-1].time);
 const pair=[];for(const index of [0,expectedCount-2,1]){set.getPoints(pair,set._points[index].time);assert.equal(pair[0],set._points[index]);assert.equal(pair[1],set._points[index+1]);}
}
for(const eccentricity of [0,0.3,0.9,1.4,2]) for(const mean of [-2,-0.2,0.2,2]) {
 const orbit=Object.create(OrbitalElements.prototype);orbit.eccentricity=eccentricity;
 const anomaly=orbit.getEccentricAnomalyFromMeanAnomaly(mean);
 const recovered=eccentricity<1?anomaly-eccentricity*Math.sin(anomaly):eccentricity*Math.sinh(anomaly)-anomaly;
 assert.ok(Math.abs(recovered-mean)<1e-5, `${eccentricity}: ${mean}`);
}
const {TimeController}=load('controllers/TimeController',{},['TimeController'],{EyesPublicApi:{BaseComponent:class {}},TimeControllerTemplate:''});
const timeController=Object.create(TimeController.prototype);timeController._manager={getTimeRate:()=>60};
for(const [rate,display] of [[0,'paused'],[1,'1 sec(s)/sec'],[-3600,'-1 hr(s)/sec'],[2592000,'1 mth(s)/sec'],[31536000,'1 yr(s)/sec'],[61,'1 sec(s)/sec']])assert.equal(timeController.getRateDisplay(rate),display);
assert.equal(timeController.getRateDisplay(),'1 min(s)/sec');
console.log('semantic Dynamo checks passed: binary cursor/text, Hermite derivative/extrapolation, v1/v2 boundaries, four real NASA fixtures, Kepler residuals, time-rate units');

// These hashes capture the pre-cleanup executable contracts, with lexical names and
// equivalent discarded-value control flow normalized by semantic-source.
const controllerBaselines={
  "AlignController.js": "b709e3156b4370f121f6893b078e584eb0bfc0c68cd4ecfc7932480edbed0ae7",
  "BaseController.js": "842ced50efdc9891b5d2d4c9784f2050226dce81eec6c39f2e813d0f5b5e03d3",
  "CoverageController.js": "ae630da4ba23e1501049fdcfd802f76756f45628e6f6fcd483392b810e65db47",
  "FixedController.js": "07e98bdb8d98ab19ffc06a9ec923cfc97ee2dee07659835d9856d6c38a507a14",
  "FixedToParentController.js": "a7c57c738e3ba8c5cebe148e943794d36a5892066976d692a316a9675d6f32d2",
  "FreeFlyController.js": "9caf00dfe545bd506cba8f9b16be789723589c1fd0d3514fdc383d84638d7af4",
  "GroundClampController.js": "98d24ee5cee50e4373eb1fa39d66d1d2fa499ad86282171e85670ac20f08da75",
  "KeyframeController.js": "92c7da7ce4c522dbceef9ad6b95f04dfdb1a3fa1456d3f46ce9f6b22c0270405",
  "KeyframePointingController.js": "788d2c1be4d71340e32cf1a7f788846f2bb3644a182c8e933ea5bb6690640b84",
  "KeyframeSpinController.js": "08676ce0e8f7003d4b68265c02569fd3ec163b8716d7484ec5e14bd7ff9370f6",
  "LookController.js": "8ad55f40fc10cb6f812ede40e429ba8042a0871f93b5c31e339bb4298b0e4f1b",
  "ModelAnimateController.js": "1c8dc3a3b0114eb401c2926e99db32a90bc09ba62fea78a549303858772053d0",
  "OrbitalElementsController.js": "e88ee32f6940354d9d6bc97493d8dfd3205fd0a2ce9ec1d34156e4469d78cae3",
  "OrbitController.js": "ceb7fbd28b7225c49401025909bba1d56c59e33316d707104a12c347032317ca",
  "OrbitKeyframeController.js": "718195b82bd08c174567adab1d06698c20d11ea4fa711de18f7d639ac6af7712",
  "PickController.js": "e7c73aab347c0b3bbb3d10835087e3d6bcd6dfa76ceb44e4ae6d88fcc95328c6",
  "PositionSumController.js": "9b06660ae47b24fade0fec1a2bab210ab435125d40af1f784b36ea604d5ecb6f",
  "RollController.js": "0bf5a2b99b04a414b542fddc08050f9b8b947ddf3aa609e04b08ea8fe9f1ad0b",
  "RotateByEntityOrientationController.js": "65620200f6c8846aa29de456ce263edb3e62ffe73184acadb6556198535595c2",
  "RotateController.js": "c7a15daaec7b92867303431c0b1eca6fe53c3c4cfcfbb51187184ecb6da6a123",
  "ScaleController.js": "a56c3891e3dcdded46487e9b311b09661ff4969f887d531dfb575ea0832bb8c7",
  "SelectController.js": "861ddcc757a60be833961ae1819fcb631af3e0d543de33245adde90bd0342948",
  "SetParentController.js": "5ce485545dfa11703b212872c990d10bbe7aff0e58b14e6b920699e39e5934ae",
  "SpinController.js": "cc695b10fd85118859165b69236ed2940c3a0ddb84a8ee0f7fd49b944ec8205b",
  "TapController.js": "f8ef4e911820e7d68dd82f3a8492a0067b36d801d59e4baf8ced9b934ed85796",
  "TransitionController.js": "bae706034210a544f59991ba8488e1e1eb4d522895c89d9604947fa2415c4987",
  "TranslateController.js": "d66496f0bb1c0bf4ae6bf06ccb7053d3edc934f96e86ac94e76bc9c350f3b11a",
  "ZoomController.js": "ebe241b51edc5dec1d3fb3eba99f28a547d6b95d0c183e67c1eeed6773f8369b",
  "ZoomFitController.js": "3f46a189372f619639970db1f8278d202aa89ada902711baa8644eaf673547aa"
};
const {bindingHash}=require('./lib/semantic-source.cjs');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default;
for(const [file,expected]of Object.entries(controllerBaselines)){
 const source=fs.readFileSync('eyes/src/engine/controllers/'+file,'utf8');
 assert.equal(bindingHash(source),expected,file+' changed its executable contract');
 assert.ok(!source.includes('@eyes-analysis'),file+' retains generated boilerplate');
 traverse(parser.parse(source,{sourceType:'module'}),{Scope(path){for(const name of Object.keys(path.scope.bindings))assert.ok(name.length>2,file+' retains compressed binding '+name);}});
}
console.log(Object.keys(controllerBaselines).length+' controller baseline and readability checks passed');
const {KeyframeController}=load('controllers/KeyframeController',api,['KeyframeController']);
const keyframeController=Object.create(KeyframeController.prototype);
const start=new Vector3(0,0,0),end=new Vector3(1,2,3),zero=new Vector3(),position={},derivative={};
keyframeController._cubicHermiteSpline(position,start,end,zero,zero,0.25);
keyframeController._cubicHermiteSplineDerivative(derivative,start,end,zero,zero,0.25);
assert.equal(position.x,0.15625);assert.equal(position.y,0.3125);assert.equal(position.z,0.46875);
assert.equal(derivative.x,1.125);assert.equal(derivative.y,2.25);assert.equal(derivative.z,3.375);
const {KeyframeSpinController}=load('controllers/KeyframeSpinController',{},['KeyframeSpinController'],{Pioneer:api});
const spinController=Object.create(KeyframeSpinController.prototype);
spinController.setKeyframes([[0,0.1],[10,0.3],[20,0.5]]);
assert.equal(spinController._keyframes[0][2],0);
assert.ok(Math.abs(spinController._keyframes[1][2]-2)<1e-12);
assert.ok(Math.abs(spinController._keyframes[2][2]-6)<1e-12);
console.log('controller numerical checks passed: Hermite basis/derivative and trapezoidal spin integration');
