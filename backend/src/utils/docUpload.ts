import { Document, LanguageReference } from "../types/documentTypes";
import bulkDeleteDocuments from "../database/bulkDeleteDocuments";
import bulkInsertDocuments from "../database/bulkInsertDocuments";

import fs from "fs";

/*
Reads the content of the file "cellar_documents.json" (inserted into this directory manually), parses it into a JSON object, and extracts
the relevant information needed to create Document objects: one for each format of a document in a particular language. The docList 
variable then contains all documents up to a certain point (changes depending on the slice() parameters), in all its languages and 
formats.
 */
fs.readFile("./cellar_documents.json", {encoding: "utf-8"}, (err, data) => {
    if (err) throw err;

    let rawData = JSON.parse(data);
    const docList: Document[] = [];    

    rawData.slice(0, 1).forEach((work) => {
        work.languages.forEach((expression) => {
            const title = expression.title;
            const language: LanguageReference = expression.language;

            expression.formats.forEach((manifestation) => {
                const id = manifestation.id;
                const format = manifestation.type;
                const url = manifestation.url;

                const document: Document = {
                    id,
                    title,
                    language,
                    format,
                    url
                }
                docList.push(document);
            });
        });
    });
    console.log(docList);
    
    // TODO: Pass into queries

});