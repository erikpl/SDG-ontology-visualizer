import DB from './index';
import getDocumentsForSubgoal from './queries/getDocumentsForSubgoal';
import { ApiError } from 'types/errorTypes';
import { Document } from '../types/documentTypes';
import { response } from 'express';
import login from './login';

export default async (subgoalIRI: string): Promise<Array<Document>> => {
    const query = getDocumentsForSubgoal(subgoalIRI);

    return DB.query(query, { transform: 'toJSON' });
    //.then((resp) => console.log(resp));
}