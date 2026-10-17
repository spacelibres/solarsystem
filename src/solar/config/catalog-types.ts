/** JSON-safe source values. Infinity is explicit because JSON cannot encode it. */
export type SourceTime = number | '-Infinity' | 'Infinity';
export type StaticValue = string | number | boolean | null | StaticValue[] | StaticObject;
export interface StaticObject { [key: string]: StaticValue }
export interface SourceDiagnostic {
  file: string;
  line: number;
  column?: number;
  reason: string;
  expression?: string;
}
export interface SourceController {
  type?: string;
  url?: string;
  coverage?: [SourceTime, SourceTime];
  position?: number[];
  /** NASA Pioneer order: w, x, y, z (not Three's x, y, z, w). */
  orientation?: number[];
  [key: string]: StaticValue | undefined;
}
export interface SourceModel {
  url?: string;
  scale?: number | number[];
  rotate?: StaticObject[];
  translate?: number[];
  shadowEntities?: string[];
  [key: string]: StaticValue | undefined;
}
export interface CatalogEntry {
  id: string;
  label?: string;
  sourceCategory?: string;
  sourceSubcategory?: string;
  groups: string[];
  radius?: number;
  systemRadius?: number;
  extentsRadius?: number;
  occlusionRadius?: number;
  parents: [SourceTime, string][];
  controllers: SourceController[];
  spheroid?: { equatorialRadius: number; polarRadius: number; planetographic?: boolean };
  spheroidLOD?: StaticObject;
  model?: SourceModel;
  trail?: StaticObject;
  raw: StaticObject;
  provenance: { file: string; line: number; column: number };
  diagnostics: SourceDiagnostic[];
}
export interface SourceCatalog {
  schemaVersion: 1;
  entries: CatalogEntry[];
  diagnostics: SourceDiagnostic[];
}
