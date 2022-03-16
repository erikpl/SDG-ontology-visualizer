import { Document } from '../types/documentTypes';
import DB from './index';
import bulkDeleteDocuments from './queries/bulkDeleteDocuments';

export default async (documents: Document[]): Promise<any> => {
    const query = bulkDeleteDocuments(documents);
    return DB.update(query, { transform: 'toJSON' }).catch((err) => {
        console.log(err);
    });
};