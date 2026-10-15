/**
 * Serves the local NASA asset mirror.
 *
 * Requests for `/nasa/static/...` and `/nasa/dynamic/...` are answered from
 * `data/mirror/`, so the browser never contacts NASA. Long-lived immutable
 * caching is safe because the mirror is a frozen snapshot.
 */

import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import type { ReadableStream as WebReadableStream } from 'node:stream/web';
import { Readable } from 'node:stream';

import { MIRROR_ROOT } from '../../../lib/nasa/mirror';

export const dynamic = 'force-dynamic';

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.bin': 'application/octet-stream',
  '.dyn': 'application/octet-stream',
  '.gltf': 'model/gltf+json',
  '.glb': 'model/gltf-binary',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function contentTypeFor(file: string): string {
  const dot = file.lastIndexOf('.');
  return (dot >= 0 && CONTENT_TYPES[file.slice(dot).toLowerCase()]) || 'application/octet-stream';
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const rel = segments.join('/');

  // Reject traversal outright rather than relying on normalisation alone.
  if (rel.includes('..')) {
    return new Response('bad path', { status: 400 });
  }

  const abs = normalize(join(MIRROR_ROOT, rel));
  if (!abs.startsWith(MIRROR_ROOT)) {
    return new Response('bad path', { status: 400 });
  }

  try {
    const info = await stat(abs);
    if (!info.isFile()) return new Response('not found', { status: 404 });

    const stream = Readable.toWeb(createReadStream(abs)) as WebReadableStream<Uint8Array>;
    return new Response(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': contentTypeFor(abs),
        'Content-Length': String(info.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('not found', { status: 404 });
  }
}
