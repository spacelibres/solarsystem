// Index NASA Eyes's webpack bundle: list its classes and top-level symbols.
//
// The bundle is a single minified line, so reading it directly is impractical.
// This writes an index to tools/out/ that a human (or agent) can use to find the
// implementation of a given subsystem, then extract just that span.
//
// Usage:
//   node tools/study-bundle.cjs list                 # all classes + methods
//   node tools/study-bundle.cjs find <Name>          # show one class's source
//   node tools/study-bundle.cjs grep <pattern>       # regex search the bundle
const fs = require('fs');
const path = require('path');

const BUNDLE = path.join(__dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js');
const OUT = path.join(__dirname, 'out');

/** Read the bundle, or explain how to get it. */
function readBundle() {
  if (!fs.existsSync(BUNDLE)) {
    console.error(`Bundle not found at ${BUNDLE}`);
    console.error('Fetch it from the live app, e.g.:');
    console.error('  curl -s https://eyes.nasa.gov/apps/solar-system/_next/static/chunks/pages/_app-*.js -o ' + BUNDLE);
    process.exit(1);
  }
  return fs.readFileSync(BUNDLE, 'utf8');
}

/** Every `class Name extends Base {` with its byte offset. */
function findClasses(src) {
  const re = /class\s+([A-Za-z_$][\w$]*)\s*(?:extends\s+([A-Za-z_$][\w$.]*))?\s*\{/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ name: m[1], base: m[2] || '', at: m.index });
  return out;
}

/** Method names declared inside a class body, by brace matching. */
function methodsIn(src, startAt) {
  const bodyStart = src.indexOf('{', startAt);
  let depth = 0;
  let end = bodyStart;
  for (let i = bodyStart; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  const body = src.slice(bodyStart, end + 1);
  const names = [];
  const re = /(?:^|[,;}])\s*(?:static\s+)?(?:async\s+)?(?:get\s+|set\s+)?([A-Za-z_$][\w$]*)\s*\(/g;
  let m;
  while ((m = re.exec(body))) names.push(m[1]);
  // `name = value` class fields are useful to spot too.
  const fields = [];
  const fre = /(?:^|[,;}])\s*(?:static\s+)?([A-Za-z_$][\w$]*)\s*=/g;
  while ((m = fre.exec(body))) fields.push(m[1]);
  return { start: bodyStart, end, length: end - bodyStart, methods: names, fields };
}

const [, , cmd, arg] = process.argv;
const src = readBundle();
const classes = findClasses(src);

if (cmd === 'list') {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = classes.map((c) => {
    const info = methodsIn(src, c.at);
    return {
      name: c.name,
      base: c.base,
      bytes: info.length,
      at: c.at,
      methods: info.methods,
      fields: info.fields,
    };
  });
  fs.writeFileSync(path.join(OUT, 'bundle-classes.json'), JSON.stringify(rows, null, 2));
  for (const r of rows.sort((a, b) => b.bytes - a.bytes)) {
    console.log(`${String(r.bytes).padStart(7)}  ${r.name}${r.base ? ' <- ' + r.base : ''}`);
    if (r.methods.length) console.log('           ' + r.methods.join(' '));
  }
  console.log(`\n${rows.length} classes -> tools/out/bundle-classes.json`);
} else if (cmd === 'find') {
  const c = classes.find((x) => x.name === arg);
  if (!c) {
    console.error(`No class named ${arg}. Close matches:`);
    for (const x of classes.filter((y) => y.name.toLowerCase().includes(String(arg).toLowerCase()))) {
      console.error('  ' + x.name);
    }
    process.exit(1);
  }
  const info = methodsIn(src, c.at);
  console.log(src.slice(c.at, info.end + 1));
} else if (cmd === 'grep') {
  const re = new RegExp(arg, 'g');
  let m;
  let n = 0;
  while ((m = re.exec(src))) {
    n++;
    const from = Math.max(0, m.index - 120);
    console.log(`--- @${m.index} ---`);
    console.log(src.slice(from, m.index + 200).replace(/\n/g, ' '));
    if (n > 40) { console.log('... (truncated)'); break; }
  }
  console.log(`${n} matches`);
} else {
  console.log('usage: study-bundle.cjs list | find <Class> | grep <regex>');
}
