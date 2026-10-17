import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

describe('recovered Eyes spacelibre branding', () => {
  it('uses local application icons instead of NASA brand metadata', () => {
    const html = readFileSync('eyes/shell/index.html', 'utf8');
    expect(html).toContain('Solar System · spacelibre');
    expect(html).not.toMatch(/eyes\.nasa\.gov[^"\s]*(?:favicon|apple-touch-icon|site\.webmanifest|nasa_logo|og_img)/);
    const resources = [...html.matchAll(/<link[^>]+href="(\.\/[^"#]+)"/g)].map(match => match[1]);
    for (const resource of resources) expect(existsSync(resolve('eyes/shell', resource)), resource).toBe(true);
    expect(html).toContain('./brand/favicon.svg');
    expect(html).toContain('./site.webmanifest');
  });
  it('ships official install icons and preserves the published VI asset digests', () => {
    const manifest = JSON.parse(readFileSync('eyes/shell/site.webmanifest', 'utf8'));
    expect(manifest.name).toBe('Solar System · spacelibre');
    for (const icon of manifest.icons) {
      expect(existsSync(resolve('eyes/shell', icon.src))).toBe(true);
    }
    const sources: { file: string; source: string; sha256: string }[] = JSON.parse(readFileSync('eyes/shell/brand/sources.json', 'utf8'));
    for (const asset of sources) {
      expect(asset.source.startsWith('https://raw.githubusercontent.com/spacelibres/vi/main/')).toBe(true);
      const source = readFileSync(`eyes/shell/brand/${asset.file}`);
      const bytes = asset.file.endsWith('.svg') ? Buffer.from(source.toString('utf8').replace(/\r\n/g, '\n')) : source;
      expect(createHash('sha256').update(bytes).digest('hex'), asset.file).toBe(asset.sha256);
      expect(readFileSync(`public/eyes/brand/${asset.file}`).equals(source), asset.file).toBe(true);
    }
  });
  it('preserves approved monochrome masters and packages them with the standalone build', () => {
    for (const name of ['horizontal-white.svg', 'icon-white.svg', 'icon-black.svg']) {
      const expected = readFileSync(`public/brand/${name}`, 'utf8').replace(/\r\n/g, '\n');
      const actual = readFileSync(`eyes/shell/brand/${name}`, 'utf8').replace(/\r\n/g, '\n');
      expect(actual).toBe(expected);
      expect(actual).toContain('data-color-mode="monochrome"');
      expect(readFileSync(`public/eyes/brand/${name}`, 'utf8').replace(/\r\n/g, '\n')).toBe(expected);
    }
  });
  it('replaces loading, breadcrumb and menu marks without substituting the wordmark with text', () => {
    const css = readFileSync('eyes/shell/app.css', 'utf8') + readFileSync('eyes/shell/preload.css', 'utf8');
    expect(css.includes('nasa_logo.svg')).toBe(false);
    expect(css).toContain('./brand/horizontal-white.svg');
    for (const name of ['BreadcrumbTemplate.html', 'MenuTemplate.html']) {
      const template = readFileSync(`eyes/src/ui/templates/${name}`, 'utf8');
      expect(template).toContain('spacelibre-logo');
      expect(template).toContain('aria-label="spacelibre"');
      expect(template).not.toContain('icon-nasa-logo');
    }
  });
});
