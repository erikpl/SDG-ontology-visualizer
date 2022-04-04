import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (goalID: string): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS);

  return `
      ${prefixString}
      SELECT ?instanceOf ?label ?icon
      WHERE { 
        ?instanceOf rdf:type SDG:SDG.
        ?instanceOf  rdfs:label  ?label.
        ?instanceOf  schema:icon  ?icon.
        FILTER( regex(STR(?instanceOf), "B${goalID}$" )).
      }
   `;
};
