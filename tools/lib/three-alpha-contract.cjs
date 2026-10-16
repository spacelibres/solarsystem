const parser=require('@babel/parser');
const traverse=require('@babel/traverse').default;
const generate=require('@babel/generator').default;
const types=require('@babel/types');
const crypto=require('node:crypto');

// This verifier is deliberately restricted to the standalone recovered Three
// core module. It is not a replacement for semantic-source's general helper.
function validateSubset(tree){
 traverse(tree,{enter(path){
  const node=path.node;
  if(node.type.startsWith('JSX'))throw new Error('Three alpha subset rejects JSX');
  if(types.isImportDeclaration(node)||types.isImportExpression(node)||node.type==='Import'||types.isMetaProperty(node)&&node.meta.name==='import')throw new Error('Three alpha subset rejects imports');
  if(types.isExportDefaultDeclaration(node)||types.isExportAllDeclaration(node))throw new Error('Three alpha subset rejects default/star exports');
  if(types.isExportNamedDeclaration(node)&&(node.declaration||node.source||node.specifiers.some(specifier=>!types.isExportSpecifier(specifier))))throw new Error('Three alpha subset requires independent local export specifiers');
  if(types.isObjectProperty(node)&&node.shorthand)throw new Error('Three alpha subset rejects shorthand properties/patterns');
 }});
}
const statement=value=>types.expressionStatement(types.isStringLiteral(value)?types.unaryExpression('void',value):value);
function expandStatements(tree){
 traverse(tree,{
  ExpressionStatement:{exit(path){const expression=path.node.expression;
   if(types.isSequenceExpression(expression))path.replaceWithMultiple(expression.expressions.map(statement));
   else if(types.isConditionalExpression(expression))path.replaceWith(types.ifStatement(expression.test,types.blockStatement([statement(expression.consequent)]),types.blockStatement([statement(expression.alternate)])));
   else if(types.isLogicalExpression(expression)&&['&&','||'].includes(expression.operator))path.replaceWith(types.ifStatement(expression.operator==='&&'?expression.left:types.unaryExpression('!',expression.left),types.blockStatement([statement(expression.right)])));
  }},
  IfStatement:{exit(path){if(!types.isSequenceExpression(path.node.test))return;const expressions=path.node.test.expressions;path.node.test=expressions.at(-1);path.replaceWithMultiple([...expressions.slice(0,-1).map(statement),path.node]);}},
  ReturnStatement:{exit(path){if(!types.isSequenceExpression(path.node.argument))return;const expressions=path.node.argument.expressions;path.replaceWithMultiple([...expressions.slice(0,-1).map(statement),types.returnStatement(expressions.at(-1))]);}}
 });
 return tree;
}
function canonicalThreeSource(source){
 const tree=parser.parse(source,{sourceType:'module',plugins:['jsx']});
 validateSubset(tree);
 expandStatements(tree);
 const bindings=[],seen=new Set(),identifiers=new Set();
 traverse(tree,{Scope(path){for(const binding of Object.values(path.scope.bindings))if(!seen.has(binding)){seen.add(binding);bindings.push(binding);}},Identifier(path){identifiers.add(path.node.name);}});
 let prefix='__eyesLexicalBinding';while([...identifiers].some(name=>name.startsWith(prefix)))prefix+='_';
 const labels=new Map(bindings.map((binding,index)=>[binding,prefix+index])),changes=new Map();
 // Declaration identifiers belong to their collected Binding, not necessarily
 // the scope visible at the declaration path (a nested same-name function can
 // shadow that name inside the outer function's body).
 for(const binding of bindings)changes.set(binding.identifier,labels.get(binding));
 // Resolve every reference against the original scope graph before changing any
 // identifier, so nested shadows and writes cannot bind to an earlier rename.
 traverse(tree,{Identifier(path){
  if(changes.has(path.node))return;
  const parent=path.parentPath;
  if(parent.isExportSpecifier()&&path.key==='exported')return;
  if((parent.isObjectProperty()||parent.isObjectMethod()||parent.isClassMethod()||parent.isClassProperty())&&path.key==='key'&&!parent.node.computed)return;
  if((parent.isMemberExpression()||parent.isOptionalMemberExpression())&&path.key==='property'&&!parent.node.computed)return;
  if(parent.isMetaProperty()||parent.isPrivateName()||parent.isLabeledStatement()&&path.key==='label'||(parent.isBreakStatement()||parent.isContinueStatement())&&path.key==='label')return;
  if(!(path.isBindingIdentifier()||path.isReferencedIdentifier()))return;
  const binding=path.scope.getBinding(path.node.name);
  if(labels.has(binding))changes.set(path.node,labels.get(binding));
 }});
 let missedDeclarations=0,missedReferences=0,assignmentsAndUpdates=0,missedAssignmentTargets=0;
 const publicExportNames=[];
 for(const binding of bindings){if(changes.get(binding.identifier)!==labels.get(binding))missedDeclarations++;for(const reference of binding.referencePaths)if(changes.get(reference.node)!==labels.get(binding))missedReferences++;}
 traverse(tree,{
  ExportSpecifier(path){publicExportNames.push(path.node.exported.name);},
  'AssignmentExpression|UpdateExpression'(path){const target=path.isAssignmentExpression()?path.node.left:path.node.argument;const targets=types.getBindingIdentifiers(target);let localWrite=false;for(const identifier of Object.values(targets)){if(!labels.has(path.scope.getBinding(identifier.name)))continue;localWrite=true;if(!changes.has(identifier))missedAssignmentTargets++;}if(localWrite)assignmentsAndUpdates++;}
 });
 if(missedDeclarations||missedReferences||missedAssignmentTargets)throw new Error('Three alpha reference coverage incomplete');
 const analysis={bindingCount:bindings.length,referenceCount:bindings.reduce((sum,binding)=>sum+binding.referencePaths.length,0),selectedIdentifiers:changes.size,assignmentsAndUpdates,missedDeclarations,missedReferences,missedAssignmentTargets,publicExportNames:publicExportNames.sort()};
 for(const [identifier,name]of changes)identifier.name=name;
 return {code:generate(tree,{comments:false,compact:true,shouldPrintComment:()=>false}).code,analysis};
}
function threeAlphaHash(source){return crypto.createHash('sha256').update(canonicalThreeSource(source).code).digest('hex');}
function compareThreeAlpha(original,candidate){const left=canonicalThreeSource(original),right=canonicalThreeSource(candidate),originalHash=crypto.createHash('sha256').update(left.code).digest('hex'),candidateHash=crypto.createHash('sha256').update(right.code).digest('hex');return {originalHash,candidateHash,equal:originalHash===candidateHash,originalAnalysis:left.analysis,candidateAnalysis:right.analysis};}
module.exports={canonicalThreeSource,threeAlphaHash,compareThreeAlpha};
