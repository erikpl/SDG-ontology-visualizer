import { Document, DocumentSDGRelation } from '../../types/documentTypes';
import { parsePrefixesToQuery } from '../../common/database';
import fs from "fs";
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
    insertStatements = insertStatements.concat(
        `
        <${PREFIXES.SDG.iri}formats.docx> rdf:type SDG:Format.
        <${PREFIXES.SDG.iri}formats.docx> rdf:label "docx".
        <${PREFIXES.SDG.iri}formats.xhtml> rdf:type SDG:Format.
        <${PREFIXES.SDG.iri}formats.xhtml> rdf:label "xhtml".
        <${PREFIXES.SDG.iri}formats.fmx4> rdf:type SDG:Format.
        <${PREFIXES.SDG.iri}formats.fmx4> rdf:label "fmx4".
        <${PREFIXES.SDG.iri}formats.pdfa2a> rdf:type SDG:Format.
        <${PREFIXES.SDG.iri}formats.pdfa2a> rdf:label "pdfa2a".
        <${PREFIXES.SDG.iri}formats.pdf> rdf:type SDG:Format.
        <${PREFIXES.SDG.iri}formats.pdf> rdf:label "pdf".

        `
    )
    documents.forEach((doc) => {
        const docUri = `<${PREFIXES.SDG.iri}documents.${doc.id}>`;
        const langUri = `<${PREFIXES.EULANG.iri}${doc.language}>`;
        const formatUri = `<${PREFIXES.SDG.iri}formats.${doc.format}>`;
        const relatedSDGs = relations.filter(rel => rel.celexID == doc.celexID);
        
        insertStatements = insertStatements.concat(
            `
            ${docUri} SDG:celexID "${doc.celexID}".
            ${docUri} rdf:type SDG:Document.
            ${docUri} SDG:docID "${doc.id}".
            ${docUri} SDG:docLanguage ${langUri}.
            ${docUri} SDG:docFormat ${formatUri}.
            ${docUri} SDG:docSource <${doc.url}>.
            ${docUri} SDG:docTitle <${doc.title}>.
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
