# NASA models in the independent explorer

`src/solar/render/models.ts` uses the installed official Three.js GLTFLoader,
DRACOLoader, KTX2Loader and MeshoptDecoder. It imports no recovered runtime.
Draco and Basis workers use the existing `/eyes/decoders/1225db209857fe97/draco/` and
`/eyes/decoders/1225db209857fe97/ktx2/` files; model media stay on NASA's server.

## Integration contract

`createModelLibrary(renderer)` returns `acquire(descriptor, signal?)`,
`snapshot()` and `dispose()`. An acquisition returns `{ready, release}`.
`ready` resolves to a Group owned exclusively by that lease. Attach that group
to the body's oriented holder; release the lease when the body is hidden or
selection changes. Library disposal releases every scene. Repeated URLs are
loaded independently, avoiding shared mutable transforms and GPU ownership.
There is no idle scene cache. The caller bounds visible model leases; the
library bounds physical loads/decodes to two at a time.

Cancellation rejects promptly with `AbortError`. Three's nested glTF decoder
requests cannot reliably abort as a unit. An abandoned in-flight operation
therefore retains its concurrency slot until it physically finishes; its late
scene is destroyed rather than attached. Decoder workers are disposed after
all pending operations settle. Geometry, materials, textures, skeletons and
ImageBitmap-like sources are deduplicated within each owned scene before
release. A failed model rejects its lease and frees its scheduler slot.

The optional second `ModelLoaderPort` argument isolates lifecycle tests from
WebGL. Each port load must return independently owned resources.

## Source transform semantics

`ModelDescriptor` preserves URL, ordered `rotate`, `scale` and `translate`.
Entity-567 constructs its Pioneer quaternion with `(w,x,y,z)=(1,0,0,0)`:
identity, not a 180-degree X rotation. Each listed degree rotation premultiplies
the accumulated local rotation. ModelComponent defaults to `.001` metres to
kilometres; an explicit scalar/vector scale replaces that default. Descendant
glTF node transforms remain intact. Translation is already kilometres in the
entity frame, independent of the model scale and local rotation. A wrapper
Group carries translation while its child carries scale and local rotation.
The renderer must provide the body's orientation on the parent holder.

References: `eyes/src/engine/core/Entity-567.js:76`,
`eyes/src/engine/core/Quaternion.js:8`,
`eyes/src/engine/components/ModelComponent.js:20`, and
`eyes/src/engine/core/ThreeJsHelper.js:98` / `:157`.

## Actual remote inspection, 2026-10-16

All four exact registered manifests were fetched and parsed successfully with
HTTP 200, directly from `https://eyes.nasa.gov/assets/static/models/`.
No model or texture files were saved in the repository.

| Relative manifest URL | Reported bytes | External buffer | Extensions used |
| --- | ---: | --- | --- |
| `sc_iss/ISS_stationary.gltf` | 501729 | `ISS_stationary.bin` | KHR_materials_clearcoat, KHR_materials_specular, KHR_materials_ior |
| `sc_hubble/Hubble.gltf` | 31917 | `hubble.bin` | none declared |
| `sc_voyager/Voyager.gltf` | 9225 | `voyager.bin` | none declared |
| `sc_juno/Juno.gltf` | 56278 | `juno_closed.bin` | KHR_texture_transform |

Images are relative to each manifest: ISS includes `ISS_03.jpg` and
`ISS_01_n.jpg`; Hubble includes `hubble_tex_01_albedo.jpg`; Voyager includes
`voyager_albedo.jpg`; Juno includes `juno_tex_01_albedo.jpg`. The loader resolves
these exact relative URIs at runtime. No rewritten or guessed asset paths are
needed. Embedded glTF nodes also have nontrivial local scale/rotation/translation;
these are preserved below the scene root.

These observations establish manifest availability and format compatibility,
not a screenshot claim. Rendering and historical ephemeris/attitude availability
must be verified through the explorer integration. The helper does not synthesize
spacecraft attitude, animate NASA controllers or replace missing models with
surrogate geometry.

The independent loader pins the decoder revision in its own exported modelDecoderPaths() helper. A regression test compares it with the build publishing manifest and checks the actual decoder files, without importing the recovered runtime.
