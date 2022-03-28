import { Document, DocumentSDGRelation } from "types/documentTypes";
import DB from "./index";
import login from "./login";

import bulkInsertDocuments from "./queries/bulkInsertDocuments";

export default async (documents: Document[], relations: DocumentSDGRelation[]): Promise<any> => {
    await login();

    var old_i = 0
    for (let i = 143; i < documents.length; i += 144) {
        const query = bulkInsertDocuments(documents.slice(old_i, i), relations); 
            await DB.update(query, { transform: 'toJSON' })
            .catch((err) => {
                console.log(err);
            });
/*         documents.slice(old_i, i).forEach(async document => {
            const query = bulkInsertDocuments([document], relations); 
            
            await DB.update(query, { transform: 'toJSON' })
            .catch((err) => {
                console.log(err);
            });
             */
        //});
    old_i = i;
}
};
    
