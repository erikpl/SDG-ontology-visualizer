import DB from './index';
import getDocumentsForSubgoal from './queries/getDocumentsForSubgoal';
import { ApiError } from 'types/errorTypes';
import { Document } from '../types/documentTypes';
import { response } from 'express';
import login from './login';

export default async (subgoalURI: string, langCodes: Array<string>, offset: number): Promise<Array<Document>> => {
    const query = getDocumentsForSubgoal(subgoalURI, langCodes, offset);
    console.log(query);

    return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
}