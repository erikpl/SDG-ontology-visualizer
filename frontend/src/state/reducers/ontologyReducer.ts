import { CorrelationFilter, Node, SubGoal, SustainabilityGoal } from '../../types/ontologyTypes';
import {
  CLEAR_SELECTED_NODE,
  OntologyState,
  OntologyStateAction,
  SELECT_NODE,
  SELECT_SDG,
  SELECT_SUBGOAL,
  SetCorrelationFilterAction,
  SetCorrelationFilterPayload,
  SET_CORRELATION_FILTER,
} from '../../types/redux/ontologyTypes';

const createNewCorrelationFilter = (
  current: CorrelationFilter,
  payload: SetCorrelationFilterPayload,
) => {
  const newFilter = current;
  if (payload.isPositive && payload.index === 0) newFilter.pLow = !current.pLow;
  else if (payload.isPositive && payload.index === 1) newFilter.pMedium = !current.pMedium;
  else if (payload.isPositive && payload.index === 2) newFilter.pHigh = !current.pHigh;
  else if (!payload.isPositive && payload.index === 0) newFilter.nLow = !current.nLow;
  else if (!payload.isPositive && payload.index === 1) newFilter.nMedium = !current.nMedium;
  else if (!payload.isPositive && payload.index === 2) newFilter.nHigh = !current.nHigh;
  return newFilter;
};

const defaultState: OntologyState = {
  selectedNode: undefined,
  selectedSDG: undefined,
  selectedSubGoal: undefined,
  correlationFilter: {
    pLow: true,
    pMedium: true,
    pHigh: true,
    nLow: true,
    nMedium: true,
    nHigh: true,
  },
};

const ontologyReducer = (
  state: OntologyState = defaultState,
  action: OntologyStateAction,
): OntologyState => {
  switch (action.type) {
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };
    case CLEAR_SELECTED_NODE:
      return defaultState;
    case SET_CORRELATION_FILTER:
      return {
        ...state,
        correlationFilter: createNewCorrelationFilter(state.correlationFilter, action.payload),
      };
    case SELECT_SDG:
      return {
        ...state,
        selectedSDG: action.payload,
      };
    case SELECT_SUBGOAL:
      return {
        ...state,
        selectedSubGoal: action.payload,
      };
    default:
      return state;
  }
};

export const selectNode = (node: Node): OntologyStateAction => ({
  type: 'SELECT_NODE',
  payload: node,
});

export const selectSDG = (sdg: SustainabilityGoal): OntologyStateAction => ({
  type: 'SELECT_SDG',
  payload: sdg,
});

export const selectSubgoal = (subgoal: SubGoal): OntologyStateAction => ({
  type: 'SELECT_SUBGOAL',
  payload: subgoal,
});

export const setCorrelationFilter = (
  isPositive: boolean,
  index: number,
): SetCorrelationFilterAction => ({
  type: 'SET_CORRELATION_FILTER',
  payload: { isPositive, index },
});

export const clearSelectedNode = (): OntologyStateAction => ({ type: 'CLEAR_SELECTED_NODE' });

export default ontologyReducer;
