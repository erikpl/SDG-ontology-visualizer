import { Document, DocumentSDGRelation } from "types/documentTypes";
import DB from "./index";
import login from "./login";

import bulkInsertDocuments from "./queries/bulkInsertDocuments";

export default async (documents: Document[], relations: DocumentSDGRelation[]): Promise<any> => {
    const query = bulkInsertDocuments(documents, relations);
    await login();
    
    return DB.update(query, { transform: 'toJSON' }).catch((err) => {
        console.log(err);
    });
};
    
