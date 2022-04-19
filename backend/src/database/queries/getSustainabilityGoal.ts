import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (goalID: string): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS);

  return `
      ${prefixString}
      SELECT ?instancesOf ?label ?icon
      WHERE { 
        ?instancesOf rdf:type SDG:SDG.
        ?instancesOf  rdfs:label  ?label.
        ?instancesOf  schema:icon  ?icon.
        FILTER( regex(STR(?instancesOf), "B${goalID}$" )).
      }
   `;
};
