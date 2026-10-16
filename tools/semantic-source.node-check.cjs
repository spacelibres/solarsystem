const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const {expandSource,bindingHash}=require('./lib/semantic-source.cjs');
function execute(source){return vm.runInNewContext(source+';JSON.stringify(run());');}
test('statement expansion preserves short-circuit evaluation, returns and loop control',()=>{
 const source='function run(){const calls=[];for(let index=0;index<3;index++)if((calls.push(index),index===1))continue;else calls.push("step");true&&(calls.push("a"),calls.push("b"));false||calls.push("c");calls.length?calls.push("d"):calls.push("bad");return calls.push("end"),calls;}';
 assert.equal(execute(expandSource(source)),execute(source));
 assert.equal(bindingHash(expandSource(source)),bindingHash(source));
});
test('semantic hash permits lexical renames but rejects captured globals, field and constant changes',()=>{
 assert.equal(bindingHash('const a=1;function run(b){return {value:a+b};}'),bindingHash('const initial=1;function run(input){return {value:initial+input};}'));
 assert.notEqual(bindingHash('function run(a){return external+a;}'),bindingHash('function run(external){return external+external;}'));
 assert.notEqual(bindingHash('function run(a){return a.position;}'),bindingHash('function run(a){return a.velocity;}'));
 assert.notEqual(bindingHash('const a=1;'),bindingHash('const a=2;'));
});
test('async branches retain await order and exception/finally behavior',async()=>{
 const source='async function run(){const log=[];const step=async(value)=>{log.push(value);return value;};try{if((await step(1),await step(2)))await step(3),await step(4);false||await step(5);throw Error("expected");}catch(error){log.push(error.message);}finally{log.push("finally");}return log;}';
 const original=await vm.runInNewContext(source+';run().then(JSON.stringify)');
 const expanded=await vm.runInNewContext(expandSource(source)+';run().then(JSON.stringify)');
 assert.equal(expanded,original);assert.equal(bindingHash(source),bindingHash(expandSource(source)));
});

test('discarded strings never become strict-mode directives after expansion',()=>{
 for(const source of [
  'function run(){return ("use strict",this===undefined)}',
  '("use strict",0);function run(){return this===undefined}',
  'function run(){if(("use strict",true))return this===undefined;}'
 ]){
  assert.equal(execute(source),'false');assert.equal(execute(expandSource(source)),'false');
  assert.equal(bindingHash(source),bindingHash(expandSource(source)));
 }
});

test('comments and string contents do not select the lexical hash namespace',()=>{
 assert.equal(bindingHash('const a=1;'),bindingHash('/* __eyesLexicalBinding */ const a=1;'));
 assert.equal(bindingHash('const a=1;'),bindingHash('/** @license retained by Babel unless explicitly suppressed */ const a=1;'));
 assert.equal(bindingHash('const a="__eyesLexicalBinding";'),bindingHash('const renamed="__eyesLexicalBinding";'));
 assert.notEqual(bindingHash('const a=1;function read(){return __eyesLexicalBinding0+a}'),bindingHash('const a=1;function read(){return a+a}'));
});
