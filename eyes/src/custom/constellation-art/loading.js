/** A batch transfers ownership only after all workers finish successfully. */
export async function loadArtworkBatch(items, load, dispose, signal, concurrency = 4) {
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error('Invalid artwork concurrency');
  const results = new Array(items.length);
  let cursor = 0, failure;
  const worker = async () => {
    while (!failure && !signal.aborted && cursor < items.length) {
      const index = cursor++;
      try { results[index] = await load(items[index], index); }
      catch (error) { failure ||= error; }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  if (failure || signal.aborted) {
    for (const resource of results) if (resource !== undefined) dispose(resource);
    throw failure || new DOMException('Artwork loading canceled', 'AbortError');
  }
  return results;
}
