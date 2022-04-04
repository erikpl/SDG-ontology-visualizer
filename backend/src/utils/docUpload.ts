import { Document, DocumentSDGRelation, LanguageReference } from "../types/documentTypes";
import bulkDeleteDocuments from "../database/bulkDeleteDocuments";
import bulkInsertDocuments from "../database/bulkInsertDocuments";

import fs from "fs";

/*
Reads the content of the file "cellar_documents.json" (inserted into this directory manually), parses it into a JSON object, and extracts
the relevant information needed to create Document objects: one for each format of a document in a particular language. The docList 
variable then contains all documents up to a certain point (changes depending on the slice() parameters), in all its languages and 
formats.
 */

let docList: Document[] = []; 
let relationsList: DocumentSDGRelation[] = [];

Promise.all([
    new Promise<void>(async (resolve) => {
        fs.readFile("./targets_arr.json", {encoding: "utf-8"}, (err, data) => {
            if (err) throw err;
            let rawData = JSON.parse(data);
            rawData.forEach(rel => {
                const celexID = rel.policy;
                const goals = rel.goals;
                const targets = rel.targets;
                const relation: DocumentSDGRelation = {
                    celexID,
                    goals,
                    targets
                }
                relationsList.push(relation);
            })
        })
        resolve();
    }),
    new Promise<void>((resolve) => {
        fs.readFile("./cellar_documents.json", {encoding: "utf-8"}, (err, data) => {
            if (err) throw err;
            let rawData = JSON.parse(data);  
            rawData.slice(0, 3).forEach((work) => {
                work.languages.forEach((expression) => {
                    const title = expression.title;
                    const celexID = work.id;
                    const language: LanguageReference = expression.language;
                    expression.formats.forEach((manifestation) => {
                        const id = manifestation.id;
                        const format = manifestation.type;
                        const url = manifestation.url;
                        const document: Document = {
                            celexID,
                            id,
                            title,
                            language,
                            format,
                            url
                        }
                        docList.push(document);
                    })
                })
            })
            resolve();
            
        })
    })
]).then(() => {
    bulkInsertDocuments(docList, relationsList);
})