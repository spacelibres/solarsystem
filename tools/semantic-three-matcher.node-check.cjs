const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const parser=require('@babel/parser');
const {collect,canonical}=require('./lib/three-core-match-next.cjs');
function fingerprint(method){const tree=parser.parse('class C{'+method+'}',{sourceType:'module'});return canonical([...collect(tree).methods.values()][0],false).hash;}
function run(method,args){return vm.runInNewContext('new (class C{'+method+'})().m(...args)',{args});}
const cases=[
 ['shadowed undefined is not a reorderable constant','m(undefined){return undefined===(undefined=2)}','m(undefined){return (undefined=2)===undefined}',[1]],
 ['else unwrapping preserves lexical block scope','m(x){if(x){return 0}else{let a=1;}return typeof a}','m(x){if(x){return 0}let a=1;return typeof a}',[false]],
 ['bare return is distinct from a parameter named undefined','m(x,undefined){if(x)return false;return}','m(x,undefined){return !x&&undefined}',[false,7]]
];
for(const [name,left,right,args]of cases)test(name,()=>{
 assert.notEqual(run(left,args),run(right,args),'fixture must demonstrate different behavior');
 assert.notEqual(fingerprint(left),fingerprint(right),'comparison-only normalization erased an observable difference');
});
