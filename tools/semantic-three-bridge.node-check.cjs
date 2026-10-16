const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default;
const generate=require('@babel/generator').default;
const {pathToFileURL}=require('node:url'),path=require('node:path');
const {bindingHash}=require('./lib/semantic-source.cjs');
const baselines={
 'eyes/src/engine/core/Engine.js':'3f4b12845a7384b68fc22d8c4a0c2d95c5c787bbffb22de3c798c2cf546853d8',
 'eyes/src/engine/core/Scene.js':'20fed0af203ba12413ce7808b6985221eb3ebe6bdbad09bf53b015fb9d35dddd',
 'eyes/src/engine/core/Viewport.js':'722a1f86116769f042ba2730cea1add6fa905193f64db43d0a04e32dbc845f5d',
 'eyes/src/engine/core/ThreeJsHelper.js':'f4767f7bea908fe440c7d973020556f0079df8c9003455dcbdbed38de2032faa',
 'eyes/src/engine/components/CameraComponent.js':'da33ce88ab1f5ebdad42f8da1e38ffe54eab33844f3f34e7611656b42a3dbb3e'
};
for(const [file,expected]of Object.entries(baselines))test(file+' preserves the v0.2.32 operations and exposes statement order',()=>{
 const source=fs.readFileSync(file,'utf8');
 if(file.endsWith('/ThreeJsHelper.js')){
  // These two methods intentionally fix Points/Line disposal and carry the GL
  // context down recursive cleanup. The integration test exercises the fix.
  const tree=parser.parse(source,{sourceType:'module'});
  traverse(tree,{ClassMethod(p){if(['destroyObject','destroyAllObjectsAndMaterials'].includes(p.node.key.name))p.node.body.body=[];}});
  assert.equal(bindingHash(generate(tree).code),'261b9248ed9020748623be095fb4e720a504db0d812afe08a6fbabb10ef7f781');
 }else assert.equal(bindingHash(source),expected);
 const compressed=[];
 traverse(parser.parse(source,{sourceType:'module'}),{
  ExpressionStatement(p){if(['SequenceExpression','ConditionalExpression','LogicalExpression'].includes(p.node.expression.type))compressed.push(p.node.loc.start.line);},
  IfStatement(p){if(p.node.test.type==='SequenceExpression')compressed.push(p.node.loc.start.line);},
  ReturnStatement(p){if(p.node.argument?.type==='SequenceExpression')compressed.push(p.node.loc.start.line);}
 });
 assert.deepEqual(compressed,[],'discarded control-flow expressions still hide execution order');
});

function load(file,name,api){const source=fs.readFileSync('eyes/src/engine/'+file+'.js','utf8').replace(/^import .*;\r?\n/gm,'').replace(/^export .*;\r?\n/gm,'');return vm.runInNewContext(source+'\n'+name,{PioneerPublicApi:api,console});}
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-11,`${actual} != ${expected}`);

test('Eyes Y-forward projection agrees with real Three Matrix4 and has a paired inverse',async()=>{
 const THREE=await import(pathToFileURL(path.resolve('eyes/src/vendor/three/core.js')).href);
 const api={THREE,BaseComponent:class{}};
 api.Pool=load('core/Pool','Pool',api);api.Vector3=load('core/Vector3','Vector3',api);
 const Camera=load('components/CameraComponent','CameraComponent',api);
 const camera=Object.create(Camera.prototype);
 const orientation={x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2};
 camera.getEntity=()=>({getOrientation:()=>orientation});
 camera._threeJsCamera=new THREE.PerspectiveCamera();camera._fieldOfView=Math.PI/2;camera._autoNearDistance=.1;
 for(const [aspect,expectedX,expectedY]of [[2,.2,.6],[.5,.4,.3]]){
  camera._aspectRatio=aspect;camera._updateProjectionMatrix();
  const world=new api.Vector3(-10,2,3),normal=new api.Vector3();
  camera.getNormalSpacePositionFromCameraSpacePosition(normal,world);
  close(normal.x,expectedX);close(normal.y,expectedY);close(normal.z,.98);
  const oracle=new THREE.Vector3(-10,2,3).applyQuaternion(new THREE.Quaternion(0,0,Math.SQRT1_2,Math.SQRT1_2).invert()).applyMatrix4(camera._threeJsCamera.projectionMatrix);
  close(normal.x,oracle.x);close(normal.y,oracle.y);close(normal.z,oracle.z);
  const recovered=new api.Vector3();camera.getCameraSpacePositionFromNormalSpacePosition(recovered,normal);
  close(recovered.x,-10);close(recovered.y,2);close(recovered.z,3);
  const identity=new THREE.Matrix4().multiplyMatrices(camera._threeJsCamera.projectionMatrix,camera._threeJsCamera.projectionMatrixInverse);
  identity.elements.forEach((value,index)=>close(value,index%5===0?1:0));
 }
 assert.equal(api.Vector3.pool.areAnyUsed(),false,'temporary projected vectors must return to pool');
});

test('camera radius conversion preserves angular scale across both distance signs',async()=>{
 const Camera=load('components/CameraComponent','CameraComponent',{BaseComponent:class{}});
 const camera=Object.create(Camera.prototype);camera._fieldOfView=Math.PI/2;
 for(const distance of [-100,100]){close(camera.getNormalSpaceRadiusFromRadius(5,distance),.05);close(camera.getRadiusFromNormalSpaceRadius(.05,distance),5);}
});
