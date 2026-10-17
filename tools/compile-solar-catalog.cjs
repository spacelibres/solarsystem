/* Static data compiler: recovered application code is parsed, never imported. */
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const ROOT = path.resolve(__dirname, '..');
function member(node) {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'MemberExpression' && !node.computed) return `${member(node.object)}.${member(node.property)}`;
  return '';
}
function compileCatalog(root = ROOT) {
  const entries = [], diagnostics = [];
  const metadataPath = path.join(root, 'eyes/src/data/EntityCatalog.json');
  const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf8')) : {};
  const directory = path.join(root, 'eyes/src/engine/core');
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.js')).sort()) {
    const source = fs.readFileSync(path.join(directory, filename), 'utf8');
    if (!source.includes('Entity.Entity.register(')) continue;
    const file = `eyes/src/engine/core/${filename}`;
    const ast = parser.parse(source, { sourceType: 'module' });
    const bindings = new Map();
    traverse(ast, { VariableDeclarator(p) {
      // Only module-scope immutable bindings are safe outside their execution scope.
      if (p.node.id.type === 'Identifier' && p.parentPath.node.kind === 'const' && p.parentPath.parentPath.isProgram()) {
        const binding = p.scope.getBinding(p.node.id.name);
        if (binding?.constant) bindings.set(p.node.id.name, p.node.init);
      }
    } });
    let localDiagnostics = [];
    const active = new Set();
    function unsupported(node, reason = 'non-static expression') {
      const result = { $unsupported: node.type, expression: source.slice(node.start, node.end), reason };
      localDiagnostics.push({ file, line: node.loc.start.line, column: node.loc.start.column + 1, reason, expression: result.expression });
      return result;
    }
    function evaluate(node) {
      if (!node) return { $undefined: true };
      if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return node.value;
      if (node.type === 'NullLiteral') return null;
      if (node.type === 'ArrayExpression') return node.elements.map(evaluate);
      if (node.type === 'ObjectExpression') {
        const result = {};
        for (const prop of node.properties) {
          if (prop.type !== 'ObjectProperty' || prop.computed) { result[`$unsupported_${prop.start}`] = unsupported(prop); continue; }
          result[prop.key.name ?? prop.key.value] = evaluate(prop.value);
        }
        return result;
      }
      const name = member(node);
      const constants = { 'Number.NEGATIVE_INFINITY': '-Infinity', 'Number.POSITIVE_INFINITY': 'Infinity', 'Math.PI': Math.PI, 'Pioneer.Vector3.Zero': [0,0,0], 'Pioneer.Vector3.One': [1,1,1], 'Pioneer.Vector3.XAxis': [1,0,0], 'Pioneer.Vector3.YAxis': [0,1,0], 'Pioneer.Vector3.ZAxis': [0,0,1], 'Pioneer.Vector3.XAxisNeg': [-1,0,0], 'Pioneer.Vector3.YAxisNeg': [0,-1,0], 'Pioneer.Vector3.ZAxisNeg': [0,0,-1], 'Pioneer.Quaternion.Identity': [1,0,0,0] };
      if (Object.hasOwn(constants, name)) return constants[name];
      if (node.type === 'Identifier') {
        if (name === 'undefined') return { $undefined: true };
        if (bindings.has(name) && !active.has(name)) { active.add(name); const result = evaluate(bindings.get(name)); active.delete(name); return result; }
      }
      if (node.type === 'UnaryExpression') {
        if (node.operator === 'void') return { $undefined: true };
        const value = evaluate(node.argument);
        if (typeof value === 'number' && ['+', '-'].includes(node.operator)) return node.operator === '-' ? -value : value;
      }
      if (node.type === 'BinaryExpression') {
        const left = evaluate(node.left), right = evaluate(node.right);
        if (typeof left === 'number' && typeof right === 'number') {
          const operations = { '+': () => left + right, '-': () => left - right, '*': () => left * right, '/': () => left / right, '**': () => left ** right, '%': () => left % right };
          if (operations[node.operator]) return operations[node.operator]();
        }
        if (node.operator === '+' && typeof left === 'string' && typeof right === 'string') return left + right;
      }
      if (node.type === 'CallExpression' && ['Math.sqrt', 'Math.sin', 'Math.cos', 'Math.abs', 'Math.pow'].includes(member(node.callee))) {
        const args = node.arguments.map(evaluate);
        if (args.every(value => typeof value === 'number')) return Math[member(node.callee).slice(5)](...args);
      }
      if (node.type === 'NewExpression' && ['Pioneer.Vector3', 'Pioneer.Quaternion'].includes(member(node.callee))) {
        const args = node.arguments.map(evaluate);
        if (args.every(value => typeof value === 'number')) return args.length ? args : member(node.callee).endsWith('Vector3') ? [0,0,0] : [1,0,0,0];
      }
      return unsupported(node, /Function|Method/.test(node.type) ? 'executable callback preserved; never executed' : 'non-static expression');
    }
    traverse(ast, { CallExpression(p) {
      if (member(p.node.callee) !== 'Entity.Entity.register') return;
      const object = p.node.arguments[0];
      if (object?.type !== 'ObjectExpression') { localDiagnostics = diagnostics; unsupported(object ?? p.node); return; }
      for (const prop of object.properties) {
        localDiagnostics = [];
        if (prop.type !== 'ObjectProperty') { diagnostics.push({ file, line: prop.loc.start.line, reason: 'non-static registration member' }); continue; }
        const id = prop.key.name ?? prop.key.value;
        const raw = evaluate(prop.value);
        const classification = metadata[id];
        entries.push({ id, ...raw, ...(typeof classification?.category === 'string' ? { sourceCategory: classification.category } : {}), ...(typeof classification?.subcategory === 'string' ? { sourceSubcategory: classification.subcategory } : {}), groups: raw.groups ?? [], parents: raw.parents ?? [], controllers: raw.controllers ?? [], raw, provenance: { file, line: prop.loc.start.line, column: prop.loc.start.column + 1 }, diagnostics: localDiagnostics });
      }
    } });
  }
  entries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const seen = new Set();
  for (const entry of entries) { if (seen.has(entry.id)) throw new Error(`Duplicate entity ${entry.id}`); seen.add(entry.id); }
  return { schemaVersion: 1, entries, diagnostics };
}
module.exports = { compileCatalog };
if (require.main === module) {
  const output = path.join(ROOT, 'src/solar/config/catalog.generated.json');
  const compiled = JSON.stringify(compileCatalog(), null, 2) + '\n';
  if (process.argv.includes('--check')) { if (fs.readFileSync(output, 'utf8') !== compiled) throw new Error('Catalog is stale; run node tools/compile-solar-catalog.cjs'); }
  else fs.writeFileSync(output, compiled);
}
