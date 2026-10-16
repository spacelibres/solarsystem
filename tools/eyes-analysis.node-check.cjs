const {test}=require('node:test');const assert=require('node:assert/strict');
const {analyzeJavaScript,analyzeTemplate,semanticHash}=require('./lib/eyes-analysis.cjs');
test('inventories every nested class, accessor and method with state effects',()=>{
 const result=analyzeJavaScript('import {Base as B} from "./base.js"; export class Outer extends B { constructor(t){super();this._value=t;} get value(){return this._value;} update(t){this._value=t;this.manager.run(t);return this._value;} make(){return class Inner{run(){return 1;}};} }','sample.js');
 assert.equal(result.classes.length,2);assert.equal(result.classes[0].extends,'B');assert.equal(result.classes[1].name,'Inner');
 const update=result.classes[0].methods.find(x=>x.name==='update');assert.deepEqual(update.writes,['_value']);assert.ok(update.calls.includes('this.manager.run'));assert.ok(update.reads.includes('_value'));assert.equal(result.imports[0].source,'./base.js');
});
test('keeps shadowed short bindings separate and maps method parameter use',()=>{
 const r=analyzeJavaScript('class A{load(t){this.reader=t;t.readFloat64();const f=function(t){return t+1};return f(1)}}','sample.js');
 const values=r.shortBindings.filter(b=>b.name==='t');assert.equal(values.length,2);assert.notEqual(values[0].scope,values[1].scope);
 assert.ok(values.some(b=>b.uses.some(u=>u.includes('readFloat64'))));
});
test('collects template component and event/state dependencies',()=>{
 const r=analyzeTemplate('<Panel><button onclick="toggle">{{title}} {{#isOpen}}Yes{{/isOpen}}</button></Panel>');
 assert.ok(r.components.includes('Panel'));assert.ok(r.events.includes('toggle'));assert.ok(r.bindings.includes('title'));assert.ok(r.bindings.includes('isOpen'));
});
test('comment changes cannot disguise executable source changes',()=>{
 assert.equal(semanticHash('const a=1;'),semanticHash('/** doc */\nconst a=1;'));
 assert.notEqual(semanticHash('const a=1;'),semanticHash('const a=2;'));
});
test('updates both read and write state and finds CommonJS named exports',()=>{
 const r=analyzeJavaScript('class Counter{tick(){this.count++;}} module.exports.Counter=Counter;','counter.cjs');
 assert.ok(r.classes[0].methods[0].reads.includes('count'));
 assert.ok(r.classes[0].methods[0].writes.includes('count'));
 assert.equal(r.exports[0].exported,'Counter');
});
test('matches a named class expression through its exported declaration binding',()=>{
 const r=analyzeJavaScript('const defaultExport=class ActualName {};export {defaultExport as default};');
 assert.equal(r.classes[0].name,'ActualName');
 assert.deepEqual(r.classes[0].exportedAs,['default']);
});
test('follows top-level export aliases but never mistakes exported facades for classes',()=>{
 const r=analyzeJavaScript('let defaultExport;class A{};defaultExport=A;export {defaultExport as default};');
 assert.deepEqual(r.classes[0].exportedAs,['default']);
 const facade=analyzeJavaScript('class A{};const defaultExport={create:()=>new A()};export {defaultExport as default};');
 assert.deepEqual(facade.classes[0].exportedAs,[]);
});
test('inventories executable static blocks and callable class fields',()=>{
 const r=analyzeJavaScript('class A{static{this.ready=true;setup();} run=(value)=>{this.value=value;return this.value;}}');
 const block=r.classes[0].methods.find(m=>m.kind==='static-block');
 assert.ok(block.writes.includes('ready'));assert.ok(block.calls.includes('setup'));
 const field=r.classes[0].methods.find(m=>m.name==='run');
 assert.equal(field.kind,'field-function');assert.deepEqual(field.params,['value']);
 assert.ok(field.writes.includes('value'));
});
test('follows optional member/call syntax in manager and component queries',()=>{
 const r=analyzeJavaScript('class C{f(){return this._app?.getManager("time")?.getTime();}}');
 const m=r.classes[0].methods[0];
 assert.ok(m.managers.includes('time'));assert.ok(m.calls.some(c=>c.includes('getTime')));
 assert.ok(m.reads.some(c=>c.includes('_app')));
});
test('uses handwritten lifecycle comments as semantic evidence and excludes generated boilerplate',()=>{
 const result=analyzeJavaScript('/** Owns the frame loop. */ class Engine{/** Save previous state before controllers run. */ update(){this.scene.update();}}');
 assert.equal(result.classes[0].documentation,'Owns the frame loop.');
 assert.equal(result.classes[0].methods[0].documentation,'Save previous state before controllers run.');
 const generated=analyzeJavaScript('/** @eyes-analysis structural placeholder */ class A{}');
 assert.equal(generated.classes[0].documentation,'');
});
test('analysis commands reject retired bulk source annotation without changing source',()=>{
 const fs=require('node:fs'),cp=require('node:child_process');const file='eyes/src/app/PreloadManager.js';const before=fs.readFileSync(file,'utf8');
 const result=cp.spawnSync(process.execPath,['tools/analyze-eyes.cjs','annotate'],{encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/Bulk source annotation is retired/);
 assert.equal(fs.readFileSync(file,'utf8'),before);
});
test('semantic acceptance records pin current source and point to committed evidence',()=>{
 const fs=require('node:fs'),crypto=require('node:crypto');
 const progress=JSON.parse(fs.readFileSync('docs/eyes-analysis/semantic-progress.json','utf8'));
 assert.ok(progress.exceptions.length>=3);
 for(const [file,review]of Object.entries(progress.files)){
  if(review.status==='not-semantically-accepted')continue;
  assert.ok(review.evidence.length,file+' needs evidence');
  for(const evidence of review.evidence)assert.ok(fs.existsSync(evidence),file+': '+evidence);
  const source=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'),review.sourceSha256,file+' changed after review');
 }
});

test('published reference accounts for every tracked file and every indexed class callable',()=>{
 const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path');
 const root=path.resolve(__dirname,'..');
 const index=JSON.parse(fs.readFileSync(path.join(root,'docs/eyes-analysis/index.json'),'utf8'));
 const doc=fs.readFileSync(path.join(root,'docs/eyes-analysis/README.md'),'utf8');
 const files=cp.execFileSync('git',['ls-files','eyes'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).sort();
 assert.deepEqual(index.files.map(f=>f.file),files);
 const anchors=index.files.map(f=>'file-'+f.file.replace(/[^a-zA-Z0-9_-]/g,'-'));
 assert.equal(new Set(anchors).size,files.length);
 for(let i=0;i<index.files.length;i++){
  const f=index.files[i];const start=doc.indexOf('<a id="'+anchors[i]+'"></a>');assert.ok(start>=0,f.file);
  const end=i+1<index.files.length?doc.indexOf('<a id="'+anchors[i+1]+'"></a>',start+1):doc.length;
  const section=doc.slice(start,end);
  for(const cls of f.classes||[]){
   assert.ok(section.includes('类 `'+cls.name+'`（声明 '+cls.ordinal+'）'),f.file+':'+cls.name);
   for(const method of cls.methods)assert.ok(section.includes('../../'+f.file+'#L'+method.line+')'),f.file+':'+cls.name+'.'+method.name);
  }
 }
});
