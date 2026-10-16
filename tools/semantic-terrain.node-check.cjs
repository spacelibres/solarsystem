const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {bindingHash}=require('./lib/semantic-source.cjs');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default;
const terrainBaselines={
 'CMTSComponent.js':'5ec4903467a047d6edca67767eb92e56c8c4b54710b368a639b057a07dc5fc70',
 'WMTSComponent.js':'8d11b2873021321153d2a1086611ef07683e7f2e2dd70b328e99baf5b26cf191'
};
for(const [file,expected]of Object.entries(terrainBaselines)){
 const source=fs.readFileSync('eyes/src/engine/components/'+file,'utf8');
 assert.equal(bindingHash(source),expected,file+' executable contract changed');
 assert.ok(!source.includes('@eyes-analysis'),file+' retains template comments');
 traverse(parser.parse(source,{sourceType:'module'}),{Scope(path){for(const name of Object.keys(path.scope.bindings))assert.ok(name.length>2,file+' retains compressed binding '+name);}});
}
class Vector3{
 constructor(x=0,y=0,z=0){this.set(x,y,z);}set(x,y,z){Object.assign(this,{x,y,z});return this;}
 normalize(v){const magnitude=Math.hypot(v.x,v.y,v.z);return this.set(v.x/magnitude,v.y/magnitude,v.z/magnitude);}
}
for(const [name,values]of Object.entries({XAxis:[1,0,0],YAxis:[0,1,0],ZAxis:[0,0,1],XAxisNeg:[-1,0,0],YAxisNeg:[0,-1,0],ZAxisNeg:[0,0,-1]}))Vector3[name]=new Vector3(...values);
const api={BaseComponent:class{},Tile:class{},Vector3,LatLonAlt:class{},MathUtils:{clamp:(v,min,max)=>Math.max(min,Math.min(max,v)),lerp:(a,b,t)=>a+(b-a)*t},Geometry:{getLLAFromXYZOnSphere(lla,point){Object.assign(lla,point);}}};
api.LatLonAlt.pool={get:()=>({}),release:()=>{}};
function load(file,names,extra={}){const source=fs.readFileSync('eyes/src/engine/components/'+file,'utf8').replace(/^import .*;$/gm,'').replace(/^export .*;$/gm,'');return vm.runInNewContext(source+'\n({'+names.join(',')+'})',{PioneerPublicApi:api,Pioneer:api,Float32Array,Uint16Array,Uint32Array,ImageData:class{},...extra});}
const {CMTSTile}=load('CMTSComponent.js',['CMTSTile']);
const bytes=new Uint8Array(4*4*4);for(let row=0;row<4;row++)for(let col=0;col<4;col++)bytes[4*(row*4+col)]=16*(row+col);
assert.equal(CMTSTile.getHeightFromPixel(1,2,bytes,4),48/256);
assert.equal(CMTSTile.getHeightFromPixel(-1,9,bytes,4),48/256);
assert.equal(CMTSTile.getLinearInterpolatedHeightPixel(1.5,1.5,bytes,4),32/256);
assert.equal(CMTSTile.getLinearInterpolatedHeightPixel(1.25,1.75,bytes,4),32/256);
const tile=Object.create(CMTSTile.prototype),out=[];
tile._getFromData(out,0,0.25,0.5,new Float32Array([0,0,0,4,8,12,8,16,24,12,24,36]),2);
assert.equal(out[0],5);assert.equal(out[1],10);assert.equal(out[2],15);
const spheroid={xyzFromLLA(out,lla){out.set(lla.x,lla.y,lla.z);}};
for(const [face,u,v,nextFace,nextU,nextV]of [[0,1.2,.4,1,.2,.4],[0,.3,1.2,4,.3,.2],[1,.3,1.2,4,.8,.3],[4,-.2,.3,3,.7,.8],[5,1.2,.3,1,.7,.2]]){
 const actual=new Vector3(),expected=new Vector3();CMTSTile.cmtsCoordToPosition(actual,face,1,u,v,spheroid);CMTSTile.cmtsCoordToPosition(expected,nextFace,1,nextU,nextV,spheroid);
 assert.ok(Math.hypot(actual.x-expected.x,actual.y-expected.y,actual.z-expected.z)<1e-12);
}
async function cancellationChecks(){
 let resolveResource,destroyed=false;const released=[],installed=[];tile._level=2;tile._component={getEntity:()=>({getLeastCameraDepth:()=>4})};tile._resourceManager={acquire:()=>new Promise(resolve=>{resolveResource=resolve;}),release:(...args)=>released.push(args)};tile.isDestroyed=()=>destroyed;tile._setTexture=(...args)=>installed.push(args);
 const pending=tile._loadTexture('color','exact/runtime/url',{});destroyed=true;const texture={};resolveResource(texture);await pending;
 assert.equal(installed.length,0);assert.equal(released.length,1);assert.equal(released[0][1],texture);assert.equal(released[0][2],'texture');
 const {WMTSTile}=load('WMTSComponent.js',['WMTSTile'],{Capabilities:{}});const wmts=Object.create(WMTSTile.prototype),materials=[],acquired=[],wmtsReleased=[],destroyedMaterials=[];
 api.MaterialUtils={get:()=>({uniforms:{colorTexture:{value:null}},defines:{}})};api.ThreeJsHelper={destroyMaterial:(...args)=>destroyedMaterials.push(args)};
 const manager={acquire:async(owner,url)=>{acquired.push(url);if(url!=='gray')throw Error('missing');return texture;},release:(...args)=>wmtsReleased.push(args)};
 wmts._level=2;wmts._row=3;wmts._col=4;wmts._threeJsMaterial=null;wmts._tileBounds={intersects:()=>true};wmts.isDestroyed=()=>true;
 wmts._component={__incLoadsThisFrame(){},__getLayer:()=>({boundingBox:{}}),getEngine:()=>({getResourceManager:()=>manager}),getThreeJsMaterials:()=>materials,__getMaterialOptions:()=>[],__getTileUrl:()=>'{TileMatrix}/{TileRow}/{TileCol}',getEntity:()=>({getLeastCameraDepth:()=>0})};
 await wmts.load();assert.deepEqual(acquired,['2/3/4','gray']);assert.equal(wmtsReleased.length,1);assert.equal(wmtsReleased[0][1],texture);assert.equal(materials.length,0);assert.equal(destroyedMaterials.length,1);
}
cancellationChecks().then(()=>console.log('terrain checks passed: final lexical/control-flow equivalence, readability, pixel/mesh interpolation, cube seams, canceled resource ownership, WMTS fallback')).catch(error=>{console.error(error);process.exitCode=1;});
