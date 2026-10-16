import { ensureDecoderCache } from './decoder-cache.mjs';
import { build, context } from 'esbuild';
import { mkdir, cp } from 'node:fs/promises';
import { watch as watchDirectory } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const project = fileURLToPath(new URL('../', import.meta.url));
export async function buildEyes({ watch = false, publish = false } = {}) {
  const cache = await ensureDecoderCache();
  const dist = path.join(project, 'dist');
  await mkdir(dist, { recursive: true });
  const copyShell = async () => cp(path.join(project, 'shell'), dist, { recursive: true });
  const publishOutput = async () => {
    await copyShell();
    await cp(cache.root, path.join(dist, 'decoders', cache.revision), { recursive: true });
    if (publish) await cp(dist, path.resolve(project, '../public/eyes'), { recursive: true });
  };
  const options = {
    absWorkingDir: project,
    entryPoints: ['src/main.js'],
    outfile: 'dist/application.js',
    bundle: true,
    format: 'iife',
    sourcemap: true,
    keepNames: true,
    target: 'es2020',
    loader: { '.html': 'text' },
    plugins: [{ name: 'application-shell', setup(builder) {
      builder.onEnd(async result => { if (!result.errors.length) await publishOutput(); });
    } }],
  };
  if (!watch) { await build(options); console.log('Built NASA Eyes from editable source modules.'); return; }
  const builder = await context(options);
  await builder.rebuild();
  await builder.watch();
  let timer;
  const shellWatcher = watchDirectory(path.join(project, 'shell'), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => { publishOutput().catch(console.error); }, 100);
  });
  return { async dispose() { clearTimeout(timer); shellWatcher.close(); await builder.dispose(); } };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildEyes({ publish: process.argv.includes('--publish'), watch: process.argv.includes('--watch') });
}
