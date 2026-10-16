// Recovered from vendors.js:1737557-1742551.
let defaultExport;
defaultExport = class PROJJSONBuilderBase {
  static getId(e) {
    const t = e.find(e => Array.isArray(e) && "ID" === e[0]);
    return t && t.length >= 3 ? {
      authority: t[1],
      code: parseInt(t[2], 10)
    } : null;
  }
  static convertUnit(e, t = "unit") {
    if (!e || e.length < 3) return {
      type: t,
      name: "unknown",
      conversion_factor: null
    };
    const n = e[1],
      r = parseFloat(e[2]) || null,
      i = e.find(e => Array.isArray(e) && "ID" === e[0]);
    return {
      type: t,
      name: n,
      conversion_factor: r,
      id: i ? {
        authority: i[1],
        code: parseInt(i[2], 10)
      } : null
    };
  }
  static convertAxis(e) {
    const t = e[1] || "Unknown";
    let n;
    const r = t.match(/^\((.)\)$/);
    if (r) {
      const t = r[1].toUpperCase();
      if ("E" === t) n = "east";else if ("N" === t) n = "north";else if ("U" === t) n = "up";else {
        if (!e[2]) throw new Error(`Unknown axis abbreviation: ${t}`);
        n = e[2];
      }
    } else n = e[2] || "unknown";
    const i = e.find(e => Array.isArray(e) && "ORDER" === e[0]),
      a = i ? parseInt(i[1], 10) : null,
      s = e.find(e => Array.isArray(e) && ("LENGTHUNIT" === e[0] || "ANGLEUNIT" === e[0] || "SCALEUNIT" === e[0]));
    return {
      name: t,
      direction: n,
      unit: this.convertUnit(s),
      order: a
    };
  }
  static extractAxes(e) {
    return e.filter(e => Array.isArray(e) && "AXIS" === e[0]).map(e => this.convertAxis(e)).sort((e, t) => (e.order || 0) - (t.order || 0));
  }
  static convert(e, t = {}) {
    switch (e[0]) {
      case "PROJCRS":
        t.type = "ProjectedCRS", t.name = e[1], t.base_crs = e.find(e => Array.isArray(e) && "BASEGEOGCRS" === e[0]) ? this.convert(e.find(e => Array.isArray(e) && "BASEGEOGCRS" === e[0])) : null, t.conversion = e.find(e => Array.isArray(e) && "CONVERSION" === e[0]) ? this.convert(e.find(e => Array.isArray(e) && "CONVERSION" === e[0])) : null;
        const n = e.find(e => Array.isArray(e) && "CS" === e[0]);
        n && (t.coordinate_system = {
          type: n[1],
          axis: this.extractAxes(e)
        });
        const r = e.find(e => Array.isArray(e) && "LENGTHUNIT" === e[0]);
        if (r) {
          const e = this.convertUnit(r);
          t.coordinate_system.unit = e;
        }
        t.id = this.getId(e);
        break;
      case "BASEGEOGCRS":
      case "GEOGCRS":
      case "GEODCRS":
        t.type = "GEODCRS" === e[0] ? "GeodeticCRS" : "GeographicCRS", t.name = e[1];
        const i = e.find(e => Array.isArray(e) && ("DATUM" === e[0] || "ENSEMBLE" === e[0]));
        if (i) {
          const n = this.convert(i);
          "ENSEMBLE" === i[0] ? t.datum_ensemble = n : t.datum = n;
          const r = e.find(e => Array.isArray(e) && "PRIMEM" === e[0]);
          r && "Greenwich" !== r[1] && (n.prime_meridian = {
            name: r[1],
            longitude: parseFloat(r[2])
          });
        }
        t.coordinate_system = {
          type: "ellipsoidal",
          axis: this.extractAxes(e)
        }, t.id = this.getId(e);
        break;
      case "DATUM":
        t.type = "GeodeticReferenceFrame", t.name = e[1], t.ellipsoid = e.find(e => Array.isArray(e) && "ELLIPSOID" === e[0]) ? this.convert(e.find(e => Array.isArray(e) && "ELLIPSOID" === e[0])) : null;
        break;
      case "ENSEMBLE":
        t.type = "DatumEnsemble", t.name = e[1], t.members = e.filter(e => Array.isArray(e) && "MEMBER" === e[0]).map(e => ({
          type: "DatumEnsembleMember",
          name: e[1],
          id: this.getId(e)
        }));
        const a = e.find(e => Array.isArray(e) && "ENSEMBLEACCURACY" === e[0]);
        a && (t.accuracy = parseFloat(a[1]));
        const s = e.find(e => Array.isArray(e) && "ELLIPSOID" === e[0]);
        s && (t.ellipsoid = this.convert(s)), t.id = this.getId(e);
        break;
      case "ELLIPSOID":
        t.type = "Ellipsoid", t.name = e[1], t.semi_major_axis = parseFloat(e[2]), t.inverse_flattening = parseFloat(e[3]);
        e.find(e => Array.isArray(e) && "LENGTHUNIT" === e[0]) && this.convert(e.find(e => Array.isArray(e) && "LENGTHUNIT" === e[0]), t);
        break;
      case "CONVERSION":
        t.type = "Conversion", t.name = e[1], t.method = e.find(e => Array.isArray(e) && "METHOD" === e[0]) ? this.convert(e.find(e => Array.isArray(e) && "METHOD" === e[0])) : null, t.parameters = e.filter(e => Array.isArray(e) && "PARAMETER" === e[0]).map(e => this.convert(e));
        break;
      case "METHOD":
        t.type = "Method", t.name = e[1], t.id = this.getId(e);
        break;
      case "PARAMETER":
        t.type = "Parameter", t.name = e[1], t.value = parseFloat(e[2]), t.unit = this.convertUnit(e.find(e => Array.isArray(e) && ("LENGTHUNIT" === e[0] || "ANGLEUNIT" === e[0] || "SCALEUNIT" === e[0]))), t.id = this.getId(e);
        break;
      case "BOUNDCRS":
        t.type = "BoundCRS";
        const o = e.find(e => Array.isArray(e) && "SOURCECRS" === e[0]);
        if (o) {
          const e = o.find(e => Array.isArray(e));
          t.source_crs = e ? this.convert(e) : null;
        }
        const c = e.find(e => Array.isArray(e) && "TARGETCRS" === e[0]);
        if (c) {
          const e = c.find(e => Array.isArray(e));
          t.target_crs = e ? this.convert(e) : null;
        }
        const l = e.find(e => Array.isArray(e) && "ABRIDGEDTRANSFORMATION" === e[0]);
        t.transformation = l ? this.convert(l) : null;
        break;
      case "ABRIDGEDTRANSFORMATION":
        if (t.type = "Transformation", t.name = e[1], t.method = e.find(e => Array.isArray(e) && "METHOD" === e[0]) ? this.convert(e.find(e => Array.isArray(e) && "METHOD" === e[0])) : null, t.parameters = e.filter(e => Array.isArray(e) && ("PARAMETER" === e[0] || "PARAMETERFILE" === e[0])).map(e => "PARAMETER" === e[0] ? this.convert(e) : "PARAMETERFILE" === e[0] ? {
          name: e[1],
          value: e[2],
          id: {
            authority: "EPSG",
            code: 8656
          }
        } : void 0), 7 === t.parameters.length) {
          const e = t.parameters[6];
          "Scale difference" === e.name && (e.value = Math.round(1e12 * (e.value - 1)) / 1e6);
        }
        t.id = this.getId(e);
        break;
      case "AXIS":
        t.coordinate_system || (t.coordinate_system = {
          type: "unspecified",
          axis: []
        }), t.coordinate_system.axis.push(this.convertAxis(e));
        break;
      case "LENGTHUNIT":
        const u = this.convertUnit(e, "LinearUnit");
        t.coordinate_system && t.coordinate_system.axis && t.coordinate_system.axis.forEach(e => {
          e.unit || (e.unit = u);
        }), u.conversion_factor && 1 !== u.conversion_factor && t.semi_major_axis && (t.semi_major_axis = {
          value: t.semi_major_axis,
          unit: u
        });
        break;
      default:
        t.keyword = e[0];
    }
    return t;
  }
};
export { defaultExport as default };
