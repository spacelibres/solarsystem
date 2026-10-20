import { describe, expect, it } from 'vitest';
import { loadArtworkBatch } from '../eyes/src/custom/constellation-art/loading.js';

describe('constellation artwork resource ownership', () => {
  it('bounds concurrent work and preserves catalogue ordering', async () => {
    let active = 0, peak = 0;
    const result = await loadArtworkBatch([3, 1, 2, 4, 5], async value => {
      peak = Math.max(peak, ++active);
      await new Promise(resolve => setTimeout(resolve, value));
      active--;
      return value * 2;
    }, () => {}, new AbortController().signal, 2);
    expect(peak).toBe(2);
    expect(result).toEqual([6, 2, 4, 8, 10]);
  });
  it('waits for pending work and disposes every completed resource after failure', async () => {
    const disposed: number[] = [];
    await expect(loadArtworkBatch([1, 2, 3], async value => {
      if (value === 2) throw new Error('texture failed');
      await new Promise(resolve => setTimeout(resolve, 5));
      return value;
    }, value => disposed.push(value), new AbortController().signal, 2)).rejects.toThrow('texture failed');
    expect(disposed).toEqual([1]);
  });
  it('disposes a late resource when the layer is destroyed and permits a fresh retry', async () => {
    const controller = new AbortController(), disposed: number[] = [];
    const loading = loadArtworkBatch([1, 2], async value => {
      controller.abort();
      return value;
    }, value => disposed.push(value), controller.signal, 1);
    await expect(loading).rejects.toThrow();
    expect(disposed).toEqual([1]);
    expect(await loadArtworkBatch([3], async value => value, () => {}, new AbortController().signal, 1)).toEqual([3]);
  });
});
