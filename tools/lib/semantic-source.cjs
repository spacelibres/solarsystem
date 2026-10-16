const parser=require('@babel/parser');
const traverse=require('@babel/traverse').default;
const generate=require('@babel/generator').default;
const types=require('@babel/types');
const crypto=require('node:crypto');
const parse=source=>parser.parse(source,{sourceType:'unambiguous'});
// A discarded string must not become a "use strict" directive when emitted
// at the start of a function or CommonJS module body.
const statement=value=>types.expressionStatement(types.isStringLiteral(value)?types.unaryExpression('void',value):value);

/** Only rewrite expressions whose resulting value is discarded; never duplicate a receiver or await. */
function expandStatements(tree){
 traverse(tree,{
  ExpressionStatement:{exit(path){
   const expression=path.node.expression;
   if(types.isSequenceExpression(expression))path.replaceWithMultiple(expression.expressions.map(statement));
   else if(types.isConditionalExpression(expression))path.replaceWith(types.ifStatement(expression.test,types.blockStatement([types.expressionStatement(expression.consequent)]),types.blockStatement([types.expressionStatement(expression.alternate)])));
   else if(types.isLogicalExpression(expression)&&['&&','||'].includes(expression.operator))path.replaceWith(types.ifStatement(expression.operator==='&&'?expression.left:types.unaryExpression('!',expression.left),types.blockStatement([types.expressionStatement(expression.right)])));
  }},
  IfStatement:{exit(path){
   if(!types.isSequenceExpression(path.node.test))return;
   const expressions=path.node.test.expressions;path.node.test=expressions.at(-1);
   path.replaceWithMultiple([...expressions.slice(0,-1).map(statement),path.node]);
  }},
  ReturnStatement:{exit(path){
   if(!types.isSequenceExpression(path.node.argument))return;
   const expressions=path.node.argument.expressions;
   path.replaceWithMultiple([...expressions.slice(0,-1).map(statement),types.returnStatement(expressions.at(-1))]);
  }}
 });
 return tree;
}
function expandSource(source){return generate(expandStatements(parse(source)),{comments:true,compact:false}).code+'\n';}

/** Alpha equivalence is independent of the chosen names; public properties, free globals and literals remain significant. */
function bindingHash(source){
 const tree=expandStatements(parse(source));const bindings=[];
 traverse(tree,{Scope(path){for(const binding of Object.values(path.scope.bindings))if(!bindings.includes(binding))bindings.push(binding);}});
 // A temporary namespace avoids collisions with identifiers already present in the program.
 const identifiers=new Set();traverse(tree,{Identifier(path){identifiers.add(path.node.name);}});
 let prefix='__eyesLexicalBinding';while([...identifiers].some(name=>name.startsWith(prefix)))prefix+='_';
 bindings.forEach((binding,index)=>binding.scope.rename(binding.identifier.name,prefix+index));
 const compact=generate(tree,{comments:false,shouldPrintComment:()=>false,compact:true}).code;
 return crypto.createHash('sha256').update(compact).digest('hex');
}
module.exports={expandSource,bindingHash};
