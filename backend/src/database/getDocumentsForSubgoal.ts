import DB from './index';
import getDocumentsForSubgoal from './queries/getDocumentsForSubgoal';
import { ApiError } from 'types/errorTypes';
import { Document } from '../types/documentTypes';
import { response } from 'express';
import login from './login';

// export default async (subgoalURI: string, languageCodes: Array<string>, pageNumber: number): Promise<Array<Document>> => {
export default async (subgoalURI: string): Promise<Array<Document>> => {
    // const query = getDocumentsForSubgoal(subgoalURI, languageCodes, pageNumber);
    const query = getDocumentsForSubgoal(subgoalURI);

    return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
}