/**
 * Split NASA's IcoMoon sprite into individual SVG files.
 *
 * The sprite is a single `<svg>` containing one nested `<svg id="icon-...">` per
 * icon (IcoMoon packs them with x/y offsets and a shared 720×399 viewBox). This
 * extracts each icon into its own standalone file so the interface can use the
 * *actual* NASA artwork rather than a substitute glyph.
 *
 * Usage: node tools/split-sprite.cjs <sprite.svg> <outDir>
 */
const fs = require('fs');
const path = require('path');

const [, , spritePath = 'data/mirror/apps/solar-system/assets/default/svg/sprite.svg', outDir = 'public/icons'] =
  process.argv;

const src = fs.readFileSync(spritePath, 'utf8');

// IcoMoon nests each icon as: <svg id="icon-x" width="W" height="H" viewBox="V" x="X" y="Y"> ... </svg>
const iconRe = /<svg id="(icon-[^"]+)"\s+width="([^"]+)"\s+height="([^"]+)"\s+viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/g;

fs.mkdirSync(outDir, { recursive: true });

let count = 0;
let m;
while ((m = iconRe.exec(src))) {
  const [, id, width, height, viewBox, body] = m;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="${viewBox}" fill="currentColor">${body.trim()}</svg>\n`;
  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg);
  count++;
}

console.log(`extracted ${count} icons into ${outDir}`);
