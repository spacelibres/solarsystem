const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {bindingHash}=require('./lib/semantic-source.cjs');
const {canonicalThreeSource,threeAlphaHash,compareThreeAlpha}=require('./lib/three-alpha-contract.cjs');
const parser=require('@babel/parser'),generate=require('@babel/generator').default;
const supportedProofCases=[
 'const local = 1; export { local as Public };',
 'function outer(value) { let result=value; result++; return function inner(value){ result+=value; return result; }; } export { outer };',
 'const key="slot"; const object={slot:1}; function read(value){ return object[key]+value; } export { read };',
 'function parse(input){const {slot:value=2}=input; return [value,...input.rest];} export { parse };',
 'const Local = class Inner { method(value){ return value ? new Inner() : this; } }; export { Local as Public };',
 'function f(input){ input && (input.value++, input.run()); return input.value, input; } export { f };',
 'function f(input){ (0, "use strict", input.run()); return input; } export { f };',
 '/* __eyesLexicalBinding is only a comment */ const value=1; export { value };'
];
for(const sample of supportedProofCases)assert.equal(threeAlphaHash(sample),bindingHash(sample),'Three subset differs from shared helper');
assert.equal(compareThreeAlpha('const local=1;export {local as Public};','const restored=1;export {restored as Public};').equal,true);
assert.equal(compareThreeAlpha('const local=1;export {local as Public};','const restored=1;export {restored as Other};').equal,false);
assert.equal(compareThreeAlpha('function f(a){return function g(b){return a+b;};}','function f(a){return function g(b){return b+b;};}').equal,false);
assert.equal(compareThreeAlpha('const value={slot:1};export {value};','const value={other:1};export {value};').equal,false);
assert.equal(compareThreeAlpha('const value=1;export {value};','const value=2;export {value};').equal,false);
assert.equal(compareThreeAlpha('function f(value){return helper(value);}','function f(value){return other(value);}').equal,false);
for(const invalid of ['export const value=1;','export default 1;','export * from "external";','import value from "external";','const lazy=import("external");','const element=<div/>;','const value=1;const object={value};','const {value}=source;'])assert.throws(()=>threeAlphaHash(invalid),/Three alpha subset/);
if(process.argv.includes('--contract-only')){console.log('Three linear alpha subset agreement/rejection/export/capture/property/literal regressions passed');process.exit(0);}
const source=fs.readFileSync('eyes/src/vendor/three/core.js','utf8');
const expected="973e08eac13b9c44eb412ef8f93e85459c1c6c1d984c20d3372f5b2960f26844";
const finalSemanticHash='1b3be6fc1a647df0ae3c4e914a43222a272b832760d8cc9d4d6474cabdd662c8';
const semanticHash=crypto.createHash('sha256').update(generate(parser.parse(source,{sourceType:'module'}),{comments:false,compact:true,shouldPrintComment:()=>false}).code).digest('hex');
assert.equal(semanticHash,finalSemanticHash,'Three final source bindings or executable contract changed');
// The original-to-final alpha proof is performed once during cleanup. Keep an
// explicit linear recheck available; ordinary runs guard the frozen final AST.
if(process.argv.includes('--verify-alpha')){
 const canonical=canonicalThreeSource(source);
 assert.equal(crypto.createHash('sha256').update(canonical.code).digest('hex'),expected,'Three original-to-final alpha proof changed');
 for(const [key,value]of Object.entries({bindingCount:7139,referenceCount:23140,selectedIdentifiers:31072,assignmentsAndUpdates:1237,missedDeclarations:0,missedReferences:0,missedAssignmentTargets:0}))assert.equal(canonical.analysis[key],value,'Three reference coverage '+key);
 assert.equal(canonical.analysis.publicExportNames.length,444);
}
const close=(actual,expected,tolerance=1e-10)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);
async function check(){
 const THREE=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 assert.equal(THREE.REVISION,'185');
 assert.equal(crypto.createHash('sha256').update(Object.keys(THREE).sort().join('\n')).digest('hex'),"e41b5640743b2f6d56a327f517b678c66dd5bc1251bf4a271051d8a04924428e",'Three public exports changed');
 assert.equal(THREE.FrontSide,0);assert.equal(THREE.NormalBlending,1);
 assert.equal(THREE.MathUtils.clamp(4,0,3),3);close(THREE.MathUtils.degToRad(180),Math.PI);
 const vector=new THREE.Vector3(1,2,3);vector.crossVectors(vector,new THREE.Vector3(-4,5,6));assert.deepEqual(vector.toArray(),[-3,-18,13]);
 const quaternion=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2),rotated=new THREE.Vector3(1,0,0).applyQuaternion(quaternion);close(rotated.x,0);close(rotated.y,1);
 const matrix=new THREE.Matrix4().compose(new THREE.Vector3(3,4,5),quaternion,new THREE.Vector3(2,3,4));
 const position=new THREE.Vector3(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();matrix.decompose(position,rotation,scale);assert.deepEqual(position.toArray(),[3,4,5]);close(scale.x,2);close(scale.y,3);close(scale.z,4);close(Math.abs(rotation.dot(quaternion)),1);
 const identity=matrix.clone().multiply(matrix.clone().invert());for(let index=0;index<16;index++)close(identity.elements[index],index%5===0?1:0);
 const transformed=new THREE.Vector3(1,0,0).applyMatrix4(matrix);close(transformed.x,3);close(transformed.y,6);close(transformed.z,5);
 const color=new THREE.Color().setHex(0x3a7bc1);assert.equal(color.getHex(),0x3a7bc1);const blended=new THREE.Color(0,0,0).lerp(new THREE.Color(1,1,1),.25);close(blended.r,.25);close(blended.g,.25);close(blended.b,.25);
 const box=new THREE.BoxGeometry(2,4,6);box.computeBoundingBox();box.computeBoundingSphere();assert.deepEqual(box.boundingBox.min.toArray(),[-1,-2,-3]);assert.deepEqual(box.boundingBox.max.toArray(),[1,2,3]);close(box.boundingSphere.radius,Math.sqrt(14));assert.equal(box.getAttribute('position').count,24);assert.equal(box.index.count,36);
 const sphere=new THREE.SphereGeometry(2,8,6);assert.equal(sphere.getAttribute('position').count,63);sphere.computeBoundingBox();close(sphere.boundingBox.max.y,2);close(sphere.boundingBox.min.y,-2);
 const hit=new THREE.Ray(new THREE.Vector3(0,0,5),new THREE.Vector3(0,0,-1)).intersectSphere(new THREE.Sphere(new THREE.Vector3(),1),new THREE.Vector3());assert.deepEqual(hit.toArray(),[0,0,1]);
 const object=new THREE.Object3D(),track=new THREE.NumberKeyframeTrack('.position[x]',[0,1],[0,10]),clip=new THREE.AnimationClip('movement',1,[track]),mixer=new THREE.AnimationMixer(object);mixer.clipAction(clip).play();mixer.setTime(.5);close(object.position.x,5);mixer.stopAllAction();mixer.uncacheRoot(object);
 box.dispose();sphere.dispose();
 console.log('Three final semantic AST/API guards and actual vector/quaternion/matrix/color/geometry/ray/animation CPU regressions passed');
}
check().catch(error=>{console.error(error);process.exitCode=1;});
