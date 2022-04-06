import { SimulationNodeDatum } from 'd3';

export type Annotation = {
  label: string;
  description: string;
  moreInformation: string | null;
};

export type SustainabilityGoal = {
  instancesOf: string;
  label: string;
  icon: string;
};

export interface SubGoal extends Node {
  SubjectLabel: string;
  description: string;
}

export interface UniqueObject {
  id: string;
}

export interface Node extends UniqueObject {
  name: string;
  type: string;
  prefix: Prefix;
  correlation: number;
}

export interface GraphNode extends Node, SimulationNodeDatum {
  isLocked?: boolean;
  lockedX?: number;
  lockedY?: number;
  color?: string;
  type: string;
}

export interface Edge extends UniqueObject {
  name: string;
  prefix: Prefix;
  correlation: number;
}

export interface GraphEdge extends Edge {
  source: string;
  target: string;
  sourceToTarget: Edge[];
  targetToSource: Edge[];
}

export type Ontology = {
  Subject: Node;
  Object: Node;
  Predicate: Edge;
};

export type Prefix = {
  prefix: string;
  iri: string;
};

export type CorrelationFilter = {
  pLow: boolean;
  pMedium: boolean;
  pHigh: boolean;
  nLow: boolean;
  nMedium: boolean;
  nHigh: boolean;
};

export type Document = {
  celexID: string;
  title: string;
  language: string;
  format: string;
  url: string;
};

export type LanguageItem = {
  id: number;
  ISO_639_1: ISO6391Code;
  ISO_639_2T: ISO6392TCode;
};

export enum ISO6391Code {
  bg, cs, da, de, el, en, es, et, fi, fr, ga, 
  hr, hu, it, lt, lv, mt, nl, no, pl, pt, ro, sk, sl, sv, null,
}

export enum ISO6392TCode {
  HRV,
  FIN,
  CES,
  SPA,
  DAN,
  EST,
  POL,
  DEU,
  ELL,
  POR,
  SLV,
  LAV,
  LIT,
  BUL,
  ITA,
  GLE,
  RON,
  HUN,
  SWE,
  MLT,
  ENG,
  SLK,
  FRA,
  NOR,
  NLD,
  null,
}