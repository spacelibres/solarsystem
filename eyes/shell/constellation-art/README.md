# Original Western constellation SVG drawings

These transparent outline figures are original AI-assisted SVG path drawings
created for spacelibre in October 2026, licensed under MIT (see
LICENSE-ORIGINAL-SVG.txt). They are not downloaded illustrations, raster images
or bitmap traces. Rebuild locally with:

    python tools/constellation-art/build.py

The catalogue retains three-star J2000 registration metadata from Stellarium
western sky culture revision 014fbb5e59233d133c22f9811af96b67d05a95c9, licensed
CC-BY-SA-4.0, and unit directions from d3-celestial's BSD-3-Clause star catalogue.
These metadata licenses remain separate; see provenance.json and license files.

85 independently drawn SVGs cover 88 IAU constellation names: the Argo Navis
ship covers Carina/Puppis/Vela, and Ophiuchus includes Serpens. Art is not an IAU
boundary map, an official IAU drawing, or a claim of precise anatomical star
placement. Three-anchor registration fixes the celestial patch; final contours
are artistic. The normal application builds compile source and copy SVGs; they
do not invoke the authoring pipeline or fetch an external art library.
