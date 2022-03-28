import { CorrelationFilter, Node, SubGoal, SustainabilityGoal } from '../ontologyTypes';

export type SetCorrelationFilterPayload = {
  isPositive: boolean;
  index: number;
};

export type OntologyState = {
  selectedNode?: Node;
  selectedSDG?: SustainabilityGoal;
  selectedSubGoal?: SubGoal;
  correlationFilter: CorrelationFilter;
};

export type SelectNodeAction = {
  type: typeof SELECT_NODE;
  payload: Node;
};

export type ClearSelectedNodeAction = {
  type: typeof CLEAR_SELECTED_NODE;
};

export type SetCorrelationFilterAction = {
  type: typeof SET_CORRELATION_FILTER;
  payload: SetCorrelationFilterPayload;
};

export type SelectSDGAction = {
  type: typeof SELECT_SDG;
  payload: SustainabilityGoal;
};

export type SelectSubgoalAction = {
  type: typeof SELECT_SUBGOAL;
  payload: SubGoal;
};

export type OntologyStateAction =
  | SelectNodeAction
  | ClearSelectedNodeAction
  | SetCorrelationFilterAction
  | SelectSDGAction
  | SelectSubgoalAction;

export const SELECT_NODE = 'SELECT_NODE';
export const SELECT_SDG = 'SELECT_SDG';
export const SELECT_SUBGOAL = 'SELECT_SUBGOAL';
export const CLEAR_SELECTED_NODE = 'CLEAR_SELECTED_NODE';
export const SET_CORRELATION_FILTER = 'SET_CORRELATION_FILTER';
