import {
  parsePrefixesToQuery,
} from '../../common/database';
import { PREFIXES } from '../index';

// export default (subgoalIRI: string, languageCodes: Array<string>, pageNumber: number): string => {
export default (subgoalIRI: string): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS, PREFIXES.EULANG, PREFIXES.SKOS);
  const pageSize = 50;
  // TODO: Trenger vi mer enn URL, format og language? (og title)
  // TODO: endre rdf:docTitle til SDG:docTitle når dokumentene blir oppdatert
  // TODO: få ut språkkoden direkte
  

  // TODO: fjern, bruk fra parameter
  let pageNumber = 2;
  // Assuming that the pageNumber is one-indexed
  const pagingString = `LIMIT ${pageSize} OFFSET ${pageSize * (pageNumber-1)}`;

  // TODO: fjern, bruk fra parameter
  let languageCodes = ['SWE', 'SLV'];
  
  let innerFilterString = '';
  let connectiveString = ' || ';

  for (let i = 0; i < languageCodes.length; i++) {
    // If last language
    if (i === languageCodes.length - 1) {
      connectiveString = '';
    }

    innerFilterString += `(?language = eulang:${languageCodes[i]})${connectiveString}`;
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
        {
          SELECT ?format
          WHERE {
            ?formatName rdf:label ?format.
          }	
        }

        ?document rdf:docTitle ?title.
        ?document SDG:docLanguage ?language.
        
        ${fullFilterString}
      }
      ${pagingString}`;
};
