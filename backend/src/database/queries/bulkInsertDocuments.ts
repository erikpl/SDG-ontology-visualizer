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
            const relatedTargets = relatedSDGs.map(rel => rel.targets);
            
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
                );
                
                //TODO: also update the goals and targets so that we get a two-way relation
                relatedSDGs.forEach(rel => {
                    rel.goals.forEach(SDG => {
                        insertStatements = insertStatements.concat(
                            `
                            ${docUri} SDG:aboutSDG <http://www.semanticweb.org/aga/ontologies/2017/9/SDG#B${SDG}>
                            `
                            )
                        },
                        
                        Object.keys(rel.targets).forEach((key: string) => {
                            rel.targets[key].forEach(target => {
                                insertStatements = insertStatements.concat(
                                    `
                                    ${docUri} SDG:aboutTarget <http://http://metadata.un.org/sdg/${key}.${target}> 
                                    `
                                    )
                                })
                            })
                            )   
                        }
                        );
                        
                    });
                    
                    return `
                    ${prefixString}
                    insert data {
                        ${insertStatements}
                    }`;
                }
                
                