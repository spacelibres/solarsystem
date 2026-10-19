# Visual identity constraints

Binding rules for every logo, icon and colour decision in this project. They come
from the spacelibre visual standard, whose authoritative source is
<https://github.com/spacelibres/vi> and whose reference implementation is
<https://vi.spacelibre.cn>.

This file is deliberately written as constraints, not suggestions. If a change
would violate one of them, the change is wrong — not the rule. When a rule is
relaxed, record why here in the same commit.

## 1. Logo masters

**Use the supplied masters. Never reconstruct the mark.**

The twelve approved masters live in `public/brand/`, named
`{horizontal,stacked,icon}-{primary,reverse,navy,white,black}.svg`:

| orientation | canvas | minimum display width | where |
| --- | --- | --- | --- |
| `horizontal` | 810 × 180 | ≥ 240 px | navigation, footers, document headers |
| `stacked` | 620 × 430 | ≥ 180 px | covers, splash, centred brand moments |
| `icon` | 256 × 256 | ≥ 48 px | avatars, app marks, compact space, favicon |

- The wordmark is **outlined geometry, not a typeface**. Do not retype it, do not
  substitute Arial, do not restyle it.
- The master planet is one circle at (775, 405), r 171, stroke 30. Its orbital
  mask supplies the intentional crossing and the 6-unit clearance. Preserve every
  path, transform, mask and tapered orbit tip. **Never draw the upper and lower
  arcs independently.**
- Do not stretch, rotate, reflect or add effects (glow, bevel, outline, shadow).
- Clear space: at least **0.25 × the SVG canvas height** on all four sides. No
  text, border or graphic may enter it.
- Below ~48 px use `icon`; test at 16/24/32 px because orbit tips and fine
  clearances degrade at small sizes.

## 2. Monochrome takes precedence

A monochrome asset is **one ink**, always.

- The planet, the orbit and the whole wordmark share exactly one colour.
- Preserve `black #000000`, `white #FFFFFF` and `navy #002044` across theme
  changes. They do **not** acquire auxiliary colours when the palette changes.
- Monochrome masters carry `data-color-mode="monochrome"`, and the renderer
  **bypasses recolouring entirely** for them. Do not strip that attribute, and do
  not apply role bindings to monochrome artwork.
- Choose the master that matches the background. Never silently convert a
  monochrome master into a full-colour mark.

## 3. Full-colour assets only

For full-colour masters, and only those:

| element | role |
| --- | --- |
| orbit | `primaryOnLight` / `primaryOnDark` |
| planet | `planetOnLight` / `planetOnDark` |
| wordmark | readable foreground, with the `libre` portion in `primary` |

A navy planet that stays fixed while a custom palette changes everywhere else is
a **defect**, not a design choice. The planet must be bound, not literal.

## 4. Colour is generated, never hand-picked

The Explorer exposes all six approved presets in a visible 配色 selector and
persists the choice. Switching it updates the CSS roles, the REVERSE logo, native
control accents, Starlink tracks and the renderer clear colour together.


- 16 roles: `primary`, `secondary`, `accent`, `deep`, `surface`, `ink`, `card`,
  `muted`, `line`, `success`, `warning`, `danger`, `primaryOnLight`,
  `primaryOnDark`, `planetOnLight`, `planetOnDark`.
- Six approved presets: electric-orbit, aurora-jump, nebula-spectrum,
  solar-storm, deep-space-oasis, acid-future. The tokens in
  `src/lib/theme/palette.ts` mirror the VI source exactly — if they diverge, the
  VI source wins and ours is corrected.
- A custom primary generates the rest through the portable engine
  (`generatePalette`), using split-complementary, triadic or analogous harmony.
  **The selected primary stays exact**; only contextual shades are adjusted.
- Text contrast: 4.5:1 for normal text, 3:1 for large text. The engine fits
  contextual logo strokes to 4.5:1. Status colours keep their meaning.
- Components read CSS custom properties (`--sl-*`). **No component hardcodes a
  brand colour.**

## 5. A theme change must reach everything

Not just an accent or a settings panel. Every one of these must follow the active
palette:

- navigation, backgrounds, cards, headlines, buttons
- illustration and orbit strokes, gradient stops
- **the logo** (full-colour marks) and **the favicon**
- photo tints, image overlays
- downloadable SVGs

An unchanging application gallery or a fixed planet is a failed implementation.
Monochrome assets intentionally keep their single ink and are the documented
exception.

## 6. Structural values are never themed

Mask and clip-path black/white are structural. They must not be recoloured, and
they are excluded from the renderer's substitution pass.

## 7. Composition

- Decorative orbital curves are continuous, sit **behind** content, fade
  naturally, and must not be hidden behind opaque blocks.
- Do not conceal a join with an opaque rectangle. Intentional edge bleed is fine;
  arbitrary internal cuts are not.
- Do not let artwork intersect typography. Keep informational content on a
  consistent grid.
- Suggested area ratios: deep/light base 60%, primary 25%, secondary 10%,
  accent 5%.
- Typography: Arial / Arial Bold for Latin, system sans for Chinese, Consolas for
  technical metadata. 8 px spacing rhythm.

## 8. Attribution

NASA imagery may support backgrounds. Keep the NASA source and credit intact and
**never imply NASA endorsement**.

## Enforcement in this repository

- `tests/vi-constraints.test.ts` asserts the rules that can be checked
  mechanically: master presence and naming, canvas sizes, the planet geometry and
  mask, `data-color-mode="monochrome"` on monochrome masters, role attributes on
  full-colour masters, a distinct favicon, and palette role completeness.
- `npm test` fails if a master is missing, renamed, reshaped or has its ink
  changed.
- The favicon and app icons are generated from the **`icon`** master, so the mark
  cannot drift from the approved geometry.

## Applying this to a new surface

1. Pick the orientation for the canvas (horizontal / stacked / icon).
2. Pick the ink: monochrome master for its background, or a full-colour master if
   the surface should track the palette.
3. Reserve 0.25 × canvas height of clear space.
4. Read colours from `--sl-*` tokens; never introduce a literal brand colour.
5. Verify at the real display size **and** under a second palette.
