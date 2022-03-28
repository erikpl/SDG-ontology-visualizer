import {
  parsePrefixesToQuery,
} from '../../common/database';
import { PREFIXES } from '../index';

export default (subgoalIRI: string): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS, PREFIXES.EULANG, PREFIXES.SKOS);
  // TODO: Add title to database
  return `
      ${prefixString}
      SELECT ?celexID ?url ?id ?format ?language
      WHERE { 
        ?document SDG:isAboutTarget <${subgoalIRI}>.
        ?document SDG:docSource ?url.
        ?document SDG:celexID ?celexID.
        ?document SDG:docID ?id.
        ?document SDG:docFormat ?format.
        {
          SELECT ?formatName
          WHERE {
            ?format rdf:label ?format.
          }	
        }

        ?document SDG:docLanguage ?language.

}`;
};
