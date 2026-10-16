/** @eyes-analysis
 * 文件职责：按清单验证本地解码器的大小、摘要和 WASM 头，缺失时下载并原子写入
 * 依据：当前源码声明、导入关系及工程调用链
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const project = fileURLToPath(new URL('../', import.meta.url));
function validate(bytes, resource) {
  const digest = createHash('sha256').update(bytes).digest('hex');
  if (digest !== resource.sha256 || bytes.length !== resource.bytes) throw new Error(`Decoder SHA-256 integrity mismatch: ${resource.file}`);
  if (resource.file.endsWith('.wasm') && !WebAssembly.validate(bytes)) throw new Error(`Invalid WASM module: ${resource.file}`);
}
export async function ensureDecoderCache({ root = path.join(project, '.cache/decoders'), resources, fetcher = fetch } = {}) {
  const manifest = resources ? null : JSON.parse(await readFile(path.join(project, 'decoders/manifest.json'), 'utf8'));
  resources ||= manifest.resources;
  let downloaded = 0;
  for (const resource of resources) {
    const target = path.resolve(root, resource.file);
    if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error('Decoder cache path escapes its root');
    try { validate(await readFile(target), resource); continue; } catch (error) {
      if (error.code !== 'ENOENT' && !error.message.includes('integrity mismatch') && !error.message.includes('Invalid WASM')) throw error;
    }
    const response = await fetcher(resource.url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Decoder download failed (${response.status}): ${resource.url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    validate(bytes, resource);
    await mkdir(path.dirname(target), { recursive: true });
    const temporary = target + '.' + randomUUID() + '.tmp';
    try { await writeFile(temporary, bytes); await rename(temporary, target); }
    finally { await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
    downloaded++;
  }
  return { root, downloaded, reused: resources.length - downloaded, revision: manifest?.revision };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await ensureDecoderCache();
  console.log(`Decoder cache: ${result.reused} reused, ${result.downloaded} downloaded.`);
}
