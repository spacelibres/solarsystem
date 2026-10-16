const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {semanticHash}=require('./lib/eyes-analysis.cjs');
const baselines=require('./lib/preserved-eyes-contracts.json');

test('files without semantic acceptance retain the executable AST from v0.2.31',()=>{
 assert.ok(Object.keys(baselines).length>600);
 for(const [file,baseline]of Object.entries(baselines)){
  assert.equal(semanticHash(fs.readFileSync(file,'utf8'),file),baseline,file+' changed beyond comment removal');
 }
});
