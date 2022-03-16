import { Document } from '../../types/documentTypes';
import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (documents: Document[]): string => {
    const prefixString = parsePrefixesToQuery(
        PREFIXES.RDF,
        PREFIXES.OWL,
        PREFIXES.SDG,
        PREFIXES.UNSDG,
        PREFIXES.EULANG
    );
    
    let insertStatements = '';
    documents.forEach((doc) => {
        const docUri = `<${PREFIXES.SDG.iri}documents.${doc.id}>`;
        const langUri = `<${PREFIXES.EULANG.iri}${doc.language}>`;

        insertStatements = insertStatements.concat(
            `
            ${docUri} rdf:type SDG:Document.
            ${docUri} SDG:docID ${doc.id}.
            ${docUri} SDG:docLanguage ${langUri}.
            ${docUri} SDG:docFormat ${doc.format}.
            ${docUri} SDG:docSource ${doc.url}.
            `
        );
    });

    return `
    ${prefixString}
    insert data {
      ${insertStatements}
   }`;
}

