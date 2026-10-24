/** Local runtime assets only: missing files never trigger an upstream request. */
import { createReadStream } from 'node:fs';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, relative, isAbsolute } from 'node:path';
import { Readable } from 'node:stream';
import { localizeAssetUrls } from '../../../../eyes/scripts/local-assets.mjs';
import { MIRROR_ROOT, mirrorPath } from '../../../lib/nasa/mirror';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.proj4': 'text/plain; charset=utf-8',
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm', '.gltf': 'model/gltf+json', '.glb': 'model/gltf-binary',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.ktx': 'image/ktx', '.ktx2': 'image/ktx2',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
};
type Context = { params: Promise<{ path: string[] }> };

async function serve(request: Request, context: Context, head: boolean): Promise<Response> {
  const { path: segments } = await context.params;
  let abs: string;
  try {
    // Next decodes route parameters once; reject residual escapes as well as
    // separators so double encoding cannot turn into traversal on Windows.
    if (!segments.length || segments.some(segment => !segment || /[%\\/:\0]/.test(segment))) throw new Error('bad path');
    abs = mirrorPath(segments.join('/'));
  } catch { return new Response(head ? null : 'bad path', { status: 400 }); }

  try {
    const [root, file] = await Promise.all([realpath(MIRROR_ROOT), realpath(abs)]);
    const rel = relative(root, file);
    if (rel === '..' || rel.startsWith('..\\') || rel.startsWith('../') || isAbsolute(rel)) {
      return new Response(head ? null : 'bad path', { status: 400 });
    }
    const info = await stat(file);
    if (!info.isFile()) return new Response(head ? null : 'not found', { status: 404 });
    const extension = extname(file).toLowerCase();
    // Metadata retains its original bytes on disk for reproducible provisioning.
    const transformed = ['.json', '.gltf', '.xml', '.html', '.css', '.svg', '.proj4'].includes(extension)
      ? Buffer.from(localizeAssetUrls(await readFile(file, { encoding: 'utf8', signal: request.signal })))
      : undefined;
    const size = transformed?.length ?? info.size;
    const headers = new Headers({
      'Content-Type': CONTENT_TYPES[extension] ?? 'application/octet-stream',
      'Content-Length': String(size), 'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    });
    let start = 0;
    let end = size - 1;
    const range = request.headers.get('range');
    if (range !== null) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      let valid = Boolean(match && (match[1] || match[2]) && size > 0);
      if (match) {
        const first = match[1] ? Number(match[1]) : undefined;
        const last = match[2] ? Number(match[2]) : undefined;
        if ((first !== undefined && !Number.isSafeInteger(first)) || (last !== undefined && !Number.isSafeInteger(last))) valid = false;
        if (first === undefined) {
          start = Math.max(0, size - (last ?? 0));
          if (!last) valid = false;
        } else {
          start = first;
          end = Math.min(last ?? end, end);
        }
        if (start > end || start >= size) valid = false;
      }
      if (!valid) {
        headers.set('Content-Range', `bytes */${size}`);
        headers.set('Content-Length', '0');
        return new Response(null, { status: 416, headers });
      }
      headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
      headers.set('Content-Length', String(end - start + 1));
    }
    const status = range === null ? 200 : 206;
    if (head || size === 0) return new Response(null, { status, headers });
    if (transformed) return new Response(transformed.subarray(start, end + 1), { status, headers });
    const nodeStream = createReadStream(file, { start, end });
    const abort = () => nodeStream.destroy();
    request.signal.addEventListener('abort', abort, { once: true });
    nodeStream.once('close', () => request.signal.removeEventListener('abort', abort));
    const stream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;
    if (request.signal.aborted) abort();
    return new Response(stream, { status, headers });
  } catch { return new Response(head ? null : 'not found', { status: 404 }); }
}

export async function GET(request: Request, context: Context) { return serve(request, context, false); }
export async function HEAD(request: Request, context: Context) { return serve(request, context, true); }
