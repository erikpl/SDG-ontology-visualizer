import {
    getLanguageFilterString,
    mapIdToOntologyEntity,
    parseOntologyEntityToQuery,
    parsePrefixesToQuery,
  } from '../../common/database';
  import { PREFIXES } from '../index';
  
  export default () => {
    const languageCodes = ["ENG", "BUL", "HRV", "DAN", "NLD", "CES", "EST", "FIN", "FRA", "DEU", "ELL", "HUN",
                            "IPK", "GLE", "LAV", "LIT", "MLT", "POL", "POR", "RON", "SLK", "SLV", "SPA", "SWE"];
    const filterString = getLanguageFilterString(languageCodes);
    const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.SCHEMA, PREFIXES.RDFS, PREFIXES.EURVOC);


  
    return `
    SELECT ?ISO_639_2T ?label ?isoLabel WHERE {
        SELECT DISTINCT ?ISO_639_2T ?label ?ISO_639_1 WHERE {
            ?ISO_639_2T skos:inScheme <http://publications.europa.eu/resource/authority/language>

            SERVICE <http://publications.europa.eu/webapi/rdf/sparql> {
                ?ISO_639_2T skos:prefLabel ?label.
                ?ISO_639_2T skos:notation ?ISO_639_1.
            }
            ${filterString}.
        }
        
    }
       `;
  };
  