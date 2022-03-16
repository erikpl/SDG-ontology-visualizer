import { Document } from "types/documentTypes";
import DB from "./index";

import bulkInsertDocuments from "./queries/bulkInsertDocuments";

export default async (documents: Document[]): Promise<any> => {
    const query = bulkInsertDocuments(documents);
    return DB.update(query, { transform: 'toJSON' }).catch((err) => {
        console.log(err);
    });
};
    
