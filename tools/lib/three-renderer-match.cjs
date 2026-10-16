const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const crypto = require('node:crypto');

// Unlike a text/name scrubber, resolve references before modifying identifiers.
// Imports, public exports, property keys and every executable AST operation stay
// in the digest. No expression expansion or optimizer equivalence is assumed.
function canonicalRenderer(source, { includeCode = false } = {}) {
  const tree = parser.parse(source, { sourceType: 'module' });
  const bindings = [], seen = new Set(), names = new Set();
  traverse(tree, {
    Scope(path) {
      for (const binding of Object.values(path.scope.bindings)) {
        if (!seen.has(binding)) { seen.add(binding); bindings.push(binding); }
      }
    },
    Identifier(path) { names.add(path.node.name); },
    ObjectProperty(path) {
      if (path.node.shorthand) throw new Error('Expand shorthand before this restricted lexical proof');
    },
  });
  let prefix = '__rendererBinding';
  while ([...names].some(name => name.startsWith(prefix))) prefix += '_';
  const labels = new Map(bindings.map((binding, index) => [binding, prefix + index]));
  // Function declarations belong to their parent scope, even when a nested
  // declaration happens to reuse their spelling. Use binding identity here.
  const changes = new Map(bindings.map(binding => [binding.identifier, labels.get(binding)]));
  traverse(tree, { Identifier(path) {
    if (changes.has(path.node) && path.isBindingIdentifier()) return;
    const parent = path.parentPath;
    if (parent.isExportSpecifier() && path.key === 'exported') return;
    if (parent.isImportSpecifier() && path.key === 'imported') return;
    if ((parent.isObjectProperty() || parent.isObjectMethod() || parent.isClassMethod() || parent.isClassProperty()) && path.key === 'key' && !parent.node.computed) return;
    if ((parent.isMemberExpression() || parent.isOptionalMemberExpression()) && path.key === 'property' && !parent.node.computed) return;
    if (parent.isMetaProperty() || parent.isPrivateName() || parent.isLabeledStatement() && path.key === 'label' || (parent.isBreakStatement() || parent.isContinueStatement()) && path.key === 'label') return;
    if (!(path.isBindingIdentifier() || path.isReferencedIdentifier())) return;
    const binding = path.scope.getBinding(path.node.name);
    if (labels.has(binding)) changes.set(path.node, labels.get(binding));
  }});
  for (const binding of bindings) {
    if (changes.get(binding.identifier) !== labels.get(binding) || binding.referencePaths.some(path => changes.get(path.node) !== labels.get(binding))) throw new Error('Incomplete lexical coverage');
  }
  let writes = 0;
  traverse(tree, { 'AssignmentExpression|UpdateExpression'(path) {
    const target = path.isAssignmentExpression() ? path.node.left : path.node.argument;
    for (const identifier of Object.values(types.getBindingIdentifiers(target))) {
      if (labels.has(path.scope.getBinding(identifier.name))) {
        writes++;
        if (changes.get(identifier) !== labels.get(path.scope.getBinding(identifier.name))) throw new Error('Incomplete write coverage');
      }
    }
  }});
  for (const [identifier, name] of changes) identifier.name = name;
  const code = generate(tree, { comments: false, compact: true, shouldPrintComment: () => false }).code;
  return { hash: crypto.createHash('sha256').update(code).digest('hex'), bindings: bindings.length, references: bindings.reduce((sum, binding) => sum + binding.referencePaths.length, 0), writes, ...(includeCode ? { code } : {}) };
}

function rendererCorrespondence(candidateSource, officialMinifiedSource) {
  const candidate = parser.parse(candidateSource, { sourceType: 'module' });
  const official = parser.parse(officialMinifiedSource, { sourceType: 'module' });
  const replacements = new Map();
  traverse(official, { Program(path) {
    for (const statement of path.get('body')) {
      if (!statement.isImportDeclaration()) continue;
      if (statement.node.source.value !== './three.core.min.js') throw new Error('Unexpected upstream renderer import');
      for (const specifier of statement.get('specifiers')) {
        if (!specifier.isImportSpecifier()) throw new Error('Expected named upstream core imports');
        for (const reference of path.scope.getBinding(specifier.node.local.name).referencePaths) {
          if (!reference.parentPath.isExportSpecifier()) replacements.set(reference, types.memberExpression(types.identifier('ThreeCore'), types.identifier(specifier.node.imported.name)));
        }
      }
    }
    path.stop();
  }});
  for (const [path, expression] of replacements) {
    // Webpack's namespace rewrite explicitly preserves unbound function calls.
    path.replaceWith(path.parentPath.isCallExpression() && path.key === 'callee' ? types.sequenceExpression([types.numericLiteral(0), expression]) : expression);
  }
  const declarations = tree => tree.program.body.filter(node => types.isFunctionDeclaration(node) || types.isClassDeclaration(node));
  const variables = tree => tree.program.body.filter(node => types.isVariableDeclaration(node)).flatMap(node => node.declarations);
  const leftDeclarations = declarations(candidate), rightDeclarations = declarations(official);
  const leftVariables = variables(candidate), rightVariables = variables(official);
  if (leftDeclarations.length !== rightDeclarations.length || leftVariables.length !== rightVariables.length) throw new Error('Upstream declaration layout differs');
  const exportBindings = new Map([...leftDeclarations.map((node, index) => [node.id.name, rightDeclarations[index].id.name]), ...leftVariables.map((node, index) => [node.id.name, rightVariables[index].id.name])]);
  const exports = candidate.program.body.filter(node => types.isExportDeclaration(node)).map(node => types.cloneNode(node, true));
  for (const declaration of exports) if (types.isExportNamedDeclaration(declaration) && !declaration.source) {
    for (const specifier of declaration.specifiers) specifier.local.name = exportBindings.get(specifier.local.name);
  }
  // Export layouts belong to the recovery wrapper, so this source comparison
  // only compares declarations; the separate original/candidate digest pins APIs.
  official.program.body = [types.importDeclaration([types.importNamespaceSpecifier(types.identifier('ThreeCore'))], types.stringLiteral('./core.js')), ...official.program.body.filter(node => !types.isImportDeclaration(node) && !types.isExportDeclaration(node)), ...exports];
  const officialCanonical = canonicalRenderer(generate(official).code, { includeCode: true });
  const candidateCanonical = canonicalRenderer(candidateSource, { includeCode: true });
  const parseCanonical = source => declarations(parser.parse(source, { sourceType: 'module' }));
  const left = parseCanonical(candidateCanonical.code), right = parseCanonical(officialCanonical.code);
  const leftProgram = parser.parse(candidateCanonical.code, { sourceType: 'module' });
  const rightProgram = parser.parse(officialCanonical.code, { sourceType: 'module' });
  const leftInitializers = variables(leftProgram), rightInitializers = variables(rightProgram);
  const hash = node => crypto.createHash('sha256').update(generate(node, { compact: true, comments: false }).code).digest('hex');
  return {
    normalizedOfficialHash: officialCanonical.hash,
    declarations: leftDeclarations.map((node, index) => ({ name: node.id.name, candidateHash: hash(left[index]), officialHash: hash(right[index]), equal: hash(left[index]) === hash(right[index]), methods: types.isClassDeclaration(node) ? node.body.body.map(method => method.key.name) : [] })),
    variables: leftVariables.map((node, index) => ({ name: node.id.name, equal: hash(leftInitializers[index].init) === hash(rightInitializers[index].init) })),
  };
}

module.exports = { canonicalRenderer, rendererCorrespondence };
