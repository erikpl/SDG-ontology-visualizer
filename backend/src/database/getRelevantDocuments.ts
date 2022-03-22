import DB from './index';
import getRelevantDocuments from './queries/getRelevantDocuments';
import { ApiError } from 'types/errorTypes';
import { Document } from '../types/documentTypes';
import { response } from 'express';

const HTTP_BAD_REQUEST = 400;

export default async (documentId: string): Promise<Array<Document>> => {
    const query = getRelevantDocuments(documentId);
    // TODO: In getSubGoals, they check if not documentId. Surely it should be query instead?
    if (!query) {
        throw new ApiError(HTTP_BAD_REQUEST, 'Could not parse the ontology entity from the given documentId');
    }
    // TODO: no idea if this is suitable
    return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
}