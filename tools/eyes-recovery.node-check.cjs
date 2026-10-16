const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { recoverChunk, rewriteCss } = require('./lib/eyes-recovery.cjs');
test('recovers sparse factories and preserves scoped dependencies and export getters', () => {
 const recovered = recoverChunk('(self.webpackChunksolar_system=self.webpackChunksolar_system||[]).push([[0],[,function(t,e,i){i.d(e,{answer:()=>value});const value=i(2).value;},function(t){t.exports={value:42}}],function(r){r(1)}]);', 'app.js');
 assert.deepEqual(recovered.modules.map(m=>m.id), [1,2]);
 assert.deepEqual(recovered.modules[0].dependencies,[2]);
 const cache={}; const req=id=>{if(cache[id])return cache[id].exports;const m=cache[id]={exports:{}};vm.runInNewContext('('+recovered.modules.find(m=>m.id===id).code+')')(m,m.exports,req);return m.exports;};
 req.d=(out,defs)=>Object.keys(defs).forEach(k=>Object.defineProperty(out,k,{get:defs[k]}));
 assert.equal(req(1).answer,42);
 assert.match(recovered.modules[0].code,/requireModule/);
});
test('keeps closure strings and shadowed parameter bindings intact',()=>{
 const chunk=recoverChunk('self.webpackChunksolar_system.push([[0],{7:function(t,e,i){e.x="i";e.fn=function(i){return i+1};}}]);','app.js');
 assert.match(chunk.modules[0].code,/"i"/);
 assert.match(chunk.modules[0].code,/function \(i\)/);
});
test('CSS assets resolve against the actual original stylesheet URL',()=>{
 assert.equal(rewriteCss('a{src:url(assets/a.woff)}b{src:url(data:x)}','https://eyes.nasa.gov/apps/solar-system/app.css'),'a{src:url("https://eyes.nasa.gov/apps/solar-system/assets/a.woff")}b{src:url(data:x)}');
});
test('relocates literal and embedded JSON assets without doubling webpack publicPath',()=>{
 const chunk=recoverChunk('self.webpackChunksolar_system.push([[0],{7:function(t,e,i){e.a="assets/a.png";e.b=i.p+"assets/b.png";e.c=JSON.parse(\'{"icon":"assets/c.png"}\');e.d="autoplay.json";}}]);','app.js');
 const module={exports:{}};const req=()=>{};req.p='https://eyes.nasa.gov/apps/solar-system/';
 vm.runInNewContext('('+chunk.modules[0].code+')',{URL})(module,module.exports,req);
 assert.equal(module.exports.a,req.p+'assets/a.png');assert.equal(module.exports.b,req.p+'assets/b.png');assert.equal(module.exports.c.icon,req.p+'assets/c.png');assert.equal(module.exports.d,req.p+'autoplay.json');
});
test('relocates asset attributes embedded inside HTML fragments',()=>{
 const chunk=recoverChunk('self.webpackChunksolar_system.push([[0],{7:function(t,e){e.html=\'<img src="assets/images/map_marker.svg">\';}}]);','app.js');
 assert.match(chunk.modules[0].code,/https:\/\/eyes.nasa.gov\/apps\/solar-system\/assets\/images\/map_marker.svg/);
});
