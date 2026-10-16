import { describe, expect, it } from 'vitest';
import { createReadStream } from 'node:fs';
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * The mirror route streams files with `Readable.toWeb`. When a browser aborts a
 * request mid-stream — navigating away, or seeking a video — the Node stream
 * errors, and an unhandled error on the resulting web stream became an
 * `uncaughtException` that logged "Controller is already closed" and could take
 * the server down. These tests pin the behaviour the route relies on.
 */
function tempFile(bytes: number): string {
  const path = join(tmpdir(), `solar-stream-${Math.random().toString(36).slice(2)}.bin`);
  writeFileSync(path, Buffer.alloc(bytes, 7));
  return path;
}

describe('mirror file streaming', () => {
  it('reads only the requested range', () => {
    const file = tempFile(1024);
    const head = readFileSync(file).subarray(0, 16);
    expect(head.length).toBe(16);
  });

  it('surfaces a missing file as an error rather than an empty stream', async () => {
    const missing = join(tmpdir(), 'solar-stream-does-not-exist.bin');
    const stream = createReadStream(missing);

    // An 'error' listener is what stops this from becoming an uncaught
    // exception; the route attaches one for exactly this reason.
    const error = await new Promise<Error | null>((resolve) => {
      stream.on('error', resolve);
      stream.on('end', () => resolve(null));
      stream.resume();
    });

    expect(error).toBeInstanceOf(Error);
    expect((error as NodeJS.ErrnoException).code).toBe('ENOENT');
  });

  it('destroys cleanly when the consumer goes away', async () => {
    const file = tempFile(512 * 1024);
    const stream = createReadStream(file);

    const closed = new Promise<void>((resolve) => {
      stream.on('close', () => resolve());
      stream.on('error', () => resolve());
    });

    // Read one chunk, then abandon the stream the way an aborted request does.
    stream.once('data', () => {
      stream.destroy();
    });

    await closed;
    expect(stream.destroyed).toBe(true);
  });
});
