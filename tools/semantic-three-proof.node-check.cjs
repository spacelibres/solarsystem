const {test}=require('node:test'),assert=require('node:assert/strict');
const {compareThreeAlpha}=require('./lib/three-alpha-contract.cjs');

test('declaration identity does not resolve to an inner same-name function',()=>{
 const before='function i(){function i(){return 3;}return i();}export{i as Public};';
 const after='function outer(){function inner(){return 3;}return inner();}export{outer as Public};';
 const proof=compareThreeAlpha(before,after);
 assert.equal(proof.equal,true);
 assert.equal(proof.originalAnalysis.missedDeclarations,0);
});

test('same-name declaration proof still rejects recursion capture and changed public exports',()=>{
 const before='function i(){function i(){return 3;}return i();}export{i as Public};';
 assert.equal(compareThreeAlpha(before,'function outer(){function inner(){return 3;}return outer();}export{outer as Public};').equal,false);
 assert.equal(compareThreeAlpha(before,'function outer(){function inner(){return 3;}return inner();}export{outer as Other};').equal,false);
});
