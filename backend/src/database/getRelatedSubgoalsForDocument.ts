import DB from './index';
import { Document } from '../types/documentTypes';
import { response } from 'express';
import login from './login';
import getRelatedSubgoalsForDocument from './queries/getRelatedSubgoalsForDocument';
import { Node } from 'types/ontologyTypes';

export default async (documentURI: string): Promise<Array<Node>> => {
    const query = getRelatedSubgoalsForDocument(documentURI);

    return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
}