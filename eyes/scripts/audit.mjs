import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
const project = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(path.join(project, 'provenance.json'), 'utf8'));
const files = manifest.modules.map(module => module.file);
if (new Set(files.map(file => file.toLowerCase())).size !== files.length) throw new Error('Source path collision');
let importCount = 0;
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
for (const file of [...files, 'main.js', 'runtime/interop.cjs']) {
  const absolute = path.join(project, 'src', file);
  const source = await readFile(absolute, 'utf8');
  if (file.endsWith('.json')) { JSON.parse(source); continue; }
  if (file.endsWith('.html')) continue;
  const ast = parse(source, { sourceType: file.endsWith('.cjs') ? 'script' : 'module' });
  const references = [];
  walk(ast.program, node => {
    if (node.type === 'Identifier' && ['requireModule', 'moduleExports'].includes(node.name)) throw new Error(`${file}: unresolved factory binding ${node.name}`);
    if (node.type === 'Identifier' && node.name.startsWith('webpackChunk')) throw new Error(`${file}: webpack runtime reference`);
    if (['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type) && node.source) references.push(node.source.value);
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'require') {
      if (node.arguments[0]?.type !== 'StringLiteral') throw new Error(`${file}: non-static require`);
      references.push(node.arguments[0].value);
    }
  });
  for (const reference of references) {
    if (!reference.startsWith('.')) throw new Error(`${file}: undeclared dependency ${reference}`);
    const target = path.resolve(path.dirname(absolute), reference);
    await access(target);
    const siblings = await readdir(path.dirname(target));
    if (!siblings.includes(path.basename(target))) throw new Error(`${file}: incorrect import case ${reference}`);
    importCount++;
  }
}
console.log(`Native source audit: ${files.length} modules, ${importCount} resolved source imports; no webpack factories or numeric require calls.`);
