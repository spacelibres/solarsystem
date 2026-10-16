# Recovered NASA Eyes Solar System source project

This is the editable source project. Normal builds do not download, regenerate,
or overwrite its application code.

From this directory:

```sh
npm ci
npm run check
npm run build
npm run dev
```

The standalone development server runs at http://127.0.0.1:3002 and recompiles
JavaScript and HTML templates when edited. Reload the browser after a rebuild.
From the repository root, `npm run dev` watches these same sources and exposes
them through the existing Next.js host on port 3000.

## Where to edit

- `src/main.js`: normal ESM startup order.
- `src/app/SolarSystemApp.js`: routes, managers and application setup.
- `src/app/config/`: component layout, settings and view classes.
- `src/framework/eyes/`: shared NASA Eyes application API.
- `src/engine/`: Pioneer rendering, entities, controllers and scene managers.
- `src/ui/components/`, `src/ui/views/`: application UI and views.
- `src/ui/templates/`: 55 actual HTML template source files.
- `src/data/`: extracted JSON catalogs and configuration.
- `src/vendor/`: original third-party module snapshots and locale packages.
- `shell/`: original CSS, HTML and runtime resource configuration.

Modules use relative imports/exports. CommonJS remains ordinary CommonJS where
third-party packages use it. There is no webpack registry, chunk runtime, numeric
require API, or remote original app.js execution in the source project.
The build tool may emit its own standard CommonJS interop wrappers in dist.

The tiny `runtime/interop.cjs` supports legacy module default imports and Node
module metadata; it is not a module loader. Third-party versions are preserved
from the captured application, including Three.js revision 185. They are not
silently replaced by the host project's newer dependencies.

## Provenance and limits

`provenance.json` maps each of the 1,087 original modules to its source filename,
UTF-16 source range, exports, dependencies and original bundle SHA-256. Source file names
come from original classes/exports, template ownership and named configuration
fields. Unidentified vendor pieces retain explicit `Unidentified` names instead
of invented package identities. Some short locals remain where evidence does
not establish a safe semantic name; this is not NASA's unpublished original repo.

The one-time recovery command is `npm run eyes:recover` at the repository root.
It refuses to replace an existing source tree. `--overwrite` is reserved for an
explicit reconstruction experiment; ordinary development never invokes it.

Textures, models, dynamo ephemerides, fonts and other runtime resources load
from NASA's exact original URLs. No media asset library is stored here.
This project is independent and is not affiliated with or endorsed by NASA/JPL.
Original NASA UI is retained at the owner's request. See the repository README
attribution and `THIRD_PARTY_LICENSES.txt` for upstream vendor notices; the host
project's license does not override upstream terms.
