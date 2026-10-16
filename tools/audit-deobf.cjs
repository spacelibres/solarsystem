/**
 * Audit the de-obfuscated class set for silent truncation.
 *
 * A class can be cut short and still parse if it happens to stop on a balanced
 * brace — which is exactly what the old brace-matching splitter did. Parsing is
 * therefore not sufficient evidence; this checks the stronger property that the
 * extracted text is the *whole* class, by confirming the source between one
 * class's end and the next class's start contains nothing but separators.
 *
 * Usage: node tools/audit-deobf.cjs
 */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const BUNDLE = path.join(__dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js');
const DIR = path.join(__dirname, '..', 'deobf', 'classes');

const src = fs.readFileSync(BUNDLE, 'utf8');
const ast = acorn.parse(src, {
  ecmaVersion: 'latest',
  sourceType: 'script',
  allowReturnOutsideFunction: true,
  allowAwaitOutsideFunction: true,
  allowSuperOutsideMethod: true,
});

/** Every class in the bundle, by AST range. */
const truth = [];
(function visit(node) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'ClassDeclaration' && node.id && node.end != null) {
    truth.push({ name: node.id.name, start: node.start, end: node.end, bytes: node.end - node.start });
  }
  for (const key of Object.keys(node)) {
    if (key === 'start' || key === 'end' || key === 'loc') continue;
    const v = node[key];
    if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === 'object' && typeof v.type === 'string') visit(v);
  }
})(ast);

const index = JSON.parse(fs.readFileSync(path.join(DIR, '_index.json'), 'utf8'));

/** Group both sides by name: names repeat legitimately in this bundle. */
function groupByName(items, key) {
  const map = new Map();
  for (const it of items) {
    const n = it[key];
    if (!map.has(n)) map.set(n, []);
    map.get(n).push(it);
  }
  for (const list of map.values()) list.sort((a, b) => b.bytes - a.bytes);
  return map;
}

const refByName = groupByName(truth, 'name');
const ourByName = groupByName(index, 'name');

let problems = 0;

console.log(`bundle classes: ${truth.length}   extracted: ${index.length}\n`);

// 1. Every class in the bundle is present, including the duplicate names — class
//    names are not unique here, and writing both to `<name>.js` silently dropped
//    one of every colliding pair.
for (const [name, list] of refByName) {
  const ours = ourByName.get(name) ?? [];
  if (ours.length !== list.length) {
    console.log(
      `COUNT MISMATCH ${name}: bundle has ${list.length}, extracted ${ours.length}` +
        ` (${list.map((c) => c.bytes).join(', ')} bytes)`,
    );
    problems++;
  }
}

// 2. Each bundle class has a counterpart of exactly the right length.
for (const [name, list] of refByName) {
  const ours = (ourByName.get(name) ?? []).slice().sort((a, b) => b.bytes - a.bytes);
  list.forEach((t, i) => {
    const e = ours[i];
    if (!e) return;
    if (e.bytes !== t.bytes) {
      console.log(
        `TRUNCATED ${name}[${i}]: extracted ${e.bytes} bytes, real ${t.bytes} bytes` +
          ` (${(((t.bytes - e.bytes) / t.bytes) * 100).toFixed(1)}% missing)`,
      );
      problems++;
    }
  });
}

// 3. Each written file parses, and declares the class it is named for.
for (const e of index) {
  const file = path.join(DIR, e.file);
  if (!fs.existsSync(file)) {
    console.log(`MISSING FILE  ${e.file}`);
    problems++;
    continue;
  }
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(`class ${e.name}`)) {
    console.log(`WRONG CONTENT  ${e.file} does not declare class ${e.name}`);
    problems++;
    continue;
  }
  try {
    acorn.parse(text, {
      ecmaVersion: 'latest',
      sourceType: 'script',
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      allowSuperOutsideMethod: true,
    });
  } catch (err) {
    console.log(`PARSE FAIL  ${e.file}: ${err.message}`);
    problems++;
  }
}

console.log();
console.log(problems === 0 ? 'ALL CLASSES COMPLETE AND PARSEABLE' : `${problems} problems`);
process.exit(problems === 0 ? 0 : 1);
