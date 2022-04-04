import { Node } from '../types/ontologyTypes';
import DB from './index';
import getSustainabilityGoal from './queries/getSustainabilityGoal';

export default async (goalID: string): Promise<Array<Node>> => {
  const query = getSustainabilityGoal(goalID);
  
  return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
};
