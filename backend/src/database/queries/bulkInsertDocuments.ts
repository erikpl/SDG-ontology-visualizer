import { Document, DocumentSDGRelation } from '../../types/documentTypes';
import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (documents: Document[], relations: DocumentSDGRelation[]): string => {
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
        const relatedSDGs = relations.filter(rel => rel.celexID == doc.celexID);
        
        console.log(doc.celexID);
        insertStatements = insertStatements.concat(
            `
            ${docUri} SDG:celexID "${doc.celexID}".
            ${docUri} rdf:type SDG:Document.
            ${docUri} SDG:docID "${doc.id}".
            ${docUri} SDG:docLanguage ${langUri}.
            ${docUri} SDG:docFormat "${doc.format}".
            ${docUri} SDG:docSource <${doc.url}>.
            `
        )
            
        relatedSDGs.forEach(rel => {
            rel.goals.forEach(SDG => {
                let sdgUri = `<${PREFIXES.SDG.iri}B${SDG}>`
                insertStatements = insertStatements.concat(
                    `
                    ${docUri} SDG:isAboutSDG ${sdgUri}
                    ${sdgUri} SDG:goalHasDocument ${docUri}
                    `
                )
            },
                
            Object.keys(rel.targets).forEach((key: string) => {
                rel.targets[key].forEach(target => {
                    let targetUri = `<${PREFIXES.SDG.iri}${key}.${target}>`;
                    insertStatements = insertStatements.concat(
                        `
                        ${docUri} SDG:isAboutTarget ${targetUri}
                        ${targetUri} SDG:targetHasDocument ${docUri}
                        `
                    )
                })
            })) 
        })        
    })
                
    return `
    ${prefixString}
    insert data {
        ${insertStatements}
    }`;
}
                
                