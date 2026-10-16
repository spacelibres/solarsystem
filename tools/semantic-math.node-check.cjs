const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default;
const {bindingHash}=require('./lib/semantic-source.cjs');
const baselines={
  "AER": "821ff38952c2e9bcd0578c3349b71677d32e4354cf87426e5bfe7258e6101b58",
  "Color": "7d31e4cb7ff3c4558ffc0ef31f503c5eb26755b7b650e8a80ad3d2470f8f391d",
  "DateTime": "36e3673b3f1806636914ba1a865f80d1087341e9aad71c5d19cbdc24e67ae5bd",
  "Geometry": "0a00a66ef62694c2bb3cc07f09eff160c8fe8f9d4a41a0271e55670623d7cdb8",
  "Interval": "eccb3f43b3308a2c3cfcaeecfb6e404c4e2b098ad834a5f19f33d1848afabf38",
  "LatLonAlt": "dd6873fef5e7e1f53fef37c5654265d63ce112836058891d5b37ae3ea3aaf5e2",
  "Mapping": "390ff6233bfb6a25a8f08e6d2d9ee404e3eb1d92d1d22d22680cf773f1cd1f85",
  "MathUtils": "9fbbe029f744ea2c2afeb96ec225802b1c59a575455cfcddd0c0ae70a5175283",
  "Quaternion": "8121285e744c536a4431e42ad3180811b1bdec5e6c8d68d7147a5f2124ae4528",
  "Rect": "c0136e87a608227d4bb84175a94f278de633a4865c5660b1f6f410503ee99896",
  "Sort": "00ac2f833b5233b3131094ff7645f8ea1f043791c00078c44ef19f8e0d8ac5b8",
  "TimeUtils": "559189b4404944abd61bb509e9ca20c7e4a4d08c982a502e6d86e700cd929e20",
  "Tuple": "6aa2a0baff2cdb89600d187615d598592ffaa2ce3ab267293686855e4bcb7fb0",
  "Vector2": "9779b561f9236f1d07356e6790316b68433de03eea4178adf8d87b36d3b998a2",
  "Vector3": "eb13f8e161544cc87f50ff4c32789253c9ebee158933ba47122381b36e5a7129",
  "VisibleInterval": "ae9c80e0d5ad24b0dc10059a0a073ee1dc4cab91cd560a53dba237370e972b6e",
  "Animation": "5fc04aa6aad769545a23f1d9e51ac40fa68cc468a10d358d260ee6f0f33adec6",
  "AnimationUtils": "335aba70276b15a7ab4eb378c9a080192426327e90e532fab42fffe898627450",
  "Transitions": "097d0723e01163064174062f4ef26e56500b0e925c8ebdc77672d3f5d74ca927",
  "CubeMap": "0bcc906515528b820d56b620f0d8f5734c6cff07244e06378356a5039360ff9c",
  "Quadtree": "7465c1b156efb4eb18e704bc219c69bef5582c10d0e13513dcdf036a000ebb8f",
  "Pool": "5d444bcc8123423e668e123909269cfb1242c7bd1aaeaf45f0f9bc6c28f4afdf",
  "FastIterable": "1d02dc64f5f62f23c8488bbcbc784d36b2aa1a99a3a032e08973ad22642edf64",
  "FastMap": "56a377ab75d4392413d01e56d808ae4a1024c823af4fbf1df43cf18b527c49eb",
  "FastSet": "a06c6aa70efaf1cc4f2cba6bf284f6da9b800aadec9ff60fe63b3a96b46f2311"
};
for(const [name,expected]of Object.entries(baselines)){
 const source=fs.readFileSync('eyes/src/engine/core/'+name+'.js','utf8');
 assert.equal(bindingHash(source),expected,name+' executable contract changed');
 assert.ok(!source.includes('@eyes-analysis'),name+' retains template comments');
 traverse(parser.parse(source,{sourceType:'module'}),{Scope(path){for(const name of Object.keys(path.scope.bindings))assert.ok(name.length>2,'Compressed binding '+name);}});
}
const api={THREE:{Vector2:class{},Vector3:class{},Quaternion:class{}}};
function load(name,extra={}){const source=fs.readFileSync('eyes/src/engine/core/'+name+'.js','utf8').replace(/^import .*;$/gm,'').replace(/^export .*;$/gm,'');const result=vm.runInNewContext(source+'\n'+name,{PioneerPublicApi:api,Pioneer:api,console,...extra});api[name]=result;return result;}
for(const name of ['Pool','MathUtils','Vector2','Vector3','Quaternion','Interval','Rect','LatLonAlt','AER','Color','Geometry','Sort','TimeUtils','DateTime','FastIterable','FastMap','FastSet','Tuple','CubeMap','Quadtree','Transitions'])load(name);
const {Vector2,Vector3,Quaternion,Geometry,Interval,TimeUtils,DateTime,Pool,FastMap,FastSet,Sort,Rect,Quadtree,CubeMap,Tuple,Transitions}=api;
const close=(actual,expected,tolerance=1e-12)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);
const cross=new Vector3(1,2,3),other=new Vector3(-4,5,6);cross.cross(cross,other);assert.deepEqual([cross.x,cross.y,cross.z],[-3,-18,13]);
const rotation=Quaternion.fromAxisAngle(Vector3.ZAxis,Math.PI/2),position=new Vector3(1,0,0);position.rotate(rotation,position);close(position.x,0);close(position.y,1);position.rotateInverse(rotation,position);close(position.x,1);close(position.y,0);
const axes=new Quaternion();axes.setFromAxes(Vector3.XAxis,undefined,Vector3.ZAxis);close(axes.w,1);assert.throws(()=>axes.setFromAxes(Vector3.XAxis,Vector3.YAxis,Vector3.ZAxis),/At least two/);
const zeroQuaternion=new Quaternion(2,3,4,5);zeroQuaternion.normalize(new Quaternion(0,0,0,0));assert.deepEqual([zeroQuaternion.w,zeroQuaternion.x,zeroQuaternion.y,zeroQuaternion.z],[2,3,4,5]);
rotation.mult(rotation,rotation);const rotated=new Vector3();rotated.rotate(rotation,Vector3.XAxis);close(rotated.x,-1);close(rotated.y,0);
const normalized=new Vector2(7,8);normalized.normalize(Vector2.Zero);assert.deepEqual([normalized.x,normalized.y],[7,8]);
const zero3=new Vector3(7,8,9);zero3.normalize(Vector3.Zero);assert.deepEqual([zero3.x,zero3.y,zero3.z],[0,0,0]);
const spherical=new Vector3();spherical.slerp(new Vector3(2,0,0),new Vector3(0,4,0),.5);close(spherical.magnitude(),3);close(spherical.x,spherical.y);
const roots=new Interval();Geometry.getLineSphereIntersectionWithLineStartAtOrigin(roots,new Vector3(2,0,0),new Vector3(10,0,0),2);assert.equal(roots.min,4);assert.equal(roots.max,6);
Geometry.getLineSphereIntersectionWithLineStartAtOrigin(roots,new Vector3(0,2,0),new Vector3(10,0,0),2);assert.ok(roots.isNaN());
assert.equal(Geometry.getLineSphereIntersectionWithSphereAtOrigin(new Vector3(10,0,0),new Vector3(-2,0,0),2),4);
const lla=new api.LatLonAlt(.3,-.7,2),cartesian=new Vector3(),roundtrip=new api.LatLonAlt();Geometry.getXYZFromLLAOnSphere(cartesian,lla,10);Geometry.getLLAFromXYZOnSphere(roundtrip,cartesian,10);close(roundtrip.lat,.3);close(roundtrip.lon,-.7);close(roundtrip.alt,2);
assert.equal(new Interval(1,3).contains(1),true);assert.equal(new Interval(1,3).contains(3),false);assert.equal(new Rect(0,0,2,2).intersects(new Rect(2,0,1,1)),false);
for(const unix of [0,946728000,1483228800,1700000000])close(TimeUtils.etToUnix(TimeUtils.unixToEt(unix)),unix,1e-6);
const leap=TimeUtils.leapSeconds.at(-1);close(TimeUtils.unixToEt(leap+1)-TimeUtils.unixToEt(leap),2,1e-6);
const date=new DateTime(2020,2,29);assert.equal(date.toDOY(),60);date.fromDOY(2020,61);assert.equal(date.month,3);assert.equal(date.day,1);assert.equal(new DateTime(1900).isLeapYear(),false);assert.equal(new DateTime(2000).isLeapYear(),true);
const parsedDate=new DateTime();parsedDate.parse('2020-02-29 12:34:56.123');assert.equal(parsedDate.millisecond,123);assert.equal(parsedDate.toString(),'2020-02-29 12:34:56.123000');const dateRoundtrip=new DateTime();dateRoundtrip.fromET(parsedDate.toET());assert.equal(dateRoundtrip.toString(),parsedDate.toString());
const pool=new Pool(class{}),first=pool.get(),second=pool.get();pool.release(first);assert.equal(pool.get(),first);pool.release(first);let destroyed=0;pool.setDestructorFunction(()=>destroyed++);pool.clean();assert.equal(destroyed,1);assert.equal(second._poolIndex,0);assert.equal(pool.isUsed(second),true);assert.throws(()=>pool.release({}),/not obtained/);
const map=new FastMap();map.set('a',3);map.set('b',1);map.set('c',2);map.sort((a,b)=>a<b);assert.equal(map.getAt(0).key,'b');assert.equal(map.get('a'),3);assert.equal(map.delete('c'),true);assert.equal(map.get('a'),3);map.set('b',9);assert.equal(map.getAt(0).value,9);
const set=new FastSet();set.add(3).add(1).add(3).add(2);assert.equal(set.getSize(),3);set.sort((a,b)=>a<b);assert.equal(set.getAt(0),1);set.delete(2);assert.equal(set.has(3),true);assert.equal(set.getAt(1),3);
const ordered=[1,2,2,4];assert.equal(Sort.getIndex(2,ordered),1);Sort.add(2,ordered);assert.equal(ordered.length,5);assert.equal(Sort.remove(2,ordered),true);assert.equal(ordered.length,4);
const calls=[];assert.deepEqual(Array.from(Tuple.create3Tuple(index=>{calls.push(index);return index+1;})),[1,2,3]);assert.deepEqual(calls,[0,1,2]);
const uv=new Vector3();CubeMap.xyzToUVFace(uv,Vector3.XAxis);assert.deepEqual([uv.x,uv.y,uv.z],[.5,.5,0]);CubeMap.xyzToUVFace(uv,new Vector3(1,1,0));assert.equal(uv.z,1);
const tree=new Quadtree({getBounds:()=>new Rect(0,0,100,100)},2);tree.setBounds('a',new Rect(1,1,10,10));tree.setBounds('b',new Rect(5,5,10,10));tree.setBounds('c',new Rect(50,50,5,5));const intersections=new FastSet();tree.getIntersections('a',intersections);assert.equal(intersections.has('b'),true);assert.equal(intersections.has('c'),false);tree.setBounds('b',new Rect(80,80,10,10));tree.getIntersections('a',intersections);assert.equal(intersections.getSize(),0);tree.removeBounds('a');
close(Transitions.easeInOut(0),0);close(Transitions.easeInOut(.5),.5);close(Transitions.easeInOut(1),1);const jump=new Vector2();Transitions._jumpOnCircle(jump,10,2,5,1);assert.deepEqual([jump.x,jump.y],[0,5]);
console.log('25 math/time/collection contracts and numerical/alias/intersection/leap-second/index/quad-tree regressions passed');
