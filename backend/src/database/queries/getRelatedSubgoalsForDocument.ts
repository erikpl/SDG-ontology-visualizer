import {
    parsePrefixesToQuery,
  } from '../../common/database';
  import { PREFIXES } from '../index';
  
  export default (documentURI: string): string => {
    const prefixString = parsePrefixesToQuery(PREFIXES.SDG, PREFIXES.RDFS);

    return `
        ${prefixString}
        SELECT ?Subject ?SubjectLabel ?description
        WHERE { 
        ?Subject SDG:targetHasDocument <${documentURI}>.
        optional{?Subject rdfs:label ?SubjectLabel}.
        optional{?Subject SDG:description ?description}.
}ORDER BY ( xsd:string ( STRBEFORE ( STR ( ?SubjectLabel ), "" ) ) )
( xsd:long ( STRAFTER ( STR ( ?SubjectLabel ), "" ) ) )`
      
};
  