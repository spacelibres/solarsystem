// Presentation-only exceptions authorized for spacelibre branding. Restore only
// these four object literals before comparing the original executable baseline.
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const rules = {
  'eyes/src/app/SolarSystemApp.js': [['prefix', 'Solar System', 'Eyes on the Solar System'], ['suffix', 'spacelibre', 'NASA/JPL']],
  'eyes/src/ui/components/Menu.js': [['brandingText', 'Solar System', 'EYES ON THE SOLAR SYSTEM']],
  'eyes/src/app/config/components.js': [['title', 'Solar System', 'Eyes on the Solar System']],
};
function originalBrandingContract(file, source) {
  if (!rules[file]) return source;
  const ast = parser.parse(source, { sourceType: 'module' });
  for (const [key, current, original] of rules[file]) {
    let matches = 0;
    traverse(ast, { ObjectProperty(path) {
      const node = path.node;
      if (node.key.type === 'Identifier' && node.key.name === key && node.value.type === 'StringLiteral' && node.value.value === current) {
        node.value.value = original;
        delete node.value.extra;
        matches++;
      }
    } });
    if (matches !== 1) throw Error(`Expected one approved branding override: ${file} ${key}; got ${matches}`);
  }
  return generate(ast).code;
}
module.exports = { originalBrandingContract };
