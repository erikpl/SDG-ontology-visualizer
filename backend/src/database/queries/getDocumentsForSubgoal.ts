import {
  parsePrefixesToQuery,
} from '../../common/database';
import { PREFIXES } from '../index';

export default (subgoalIRI: string, langCodes: Array<string>, offset: number): string => {
// export default (subgoalIRI: string): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS, PREFIXES.EULANG, PREFIXES.SKOS);
  
  const expectedDocuments = 10;
  const expectedFormats = 5;
  const queryLimit = expectedDocuments * expectedFormats * langCodes.length;
  // TODO: Trenger vi mer enn URL, format og language? (og title)
  // TODO: endre rdf:docTitle til SDG:docTitle når dokumentene blir oppdatert
  // TODO: få ut språkkoden direkte

  // Assuming that the pageNumber is one-indexed
  const pagingString = `LIMIT ${queryLimit} OFFSET ${queryLimit * (offset-1)}`;
  
  let innerFilterString = '';
  let connectiveString = ' || ';

  for (let i = 0; i < langCodes.length; i++) {
    // If last language
    if (i === langCodes.length - 1) {
      connectiveString = '';
    }

    innerFilterString += `(?language = eulang:${langCodes[i]})${connectiveString}`;
  }

  let fullFilterString = `FILTER (${innerFilterString})`;
  
  return `
      ${prefixString}
      SELECT ?celexID ?url ?id ?format ?language ?title
      WHERE { 
        ?document SDG:isAboutTarget <${subgoalIRI}>.
        ?document SDG:docSource ?url.
        ?document SDG:celexID ?celexID.
        ?document SDG:docID ?id.
        ?document SDG:docFormat ?formatName.
        ?formatName rdf:label ?format.
        ?document rdf:docTitle ?title.
        ?document SDG:docLanguage ?language.
        
        ${fullFilterString}
      }
      ORDER BY ASC(?celexID)
      ${pagingString}`;
};
