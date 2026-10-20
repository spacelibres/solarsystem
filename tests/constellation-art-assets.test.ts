import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { createRegistration } from '../eyes/src/custom/constellation-art/registration.js';
const root = new URL('../eyes/shell/constellation-art/', import.meta.url);
const catalogue = () => JSON.parse(readFileSync(new URL('index.json', root), 'utf8'));
describe('original constellation vector artwork', () => {
  it('covers the 88 IAU names with registered, editable vector figures', () => {
    const data = catalogue();
    expect(data.schemaVersion).toBe(1);
    expect(data.frame).toBe('ICRS/J2000');
    expect(data.artworks).toHaveLength(85);
    expect(new Set(data.artworks.flatMap((art: { covers: string[] }) => art.covers)).size).toBe(88);
    const drawings = new Set<string>();
    for (const art of data.artworks) {
      expect(art.renderMode).toBe('vector');
      expect([art.width, art.height]).toEqual([512, 512]);
      expect(art.anchors).toHaveLength(3);
      for (const anchor of art.anchors) {
        expect(Math.hypot(...anchor.direction)).toBeCloseTo(1, 10);
        for (const coordinate of anchor.pixel) {
          expect(coordinate).toBeGreaterThanOrEqual(0);
          expect(coordinate).toBeLessThanOrEqual(512);
        }
        expect(anchor.hip).toBeGreaterThan(0);
      }
      const svg = readFileSync(new URL(art.file, root), 'utf8');
      expect(svg, art.file).toContain('data-origin="spacelibre-original"');
      expect(svg).toContain('viewBox="0 0 512 512"');
      expect(svg).toContain('fill="none"');
      expect(svg).toMatch(/stroke=["']#ffffff["']/i);
      expect(svg).not.toMatch(/<image|data:image|<rect\b|<script|<filter|<text\b|<use\b/i);
      const paths = [...svg.matchAll(/<path\b[^>]*\bd=["']([^"']+)["']/g)].map(match => match[1]);
      expect(paths.length, art.file).toBeGreaterThanOrEqual(4);
      drawings.add(paths.join('|'));
    }
    expect(drawings.size).toBe(85);
    expect(readdirSync(root).filter(file => file.endsWith('.svg'))).toHaveLength(85);
  });
  it('preserves every stellar direction and keeps the drawing patch on its intended hemisphere', () => {
    const source = JSON.parse(readFileSync(new URL('../tools/constellation-art/registration-source.json', import.meta.url), 'utf8'));
    for (const art of catalogue().artworks) {
      const previous = source.catalogue.artworks.find((item: { id: string }) => item.id === art.id);
      const sample = createRegistration(art.anchors);
      const sum = [0, 1, 2].map(index => art.anchors.reduce((value: number, anchor: { direction: number[] }) => value + anchor.direction[index], 0));
      const center = sum.map(value => value / Math.hypot(...sum));
      art.anchors.forEach((anchor: { pixel: [number, number]; direction: number[]; hip: number }, index: number) => {
        expect(anchor.direction).toEqual(previous.anchors[index].direction);
        expect(anchor.hip).toBe(previous.anchors[index].hip);
        sample(...anchor.pixel).forEach((value: number, axis: number) => expect(value).toBeCloseTo(anchor.direction[axis], 10));
      });
      for (const x of [0, 128, 256, 384, 512]) for (const y of [0, 128, 256, 384, 512]) {
        const direction = sample(x, y);
        expect(direction.reduce((value: number, component: number, axis: number) => value + component * center[axis], 0), art.id).toBeGreaterThan(0.1);
      }
    }
  });
  it('separates original artwork license from retained scientific metadata credits', () => {
    const provenance = JSON.parse(readFileSync(new URL('provenance.json', root), 'utf8'));
    expect(provenance.illustrations.author).toBe('spacelibre');
    expect(provenance.illustrations.license).toBe('MIT');
    expect(provenance.illustrations.method).toBe('original-svg-paths');
    expect(provenance.metadata.license).toBe('CC-BY-SA-4.0');
    expect(provenance.anchorStars.license).toBe('BSD-3-Clause');
    expect(provenance.assets).toHaveLength(85);
    for (const asset of provenance.assets) {
      expect(asset.sourceUrl).toBeUndefined();
      expect(asset.sourceSha256).toBeUndefined();
      expect(createHash('sha256').update(readFileSync(new URL(asset.file, root))).digest('hex')).toBe(asset.svgSha256);
    }
  });
  it('renders every figure with a transparent sky rather than a filled image panel', async () => {
    for (const art of catalogue().artworks) {
      const { data: pixels, info } = await sharp(readFileSync(new URL(art.file, root)))
        .resize(256, 256).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let transparent = 0;
      let visible = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
        if (pixels[i] > 16) visible++;
      }
      const count = info.width * info.height;
      expect(transparent / count, art.file).toBeGreaterThan(0.70);
      expect(visible / count, art.file).toBeGreaterThan(0.003);
      expect(visible / count, art.file).toBeLessThan(0.28);
    }
  });
});
