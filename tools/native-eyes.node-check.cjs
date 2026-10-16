const {test}=require('node:test');
const assert=require('node:assert/strict');
const {convertFactory}=require('./lib/native-eyes.cjs');
const info=new Map([[1,{id:1,file:'app/Example.js',esm:true}],[2,{id:2,file:'engine/Dependency.js',esm:true}],[3,{id:3,file:'vendor/value.cjs',esm:false}]]);
test('unwraps live ESM exports and names dependencies without webpack APIs',()=>{
 const out=convertFactory('function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{Example:()=>Example});var x=requireModule(2);class Example extends x.Dependency{}}',info.get(1),info);
 assert.match(out,/import \* as Dependency/);assert.match(out,/export \{ Example \}/);assert.doesNotMatch(out,/requireModule|moduleExports|export default function/);
});
test('recovers native named reexports and default assignment',()=>{
 const out=convertFactory('function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{Dependency:()=>x.Dependency});var x=requireModule(2);moduleExports.default=x.Dependency;}',info.get(1),info);
 assert.match(out,/export \{ Dependency \} from/);assert.match(out,/as default/);assert.doesNotMatch(out,/moduleExports/);
});
test('preserves ordinary CommonJS relative requires for cyclic vendor packages',()=>{
 const out=convertFactory('function(module,moduleExports,requireModule){module.exports=requireModule(3);}',{id:4,file:'vendor/test.cjs',esm:false},info);
 assert.match(out,/require\("\.\/value.cjs"\)/);assert.match(out,/module.exports/);assert.doesNotMatch(out,/requireModule/);
});
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const vm=require('node:vm');
const {buildSync}=require('esbuild');
function executeModules(infos,codes,entry){
 const folder=fs.mkdtempSync(path.join(os.tmpdir(),'eyes-native-'));
 try{
  const byId=new Map(infos.map(x=>[x.id,x]));
  for(const info of infos){const target=path.join(folder,info.file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,convertFactory(codes[info.id],info,byId));}
  const output=buildSync({absWorkingDir:folder,entryPoints:[entry],bundle:true,format:'cjs',write:false,platform:'node'}).outputFiles[0].text;
  const module={exports:{}};vm.runInNewContext(output,{module,exports:module.exports});return module.exports;
 }finally{if(path.dirname(folder)===os.tmpdir()&&path.basename(folder).startsWith('eyes-native-'))fs.rmSync(folder,{recursive:true});}
}
test('executes native live exports and early namespace reexports through a cycle',()=>{
 const result=executeModules([
  {id:1,file:'entry.js',esm:true,label:'Entry'},
  {id:2,file:'barrel.js',esm:true,label:'Barrel'},
  {id:3,file:'math.js',esm:true,label:'Math'},
  {id:4,file:'vector.js',esm:true,label:'Vector'},
 ],{
  1:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{Vector:()=>v.Vector});var v=requireModule(2);}',
  2:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{Math:()=>m,Vector:()=>v.Vector});var m=requireModule(3),v=requireModule(4);}',
  3:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{unit:()=>unit});const unit=7;}',
  4:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{Vector:()=>Vector});var b=requireModule(2);class Vector{static unit=b.Math.unit;}}',
 },'entry.js');
 assert.equal(result.Vector.unit,7);
});
test('executes CommonJS cyclic imports with original partial-export semantics',()=>{
 const result=executeModules([{id:1,file:'entry.cjs',esm:false},{id:2,file:'other.cjs',esm:false}],{
  1:'function(module,moduleExports,requireModule){moduleExports.ready=true;moduleExports.other=requireModule(2);}',
  2:'function(module,moduleExports,requireModule){moduleExports.sawReady=requireModule(1).ready;}',
 },'entry.cjs');
 assert.equal(result.other.sawReady,true);
});
test('never renames a default-export binding to a reserved keyword',()=>{
 const result=convertFactory('function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{default:()=>f});function f(){return 1;}}',info.get(1),info);
 assert.doesNotMatch(result,/function default\(/);
});
test('preserves live mutable exports instead of taking snapshots',()=>{
 const result=executeModules([{id:1,file:'entry.js',esm:true,label:'Counter'}],{
  1:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{count:()=>count,increment:()=>increment});let count=0;function increment(){count++;}}',
 },'entry.js');
 assert.equal(result.count,0);result.increment();assert.equal(result.count,1);
});
test('rewrites locale contexts to static relative module requests',()=>{
 const result=executeModules([{id:1,file:'context.cjs',esm:false},{id:2,file:'locale.cjs',esm:false}],{
  1:'function(module,moduleExports,requireModule){var table={"./en":2};function load(key){var id=table[key];return requireModule(id);}load.keys=()=>Object.keys(table);module.exports=load;}',
  2:'function(module){module.exports={name:"English"};}',
 },'context.cjs');
 assert.equal(result('./en').name,'English');assert.deepEqual(Array.from(result.keys()),['./en']);
});
test('keeps evaluation order while expanding minified statement sequences',()=>{
 const result=executeModules([{id:1,file:'app/entry.js',esm:true,label:'Entry'}],{
  1:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{run:()=>run});function run(){const out=[];out.push(1),out.push(2);return out.push(3),out;}}',
 },'app/entry.js');
 assert.deepEqual(Array.from(result.run()),[1,2,3]);
 const code=convertFactory('function(module,moduleExports,requireModule){requireModule.r(moduleExports);let value=!0;value=1,value=2;}',info.get(1),info);
 assert.match(code,/value = true/);assert.doesNotMatch(code,/value = 1, value = 2/);
});
test('never captures an outer binding when a nested scope already uses its semantic name',()=>{
 const result=executeModules([{id:1,file:'app/entry.js',esm:true,label:'Entry'}],{
  1:'function(module,moduleExports,requireModule){requireModule.r(moduleExports);requireModule.d(moduleExports,{counter:()=>x,run:()=>run});const x=7;function run(counter){return x+counter;}}',
 },'app/entry.js');
 assert.equal(result.run(2),9);
});
test('recovered BaseRef changes the reference and reports previous/current values',async()=>{
 const {pathToFileURL}=require('node:url');
 const {BaseRef}=await import(pathToFileURL(path.resolve('eyes/src/engine/core/BaseRef.js')).href);
 const reference=new BaseRef();const changes=[];
 reference.setRefChangedCallback((previous,current)=>changes.push([previous,current]));
 const first={isEnabled:()=>true};const second={isEnabled:()=>true};
 reference._setRef(first);reference._setRef(second);
 assert.equal(reference.getRef(),second);
 assert.deepEqual(changes,[[null,first],[first,second]]);
});
