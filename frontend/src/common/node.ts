import {
  Edge,
  GraphNode,
  GraphEdge,
  Node,
  Prefix,
  SustainabilityGoal,
  CorrelationFilter,
} from '../types/ontologyTypes';
import { D3Edge } from '../types/d3/simulation';

export const mapPrefixNameToNode = (
  prefix: string,
  name: string,
  correlation?: number,
  type?: string,
): Node => ({
  prefix: {
    prefix,
    iri: `http://www.semanticweb.org/aga/ontologies/2017/9/${prefix}#`,
  },
  name,
  id: `http://www.semanticweb.org/aga/ontologies/2017/9/${prefix}#${name}`,
  correlation: correlation || -1,
  type: type || 'undefined',
});

export const parseNameFromClassId = (id: string): string => {
  const regex = /^[^_]*#/;
  const name = id.replace(regex, '');
  if (!name || name === id) return '';
  return name;
};

export const parsePrefixFromClassId = (id: string): Prefix | null => {
  const prefixRegex = /(?<=\/)([^/]*)(?=#)/;
  const prefixMatches = id.match(prefixRegex);
  if (!prefixMatches || !prefixMatches[0]) return null;

  const iriRegex = /^[^_]*#/;
  const iriMatches = id.match(iriRegex);
  if (!iriMatches || !iriMatches[0]) return null;

  return {
    prefix: prefixMatches[0],
    iri: iriMatches[0],
  };
};

export const parseTypeFromId = (id: string) => {
  let typeName = '';
  if (id.match(/#B[1-9]/g)) typeName = 'sdg';
  else if (id.match(/#[1-9]./g)) typeName = 'target';
  else if (id.match(/#[a-zA-zøØæÆåÅ]*./g)) typeName = 'devArea';
  else if (id.includes('Økonomi') || id.includes('Sosialt') || id.includes('Miljø')) typeName = 'tbl';

  return typeName;
};

export const mapIdToNode = (id: string, correlation?: number, type?: string): Node | null => {
  const prefix = parsePrefixFromClassId(id);
  const name = parseNameFromClassId(id);
  let parsedType = parseTypeFromId(id);
  if (parsedType === '' && type !== undefined)
    parsedType = type;

  if (!prefix || !name) return null;
  return {
    prefix,
    name,
    id,
    correlation: correlation || -1,
    type: parsedType,
  };
};

export const mapSustainabilityGoalToNode = (sdg: SustainabilityGoal): Node | null => {
  const node = mapIdToNode(sdg.instancesOf);
  if (!node) return null;
  node.name = sdg.label;
  return node;
};

export const mapIdToEdge = (id: string, correlation: number): Edge | null => {
  const prefix = parsePrefixFromClassId(id);
  const name = parseNameFromClassId(id);
  if (!prefix || !name) return null;
  return {
    prefix,
    name,
    id,
    correlation,
  };
};

export const mapCorrelationToName = (correlation: number) => {
  switch (correlation) {
    case 3:
      return 'aHigh';
    case 2:
      return 'aModerate';
    case 1:
      return 'aLow';
    default:
      return '';
  }
};

export const mapCorrelationToColor = (correlation: number) => {
  switch (correlation) {
    case 3:
      return '.800';
    case 2:
      return '.700';
    case 1:
      return '.600';
    default:
      return '.600';
  }
};

export const isSubgoal = (node: GraphNode): boolean => node.type === 'target';

export const isWithinCorrelationLimit = (
  edge: D3Edge | GraphEdge,
  filter: CorrelationFilter,
): boolean => {
  if (edge.correlation === 1 && filter.pLow) return true;
  if (edge.correlation === 2 && filter.pMedium) return true;
  if (edge.correlation === 3 && filter.pHigh) return true;
  if (edge.correlation === -1 && filter.nLow) return true;
  if (edge.correlation === -2 && filter.nMedium) return true;
  if (edge.correlation === -3 && filter.nHigh) return true;
  if (edge.correlation === 0) {
    return true;
  }
  return false;
};
