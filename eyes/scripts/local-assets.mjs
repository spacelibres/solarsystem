import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const prefixes = [
  ['https://eyes.nasa.gov/assets/dynamic', '/nasa/live/dynamic'],
  ['https://eyes.nasa.gov/assets/', '/nasa/'],
  ['https://eyes.nasa.gov/apps/solar-system/', '/nasa/site/'],
  ['https://trek.nasa.gov/', '/nasa/external/trek.nasa.gov/'],
  ['https://gitc.earthdata.nasa.gov/', '/nasa/external/gitc.earthdata.nasa.gov/'],
  ['https://gibs.earthdata.nasa.gov/', '/nasa/external/gibs.earthdata.nasa.gov/'],
  ['https://epsg.io/', '/nasa/external/epsg.io/'],
];

/** Preserve source provenance while compiling resource references to this host. */
export function localizeAssetUrls(text) {
  for (const [remote, local] of prefixes) {
    text = text.replaceAll(remote, local).replaceAll(remote.replaceAll('/', '\\/'), local.replaceAll('/', '\\/'));
  }
  // Resource files embedded in downloaded descriptions can live on other hosts.
  // Navigation/citation pages are deliberately left as ordinary external links.
  text = text.replace(/https?:\/\/[^\s"'<>]+?\.(?:png|jpe?g|gif|webp|svg|gltf|glb|bin|woff2?|ttf|otf|mp4|webm|mp3|ogg|css|wasm|proj4)(?:\?[^\s"'<>)]*)?/gi, value => {
    const url = new URL(value);
    if (url.hostname === 'solarsystem.spacelibre.cn') return url.pathname + url.search;
    return '/nasa/external/' + url.hostname + url.pathname + url.search;
  });
  // This hidden iframe has no player control or visible use in the recovered
  // application. Even display:none causes YouTube/Google requests at startup.
  return text.replace(/<iframe\b[^>]*\bsrc=["']https:\/\/(?:www\.)?youtube\.com\/embed\/[^"']+["'][^>]*>[\s\S]*?<\/iframe>/gi, '');
}

export function localAssetsPlugin() {
  return { name: 'same-origin-resource-urls', setup(builder) {
    builder.onLoad({ filter: /\.(?:js|cjs|json|html)$/ }, async args => {
      if (args.path.includes(`${path.sep}node_modules${path.sep}`)) return;
      const source = await readFile(args.path, 'utf8');
      const contents = localizeAssetUrls(source);
      if (contents === source) return;
      const extension = path.extname(args.path);
      return { contents, loader: extension === '.html' ? 'text' : extension === '.json' ? 'json' : 'js', resolveDir: path.dirname(args.path) };
    });
  } };
}

export async function localizeShell(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) continue;
    if (!/\.(?:html|css)$/i.test(entry.name)) continue;
    const source = await readFile(file, 'utf8');
    await writeFile(file, localizeAssetUrls(source));
  }
}

export const eyesResourcePolicy = [
  "default-src 'self'", "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:",
  "font-src 'self' data:", "media-src 'self' data: blob:",
  "connect-src 'self' blob: data:", "worker-src 'self' blob:",
  "frame-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'",
].join('; ');
