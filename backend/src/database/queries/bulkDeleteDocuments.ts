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

    let uris: string = '';
    documents.forEach((doc) => {
        const docUri = ` <${PREFIXES.SDG.iri}documents.${doc.id}>`;
        uris = uris.concat(docUri);
    });

    return `
    ${prefixString}
    delete {
      ?uri ?prop ?val.
    }
    where {
      VALUES ?uri { ${uris} }.
      VALUES ?val { ${uris} }.
      ?uri ?prop ?val.
    }`;
};