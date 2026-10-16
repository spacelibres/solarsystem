# NASA Eyes on the Solar System parity inventory

Reference: https://eyes.nasa.gov/apps/solar-system/#/home
Observed: 2026-10-16, Chrome via Playwright. This is an initial inventory,
not a completed audit of every object, mission or control.

| Area | Reference observation / reproduction | Local status | Next acceptance check |
| --- | --- | --- | --- |
| Home | Open reference home; Sun, planet and spacecraft labels, story cards, settings rail and time controls are visible | Partial: similar shell, limited resident objects | Reproduce camera and object visibility at a fixed date |
| Layers | Click `toggle layers`; panel lists User Interface, Planets, Asteroids, Comets, Dwarf Planets, Constellations, Spacecraft, Trails, Orbits, Labels, Icons | Partial: orbits, labels and stars work; constellation state is disconnected | Verify each toggle changes the corresponding rendered content |
| Camera | Home exposes zoom in/out and reports re-framing follow camera | Partial: drag/wheel and object focus; dedicated zoom controls missing | Verify focus, follow and zoom across planet/moon/spacecraft scales |
| Time | Home shows current date, `real rate`, live status, expandable controls and custom time input | Partial: fixed initial epoch, accelerated playback mislabeled Real Rate, moving slider bounds | Shared simulation clock, true live mode, stable slider and date input |
| Search | Local catalog search audited in source; reference search flow still needs inspection | Partial: searches more objects than scene loads | Every supported result loads its parent chain before focus |
| Share | Share button observed on reference; share dialog flow still needs inspection | Missing local handler | Restore selected body, date, camera and layers from validated state |
| Object facts | Local source exposes catalog fields; reference object panel still needs inspection | Partial: technical fields instead of sourced explanatory content | Inspect reference panel and source factual descriptions |
| Stories | Reference home shows Roman launch, Psyche assist, Artemis II launch and Voyager tour | Partial: local cards jump to target/date only | Inspect each reference story and verify event-specific state transitions |
| Models | Catalog includes model paths; reference per-object assets still need inspection | Incomplete model rendering | Verify a spacecraft model and its orientation with real assets |
| Runtime assets | Verified exact URLs below | Implemented direct runtime origin; browser fetch verified | Retain no dependence on local mirror |
| Ephemeris loader | Real index and segment structure verified below | Unit-tested window selection, coverage checks, retry, bounded cache and request deduplication | Integrate reloads and stale-response rejection with scene time changes |

## Resource evidence

HEAD requests with an Origin header returned 200 and
`Access-Control-Allow-Origin: *` for:

- https://eyes.nasa.gov/assets/dynamic/dynamo/earth/sun/orb/def.dyn
- https://eyes.nasa.gov/assets/static/maps/earth/color_512_0.png
- https://eyes.nasa.gov/assets/static/sprites/sun_glow.png

Browser fetches from http://127.0.0.1:3000 returned 200 and readable bodies:
Earth orbit 30,916 bytes; Earth color face 241,810 bytes. The local production
scene loaded 43 orbital controllers in the observed session without a local
mirror route. Counts vary with epoch, available data and current selection policy.

GET https://eyes.nasa.gov/assets/dynamic/dynamo/ganymede/jupiter/orb/def.dyn
returned a v2 orb index with 195 segments and three-digit names. For the existing
initial scene epoch 820497600, segment `122.dyn` returned 200, 23 samples and
1661 bytes (`5 + 23 * 72`). Sample times 807653538.4171773 through
839476482.1301694 bracket the requested epoch. No new binary assets were saved.

## Current verification limits

The resource/loader foundation is independently testable. Correct loader results
do not yet guarantee a correct scene after arbitrary date jumps: scene refresh,
controller phase selection, TT/UTC conversion and general trajectory evaluation
remain separate integration work. No full-parity claim is made.

The baseline browser console reported a missing `/favicon.ico`; this is unrelated
to NASA resource access. The screenshot was inspected for successful scene load,
not accepted as final visual parity. Responsive visual acceptance remains open.
